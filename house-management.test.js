import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import * as G from './guild-management.js';
import * as H from './house-rooms.js';
import { renderRooms } from './room-panel.js';
import { houseDecorationFootprints, paintRoomWorker } from './house-art.js';
import { assessContract } from './contracts.js';

const helpers = {
  esc: String,
  card: (t, b) => `<h3>${t}</h3>${b}`,
  btn: (t, a, d) => `<button data-action="${a}" ${d ? 'disabled' : ''}>${t}</button>`,
};
const reload = (s) => D.load(D.save(s));
function guild(third = false) {
  const s = D.initial();
  s.gold = 1000;
  s.flags.repaired = s.flags.wallSurveyed = s.flags.tower = true;
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  if (third) {
    for (const flag of D.recruits.find((c) => c.id === 'nell').requires || []) s.flags[flag] = true;
    D.recruit(s, 'nell');
  }
  return s;
}
function tick(s, n = 1) {
  for (let i = 0; i < n; i++) {
    s.eventSeed = 97;
    D.day(s);
  }
}
function room(s, id) {
  return s.guild.house.rooms[id];
}
function secure(s, id) {
  s.flags['discovered_' + id] =
    s.flags['cleared_' + id] =
    s.flags['searched_' + id] =
    s.flags['disarmed_' + id] =
      true;
}
function materials(s, n = 20) {
  for (const m of D.materials) s.guild.house.materials[m.id] = n;
}

test('every house room has a job, bounded crew and two decoration slots; new material stocks start empty', () => {
  const s = D.initial();
  assert.equal(D.houseRooms.length, 68);
  assert.equal(new Set(D.houseRooms.map((r) => r.id)).size, 68);
  for (const r of D.houseRooms) {
    assert(D.activities[r.activity]);
    assert(r.capacity >= 1 && r.capacity <= 3);
    assert.equal(room(s, r.id).workers.length, r.capacity);
    assert.deepEqual(room(s, r.id).decorations, [null, null]);
  }
  assert(Object.values(s.guild.house.materials).every((n) => n === 0));
  assert.deepEqual(s.guild.house.mara, { tier: 1, defend: true });
  assert.equal(D.maraPower(s), 0);
});

test('one room per companion, capacity checks and canonical facility lead are maintained atomically', () => {
  const s = guild();
  D.assignRoomWorker(s, 'quarters', 1, 'bryn');
  assert.equal(D.assignedRoom(s, 'bryn').id, 'quarters');
  const before = D.save(s);
  assert.throws(() => D.assignRoomWorker(s, 'corridor', 1, 'bryn'), /slot/);
  assert.throws(() => D.assignRoomWorker(s, 'stars', 0, 'bryn'), /Discover/);
  assert.throws(() => D.assignRoomWorker(s, 'corridor', 0, 'rowan'), /companion/);
  assert.equal(D.save(s), before);
  D.assignWorker(s, 'workshop', 'bryn');
  D.assignRoomWorker(s, 'service', 1, 'ivo');
  assert.equal(D.assignedRoom(s, 'bryn').id, 'service');
  assert.deepEqual(room(s, 'quarters').workers, [null, null]);
  assert.equal(s.guild.facilities.workshop.worker, 'bryn');
  assert.equal(D.dailyWork(s, 'workshop'), 3);
  D.assignRoomWorker(s, 'service', 0, null);
  assert.equal(s.guild.facilities.workshop.worker, null);
  assert.equal(D.dailyWork(s, 'workshop'), 2);
  assert.deepEqual(reload(s), s);
});

