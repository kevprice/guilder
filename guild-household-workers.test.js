import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { planResidentWalk } from './resident-motion.js';
import { renderRooms } from './room-panel.js';
import { roomProduction } from './production-view.js';

const reload = (s) => D.load(D.save(s));
const helpers = {
  esc: String,
  card: (t, b) => `<h3>${t}</h3>${b}`,
  btn: (t) => `<button>${t}</button>`,
};
function house() {
  const s = D.initial({ opening: 'legacy' });
  s.flags.breach = s.flags.repaired = s.flags.garden = s.flags.hospice = true;
  s.gold = 600;
  s.guild.salvage = 30;
  return s;
}
const tick = (s, n = 1) => {
  for (let i = 0; i < n; i++) {
    s.eventSeed = 97;
    D.day(s);
  }
};

test('Rowan and Mara fill normal slots, produce materials and persist without gaining recruit XP', () => {
  let s = house();
  D.assignRoomWorker(s, 'corridor', 0, 'rowan');
  D.assignRoomWorker(s, 'quarters', 1, 'mara');
  const gold = s.gold;
  tick(s, 4);
  assert.equal(s.guild.house.materials.timber, 2);
  assert.equal(s.guild.house.materials.cloth, 2);
  assert.equal(s.gold, gold);
  assert.deepEqual(s.guild.homeXP.workers, []);
  assert.equal(s.roster.length, 0);
  s = reload(s);
  assert.equal(D.assignedRoom(s, 'rowan').id, 'corridor');
  assert.equal(D.assignedRoom(s, 'mara').id, 'quarters');
  assert.equal(D.residentPosition(s, 'mara').x, D.workerStation(D.assignedRoom(s, 'mara'), 1).x);
  assert.deepEqual(reload(s), s);
  assert.throws(() => D.dispatch(s, 'road', ['rowan']));
  assert.throws(() => D.dispatch(s, 'road', ['mara']));
});

test('Mara works only in her assigned room and projections do not count her twice', () => {
  const s = house();
  assert.equal(D.dailyWork(s, 'workshop'), 0);
  assert.equal(D.projectForecast(s, 'workshop', 'mara').total, 1);
  D.assignWorker(s, 'workshop', 'rowan');
  D.assignRoomWorker(s, 'service', 1, 'mara');
  assert.equal(D.dailyWork(s, 'workshop'), 2);
  assert.equal(D.workBreakdown(s, 'workshop').mara, 0);
  assert.equal(D.dailyWork(s, 'garden'), 0);
  assert.match(roomProduction(s, 'garden').reason, /No fit workers/);
  D.startRoomProject(s, 'workshop', 'shortSword');
  tick(s, 2);
  assert.equal(s.inventory.length, 1);
  assert.deepEqual(s.guild.homeXP.workers, []);
  D.assignRoomWorker(s, 'quarters', 0, 'mara');
  assert.deepEqual(s.guild.house.rooms.service.workers, ['rowan', null, null]);
  assert.equal(D.dailyWork(s, 'workshop'), 1);
  D.assignRoomWorker(s, 'quarters', 0, null);
  assert.equal(D.dailyWork(s, 'workshop'), 1);
  assert.equal(D.dailyWork(s, 'garden'), 0);
  assert.deepEqual(reload(s), s);
});

test('Rowan’s recovery pauses the assignment and resumes without changing progress or charging inputs', () => {
  const s = house();
  D.assignRoomWorker(s, 'corridor', 0, 'rowan');
  s.rowanRecovery = 2;
  assert.equal(D.roomForecast(s, 'corridor').work, 0);
  tick(s, 2);
  assert.equal(s.guild.house.rooms.corridor.progress, 0);
  assert.equal(D.assignedRoom(s, 'rowan').id, 'corridor');
  tick(s);
  assert.equal(s.guild.house.rooms.corridor.progress, 1);
  assert.deepEqual(reload(s), s);
});

