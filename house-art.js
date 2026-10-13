import * as D from './domain.js';
import { paintFurniture } from './guild-art.js';
export function houseDecorationFootprints(r) {
  if (r.id === 'dryLanding')
    return [
      { x: 615, y: 435, w: 18, h: 22 },
      { x: 641, y: 435, w: 18, h: 22 },
    ];
  if (r.id === 'cellar')
    return [
      { x: 437, y: 436, w: 22, h: 36 },
      { x: 788, y: 436, w: 22, h: 36 },
    ];
  const offsets = ['quarters', 'tower', 'towerCrown'].includes(r.id) ? [110, 155] : [17, 55];
  return offsets.map((dx) => ({ x: r.x + dx, y: r.y - 130, w: 25, h: 44 }));
}
export function paintHouseFurnishings(ctx, camera, s) {
  for (const r of D.houseRooms.filter((r) => D.roomUnlocked(s, r) && !D.coreFacility(s, r.id))) {
    const footprints = houseDecorationFootprints(r);
    s.guild.house.rooms[r.id].decorations.forEach((uid, index) => {
      const item = s.guild.furniture.find((i) => i.uid === uid);
      if (item) paintFurniture(ctx, item.id, footprints[index], camera);
    });
  }
}
export function paintRoomWorker(ctx, camera, s, c, position, time) {
  const room = D.assignedRoom(s, c.id);
  if (!room || c.status !== 'home' || c.injury) return;
  const f = D.roomForecast(s, room.id),
    core = f.core;
  if (
    f.paused ||
    (core && D.productionPause(s, core)) ||
    (core && core !== 'garden' && !s.guild.facilities[core].project)
  )
    return;
  const t = time,
    swing = Math.sin(t * 4),
    x = position.x - camera,
    y = position.y;
  ctx.save();
  ctx.strokeStyle = '#d5bc83';
  ctx.fillStyle = '#d5bc83';
  ctx.lineWidth = 3;
  const line = (a, b) => {
    ctx.beginPath();
    ctx.moveTo(...a);
    ctx.lineTo(...b);
    ctx.stroke();
  };
  const kind = f.role.animation;
  if (kind === 'hammer' || kind === 'saw' || kind === 'sort') {
    line([x + 9, y - 32], [x + 26 + swing * 4, y - 38 + swing * 7]);
    line([x + 22 + swing * 4, y - 43 + swing * 7], [x + 31 + swing * 4, y - 43 + swing * 7]);
    ctx.fillStyle = '#78958b';
    ctx.fillRect(x + 16, y - 23, 24, 7);
    if (kind === 'hammer' && swing > 0.6) {
      ctx.fillStyle = '#f0cf7e';
      ctx.fillRect(x + 25, y - 30, 2, 3);
    }
  } else if (kind === 'garden' || kind === 'care' || kind === 'pack') {
    line([x + 10, y - 33], [x + 27, y - 30 + swing * 4]);
    ctx.fillStyle = kind === 'garden' ? '#8dba79' : '#d7d7bd';
    ctx.fillRect(x + 22, y - 27, 14, 8);
    if (kind === 'garden') line([x + 31, y - 31], [x + 31, y - 44]);
  } else if (kind === 'watch') {
    // Keep the equipped shield visible; the watch's activity stays at ground level.
    ctx.strokeStyle = '#84c6c466';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(x, y + 3, 28, 4, 0, Math.PI, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = '#b5d8c9';
    ctx.beginPath();
    ctx.ellipse(x + Math.sin(t * 0.8) * 24, y + 3, 2, 1, 0, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = kind === 'study' ? '#89c7cc' : '#d2b88f';
    ctx.fillRect(x + 14, y - 33, 22, 13);
    line([x + 22, y - 39], [x + 28, y - 26 + swing * 2]);
    if (kind === 'study') {
      ctx.globalAlpha = 0.45 + Math.sin(t * 2) * 0.2;
      ctx.beginPath();
      ctx.arc(x + 31, y - 48, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#b5d8c9';
  ctx.font = '8px sans-serif';
  ctx.fillText(kind.toUpperCase() + ' · ' + f.role.stat.toUpperCase(), x - 20, y + 14);
  ctx.restore();
}
