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
    ctx.fillStyle = D.resources.find((r) => r.id === p.resource)?.color || '#a9d3ca';
    ctx.font = 'bold 9px sans-serif';
    const symbol =
      D.materials.find((m) => m.id === p.resource)?.symbol ||
      { gold: '●', salvage: '▣', supplies: '✚', guard: '◇', care: '✚', craft: '⚒' }[p.resource];
    ctx.fillText(symbol, x + 5, b.y + 12);
    ctx.fillStyle = '#e5e9df';
    ctx.font = '9px sans-serif';
    const label = p.reason
      ? p.status === 'blocked'
        ? 'Secure room'
        : p.status === 'idle'
          ? 'Assign / manage'
          : 'Paused'
      : p.watch
        ? '+' + p.work * 2 + ' defence/day'
        : p.recipe && !Object.keys(p.outputs).length
          ? 'Craft · ' + (p.nextDays || '—') + 'd'
          : p.amount + ' ' + p.resourceName.toLowerCase() + ' / ' + p.cycleDays + 'd';
    ctx.fillText(label, x + 19, b.y + 12, b.w - 25);
    if (p.target && !p.reason) {
      ctx.fillStyle = '#76bdb5';
      ctx.fillRect(x, b.y + b.h - 2, (b.w * p.progress) / p.target, 2);
    }
    ctx.restore();
  }
}
