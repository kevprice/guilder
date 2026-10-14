import { acknowledgeNavigation } from './navigation-notices.js';
import { householdScenario } from './tools/household-scenario.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import * as X from './expeditions.js';
import * as G from './guild-management.js';
import { crewContribution } from './workforce.js';
import { recordRelationship, affinity } from './household-social.js';
import { gainLevel, awardExperience } from './classes.js';
import { renderExpeditions, renderBestiary } from './expedition-ui.js';
import { roomProduction } from './production-view.js';
import { workerActivity } from './house-art.js';
const reload = (s) => D.load(D.save(s));
function tick(s, n = 1) {
  for (let i = 0; i < n; i++) {
    s.eventSeed = 97;
    D.day(s);
  }
}
function finish(s, uid, max = 35) {
  for (
    let i = 0;
    i < max &&
    !['resolved', 'failed', 'joined'].includes(
      s.outside.operations.find((o) => o.uid === uid).phase,
    );
    i++
  ) {
    const o = s.outside.operations.find((o) => o.uid === uid);
    if (o.pending) D.orderExpedition(s, uid, 'guard');
    tick(s);
  }
  return s.outside.operations.find((o) => o.uid === uid);
}
function seedFor(predicate) {
  for (let n = 1; n < 1000; n++) if (predicate(((n * 16807) % 2147483647) % 100)) return n;
  throw Error('No seed');
}
function forceSpot(s, uid) {
  const o = s.outside.operations.find((o) => o.uid === uid);
  o.rng = seedFor(
    (n) =>
      n <
      X.detectionChance(
        s,
        o.site,
        o.party.map((id) => s.roster.find((c) => c.id === id)),
      ),
  );
}
function safeScout(s) {
  const uid = D.dispatchExpedition(s, 'briarHollow', 'scout', ['nell']);
  s.outside.operations.at(-1).rng = seedFor(
    (n) => n >= X.detectionChance(s, 'briarHollow', [s.roster[2]]),
  );
  tick(s, 3);
  assert.equal(s.outside.operations.find((o) => o.uid === uid).outcome, 'scouted');
  return uid;
}
function research(s) {
  D.assignRoomWorker(s, 'tower', 0, 'ivo');
  D.startResearch(s, 'briarStag');
  for (let i = 0; i < 12 && s.outside.research; i++) tick(s);
  assert.equal(s.outside.bestiary.briarStag.tier, 1);
}
const helpers = {
  esc: String,
  btn: (t, a, d) => `<button data-action="${a}" ${d ? 'disabled' : ''}>${t}</button>`,
};

test('a new guild has a ready core, three complementary residents and an immediately fundable scout', () => {
  const s = D.initial();
  assert.deepEqual(
    s.roster.map((c) => c.type),
    ['warrior', 'mage', 'scout'],
  );
  assert(s.household.rooms.includes('tower'));
  assert(G.facilityAvailable(s, 'workshop'));
  assert(G.facilityAvailable(s, 'infirmary'));
  assert(!s.flags.truth);
  assert(!s.flags.dragonSlain);
  const uid = D.dispatchExpedition(s, 'briarHollow', 'scout', ['nell']);
  assert.equal(s.guild.supplies, 3);
  assert.equal(s.roster[2].status, 'away');
  assert.equal(reload(s).outside.operations[0].uid, uid);
});

test('unknown mission previews and dossier UI do not reveal saved danger, opponents or weaknesses', () => {
  const s = D.initial(),
    before = structuredClone(s);
  const p = D.expeditionPreview(s, 'briarHollow', 'scout', ['nell']);
  assert.equal(p.intel, null);
  assert(!('danger' in p));
  assert(!('vigilance' in p));
  assert(!('count' in p));
  assert(!('rng' in p));
  assert.equal(D.dossier(s, 'briarStag').known, false);
  const html = renderExpeditions(s, helpers);
  assert.match(html, /Threat: unknown/);
  assert(!html.includes('Vulnerable to fire'));
  assert(!html.includes('Briar stag'));
  assert.deepEqual(s, before);
});

