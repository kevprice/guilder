import * as D from './domain.js';

export const number = (n) => Number(n.toFixed(2)).toString();
export function roomProduction(s, id) {
  const f = D.roomForecast(s, id),
    room = f.room,
    state = s.guild.house.rooms[id],
    core = f.core;
  let work = f.work,
    target = f.role.work,
    progress = state.progress,
    outputs = f.role.output,
    recipe = null;
  let reason = f.paused,
    name = f.role.name;
  if (core) {
    const facility = s.guild.facilities[core];
    const recipeId =
      facility.project?.recipe ||
      (core === 'garden' ? 'crop' : core === 'workshop' ? facility.queue[0]?.recipe : null);
    recipe = recipeId ? D.projectRecipe(s, core, recipeId) : null;
    work = D.dailyWork(s, core, recipe);
    reason = D.workBreakdown(s, core, recipe).paused;
    target = facility.project?.work || recipe?.work || 0;
    progress = facility.project?.progress || 0;
    outputs = core === 'garden' ? { supplies: facility.project?.yield || recipe.yield } : {};
    if (core === 'workshop' && recipe)
      outputs =
        recipe.materialOutput ||
        recipe.resourceOutput ||
        (recipe.reclaim ? { salvage: facility.project?.yield || 0 } : {});
    if (recipe) name = recipeName(recipe);
    if (core === 'infirmary')
      name = facility.project
        ? 'Treat ' + s.roster.find((c) => c.id === facility.project.patient).name
        : 'Infirmary';
    if (!recipe && !reason)
      reason =
        core === 'workshop'
          ? 'Choose a recipe'
          : D.eligiblePatients(s).length
            ? 'Patients waiting'
            : 'No patients need treatment';
    if (core === 'workshop' && recipe && !facility.project && D.resourceShortfall(s, recipe).length)
      reason = 'Waiting for materials';
  }
  const research = s.outside?.research?.room === id ? s.outside.research : null;
  if (research) {
    const f = D.researchForecast(s);
    work = f.total;
    target = research.work;
    progress = research.progress;
    outputs = {};
    reason = f.paused;
    recipe = { name: 'Creature research', category: 'research' };
    name = 'Creature research';
  }
  const watch = !core && f.role.animation === 'watch';
  const cycleDays = work > 0 && target ? Math.max(1, Math.ceil(target / work)) : null;
  const nextDays = !reason && cycleDays ? Math.max(1, Math.ceil((target - progress) / work)) : null;
  const main = Object.entries(outputs)[0];
  const amount = main?.[1] || (recipe?.item || recipe?.furniture || recipe?.routeTool ? 1 : 0);
  const resource = research
    ? 'research'
    : main?.[0] || (watch ? 'guard' : core === 'infirmary' ? 'care' : 'craft');
  const resourceName =
    D.resources.find((r) => r.id === resource)?.name ||
    (research ? 'Research' : watch ? 'Defence' : core === 'infirmary' ? 'Recovery' : 'Crafting');
  const visibleWorkers = research ? D.researchForecast(s).workers : f.workers;
  const fit = visibleWorkers.filter((w) => w.fit).length,
    assigned = state.workers.filter(Boolean).length;
  const status = reason
    ? D.roomPause(s, room)
      ? 'blocked'
      : reason === 'Choose a recipe' || reason === 'No patients need treatment'
        ? 'idle'
        : assigned && !fit && reason === 'No fit workers at home'
          ? 'paused'
          : !assigned && reason === 'No fit workers at home'
            ? 'idle'
            : 'paused'
    : 'working';
  const average = !reason && cycleDays && amount ? amount / cycleDays : 0;
  const rate = reason
    ? reason
    : research
      ? reason || 'Creature study · ' + nextDays + ' days remaining'
      : watch
        ? !reason
          ? '+' + work * 2 + ' defence/day'
          : reason
        : main
          ? `${main[1]} ${resourceName.toLowerCase()} / ${cycleDays || '—'} ${cycleDays === 1 ? 'day' : 'days'}`
          : recipe
            ? `1 ${recipe.item ? 'item' : recipe.furniture ? 'furnishing' : recipe.routeTool ? 'mechanism' : recipe.materialOutput ? 'batch' : recipe.maraTier ? 'upgrade' : 'treatment'} / ${cycleDays || '—'} ${cycleDays === 1 ? 'day' : 'days'}`
            : reason;
  return {
    id,
    room,
    core,
    stat: f.role.stat,
    work,
    target,
    progress,
    outputs,
    resource,
    resourceName,
    amount,
    name,
    recipe,
    reason,
    status,
    fit,
    assigned,
    capacity: room.capacity,
    cycleDays,
    nextDays,
    average,
    rate,
    watch,
  };
}
export function recipeName(r) {
  return (
    r.name ||
    D.equipment.find((e) => e.id === r.item)?.name ||
    D.furnishings.find((f) => f.id === r.furniture)?.name ||
    (r.category === 'crop' ? 'Expedition crop' : 'Treatment')
  );
}
export function productionBadge(r) {
  const w = Math.min(68, r.w - 12);
  return {
    x: r.id === 'quarters' ? 395 : r.id === 'garden' ? r.x + 125 : r.x + (r.w - w) / 2,
    y: r.y - 150,
    w,
    h: 19,
  };
}
