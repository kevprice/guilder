import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import * as G from './guild-management.js';
import { gainLevel } from './classes.js';
import { navigationNotices, acknowledgeNavigation } from './navigation-notices.js';
import { missionCategory, missionImpact } from './mission-categories.js';
import { renderRooms } from './room-panel.js';
import { furnishingZones, furnitureFootprints } from './guild-art.js';

function guild() {
  const s = D.initial({ opening: 'legacy' });
  s.flags.repaired = s.flags.garden = s.flags.hospice = s.flags.wallSurveyed = true;
  s.gold = 1000;
  s.guild.salvage = 100;
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  D.assignRoomWorker(s, 'service', 2, 'mara');
  D.assignRoomWorker(s, 'garden', 1, 'rowan');
  return s;
}
function tick(s, n = 1) {
  for (let i = 0; i < n; i++) {
    s.eventSeed = 97;
    D.day(s);
  }
}
function reload(s) {
  return D.load(D.save(s));
}
function finishTrip(s, uid) {
  let limit = 50;
  while (s.missions.find((m) => m.uid === uid).status === 'travelling' && limit--) tick(s);
  assert(limit > 0);
  return s.missions.find((m) => m.uid === uid);
}
function craft(s, id) {
  D.startRoomProject(s, 'workshop', id);
  while (s.guild.facilities.workshop.project) tick(s);
  return s.guild.furniture.at(-1)?.uid;
}

