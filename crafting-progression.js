import { recipes, furnishings } from './guild-content.js';
import { itemDefinition } from './equipment.js';

export const workshopRanks = [
  { name: 'Apprentice', products: 0, bonus: 0 },
  { name: 'Artisan', products: 3, bonus: 1 },
  { name: 'Guildwright', products: 8, bonus: 2 },
];
export function productKey(r) {
  if (!r || r.facility !== 'workshop' || r.reclaim) return null;
  return r.item
    ? 'item:' + r.item
    : r.furniture
      ? 'furniture:' + r.furniture
      : r.routeTool
        ? 'mechanism:' + r.routeTool
        : r.maraTier
          ? 'mara:' + r.maraTier
          : Object.keys(r.materialOutput || r.resourceOutput || {}).length
            ? 'batch:' +
              Object.keys(r.materialOutput || r.resourceOutput)
                .sort()
                .join(',')
            : null;
}
export function craftingProgress(s) {
  const products = new Set(
    (s.guild.crafting?.completed || [])
      .map((id) => productKey(recipes.find((r) => r.id === id)))
      .filter(Boolean),
  );
  const rank = workshopRanks.findLast((r) => products.size >= r.products);
  const next = workshopRanks.find((r) => r.products > products.size) || null;
  return {
    ...rank,
    count: products.size,
    products: [...products],
    next,
    remaining: next ? next.products - products.size : 0,
  };
}
export function recordCraft(s, recipeId) {
  const r = recipes.find((r) => r.id === recipeId);
  if (!productKey(r)) return null;
  const before = craftingProgress(s);
  s.guild.crafting ||= { completed: [] };
  if (!s.guild.crafting.completed.includes(recipeId)) s.guild.crafting.completed.push(recipeId);
  const after = craftingProgress(s);
  return after.bonus > before.bonus ? after : null;
}
export function migrateCrafting(s) {
  s.guild.crafting = { completed: [] };
  // Recover only explicit workshop completions. Ownership alone cannot prove a craft.
  for (const completion of s.guild.completions.filter((c) => c.facility === 'workshop')) {
    const recipe = recipes.find((r) => {
      if (!productKey(r)) return false;
      if (completion.recipe) return r.id === completion.recipe;
      const prefix = r.item
        ? itemDefinition(r.item).name + ' added to the store room'
        : r.furniture
          ? furnishings.find((f) => f.id === r.furniture).name + ' ready to place'
          : r.routeTool
            ? r.name + ' ready to install'
            : r.maraTier
              ? 'Mara upgraded to tier ' + r.maraTier + ' '
              : Object.entries({ ...r.materialOutput, ...r.resourceOutput })
                  .map(([id, n]) => '+' + n + ' ' + (id === 'salvage' ? 'scrap' : id))
                  .join(', ');
      return !!prefix && completion.text.startsWith(prefix);
    });
    if (recipe && !s.guild.crafting.completed.includes(recipe.id))
      s.guild.crafting.completed.push(recipe.id);
  }
}
export function validateCrafting(s) {
  const ids = s.guild.crafting?.completed;
  if (
    !Array.isArray(ids) ||
    new Set(ids).size !== ids.length ||
    ids.some((id) => !productKey(recipes.find((r) => r.id === id)))
  )
    throw Error('Invalid crafting progression save data.');
}
