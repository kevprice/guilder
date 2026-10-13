// Display names and authored solutions are separate from persistent flag and recipe IDs.
export const routeItems = [
  {
    id: 'cellarKey',
    name: 'Cellar hatch key',
    flag: 'repaired',
    source: 'Restore the service room',
    doors: ['stairs'],
  },
  {
    id: 'towerKey',
    name: 'Bell-tower key',
    flag: 'anchor',
    source: 'Complete The bell at Wren’s Crossing',
    doors: ['tower'],
  },
  {
    id: 'labyrinthKey',
    name: 'Labyrinth-gate key',
    flag: 'anchor',
    source: 'Complete The bell at Wren’s Crossing',
    doors: ['labyrinth'],
  },
  {
    id: 'drainKey',
    name: 'Drain maintenance key',
    flag: 'key_drainKey',
    source: 'Search the old sluice works',
    doors: ['cellDoor', 'spores'],
  },
  {
    id: 'cryptKey',
    name: 'Crypt key',
    flag: 'key_cryptKey',
    source: 'Clear the Iron jailer and search the holding cells',
    doors: ['cryptDoor'],
  },
  {
    id: 'burialKey',
    name: 'Burial register seal',
    flag: 'key_burialKey',
    source: 'Clear the crypt warden and search the crypt of erased names',
    doors: ['boneDoor'],
  },
  {
    id: 'surveyKey',
    name: 'Private survey route',
    flag: 'key_surveyKey',
    source: 'Search the maze beyond the map',
    doors: ['rootVault'],
  },
  {
    id: 'studyKey',
    name: 'Apprentice’s shelf key',
    flag: 'key_studyKey',
    source: 'Search the wizard’s unfinished study',
    doors: ['shelfStair'],
  },
  {
    id: 'circleKey',
    name: 'Circle keeper’s key',
    flag: 'key_circleKey',
    source: 'Clear the bound fiend and search the summoning theatre',
    doors: ['keeperWalk'],
  },
  {
    id: 'orbitKey',
    name: 'Orrery counterweight key',
    flag: 'key_orbitKey',
    source: 'Search the room orbiting its own ceiling',
    doors: ['stormStair', 'orreryToCrypt'],
  },
  {
    id: 'rootRing',
    name: 'Root keeper’s ring',
    flag: 'key_rootRing',
    source: 'Clear the treasury mimic and search the treasury under the roots',
    doors: ['rootsToStudy'],
  },
  {
    id: 'starKey',
    name: 'Observatory key',
    flag: 'key_starKey',
    source: 'Search the observatory of lost roads',
    doors: ['bonesToStars'],
  },
];

export const mechanismRecipes = [
  {
    id: 'pattern_sluiceWinch',
    name: 'Sluice lifting winch',
    routeTool: 'sluiceWinch',
    sourceFlag: 'searched_sluice',
    source: 'Search the old sluice works',
    materials: { timber: 4, ore: 4, cloth: 2 },
    gold: 45,
    work: 6,
    category: 'mechanism',
    purpose:
      'Lifts the spillway grating and secures a dry walkway into the rat king’s cistern. Every companion can use the walkway; the guardian still needs clearing.',
    doors: ['spillway'],
  },
  {
    id: 'pattern_moonWinch',
    name: 'Moon-stair counterweight',
    routeTool: 'moonWinch',
    sourceFlag: 'searched_menagerie',
    source: 'Secure and search the moonlit menagerie',
    materials: { timber: 6, ore: 6, components: 2, cloth: 3 },
    gold: 100,
    work: 8,
    category: 'mechanism',
    purpose:
      'Anchors the floating moon stair so the guild can reach the orrery without Threadwalk.',
    doors: ['moonStair'],
  },
].map((r) => ({ ...r, pattern: true, facility: 'workshop', salvage: 0 }));

export const routeSolutions = {
  spillway: [
    {
      id: 'winch',
      kind: 'tool',
      tool: 'sluiceWinch',
      label: 'Install the Sluice lifting winch',
      recipe: 'pattern_sluiceWinch',
    },
  ],
  moonStair: [
    {
      id: 'counterweight',
      kind: 'tool',
      tool: 'moonWinch',
      label: 'Install the Moon-stair counterweight',
      recipe: 'pattern_moonWinch',
    },
  ],
  wellDrop: [
    {
      id: 'nellGuide',
      kind: 'bond',
      resident: 'nell',
      bond: 2,
      label: 'Ask Nell to secure a guide rope · trust 2',
    },
  ],
  boneDoor: [
    {
      id: 'orenSeal',
      kind: 'bond',
      resident: 'oren',
      bond: 3,
      label: 'Ask Oren to open the funeral seal · trust 3',
    },
  ],
  circleStair: [
    {
      id: 'runeCrew',
      kind: 'gold',
      gold: 90,
      flag: 'searched_mirror',
      label: 'Hire the archivist’s rune crew · 90g',
    },
  ],
  spores: [
    {
      id: 'fenCrew',
      kind: 'trust',
      flag: 'fenStep11',
      label: 'Ask the Lantern Fen keepers · earn their trust by completing Open the river road',
    },
  ],
};

export const skillLeads = {
  literacy:
    'Ivo arrives with Magical literacy. Train another mage, or use the independent archivist where offered.',
  water:
    'Choose Water breathing for a mage in Training. A crafted winch can instead secure the sluice spillway.',
  tracking: 'Train Tracking, bring Ysra, or use a relationship solution where offered.',
  echoSight:
    'Recover the Bell ward release diagram in the potion kitchen and free Maelin at the tower crown. She joins with Echo sight.',
  threadwalk:
    'Train Threadwalk for a scout. The menagerie also contains a counterweight pattern for the moon stair.',
};
