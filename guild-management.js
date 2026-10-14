import {
  craftingProgress,
  recordCraft,
  migrateCrafting,
  validateCrafting,
} from './crafting-progression.js';
export { craftingProgress } from './crafting-progression.js';
import { crewContribution } from './workforce.js';
import { effectiveWorkStat } from './workforce.js';
export { effectiveWorkStat } from './workforce.js';
import {
  recipeCosts,
  resourceShortfalls,
  spendResources,
  refundResources,
  creditResources,
} from './resource-ledger.js';
import {
  facilities,
  medicalRooms,
  furnishings,
  recipes,
  expeditionAreas,
  guildMissions,
  guildProfiles,
} from './guild-content.js';
export {
  facilities,
  furnishings,
  recipes,
  expeditionAreas,
  guildMissions,
  guildProfiles,
} from './guild-content.js';
import { furnitureEffects } from './furnishing-upgrades.js';
import { itemDefinition, equippedItems } from './equipment.js';
import * as H from './house-rooms.js';
import * as E from './guild-economy.js';
import * as R from './guild-routes.js';
import { guildWorker } from './guild-workers.js';
export { guildWorker, guildWorkers } from './guild-workers.js';
export { resources, resourceStock, recipeKnown, patternRecipes } from './guild-economy.js';
export {
  houseRooms,
  materials,
  activities,
  roomUnlocked,
  roomPause,
  roomForecast,
  assignedRoom,
  workerStation,
  facilityRoom,
  coreFacility,
  maraPower,
  workerContribution,
  workerAssignmentError,
} from './house-rooms.js';

