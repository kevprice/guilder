import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
test('every companion starts inside a guild room and early discoveries need no gold or class', () => {
  assert.equal(D.residentDiscoveries.length + D.sleepers.length, 30);
  const s = D.initial();
  s.gold = 0;
  D.recoverResident(s, 'bryn', { x: 240, floor: 380 });
  assert.equal(s.gold, 0);
  assert.equal(s.roster[0].id, 'bryn');
  D.recoverResident(s, 'nell', { x: 430, floor: 380 });
  assert.equal(s.gold, 0);
  assert.throws(() => D.recoverResident(s, 'ivo', { x: 910, floor: 380 }));
  s.flags.repaired = true;
  D.recoverResident(s, 'ivo', { x: 910, floor: 380 });
  assert.throws(() => D.recoverResident(s, 'ivo', { x: 910, floor: 380 }));
  assert.equal(D.load(D.save(s)).roster.length, 3);
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