test('Mara defends during attacks, keeps a watch contribution, then resumes her production station', () => {
  const s = house();
  for (const id of ['bryn', 'ivo', 'nell']) D.recruit(s, id);
  s.guild.house.mara.tier = 2;
  D.assignRoomWorker(s, 'quarters', 0, 'mara');
  s.threats.monster = {
    progress: 0,
    active: true,
    age: 0,
    damage: 0,
    room: 'service',
    x: 865,
    y: 380,
  };
  assert.equal(D.guildWorker(s, 'mara').status, 'defending');
  assert.equal(D.roomForecast(s, 'quarters').work, 0);
  assert.equal(D.maraPower(s), 4);
  tick(s);
  assert.equal(s.guild.house.rooms.quarters.progress, 0);
  D.assignRoomWorker(s, 'entrance', 0, 'mara');
  assert.equal(D.roomForecast(s, 'entrance').work, 2);
  assert.equal(D.maraPower(s), 8);
  D.assignRoomWorker(s, 'quarters', 0, 'mara');
  s.threats.monster.active = false;
  tick(s);
  assert.equal(s.guild.house.rooms.quarters.progress, 1);
  assert.deepEqual(reload(s), s);
});

test('Mara upgrades improve effective work stats without resetting her saved station', () => {
  const s = house();
  D.assignWorker(s, 'workshop', 'mara');
  assert.equal(D.dailyWork(s, 'workshop'), 1);
  s.guild.house.mara.tier = 2;
  assert.equal(D.dailyWork(s, 'workshop'), 2);
  assert.equal(D.guildWorker(s, 'mara').str, 10);
  s.guild.house.mara.tier = 4;
  assert.equal(D.dailyWork(s, 'workshop'), 2);
  assert.equal(D.workerContribution(D.guildWorker(s, 'mara'), 'int').work, 3);
  assert.equal(D.assignedRoom(reload(s), 'mara').id, 'service');
});

test('an inactive opening home-attack flag cannot stop Mara’s work with fewer than three companions', () => {
  const s = house();
  D.recruit(s, 'bryn');
  D.assignRoomWorker(s, 'quarters', 0, 'mara');
  s.threats.monster = {
    progress: 0,
    active: true,
    age: 0,
    damage: 0,
    room: 'service',
    x: 865,
    y: 380,
  };
  assert.equal(D.homeDanger(s), null);
  assert.equal(D.guildWorker(s, 'mara').status, 'home');
  tick(s);
  assert.equal(s.guild.house.rooms.quarters.progress, 1);
});

test('household workers use secured routes and Rowan cannot bypass the story binding by assignment', () => {
  const s = house();
  s.flags.stairs = true;
  const landing = D.houseRooms.find((r) => r.id === 'dryLanding');
  assert.throws(() => D.assignRoomWorker(s, landing.id, 0, 'rowan'), /Reconnect/);
  assert.equal(
    planResidentWalk(
      s,
      D.guildWorker(s, 'rowan'),
      { x: 160, y: 380, floor: 380 },
      D.workerStation(landing, 0),
    ),
    null,
  );
  s.flags.cellarDrained = true;
  s.flags.discovered_sluice = s.flags.searched_sluice = true;
  const sluice = D.houseRooms.find((r) => r.id === 'sluice');
  const origin = { x: 115, y: 380, floor: 380 },
    target = D.workerStation(sluice, 0);
  assert(planResidentWalk(s, D.guildWorker(s, 'mara'), origin, target));
  assert.throws(() => D.assignRoomWorker(s, 'sluice', 0, 'rowan'), /binding/);
  assert.equal(planResidentWalk(s, D.guildWorker(s, 'rowan'), origin, target), null);
  s.flags.free = true;
  D.assignRoomWorker(s, 'sluice', 0, 'rowan');
  assert(planResidentWalk(s, D.guildWorker(s, 'rowan'), origin, target));
  assert.deepEqual(reload(s), s);
});

test('both assignment panels show household staff and reject duplicate or unknown saved workers', () => {
  const s = house();
  for (const section of ['workshop', 'house']) {
    const html = renderRooms(s, helpers, { section, houseRoom: 'quarters' });
    assert.match(html, /value="rowan"/);
    assert.match(html, /value="mara"/);
  }
  D.assignRoomWorker(s, 'quarters', 0, 'mara');
  const bad = structuredClone(s);
  bad.guild.house.rooms.corridor.workers[0] = 'mara';
  assert.throws(() => reload(bad), /house-room/);
  const unknown = structuredClone(s);
  unknown.guild.house.rooms.corridor.workers[0] = 'missing';
  assert.throws(() => reload(unknown), /house-room/);
  assert.deepEqual(reload(s), s);
});
