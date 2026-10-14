import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import * as G from './guild-management.js';
import { renderRooms } from './room-panel.js';
import { renderGuildRewards, furnishingZones, furnitureFootprints } from './guild-art.js';

const helpers = {
  esc: String,
  card: (t, b) => `<h3>${t}</h3>${b}`,
  btn: (t, a, disabled) => `<button data-action="${a}" ${disabled ? 'disabled' : ''}>${t}</button>`,
};
function guild() {
  const s = D.initial({ opening: 'legacy' });
  s.flags.repaired = true;
  s.gold = 100;
  D.assignRoomWorker(s, 'service', 2, 'mara');
  return s;
}
function tick(s, n = 1) {
  for (let i = 0; i < n; i++) {
    s.eventSeed = 97;
    D.day(s);
  }
}
const reload = (s) => D.load(D.save(s));

test('a completed banner has a placement action, appears on Decorate and can be placed with only the workshop restored', () => {
  const s = guild();
  D.startRoomProject(s, 'workshop', 'banner');
  tick(s, 2);
  const item = s.guild.furniture[0];
  assert.equal(item.id, 'banner');
  assert.match(renderGuildRewards(['banner'], String, s), /rewardFurniture:furniture-1/);
  const panel = renderRooms(s, helpers, { section: 'decorate', furnitureUid: item.uid });
  assert.match(panel, /Choose furnishing/);
  assert.match(panel, /Guild banner/);
  assert.match(panel, /furnitureMove:workshop:decoration0:furniture-1/);
  assert.doesNotMatch(panel, /furnitureMove:garden/);
  D.moveFurniture(s, 'workshop', 'decoration0', item.uid);
  assert.deepEqual(D.furniturePlacement(s, item.uid), {
    facility: 'workshop',
    slot: 'decoration0',
  });
  const loaded = reload(s);
  assert.equal(loaded.guild.facilities.workshop.decorations[0], item.uid);
  assert.equal(loaded.guild.furniture.length, 1);
});

test('a new copy is linked from its completion reward instead of an earlier owned copy or an unowned blueprint', () => {
  const s = guild();
  const first = G.grantFurniture(s, 'banner'),
    second = G.grantFurniture(s, 'banner');
  const html = renderGuildRewards(['banner', 'forge'], String, s);
  assert.match(html, /rewardFurniture:furniture-2/);
  assert.doesNotMatch(html, /rewardFurniture:furniture-1/);
  assert.doesNotMatch(html, /Place Forge/);
  D.moveFurniture(s, 'workshop', 'decoration0', second.uid);
  assert.match(
    renderGuildRewards(['banner'], String, s),
    new RegExp('rewardFurniture:' + first.uid),
  );
});

test('moving and replacing decorations retain each physical item without new costs or duplicates', () => {
  const s = guild();
  s.flags.garden = s.flags.hospice = true;
  const banner = G.grantFurniture(s, 'banner'),
    rug = G.grantFurniture(s, 'rug');
  D.moveFurniture(s, 'workshop', 'decoration0', banner.uid);
  D.moveFurniture(s, 'garden', 'decoration1', rug.uid);
  const before = { gold: s.gold, salvage: s.guild.salvage, nextFurniture: s.guild.nextFurniture };
  D.moveFurniture(s, 'garden', 'decoration1', banner.uid);
  assert.equal(s.guild.facilities.workshop.decorations[0], null);
  assert.equal(s.guild.facilities.garden.decorations[1], banner.uid);
  assert.equal(D.furniturePlacement(s, rug.uid), null);
  D.moveFurniture(s, 'infirmary', 'decoration0', banner.uid);
  assert.equal(s.guild.facilities.garden.decorations[1], null);
  assert.deepEqual(D.furniturePlacement(s, banner.uid), {
    facility: 'infirmary',
    slot: 'decoration0',
  });
  assert.deepEqual(
    { gold: s.gold, salvage: s.guild.salvage, nextFurniture: s.guild.nextFurniture },
    before,
  );
  assert.equal(reload(s).guild.furniture.length, 2);
});

test('invalid and damaged destinations fail before removing a decoration from its current room', () => {
  const s = guild();
  s.flags.garden = true;
  const banner = G.grantFurniture(s, 'banner');
  D.moveFurniture(s, 'workshop', 'decoration0', banner.uid);
  s.damagedRooms = { garden: { day: s.day, cost: 30 } };
  const before = D.save(s);
  for (const [facility, slot, uid] of [
    ['garden', 'decoration0', banner.uid],
    ['workshop', 'utility', banner.uid],
    ['infirmary', 'decoration0', banner.uid],
    ['workshop', 'decoration0', 'furniture-999'],
  ])
    assert.throws(() => D.moveFurniture(s, facility, slot, uid));
  assert.equal(D.save(s), before);
});

test('decorations can be changed during work while utility projects remain protected', () => {
  const s = guild();
  s.guild.blueprints = ['mill'];
  const banner = G.grantFurniture(s, 'banner'),
    forge = G.grantFurniture(s, 'forge'),
    other = G.grantFurniture(s, 'outfitter');
  D.moveFurniture(s, 'workshop', 'utility', forge.uid);
  D.startRoomProject(s, 'workshop', 'shortSword');
  D.moveFurniture(s, 'workshop', 'decoration0', banner.uid);
  assert.equal(s.guild.facilities.workshop.decorations[0], banner.uid);
  const before = D.save(s);
  assert.throws(() => D.moveFurniture(s, 'workshop', 'utility', other.uid), /cancel/);
  assert.equal(D.save(s), before);
  assert(D.furnitureDestinations(s, other.uid)[0].slots[0].blocked);
});

test('Decorate explains unfinished furniture and supports removal and replacement for existing saves', () => {
  const s = guild();
  D.startRoomProject(s, 'workshop', 'banner');
  tick(s);
  assert.match(
    renderRooms(s, helpers, { section: 'decorate' }),
    /Guild banner is still being built · 1\/2 work/,
  );
  tick(s);
  const banner = s.guild.furniture[0];
  D.moveFurniture(s, 'workshop', 'decoration1', banner.uid);
  const html = renderRooms(reload(s), helpers, { section: 'decorate', furnitureUid: banner.uid });
  assert.match(html, /Guild banner is placed here/);
  assert.match(html, /Remove to furniture storage/);
  assert.match(html, /Move in Decoration 1/);
  assert.match(renderRooms(s, helpers, { section: 'overview' }), /Place and move furnishings/);
});

test('work labels do not cover banners, utility furnishings, doors or the service ledger', () => {
  const s = guild();
  s.flags.garden = s.flags.hospice = true;
  const overlaps = (a, b) =>
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  const zones = furnishingZones(s, D.rooms);
  for (const z of zones) {
    assert(
      !furnitureFootprints(z).some((f) => overlaps(z, f)),
      z.id + ' work label overlaps a furnishing',
    );
    if (z.site === 'service') {
      assert(!overlaps(z, { x: 758, y: 300, w: 48, h: 82 }));
      assert(!overlaps(z, { x: 850, y: 319, w: 50, h: 61 }));
    }
  }
});
