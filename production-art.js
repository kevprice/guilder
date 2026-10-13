import { paintIcon } from './resource-icons.js';
import * as D from './domain.js';
import { roomProduction, productionBadge } from './production-view.js';
export function productionBadgeAt(s, x, y) {
  return (
    D.houseRooms.find((r) => {
      if (r.w < 90 || !D.roomUnlocked(s, r)) return false;
      const b = productionBadge(r);
      return x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h;
    }) || null
  );
}
export function paintProductionBadges(ctx, camera, s, snapshots = null) {
  for (const p of snapshots ||
    D.houseRooms
      .filter((r) => r.w >= 90 && D.roomUnlocked(s, r))
      .map((r) => roomProduction(s, r.id))) {
    const r = p.room,
      b = productionBadge(r),
      x = b.x - camera;
    ctx.save();
    ctx.fillStyle = '#12262cf2';
    ctx.fillRect(x, b.y, b.w, b.h);
    ctx.strokeStyle = p.status === 'working' ? '#76bdb5' : '#7b817f';
    ctx.strokeRect(x, b.y, b.w, b.h);
    ctx.strokeStyle = D.resources.find((r) => r.id === p.resource)?.color || '#a9d3ca';
    paintIcon(ctx, p.resource, x + 5, b.y + 2, 15);
    ctx.fillStyle = '#e5e9df';
    ctx.font = 'bold 10px sans-serif';
    if (p.reason) {
      ctx.strokeStyle = p.status === 'blocked' ? '#d6b67a' : '#99aaa6';
      paintIcon(
        ctx,
        p.status === 'blocked' ? 'lock' : p.status === 'idle' ? 'plus' : 'pause',
        x + 27,
        b.y + 2,
        15,
      );
    } else {
      ctx.fillText(String(p.watch ? p.work * 2 : p.amount), x + 25, b.y + 13);
      ctx.strokeStyle = '#99aaa6';
      paintIcon(ctx, 'clock', x + b.w - 35, b.y + 3, 13);
      ctx.fillText(String(p.nextDays ?? p.cycleDays ?? 0), x + b.w - 18, b.y + 13);
    }
    if (p.target && !p.reason) {
      ctx.fillStyle = '#76bdb5';
      ctx.fillRect(x, b.y + b.h - 2, (b.w * p.progress) / p.target, 2);
    }
    ctx.restore();
  }
}
