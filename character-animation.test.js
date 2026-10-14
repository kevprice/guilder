import test from 'node:test';
import assert from 'node:assert/strict';
import { characterPose, characterAppearance, trackSprite } from './character-pose.js';
import { walkSample } from './resident-motion.js';
import { workerActivity } from './house-art.js';
import { paintCharacter } from './artwork.js';
import * as D from './domain.js';

const c = { id: 'bryn', type: 'warrior' };
const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
test('walks, stairs and job cycles retain connected limbs within their anatomical reach', () => {
  for (const activity of [
    null,
    'hammer',
    'saw',
    'garden',
    'sew',
    'study',
    'pack',
    'sort',
    'care',
    'watch',
  ])
    for (let time = 0; time < 5; time += 0.031) {
      const p = characterPose(c, { time, activity, moving: !activity });
      for (const side of ['near', 'far']) {
        const shoulder = p[side + 'Shoulder'],
          elbow = p[side + 'Elbow'],
          hand = p[side + 'Hand'];
        assert.ok(Math.abs(distance(shoulder, elbow) - 12) < 0.002);
        assert.ok(Math.abs(distance(elbow, hand) - 12) < 0.002, `${activity} hand detached`);
        assert.ok(p[side + 'Foot'][1] <= 0, 'foot penetrated ground');
      }
    }
});
test('blocked movement, camera changes and teleports cannot advance a walk cycle', () => {
  const first = trackSprite(null, { x: 120, y: 380 });
  const blocked = trackSprite(first, { x: 120, y: 380 }, { allowMovement: true });
  assert.equal(blocked.moving, false);
  const left = trackSprite(blocked, { x: 115, y: 380 });
  assert.equal(left.facing, -1);
  assert.equal(left.distance, 5);
  const stopped = trackSprite(left, { x: 115, y: 380 });
  assert.equal(stopped.facing, -1);
  assert.equal(stopped.moving, false);
  const teleport = trackSprite(stopped, { x: 815, y: 140 });
  assert.equal(teleport.moving, false);
  assert.equal(teleport.distance, 5);
});
test('walking arms hang below the waist with soft bends and a restrained opposing swing', () => {
  for (let distance = 0; distance < 180; distance += 1) {
    const p = characterPose(c, { moving: true, distance });
    for (const side of ['near', 'far']) {
      const shoulder = p[side + 'Shoulder'],
        elbow = p[side + 'Elbow'],
        hand = p[side + 'Hand'];
      assert.ok(elbow[1] > shoulder[1] + 10, 'upper arm should hang down');
      assert.ok(hand[1] > elbow[1] + 10, 'forearm should not punch forward');
      assert.ok(hand[1] > -15 && hand[1] < -10, 'hand should stay near the thigh');
      assert.ok(Math.abs(hand[0] - shoulder[0]) < 7, 'arm swing should stay restrained');
    }
  }
});
test('combat stances keep both grips connected through attacks, drawing and casting', () => {
  for (const combat of ['warrior', 'scout', 'mage'])
    for (let time = 0; time < 4; time += 0.03) {
      const p = characterPose(c, { combat, time });
      for (const side of ['near', 'far']) {
        assert.ok(distance(p[side + 'Shoulder'], p[side + 'Hand']) < 24);
        assert.ok(Math.abs(distance(p[side + 'Elbow'], p[side + 'Hand']) - 12) < 0.002);
      }
      assert.equal(p.nearFoot[1], 0);
      assert.equal(p.farFoot[1], 0);
    }
});
test('door and vertical legs retain the travel direction, including on arrival', () => {
  const legs = [
    {
      a: { x: 100, y: 380, floor: 380 },
      b: { x: 50, y: 380, floor: 380 },
      duration: 1,
      kind: 'walk',
    },
    {
      a: { x: 50, y: 380, floor: 380 },
      b: { x: 50, y: 140, floor: 140 },
      duration: 2,
      kind: 'stairs',
    },
  ];
  assert.equal(walkSample(legs, 1.5).facing, -1);
  assert.equal(walkSample(legs, 1.5).kind, 'stairs');
  assert.equal(walkSample(legs, 4).facing, -1);
});
test('a work pose requires a fit, stationary worker at an active assigned workstation', () => {
  const s = D.initial({ opening: 'legacy' });
  D.assignRoomWorker(s, 'corridor', 0, 'rowan');
  const worker = D.guildWorker(s, 'rowan'),
    room = D.assignedRoom(s, 'rowan');
  const at = D.workerStation(room, 0),
    before = JSON.stringify(s);
  assert.equal(workerActivity(s, worker, at), 'saw');
  for (const motion of [{ moving: true }, { travelling: true }, { airborne: true }])
    assert.equal(workerActivity(s, worker, at, motion), null);
  assert.equal(workerActivity(s, worker, { ...at, x: at.x + 30 }), null);
  assert.equal(JSON.stringify(s), before, 'rendering changed production state');
  s.rowanRecovery = 2;
  assert.equal(workerActivity(s, worker, at), null);
});
test('reduced motion freezes every job without impact particles or time-dependent joints', () => {
  for (const activity of ['hammer', 'saw', 'garden', 'study', 'distil', 'pack', 'care', 'sew']) {
    const a = characterPose(c, { activity, time: 1, reducedMotion: true });
    const b = characterPose(c, { activity, time: 80, reducedMotion: true });
    assert.deepEqual(a, b);
    assert.equal(a.contact, false);
  }
});
test('unconscious residents rest without continuing a job or combat animation', () => {
  const a = characterPose(c, { unconscious: true, combat: 'warrior', activity: 'hammer', time: 1 });
  const b = characterPose(c, {
    unconscious: true,
    combat: 'warrior',
    activity: 'hammer',
    time: 100,
  });
  assert.deepEqual(a, b);
  assert.equal(a.activity, null);
  assert.equal(a.contact, false);
  assert.equal(a.incapacitated, true);
});
test('facing mirrors the whole sprite and tools, while distinct residents retain portrait traits', () => {
  const scales = [];
  const context = new Proxy(
    {},
    {
      get: (_, key) => (key === 'scale' ? (...args) => scales.push(args) : () => {}),
      set: () => true,
    },
  );
  for (const facing of [-1, 1])
    paintCharacter(context, 0, c, 0, 0, false, facing, { activity: 'hammer' });
  assert.deepEqual(scales, [
    [-1, 1],
    [1, 1],
  ]);
  assert.equal(characterAppearance({ id: 'rowan' }).beard, true);
  assert.equal(characterAppearance({ id: 'nell' }).hood, true);
  assert.notEqual(
    characterAppearance({ id: 'bryn' }).hair,
    characterAppearance({ id: 'ivo' }).hair,
  );
});

