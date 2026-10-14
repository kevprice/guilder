import { passages, chambers, passageError, passageOpened } from './sprawl.js';
import { houseRooms, roomUnlocked, roomPause, roomForecast } from './house-rooms.js';
import { routeItems, mechanismRecipes, routeSolutions, skillLeads } from './route-content.js';
const abilityNames = {
  literacy: 'Magical literacy',
  water: 'Water breathing',
  tracking: 'Tracking',
  echoSight: 'Echo sight',
  threadwalk: 'Threadwalk',
};

export { routeItems, mechanismRecipes, routeSolutions };
export const doorName = (id) =>
  ({ stairs: 'Cellar hatch', tower: 'Bell-tower hatch', labyrinth: 'Labyrinth gate' })[id] ||
  passages.find((p) => p.id === id)?.label.split(' · ')[0] ||
  id;
export const sourceName = (id) =>
  chambers.find((r) => r.id === id)?.name ||
  { cellar: 'Drained cellar', tower: 'Bell tower landing', labyrinth: 'Labyrinth heart' }[id] ||
  id;
export function routeVisible(s, p) {
  return p.from === 'tower'
    ? !!s.flags.tower
    : p.from === 'cellar'
      ? !!s.flags.stairs
      : p.from === 'labyrinth'
        ? !!s.flags.labyrinthHeart
        : !!s.flags['discovered_' + p.from];
}
const helperAtHome = (s, id) =>
  s.roster.find((c) => c.id === id && c.status === 'home' && !c.injury);
