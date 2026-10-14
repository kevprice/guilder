import { productKey } from './crafting-progression.js';
import * as G from './guild-management.js';
import * as H from './house-rooms.js';
import { recipeCosts, resourceStock } from './resource-ledger.js';

export function queueCommitments(s) {
  const costs = {};
  for (const order of s.guild.facilities.workshop.queue) {
    const inputs = recipeCosts(G.projectRecipe(s, 'workshop', order.recipe), order.remaining);
    for (const [id, amount] of Object.entries(inputs)) {
      const total = (costs[id] || 0) + amount;
      if (!Number.isSafeInteger(total)) throw Error('Workshop plan is too large.');
      costs[id] = total;
    }
  }
  return costs;
}
export function resourceSources(s, id) {
  return H.houseRooms
    .filter((r) => H.roomUnlocked(s, r))
    .flatMap((room) => {
      const f = H.roomForecast(s, room.id);
      if (!f.role.output[id]) return [];
      const forecast = f.core ? G.projectForecast(s, f.core) : null;
      const paused = forecast ? forecast.paused : f.paused;
      const work = forecast ? forecast.total : f.work;
      const crop = f.core ? G.projectRecipe(s, f.core, 'crop') : null;
      const target = crop ? crop.work : f.role.work;
      const days = !paused && work ? Math.max(1, Math.ceil(target / work)) : null;
      return [
        {
          room: room.id,
          name: room.name,
          amount: crop
            ? s.guild.facilities[f.core].project?.yield || crop.yield
            : f.role.output[id],
          days,
          paused,
        },
      ];
    });
}
export function craftPlan(s, recipeId, quantity = 1) {
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 99)
    throw Error('Choose between 1 and 99 items per order.');
  const recipe = G.projectRecipe(s, 'workshop', recipeId),
    cost = recipeCosts(recipe, quantity);
  const commitments = queueCommitments(s),
    rate = G.dailyWork(s, 'workshop', recipe);
  const single = !!(
    recipe.routeTool ||
    recipe.maraTier ||
    recipe.sourceEquipment ||
    recipe.sourceFurniture ||
    recipe.reclaim
  );
  if (single && quantity !== 1) throw Error('This project needs one specific item.');
  const materials = Object.entries(cost).map(([id, amount]) => {
    const owned = resourceStock(s, id),
      planned = commitments[id] || 0;
    return {
      id,
      amount,
      owned,
      planned,
      available: Math.max(0, owned - planned),
      missing: Math.max(0, amount - owned),
      plannedMissing: Math.max(0, amount + planned - owned),
      sources: resourceSources(s, id),
      recipes: G.recipes
        .filter((r) => G.recipeKnown(s, r) && (r.materialOutput?.[id] || r.resourceOutput?.[id]))
        .map((r) => r.id),
    };
  });
  const unique = productKey(recipe);
  return {
    recipe,
    quantity,
    cost,
    materials,
    rate,
    days: rate ? Math.max(1, Math.ceil(recipe.work / rate)) * quantity : null,
    paused: G.workBreakdown(s, 'workshop', recipe).paused,
    queue: G.workshopQueueForecast(s),
    newDesign: unique ? !G.craftingProgress(s).products.includes(unique) : false,
    missing: materials.filter((m) => m.missing),
    blocked: materials.filter((m) => m.plannedMissing),
  };
}