test('starting resources migrate exactly once without advancing old progress or altering gold and active missions', () => {
  const s = guild();
  D.dispatch(s, 'road', ['bryn'], true);
  delete s.guild;
  s.day = 30;
  s.flags.cleared_cells = s.flags.cleared_ratway = true;
  const before = structuredClone(s),
    loaded = reload(s);
  assert.equal(loaded.guild.salvage, 6);
  assert.equal(loaded.guild.supplies, 4);
  assert.equal(loaded.guild.furniture.length, 2);
  assert.equal(loaded.guild.facilities.garden.project, null);
  for (const key of ['gold', 'day', 'roster', 'missions', 'flags', 'choices'])
    assert.deepEqual(loaded[key], before[key]);
  loaded.guild.supplies = 0;
  const again = reload(loaded);
  assert.equal(again.guild.supplies, 0);
  assert.equal(again.guild.furniture.length, 2);
  assert.deepEqual(again, loaded);
});
test('facilities obey existing story unlocks and laboratory branch retains regional treatment', () => {
  const s = D.initial({ opening: 'legacy' });
  for (const f of D.facilities) assert.equal(D.facilitySite(s, f.id), null);
  s.flags.repaired = true;
  assert.equal(D.facilitySite(s, 'workshop'), 'service');
  s.flags.garden = s.flags.laboratory = true;
  assert.equal(D.facilitySite(s, 'garden'), 'garden');
  assert.equal(D.facilitySite(s, 'infirmary'), null);
  s.flags.fenRoom2Ready = true;
  assert.equal(D.facilitySite(s, 'infirmary'), 'fenRoom2');
  assert.equal(reload(s).flags.laboratory, true);
  assert.equal(s.flags.hospice, undefined);
});
test('Mara crafts and crops while adventurers are away, with no offline work or mandatory supplies', () => {
  const s = guild();
  s.guild.salvage = 6;
  s.guild.supplies = 0;
  D.startRoomProject(s, 'workshop', 'shortSword');
  D.dispatch(s, 'road', ['bryn', 'ivo']);
  const saved = reload(s);
  assert.equal(saved.guild.facilities.workshop.project.progress, 0);
  tick(saved, 4);
  assert.equal(saved.inventory.filter((i) => i.id === 'shortSword').length, 1);
  assert.equal(saved.guild.supplies, 2);
  assert(saved.scenes.some((x) => x.equipmentRewards?.includes('shortSword')));
  tick(saved, 4);
  assert.equal(saved.guild.supplies, 4);
  assert.equal(reload(saved).inventory.filter((i) => i.id === 'shortSword').length, 1);
});
test('worker bonuses use effective stats, pause and resume, and assignments move between rooms', () => {
  const s = guild(),
    c = s.roster[0];
  D.assignWorker(s, 'workshop', c.id);
  assert.equal(D.dailyWork(s, 'workshop'), 2);
  c.str = 10;
  assert.equal(D.dailyWork(s, 'workshop'), 3);
  D.dispatch(s, 'road', [c.id]);
  assert.equal(D.dailyWork(s, 'workshop'), 1);
  assert.equal(reload(s).guild.facilities.workshop.worker, c.id);
  finishTrip(s, s.missions.at(-1).uid);
  while (c.status === 'injured') tick(s);
  assert.equal(D.dailyWork(s, 'workshop'), 3);
  D.assignWorker(s, 'garden', c.id);
  assert.equal(s.guild.facilities.workshop.worker, null);
  assert.equal(s.guild.facilities.garden.worker, c.id);
  c.injury = 4;
  D.applyHarm(s, c, { name: 'test threat', lethal: true, injuryDays: 1 });
  assert.equal(s.guild.facilities.garden.worker, null);
});
test('a companion’s permanent farewell clears their room assignment and survives save/load', () => {
  const s = guild(),
    c = s.roster[0];
  while (c.level < 16) gainLevel(c);
  s.flags.brynResolved = s.flags.free = true;
  for (const stage of [1, 2, 3]) s.flags['companionStage' + stage + '_bryn'] = true;
  D.recoverRecord(s, 'home-bryn');
  D.assignWorker(s, 'workshop', c.id);
  D.narrativeChoice(s, 'homecoming-bryn', 'release');
  assert.equal(c.status, 'departed');
  assert.equal(s.guild.facilities.workshop.worker, null);
  assert.equal(reload(s).guild.facilities.workshop.worker, null);
});
test('staffed completion grants 5 XP without expedition visits; cancellation grants none', () => {
  const s = guild(),
    c = s.roster[0];
  c.str = 10;
  D.assignWorker(s, 'workshop', c.id);
  D.startRoomProject(s, 'workshop', 'shortSword');
  tick(s);
  const before = { xp: c.xp, visits: c.visits };
  tick(s);
  assert.equal(c.xp, before.xp + 5);
  assert.equal(c.visits, before.visits);
  assert.equal(s.guild.homeXP.workers.filter((id) => id === c.id).length, 1);
  D.startRoomProject(s, 'workshop', 'buckler');
  const stocks = { gold: s.gold, salvage: s.guild.salvage };
  const mid = reload(s);
  D.cancelRoomProject(mid, 'workshop');
  assert.equal(mid.gold, stocks.gold + 15);
  assert.equal(mid.guild.salvage, stocks.salvage + 4);
  assert.equal(mid.roster[0].xp, c.xp);
  assert.throws(() => D.cancelRoomProject(mid, 'workshop'));
});
test('project input costs and purchases are atomic, upgrades charge once, and tier 2 adds work', () => {
  const s = guild();
  s.guild.salvage = 0;
  const before = D.save(s);
  assert.throws(() => D.startRoomProject(s, 'workshop', 'shortSword'));
  assert.equal(D.save(s), before);
  D.buyResources(s, 'salvage');
  assert.equal(s.gold, 940);
  assert.equal(s.guild.salvage, 4);
  D.buyResources(s, 'supplies');
  assert.equal(s.gold, 925);
  assert.equal(s.guild.supplies, 6);
  D.buyResources(s, 'salvage');
  D.upgradeFacility(s, 'workshop');
  assert.equal(s.gold, 825);
  assert.equal(s.guild.salvage, 2);
  assert.equal(D.dailyWork(s, 'workshop'), 2);
  assert.throws(() => D.upgradeFacility(s, 'workshop'));
  assert.equal(reload(s).guild.facilities.workshop.tier, 2);
});
test('furniture is a physical reusable object and utility swaps require finishing or cancelling', () => {
  const s = guild();
  s.guild.blueprints.push('mill');
  const forge = craft(s, 'forge');
  D.placeFurniture(s, 'workshop', 'utility', forge);
  assert.equal(D.dailyWork(s, 'workshop', D.projectRecipe(s, 'workshop', 'shortSword')), 2);
  D.startRoomProject(s, 'workshop', 'shortSword');
  assert.throws(() => D.placeFurniture(s, 'workshop', 'utility', null), /cancel/);
  D.cancelRoomProject(s, 'workshop');
  D.placeFurniture(s, 'workshop', 'utility', null);
  const banner = craft(s, 'banner');
  D.placeFurniture(s, 'workshop', 'decoration0', banner);
  assert.throws(() => D.placeFurniture(s, 'garden', 'decoration0', banner), /Remove/);
  D.placeFurniture(s, 'workshop', 'decoration0', null);
  D.placeFurniture(s, 'garden', 'decoration1', banner);
  assert.equal(reload(s).guild.facilities.garden.decorations[1], banner);
  assert.equal(s.guild.furniture.filter((i) => i.uid === banner).length, 1);
});
test('all utility furniture effects and blueprint equipment retain the promised costs and bonuses', () => {
  const s = guild();
  assert.throws(() => D.startRoomProject(s, 'workshop', 'longSword'), /blueprint/);
  s.guild.blueprints.push('mill', 'tower', 'drains');
  const outfitter = craft(s, 'outfitter');
  D.placeFurniture(s, 'workshop', 'utility', outfitter);
  assert.equal(D.projectRecipe(s, 'workshop', 'softShoes').salvage, 2);
  assert.equal(D.projectRecipe(s, 'workshop', 'shortSword').salvage, 6);
  D.startRoomProject(s, 'workshop', 'leatherArmour');
  assert.deepEqual(s.guild.facilities.workshop.project.inputs, {
    gold: 70,
    salvage: 11,
    supplies: 0,
  });
  tick(s, 6);
  assert(s.inventory.some((i) => i.id === 'leatherArmour' && !i.owner));
  const beds = craft(s, 'raisedBeds');
  if (s.guild.facilities.garden.project) D.cancelRoomProject(s, 'garden');
  D.placeFurniture(s, 'garden', 'utility', beds);
  const supplies = s.guild.supplies;
  tick(s, 4);
  assert.equal(s.guild.supplies, supplies + 3);
  const cloche = craft(s, 'cloche');
  if (s.guild.facilities.garden.project) D.cancelRoomProject(s, 'garden');
  D.placeFurniture(s, 'garden', 'utility', null);
  D.placeFurniture(s, 'garden', 'utility', cloche);
  assert.equal(D.projectRecipe(s, 'garden', 'crop').work, 3);
  const bed = craft(s, 'treatmentBed');
  D.placeFurniture(s, 'infirmary', 'utility', bed);
  assert.equal(D.projectRecipe(s, 'infirmary', 'treatment').work, 1);
  const cabinet = craft(s, 'medicalCabinet');
  D.placeFurniture(s, 'infirmary', 'utility', null);
  D.placeFurniture(s, 'infirmary', 'utility', cabinet);
  assert.equal(D.medicalKitSupplyCost(s), 1);
  assert.deepEqual(reload(s), s);
});
test('treatment beats natural recovery, refuses ineffective patients and refunds when no longer useful', () => {
  const s = guild(),
    c = s.roster[0];
  c.status = 'injured';
  c.injury = 2;
  c.recovery = 4;
  D.assignRoomWorker(s, 'hospice', 1, 'rowan');
  D.startRoomProject(s, 'infirmary', 'treatment', c.id);
  const mid = reload(s);
  tick(mid, 2);
  assert.equal(mid.roster[0].recovery, 0);
  assert.equal(mid.roster[0].status, 'home');
  assert.equal(mid.guild.supplies, 3);
  const before = D.save(mid);
  assert.throws(() => D.startRoomProject(mid, 'infirmary', 'treatment', c.id), /natural recovery/);
  assert.equal(D.save(mid), before);
  c.recovery = 2;
  assert.equal(D.eligiblePatients(s).length, 0);
  c.recovery = 4;
  // A restoration spell or another action may make a reserved treatment unnecessary.
  c.status = 'home';
  c.injury = c.recovery = 0;
  const supply = s.guild.supplies;
  tick(s);
  assert.equal(s.guild.supplies, supply + 1);
  assert.equal(s.guild.facilities.infirmary.project, null);
});
test('medical kits preserve boolean callers and support supply payments without double charges', () => {
  for (const [option, gold, supplies] of [
    [true, 990, 4],
    [false, 1000, 4],
    [{ medicalKit: 'supplies' }, 1000, 2],
  ]) {
    const s = guild();
    D.dispatch(s, 'road', ['bryn'], option);
    assert.equal(s.gold, gold);
    assert.equal(s.guild.supplies, supplies);
    assert.equal(reload(s).missions[0].kits, option === false ? 0 : 1);
  }
  const s = guild();
  s.guild.supplies = 0;
  const before = D.save(s);
  assert.throws(() => D.dispatch(s, 'road', ['bryn'], { medicalKit: 'supplies' }));
  assert.equal(D.save(s), before);
});
test('treatment refunds inputs if a worker leaving makes it no faster than natural recovery', () => {
  const s = guild(),
    [patient, worker] = s.roster;
  patient.status = 'injured';
  patient.injury = 1;
  patient.recovery = 2;
  D.assignWorker(s, 'infirmary', worker.id);
  D.assignRoomWorker(s, 'hospice', 1, 'rowan');
  D.startRoomProject(s, 'infirmary', 'treatment', patient.id);
  D.dispatch(s, 'road', [worker.id]);
  tick(s);
  assert.equal(s.guild.facilities.infirmary.project, null);
  assert.equal(s.guild.supplies, 4);
  assert.equal(patient.recovery, 1);
  assert.equal(patient.xp, 0);
});
test('a patient cannot receive home-work XP for treating themselves while unavailable', () => {
  const s = guild(),
    patient = s.roster[0];
  D.assignWorker(s, 'infirmary', patient.id);
  patient.status = 'injured';
  patient.injury = 2;
  patient.recovery = 3;
  D.assignRoomWorker(s, 'hospice', 1, 'rowan');
  D.startRoomProject(s, 'infirmary', 'treatment', patient.id);
  tick(s, 2);
  assert.equal(patient.status, 'home');
  assert.equal(patient.xp, 0);
});
test('surveys register correct targets, unlocks, categories and a safe persisted first-day decision', () => {
  assert.deepEqual(D.validateContent(), []);
  const s = guild();
  assert(D.availableContracts(s).some((d) => d.id === 'survey_mill'));
  assert(!D.availableContracts(s).some((d) => d.id === 'survey_drains'));
  s.flags.searched_sluice = s.flags.tower = true;
  for (const area of G.expeditionAreas) {
    const d = D.contracts.find((d) => d.id === 'survey_' + area.id);
    assert.equal(missionCategory(d), 'survey');
    assert.match(missionImpact(d).impact, /does not advance/);
    assert.equal(D.profiles[d.id].amount, area.target);
  }
  D.dispatch(s, 'survey_mill', ['bryn']);
  tick(s);
  const uid = s.missions[0].uid;
  assert(s.missions[0].pendingEvent);
  const loaded = reload(s),
    m = loaded.missions[0],
    progress = m.progress,
    harm = m.harm.length;
  D.startRoomProject(loaded, 'workshop', 'shortSword');
  D.dispatch(loaded, 'road', ['ivo']);
  tick(loaded, 4);
  assert.equal(m.progress, progress);
  assert.equal(m.harm.length, harm);
  assert.equal(m.elapsed, 1);
  assert(loaded.inventory.some((i) => i.id === 'shortSword'));
  assert(loaded.missions.find((m) => m.id === 'road').status !== 'travelling');
  D.resolveExpeditionDecision(loaded, uid, 'normal');
  finishTrip(loaded, uid);
  assert.equal(m.status, 'resolved');
  assert.deepEqual(m.resourceRewards, { salvage: 2, supplies: 1 });
  assert(loaded.guild.blueprints.includes('mill'));
  assert(!D.availableContracts(loaded).some((d) => d.id === 'survey_mill'));
  assert(D.availableContracts(loaded).some((d) => d.id === 'salvage_mill'));
  assert.throws(() => D.resolveExpeditionDecision(loaded, uid, 'normal'));
  assert.equal(reload(loaded).guild.blueprints.filter((id) => id === 'mill').length, 1);
});
test('supply decisions and salvage bonuses are itemized, applied once and respect the two-day cooldown', () => {
  const s = guild();
  s.flags.surveyed_mill = true;
  s.roster[0].agi = 10;
  D.dispatch(s, 'salvage_mill', ['bryn']);
  tick(s);
  const uid = s.missions[0].uid,
    supply = s.guild.supplies;
  D.resolveExpeditionDecision(s, uid, 'supply');
  assert.equal(s.guild.supplies, supply - 1);
  const loaded = reload(s),
    m = finishTrip(loaded, uid);
  assert.deepEqual(m.resourceRewards, { salvage: 6, supplies: 0 });
  assert.match(loaded.reports[0].text, /spent 1 supply/);
  assert.match(loaded.reports[0].text, /6 scrap/);
  assert(!D.availableContracts(loaded).some((d) => d.id === 'salvage_mill'));
  tick(loaded);
  assert(!D.availableContracts(loaded).some((d) => d.id === 'salvage_mill'));
  tick(loaded);
  assert(D.availableContracts(loaded).some((d) => d.id === 'salvage_mill'));
  assert.equal(reload(loaded).guild.salvage, 106);
});
test('stat-dependent decisions show exact risk, avoid harm above threshold and can inflict one nonlethal event below', () => {
  for (const [agi, seed, hits] of [
    [6, 1, 0],
    [2, 1, 1],
    [2, 3, 0],
  ]) {
    const s = guild();
    s.roster[0].agi = agi;
    D.dispatch(s, 'survey_mill', ['bryn']);
    s.seed = 3;
    tick(s);
    const m = s.missions[0],
      before = m.harm.length;
    assert.match(
      D.expeditionDecision(s, m.uid).options[2].label,
      agi >= 6 ? /0% extra/ : /20% extra/,
    );
    s.seed = seed;
    D.resolveExpeditionDecision(s, m.uid, 'risk');
    assert.equal(m.harm.length - before, hits);
    assert.notEqual(s.roster[0].status, 'dead');
    assert.deepEqual(reload(s), s);
  }
});
test('withdrawal from a waiting trip clears the decision, pays no reward and can be retried', () => {
  const s = guild();
  D.dispatch(s, 'survey_mill', ['bryn']);
  tick(s);
  const uid = s.missions[0].uid,
    salvage = s.guild.salvage;
  D.withdraw(s, uid);
  assert.equal(s.missions[0].pendingEvent, false);
  const loaded = reload(s);
  tick(loaded);
  assert.equal(loaded.missions[0].status, 'withdrawn');
  assert.equal(loaded.guild.salvage, salvage);
  assert.equal(loaded.guild.blueprints.length, 0);
  assert(D.availableContracts(loaded).some((d) => d.id === 'survey_mill'));
});
test('no supplies disables only the paid bonus option, and a normal survey can still finish', () => {
  const s = guild();
  s.guild.supplies = 0;
  D.dispatch(s, 'survey_mill', ['bryn']);
  tick(s);
  const uid = s.missions[0].uid;
  assert.equal(D.expeditionDecision(s, uid).options[1].disabled, true);
  const before = D.save(s);
  assert.throws(() => D.resolveExpeditionDecision(s, uid, 'supply'));
  assert.equal(D.save(s), before);
  D.resolveExpeditionDecision(s, uid, 'normal');
  finishTrip(s, uid);
  assert.deepEqual(s.missions[0].resourceRewards, { salvage: 2, supplies: 1 });
});
test('navigation notices expose pending choices and newly completed projects until read', () => {
  const s = guild();
  acknowledgeNavigation(s, 'Contracts');
  assert.equal(navigationNotices(s).Contracts.count, 0);
  D.dispatch(s, 'survey_mill', ['bryn']);
  tick(s);
  assert.equal(navigationNotices(s).Contracts.count, 1);
  tick(s, 3);
  assert(navigationNotices(s).Rooms.count > 0);
  acknowledgeNavigation(s, 'Rooms');
  assert.equal(navigationNotices(s).Rooms.count, 0);
  assert.equal(reload(s).guild.readCompletion, s.guild.nextCompletion);
});
test('trophies are awarded after actual guardian defeats and not by resource expeditions', () => {
  const s = guild();
  s.flags.discovered_cells = true;
  s.roster[0].str = s.roster[0].end = 40;
  D.dispatch(s, 'jailer', ['bryn']);
  finishTrip(s, s.missions[0].uid);
  assert.equal(s.guild.furniture.filter((i) => i.id === 'jailerFaceplate').length, 1);
  assert(s.scenes.some((n) => n.guildRewards?.includes('jailerFaceplate')));
  assert.equal(reload(s).guild.furniture.length, 1);
  assert.equal(s.flags.cleared_ratway, undefined);
});
test('malformed projects, duplicate furniture placement and invalid pending decisions are rejected', () => {
  const s = guild();
  D.startRoomProject(s, 'workshop', 'shortSword');
  for (const mutate of [
    (s) => (s.guild.salvage = -1),
    (s) => (s.guild.facilities.workshop.project.inputs.gold = 999),
    (s) => (s.guild.facilities.workshop.project.work = 1),
    (s) => (s.guild.facilities.garden.worker = 'missing'),
    (s) => (s.guild.readCompletion = 10),
  ]) {
    const bad = structuredClone(s);
    mutate(bad);
    assert.throws(() => reload(bad), /guild-management/);
  }
  const banner = G.grantFurniture(s, 'banner');
  s.guild.facilities.workshop.decorations[0] = banner.uid;
  s.guild.facilities.garden.decorations[0] = banner.uid;
  assert.throws(() => reload(s), /guild-management/);
  const trip = guild();
  D.dispatch(trip, 'survey_mill', ['bryn']);
  tick(trip);
  trip.missions[0].eventChoice = { id: 'duplicate', bonus: true, day: trip.day, harmed: false };
  assert.throws(() => reload(trip), /development expedition/);
});
test('Rooms panel covers locked facilities and furnishing zones reserve story interaction areas', () => {
  const helpers = {
    esc: String,
    card: (t, b) => '<h3>' + t + '</h3>' + b,
    btn: (t) => '<button>' + t + '</button>',
  };
  const initial = renderRooms(D.initial({ opening: 'legacy' }), helpers);
  assert.match(initial, /Workshop · Unavailable/);
  const s = guild(),
    html = renderRooms(s, helpers);
  assert.match(html, /Lead worker/);
  assert.match(html, /Utility/);
  assert.match(html, /Decoration 2/);
  const zones = furnishingZones(s, D.rooms),
    garden = zones.filter((z) => z.site === 'garden');
  assert.equal(garden.length, 2);
  assert(garden[0].x >= garden[1].x + garden[1].w || garden[1].x >= garden[0].x + garden[0].w);
  for (const z of zones) {
    assert(z.y > 230 && z.y + z.h < 319); // labels above; doors, stairs and interactions below.
  }
  const overlaps = (a, b) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  const reserved = [
    { x: 758, y: 300, w: 48, h: 82 }, // Store door and its label.
    { x: 850, y: 319, w: 50, h: 61 }, // Ledger.
    { x: 924, y: 297, w: 30, h: 85 }, // Landing fitting and label.
    { x: 1555 + 125, y: 335, w: 40, h: 55 }, // Greenhouse story interaction.
  ];
  for (const z of zones)
    for (const footprint of furnitureFootprints(z))
      assert(!reserved.some((r) => overlaps(footprint, r)));
});
