import test from 'node:test';
import assert from 'node:assert/strict';
import { GraphicsEngine, screenToWorld, clampZoom, roomTheme } from './graphics-engine.js';
test('zoomed clicks retain their world target across camera offsets and floors', () => {
  for (const zoom of [0.7, 1, 1.25, 2.5, 3])
    for (const floor of [380, -100, 1020, 3030]) {
      const camera = 730,
        cameraY = floor - 380,
        x = 940,
        y = floor;
      const sx = (x - camera - 600) * zoom + 600,
        sy = (y - cameraY - 380) * zoom + 380;
      const world = screenToWorld(sx, sy, camera, cameraY, zoom);
      assert.ok(Math.abs(world.x - x) < 1e-8);
      assert.ok(Math.abs(world.y - y) < 1e-8);
    }
});
test('camera animation and high DPI resizing are bounded without changing simulation state', () => {
  const canvas = { width: 1200, height: 650 },
    g = new GraphicsEngine(canvas);
  g.resize(3);
  assert.equal(canvas.width, 2400);
  assert.equal(canvas.height, 1300);
  g.setZoom(99);
  assert.equal(g.targetZoom, 3);
  g.tick(0.016);
  assert.ok(g.zoom > 1.25 && g.zoom < 3);
  g.reducedMotion = true;
  g.setZoom(0.1);
  g.tick(0.016);
  assert.equal(g.zoom, 0.7);
  assert.equal(clampZoom(NaN), 1);
});
test('major room types have different furnishing and lighting identities', () => {
  assert.equal(roomTheme('RETURNED ARCHIVE')[0], 'scholar');
  assert.equal(roomTheme('RECLAIMED GREENHOUSE')[0], 'garden');
  assert.equal(roomTheme('Ash forge')[0], 'forge');
  assert.equal(roomTheme('Star laboratory')[0], 'stars');
  assert.equal(roomTheme('Clock workshop')[0], 'clock');
  assert.equal(roomTheme('Snow observatory')[0], 'frost');
  assert.equal(roomTheme('Pearl infirmary')[0], 'water');
  assert.equal(roomTheme('QUARTERS')[0], 'rest');
});

test('responsive canvas fills wide and narrow viewports while clicks remain aligned with the camera', () => {
  for (const [clientWidth, clientHeight] of [
    [1220, 412],
    [374, 504],
    [980, 650],
  ]) {
    const canvas = { clientWidth, clientHeight, width: 0, height: 0 },
      g = new GraphicsEngine(canvas);
    g.resize(2);
    assert.equal(g.width, Math.round((clientWidth / clientHeight) * 650));
    assert.equal(canvas.width / g.width, 2);
    const camera = 410,
      zoom = 1.75,
      x = 930,
      y = 380;
    const point = screenToWorld(
      (x - camera - g.width / 2) * zoom + g.width / 2,
      y,
      camera,
      0,
      zoom,
      g.width,
    );
    assert.ok(Math.abs(point.x - x) < 1e-8);
    assert.equal(point.y, y);
  }
});
