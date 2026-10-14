import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
function complete(s, id) {
  D.dispatch(s, id, ['bryn'], true);
  const m = s.missions.at(-1);
  for (let i = 0; i < 20 && m.status === 'travelling'; i++) {
    s.eventSeed = 97;
    D.day(s);
  }
  assert.equal(m.status, 'resolved');
  if (s.roster[0].status === 'injured') D.treat(s, 'bryn');
}
test('a fresh guild reaches the wall and cellar through distinct jobs without stat-choice grinding', () => {
  const s = D.initial({ opening: 'legacy' });
  D.recruit(s, 'bryn');
  assert.equal(D.availableContracts(s).filter((d) => d.oneShot).length, 4);
  complete(s, 'wallSurvey');
  complete(s, 'masonTools');
  assert.equal(s.roster[0].level, 3);
  assert.equal(s.roster[0].str, 10);
  assert.equal(s.day, 3);
  s.selected = 'bryn';
  D.interact(s, 'wall');
  const gold = s.gold;
  D.interact(s, 'repair');
  assert.equal(s.gold, gold - 50);
  complete(s, 'lostGoat');
  complete(s, 'cellarTimber');
  assert.ok(s.flags.stairs);
  assert.ok(D.home(s).some((c) => c.id === 'bryn'));
  assert.ok(
    !D.availableContracts(s).some((d) =>
      ['wallSurvey', 'masonTools', 'lostGoat', 'cellarTimber'].includes(d.id),
    ),
  );
  assert.ok(D.availableContracts(s).some((d) => d.id === 'road'));
  assert.deepEqual(D.load(D.save(s)), s);
});

test('opening saves gain the faster Bryn baseline once, preserving stronger builds and later progression', () => {
  for (const [level, strength, breached, undead, expected] of [
    [1, 7, false, false, 8],
    [2, 8, false, false, 9],
    [3, 9, false, false, 10],
    [3, 14, false, false, 14],
    [4, 10, false, false, 10],
    [2, 8, true, false, 8],
    [2, 8, false, true, 8],
  ]) {
    const s = D.initial({ opening: 'legacy' });
    D.recruit(s, 'bryn');
    const c = s.roster[0];
    Object.assign(c, { level, str: strength, undead });
    delete c.levelChoices;
    delete s.openingBalanceVersion;
    if (breached) s.flags.breach = true;
    const loaded = D.load(D.save(s));
    assert.equal(loaded.roster[0].str, expected);
    assert.equal(loaded.gold, s.gold);
    assert.equal(loaded.roster[0].xp, c.xp);
    assert.deepEqual(D.load(D.save(loaded)), loaded);
  }
});
test('story rewards and repeatable wages are explicitly distinguished', () => {
  assert.match(D.contractLabel(D.contracts.find((d) => d.id === 'anchor')).detail, /tower key/);
  assert.equal(D.contractLabel(D.contracts.find((d) => d.id === 'road')).kind, 'REPEATABLE WORK');
  assert.equal(D.contractLabel(D.contracts.find((d) => d.id === 'cellarTimber')).kind, 'PLOT ITEM');
  assert.deepEqual(D.validateContent(), []);
});
