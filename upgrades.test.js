import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import * as G from './guild-management.js';
import { craftingProgress } from './crafting-progression.js';
import { furnishingUpgrades } from './furnishing-upgrades.js';
import { renderUpgrades } from './upgrade-ui.js';
import { renderCrafting, recipeCatalogue } from './management-ui.js';
import { renderRooms } from './room-panel.js';
import { resourceSources } from './production-planning.js';
import { roomProduction } from './production-view.js';
import { progressionScenario } from './tools/progression-scenario.mjs';

function guild() {
  const s = D.initial({ opening: 'legacy' });
  Object.assign(s.flags, { repaired: true, garden: true, tower: true, fenRoom1Ready: true });
  s.guild.blueprints = ['mill', 'tower'];
  s.gold = 300;
  s.guild.salvage = 30;
  for (const id in s.guild.house.materials) s.guild.house.materials[id] = 30;
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
function finish(s) {
  for (let i = 0; i < 20 && s.guild.facilities.workshop.project; i++) tick(s);
  assert.equal(s.guild.facilities.workshop.project, null);
}
const reload = (s) => D.load(D.save(s));
const helpers = {
  esc: String,
  btn: (t, a, d) => `<button data-action="${a}" ${d ? 'disabled' : ''}>${t}</button>`,
  card: (t, b) => `<section><h3>${t}</h3>${b}</section>`,
};

test('furnishing recipes chain through the same physical item without replacing its neighbours', () => {
  let s = guild();
  const first = G.grantFurniture(s, 'forge'),
    second = G.grantFurniture(s, 'forge');
  const spare = structuredClone(second);
  for (const [recipe, output] of [
    ['upgrade_reinforcedForge', 'reinforcedForge'],
    ['upgrade_runeForge', 'runeForge'],
  ]) {
    D.startWorkshopConversion(s, recipe, first.uid);
    tick(s);
    s = reload(s);
    finish(s);
    assert.equal(s.guild.furniture.find((i) => i.uid === first.uid).id, output);
    assert.deepEqual(
      s.guild.furniture.find((i) => i.uid === second.uid),
      spare,
    );
    assert.equal(s.guild.nextFurniture, 2);
    assert.equal(s.guild.furniture.length, 2);
    s = reload(s);
  }
  const before = structuredClone(s);
  assert.throws(() => D.startWorkshopConversion(s, 'upgrade_runeForge', first.uid), /pattern/);
  assert.deepEqual(s, before);
  assert.equal(craftingProgress(s).count, 2);
});

test('cancelling a saved enchantment restores the reinforced piece and its exact receipt', () => {
  let s = guild();
  const piece = G.grantFurniture(s, 'reinforcedForge'),
    original = structuredClone(piece);
  const gold = s.gold,
    materials = structuredClone(s.guild.house.materials);
  D.startWorkshopConversion(s, 'upgrade_runeForge', piece.uid);
  tick(s);
  s = reload(s);
  assert.equal(s.guild.facilities.workshop.project.source.item.id, 'reinforcedForge');
  assert(!s.guild.furniture.some((i) => i.uid === piece.uid));
  assert.throws(() => D.placeFurniture(s, 'workshop', 'utility', piece.uid));
  D.cancelRoomProject(s, 'workshop');
  assert.equal(s.gold, gold);
  assert.deepEqual(s.guild.house.materials, materials);
  assert.deepEqual(s.guild.furniture, [original]);
  assert.equal(craftingProgress(s).count, 0);
  assert.deepEqual(reload(s).guild.furniture, [original]);
});

test('stage skipping, missing materials and placed pieces fail before payment or reservation', () => {
  for (const setup of [
    (s) => {},
    (s) => {
      s.guild.house.materials.ore = 0;
    },
    (s, p) => D.placeFurniture(s, 'workshop', 'utility', p.uid),
  ]) {
    const s = guild(),
      p = G.grantFurniture(s, 'forge');
    setup(s, p);
    const before = structuredClone(s);
    const id =
      s.guild.house.materials.ore === 0 || s.guild.facilities.workshop.utility
        ? 'upgrade_reinforcedForge'
        : 'upgrade_runeForge';
    assert.throws(() => D.startWorkshopConversion(s, id, p.uid));
    assert.deepEqual(s, before);
  }
});

test('enhancements cannot be mass-queued or built without the required existing piece', () => {
  const s = guild();
  s.outside.bestiary.briarStag = { seen: true, sketch: true, tier: 1 };
  for (const recipe of G.recipes.filter((r) => r.sourceFurniture || r.enchantment)) {
    const before = structuredClone(s);
    assert.throws(() => D.queueWorkshopOrder(s, recipe.id));
    assert.throws(() => D.startRoomProject(s, 'workshop', recipe.id), /specific stored item/);
    assert.deepEqual(s, before);
    assert(!recipeCatalogue(s).some((r) => r.id === recipe.id));
  }
  for (const def of furnishingUpgrades)
    assert(!G.recipes.some((r) => r.furniture === def.id && !r.sourceFurniture));
});

test('corrupt reserved furnishing identities and prerequisite stages are rejected on load', () => {
  const s = guild(),
    p = G.grantFurniture(s, 'reinforcedForge');
  D.startWorkshopConversion(s, 'upgrade_runeForge', p.uid);
  for (const corrupt of [
    (s) => {
      s.guild.facilities.workshop.project.source.item.id = 'forge';
    },
    (s) => {
      s.guild.facilities.workshop.project.source.kind = 'equipment';
    },
    (s) => {
      s.guild.furniture.push(structuredClone(s.guild.facilities.workshop.project.source.item));
    },
    (s) => {
      s.guild.facilities.workshop.project.inputs.materials.aether = 1;
    },
  ]) {
    const copy = structuredClone(s);
    corrupt(copy);
    assert.throws(() => reload(copy));
  }
  assert.deepEqual(
    reload(s).guild.facilities.workshop.project,
    s.guild.facilities.workshop.project,
  );
});

test('reinforced and runic forges speed actual work only with a fit worker or caretaker', () => {
  const s = guild(),
    forge = G.grantFurniture(s, 'runeForge');
  D.placeFurniture(s, 'workshop', 'utility', forge.uid);
  assert.equal(G.workBreakdown(s, 'workshop', { category: 'weapon' }).utility, 3);
  assert.equal(G.workBreakdown(s, 'workshop', { category: 'furniture' }).utility, 1);
  D.startRoomProject(s, 'workshop', 'shortSword');
  tick(s);
  assert(s.inventory.some((i) => i.id === 'shortSword'));
  D.assignRoomWorker(s, 'corridor', 0, 'mara');
  s.guild.facilities.workshop.tier = 2;
  assert.equal(G.dailyWork(s, 'workshop', { category: 'weapon' }), 0);
  D.startRoomProject(s, 'workshop', 'shortSword');
  tick(s);
  assert.equal(s.guild.facilities.workshop.project.progress, 0);
  assert.equal(G.workshopConversions(s)[0].days, null);
});

test('living beds improve real harvests and source forecasts without an input-charge exploit', () => {
  const s = guild(),
    beds = G.grantFurniture(s, 'livingBeds');
  D.placeFurniture(s, 'garden', 'utility', beds.uid);
  const supplies = s.guild.supplies;
  const crop = G.projectRecipe(s, 'garden', 'crop');
  assert.equal(crop.work, 3);
  assert.equal(crop.yield, 4);
  const source = resourceSources(s, 'supplies').find((r) => r.room === 'garden');
  assert.equal(source.amount, 4);
  assert.equal(source.days, 3);
  tick(s, 3);
  assert.equal(s.guild.supplies, supplies + 4);
  D.setGardenPolicy(s, 'paused');
  tick(s, 5);
  assert.equal(s.guild.supplies, supplies + 4);
  assert.equal(resourceSources(s, 'supplies').find((r) => r.room === 'garden').days, null);
  assert.deepEqual(reload(s).guild.furniture, s.guild.furniture);
});

test('enchanted shelves boost completed aether production, never unrelated rooms or duplicates', () => {
  const s = guild(),
    a = G.grantFurniture(s, 'runeShelf'),
    b = G.grantFurniture(s, 'runeShelf');
  D.assignRoomWorker(s, 'tower', 0, 'ivo');
  D.placeFurniture(s, 'room_tower', 'decoration0', a.uid);
  D.placeFurniture(s, 'room_tower', 'decoration1', b.uid);
  const forecast = G.roomForecast(s, 'tower'),
    aether = s.guild.house.materials.aether;
  assert.equal(forecast.role.output.aether, 2);
  assert.equal(roomProduction(s, 'tower').amount, 2);
  tick(s, forecast.days);
  assert.equal(s.guild.house.materials.aether, aether + 2);
  D.placeFurniture(s, 'room_tower', 'decoration0', null);
  D.placeFurniture(s, 'room_quarters', 'decoration0', a.uid);
  assert.equal(G.roomForecast(s, 'quarters').role.output.cloth, 2);
  s.roster.find((c) => c.id === 'ivo').status = 'away';
  assert.equal(G.roomForecast(s, 'tower').work, 0);
});

test('evergreen planters increase actual herb harvests while remaining dormant in other rooms', () => {
  const s = guild(),
    plant = G.grantFurniture(s, 'verdantPlant');
  D.assignRoomWorker(s, 'fenRoom1', 0, 'ivo');
  D.placeFurniture(s, 'room_fenRoom1', 'decoration0', plant.uid);
  const f = G.roomForecast(s, 'fenRoom1'),
    herbs = s.guild.house.materials.herbs;
  assert.equal(f.role.output.herbs, 3);
  tick(s, f.days);
  assert.equal(s.guild.house.materials.herbs, herbs + 3);
  D.placeFurniture(s, 'room_fenRoom1', 'decoration0', null);
  assert.equal(G.roomForecast(s, 'fenRoom1').role.output.herbs, 2);
});

test('ward banners add defence only to staffed, operational watch rooms with watch enabled', () => {
  const s = guild();
  D.assignRoomWorker(s, 'entrance', 0, 'bryn');
  const before = G.maraPower(s),
    a = G.grantFurniture(s, 'wardBanner'),
    b = G.grantFurniture(s, 'wardBanner');
  D.placeFurniture(s, 'room_entrance', 'decoration0', a.uid);
  D.placeFurniture(s, 'room_entrance', 'decoration1', b.uid);
  assert.equal(G.maraPower(s), before + 4);
  assert.equal(roomProduction(s, 'entrance').work * 2, before + 4);
  D.setMaraDefence(s, false);
  assert.equal(G.maraPower(s), 0);
  D.setMaraDefence(s, true);
  D.assignRoomWorker(s, 'store', 0, 'bryn');
  assert.equal(G.maraPower(s), 0);
  D.assignRoomWorker(s, 'entrance', 0, 'bryn');
  s.damagedRooms = { entrance: { day: s.day, cost: 30 } };
  assert.equal(G.maraPower(s), 0);
});

test('a sword can be refitted then enchanted, preserving its identity, equipment stats and house bonus', () => {
  let s = guild();
  const uid = D.awardEquipment(s, 'shortSword', 'Workshop');
  for (const id of ['refitSword', 'enchantHearthBlade']) {
    D.startWorkshopConversion(s, id, uid);
    tick(s);
    s = reload(s);
    finish(s);
    assert.equal(s.inventory.length, 1);
    assert.equal(s.inventory[0].uid, uid);
    assert.equal(s.nextItem, 1);
  }
  D.enterStore(s, 'bryn');
  D.equipItem(s, 'bryn', uid);
  D.leaveStore(s);
  D.assignWorker(s, 'workshop', 'bryn');
  assert.equal(G.workBreakdown(s, 'workshop').tools, 1);
  assert.equal(
    G.effectiveWorkStat(
      s.roster.find((c) => c.id === 'bryn'),
      'str',
    ),
    s.roster.find((c) => c.id === 'bryn').str + 3,
  );
  assert.equal(
    reload(s).roster.find((c) => c.id === 'bryn').equipmentSlots.sword.id,
    'hearthBlade',
  );
  s.roster.find((c) => c.id === 'bryn').injury = 1;
  assert.equal(G.workBreakdown(s, 'workshop').tools, 0);
  s.flags.truth = true;
  const before = structuredClone(s);
  assert.throws(() => D.buyEquipment(s, 'hearthBlade'), /enchantment/);
  assert.deepEqual(s, before);
});

test('upgrades grow mastery once per resulting design and reclamation remains safe afterwards', () => {
  const s = guild();
  for (let i = 0; i < 2; i++) {
    const p = G.grantFurniture(s, 'forge');
    D.startWorkshopConversion(s, 'upgrade_reinforcedForge', p.uid);
    finish(s);
  }
  assert.equal(craftingProgress(s).count, 1);
  const p = s.guild.furniture[0],
    salvage = s.guild.salvage;
  D.startWorkshopConversion(s, 'reclaimFurniture', p.uid);
  finish(s);
  assert.equal(s.guild.salvage, salvage + 2);
  assert.equal(craftingProgress(s).count, 1);
  assert.equal(s.guild.furniture.length, 1);
  assert.deepEqual(reload(s).guild.furniture, s.guild.furniture);
});

test('recovering metal works before the furnace boss and cancellation returns all scrap', () => {
  const s = D.initial({ opening: 'legacy' });
  s.flags.repaired = true;
  D.assignRoomWorker(s, 'service', 2, 'mara');
  const stock = s.guild.salvage;
  D.startRoomProject(s, 'workshop', 'recoverMetal');
  assert.equal(s.guild.salvage, stock - 2);
  D.cancelRoomProject(s, 'workshop');
  assert.equal(s.guild.salvage, stock);
  D.queueWorkshopOrder(s, 'recoverMetal', 2);
  tick(s, 6);
  assert.equal(s.guild.house.materials.ore, 4);
  assert.equal(s.guild.salvage, stock - 4);
  assert(!s.flags.dragonSlain);
  assert.equal(craftingProgress(s).count, 1);
});

test('crafting UI exposes prerequisites, specific stored pieces, material shortfalls and cancellation', () => {
  const s = guild(),
    p = G.grantFurniture(s, 'forge');
  let html = renderCrafting(s, helpers);
  assert.match(html, /Upgrade & enchant/);
  assert.match(html, new RegExp('workshopConversion:upgrade_reinforcedForge:' + p.uid));
  assert.match(html, /Complete the preceding upgrade/);
  D.placeFurniture(s, 'workshop', 'utility', p.uid);
  html = renderUpgrades(s, helpers);
  assert.match(html, /Remove this piece to storage/);
  D.placeFurniture(s, 'workshop', 'utility', null);
  D.startWorkshopConversion(s, 'upgrade_reinforcedForge', p.uid);
  html = renderRooms(s, helpers, { section: 'workshop' });
  assert.match(html, /upgrades this same item to Reinforced forge/);
  assert.match(html, /cancelProject:workshop/);
});

test('earned production and active crews reach Guildwright and every house enchantment from starter stocks', () => {
  const { state: s, stages, days } = progressionScenario();
  assert(days <= 140, 'The restored-house route should complete without excessive waiting');
  assert(stages.find((p) => p.recipe === 'enchantHearthBlade').day <= 70);
  assert.equal(s.inventory[0].id, 'hearthBlade');
  assert.deepEqual(
    new Set(s.guild.furniture.map((i) => i.id)),
    new Set(['runeForge', 'livingBeds', 'runeShelf', 'wardBanner', 'verdantPlant']),
  );
  assert.equal(s.nextItem, 1);
  assert.equal(s.guild.nextFurniture, 5);
  assert.equal(craftingProgress(s).name, 'Guildwright');
  assert.equal(s.missions.length, 0);
  assert(stages.some((p) => p.recipe === 'recoverMetal'));
  assert(stages.some((p) => p.recipe === 'brassComponents'));
});