test('scouting uses the weakest infiltrator; equally skilled numbers and explicit armour noise increase exposure', () => {
  const s = D.initial(),
    n = s.roster[2],
    peer = { ...structuredClone(n), id: 'peer' };
  assert(X.detectionChance(s, 'oldPatrol', [n, peer]) > X.detectionChance(s, 'oldPatrol', [n]));
  const noisy = {
    ...structuredClone(n),
    equipmentSlots: { body: { id: 'stoneMail', uid: 'one' } },
  };
  assert(X.infiltration([noisy]).noise === 8);
  assert(X.detectionChance(s, 'oldPatrol', [noisy]) > X.detectionChance(s, 'oldPatrol', [n]));
  assert(
    X.detectionChance(s, 'oldPatrol', [n, s.roster[0]]) > X.detectionChance(s, 'oldPatrol', [n]),
  );
  const without = { ...structuredClone(n), skills: [] };
  assert(X.infiltration([without]).capability < X.infiltration([n]).capability);
});

test('saved occupants and the next detection outcome persist through reload without rerolling', () => {
  const s = D.initial(),
    uid = D.dispatchExpedition(s, 'oldPatrol', 'scout', ['nell']);
  const copy = reload(s);
  assert.deepEqual(copy.outside.sites, s.outside.sites);
  tick(s);
  tick(copy);
  assert.deepEqual(copy.outside.operations, s.outside.operations);
  assert.equal(copy.outside.operations[0].uid, uid);
});

test('detection requires orders before any home production, time or harm can advance', () => {
  const s = D.initial(),
    uid = D.dispatchExpedition(s, 'oldPatrol', 'scout', ['bryn', 'ivo']);
  forceSpot(s, uid);
  tick(s);
  assert.equal(s.outside.operations[0].phase, 'detected');
  assert(s.roster.every((c) => !c.injury));
  const before = structuredClone(s);
  assert.throws(() => D.day(s), /Choose retreat/);
  assert.deepEqual(s, before);
  D.orderExpedition(s, uid, 'hide');
  assert(!D.pendingOrders(s).length);
  const day = s.day;
  tick(s);
  assert.equal(s.day, day + 1);
});

test('interrupted reconnaissance returns partial information without objective rewards', () => {
  const s = D.initial(),
    uid = D.dispatchExpedition(s, 'briarHollow', 'scout', ['bryn']);
  forceSpot(s, uid);
  tick(s);
  D.orderExpedition(s, uid, 'retreat');
  tick(s);
  const o = s.outside.operations[0];
  assert.equal(o.phase, 'resolved');
  assert.equal(o.outcome, 'withdrawn');
  assert(s.outside.intel.briarHollow.picture);
  assert.equal(s.outside.intel.briarHollow.complete, false);
  assert.equal(D.resourceStock(s, 'briarHorn'), 0);
  assert.equal(s.gold, 100);
  assert.equal(s.roster[0].status, 'home');
  assert(!D.dossier(s, 'briarStag').sketch);
  assert.deepEqual(reload(s).outside, s.outside);
});

test('quiet scouting supplies research evidence, and research pauses alchemy without losing its progress', () => {
  const s = D.initial();
  safeScout(s);
  assert(s.outside.intel.briarHollow.complete);
  assert(D.dossier(s, 'briarStag').sketch);
  assert.equal(D.resourceStock(s, 'briarSample'), 1);
  D.assignRoomWorker(s, 'tower', 0, 'ivo');
  tick(s);
  const progress = s.guild.house.rooms.tower.progress,
    stock = D.resourceStock(s, 'aether');
  D.startResearch(s, 'briarStag');
  assert.equal(
    workerActivity(
      s,
      s.roster[1],
      D.workerStation(
        D.houseRooms.find((r) => r.id === 'tower'),
        0,
      ),
    ),
    'study',
  );
  while (s.outside.research) tick(s);
  assert.equal(s.guild.house.rooms.tower.progress, progress);
  assert.equal(D.resourceStock(s, 'aether'), stock);
  assert(D.dossier(s, 'briarStag').traits.includes('Vulnerable to fire'));
  assert.match(renderBestiary(s, helpers), /Vulnerable to fire/);
  assert.equal(s.outside.bestiary.briarStag.tier, 1);
  assert.equal(reload(s).outside.bestiary.briarStag.tier, 1);
  tick(s);
  assert.notEqual(s.guild.house.rooms.tower.progress, progress);
});

