import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
test('complete loop: growth, physical gates, ledger, anchor and persistence', () => {
  const s = D.initial();
  D.recruit(s, 'bryn');
  s.selected = 'bryn';
  assert.throws(() => D.interact(s, 'wall'), /Strength 7/);
  while (s.roster[0].str < 10) {
    if (!D.availableContracts(s).some((d) => d.id === 'road')) {
      s.eventSeed = 97;
      D.day(s);
    }
    D.dispatch(s, 'road', ['bryn'], true);
    assert.equal(s.selected, 'rowan');
    assert(!D.home(s).some((c) => c.id === 'bryn'));
    while (s.missions.at(-1).status === 'travelling' || s.roster[0].status === 'injured') {
      s.eventSeed = 97;
      D.day(s);
    }
    if (s.roster[0].str < 10 && D.unspentLevels(s.roster[0]).length) D.advance(s, 'bryn', 'str');
  }
  s.selected = 'bryn';
  assert.equal(s.roster[0].str, 10);
  D.interact(s, 'wall');
  D.interact(s, 'repair');
  D.interact(s, 'ledger');
  const n = s.journal.length;
  assert.throws(() => D.interact(s, 'ledger'));
  assert.equal(s.journal.length, n);
  D.dispatch(s, 'anchor', ['bryn'], true);
  s.eventSeed = 97;
  D.day(s);
  s.eventSeed = 97;
  D.day(s);
  const restored = D.load(D.save(s));
  const m = restored.missions.find((m) => m.status === 'decision');
  assert(m);
  assert.equal(m.roll, s.missions.at(-1).roll);
  D.decide(restored, m.uid, 'safe');
  assert(restored.flags.anchor);
  assert(D.home(restored)[0].skills.includes('inscriptions'));
  const gold = restored.gold;
  assert.throws(() => D.decide(restored, m.uid, 'safe'));
  const damage = D.homeDanger(restored) ? Math.min(8, gold) : 0;
  restored.eventSeed = 97;
  D.day(restored);
  assert.equal(restored.gold, gold - damage);
  restored.selected = 'rowan';
  D.interact(restored, 'inscription');
  assert.deepEqual(D.load(D.save(restored)), restored);
});
test('funds and combined requirements are atomic', () => {
  const s = D.initial();
  D.recruit(s, 'bryn');
  s.selected = 'bryn';
  s.roster[0].str = 9;
  assert.throws(() => D.interact(s, 'wall'));
  s.roster[0].str = 10;
  D.interact(s, 'wall');
  s.gold = 69;
  const before = D.save(s);
  assert.throws(() => D.interact(s, 'repair'));
  assert.equal(D.save(s), before);
  s.gold = 70;
  D.interact(s, 'repair');
  assert.equal(s.gold, 0);
  assert.throws(() => D.interact(s, 'cellar'));
});
test('store access follows service-room restoration and damage', () => {
  const s = D.initial();
  D.recruit(s, 'bryn');
  assert.equal(D.storeAvailable(s), false);
  assert.throws(() => D.enterStore(s, 'bryn'));
  s.flags.repaired = true;
  assert.equal(D.storeAvailable(s), true);
  D.enterStore(s, 'bryn');
  s.damagedRooms = { service: { cost: 30 } };
  assert.equal(D.storeAvailable(s), false);
  assert.throws(() => D.enterStore(s, 'bryn'));
  delete s.damagedRooms.service;
  assert.equal(D.storeAvailable(s), true);
});

