export const species = {
  briarStag: {
    id: 'briarStag',
    name: 'Briar stag',
    portrait: 'stag',
    description: 'A horned creature with bark plating and a charging attack.',
    weakness: 'fire',
    resistance: 'physical',
    drop: 'briarHorn',
    researchWork: 6,
    advancedWork: 12,
  },
};
export const siteDefinitions = [
  {
    id: 'briarHollow',
    name: 'The trampled hollow',
    species: 'briarStag',
    report:
      'Gatherers found split saplings, hoofprints and deep furrows. Something large is defending the hollow. Nobody has seen it clearly.',
    warning:
      'An unprepared party could suffer serious injuries. A quiet scout may identify what lives here.',
    reward: 35,
  },
  {
    id: 'oldPatrol',
    name: 'Watchfires on the mill road',
    species: null,
    report:
      'Travellers report watchfires and unfamiliar voices near the old toll arch. Their numbers and intentions are uncertain.',
    warning:
      'The watchfires suggest armed guards. Their numbers are unknown; scouts can investigate.',
    reward: 30,
  },
];
export const readyRooms = [
  'entrance',
  'quarters',
  'corridor',
  'service',
  'store',
  'garden',
  'hospice',
  'tower',
  'landing',
  'library',
  'towerCrown',
];
export const recommissions = [
  { room: 'dryLanding', name: 'Cellar stair and landing', designs: 3, gold: 25, salvage: 4 },
  { room: 'cellar', name: 'Timber cellar', designs: 3, gold: 20, salvage: 4 },
  { room: 'furnace', name: 'Ore furnace', designs: 8, gold: 40, salvage: 6 },
];
export const fieldRecipes = [
  {
    id: 'flamePreparation',
    name: 'Ember flask',
    facility: 'workshop',
    category: 'material',
    work: 3,
    gold: 5,
    salvage: 0,
    materials: { aether: 1, cloth: 1 },
    materialOutput: { flameKit: 1 },
    purpose:
      'Bottle magical flame for a hunt. The party packs an owned flask when research identifies a fire weakness and its equipment lacks that counter.',
  },
  {
    id: 'hornboundForge',
    name: 'Hornbound forge',
    sourceFurniture: 'runeForge',
    furniture: 'hornboundForge',
    facility: 'workshop',
    category: 'furniture',
    enchantment: true,
    work: 6,
    gold: 25,
    salvage: 0,
    materials: { briarHorn: 1, components: 2, aether: 2 },
    research: 'briarStag',
  },
  {
    id: 'briarCloak',
    name: 'Briarweave cloak',
    sourceEquipment: 'paddedCoat',
    item: 'briarCloak',
    facility: 'workshop',
    category: 'armour',
    enchantment: true,
    work: 4,
    gold: 20,
    salvage: 0,
    materials: { briarHorn: 1, cloth: 2, aether: 1 },
    research: 'briarStag',
  },
];
