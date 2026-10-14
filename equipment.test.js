import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { equipment, equipmentBonus } from './equipment.js';
import { effectiveStat } from './contracts.js';
function guild() {
  const s = D.initial({ opening: 'legacy' });
  s.gold = 20000;
  D.recruit(s, 'bryn');
  s.flags.repaired = true;
  D.enterStore(s, 'bryn');
  return s;
}
test('full loadout combines sword and shield stats and survives saving', () => {
  const s = guild(),
    c = s.roster[0];
  for (const id of ['shortSword', 'shield', 'leatherCap', 'paddedCoat', 'boots', 'riverCharm']) {
    D.equipItem(s, c.id, D.buyEquipment(s, id));
  }
  assert.equal(Object.keys(c.equipmentSlots).length, 6);
  assert.equal(effectiveStat(c, 'str'), c.str + 1);
  assert.equal(effectiveStat(c, 'end'), c.end + 4);
  assert.equal(effectiveStat(c, 'agi'), c.agi + 2);
  const restored = D.load(D.save(s));
  assert.deepEqual(restored.roster[0].equipmentSlots, c.equipmentSlots);
  assert.equal(restored.inventory.filter((e) => e.owner === c.id).length, 6);
  const replacement = D.buyEquipment(s, 'buckler');
  assert.throws(() => D.equipItem(s, c.id, replacement), /shield slot/);
  assert.equal(s.inventory.find((e) => e.uid === replacement).owner, null);
  D.unequip(s, c.id, 'shield');
  assert.equal(c.equipmentSlots.sword.id, 'shortSword');
  assert.equal(equipmentBonus(c, 'end'), 3);
  D.equipItem(s, c.id, replacement);
});
test('old single-item inventory migrates without duplicating physical equipment', () => {
  const s = guild();
  const uid = D.buyEquipment(s, 'shield');
  D.equipItem(s, 'bryn', uid);
  for (const c of s.roster) delete c.equipmentSlots;
  const restored = D.load(D.save(s));
  assert.equal(restored.roster[0].equipmentSlots.shield.uid, uid);
  assert.equal(restored.inventory.length, 1);
});
test('rare equipment is locked behind discovery and level eight', () => {
  const s = guild();
  assert.throws(() => D.buyEquipment(s, 'stormRod'), /guild truth/);
  s.flags.truth = true;
  const uid = D.buyEquipment(s, 'stormRod');
  s.roster[0].level = 4;
  assert.throws(() => D.equipItem(s, 'bryn', uid), /level 8/);
  assert.equal(s.inventory[0].owner, null);
  s.roster[0].level = 8;
  D.equipItem(s, 'bryn', uid);
  assert.equal(equipmentBonus(s.roster[0], 'int'), 3);
});
test('catalogue provides affordable progression without large early bonuses', () => {
  assert.equal(new Set(equipment.map((e) => e.id)).size, equipment.length);
  assert(equipment.some((e) => e.id === 'hearthBlade' && e.craftOnly));
  for (const slot of D.equipmentSlots) assert(equipment.some((e) => e.slot === slot));
  for (const e of equipment.filter((e) => e.rarity === 'common')) {
    assert(e.cost >= 100);
    assert(Object.values(e.stats).reduce((a, b) => a + b, 0) <= 2);
    assert(e.protection <= 2);
  }
});
test('save validation rejects the same physical object in multiple slots', () => {
  const s = guild();
  const uid = D.buyEquipment(s, 'shield');
  D.equipItem(s, 'bryn', uid);
  s.roster[0].equipmentSlots.head = { id: 'shield', uid };
  assert.throws(() => D.load(D.save(s)), /equipment inventory/);
});
