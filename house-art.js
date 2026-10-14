import { paintWorkstation } from './sprite-art.js';
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
// A job pose is only valid once the worker has reached their assigned station.
export function workerActivity(s, c, position, motion = {}) {
  c = D.guildWorker(s, c.id) || c;
  const room = D.assignedRoom(s, c.id);
  if (
    !room ||
    c.status !== 'home' ||
    c.injury ||
    motion.moving ||
    motion.travelling ||
    motion.airborne
  )
    return null;
  const slot = s.guild.house.rooms[room.id].workers.indexOf(c.id);
  const station = D.workerStation(room, slot);
  if (Math.abs(position.x - station.x) > 12 || Math.abs(position.y - station.y) > 3) return null;
  const f = D.roomForecast(s, room.id),
    core = f.core;
  if (
    f.paused ||
    (core && D.productionPause(s, core)) ||
    (core && core !== 'garden' && !s.guild.facilities[core].project)
  )
    return null;
  return f.role.animation === 'study' && f.role.output.aether ? 'distil' : f.role.animation;
}
export function paintHouseWorkstations(ctx, camera, s) {
  for (const room of D.houseRooms) {
    const workers = s.guild.house.rooms[room.id].workers;
    if (!workers.some(Boolean) || !D.roomUnlocked(s, room)) continue;
    const role = D.roomForecast(s, room.id).role;
    const kind = role.animation === 'study' && role.output.aether ? 'distil' : role.animation;
    workers.forEach((id, slot) => {
      if (id) paintWorkstation(ctx, camera, D.workerStation(room, slot), kind);
    });
  }
}
