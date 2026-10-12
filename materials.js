// Fixed, high-resolution material layers; never randomised during animation.
const surfaces = new Map();
export function paintMaterial(ctx, x, y, w, h, kind, seed = 1) {
  const width = Math.ceil(w),
    height = Math.ceil(h),
    key = `${width}:${height}:${kind}:${seed}`;
  let surface = surfaces.get(key);
  if (!surface) {
    surface =
      typeof OffscreenCanvas !== 'undefined'
        ? new OffscreenCanvas(width * 2, height * 2)
        : Object.assign(document.createElement('canvas'), { width: width * 2, height: height * 2 });
    const c = surface.getContext('2d');
    c.scale(2, 2);
    let value = seed >>> 0;
    const rnd = () => {
      value = (Math.imul(value, 1664525) + 1013904223) >>> 0;
      return value / 4294967296;
    };
    for (let i = 0; i < (width * height) / 23; i++) {
      c.fillStyle = i % 3 ? '#f4dfb00d' : '#050b1425';
      c.fillRect(rnd() * width, rnd() * height, 0.4 + rnd() * 1.8, 0.4 + rnd());
    }
    if (kind === 'stone') {
      for (let row = 0; row < height / 22; row++) {
        for (let bx = -32 + (row % 2) * 24; bx < width; bx += 48) {
          const by = row * 22;
          c.fillStyle = '#02091240';
          c.fillRect(bx, by, 46, 1.5);
          c.fillRect(bx, by, 1.5, 21);
          c.fillStyle = '#dac9ac20';
          c.fillRect(bx + 2, by + 2, 43, 0.7);
          c.fillStyle = rnd() > 0.5 ? '#a6b2b110' : '#01071512';
          c.fillRect(bx + 2, by + 3, 43, 18);
        }
      }
    } else if (kind === 'wood') {
      for (let py = 0; py < height; py += 9) {
        c.fillStyle = '#080a1377';
        c.fillRect(0, py, width, 1);
        c.fillStyle = '#e5bd7c35';
        c.fillRect(0, py + 1, width, 0.6);
        for (let bx = (py % 27) * 4; bx < width; bx += 76) {
          c.fillStyle = '#090d1955';
          c.fillRect(bx, py, 1, 9);
          c.fillRect(bx + 3, py + 3, 1, 1);
        }
        c.strokeStyle = '#f2c48720';
        c.lineWidth = 0.5;
        c.beginPath();
        c.moveTo(0, py + 5);
        c.bezierCurveTo(width * 0.3, py + 2, width * 0.65, py + 8, width, py + 4);
        c.stroke();
      }
    } else {
      for (let i = 0; i < 18; i++) {
        c.fillStyle = '#f0d2b00a';
        c.beginPath();
        c.ellipse(
          rnd() * width,
          rnd() * height,
          8 + rnd() * 20,
          3 + rnd() * 9,
          rnd(),
          0,
          Math.PI * 2,
        );
        c.fill();
      }
    }
    if (surfaces.size >= 128) surfaces.delete(surfaces.keys().next().value);
    surfaces.set(key, surface);
  }
  ctx.drawImage(surface, x, y, w, h);
}
export function paintRoomDepth(ctx, x, top, w, h, accent, seed, stone = false) {
  ctx.save();
  paintMaterial(ctx, x, top, w, h, stone ? 'stone' : 'plaster', seed);
  const shade = ctx.createLinearGradient(x, top, x + w, top);
  shade.addColorStop(0, '#040a1666');
  shade.addColorStop(0.12, '#040a1600');
  shade.addColorStop(0.85, '#040a1600');
  shade.addColorStop(1, '#040a1655');
  ctx.fillStyle = shade;
  ctx.fillRect(x, top, w, h);
  const ceiling = ctx.createLinearGradient(0, top, 0, top + 32);
  ceiling.addColorStop(0, '#050a1880');
  ceiling.addColorStop(1, '#050a1800');
  ctx.fillStyle = ceiling;
  ctx.fillRect(x, top, w, 32);
  const light = ctx.createRadialGradient(x + w * 0.4, top + 45, 2, x + w * 0.4, top + 45, w * 0.75);
  light.addColorStop(0, accent + '20');
  light.addColorStop(1, accent + '00');
  ctx.fillStyle = light;
  ctx.fillRect(x, top, w, h);
  if (!stone) {
    const panelTop = top + h * 0.7;
    ctx.fillStyle = '#171b2440';
    ctx.fillRect(x + 4, panelTop, w - 8, h * 0.3);
    for (let px = 12; px < w - 18; px += 38) {
      ctx.strokeStyle = '#050b1860';
      ctx.lineWidth = 2;
      ctx.strokeRect(x + px, panelTop + 5, Math.min(29, w - px - 8), h * 0.3 - 12);
      ctx.strokeStyle = '#e4c69c33';
      ctx.lineWidth = 0.7;
      ctx.strokeRect(x + px + 2, panelTop + 7, Math.min(25, w - px - 12), h * 0.3 - 16);
    }
    ctx.fillStyle = '#c5a37755';
    ctx.fillRect(x + 4, panelTop, w - 8, 2);
    ctx.fillStyle = '#070e1866';
    ctx.fillRect(x + 4, panelTop + 2, w - 8, 3);
  }
  ctx.restore();
}
