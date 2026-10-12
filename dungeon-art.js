// Deliberately different silhouettes and props; no repeated domestic windows below ground.
import { glow } from './graphics-engine.js';
export function paintChamber(ctx, camera, r, s, time) {
  const x = r.x - camera,
    y = r.y,
    w = r.w,
    top = y - 180;
  const dark = r.y > 380;
  const palettes = {
    sewer: ['#253b39', '#699d85'],
    cells: ['#2c2d36', '#a79a85'],
    crypt: ['#302935', '#b898b4'],
    ossuary: ['#34302c', '#d8ceb0'],
    maze: ['#252d37', '#9ba8b6'],
    vault: ['#313529', '#cbbb79'],
    fungus: ['#193438', '#88d5bd'],
    rift: ['#122b43', '#75c9e1'],
    study: ['#343044', '#d7badb'],
    potions: ['#273545', '#b8d492'],
    mirror: ['#263648', '#a6c4e5'],
    summoning: ['#35233d', '#d294cb'],
    menagerie: ['#283831', '#aad7ae'],
    orrery: ['#1e2943', '#cfb6eb'],
    storm: ['#23364c', '#98cddc'],
    stars: ['#12223d', '#cecaec'],
  };
  const [wall, accent] = palettes[r.theme];
  ctx.save();
  ctx.fillStyle = wall;
  ctx.beginPath();
  ctx.moveTo(x, y + 10);
  ctx.lineTo(x + 12, top + 35);
  for (let i = 0; i <= 8; i++)
    ctx.lineTo(
      x + (w * i) / 8,
      top + (dark ? Math.sin(i * 2 + r.depth) * 17 : Math.abs(i - 4) * 7),
    );
  ctx.lineTo(x + w, y + 10);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = accent + '55';
  ctx.lineWidth = 3;
  ctx.stroke();
  glow(ctx, x + w * 0.58, y - 80, 160, accent, 0.15);
  if (!dark) glow(ctx, x + 90, y - 60, 110, '#edb474', 0.2);
  for (let i = 0; i < 9; i++) {
    const px = x + 90 + ((i * 71) % (w - 120)),
      py = y - 25 - ((time * 8 + i * 19) % 100);
    ctx.fillStyle = accent + '77';
    ctx.beginPath();
    ctx.arc(px + Math.sin(time * 0.5 + i) * 5, py, 1.1, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#131c24';
  ctx.fillRect(x, y, w, 18);
  ctx.fillStyle = accent + '77';
  ctx.fillRect(x, y, w, 4);
  ctx.fillStyle = accent;
  ctx.font = '16px Georgia';
  ctx.fillText(r.name, x + 22, top + 38);
  ctx.font = '10px sans-serif';
  ctx.fillText(
    'DEPTH ' +
      r.depth +
      ' · ' +
      (s.flags['searched_' + r.id]
        ? 'RECORDS RECOVERED'
        : r.encounter && !s.flags['cleared_' + r.id]
          ? 'CREATURE IN ROOM'
          : r.trap
            ? 'TRAPPED MECHANISM'
            : 'UNEXPLORED RECORDS'),
    x + 22,
    top + 57,
  );
  const box = (px, py, pw, ph, color = accent) => {
    ctx.fillStyle = color;
    ctx.fillRect(x + px, y + py, pw, ph);
  };
  const circle = (px, py, rad, color = accent) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + px, y + py, rad, 0, Math.PI * 2);
    ctx.fill();
  };
  const stroke = (points, color = accent) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    points.forEach(([px, py], i) => (i ? ctx.lineTo(x + px, y + py) : ctx.moveTo(x + px, y + py)));
    ctx.stroke();
  };
  if (['sewer', 'rift'].includes(r.theme)) {
    box(20, -18, w - 40, 18, '#244f56');
    for (let i = 0; i < 12; i++) box(25 + i * 45, -12 + Math.sin(time + i) * 3, 35, 1, '#83bfc955');
    if (r.theme === 'sewer') {
      stroke(
        [
          [80, -100],
          [80, -40],
          [w - 100, -40],
          [w - 100, -110],
        ],
        '#688c7a',
      );
      circle(w - 110, -55, 16, '#9c8b65');
    } else {
      box(w * 0.55, -130, 110, 130, '#8acde855');
      box(w * 0.55 - 8, -137, 126, 8);
      stroke(
        [
          [w * 0.55, -20],
          [w * 0.6, -65],
          [w * 0.58, -100],
        ],
        '#b5e5ee',
      );
    }
  }
  if (['cells', 'menagerie'].includes(r.theme)) {
    for (let cell = 0; cell < 3; cell++) {
      box(140 + cell * 150, -110, 110, 110, '#151b21');
      for (let i = 0; i < 6; i++) box(145 + cell * 150 + i * 19, -110, 3, 110, '#8f958b');
      box(150 + cell * 150, -18, 78, 10, '#665c49');
    }
    if (r.theme === 'menagerie') {
      circle(w - 120, -50, 19, '#a8cab577');
      stroke(
        [
          [w - 140, -65],
          [w - 115, -80],
          [w - 96, -55],
        ],
        accent,
      );
    }
  }
  if (r.theme === 'crypt') {
    for (let i = 0; i < 4; i++) {
      box(150 + i * 140, -43, 110, 35, '#746474');
      box(175 + i * 140, -52, 58, 10, '#a994a6');
      box(180 + i * 140, -95, 45, 43, '#5a4f65');
      box(186 + i * 140, -78, 34, 3, '#c7b09a');
    }
  }
  if (['ossuary', 'study'].includes(r.theme)) {
    for (let i = 0; i < 4; i++) {
      box(160 + i * 95, -113, 75, 105, '#4b3d43');
      for (let j = 0; j < 3; j++) {
        box(160 + i * 95, -90 + j * 31, 75, 4, '#b39572');
        for (let k = 0; k < 5; k++)
          r.theme === 'ossuary'
            ? circle(170 + i * 95 + k * 12, -100 + j * 31, 4, '#d4cbb2')
            : box(165 + i * 95 + k * 12, -107 + j * 31, 8, 17, k % 2 ? accent : '#997e62');
      }
    }
    if (r.theme === 'study') {
      box(w - 160, -45, 110, 8, '#b29475');
      for (let i = 0; i < 3; i++)
        box(w - 150 + i * 24, -90 + Math.sin(time + i) * 9, 18, 24, '#e1d1ad');
    }
  }
  if (r.theme === 'maze') {
    for (let i = 0; i < 5; i++) {
      box(150 + i * 160, -120, 88, 120, '#131d29');
      box(135 + i * 160, -130, 118, 15, '#5a6375');
      stroke(
        [
          [170 + i * 160, -14],
          [190 + i * 160, -32],
          [215 + i * 160, -14],
        ],
        i === 2 ? '#dcbd7b' : '#547383',
      );
    }
  }
  if (r.theme === 'vault') {
    for (let i = 0; i < 4; i++) {
      stroke(
        [
          [130 + i * 170, -150],
          [140 + i * 170, -80],
          [125 + i * 170, -5],
        ],
        '#729765',
      );
      box(150 + i * 170, -38, 105, 35, '#88734f');
      box(196 + i * 170, -33, 10, 15, '#e0ca89');
    }
    circle(w - 125, -92, 32, '#d1ba7833');
  }
  if (r.theme === 'fungus') {
    for (let i = 0; i < 10; i++) {
      const px = 110 + i * 85,
        height = 25 + (i % 3) * 22;
      box(px, -height, 8, height, '#acc9af');
      ctx.fillStyle = i % 2 ? '#83d9c5' : '#aa9bd9';
      ctx.beginPath();
      ctx.ellipse(x + px + 4, y - height, 23, 11, 0, 0, Math.PI * 2);
      ctx.fill();
      circle(px + 4, -height, 35, '#83d9c50c');
    }
  }
  if (r.theme === 'potions') {
    for (let i = 0; i < 7; i++) {
      const px = 120 + i * 52,
        py = -58 + Math.sin(time + i) * 12;
      stroke(
        [
          [px, -118],
          [px, py - 15],
        ],
        '#999c99',
      );
      circle(px, py, 14, i % 2 ? '#a8d29899' : '#b595d899');
      box(px - 4, py - 25, 8, 15, '#bbcdd6');
    }
    box(220, -13, 170, 13, '#6c7c83');
  }
  if (r.theme === 'mirror') {
    box(220, -132, 220, 132, '#6d8aac');
    box(230, -124, 200, 116, '#162d45');
    stroke(
      [
        [250, -110],
        [330, -30],
        [420, -100],
      ],
      '#bad5e677',
    );
    circle(335, -64 + Math.sin(time) * 3, 18, '#b7d6dc55');
  }
  if (r.theme === 'summoning') {
    ctx.strokeStyle = accent;
    ctx.beginPath();
    ctx.ellipse(x + w * 0.55, y - 16, 130, 25, 0, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 6; i++) {
      circle(w * 0.55 + Math.cos((i * Math.PI) / 3) * 130, -50, 4, '#edc287');
      box(w * 0.55 + Math.cos((i * Math.PI) / 3) * 130 - 3, -34, 6, 22, '#bbb08f');
    }
  }
  if (['orrery', 'stars'].includes(r.theme)) {
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = accent + '55';
      ctx.beginPath();
      ctx.ellipse(x + w * 0.58, y - 70, 45 + i * 37, 20 + i * 9, 0.2, 0, Math.PI * 2);
      ctx.stroke();
      circle(
        w * 0.58 + Math.cos(time * 0.2 + i) * (45 + i * 37),
        -70 + Math.sin(time * 0.2 + i) * (20 + i * 9),
        6 + i,
        colors(i),
      );
    }
    if (r.theme === 'stars')
      for (let i = 0; i < 18; i++) circle(100 + i * 48, -110 + ((i * 29) % 90), 2, '#e2dfbd');
  }
  if (r.theme === 'storm') {
    box(w * 0.5, -130, 105, 127, '#8aa6b744');
    stroke(
      [
        [w * 0.55, -126],
        [w * 0.58, -93],
        [w * 0.53, -65],
        [w * 0.58, -35],
        [w * 0.55, -5],
      ],
      '#c9eaf3',
    );
    stroke(
      [
        [90, -30],
        [w * 0.5, -30],
        [w * 0.5, -5],
      ],
      '#a79875',
    );
  }
  // A visible entrance and investigation plinth on every floor.
  box(28, -72, 40, 72, '#0c1520');
  box(24, -78, 48, 7, accent);
  box(112, -32, 48, 30, '#735944');
  box(116, -39, 40, 8, '#d8c697');
  ctx.restore();
}
function colors(i) {
  return ['#e0c793', '#a9ced2', '#c1a6da', '#91b8a0'][i % 4];
}