test('left and right arms alternate over the stride and the cloak does not hide the rear hand', () => {
  const samples = [0, 22.5, 45, 67.5, 90].map((distance) =>
    characterPose(c, { moving: true, distance }),
  );
  for (let i = 1; i < samples.length; i++) {
    const near = samples[i].nearHand[0] - samples[i - 1].nearHand[0];
    const far = samples[i].farHand[0] - samples[i - 1].farHand[0];
    assert.ok(near * far < 0, 'arms must travel in opposite directions');
  }
  const p = samples[1],
    events = [];
  let color;
  const ctx = new Proxy(
    {},
    {
      get: (_, key) =>
        key === 'ellipse'
          ? (...args) => events.push({ kind: 'ellipse', args })
          : key === 'fill'
            ? () => events.push({ kind: 'fill', color })
            : () => {},
      set: (_, key, value) => {
        if (key === 'fillStyle') color = value;
        return true;
      },
    },
  );
  paintCharacter(ctx, 0, c, 0, 0, false, 1, { pose: p });
  const cloak = events.findIndex(
    (e) => e.kind === 'fill' && e.color === characterAppearance(c).accent,
  );
  const rear = events.findIndex(
    (e) => e.kind === 'ellipse' && e.args[0] === p.farHand[0] && e.args[1] === p.farHand[1],
  );
  assert.ok(cloak >= 0 && rear > cloak, 'rear hand must be visible in front of the cloak');
});
