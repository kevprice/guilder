// All sprite layers share these joints, in a right-facing frame with feet at y=0.
import { expansionRecruits } from './expansion.js';
const tau = Math.PI * 2;
const mix = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const identities = {
  rowan: { skin: '#d3b59b', hair: '#b6b3aa', beard: true, longHair: true },
  bryn: { skin: '#d3a584', hair: '#6b3e29', beard: false, scar: true },
  ivo: { skin: '#d0ac91', hair: '#302b38', longHair: true },
  maelin: { skin: '#bfaaa5', hair: '#d6e7e8', longHair: true, circlet: true },
  nell: { skin: '#a77b5d', hair: '#49352b', hood: true },
  oren: { skin: '#ad9481', hair: '#84827b', beard: true },
  ysra: { skin: '#a57562', hair: '#292638', longHair: true },
};
for (const [i, c] of expansionRecruits.entries()) {
  identities[c.id] = {
    skin: ['#d7b092', '#9f7056', '#c48a66', '#8c6151'][i % 4],
    hair: ['#d8d4bc', '#342839', '#70513c', '#a56f49', '#263439'][i % 5],
    beard: i % 3 === 0,
  };
}
export function characterAppearance(c) {
  const seed = [...(c.id || c.name || 'resident')].reduce((n, v) => n + v.charCodeAt(0), 0);
  return {
    skin: ['#d7b092', '#9f7056', '#c48a66', '#8c6151'][seed % 4],
    hair: ['#d8d4bc', '#342839', '#70513c', '#a56f49', '#263439'][seed % 5],
    longHair: seed % 3 === 0,
    beard: c.type === 'warrior' && seed % 3 === 1,
    hood: c.type === 'scout',
    ...identities[c.id],
    accent: c.undead ? '#708575' : c.color || '#bba679',
    broad: c.type === 'warrior' ? 12 : c.id === 'mara' ? 13 : 9,
  };
}
export function bentJoint(a, b, upper, lower, bend = 1) {
  const dx = b[0] - a[0],
    dy = b[1] - a[1];
  const distance = Math.max(0.001, Math.hypot(dx, dy));
  const reach = Math.min(distance, upper + lower - 0.001);
  const along = (upper * upper - lower * lower + reach * reach) / (2 * reach);
  const offset = Math.sqrt(Math.max(0, upper * upper - along * along)) * bend;
  return [
    a[0] + (dx / distance) * along - (dy / distance) * offset,
    a[1] + (dy / distance) * along + (dx / distance) * offset,
  ];
}
export function characterPose(c, motion = {}) {
  const time = motion.reducedMotion || motion.unconscious ? 0 : motion.time || 0;
  const seed = [...(c.id || '')].reduce((n, v) => n + v.charCodeAt(0), 0);
  const phase = motion.distance === undefined ? time * 10 : (motion.distance / 90) * tau;
  const walking = !!motion.moving && !motion.reducedMotion;
  const climbing = walking && motion.kind === 'stairs';
  const airborne = !!motion.airborne;
  const activity =
    !motion.moving && !airborne && !motion.unconscious ? motion.activity || null : null;
  const bob = motion.unconscious
    ? 0
    : walking
      ? -Math.abs(Math.sin(phase * 2)) * 1.1
      : Math.sin(time * 1.7 + seed) * 0.3;
  const pose = {
    facing: motion.facing === -1 ? -1 : 1,
    activity,
    bob,
    lean: walking ? 0.04 : 0,
    nearFoot: walking ? [Math.sin(phase) * 11, -Math.max(0, Math.cos(phase)) * 5] : [6, 0],
    farFoot: walking ? [-Math.sin(phase) * 11, -Math.max(0, -Math.cos(phase)) * 5] : [-5, 0],
    nearHand: walking ? [8 - Math.sin(phase) * 7, -23 + bob] : [10, -22 + bob],
    farHand: walking ? [-4 + Math.sin(phase) * 7, -24 + bob] : [-6, -23 + bob],
    toolAngle: 0,
    contact: false,
    headTilt: 0,
    clothSwing: walking ? Math.sin(phase - 0.6) * 3 : Math.sin(time * 1.4 + seed) * 0.4,
  };
  if (climbing) {
    pose.nearHand = [8, -42 - Math.cos(phase) * 6];
    pose.farHand = [-4, -42 + Math.cos(phase) * 6];
    pose.nearFoot[1] -= 4;
    pose.farFoot[1] -= 4;
  }
  if (airborne) {
    pose.nearFoot = [8, -6];
    pose.farFoot = [-7, -4];
    pose.nearHand = [14, -30];
    pose.farHand = [-12, -31];
    pose.lean = -0.06;
  }
  if (activity && activity !== 'watch') {
    const t = motion.reducedMotion ? 0.48 : (time / 2.2 + seed * 0.037) % 1;
    pose.workPhase = t;
    pose.lean = 0.075;
    pose.headTilt = 0.12;
    pose.farHand = [16, -27];
    if (activity === 'hammer') {
      // Lift, strike, dwell on the anvil, then recover. The spark has one impact window.
      const strike =
        t < 0.35
          ? 0
          : t < 0.48
            ? smooth((t - 0.35) / 0.13)
            : t < 0.65
              ? 1
              : 1 - smooth((t - 0.65) / 0.35);
      pose.nearHand = [mix(14, 24, strike), mix(-46, -39, strike)];
      pose.toolAngle = mix(-0.35, Math.PI / 2, strike);
      pose.contact = !motion.reducedMotion && t >= 0.46 && t < 0.5;
    } else if (activity === 'saw') {
      pose.nearHand = [23 + Math.sin(t * tau) * 4, -28];
      pose.toolAngle = Math.PI / 2;
      pose.farHand = [17, -27];
    } else if (activity === 'garden') {
      pose.nearHand = [22, -27];
      pose.toolAngle = Math.sin(t * Math.PI) * 0.35;
      pose.contact = !motion.reducedMotion && t > 0.3 && t < 0.75;
    } else if (activity === 'pack' || activity === 'sort') {
      pose.nearHand = [19 + Math.sin(t * Math.PI) * 9, -27 - Math.sin(t * Math.PI) * 4];
      pose.carrying = t > 0.15 && t < 0.75;
    } else if (activity === 'distil') {
      pose.nearHand = [24 + Math.sin(t * tau) * 1.2, -32];
      pose.toolAngle = -0.35;
    } else if (activity === 'sew') {
      pose.nearHand = [24, -29 - Math.max(0, Math.sin(t * tau)) * 4];
      pose.farHand = [17, -28];
    } else {
      pose.nearHand = [24 + Math.sin(t * tau) * 1.5, -29];
      pose.farHand = [17, -28];
    }
  }
  if (activity === 'watch') {
    pose.nearHand = [11, -28];
    pose.farHand = [0, -28];
  }
  if (motion.combat && !motion.unconscious) {
    const phase = motion.reducedMotion ? 0 : (time / 1.4 + seed * 0.037) % 1;
    const strike =
      phase < 0.3
        ? 0
        : phase < 0.48
          ? smooth((phase - 0.3) / 0.18)
          : 1 - smooth((phase - 0.48) / 0.52);
    pose.combatPhase = phase;
    pose.nearFoot = [9, 0];
    pose.farFoot = [-7, 0];
    pose.lean = 0.03 + strike * 0.09;
    if (motion.combat === 'warrior') {
      pose.nearHand = [mix(12, 26, strike), mix(-42, -34, strike)];
      pose.weaponAngle = mix(-0.4, 1.1, strike);
      pose.farHand = [3, -28];
    } else if (motion.combat === 'scout') {
      pose.nearHand = [23, -35];
      pose.farHand = [10 - strike * 3, -35];
      pose.weaponAngle = 0;
    } else {
      pose.nearHand = [20, -32];
      pose.farHand = [14 + strike * 3, -38];
      pose.weaponAngle = 0.2;
    }
  }
  if (motion.unconscious) {
    pose.nearFoot = [-12, -3];
    pose.farFoot = [-14, -5];
    pose.nearHand = [3, -27];
    pose.farHand = [0, -28];
    pose.clothSwing = 0;
    pose.incapacitated = true;
  }
  pose.nearShoulder = [5, -36 + bob];
  pose.farShoulder = [-4, -36 + bob];
  pose.nearElbow = bentJoint(pose.nearShoulder, pose.nearHand, 12, 12, 1);
  pose.farElbow = bentJoint(pose.farShoulder, pose.farHand, 12, 12, 1);
  if (!activity && !climbing && !airborne && !motion.combat && !motion.unconscious) {
    // A relaxed pendulum from the shoulder, with a small forward elbow bend.
    // Keep the gait cadence: smaller arcs soften wrist speed without drifting out of step.
    const swing = walking ? Math.sin(phase - 0.25) * 0.2 : 0;
    const arm = (shoulder, angle, flex = 0.18) => {
      const elbow = [shoulder[0] + Math.sin(angle) * 12, shoulder[1] + Math.cos(angle) * 12];
      const hand = [elbow[0] + Math.sin(angle + flex) * 12, elbow[1] + Math.cos(angle + flex) * 12];
      return { elbow, hand };
    };
    const held = c.equipmentSlots?.sword?.id || c.gear;
    const carrying = [
      'wardStaff',
      'stormRod',
      'ashStaff',
      'huntingBow',
      'moonBow',
      'thornSpear',
      'lanternSpear',
    ].includes(held);
    const near = carrying
      ? arm(pose.nearShoulder, -swing * 0.25, 1.28)
      : arm(pose.nearShoulder, -swing);
    const far = arm(pose.farShoulder, swing);
    pose.nearElbow = near.elbow;
    pose.nearHand = near.hand;
    pose.farElbow = far.elbow;
    pose.farHand = far.hand;
  }
  pose.nearHip = [3, -21 + bob];
  pose.farHip = [-3, -21 + bob];
  pose.nearKnee = bentJoint(pose.nearHip, pose.nearFoot, 12, 12, -1);
  pose.farKnee = bentJoint(pose.farHip, pose.farFoot, 12, 12, -1);
  return pose;
}

// Locomotion responds to displacement, so a blocked character cannot walk in place.
export function trackSprite(previous, position, { allowMovement = true, facing = null } = {}) {
  const dx = previous ? position.x - previous.x : 0;
  const dy = previous ? position.y - previous.y : 0;
  const displacement = Math.hypot(dx, dy);
  const moving = allowMovement && displacement > 0.02 && displacement < 50;
  return {
    x: position.x,
    y: position.y,
    moving,
    distance: (previous?.distance || 0) + (moving ? displacement : 0),
    facing: facing || (moving && Math.abs(dx) > 0.02 ? Math.sign(dx) : previous?.facing) || 1,
  };
}
