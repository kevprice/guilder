import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import * as G from './guild-management.js';
import { residentTiles, renderResidentStrip } from './resident-interface.js';
import { planResidentWalk } from './resident-motion.js';
import { homeThreatLocations } from './house-access.js';
const reload = (s) => D.load(D.save(s));
const tick = (s) => {
  s.eventSeed = 97;
  D.day(s);
};
test('controlling and switching residents never assigns, clears or moves their saved jobs', () => {
  const s = D.initial();
  D.assignRoomWorker(s, 'service', 0, 'bryn');
  D.selectResident(s, 'bryn');
  const jobs = structuredClone(s.guild.house.rooms);
  D.selectResident(s, 'ivo', { x: 1700, y: 380, floor: 380 });
  assert.deepEqual(s.guild.house.rooms, jobs);
  assert.equal(D.assignedRoom(s, 'bryn').id, 'service');
  assert.equal(D.assignedRoom(s, 'ivo'), null);
  tick(s);
  assert.equal(D.assignedRoom(s, 'ivo'), null);
  assert.equal(D.assignedRoom(s, 'bryn').id, 'service');
  assert.equal(reload(s).selected, 'ivo');
});
test('every initial workplace is inside a connected wing with no bricked workshop or unreachable herb crew', () => {
  const s = D.initial(),
    c = s.roster[0];
  assert(s.flags.breach && s.flags.repaired);
  assert.equal(D.worldBoundary(s), 1820);
  for (const id of s.household.rooms) {
    const r = D.houseRooms.find((r) => r.id === id);
    assert(!D.roomPause(s, r), id);
    if (r.y === 380) assert(r.x <= D.worldBoundary(s), id);
    assert(planResidentWalk(s, c, { x: 240, y: 380, floor: 380 }, D.workerStation(r, 0)), id);
  }
  assert(!s.household.rooms.includes('fenRoom1'));
  assert.equal(D.roomForecast(s, 'towerCrown').role.output.herbs, 2);
  D.assignRoomWorker(s, 'towerCrown', 0, 'ivo');
  tick(s);
  tick(s);
  tick(s);
  tick(s);
  assert(D.resourceStock(s, 'herbs') > 0);
});
test('ready-house exploration discovers secured passages and requires investigation before production', () => {
  const s = D.initial();
  D.selectResident(s, 'ivo');
  const p = D.passages.find((p) => p.from === 'tower' && p.to === 'study');
  const pos = D.enterPassage(s, p.id, { x: p.x, y: p.y, floor: p.y });
  assert(s.flags.discovered_study);
  assert.match(
    D.roomPause(
      s,
      D.houseRooms.find((r) => r.id === 'study'),
    ),
    /Search/,
  );
  D.rememberPosition(s, 'ivo', pos);
  D.investigateChamber(s, 'study');
  assert.equal(
    D.roomPause(
      s,
      D.houseRooms.find((r) => r.id === 'study'),
    ),
    null,
  );
  D.assignRoomWorker(s, 'study', 0, 'ivo');
  assert.equal(D.assignedRoom(s, 'ivo').id, 'study');
  assert.equal(reload(s).roster.length, 3);
});
test('away, defending, injured and fallen residents remain in the roster strip with inspectable state badges', () => {
  const s = D.initial();
  D.dispatchExpedition(s, 'briarHollow', 'scout', ['nell']);
  s.roster[0].status = 'injured';
  s.roster[1].status = 'assigned';
  const tiles = residentTiles(s);
  assert.equal(tiles.length, 4);
  assert(tiles.find((c) => c.id === 'nell').label === 'On expedition');
  assert(!tiles.find((c) => c.id === 'nell').controllable);
  const html = renderResidentStrip(s, { esc: String });
  assert.match(html, /inspectResident:nell/);
  assert.match(html, /On expedition/);
  assert(!html.includes('select:nell'));
  assert.throws(() => D.selectResident(s, 'nell'));
});
test('home attacks and saved defenders use connected rooms, including correction of old isolated locations', () => {
  let s = D.initial();
  for (const r of homeThreatLocations(s)) {
    assert(r.x <= D.worldBoundary(s));
    assert.equal(r.y, 380);
  }
  s.threats.ghost = {
    active: true,
    progress: 0,
    age: 0,
    damage: 0,
    room: 'fenRoom1',
    x: 7200,
    y: 380,
  };
  D.dispatch(s, 'ghost', ['bryn', 'ivo']);
  const mission = s.missions[0].uid;
  assert.equal(D.homeThreatLocation(s, 'ghost').room, 'guildhall');
  s.threats.ghost.room = 'fenRoom1';
  s.threats.ghost.x = 7200;
  s = reload(s);
  assert.equal(s.threats.ghost.room, 'guildhall');
  assert.equal(s.missions[0].uid, mission);
  assert.equal(s.roster[0].status, 'assigned');
  assert(!s.flags.cleared_cells);
});
test('version-one household migration preserves herb progress, decorations, crew and supplies in an accessible room', () => {
  const s = D.initial();
  s.household = {
    version: 1,
    opening: 'ready',
    rooms: [
      'entrance',
      'quarters',
      'corridor',
      'service',
      'store',
      'garden',
      'hospice',
      'tower',
      'fenRoom1',
    ],
  };
  s.flags.breach = false;
  const former = s.guild.house.rooms.fenRoom1;
  former.workers[0] = 'nell';
  former.progress = 2;
  const plant = G.grantFurniture(s, 'plant');
  former.decorations[0] = plant.uid;
  const materials = structuredClone(s.guild.house.materials),
    gold = s.gold;
  const copy = reload(s);
  assert.equal(copy.household.version, 2);
  assert(copy.flags.breach);
  assert.equal(D.assignedRoom(copy, 'nell').id, 'towerCrown');
  assert.equal(copy.guild.house.rooms.towerCrown.progress, 2);
  assert.equal(copy.guild.house.rooms.towerCrown.decorations[0], plant.uid);
  assert.equal(copy.guild.house.rooms.fenRoom1.progress, 0);
  assert.deepEqual(copy.guild.house.materials, materials);
  assert.equal(copy.gold, gold);
  assert.deepEqual(reload(copy), copy);
});
test('economic expansion connects its stairs and forbids purchasing an unseen furnace', () => {
  const s = D.initial();
  s.guild.crafting.completed = ['shortSword', 'buckler', 'banner'];
  assert.throws(() => D.recommissionRoom(s, 'cellar'), /stair/);
  D.recommissionRoom(s, 'dryLanding');
  assert(s.flags.stairs);
  s.gold += 20;
  s.guild.salvage += 4;
  D.recommissionRoom(s, 'cellar');
  assert(s.flags.cellarDrained);
  assert(
    planResidentWalk(
      s,
      s.roster[0],
      { x: 240, y: 380, floor: 380 },
      D.workerStation(
        D.houseRooms.find((r) => r.id === 'cellar'),
        0,
      ),
    ),
  );
  assert.match(D.recommissionError(s, 'furnace'), /guardian/);
  assert(!s.flags.truth);
});

