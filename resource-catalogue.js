import { materials } from './production-catalogue.js';

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
    use: 'Builds starter equipment and furniture; metal recovery turns two scrap into two ore.',
    sell: 3,
  },
  {
    id: 'supplies',
    name: 'Supplies',
    color: '#93c7a6',
    use: 'Feeds travelling parties and treats injuries. A scout needs one supply; a mission needs two. Field medicine uses one more when available.',
    sell: 3,
  },
  ...materials.map((m) => ({
    ...m,
    ...{
      briarHorn: {
        color: '#e0c596',
        sell: 10,
        use: 'Research unlocks a hornbound forge or a quiet briarweave cloak. Earned from a completed briar-stag hunt.',
      },
      briarSample: {
        color: '#94c68c',
        sell: 2,
        use: 'Supports deeper creature research. Scouts and completed hunts return specimens.',
      },
      flameKit: {
        color: '#edba76',
        sell: 1,
        use: 'A bottled magical flame. Packed automatically against a researched fire weakness when the party has no fire equipment. Unused flasks return to shared stores.',
      },
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
