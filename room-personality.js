import { roomTheme, glow } from './graphics-engine.js';
// Architectural silhouettes and evidence of daily life, not repeated window grids.
export function paintInterior(ctx, camera, x, w, name, restored, time = 0) {
  const sx = x - camera,
    base = 392,
    top = 205,
    [theme, accent] = roomTheme(name);
  const rect = (px, py, pw, ph, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(sx + px, py, pw, ph);
  };
  const line = (points, color, width = 2) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.beginPath();
    points.forEach(([px, py], i) => (i ? ctx.lineTo(sx + px, py) : ctx.moveTo(sx + px, py)));
    ctx.stroke();
  };
  const oval = (px, py, rx, ry, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(sx + px, py, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  };
  const arch = (px, py, pw, ph, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(sx + px, py + ph);
    ctx.lineTo(sx + px, py + pw / 2);
    ctx.arc(sx + px + pw / 2, py + pw / 2, pw / 2, Math.PI, 0);
    ctx.lineTo(sx + px + pw, py + ph);
    ctx.closePath();
    ctx.fill();
  };
  ctx.save();
  const colors = {
    hearth: ['#473a33', '#806249'],
    rest: ['#4b383c', '#70504c'],
    scholar: ['#282633', '#48415a'],
    garden: ['#17352d', '#365848'],
    forge: ['#292b30', '#5b3b31'],
    stars: ['#111e35', '#263950'],
    water: ['#16323d', '#32525d'],
    clock: ['#343129', '#58503d'],
    frost: ['#263f50', '#476778'],
    workshop: ['#363029', '#635344'],
    mirror: ['#24303d', '#4c6672'],
    chapel: ['#393438', '#6b5c58'],
    council: ['#303c35', '#596754'],
    baths: ['#344042', '#615752'],
  }[theme];
  const wall = ctx.createLinearGradient(0, top, 0, base);
  wall.addColorStop(0, restored ? colors[1] : '#34343b');
  wall.addColorStop(1, restored ? colors[0] : '#232830');
  ctx.fillStyle = wall;
  ctx.fillRect(sx, top, w, base - top);
  rect(0, base, w, 17, '#242526');
  rect(0, base, w, 4, accent + '77');
  if (!restored) {
    for (let i = 0; i < 8; i++)
      rect(20 + (i * (w - 40)) / 8, base - 8 - (i % 3) * 5, 15 + (i % 2) * 8, 10, '#746d64');
    line(
      [
        [w * 0.7, 222],
        [w * 0.64, 259],
        [w * 0.69, 281],
        [w * 0.61, 307],
      ],
      '#151c26',
    );
    ctx.restore();
    return;
  }
  if (theme === 'mirror') {
    for (let i = 0; i < 3; i++) {
      const px = 16 + (i * (w - 30)) / 3;
      arch(px, 223, (w - 50) / 3, 141, '#a9bbc7');
      arch(px + 4, 228, (w - 50) / 3 - 8, 132, '#2b485b');
      line(
        [
          [px + 6, 262],
          [px + 30, 286],
          [px + 12, 334],
        ],
        '#afd3e077',
        1,
      );
    }
    glow(ctx, sx + w / 2, 300, 90, '#b0d7e3', 0.14);
  } else if (theme === 'chapel') {
    arch(w / 2 - 24, 220, 48, 108, '#9a8cba55');
    line(
      [
        [w / 2, 223],
        [w / 2, 329],
      ],
      '#d6c5a9',
      1,
    );
    rect(w / 2 - 38, 348, 76, 25, '#847d77');
    rect(w / 2 - 42, 343, 84, 7, '#c2b4a0');
    for (const px of [w / 2 - 26, w / 2 + 26]) {
      rect(px, 328, 3, 15, '#d8c5a1');
      oval(px + 1, 324, 2, 4, '#eed8a6');
      glow(ctx, sx + px, 324, 28, '#e4bd86', 0.2);
    }
    for (let i = 0; i < 3; i++) rect(18 + i * 31, 375, 23, 6, '#8a7662');
  } else if (theme === 'council') {
    oval(w / 2, 349, w * 0.32, 14, '#ad8d5e');
    rect(w / 2 - w * 0.3, 350, w * 0.6, 12, '#927147');
    rect(w / 2 - 40, 361, 5, 28, '#634e38');
    rect(w / 2 + 35, 361, 5, 28, '#634e38');
    for (let i = 0; i < 5; i++) {
      const px = w * 0.2 + i * w * 0.15;
      rect(px - 8, 328, 16, 7, '#d8c9a8');
      rect(px - 12, 372, 24, 6, '#7d6750');
    }
    rect(w / 2 - 17, 238, 34, 39, '#857e5c');
    line(
      [
        [w / 2 - 9, 248],
        [w / 2, 263],
        [w / 2 + 9, 248],
      ],
      '#d4cdad',
      2,
    );
  } else if (theme === 'baths') {
    for (let y = 223; y < 390; y += 20)
      for (let p = 8; p < w; p += 25) rect(p, y, 23, 17, '#86938c15');
    oval(w / 2, 364, w * 0.32, 18, '#ae8975');
    oval(w / 2, 356, w * 0.32, 15, '#d1b59c');
    oval(w / 2, 355, w * 0.28, 11, '#729c9f');
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = '#d4e1d333';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(sx + w * 0.3 + i * 22, 335);
      ctx.bezierCurveTo(
        sx + w * 0.3 + i * 22 - 10,
        315,
        sx + w * 0.3 + i * 22 + 10,
        310,
        sx + w * 0.3 + i * 22,
        291 + Math.sin(time + i) * 4,
      );
      ctx.stroke();
    }
    line(
      [
        [20, 224],
        [20, 313],
        [45, 313],
      ],
      '#c19b77',
      4,
    );
  } else if (/RETURNED LANDING/i.test(name)) {
    // A rain-facing travel porch: the missing resident's chair stays empty.
    arch(16, 218, w - 32, 160, '#274d59');
    for (let i = 0; i < 14; i++) {
      const px = 25 + (i * (w - 50)) / 14,
        py = 240 + ((time * 18 + i * 17) % 115);
      line(
        [
          [px, py],
          [px - 3, py + 10],
        ],
        '#a3c6cc55',
        1,
      );
    }
    rect(13, 375, w - 26, 8, '#a08b69');
    rect(w * 0.56, 325, 5, 58, '#b99c72');
    rect(w * 0.56, 351, 31, 5, '#b99c72');
    rect(w * 0.56 + 26, 356, 4, 28, '#8a7153');
    rect(w * 0.56 + 2, 324, 24, 22, '#9c8263');
    oval(43, 358, 17, 14, '#8e7457');
    rect(28, 343, 31, 6, '#aa926f');
    rect(33, 369, 4, 15, '#8e7457');
  } else if (/CORRIDOR/i.test(name)) {
    // A narrow circulation space, with exposed shoring and a battered delivery cart.
    for (let p = 18; p < w; p += 65) {
      rect(p, 214, 8, 178, '#8b7658');
      line(
        [
          [p + 4, 221],
          [p + 33, 247],
        ],
        '#a18b65',
        5,
      );
    }
    rect(0, 214, w, 9, '#8b7658');
    arch(w - 62, 255, 47, 132, '#172832');
    rect(24, 354, 48, 20, '#886444');
    oval(32, 378, 6, 6, '#343d3e');
    oval(66, 378, 6, 6, '#343d3e');
    rect(31, 347, 28, 9, '#b19570');
  } else if (theme === 'hearth') {
    // A stone chimney, family-sized hearth, unequal chairs and a raincoat by the door.
    rect(18, 218, 71, 174, '#77705e');
    for (let i = 0; i < 8; i++)
      line(
        [
          [18, 226 + i * 21],
          [89, 226 + i * 21],
        ],
        '#4c4a42',
        1,
      );
    arch(29, 318, 49, 73, '#17202a');
    glow(ctx, sx + 55, 367, 85, '#f3b16b', 0.26);
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = i % 2 ? '#f6d49a' : '#da934e';
      ctx.beginPath();
      ctx.moveTo(sx + 33 + i * 10, 387);
      ctx.quadraticCurveTo(
        sx + 42 + i * 10,
        351 + Math.sin(time * 3 + i) * 6,
        sx + 47 + i * 10,
        387,
      );
      ctx.fill();
    }
    rect(11, 312, 85, 8, '#b79c71');
    oval(43, 300, 5, 7, '#b1c2ae');
    rect(69, 292, 13, 17, '#bfa677');
    oval(w * 0.64, 386, 43, 5, '#7d5b5266');
    rect(w * 0.55, 350, 60, 7, '#a28056');
    rect(w * 0.56, 357, 5, 31, '#76573e');
    rect(w * 0.55 + 52, 357, 5, 31, '#76573e');
    rect(w - 31, 273, 4, 64, '#9d7955');
    rect(w - 43, 283, 29, 42, '#84937c');
    line(
      [
        [w - 43, 287],
        [w - 34, 297],
        [w - 29, 329],
      ],
      '#aec0a0',
      1,
    );
    arch(w * 0.47, 242, 44, 58, '#243c47');
    line(
      [
        [w * 0.47 + 22, 245],
        [w * 0.47 + 22, 300],
      ],
      '#b59e78',
    );
  } else if (theme === 'rest') {
    // Curtains, patchwork textiles, hanging laundry and private bedside possessions.
    rect(0, 205, w, 14, '#624d43');
    for (let p = 20; p < w; p += 60)
      line(
        [
          [p, 214],
          [p + 16, 246],
        ],
        '#3b3030',
        3,
      );
    arch(w * 0.58, 240, 48, 66, '#30414c');
    rect(w * 0.58 - 7, 238, 13, 73, '#b88672');
    rect(w * 0.58 + 44, 238, 13, 73, '#b88672');
    for (let i = 0; i < 2; i++) {
      const bx = 14 + i * (w * 0.42);
      rect(bx, 358, 68, 27, '#6b4f3b');
      rect(bx + 3, 353, 62, 12, i ? '#95a39c' : '#bea084');
      rect(bx + 8, 350, 16, 9, '#e5d8b6');
      for (let j = 0; j < 4; j++)
        rect(bx + 27 + j * 9, 360, 8, 15, ['#856a82', '#ac9878', '#759295', '#c1a378'][j]);
      rect(bx - 2, 346, 4, 42, '#b99366');
    }
    line(
      [
        [15, 268],
        [w - 14, 273],
      ],
      '#c2ae8f',
      1,
    );
    rect(37, 272, 13, 19, '#b9b9ac');
    rect(55, 273, 11, 15, '#899998');
    oval(w - 22, 366, 9, 4, '#72543d');
    rect(w - 29, 371, 14, 12, '#4e3937');
  } else if (theme === 'scholar') {
    // No domestic windows: built-in shelving and an arched clerestory.
    for (let p = 14; p < w - 55; p += 55) {
      rect(p, 238, 45, 114, '#584138');
      for (let row = 0; row < 4; row++) {
        rect(p, 261 + row * 26, 45, 3, '#b58b5c');
        for (let j = 0; j < 6; j++)
          rect(
            p + 4 + j * 6,
            245 + row * 26,
            4,
            13 + (j % 3) * 2,
            ['#a48664', '#727f82', '#937792', '#ada87b'][j % 4],
          );
      }
    }
    arch(w - 62, 232, 40, 52, '#708fa166');
    line(
      [
        [w - 42, 234],
        [w - 42, 284],
      ],
      '#bdaf87',
    );
    rect(22, 371, 27, 14, '#b59774');
    rect(24, 366, 23, 5, '#e2d6b5');
    oval(w - 23, 361, 8, 13, '#93816b');
  } else if (theme === 'garden') {
    // Curved greenhouse ribs, earth beds, hanging baskets and roots in the floor.
    for (let p = 16; p < w; p += 51) {
      arch(p, 215, 40, 130, '#75948835');
      line(
        [
          [p + 20, 216],
          [p + 20, 345],
        ],
        '#c0be9766',
      );
    }
    line(
      [
        [10, 226],
        [w - 10, 226],
      ],
      '#8b9570',
      3,
    );
    for (let i = 0; i < 3; i++) {
      const px = 34 + (i * (w - 68)) / 3;
      line(
        [
          [px, 228],
          [px, 267],
        ],
        '#bcac85',
        1,
      );
      oval(px, 274, 13, 7, '#9b7656');
      for (let j = 0; j < 5; j++)
        line(
          [
            [px, 269],
            [px + Math.sin(j * 2) * 15, 285 + j * 6],
          ],
          '#8bb183',
          2,
        );
    }
    rect(17, 373, w - 34, 15, '#71533c');
    for (let i = 0; i < 6; i++)
      line(
        [
          [25 + (i * w) / 7, 384],
          [33 + (i * w) / 7, 375],
          [29 + (i * w) / 7, 362],
        ],
        '#a7b784',
        1,
      );
    oval(w - 23, 350, 11, 13, '#99734e');
  } else if (theme === 'forge') {
    // Soot-black brick, a heavy chimney, copper piping and hanging tools.
    for (let y = 216; y < 380; y += 19)
      for (let p = 8; p < w; p += 38) rect(p + (y % 38 ? 15 : 0), y, 31, 15, '#513b3833');
    rect(23, 210, 48, 104, '#343239');
    arch(12, 303, 69, 87, '#101b24');
    glow(ctx, sx + 47, 356, 80, '#e5a066', 0.25);
    rect(13, 379, 67, 10, '#bd9271');
    line(
      [
        [w - 28, 219],
        [w - 28, 267],
        [w - 72, 267],
        [w - 72, 315],
      ],
      '#b38a63',
      5,
    );
    line(
      [
        [100, 244],
        [w - 36, 244],
      ],
      '#9b8d77',
      3,
    );
    for (let i = 0; i < 3; i++) {
      const px = 112 + i * 33;
      line(
        [
          [px, 248],
          [px, 278],
        ],
        '#aab0ac',
        3,
      );
      rect(px - 7, 273, 14, 6, '#727c81');
    }
    rect(w - 39, 365, 21, 24, '#55423b');
    oval(w - 29, 365, 11, 3, '#aa9277');
  } else if (theme === 'stars') {
    // A dome with a starfield and circular brass ribs rather than square windows.
    arch(12, 209, w - 24, 167, '#152640');
    ctx.save();
    ctx.beginPath();
    ctx.rect(sx + 12, 220, w - 24, 150);
    ctx.clip();
    for (let i = 0; i < 28; i++)
      oval(
        20 + ((i * 41) % (w - 40)),
        222 + ((i * 29) % 121),
        i % 5 === 0 ? 1.8 : 1,
        0.9,
        '#c6d8e2',
      );
    ctx.restore();
    ctx.strokeStyle = '#889cbd66';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(sx + w / 2, 330, w * 0.4, 85, 0, Math.PI, 0);
    ctx.stroke();
    line(
      [
        [w / 2, 220],
        [w / 2, 370],
      ],
      '#7d91b266',
      1,
    );
    rect(10, 375, w - 20, 9, '#59616f');
  } else if (theme === 'water') {
    // An aqueduct arch, tide marks, rope coils and blue reflections.
    arch(w * 0.3, 218, w * 0.43, 144, '#163647');
    arch(w * 0.34, 229, w * 0.35, 132, '#315b64');
    for (let i = 0; i < 6; i++)
      line(
        [
          [w * 0.35, 290 + i * 11],
          [w * 0.64, 288 + i * 11 + Math.sin(time + i) * 2],
        ],
        '#7eb5c455',
        1,
      );
    for (let i = 0; i < 3; i++)
      line(
        [
          [10, 333 + i * 14],
          [w - 10, 333 + i * 14],
        ],
        '#a2bfaf22',
        1,
      );
    rect(14, 357, 42, 28, '#65735f');
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = '#bcab7f';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(sx + 35, 355 - i * 4, 14, 4, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    rect(w - 30, 296, 5, 75, '#bfa87e');
  } else if (theme === 'clock') {
    // Gears set into plaster, a pendulum recess and brass wall conduits.
    rect(0, 212, w, 7, '#9c8762');
    for (let i = 0; i < 4; i++) {
      const px = 33 + (i * (w - 55)) / 4;
      oval(px, 273, 19 - (i % 2) * 5, 19 - (i % 2) * 5, '#91764f');
      oval(px, 273, 10, 10, '#363333');
      for (let j = 0; j < 8; j++) {
        const a = (j * Math.PI) / 4 + time * 0.08;
        line(
          [
            [px + Math.cos(a) * 10, 273 + Math.sin(a) * 10],
            [px + Math.cos(a) * 21, 273 + Math.sin(a) * 21],
          ],
          '#bca374',
          3,
        );
      }
    }
    arch(w - 52, 308, 33, 70, '#262e31');
    line(
      [
        [w - 36, 315],
        [w - 36 + Math.sin(time) * 8, 364],
      ],
      '#c9b277',
    );
    oval(w - 36 + Math.sin(time) * 8, 364, 7, 7, '#c9b277');
  } else if (theme === 'frost') {
    // A snow-lit lancet, heavy wool and frost branching over stone.
    arch(w * 0.62, 223, 48, 96, '#91b3c044');
    for (let i = 0; i < 4; i++)
      line(
        [
          [w * 0.62 + 20, 235],
          [w * 0.62 + 9 + i * 9, 270 + i * 8],
        ],
        '#c6e7ee66',
        1,
      );
    rect(9, 376, w - 18, 9, '#59717d');
    for (let i = 0; i < 5; i++)
      line(
        [
          [18 + i * 43, 222],
          [22 + i * 43, 239],
          [17 + i * 43, 250],
        ],
        '#b3d6dc88',
        1,
      );
    rect(24, 333, 28, 42, '#8a9799');
    rect(20, 331, 37, 6, '#bdb9a7');
  } else {
    // A working room: pegboard, rough planks, boots and timber braces.
    rect(17, 236, w - 37, 71, '#776346');
    for (let i = 0; i < 8; i++) oval(25 + (i * (w - 55)) / 8, 248, 1, 1, '#3f3b32');
    line(
      [
        [35, 259],
        [35, 289],
      ],
      '#b8bdb5',
      3,
    );
    rect(29, 282, 12, 6, '#8d9fa7');
    line(
      [
        [62, 253],
        [74, 281],
      ],
      '#adb7bc',
      3,
    );
    rect(w - 47, 320, 8, 66, '#91744f');
    rect(w - 32, 313, 7, 74, '#ad9063');
    rect(19, 373, 16, 12, '#473a30');
    rect(35, 369, 15, 16, '#574338');
  }
  // Familiar objects tie shared spaces to the residents, rather than generic clutter.
  if (/ENTRANCE/i.test(name)) {
    rect(101, 284, 32, 25, '#bca781');
    rect(104, 287, 26, 19, '#434c43');
    line(
      [
        [109, 293],
        [122, 293],
        [122, 302],
      ],
      '#d1b888',
      1,
    );
    oval(113, 352, 4, 3, '#d4c19a');
    oval(126, 352, 4, 3, '#d4c19a');
  }
  if (/QUARTERS/i.test(name)) {
    rect(19, 322, 22, 10, '#a09a83');
    line(
      [
        [21, 325],
        [38, 325],
      ],
      '#e1ccab',
      1,
    );
    rect(w - 31, 339, 17, 8, '#a78bb1');
    rect(w - 27, 334, 6, 5, '#d6caad');
  }
  if (/STORE ROOM/i.test(name)) {
    for (let i = 0; i < 3; i++) {
      const px = 35 + i * 30;
      line(
        [
          [px, 269],
          [px, 300],
        ],
        '#b8c8c9',
        3,
      );
      line(
        [
          [px - 6, 295],
          [px + 6, 295],
        ],
        '#d8b983',
        2,
      );
    }
    rect(w - 80, 240, 38, 31, '#748278');
    line(
      [
        [w - 77, 245],
        [w - 63, 265],
        [w - 46, 245],
      ],
      '#cbb58a',
      2,
    );
  }
  if (/SERVICE ROOM/i.test(name)) {
    rect(18, 317, 40, 7, '#997750');
    rect(21, 306, 25, 10, '#816751');
    rect(23, 307, 21, 2, '#d2c298');
    line(
      [
        [22, 336],
        [43, 336],
        [39, 348],
      ],
      '#b1b7a6',
      2,
    );
  }
  // Different personal decoration in every room, based on its name, never random per frame.
  const seed = [...name].reduce((n, c) => n + c.charCodeAt(0), 0),
    px = w - 22;
  if (seed % 3 === 0) {
    rect(px - 13, 326, 22, 22, '#b69a73');
    rect(px - 10, 329, 16, 16, '#495b58');
    oval(px - 2, 335, 3, 4, '#d9bb98');
  } else if (seed % 3 === 1) {
    line(
      [
        [w - 26, 304],
        [w - 10, 304],
      ],
      '#ab9676',
    );
    rect(w - 23, 309, 6, 12, '#8e9c87');
    rect(w - 14, 312, 5, 8, '#c7b697');
  } else {
    oval(w - 18, 339, 7, 4, '#a6906f');
    line(
      [
        [w - 18, 335],
        [w - 16, 315],
      ],
      '#9ab886',
      1,
    );
    oval(w - 16, 315, 4, 3, '#d0b4cf');
  }
  ctx.restore();
}