test('leaving a companion assigns the room; moving rooms frees their old job; full rooms leave them idle', () => {
  const s = guild(true);
  assert.equal(D.settleResident(s, 'bryn', { x: 550, floor: 380 }).id, 'corridor');
  assert.equal(D.settleResident(s, 'ivo', { x: 550, floor: 380 }), null);
  assert.equal(D.assignedRoom(s, 'ivo'), null);
  assert.equal(D.settleResident(s, 'bryn', { x: 350, floor: 380 }).id, 'quarters');
  assert.equal(room(s, 'corridor').workers[0], null);
  assert.equal(D.settleResident(s, 'ivo', { x: 350, floor: 380 }).id, 'quarters');
  assert.equal(D.settleResident(s, 'nell', { x: 350, floor: 380 }), null);
  assert.equal(D.settleResident(s, 'rowan', { x: 350, floor: 380 }), null);
  D.settleResident(s, 'bryn', { x: 20000, floor: 140 });
  assert.equal(D.assignedRoom(s, 'bryn'), null);
  assert.deepEqual(reload(s), s);
});

test('stat thresholds and equipment improve crew output; extra facility workers share completion XP', () => {
  let s = guild();
  const bryn = s.roster[0],
    ivo = s.roster[1];
  bryn.str = 9;
  ivo.str = 20;
  assert.equal(D.workerContribution(bryn, 'str').work, 1);
  bryn.str = 10;
  assert.equal(D.workerContribution(bryn, 'str').work, 2);
  D.awardEquipment(s, 'shortSword', 'Test');
  // Effective equipment bonuses are used by production, with physical ownership unchanged.
  D.enterStore(s, 'bryn');
  D.equipItem(s, 'bryn', s.inventory[0].uid);
  D.leaveStore(s);
  bryn.str = 19;
  assert.equal(D.workerContribution(bryn, 'str').work, 3);
  D.assignRoomWorker(s, 'service', 0, 'bryn');
  D.assignRoomWorker(s, 'service', 2, 'ivo');
  assert.equal(D.dailyWork(s, 'workshop'), 7);
  const xp = s.roster.map((c) => c.xp),
    visits = s.roster.map((c) => c.visits);
  D.startRoomProject(s, 'workshop', 'shortSword');
  tick(s);
  assert.equal(s.inventory.length, 2);
  assert.deepEqual(
    s.roster.map((c) => c.xp),
    xp.map((n) => n + 5),
  );
  assert.deepEqual(
    s.roster.map((c) => c.visits),
    visits,
  );
  s = reload(s);
  assert.equal(D.dailyWork(s, 'workshop'), 7);
});

test('gathering advances only on game days, keeps partial progress and collects once after reload', () => {
  let s = guild();
  D.assignRoomWorker(s, 'corridor', 0, 'bryn');
  s = reload(s);
  assert.equal(room(s, 'corridor').progress, 0);
  tick(s, 2);
  assert.equal(room(s, 'corridor').progress, 2);
  s = reload(s);
  tick(s, 2);
  assert.equal(s.guild.house.materials.timber, 2);
  assert.equal(room(s, 'corridor').progress, 0);
  assert.match(s.guild.dailySummary.lines.join('\n'), /Service corridor: \+2 timber/);
  assert.equal(s.guild.completions.filter((c) => c.facility === 'room:corridor').length, 1);
  assert.equal(s.roster[0].xp, 5);
  s = reload(s);
  assert.equal(s.guild.house.materials.timber, 2);
  tick(s);
  assert.equal(s.guild.house.materials.timber, 2);
});

test('expeditions pause a room contribution and preserve its slot and progress through waiting and withdrawal', () => {
  let s = guild();
  s.roster[0].str = 10;
  D.assignRoomWorker(s, 'corridor', 0, 'bryn');
  tick(s);
  const absence = D.roomWorkAbsence(s, ['bryn']).find((r) => r.name === 'Service corridor');
  assert.equal(absence.afterDays, null);
  D.dispatch(s, 'survey_mill', ['bryn']);
  const uid = s.missions[0].uid;
  tick(s, 2);
  assert(s.missions[0].pendingEvent);
  assert.equal(room(s, 'corridor').progress, 2);
  assert.equal(D.roomForecast(s, 'corridor').work, 0);
  s = reload(s);
  D.withdraw(s, uid);
  tick(s);
  assert.equal(D.assignedRoom(s, 'bryn').id, 'corridor');
  assert.equal(s.roster[0].status, 'home');
  tick(s);
  assert.equal(s.guild.house.materials.timber, 2);
});

