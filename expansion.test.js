import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { homeThreats, assessContract } from './contracts.js';
import { expansionMissions, expansionRooms } from './expansion.js';
function guild() {
  const s = D.initial({ opening: 'legacy' });
  s.gold = 10000;
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  s.flags.repaired = true;
  return s;
}
function safeDay(s) {
  s.eventSeed = 97;
  s.seed = 100;
  D.day(s);
}
test('expansion exceeds five times the original contract, room and character counts', () => {
  assert(D.contracts.length >= 19 * 5);
  assert(D.rooms.length >= 4 * 5);
  assert(D.recruits.length + D.sleepers.length >= 6 * 5);
  assert.equal(homeThreats.length, 10);
  assert.equal(expansionMissions.length, 96);
  assert.equal(expansionRooms.length, 32);
  assert.deepEqual(D.validateContent(), []);
});
test('one physical item moves through storage between residents without duplication', () => {
  const s = guild(),
    uid = D.buyEquipment(s, 'wardStaff'),
    gold = s.gold;
  assert.equal(s.roster[0].gear, null);
  D.enterStore(s, 'bryn');
  D.equipItem(s, 'bryn', uid);
  assert.throws(() => D.equipItem(s, 'ivo', uid));
  D.unequip(s, 'bryn');
  D.enterStore(s, 'ivo');
  D.equipItem(s, 'ivo', uid);
  D.leaveStore(s);
  assert.equal(s.inventory.length, 1);
  assert.equal(s.inventory[0].owner, 'ivo');
  assert.equal(s.gold, gold);
  assert.equal(s.roster[0].gear, null);
  assert.equal(s.roster[1].gear, 'wardStaff');
  assert.deepEqual(D.load(D.save(s)), s);
  D.dispatch(s, 'road', ['ivo']);
  assert.throws(() => D.enterStore(s, 'ivo'));
});
test('legacy personal gear migrates into shared inventory, retaining its stats and owner', () => {
  const s = guild();
  delete s.inventory;
  delete s.nextItem;
  s.roster[0].gear = 'shield';
  const restored = D.load(D.save(s));
  assert.equal(restored.inventory.length, 1);
  assert.equal(restored.inventory[0].owner, 'bryn');
  const uid = D.buyEquipment(restored, 'boots');
  assert.notEqual(uid, restored.inventory[0].uid);
  assert.equal(assessContract(D.contracts[0], [restored.roster[0]]).totals.end, 8);
});
test('injuries reduce work; unconscious members do no work and need a conscious escort', () => {
  const s = guild();
  s.flags.fenStep7 = true;
  D.dispatch(s, 'fenBounty', ['bryn', 'ivo']);
  const m = s.missions.at(-1),
    c = s.roster[0],
    def = D.contracts.find((d) => d.id === m.id),
    before = D.risk(s, m.id, m.party).rate;
  D.applyHarm(s, c, def);
  assert.equal(D.injuryNames[c.injury], 'Hurt');
  assert(D.risk(s, m.id, m.party).rate < before);
  for (let i = 0; i < 3; i++) D.applyHarm(s, c, def);
  assert.equal(c.injury, 4);
  assert(D.canWithdraw(s, m));
  D.withdraw(s, m.uid);
  assert.equal(m.status, 'returning');
  assert.equal(c.status, 'away');
  const gold = s.gold;
  safeDay(s);
  assert.equal(m.status, 'withdrawn');
  assert.equal(c.status, 'injured');
  assert.equal(s.gold, gold);
  assert.deepEqual(D.load(D.save(s)), s);
});
test('a lethal hunt can strand an unconscious party, kill it and preserve a permanent memorial', () => {
  const s = guild();
  s.flags.fenStep7 = true;
  D.dispatch(s, 'fenBounty', ['bryn']);
  const m = s.missions.at(-1),
    c = s.roster[0],
    def = D.contracts.find((d) => d.id === m.id);
  for (let i = 0; i < 4; i++) D.applyHarm(s, c, def);
  assert(!D.canWithdraw(s, m));
  assert.throws(() => D.withdraw(s, m.uid), /conscious/);
  s.seed = 1;
  s.eventSeed = 97;
  D.day(s);
  assert.equal(c.status, 'dead');
  assert.equal(m.status, 'failed');
  assert(!D.home(s).some((r) => r.id === c.id));
  const restored = D.load(D.save(s));
  safeDay(restored);
  assert.equal(restored.roster[0].status, 'dead');
  assert.throws(() => D.treat(restored, c.id));
  assert(restored.journal.some((j) => j.kind === 'Death'));
});
test('every regional arc unlocks its next job, recruits and rooms and survives a full saved campaign', () => {
  const s = guild();
  s.flags.free = true;
  s.flags.anchor = true;
  for (const c of s.roster) {
    c.str = 200;
    c.agi = 200;
    c.int = 200;
    c.end = 200;
  }
  for (const def of expansionMissions) {
    assert(D.availableContracts(s).some((d) => d.id === def.id));
    D.dispatch(s, def.id, ['bryn', 'ivo']);
    const m = s.missions.at(-1);
    for (let n = 0; n < 10 && m.status === 'travelling'; n++) safeDay(s);
    assert.equal(m.status, 'decision');
    D.decide(s, m.uid, 'public');
    assert(s.flags[def.sets[0]]);
    assert(!D.availableContracts(s).some((d) => d.id === def.id));
  }
  for (const r of expansionRooms) D.repairRoom(s, r.id);
  for (const c of D.recruits.filter((c) => c.region)) D.recruit(s, c.id);
  assert.equal(s.roster.length, 26);
  assert(D.worldBoundary(s) > 12000);
  assert.equal(D.currentInvestigation(s).title, 'Beyond the gate');
  assert.deepEqual(D.load(D.save(s)), s);
});
test('all new home threats accept home parties and persist progress through withdrawal', () => {
  for (const def of homeThreats) {
    const s = guild();
    D.recruit(s, 'nell');
    s.threats[def.id] = {
      active: true,
      progress: 0,
      age: 0,
      damage: 0,
      room: 'service',
      x: 865,
      y: 380,
    };
    D.dispatch(s, def.id, ['bryn', 'ivo']);
    const m = s.missions.at(-1);
    assert(s.roster.filter((c) => m.party.includes(c.id)).every((c) => c.status === 'assigned'));
    safeDay(s);
    if (m.status === 'travelling') D.withdraw(s, m.uid);
    assert.equal(s.threats[def.id].progress, m.progress);
    assert.deepEqual(D.load(D.save(s)), s);
  }
});
