import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import * as G from './guild-management.js';
import { renderRooms } from './room-panel.js';
import { navigationNotices, acknowledgeNavigation } from './navigation-notices.js';

function guild() {
  const s = D.initial();
  s.flags.repaired = s.flags.garden = s.flags.hospice = true;
  s.gold = 500;
  s.guild.salvage = 20;
  s.guild.blueprints = ['mill', 'drains'];
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  D.setGardenPolicy(s, 'paused');
  return s;
}
function injure(s, id, recovery) {
  const c = s.roster.find((c) => c.id === id);
  c.status = 'injured';
  c.injury = Math.min(4, Math.ceil(recovery / 2));
  c.recovery = recovery;
  return c;
}
function tick(s, n = 1) {
  for (let i = 0; i < n; i++) {
    s.eventSeed = 97;
    D.day(s);
  }
}
const reload = (s) => D.load(D.save(s));
const helpers = {
  esc: String,
  card: (t, b) => `<h3>${t}</h3>${b}`,
  btn: (t, a, disabled) => `<button data-action="${a}" ${disabled ? 'disabled' : ''}>${t}</button>`,
};

test('care stays manual by default and version 3 migration preserves active reservations, injuries and resources', () => {
  const s = guild();
  injure(s, 'ivo', 7);
  const uid = D.awardEquipment(s, 'shortSword');
  D.startWorkshopConversion(s, 'refitSword', uid);
  s.guild.version = 3;
  delete s.guild.carePolicy;
  const before = structuredClone(s),
    loaded = reload(s);
  before.guild.version = 6;
  before.guild.carePolicy = { mode: 'manual', priority: 'longest', reserve: 2 };
  before.guild.patterns = ['pattern_longSword'];
  assert.deepEqual(loaded, before);
  assert.deepEqual(reload(loaded), loaded);
  tick(loaded);
  assert.equal(loaded.guild.facilities.infirmary.project, null);
  assert.equal(loaded.guild.supplies, 4);
  assert.equal(loaded.roster[1].recovery, 6);
});

test('automatic care obeys either patient priority and charges only when a day actually starts work', () => {
  for (const [priority, expected] of [
    ['longest', 'bryn'],
    ['soonest', 'ivo'],
  ]) {
    const s = guild();
    injure(s, 'bryn', 7);
    injure(s, 'ivo', 4);
    D.setCarePolicy(s, 'auto', priority, 2);
    assert.equal(D.carePlan(s).next.id, expected);
    assert.equal(s.guild.supplies, 4);
    tick(s);
    assert.equal(s.guild.supplies, 3);
    assert.equal(s.guild.facilities.infirmary.project.patient, expected);
    assert.equal(s.guild.facilities.infirmary.project.progress, 1);
    assert.equal(s.gold, 500);
    assert.match(s.guild.dailySummary.lines.join('\n'), /automatic treatment started/);
  }
});

test('partial automatic treatment saves and resumes without charging twice or repeating its reward', () => {
  let s = guild();
  injure(s, 'bryn', 4);
  D.setCarePolicy(s, 'auto', 'longest', 2);
  tick(s);
  s = reload(s);
  assert.equal(s.guild.supplies, 3);
  tick(s);
  assert.equal(s.guild.supplies, 3);
  assert.equal(s.roster[0].status, 'home');
  assert.equal(s.guild.nextCompletion, 1);
  assert.equal(s.guild.facilities.infirmary.project, null);
  s = reload(s);
  tick(s, 4);
  assert.equal(s.guild.supplies, 3);
  assert.equal(s.guild.nextCompletion, 1);
});

test('protected supplies pause automatic starts, while a garden harvest can fund useful care on the same day', () => {
  const s = guild();
  const c = injure(s, 'bryn', 12);
  s.guild.supplies = 2;
  D.setCarePolicy(s, 'auto', 'longest', 2);
  tick(s);
  assert.equal(s.guild.facilities.infirmary.project, null);
  assert.equal(s.guild.supplies, 2);
  assert.match(s.guild.dailySummary.lines.join('\n'), /protected supply reserve reached/);
  D.setGardenPolicy(s, 'reserve', 4);
  tick(s, 3);
  assert.equal(s.guild.supplies, 2);
  assert.equal(s.guild.facilities.infirmary.project, null);
  tick(s);
  assert.equal(s.guild.supplies, 3);
  assert.equal(s.guild.facilities.infirmary.project.patient, c.id);
  assert.equal(s.guild.facilities.infirmary.project.progress, 1);
});