export function facilitySite(s, id) {
  if (id === 'workshop') return s.flags.repaired ? 'service' : null;
  if (id === 'garden') return s.flags.garden ? 'garden' : null;
  if (id === 'infirmary') {
    if (s.flags.garden && s.flags.hospice) return 'garden';
    return medicalRooms.find((r) => s.flags[r + 'Ready']) || null;
  }
  return null;
}
export function managementState() {
  return {
    version: 9,
    crafting: { completed: [] },
    patterns: [],
    readPatterns: [],
    mechanisms: [],
    solvedRoutes: {},
    seenRoutes: [],
    readyRoutes: [],
    readRoutes: [],
    unlocksAnnounced: [],
    roomsAnnounced: [],
    house: H.houseState(),
    salvage: 6,
    supplies: 4,
    nextFurniture: 0,
    nextOrder: 0,
    gardenPolicy: { mode: 'continuous', reserve: 8 },
    carePolicy: { mode: 'manual', priority: 'longest', reserve: 2 },
    furniture: [],
    blueprints: [],
    trophies: [],
    facilities: Object.fromEntries(
      facilities.map((f) => [
        f.id,
        {
          tier: 1,
          worker: null,
          project: null,
          utility: null,
          decorations: [null, null],
          ...(f.id === 'workshop' ? { queue: [] } : {}),
        },
      ]),
    ),
    nextCompletion: 0,
    readCompletion: 0,
    completions: [],
    homeXP: { day: 1, workers: [] },
    dailySummary: null,
  };
}
export function reconcileAssignments(s) {
  if (s.guild.house) H.reconcileHouse(s);
  for (const f of Object.values(s.guild.facilities))
    if (
      f.worker &&
      (!guildWorker(s, f.worker) || ['dead', 'departed'].includes(guildWorker(s, f.worker).status))
    )
      f.worker = null;
}
export function grantFurniture(s, id) {
  const item = { uid: 'furniture-' + ++s.guild.nextFurniture, id };
  s.guild.furniture.push(item);
  return item;
}
export function grantTrophies(s) {
  const gained = [];
  for (const def of furnishings.filter((f) => f.trophy)) {
    if (s.flags[def.trophy] && !s.guild.trophies.includes(def.id)) {
      s.guild.trophies.push(def.id);
      grantFurniture(s, def.id);
      gained.push(def.id);
    }
  }
  return gained;
}
export function migrateManagement(s) {
  if (s.guild === undefined) s.guild = managementState();
  const legacy = s.guild.version < 8;
  if (s.guild.version < 9 && s.guild.house?.materials)
    for (const id of ['briarHorn', 'briarSample', 'flameKit']) s.guild.house.materials[id] ??= 0;
  validateManagement(s);
  if (s.guild.version === 1) {
    s.guild.nextOrder = 0;
    s.guild.facilities.workshop.queue = [];
    s.guild.gardenPolicy = { mode: 'continuous', reserve: 8 };
    s.guild.version = 2;
  }
  // Version 3 adds item reservations to workshop conversions, without changing existing work.
  if (s.guild.version === 2) s.guild.version = 3;
  if (s.guild.version === 3) {
    s.guild.carePolicy = { mode: 'manual', priority: 'longest', reserve: 2 };
    s.guild.version = 4;
  }
  if (s.guild.version === 4) {
    H.migrateHouse(s);
    s.guild.version = 5;
  }
  if (s.guild.version === 5) {
    s.guild.patterns = [];
    s.guild.readPatterns = [];
    s.guild.version = 6;
  }
  if (s.guild.version === 6) {
    s.guild.version = 7;
    R.initialiseRoutes(s);
  }
  if (s.guild.version === 7) {
    migrateCrafting(s);
    s.guild.version = 8;
  }
  if (s.guild.version === 8) s.guild.version = 9;
  reconcileAssignments(s);
  grantTrophies(s);
  if (legacy) E.discoverPatterns(s, true);
}
export function discoverPatterns(s, quiet = false) {
  return E.discoverPatterns(s, quiet);
}
export function sellResource(s, id, quantity, hooks) {
  E.sellResource(s, id, quantity, hooks);
}
export function utilityDefinition(s, id) {
  const uid = s.guild.facilities[id].utility;
  return furnishings.find((f) => f.id === s.guild.furniture.find((i) => i.uid === uid)?.id);
}
export function facilityAvailable(s, id) {
  const site = facilitySite(s, id);
  return !!site && !s.damagedRooms?.[site];
}
export function productionPause(s, id) {
  if (!facilityAvailable(s, id))
    return facilitySite(s, id) ? 'Room damaged' : 'Facility unavailable';
  if (id === 'garden') {
    const policy = s.guild.gardenPolicy;
    if (policy?.mode === 'paused') return 'Farming paused';
    if (policy?.mode === 'reserve' && s.guild.supplies >= policy.reserve)
      return 'Supply reserve met';
  }
  return null;
}
export function workBreakdown(s, id, recipe = null, workerId = s.guild.facilities[id]?.worker) {
  const def = facilities.find((f) => f.id === id),
    f = s.guild.facilities[id];
  const worker = guildWorker(s, workerId);
  const fit = !!worker && worker.status === 'home' && !worker.injury;
  const utility = utilityDefinition(s, id)?.id;
  const stats = worker ? effectiveWorkStat(worker, def.stat) : null;
  const room = H.facilityRoom(s, id),
    crew = s.guild.house && room ? s.guild.house.rooms[room].workers.slice(1) : [];
  const crewResidents = [
    worker,
    ...crew.filter((id) => id !== workerId).map((id) => guildWorker(s, id)),
  ].filter(Boolean);
  const contextual = crewContribution(s, crewResidents, def.stat);
  const contributions = contextual.workers;
  const effects = furnitureEffects(s, [f.utility, ...f.decorations]);
  const staffed = contributions.some((c) => c.fit);
  const parts = {
    mara: 0,
    upgrade: f.tier - 1,
    worker: contributions.filter((c) => c.fit).length,
    stat: contributions.reduce((n, c) => n + Math.max(0, c.work - Number(c.fit)), 0),
    utility: staffed
      ? Number(utility === 'forge' && recipe?.category === 'weapon') +
        (recipe?.category === 'weapon' ? effects.weaponWork || 0 : 0) +
        (effects.workshopWork || 0)
      : 0,
    relationship: contextual.relationship,
    supervision: contextual.supervision,
    tools:
      id === 'workshop'
        ? contributions
            .filter((c) => c.fit)
            .reduce(
              (n, c) =>
                n +
                equippedItems(guildWorker(s, c.id)).reduce(
                  (v, item) => v + (item.houseWork || 0),
                  0,
                ),
              0,
            )
        : 0,
  };
  parts.mastery = id === 'workshop' && staffed ? craftingProgress(s).bonus : 0;
  const potential = staffed
    ? Math.max(
        1,
        Object.values(parts).reduce((sum, value) => sum + value, 0),
      )
    : 0;
  const paused = productionPause(s, id) || (!potential && 'No fit workers at home') || null;
  return {
    ...parts,
    potential,
    total: paused ? 0 : potential,
    paused,
    workerStat: stats,
    workerId: worker?.id || null,
    workerFit: fit,
    crew: contributions,
    leadWork: contributions.find((c) => c.id === worker?.id)?.work || 0,
  };
}
export function dailyWork(s, id, recipe = null) {
  return workBreakdown(s, id, recipe).total;
}
export function projectForecast(s, id, workerId = s.guild.facilities[id]?.worker) {
  const project = s.guild.facilities[id].project;
  const next = !project && id === 'workshop' ? s.guild.facilities.workshop.queue?.[0] : null;
  const recipe = project
    ? projectRecipe(s, id, project.recipe)
    : next
      ? projectRecipe(s, id, next.recipe)
      : id === 'garden'
        ? projectRecipe(s, id, 'crop')
        : id === 'infirmary' && carePlan(s, workerId).patients.length
          ? projectRecipe(s, id, 'treatment')
          : null;
  const work = workBreakdown(s, id, recipe, workerId);
  const fundingPause = next && resourceShortfall(s, recipe).length ? 'Waiting for resources' : null;
  const remaining = project ? project.work - project.progress : recipe?.work;
  const days =
    remaining !== undefined && work.total && !fundingPause
      ? Math.ceil(remaining / work.total)
      : null;
  return {
    ...work,
    total: fundingPause ? 0 : work.total,
    paused: fundingPause || work.paused,
    scope: project
      ? id === 'infirmary'
        ? 'current treatment'
        : 'current item'
      : next
        ? 'next ordered item'
        : id === 'infirmary'
          ? 'treatment'
          : 'crop',
    days,
    completionDay: days === null ? null : s.day + days,
  };
}
export function roomWorkAbsence(s, ids) {
  return H.houseRooms.flatMap((room) => {
    if (!s.guild.house.rooms[room.id].workers.some((id) => ids.includes(id))) return [];
    const id = H.coreFacility(s, room.id);
    const before = id ? projectForecast(s, id) : H.roomForecast(s, room.id);
    const copy = {
      ...s,
      guild: {
        ...s.guild,
        house: {
          ...s.guild.house,
          rooms: {
            ...s.guild.house.rooms,
            [room.id]: {
              ...s.guild.house.rooms[room.id],
              workers: s.guild.house.rooms[room.id].workers.map((w) =>
                ids.includes(w) ? null : w,
              ),
            },
          },
        },
        facilities: {
          ...s.guild.facilities,
          ...(id
            ? {
                [id]: {
                  ...s.guild.facilities[id],
                  worker: ids.includes(s.guild.facilities[id].worker)
                    ? null
                    : s.guild.facilities[id].worker,
                },
              }
            : {}),
        },
      },
    };
    const after = id ? projectForecast(copy, id) : H.roomForecast(copy, room.id);
    if (!id) {
      before.total = before.work;
      after.total = after.work;
    }
    if (before.total === after.total) return [];
    return [
      {
        facility: id || room.id,
        name: room.name,
        worker: s.guild.house.rooms[room.id].workers.find((w) => ids.includes(w)),
        before: before.total,
        after: after.total,
        beforeDays: before.days,
        afterDays: after.days,
        scope: before.scope || 'production cycle',
      },
    ];
  });
}
export function resourceShortfall(s, inputs) {
  return resourceShortfalls(s, recipeCosts(inputs));
}
export function setGardenPolicy(s, mode, reserve = s.guild.gardenPolicy.reserve) {
  if (!facilitySite(s, 'garden')) throw Error('Restore the greenhouse before managing crops.');
  if (
    !['continuous', 'reserve', 'paused'].includes(mode) ||
    !Number.isSafeInteger(reserve) ||
    reserve < 1
  )
    throw Error('Choose a farming mode and a positive whole-number reserve.');
  s.guild.gardenPolicy = { mode, reserve };
}
export function setCarePolicy(s, mode, priority, reserve) {
  if (!facilitySite(s, 'infirmary')) throw Error('Restore an infirmary before planning care.');
  if (
    !['manual', 'auto'].includes(mode) ||
    !['longest', 'soonest'].includes(priority) ||
    !Number.isSafeInteger(reserve) ||
    reserve < 0 ||
    reserve >= Number.MAX_SAFE_INTEGER - 2
  )
    throw Error(
      'Choose a care mode, patient priority and a nonnegative whole-number supply reserve.',
    );
  s.guild.carePolicy = { mode, priority, reserve };
}
export function queueWorkshopOrder(s, recipeId, quantity = 1) {
  if (!facilitySite(s, 'workshop')) throw Error('Restore the workshop before planning orders.');
  const recipe = projectRecipe(s, 'workshop', recipeId);
  if (recipe.sourceEquipment || recipe.sourceFurniture || recipe.reclaim)
    throw Error('Choose a specific stored item to refit or reclaim.');
  if (recipe.maraTier) throw Error('Upgrade Mara as an individual workshop project.');
  if (recipe.routeTool)
    throw Error('Build a door mechanism as an individual project; the guild needs one copy.');
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99)
    throw Error('Choose between 1 and 99 items per order.');
  if (!Number.isSafeInteger(s.guild.nextOrder + 1)) throw Error('Workshop order limit reached.');
  const order = {
    uid: 'order-' + ++s.guild.nextOrder,
    recipe: recipeId,
    quantity,
    remaining: quantity,
  };
  s.guild.facilities.workshop.queue.push(order);
  return order.uid;
}
export function removeWorkshopOrder(s, uid) {
  const queue = s.guild.facilities.workshop.queue;
  const index = queue.findIndex((o) => o.uid === uid);
  if (index < 0) throw Error('This planned order no longer exists.');
  queue.splice(index, 1);
}
export function moveWorkshopOrder(s, uid, direction) {
  const queue = s.guild.facilities.workshop.queue;
  const index = queue.findIndex((o) => o.uid === uid);
  if (index < 0 || !['up', 'down'].includes(direction))
    throw Error('Choose a planned order and its new priority.');
  const target = index + (direction === 'up' ? -1 : 1);
  if (target < 0 || target >= queue.length) return;
  [queue[index], queue[target]] = [queue[target], queue[index]];
}
export function workshopQueueForecast(s) {
  const f = s.guild.facilities.workshop;
  const active = f.project ? projectForecast(s, 'workshop') : null;
  const budget = {
    gold: s.gold,
    salvage: s.guild.salvage,
    supplies: s.guild.supplies,
    ...s.guild.house.materials,
  };
  let days = active?.days || 0,
    blocked = !facilityAvailable(s, 'workshop') || (!!active && active.days === null);
  return f.queue.map((order) => {
    const recipe = projectRecipe(s, 'workshop', order.recipe);
    const cost = {
      gold: recipe.gold * order.remaining,
      salvage: recipe.salvage * order.remaining,
      supplies: recipe.supplies * order.remaining,
      materials: Object.fromEntries(
        Object.entries(recipe.materials).map(([id, n]) => [id, n * order.remaining]),
      ),
    };
    const unitCosts = recipeCosts(recipe);
    const allCosts = recipeCosts(recipe, order.remaining);
    const affordableUnits = Math.min(
      order.remaining,
      ...Object.keys(unitCosts)
        .filter((key) => unitCosts[key] > 0)
        .map((key) => Math.floor(budget[key] / unitCosts[key])),
    );
    const shortfall = Object.keys(allCosts)
      .filter((key) => allCosts[key] > budget[key])
      .map((key) => ({ resource: key, amount: allCosts[key] - budget[key] }));
    for (const key of Object.keys(allCosts)) budget[key] = Math.max(0, budget[key] - allCosts[key]);
    const rate = dailyWork(s, 'workshop', recipe);
    days += rate ? Math.ceil(recipe.work / rate) * order.remaining : 0;
    blocked ||= !!shortfall.length || !rate;
    return {
      ...order,
      cost,
      affordableUnits,
      shortfall,
      days: blocked ? null : days,
      completionDay: blocked ? null : s.day + days,
    };
  });
}
function startQueuedProject(s, hooks) {
  const f = s.guild.facilities.workshop,
    order = f.queue[0];
  if (!order || f.project || !facilityAvailable(s, 'workshop')) return null;
  const r = projectRecipe(s, 'workshop', order.recipe);
  if (!dailyWork(s, 'workshop', r)) return 'Workshop: assign a fit crew before queued work begins.';
  const shortfall = resourceShortfall(s, r);
  if (shortfall.length)
    return (
      'Workshop: order waiting for ' +
      shortfall
        .map(
          (r) =>
            r.amount +
            ' ' +
            (E.resources.find((d) => d.id === r.resource)?.name.toLowerCase() || r.resource),
        )
        .join(' and ') +
      '.'
    );
  startProject(s, 'workshop', order.recipe, null, hooks);
  f.project.orderUid = order.uid;
  if (--order.remaining === 0) f.queue.shift();
  return null;
}
export function projectRecipe(s, id, recipeId, source = s.guild.facilities[id]?.project?.source) {
  const r = recipes.find((r) => r.id === recipeId && r.facility === id);
  if (!r || !E.recipeKnown(s, r)) throw Error('Discover this project’s blueprint first.');
  if (r.maraTier && r.maraTier !== s.guild.house?.mara.tier + 1)
    throw Error('Build Mara’s upgrades in order.');
  const utility = utilityDefinition(s, id)?.id;
  const effects = furnitureEffects(s, [s.guild.facilities[id].utility]);
  return {
    ...r,
    supplies: r.supplies || 0,
    materials: r.materials || {},
    salvage: Math.max(0, r.salvage - Number(utility === 'outfitter' && r.category === 'armour')),
    work:
      r.category === 'crop' && (utility === 'cloche' || effects.cropWork)
        ? effects.cropWork || 3
        : r.category === 'treatment' && utility === 'treatmentBed'
          ? 1
          : r.work,
    yield:
      r.reclaim && source
        ? reclamationYield(source)
        : r.category === 'crop' && (utility === 'raisedBeds' || effects.cropYield)
          ? effects.cropYield || 3
          : 2,
  };
}
function reclamationYield(source) {
  const recipe = recipes.find(
    (r) =>
      !r.sourceEquipment &&
      !r.sourceFurniture &&
      !r.materials &&
      (source.kind === 'equipment' ? r.item === source.item.id : r.furniture === source.item.id),
  );
  if (recipe) return Math.max(1, Math.floor(recipe.salvage / 2));
  if (source.kind === 'furniture')
    return furnishings.find((f) => f.id === source.item.id).decoration ? 1 : 2;
  const item = itemDefinition(source.item.id);
  return Math.min(
    3,
    Object.values(item.stats).reduce((n, v) => n + v, 0),
  );
}
function storedConversionSource(s, recipe, uid) {
  const kind = recipe.reclaim || (recipe.sourceFurniture ? 'furniture' : 'equipment');
  const item = (kind === 'equipment' ? s.inventory : s.guild.furniture).find((i) => i.uid === uid);
  if (!item) throw Error('Choose an item currently in storage.');
  const blocked = conversionBlock(s, recipe, item);
  if (blocked) throw Error(blocked);
  return { kind, item };
}
function conversionBlock(s, recipe, item) {
  const kind = recipe.reclaim || (recipe.sourceFurniture ? 'furniture' : 'equipment'),
    uid = item.uid;
  if (kind === 'equipment') {
    if (item.owner !== null) return 'Unequip this item in the store room first.';
    if (itemDefinition(item.id).rarity === 'rare') return 'Rare equipment is kept intact.';
    if (recipe.sourceEquipment && item.id !== recipe.sourceEquipment)
      return 'This item does not match the refit pattern.';
  } else {
    if (furnishings.find((f) => f.id === item.id).trophy) return 'Earned trophies are kept intact.';
    if (recipe.sourceFurniture && item.id !== recipe.sourceFurniture)
      return 'This furnishing does not match the upgrade pattern.';
    if (furniturePlacement(s, uid)) return 'Remove this furnishing to storage first.';
  }
  return null;
}
export function workshopConversions(s) {
  const conversions = [];
  for (const base of recipes.filter(
    (r) => (r.sourceEquipment || r.sourceFurniture || r.reclaim) && E.recipeKnown(s, r),
  )) {
    const kind = base.reclaim || (base.sourceFurniture ? 'furniture' : 'equipment');
    for (const item of kind === 'equipment' ? s.inventory : s.guild.furniture) {
      if (conversionBlock(s, base, item)) continue;
      const source = { kind, item };
      const r = projectRecipe(s, 'workshop', base.id, source);
      conversions.push({
        ...r,
        source,
        uid: item.uid,
        inputName:
          kind === 'equipment'
            ? itemDefinition(item.id).name
            : furnishings.find((f) => f.id === item.id).name,
        days: dailyWork(s, 'workshop', r) ? Math.ceil(r.work / dailyWork(s, 'workshop', r)) : null,
      });
    }
  }
  return conversions;
}
export function startWorkshopConversion(s, recipeId, uid, hooks) {
  const recipe = recipes.find(
    (r) => r.id === recipeId && (r.sourceEquipment || r.sourceFurniture || r.reclaim),
  );
  if (!recipe) throw Error('Choose a workshop refit or reclamation project.');
  const source = storedConversionSource(s, recipe, uid);
  startProject(s, 'workshop', recipeId, null, hooks, source);
}
export function treatmentForecast(s, patientId, workerId = s.guild.facilities.infirmary.worker) {
  const c = s.roster.find((c) => c.id === patientId);
  if (!c) throw Error('Choose a guild companion.');
  const r = projectRecipe(s, 'infirmary', 'treatment');
  const active = s.guild.facilities.infirmary.project;
  const progress = active?.patient === patientId ? active.progress : 0;
  const work = workBreakdown(s, 'infirmary', r, workerId);
  const days = work.total ? Math.ceil((r.work - progress) / work.total) : null;
  const naturalDays = c.status === 'injured' && !c.undead ? c.recovery : null;
  const eligible = naturalDays !== null && days !== null && naturalDays > days;
  return {
    id: c.id,
    name: c.name,
    eligible,
    days,
    naturalDays,
    homeDays: eligible ? Math.max(days, naturalDays - 2) : naturalDays,
    savedDays: eligible ? Math.min(2, naturalDays - days) : 0,
    supplyCost: r.supplies,
    reason:
      work.paused ||
      (c.undead
        ? 'Ordinary treatment does not help undead companions'
        : c.status !== 'injured'
          ? 'Treatment requires an injured companion at home'
          : !eligible
            ? 'Natural recovery is at least as fast'
            : null),
  };
}
export function eligiblePatients(s) {
  return s.roster.filter((c) => treatmentForecast(s, c.id).eligible);
}
export function carePlan(s, workerId = s.guild.facilities.infirmary.worker) {
  const policy = s.guild.carePolicy;
  const patients = s.roster
    .map((c) => treatmentForecast(s, c.id, workerId))
    .filter((p) => p.eligible)
    .sort(
      (a, b) =>
        (policy.priority === 'soonest'
          ? a.homeDays - b.homeDays || a.naturalDays - b.naturalDays
          : b.naturalDays - a.naturalDays) || a.id.localeCompare(b.id),
    );
  const aboveReserve = Math.max(0, s.guild.supplies - policy.reserve);
  const active = s.guild.facilities.infirmary.project;
  const next = patients.find((p) => p.id !== active?.patient) || null;
  const waiting = !facilityAvailable(s, 'infirmary')
    ? facilitySite(s, 'infirmary')
      ? 'Room damaged'
      : 'Infirmary unavailable'
    : active
      ? 'Current treatment continues'
      : policy.mode === 'manual'
        ? 'Manual care selected'
        : !next
          ? 'No treatment would improve recovery'
          : aboveReserve < next.supplyCost
            ? s.guild.supplies < next.supplyCost
              ? 'Waiting for supplies'
              : 'Protected supply reserve reached'
            : null;
  return {
    ...policy,
    patients,
    next,
    aboveReserve,
    waiting,
    automaticReady: !waiting,
    gardenTarget: policy.reserve + 2,
    gardenConflict:
      policy.mode === 'auto' &&
      s.guild.gardenPolicy.mode === 'reserve' &&
      s.guild.gardenPolicy.reserve <= policy.reserve,
  };
}
function startAutomaticCare(s, hooks) {
  if (
    s.guild.carePolicy.mode !== 'auto' ||
    s.guild.facilities.infirmary.project ||
    !facilityAvailable(s, 'infirmary')
  )
    return null;
  const plan = carePlan(s);
  if (!plan.next) return null;
  if (!plan.automaticReady)
    return (
      'Infirmary: ' + plan.waiting.toLowerCase() + ' · ' + plan.reserve + ' supplies protected.'
    );
  startProject(s, 'infirmary', 'treatment', plan.next.id, hooks);
  return 'Infirmary: automatic treatment started for ' + plan.next.name + ' · 1 supply reserved.';
}
function requireFacility(s, id) {
  if (!facilities.some((f) => f.id === id) || !facilityAvailable(s, id))
    throw Error('Restore this facility and repair any damage first.');
  return s.guild.facilities[id];
}
function spendInputs(s, inputs, pay, why) {
  spendResources(s, inputs, { pay }, why);
}
export function assignWorker(s, id, residentId) {
  requireFacility(s, id);
  H.assignRoomWorker(s, H.facilityRoom(s, id), 0, residentId);
}
export function assignRoomWorker(s, id, slot, resident) {
  H.assignRoomWorker(s, id, slot, resident);
}
export function settleResident(s, id, p) {
  return H.settleResident(s, id, p);
}
export function setRoomProduction(s, id, enabled) {
  H.setRoomProduction(s, id, enabled);
}
export function setMaraDefence(s, enabled) {
  if (typeof enabled !== 'boolean') throw Error('Choose Mara’s guard mode');
  s.guild.house.mara.defend = enabled;
}
export function startProject(s, id, recipeId, patient, hooks, source = null) {
  const f = requireFacility(s, id);
  if (f.project) throw Error('Finish or cancel this room’s current project first.');
  const base = projectRecipe(s, id, recipeId, null);
  if (base.routeTool && s.guild.mechanisms.includes(base.routeTool))
    throw Error('This mechanism is already owned by the guild.');
  if ((base.sourceEquipment || base.sourceFurniture || base.reclaim) && !source)
    throw Error('Choose a specific stored item to refit or reclaim.');
  if (source && !(base.sourceEquipment || base.sourceFurniture || base.reclaim))
    throw Error('This project does not use a stored item.');
  if (source) source = storedConversionSource(s, base, source.item?.uid);
  const r = projectRecipe(s, id, recipeId, source);
  if (r.category === 'treatment' && !eligiblePatients(s).some((c) => c.id === patient))
    throw Error(
      'Treatment would not improve on natural recovery. Choose an injured living companion at home.',
    );
  const inputs = { gold: r.gold, salvage: r.salvage, supplies: r.supplies };
  if (Object.keys(r.materials).length) inputs.materials = { ...r.materials };
  spendInputs(s, inputs, hooks.pay, 'Room project: ' + recipeId);
  f.project = {
    recipe: recipeId,
    progress: 0,
    work: r.work,
    yield: r.yield,
    inputs,
    patient: r.category === 'treatment' ? patient : null,
    startedDay: s.day,
    ...(source ? { source } : {}),
  };
  if (source) {
    const stock = source.kind === 'equipment' ? s.inventory : s.guild.furniture;
    stock.splice(
      stock.findIndex((i) => i.uid === source.item.uid),
      1,
    );
  }
}
export function cancelProject(s, id, hooks) {
  const f = s.guild.facilities[id];
  if (!f?.project) throw Error('No room project to cancel.');
  const p = f.project;
  refundResources(s, p.inputs, hooks, 'Refund: ' + p.recipe);
  if (p.source)
    (p.source.kind === 'equipment' ? s.inventory : s.guild.furniture).push(p.source.item);
  f.project = null;
}
export function upgradeFacility(s, id, hooks) {
  const f = requireFacility(s, id);
  if (f.tier === 2) throw Error('This facility is already tier 2.');
  spendInputs(s, { gold: 40, salvage: 6, supplies: 0 }, hooks.pay, 'Upgrade ' + id);
  f.tier = 2;
}
export function furnitureTarget(s, id) {
  if (id.startsWith('room_')) {
    const r = H.houseRooms.find((r) => 'room_' + r.id === id);
    if (r && H.coreFacility(s, r.id)) return furnitureTarget(s, H.coreFacility(s, r.id));
    return r
      ? {
          id,
          name: r.name,
          site: r.id,
          state: s.guild.house.rooms[r.id],
          available: !H.roomPause(s, r),
          paused: H.roomPause(s, r),
        }
      : null;
  }
  const def = facilities.find((f) => f.id === id);
  return def
    ? {
        id,
        name: def.name,
        site: facilitySite(s, id),
        state: s.guild.facilities[id],
        available: facilityAvailable(s, id),
        paused: 'Repair or restore this facility first',
      }
    : null;
}
export function placeFurniture(s, id, slot, uid) {
  const target = furnitureTarget(s, id);
  if (!target?.available) throw Error(target?.paused || 'Unknown room');
  const f = target.state;
  if (!['utility', 'decoration0', 'decoration1'].includes(slot))
    throw Error('Unknown furniture slot.');
  if (slot === 'utility' && target.id.startsWith('room_'))
    throw Error('This room has decoration slots only.');
  if (slot === 'utility' && f.project)
    throw Error('Finish or cancel the current project before swapping utility furniture.');
  if (uid) {
    const item = s.guild.furniture.find((i) => i.uid === uid);
    const def = furnishings.find((d) => d.id === item?.id);
    if (
      !def ||
      (slot === 'utility'
        ? def.facility !== id || def.decoration || id.startsWith('room_')
        : !def.decoration)
    )
      throw Error('This furniture does not fit that slot.');
    if (furniturePlacement(s, uid)) throw Error('Remove this piece from its current slot first.');
  }
  if (slot === 'utility') f.utility = uid;
  else f.decorations[Number(slot.slice(-1))] = uid;
}
export function furniturePlacement(s, uid) {
  if (!uid) return null;
  for (const def of facilities) {
    const f = s.guild.facilities[def.id];
    if (f.utility === uid) return { facility: def.id, slot: 'utility' };
    const decoration = f.decorations.indexOf(uid);
    if (decoration >= 0) return { facility: def.id, slot: 'decoration' + decoration };
  }
  if (s.guild.house)
    for (const r of H.houseRooms) {
      const slot = s.guild.house.rooms[r.id].decorations.indexOf(uid);
      if (slot >= 0) return { facility: 'room_' + r.id, slot: 'decoration' + slot };
    }
  return null;
}
export function furnitureDestinations(s, uid) {
  const item = s.guild.furniture.find((i) => i.uid === uid);
  const d = furnishings.find((d) => d.id === item?.id);
  if (!d) return [];
  const current = furniturePlacement(s, uid);
  const sourceBlocked =
    current &&
    (!furnitureTarget(s, current.facility).available
      ? 'Repair the current room first'
      : current.slot === 'utility' && furnitureTarget(s, current.facility).state.project
        ? 'Finish or cancel the current room project before moving utility furniture'
        : null);
  return [
    ...facilities,
    ...(d.decoration
      ? H.houseRooms
          .filter((r) => !H.coreFacility(s, r.id) && H.roomUnlocked(s, r))
          .map((r) => ({ id: 'room_' + r.id, name: r.name }))
      : []),
  ]
    .filter((f) => furnitureTarget(s, f.id).site && (d.decoration || d.facility === f.id))
    .map((def) => ({
      facility: def.id,
      name: def.name,
      site: furnitureTarget(s, def.id).site,
      slots: (d.decoration ? ['decoration0', 'decoration1'] : ['utility']).map((slot) => {
        const target = furnitureTarget(s, def.id),
          f = target.state;
        const placedUid = slot === 'utility' ? f.utility : f.decorations[Number(slot.slice(-1))];
        return {
          slot,
          uid: placedUid,
          label: slot === 'utility' ? 'Utility' : 'Decoration ' + (Number(slot.slice(-1)) + 1),
          blocked: !target.available
            ? target.paused
            : slot === 'utility' && f.project
              ? 'Finish or cancel this room’s current project first'
              : sourceBlocked || null,
        };
      }),
    }));
}
export function moveFurniture(s, id, slot, uid) {
  const target = furnitureDestinations(s, uid)
    .find((d) => d.facility === id)
    ?.slots.find((d) => d.slot === slot);
  if (!target) throw Error('Choose an owned furnishing and a compatible restored room.');
  if (target.uid === uid) return;
  if (target.blocked) throw Error(target.blocked);
  const current = furniturePlacement(s, uid);
  if (current) placeFurniture(s, current.facility, current.slot, null);
  placeFurniture(s, id, slot, uid);
}
export function buyResources(s, type, hooks) {
  if (!['supplies', 'salvage'].includes(type)) throw Error('Unknown resource.');
  hooks.pay(
    s,
    type === 'supplies' ? 15 : 60,
    'Quartermaster: ' + E.resources.find((r) => r.id === type).name.toLowerCase(),
  );
  s.guild[type] += type === 'supplies' ? 2 : 4;
}
export function medicalKitSupplyCost(s) {
  return facilityAvailable(s, 'infirmary') &&
    utilityDefinition(s, 'infirmary')?.id === 'medicalCabinet'
    ? 1
    : 2;
}
export function completeRoomProject(s, id, p, hooks, workedWorker) {
  const r = recipes.find((r) => r.id === p.recipe);
  let label;
  if (r.maraTier) {
    s.guild.house.mara.tier = r.maraTier;
    label =
      'Mara upgraded to tier ' + r.maraTier + ' · ' + (r.maraTier - 1) * 4 + ' defence strength';
    s.scenes.push({
      title: 'Mara upgraded',
      body:
        label +
        '. Mara can guard the home while companions travel. Manage her guard mode in Rooms → Mara.',
    });
  } else if (r.routeTool) {
    if (!s.guild.mechanisms.includes(r.routeTool)) s.guild.mechanisms.push(r.routeTool);
    label = r.name + ' ready to install';
    R.refreshRouteProgress(s);
  } else if (r.materialOutput || r.resourceOutput) {
    creditResources(s, { ...r.materialOutput, ...r.resourceOutput });
    label = Object.entries({ ...r.materialOutput, ...r.resourceOutput })
      .map(([id, n]) => '+' + n + ' ' + (id === 'salvage' ? 'scrap' : id))
      .join(', ');
  } else if (p.source && !r.reclaim) {
    const item = p.source.item;
    item.id = r.item || r.furniture;
    (p.source.kind === 'equipment' ? s.inventory : s.guild.furniture).push(item);
    const name = r.item
      ? hooks.itemName(r.item)
      : furnishings.find((f) => f.id === r.furniture).name;
    label = name + ' upgraded in place · #' + item.uid.split('-').at(-1) + ' ready in storage';
    s.scenes.push({
      title: r.enchantment ? 'Enchantment bound' : 'Upgrade completed',
      body:
        label +
        '. ' +
        (r.furniture
          ? furnishings.find((f) => f.id === r.furniture).effect +
            ' Place it in a compatible room to activate it.'
          : itemDefinition(r.item).desc),
      ...(r.item ? { equipmentRewards: [r.item] } : { guildRewards: [r.furniture] }),
    });
  } else if (r.item) {
    hooks.awardEquipment(s, r.item, r.sourceEquipment ? 'Guild workshop refit' : 'Guild workshop');
    label = hooks.itemName(r.item) + ' added to the store room';
  } else if (r.furniture) {
    grantFurniture(s, r.furniture);
    label = furnishings.find((f) => f.id === r.furniture).name + ' ready to place';
    s.scenes.push({
      title: 'Furniture completed',
      body: label + '. Open Rooms → Decorate to place it in any secured room.',
      guildRewards: [r.furniture],
    });
  } else if (r.reclaim) {
    creditResources(s, { salvage: p.yield });
    const name =
      p.source.kind === 'equipment'
        ? hooks.itemName(p.source.item.id)
        : furnishings.find((f) => f.id === p.source.item.id).name;
    label = name + ' reclaimed → +' + p.yield + ' scrap';
  } else if (r.category === 'crop') {
    creditResources(s, { supplies: p.yield });
    label = '+' + p.yield + ' supplies harvested';
  } else {
    const patient = s.roster.find((c) => c.id === p.patient);
    const removed = Math.min(2, patient.recovery);
    patient.recovery -= removed;
    patient.injury = Math.min(patient.injury || 0, Math.ceil(patient.recovery / 2));
    if (!patient.recovery) patient.status = 'home';
    label = patient.name + ': ' + removed + ' recovery days removed';
  }
  const rank = recordCraft(s, p.recipe);
  if (rank)
    s.scenes.push({
      title: 'Workshop: ' + rank.name,
      body:
        'Completed ' +
        rank.count +
        ' different designs. A staffed workshop now gains +' +
        rank.bonus +
        ' work each day from guild experience.',
    });
  const workers = Array.isArray(workedWorker) ? workedWorker : workedWorker ? [workedWorker] : [];
  const awarded = workers.filter(
    (c) => !c.echo && s.roster.some((r) => r.id === c.id) && !s.guild.homeXP.workers.includes(c.id),
  );
  H.awardHomeXP(s, workers, hooks);
  for (const c of awarded) label += ' · ' + c.name + ' +5 XP';
  const completion = {
    id: ++s.guild.nextCompletion,
    day: s.day,
    facility: id,
    recipe: p.recipe,
    text: label,
  };
  s.guild.completions.push(completion);
  return label;
}
export function advanceRooms(s, hooks) {
  E.discoverPatterns(s);
  reconcileAssignments(s);
  s.guild.homeXP = { day: s.day, workers: [] };
  const lines = [];
  for (const def of facilities) {
    const f = s.guild.facilities[def.id];
    if (def.id === 'workshop') {
      const waiting = startQueuedProject(s, hooks);
      if (waiting) lines.push(waiting);
    }
    if (def.id === 'infirmary') {
      const care = startAutomaticCare(s, hooks);
      if (care) lines.push(care);
    }
    const r = f.project ? recipes.find((r) => r.id === f.project.recipe) : null;
    const work = dailyWork(s, def.id, r);
    if (
      f.project?.patient &&
      !s.roster.some(
        (c) =>
          c.id === f.project.patient &&
          c.status === 'injured' &&
          !c.undead &&
          (!work || c.recovery > Math.ceil((f.project.work - f.project.progress) / work)),
      )
    ) {
      cancelProject(s, def.id, hooks);
      lines.push(
        def.name +
          ': treatment cancelled and inputs refunded; it would no longer improve on natural recovery.',
      );
      continue;
    }
    if (!facilityAvailable(s, def.id)) continue;
    if (def.id === 'garden' && productionPause(s, 'garden')) {
      lines.push(
        'Garden: ' +
          productionPause(s, 'garden').toLowerCase() +
          (f.project
            ? ' · ' + f.project.progress + '/' + f.project.work + ' crop work saved.'
            : '.'),
      );
      continue;
    }
    if (!work) {
      if (f.project)
        lines.push(
          def.name +
            ': ' +
            (workBreakdown(s, def.id, r).paused || 'Production paused') +
            (f.project ? ' · ' + f.project.progress + '/' + f.project.work + ' work saved.' : '.'),
        );
      continue;
    }
    if (def.id === 'garden' && !f.project) startProject(s, 'garden', 'crop', null, hooks);
    const p = f.project;
    if (!p) continue;
    const workedWorker =
      s.guild.house.rooms[H.facilityRoom(s, def.id)]?.workers
        .map((id) => guildWorker(s, id))
        .filter((c) => c && c.status === 'home' && !c.injury)
        .filter(Boolean) || [];
    p.progress = Math.min(p.work, p.progress + work);
    const worker = guildWorker(s, f.worker);
    lines.push(
      def.name +
        ': ' +
        (p.progress >= p.work
          ? completeRoomProject(s, def.id, p, hooks, workedWorker)
          : p.progress + '/' + p.work + ' work') +
        (worker && (worker.status !== 'home' || worker.injury)
          ? ' · ' + worker.name + ' unavailable'
          : ''),
    );
    if (p.progress >= p.work) f.project = null;
  }
  lines.push(...H.advanceHouse(s, hooks));
  s.guild.dailySummary = { day: s.day, lines };
  if (lines.length) hooks.note(s, 'Day ' + s.day + ' room work\n' + lines.join('\n'), 'Room work');
}

