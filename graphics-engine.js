// Retained world coordinates, a smooth camera lens and resolution-independent art.
// Simulation remains in domain.js; rendering never advances game state.
export const VIEW = { width: 1200, height: 650, pivotX: 600, pivotY: 380 };
export function clampZoom(value) {
  return Math.max(0.7, Math.min(3, Number(value) || 1));
}
export function screenToWorld(x, y, camera, cameraY, zoom, width = VIEW.width) {
  return {
    x: (x - width / 2) / zoom + width / 2 + camera,
    y: (y - VIEW.pivotY) / zoom + VIEW.pivotY + cameraY,
  };
}
export function visibleBounds(camera, cameraY, zoom, width = VIEW.width) {
  const a = screenToWorld(0, 0, camera, cameraY, zoom, width),
    b = screenToWorld(width, VIEW.height, camera, cameraY, zoom, width);
  return { left: a.x, top: a.y, right: b.x, bottom: b.y };
}
export class GraphicsEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.zoom = 1.25;
    this.targetZoom = 1.25;
    this.focus = false;
    this.reducedMotion = false;
    this.dpr = 1;
    this.width = VIEW.width;
  }
  resize(dpr = 1) {
    this.dpr = Math.max(1, Math.min(2, dpr));
    if (this.canvas.clientWidth && this.canvas.clientHeight)
      this.width = Math.max(
        320,
        Math.round((this.canvas.clientWidth / this.canvas.clientHeight) * VIEW.height),
      );
    const width = this.width * this.dpr,
      height = VIEW.height * this.dpr;
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }
  setZoom(value) {
    this.targetZoom = clampZoom(value);
    return this.targetZoom;
  }
  tick(dt) {
    this.zoom = this.reducedMotion
      ? this.targetZoom
      : this.zoom + (this.targetZoom - this.zoom) * (1 - Math.exp(-12 * dt));
  }
  begin(ctx) {
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, VIEW.height);
    ctx.imageSmoothingEnabled = true;
  }
  world(ctx, cameraY) {
    ctx.save();
    ctx.translate(this.width / 2, VIEW.pivotY);
    ctx.scale(this.zoom, this.zoom);
    ctx.translate(-this.width / 2, -VIEW.pivotY - cameraY);
  }
  end(ctx) {
    ctx.restore();
  }
}
function ellipse(ctx, x, y, rx, ry, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}
function path(ctx, points, fill, stroke = null, width = 2) {
  ctx.beginPath();
  points.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}