test('research pauses for absent, injured or undead researchers and refunded advanced specimens return exactly once', () => {
  const s = D.initial();
  safeScout(s);
  research(s);
  const samples = D.resourceStock(s, 'briarSample');
  D.startResearch(s, 'briarStag');
  assert.equal(D.resourceStock(s, 'briarSample'), samples - 1);
  s.roster[1].injury = 1;
  assert.equal(D.researchForecast(s).total, 0);
  const p = structuredClone(s.outside.research);
  tick(s);
  assert.deepEqual(s.outside.research, p);
  s.roster[1].injury = 0;
  D.cancelResearch(s);
  assert.equal(D.resourceStock(s, 'briarSample'), samples);
  assert.throws(() => D.cancelResearch(s));
  assert.equal(D.resourceStock(s, 'briarSample'), samples);
  D.startResearch(s, 'briarStag');
  while (s.outside.research) tick(s);
  assert.equal(D.dossier(s, 'briarStag').tier, 2);
});

test('a fire counter works before research and preparation consumption and refunds are exact', () => {
  const s = D.initial();
  D.awardEquipment(s, 'ashStaff', 'Starter');
  D.enterStore(s, 'ivo');
  D.equipItem(s, 'ivo', s.inventory[0].uid);
  D.leaveStore(s);
  const uid = D.dispatchExpedition(s, 'briarHollow', 'assault', ['bryn', 'ivo']);
  const o = s.outside.operations[0];
  assert(X.combatAssessment(s, o).counter);
  assert(!D.dossier(s, 'briarStag').known);
  const counter = X.combatAssessment(s, o);
  s.roster[1].equipmentSlots = {};
  const bare = X.combatAssessment(s, o);
  assert(counter.rate > bare.rate);
  assert(counter.harmChance < bare.harmChance);
  D.resourceStock(s, 'flameKit'); // State is an explicit loadout fixture, not a progression grant.
});

test('a won hunt credits one horn to shared stores before the residents return, never twice after reload', () => {
  let s = D.initial();
  s.guild.house.materials.flameKit = 1;
  const uid = D.dispatchExpedition(s, 'briarHollow', 'assault', ['bryn', 'ivo', 'nell'], {
    fire: true,
    medical: true,
  });
  for (let i = 0; i < 25 && s.outside.operations[0].phase !== 'returning'; i++) tick(s);
  assert.equal(s.outside.operations[0].phase, 'returning');
  assert.equal(D.resourceStock(s, 'briarHorn'), 1);
  assert(s.roster.some((c) => c.status === 'away'));
  assert.equal(s.gold, 130);
  s = reload(s);
  tick(s);
  assert.equal(s.outside.operations[0].phase, 'resolved');
  const before = { horn: D.resourceStock(s, 'briarHorn'), gold: s.gold, reports: s.reports.length };
  s = reload(s);
  tick(s, 3);
  assert.equal(D.resourceStock(s, 'briarHorn'), before.horn);
  assert.equal(s.gold, before.gold);
  assert.equal(s.reports.filter((r) => r.operation === uid).length, 1);
});

test('hiding faces danger before extraction reinforcements arrive, and survivor/rescuer memories are stronger', () => {
  let s = D.initial(),
    uid = D.dispatchExpedition(s, 'oldPatrol', 'scout', ['nell']);
  forceSpot(s, uid);
  tick(s);
  D.orderExpedition(s, uid, 'hide');
  const o = s.outside.operations[0];
  o.rng = seedFor((n) => n < Math.max(5, X.detectionChance(s, 'oldPatrol', [s.roster[2]]) - 15));
  const rescue = D.reinforceExpedition(s, uid, ['bryn', 'ivo'], 'extract', { medical: true });
  assert.equal(s.outside.operations[1].phase, 'outbound');
  s = reload(s);
  tick(s);
  const events = s.outside.events;
  assert(
    events.findIndex((e) => e.type === 'found') < events.findIndex((e) => e.type === 'reinforced'),
  );
  assert.equal(s.outside.operations[0].phase, 'returning');
  assert.equal(s.outside.operations[1].phase, 'joined');
  assert.equal(s.outside.operations[0].outcome, 'rescued');
  assert.equal(s.roster[2].injury, 1);
  tick(s);
  assert.equal(affinity(s, 'bryn', 'nell'), 10);
  assert.equal(affinity(s, 'ivo', 'nell'), 10);
  assert.equal(s.outside.operations.find((o) => o.uid === rescue).refunded, true);
  assert.equal(s.guild.supplies, 1);
  assert.deepEqual(reload(s).outside, s.outside);
});

