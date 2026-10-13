import { rooms as storyRooms } from './narrative.js';
import { expansionRooms } from './expansion.js';
import { chambers, trapDisarmed } from './sprawl.js';
import { equipmentBonus } from './equipment.js';
import { classWorkFactor, talentValue } from './classes.js';

export const materials = [
  { id: 'timber', name: 'Timber', symbol: '▰' },
  { id: 'ore', name: 'Ore', symbol: '◆' },
  { id: 'herbs', name: 'Herbs', symbol: '❧' },
  { id: 'cloth', name: 'Cloth', symbol: '▧' },
  { id: 'aether', name: 'Aether', symbol: '✧' },
  { id: 'components', name: 'Brass components', symbol: '⚙' },
];
export const activities = {
  timber: { name: 'Reclaim timber', stat: 'str', work: 4, output: { timber: 2 }, animation: 'saw' },
  ore: {
    name: 'Sort and smelt ore',
    stat: 'str',
    work: 4,
    output: { ore: 2 },
    animation: 'hammer',
  },
  herbs: {
    name: 'Tend medicinal herbs',
    stat: 'int',
    work: 4,
    output: { herbs: 2 },
    animation: 'garden',
  },
  cloth: {
    name: 'Mend and weave cloth',
    stat: 'agi',
    work: 4,
    output: { cloth: 2 },
    animation: 'sew',
  },
  aether: {
    name: 'Distil aether',
    stat: 'int',
    work: 6,
    output: { aether: 1 },
    animation: 'study',
  },
  salvage: {
    name: 'Recover usable fittings',
    stat: 'agi',
    work: 4,
    output: { salvage: 2 },
    animation: 'sort',
  },
  supplies: {
    name: 'Pack expedition supplies',
    stat: 'end',
    work: 4,
    inputs: { herbs: 1 },
    output: { supplies: 2 },
    animation: 'pack',
  },
  accounts: {
    name: 'Take local guild commissions',
    stat: 'int',
    work: 4,
    output: { gold: 6 },
    animation: 'study',
  },
  watch: { name: 'Keep the home watch', stat: 'end', work: 0, output: {}, animation: 'watch' },
  workshop: {
    name: 'Craft equipment and furnishings',
    stat: 'str',
    work: 0,
    output: {},
    animation: 'hammer',
  },
  garden: {
    name: 'Grow expedition supplies',
    stat: 'int',
    work: 4,
    output: { supplies: 2 },
    animation: 'garden',
  },
  infirmary: {
    name: 'Treat injured companions',
    stat: 'end',
    work: 2,
    output: {},
    animation: 'care',
  },
};
export const medicalRoomIds = ['fenRoom2', 'frostRoom3', 'deepRoom1', 'starRoom1'];
const base = [
  ['entrance', 'Entrance', 55, 380, 230, 'watch', 2],
  ['quarters', 'Quarters', 285, 380, 190, 'cloth', 2],
  ['corridor', 'Service corridor', 475, 380, 230, 'timber', 1],
  ['service', 'Workshop', 705, 380, 270, 'workshop', 3, 'repaired'],
  ['landing', 'Returned landing', 975, 380, 290, 'accounts', 2, 'anchor'],
  ['store', 'Store room', 705, 140, 270, 'salvage', 2, 'repaired'],
  ['tower', 'Bell tower landing', 300, 140, 390, 'aether', 2, 'tower'],
  ['towerCrown', 'Silent crown', 300, -100, 610, 'aether', 2, 'towerCrown'],
  ['dryLanding', 'Dry cellar landing', 520, 510, 45, 'salvage', 1, 'stairs'],
  ['cellar', 'Drained cellar', 430, 555, 390, 'timber', 2, 'cellarDrained'],
  ['labyrinthPaths', 'Borrowed labyrinth paths', 300, 790, 610, 'salvage', 3, 'labyrinth'],
  ['labyrinth', 'Map-maker’s labyrinth', 300, 1020, 610, 'aether', 3, 'labyrinthHeart'],
  ['furnace', 'Old furnace', 300, 1250, 610, 'ore', 3, 'dragonSlain'],
];
const regionalRoles = {
  fen: ['timber', 'herbs', 'supplies', 'salvage'],
  ash: ['ore', 'supplies', 'watch', 'aether'],
  glass: ['aether', 'aether', 'supplies', 'accounts'],
  root: ['herbs', 'supplies', 'herbs', 'accounts'],
  frost: ['aether', 'cloth', 'aether', 'supplies'],
  clock: ['ore', 'accounts', 'watch', 'aether'],
  deep: ['salvage', 'supplies', 'aether', 'accounts'],
  star: ['aether', 'supplies', 'watch', 'herbs'],
};
const dungeonRoles = {
  sluice: 'ore',
  cells: 'cloth',
  ratway: 'salvage',
  crypt: 'aether',
  ossuary: 'aether',
  maze: 'timber',
  oubliette: 'ore',
  vault: 'ore',
  fungus: 'herbs',
  rift: 'aether',
  study: 'aether',
  potions: 'herbs',
  mirror: 'aether',
  summoning: 'aether',
  menagerie: 'cloth',
  orrery: 'aether',
  storm: 'aether',
  stars: 'aether',
};
export const houseRooms = [
  ...base.map(([id, name, x, y, w, activity, capacity, flag]) => ({
    id,
    name,
    x,
    y,
    w,
    activity,
    capacity,
    flag,
    kind: 'base',
  })),
  ...[...storyRooms, ...expansionRooms].map((r) => ({
    ...r,
    y: 380,
    capacity: 2,
    activity:
      r.id === 'garden'
        ? 'garden'
        : r.region
          ? regionalRoles[r.region][Number(r.id.at(-1))]
          : r.id === 'threshold'
            ? 'watch'
            : 'aether',
    kind: 'returned',
    flag: r.operational,
  })),
  {
    id: 'hospice',
    name: 'Greenhouse hospice',
    x: 1555,
    y: 380,
    w: 110,
    capacity: 2,
    activity: 'infirmary',
    flag: 'hospice',
    kind: 'hospice',
  },
  ...chambers.map((r) => ({
    ...r,
    kind: 'chamber',
    capacity: r.w >= 850 ? 3 : 2,
    activity: dungeonRoles[r.id],
  })),
];
export function facilityRoom(s, id) {
  if (id === 'workshop') return 'service';
  if (id === 'garden') return 'garden';
  return s.flags.garden && s.flags.hospice
    ? 'hospice'
    : medicalRoomIds.find((r) => s.flags[r + 'Ready']) || null;
}
export function coreFacility(s, id) {
  return ['workshop', 'garden', 'infirmary'].find((f) => facilityRoom(s, f) === id) || null;
}
export function roomUnlocked(s, r) {
  if (r.kind === 'chamber') return !!s.flags['discovered_' + r.id];
  if (r.kind === 'hospice') return !!s.flags.garden && !!s.flags.hospice;
  return !r.flag || !!s.flags[r.flag];
}
export function roomPause(s, r) {
  if (!roomUnlocked(s, r)) return 'Discover or restore this room first';
  if (r.kind === 'chamber') {
    if (r.encounter && !s.flags['cleared_' + r.id]) return 'Clear the guardian first';
    if (r.trap && !trapDisarmed(s, r)) return 'Disarm the trap first';
    if (!s.flags['searched_' + r.id]) return 'Search and secure the room first';
  }
  if (s.damagedRooms?.[r.id === 'hospice' ? 'garden' : r.id]) return 'Repair the room first';
  return null;
}
export function houseState() {
  return {
    version: 1,
    materials: Object.fromEntries(materials.map((m) => [m.id, 0])),
    rooms: Object.fromEntries(
      houseRooms.map((r) => [
        r.id,
        {
          workers: Array(r.capacity).fill(null),
          decorations: [null, null],
          progress: 0,
          enabled: true,
        },
      ]),
    ),
    mara: { tier: 1, defend: true },
  };
}
export function syncFacilityWorkers(s) {
  for (const id of ['workshop', 'garden', 'infirmary']) {
    const room = facilityRoom(s, id);
    s.guild.facilities[id].worker = room ? s.guild.house.rooms[room].workers[0] : null;
  }
}
export function migrateHouse(s) {
  s.guild.house = houseState();
  for (const id of ['workshop', 'garden', 'infirmary']) {
    const room = facilityRoom(s, id);
    if (room && s.guild.facilities[id].worker)
      s.guild.house.rooms[room].workers[0] = s.guild.facilities[id].worker;
  }
}
export function roomAtPosition(s, p) {
  return (
    houseRooms.find(
      (r) =>
        r.kind === 'hospice' &&
        p.floor === r.y &&
        p.x >= r.x &&
        p.x < r.x + r.w &&
        roomUnlocked(s, r),
    ) ||
    houseRooms.find(
      (r) =>
        r.kind !== 'hospice' &&
        p.floor === r.y &&
        p.x >= r.x &&
        p.x < r.x + r.w &&
        roomUnlocked(s, r),
    )
  );
}
export function workerStation(r, index) {
  if (r.id === 'dryLanding') return { x: 540, y: r.y, floor: r.y };
  if (r.id === 'cellar') return { x: 570 + index * 65, y: r.y, floor: r.y };
  if (r.id === 'service') return { x: 820 + index * 35, y: r.y, floor: r.y };
  if (r.id === 'garden') return { x: 1710 + index * 45, y: r.y, floor: r.y };
  if (r.id === 'hospice') return { x: 1590 + index * 45, y: r.y, floor: r.y };
  return {
    x:
      r.x +
      Math.min(r.w - 25, Math.max(70, r.w * (r.kind === 'chamber' ? 0.55 : 0.42)) + index * 40),
    y: r.y,
    floor: r.y,
  };
}
export function assignedRoom(s, id) {
  return houseRooms.find((r) => s.guild.house.rooms[r.id].workers.includes(id)) || null;
}
export function assignRoomWorker(s, roomId, slot, id) {
  const r = houseRooms.find((r) => r.id === roomId),
    state = s.guild.house.rooms[roomId];
  if (!r || roomPause(s, r)) throw Error(r ? roomPause(s, r) : 'Unknown room');
  if (!Number.isInteger(slot) || slot < 0 || slot >= r.capacity)
    throw Error('Choose a worker slot in this room');
  if (id !== null && !s.roster.some((c) => c.id === id && !['dead', 'departed'].includes(c.status)))
    throw Error('Choose a living guild companion');
  if (id)
    for (const room of Object.values(s.guild.house.rooms))
      room.workers = room.workers.map((worker) => (worker === id ? null : worker));
  state.workers[slot] = id;
  syncFacilityWorkers(s);
  if (id) {
    s.residentPositions ||= {};
    s.residentPositions[id] = workerStation(r, slot);
  }
}
export function settleResident(s, id, p) {
  if (id === 'rowan') return null;
  const c = s.roster.find((c) => c.id === id);
  if (!c || c.status !== 'home' || c.injury) return null;
  const r = roomAtPosition(s, p),
    current = assignedRoom(s, id);
  if (r?.id === current?.id) return r;
  if (current) {
    const old = s.guild.house.rooms[current.id];
    old.workers = old.workers.map((w) => (w === id ? null : w));
    syncFacilityWorkers(s);
  }
  if (!r || roomPause(s, r)) return null;
  const slot = s.guild.house.rooms[r.id].workers.indexOf(null);
  if (slot < 0) return null;
  assignRoomWorker(s, r.id, slot, id);
  return r;
}
export function reconcileHouse(s) {
  for (const room of Object.values(s.guild.house.rooms))
    room.workers = room.workers.map((id) =>
      id && !s.roster.some((c) => c.id === id && !['dead', 'departed'].includes(c.status))
        ? null
        : id,
    );
  syncFacilityWorkers(s);
}
export function workerContribution(c, stat) {
  const effective = Math.floor(
    (c[stat] + equipmentBonus(c, stat) + talentValue(c, stat)) * classWorkFactor(c),
  );
  return {
    id: c.id,
    name: c.name,
    status: c.status,
    stat: effective,
    fit: c.status === 'home' && !c.injury,
    work: c.status === 'home' && !c.injury ? 1 + Math.min(4, Math.floor(effective / 10)) : 0,
  };
}
export function roomForecast(s, id, excluded = []) {
  const r = houseRooms.find((r) => r.id === id),
    state = s.guild.house.rooms[id];
  const core = coreFacility(s, id),
    baseRole = activities[core || r.activity];
  const workers = state.workers
    .map((id) => s.roster.find((c) => c.id === id))
    .filter(Boolean)
    .map((c) =>
      excluded.includes(c.id)
        ? { ...workerContribution(c, baseRole.stat), fit: false, work: 0 }
        : workerContribution(c, baseRole.stat),
    );
  const quality =
    r.id === 'furnace'
      ? 3
      : r.kind === 'chamber'
        ? r.depth >= 5
          ? 3
          : r.depth >= 3
            ? 2
            : 1
        : r.region
          ? Number(r.id.at(-1)) >= 2
            ? 3
            : 2
          : 1;
  const bestStat = Math.max(0, ...workers.filter((w) => w.fit).map((w) => w.stat));
  const yieldBonus =
    !core && baseRole.work && quality > 1
      ? Number(bestStat >= 20) + Number(quality >= 3 && bestStat >= 30)
      : 0;
  const role = {
    ...baseRole,
    output: Object.fromEntries(
      Object.entries(baseRole.output).map(([id, n]) => [id, n + yieldBonus]),
    ),
  };
  const work = workers.reduce((n, c) => n + c.work, 0);
  const shortage = Object.entries(role.inputs || {}).find(
    ([id, n]) => s.guild.house.materials[id] < n,
  );
  const paused =
    roomPause(s, r) ||
    (role.animation === 'watch' && !s.guild.house.mara.defend && 'Home watch stood down') ||
    (!state.enabled && 'Room production paused') ||
    (!work && 'No fit workers at home') ||
    (shortage && 'Waiting for ' + shortage[0]) ||
    null;
  return {
    room: r,
    core,
    role,
    quality,
    yieldBonus,
    bestStat,
    workers,
    work: paused ? 0 : work,
    paused,
    days: !paused && role.work ? Math.ceil((role.work - state.progress) / work) : null,
  };
}
export function setRoomProduction(s, id, enabled) {
  const r = houseRooms.find((r) => r.id === id);
  if (!r || !roomUnlocked(s, r) || typeof enabled !== 'boolean' || coreFacility(s, id))
    throw Error('Choose a production room');
  s.guild.house.rooms[id].enabled = enabled;
}
export function awardHomeXP(s, workers, hooks) {
  for (const c of workers)
    if (!s.guild.homeXP.workers.includes(c.id)) {
      hooks.awardXP(s, c, 5);
      s.guild.homeXP.workers.push(c.id);
    }
}
export function advanceHouse(s, hooks) {
  const lines = [];
  for (const r of houseRooms) {
    if (!roomUnlocked(s, r) || coreFacility(s, r.id)) continue;
    const f = roomForecast(s, r.id),
      state = s.guild.house.rooms[r.id];
    if (f.paused || !f.role.work) continue;
    state.progress = Math.min(f.role.work, state.progress + f.work);
    if (state.progress < f.role.work) {
      lines.push(r.name + ': ' + state.progress + '/' + f.role.work + ' work');
      continue;
    }
    for (const [id, n] of Object.entries(f.role.inputs || {})) s.guild.house.materials[id] -= n;
    for (const [id, n] of Object.entries(f.role.output)) {
      if (id === 'gold') hooks.earn(s, n, r.name + ' production');
      else if (['salvage', 'supplies'].includes(id)) s.guild[id] += n;
      else s.guild.house.materials[id] += n;
    }
    state.progress = 0;
    const workers = f.workers.filter((w) => w.fit).map((w) => s.roster.find((c) => c.id === w.id));
    awardHomeXP(s, workers, hooks);
    const label =
      r.name +
      ': ' +
      Object.entries(f.role.output)
        .map(([id, n]) => '+' + n + ' ' + (id === 'salvage' ? 'scrap' : id))
        .join(', ');
    lines.push(label);
    s.guild.completions.push({
      id: ++s.guild.nextCompletion,
      day: s.day,
      facility: 'room:' + r.id,
      text: label,
    });
  }
  return lines;
}
export function maraPower(s, excluded = []) {
  if (!s.guild.house.mara.defend) return 0;
  return (
    (s.guild.house.mara.tier - 1) * 4 +
    houseRooms
      .filter((r) => r.activity === 'watch')
      .reduce((sum, r) => sum + roomForecast(s, r.id, excluded).work * 2, 0)
  );
}
export const materialRecipes = [
  ...[
    ['shortSword', { ore: 2, timber: 1 }, 20, 4, 'weapon'],
    ['huntingBow', { timber: 2, cloth: 1 }, 20, 4, 'weapon'],
    ['ashStaff', { timber: 2, aether: 1 }, 20, 4, 'weapon'],
    ['buckler', { timber: 1, ore: 1 }, 15, 3, 'armour'],
    ['paddedCoat', { cloth: 2, herbs: 1 }, 20, 4, 'armour'],
    ['leatherCap', { cloth: 1, ore: 1 }, 10, 3, 'armour'],
    ['softShoes', { cloth: 1, timber: 1 }, 10, 3, 'armour'],
  ].map(([item, materials, gold, work, category]) => ({
    id: 'materials_' + item,
    item,
    materials,
    gold,
    work,
    category,
  })),
  ...[
    ['banner', { cloth: 2 }],
    ['rug', { cloth: 2 }],
    ['plant', { herbs: 1, timber: 1 }],
    ['shelf', { timber: 2, cloth: 1 }],
  ].map(([furniture, materials]) => ({
    id: 'materials_' + furniture,
    furniture,
    materials,
    gold: 5,
    work: 2,
    category: 'furniture',
  })),
  {
    id: 'brassComponents',
    name: 'Brass components',
    materials: { ore: 3, aether: 1 },
    gold: 15,
    work: 4,
    category: 'material',
    materialOutput: { components: 2 },
  },
  {
    id: 'salvageBundle',
    name: 'Usable fittings',
    materials: { timber: 2, ore: 1 },
    gold: 10,
    work: 4,
    category: 'material',
    resourceOutput: { salvage: 4 },
  },
  {
    id: 'supplyPacks',
    name: 'Expedition supply packs',
    materials: { herbs: 2, cloth: 1 },
    gold: 5,
    work: 3,
    category: 'material',
    resourceOutput: { supplies: 2 },
  },
  ...[2, 3, 4].map((tier) => ({
    id: 'maraTier' + tier,
    name: ['', '', 'Reinforce Mara', 'Mara sentry frame', 'Mara runic guard'][tier],
    maraTier: tier,
    materials:
      tier === 2
        ? { components: 2, ore: 4, timber: 2 }
        : tier === 3
          ? { components: 4, ore: 6, aether: 2 }
          : { components: 6, ore: 10, aether: 4 },
    gold: tier === 2 ? 40 : tier === 3 ? 90 : 160,
    work: tier === 2 ? 4 : 6,
    category: 'mara',
  })),
].map((r) => ({ ...r, salvage: 0, facility: 'workshop' }));
export function validateHouse(s, furniturePlaced) {
  const h = s.guild.house,
    bad = () => {
      throw Error('Invalid house-room management save data.');
    };
  const integer = (n) => Number.isSafeInteger(n) && n >= 0;
  if (
    !h ||
    h.version !== 1 ||
    !h.materials ||
    Object.keys(h.materials).length !== materials.length ||
    materials.some((m) => !integer(h.materials[m.id])) ||
    !h.rooms ||
    Object.keys(h.rooms).length !== houseRooms.length ||
    !h.mara ||
    ![1, 2, 3, 4].includes(h.mara.tier) ||
    typeof h.mara.defend !== 'boolean'
  )
    bad();
  const assigned = new Set();
  for (const r of houseRooms) {
    const room = h.rooms[r.id];
    if (
      !room ||
      !Array.isArray(room.workers) ||
      room.workers.length !== r.capacity ||
      !Array.isArray(room.decorations) ||
      room.decorations.length !== 2 ||
      !integer(room.progress) ||
      (activities[r.activity].work
        ? room.progress >= activities[r.activity].work
        : room.progress !== 0) ||
      typeof room.enabled !== 'boolean'
    )
      bad();
    for (const id of room.workers)
      if (id !== null) {
        if (!s.roster.some((c) => c.id === id) || assigned.has(id)) bad();
        assigned.add(id);
      }
    for (const uid of room.decorations)
      if (uid !== null) {
        if (coreFacility(s, r.id)) bad();
        const item = s.guild.furniture.find((f) => f.uid === uid);
        if (!item || furniturePlaced.has(uid)) bad();
        furniturePlaced.add(uid);
      }
  }
  for (const id of ['workshop', 'garden', 'infirmary']) {
    const room = facilityRoom(s, id);
    if (s.guild.facilities[id].worker !== (room ? h.rooms[room].workers[0] : null)) bad();
  }
}