test('distinct parties, shared equipment and away availability', () => {
  const s = D.initial();
  s.gold = 200;
  D.recruit(s, 'bryn');
  const uid = D.equip(s, 'bryn', 'shield');
  assert.equal(s.roster[0].gear, null);
  assert.equal(s.inventory[0].owner, null);
  assert.throws(() => D.equipItem(s, 'bryn', uid), /store room/);
  s.flags.repaired = true;
  D.enterStore(s, 'bryn');
  D.equipItem(s, 'bryn', uid);
  assert.throws(() => D.equipItem(s, 'bryn', uid));
  D.leaveStore(s);
  assert.throws(() => D.dispatch(s, 'road', []));
  assert.throws(() => D.dispatch(s, 'road', ['bryn', 'bryn']));
  D.dispatch(s, 'road', ['bryn']);
  assert.throws(() => D.dispatch(s, 'road', ['bryn']));
  assert.throws(() => D.advance(s, 'bryn', 'str'));
  assert.equal(D.load(D.save(s)).roster[0].gear, 'shield');
});

test('injuries have recovery and viable no-funds fallback', () => {
  const s = D.initial();
  D.recruit(s, 'bryn');
  D.dispatch(s, 'road', ['bryn']);
  s.seed = 1;
  D.day(s);
  assert.equal(s.roster[0].status, 'injured');
  assert(!D.home(s).some((c) => c.id === 'bryn'));
  s.gold = 0;
  D.emergency(s);
  assert.equal(s.gold, 12);
  D.emergency(s);
  assert.equal(s.roster[0].status, 'home');
  assert.equal(s.gold, 24);
  assert.throws(() => D.load('{"version":99}'));
});
test('capability paths and supplies change outcomes', () => {
  const s = D.initial();
  D.recruit(s, 'bryn');
  const before = D.risk(s, 'quarry', ['bryn']).threat;
  s.roster[0].level = 2;
  s.roster[0].points = 1;
  D.advance(s, 'bryn', 'guard');
  assert.equal(D.risk(s, 'quarry', ['bryn']).threat, before - 15);
  s.roster[0].skills = [];
  D.dispatch(s, 'road', ['bryn'], true);
  s.seed = 1;
  D.day(s);
  assert.equal(s.roster[0].status, 'home');
  assert.equal(s.missions[0].harm[0].treated, true);
});

test('restoring the service room opens its cleared doorway to every resident, including Rowan', () => {
  const s = D.initial();
  s.gold = 500;
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  D.recruit(s, 'nell');
  s.selected = 'bryn';
  s.roster[0].str = 10;
  assert.equal(D.walkingBoundary(s, 'rowan'), 680);
  D.interact(s, 'wall');
  assert.equal(D.walkingBoundary(s, 'rowan'), 680);
  D.interact(s, 'repair');
  const restored = D.load(D.save(s));
  for (const id of ['rowan', 'bryn', 'ivo', 'nell']) {
    assert.equal(D.walkingBoundary(restored, id), 955);
    assert(D.walkingBoundary(restored, id) > 870);
  }
  restored.selected = 'rowan';
  D.interact(restored, 'ledger');
  assert(restored.flags.ledger);
  assert.equal(D.walkingBoundary(restored, 'rowan'), 955);
});

test('story rewards gate the cellar, tower and labyrinth without consuming funds on locked attempts', () => {
  const s = D.initial();
  s.gold = 500;
  D.recruit(s, 'bryn');
  const before = s.gold;
  assert.throws(() => D.interact(s, 'stairs'), /service room/);
  assert.throws(() => D.interact(s, 'tower'), /Wren/);
  assert.throws(() => D.interact(s, 'labyrinth'), /Wren/);
  assert.equal(s.gold, before);
  s.flags.breach = true;
  D.interact(s, 'repair');
  D.interact(s, 'stairs');
  assert(s.flags.stairs);
  assert.throws(() => D.interact(s, 'tower'), /key/);
  s.flags.ledger = true;
  D.dispatch(s, 'anchor', ['bryn'], true);
  while (s.missions.at(-1).status === 'travelling') D.day(s);
  D.decide(s, s.missions.at(-1).uid, 'safe');
  D.interact(s, 'tower');
  D.interact(s, 'labyrinth');
  assert(s.flags.tower && s.flags.labyrinth);
  assert.deepEqual(D.load(D.save(s)), s);
});