test('reinforcing to complete turns the original operation into one rewarded mission without duplicate actor ownership', () => {
  const s = D.initial(),
    uid = D.dispatchExpedition(s, 'oldPatrol', 'scout', ['nell']);
  forceSpot(s, uid);
  tick(s);
  D.orderExpedition(s, uid, 'guard');
  D.reinforceExpedition(s, uid, ['bryn', 'ivo'], 'assault');
  tick(s);
  assert.equal(s.outside.operations[0].intent, 'assault');
  assert.deepEqual(new Set(s.outside.operations[0].party), new Set(['nell', 'bryn', 'ivo']));
  finish(s, uid);
  assert.equal(s.outside.operations[0].outcome, 'success');
  assert.equal(
    s.outside.events.filter((e) => e.type === 'reward' && e.operation === uid).length,
    1,
  );
  assert.equal(s.reports.filter((r) => r.operation === uid).length, 1);
  assert.equal(reload(s).outside.operations[1].phase, 'joined');
});

test('crew affinity is explained, capped by room, ignores zombies and changes once per pair per work day', () => {
  const s = D.initial();
  D.assignRoomWorker(s, 'service', 0, 'bryn');
  D.assignRoomWorker(s, 'service', 1, 'ivo');
  recordRelationship(s, 'test-friend', ['bryn', 'ivo'], 25, 'Trusted each other after a rescue.');
  assert.equal(G.workBreakdown(s, 'workshop').relationship, 1);
  const rate = G.dailyWork(s, 'workshop');
  recordRelationship(
    s,
    'test-fallout',
    ['bryn', 'ivo'],
    -50,
    'A failed expedition strained their trust.',
  );
  assert.equal(G.workBreakdown(s, 'workshop').relationship, -1);
  assert.equal(G.dailyWork(s, 'workshop'), rate - 2);
  assert.equal(reload(s).social.pairs['bryn:ivo'].affinity, -25);
  const before = affinity(s, 'bryn', 'ivo');
  D.startRoomProject(s, 'workshop', 'banner');
  tick(s, 2);
  assert.equal(affinity(s, 'bryn', 'ivo'), before + 1);
  assert.equal(s.social.applied.filter((id) => id === 'work:' + s.day + ':bryn:ivo').length, 1);
});

test('same-crew necromancy triples at most two zombie contributions and never improves combat or watch', () => {
  const caster = {
    id: 'n',
    name: 'Caster',
    str: 3,
    int: 20,
    agi: 4,
    end: 4,
    status: 'home',
    skills: [],
    specialisation: 'necromancer',
    talents: [],
    injury: 0,
  };
  const zombies = Array.from({ length: 3 }, (_, i) => ({
    id: 'z' + i,
    name: 'Echo',
    str: 8,
    int: 1,
    agi: 2,
    end: 10,
    status: 'home',
    skills: [],
    undead: true,
    injury: 0,
  }));
  const s = { social: { pairs: {} } };
  const base = crewContribution(s, zombies, 'str');
  const crew = crewContribution(s, [caster, ...zombies], 'str');
  assert.equal(base.total, 3);
  assert.equal(crew.supervision, 4);
  assert.equal(crew.supervised.length, 2);
  assert.equal(crew.total, 8);
  assert.equal(
    crewContribution(s, [caster, { ...caster, id: 'second' }, ...zombies], 'str').supervision,
    4,
  );
  assert.equal(
    crewContribution(s, [{ ...caster, status: 'away' }, ...zombies], 'str').supervision,
    0,
  );
  assert.equal(crewContribution(s, [{ ...caster, injury: 1 }, ...zombies], 'str').supervision, 0);
  assert.equal(
    crewContribution(s, [caster, ...zombies], 'end', { supervision: false }).supervision,
    0,
  );
  const away = crewContribution(
    s,
    [caster, ...zombies].map((c) => ({ ...c, status: 'away' })),
    'str',
    { away: true },
  );
  assert.equal(away.supervision, 4);
});

test('legacy saves receive empty social/research state and zero new stocks without replacing an active mission', () => {
  const s = D.initial({ opening: 'legacy' });
  D.recruit(s, 'bryn');
  D.dispatch(s, 'road', ['bryn']);
  const mission = structuredClone(s.missions[0]),
    roster = structuredClone(s.roster),
    seed = s.seed;
  delete s.household;
  delete s.social;
  delete s.outside;
  s.guild.version = 8;
  for (const id of ['briarHorn', 'briarSample', 'flameKit']) delete s.guild.house.materials[id];
  const copy = reload(s);
  assert.equal(copy.household.opening, 'legacy');
  assert.deepEqual(copy.social.pairs, {});
  assert.deepEqual(copy.missions[0], mission);
  assert.deepEqual(copy.roster, roster);
  assert.equal(copy.seed, seed);
  assert.equal(copy.guild.house.materials.briarHorn, 0);
  assert.equal(copy.guild.version, 9);
  assert.deepEqual(reload(copy), copy);
});