test('discovered keys and mechanisms remain meaningful notices and recipes, while commissioned rooms cannot charge twice', async () => {
  const s = D.initial();
  assert(!s.guild.unlocksAnnounced.includes('drainKey'));
  s.flags.key_drainKey = true;
  D.refreshRouteProgress(s);
  assert(s.scenes.some((scene) => scene.routeRewards?.includes('drainKey')));
  s.flags.searched_sluice = true;
  D.discoverPatterns(s);
  const { recipeCatalogue } = await import('./management-ui.js');
  assert(recipeCatalogue(s).some((r) => r.routeTool === 'sluiceWinch'));
  const gold = s.gold;
  assert.throws(() => D.repairRoom(s, 'library'), /already operational/);
  assert.equal(s.gold, gold);
  s.flags.dragonSlain = true;
  assert(
    !D.roomUnlocked(
      s,
      D.houseRooms.find((r) => r.id === 'furnace'),
    ),
  );
  s.guild.crafting.completed = [
    'shortSword',
    'buckler',
    'banner',
    'shelf',
    'plant',
    'forge',
    'raisedBeds',
    'outfitter',
  ];
  D.recommissionRoom(s, 'furnace');
  assert(
    D.roomUnlocked(
      s,
      D.houseRooms.find((r) => r.id === 'furnace'),
    ),
  );
  assert(
    planResidentWalk(
      s,
      s.roster[0],
      { x: 235, y: 380, floor: 380 },
      D.workerStation(
        D.houseRooms.find((r) => r.id === 'furnace'),
        0,
      ),
    ),
  );
});
