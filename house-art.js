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
export function paintHouseFurnishings(ctx, camera, s, time = 0) {
  for (const r of D.houseRooms.filter((r) => D.roomUnlocked(s, r) && !D.coreFacility(s, r.id))) {
    const footprints = houseDecorationFootprints(r);
    s.guild.house.rooms[r.id].decorations.forEach((uid, index) => {
      const item = s.guild.furniture.find((i) => i.uid === uid);
      if (item) {
        const forecast = D.roomForecast(s, r.id);
        const active =
          !forecast.paused &&
          ((item.id === 'wardBanner' && forecast.role.animation === 'watch') ||
            (item.id === 'runeShelf' && forecast.role.output.aether) ||
            (item.id === 'verdantPlant' && forecast.role.output.herbs));
        paintFurniture(ctx, item.id, footprints[index], camera, time, !!active);
      }
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
  if (s.outside?.research?.room === room.id)
    return c.undead || c.id === 'mara' || !D.researchForecast(s).total ? null : 'study';
  const f = D.roomForecast(s, room.id),
    core = f.core;
  if (
    f.paused ||
    (core && D.productionPause(s, core)) ||
    (core && core !== 'garden' && !s.guild.facilities[core].project)
  )
    return null;
  if (c.specialisation === 'necromancer' && f.supervision) return 'study';
  return f.role.animation === 'study' && f.role.output.aether ? 'distil' : f.role.animation;
}
export function paintHouseWorkstations(ctx, camera, s, time = 0) {
  for (const room of D.houseRooms) {
    const workers = s.guild.house.rooms[room.id].workers;
    if (!workers.some(Boolean) || !D.roomUnlocked(s, room)) continue;
    const role = D.roomForecast(s, room.id).role;
    const research = s.outside?.research?.room === room.id;
    const kind =
      !research && role.animation === 'study' && role.output.aether ? 'distil' : role.animation;
    const forecast = D.roomForecast(s, room.id);
    const supervisor = workers
      .map((id) => D.guildWorker(s, id))
      .find((c) => c?.specialisation === 'necromancer' && c.status === 'home' && !c.injury);
    if (supervisor && forecast.supervision && !forecast.paused) {
      const origin = D.workerStation(room, workers.indexOf(supervisor.id));
      ctx.save();
      ctx.strokeStyle = '#93cbbb';
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = 0.45 + Math.sin(time * 2) * 0.12;
      workers
        .map((id) => D.guildWorker(s, id))
        .filter((c) => c?.undead && c.status === 'home' && !c.injury)
        .slice(0, 2)
        .forEach((c) => {
          const target = D.workerStation(room, workers.indexOf(c.id));
          ctx.beginPath();
          ctx.moveTo(origin.x - camera, origin.y - 16);
          ctx.quadraticCurveTo(
            (origin.x + target.x) / 2 - camera,
            origin.y - 34,
            target.x - camera,
            target.y - 16,
          );
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(target.x - camera, target.y - 2, 12, 4, 0, 0, Math.PI * 2);
          ctx.stroke();
        });
      ctx.restore();
    }
    workers.forEach((id, slot) => {
      if (id) {
        const c = D.guildWorker(s, id);
        paintWorkstation(
          ctx,
          camera,
          D.workerStation(room, slot),
          research ||
            (c?.specialisation === 'necromancer' && D.roomForecast(s, room.id).supervision)
            ? 'study'
            : kind,
        );
      }
    });
  }
}