test('corrupt encounters, duplicated rewards, conflicting residents and invalid research reject loading', () => {
  const s = D.initial();
  D.dispatchExpedition(s, 'oldPatrol', 'scout', ['nell']);
  for (const corrupt of [
    (s) => s.outside.sites.oldPatrol.count++,
    (s) => s.outside.operations[0].party.push('nell'),
    (s) => (s.outside.operations[0].pending = true),
    (s) => (s.outside.operations[0].rewarded = true),
    (s) => (s.outside.operations[0].rng = 0),
    (s) =>
      (s.outside.research = {
        species: 'briarStag',
        tier: 1,
        room: 'tower',
        work: 6,
        progress: 0,
        inputs: {},
      }),
    (s) => (s.roster[2].status = 'home'),
  ]) {
    const copy = structuredClone(s);
    corrupt(copy);
    assert.throws(() => reload(copy));
  }
});

test('recommissioning uses workshop expertise and exact shared payments without earning plot flags', () => {
  const s = D.initial();
  assert.throws(() => D.recommissionRoom(s, 'dryLanding'));
  s.guild.crafting.completed = ['shortSword', 'buckler', 'banner'];
  const gold = s.gold,
    scrap = s.guild.salvage;
  D.recommissionRoom(s, 'dryLanding');
  assert(s.household.rooms.includes('dryLanding'));
  assert.equal(s.gold, gold - 25);
  assert.equal(s.guild.salvage, scrap - 4);
  assert(!s.flags.anchor);
  assert.throws(() => D.recommissionRoom(s, 'dryLanding'));
  assert(reload(s).household.rooms.includes('dryLanding'));
});

test('local intelligence ages and changes while permanent creature research survives seven-day site renewal', () => {
  const s = D.initial();
  safeScout(s);
  research(s);
  const oldSeed = s.outside.sites.briarHollow.seed;
  assert(D.expeditionPreview(s, 'briarHollow', 'assault').intel.stale);
  s.guild.house.materials.flameKit = 1;
  const uid = D.dispatchExpedition(s, 'briarHollow', 'assault', ['bryn', 'ivo', 'nell'], {
    fire: true,
  });
  finish(s, uid);
  assert.equal(s.outside.operations.find((o) => o.uid === uid).outcome, 'success');
  const cleared = s.outside.sites.briarHollow.clearedDay;
  while (s.day < cleared + 7) tick(s);
  assert.notEqual(s.outside.sites.briarHollow.seed, oldSeed);
  assert.equal(s.outside.sites.briarHollow.generation, 2);
  assert.equal(D.dossier(s, 'briarStag').tier, 1);
  assert(D.expeditionPreview(s, 'briarHollow', 'scout').intel.stale);
  assert.equal(reload(s).outside.sites.briarHollow.generation, 2);
});

