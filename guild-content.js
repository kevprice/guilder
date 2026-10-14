// Content definitions sit above the production engine.
import { fieldRecipes } from './expedition-content.js';
import { patternRecipes } from './guild-economy.js';
import { furnishingUpgrades } from './furnishing-upgrades.js';
import { materialRecipes } from './production-catalogue.js';

export const facilities = [
  { id: 'workshop', name: 'Workshop', stat: 'str', unlock: 'Restore the service room.' },
  { id: 'garden', name: 'Garden', stat: 'int', unlock: 'Restore the reclaimed greenhouse.' },
  {
    id: 'infirmary',
    name: 'Infirmary',
    stat: 'end',
    unlock: 'Choose the greenhouse hospice, or restore a regional infirmary or hospital.',
  },
];
export { medicalRoomIds as medicalRooms } from './production-catalogue.js';
export const furnishings = [
  ...furnishingUpgrades.map((f) => ({ ...f, upgrade: true })),
  {
    id: 'forge',
    name: 'Forge',
    facility: 'workshop',
    effect: '+1 work on weapon projects.',
    blueprint: 'mill',
  },
  {
    id: 'outfitter',
    name: 'Outfitter’s bench',
    facility: 'workshop',
    effect: 'Armour and footwear cost 1 less scrap.',
    blueprint: 'mill',
  },
  {
    id: 'raisedBeds',
    name: 'Raised beds',
    facility: 'garden',
    effect: 'Each crop produces 3 supplies.',
    blueprint: 'tower',
  },
  {
    id: 'cloche',
    name: 'Cloche',
    facility: 'garden',
    effect: 'Crops require 3 work.',
    blueprint: 'tower',
  },
  {
    id: 'treatmentBed',
    name: 'Treatment bed',
    facility: 'infirmary',
    effect: 'Treatment requires 1 work.',
    blueprint: 'drains',
  },
  {
    id: 'medicalCabinet',
    name: 'Medical cabinet',
    facility: 'infirmary',
    effect: 'Supply-funded medical kits cost 1 supply.',
    blueprint: 'drains',
  },
  ...[
    ['banner', 'Guild banner'],
    ['rug', 'Woven rug'],
    ['plant', 'Potted plant'],
    ['shelf', 'Book shelves'],
  ].map(([id, name]) => ({ id, name, decoration: true, effect: 'Decoration · no stat bonuses.' })),
  {
    id: 'jailerFaceplate',
    name: 'Jailer’s faceplate',
    decoration: true,
    trophy: 'cleared_cells',
    effect: 'Recovered after defeating the Iron jailer.',
  },
  {
    id: 'ratTrophy',
    name: 'Rat-king trophy',
    decoration: true,
    trophy: 'cleared_ratway',
    effect: 'Recovered after defeating the rat king.',
  },
];
const equipmentRecipes = [
  ['shortSword', 6, 20, 4, 'weapon'],
  ['huntingBow', 6, 20, 4, 'weapon'],
  ['ashStaff', 6, 20, 4, 'weapon'],
  ['buckler', 4, 15, 3, 'armour'],
  ['paddedCoat', 5, 20, 4, 'armour'],
  ['leatherCap', 3, 10, 3, 'armour'],
  ['softShoes', 3, 10, 3, 'armour'],
  ['longSword', 12, 70, 6, 'weapon', 'mill'],
  ['leatherArmour', 12, 70, 6, 'armour', 'mill'],
];
export const recipes = [
  ...fieldRecipes,
  ...furnishingUpgrades
    .filter((f) => !f.recipeOnly)
    .map((f) => ({
      id: 'upgrade_' + f.id,
      name: f.name,
      sourceFurniture: f.source,
      furniture: f.id,
      facility: 'workshop',
      category: 'furniture',
      enchantment: !!f.enchantment,
      blueprint: f.blueprint,
      salvage: 0,
      gold: f.gold,
      materials: f.materials,
      work: f.work,
    })),
  {
    id: 'enchantHearthBlade',
    name: 'Hearth-forged sword',
    sourceEquipment: 'longSword',
    item: 'hearthBlade',
    enchantment: true,
    facility: 'workshop',
    category: 'weapon',
    blueprint: 'mill',
    salvage: 0,
    gold: 25,
    materials: { ore: 2, aether: 3 },
    work: 6,
  },
  ...patternRecipes,
  ...materialRecipes,
  ...equipmentRecipes.map(([item, salvage, gold, work, category, blueprint]) => ({
    id: item,
    item,
    facility: 'workshop',
    salvage,
    gold,
    work,
    category,
    blueprint,
  })),
  {
    id: 'refitSword',
    name: 'Refit short sword → long sword',
    sourceEquipment: 'shortSword',
    item: 'longSword',
    facility: 'workshop',
    blueprint: 'mill',
    salvage: 6,
    gold: 50,
    work: 4,
    category: 'weapon',
  },
  {
    id: 'refitCoat',
    name: 'Refit padded coat → leather armour',
    sourceEquipment: 'paddedCoat',
    item: 'leatherArmour',
    facility: 'workshop',
    blueprint: 'mill',
    salvage: 7,
    gold: 50,
    work: 4,
    category: 'armour',
  },
  ...['equipment', 'furniture'].map((kind) => ({
    id: 'reclaim' + (kind === 'equipment' ? 'Equipment' : 'Furniture'),
    name: 'Reclaim stored ' + kind,
    reclaim: kind,
    facility: 'workshop',
    salvage: 0,
    gold: 0,
    work: 2,
    category: 'reclaim',
  })),
  ...furnishings
    .filter((f) => !f.trophy && !f.upgrade)
    .map((f) => ({
      id: f.id,
      furniture: f.id,
      facility: 'workshop',
      blueprint: f.blueprint,
      salvage: f.decoration ? 1 : 4,
      gold: f.decoration ? 5 : 20,
      work: f.decoration ? 2 : 4,
      category: 'furniture',
    })),
  { id: 'crop', facility: 'garden', salvage: 0, gold: 0, work: 4, category: 'crop' },
  {
    id: 'treatment',
    facility: 'infirmary',
    supplies: 1,
    salvage: 0,
    gold: 0,
    work: 2,
    category: 'treatment',
  },
];
export const expeditionAreas = [
  {
    id: 'mill',
    name: 'Mill road',
    requires: ['wallSurveyed'],
    stat: 'agi',
    target: 6,
    threat: 10,
    title: 'The mill’s fallen gantry',
    decision:
      'A collapsed timber gantry bars the old store. A sound route runs around it, but the party spots sealed supply tins and usable iron inside. Mara has marked a safe bracing method in their notes.',
    safe: 'Use a supply to brace the gantry',
    risky: 'Climb the gantry and recover the cache',
    lead: 'The mill’s workshop records show how to assemble a forge and an outfitter’s bench. They also include patterns for a long sword and leather armour.',
  },
  {
    id: 'drains',
    name: 'Lower drains',
    requires: ['searched_sluice'],
    stat: 'end',
    target: 10,
    threat: 18,
    title: 'A cache above the drain',
    decision:
      'A maintenance locker sits above a cold spillway. The surveyed walkway is sound; reaching the locker means staying in the water while another companion holds the rope. A supply can instead be traded to the local pump crew for safe access.',
    safe: 'Trade a supply to the pump crew',
    risky: 'Wade to the maintenance locker',
    lead: 'The drain crew’s first-aid drawings provide plans for a treatment bed and a medical cabinet. Their service route ends at the sluice; sealed story passages still require their own keys.',
  },
  {
    id: 'tower',
    name: 'Tower approaches',
    requires: ['tower'],
    stat: 'int',
    target: 10,
    threat: 15,
    title: 'The wind-damaged nursery',
    decision:
      'Beyond the tower’s outer approach, a small nursery has survived beneath a damaged glass roof. The party can finish its survey from the sheltered path. Recovering its remaining stock requires stabilising the roof or reading the old counterweight diagram.',
    safe: 'Use a supply to stabilise the roof',
    risky: 'Read and reset the counterweights',
    lead: 'Nursery drawings explain raised beds and glass cloches. The guild can grow more supplies in its restored greenhouse. These outer paths offer no shortcut through the tower’s wards.',
  },
];
export const guildMissions = expeditionAreas.flatMap((area) =>
  ['survey', 'salvage'].map((activity) => ({
    id: activity + '_' + area.id,
    area: area.id,
    activity,
    name: (activity === 'survey' ? 'Survey: ' : 'Recovery: ') + area.name,
    days: 2,
    capacity: 3,
    injuryDays: 1,
    reward: activity === 'salvage' ? 10 : 0,
    xp: 25,
    requires: activity === 'survey' ? area.requires : ['surveyed_' + area.id],
    ...(activity === 'survey'
      ? { oneShot: true, sets: ['surveyed_' + area.id], exclusive: 'surveyed_' + area.id }
      : { cooldown: 2 }),
    checks: [
      {
        stat: area.stat,
        min: area.target,
        label: 'Combined ' + area.stat.toUpperCase() + ' ' + area.target,
      },
    ],
    desc:
      activity === 'survey'
        ? 'Guild development · discover facility blueprints. Two base working days, with a decision after the first. Nonlethal; waiting at camp is safe. Rewards: 2 scrap, 1 supply and 25 XP per survivor.'
        : 'Resource expedition · recover 4 scrap, 10 gold and 25 XP per survivor. Two base working days with a decision after the first. Nonlethal; two-day cooldown after completion.',
    result: area.lead,
  })),
);
export const guildProfiles = Object.fromEntries(
  guildMissions.map((m) => {
    const a = expeditionAreas.find((a) => a.id === m.area);
    return [
      m.id,
      {
        stat: a.stat,
        amount: a.target,
        threat: a.threat,
        skills: { guard: 5, tracking: 5, literacy: 5 },
      },
    ];
  }),
);
