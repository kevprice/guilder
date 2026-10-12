import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { gainLevel } from './classes.js';
import { navigationNotices } from './navigation-notices.js';
function guild() {
  const s = D.initial();
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  s.selected = 'bryn';
  return s;
}
function level(c, n) {
  while (c.level < n) gainLevel(c);
}
function chapter(s, id, stage) {
  D.narrativeChoice(s, 'companion-stage-' + id + '-' + stage, 'together');
}
test('Bryn’s story spans levels six to sixteen and cannot remove the last fighter', () => {
  const s = guild(),
    c = s.roster[0];
  s.flags.brynResolved = true;
  D.recoverRecord(s, 'home-bryn');
  c.visits = 10;
  level(c, 5);
  assert(!D.choiceNode(s, 'companion-stage-bryn-1'));
  level(c, 6);
  assert(navigationNotices(s).Stories.count > 0);
  chapter(s, 'bryn', 1);
  assert(!D.choiceNode(s, 'companion-stage-bryn-2'));
  assert(!D.choiceNode(s, 'homecoming-bryn'));
  level(c, 10);
  chapter(s, 'bryn', 2);
  level(c, 14);
  chapter(s, 'bryn', 3);
  assert(!D.choiceNode(s, 'homecoming-bryn'));
  level(c, 16);
  assert(D.choiceNode(s, 'homecoming-bryn'));
  const before = D.save(s);
  assert.throws(() => D.narrativeChoice(s, 'homecoming-bryn', 'release'), /prerequisites/);
  assert.equal(D.save(s), before);
  assert.match(D.companionDepartureReason(s, 'bryn'), /another fighter/);
  s.flags.searched_crypt = true;
  D.discoverSleeper(s, 'oren');
  D.awaken(s, 'oren');
  D.narrativeChoice(s, 'homecoming-bryn', 'release');
  assert.equal(c.status, 'departed');
  assert.equal(D.load(D.save(s)).roster[0].status, 'departed');
});
test('an old early departure can be recalled without losing earned progress', () => {
  const s = guild(),
    c = s.roster[0];
  level(c, 6);
  c.status = 'departed';
  s.flags.departed_bryn = true;
  s.flags.brynResolved = true;
  s.choices['homecoming-bryn'] = 'release';
  const restored = D.load(D.save(s)),
    stats = restored.roster[0].str;
  D.recallEarlyCompanion(restored, 'bryn');
  assert.equal(restored.roster[0].status, 'home');
  assert.equal(restored.roster[0].str, stats);
  assert(restored.flags.brynResolved);
  assert(!restored.flags.departed_bryn);
  assert.equal(D.load(D.save(restored)).roster[0].level, 6);
});
test('abilities alter expedition outcomes while stats grow automatically', () => {
  const s = guild(),
    c = s.roster[0],
    before = c.str;
  level(c, 2);
  assert.equal(c.str, before + 1);
  const risk = D.risk(s, 'quarry', ['bryn']);
  D.advance(s, 'bryn', 'shieldDrill', 2);
  const after = D.risk(s, 'quarry', ['bryn']);
  assert(after.threat < risk.threat);
  assert.equal(c.str, before + 1);
  assert.equal(c.points, 0);
  assert.throws(() => D.advance(s, 'bryn', 'brace', 2));
  assert.deepEqual(D.load(D.save(s)).roster[0].skills, c.skills);
});
test('equipment requisition competes with ability choice and awards a physical object without gold cost', () => {
  const s = guild(),
    c = s.roster[0];
  level(c, 2);
  const gold = s.gold;
  D.chooseTrainingEquipment(s, 'bryn', 'shortSword', 2);
  assert.equal(s.gold, gold);
  assert.equal(s.inventory.length, 1);
  assert.equal(s.inventory[0].owner, null);
  assert.equal(c.points, 0);
  assert.deepEqual(s.scenes.at(-1).equipmentRewards, ['shortSword']);
  assert.throws(() => D.advance(s, 'bryn', 'shieldDrill', 2));
  assert.throws(() => D.chooseTrainingEquipment(s, 'bryn', 'shortSword', 2));
  assert.deepEqual(D.load(D.save(s)).roster[0].levelChoices, c.levelChoices);
});
test('paid village work earns twelve gold without requiring damage and clearly announces payment', () => {
  const s = D.initial();
  D.recruit(s, 'bryn');
  s.eventSeed = 17;
  const gold = s.gold,
    day = s.day;
  D.emergency(s);
  assert.equal(s.gold, gold + 12);
  assert.equal(s.day, day + 1);
  assert.deepEqual(s.damagedRooms, undefined);
  assert.equal(s.transactions[0].amount, 12);
  assert.match(s.scenes.at(-1).title, /12 gold/);
});
