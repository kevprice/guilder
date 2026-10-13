// Atmospheric scenery stays behind the playable cutaway and never obscures its labels.
const TAU = Math.PI * 2;
import { paintMaterial } from './materials.js';
function glow(ctx, x, y, r, color) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, color);
  g.addColorStop(1, '#00000000');
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}
function hill(ctx, base, amplitude, phase, color, width = 1200) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 650);
  ctx.lineTo(0, base);
  for (let x = 0; x <= width + 40; x += 25)
    ctx.lineTo(
      x,
      base + Math.sin(x / 190 + phase) * amplitude + Math.sin(x / 83 + phase) * amplitude * 0.22,
    );
  ctx.lineTo(width + 40, 650);
  ctx.fill();
}
function tree(ctx, x, y, h, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.bezierCurveTo(x - 5, y - h * 0.4, x + 8, y - h * 0.65, x + 2, y - h);
  ctx.stroke();
  for (let j = 0; j < 4; j++) {
    const by = y - h * (0.32 + j * 0.16);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, by + 13);
    ctx.quadraticCurveTo(x - 19, by - 10, x - 34 + j * 3, by - 14);
    ctx.moveTo(x, by);
    ctx.quadraticCurveTo(x + 22, by - 25, x + 35, by - 32);
    ctx.stroke();
  }
  ctx.fillStyle = color;
  for (let j = 0; j < 5; j++) {
    ctx.beginPath();
    ctx.ellipse(x + Math.sin(j * 2.3) * 27, y - h + j * 13, 30, 22, j * 0.3, 0, TAU);
    ctx.fill();
  }
}
export function paintSky(ctx, { camera, floor, time, width = 1200 }) {
  const high = floor < 380,
    deep = floor > 420,
    mystery = Math.min(1, Math.max(0, camera / 950));
  const g = ctx.createLinearGradient(0, 0, width, 650);
  g.addColorStop(0, deep ? '#101c2a' : high ? '#101a38' : '#172c38');
  g.addColorStop(0.5, deep ? '#172635' : high ? '#343252' : mystery > 0.35 ? '#283553' : '#294447');
  g.addColorStop(1, deep ? '#111a26' : '#111f2d');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, width, 650);
  if (deep) {
    for (let i = 0; i < 20; i++) {
      const x = (((i * 137 - camera * 0.09) % width) + width) % width,
        y = (i * 89) % 650;
      glow(ctx, x, y, 45, i % 2 ? '#43798618' : '#6e549420');
    }
    return;
  }
  glow(ctx, 920 - camera * 0.08, 120, 270, high ? '#77c9d72c' : '#a4d5ca20');
  // A quiet, broad veil of northern light becomes stronger at the tower crown.
  for (let band = 0; band < 3; band++) {
    ctx.beginPath();
    for (let x = -30; x < width + 40; x += 20) {
      const y = 95 + band * 35 + Math.sin(x / 240 + time * 0.07 + band) * 26;
      if (x === -30) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    for (let x = width + 20; x >= -30; x -= 20)
      ctx.lineTo(x, 145 + band * 35 + Math.sin(x / 240 + time * 0.07 + band) * 26);
    ctx.closePath();
    const a = ctx.createLinearGradient(0, 65, 0, 270);
    a.addColorStop(0, high ? '#78d6cc24' : '#78d6cc0c');
    a.addColorStop(1, '#9974c400');
    ctx.fillStyle = a;
    ctx.fill();
  }
  for (let i = 0; i < (high ? 105 : 65); i++) {
    const x = (((i * 173 - camera * 0.045) % width) + width) % width,
      y = (i * 47) % 255;
    ctx.globalAlpha = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(time * 0.6 + i));
    ctx.fillStyle = i % 3 ? '#c2d7df' : '#d8c4a0';
    ctx.fillRect(x, y, i % 13 === 0 ? 2 : 1, i % 13 === 0 ? 2 : 1);
  }
  ctx.globalAlpha = 1;
  const mx = width - 190 - camera * 0.09,
    my = high ? 95 : 88;
  glow(ctx, mx, my, 95, '#b9ebdd25');
  ctx.fillStyle = '#d2e6d6';
  ctx.beginPath();
  ctx.arc(mx, my, 27, 0, TAU);
  ctx.fill();
  ctx.fillStyle = high ? '#24324b' : '#27424b';
  ctx.beginPath();
  ctx.arc(mx + 11, my - 6, 24, 0, TAU);
  ctx.fill();
  if (high) {
    ctx.strokeStyle = '#b6d9df35';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (const [i, [x, y]] of [
      [760, 37],
      [790, 64],
      [838, 49],
      [863, 92],
      [900, 70],
    ].entries()) {
      if (i) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
      glow(ctx, x, y, 8, '#b6f0e74a');
    }
    ctx.stroke();
  }
  hill(ctx, high ? 460 : 280, 44, camera * 0.001, '#2d44504a', width);
  hill(ctx, high ? 520 : 330, 33, 2 + camera * 0.002, '#1a383f', width);
  for (let i = 0; i < 18; i++) {
    const x = ((((i * 117 - camera * 0.23) % 1500) + 1500) % 1500) - 130;
    tree(
      ctx,
      x,
      high ? 580 : 330,
      high ? 140 + ((i * 23) % 90) : 155 + ((i * 23) % 100),
      i % 2 ? '#193337' : '#203e3d',
    );
  }
  // Distant stones float above the forest, appearing deeper into the estate.
  for (let i = 0; i < 4; i++) {
    const x = 850 + i * 220 - camera * 0.3,
      y = 225 + (i % 2) * 42 + Math.sin(time * 0.2 + i) * 4;
    ctx.globalAlpha = high ? 0.8 : 0.25 + mystery * 0.3;
    ctx.fillStyle = '#456069';
    ctx.beginPath();
    ctx.moveTo(x - 24, y);
    ctx.lineTo(x + 27, y - 4);
    ctx.lineTo(x + 10, y + 36);
    ctx.lineTo(x - 6, y + 25);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#799b86';
    ctx.fillRect(x - 25, y - 5, 51, 5);
    glow(ctx, x, y + 10, 40, '#79cfc328');
    ctx.globalAlpha = 1;
  }
  const mist = ctx.createLinearGradient(0, 310, 0, 510);
  mist.addColorStop(0, '#a4c5bd00');
  mist.addColorStop(0.5, '#a4c5bd12');
  mist.addColorStop(1, '#a4c5bd00');
  ctx.fillStyle = mist;
  ctx.fillRect(0, 310, 1200, 200);
}
export function paintGuildRoof(ctx, camera, time) {
  ctx.save();
  ctx.translate(-camera, 0);
  // One lived-in hearth chimney; the estate beyond is a single ancient, overgrown wing.
  ctx.fillStyle = '#374443';
  ctx.beginPath();
  ctx.moveTo(43, 204);
  ctx.lineTo(159, 119);
  ctx.lineTo(292, 204);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#77857a';
  ctx.save();
  ctx.clip();
  paintMaterial(ctx, 43, 119, 249, 85, 'stone', 271);
  ctx.restore();
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#5b6660';
  ctx.fillRect(111, 129, 18, 54);
  paintMaterial(ctx, 111, 129, 18, 54, 'stone', 88);
  ctx.fillRect(108, 124, 24, 7);
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = '#b7c5ba12';
    ctx.beginPath();
    ctx.ellipse(
      122 + Math.sin(time * 0.3 + i) * 7,
      113 - i * 18 - ((time * 4) % 18),
      10 + i * 4,
      7 + i * 4,
      0,
      0,
      TAU,
    );
    ctx.fill();
  }
  ctx.fillStyle = '#263f3e';
  ctx.beginPath();
  ctx.moveTo(274, 202);
  ctx.lineTo(390, 160);
  ctx.quadraticCurveTo(640, 125, 930, 170);
  ctx.lineTo(1265, 192);
  ctx.lineTo(1265, 207);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#758574';
  ctx.lineWidth = 2;
  ctx.stroke();
  for (let i = 0; i < 65; i++) {
    const x = 295 + i * 15,
      y = 171 + Math.sin(i * 0.15) * 14;
    ctx.strokeStyle = i % 3 ? '#608a6950' : '#91b29360';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x - 8, y + 12, x - 6, y + 24 + (i % 3) * 9);
    ctx.stroke();
  }
  for (
    let x = Math.max(1270, 1270 + Math.floor((camera - 1500) / 300) * 300);
    x < camera + 1500;
    x += 300
  ) {
    ctx.fillStyle = '#314451';
    ctx.beginPath();
    ctx.moveTo(x, 204);
    ctx.quadraticCurveTo(x + 70, 150, x + 135, 130);
    ctx.quadraticCurveTo(x + 205, 176, x + 290, 204);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#819ba280';
    ctx.stroke();
    glow(ctx, x + 135, 157, 40, '#8abaca1a');
    ctx.strokeStyle = '#87c9ba55';
    ctx.beginPath();
    ctx.arc(x + 135, 164, 13, 0, TAU);
    ctx.stroke();
  }
  for (let i = 0; i < 35; i++) {
    const x = 300 + i * 28,
      y = 186 + Math.sin(i * 0.4) * 8;
    ctx.fillStyle = i % 3 ? '#527b6060' : '#94b78066';
    ctx.beginPath();
    ctx.ellipse(x, y, 9, 4, -0.5, 0, TAU);
    ctx.ellipse(x + 5, y + 8, 7, 3, 0.6, 0, TAU);
    ctx.fill();
  }
  ctx.fillStyle = '#687567';
  ctx.fillRect(Math.max(40, camera), 198, 1500, 7);
  ctx.restore();
}
export function paintMagicMotes(ctx, { camera, cameraY, floor, time }) {
  ctx.save();
  const deep = floor > 420;
  for (let i = 0; i < 24; i++) {
    const x = (((i * 137 - camera * 0.35 + time * (3 + (i % 3))) % 1200) + 1200) % 1200,
      y = 80 + ((i * 79) % 490) + Math.sin(time * 0.45 + i) * 10;
    const a = 0.22 + 0.22 * Math.sin(time + i);
    ctx.globalAlpha = Math.max(0.08, a);
    glow(ctx, x, y, 9, deep ? '#79d3de70' : '#b3e8bd65');
    ctx.fillStyle = deep ? '#b8e6ef' : '#e2f4c6';
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.globalAlpha = 1;
  // Light follows restored doorways, without changing collision or interaction areas.
  if (floor === 380) {
    for (const x of [706, 975, 1265, 1570, 1875, 2180]) {
      const sx = x - camera;
      if (sx < -40 || sx > 1240) continue;
      glow(ctx, sx, 335 - cameraY, 50, '#80c8bf12');
    }
  }
  ctx.restore();
}