test('injury pauses labour and death/departure clear slots without retroactive production', () => {
  let s = guild();
  D.assignRoomWorker(s, 'quarters', 0, 'bryn');
  s.roster[0].status = 'injured';
  s.roster[0].injury = 2;
  s.roster[0].recovery = 4;
  tick(s);
  assert.equal(room(s, 'quarters').progress, 0);
  assert.equal(room(s, 'quarters').workers[0], 'bryn');
  s.roster[0].status = 'departed';
  s.roster[0].injury = s.roster[0].recovery = 0;
  s.flags.departed_bryn = true;
  s.choices['homecoming-bryn'] = 'release';
  tick(s);
  assert.equal(room(s, 'quarters').workers[0], null);
  D.assignRoomWorker(s, 'quarters', 0, 'ivo');
  s.roster[1].status = 'dead';
  tick(s);
  assert.equal(room(s, 'quarters').workers[0], null);
  assert.deepEqual(reload(s), s);
});

test('supply-room input shortages and manual pauses preserve work and take materials only on completion', () => {
  let s = guild();
  s.flags.fenRoom2Ready = true;
  D.assignRoomWorker(s, 'fenRoom2', 0, 'bryn');
  // This room is the regional infirmary, so use the ordinary supply room instead.
  D.assignRoomWorker(s, 'fenRoom2', 0, null);
  s.flags.glassRoom2Ready = true;
  D.assignRoomWorker(s, 'glassRoom2', 0, 'bryn');
  assert.match(D.roomForecast(s, 'glassRoom2').paused, /Waiting for herbs/);
  tick(s);
  assert.equal(room(s, 'glassRoom2').progress, 0);
  s.guild.house.materials.herbs = 1;
  tick(s);
  const progress = room(s, 'glassRoom2').progress;
  assert(progress > 0);
  assert.equal(s.guild.house.materials.herbs, 1);
  D.setRoomProduction(s, 'glassRoom2', false);
  tick(s);
  assert.equal(room(s, 'glassRoom2').progress, progress);
  s = reload(s);
  D.setRoomProduction(s, 'glassRoom2', true);
  tick(s, 3);
  assert.equal(s.guild.house.materials.herbs, 0);
  assert.equal(s.guild.supplies, 6);
  assert.match(D.roomForecast(s, 'glassRoom2').paused, /Waiting/);
});

test('guardians, searches, traps and repairs gate jobs and decoration without creating story flags', () => {
  const s = guild(),
    banner = G.grantFurniture(s, 'banner');
  s.flags.discovered_cells = true;
  assert.throws(() => D.assignRoomWorker(s, 'cells', 0, 'bryn'), /guardian/);
  assert.throws(() => D.moveFurniture(s, 'room_cells', 'decoration0', banner.uid), /guardian/);
  s.flags.cleared_cells = true;
  assert.throws(() => D.assignRoomWorker(s, 'cells', 0, 'bryn'), /Search/);
  s.flags.searched_cells = true;
  D.assignRoomWorker(s, 'cells', 0, 'bryn');
  D.moveFurniture(s, 'room_cells', 'decoration0', banner.uid);
  s.damagedRooms = { cells: { day: s.day, cost: 30 } };
  tick(s);
  assert.equal(room(s, 'cells').progress, 0);
  assert.equal(s.flags.key_cryptKey, undefined);
  const trapped = D.chambers.find((r) => r.trap);
  s.flags['discovered_' + trapped.id] = s.flags['searched_' + trapped.id] = true;
  if (trapped.encounter) s.flags['cleared_' + trapped.id] = true;
  assert.match(
    D.roomPause(
      s,
      D.houseRooms.find((r) => r.id === trapped.id),
    ),
    /trap/,
  );
});