export function paintAffordance(ctx, camera, h, time, near = false) {
  const x = h.x - camera,
    y = h.y - 37;
  ctx.save();
  const locked = /key|locked|literacy|strength|tracking/i.test(h.text || '') && !near;
  const color = locked ? '#cfb585' : '#d9eccc';
  glow(ctx, x, y, near ? 26 : 15, color, near ? 0.17 : 0.08);
  if (/^(passage|leave):/.test(h.action || '')) {
    ctx.fillStyle = '#0f212b';
    ctx.beginPath();
    ctx.moveTo(x - 15, h.y);
    ctx.lineTo(x - 15, h.y - 53);
    ctx.arc(x, h.y - 53, 15, Math.PI, 0);
    ctx.lineTo(x + 15, h.y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = color + 'aa';
    ctx.lineWidth = 2;
    ctx.stroke();
    glow(ctx, x, h.y - 28, 25, '#a3c8cd', 0.13);
  }
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.5;
  if (h.action?.startsWith('record:') || h.action?.startsWith('search:')) {
    ctx.fillStyle = '#d6c399';
    ctx.fillRect(x - 7, h.y - 11, 14, 9);
    ctx.strokeStyle = '#896f52';
    ctx.strokeRect(x - 7, h.y - 11, 14, 9);
    ctx.strokeStyle = color;
    ctx.strokeRect(x - 6, y - 5, 12, 10);
    ctx.beginPath();
    ctx.moveTo(x, y - 5);
    ctx.lineTo(x, y + 5);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y - 7);
    ctx.lineTo(x + 5, y);
    ctx.lineTo(x, y + 7);
    ctx.lineTo(x - 5, y);
    ctx.closePath();
    ctx.stroke();
  }
  if (near) {
    const keyX = h.choice ? x + 22 : x;
    ctx.fillStyle = '#172831';
    ctx.beginPath();
    ctx.arc(keyX, y - 21, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#e4d7ab';
    ctx.stroke();
    ctx.fillStyle = '#f5e7bd';
    ctx.font = '10px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(h.done ? (h.text.startsWith('S') ? 'S' : 'W') : 'E', keyX, y - 18);
    ctx.textAlign = 'left';
  } else {
    ctx.globalAlpha = 0.5 + 0.2 * Math.sin(time * 1.3 + h.x);
    ctx.fillRect(x + 7, y - 9, 2, 2);
  }
  ctx.restore();
}
