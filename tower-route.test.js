import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { chamberTreasureX, chamberObjective, legacyPassagePositions } from './sprawl.js';
import { towerObjective } from './exploration.js';
function guild() {
  const s = D.initial({ opening: 'legacy' });
  D.recruit(s, 'ivo');
  s.selected = 'ivo';
  s.flags.tower = true;
  return s;
}
function enter(s, id) {
  const p = D.passages.find((p) => p.id === id);
  return D.enterPassage(s, id, { x: p.x, floor: p.y });
}
test('guarded treasure is beyond the guardian and the uncleared movement boundary', () => {
  for (const room of D.chambers.filter((r) => r.encounter)) {
    const x = chamberTreasureX(room);
    assert(x > room.x + room.w * 0.6 + 50, room.id);
    assert(x > room.x + 220, room.id);
    assert(x < room.x + room.w - 20, room.id);
  }
});
test('the study and potion kitchen lead to Maelin and Echo sight without requiring Echo sight first', () => {
  const s = guild();
  D.visitFloor(s, -100);
  D.interact(s, 'bellWard');
  assert.match(s.scenes.at(-1).body, /She joins with Echo sight/);
  assert(!s.roster[0].skills.includes('echoSight'));
  enter(s, 'studyDoor');
  assert.match(
    chamberObjective(
      s,
      D.chambers.find((r) => r.id === 'study'),
    ),
    /key/,
  );
  D.investigateChamber(s, 'study');
  assert(s.flags.key_studyKey);
  assert.match(towerObjective(s), /hidden shelf stair/);
  enter(s, 'shelfStair');
  D.investigateChamber(s, 'potions');
  assert.match(towerObjective(s), /awaken Maelin/);
  D.discoverSleeper(s, 'maelin');
  D.awaken(s, 'maelin');
  const maelin = s.roster.find((c) => c.id === 'maelin');
  assert(maelin.skills.includes('echoSight'));
  s.selected = 'maelin';
  enter(s, 'studyDoor');
  enter(s, 'mirrorDoor');
  assert(s.flags.discovered_mirror);
  assert.deepEqual(D.load(D.save(s)), s);
});
test('forward passages are separated from return doors and the study door is outside the store', () => {
  for (const p of D.passages) {
    const room = D.chambers.find((r) => r.id === p.from);
    if (room) assert(Math.abs(p.x - (room.x + 48)) > 120, p.id);
  }
  const study = D.passages.find((p) => p.id === 'studyDoor');
  assert(study.x < 690);
  assert(study.x > 400);
});
test('previous passage positions migrate without losing marked return routes', () => {
  for (const [id, oldX] of Object.entries(legacyPassagePositions)) {
    const s = guild(),
      p = D.passages.find((p) => p.id === id);
    s.flags['discovered_' + p.to] = true;
    s.dungeonReturns = { [p.to]: { x: oldX, y: p.y, floor: p.y } };
    const loaded = D.load(D.save(s));
    assert.equal(D.leaveChamber(loaded, p.to).x, p.x, id);
  }
});