export function glow(ctx, x, y, r, color, strength = 0.4) {
  ctx.save();
  ctx.globalAlpha = strength;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, 'transparent');
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
  ctx.restore();
}
function sparks(ctx, x, y, time, color, count = 8, radius = 25) {
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const a = time * 0.55 + i * 2.399,
      dist = radius * (0.35 + 0.65 * (((i * 7) % 11) / 11));
    ellipse(
      ctx,
      x + Math.cos(a) * dist,
      y + Math.sin(a * 1.3) * dist,
      1 + (i % 2),
      1 + (i % 2),
      color,
    );
  }
}
export function paintEquipment(ctx, camera, c, x, y, time, facing = 1) {
  const sx = x - camera,
    mage = !c.undead && (c.type === 'mage' || ['healer', 'necromancer'].includes(c.specialisation)),
    warrior = c.type === 'warrior',
    gear = c.equipmentSlots?.sword?.id || c.gear,
    shield = c.equipmentSlots?.shield?.id || c.gear,
    body = c.equipmentSlots?.body?.id || c.gear,
    feet = c.equipmentSlots?.feet?.id || c.gear;
  ctx.save();
  if (
    warrior ||
    [
      'emberBlade',
      'sunHammer',
      'thornSpear',
      'lanternSpear',
      'glassDagger',
      'shortSword',
      'longSword',
      'ironAxe',
    ].includes(gear)
  ) {
    ctx.save();
    ctx.translate(sx + 19 * facing, y - 24);
    ctx.rotate(facing * 0.3 + Math.sin(time * 2) * 0.025);
    const magical = ['emberBlade', 'sunHammer', 'lanternSpear'].includes(gear),
      color = gear === 'emberBlade' ? '#ffc085' : gear === 'sunHammer' ? '#ffdf89' : '#dbe8f1';
    if (magical) glow(ctx, 0, -18, 30, color, 0.35);
    if (gear === 'sunHammer') {
      path(
        ctx,
        [
          [-14, -37],
          [14, -37],
          [14, -24],
          [-14, -24],
        ],
        '#dcc694',
        '#fff1be',
      );
      ctx.fillStyle = '#91704b';
      ctx.fillRect(-2, -25, 4, 34);
    } else if (gear?.includes('Spear')) {
      path(
        ctx,
        [
          [-1, -48],
          [1, -48],
          [2, 10],
          [-2, 10],
        ],
        '#ad8253',
      );
      path(
        ctx,
        [
          [0, -63],
          [7, -47],
          [0, -39],
          [-7, -47],
        ],
        color,
        '#54706b',
      );
    } else {
      path(
        ctx,
        [
          [0, -40],
          [5, -29],
          [3, 0],
          [-3, 0],
          [-5, -29],
        ],
        color,
        '#65849b',
        1,
      );
      ctx.fillStyle = '#e0b76f';
      ctx.fillRect(-8, 0, 16, 3);
      ctx.fillStyle = '#69503b';
      ctx.fillRect(-2, 3, 4, 10);
      ellipse(ctx, 0, 13, 3, 3, '#e0b76f');
    }
    ctx.restore();
  }
  if (warrior || ['shield', 'oathShield', 'buckler', 'ironShield'].includes(shield)) {
    const px = sx - 17 * facing;
    path(
      ctx,
      [
        [px - 12, y - 35],
        [px + 12, y - 35],
        [px + 11, y - 14],
        [px, y - 5],
        [px - 11, y - 14],
      ],
      shield === 'oathShield' ? '#507788' : '#835d3f',
      '#dfba77',
      2,
    );
    path(
      ctx,
      [
        [px - 7, y - 30],
        [px + 7, y - 30],
        [px + 6, y - 17],
        [px, y - 11],
        [px - 6, y - 17],
      ],
      '#4c4541',
    );
    ellipse(ctx, px, y - 22, 4, 4, '#e4c68a');
    if (c.specialisation === 'paladin') {
      ctx.fillStyle = '#ffe2a1';
      ctx.fillRect(px - 1, y - 30, 2, 18);
      ctx.fillRect(px - 5, y - 26, 10, 2);
      glow(ctx, px, y - 22, 24, '#f5cf80', 0.2);
    }
  }
  if (mage || ['wardStaff', 'stormRod', 'ashStaff'].includes(gear)) {
    const px = sx + 16,
      py = y - 55,
      color =
        c.specialisation === 'necromancer'
          ? '#b19be9'
          : c.specialisation === 'healer'
            ? '#fff0b5'
            : gear === 'stormRod'
              ? '#99dfff'
              : '#83e3df';
    ctx.fillStyle = '#bd9564';
    ctx.fillRect(px - 1, py + 6, 3, 50);
    glow(ctx, px, py, 38, color, 0.4);
    path(
      ctx,
      [
        [px, py - 10],
        [px + 7, py],
        [px, py + 10],
        [px - 7, py],
      ],
      color,
      '#edf5e0',
      1,
    );
    sparks(ctx, px, py, time, color, 5, 17);
    if (c.specialisation === 'necromancer') {
      ellipse(ctx, px, py, 4, 5, '#271b3b');
      ellipse(ctx, px - 1.5, py - 1, 1, 1, '#f9d6ff');
      ellipse(ctx, px + 1.5, py - 1, 1, 1, '#f9d6ff');
    }
  }
  if (c.type === 'scout' || ['moonBow', 'huntingBow'].includes(gear)) {
    const px = sx + 17;
    ctx.strokeStyle = gear === 'moonBow' ? '#bce8fa' : '#d6aa75';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px, y - 45);
    ctx.quadraticCurveTo(px + 18, y - 26, px, y - 7);
    ctx.stroke();
    ctx.strokeStyle = '#e3d6b9';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(px, y - 45);
    ctx.lineTo(px, y - 7);
    ctx.stroke();
    ctx.strokeStyle = '#b89261';
    ctx.beginPath();
    ctx.moveTo(sx - 5, y - 38);
    ctx.lineTo(sx + 11, y - 16);
    ctx.stroke();
    if (gear === 'moonBow') glow(ctx, px, y - 26, 26, '#a7dcec', 0.24);
  }
  if (['frostCloak', 'stoneMail', 'ironHeart'].includes(body)) {
    ctx.strokeStyle = body === 'frostCloak' ? '#c9eafa' : '#dcc69b';
    ctx.lineWidth = 2;
    ctx.strokeRect(sx - 8, y - 33, 16, 18);
  }
  if (
    ['riverCharm', 'rootCrown', 'phoenixPin', 'echoLens', 'threadRing', 'starCompass'].includes(
      c.equipmentSlots?.head?.id || c.equipmentSlots?.accessory?.id || c.gear,
    )
  ) {
    ellipse(ctx, sx, y - 29, 3, 3, '#e8d8a7');
    glow(ctx, sx, y - 29, 20, '#9fd7cf', 0.25);
  }
  if (feet === 'mistBoots') {
    for (let i = 0; i < 4; i++)
      ellipse(ctx, sx - 12 + i * 8, y + 1 + Math.sin(time + i) * 2, 7, 2, '#8ad7e62a');
  }
  ctx.restore();
}
export function paintSpell(ctx, camera, from, to, time, kind = 'mage') {
  const color =
      kind === 'necromancer'
        ? '#b392f0'
        : kind === 'healer'
          ? '#ffe7a8'
          : kind === 'mage'
            ? '#8dedf6'
            : '#f4dab0',
    a = { x: from.x - camera, y: from.y - 35 },
    b = { x: to.x - camera, y: to.y - 35 };
  ctx.save();
  if (['mage', 'healer', 'necromancer'].includes(kind)) {
    glow(ctx, a.x, a.y, 28, color, 0.3);
    ctx.strokeStyle = color + '77';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo((a.x + b.x) / 2, a.y - 30, b.x, b.y);
    ctx.stroke();
    for (let i = 0; i < 4; i++) {
      const p = (time * 0.7 + i * 0.25) % 1,
        x = a.x + (b.x - a.x) * p,
        y = a.y + (b.y - a.y) * p - Math.sin(p * Math.PI) * 25;
      glow(ctx, x, y, 9, color, 0.7);
      ellipse(ctx, x, y, 2.5, 2.5, '#f1ffff');
    }
    sparks(ctx, b.x, b.y, time, color, 7, 20);
  } else {
    const phase = (time * 1.6) % 1;
    if (phase < 0.55) {
      ctx.globalAlpha = Math.sin((phase / 0.55) * Math.PI);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(a.x, a.y, 40, -1.2, 1.3);
      ctx.stroke();
      sparks(ctx, b.x, b.y, time, color, 5, 15);
    }
  }
  ctx.restore();
}
export function paintResidentPrison(ctx, camera, d, time) {
  const x = d.x - camera,
    y = d.y;
  ctx.save();
  ctx.lineWidth = 1.5;
  if (d.id === 'bryn') {
    ctx.save();
    ctx.translate(x - 24, y - 28);
    ctx.rotate(-0.28);
    path(
      ctx,
      [
        [-12, -41],
        [20, -41],
        [20, 29],
        [-12, 29],
      ],
      '#715b49',
      '#bb9970',
    );
    ctx.fillStyle = '#cdb48a';
    ctx.fillRect(8, -1, 9, 3);
    ctx.restore();
  } else if (d.id === 'nell') {
    ctx.strokeStyle = '#d4cdb0';
    ctx.beginPath();
    ctx.moveTo(x - 24, y - 60);
    ctx.lineTo(x + 21, y - 60);
    ctx.lineTo(x + 21, y - 5);
    ctx.lineTo(x - 24, y - 5);
    ctx.lineTo(x - 24, y - 45);
    ctx.lineTo(x + 10, y - 45);
    ctx.stroke();
  } else if (/root/i.test(d.condition)) {
    ctx.strokeStyle = '#91b489';
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(x + side * 22, y);
      ctx.bezierCurveTo(x - side * 13, y - 20, x + side * 35, y - 35, x + side * 12, y - 73);
      ctx.stroke();
    }
  } else if (/mirror|reflected/i.test(d.condition)) {
    path(
      ctx,
      [
        [x - 24, y],
        [x - 24, y - 74],
        [x + 24, y - 74],
        [x + 24, y],
      ],
      '#8cbbd22a',
      '#99b9c8',
    );
  } else if (/snow|cooling/i.test(d.condition)) {
    path(
      ctx,
      [
        [x - 24, y],
        [x - 27, y - 44],
        [x - 15, y - 76],
        [x + 16, y - 71],
        [x + 26, y - 37],
        [x + 22, y],
      ],
      '#96d4e72b',
      '#b6d5dd',
    );
  } else {
    ctx.strokeStyle = '#a9d5c9';
    ctx.beginPath();
    ctx.ellipse(x, y - 32, 21, 34, 0, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 5; i++) {
      const a = (i * Math.PI * 2) / 5;
      ellipse(ctx, x + Math.cos(a) * 22, y - 32 + Math.sin(a) * 34, 1.5, 1.5, '#d3e9d3');
    }
  }
  glow(ctx, x, y - 30, 36, '#a7dbd6', 0.2);
  ctx.restore();
}
export function paintCreature(ctx, camera, x, y, shape, color, time, id = '') {
  const bob = Math.sin(time * 1.7) * 2,
    sx = x - camera;
  ctx.save();
  ctx.translate(sx, y + bob);
  ellipse(ctx, 0, 3, 45, 8, '#09091488');
  const spectral = ['ghost', 'wraith', 'moth'].includes(shape),
    accent = spectral
      ? '#ae86ec'
      : id === 'sporebeast'
        ? '#97dc92'
        : id === 'riftkeeper'
          ? '#78cddd'
          : '#dc718d';
  glow(ctx, 0, -35, 85, accent, 0.18);
  ctx.lineJoin = 'round';
  if (['ghost', 'wraith'].includes(shape)) {
    ctx.globalAlpha = 0.88;
    path(
      ctx,
      [
        [-9, -86],
        [-27, -70],
        [-32, -40],
        [-44, -8],
        [-14, -17],
        [0, 0],
        [14, -17],
        [44, -8],
        [30, -43],
        [24, -71],
        [9, -86],
      ],
      shape === 'wraith' ? '#211c32' : '#26374b',
      shape === 'wraith' ? '#9674b7' : '#9fc4d3',
    );
    path(
      ctx,
      [
        [-16, -69],
        [0, -80],
        [16, -69],
        [12, -46],
        [0, -37],
        [-12, -46],
      ],
      '#111220',
    );
    path(
      ctx,
      [
        [-11, -60],
        [-3, -57],
        [-9, -53],
      ],
      '#dbe9ff',
    );
    path(
      ctx,
      [
        [11, -60],
        [3, -57],
        [9, -53],
      ],
      '#dbe9ff',
    );
    ctx.strokeStyle = '#cbb6e8';
    ctx.lineWidth = 2;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(side * 19, -49);
      ctx.lineTo(side * 43, -30);
      ctx.lineTo(side * 51, -18);
      ctx.stroke();
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(side * 49, -22);
        ctx.lineTo(side * (54 + i * 3), -17 + i * 3);
        ctx.stroke();
      }
    }
    sparks(ctx, 0, -45, time, '#b49edb', 12, 65);
    if (shape === 'wraith') {
      path(
        ctx,
        [
          [-18, -79],
          [-30, -101],
          [-19, -91],
          [-12, -107],
          [-6, -89],
        ],
        '#b3a5ba',
      );
      path(
        ctx,
        [
          [18, -79],
          [30, -101],
          [19, -91],
          [12, -107],
          [6, -89],
        ],
        '#b3a5ba',
      );
      ctx.strokeStyle = '#ac9bbb';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(44, -9);
      ctx.lineTo(50, -97);
      ctx.stroke();
      path(
        ctx,
        [
          [50, -99],
          [73, -84],
          [76, -62],
          [63, -77],
          [48, -85],
        ],
        '#c7ced2',
        '#686275',
      );
      path(
        ctx,
        [
          [-7, -39],
          [7, -39],
          [13, -22],
          [-13, -22],
        ],
        '#796888',
        '#cebdd9',
      );
      ellipse(ctx, 0, -19, 2, 4, '#e8d7bf');
    }
  } else if (shape === 'spider') {
    ctx.strokeStyle = '#49334d';
    ctx.lineWidth = 6;
    for (const side of [-1, 1])
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(side * 13, -31);
        ctx.lineTo(side * (28 + i * 8), -55 + i * 10);
        ctx.lineTo(side * (45 + i * 9), -5);
        ctx.stroke();
      }
    ellipse(ctx, 0, -43, 23, 23, '#38283f');
    ellipse(ctx, 0, -24, 15, 13, '#695067');
    for (let i = 0; i < 4; i++) ellipse(ctx, -9 + i * 6, -29, 2, 3, '#fa9b91');
    path(
      ctx,
      [
        [-7, -17],
        [-3, -6],
        [0, -16],
      ],
      '#e0c6b8',
    );
    path(
      ctx,
      [
        [7, -17],
        [3, -6],
        [0, -16],
      ],
      '#e0c6b8',
    );
  } else if (shape === 'mimic') {
    path(
      ctx,
      [
        [-37, -42],
        [36, -42],
        [31, 0],
        [-31, 0],
      ],
      '#63483b',
      '#b59a68',
    );
    path(
      ctx,
      [
        [-38, -42],
        [-32, -66],
        [27, -71],
        [39, -45],
      ],
      '#856349',
      '#c6a269',
    );
    path(
      ctx,
      [
        [-32, -46],
        [32, -48],
        [28, -21],
        [-28, -21],
      ],
      '#160e22',
    );
    for (let i = 0; i < 8; i++)
      path(
        ctx,
        [
          [-27 + i * 7, -47],
          [-24 + i * 7, -32],
          [-21 + i * 7, -47],
        ],
        '#efe3c9',
      );
    path(
      ctx,
      [
        [-15, -20],
        [0, -43],
        [15, -20],
      ],
      '#dbb1b3',
    );
    ellipse(ctx, -16, -59, 4, 3, '#edbe72');
    ellipse(ctx, 16, -59, 4, 3, '#edbe72');
  } else if (['armour', 'golem'].includes(shape)) {
    const base = id === 'boundfiend' ? '#463044' : id === 'riftkeeper' ? '#315360' : '#4c515b';
    path(
      ctx,
      [
        [-22, -63],
        [22, -63],
        [30, -25],
        [17, -13],
        [-17, -13],
        [-30, -25],
      ],
      base,
      '#879394',
      2,
    );
    path(
      ctx,
      [
        [-15, -88],
        [15, -88],
        [19, -67],
        [-19, -67],
      ],
      '#292d3d',
      '#84918f',
    );
    ctx.fillStyle = accent;
    ctx.fillRect(-10, -76, 20, 3);
    glow(ctx, 0, -74, 18, accent, 0.5);
    for (const side of [-1, 1]) {
      path(
        ctx,
        [
          [side * 22, -60],
          [side * 37, -52],
          [side * 39, -20],
          [side * 29, -17],
        ],
        base,
        '#727783',
      );
      path(
        ctx,
        [
          [side * 5, -17],
          [side * 20, -17],
          [side * 24, 2],
          [side * 3, 2],
        ],
        base,
        '#727783',
      );
    }
    if (id === 'boundfiend') {
      path(
        ctx,
        [
          [-14, -84],
          [-29, -108],
          [-25, -72],
        ],
        '#c1a7a0',
      );
      path(
        ctx,
        [
          [14, -84],
          [29, -108],
          [25, -72],
        ],
        '#c1a7a0',
      );
    }
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-13, -53);
    ctx.lineTo(4, -41);
    ctx.lineTo(-4, -24);
    ctx.stroke();
  } else if (['hound', 'dragon'].includes(shape)) {
    const dragon = shape === 'dragon';
    if (dragon) {
      path(
        ctx,
        [
          [-6, -37],
          [-63, -101],
          [-58, -43],
          [-35, -56],
          [-14, -25],
        ],
        '#472738',
        '#ad6b76',
      );
      path(
        ctx,
        [
          [13, -40],
          [42, -101],
          [76, -34],
          [38, -50],
          [18, -22],
        ],
        '#603242',
        '#b5757f',
      );
    }
    ellipse(ctx, 0, -29, dragon ? 47 : 34, 20, dragon ? '#63313b' : '#3d3446');
    path(
      ctx,
      [
        [22, -43],
        [45, -58],
        [61, -45],
        [47, -32],
        [27, -29],
      ],
      dragon ? '#925348' : '#5d4655',
      '#bf8b77',
    );
    path(
      ctx,
      [
        [30, -52],
        [28, -70],
        [40, -59],
      ],
      '#c8b596',
    );
    ellipse(ctx, 44, -49, 3, 2, '#ffe68f');
    path(
      ctx,
      [
        [47, -36],
        [54, -38],
        [49, -28],
      ],
      '#e8d6b7',
    );
    for (const px of [-26, -10, 16, 29]) {
      path(
        ctx,
        [
          [px, -19],
          [px + 8, -19],
          [px + 6, 0],
          [px - 6, 0],
        ],
        '#49313d',
      );
      ctx.fillStyle = '#cbb7a4';
      ctx.fillRect(px - 6, -1, 14, 2);
    }
    ctx.strokeStyle = '#63313b';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(-27, -27);
    ctx.quadraticCurveTo(-55, -12, -72, -39);
    ctx.stroke();
    if (dragon) {
      for (let i = 0; i < 5; i++)
        path(
          ctx,
          [
            [-25 + i * 13, -43],
            [-20 + i * 13, -58],
            [-13 + i * 13, -43],
          ],
          '#c1947c',
        );
      glow(ctx, 58, -36, 22, '#e88f63', 0.3);
    }
    if (id === 'ratking') {
      ellipse(ctx, 31, -60, 9, 10, '#8c6779');
      ellipse(ctx, 32, -61, 5, 6, '#493342');
      path(
        ctx,
        [
          [28, -68],
          [25, -79],
          [33, -75],
          [38, -84],
          [43, -72],
          [50, -76],
          [46, -65],
        ],
        '#bb9a55',
        '#eed39b',
        1,
      );
      ctx.strokeStyle = '#b6a2ab';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(54, -43);
        ctx.lineTo(71, -50 + i * 7);
        ctx.stroke();
      }
    }
  } else if (shape === 'slime') {
    path(
      ctx,
      [
        [-42, 0],
        [-33, -40],
        [-20, -55],
        [0, -47],
        [18, -61],
        [33, -31],
        [46, 0],
      ],
      '#345f48',
      '#8dba85',
    );
    for (let i = 0; i < 5; i++) {
      const px = -30 + i * 15;
      ellipse(ctx, px, -48 + Math.sin(i) * 10, 10, 5, i % 2 ? '#bf97d4' : '#b9d8a2');
      ctx.fillStyle = '#b9d8a2';
      ctx.fillRect(px - 2, -45 + Math.sin(i) * 10, 4, 15);
    }
    ellipse(ctx, -8, -26, 3, 4, '#d6edaa');
    ellipse(ctx, 8, -26, 3, 4, '#d6edaa');
  } else if (shape === 'moth') {
    for (let i = 0; i < 5; i++) {
      ctx.save();
      ctx.translate(Math.sin(time * 0.8 + i) * 40, -44 + Math.cos(time + i) * 26);
      const flap = 0.5 + Math.abs(Math.sin(time * 5 + i)) * 0.5;
      ctx.scale(flap, 1);
      path(
        ctx,
        [
          [0, 0],
          [-24, -22],
          [-26, 5],
          [-9, 13],
        ],
        '#443454',
        '#b293c5',
      );
      path(
        ctx,
        [
          [0, 0],
          [24, -22],
          [26, 5],
          [9, 13],
        ],
        '#443454',
        '#b293c5',
      );
      ellipse(ctx, 0, 0, 3, 10, '#c5b1e0');
      ctx.restore();
    }
    sparks(ctx, 0, -45, time, '#b3dbed', 14, 65);
  } else {
    ellipse(ctx, 0, -26, 25, 25, color);
    sparks(ctx, 0, -26, time, accent, 8, 45);
  }
  ctx.restore();
}