test('a fallen scout returns as a basic echo, retains identity, causes survivor memories and pauses without its supervisor', () => {
  let s = D.initial();
  const nell = s.roster[2];
  Object.assign(nell, { str: 1, end: 1, agi: 1, int: 1 });
  const uid = D.dispatchExpedition(s, 'briarHollow', 'assault', ['nell']);
  tick(s);
  for (let i = 0; i < 12 && s.outside.operations[0].phase !== 'failed'; i++) {
    const o = s.outside.operations[0];
    if (o.pending) D.orderExpedition(s, uid, 'guard');
    o.stance = 'guard';
    o.rng = seedFor((n) => n < 50);
    tick(s);
  }
  assert.equal(nell.status, 'dead');
  assert.equal(s.outside.operations[0].phase, 'failed');
  assert.equal(nell.bodyRecovered, false);
  s = reload(s);
  const ivo = s.roster[1];
  while (ivo.level < 6) gainLevel(ivo);
  D.specialise(s, 'ivo', 'necromancer');
  D.learnTalent(s, 'ivo', 'graveSight');
  D.learnTalent(s, 'ivo', 'raiseDead');
  while (s.gold < 150) {
    s.eventSeed = 97;
    D.emergency(s);
  }
  D.recoverRemains(s, 'nell');
  const history = structuredClone(s.roster[2].memories);
  D.raiseDead(s, 'ivo', 'nell');
  const echo = s.roster[2];
  assert(echo.undead);
  assert.equal(echo.id, 'nell');
  assert.deepEqual([echo.str, echo.end, echo.agi, echo.int], [8, 10, 2, 1]);
  assert.deepEqual(echo.memories.slice(0, history.length), history);
  assert(affinity(s, 'bryn', 'ivo') < 0);
  const xp = echo.xp,
    level = echo.level;
  awardExperience(echo, 1000);
  assert.equal(echo.xp, xp);
  assert.equal(echo.level, level);
  assert.equal(gainLevel(echo), false);
  assert.equal(echo.points, 0);
  D.assignRoomWorker(s, 'service', 0, 'ivo');
  D.assignRoomWorker(s, 'service', 1, 'nell');
  assert.equal(G.workBreakdown(s, 'workshop').supervision, 2);
  const rate = G.dailyWork(s, 'workshop');
  D.assignRoomWorker(s, 'tower', 0, 'ivo');
  assert.equal(G.workBreakdown(s, 'workshop').supervision, 0);
  assert(G.dailyWork(s, 'workshop') < rate);
  s = reload(s);
  assert.equal(s.roster[2].echo.caster, 'ivo');
  assert.equal(s.roster[2].str, 8);
  assert(s.social.pairs['bryn:ivo'].memories.some((m) => m.text.includes('raised')));
});

test('one horn is reserved by either researched physical upgrade, cancellation restores both item and component', () => {
  const s = D.initial();
  safeScout(s);
  research(s);
  s.guild.house.materials.briarHorn = 1;
  s.guild.house.materials.components = 4;
  s.guild.house.materials.aether = 6;
  s.guild.house.materials.cloth = 4;
  const forge = G.grantFurniture(s, 'runeForge'),
    coat = D.awardEquipment(s, 'paddedCoat', 'Workshop');
  D.startWorkshopConversion(s, 'hornboundForge', forge.uid);
  assert.equal(D.resourceStock(s, 'briarHorn'), 0);
  assert.throws(() => D.startWorkshopConversion(s, 'briarCloak', coat));
  D.cancelRoomProject(s, 'workshop');
  assert.equal(D.resourceStock(s, 'briarHorn'), 1);
  assert.equal(s.guild.furniture.find((i) => i.uid === forge.uid).id, 'runeForge');
  D.assignRoomWorker(s, 'service', 0, 'mara');
  D.startWorkshopConversion(s, 'briarCloak', coat);
  while (s.guild.facilities.workshop.project) tick(s);
  assert.equal(s.inventory.find((i) => i.uid === coat).id, 'briarCloak');
  assert.equal(s.nextItem, 1);
  assert.equal(D.resourceStock(s, 'briarHorn'), 0);
  assert.throws(() => D.startWorkshopConversion(s, 'hornboundForge', forge.uid));
  assert.equal(reload(s).inventory.find((i) => i.uid === coat).id, 'briarCloak');
});

test('the new opening completes an earned-resource scout/research/hunt/house-upgrade loop with no campaign missions', () => {
  const { state, stages, days } = householdScenario();
  assert(days <= 75);
  assert.equal(stages.find((p) => p.label === 'Horn hunt completed').day, 21);
  assert.equal(state.guild.nextFurniture, 1);
  assert.equal(state.guild.furniture[0].id, 'hornboundForge');
  assert.equal(state.missions.length, 0);
  assert.equal(state.guild.house.materials.briarHorn, 0);
  assert(!state.flags.truth);
  assert(!state.flags.dragonSlain);
  assert(stages.some((p) => p.label === 'Creature researched'));
});

test('field healing remains within an actual joined party and cannot teleport from the house', () => {
  const s = D.initial();
  const c = s.roster[1];
  while (c.level < 6) gainLevel(c);
  D.specialise(s, 'ivo', 'healer');
  D.learnTalent(s, 'ivo', 'healingWord');
  D.dispatchExpedition(s, 'oldPatrol', 'assault', ['bryn', 'ivo']);
  s.roster[0].injury = 1;
  s.roster[0].recovery = 2;
  assert(D.spellTargets(s, 'ivo', 'heal').some((p) => p.id === 'bryn'));
  D.castRestoration(s, 'ivo', 'bryn');
  assert.equal(s.roster[0].injury, 0);
  assert.throws(() => D.castRestoration(s, 'ivo', 'bryn'));
  assert.deepEqual(reload(s).outside, s.outside);
});