test('expeditions can use the protected reserve and do not wait for automatic care', () => {
  const s = guild();
  injure(s, 'ivo', 7);
  D.setCarePolicy(s, 'auto', 'longest', 4);
  D.dispatch(s, 'road', ['bryn'], { medicalKit: 'supplies' });
  assert.equal(s.guild.supplies, 2);
  tick(s);
  assert(s.missions[0].progress > 0);
  assert.equal(s.guild.facilities.infirmary.project, null);
  assert.equal(s.guild.supplies, 2);
});

test('manual treatment can deliberately use the reserve and does not alter automatic policy', () => {
  const s = guild();
  injure(s, 'bryn', 4);
  s.guild.supplies = 2;
  D.setCarePolicy(s, 'auto', 'longest', 2);
  D.startRoomProject(s, 'infirmary', 'treatment', 'bryn');
  assert.equal(s.guild.supplies, 1);
  tick(s, 2);
  assert.equal(s.roster[0].status, 'home');
  assert.equal(s.guild.supplies, 1);
  assert.deepEqual(s.guild.carePolicy, { mode: 'auto', priority: 'longest', reserve: 2 });
});

test('natural recovery, undead companions and unavailable rooms never cause ineffective automatic spending', () => {
  const cases = [
    (s) => {
      injure(s, 'bryn', 2);
    },
    (s) => {
      injure(s, 'bryn', 6).undead = true;
    },
    (s) => {
      injure(s, 'bryn', 6);
      s.damagedRooms = { garden: { day: s.day, cost: 30 } };
    },
  ];
  for (const setup of cases) {
    const s = guild();
    setup(s);
    D.setCarePolicy(s, 'auto', 'longest', 0);
    tick(s);
    assert.equal(s.guild.supplies, 4);
    assert.equal(s.guild.facilities.infirmary.project, null);
    assert.equal(s.guild.nextCompletion, 0);
  }
});

test('turning automatic care off or raising the reserve preserves paid work until it completes', () => {
  const s = guild();
  injure(s, 'bryn', 6);
  D.setCarePolicy(s, 'auto', 'longest', 2);
  tick(s);
  const project = structuredClone(s.guild.facilities.infirmary.project);
  D.setCarePolicy(s, 'manual', 'soonest', 10);
  assert.deepEqual(s.guild.facilities.infirmary.project, project);
  tick(s);
  assert.equal(s.guild.supplies, 3);
  assert.equal(s.guild.nextCompletion, 1);
  assert.equal(s.roster[0].recovery, 2);
  tick(s);
  assert.equal(s.guild.facilities.infirmary.project, null);
  assert.equal(s.guild.supplies, 3);
});

test('a worker leaving can cancel and refund an automatic course that no longer beats natural recovery', () => {
  const s = guild();
  injure(s, 'bryn', 2);
  D.assignWorker(s, 'infirmary', 'ivo');
  D.setCarePolicy(s, 'auto', 'longest', 2);
  // Reserve a course under the current plan, then send the worker away before the next day.
  D.startRoomProject(s, 'infirmary', 'treatment', 'bryn');
  D.dispatch(s, 'road', ['ivo']);
  tick(s);
  assert.equal(s.guild.supplies, 4);
  assert.equal(s.guild.facilities.infirmary.project, null);
  assert.equal(s.guild.nextCompletion, 0);
  assert.equal(s.roster[0].recovery, 1);
  assert.match(s.guild.dailySummary.lines.join('\n'), /cancelled and inputs refunded/);
});

test('automatic courses never treat their own worker for XP and reassess before repeating', () => {
  const s = guild();
  D.assignWorker(s, 'infirmary', 'bryn');
  injure(s, 'bryn', 6);
  D.setCarePolicy(s, 'auto', 'longest', 2);
  tick(s, 2);
  assert.equal(s.roster[0].recovery, 2);
  assert.equal(s.roster[0].xp, 0);
  assert.equal(s.guild.nextCompletion, 1);
  tick(s, 2);
  assert.equal(s.roster[0].status, 'home');
  assert.equal(s.roster[0].xp, 0);
  assert.equal(s.guild.supplies, 3);
  assert.equal(s.guild.nextCompletion, 1);
});

test('a treatment bed enables one useful completion per day and each new course respects the supply floor', () => {
  const s = guild();
  injure(s, 'bryn', 12);
  const bed = G.grantFurniture(s, 'treatmentBed');
  D.placeFurniture(s, 'infirmary', 'utility', bed.uid);
  D.assignWorker(s, 'infirmary', 'ivo');
  D.setCarePolicy(s, 'auto', 'longest', 2);
  tick(s);
  assert.equal(s.guild.supplies, 3);
  assert.equal(s.roster[1].xp, 5);
  assert.equal(s.guild.nextCompletion, 1);
  tick(s);
  assert.equal(s.guild.supplies, 2);
  assert.equal(s.roster[1].xp, 10);
  assert.equal(s.guild.nextCompletion, 2);
  tick(s);
  assert.equal(s.guild.supplies, 2);
  assert.equal(s.roster[1].xp, 10);
  assert.equal(s.guild.nextCompletion, 2);
  assert.equal(s.roster[1].visits, 0);
});