export function solutionStatus(s, p, solution) {
  const solved = s.guild.solvedRoutes?.[p.id]?.method === solution.id;
  if (solved)
    return { ...solution, met: true, solved: true, detail: 'Installed and secured for the guild' };
  if (solution.kind === 'tool')
    return {
      ...solution,
      met: s.guild.mechanisms?.includes(solution.tool),
      detail: s.guild.mechanisms?.includes(solution.tool)
        ? 'Crafted mechanism ready'
        : 'Discover its pattern, then craft it in the workshop',
    };
  if (solution.kind === 'bond') {
    const c = s.roster.find((c) => c.id === solution.resident);
    return {
      ...solution,
      met: !!helperAtHome(s, solution.resident) && (c.bond || 0) >= solution.bond,
      detail: c
        ? `${c.name}: trust ${c.bond || 0}/${solution.bond}${helperAtHome(s, c.id) ? ' · at home' : ' · must be fit at home'}. Build trust through their conversations and story decisions.`
        : 'Find this companion, then build trust through their conversations and story decisions.',
    };
  }
  if (solution.kind === 'gold')
    return {
      ...solution,
      met: !!s.flags[solution.flag] && s.gold >= solution.gold,
      detail: !s.flags[solution.flag]
        ? 'Secure and search the mirror chamber first'
        : `${s.gold}/${solution.gold} gold. Paid once; the crew secures the route for everyone.`,
    };
  return {
    ...solution,
    met: !!s.flags[solution.flag],
    detail: s.flags[solution.flag]
      ? 'The region’s final relief contract is completed'
      : 'Complete the Lantern Fen relief campaign. Repeatable jobs do not earn this permission.',
  };
}
export function routeStatus(s, id, c = s.roster.find((r) => r.id === s.selected)) {
  const p = passages.find((p) => p.id === id);
  if (!p) return null;
  const destination = chambers.find((r) => r.id === p.to),
    source = chambers.find((r) => r.id === p.from),
    alternatives = (routeSolutions[id] || []).map((o) => solutionStatus(s, p, o));
  const primary = [];
  if (p.gate.key) {
    const item = routeItems.find((r) => r.id === p.gate.key);
    primary.push({
      label: item?.name || p.gate.key,
      met: !!s.flags['key_' + p.gate.key],
      lead: item?.source || 'Search the preceding chamber',
    });
  }
  if (p.gate.flag)
    primary.push({
      label: p.gate.flag === 'cellarDrained' ? 'Drain the flooded cellar' : p.label,
      met: !!s.flags[p.gate.flag],
      lead: 'Use Water breathing at the submerged drain wheel. Once drained, everyone can enter.',
    });
  if (p.gate.skill || p.gate.skills) {
    const skills = p.gate.skills || [p.gate.skill];
    primary.push({
      label: skills.map((k) => abilityNames[k] || k).join(' or '),
      met: !!c && (passageOpened(s, p) || skills.some((k) => c.skills.includes(k))),
      lead: passageOpened(s, p)
        ? 'The opening has already been secured for all companions'
        : skills
            .map((k) => skillLeads[k])
            .filter(Boolean)
            .join(' '),
    });
  }
  const guardian = source?.encounter && !s.flags['cleared_' + source.id] ? source.encounter : null;
  const physical = routeVisible(s, p) && !(p.from === 'cellar' && !s.flags.cellarDrained);
  const primaryReady = primary.every((r) => r.met) && !!c && !passageError(s, p, c);
  const solved = !!s.guild.solvedRoutes?.[id];
  const ready =
    physical &&
    !guardian &&
    !!c &&
    c.status === 'home' &&
    !c.injury &&
    (c.id !== 'rowan' || !!s.flags.free || s.household?.opening === 'ready') &&
    (solved || primaryReady);
  return {
    id,
    passage: p,
    name: doorName(id),
    source: sourceName(p.from),
    destination,
    primary,
    alternatives,
    guardian,
    sourceReached: physical,
    primaryReady,
    solved,
    ready,
    canSolve: physical && !guardian && alternatives.some((o) => o.met),
    visited: !!s.flags['discovered_' + p.to],
  };
}
export function inspectRoute(s, id) {
  const r = routeStatus(s, id);
  if (!r || !routeVisible(s, r.passage))
    throw Error('Discover the source room before inspecting this door.');
  if (!s.guild.seenRoutes.includes(id)) s.guild.seenRoutes.push(id);
  if ((r.ready || r.canSolve) && !s.guild.readyRoutes.includes(id)) s.guild.readyRoutes.push(id);
  if (s.guild.readyRoutes.includes(id) && !s.guild.readRoutes.includes(id))
    s.guild.readRoutes.push(id);
  return r;
}
// Presentation is derived from ownership, not read markers: a dismissed popup cannot hide a door.
export function routeIndicator(s, id, c = s.roster.find((r) => r.id === s.selected)) {
  const hatch = {
    stairs: { item: 'cellarKey', opened: 'stairs', cost: 45 },
    tower: {
      item: 'towerKey',
      opened: 'tower',
      cost: s.roster.some((r) => r.skills.includes('stoneSong') && r.status === 'home') ? 40 : 80,
    },
    labyrinth: { item: 'labyrinthKey', opened: 'labyrinth', cost: 0 },
  }[id];
  if (hatch) {
    const item = routeItems.find((r) => r.id === hatch.item);
    if (!s.flags[item.flag] || s.flags[hatch.opened]) return null;
    if (id === 'labyrinth' && !s.flags.stairs) return null;
    const ready =
      !!c &&
      c.status === 'home' &&
      !c.injury &&
      s.gold >= hatch.cost &&
      (c.id !== 'rowan' || !s.rowanRecovery);
    return {
      ready,
      label: ready ? 'KEY READY' : 'KEY HELD',
      detail:
        item.name + ' held' + (hatch.cost ? ' · ' + hatch.cost + 'g repairs' : ' · ready to open'),
    };
  }
  const r = routeStatus(s, id, c);
  if (!r || !r.sourceReached || r.visited) return null;
  const key = routeItems.find((i) => i.id === r.passage.gate.key && s.flags[i.flag]);
  if (!key && !r.solved && !r.canSolve) return null;
  const remaining = r.guardian
    ? 'defeat the source-room guardian first'
    : r.primary
        .filter((p) => !p.met)
        .map((p) => p.label)
        .join(' + ');
  return {
    ready: r.ready,
    label: key ? (r.ready ? 'KEY READY' : 'KEY HELD') : r.ready ? 'READY' : 'SOLUTION',
    detail:
      (key ? key.name + ' held' : 'Door solution earned') +
      (r.ready
        ? ' · ready to open'
        : remaining
          ? ' · still needs ' + remaining
          : ' · inspect door'),
  };
}
export function solveRoute(s, id, method, hooks) {
  const r = routeStatus(s, id),
    solution = r?.alternatives.find((o) => o.id === method);
  if (!r || !solution || !routeVisible(s, r.passage) || r.guardian || !r.sourceReached)
    throw Error('Reach and secure the source room first.');
  if (s.guild.solvedRoutes[id]) throw Error('This route is already secured.');
  if (!solution.met) throw Error(solution.detail);
  if (solution.gold) hooks.pay(s, solution.gold, 'Secure ' + r.name);
  s.guild.solvedRoutes[id] = { method, day: s.day };
  if (s.guild.seenRoutes.includes(id)) {
    if (!s.guild.readyRoutes.includes(id)) s.guild.readyRoutes.push(id);
    if (!s.guild.readRoutes.includes(id)) s.guild.readRoutes.push(id);
  }
  const text = `${solution.label}. ${r.name} is secured for the guild. It leads from ${r.source} to ${r.destination.name}. The destination’s traps and guardian still apply.`;
  hooks.note(s, text, 'Door puzzle solved');
  s.scenes.push({ title: 'Door puzzle solved', body: text, routeRewards: ['door_' + id] });
}
export function roomBenefit(s, id) {
  const r = houseRooms.find((r) => r.id === id);
  if (!r) return '';
  const f = roomForecast(s, id),
    role = f.role;
  const output = Object.entries(role.output)
    .map(([id, n]) => `${n} ${id === 'salvage' ? 'scrap' : id}`)
    .join(' + ');
  return `${r.capacity} worker ${r.capacity === 1 ? 'slot' : 'slots'} · ${role.name}. ${output ? `Produces ${output} per ${role.work} work. ` : ''}${f.core === 'workshop' ? 'Craft equipment, room mechanisms and furnishings.' : f.core === 'infirmary' ? 'Treat injured companions.' : role.animation === 'watch' ? 'Workers strengthen Mara’s defence.' : `Effective ${role.stat.toUpperCase()} 10, 20, 30 and 40 increase work speed.${f.quality > 1 ? ' This room has richer production at stat 20' + (f.quality >= 3 ? ', with a second yield bonus at 30.' : '.') : ''}`}`;
}
export function unlockedItems(s) {
  return [
    ...routeItems.filter((i) => s.flags[i.flag]),
    ...mechanismRecipes
      .filter((r) => s.guild.mechanisms?.includes(r.routeTool))
      .map((r) => ({ ...r, id: 'tool_' + r.routeTool })),
  ];
}
export function refreshRouteProgress(s, quiet = false, rewardScene = null) {
  if (s.guild.version < 7) return [];
  const items = unlockedItems(s).filter((i) => !s.guild.unlocksAnnounced.includes(i.id));
  s.guild.unlocksAnnounced.push(...items.map((i) => i.id));
  if (items.length && !quiet) {
    const ids = items.map((i) => i.id);
    if (rewardScene) rewardScene.routeRewards = [...(rewardScene.routeRewards || []), ...ids];
    else
      s.scenes.push({
        title: 'Keys and route items received',
        body: 'Added to the guild’s keyring. Matching unopened doors are highlighted on the map; any remaining requirements are shown when you inspect them.',
        routeRewards: ids,
      });
  }
  const rooms = houseRooms.filter(
    (r) =>
      (r.flag || r.kind === 'chamber') &&
      roomUnlocked(s, r) &&
      !roomPause(s, r) &&
      !s.guild.roomsAnnounced.includes(r.id),
  );
  s.guild.roomsAnnounced.push(...rooms.map((r) => r.id));
  if (rooms.length && !quiet)
    s.scenes.push({
      title: 'Guild expanded · new work available',
      body: 'Secured rooms now have a purpose. Assign a crew to put their resources to work.',
      developmentRewards: rooms.map((r) => r.id),
    });
  for (const id of s.guild.seenRoutes) {
    if (s.guild.readyRoutes.includes(id)) continue;
    const ready =
      s.roster.some((c) => routeStatus(s, id, c)?.ready) || routeStatus(s, id)?.canSolve;
    if (!ready) continue;
    s.guild.readyRoutes.push(id);
    if (routeStatus(s, id)?.visited) {
      if (!s.guild.readRoutes.includes(id)) s.guild.readRoutes.push(id);
      continue;
    }
    if (items.some((item) => item.doors.includes(id))) continue;
    if (!quiet)
      s.scenes.push({
        title: 'Door requirement achieved',
        body: `${doorName(id)} now has an available solution. Inspect the door in Exploration to see the requirement you earned.`,
        routeRewards: ['door_' + id],
      });
  }
  return items.map((i) => i.id);
}
export function initialiseRoutes(s) {
  s.guild.mechanisms = [];
  s.guild.solvedRoutes = {};
  s.guild.seenRoutes = [];
  s.guild.readyRoutes = [];
  s.guild.readRoutes = [];
  s.guild.unlocksAnnounced = [];
  s.guild.roomsAnnounced = [];
  refreshRouteProgress(s, true);
}
export function validRouteReward(id) {
  return (
    routeItems.some((r) => r.id === id) ||
    mechanismRecipes.some((r) => 'tool_' + r.routeTool === id) ||
    passages.some((p) => 'door_' + p.id === id)
  );
}
export function validateRouteState(s) {
  const g = s.guild,
    bad = () => {
      throw Error('Invalid guild route progression.');
    };
  if (
    !Array.isArray(g.patterns) ||
    !Array.isArray(g.mechanisms) ||
    new Set(g.mechanisms).size !== g.mechanisms.length ||
    g.mechanisms.some(
      (id) => !mechanismRecipes.some((r) => r.routeTool === id && g.patterns.includes(r.id)),
    ) ||
    !g.solvedRoutes ||
    Array.isArray(g.solvedRoutes)
  )
    bad();
  for (const [id, solved] of Object.entries(g.solvedRoutes)) {
    const solution = routeSolutions[id]?.find((o) => o.id === solved?.method);
    if (
      !solution ||
      !Number.isInteger(solved.day) ||
      solved.day < 1 ||
      solved.day > s.day ||
      (solution.kind === 'tool' && !g.mechanisms.includes(solution.tool)) ||
      (solution.flag && !s.flags[solution.flag])
    )
      bad();
  }
  for (const key of ['seenRoutes', 'readyRoutes', 'readRoutes']) {
    if (
      !Array.isArray(g[key]) ||
      new Set(g[key]).size !== g[key].length ||
      g[key].some((id) => !passages.some((p) => p.id === id))
    )
      bad();
  }
  if (
    g.readyRoutes.some((id) => !g.seenRoutes.includes(id)) ||
    g.readRoutes.some((id) => !g.readyRoutes.includes(id))
  )
    bad();
  if (
    !Array.isArray(g.unlocksAnnounced) ||
    new Set(g.unlocksAnnounced).size !== g.unlocksAnnounced.length ||
    g.unlocksAnnounced.some(
      (id) =>
        !routeItems.some((r) => r.id === id) &&
        !mechanismRecipes.some((r) => 'tool_' + r.routeTool === id),
    )
  )
    bad();
  if (
    !Array.isArray(g.roomsAnnounced) ||
    new Set(g.roomsAnnounced).size !== g.roomsAnnounced.length ||
    g.roomsAnnounced.some((id) => !houseRooms.some((r) => r.id === id))
  )
    bad();
}
