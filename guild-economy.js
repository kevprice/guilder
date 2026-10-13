import { materials } from './house-rooms.js';

export const resources = [
  {
    id: 'gold',
    name: 'Gold',
    color: '#ddbb74',
    use: 'Pays for equipment, room upgrades, repairs and workshop projects.',
    sell: 0,
  },
  {
    id: 'salvage',
    name: 'Scrap',
    color: '#c9ad84',
    use: 'Builds basic equipment, furniture and facility upgrades.',
    sell: 3,
  },
  {
    id: 'supplies',
    name: 'Supplies',
    color: '#93c7a6',
    use: 'Funds treatment and medical kits, and secures expedition bonuses.',
    sell: 3,
  },
  ...materials.map((m) => ({
    ...m,
    ...{
      timber: {
        color: '#c9a171',
        sell: 1,
        use: 'Makes weapon handles, bows, shields, shelves and Mara’s reinforced frame.',
      },
      ore: {
        color: '#aebfce',
        sell: 2,
        use: 'Forges weapons and armour, and becomes brass components for Mara.',
      },
      herbs: {
        color: '#95c889',
        sell: 2,
        use: 'Becomes expedition supplies, padded clothing and potted plants.',
      },
      cloth: {
        color: '#c6a4d0',
        sell: 3,
        use: 'Makes armour, footwear, banners, rugs and supply packs.',
      },
      aether: {
        color: '#8bd2dc',
        sell: 6,
        use: 'Powers magical equipment, brass components and Mara’s later upgrades.',
      },
      components: {
        color: '#dfbb77',
        sell: 8,
        use: 'Upgrades Mara’s body and supports advanced weapon patterns. Made in the workshop.',
      },
    }[m.id],
  })),
];

export const patternRecipes = [
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
].map((r) => ({ ...r, pattern: true, facility: 'workshop', salvage: 0, work: 6 }));

export function resourceStock(s, id) {
  if (id === 'gold') return s.gold;
  if (['salvage', 'supplies'].includes(id)) return s.guild[id];
  return s.guild.house.materials[id];
}
export function sellResource(s, id, quantity, hooks) {
  const resource = resources.find((r) => r.id === id);
  if (!resource?.sell || !Number.isSafeInteger(quantity) || quantity < 1)
    throw Error('Choose a material and a positive whole quantity.');
  const stock = resourceStock(s, id),
    value = quantity * resource.sell;
  if (stock < quantity) throw Error('Not enough ' + resource.name.toLowerCase() + ' in storage.');
  if (!Number.isSafeInteger(value) || !Number.isSafeInteger(s.gold + value))
    throw Error('Choose a smaller sale.');
  if (['salvage', 'supplies'].includes(id)) s.guild[id] -= quantity;
  else s.guild.house.materials[id] -= quantity;
  hooks.earn(s, value, 'Sold ' + quantity + ' ' + resource.name.toLowerCase());
}
export function recipeKnown(s, r) {
  return (
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
