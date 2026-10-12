import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { gainLevel } from './classes.js';
function party() {
  const s = D.initial();
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  const [b, i] = s.roster;
  while (b.level < 7) gainLevel(b);
  while (i.level < 6) gainLevel(i);
  Object.assign(b, { str: 16, agi: 4, int: 7, end: 19, skills: ['guard'] });
  Object.assign(i, { str: 3, agi: 5, int: 24, end: 7, skills: ['literacy', 'water'] });
  for (const room of ['cells', 'ratway', 'crypt']) s.flags['discovered_' + room] = true;
  return s;
}
test('reported two-companion builds have viable solo and combined routes to new recruits', () => {
  const s = party();
  const jailer = D.risk(s, 'jailer', ['bryn']);
  assert.equal(jailer.requirement.amount, 14);
  assert.equal(jailer.days, 2);
  assert(jailer.threat <= 15);
  const rat = D.risk(s, 'ratking', ['ivo']);
  assert.equal(rat.requirement.stat, 'int');
  assert.equal(rat.requirement.amount, 16);
  assert.equal(rat.days, 2);
  assert(rat.threat <= 10);
  assert.equal(rat.damageType, 'physical');
  const crypt = D.risk(s, 'cryptwarden', ['bryn', 'ivo']);
  assert.equal(crypt.days, 2);
  assert(crypt.threat <= 15);
  const combined = D.risk(s, 'jailer', ['bryn', 'ivo']);
  assert(combined.threat < jailer.threat);
});
test('two companions can explore together without rolling home attacks', () => {
  const s = party();
  D.dispatch(s, 'jailer', ['bryn', 'ivo']);
  for (let day = 0; day < 2; day++) {
    s.eventSeed = 31;
    s.seed = 100;
    D.day(s);
    assert.equal(D.homeDanger(s), null);
  }
  assert(s.flags.cleared_cells);
  assert.equal(D.damagedRooms(s).length, 0);
  D.investigateChamber(s, 'cells');
  D.recoverResident(s, 'nell', { x: 1850, floor: 1770 });
  assert.equal(s.roster.length, 3);
  s.eventSeed = 31;
  D.day(s);
  assert(D.homeDanger(s));
});
test('old clearing progress is scaled without losing completion percentage or history', () => {
  const s = party();
  D.dispatch(s, 'jailer', ['bryn']);
  delete s.dungeonBalanceVersion;
  const m = s.missions.at(-1);
  m.progress = 42;
  m.elapsed = 1;
  m.remaining = 3;
  s.threats.jailer.progress = 42;
  const loaded = D.load(D.save(s)),
    restored = loaded.missions.at(-1);
  assert.equal(restored.progress, 14);
  assert.equal(loaded.threats.jailer.progress, 14);
  assert.equal(restored.remaining, 1);
  assert.equal(restored.elapsed, 1);
  assert.deepEqual(D.load(D.save(loaded)), loaded);
});
test('old completed encounters stay completed after balance changes', () => {
  const s = party();
  D.dispatch(s, 'ratking', ['ivo']);
  delete s.dungeonBalanceVersion;
  const m = s.missions.at(-1);
  m.status = 'resolved';
  m.progress = 72;
  m.remaining = 0;
  m.completedDay = s.day;
  s.threats.ratking.progress = 72;
  s.flags.cleared_ratway = true;
  s.roster[1].status = 'home';
  const loaded = D.load(D.save(s));
  assert.equal(loaded.missions.at(-1).progress, 32);
  assert(loaded.flags.cleared_ratway);
  assert(!D.availableContracts(loaded).some((d) => d.id === 'ratking'));
});