test('material crafting reserves exact costs, refunds partial work and creates one physical item', () => {
  let s = guild();
  materials(s);
  const before = { gold: s.gold, materials: structuredClone(s.guild.house.materials) };
  D.startRoomProject(s, 'workshop', 'materials_shortSword');
  tick(s);
  s = reload(s);
  D.cancelRoomProject(s, 'workshop');
  assert.equal(s.gold, before.gold);
  assert.deepEqual(s.guild.house.materials, before.materials);
  assert.equal(s.inventory.length, 0);
  D.startRoomProject(s, 'workshop', 'materials_shortSword');
  tick(s, 4);
  s = reload(s);
  assert.equal(s.inventory.length, 1);
  assert.equal(s.inventory[0].id, 'shortSword');
  assert.equal(s.guild.house.materials.ore, before.materials.ore - 2);
  assert.equal(s.guild.house.materials.timber, before.materials.timber - 1);
  tick(s);
  assert.equal(s.inventory.length, 1);
});

test('material orders forecast shortages, charge per unit and wait without spending', () => {
  let s = guild();
  s.guild.house.materials.ore = 2;
  s.guild.house.materials.timber = 1;
  D.queueWorkshopOrder(s, 'materials_shortSword', 2);
  assert.equal(D.workshopQueueForecast(s)[0].affordableUnits, 1);
  tick(s, 4);
  s = reload(s);
  assert.equal(s.inventory.length, 1);
  const gold = s.gold;
  tick(s, 2);
  assert.equal(s.gold, gold);
  assert.equal(s.inventory.length, 1);
  assert.match(s.guild.dailySummary.lines.join('\n'), /waiting for 2 ore and 1 timber/);
  s.guild.house.materials.ore = 2;
  s.guild.house.materials.timber = 1;
  tick(s, 4);
  assert.equal(s.inventory.length, 2);
});

test('components and Mara upgrades persist, refund fully and cannot skip or repeat a tier', () => {
  let s = guild();
  materials(s);
  s.guild.house.materials.components = 0;
  D.startRoomProject(s, 'workshop', 'brassComponents');
  tick(s, 4);
  s = reload(s);
  assert.equal(s.guild.house.materials.components, 2);
  assert.throws(() => D.startRoomProject(s, 'workshop', 'maraTier3'), /in order/);
  assert.throws(() => D.queueWorkshopOrder(s, 'maraTier2'), /individual/);
  const before = { gold: s.gold, materials: structuredClone(s.guild.house.materials) };
  D.startRoomProject(s, 'workshop', 'maraTier2');
  tick(s);
  s = reload(s);
  D.cancelRoomProject(s, 'workshop');
  assert.equal(s.gold, before.gold);
  assert.deepEqual(s.guild.house.materials, before.materials);
  assert.equal(D.maraPower(s), 0);
  D.startRoomProject(s, 'workshop', 'maraTier2');
  tick(s, 4);
  s = reload(s);
  assert.equal(s.guild.house.mara.tier, 2);
  assert.equal(D.maraPower(s), 4);
  assert.throws(() => D.startRoomProject(s, 'workshop', 'maraTier2'), /in order/);
  assert(s.scenes.some((c) => c.title === 'Mara upgraded'));
});

test('non-facility decorations move between floors, remain owned, and placed pieces cannot be reclaimed', () => {
  let s = guild();
  secure(s, 'study');
  const banner = G.grantFurniture(s, 'banner');
  for (const id of ['room_quarters', 'room_store', 'room_tower', 'room_study']) {
    D.moveFurniture(s, id, 'decoration1', banner.uid);
    s = reload(s);
    assert.deepEqual(D.furniturePlacement(s, banner.uid), { facility: id, slot: 'decoration1' });
    assert.equal(s.guild.furniture.length, 1);
  }
  assert.throws(
    () => D.startWorkshopConversion(s, 'reclaimFurniture', banner.uid),
    /storage first/,
  );
  D.placeFurniture(s, 'room_study', 'decoration1', null);
  assert.equal(D.furniturePlacement(s, banner.uid), null);
  assert.equal(s.guild.furniture.length, 1);
});

