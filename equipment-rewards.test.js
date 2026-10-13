import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { equipment } from './equipment.js';
import { equipmentIcon, renderEquipmentRewards } from './equipment-rewards.js';
const esc = (value) =>
  String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
test('investigating treasure includes prominent physical equipment rewards and only awards them once', () => {
  const s = D.initial();
  D.recruit(s, 'bryn');
  s.selected = 'bryn';
  s.flags.discovered_sluice = true;
  D.investigateChamber(s, 'sluice');
  assert.equal(s.inventory.length, 1);
  assert.equal(s.inventory[0].id, 'riverCharm');
  assert.equal(s.inventory[0].owner, null);
  const reward = s.scenes.find((scene) => scene.equipmentRewards);
  assert.deepEqual(reward.equipmentRewards, ['riverCharm']);
  assert.match(renderEquipmentRewards(reward.equipmentRewards, { esc }), /River charm/);
  assert(s.journal.some((entry) => entry.kind === 'Equipment recovered'));
  const loaded = D.load(D.save(s));
  assert.deepEqual(
    loaded.scenes.find((scene) => scene.equipmentRewards),
    reward,
  );
  assert.throws(() => D.investigateChamber(s, 'sluice'), /already recovered/);
  assert.equal(s.inventory.length, 1);
});
test('earned equipment uses the same reward panel and retains its store-room restrictions', () => {
  const s = D.initial();
  const uid = D.awardEquipment(s, 'oathShield', 'The keeper’s reward');
  assert.equal(s.inventory.find((item) => item.uid === uid).id, 'oathShield');
  const html = renderEquipmentRewards(s.scenes.at(-1).equipmentRewards, {
    esc,
    storeAvailable: false,
  });
  assert.match(html, /Oath shield/);
  assert.match(html, /role="img"/);
  assert.match(html, /can now equip it in the store room/);
  assert.match(html, /Requires a level 8 character/);
  assert.match(html, /Restore the service room/);
  assert.match(html, /data-action="rewardStore" disabled/);
});
test('every equipment definition has an accessible icon and named reward card', () => {
  for (const item of equipment) {
    assert.match(equipmentIcon(item, esc), /<svg/);
    const html = renderEquipmentRewards([item.id], { esc });
    assert(html.includes(item.name), item.id);
    assert(html.includes(item.slot), item.id);
    assert.match(html, /Added to guild storage/);
    assert.match(html, /Open store room/);
  }
  assert.equal(renderEquipmentRewards(['unknown'], { esc }), '');
});
