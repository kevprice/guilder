import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import * as G from './guild-management.js';
import { materials } from './production-catalogue.js';
import { itemDefinition } from './equipment.js';
import { recipeCosts, spendResources, refundResources, tradeResources } from './resource-ledger.js';
import { craftPlan, queueCommitments, resourceSources } from './production-planning.js';
import { renderCrafting } from './management-ui.js';

// The production day can run without missions, adventurer recruits, dialogue or campaign state.
function factory() {
  const s = {
    day: 1,
    gold: 500,
    flags: { repaired: true },
    roster: [],
    inventory: [],
    scenes: [],
    damagedRooms: {},
    threats: {},
    guild: G.managementState(),
  };
  G.assignRoomWorker(s, 'service', 2, 'mara');
  return s;
}
const hooks = {
  pay: (s, n) => {
    s.gold -= n;
  },
  earn: (s, n) => {
    s.gold += n;
  },
  note: () => {},
  awardXP: () => {},
  itemName: (id) => itemDefinition(id).name,
  awardEquipment: (s, id) => {
    s.inventory.push({ uid: 'test-' + (s.inventory.length + 1), id, owner: null });
  },
};
function stocked() {
  const s = factory();
  s.guild.salvage = 100;
  for (const m of materials) s.guild.house.materials[m.id] = 100;
  return s;
}
function finish(s, id) {
  G.startProject(s, 'workshop', id, null, hooks);
  for (let day = 0; day < 20 && s.guild.facilities.workshop.project; day++) {
    s.day++;
    G.advanceRooms(s, hooks);
  }
  assert.equal(s.guild.facilities.workshop.project, null);
}
test('resource payments reject every shortfall and malformed amount before spending anything', () => {
  const s = factory(),
    before = structuredClone(s);
  assert.throws(() => spendResources(s, { gold: 10, salvage: 7 }, hooks));
  assert.deepEqual(s, before);
  for (const bad of [-1, 0.5, NaN, Infinity, null]) assert.throws(() => recipeCosts({ gold: bad }));
  assert.throws(() => recipeCosts({ materials: { unknown: 1 } }));
  assert.throws(() => recipeCosts({ materials: { gold: 1 } }));
  assert.throws(() => recipeCosts({ gold: Number.MAX_SAFE_INTEGER }, 2));
  assert.deepEqual(s, before);
});
test('refund overflow and failed trades cannot credit gold or remove another resource', () => {
  const s = stocked();
  s.guild.house.materials.ore = Number.MAX_SAFE_INTEGER;
  const before = structuredClone(s);
  assert.throws(() => refundResources(s, { gold: 20, materials: { ore: 1 } }, hooks));
  assert.deepEqual(s, before);
  s.gold = Number.MAX_SAFE_INTEGER;
  const full = structuredClone(s);
  assert.throws(() => tradeResources(s, { timber: 1 }, { gold: 1 }, hooks));
  assert.deepEqual(s, full);
  assert.throws(() => tradeResources(s, {}, { cloth: NaN }, hooks));
  assert.deepEqual(s, full);
});
test('paid reservations refund exact resources while unstarted orders remain unpaid', () => {
  const s = stocked(),
    before = structuredClone(s);
  G.queueWorkshopOrder(s, 'shortSword', 2);
  assert.equal(s.gold, before.gold);
  assert.equal(s.guild.salvage, before.guild.salvage);
  G.startProject(s, 'workshop', 'materials_shortSword', null, hooks);
  assert.equal(s.gold, before.gold - 20);
  assert.equal(s.guild.house.materials.ore, 98);
  assert.deepEqual(queueCommitments(s), { gold: 40, salvage: 12 });
  G.cancelProject(s, 'workshop', hooks);
  assert.equal(s.gold, before.gold);
  assert.deepEqual(s.guild.house.materials, before.guild.house.materials);
  assert.equal(s.guild.facilities.workshop.queue[0].remaining, 2);
  assert.equal(G.craftingProgress(s).count, 0);
});
test('a production-only guild crafts physical items and gains ranks from diversity, never repetition', () => {
  const s = stocked();
  finish(s, 'shortSword');
  finish(s, 'materials_shortSword');
  finish(s, 'shortSword');
  assert.equal(s.inventory.length, 3);
  assert.equal(G.craftingProgress(s).count, 1);
  finish(s, 'huntingBow');
  finish(s, 'buckler');
  assert.equal(G.craftingProgress(s).name, 'Artisan');
  assert.equal(G.dailyWork(s, 'workshop'), 2);
  assert.equal(s.scenes.filter((s) => s.title === 'Workshop: Artisan').length, 1);
  for (const id of ['softShoes', 'leatherCap', 'paddedCoat', 'ashStaff', 'banner']) finish(s, id);
  assert.equal(G.craftingProgress(s).name, 'Guildwright');
  assert.equal(G.dailyWork(s, 'workshop'), 3);
  assert.equal(s.roster.length, 0);
  assert.equal(s.missions, undefined);
});
test('guild expertise cannot run an empty workshop after its caretaker leaves', () => {
  const s = stocked();
  for (const id of ['shortSword', 'huntingBow', 'buckler']) finish(s, id);
  G.assignRoomWorker(s, 'corridor', 0, 'mara');
  assert.equal(G.workBreakdown(s, 'workshop').mastery, 0);
  assert.equal(G.dailyWork(s, 'workshop'), 0);
  const p = craftPlan(s, 'shortSword', 3);
  assert.equal(p.days, null);
});
test('crafting plans account for batches and earlier orders without changing stock or state', () => {
  const s = factory();
  G.queueWorkshopOrder(s, 'shortSword', 2);
  const before = structuredClone(s),
    p = craftPlan(s, 'leatherCap', 3);
  assert.deepEqual(p.cost, { gold: 30, salvage: 9 });
  const scrap = p.materials.find((m) => m.id === 'salvage');
  assert.equal(scrap.owned, 6);
  assert.equal(scrap.planned, 12);
  assert.equal(scrap.plannedMissing, 15);
  assert.deepEqual(s, before);
});
test('later orders do not promise completion dates while current work has no crew', () => {
  const s = stocked();
  G.startProject(s, 'workshop', 'shortSword', null, hooks);
  G.assignRoomWorker(s, 'corridor', 0, 'mara');
  G.queueWorkshopOrder(s, 'softShoes', 2);
  const q = G.workshopQueueForecast(s)[0];
  assert.equal(q.days, null);
  assert.equal(q.completionDay, null);
});
test('resource sources reflect utility output and a source without workers never promises a rate', () => {
  const s = factory();
  s.flags.garden = true;
  G.assignRoomWorker(s, 'garden', 0, 'mara');
  s.guild.blueprints = ['tower'];
  const item = G.grantFurniture(s, 'raisedBeds');
  G.placeFurniture(s, 'garden', 'utility', item.uid);
  const source = resourceSources(s, 'supplies').find((s) => s.room === 'garden');
  assert.equal(source.amount, 3);
  assert.equal(source.days, 4);
  const timber = resourceSources(s, 'timber').find((s) => s.room === 'corridor');
  assert.equal(timber.days, null);
});
test('version 7 migration recovers proven workshop products without granting credit for purchased gear', () => {
  const s = D.initial({ opening: 'legacy' });
  s.flags.repaired = true;
  D.assignRoomWorker(s, 'service', 2, 'mara');
  s.gold = 300;
  s.guild.salvage = 30;
  D.startRoomProject(s, 'workshop', 'shortSword');
  for (let i = 0; i < 4; i++) D.day(s);
  D.awardEquipment(s, 'ashStaff', 'Market');
  s.guild.version = 7;
  delete s.guild.crafting;
  for (const c of s.guild.completions) delete c.recipe;
  const before = structuredClone(s),
    copy = D.load(D.save(s));
  assert.equal(copy.guild.version, 9);
  assert.deepEqual(G.craftingProgress(copy).products, ['item:shortSword']);
  assert.equal(copy.gold, before.gold);
  assert.deepEqual(copy.inventory, before.inventory);
  assert.deepEqual(copy.guild.facilities, before.guild.facilities);
  assert.deepEqual(copy.guild.house, before.guild.house);
  assert.deepEqual(D.load(D.save(copy)), copy);
});
test('crafting progression rejects unknown or duplicate completion identifiers on load', () => {
  for (const completed of [['unknown'], ['shortSword', 'shortSword']]) {
    const s = D.initial({ opening: 'legacy' });
    s.guild.crafting.completed = completed;
    assert.throws(() => D.load(D.save(s)));
  }
});
test('craft screen shows quantity, staff pauses, material commitments and workshop progress together', () => {
  const s = factory();
  G.assignRoomWorker(s, 'corridor', 0, 'mara');
  G.queueWorkshopOrder(s, 'shortSword', 2);
  const h = {
    esc: String,
    btn: (t, a, d) => `<button data-action="${a}" ${d ? 'disabled' : ''}>${t}</button>`,
  };
  const html = renderCrafting(s, h, { craftRecipe: 'leatherCap', craftQuantity: 3 });
  assert.match(html, /Craft quantity/);
  assert.match(html, /value="3"/);
  assert.match(html, /15 more after earlier orders/);
  assert.match(html, /No fit workers/);
  assert.match(html, /Apprentice/);
  assert.match(html, /craftOrder:leatherCap/);
});