test('Mara and fit watch crews protect the house without removing them from their slots', () => {
  let s = guild(true);
  s.guild.house.mara.tier = 3;
  s.roster[0].end = 10;
  D.assignRoomWorker(s, 'entrance', 0, 'bryn');
  assert.equal(D.maraPower(s), 12);
  s.threats.monster = {
    progress: 0,
    active: true,
    age: 0,
    damage: 0,
    room: 'service',
    x: 865,
    y: 380,
  };
  const gold = s.gold;
  tick(s);
  assert.equal(s.threats.monster.progress, 12);
  assert.equal(s.gold, gold);
  s = reload(s);
  tick(s, 2);
  assert.equal(s.threats.monster.active, false);
  assert.equal(s.gold, gold);
  assert.equal(D.assignedRoom(s, 'bryn').id, 'entrance');
  D.setMaraDefence(s, false);
  assert.equal(D.maraPower(s), 0);
  assert.match(D.roomForecast(s, 'entrance').paused, /stood down/);
  D.setMaraDefence(s, true);
  assert.equal(D.maraPower(s), 12);
});

test('a weak guard reduces damage and watch contributions stop when companions leave on missions', () => {
  const s = guild(true);
  s.guild.house.mara.tier = 2;
  D.assignRoomWorker(s, 'entrance', 0, 'bryn');
  const before = D.maraPower(s);
  D.dispatch(s, 'survey_mill', ['bryn']);
  assert.equal(D.maraPower(s), 4);
  assert(before > 4);
  s.threats.monster = {
    progress: 0,
    active: true,
    age: 0,
    damage: 0,
    room: 'service',
    x: 865,
    y: 380,
  };
  const gold = s.gold;
  tick(s);
  assert.equal(s.threats.monster.progress, 4);
  assert.equal(s.gold, gold - 4);
  assert.equal(room(s, 'entrance').workers[0], 'bryn');
  assert.deepEqual(reload(s), s);
});

test('Mara helps a dispatched defence party; forecast, work, guard changes and saves agree', () => {
  let s = guild(true);
  s.guild.house.mara.tier = 2;
  D.assignRoomWorker(s, 'entrance', 0, 'ivo');
  s.threats.monster = {
    progress: 0,
    active: true,
    age: 0,
    damage: 0,
    room: 'service',
    x: 865,
    y: 380,
  };
  const risk = D.risk(s, 'monster', ['bryn']),
    raw = assessContract(
      D.contracts.find((d) => d.id === 'monster'),
      [s.roster[0]],
    );
  assert.equal(risk.rate, raw.rate + 6);
  assert(risk.days < raw.days);
  D.dispatch(s, 'monster', ['bryn']);
  assert.equal(s.missions[0].remaining, risk.days);
  D.setMaraDefence(s, false);
  assert.equal(s.missions[0].remaining, raw.days);
  s = reload(s);
  D.setMaraDefence(s, true);
  s.seed = 1;
  tick(s);
  assert.equal(s.missions[0].progress, risk.rate);
  assert.deepEqual(reload(s), s);
});

test('home attacks remain disabled with fewer than three companions even after Mara upgrades', () => {
  const s = guild();
  s.guild.house.mara.tier = 4;
  for (let i = 0; i < 10; i++) {
    s.eventSeed = 1;
    D.dailyHomeEvent(s);
  }
  assert.equal(D.homeDanger(s), null);
});

test('version 4 migration preserves legacy projects, leads, decorations, campaign and stocks without production', () => {
  const s = guild();
  D.assignWorker(s, 'workshop', 'bryn');
  D.startRoomProject(s, 'workshop', 'shortSword');
  tick(s);
  const banner = G.grantFurniture(s, 'banner');
  D.moveFurniture(s, 'workshop', 'decoration0', banner.uid);
  s.guild.version = 4;
  delete s.guild.house;
  const before = structuredClone(s),
    loaded = reload(s);
  assert.equal(loaded.guild.version, 5);
  assert.equal(room(loaded, 'service').workers[0], 'bryn');
  for (const key of ['gold', 'roster', 'flags', 'missions', 'inventory', 'residentPositions'])
    assert.deepEqual(loaded[key], before[key]);
  assert.deepEqual(loaded.guild.facilities, before.guild.facilities);
  assert.equal(loaded.guild.salvage, before.guild.salvage);
  assert.equal(loaded.guild.supplies, before.guild.supplies);
  assert(Object.values(loaded.guild.house.materials).every((n) => n === 0));
  assert.deepEqual(reload(loaded), loaded);
});

