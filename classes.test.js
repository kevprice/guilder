import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { gainLevel, personalProtection, talents } from './classes.js';
function guild() {
  const s = D.initial({ opening: 'legacy' });
  s.gold = 2000;
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  D.recruit(s, 'nell');
  return s;
}
function level(c, n) {
  while (c.level < n) gainLevel(c);
}
test('automatic class growth, six branches and meaningful physical/magic vulnerabilities', () => {
  const s = guild(),
    [b, i, n] = s.roster;
  level(b, 3);
  assert.equal(b.str, 10);
  assert.equal(b.end, 9);
  D.specialise(s, 'bryn', 'barbarian');
  gainLevel(b);
  assert.equal(b.str, 12);
  assert.equal(b.end, 11);
  assert.equal(personalProtection(b, 'physical'), 12);
  assert.equal(personalProtection(b, 'magical'), -10);
  assert.throws(() => D.specialise(s, 'bryn', 'paladin'));
  level(i, 3);
  assert.equal(i.int, 12);
  D.specialise(s, 'ivo', 'healer');
  gainLevel(i);
  assert.equal(i.int, 14);
  assert.equal(i.end, 6);
  assert.equal(personalProtection(i, 'undead'), 18);
  level(n, 3);
  D.specialise(s, 'nell', 'archer');
  const old = n.agi;
  gainLevel(n);
  assert.equal(n.agi, old + 2);
  assert.deepEqual(D.load(D.save(s)), s);
});
test('talent choices reserve their exact levels and exclude sibling choices and other branches', () => {
  const s = guild(),
    c = s.roster[1];
  level(c, 9);
  D.specialise(s, c.id, 'necromancer');
  assert.equal(D.talentSlots(c), 3);
  assert.throws(() => D.learnTalent(s, c.id, 'holyLight'));
  D.learnTalent(s, c.id, 'graveSight');
  D.learnTalent(s, c.id, 'raiseDead');
  D.learnTalent(s, c.id, 'mendUndead');
  assert.equal(D.talentSlots(c), 0);
  assert(c.skills.includes('echoSight'));
  assert.throws(() => D.learnTalent(s, c.id, 'boneWard'));
  const bad = JSON.parse(D.save(s));
  bad.roster[1].talents.push('holyLight');
  assert.throws(() => D.load(JSON.stringify(bad)), /class/);
  assert.deepEqual(D.load(D.save(s)), s);
  for (const t of talents)
    for (const p of t.requires)
      assert(talents.some((n) => n.id === p && n.branch === t.branch && n.level <= t.level));
});
test('holy skills reduce undead risk, rage increases work and asleep casters provide no skills', () => {
  const s = guild(),
    [b, i] = s.roster;
  level(b, 3);
  D.specialise(s, b.id, 'barbarian');
  const before = D.risk(s, 'quarry', [b.id]);
  D.learnTalent(s, b.id, 'rage');
  assert(D.risk(s, 'quarry', [b.id]).rate > before.rate);
  level(i, 3);
  const threat = D.risk(s, 'ghost', [i.id]).threat;
  D.specialise(s, i.id, 'healer');
  D.learnTalent(s, i.id, 'turnUndead');
  assert(D.risk(s, 'ghost', [i.id]).threat < threat);
  i.injury = 4;
  assert.equal(D.risk(s, 'ghost', [i.id]).rate, 0);
  assert(!D.risk(s, 'ghost', [i.id]).reductions.some((r) => r.label.startsWith('Class skills')));
});
test('a healer wakes an unconscious companion on the same adventure and enables retreat', () => {
  const s = guild(),
    [b, i] = s.roster;
  level(i, 9);
  D.specialise(s, i.id, 'healer');
  D.learnTalent(s, i.id, 'healingWord');
  D.learnTalent(s, i.id, 'greaterHeal');
  s.flags.fenStep7 = true;
  D.dispatch(s, 'fenBounty', [b.id, i.id]);
  const m = s.missions.at(-1);
  b.injury = 4;
  b.recovery = 8;
  D.castRestoration(s, i.id, b.id);
  assert.equal(b.injury, 2);
  assert.equal(i.lastCastDay, s.day);
  assert.throws(() => D.castRestoration(s, i.id, b.id));
  D.withdraw(s, m.uid);
  s.eventSeed = 97;
  D.day(s);
  assert.equal(m.status, 'withdrawn');
  assert.deepEqual(D.load(D.save(s)), s);
});
test('Raise dead creates a different persistent zombie, with no natural healing and no repeated resurrection', () => {
  const s = guild(),
    [b, i] = s.roster;
  level(i, 9);
  D.specialise(s, i.id, 'necromancer');
  for (const id of ['graveSight', 'raiseDead', 'mendUndead']) D.learnTalent(s, i.id, id);
  b.status = 'dead';
  b.injury = 5;
  b.bodyRecovered = true;
  b.skills = ['guard'];
  const oldStr = b.str,
    gold = s.gold;
  D.raiseDead(s, i.id, b.id);
  assert.equal(b.str, 8);
  assert.equal(b.echo.originalStats.str, oldStr);
  assert.equal(s.gold, gold - 80);
  assert.equal(D.classOf(b).name, 'Reanimated zombie');
  assert(!b.skills.includes('guard'));
  assert(b.undead);
  assert.throws(() => D.specialise(s, b.id, 'barbarian'));
  b.status = 'injured';
  b.injury = 2;
  b.recovery = 4;
  s.eventSeed = 97;
  D.day(s);
  assert.equal(b.recovery, 4);
  D.castRestoration(s, i.id, b.id, 'mend');
  assert.equal(b.status, 'home');
  assert.equal(b.injury, 0);
  assert.deepEqual(D.load(D.save(s)), s);
  b.status = 'dead';
  b.injury = 5;
  assert.throws(() => D.raiseDead(s, i.id, b.id));
});
test('Escape artist makes external retreat immediate and death wards prevent only one fatal blow', () => {
  const s = guild(),
    [b, i, n] = s.roster;
  level(n, 6);
  D.specialise(s, n.id, 'thief');
  D.learnTalent(s, n.id, 'shadowStep');
  D.learnTalent(s, n.id, 'escapeArtist');
  D.dispatch(s, 'quarry', [n.id]);
  D.withdraw(s, s.missions.at(-1).uid);
  assert.equal(n.status, 'home');
  assert.equal(s.missions.at(-1).status, 'withdrawn');
  level(b, 12);
  D.specialise(s, b.id, 'barbarian');
  for (const key of ['rage', 'unstoppable', 'lastStand']) D.learnTalent(s, b.id, key);
  s.flags.fenStep7 = true;
  D.dispatch(s, 'fenBounty', [b.id]);
  const m = s.missions.at(-1);
  b.injury = 4;
  b.recovery = 8;
  for (let n = 0; n < 2; n++) {
    s.seed = 1;
    s.eventSeed = 97;
    D.day(s);
  }
  assert.equal(m.wardsUsed.length, 1);
  assert.equal(b.status, 'dead');
  assert.equal(m.status, 'failed');
  assert.deepEqual(D.load(D.save(s)), s);
});
test('legacy stats and skills are not overwritten and level 20 caps further automatic growth', () => {
  const s = guild(),
    b = s.roster[0];
  b.level = 8;
  b.str = 25;
  b.skills = ['guard'];
  delete b.levelChoices;
  const loaded = D.load(D.save(s));
  assert.equal(loaded.roster[0].str, 25);
  assert(loaded.roster[0].skills.includes('guard'));
  level(b, 20);
  const str = b.str;
  assert.equal(gainLevel(b), false);
  assert.equal(b.str, str);
});