const themes = [
  [/archive|library|study/i, 'scholar', '#aa85c9'],
  [/green|root|herb|seed|garden/i, 'garden', '#89b998'],
  [/forge|cinder|kiln|fire|furnace/i, 'forge', '#e2a76c'],
  [/observatory|star|sky|beacon|dawn/i, 'stars', '#93bedb'],
  [/tide|salt|diving|pearl|coral|deep|pump/i, 'water', '#78bdbf'],
  [/clock|brass|automaton|timekeeper/i, 'clock', '#c9b17c'],
  [/frost|mountain|snow|bell hospital/i, 'frost', '#b2d8e6'],
  [/quarters|guesthouse|infirmary|hospice/i, 'rest', '#d2a07c'],
  [/store|service/i, 'workshop', '#c5a172'],
];
export function roomTheme(name) {
  if (/mirror/i.test(name)) return ['mirror', '#abcbd9'];
  if (/chapel/i.test(name)) return ['chapel', '#d1bda0'];
  if (/council|court/i.test(name)) return ['council', '#a8b58c'];
  if (/baths/i.test(name)) return ['baths', '#bc9d89'];
  if (/frost|snow|mountain/i.test(name)) return ['frost', '#b2d8e6'];
  if (/coral|pearl|diving|tide|pump/i.test(name)) return ['water', '#78bdbf'];
  if (/cinder|ash|kiln/i.test(name)) return ['forge', '#e2a76c'];
  if (/timekeeper|automaton/i.test(name)) return ['clock', '#c9b17c'];
  return themes.find(([pattern]) => pattern.test(name))?.slice(1) || ['hearth', '#d9ad77'];
}
export function paintRoomIdentity(ctx, camera, x, w, name, restored, time) {
  if (!restored) return;
  const [theme, accent] = roomTheme(name),
    sx = x - camera,
    py = 380;
  ctx.save();
  glow(ctx, sx + w * 0.55, py - 80, w * 0.6, accent, 0.12);
  // A patterned runner, hanging banner and a signature furnishing for each room.
  ctx.fillStyle = accent + '44';
  ctx.fillRect(sx + 20, py - 1, w - 40, 5);
  ctx.fillStyle = accent + '18';
  ctx.fillRect(sx + 20, py + 5, w - 40, 8);
  const px = sx + w * 0.55;
  if (theme === 'scholar') {
    for (let shelf = 0; shelf < 2; shelf++) {
      ctx.fillStyle = '#493848';
      ctx.fillRect(px - 32 + shelf * 48, 290, 42, 82);
      for (let row = 0; row < 3; row++) {
        ctx.fillStyle = '#b68c61';
        ctx.fillRect(px - 33 + shelf * 48, 311 + row * 24, 44, 3);
        for (let book = 0; book < 5; book++) {
          ctx.fillStyle = ['#c79373', '#8ea888', '#ad91bb', '#d2bd89'][book % 4];
          ctx.fillRect(px - 28 + shelf * 48 + book * 7, 296 + row * 24, 5, 15);
        }
      }
    }
    ctx.save();
    ctx.translate(sx + 70, 332 + Math.sin(time) * 3);
    path(
      ctx,
      [
        [-20, -5],
        [0, 0],
        [20, -5],
        [20, 10],
        [0, 15],
        [-20, 10],
      ],
      '#e8d6b2',
      '#ba8e5a',
      1,
    );
    ctx.restore();
    sparks(ctx, sx + 70, 333, time, '#d6b4f0', 5, 23);
  } else if (theme === 'garden') {
    for (let i = 0; i < 4; i++) {
      const p = sx + 95 + i * 34;
      path(
        ctx,
        [
          [p - 9, 363],
          [p + 9, 363],
          [p + 6, 379],
          [p - 6, 379],
        ],
        '#a57553',
      );
      ctx.strokeStyle = '#80a477';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(p, 363);
      ctx.quadraticCurveTo(p - 9, 342, p + Math.sin(time + i) * 4, 325 - (i % 2) * 13);
      ctx.stroke();
      ellipse(ctx, p - 8, 344, 8, 3, '#86b184');
      ellipse(ctx, p + 7, 336, 7, 3, '#a3c29a');
      ellipse(ctx, p, 323 - (i % 2) * 13, 4, 4, i % 2 ? '#d7b0d7' : '#e4c17f');
    }
    sparks(ctx, px, 323, time, '#dbe7ab', 7, 45);
  } else if (theme === 'forge') {
    path(
      ctx,
      [
        [px - 35, 357],
        [px + 25, 357],
        [px + 35, 365],
        [px + 8, 370],
        [px + 6, 378],
        [px - 20, 378],
        [px - 17, 367],
      ],
      '#68737c',
      '#b4b0a1',
    );
    ctx.fillStyle = '#351e25';
    ctx.fillRect(sx + 35, 315, 42, 64);
    glow(ctx, sx + 56, 355, 55, '#f1a35a', 0.35);
    for (let i = 0; i < 4; i++)
      path(
        ctx,
        [
          [sx + 40 + i * 8, 376],
          [sx + 43 + i * 8, 354 + Math.sin(time * 4 + i) * 8],
          [sx + 48 + i * 8, 376],
        ],
        i % 2 ? '#efac5b' : '#f6d899',
      );
  } else if (theme === 'stars') {
    ctx.strokeStyle = '#a6b9ce';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(px, 326, 30, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(px, 326, 30, 12, time * 0.1, 0, Math.PI * 2);
    ctx.stroke();
    ellipse(ctx, px, 326, 5, 5, '#dfd7af');
    ctx.fillStyle = '#8f806b';
    ctx.fillRect(px - 2, 354, 4, 23);
    for (let i = 0; i < 5; i++) {
      const a = time * 0.18 + i * 1.25;
      ellipse(ctx, px + Math.cos(a) * 30, 326 + Math.sin(a) * 12, 3, 3, '#b9cfe9');
    }
    glow(ctx, px, 326, 50, '#a4d4f4', 0.2);
  } else if (theme === 'water') {
    path(
      ctx,
      [
        [px - 36, 340],
        [px + 36, 340],
        [px + 29, 376],
        [px - 29, 376],
      ],
      '#33585d',
      '#9cbac0',
    );
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = '#9bd7d988';
      ctx.beginPath();
      ctx.moveTo(px - 29, 349 + i * 6);
      ctx.quadraticCurveTo(px, 346 + i * 6 + Math.sin(time + i) * 3, px + 29, 349 + i * 6);
      ctx.stroke();
    }
    for (let i = 0; i < 3; i++)
      ellipse(ctx, px + i * 13 - 15, 324 - ((time * 8 + i * 12) % 40), 2, 2, '#a8e4ed88');
  } else if (theme === 'clock') {
    ctx.fillStyle = '#56473f';
    ctx.fillRect(px - 20, 300, 40, 77);
    ellipse(ctx, px, 319, 15, 15, '#e1ca91');
    ctx.strokeStyle = '#514538';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(px, 319);
    ctx.lineTo(px + 9 * Math.cos(time * 0.2), 319 + 9 * Math.sin(time * 0.2));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(px, 319);
    ctx.lineTo(px, 308);
    ctx.stroke();
    ellipse(ctx, px + Math.sin(time) * 5, 355, 6, 6, '#c5aa76');
  } else if (theme === 'frost') {
    path(
      ctx,
      [
        [px - 12, 374],
        [px - 25, 327],
        [px - 9, 333],
        [px, 296],
        [px + 13, 330],
        [px + 23, 339],
        [px + 13, 374],
      ],
      '#7398b288',
      '#c2eaf1',
    );
    glow(ctx, px, 338, 50, '#b5dcf3', 0.2);
    sparks(ctx, px, 328, time, '#d1f2f4', 6, 40);
  } else if (theme === 'rest') {
    ctx.fillStyle = '#ae806d';
    ctx.fillRect(sx + 30, 350, 80, 30);
    ctx.fillStyle = '#e3c8a0';
    ctx.fillRect(sx + 33, 346, 74, 8);
    ctx.fillStyle = '#fff0cc';
    ctx.fillRect(sx + 35, 343, 18, 9);
    ctx.fillStyle = '#927b9d';
    ctx.fillRect(sx + 60, 348, 46, 16);
    ctx.fillStyle = '#b69a70';
    ctx.fillRect(sx + 29, 342, 4, 40);
    ellipse(ctx, px + 30, 350, 12, 12, '#b48758');
  } else if (theme === 'workshop') {
    ctx.fillStyle = '#967448';
    ctx.fillRect(px - 45, 350, 90, 9);
    ctx.fillRect(px - 41, 359, 5, 20);
    ctx.fillRect(px + 35, 359, 5, 20);
    ctx.strokeStyle = '#c4ccd0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(px - 23, 345);
    ctx.lineTo(px - 5, 321);
    ctx.stroke();
    path(
      ctx,
      [
        [px + 12, 321],
        [px + 35, 321],
        [px + 32, 342],
        [px + 23, 350],
        [px + 14, 342],
      ],
      '#747b6f',
      '#cfb476',
    );
  } else {
    glow(ctx, sx + 60, 362, 75, '#efaa60', 0.18 + Math.sin(time * 2) * 0.025);
    for (let i = 0; i < 5; i++) {
      const sy = 374 - ((time * 9 + i * 11) % 45);
      ellipse(ctx, sx + 58 + Math.sin(time + i) * 11, sy, 1, 1, '#e9ba79aa');
    }
  }
  ctx.restore();
}