test('long discovered-pattern projects save and reload using their recipe work requirement', () => {
  const s = D.initial({ opening: 'legacy' });
  s.flags.repaired = true;
  s.flags.searched_rift = true;
  s.guild.patterns.push('pattern_wardStaff');
  s.gold = 1000;
  for (const m of materials) s.guild.house.materials[m.id] = 100;
  D.startRoomProject(s, 'workshop', 'pattern_wardStaff');
  assert.equal(s.guild.facilities.workshop.project.work, 10);
  const copy = D.load(D.save(s));
  assert.deepEqual(copy.guild.facilities.workshop.project, s.guild.facilities.workshop.project);
  copy.guild.facilities.workshop.project.work = 9;
  assert.throws(() => D.load(D.save(copy)));
});
test('completion provenance must refer to the recipe actually supported by that facility', () => {
  const s = D.initial({ opening: 'legacy' });
  s.flags.repaired = true;
  D.assignRoomWorker(s, 'service', 2, 'mara');
  s.gold = 100;
  s.guild.salvage = 10;
  D.startRoomProject(s, 'workshop', 'shortSword');
  for (let i = 0; i < 4; i++) D.day(s);
  assert.equal(s.guild.completions.find((c) => c.facility === 'workshop').recipe, 'shortSword');
  const copy = structuredClone(s);
  copy.guild.completions.find((c) => c.facility === 'workshop').recipe = 'crop';
  assert.throws(() => D.load(D.save(copy)));
});
