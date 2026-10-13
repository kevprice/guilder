import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { renderDoorCard, renderRouteRewards } from './route-ui.js';
import { navigationNotices } from './navigation-notices.js';
import { planResidentWalk, walkSample } from './resident-motion.js';

const helpers = { esc: String, btn: (t, a) => `<button data-action="${a}">${t}</button>` };
const reload = (s) => D.load(D.save(s));
function guild() {
  const s = D.initial();
  s.flags.repaired = s.flags.stairs = s.flags.cellarDrained = s.flags.tower = s.flags.anchor = true;
  s.gold = 1500;
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  s.selected = 'bryn';
  for (const m of D.materials) s.guild.house.materials[m.id] = 40;
  D.refreshRouteProgress(s);
  s.scenes = [];
  return s;
}
const origin = (id) => {
  const p = D.passages.find((p) => p.id === id);
  return { x: p.x, floor: p.y };
};
const enter = (s, id) => D.enterPassage(s, id, origin(id));
const tick = (s, n) => {
  for (let i = 0; i < n; i++) {
    s.eventSeed = 97;
    D.day(s);
  }
};

test('all keyed doors name their exact item and its source, and reward cards name every door it opens', () => {
  const s = guild();
  s.flags.discovered_sluice = true;
  const card = renderDoorCard(s, 'cellDoor', helpers, origin('cellDoor'));
  assert.match(card, /Drain maintenance key/);
  assert.match(card, /Search the old sluice works/);
  assert.match(card, /WHAT YOU GAIN/);
  assert.match(card, /Iron jailer/);
  assert.throws(() => enter(s, 'cellDoor'), /Drain maintenance key/);
  D.investigateChamber(s, 'sluice');
  assert(s.scenes.some((n) => n.routeRewards?.includes('drainKey')));
  const reward = renderRouteRewards(s, ['drainKey'], helpers);
  assert.match(reward, /Iron intake gate/);
  assert.match(reward, /Filtration tunnel/);
  for (const p of D.passages.filter((p) => p.gate.key))
    assert(
      D.routeItems.some((i) => i.id === p.gate.key && i.doors.includes(p.id)),
      p.id,
    );
});
test('a seen locked door celebrates an earned key once and keeps its read marker across reloads', () => {
  let s = guild();
  s.flags.discovered_sluice = true;
  D.inspectRoute(s, 'cellDoor');
  D.investigateChamber(s, 'sluice');
  assert.equal(s.scenes.filter((n) => n.routeRewards?.includes('drainKey')).length, 1);
  assert.equal(navigationNotices(s).Exploration.count, 1);
  const count = s.scenes.length;
  D.refreshRouteProgress(s);
  assert.equal(s.scenes.length, count);
  s = reload(s);
  D.inspectRoute(s, 'cellDoor');
  assert.equal(navigationNotices(s).Exploration.count, 0);
  assert.equal(navigationNotices(reload(s)).Exploration.count, 0);
});

test('earned keys highlight unopened doors independently of read markers and respect remaining blockers', () => {
  const s = guild();
  s.flags.discovered_sluice = true;
  assert.equal(D.routeIndicator(s, 'cellDoor'), null);
  D.investigateChamber(s, 'sluice');
  assert.equal(D.routeIndicator(s, 'cellDoor').label, 'KEY READY');
  D.inspectRoute(s, 'cellDoor');
  assert.equal(D.routeIndicator(reload(s), 'cellDoor').label, 'KEY READY');
  enter(s, 'cellDoor');
  assert.equal(D.routeIndicator(s, 'cellDoor'), null);
  s.flags.key_cryptKey = true;
  assert.equal(D.routeIndicator(s, 'cryptDoor').label, 'KEY HELD');
  assert.match(D.routeIndicator(s, 'cryptDoor').detail, /guardian/);
  s.flags.cleared_cells = true;
  assert.equal(D.routeIndicator(s, 'cryptDoor').label, 'KEY READY');
  s.roster[0].status = 'away';
  assert.equal(D.routeIndicator(s, 'cryptDoor').label, 'KEY HELD');
  s.roster[0].status = 'home';
  assert.equal(D.routeIndicator(s, 'cryptDoor').label, 'KEY READY');
});

