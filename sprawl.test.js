import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { passageError } from './sprawl.js';
function guild() {
  const s = D.initial();
  s.gold = 1000;
  D.recruit(s, 'ivo');
  s.selected = 'ivo';
  return s;
}
function enter(s, id) {
  const p = D.passages.find((p) => p.id === id);
  return D.enterPassage(s, id, { x: p.x, floor: p.y });
}
test('passage gates reject entry without movement or story and preserve a safe return', () => {
  const s = guild();
  assert.throws(() => enter(s, 'drainDoor'), /story/);
  s.flags.cellarDrained = true;
  const selected = s.selected;
  s.selected = 'rowan';
  assert.throws(() => enter(s, 'drainDoor'), /bound/);
  s.selected = selected;
  assert.throws(() => D.enterPassage(s, 'drainDoor', { x: 0, floor: 555 }), /Walk/);
  const loc = enter(s, 'drainDoor');
  assert.equal(loc.floor, 1510);
  assert.throws(() => enter(s, 'cellDoor'), /key/);
  D.investigateChamber(s, 'sluice');
  assert(s.flags.key_drainKey);
  assert.equal(s.inventory.at(-1).id, 'riverCharm');
  assert.throws(() => D.investigateChamber(s, 'sluice'), /already/);
  enter(s, 'cellDoor');
  assert(D.availableContracts(s).some((d) => d.id === 'jailer'));
  assert.throws(() => D.investigateChamber(s, 'cells'), /creature/);
  assert.equal(D.leaveChamber(s, 'cells').floor, 1510);
  assert.deepEqual(D.load(D.save(s)), s);
});
test('all chambers are reachable through produced keys and skills; graph branches and crosses vertically', () => {
  const s = guild(),
    c = s.roster[0];
  c.skills = ['water', 'tracking', 'echoSight', 'threadwalk', 'literacy'];
  s.flags.cellarDrained = true;
  const seen = new Set(['tower', 'cellar', 'labyrinth']);
  for (let i = 0; i < 30; i++)
    for (const p of D.passages) {
      if (!seen.has(p.from) || passageError(s, p, c)) continue;
      seen.add(p.to);
      const r = D.chambers.find((r) => r.id === p.to);
      s.flags['cleared_' + r.id] = true;
      if (r.key) s.flags['key_' + r.key] = true;
    }
  assert(D.chambers.every((r) => seen.has(r.id)));
  assert(D.passages.filter((p) => p.from === 'sluice').length > 1);
  assert(
    D.passages.some((p) => p.secret && p.y > 2000 && D.chambers.find((r) => r.id === p.to).y < 0),
  );
  assert(
    D.passages.some((p) => p.secret && p.y < 0 && D.chambers.find((r) => r.id === p.to).y > 2000),
  );
  assert(D.chambers.every((r) => r.story.length > 100 && (r.item || r.key)));
});
test('tower traps require actual skill; shortcuts and malformed saved routes are checked', () => {
  const s = guild();
  s.flags.tower = true;
  s.roster[0].skills = [];
  assert.throws(() => enter(s, 'studyDoor'), /literacy/i);
  s.roster[0].skills = ['literacy'];
  enter(s, 'studyDoor');
  D.investigateChamber(s, 'study');
  enter(s, 'shelfStair');
  s.roster[0].skills = [];
  assert.throws(() => D.investigateChamber(s, 'potions'), /trap/);
  s.roster[0].skills = ['literacy'];
  D.investigateChamber(s, 'potions');
  assert(s.flags.searched_potions);
  const raw = JSON.parse(D.save(s));
  raw.dungeonReturns.study.x = 0;
  assert.throws(() => D.load(JSON.stringify(raw)), /return route/);
});
test('dungeon clearing resolves its own narrative and pays once, preserving progress after withdrawal', () => {
  const s = guild();
  s.flags.cellarDrained = true;
  enter(s, 'drainDoor');
  D.investigateChamber(s, 'sluice');
  enter(s, 'cellDoor');
  const c = s.roster[0];
  c.str = 14;
  c.skills = ['guard', 'tracking', 'literacy', 'echoSight', 'stoneSong', 'threadwalk', 'water'];
  D.dispatch(s, 'jailer', ['ivo']);
  s.eventSeed = 97;
  D.day(s);
  const progress = s.threats.jailer.progress;
  assert(progress > 0);
  D.withdraw(s, s.missions.at(-1).uid);
  assert.equal(s.threats.jailer.progress, progress);
  assert.equal(c.status, 'home');
  assert.equal(D.leaveChamber(s, 'cells').floor, 1510);
  c.str = 100;
  D.dispatch(s, 'jailer', ['ivo']);
  for (let i = 0; i < 12 && !s.flags.cleared_cells; i++) {
    s.eventSeed = 97;
    D.day(s);
  }
  assert(s.flags.cleared_cells);
  assert(!s.flags.dragonSlain);
  assert.equal(s.reports.filter((r) => r.title === 'Iron jailer').length, 1);
  assert(!D.availableContracts(s).some((d) => d.id === 'jailer'));
  D.investigateChamber(s, 'cells');
  assert(s.flags.key_cryptKey);
  assert.deepEqual(D.load(D.save(s)), s);
});

test('sluice doors and their interaction ranges are distinct', () => {
  const s = guild();
  s.flags.cellarDrained = true;
  s.roster[0].skills.push('water');
  enter(s, 'drainDoor');
  const room = D.chambers.find((r) => r.id === 'sluice');
  const entrance = room.x + 48;
  const spillway = D.passages.find((p) => p.id === 'spillway');
  const cells = D.passages.find((p) => p.id === 'cellDoor');
  for (const other of [entrance, cells.x, room.x + 135]) {
    assert(Math.abs(spillway.x - other) > 130);
  }
  assert.throws(() => D.enterPassage(s, 'spillway', { x: entrance, floor: room.y }), /Walk/);
  enter(s, 'spillway');
  const back = D.leaveChamber(s, 'ratway');
  assert.equal(back.x, spillway.x);
  assert.equal(back.floor, room.y);
  assert.deepEqual(D.load(D.save(s)).dungeonReturns.ratway, s.dungeonReturns.ratway);
});

test('saved routes to the old spillway migrate to the separated door', () => {
  const s = guild();
  s.flags.cellarDrained = true;
  s.roster[0].skills.push('water');
  enter(s, 'drainDoor');
  enter(s, 'spillway');
  s.dungeonReturns.ratway.x = 890;
  const restored = D.load(D.save(s));
  assert.equal(D.leaveChamber(restored, 'ratway').x, 1130);
  assert.equal(restored.roster.length, s.roster.length);
});
