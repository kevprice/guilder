import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import * as G from './guild-management.js';
import { gainLevel } from './classes.js';
import { renderRooms } from './room-panel.js';

function guild() {
  const s = D.initial();
  s.flags.repaired = s.flags.garden = s.flags.hospice = s.flags.wallSurveyed = true;
  s.gold = 1000;
  s.guild.salvage = 100;
  s.guild.blueprints = ['mill', 'drains', 'tower'];
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  return s;
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
  card: (t, b) => '<h3>' + t + '</h3>' + b,
  btn: (t, a, disabled) => `<button data-action="${a}" ${disabled ? 'disabled' : ''}>${t}</button>`,
};

test('version 1 management migrates queues and policies without replacing stocks or existing work', () => {
  const s = guild();
  D.startRoomProject(s, 'workshop', 'shortSword');
  tick(s);
  s.guild.version = 1;
  delete s.guild.nextOrder;
  delete s.guild.gardenPolicy;
  delete s.guild.facilities.workshop.queue;
  s.guild.supplies = 0;
  const before = structuredClone(s),
    saved = reload(s);
  assert.equal(saved.guild.version, 3);
  assert.deepEqual(saved.guild.facilities.workshop.queue, []);
  assert.deepEqual(saved.guild.gardenPolicy, { mode: 'continuous', reserve: 8 });
  for (const key of ['gold', 'inventory', 'roster', 'day', 'flags', 'missions'])
    assert.deepEqual(saved[key], before[key]);
  assert.equal(saved.guild.salvage, before.guild.salvage);
  assert.equal(saved.guild.supplies, 0);
  assert.deepEqual(
    saved.guild.facilities.workshop.project,
    before.guild.facilities.workshop.project,
  );
  assert.deepEqual(reload(saved), saved);
});
test('planned quantities charge only as each unit starts and create physical equipment once', () => {
  let s = guild();
  const uid = D.queueWorkshopOrder(s, 'shortSword', 2);
  assert.equal(s.gold, 1000);
  assert.equal(s.guild.salvage, 100);
  tick(s);
  assert.equal(s.gold, 980);
  assert.equal(s.guild.salvage, 94);
  assert.equal(s.guild.facilities.workshop.project.orderUid, uid);
  assert.equal(s.guild.facilities.workshop.queue[0].remaining, 1);
  assert.equal(s.inventory.length, 0);
  s = reload(s);
  tick(s, 3);
  assert.equal(s.inventory.length, 1);
  assert.equal(s.guild.facilities.workshop.project, null);
  s = reload(s);
  tick(s);
  assert.equal(s.gold, 960);
  assert.equal(s.guild.salvage, 88);
  assert.equal(s.guild.facilities.workshop.queue.length, 0);
  s = reload(s);
  tick(s, 3);
  assert.equal(s.inventory.filter((i) => i.id === 'shortSword').length, 2);
  assert.equal(new Set(s.inventory.map((i) => i.uid)).size, 2);
  assert.deepEqual(reload(s), s);
});
test('blocked orders pause without payment and resume after obtaining the required inputs', () => {
  const s = guild();
  s.gold = s.guild.salvage = 0;
  D.queueWorkshopOrder(s, 'shortSword');
  tick(s, 3);
  assert.equal(s.guild.facilities.workshop.project, null);
  assert.equal(s.gold, 0);
  assert.equal(s.guild.salvage, 0);
  assert.equal(s.guild.facilities.workshop.queue[0].remaining, 1);
  assert.match(s.guild.dailySummary.lines[0], /waiting for 20 gold and 6 salvage/);
  s.gold = 200;
  D.buyResources(s, 'salvage');
  D.buyResources(s, 'salvage');
  tick(s);
  assert.equal(s.gold, 60);
  assert.equal(s.guild.salvage, 2);
  assert.equal(s.guild.facilities.workshop.project.progress, 1);
  assert.deepEqual(reload(s), s);
});
test('an order can produce the quantity it can afford and wait for the rest without charging ahead', () => {
  let s = guild();
  s.gold = 20;
  s.guild.salvage = 6;
  D.queueWorkshopOrder(s, 'shortSword', 2);
  assert.equal(D.workshopQueueForecast(s)[0].affordableUnits, 1);
  tick(s, 4);
  assert.equal(s.inventory.length, 1);
  assert.equal(s.gold, 0);
  assert.equal(s.guild.salvage, 0);
  assert.equal(s.guild.facilities.workshop.queue[0].remaining, 1);
  s = reload(s);
  tick(s, 2);
  assert.equal(s.inventory.length, 1);
  assert.equal(s.guild.facilities.workshop.project, null);
  assert.equal(s.guild.facilities.workshop.queue[0].remaining, 1);
});
test('a cheaper priority can move ahead of a blocked order and removing plans never refunds unpaid inputs', () => {
  const s = guild();
  s.gold = 5;
  s.guild.salvage = 1;
  const sword = D.queueWorkshopOrder(s, 'shortSword'),
    banner = D.queueWorkshopOrder(s, 'banner');
  tick(s);
  assert.equal(s.guild.facilities.workshop.project, null);
  D.moveWorkshopOrder(s, banner, 'up');
  tick(s, 2);
  assert.equal(s.guild.furniture.filter((f) => f.id === 'banner').length, 1);
  assert.equal(s.gold, 0);
  assert.equal(s.guild.salvage, 0);
  D.removeWorkshopOrder(s, sword);
  assert.equal(s.gold, 0);
  assert.equal(s.guild.salvage, 0);
  assert.equal(s.guild.facilities.workshop.queue.length, 0);
  assert.throws(() => D.removeWorkshopOrder(s, sword));
});
test('cancelling the active ordered item refunds its receipt while the unstarted quantity remains planned', () => {
  const s = guild();
  const uid = D.queueWorkshopOrder(s, 'buckler', 3);
  tick(s);
  const copy = reload(s);
  D.cancelRoomProject(copy, 'workshop');
  assert.equal(copy.gold, 1000);
  assert.equal(copy.guild.salvage, 100);
  assert.equal(copy.guild.facilities.workshop.queue[0].remaining, 2);
  assert.equal(copy.guild.facilities.workshop.queue[0].uid, uid);
  assert.equal(copy.inventory.length, 0);
  assert.equal(copy.guild.nextCompletion, 0);
  D.removeWorkshopOrder(copy, uid);
  tick(copy, 3);
  assert.equal(copy.inventory.length, 0);
});
test('fast staffed queues complete one item per day and obey the daily XP limit', () => {
  let s = guild();
  s.roster[0].str = 10;
  D.assignWorker(s, 'workshop', 'bryn');
  D.upgradeFacility(s, 'workshop');
  const forge = G.grantFurniture(s, 'forge');
  D.placeFurniture(s, 'workshop', 'utility', forge.uid);
  D.queueWorkshopOrder(s, 'shortSword', 3);
  for (let i = 1; i <= 3; i++) {
    tick(s);
    assert.equal(s.inventory.length, i);
    assert.equal(s.roster[0].xp, i * 5);
    assert.equal(s.roster[0].visits, 0);
    assert.deepEqual(s.guild.homeXP.workers, ['bryn']);
    s = reload(s);
  }
  assert.equal(s.guild.facilities.workshop.queue.length, 0);
  assert.equal(s.gold, 900);
  assert.equal(s.guild.salvage, 76);
});
test('queued item prices use the utility in place when work starts and cancellations refund the actual discounted inputs', () => {
  const s = guild();
  D.queueWorkshopOrder(s, 'leatherArmour', 2);
  const bench = G.grantFurniture(s, 'outfitter');
  D.placeFurniture(s, 'workshop', 'utility', bench.uid);
  tick(s);
  assert.equal(s.guild.facilities.workshop.project.inputs.salvage, 11);
  assert.throws(() => D.placeFurniture(s, 'workshop', 'utility', null), /cancel/);
  D.cancelRoomProject(s, 'workshop');
  assert.equal(s.guild.salvage, 100);
  assert.equal(s.gold, 1000);
  D.placeFurniture(s, 'workshop', 'utility', null);
  tick(s);
  assert.equal(s.guild.facilities.workshop.project.inputs.salvage, 12);
  assert.equal(s.guild.salvage, 88);
  assert.equal(s.gold, 930);
  assert.deepEqual(reload(s), s);
});
test('planning and storage remain usable while a restored workshop is damaged, but work waits for repair', () => {
  const s = guild();
  s.damagedRooms = { service: { day: s.day, cost: 30 } };
  D.queueWorkshopOrder(s, 'softShoes');
  tick(s);
  assert.equal(s.gold, 1000);
  assert.equal(s.guild.facilities.workshop.project, null);
  assert.equal(D.workshopQueueForecast(s)[0].completionDay, null);
  D.repairDamage(s, 'service');
  tick(s);
  assert.equal(s.gold, 960);
  assert.equal(s.guild.facilities.workshop.project.progress, 1);
});
test('paused crops retain progress through days and save/load while expeditions continue', () => {
  let s = guild();
  tick(s);
  D.setGardenPolicy(s, 'paused');
  D.dispatch(s, 'road', ['bryn']);
  const supplies = s.guild.supplies;
  tick(s, 6);
  assert.equal(s.guild.facilities.garden.project.progress, 1);
  assert.equal(s.guild.supplies, supplies);
  assert.notEqual(s.missions[0].status, 'travelling');
  s = reload(s);
  D.setGardenPolicy(s, 'continuous');
  tick(s, 3);
  assert.equal(s.guild.supplies, supplies + 2);
  assert.equal(s.guild.facilities.garden.project, null);
});
test('reserve farming stops at its target and resumes after a medical kit lowers stocks', () => {
  const s = guild();
  D.setGardenPolicy(s, 'reserve', 6);
  tick(s, 4);
  assert.equal(s.guild.supplies, 6);
  assert.equal(D.productionPause(s, 'garden'), 'Supply reserve met');
  tick(s, 3);
  assert.equal(s.guild.facilities.garden.project, null);
  D.dispatch(s, 'road', ['bryn'], { medicalKit: 'supplies' });
  assert.equal(s.guild.supplies, 4);
  tick(s);
  assert.equal(s.guild.facilities.garden.project.progress, 1);
  assert.equal(D.productionPause(s, 'garden'), null);
});
test('a reserve target preserves partially grown crops after a purchase and imposes no storage cap', () => {
  const s = guild();
  D.setGardenPolicy(s, 'reserve', 6);
  tick(s);
  D.buyResources(s, 'supplies');
  tick(s, 2);
  assert.equal(s.guild.supplies, 6);
  assert.equal(s.guild.facilities.garden.project.progress, 1);
  D.buyResources(s, 'supplies');
  assert.equal(s.guild.supplies, 8);
  D.setGardenPolicy(s, 'continuous');
  tick(s, 3);
  assert.equal(s.guild.supplies, 10);
});
test('raised-bed harvests may exceed the reserve and do not repeat while the target is met', () => {
  const s = guild();
  s.guild.supplies = 5;
  const beds = G.grantFurniture(s, 'raisedBeds');
  D.placeFurniture(s, 'garden', 'utility', beds.uid);
  D.setGardenPolicy(s, 'reserve', 6);
  tick(s, 4);
  assert.equal(s.guild.supplies, 8);
  tick(s, 4);
  assert.equal(s.guild.supplies, 8);
  assert.equal(s.guild.facilities.garden.project, null);
  assert.deepEqual(reload(s), s);
});
test('forecasts use equipped stats and preview an absent worker without modifying ownership or work', () => {
  const s = guild(),
    c = s.roster[0];
  while (c.level < D.equipment.find((e) => e.id === 'longSword').minLevel) gainLevel(c);
  c.str = 8;
  const uid = D.buyEquipment(s, 'longSword');
  D.enterStore(s, c.id);
  D.equipItem(s, c.id, uid);
  D.leaveStore(s);
  D.assignWorker(s, 'workshop', c.id);
  D.startRoomProject(s, 'workshop', 'shortSword');
  D.queueWorkshopOrder(s, 'buckler', 2);
  const before = D.save(s),
    staffed = D.projectForecast(s, 'workshop'),
    alone = D.projectForecast(s, 'workshop', null);
  assert.equal(staffed.workerStat, 10);
  assert.equal(staffed.total, 3);
  assert.equal(staffed.days, 2);
  assert.equal(alone.total, 1);
  assert.equal(alone.days, 4);
  const impact = D.roomWorkAbsence(s, [c.id])[0];
  assert.equal(impact.before, 3);
  assert.equal(impact.after, 1);
  assert.equal(D.workshopQueueForecast(s)[0].completionDay, s.day + 4);
  assert.equal(D.save(s), before);
});
test('invalid plans and policies fail atomically and corrupted queue saves are rejected', () => {
  const s = guild(),
    before = D.save(s);
  for (const [id, count] of [
    ['crop', 1],
    ['shortSword', 0],
    ['shortSword', 100],
    ['missing', 1],
  ])
    assert.throws(() => D.queueWorkshopOrder(s, id, count));
  for (const [mode, target] of [
    ['unknown', 8],
    ['reserve', 0],
    ['reserve', 1.5],
  ])
    assert.throws(() => D.setGardenPolicy(s, mode, target));
  assert.equal(D.save(s), before);
  D.queueWorkshopOrder(s, 'shortSword', 2);
  for (const mutate of [
    (s) => (s.guild.facilities.workshop.queue[0].remaining = 3),
    (s) => (s.guild.facilities.workshop.queue[0].recipe = 'crop'),
    (s) => s.guild.facilities.workshop.queue.push({ ...s.guild.facilities.workshop.queue[0] }),
    (s) => (s.guild.nextOrder = 0),
    (s) => (s.guild.gardenPolicy.reserve = -1),
  ]) {
    const bad = structuredClone(s);
    mutate(bad);
    assert.throws(() => reload(bad), /guild-management/);
  }
});
test('the next queued weapon gets its forge bonus in departure forecasts without counting its work twice', () => {
  const s = guild();
  s.roster[0].str = 10;
  const forge = G.grantFurniture(s, 'forge');
  D.placeFurniture(s, 'workshop', 'utility', forge.uid);
  D.assignWorker(s, 'workshop', 'bryn');
  D.queueWorkshopOrder(s, 'shortSword', 3);
  const forecast = D.projectForecast(s, 'workshop');
  assert.equal(forecast.total, 4);
  assert.equal(forecast.days, 1);
  assert.equal(D.workshopQueueForecast(s)[0].completionDay, s.day + 3);
  const absent = D.roomWorkAbsence(s, ['bryn'])[0];
  assert.equal(absent.before, 4);
  assert.equal(absent.after, 2);
  assert.equal(absent.scope, 'next ordered item');
  assert.equal(absent.afterDays, 2);
  D.dispatch(s, 'survey_mill', ['bryn']);
  const panel = renderRooms(s, helpers, { section: 'workshop' });
  assert.match(panel, /2 work per day/);
  assert.match(panel, /forge \+1/);
  s.gold = 0;
  assert.equal(D.projectForecast(s, 'workshop').days, null);
  assert.equal(D.projectForecast(s, 'workshop').paused, 'Waiting for resources');
});
test('room pages show funding deficits, worker thresholds, policies and reusable furniture stock', () => {
  const s = guild();
  s.gold = 0;
  s.guild.salvage = 0;
  D.queueWorkshopOrder(s, 'shortSword', 3);
  assert.match(renderRooms(s, helpers, { section: 'overview' }), /3 items planned/);
  const workshop = renderRooms(s, helpers, { section: 'workshop' });
  assert.match(workshop, /short by 60 gold \+ 18 salvage/);
  assert.match(workshop, /Items per new order/);
  assert.match(workshop, /STR 7/);
  assert.doesNotMatch(workshop, /Growing mode/);
  const garden = renderRooms(s, helpers, { section: 'garden' });
  assert.match(garden, /Maintain a supply reserve/);
  assert.doesNotMatch(garden, /Planned orders/);
  const banner = G.grantFurniture(s, 'banner');
  G.grantFurniture(s, 'banner');
  D.placeFurniture(s, 'workshop', 'decoration0', banner.uid);
  assert.match(
    renderRooms(s, helpers, { section: 'storage' }),
    /2 owned · 1 in storage · 1 placed/,
  );
});
