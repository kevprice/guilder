import { characterAppearance, characterPose } from './character-pose.js';

function polygon(ctx, points, fill, edge = '#16252b', width = 0.8) {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (edge) {
    ctx.strokeStyle = edge;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}
function oval(ctx, x, y, rx, ry, fill, edge = null) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
  if (edge) {
    ctx.strokeStyle = edge;
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }
}
function line(ctx, points, color, width = 1) {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
}
function limb(ctx, points, color, width) {
  line(ctx, points, '#16232a', width + 1.8);
  line(ctx, points, color, width);
  line(
    ctx,
    points.map(([x, y]) => [x - 0.6, y]),
    '#e9d8b31f',
    width * 0.3,
  );
}
function boot(ctx, foot, far = false, brass = false, equipment = null) {
  const [x, y] = foot;
  polygon(
    ctx,
    [
      [x - 3, y - 6],
      [x + 3, y - 6],
      [x + 4, y - 3],
      [x + 8, y - 2],
      [x + 8, y],
      [x - 4, y],
    ],
    brass
      ? '#88673e'
      : equipment === 'ironGreaves'
        ? '#91a29d'
        : equipment === 'mistBoots'
          ? '#6a9b9e'
          : far
            ? '#40362f'
            : '#68503c',
  );
  line(
    ctx,
    [
      [x - 3, y - 4],
      [x + 3, y - 4],
    ],
    brass ? '#dbbc7b' : '#b29468',
    1.2,
  );
}
function station(ctx, kind) {
  if (!kind || kind === 'watch') return;
  const gardening = kind === 'garden';
  const top = gardening ? -17 : -25;
  polygon(
    ctx,
    [
      [19, top],
      [45, top],
      [45, top + 4],
      [19, top + 4],
    ],
    '#927452',
  );
  polygon(
    ctx,
    [
      [21, top + 4],
      [25, top + 4],
      [25, 0],
      [21, 0],
    ],
    '#544638',
  );
  polygon(
    ctx,
    [
      [40, top + 4],
      [44, top + 4],
      [44, 0],
      [40, 0],
    ],
    '#544638',
  );
  line(
    ctx,
    [
      [24, -6],
      [41, -6],
    ],
    '#796042',
    2,
  );
  if (kind === 'hammer') {
    polygon(
      ctx,
      [
        [26, -26],
        [38, -26],
        [36, -30],
        [44, -33],
        [26, -33],
        [25, -30],
        [28, -30],
      ],
      '#81928e',
      '#303c3e',
    );
    line(
      ctx,
      [
        [28, -33],
        [41, -33],
      ],
      '#d5dace',
      1.2,
    );
  } else if (kind === 'saw') {
    polygon(
      ctx,
      [
        [23, -29],
        [46, -29],
        [46, -25],
        [23, -25],
      ],
      '#c0a271',
    );
    line(
      ctx,
      [
        [27, -27],
        [44, -27],
      ],
      '#8c6c45',
    );
    line(
      ctx,
      [
        [26, -31],
        [26, -23],
      ],
      '#879992',
      2,
    );
  } else if (gardening) {
    polygon(
      ctx,
      [
        [22, -22],
        [44, -22],
        [42, -15],
        [24, -15],
      ],
      '#9b7250',
    );
    line(
      ctx,
      [
        [24, -22],
        [43, -22],
      ],
      '#413b2a',
      2,
    );
    line(
      ctx,
      [
        [33, -22],
        [33, -38],
      ],
      '#83a971',
      1.6,
    );
    oval(ctx, 29, -31, 4, 2, '#a3bd7b');
    oval(ctx, 37, -35, 4, 2, '#759b65');
  } else if (kind === 'distil') {
    polygon(
      ctx,
      [
        [28, -35],
        [35, -35],
        [37, -25],
        [27, -25],
      ],
      '#91beba77',
      '#a6c6be',
    );
    polygon(
      ctx,
      [
        [28, -29],
        [36, -29],
        [36, -26],
        [28, -26],
      ],
      '#85b9ad',
      null,
    );
    oval(ctx, 42, -29, 3, 4, '#7198b2aa', '#b2c4c0');
    line(
      ctx,
      [
        [39, -25],
        [45, -25],
      ],
      '#7f958f',
      1,
    );
  } else if (kind === 'study') {
    polygon(
      ctx,
      [
        [21, -29],
        [30, -30],
        [33, -28],
        [42, -29],
        [42, -25],
        [32, -25],
        [21, -26],
      ],
      '#ded4b2',
    );
    line(
      ctx,
      [
        [32, -28],
        [32, -25],
      ],
      '#827550',
    );
    for (let i = 0; i < 2; i++)
      line(
        ctx,
        [
          [35, -27.5 + i],
          [40, -27.5 + i],
        ],
        '#9d997e',
        0.5,
      );
    oval(ctx, 44, -27, 2, 2, '#344650');
  } else if (kind === 'sew') {
    polygon(
      ctx,
      [
        [24, -29],
        [39, -28],
        [42, -24],
        [36, -14],
        [30, -16],
        [33, -25],
        [23, -25],
      ],
      '#93a8b1',
    );
    line(
      ctx,
      [
        [30, -26],
        [37, -24],
        [34, -18],
      ],
      '#e4dcc0',
      0.6,
    );
    polygon(
      ctx,
      [
        [41, -30],
        [44, -30],
        [44, -25],
        [41, -25],
      ],
      '#c9b78c',
    );
  } else if (kind === 'care') {
    polygon(
      ctx,
      [
        [32, -35],
        [43, -35],
        [43, -25],
        [32, -25],
      ],
      '#beccbd',
    );
    line(
      ctx,
      [
        [37.5, -33],
        [37.5, -27],
      ],
      '#71958b',
      2,
    );
    line(
      ctx,
      [
        [35, -30],
        [40, -30],
      ],
      '#71958b',
      2,
    );
    oval(ctx, 25, -27, 4, 2, '#e0dfc9');
    line(
      ctx,
      [
        [23, -27],
        [27, -27],
      ],
      '#a5ae9b',
      0.6,
    );
  } else {
    polygon(
      ctx,
      [
        [32, -34],
        [44, -34],
        [44, -25],
        [32, -25],
      ],
      '#876b48',
    );
    line(
      ctx,
      [
        [33, -31],
        [43, -31],
      ],
      '#cfb487',
      1.2,
    );
    oval(ctx, 23, -27, 4, 2, kind === 'sort' ? '#a1b1ac' : '#bca77b');
  }
}
function workTool(ctx, p) {
  const kind = p.activity;
  if (!kind || kind === 'watch') return;
  const [x, y] = p.nearHand;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(p.toolAngle);
  if (kind === 'hammer') {
    polygon(
      ctx,
      [
        [-1.5, 4],
        [1.5, 4],
        [1.5, -13],
        [-1.5, -13],
      ],
      '#b28c59',
    );
    polygon(
      ctx,
      [
        [-6, -17],
        [6, -17],
        [6, -11],
        [-6, -11],
      ],
      '#9eaaa5',
    );
    line(
      ctx,
      [
        [-5, -16],
        [5, -16],
      ],
      '#d7e0d8',
    );
  } else if (kind === 'saw') {
    polygon(
      ctx,
      [
        [-3, 3],
        [3, 3],
        [3, -3],
        [-3, -3],
      ],
      '#ba8b52',
    );
    polygon(
      ctx,
      [
        [-2, -3],
        [2, -3],
        [3, -19],
        [0, -22],
        [-3, -19],
      ],
      '#aabbba',
    );
    line(
      ctx,
      [
        [-3, -5],
        [-4, -7],
        [-3, -9],
        [-4, -11],
        [-3, -13],
        [-4, -15],
        [-3, -17],
      ],
      '#dce1d6',
      0.7,
    );
  } else if (kind === 'garden') {
    polygon(
      ctx,
      [
        [0, -3],
        [7, -3],
        [8, 5],
        [0, 5],
      ],
      '#88a6a1',
    );
    polygon(
      ctx,
      [
        [7, 0],
        [12, -3],
        [14, -2],
        [8, 4],
      ],
      '#a7bdb1',
    );
    line(
      ctx,
      [
        [0, -2],
        [-4, -2],
        [-4, 3],
        [0, 3],
      ],
      '#c5cdb6',
      1.2,
    );
  } else if ((kind === 'sort' || kind === 'pack') && p.carrying) {
    polygon(
      ctx,
      [
        [-3, -2],
        [3, -2],
        [3, 3],
        [-3, 3],
      ],
      kind === 'sort' ? '#a5b5af' : '#cab58d',
    );
  } else if (kind === 'distil') {
    line(
      ctx,
      [
        [0, 0],
        [0, 7],
      ],
      '#cbbb84',
      1.3,
    );
  } else if (kind === 'study') {
    line(
      ctx,
      [
        [0, 2],
        [1, -5],
      ],
      '#624637',
      1,
    );
    polygon(
      ctx,
      [
        [1, -3],
        [0, -10],
        [4, -7],
        [2, -3],
      ],
      '#e0d7b9',
    );
  } else if (kind === 'sew')
    line(
      ctx,
      [
        [0, -2],
        [0, 3],
      ],
      '#d4dcd8',
      0.7,
    );
  else if (kind === 'care') oval(ctx, 0, 0, 3, 2, '#e3e3d2');
  ctx.restore();
  if (p.contact && kind === 'hammer') {
    line(
      ctx,
      [
        [35, -34],
        [37, -38],
      ],
      '#edca7f',
      1,
    );
    line(
      ctx,
      [
        [38, -34],
        [42, -36],
      ],
      '#edca7f',
      1,
    );
  }
  if (p.contact && kind === 'garden') {
    for (let i = 0; i < 3; i++) {
      const drop = (p.workPhase * 18 + i * 0.32) % 1;
      oval(ctx, 35 + i * 2, -26 + drop * 5, 0.7, 1, '#b5d7d3');
    }
  }
}
function weapon(ctx, c, p) {
  const id = c.equipmentSlots?.sword?.id || c.gear;
  const sword = [
    'hearthBlade',
    'emberBlade',
    'shortSword',
    'longSword',
    'glassDagger',
    'ironAxe',
  ].includes(id);
  const staff = ['wardStaff', 'stormRod', 'ashStaff'].includes(id);
  const spear = ['thornSpear', 'lanternSpear'].includes(id);
  const bow = ['moonBow', 'huntingBow'].includes(id);
  if (!sword && !staff && !spear && !bow && id !== 'sunHammer') return;
  ctx.save();
  const stowed = p.incapacitated || (p.activity && p.activity !== 'watch');
  ctx.translate(...(stowed ? [-9, -21 + p.bob] : p.nearHand));
  ctx.rotate(stowed ? -2.75 : (p.weaponAngle ?? -0.15 + p.lean));
  const metal =
    id === 'hearthBlade'
      ? '#9edbd1'
      : id === 'emberBlade'
        ? '#e9b583'
        : id === 'sunHammer'
          ? '#edcc89'
          : '#bed0cf';
  if (sword) {
    polygon(
      ctx,
      [
        [-1.5, 5],
        [1.5, 5],
        [1.5, -2],
        [-1.5, -2],
      ],
      '#8e6946',
    );
    line(
      ctx,
      [
        [-6, -2],
        [6, -2],
      ],
      '#d3ae73',
      2,
    );
    if (id === 'ironAxe') {
      line(
        ctx,
        [
          [0, 1],
          [0, -26],
        ],
        '#aa8252',
        3,
      );
      polygon(
        ctx,
        [
          [0, -25],
          [10, -28],
          [12, -17],
          [0, -18],
        ],
        metal,
      );
    } else {
      const length =
        id === 'glassDagger' ? 17 : ['longSword', 'hearthBlade'].includes(id) ? 36 : 29;
      polygon(
        ctx,
        [
          [-2.5, -3],
          [2.5, -3],
          [3, -length + 5],
          [0, -length],
          [-3, -length + 5],
        ],
        stowed ? '#5c6258' : metal,
      );
      if (!stowed)
        line(
          ctx,
          [
            [0, -5],
            [0, -length + 4],
          ],
          '#f0eddb',
          0.7,
        );
    }
  } else if (staff || spear) {
    line(
      ctx,
      [
        [0, 20],
        [0, -30],
      ],
      '#a98958',
      2.5,
    );
    polygon(
      ctx,
      [
        [0, -41],
        [5, -32],
        [0, -25],
        [-5, -32],
      ],
      spear ? metal : id === 'stormRod' ? '#a9d4e1' : '#a1d2c4',
    );
  } else if (bow) {
    ctx.strokeStyle = id === 'moonBow' ? '#b8d6d9' : '#b99560';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.quadraticCurveTo(13, 0, 0, 20);
    ctx.stroke();
    line(
      ctx,
      [
        [0, -20],
        [p.combatPhase === undefined ? 0 : p.farHand[0] - p.nearHand[0], 0],
        [0, 20],
      ],
      '#cfcaad',
      0.7,
    );
  } else {
    line(
      ctx,
      [
        [0, 8],
        [0, -25],
      ],
      '#a78952',
      3,
    );
    polygon(
      ctx,
      [
        [-9, -31],
        [9, -31],
        [9, -22],
        [-9, -22],
      ],
      metal,
    );
  }
  ctx.restore();
}
function shield(ctx, c, p) {
  const id = c.equipmentSlots?.shield?.id || c.gear;
  if (!['shield', 'oathShield', 'buckler', 'ironShield'].includes(id)) return;
  const stowed = p.incapacitated || (p.activity && p.activity !== 'watch');
  ctx.save();
  ctx.translate(...(stowed ? [-9, -30 + p.bob] : p.farHand));
  const w = id === 'buckler' ? 7 : 9;
  polygon(
    ctx,
    [
      [-w, -13],
      [w, -13],
      [w - 1, 4],
      [0, 10],
      [-w + 1, 4],
    ],
    id === 'oathShield' ? '#547b84' : '#79583e',
    '#c9ac78',
    1.2,
  );
  oval(ctx, 0, -3, 2.5, 2.5, '#c9b27e');
  if (c.specialisation === 'paladin') {
    line(
      ctx,
      [
        [0, -10],
        [0, 4],
      ],
      '#e5d7a7',
      1.2,
    );
    line(
      ctx,
      [
        [-4, -5],
        [4, -5],
      ],
      '#e5d7a7',
      1.2,
    );
  }
  ctx.restore();
}
export function paintSpriteEquipment(ctx, camera, c, x, y, time, facing = 1, pose = null) {
  const p = pose || characterPose(c, { time, facing });
  ctx.save();
  ctx.translate(x - camera, y);
  ctx.scale(p.facing, 1);
  shield(ctx, c, p);
  weapon(ctx, c, p);
  ctx.restore();
}
export function paintCharacter(ctx, camera, c, x, y, controlled, facing, motion = {}) {
  const p =
    motion.pose ||
    characterPose(c, { ...motion, time: motion.unconscious ? 0 : motion.time, facing });
  const a = characterAppearance(c),
    brass = c.id === 'mara',
    mage = c.type === 'mage';
  const body = c.equipmentSlots?.body?.id || c.gear;
  const plate = c.type === 'warrior' || ['stoneMail', 'ironHeart'].includes(body);
  const headgear = c.equipmentSlots?.head?.id || c.gear;
  ctx.save();
  ctx.lineCap = ctx.lineJoin = 'round';
  ctx.translate(x - camera, y);
  oval(ctx, 0, 2, brass ? 17 : 15, 3, '#09141c55');
  if (controlled) {
    ctx.strokeStyle = '#dfc58b';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(0, 3, 18, 4, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.scale(p.facing, 1);
  if (motion.unconscious) {
    ctx.translate(-14, -17);
    ctx.rotate(-Math.PI / 2);
  }
  if (motion.drawStation !== false) station(ctx, p.activity);
  polygon(
    ctx,
    [
      [-a.broad, -37 + p.bob],
      [2, -36 + p.bob],
      [1, -10 + p.bob],
      [-a.broad - 4 - p.clothSwing, -10 + p.bob],
    ],
    brass ? '#5b685e' : body === 'frostCloak' ? '#7babb7' : a.accent,
  );
  line(
    ctx,
    [
      [-a.broad + 2, -34 + p.bob],
      [-a.broad - p.clothSwing, -14 + p.bob],
    ],
    '#e6d9b052',
    1,
  );
  limb(ctx, [p.farHip, p.farKnee, p.farFoot], brass ? '#7b623c' : '#464d4c', brass ? 7 : 5.5);
  // Draw the rear arm over the cloak so its counter-swing remains visible.
  limb(ctx, [p.farShoulder, p.farElbow, p.farHand], brass ? '#96753e' : '#526666', brass ? 6 : 5);
  oval(ctx, ...p.farHand, 2.8, 2.6, brass ? '#aa884d' : a.skin);
  boot(ctx, p.farFoot, true, brass, c.equipmentSlots?.feet?.id);
  limb(ctx, [p.nearHip, p.nearKnee, p.nearFoot], brass ? '#a18752' : '#66716a', brass ? 7 : 6);
  boot(ctx, p.nearFoot, false, brass, c.equipmentSlots?.feet?.id);
  const b = p.bob;
  ctx.save();
  ctx.translate(0, -30 + b);
  ctx.rotate(p.lean);
  ctx.translate(0, 30 - b);
  if (mage)
    polygon(
      ctx,
      [
        [-9, -34 + b],
        [8, -34 + b],
        [12 + p.clothSwing, -9 + b],
        [2, -10 + b],
        [-11, -9 + b],
      ],
      a.accent,
    );
  polygon(
    ctx,
    [
      [-a.broad, -36 + b],
      [4, -39 + b],
      [a.broad, -34 + b],
      [a.broad - 2, -19 + b],
      [-a.broad + 2, -19 + b],
    ],
    brass ? '#b59656' : plate ? '#82928e' : a.accent,
  );
  polygon(
    ctx,
    [
      [-a.broad, -35 + b],
      [-2, -37 + b],
      [-2, -20 + b],
      [-a.broad + 2, -20 + b],
    ],
    brass ? '#91723f' : '#16313766',
    null,
  );
  line(
    ctx,
    [
      [2, -35 + b],
      [4, -22 + b],
    ],
    '#e9dfb875',
    1,
  );
  if (plate) {
    polygon(
      ctx,
      [
        [-9, -36 + b],
        [-4, -39 + b],
        [1, -35 + b],
        [-1, -30 + b],
        [-9, -30 + b],
      ],
      '#b1beb3',
    );
    line(
      ctx,
      [
        [4, -32 + b],
        [8, -30 + b],
        [7, -24 + b],
      ],
      '#d6dbca',
      0.9,
    );
  }
  polygon(
    ctx,
    [
      [-a.broad + 1, -21 + b],
      [a.broad - 1, -21 + b],
      [a.broad - 1, -18 + b],
      [-a.broad + 1, -18 + b],
    ],
    '#725b3e',
  );
  polygon(
    ctx,
    [
      [2, -22 + b],
      [6, -22 + b],
      [6, -17 + b],
      [2, -17 + b],
    ],
    '#d9bd7b',
  );
  if (brass) {
    oval(ctx, 2, -29 + b, 4, 4, '#5b8d8b', '#e1c887');
    oval(ctx, 2, -29 + b, 2, 2, '#b5e1d3');
    if (motion.tier >= 2)
      line(
        ctx,
        [
          [-11, -35 + b],
          [10, -35 + b],
        ],
        motion.tier >= 3 ? '#adc9bd' : '#bbc0a7',
        3,
      );
  }
  ctx.restore();
  ctx.save();
  ctx.translate(motion.unconscious ? -5 : 1, -48 + b);
  ctx.rotate(p.headTilt);
  if (brass) {
    polygon(
      ctx,
      [
        [-10, -9],
        [6, -11],
        [10, -6],
        [10, 7],
        [-9, 8],
      ],
      '#c6aa69',
      '#625238',
    );
    polygon(
      ctx,
      [
        [7, -3],
        [13, -2],
        [13, 3],
        [7, 3],
      ],
      '#b5985a',
    );
    line(
      ctx,
      [
        [-7, -6],
        [5, -7],
      ],
      '#e3d095',
      1.5,
    );
    oval(ctx, 5, -2, 2, 2.5, '#b1e7df', '#466d6e');
    line(
      ctx,
      [
        [3, 5],
        [9, 5],
      ],
      '#786544',
      1,
    );
    oval(ctx, -8, 0, 2.5, 2.5, '#90743e', '#dfc587');
  } else {
    if (a.hood)
      polygon(
        ctx,
        [
          [-11, 8],
          [-12, -7],
          [-5, -16],
          [6, -13],
          [11, -5],
          [7, 9],
        ],
        '#3c5a52',
      );
    if (a.longHair)
      polygon(
        ctx,
        [
          [-8, -7],
          [-10, 11],
          [-5, 16],
          [-2, 9],
          [0, -7],
        ],
        a.hair,
      );
    oval(ctx, 0, 0, 8, 10, c.undead ? '#b6bca2' : a.skin, '#654e3e');
    polygon(
      ctx,
      [
        [6, -3],
        [11, 0],
        [8, 3],
        [5, 3],
      ],
      c.undead ? '#b6bca2' : a.skin,
      null,
    );
    oval(ctx, -5, 2, 2.5, 3, a.skin, '#936b53');
    polygon(
      ctx,
      [
        [-8, 0],
        [-9, -8],
        [-4, -13],
        [4, -12],
        [8, -7],
        [6, -5],
        [0, -7],
        [-3, -4],
        [-5, 3],
      ],
      a.hair,
    );
    line(
      ctx,
      [
        [-6, -9],
        [0, -10],
        [5, -8],
      ],
      '#e2d6b34d',
      0.8,
    );
    if (a.beard)
      polygon(
        ctx,
        [
          [-3, 5],
          [4, 6],
          [8, 4],
          [7, 9],
          [2, 13],
          [-4, 9],
        ],
        a.hair,
        null,
      );
    line(
      ctx,
      [
        [3, -3],
        [7, -3],
      ],
      '#483c36',
      0.9,
    );
    oval(ctx, 5, -1, 1, 1.2, c.undead ? '#dbe6b5' : '#23343a');
    line(
      ctx,
      [
        [6, 5],
        [8, 5],
      ],
      '#795647',
      0.7,
    );
    if (a.scar)
      line(
        ctx,
        [
          [7, -5],
          [8, 1],
        ],
        '#946956',
        0.7,
      );
    if (a.circlet)
      line(
        ctx,
        [
          [-7, -6],
          [7, -6],
        ],
        '#cfb57e',
        1,
      );
    if (headgear === 'ironHelm') {
      polygon(
        ctx,
        [
          [-10, -2],
          [-9, -10],
          [-4, -14],
          [5, -12],
          [9, -5],
          [2, -5],
          [0, -1],
        ],
        '#95a8a3',
      );
      line(
        ctx,
        [
          [-6, -10],
          [3, -9],
        ],
        '#d9e2d3',
        1,
      );
    } else if (headgear === 'leatherCap' || headgear === 'scholarHood') {
      polygon(
        ctx,
        [
          [-9, -1],
          [-9, -10],
          [-2, -14],
          [6, -11],
          [9, -6],
          [1, -7],
          [-4, -2],
        ],
        headgear === 'leatherCap' ? '#7b6245' : '#706b8b',
      );
    } else if (headgear === 'rootCrown') {
      line(
        ctx,
        [
          [-8, -6],
          [-4, -8],
          [0, -6],
          [5, -8],
          [8, -6],
        ],
        '#ab9868',
        1.6,
      );
      oval(ctx, -3, -10, 2, 1.2, '#91b47b');
    } else if (headgear === 'echoLens') {
      oval(ctx, 5, -1, 2.5, 2.5, '#92c6ca88', '#c6b67e');
      line(
        ctx,
        [
          [-6, -2],
          [3, -2],
        ],
        '#ac9b75',
        1,
      );
    }
  }
  ctx.restore();
  shield(ctx, c, p);
  limb(
    ctx,
    [p.nearShoulder, p.nearElbow, p.nearHand],
    brass ? '#c0a161' : plate ? '#98a89e' : a.accent,
    brass ? 7 : 5.5,
  );
  if (brass) {
    oval(ctx, ...p.nearElbow, 3, 3, '#7c714e', '#d2bc83');
    oval(ctx, ...p.nearShoulder, 4, 4, '#bdad7a', '#766443');
  }
  weapon(ctx, c, p);
  if (p.combatPhase !== undefined && c.type === 'scout') {
    limb(ctx, [p.farShoulder, p.farElbow, p.farHand], a.accent, 5);
    oval(ctx, ...p.farHand, 2.8, 2.7, a.skin);
  }
  workTool(ctx, p);
  oval(ctx, ...p.nearHand, 2.8, 2.7, brass ? '#d0b67a' : a.skin, '#705b42');
  const accessory = c.equipmentSlots?.accessory?.id || c.gear;
  if (['riverCharm', 'phoenixPin', 'threadRing', 'starCompass'].includes(accessory))
    oval(ctx, 5, -32 + b, 1.8, 2, '#dfcc99');
  ctx.restore();
  return p;
}

export function paintWorkstation(ctx, camera, position, kind, facing = 1) {
  ctx.save();
  ctx.translate(position.x - camera, position.y);
  ctx.scale(facing, 1);
  station(ctx, kind);
  ctx.restore();
}
