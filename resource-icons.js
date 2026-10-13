export const iconPaths = {
  house: '<path d="M3 11l9-8 9 8M5 9v12h14V9M9 21v-8h6v8"/>',
  residents: '<circle cx="12" cy="7" r="4"/><path d="M4 21v-3a8 8 0 0116 0v3"/>',
  contracts:
    '<circle cx="12" cy="12" r="8"/><path d="M15 9l-2 4-4 2 2-4zM12 1v3m0 16v3M1 12h3m16 0h3"/>',
  story: '<path d="M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1zm0 0v15"/>',
  more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  day: '<circle cx="12" cy="12" r="4"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2"/>',
  next: '<path d="M5 4l11 8L5 20zM19 4v16"/>',
  focus: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5"/><circle cx="12" cy="12" r="3"/>',
  wide: '<path d="M3 9V3h6m6 0h6v6M3 15v6h6m6 0h6v-6M3 3l6 6m6 6 6 6M21 3l-6 6m-6 6-6 6"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 018 0v4m-4 5v2"/>',
  pause: '<path d="M8 5v14m8-14v14"/>',
  plus: '<path d="M12 4v16M4 12h16"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  gold: '<circle cx="12" cy="12" r="8"/><path d="M12 7v10m3-8h-4a2 2 0 000 4h2a2 2 0 010 4H9"/>',
  timber: '<path d="M3 8l15-4 3 4-15 4zm3 4v7l15-4V8M3 8v7l3 4m4-7 7-2m-7 6 7-2"/>',
  ore: '<path d="M6 4h12l4 8-10 9L2 12zm0 0 6 17 6-17M2 12h20"/>',
  herbs:
    '<path d="M12 21V5m0 8C3 14 3 5 4 4c7 0 8 5 8 9zm0-3c0-7 7-8 9-7 0 7-4 8-9 7zm0 7c0-5 6-6 8-5-1 6-4 7-8 5z"/>',
  cloth: '<path d="M6 3h13l-2 17H4zm0 0L3 7v13m6-12h6m-7 4h6m-7 4h6"/>',
  aether: '<path d="M12 2l4 8 6 2-6 2-4 8-4-8-6-2 6-2z"/>',
  components:
    '<path d="M9 3h6l1 4 4-1 2 5-3 3 1 4-5 3-3-3-4 2-4-4 2-4-3-3 3-5 4 1z"/><circle cx="12" cy="12" r="3"/>',
  salvage: '<path d="M3 8h18v13H3zm4 0V4h10v4M3 12h18m-11 0v4h4v-4"/>',
  supplies: '<path d="M4 5h16v16H4zm4 0V2h8v3m-4 5v7m-4-3h8"/>',
  guard: '<path d="M12 2l8 4v7c0 5-8 9-8 9S4 18 4 13V6zm-4 9 3 3 5-6"/>',
  care: '<path d="M4 7h16v14H4V7zm4 0V3h8v4m-4 3v7m-4-3h8"/>',
  craft: '<path d="M14 3l-4 5 6 6 5-4-2-6zm-4 5L3 18l3 3 10-7"/>',
};
export function resourceIcon(id, label = id) {
  return `<svg class="resource-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="${label}">${iconPaths[id] || iconPaths.craft}</svg>`;
}
export function paintIcon(ctx, id, x, y, size = 24) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  ctx.lineWidth = 1.6;
  ctx.lineCap = ctx.lineJoin = 'round';
  const source = iconPaths[id] || iconPaths.craft;
  for (const [, d] of source.matchAll(/<path d="([^"]+)"/g)) ctx.stroke(new Path2D(d));
  for (const [, cx, cy, r] of source.matchAll(/<circle cx="([^"]+)" cy="([^"]+)" r="([^"]+)"/g)) {
    ctx.beginPath();
    ctx.arc(Number(cx), Number(cy), Number(r), 0, Math.PI * 2);
    ctx.stroke();
  }
  for (const [, x, y, w, h] of source.matchAll(
    /<rect x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"/g,
  ))
    ctx.strokeRect(Number(x), Number(y), Number(w), Number(h));
  ctx.restore();
}
