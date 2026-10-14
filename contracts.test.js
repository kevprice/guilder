import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { assessContract } from './contracts.js';
const fighter = (id, str = 10) => ({ id, str, agi: 0, int: 0, end: 0, skills: [] });
function guild() {
  const s = D.initial({ opening: 'legacy' });
  s.gold = 1000;
  D.recruit(s, 'bryn');
  D.recruit(s, 'nell');
  s.flags.labyrinthHeart = true;
  return s;
}
test('summed target stats determine duration; surplus does not shorten the base plan', () => {
  const def = D.contracts.find((d) => d.id === 'quarry');
  assert.equal(assessContract(def, [fighter('a')]).days, 4);
  assert.equal(assessContract(def, [fighter('a'), fighter('b')]).days, 2);
  assert.equal(assessContract(def, [fighter('a', 40)]).days, 2);
  const r = assessContract(def, [fighter('a')]);
  assert.equal(r.threat, 60);
  assert.equal(r.exposure, 97);
  assert.equal(assessContract(def, [fighter('a', 0)]).days, null);
});
test('defensive stats and distinct relevant abilities reduce daily threat', () => {
  const def = D.contracts.find((d) => d.id === 'quarry'),
    a = fighter('a'),
    b = fighter('b');
  a.end = 10;
  a.agi = 8;
  a.int = 5;
  a.skills = ['guard'];
  b.skills = ['guard'];
  assert.equal(assessContract(def, [a, b]).threat, 37);
});
test('each working day rolls harm again; one kit treats only one event', () => {
  const s = guild(),
    c = s.roster[0];
  c.str = 10;
  D.dispatch(s, 'quarry', ['bryn'], true);
  const m = s.missions.at(-1);
  for (let i = 0; i < 4; i++) {
    s.seed = 1;
    D.day(s);
    assert.equal(m.harm.length, i + 1);
    if (i < 3) assert.equal(c.status, 'away');
  }
  assert.equal(m.elapsed, 4);
  assert.equal(m.status, 'travelling');
  assert(m.remaining > 0);
  D.withdraw(s, m.uid);
  s.eventSeed = 97;
  D.day(s);
  assert.equal(m.status, 'withdrawn');
  assert.equal(m.harm[0].treated, true);
  assert.equal(c.recovery, 6);
  assert.equal(c.status, 'injured');
  assert.equal(m.kits, 0);
  assert.deepEqual(D.load(D.save(s)), s);
});
test('exploration unlocks an internal threat; partial and full withdrawal preserve progress immediately', () => {
  const s = guild();
  assert(!D.availableContracts(s).some((d) => d.id === 'dragon'));
  D.interact(s, 'dragon');
  assert(D.availableContracts(s).find((d) => d.id === 'dragon').hiddenReward);
  D.dispatch(s, 'dragon', ['bryn', 'nell']);
  const m = s.missions.at(-1),
    date = s.day;
  s.seed = 1;
  D.day(s);
  const progress = m.progress;
  assert(progress > 0);
  D.withdraw(s, m.uid, ['nell']);
  assert.equal(s.day, date + 1);
  assert.equal(m.party.length, 1);
  assert.equal(s.roster[1].status, s.roster[1].recovery ? 'injured' : 'home');
  D.withdraw(s, m.uid);
  assert.equal(m.status, 'withdrawn');
  assert.equal(D.activeMissions(s).length, 0);
  D.day(s);
  assert.equal(s.threats.dragon.progress, progress);
  assert.equal(s.reports[0].reward, 0);
  assert.deepEqual(D.load(D.save(s)), s);
  while (s.roster.some((c) => c.status === 'injured')) D.day(s);
  s.roster[0].str = 60;
  s.roster[0].end = 200;
  D.dispatch(s, 'dragon', ['bryn']);
  assert.equal(s.missions.at(-1).progress, progress);
  assert.equal(s.missions.at(-1).remaining, Math.ceil((600 - progress) / 60));
  const gold = s.gold;
  while (D.activeMissions(s).length) {
    s.seed = 100;
    s.eventSeed = 97;
    D.day(s);
  }
  assert(s.flags.dragonSlain);
  assert.equal(s.gold, gold + 240);
  assert(!D.availableContracts(s).some((d) => d.id === 'dragon'));
  assert.throws(() => D.withdraw(s, s.missions.at(-1).uid));
  assert.deepEqual(D.load(D.save(s)), s);
});
test('invalid threat progress and zero-stat dispatch are rejected', () => {
  const s = guild();
  D.interact(s, 'dragon');
  s.roster[0].str = 0;
  const before = D.save(s);
  assert.throws(() => D.dispatch(s, 'dragon', ['bryn']));
  assert.equal(D.save(s), before);
  s.roster[0].str = 10;
  D.dispatch(s, 'dragon', ['bryn']);
  const bad = JSON.parse(D.save(s));
  bad.threats.dragon.progress = 1;
  assert.throws(() => D.load(JSON.stringify(bad)), /progress/);
});
test('legacy expeditions retain their committed duration and injury outcome', () => {
  const s = guild();
  D.dispatch(s, 'quarry', ['bryn']);
  const m = s.missions.at(-1);
  delete m.simulation;
  m.remaining = 2;
  m.roll = 0;
  const restored = D.load(D.save(s));
  D.day(restored);
  assert.equal(restored.missions.at(-1).remaining, 1);
  D.day(restored);
  assert.equal(restored.missions.at(-1).status, 'resolved');
  assert.equal(restored.roster[0].status, 'injured');
});