export function expeditionDecision(s, mission, def) {
  const area = expeditionAreas.find((a) => a.id === def.area);
  if (!area || !mission.pendingEvent) return null;
  const total = mission.party.reduce(
    (sum, id) =>
      sum +
      effectiveWorkStat(
        s.roster.find((c) => c.id === id),
        area.stat,
      ),
    0,
  );
  const sufficient = total >= area.target;
  const bonus = def.activity === 'survey' ? '2 supplies' : '2 scrap';
  return {
    title: area.title,
    body: area.decision + '\nThe party is safely camped. Other work continues until you choose.',
    options: [
      { id: 'normal', label: 'Follow the safe route · normal rewards', disabled: false },
      {
        id: 'supply',
        label: area.safe + ' · costs 1 supply · bonus ' + bonus + ' · no extra injury risk',
        disabled: s.guild.supplies < 1,
      },
      {
        id: 'risk',
        label:
          area.risky +
          ' · ' +
          area.stat.toUpperCase() +
          ' ' +
          total +
          '/' +
          area.target +
          ' · bonus ' +
          bonus +
          ' · ' +
          (sufficient ? '0%' : '20%') +
          ' extra injury chance',
        disabled: false,
      },
    ],
    sufficient,
  };
}

const nonnegativeInt = (n) => Number.isSafeInteger(n) && n >= 0;
export function validateManagement(s) {
  const g = s.guild;
  const bad = () => {
    throw Error('Invalid guild-management save data.');
  };
  if (
    !g ||
    ![1, 2, 3, 4, 5, 6, 7, 8, 9].includes(g.version) ||
    !['salvage', 'supplies', 'nextFurniture', 'nextCompletion', 'readCompletion'].every((k) =>
      nonnegativeInt(g[k]),
    ) ||
    g.readCompletion > g.nextCompletion ||
    !Array.isArray(g.blueprints) ||
    new Set(g.blueprints).size !== g.blueprints.length ||
    g.blueprints.some((id) => !expeditionAreas.some((a) => a.id === id)) ||
    !Array.isArray(g.trophies) ||
    new Set(g.trophies).size !== g.trophies.length ||
    g.trophies.some((id) => !furnishings.some((f) => f.id === id && f.trophy)) ||
    !Array.isArray(g.furniture) ||
    new Set(g.furniture.map((f) => f?.uid)).size !== g.furniture.length ||
    g.furniture.some(
      (i) =>
        !i ||
        !/^furniture-[1-9][0-9]*$/.test(i.uid) ||
        Number(i.uid.slice(10)) > g.nextFurniture ||
        !furnishings.some((f) => f.id === i.id),
    ) ||
    !g.facilities ||
    Array.isArray(g.facilities) ||
    Object.keys(g.facilities).length !== facilities.length
  )
    bad();
  if (g.version >= 8) validateCrafting(s);
  if (g.version >= 7) R.validateRouteState(s);
  if (
    g.version >= 6 &&
    (!Array.isArray(g.patterns) ||
      !Array.isArray(g.readPatterns) ||
      new Set(g.patterns).size !== g.patterns.length ||
      new Set(g.readPatterns).size !== g.readPatterns.length ||
      g.patterns.some(
        (id) =>
          !E.patternRecipes.some(
            (r) =>
              r.id === id &&
              (!r.sourceFlag || s.flags[r.sourceFlag]) &&
              (!r.blueprint || g.blueprints.includes(r.blueprint)),
          ),
      ) ||
      g.readPatterns.some((id) => !g.patterns.includes(id)))
  )
    bad();
  if (
    g.version >= 4 &&
    (!g.carePolicy ||
      !['manual', 'auto'].includes(g.carePolicy.mode) ||
      !['longest', 'soonest'].includes(g.carePolicy.priority) ||
      !nonnegativeInt(g.carePolicy.reserve) ||
      g.carePolicy.reserve >= Number.MAX_SAFE_INTEGER - 2)
  )
    bad();
  if (
    g.version >= 2 &&
    (!nonnegativeInt(g.nextOrder) ||
      !g.gardenPolicy ||
      !['continuous', 'reserve', 'paused'].includes(g.gardenPolicy.mode) ||
      !Number.isSafeInteger(g.gardenPolicy.reserve) ||
      g.gardenPolicy.reserve < 1 ||
      !Array.isArray(g.facilities.workshop?.queue) ||
      new Set(g.facilities.workshop.queue.map((o) => o?.uid)).size !==
        g.facilities.workshop.queue.length ||
      g.facilities.workshop.queue.some(
        (o) =>
          !o ||
          !/^order-[1-9][0-9]*$/.test(o.uid) ||
          Number(o.uid.slice(6)) > g.nextOrder ||
          !Number.isInteger(o.quantity) ||
          o.quantity < 1 ||
          o.quantity > 99 ||
          !Number.isInteger(o.remaining) ||
          o.remaining < 1 ||
          o.remaining > o.quantity ||
          !recipes.some(
            (r) =>
              r.id === o.recipe &&
              r.facility === 'workshop' &&
              !r.sourceEquipment &&
              !r.sourceFurniture &&
              !r.reclaim &&
              !r.maraTier &&
              !r.routeTool &&
              (!r.pattern || g.patterns?.includes(r.id)) &&
              (!r.blueprint || g.blueprints.includes(r.blueprint)),
          ),
      ))
  )
    bad();
  const placed = new Set(),
    workers = new Set();
  for (const def of facilities) {
    const f = g.facilities[def.id];
    if (
      !f ||
      ![1, 2].includes(f.tier) ||
      (f.worker !== null && (!guildWorker(s, f.worker) || workers.has(f.worker))) ||
      !Array.isArray(f.decorations) ||
      f.decorations.length !== 2
    )
      bad();
    if (f.worker) workers.add(f.worker);
    for (const [slot, uid] of [
      ['utility', f.utility],
      ...f.decorations.map((uid) => ['decoration', uid]),
    ]) {
      if (uid === null) continue;
      const item = g.furniture.find((i) => i.uid === uid),
        d = furnishings.find((d) => d.id === item?.id);
      if (
        !d ||
        placed.has(uid) ||
        (slot === 'utility' ? d.decoration || d.facility !== def.id : !d.decoration)
      )
        bad();
      placed.add(uid);
    }
    const p = f.project;
    if (p !== null) {
      const r = recipes.find((r) => r.id === p?.recipe && r.facility === def.id);
      if (r?.routeTool && g.mechanisms.includes(r.routeTool)) bad();
      if (r?.sourceEquipment || r?.sourceFurniture || r?.reclaim) {
        const source = p.source,
          item = source?.item;
        const kind = r.reclaim || (r.sourceFurniture ? 'furniture' : 'equipment');
        if (
          g.version < 3 ||
          !item ||
          source.kind !== kind ||
          p.orderUid !== undefined ||
          (kind === 'equipment'
            ? !/^item-[1-9][0-9]*$/.test(item.uid) ||
              Number(item.uid.slice(5)) > s.nextItem ||
              item.owner !== null ||
              !itemDefinition(item.id) ||
              itemDefinition(item.id).rarity === 'rare' ||
              (r.sourceEquipment && item.id !== r.sourceEquipment) ||
              s.inventory.some((i) => i.uid === item.uid)
            : !/^furniture-[1-9][0-9]*$/.test(item.uid) ||
              Number(item.uid.slice(10)) > g.nextFurniture ||
              !furnishings.some((f) => f.id === item.id && !f.trophy) ||
              (r.sourceFurniture && item.id !== r.sourceFurniture) ||
              g.furniture.some((i) => i.uid === item.uid))
        )
          bad();
      } else if (p.source !== undefined) bad();
      if (
        !r ||
        (r.blueprint && !g.blueprints.includes(r.blueprint)) ||
        !nonnegativeInt(p.progress) ||
        !Number.isSafeInteger(p.work) ||
        p.work < 1 ||
        p.progress >= p.work ||
        !p.inputs ||
        !['gold', 'salvage', 'supplies'].every((k) => nonnegativeInt(p.inputs[k])) ||
        p.inputs.gold !== r.gold ||
        p.inputs.salvage < Math.max(0, r.salvage - 1) ||
        p.inputs.salvage > r.salvage ||
        p.inputs.supplies !== (r.supplies || 0) ||
        (r.category === 'treatment'
          ? !s.roster.some((c) => c.id === p.patient)
          : p.patient !== null) ||
        !nonnegativeInt(p.yield) ||
        !Number.isInteger(p.startedDay) ||
        p.startedDay < 1 ||
        p.startedDay > s.day
      )
        bad();
      if (
        p.orderUid !== undefined &&
        (g.version < 2 ||
          !/^order-[1-9][0-9]*$/.test(p.orderUid) ||
          Number(p.orderUid.slice(6)) > g.nextOrder ||
          def.id !== 'workshop')
      )
        bad();
      const computed = projectRecipe(s, def.id, p.recipe);
      if (
        p.work !== computed.work ||
        p.yield !== computed.yield ||
        p.inputs.salvage !== computed.salvage
      )
        bad();
      if (
        Object.keys(p.inputs.materials || {}).length !== Object.keys(computed.materials).length ||
        Object.entries(computed.materials).some(([id, n]) => p.inputs.materials?.[id] !== n)
      )
        bad();
    }
  }
  if (
    !Array.isArray(g.completions) ||
    g.completions.length !== g.nextCompletion ||
    g.completions.some(
      (c, i) =>
        c.id !== i + 1 ||
        (!facilities.some((f) => f.id === c.facility) &&
          !(g.version >= 5 && H.houseRooms.some((r) => 'room:' + r.id === c.facility))) ||
        !Number.isInteger(c.day) ||
        c.day < 1 ||
        c.day > s.day ||
        typeof c.text !== 'string' ||
        (c.recipe !== undefined &&
          !recipes.some((r) => r.id === c.recipe && r.facility === c.facility)),
    ) ||
    !g.homeXP ||
    !Number.isInteger(g.homeXP.day) ||
    g.homeXP.day < 1 ||
    g.homeXP.day > s.day ||
    !Array.isArray(g.homeXP.workers) ||
    new Set(g.homeXP.workers).size !== g.homeXP.workers.length ||
    g.homeXP.workers.some((id) => !s.roster.some((c) => c.id === id)) ||
    (g.dailySummary !== null &&
      (!g.dailySummary ||
        !Number.isInteger(g.dailySummary.day) ||
        g.dailySummary.day < 1 ||
        g.dailySummary.day > s.day ||
        !Array.isArray(g.dailySummary.lines) ||
        g.dailySummary.lines.some((l) => typeof l !== 'string')))
  )
    bad();
  if (g.version >= 5) {
    H.validateHouse(s, placed);
    for (const r of H.houseRooms)
      for (const uid of g.house.rooms[r.id].decorations)
        if (
          uid &&
          !furnishings.some(
            (d) => d.id === g.furniture.find((i) => i.uid === uid)?.id && d.decoration,
          )
        )
          bad();
  }
}
