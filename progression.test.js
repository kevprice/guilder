import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { gainLevel, awardExperience, xpRequired } from './classes.js';
function guild() {
  const s = D.initial();
  s.gold = 1000;
  D.recruit(s, 'ivo');
  return s;
}
function level(c, n) {
  while (c.level < n) gainLevel(c);
}
test('early levels are fast, XP gaps widen, and awards still grant at most one level', () => {
  const s = guild(),
    c = s.roster[0];
  assert.equal(xpRequired(1), 35);
  assert.equal(xpRequired(2), 60);
  assert.equal(xpRequired(3), 105);
  assert.equal(awardExperience(c, 45), true);
  assert.equal(c.level, 2);
  assert.equal(c.xp, 10);
  assert.equal(awardExperience(c, 45), false);
  assert.equal(awardExperience(c, 45), true);
  assert.equal(c.level, 3);
  assert.equal(c.xp, 40);
  const before = c.level;
  awardExperience(c, 10000);
  assert.equal(c.level, before + 1);
  assert.equal(c.xp, 9935);
  assert.equal(c.int, 14);
  assert.deepEqual(D.load(D.save(s)), s);
  for (let l = 2; l < 19; l++)
    assert(xpRequired(l + 1) - xpRequired(l) > xpRequired(l) - xpRequired(l - 1));
});
test('same-level talents permanently exclude each other, even with unspent later levels', () => {
  const s = guild(),
    c = s.roster[0];
  level(c, 9);
  D.specialise(s, c.id, 'necromancer');
  D.learnTalent(s, c.id, 'graveSight');
  assert(!D.availableTalents(c).some((t) => t.id === 'boneWard'));
  const before = D.save(s);
  assert.throws(() => D.learnTalent(s, c.id, 'boneWard'));
  assert.equal(D.save(s), before);
  D.learnTalent(s, c.id, 'soulWard');
  assert.throws(() => D.learnTalent(s, c.id, 'raiseDead'));
  assert.equal(c.levelChoices[3].id, 'graveSight');
  assert.equal(c.levelChoices[6].id, 'soulWard');
  assert.deepEqual(D.load(D.save(s)), s);
});
test('stats, foundation skills and class talents share one level budget', () => {
  const s = guild(),
    c = s.roster[0];
  level(c, 6);
  D.specialise(s, c.id, 'healer');
  D.advance(s, c.id, 'end', 2);
  assert.throws(() => D.advance(s, c.id, 'str', 2));
  D.advance(s, c.id, 'water', 3);
  assert.throws(() => D.learnTalent(s, c.id, 'turnUndead'));
  D.learnTalent(s, c.id, 'healingWord');
  assert.throws(() => D.advance(s, c.id, 'str', 6));
  D.advance(s, c.id, 'end', 4);
  assert.deepEqual(D.unspentLevels(c), [5]);
  assert.equal(c.points, 1);
  const bad = JSON.parse(D.save(s));
  bad.roster[0].talents.push('blessing');
  assert.throws(() => D.load(JSON.stringify(bad)), /training choices/);
  assert.deepEqual(D.load(D.save(s)), s);
});
test('legacy fast-level builds retain stats and abilities but cannot add rejected sibling talents', () => {
  const s = guild(),
    c = s.roster[0];
  level(c, 6);
  D.specialise(s, c.id, 'necromancer');
  c.talents = ['graveSight', 'boneWard'];
  c.skills = ['literacy', 'echoSight'];
  c.points = 4;
  delete c.levelChoices;
  const loaded = D.load(D.save(s)),
    m = loaded.roster[0];
  assert.equal(m.int, c.int);
  assert.deepEqual(m.talents, c.talents);
  assert.equal(m.points, 4);
  assert.throws(() => D.learnTalent(loaded, m.id, 'boneWard'));
  D.learnTalent(loaded, m.id, 'raiseDead');
  assert.throws(() => D.learnTalent(loaded, m.id, 'soulWard'));
  assert.deepEqual(D.load(D.save(loaded)), loaded);
});
test('outside help opens the archive and releases trained residents without teaching the party literacy', () => {
  const s = D.initial();
  s.gold = 1000;
  D.recruit(s, 'bryn');
  const c = s.roster[0];
  s.flags.archiveSeal = true;
  c.end = 100;
  const gold = s.gold;
  D.dispatch(s, 'outsideArchivist', [c.id], true);
  while (s.missions.at(-1).status === 'travelling') {
    s.eventSeed = 97;
    D.day(s);
  }
  assert(s.flags.archiveAssistance);
  assert.equal(s.gold, gold - 60);
  assert(!c.skills.includes('literacy'));
  s.selected = c.id;
  D.repairRoom(s, 'library');
  s.flags.towerCrown = true;
  s.flags.searched_potions = true;
  s.flags.found_maelin = true;
  D.awaken(s, 'maelin');
  assert(s.roster.find((c) => c.id === 'maelin').skills.includes('water'));
  assert.deepEqual(D.load(D.save(s)), s);
});
