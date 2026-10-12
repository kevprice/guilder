// A branching, persistent dungeon graph. Every chamber has a specific discovery and reward.
export const chambers = [
  {
    id: 'sluice',
    name: 'The old sluice works',
    x: 850,
    y: 1510,
    w: 600,
    theme: 'sewer',
    depth: 1,
    story:
      "The passage opens behind the pump. Prison intake numbers are chalked where a maintenance crew would expect pipe measurements. Rowan follows them to a narrow stair that bypasses the public hall. A brass key hangs beside the wheel. The guild's visitors could have spent years upstairs without seeing who was brought through here.",
    item: 'riverCharm',
    key: 'drainKey',
  },
  {
    id: 'cells',
    name: 'The abandoned holding cells',
    x: 1350,
    y: 1770,
    w: 730,
    theme: 'cells',
    depth: 2,
    story:
      "The cell list records witnesses who challenged room acquisitions. Beside several names is the instruction 'hold pending clarification'. No release date follows. A loose bunk board hides a crypt key and an address for a prisoner's family. Rowan copies the address before returning the board. The testimony is added to the register with the names intact.",
    key: 'cryptKey',
    encounter: 'jailer',
  },
  {
    id: 'ratway',
    name: 'The rat king’s cistern',
    x: 400,
    y: 1790,
    w: 650,
    theme: 'sewer',
    depth: 2,
    story:
      "The cistern holds the missing crew's tools beneath the rat king's nest. When it is cleared, the party recovers an enchanted spear, a spillway map and an awl with a loose blue handle. The tools are useful, but the awl has a note tied to it. Rowan keeps it separate from the equipment being divided.",
    item: 'thornSpear',
    encounter: 'ratking',
  },
  {
    id: 'crypt',
    name: 'The crypt of erased names',
    x: 1480,
    y: 2070,
    w: 790,
    theme: 'crypt',
    depth: 3,
    story:
      'The crypt plaques have been scraped blank. In the burial register, the same entries still have names and family addresses. Rowan reads them while Mara makes copies. As the names are restored, the death ward settles and the memorial lantern lights a safe path. Some addresses may no longer exist. They will have to be checked rather than treated as another finished list.',
    item: 'lanternSpear',
    key: 'burialKey',
    encounter: 'cryptwarden',
  },
  {
    id: 'ossuary',
    name: 'The bone library',
    x: 2190,
    y: 2360,
    w: 620,
    theme: 'ossuary',
    depth: 4,
    story:
      "The bone labels record two sets of rites. The first accompanies the burials. The second was added later for experiments, without new permission from the dead. Halden's instruction is tucked into the ledger. The party seals the experimental shelves and preserves the original wishes. A protective pin in the keeper's desk can be used; the people buried here will not be entered as available materials.",
    item: 'phoenixPin',
  },
  {
    id: 'maze',
    name: 'The maze beyond the map',
    x: 180,
    y: 2130,
    w: 1080,
    theme: 'maze',
    depth: 3,
    story:
      "The maze's turns conceal a stair toward the treasury. Ysra's survey tool lies beside a route she was told not to include on the public plan. Once the chalk marks are followed, the stair is easy to see. The difficulty was deliberate. Rowan keeps the private route with the account of the cells below.",
    key: 'surveyKey',
    item: 'starCompass',
  },
  {
    id: 'oubliette',
    name: 'The oubliette beneath the well',
    x: -550,
    y: 2440,
    w: 720,
    theme: 'cells',
    depth: 4,
    story:
      "The shaft ends above a room with no door. A name is scratched on the bucket, then repeated lower down where the first letters wore away. There is no answer from the room. The guild installs a ladder and records the captive's message for their sister. The passage can be entered safely now. That does not tell them where the captive went.",
    item: 'oathShield',
    encounter: 'wellshade',
  },
  {
    id: 'vault',
    name: 'The treasury under the roots',
    x: 650,
    y: 2460,
    w: 850,
    theme: 'vault',
    depth: 4,
    story:
      "Roots have split the treasury locks. The deposits still carry owner names and return addresses. Rowan recognises their own salvage stamp on one tag. The guild records its signed fee separately and leaves the claims with Mara to trace. A ring in the keeper's desk opens a passage to the tower. Before leaving, Rowan unties the old address so it can be read without lifting the chest.",
    key: 'rootRing',
    item: 'rootCrown',
    encounter: 'vaultmimic',
  },
  {
    id: 'fungus',
    name: 'The luminous fungal caverns',
    x: 280,
    y: 2780,
    w: 1080,
    theme: 'fungus',
    depth: 5,
    story:
      "The filtration beds still clean runoff from the cells. Their keeper left measurements and a method for controlling the toxic bloom. The party follows it, preserving the beds while restoring clean water. Beside the slate is an unanswered request to inspect the prisoners' conditions. Someone here knew how to keep people alive and did not find a way to get them out.",
    item: 'frostCloak',
    encounter: 'sporebeast',
  },
  {
    id: 'rift',
    name: 'The drowned door between worlds',
    x: 1610,
    y: 3030,
    w: 850,
    theme: 'rift',
    depth: 6,
    story:
      "Water stands vertically inside the damaged doorway and leaks through its feed pipe into the lower drains. The connection's label matches the coast on Sera's chart. Closing the valve stops the saltwater entering the house without opening the route. A shielding staff is recovered from the workbench. Rowan records where its old keeper expected the sea to be.",
    item: 'wardStaff',
    encounter: 'riftkeeper',
  },
  {
    id: 'study',
    name: 'The wizard’s unfinished study',
    x: 1120,
    y: -390,
    w: 690,
    theme: 'study',
    depth: 1,
    story:
      "Ada's apprentice kept full copies of the tests removed from the public archive. The voice continued after the speaking tube was disconnected; the same result appears on three dates. The notes identify a stair concealed behind the shelves, with a key taped inside the cover. A margin note reads: ‘Maelin’s emergency bell-ward release diagram — filed under the cooling tiles in the potion kitchen.’ Maelin froze herself at the tower crown to stop the repeating alarm; the diagram is needed to release her safely. An examination lens makes the erased annotations readable. This was more than one frightened witness. Ada had measurements she chose not to publish.",
    item: 'echoLens',
    key: 'studyKey',
  },
  {
    id: 'potions',
    name: 'The suspended potion kitchen',
    x: 630,
    y: -680,
    w: 570,
    theme: 'potions',
    depth: 2,
    story:
      "The cooker changes the pull of gravity as it heats. Bottles are suspended above the floor, but the shutoff sequence survives on the cooling tiles. Following it restores the room's ordinary weight. Beneath a separate cooling tile is a sheet labelled ‘Maelin — emergency bell ward’. Its drawing matches the frozen bellkeeper at the tower crown. It supplies the missing cancellation stroke, which someone with Magical literacy can use to free Maelin without restarting the false alarm. The party takes the diagram back for her rescue. The party recovers the protective cloak kept for spills and explosions. On its inner seam someone has sewn a repair with blue thread. The laboratory had people working in it, not just apparatus waiting to be found.",
    item: 'frostCloak',
    trap: 'magical',
    skill: 'literacy',
  },
  {
    id: 'mirror',
    name: 'The mirror that kept an afternoon',
    x: 1730,
    y: -700,
    w: 800,
    theme: 'mirror',
    depth: 2,
    story:
      "The mirror repeats the afternoon before the evacuation. Vey's messenger delivers the suspension order to the study. Later in the reflection, the same messenger returns carrying a revised instruction. Echo sight distinguishes those recorded actions from a creature copying the messenger's face. Once the false reflection is cleared, a glass dagger can be recovered. The mirror shows that the stop order arrived. They still need to know why the test restarted.",
    item: 'glassDagger',
    encounter: 'mirrorfiend',
  },
  {
    id: 'summoning',
    name: 'The broken summoning theatre',
    x: 1460,
    y: -1010,
    w: 870,
    theme: 'summoning',
    depth: 3,
    story:
      "A loose stone beneath the circle protects the original suspension order. A note beside it records Vey's later authorisation to resume. The apprentice hid both when the failures were removed from the public file. After clearing the trapped creature, the guild replaces the stone and preserves the papers. Vey first stopped the test, then accepted a reassuring result and restarted it. The disaster followed that second decision.",
    key: 'circleKey',
    item: 'stormRod',
    encounter: 'boundfiend',
  },
  {
    id: 'menagerie',
    name: 'The moonlit menagerie',
    x: 2450,
    y: -1290,
    w: 900,
    theme: 'menagerie',
    depth: 4,
    story:
      "The feeding cards give specimen numbers. The keepers' notes give names, habits and the households the animals came from. A mooncat comes when Rowan reads one name aloud. The party repairs the walkways and frees the attendants. Return arrangements can begin where a home is still available; animals without one will need care here. Nobody adds them to an acquisition list.",
    item: 'moonBow',
    trap: 'physical',
    skill: 'tracking',
  },
  {
    id: 'orrery',
    name: 'The room orbiting its own ceiling',
    x: 1510,
    y: -1540,
    w: 820,
    theme: 'orrery',
    depth: 5,
    story:
      'The orrery marks the rooms available for collection. The household ledger beside it records objections the machine cannot display. Rowan disconnects the automatic selector and copies the routes needed for agreed return journeys. A ring reveals the stair toward the crypt. Before shutting the case, Rowan adds the household names to the map rather than leaving them in a separate book.',
    item: 'threadRing',
    key: 'orbitKey',
    trap: 'magical',
    skill: 'echoSight',
  },
  {
    id: 'storm',
    name: 'The storm caught in a bottle',
    x: 340,
    y: -1820,
    w: 970,
    theme: 'storm',
    depth: 6,
    story:
      'The storm bottle powers the tower lights. Its neck is cracked, and the old breastplate beside it is scarred where somebody held the grounding switch. The apprentice left a safer discharge sequence. The party uses the lightning rods instead of asking one person to absorb the current. The breastplate can be recovered once the room is stable. The lights go out briefly, then return on the repaired circuit.',
    item: 'ironHeart',
    encounter: 'stormelemental',
  },
  {
    id: 'stars',
    name: 'The observatory with no outside',
    x: 1610,
    y: -2100,
    w: 1100,
    theme: 'stars',
    depth: 7,
    story:
      "The windows show the surviving door destinations. Rowan recognises the kitchens, watchrooms and workshops from the records collected below. Some hold residents. Others are empty, or belong to people who never agreed to the guild's claim. The party marks the occupied roads before closing unsafe connections. Rowan can see what a replacement must do: keep the useful routes working without requiring them to correct every fault.",
    item: 'sunHammer',
    key: 'starKey',
  },
];
const route = (id, from, x, y, to, gate, label, secret = false) => ({
  id,
  from,
  x,
  y,
  to,
  gate,
  label,
  secret,
});
export const passages = [
  route(
    'drainDoor',
    'cellar',
    740,
    555,
    'sluice',
    { flag: 'cellarDrained' },
    'Maintenance door · drain the cellar',
  ),
  route(
    'cellDoor',
    'sluice',
    1400,
    1510,
    'cells',
    { key: 'drainKey' },
    'Iron intake gate · maintenance key',
  ),
  route(
    'spillway',
    'sluice',
    1130,
    1510,
    'ratway',
    { skill: 'water' },
    'Submerged spillway · Water breathing',
  ),
  route('cryptDoor', 'cells', 2020, 1770, 'crypt', { key: 'cryptKey' }, 'Burial stair · crypt key'),
  route(
    'boneDoor',
    'crypt',
    2210,
    2070,
    'ossuary',
    { key: 'burialKey' },
    'Funeral arch · burial register',
  ),
  route(
    'falseArch',
    'labyrinth',
    820,
    1020,
    'maze',
    { skills: ['tracking', 'echoSight', 'threadwalk'] },
    'False arch · Tracking / Echo sight / Threadwalk',
    true,
  ),
  route(
    'wellDrop',
    'maze',
    600,
    2130,
    'oubliette',
    { skill: 'tracking' },
    'Hidden well ladder · Tracking',
    true,
  ),
  route(
    'rootVault',
    'maze',
    1200,
    2130,
    'vault',
    { key: 'surveyKey' },
    'Survey tunnel · recovered route',
  ),
  route(
    'spores',
    'ratway',
    990,
    1790,
    'fungus',
    { key: 'drainKey' },
    'Filtration tunnel · maintenance key',
  ),
  route(
    'seaRift',
    'fungus',
    1280,
    2780,
    'rift',
    { skill: 'water' },
    'Drowned tunnel · Water breathing',
  ),
  route(
    'studyDoor',
    'tower',
    560,
    140,
    'study',
    { skill: 'literacy' },
    'Wizard’s stair · Magical literacy',
  ),
  route(
    'shelfStair',
    'study',
    1570,
    -390,
    'potions',
    { key: 'studyKey' },
    'Hidden shelf stair · apprentice’s notes',
    true,
  ),
  route(
    'mirrorDoor',
    'study',
    1740,
    -390,
    'mirror',
    { skill: 'echoSight' },
    'Reflection stair · Echo sight',
    true,
  ),
  route(
    'circleStair',
    'mirror',
    2450,
    -700,
    'summoning',
    { skill: 'literacy' },
    'Rune stair · Magical literacy',
  ),
  route(
    'keeperWalk',
    'summoning',
    2250,
    -1010,
    'menagerie',
    { key: 'circleKey' },
    'Keeper’s bridge · circle key',
  ),
  route(
    'moonStair',
    'menagerie',
    3100,
    -1290,
    'orrery',
    { skill: 'threadwalk' },
    'Floating moon stair · Threadwalk',
  ),
  route(
    'stormStair',
    'orrery',
    2050,
    -1540,
    'storm',
    { key: 'orbitKey' },
    'Counterweight stair · orrery key',
  ),
  route(
    'skyStair',
    'storm',
    1230,
    -1820,
    'stars',
    { skill: 'literacy' },
    'Stair of lightning glass · Magical literacy',
  ),
  route(
    'rootsToStudy',
    'vault',
    1410,
    2460,
    'study',
    { key: 'rootRing' },
    'Secret chimney to the wizard’s study',
    true,
  ),
  route(
    'orreryToCrypt',
    'orrery',
    2270,
    -1540,
    'crypt',
    { key: 'orbitKey' },
    'Spiral inside the wall · down to the crypt',
    true,
  ),
  route(
    'bonesToStars',
    'ossuary',
    2740,
    2360,
    'stars',
    { key: 'starKey' },
    'Astral funeral stair · observatory key',
    true,
  ),
];
const enemies = [
  ['jailer', 'Iron jailer', 'str', 14, 34, 'armour'],
  ['ratking', 'Rat king of the cistern', 'int', 16, 30, 'hound'],
  ['cryptwarden', 'Warden of the erased crypt', 'int', 20, 40, 'wraith'],
  ['wellshade', 'Shade in the oubliette', 'int', 35, 76, 'ghost'],
  ['vaultmimic', 'Root-bound treasury mimic', 'str', 38, 75, 'mimic'],
  ['sporebeast', 'Cavern spore beast', 'end', 40, 80, 'slime'],
  ['riftkeeper', 'Keeper of the drowned rift', 'int', 50, 90, 'golem'],
  ['mirrorfiend', 'The false messenger', 'int', 28, 68, 'wraith'],
  ['boundfiend', 'Fiend in the broken circle', 'int', 40, 85, 'golem'],
  ['stormelemental', 'The bottled storm', 'end', 55, 95, 'moth'],
];
export const earlyDungeonBalance = {
  jailer: {
    previousWork: 84,
    days: 2,
    injuryDays: 1,
    skills: { guard: 14, literacy: 6 },
    advice:
      'Guard protects the fighter while the jailer’s control markings reveal its weak joints.',
  },
  ratking: {
    previousWork: 72,
    days: 2,
    injuryDays: 1,
    skills: { water: 12, literacy: 8, guard: 6, tracking: 10 },
    advice:
      'Use intellect to follow the cistern channels and cut off the nest. Water breathing avoids the flooded approaches; a fighter can guard the explorer.',
  },
  cryptwarden: {
    previousWork: 128,
    days: 2,
    injuryDays: 1,
    skills: { literacy: 14, echoSight: 12, guard: 6 },
    advice:
      'Read the burial wards with Magical literacy. A guarded expedition can recover the names without fighting through every apparition.',
  },
};
export const dungeonContracts = enemies.map(([id, name, stat, amount, threat, shape]) => {
  const room = chambers.find((r) => r.encounter === id);
  return {
    id,
    name,
    internal: true,
    damageType:
      id === 'ratking'
        ? 'physical'
        : ['ghost', 'wraith', 'armour'].includes(shape)
          ? 'undead'
          : stat === 'int'
            ? 'magical'
            : 'physical',
    hiddenReward: true,
    days: earlyDungeonBalance[id]?.days || room.depth + 1,
    reward: 80 + room.depth * 45,
    xp: 70 + room.depth * 25,
    capacity: 6,
    injuryDays: earlyDungeonBalance[id]?.injuryDays || 2,
    lethal: room.depth >= 5,
    requires: ['discovered_' + room.id],
    exclusive: 'cleared_' + room.id,
    sets: ['cleared_' + room.id],
    shape,
    desc:
      'An internal threat in ' +
      room.name +
      '. Clearing it preserves progress on withdrawal and opens the room’s records and treasure. ' +
      (earlyDungeonBalance[id]?.advice || ''),
    checks: [{ stat, min: amount, label: 'Combined ' + stat.toUpperCase() + ' ' + amount }],
    location: { x: room.x + room.w * 0.6, y: room.y },
    result:
      'The party cleared ' +
      name +
      ' from ' +
      room.name +
      '. Its records and treasure can now be investigated.',
  };
});
export const dungeonProfiles = Object.fromEntries(
  enemies.map(([id, , stat, amount, threat]) => [
    id,
    {
      stat,
      amount,
      threat,
      skills: earlyDungeonBalance[id]?.skills || {
        guard: 10,
        tracking: 8,
        literacy: 10,
        echoSight: 12,
        stoneSong: 8,
        threadwalk: 8,
        water: 8,
      },
    },
  ]),
);
export const legacyPassagePositions = {
  studyDoor: 810,
  shelfStair: 1170,
  wellDrop: 240,
  moonStair: 2530,
  stormStair: 1570,
};
export function chamberTreasureX(room) {
  return room.encounter ? room.x + Math.round(room.w * 0.78) : room.x + 135;
}
export function chamberObjective(s, room) {
  if (room.encounter && !s.flags['cleared_' + room.id])
    return 'Clear the guardian in Contracts. Its treasure and records are on the far side of the room.';
  if (room.id === 'study')
    return s.flags.searched_study
      ? 'Use the recovered study key at the hidden shelf stair. Search the potion kitchen for the bell ward’s cancellation sequence. Echo sight will open the reflection stair later.'
      : 'Investigate the records and treasure with E. The notes contain the potion-kitchen key and tell you where Maelin’s bell-ward release diagram was filed.';
  if (room.id === 'potions')
    return s.flags.searched_potions
      ? 'Return through the study to the bell tower crown. Investigate the frozen figure, then use Ivo’s Magical literacy to awaken Maelin. She joins with Echo sight.'
      : 'Use Ivo’s Magical literacy to investigate the trapped records and treasure. Recover Maelin’s bell ward release diagram from beneath the cooling tiles.';
  return s.flags['searched_' + room.id]
    ? 'Follow the labelled passages; recovered keys and companion abilities open new routes.'
    : 'Investigate the records and treasure with E.';
}
export function roomAt(y) {
  return chambers.find((r) => r.y === y);
}
export function currentSource(y) {
  return roomAt(y)?.id || { 555: 'cellar', 1020: 'labyrinth', 140: 'tower' }[y];
}
export function passageError(s, p, c) {
  if (p.gate.flag && !s.flags[p.gate.flag]) return 'Follow the story first: ' + p.label;
  if (p.gate.key && !s.flags['key_' + p.gate.key]) return 'Find the key or clue first: ' + p.label;
  if (p.gate.skill && !c.skills.includes(p.gate.skill))
    return 'Bring a resident with ' + p.label.split(' · ').at(-1);
  if (p.gate.skills && !p.gate.skills.some((k) => c.skills.includes(k)))
    return 'This passage needs Tracking, Echo sight or Threadwalk.';
  const source = chambers.find((r) => r.id === p.from);
  if (source?.encounter && !s.flags['cleared_' + source.id])
    return 'Clear the room’s creature before using its deeper passage.';
  return null;
}