test('live expedition navigation markers survive reload and reject unread events beyond the saved log', () => {
  const s = D.initial();
  D.dispatchExpedition(s, 'briarHollow', 'scout', ['nell']);
  acknowledgeNavigation(s, 'Contracts');
  assert.equal(reload(s).navigationSeen.outside, s.outside.events.length);
  s.navigationSeen.outside++;
  assert.throws(() => reload(s), /navigation/);
});

test('ready-house expedition pages retain visible home defence, damage repair and living care controls', () => {
  const s = D.initial();
  s.threats.ghost = { active: true, age: 1, progress: 0, damage: 0 };
  s.damagedRooms = { service: { day: s.day, cost: 30 } };
  s.roster[0].status = 'injured';
  s.roster[0].injury = 1;
  s.roster[0].recovery = 2;
  const html = renderExpeditions(s, helpers);
  assert.match(html, /homeDefend:ghost/);
  assert.match(html, /repairDamage:service/);
  assert.match(html, /treat:bryn/);
  assert.match(html, /Manage home watch/);
  const before = s.gold;
  s.roster[0].undead = true;
  assert.throws(() => D.treat(s, 'bryn'), /necromantic repairs/);
  assert.equal(s.gold, before);
});

test('unvisited patrols rotate on world days rather than on scouting or save/load', () => {
  const s = D.initial(),
    old = s.outside.sites.oldPatrol.seed;
  tick(s, 7);
  assert.notEqual(s.outside.sites.oldPatrol.seed, old);
  assert.equal(s.outside.sites.oldPatrol.generation, 2);
  assert.equal(s.outside.sites.briarHollow.generation, 1);
  const copy = reload(s);
  assert.equal(copy.outside.sites.oldPatrol.seed, s.outside.sites.oldPatrol.seed);
});

test('a rescue force can finish the mission and recover remains after the entire original patrol party dies', () => {
  const s = D.initial();
  const n = s.roster[2];
  Object.assign(n, { str: 1, end: 1, agi: 1, int: 1 });
  const uid = D.dispatchExpedition(s, 'oldPatrol', 'assault', ['nell']);
  tick(s);
  for (let i = 0; i < 12 && s.outside.operations[0].phase !== 'failed'; i++) {
    const o = s.outside.operations[0];
    if (o.pending) D.orderExpedition(s, uid, 'guard');
    o.stance = 'guard';
    o.rng = seedFor((n) => n < 50);
    tick(s);
  }
  assert.equal(n.status, 'dead');
  tick(s, 7);
  assert.equal(n.bodyRecovered, false);
  // An established force fixture proves rescue across a changing site's generation.
  for (const c of s.roster.slice(0, 2)) Object.assign(c, { str: 40, agi: 40, end: 40, int: 40 });
  const rescue = D.reinforceExpedition(s, uid, ['bryn', 'ivo'], 'assault');
  finish(s, rescue);
  assert.equal(n.bodyRecovered, true);
  assert.equal(s.outside.operations.find((o) => o.uid === rescue).outcome, 'success');
  assert.equal(s.gold, 120);
  assert.equal(affinity(s, 'bryn', 'ivo'), 10);
  assert.throws(() => D.reinforceExpedition(s, uid, ['bryn'], 'extract'));
  assert.deepEqual(reload(s).outside, s.outside);
});

test('escape-artist talents still permit immediate external withdrawal with one refund and report', () => {
  const s = D.initial(),
    n = s.roster[2];
  while (n.level < 6) gainLevel(n);
  D.specialise(s, 'nell', 'thief');
  D.learnTalent(s, 'nell', 'shadowStep');
  D.learnTalent(s, 'nell', 'escapeArtist');
  const uid = D.dispatchExpedition(s, 'oldPatrol', 'scout', ['nell'], { medical: true });
  forceSpot(s, uid);
  tick(s);
  const day = s.day;
  D.orderExpedition(s, uid, 'retreat');
  assert.equal(s.day, day);
  assert.equal(n.status, 'home');
  assert.equal(s.outside.operations[0].phase, 'resolved');
  assert.equal(s.guild.supplies, 3);
  assert.equal(s.reports.filter((r) => r.operation === uid).length, 1);
  assert.deepEqual(reload(s).outside, s.outside);
});

