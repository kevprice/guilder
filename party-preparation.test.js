import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { automaticPreparation, partyLaunchPreview } from './party-preparation.js';
import { renderExpeditions } from './expedition-ui.js';
import { renderPartyEquipment, renderEquipmentStore } from './equipment-ui.js';
const helpers = {
  esc: String,
  btn: (text, action, disabled) =>
    `<button data-action="${action}" ${disabled ? 'disabled' : ''}>${text}</button>`,
};
const reload = (s) => D.load(D.save(s));
test('a selected party can undertake an unknown mission without scouting, research or special preparation', () => {
  const s = D.initial();
  s.guild.supplies = 2;
  const before = D.save(s),
    p = partyLaunchPreview(s, 'briarHollow', ['bryn', 'ivo', 'nell']);
  assert.equal(p.blocked, null);
  assert.equal(p.intel, null);
  assert.deepEqual(p.preparation, { fire: false, medical: false });
  assert.equal(D.save(s), before);
  const uid = D.launchParty(s, 'briarHollow', 'assault', ['bryn', 'ivo', 'nell']);
  assert.equal(s.guild.supplies, 0);
  const op = s.outside.operations.find((o) => o.uid === uid);
  assert.equal(op.phase, 'outbound');
  assert.equal(op.intent, 'assault');
  assert(s.roster.every((c) => c.status === 'away'));
  assert.equal(reload(s).outside.operations[0].uid, uid);
});
test('optional care uses available stocks but never prevents an affordable launch', () => {
  const s = D.initial();
  assert(automaticPreparation(s, 'oldPatrol', ['bryn']).medical);
  assert.equal(partyLaunchPreview(s, 'oldPatrol', ['bryn']).cost.supplies, 3);
  s.guild.supplies = 2;
  assert(!automaticPreparation(s, 'oldPatrol', ['bryn']).medical);
  assert.equal(partyLaunchPreview(s, 'oldPatrol', ['bryn']).blocked, null);
  s.guild.supplies = 1;
  const p = partyLaunchPreview(s, 'oldPatrol', ['bryn']);
  assert.match(p.blocked, /supplies/);
  const before = D.save(s);
  assert.throws(() => D.launchParty(s, 'oldPatrol', 'assault', ['bryn']));
  assert.equal(D.save(s), before);
  assert.equal(partyLaunchPreview(s, 'oldPatrol', ['bryn'], 'scout').blocked, null);
});
test('known counters are packed only for observed creatures and do not waste items when gear or magic already counters', () => {
  const s = D.initial();
  s.guild.house.materials.flameKit = 1;
  assert(!automaticPreparation(s, 'briarHollow', ['ivo']).fire);
  s.outside.intel.briarHollow = {
    species: 'briarStag',
    picture: true,
    count: 1,
    complete: true,
    day: s.day,
    generation: 1,
  };
  s.outside.bestiary.briarStag = { seen: true, sketch: true, tier: 1 };
  assert(automaticPreparation(s, 'briarHollow', ['ivo']).fire);
  assert(!automaticPreparation(s, 'oldPatrol', ['ivo']).fire);
  const staff = D.awardEquipment(s, 'ashStaff');
  D.equipPartyMember(s, ['ivo'], 'ivo', 'sword', staff);
  assert(!automaticPreparation(s, 'briarHollow', ['ivo']).fire);
  D.equipPartyMember(s, ['ivo'], 'ivo', 'sword', null);
  s.roster[1].skills.push('quietFlame');
  assert(!automaticPreparation(s, 'briarHollow', ['ivo']).fire);
  assert.equal(s.guild.house.materials.flameKit, 1);
});
test('party gear replaces and transfers one owned object without changing jobs or paying again', () => {
  const s = D.initial();
  D.assignRoomWorker(s, 'service', 0, 'bryn');
  D.assignRoomWorker(s, 'tower', 0, 'ivo');
  const a = D.awardEquipment(s, 'shortSword'),
    b = D.awardEquipment(s, 'ashStaff');
  const rooms = structuredClone(s.guild.house.rooms),
    gold = s.gold;
  D.equipPartyMember(s, ['bryn', 'ivo'], 'bryn', 'sword', a);
  D.equipPartyMember(s, ['bryn', 'ivo'], 'bryn', 'sword', b);
  assert.equal(s.inventory.find((i) => i.uid === a).owner, null);
  D.equipPartyMember(s, ['bryn', 'ivo'], 'ivo', 'sword', b);
  assert(!s.roster[0].equipmentSlots.sword);
  assert.equal(s.roster[1].equipmentSlots.sword.uid, b);
  assert.equal(s.inventory.find((i) => i.uid === b).owner, 'ivo');
  assert.equal(s.inventory.length, 2);
  assert.equal(s.gold, gold);
  assert.deepEqual(s.guild.house.rooms, rooms);
  assert.equal(s.selected, 'rowan');
  assert.deepEqual(reload(s).inventory, s.inventory);
  D.equipPartyMember(s, ['ivo'], 'ivo', 'sword', null);
  assert.equal(s.inventory.find((i) => i.uid === b).owner, null);
});
test('invalid gear, unsupported levels and away ownership fail without partially replacing equipment', () => {
  const s = D.initial(),
    a = D.awardEquipment(s, 'shortSword'),
    rare = D.awardEquipment(s, 'sunHammer');
  D.equipPartyMember(s, ['bryn'], 'bryn', 'sword', a);
  for (const action of [
    () => D.equipPartyMember(s, [], 'bryn', 'sword', a),
    () => D.equipPartyMember(s, ['bryn'], 'bryn', 'body', a),
    () => D.equipPartyMember(s, ['bryn'], 'bryn', 'sword', rare),
    () => D.equipPartyMember(s, ['ivo'], 'ivo', 'sword', 'missing'),
  ]) {
    const before = D.save(s);
    assert.throws(action);
    assert.equal(D.save(s), before);
  }
  D.launchParty(s, 'oldPatrol', 'assault', ['bryn']);
  const before = D.save(s);
  assert.throws(() => D.equipPartyMember(s, ['ivo'], 'ivo', 'sword', a), /away/);
  assert.equal(D.save(s), before);
});
test('mission UI always offers a direct send and optional scout, retaining the selected residents on equipment views', () => {
  const s = D.initial(),
    item = D.awardEquipment(s, 'shortSword');
  const html = renderExpeditions(s, helpers, { party: ['bryn', 'ivo'], loadout: true });
  assert.match(html, /fieldDispatch:briarHollow:assault/);
  assert.match(html, />Send party</);
  assert.match(html, />Scout first</);
  assert.match(html, /value="bryn" checked/);
  assert.match(html, /value="ivo" checked/);
  assert.match(html, /data-party-gear="bryn"/);
  assert.match(html, new RegExp(item));
  assert(!html.includes('Reserve flame'));
  assert(!html.includes('Reserve medical'));
  assert(!html.includes('Craft flame preparation'));
  assert(!html.includes('fieldIntent:'));
});
test('owned loadouts show the selected crew, while the store catalogue stays collapsed and separated', () => {
  const s = D.initial();
  D.awardEquipment(s, 'shortSword');
  const owned = renderPartyEquipment(s, ['bryn', 'ivo'], helpers);
  assert.match(owned, /data-loadout-resident="bryn"/);
  assert.match(owned, /data-loadout-resident="ivo"/);
  assert(!owned.includes('data-loadout-resident="nell"'));
  assert(!owned.includes('Ember blade'));
  const store = renderEquipmentStore(s, ['bryn', 'ivo'], helpers);
  assert.match(store, /Equipment you own/);
  assert(!store.includes('class="equipment-shop" open'));
  const empty = renderPartyEquipment(D.initial(), ['bryn'], helpers);
  assert.match(empty, /party can still depart/);
});
