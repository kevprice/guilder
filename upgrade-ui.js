import * as G from './guild-management.js';
import { itemDefinition } from './equipment.js';
import { furnitureIcon } from './guild-art.js';
import { equipmentIcon } from './equipment-rewards.js';
import { resourceIcon } from './resource-icons.js';
import { furnishingUpgrades } from './furnishing-upgrades.js';
import { recipeCosts } from './resource-ledger.js';

export function renderUpgrades(s, { esc, btn }) {
  const project = s.guild.facilities.workshop.project;
  const recipes = G.recipes.filter((r) => r.sourceFurniture || r.sourceEquipment);
  const conversions = G.workshopConversions(s);
  return `<section class="craft-upgrades" aria-label="Upgrade and enchant existing items"><div class="section-heading"><h4>Upgrade & enchant</h4>${btn('Place or store furnishings', 'roomPage:decorate')}</div><p class="stats">Build a piece, reinforce it, then bind its enchantment. Remove furnishings or unequip gear to work on them. Each project preserves the selected item’s identity; cancelling restores it and every paid material.</p><div class="upgrade-grid">${recipes
    .map((base) => {
      const equipment = !!base.sourceEquipment;
      const input = equipment
        ? itemDefinition(base.sourceEquipment)
        : G.furnishings.find((f) => f.id === base.sourceFurniture);
      const output = equipment
        ? itemDefinition(base.item)
        : G.furnishings.find((f) => f.id === base.furniture);
      const known = G.recipeKnown(s, base);
      const recipe = known ? G.projectRecipe(s, 'workshop', base.id, null) : base;
      const owned = (equipment ? s.inventory : s.guild.furniture).filter((i) => i.id === input.id);
      const descendant = (id) => {
        const visited = new Set();
        while (id && !visited.has(id)) {
          if (id === output.id) return true;
          visited.add(id);
          id = equipment
            ? G.recipes.find((r) => r.item === id && r.sourceEquipment)?.sourceEquipment
            : furnishingUpgrades.find((f) => f.id === id)?.source;
        }
        return false;
      };
      const completed = (equipment ? s.inventory : s.guild.furniture).find((i) => descendant(i.id));
      const ready = conversions.filter((r) => r.id === base.id);
      const missing = known ? G.resourceShortfall(s, recipe) : [];
      const prerequisite = G.recipes.find((r) =>
        equipment ? r.item === input.id && !r.sourceEquipment : r.furniture === input.id,
      );
      const days =
        known && G.dailyWork(s, 'workshop', recipe)
          ? Math.ceil(recipe.work / G.dailyWork(s, 'workshop', recipe))
          : null;
      return `<article class="upgrade-card ${base.enchantment ? 'enchanted' : ''}"><div class="upgrade-chain">${equipment ? equipmentIcon(input, esc) : furnitureIcon(input.id, esc)}<span aria-label="becomes">→</span>${equipment ? equipmentIcon(output, esc) : furnitureIcon(output.id, esc)}</div><span class="eyebrow">${base.enchantment ? 'ENCHANT' : 'REINFORCE'}</span><h5>${esc(output.name)}</h5><p class="stats">${esc(input.name)} → ${esc(output.name)}</p><p>${esc(equipment ? output.desc : output.effect)}</p><div class="upgrade-costs">${Object.entries(
        recipeCosts(recipe),
      )
        .map(
          ([id, n]) =>
            `<button data-action="material:${id}" class="${G.resourceStock(s, id) < n ? 'insufficient' : ''}" title="${esc(G.resources.find((r) => r.id === id).name)}">${resourceIcon(id, esc(G.resources.find((r) => r.id === id).name))}<strong>${n}</strong></button>`,
        )
        .join(
          '',
        )}</div><p class="stats">${known ? (days === null ? 'Assign a fit workshop crew to progress.' : days + (days === 1 ? ' day' : ' days') + ' with current crew.') : base.research ? 'Study the briar stag to unlock this pattern.' : 'Discover the ' + esc(base.blueprint) + ' survey blueprint.'} ${missing.length ? 'Need ' + missing.map((m) => m.amount + ' ' + G.resources.find((r) => r.id === m.resource).name.toLowerCase()).join(' + ') + '.' : ''}</p>${ready.map((r) => btn((base.enchantment ? 'Enchant' : 'Upgrade') + ' #' + r.uid.split('-').at(-1), 'workshopConversion:' + r.id + ':' + r.uid, !G.facilityAvailable(s, 'workshop') || !!project || !!missing.length)).join('')}${!ready.length && known ? (owned.length ? '<p class="stats">' + (equipment ? 'Unequip this item in Stores first.' : 'Remove this piece to storage in Decorate first.') + '</p>' + btn(equipment ? 'Open equipment storage' : 'Manage this piece', equipment ? 'rewardStore' : 'rewardFurniture:' + owned[0].uid) : completed ? '<p class="recipe-benefit">Already upgraded #' + completed.uid.split('-').at(-1) + ' · ' + esc(equipment ? itemDefinition(completed.id).name : G.furnishings.find((f) => f.id === completed.id).name) + '.</p>' + btn('Manage this item', equipment ? 'rewardStore' : 'rewardFurniture:' + completed.uid) : '<p class="stats">First build ' + esc(input.name) + '.</p>' + (prerequisite && !prerequisite.sourceFurniture ? btn('Build ' + input.name, 'recipeOpen:' + prerequisite.id) : '<small>Complete the preceding upgrade shown here.</small>')) : ''}</article>`;
    })
    .join('')}</div></section>`;
}