test('corrupt material stocks, duplicated crews, capacities, furniture and upgrade state are rejected', () => {
  const original = guild(),
    banner = G.grantFurniture(original, 'banner');
  for (const mutate of [
    (s) => (s.guild.house.materials.ore = -1),
    (s) => (s.guild.house.materials.unknown = 1),
    (s) => s.guild.house.rooms.corridor.workers.push(null),
    (s) => {
      room(s, 'quarters').workers[0] = 'bryn';
      room(s, 'corridor').workers[0] = 'bryn';
    },
    (s) => {
      room(s, 'quarters').decorations[0] = banner.uid;
      room(s, 'corridor').decorations[0] = banner.uid;
    },
    (s) => (room(s, 'service').decorations[0] = banner.uid),
    (s) => (room(s, 'corridor').progress = 4),
    (s) => (s.guild.house.mara.tier = 5),
    (s) => (s.guild.facilities.workshop.worker = 'bryn'),
  ]) {
    const s = structuredClone(original);
    mutate(s);
    assert.throws(() => reload(s), /management/);
  }
  materials(original);
  D.startRoomProject(original, 'workshop', 'materials_shortSword');
  original.guild.facilities.workshop.project.inputs.materials.ore = 1;
  assert.throws(() => reload(original), /management/);
});

test('house panels expose jobs, material costs, Mara upgrades and a room picker for decorations', () => {
  const s = guild();
  const banner = G.grantFurniture(s, 'banner');
  assert.match(
    renderRooms(s, helpers, { section: 'house', houseRoom: 'quarters' }),
    /2 worker slots|0\/2 worker slots/,
  );
  assert.match(renderRooms(s, helpers, { section: 'house' }), /Leave a companion/);
  const html = renderRooms(s, helpers, { section: 'materials' });
  assert.match(html, /Brass components/);
  assert.match(html, /2 ore/);
  assert.match(renderRooms(s, helpers, { section: 'mara' }), /Reinforce Mara/);
  const decorate = renderRooms(s, helpers, {
    section: 'decorate',
    furnitureUid: banner.uid,
    decorationRoom: 'room_tower',
  });
  assert.match(decorate, /Choose room to decorate/);
  assert.match(decorate, /furnitureMove:room_tower:decoration0/);
  assert.doesNotMatch(decorate, /furnitureMove:room_store:decoration0/);
});

test('decoration footprints stay above doors, stairs and floor interactions; worker animation never advances simulation', () => {
  for (const r of D.houseRooms) {
    for (const p of houseDecorationFootprints(r))
      assert(p.y + p.h < r.y - (r.id === 'dryLanding' ? 50 : 70), r.id);
  }
  const overlap = (a, b) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  for (const id of ['quarters', 'tower', 'towerCrown']) {
    const r = D.houseRooms.find((r) => r.id === id);
    for (const p of houseDecorationFootprints(r))
      assert(!overlap(p, { x: 315, y: r.y - 230, w: 80, h: 230 }), id + ' tower stair');
  }
  const s = guild();
  D.assignRoomWorker(s, 'quarters', 0, 'bryn');
  const before = D.save(s),
    draws = [];
  const ctx = new Proxy(
    {},
    {
      get: (_, key) => (key === 'globalAlpha' ? 1 : (...args) => draws.push([key, ...args])),
      set: () => true,
    },
  );
  paintRoomWorker(ctx, 0, s, s.roster[0], D.workerStation(D.assignedRoom(s, 'bryn'), 0), 1);
  assert(draws.some((d) => d[0] === 'fillText'));
  assert.equal(D.save(s), before);
});
