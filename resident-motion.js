import { passages, chambers } from './sprawl.js';
import { routeStatus } from './guild-routes.js';

const node = (p) => (p.floor === 140 && p.x > 700 ? 'store' : String(p.floor));
const position = (x, floor) => ({ x, y: floor, floor });
export function planResidentWalk(s, c, origin, target) {
  if (node(origin) === node(target)) return [walkLeg(origin, target)];
  const edges = [],
    add = (a, b, kind = 'stairs', both = true) => {
      edges.push({ from: node(a), to: node(b), a, b, kind });
      if (both) edges.push({ from: node(b), to: node(a), a: b, b: a, kind });
    };
  if (s.flags.repaired) add(position(850, 380), position(830, 140), 'door');
  if (s.flags.tower) {
    add(position(350, 380), position(350, 140));
    add(position(350, 140), position(350, -100));
  }
  if (s.flags.stairs && (c.id !== 'rowan' || s.flags.anchor || s.flags.cellarDrained))
    add(position(505, 380), position(535, 510));
  if (s.flags.cellarDrained || c.skills.includes('water'))
    add(position(550, 510), position(570, 555));
  if (s.flags.labyrinth) add(position(540, 510), position(530, 790), 'door');
  if (s.flags.labyrinthHeart) {
    add(position(530, 1020), position(530, 790), 'stairs', false);
    if (c.skills.some((k) => ['tracking', 'echoSight', 'threadwalk'].includes(k)))
      add(position(530, 790), position(530, 1020), 'stairs', false);
  }
  if (s.flags.dragonFound) add(position(875, 1020), position(350, 1250), 'door');
  for (const p of passages) {
    const destination = chambers.find((r) => r.id === p.to);
    if (routeStatus(s, p.id, c)?.ready && s.flags['discovered_' + p.to])
      add(position(p.x, p.y), position(destination.x + 70, destination.y), 'door', false);
  }
  for (const [id, back] of Object.entries(s.dungeonReturns || {})) {
    const r = chambers.find((r) => r.id === id);
    if (r && s.flags['discovered_' + id]) add(position(r.x + 48, r.y), back, 'door', false);
  }
  const queue = [{ at: node(origin), path: [] }],
    visited = new Set([node(origin)]);
  while (queue.length) {
    const next = queue.shift();
    if (next.at === node(target)) {
      const legs = [];
      let at = origin;
      for (const edge of next.path) {
        if (Math.abs(at.x - edge.a.x) > 1) legs.push(walkLeg(at, edge.a));
        legs.push({
          ...walkLeg(edge.a, edge.b),
          kind: edge.kind,
          duration: edge.kind === 'door' ? 0.8 : Math.max(0.6, Math.abs(edge.a.y - edge.b.y) / 150),
        });
        at = edge.b;
      }
      legs.push(walkLeg(at, target));
      return legs;
    }
    for (const edge of edges.filter((e) => e.from === next.at))
      if (!visited.has(edge.to)) {
        visited.add(edge.to);
        queue.push({ at: edge.to, path: [...next.path, edge] });
      }
  }
  return null;
}
const walkLeg = (a, b) => ({
  a: { ...a },
  b: { ...b },
  kind: 'walk',
  duration: Math.max(0.05, Math.min(6, Math.abs(b.x - a.x) / 180)),
});
export function walkSample(legs, elapsed) {
  let remaining = elapsed,
    lastFacing = legs[0]?.a.facing || 1;
  for (const leg of legs) {
    if (remaining < leg.duration) {
      const t = Math.max(0, remaining / leg.duration),
        facing = Math.sign(leg.b.x - leg.a.x) || lastFacing;
      if (leg.kind === 'door') {
        const p = t < 0.5 ? leg.a : leg.b;
        return {
          ...p,
          facing,
          opacity: Math.abs(t * 2 - 1),
          moving: false,
          kind: leg.kind,
          arrived: false,
        };
      }
      return {
        x: leg.a.x + (leg.b.x - leg.a.x) * t,
        y: leg.a.y + (leg.b.y - leg.a.y) * t,
        floor: t < 1 ? leg.a.floor : leg.b.floor,
        facing,
        opacity: 1,
        moving: true,
        kind: leg.kind,
        arrived: false,
      };
    }
    lastFacing = Math.sign(leg.b.x - leg.a.x) || lastFacing;
    remaining -= leg.duration;
  }
  return {
    ...legs.at(-1).b,
    facing: lastFacing,
    opacity: 1,
    moving: false,
    arrived: true,
  };
}