test('one-course forecasts match actual return days with Mara and with a fit assigned worker', () => {
  for (const [recovery, staffed] of [
    [3, false],
    [4, false],
    [7, false],
    [2, true],
    [5, true],
  ]) {
    const s = guild(),
      c = injure(s, 'bryn', recovery);
    if (staffed) D.assignWorker(s, 'infirmary', 'ivo');
    const forecast = D.treatmentForecast(s, c.id);
    assert(forecast.eligible);
    D.startRoomProject(s, 'infirmary', 'treatment', c.id);
    let elapsed = 0;
    while (c.status === 'injured' && elapsed < 20) {
      tick(s);
      elapsed++;
    }
    assert.equal(elapsed, forecast.homeDays);
    assert.equal(recovery - elapsed, forecast.savedDays);
  }
});

test('counterfactual care and worker forecasts explain useful staffing without mutating the patient or resources', () => {
  const s = guild();
  injure(s, 'bryn', 2);
  D.setCarePolicy(s, 'auto', 'longest', 2);
  const before = D.save(s);
  assert.equal(D.treatmentForecast(s, 'bryn').eligible, false);
  assert.equal(D.treatmentForecast(s, 'bryn', 'ivo').homeDays, 1);
  assert.equal(D.carePlan(s, 'ivo').next.id, 'bryn');
  assert.equal(D.projectForecast(s, 'infirmary', 'ivo').days, 1);
  assert.equal(D.projectForecast(s, 'infirmary', 'ivo').scope, 'treatment');
  assert.equal(D.save(s), before);
});

test('hospice and laboratory playthroughs use only their appropriate medical rooms for automatic care', () => {
  const s = guild();
  delete s.flags.hospice;
  s.flags.laboratory = true;
  injure(s, 'bryn', 6);
  assert.throws(() => D.setCarePolicy(s, 'auto', 'longest', 2), /Restore an infirmary/);
  s.flags.fenRoom2Ready = true;
  D.setCarePolicy(s, 'auto', 'longest', 2);
  assert.equal(D.facilitySite(s, 'infirmary'), 'fenRoom2');
  tick(s);
  assert.equal(s.guild.facilities.infirmary.project.patient, 'bryn');
  assert.equal(s.guild.supplies, 3);
  assert.equal(reload(s).flags.laboratory, true);
  assert.equal(s.flags.hospice, undefined);
});

test('invalid care policies fail atomically and corrupted version 4 policies are rejected on load', () => {
  const s = guild(),
    before = D.save(s);
  for (const [mode, priority, reserve] of [
    ['unknown', 'longest', 2],
    ['auto', 'unknown', 2],
    ['auto', 'longest', -1],
    ['auto', 'longest', 1.5],
    ['auto', 'longest', Number.MAX_SAFE_INTEGER],
  ])
    assert.throws(() => D.setCarePolicy(s, mode, priority, reserve));
  assert.equal(D.save(s), before);
  for (const corrupt of [
    (c) => {
      delete c.guild.carePolicy;
    },
    (c) => {
      c.guild.carePolicy.mode = 'always';
    },
    (c) => {
      c.guild.carePolicy.priority = 'random';
    },
    (c) => {
      c.guild.carePolicy.reserve = -1;
    },
  ]) {
    const copy = structuredClone(s);
    corrupt(copy);
    assert.throws(() => reload(copy), /guild-management/);
  }
});

test('overview and infirmary expose reserve conflicts, treatment benefits and unread automatic completions', () => {
  const s = guild();
  injure(s, 'bryn', 4);
  D.setCarePolicy(s, 'auto', 'longest', 2);
  D.setGardenPolicy(s, 'reserve', 2);
  const plan = D.carePlan(s);
  assert(plan.gardenConflict);
  assert.equal(plan.gardenTarget, 4);
  const overview = renderRooms(s, helpers, { section: 'overview' }),
    panel = renderRooms(s, helpers, { section: 'infirmary' });
  assert.match(overview, /Supply plan/);
  assert.match(overview, /cannot build a surplus/);
  assert.match(panel, /With treatment: 2 days · returns 2 days earlier/);
  assert.match(panel, /Set garden target · 4 supplies/);
  tick(s, 2);
  assert.equal(navigationNotices(s).Rooms.count, 2);
  acknowledgeNavigation(s, 'Rooms');
  assert.equal(navigationNotices(s).Rooms.count, 1);
  D.readPattern(s, 'pattern_longSword');
  assert.equal(navigationNotices(reload(s)).Rooms.count, 0);
});
