import { routeItems } from './route-content.js';
import { readyRooms, recommissions } from './expedition-content.js';
import { craftingProgress } from './crafting-progression.js';
import { spendResources } from './resource-ledger.js';
export function householdState(opening = 'legacy') {
  return { version: 2, opening, rooms: opening === 'ready' ? [...readyRooms] : [] };
}
export function recommissionRoom(s, id, hooks) {
  const d = recommissions.find((d) => d.room === id);
  if (!d || s.household?.opening !== 'ready')
    throw Error('Choose a prebuilt room from the recommissioning plan.');
  if (s.household.rooms.includes(id)) throw Error('This room is already commissioned.');
  if (craftingProgress(s).count < d.designs)
    throw Error('Complete ' + d.designs + ' distinct workshop designs first.');
  const reason = recommissionError(s, id);
  if (reason) throw Error(reason);
  spendResources(s, { gold: d.gold, salvage: d.salvage }, hooks, 'Recommission ' + d.name);
  s.household.rooms.push(id);
  if (id === 'dryLanding') s.flags.stairs = true;
  if (id === 'cellar') s.flags.cellarDrained = true;
  s.scenes.push({
    title: 'Room recommissioned',
    body: d.name + ' is ready for a crew. Its production feeds shared stores.',
  });
}
export function validateHousehold(s) {
  const h = s.household,
    allowed = new Set([...readyRooms, ...recommissions.map((r) => r.room)]);
  if (
    !h ||
    h.version !== 2 ||
    !['ready', 'legacy'].includes(h.opening) ||
    !Array.isArray(h.rooms) ||
    new Set(h.rooms).size !== h.rooms.length ||
    h.rooms.some((id) => !allowed.has(id)) ||
    (h.opening === 'ready' && readyRooms.some((id) => !h.rooms.includes(id))) ||
    (h.opening === 'legacy' && h.rooms.length)
  )
    throw Error('Invalid ready-house save.');
}

export function recommissionError(s, id) {
  if (id === 'cellar' && !s.flags.stairs) return 'Recommission the cellar stair first';
  if (id === 'furnace' && !s.flags.dragonSlain)
    return 'Discover the old furnace and clear its guardian first';
  return null;
}
// Repair the first ready-house layout without granting plot completions or losing paid work.
export function migrateHousehold(s) {
  const h = s.household;
  if (!h || h.version !== 1) return;
  if (h.opening === 'ready') {
    const former = s.guild?.house?.rooms?.fenRoom1;
    const roof = s.guild?.house?.rooms?.towerCrown;
    if (former && roof) {
      roof.workers = [...former.workers];
      former.workers = former.workers.map(() => null);
      roof.progress += former.progress;
      former.progress = 0;
      roof.enabled = former.enabled;
      roof.decorations = former.decorations.map((uid, i) => uid || roof.decorations[i]);
      former.decorations = former.decorations.map(() => null);
      for (const id of roof.workers.filter(Boolean)) {
        s.residentPositions ||= {};
        s.residentPositions[id] = { x: 430 + roof.workers.indexOf(id) * 70, y: -100, floor: -100 };
      }
    }
    h.rooms = h.rooms.filter((id) => id !== 'fenRoom1');
    for (const id of readyRooms) if (!h.rooms.includes(id)) h.rooms.push(id);
    s.flags.breach = true;
    if (s.guild) {
      s.guild.unlocksAnnounced = (s.guild.unlocksAnnounced || []).filter(
        (id) =>
          routeItems.some((i) => i.id === id && s.flags[i.flag]) ||
          (id.startsWith('tool_') && s.guild.mechanisms?.includes(id.slice(5))),
      );
      s.guild.roomsAnnounced = [
        ...new Set([
          ...(s.guild.roomsAnnounced || []).filter((id) => id !== 'fenRoom1'),
          ...readyRooms,
        ]),
      ];
    }
    if (h.rooms.includes('cellar')) {
      s.flags.stairs = true;
      s.flags.cellarDrained = true;
      if (!h.rooms.includes('dryLanding')) h.rooms.push('dryLanding');
    }
  }
  h.version = 2;
}
