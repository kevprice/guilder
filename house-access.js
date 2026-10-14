import { rooms } from './narrative.js';
import { expansionRooms } from './expansion.js';
export const commissioned = (s, id) =>
  s.household?.opening === 'ready' && s.household.rooms.includes(id);
export const mainRoomAvailable = (s, r) => commissioned(s, r.id) || !!s.flags[r.anchor];
export function groundBoundary(s) {
  let max = commissioned(s, 'landing') || s.flags.anchor ? 1220 : s.flags.breach ? 955 : 690;
  for (const r of rooms) {
    if (!mainRoomAvailable(s, r)) break;
    if (r.id === 'library' && !commissioned(s, r.id) && !s.flags.libraryOpened) return 1260;
    max = r.x + r.w - 25;
  }
  if (s.flags.free || s.household?.opening === 'ready')
    for (const r of expansionRooms) {
      if (!mainRoomAvailable(s, r)) break;
      max = r.x + r.w - 25;
    }
  return max;
}
export function homeThreatLocations(s) {
  const max = groundBoundary(s);
  return [
    { room: 'guildhall', name: 'Service corridor', x: 640, y: 380, min: 510, max: 690 },
    ...(s.flags.repaired
      ? [{ room: 'service', name: 'Workshop', x: 865, y: 380, min: 740, max: 940 }]
      : []),
    ...[...rooms, ...expansionRooms]
      .filter(
        (r) =>
          (commissioned(s, r.id) || s.flags[r.operational]) &&
          mainRoomAvailable(s, r) &&
          r.x + r.w - 25 <= max,
      )
      .map((r) => ({
        room: r.id,
        name: r.name,
        x: r.x + Math.min(170, r.w / 2),
        y: 380,
        min: r.x + 35,
        max: r.x + r.w - 35,
      })),
  ];
}
export function homeThreatLocation(s, id) {
  const t = s.threats?.[id],
    options = homeThreatLocations(s);
  const room = options.find((r) => r.room === t?.room) || options[0];
  return {
    ...room,
    x:
      t?.room === room.room && Number.isFinite(t.x)
        ? Math.max(room.min, Math.min(room.max, t.x))
        : room.x,
  };
}
export function reconcileHomeThreats(s, ids) {
  for (const id of ids)
    if (s.threats?.[id]?.active) {
      const { room, x, y } = homeThreatLocation(s, id);
      Object.assign(s.threats[id], { room, x, y });
    }
}
