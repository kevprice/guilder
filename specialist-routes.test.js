import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { gainLevel } from './classes.js';
import { passageError, passageLabel, trapDisarmed } from './sprawl.js';
function guild() {
  const s = D.initial({ opening: 'legacy' });
  D.recruit(s, 'ivo');
  D.recruit(s, 'nell');
  gainLevel(s.roster[1]);
  D.advance(s, 'nell', 'tracking', 2);
  s.flags.tower = true;
  s.selected = 'ivo';
  return s;
}
function enter(s, id) {
  const p = D.passages.find((p) => p.id === id);
  return D.enterPassage(s, id, { x: p.x, floor: p.y });
}
test('literacy opens the study once and a scout can follow without gaining literacy', () => {
  const s = guild();
  s.selected = 'nell';
  assert.throws(() => enter(s, 'studyDoor'), /literacy/i);
  s.selected = 'ivo';
  enter(s, 'studyDoor');
  assert(s.openedPassages.includes('studyDoor'));
  s.selected = 'nell';
  enter(s, 'studyDoor');
  assert(!s.roster[1].skills.includes('literacy'));
  assert.match(
    passageLabel(
      s,
      D.passages.find((p) => p.id === 'studyDoor'),
    ),
    /opened for all/,
  );
  assert.deepEqual(D.load(D.save(s)), s);
});
test('a scout can follow opened magic and echo passages to disarm the menagerie’s physical trap', () => {
  const s = guild();
  enter(s, 'studyDoor');
  D.investigateChamber(s, 'study');
  enter(s, 'shelfStair');
  D.investigateChamber(s, 'potions');
  D.visitFloor(s, -100);
  D.discoverSleeper(s, 'maelin');
  D.awaken(s, 'maelin');
  s.selected = 'maelin';
  enter(s, 'studyDoor');
  enter(s, 'mirrorDoor');
  s.flags.cleared_mirror = true;
  enter(s, 'circleStair');
  s.flags.cleared_summoning = true;
  s.flags.key_circleKey = true;
  enter(s, 'keeperWalk');
  s.selected = 'nell';
  enter(s, 'studyDoor');
  enter(s, 'mirrorDoor');
  enter(s, 'circleStair');
  enter(s, 'keeperWalk');
  assert(!s.roster[1].skills.includes('literacy'));
  assert(!s.roster[1].skills.includes('echoSight'));
  D.disarmChamberTrap(s, 'menagerie');
  assert(
    trapDisarmed(
      s,
      D.chambers.find((r) => r.id === 'menagerie'),
    ),
  );
  s.selected = 'ivo';
  D.investigateChamber(s, 'menagerie');
  assert(s.flags.searched_menagerie);
  assert.equal(s.inventory.filter((item) => item.id === 'moonBow').length, 1);
  assert.deepEqual(D.load(D.save(s)), s);
});
test('opening the outer seal does not disarm the magical trap inside', () => {
  const s = guild();
  enter(s, 'studyDoor');
  D.investigateChamber(s, 'study');
  enter(s, 'shelfStair');
  s.selected = 'nell';
  assert.throws(() => D.investigateChamber(s, 'potions'), /trap/);
  s.selected = 'ivo';
  D.disarmChamberTrap(s, 'potions');
  s.selected = 'nell';
  D.investigateChamber(s, 'potions');
  assert(s.flags.searched_potions);
});
test('underwater passages retain breathing requirements and opened routes still respect guardians', () => {
  const s = guild();
  s.flags.cellarDrained = true;
  s.roster[0].skills.push('water');
  enter(s, 'drainDoor');
  enter(s, 'spillway');
  assert(!s.openedPassages.includes('spillway'));
  s.selected = 'nell';
  assert.throws(() => enter(s, 'spillway'), /Water breathing/);
  const gate = D.passages.find((p) => p.id === 'circleStair');
  s.openedPassages.push(gate.id);
  assert.match(passageError(s, gate, s.roster[1]), /creature/);
});
test('old saves recover proof of opened seals from their marked return routes', () => {
  const s = guild();
  enter(s, 'studyDoor');
  D.investigateChamber(s, 'study');
  enter(s, 'shelfStair');
  D.investigateChamber(s, 'potions');
  delete s.openedPassages;
  delete s.disarmedTraps;
  const loaded = D.load(D.save(s));
  assert(loaded.openedPassages.includes('studyDoor'));
  assert(loaded.disarmedTraps.includes('potions'));
  loaded.selected = 'nell';
  enter(loaded, 'studyDoor');
  assert.deepEqual(D.load(D.save(loaded)), loaded);
});
