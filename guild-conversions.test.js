import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import * as G from './guild-management.js';
import { renderRooms } from './room-panel.js';

function guild() {
  const s = D.initial();
  s.flags.repaired = s.flags.garden = s.flags.hospice = true;
  s.guild.blueprints = ['mill'];
  s.gold = 200;
  s.guild.salvage = 20;
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
const spare = (s, id = 'shortSword') => D.awardEquipment(s, id, 'Test cache');

test('management version 2 upgrades without producing work, replacing stocks or altering current orders', () => {
  const s = guild();
  D.queueWorkshopOrder(s, 'buckler', 2);
  tick(s);
  D.setGardenPolicy(s, 'reserve', 7);
  s.guild.version = 2;
  const before = structuredClone(s),
    copy = reload(s);
  assert.equal(copy.guild.version, 7);
  before.guild.version = 7;
  before.guild.unlocksAnnounced = ['cellarKey'];
  before.guild.roomsAnnounced = ['service', 'store', 'garden', 'hospice'];
  assert.deepEqual(copy, before);
  assert.deepEqual(reload(copy), copy);
});

test('reclamation reserves one physical item, saves its partial work and awards salvage only once', () => {
  let s = guild();
  const uid = spare(s),
    other = spare(s);
  D.startWorkshopConversion(s, 'reclaimEquipment', uid);
  assert.deepEqual(
    s.inventory.map((i) => i.uid),
    [other],
  );
  assert.equal(s.guild.salvage, 20);
  assert.equal(s.gold, 200);
  tick(s);
  s = reload(s);
  assert.equal(s.guild.facilities.workshop.project.progress, 1);
  assert.equal(s.guild.facilities.workshop.project.source.item.uid, uid);
  tick(s);
  assert.equal(s.guild.salvage, 23);
  assert.equal(s.guild.facilities.workshop.project, null);
  assert.equal(s.guild.nextCompletion, 1);
  assert.match(s.guild.dailySummary.lines[0], /Short sword reclaimed → \+3 scrap/);
  s = reload(s);
  tick(s, 3);
  assert.equal(s.guild.salvage, 23);
  assert.deepEqual(
    s.inventory.map((i) => i.uid),
    [other],
  );
});

test('cancelling a refit restores the exact reserved item and actual receipt without output or XP', () => {
  let s = guild();
  const uid = spare(s),
    item = structuredClone(s.inventory[0]);
  D.startWorkshopConversion(s, 'refitSword', uid);
  assert.equal(s.gold, 150);
  assert.equal(s.guild.salvage, 14);
  tick(s);
  s = reload(s);
  D.cancelRoomProject(s, 'workshop');
  assert.equal(s.gold, 200);
  assert.equal(s.guild.salvage, 20);
  assert.deepEqual(s.inventory, [item]);
  assert.equal(s.nextItem, 1);
  assert.equal(s.guild.nextCompletion, 0);
  assert.equal(s.roster[0].xp, 0);
  assert.throws(() => D.cancelRoomProject(s, 'workshop'));
  assert.deepEqual(reload(s).inventory, [item]);
});

test('refits use unlocked patterns and existing equipment bonuses, with the forge and outfitter effects', () => {
  let s = guild();
  const sword = spare(s),
    coat = spare(s, 'paddedCoat');
  const forge = G.grantFurniture(s, 'forge'),
    bench = G.grantFurniture(s, 'outfitter');
  D.placeFurniture(s, 'workshop', 'utility', forge.uid);
  assert.equal(D.workshopConversions(s).find((r) => r.id === 'refitSword').days, 2);
  D.startWorkshopConversion(s, 'refitSword', sword);
  tick(s, 2);
  assert.equal(s.gold, 150);
  assert.equal(s.guild.salvage, 14);
  assert(!s.inventory.some((i) => i.uid === sword));
  const longSword = s.inventory.find((i) => i.id === 'longSword');
  assert(longSword && longSword.owner === null);
  assert(s.scenes.some((scene) => scene.equipmentRewards?.includes('longSword')));
  assert.equal(D.equipment.find((e) => e.id === longSword.id).stats.str, 2);
  D.placeFurniture(s, 'workshop', 'utility', bench.uid);
  D.startWorkshopConversion(s, 'refitCoat', coat);
  assert.equal(s.gold, 100);
  assert.equal(s.guild.salvage, 8);
  s = reload(s);
  tick(s, 4);
  assert(s.inventory.some((i) => i.id === 'leatherArmour' && i.owner === null));
  assert(!s.inventory.some((i) => i.uid === coat));
  assert.equal(s.inventory.length, 2);
  assert.deepEqual(reload(s), s);
});

test('unaffordable, locked, mismatched, unavailable and busy conversions fail before reserving or paying', () => {
  const cases = [
    (s) => {
      s.gold = 49;
    },
    (s) => {
      s.guild.salvage = 5;
    },
    (s) => {
      s.guild.blueprints = [];
    },
    (s) => {
      delete s.flags.repaired;
    },
    (s) => {
      s.damagedRooms = { service: { day: s.day, cost: 30 } };
    },
    (s) => {
      D.startRoomProject(s, 'workshop', 'banner');
    },
  ];
  for (const setup of cases) {
    const s = guild(),
      uid = spare(s);
    setup(s);
    const before = structuredClone(s);
    assert.throws(() => D.startWorkshopConversion(s, 'refitSword', uid));
    assert.deepEqual(s, before);
  }
  const s = guild(),
    uid = spare(s, 'buckler'),
    before = structuredClone(s);
  assert.throws(() => D.startWorkshopConversion(s, 'refitSword', uid), /pattern/);
  assert.throws(() => D.startWorkshopConversion(s, 'reclaimEquipment', 'item-999'));
  assert.throws(() => D.startRoomProject(s, 'workshop', 'refitSword'), /specific stored item/);
  assert.throws(() => D.queueWorkshopOrder(s, 'reclaimEquipment'), /specific stored item/);
  assert.throws(() => D.queueWorkshopOrder(s, 'refitSword'), /specific stored item/);
  assert.deepEqual(s, before);
});

test('equipped items, rares, placed furniture and earned trophies are excluded and cannot be consumed', () => {
  const s = guild(),
    sword = spare(s),
    rare = spare(s, 'sunHammer');
  D.enterStore(s, 'bryn');
  D.equipItem(s, 'bryn', sword);
  const forge = G.grantFurniture(s, 'forge'),
    trophy = G.grantFurniture(s, 'jailerFaceplate');
  D.placeFurniture(s, 'workshop', 'utility', forge.uid);
  const before = structuredClone(s);
  for (const [recipe, uid] of [
    ['reclaimEquipment', sword],
    ['refitSword', sword],
    ['reclaimEquipment', rare],
    ['reclaimFurniture', forge.uid],
    ['reclaimFurniture', trophy.uid],
  ])
    assert.throws(() => D.startWorkshopConversion(s, recipe, uid));
  assert.deepEqual(D.workshopConversions(s), []);
  assert.deepEqual(s, before);
});

test('reserved equipment cannot be equipped and reserved furniture cannot be placed until cancellation', () => {
  const s = guild(),
    sword = spare(s);
  D.enterStore(s, 'bryn');
  D.startWorkshopConversion(s, 'reclaimEquipment', sword);
  assert.throws(() => D.equipItem(s, 'bryn', sword), /not in storage/);
  D.cancelRoomProject(s, 'workshop');
  D.equipItem(s, 'bryn', sword);
  const piece = G.grantFurniture(s, 'banner');
  D.startWorkshopConversion(s, 'reclaimFurniture', piece.uid);
  assert.throws(() => D.placeFurniture(s, 'garden', 'decoration0', piece.uid));
  D.cancelRoomProject(s, 'workshop');
  D.placeFurniture(s, 'garden', 'decoration0', piece.uid);
});

test('furniture reclamation refunds the same piece on cancellation and only consumes the selected copy on completion', () => {
  let s = guild();
  const first = G.grantFurniture(s, 'forge'),
    second = G.grantFurniture(s, 'forge');
  D.startWorkshopConversion(s, 'reclaimFurniture', first.uid);
  tick(s);
  s = reload(s);
  D.cancelRoomProject(s, 'workshop');
  assert.deepEqual(
    s.guild.furniture.find((i) => i.uid === first.uid),
    first,
  );
  assert.equal(s.guild.salvage, 20);
  D.startWorkshopConversion(s, 'reclaimFurniture', first.uid);
  tick(s, 2);
  assert.equal(s.guild.salvage, 22);
  assert.deepEqual(s.guild.furniture, [second]);
  assert.equal(s.guild.nextFurniture, 2);
  assert.deepEqual(reload(s), s);
});

test('reclaimed materials unblock planned orders on the next day without double completion or extra charges', () => {
  let s = guild();
  const uid = spare(s);
  s.guild.salvage = 0;
  D.queueWorkshopOrder(s, 'leatherCap');
  D.assignWorker(s, 'workshop', 'bryn');
  D.startWorkshopConversion(s, 'reclaimEquipment', uid);
  tick(s);
  assert.equal(s.guild.salvage, 3);
  assert.equal(s.gold, 200);
  assert.equal(s.guild.facilities.workshop.project, null);
  assert.equal(s.guild.facilities.workshop.queue.length, 1);
  assert.equal(s.roster[0].xp, 5);
  s = reload(s);
  tick(s);
  assert.equal(s.gold, 190);
  assert.equal(s.guild.salvage, 0);
  assert.equal(s.guild.facilities.workshop.project.recipe, 'leatherCap');
  tick(s);
  assert(s.inventory.some((i) => i.id === 'leatherCap'));
  assert.equal(s.roster[0].xp, 10);
  assert.equal(s.roster[0].visits, 0);
});

test('damage preserves the reserved item and Mara continues reclamation while the assigned worker travels', () => {
  let s = guild();
  const uid = spare(s);
  D.assignWorker(s, 'workshop', 'bryn');
  D.startWorkshopConversion(s, 'reclaimEquipment', uid);
  s.flags.wallSurveyed = true;
  D.dispatch(s, 'survey_mill', ['bryn']);
  s.damagedRooms = { service: { day: s.day, cost: 30 } };
  tick(s);
  s = reload(s);
  assert.equal(s.guild.facilities.workshop.project.progress, 0);
  assert.equal(s.guild.facilities.workshop.project.source.item.uid, uid);
  D.repairDamage(s, 'service');
  tick(s);
  assert.equal(s.guild.facilities.workshop.project.progress, 1);
  tick(s);
  assert.equal(s.guild.salvage, 23);
});

test('corrupt reservations, duplicate physical ownership and altered reclamation rewards are rejected on load', () => {
  const s = guild(),
    uid = spare(s);
  D.startWorkshopConversion(s, 'reclaimEquipment', uid);
  for (const corrupt of [
    (c) => {
      c.guild.version = 2;
    },
    (c) => {
      c.inventory.push(structuredClone(c.guild.facilities.workshop.project.source.item));
    },
    (c) => {
      c.guild.facilities.workshop.project.source.item.owner = 'bryn';
    },
    (c) => {
      c.guild.facilities.workshop.project.source.kind = 'furniture';
    },
    (c) => {
      c.guild.facilities.workshop.project.source.item.uid = 'item-900';
    },
    (c) => {
      c.guild.facilities.workshop.project.source.item.id = 'sunHammer';
    },
    (c) => {
      c.guild.facilities.workshop.project.yield = 900;
    },
    (c) => {
      c.guild.facilities.workshop.queue.push({
        uid: 'order-1',
        recipe: 'reclaimEquipment',
        quantity: 1,
        remaining: 1,
      });
      c.guild.nextOrder = 1;
    },
  ]) {
    const copy = structuredClone(s);
    corrupt(copy);
    assert.throws(() => reload(copy), /guild-management/);
  }
  const f = guild(),
    piece = G.grantFurniture(f, 'rug');
  D.startWorkshopConversion(f, 'reclaimFurniture', piece.uid);
  const duplicated = structuredClone(f);
  duplicated.guild.furniture.push(piece);
  assert.throws(() => reload(duplicated), /guild-management/);
});

test('workshop shows specific inputs, resulting stats, funding limits and a held piece through save/load', () => {
  const s = guild(),
    sword = spare(s);
  const helpers = {
    esc: String,
    card: (t, b) => `<h3>${t}</h3>${b}`,
    btn: (t, a, disabled) =>
      `<button data-action="${a}" ${disabled ? 'disabled' : ''}>${t}</button>`,
  };
  const html = renderRooms(s, helpers, { section: 'workshop' });
  assert.match(html, /Result: Long sword · STR \+2/);
  assert.match(html, /Result: \+3 scrap/);
  assert.match(html, /50g \+ 6 scrap \/ 4 work/);
  assert.match(html, /workshopConversion:refitSword:item-1/);
  D.startWorkshopConversion(s, 'refitSword', sword);
  const held = renderRooms(reload(s), helpers, { section: 'workshop' });
  assert.match(held, /Held: Short sword · #1/);
  assert.match(held, /Cancel to return this piece and all paid inputs/);
});