test('the ready-house craft catalogue excludes inaccessible campaign mechanisms and plot-gated patterns', async () => {
  const { recipeCatalogue } = await import('./management-ui.js');
  const s = D.initial();
  assert(!recipeCatalogue(s).some((r) => r.routeTool || r.sourceFlag));
  const legacy = D.initial({ opening: 'legacy' });
  assert(recipeCatalogue(legacy).some((r) => r.routeTool));
});

test('living party training improves combat and noncombat field labour', () => {
  const s = D.initial();
  while (s.roster[0].level < 9) gainLevel(s.roster[0]);
  const uid = D.dispatchExpedition(s, 'oldPatrol', 'assault', ['bryn', 'ivo']);
  const o = s.outside.operations.find((p) => p.uid === uid),
    b = s.roster[0];
  const bare = X.combatAssessment(s, o).rate;
  b.specialisation = 'barbarian';
  b.talents = ['rage', 'cleave'];
  assert(X.combatAssessment(s, o).rate > bare);
  const crew = crewContribution(s, [b, s.roster[1]], 'str', { away: true });
  assert(crew.training > 0);
  assert.equal(crew.total, crew.base + crew.training);
  b.talents = [];
  assert.equal(crewContribution(s, [b, s.roster[1]], 'str', { away: true }).training, 0);
});

test('returning scouts show their actual report once and replace uncertain briefings with visible findings', () => {
  let s = D.initial();
  assert.match(
    renderExpeditions(s, helpers, { site: 'oldPatrol' }),
    /Their numbers and intentions are uncertain/,
  );
  const uid = D.dispatchExpedition(s, 'oldPatrol', 'scout', ['nell']);
  s.outside.operations.at(-1).rng = seedFor(
    (n) => n >= X.detectionChance(s, 'oldPatrol', [s.roster[2]]),
  );
  tick(s, 2);
  assert(!s.scenes.some((n) => n.operation === uid));
  tick(s);
  const intel = s.outside.intel.oldPatrol;
  const report = s.scenes.find((n) => n.operation === uid);
  assert.match(report.title, /Scouting report/);
  assert.match(report.body, new RegExp('counted ' + intel.count + ' armed patrol'));
  assert.match(report.body, /Nell/);
  assert(s.outside.events.some((e) => e.uid === report.event && e.type === 'scouts-returned'));
  assert.match(s.reports.find((r) => r.operation === uid).text, /armed patrol/);
  const html = renderExpeditions(s, helpers, { site: 'oldPatrol' });
  assert.match(html, /<strong>Scouting report<\/strong>/);
  assert.match(html, new RegExp('counted ' + intel.count + ' armed patrol'));
  assert(!html.includes('Their numbers and intentions are uncertain'));
  assert(!html.includes('Their numbers are unknown'));
  s = reload(s);
  tick(s, 3);
  assert.equal(s.scenes.filter((n) => n.operation === uid).length, 1);
  assert.equal(s.reports.filter((r) => r.operation === uid).length, 1);
  assert.equal(
    s.outside.events.filter((e) => e.operation === uid && e.type === 'scouts-returned').length,
    1,
  );
  assert.match(
    renderExpeditions(s, helpers, { site: 'oldPatrol' }),
    /observations may be out of date/,
  );
  s.scenes = [];
  s = reload(s);
  tick(s);
  assert(!s.scenes.some((n) => n.operation === uid));
});

test('scouts who withdraw bring a visible partial report without revealing the unseen force', () => {
  const s = D.initial(),
    uid = D.dispatchExpedition(s, 'oldPatrol', 'scout', ['nell']);
  forceSpot(s, uid);
  tick(s);
  D.orderExpedition(s, uid, 'retreat');
  tick(s);
  const report = s.scenes.find((n) => n.operation === uid),
    intel = s.outside.intel.oldPatrol;
  assert.equal(intel.complete, false);
  assert.match(report.body, new RegExp('at least ' + intel.count + ' armed patrol'));
  assert.match(report.body, /partial report/);
  const html = renderExpeditions(s, helpers, { site: 'oldPatrol' });
  assert.match(html, /Partial scouting report/);
  assert(!html.includes('Their numbers and intentions are uncertain'));
  assert(!html.includes('counted ' + s.outside.sites.oldPatrol.count + ' armed patrol'));
});
