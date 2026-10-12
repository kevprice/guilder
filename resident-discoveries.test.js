import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
test('only Bryn is available in the opening rooms; repairs do not reveal a batch of companions', () => {
  const s = D.initial();
  const available = () =>
    D.residentDiscoveries.filter((d) => D.discoveryAvailable(s, d)).map((d) => d.id);
  assert.deepEqual(available(), ['bryn']);
  s.gold = 0;
  D.recoverResident(s, 'bryn', { x: 240, floor: 380 });
  assert.equal(s.gold, 0);
  s.flags.repaired = true;
  s.flags.stairs = true;
  assert.deepEqual(available(), []);
  assert.throws(() => D.recoverResident(s, 'nell', { x: 430, floor: 380 }));
  assert.throws(() => D.discoverSleeper(s, 'oren'));
  s.flags.ledger = s.flags.anchor = s.flags.tower = true;
  assert.deepEqual(available(), ['ivo']);
  assert.throws(() => D.recoverResident(s, 'ivo', { x: 910, floor: 380 }), /Walk/);
  D.recoverResident(s, 'ivo', { x: 650, floor: 140 });
  s.flags.searched_cells = true;
  D.recoverResident(s, 'nell', { x: 1850, floor: 1770 });
  assert.equal(D.load(D.save(s)).roster.length, 3);
});

test('regional companions are spaced across three expedition milestones and distinct rooms', () => {
  const s = D.initial();
  for (const region of ['fen', 'ash', 'glass', 'root', 'frost', 'clock', 'deep', 'star']) {
    const discoveries = D.residentDiscoveries.filter((d) =>
      d.requires.some((f) => f.startsWith(region + 'Room')),
    );
    assert.equal(discoveries.length, 3);
    assert.equal(new Set(discoveries.map((d) => d.x)).size, 3);
    for (const d of discoveries)
      for (const f of d.requires.filter((f) => f.includes('Room'))) s.flags[f] = true;
    assert.equal(discoveries.filter((d) => D.discoveryAvailable(s, d)).length, 0);
    for (const [i, step] of [6, 9, 11].entries()) {
      s.flags[region + 'Step' + step] = true;
      assert.equal(discoveries.filter((d) => D.discoveryAvailable(s, d)).length, i + 1);
    }
  }
});

test('advanced sleepers require evidence from separate dungeon branches', () => {
  const s = D.initial();
  for (const flag of ['stairs', 'towerCrown', 'labyrinthHeart']) s.flags[flag] = true;
  for (const id of ['oren', 'ysra']) assert.throws(() => D.discoverSleeper(s, id));
  for (const [id, flag] of [
    ['oren', 'searched_crypt'],
    ['ysra', 'searched_maze'],
  ]) {
    s.flags[flag] = true;
    D.discoverSleeper(s, id);
    assert(s.flags['found_' + id]);
  }
});

test('control destinations preserve distinct coordinates and floors through saves', () => {
  const s = D.initial();
  D.recoverResident(s, 'bryn', { x: 240, floor: 380 });
  D.rememberPosition(s, 'rowan', { x: 600, floor: 380 });
  D.rememberPosition(s, 'bryn', { x: 730, floor: 555 });
  s.flags.stairs = true;
  s.flags.cellarDrained = true;
  assert.equal(D.residentPosition(s, 'rowan').x, 600);
  assert.equal(D.residentPosition(s, 'bryn').floor, 555);
  const loaded = D.load(D.save(s));
  assert.equal(D.residentPosition(loaded, 'bryn').x, 730);
  const bad = JSON.parse(D.save(s));
  bad.residentPositions.bryn.floor = 999;
  assert.throws(() => D.load(JSON.stringify(bad)));
});
test('regional residents require their returned guild rooms rather than outside recruitment', () => {
  const s = D.initial(),
    d = D.residentDiscoveries.find((d) => d.id === 'tamsin');
  s.flags.fenStep2 = true;
  assert.throws(() => D.recoverResident(s, 'tamsin', { x: d.x, floor: 380 }));
  for (const f of d.requires) s.flags[f] = true;
  assert.throws(() => D.recoverResident(s, 'tamsin', { x: 160, floor: 380 }));
  D.recoverResident(s, 'tamsin', { x: d.x, floor: 380 });
  assert.equal(s.gold, 100);
  assert.match(s.roster[0].bio, /old guild/);
});
