import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import * as G from './guild-management.js';
import { roomProduction } from './production-view.js';
import { resourceSources } from './production-planning.js';
const tick = (s, n = 1) => {
  for (let i = 0; i < n; i++) {
    s.eventSeed = 97;
    D.day(s);
  }
};
const reload = (s) => D.load(D.save(s));
test('an empty greenhouse makes no supplies and offers no production rate, including after save/load', () => {
  let s = D.initial();
  const supplies = s.guild.supplies;
  assert.equal(D.dailyWork(s, 'garden'), 0);
  assert.equal(roomProduction(s, 'garden').average, 0);
  assert.equal(roomProduction(s, 'garden').nextDays, null);
  assert.equal(resourceSources(s, 'supplies').find((r) => r.room === 'garden').days, null);
  tick(s, 8);
  assert.equal(s.guild.supplies, supplies);
  assert.equal(s.guild.facilities.garden.project, null);
  s = reload(s);
  tick(s, 4);
  assert.equal(s.guild.supplies, supplies);
});
test('garden progress pauses when its last worker leaves or falls ill and resumes from the same saved work', () => {
  let s = D.initial();
  D.assignRoomWorker(s, 'garden', 0, 'bryn');
  tick(s);
  const progress = s.guild.facilities.garden.project.progress,
    supplies = s.guild.supplies;
  assert(progress > 0);
  D.assignRoomWorker(s, 'service', 0, 'bryn');
  tick(s, 4);
  assert.equal(s.guild.facilities.garden.project.progress, progress);
  assert.equal(s.guild.supplies, supplies);
  s = reload(s);
  D.assignRoomWorker(s, 'garden', 0, 'bryn');
  Object.assign(s.roster[0], { status: 'injured', injury: 1, recovery: 2 });
  assert.equal(D.dailyWork(s, 'garden'), 0);
  tick(s, 2);
  assert.equal(s.guild.facilities.garden.project.progress, progress);
  tick(s, 3);
  assert.equal(s.guild.supplies, supplies + 2);
});
test('Mara works only in her assigned room; expertise and enchanted furniture cannot run empty rooms', () => {
  const s = D.initial();
  s.guild.crafting.completed = ['shortSword', 'buckler', 'banner'];
  s.guild.facilities.workshop.tier = 2;
  const forge = G.grantFurniture(s, 'runeForge'),
    beds = G.grantFurniture(s, 'livingBeds');
  D.placeFurniture(s, 'workshop', 'utility', forge.uid);
  D.placeFurniture(s, 'garden', 'utility', beds.uid);
  assert.equal(D.dailyWork(s, 'workshop', { category: 'weapon' }), 0);
  assert.equal(D.dailyWork(s, 'garden'), 0);
  D.assignRoomWorker(s, 'garden', 0, 'mara');
  assert(D.dailyWork(s, 'garden') > 0);
  assert.equal(D.dailyWork(s, 'workshop'), 0);
  D.assignRoomWorker(s, 'service', 0, 'mara');
  assert(D.dailyWork(s, 'workshop', { category: 'weapon' }) > 0);
  assert.equal(D.dailyWork(s, 'garden'), 0);
  D.assignRoomWorker(s, 'service', 0, null);
  assert.equal(D.dailyWork(s, 'workshop'), 0);
});
test('an unstaffed queue leaves its inputs unpaid until workers start the job, and paid work pauses intact', () => {
  let s = D.initial();
  const gold = s.gold,
    scrap = s.guild.salvage;
  D.queueWorkshopOrder(s, 'shortSword', 1);
  tick(s, 3);
  assert.equal(s.gold, gold);
  assert.equal(s.guild.salvage, scrap);
  assert.equal(s.guild.facilities.workshop.queue[0].remaining, 1);
  D.assignRoomWorker(s, 'service', 0, 'mara');
  tick(s);
  const project = structuredClone(s.guild.facilities.workshop.project),
    paid = s.gold;
  assert(project.progress > 0);
  D.assignRoomWorker(s, 'service', 0, null);
  tick(s, 4);
  assert.deepEqual(s.guild.facilities.workshop.project, project);
  assert.equal(s.gold, paid);
  s = reload(s);
  D.assignRoomWorker(s, 'service', 0, 'mara');
  tick(s, 4);
  assert.equal(s.inventory.filter((i) => i.id === 'shortSword').length, 1);
});
test('paid treatment pauses without staff while useful, rather than losing progress or refunding prematurely', () => {
  const s = D.initial();
  Object.assign(s.roster[0], { status: 'injured', injury: 4, recovery: 12 });
  D.assignRoomWorker(s, 'hospice', 0, 'mara');
  D.startRoomProject(s, 'infirmary', 'treatment', 'bryn');
  tick(s);
  const project = structuredClone(s.guild.facilities.infirmary.project),
    supplies = s.guild.supplies;
  D.assignRoomWorker(s, 'hospice', 0, null);
  tick(s, 2);
  assert.deepEqual(s.guild.facilities.infirmary.project, project);
  assert.equal(s.guild.supplies, supplies);
  assert.equal(D.projectForecast(s, 'infirmary').days, null);
});
