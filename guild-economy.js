import { mechanismRecipes } from './route-content.js';

export { resources } from './resource-catalogue.js';
import { resources } from './resource-catalogue.js';
export const patternRecipes = [
  ...mechanismRecipes,
  ...[
    ['ironHelm', 'searched_crypt', 'Search the crypt of erased names', { ore: 8, cloth: 3 }, 150],
    [
      'ironGreaves',
      'searched_vault',
      'Search the treasury under the roots',
      { ore: 6, cloth: 4 },
      120,
    ],
    [
      'shield',
      'searched_ratway',
      'Clear and search the rat king’s cistern',
      { timber: 5, ore: 3, cloth: 2 },
      75,
    ],
    [
      'glassDagger',
      'searched_mirror',
      'Clear and search the mirror chamber',
      { ore: 5, aether: 4, timber: 2 },
      180,
    ],
    [
      'mistBoots',
      'searched_menagerie',
      'Secure and search the moonlit menagerie',
      { cloth: 6, aether: 4 },
      220,
    ],
    [
      'stoneMail',
      'searched_ossuary',
      'Search the bone library',
      { ore: 10, cloth: 3, aether: 5, components: 3 },
      400,
    ],
    [
      'wardStaff',
      'searched_rift',
      'Clear and search the drowned rift',
      { ore: 4, timber: 6, aether: 8, components: 2 },
      320,
    ],
    [
      'threadRing',
      'searched_stars',
      'Search the observatory of lost roads',
      { components: 3, aether: 6, ore: 4 },
      280,
    ],
  ].map(([item, sourceFlag, source, materials, gold]) => ({
    id: 'pattern_' + item,
    item,
    sourceFlag,
    source,
    materials,
    gold,
    work: gold >= 280 ? 10 : 8,
    category: [
      'shield',
      'ironHelm',
      'ironGreaves',
      'mistBoots',
      'stoneMail',
      'threadRing',
    ].includes(item)
      ? 'armour'
      : 'weapon',
  })),
  {
    id: 'pattern_scholarHood',
    item: 'scholarHood',
    sourceFlag: 'searched_study',
    source: 'Search the wizard’s unfinished study',
    materials: { cloth: 3, ore: 1, aether: 2 },
    gold: 70,
    category: 'armour',
  },
  {
    id: 'pattern_ironShield',
    item: 'ironShield',
    sourceFlag: 'searched_cells',
    source: 'Search the holding cells after clearing their guardian',
    materials: { ore: 6, timber: 2, cloth: 1 },
    gold: 100,
    category: 'armour',
  },
  {
    id: 'pattern_scholarRobe',
    item: 'scholarRobe',
    sourceFlag: 'searched_potions',
    source: 'Search the suspended potion kitchen',
    materials: { cloth: 4, herbs: 2, aether: 2 },
    gold: 90,
    category: 'armour',
  },
  {
    id: 'pattern_scoutBoots',
    item: 'scoutBoots',
    sourceFlag: 'searched_maze',
    source: 'Search the maze beyond the map',
    materials: { cloth: 4, timber: 2, aether: 1 },
    gold: 90,
    category: 'armour',
  },
  {
    id: 'pattern_ironAxe',
    item: 'ironAxe',
    sourceFlag: 'dragonSlain',
    source: 'Reclaim the old furnace from its dragon',
    materials: { ore: 8, timber: 3, components: 1 },
    gold: 110,
    category: 'weapon',
  },
  {
    id: 'pattern_longSword',
    item: 'longSword',
    blueprint: 'mill',
    source: 'Survey the mill road',
    materials: { ore: 6, timber: 3, components: 1 },
    gold: 70,
    category: 'weapon',
  },
].map((r) => ({ work: 6, ...r, pattern: true, facility: 'workshop', salvage: 0 }));

export { resourceStock } from './resource-ledger.js';
import { resourceStock, tradeResources } from './resource-ledger.js';
export function sellResource(s, id, quantity, hooks) {
  const resource = resources.find((r) => r.id === id);
  if (!resource?.sell || !Number.isSafeInteger(quantity) || quantity < 1)
    throw Error('Choose a material and a positive whole quantity.');
  const stock = resourceStock(s, id),
    value = quantity * resource.sell;
  if (stock < quantity) throw Error('Not enough ' + resource.name.toLowerCase() + ' in storage.');
  if (!Number.isSafeInteger(value) || !Number.isSafeInteger(s.gold + value))
    throw Error('Choose a smaller sale.');
  tradeResources(
    s,
    { [id]: quantity },
    { gold: value },
    hooks,
    'Sold ' + quantity + ' ' + resource.name.toLowerCase(),
  );
}
export function recipeKnown(s, r) {
  return (
    (!r.research || (s.outside?.bestiary[r.research]?.tier || 0) >= 1) &&
    (!r.pattern || s.guild.patterns?.includes(r.id)) &&
    (!r.blueprint || s.guild.blueprints.includes(r.blueprint))
  );
}
export function discoverPatterns(s, quiet = false) {
  const gained = patternRecipes.filter(
    (r) =>
      (!r.sourceFlag || s.flags[r.sourceFlag]) &&
      (!r.blueprint || s.guild.blueprints.includes(r.blueprint)) &&
      !s.guild.patterns.includes(r.id),
  );
  s.guild.patterns.push(...gained.map((r) => r.id));
  if (gained.length && !quiet)
    s.scenes.push({
      title: 'Workshop patterns discovered',
      body: 'New patterns are ready in House → Craft. Gather their materials, then build them in the workshop.',
      recipeRewards: gained.map((r) => r.id),
    });
  return gained.map((r) => r.id);
}