test('main hatch markers distinguish an owned key from enough money and disappear after opening', () => {
  const s = guild();
  s.flags.tower = false;
  s.gold = 79;
  assert.equal(D.routeIndicator(s, 'tower').label, 'KEY HELD');
  assert.match(D.routeIndicator(s, 'tower').detail, /80g/);
  s.gold = 80;
  assert.equal(D.routeIndicator(s, 'tower').label, 'KEY READY');
  s.selected = 'rowan';
  assert.equal(D.routeIndicator(s, 'tower').label, 'KEY READY');
  D.interact(s, 'tower');
  assert.equal(D.routeIndicator(reload(s), 'tower'), null);
  s.flags.stairs = false;
  assert.equal(D.routeIndicator(s, 'labyrinth'), null);
  s.gold = 45;
  assert.equal(D.routeIndicator(s, 'stairs').label, 'KEY READY');
});

test('contract keys appear on the first completion scene and in the saved report, exactly once', () => {
  const s = guild();
  s.flags.anchor = false;
  s.flags.ledger = true;
  s.guild.unlocksAnnounced = s.guild.unlocksAnnounced.filter(
    (id) => !['towerKey', 'labyrinthKey'].includes(id),
  );
  D.dispatch(s, 'anchor', ['bryn', 'ivo'], true);
  const mission = s.missions.at(-1);
  for (let n = 0; n < 10 && mission.status === 'travelling'; n++) {
    s.eventSeed = 97;
    D.day(s);
  }
  assert.equal(mission.status, 'decision');
  D.decide(s, mission.uid, 'safe');
  assert.deepEqual(s.scenes[0].routeRewards, ['towerKey', 'labyrinthKey']);
  assert.match(renderRouteRewards(s, s.scenes[0].routeRewards, helpers), /KEY RECEIVED/);
  assert.match(s.reports[0].text, /Item received: Bell-tower key/);
  assert.match(s.reports[0].text, /Labyrinth-gate key/);
  const count = s.scenes.filter((n) => n.routeRewards?.includes('towerKey')).length;
  D.refreshRouteProgress(s);
  const loaded = reload(s);
  assert.equal(loaded.scenes.filter((n) => n.routeRewards?.includes('towerKey')).length, count);
  assert.throws(() => D.decide(loaded, mission.uid, 'safe'));
});
test('crafted winches reserve costs, refund cancellation, produce once, and secure a dry guild route', () => {
  let s = guild();
  s.flags.discovered_sluice = true;
  D.investigateChamber(s, 'sluice');
  assert(s.guild.patterns.includes('pattern_sluiceWinch'));
  const before = { gold: s.gold, materials: structuredClone(s.guild.house.materials) };
  D.startRoomProject(s, 'workshop', 'pattern_sluiceWinch');
  tick(s, 1);
  D.cancelRoomProject(s, 'workshop');
  assert.equal(s.gold, before.gold);
  assert.deepEqual(s.guild.house.materials, before.materials);
  assert.deepEqual(s.guild.mechanisms, []);
  D.startRoomProject(s, 'workshop', 'pattern_sluiceWinch');
  tick(s, 6);
  assert.deepEqual(s.guild.mechanisms, ['sluiceWinch']);
  assert(s.scenes.some((n) => n.routeRewards?.includes('tool_sluiceWinch')));
  assert.throws(() => D.startRoomProject(s, 'workshop', 'pattern_sluiceWinch'), /already owned/);
  assert.throws(() => D.queueWorkshopOrder(s, 'pattern_sluiceWinch'), /individual/);
  D.solveRoute(s, 'spillway', 'winch');
  s = reload(s);
  assert.equal(D.routeStatus(s, 'spillway').ready, true);
  const position = enter(s, 'spillway');
  assert.equal(position.floor, D.chambers.find((r) => r.id === 'ratway').y);
  assert(!s.flags.cleared_ratway);
  assert.throws(() => D.investigateChamber(s, 'ratway'), /creature/);
  const gold = s.gold;
  assert.throws(() => D.solveRoute(s, 'spillway', 'winch'), /already secured/);
  assert.equal(s.gold, gold);
});
test('moon counterweights cannot be crafted before securing and searching the menagerie', () => {
  const s = guild();
  assert.throws(() => D.startRoomProject(s, 'workshop', 'pattern_moonWinch'), /Discover/);
  s.flags.discovered_menagerie = s.flags.searched_menagerie = true;
  s.disarmedTraps = ['menagerie'];
  D.discoverPatterns(s);
  assert(s.guild.patterns.includes('pattern_moonWinch'));
  assert.equal(D.projectRecipe(s, 'workshop', 'pattern_moonWinch').work, 8);
});
test('relationship solutions need the named companion’s earned trust and fit presence at home', () => {
  const s = guild();
  s.flags.discovered_maze = s.flags.searched_cells = true;
  D.recruit(s, 'nell');
  const nell = s.roster.find((c) => c.id === 'nell');
  assert.throws(() => D.solveRoute(s, 'wellDrop', 'nellGuide'), /trust/);
  nell.bond = 2;
  nell.status = 'away';
  assert.throws(() => D.solveRoute(s, 'wellDrop', 'nellGuide'), /fit at home/);
  nell.status = 'home';
  D.solveRoute(s, 'wellDrop', 'nellGuide');
  assert(reload(s).guild.solvedRoutes.wellDrop);
  nell.status = 'away';
  assert.equal(D.routeStatus(s, 'wellDrop').ready, true);
});
test('paid and regional-trust solutions are gated, charge once, and preserve destination guardians', () => {
  const s = guild();
  s.flags.discovered_mirror = true;
  assert.throws(() => D.solveRoute(s, 'circleStair', 'runeCrew'), /source room/);
  s.flags.cleared_mirror = s.flags.searched_mirror = true;
  s.gold = 89;
  assert.throws(() => D.solveRoute(s, 'circleStair', 'runeCrew'), /89\/90/);
  assert.equal(s.gold, 89);
  s.gold = 90;
  D.solveRoute(s, 'circleStair', 'runeCrew');
  assert.equal(s.gold, 0);
  assert.throws(() => D.solveRoute(s, 'circleStair', 'runeCrew'), /already secured/);
  s.flags.discovered_ratway = s.flags.cleared_ratway = true;
  assert.throws(() => D.solveRoute(s, 'spores', 'fenCrew'), /Lantern Fen/);
  s.flags.fenStep11 = true;
  D.solveRoute(s, 'spores', 'fenCrew');
  assert.equal(D.routeStatus(reload(s), 'spores').ready, true);
  enter(s, 'spores');
  assert.throws(() => D.investigateChamber(s, 'fungus'), /creature/);
});
test('secured workplaces announce their purpose only once; guardians and traps block room production', () => {
  const s = guild();
  s.flags.discovered_cells = true;
  D.refreshRouteProgress(s);
  assert(!s.guild.roomsAnnounced.includes('cells'));
  s.flags.cleared_cells = true;
  D.investigateChamber(s, 'cells');
  assert(s.guild.roomsAnnounced.includes('cells'));
  assert(s.scenes.some((n) => n.developmentRewards?.includes('cells')));
  const count = s.scenes.length;
  D.refreshRouteProgress(s);
  assert.equal(s.scenes.length, count);
  assert.match(D.roomBenefit(s, 'cells'), /worker slots/);
});
test('deeper room yields depend on effective stats and disappear while the skilled worker is away', () => {
  const s = guild();
  s.flags.discovered_fungus = s.flags.cleared_fungus = s.flags.searched_fungus = true;
  const c = s.roster[0];
  c.int = 19;
  D.assignRoomWorker(s, 'fungus', 0, c.id);
  const baseline = D.roomForecast(s, 'fungus');
  assert.equal(baseline.yieldBonus, 0);
  c.int = 20;
  assert.equal(D.roomForecast(s, 'fungus').yieldBonus, 1);
  c.int = 30;
  assert.equal(D.roomForecast(s, 'fungus').yieldBonus, 2);
  assert.equal(D.workerContribution(c, 'int').work, 4);
  c.int = 40;
  assert.equal(D.workerContribution(c, 'int').work, 5);
  c.status = 'away';
  assert.equal(D.roomForecast(s, 'fungus').yieldBonus, 0);
  assert.equal(D.roomForecast(s, 'fungus').work, 0);
  c.status = 'home';
  assert.equal(D.roomForecast(s, 'fungus').yieldBonus, 2);
});
test('version 6 saves migrate quietly without changing work, resources, builds, active missions or positions', () => {
  const s = guild();
  s.flags.discovered_sluice = s.flags.searched_sluice = true;
  s.guild.version = 6;
  for (const key of [
    'mechanisms',
    'solvedRoutes',
    'seenRoutes',
    'readyRoutes',
    'readRoutes',
    'unlocksAnnounced',
    'roomsAnnounced',
  ])
    delete s.guild[key];
  D.startRoomProject(s, 'workshop', 'shortSword');
  const before = structuredClone(s),
    loaded = reload(s);
  for (const key of [
    'gold',
    'roster',
    'flags',
    'inventory',
    'missions',
    'residentPositions',
    'scenes',
  ])
    assert.deepEqual(loaded[key], before[key]);
  assert.deepEqual(loaded.guild.facilities, before.guild.facilities);
  assert.deepEqual(loaded.guild.house, before.guild.house);
  assert.equal(loaded.guild.version, 7);
  assert.equal(loaded.guild.salvage, before.guild.salvage);
  assert(loaded.guild.patterns.includes('pattern_sluiceWinch'));
  assert.deepEqual(reload(loaded), loaded);
});
test('corrupt route ownership, solutions, read markers and reward IDs are rejected', () => {
  for (const corrupt of [
    (s) => s.guild.mechanisms.push('moonWinch'),
    (s) => (s.guild.solvedRoutes.spillway = { method: 'fake', day: 1 }),
    (s) => (s.guild.solvedRoutes.spillway = { method: 'winch', day: 1 }),
    (s) => s.guild.readRoutes.push('cellDoor'),
    (s) => s.scenes.push({ title: 'bad', body: 'bad', routeRewards: ['fake'] }),
  ]) {
    const s = guild();
    corrupt(s);
    assert.throws(() => reload(s));
  }
});
test('worker walk plans use actual stairs and secured passages rather than crossing sealed rooms', () => {
  const s = guild(),
    c = s.roster[0],
    before = D.save(s);
  const tower = planResidentWalk(
    s,
    c,
    { x: 600, y: 380, floor: 380 },
    { x: 450, y: 140, floor: 140 },
  );
  assert(tower.some((l) => l.kind === 'stairs' && l.a.x === 350));
  const study = D.chambers.find((r) => r.id === 'study');
  s.flags.discovered_study = true;
  assert.equal(
    planResidentWalk(
      s,
      c,
      { x: 600, y: 380, floor: 380 },
      { x: study.x + 200, y: study.y, floor: study.y },
    ),
    null,
  );
  s.openedPassages = ['studyDoor'];
  const route = planResidentWalk(
    s,
    c,
    { x: 600, y: 380, floor: 380 },
    { x: study.x + 200, y: study.y, floor: study.y },
  );
  assert(route.some((l) => l.kind === 'door' && l.a.x === 560));
  const saved = D.save(s);
  walkSample(route, 0);
  walkSample(route, 2);
  walkSample(route, 100);
  assert.equal(D.save(s), saved);
  assert(before.length > 0);
});
test('walking samples move continuously, climb stairs, fade through doorways and finish exactly at the station', () => {
  const s = guild(),
    c = s.roster[0],
    start = { x: 160, y: 380, floor: 380 },
    target = { x: 450, y: 140, floor: 140 };
  const route = planResidentWalk(s, c, start, target),
    first = walkSample(route, 0.3);
  assert(first.x > start.x && first.x < 350);
  assert(first.moving);
  assert.equal(first.arrived, false);
  const stair = route.find((l) => l.kind === 'stairs'),
    time = route.slice(0, route.indexOf(stair)).reduce((n, l) => n + l.duration, 0);
  const mid = walkSample(route, time + stair.duration / 2);
  assert(mid.y < 380 && mid.y > 140);
  assert.deepEqual(walkSample(route, 100), {
    ...target,
    facing: 1,
    opacity: 1,
    moving: false,
    arrived: true,
  });
});
