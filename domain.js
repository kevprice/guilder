import { chambers, passages, dungeonContracts, passageError, roomAt } from './sprawl.js';
import { cleanStoredCopy } from './player-copy.js';
import { maraDialogue } from './mara.js';
import {
  residentDiscoveries,
  discoveryAvailable,
  residentPosition,
  rememberPosition,
} from './resident-discoveries.js';
export { residentDiscoveries, discoveryAvailable, residentPosition, rememberPosition };
import { openingContracts, contractLabel } from './opening-contracts.js';
export { contractLabel };
import {
  records,
  availableRecords,
  recoverRecord,
  homecomingChoices,
  releaseCompanion,
  journeys,
} from './homecoming.js';
export { records, availableRecords, recoverRecord, journeys };
export { chambers, passages, roomAt };
import {
  classes,
  talents,
  classOf,
  talentSlots,
  availableTalents,
  gainLevel,
  xpRequired,
  unspentLevels,
  spendLevel,
  awardExperience,
  migrateTraining,
  hasTalent,
  talentValue,
  damageType,
} from './classes.js';
export { classes, talents, classOf, talentSlots, availableTalents, xpRequired, unspentLevels };
import {
  equipment,
  itemDefinition,
  equipmentSlots,
  equipmentBonus,
  ensureEquipmentSlots,
  syncLegacyGear,
  returnEquipment,
  injuryNames,
  injuryLevel,
  conscious,
} from './equipment.js';
export {
  equipment,
  equipmentSlots,
  equipmentBonus,
  ensureEquipmentSlots,
  injuryNames,
  injuryLevel,
  conscious,
};
import {
  expansionMissions,
  expansionRooms,
  expansionRecruits,
  lethalBounties,
  regions,
} from './expansion.js';
export { regions };
import {
  profiles,
  dragonContract,
  homeThreats,
  assessContract,
  activeMission,
  effectiveStat,
} from './contracts.js';
export { profiles, activeMission };
import {
  currentInvestigation,
  characterAccount,
  knownHistory,
  optionalHouseLeads,
} from './story-model.js';
export { currentInvestigation, knownHistory, optionalHouseLeads };
import { sleepers, sleeperConversations, awakeningCheck } from './exploration.js';
export { sleepers };
import {
  storyMissions,
  laterContracts,
  rooms as originalRooms,
  allChoiceNodes,
  conversations,
  chapters,
} from './narrative.js';

export const rooms = [...originalRooms, ...expansionRooms];
export { conversations };
export const recruits = [
  ...expansionRecruits,
  {
    id: 'bryn',
    name: 'Bryn',
    type: 'warrior',
    str: 7,
    agi: 4,
    int: 3,
    end: 7,
    color: '#d79b65',
    bio: 'A mason of the old guild, released from an evacuation ward after thirty years. Bryn carries her father’s workshop door as a shield and hopes the surviving records will tell her what happened to him.',
  },
  {
    id: 'nell',
    name: 'Nell',
    type: 'scout',
    str: 4,
    agi: 8,
    int: 5,
    end: 5,
    color: '#99b890',
    bio: 'Nell knew the local roads and helped families reach shelter during the evacuation. She returned to search the guild for anyone left behind and was trapped inside. Thirty years later, she wants to find out what happened to those families.',
  },
  {
    id: 'ivo',
    name: 'Ivo',
    startingSkills: ['literacy'],
    type: 'mage',
    str: 3,
    agi: 4,
    int: 8,
    end: 4,
    color: '#a69bcf',
    bio: 'Ada Merrow’s apprentice, preserved inside an unfinished protection spell. Ivo still has yesterday’s lesson in his notebook. His teacher has had thirty years to live with what happened next.',
  },
].map((r) => ({
  ...r,
  bio: residentDiscoveries.find((d) => d.id === r.id)?.story || r.bio,
}));
export const contracts = [
  ...openingContracts,
  {
    id: 'road',
    name: 'Lanterns on the old road',
    days: 1,
    reward: 38,
    xp: 45,
    capacity: 2,
    desc: 'Escort the lamplighter along the abandoned guild road. Reliable work keeps a little light in the valley.',
    checks: [
      { stat: 'agi', min: 7, label: 'Agility 7 crosses the loose scree' },
      { stat: 'end', min: 7, label: 'Endurance 7 protects the lamplighter' },
    ],
    injuryDays: 2,
  },
  {
    id: 'quarry',
    name: 'The hollow quarry',
    days: 2,
    reward: 85,
    xp: 90,
    capacity: 3,
    desc: 'Recover tools from a quarry whose echoes answer a heartbeat late. Tracking finds a hidden cache.',
    checks: [
      { stat: 'str', min: 9, label: 'Strength 9 secures the falling stone' },
      { skill: 'guard', label: 'Guard shields the party' },
    ],
    injuryDays: 2,
  },
  {
    id: 'anchor',
    name: 'The bell at Wren’s Crossing',
    days: 2,
    reward: 100,
    xp: 100,
    capacity: 3,
    requires: ['ledger'],
    sets: ['anchor'],
    chapter: 'survival',
    injuryDays: 2,
    desc: 'The keeper at Wren’s Crossing needs help reaching the village bell across a damaged bridge. In return, he offers the enchanted brass fitting that can restore the guild’s missing landing.',
    checks: [
      { stat: 'agi', min: 7, label: 'Agility 7 crosses the unstable bridge' },
      { stat: 'int', min: 7, label: 'Intellect 7 identifies a safe route' },
    ],
    arrival:
      'Wren’s Crossing has built a new footbridge beside the broken one. The bell still stands on the far bank, beyond the last safe section.\nThe keeper brings out the brass fitting. It was removed from the guild landing when the connection was severed; without it the landing cannot return. He wants the party to reach the bell and check the trapped signal before taking the fitting away.\n“Your people got the children across that night,” he says. “I remember their names. I also remember the bills that came afterward.”\nWhen the token nears the bell, it rings without a clapper. A familiar voice asks the party to keep listening. The keeper sets down his tools.\nThe fitting can be taken along the safe route now. Listening longer may reveal something about the false signal, but no doorway should be opened.',
    choices: [
      {
        id: 'safe',
        label: 'Accept the anchor and the keeper’s warning',
        preview: 'Recover the landing. Honour the keeper’s boundary and gain community trust.',
        community: 1,
        result:
          'The party secures the fitting and leaves the repeating signal isolated. The keeper wraps the brass in sailcloth and sends the landing register with it.\nHe asks the guild to write once the repair holds. He would like to hear what the children they saved grew up to become.\nThe landing can be reconnected. Its chair and records have survived with it.',
      },
      {
        id: 'deep',
        label: 'Listen longer; keep the threshold shut',
        preview:
          'Recover the same landing, a disturbing clue and 20 extra gold. Gain knowledge of the voice without opening its road.',
        knowledge: 1,
        bonus: 20,
        sets: ['voiceHeard'],
        result:
          'The party records the signal without opening its connection. The first voice repeats a name from the keeper’s register. The next repeats a sentence spoken moments ago by the party itself.\nThen it says, “Stay. I can keep you here.”\nThe keeper checks that the fitting is secured before they leave. The recording provides evidence that something learns words from the connection; it does not prove that the people whose voices it uses are there.',
      },
    ],
  },
  {
    id: 'outsideArchivist',
    name: 'Escort an independent archivist',
    support: true,
    cost: 50,
    days: 4,
    reward: 0,
    xp: 80,
    capacity: 3,
    requires: ['archiveSeal'],
    sets: ['archiveAssistance'],
    exclusive: 'archiveAssistance',
    checks: [
      { stat: 'end', min: 14, label: 'Endurance 14 protects the scholar and their equipment' },
    ],
    injuryDays: 2,
    desc: 'If nobody learned Magical literacy, escort an outside scholar to the guild. Their annotated seal diagrams open the archive and release the tower and map-room wards. Costs 50 gold and exposes a party for four base days; learning literacy avoids this detour.',
    result:
      'The independent archivist reaches the guild with annotated seal diagrams. Mara records their fee and gives them a desk beside the returned archive. The guild can now open its archive and release the sealed residents without teaching anyone Magical literacy.',
  },
  ...storyMissions,
  ...laterContracts,
  dragonContract,
  ...homeThreats,
  ...expansionMissions,
  ...lethalBounties,
  ...dungeonContracts,
];
for (const m of contracts) m.threat = m.checks.map((c) => c.label).join('; or ') + '.';

export const skills = {
  warrior: [
    {
      id: 'guard',
      name: 'Guard',
      desc: 'Protects the party from falling stone and escorts travellers safely.',
      level: 2,
    },
  ],
  scout: [
    {
      id: 'tracking',
      name: 'Tracking',
      desc: 'Finds quarry caches, safe paths and shelter routes.',
      level: 2,
    },
  ],
  mage: [
    {
      id: 'literacy',
      name: 'Magical literacy',
      desc: 'Opens the returned archive and distinguishes safe seals from false commands.',
      level: 2,
    },
    {
      id: 'water',
      name: 'Water breathing',
      desc: 'Traverses the water beyond the dry cellar landing and explores the ship fragment.',
      level: 3,
    },
  ],
};
const choiceNodes = [...allChoiceNodes(), ...sleeperConversations, ...homecomingChoices];
const knownFlags = new Set([
  ...records.map((r) => 'record_' + r.id),
  ...chambers.flatMap((r) => [
    'discovered_' + r.id,
    'searched_' + r.id,
    'cleared_' + r.id,
    ...(r.key ? ['key_' + r.key] : []),
  ]),
  'opening',
  'breach',
  'repaired',
  'ledger',
  'anchor',
  'stairs',
  'cellar',
  'cellarDrained',
  'inscription',
  'libraryOpened',
  ...contracts.flatMap((m) => m.sets || []),
  ...choiceNodes.flatMap((n) => n.sets || []),
  ...rooms.flatMap((r) => [r.anchor, r.operational, r.read]),
  ...contracts.flatMap((m) => m.choices?.flatMap((c) => c.sets || []) || []),
  ...choiceNodes.flatMap((n) => n.choices.flatMap((c) => c.sets || [])),
  'free',
  'tower',
  'labyrinth',
  'towerCrown',
  'labyrinthHeart',
  'dragonFound',
  'dragonSlain',
  ...sleepers.flatMap((c) => ['found_' + c.id, 'awakened_' + c.id]),
]);

export function initial() {
  return {
    version: 2,
    day: 1,
    gold: 100,
    seed: 48271,
    selected: 'rowan',
    threats: {},
    inventory: [],
    nextItem: 0,
    roster: [],
    missions: [],
    flags: {},
    choices: {},
    community: 0,
    knowledge: 0,
    scenes: [],
    journal: [
      {
        kind: 'Observed',
        text: 'Mara, a small brass golem, reached the gate with Halden’s old brass token and a bag of tools. Rowan recognised the worn cord around it.\n“Halden built me, then raised me,” she said. “They died last autumn.”\nRowan asked her to repeat that. Mara sat on the doorstep while they tried to understand the date.\nHalden had spent years searching for a route back. Their last papers helped Mara align the token with the entrance fittings; she had finally made the crossing hold. She brought their letters too. Rowan could read them when they were ready.\nBefore dusk Mara asked where she could put her tools. The house had no safe beds and little money. There were local contracts they could take once Rowan found people fit to travel.\nRowan showed her the dry corner beside the entrance. Mara put the kettle there first.',
      },
    ],
    transactions: [],
    reports: [],
  };
}
export function home(s) {
  return [
    {
      id: 'rowan',
      name: 'Rowan',
      type: 'bound survivor',
      color: '#e2c889',
      str: 2,
      agi: 4,
      int: 7,
      end: 4,
      skills: [
        ...(s.flags.anchor ? ['inscriptions'] : []),
        ...(s.flags.observatoryRead ? ['anchorSight'] : []),
      ],
      status: 'home',
    },
    ...s.roster.filter((c) => c.status === 'home'),
  ];
}
export function chapter(s) {
  const id = s.flags.gateOpen
    ? 'freedom'
    : s.flags.truth
      ? 'preparation'
      : s.flags.observatoryRead
        ? 'truth'
        : s.flags.archiveRead
          ? 'accounts'
          : s.flags.anchor
            ? 'shore'
            : 'survival';
  return chapters.find((c) => c.id === id).title;
}
function pay(s, n, why) {
  if (s.gold < n) throw Error(`Need ${n} gold; you have ${s.gold}.`);
  s.gold -= n;
  s.transactions.unshift({ day: s.day, amount: -n, text: why });
}
export function serviceRepairCost(s) {
  return s.flags.repairSupplies ? 50 : 70;
}
function earn(s, n, why) {
  s.gold += n;
  s.transactions.unshift({ day: s.day, amount: n, text: why });
}
function note(s, text, kind = 'Observed') {
  s.journal.push({ kind, text });
}
function setFlags(s, flags = []) {
  for (const flag of flags) s.flags[flag] = true;
}
function resident(s, id) {
  const c = s.roster.find((c) => c.id === id);
  if (!c) throw Error('Find this resident in the guild first.');
  return c;
}
function readyResident(s, id) {
  const c = resident(s, id);
  if (c.status !== 'home') throw Error('This resident must be at home and fit.');
  return c;
}

export function visitFloor(s, y) {
  const flag = y === -100 ? 'towerCrown' : y === 1020 ? 'labyrinthHeart' : null;
  if (!flag || s.flags[flag]) return;
  if ((y === -100 && !s.flags.tower) || (y === 1020 && !s.flags.labyrinth))
    throw Error('This floor is not connected.');
  s.flags[flag] = true;
  note(
    s,
    y === -100
      ? 'The tower crown holds a bell encased in ice. A woman holds its clapper as if the alarm must never ring.'
      : 'The labyrinth heart holds a living map. Ysra’s unfinished tracking spell keeps drawing her in the corridor that vanished during the evacuation.',
    'Discovery',
  );
}
export function enterPassage(s, id, origin) {
  const p = passages.find((p) => p.id === id),
    c = home(s).find((c) => c.id === s.selected);
  if (!p || !c || origin.floor !== p.y || Math.abs(origin.x - p.x) > 65)
    throw Error('Walk to the labelled passage first.');
  if (c.id === 'rowan' && !s.flags.free)
    throw Error('Rowan is still bound to the entrance. Send an adventurer.');
  if (
    (p.from === 'tower' && !s.flags.tower) ||
    (p.from === 'labyrinth' && !s.flags.labyrinthHeart) ||
    (chambers.some((r) => r.id === p.from) && !s.flags['discovered_' + p.from])
  )
    throw Error('Reach this part of the guild first.');
  const error = passageError(s, p, c);
  if (error) throw Error(error);
  const r = chambers.find((r) => r.id === p.to);
  s.dungeonReturns ||= {};
  s.dungeonReturns[r.id] = { x: p.x, y: p.y, floor: p.y };
  if (!s.flags['discovered_' + r.id]) {
    s.flags['discovered_' + r.id] = true;
    note(
      s,
      r.name +
        ' discovered. ' +
        (r.encounter
          ? 'A creature guards its records. Assign a clearing party in Contracts.'
          : r.trap
            ? 'The room contains a ' +
              r.trap +
              ' trap. ' +
              r.skill +
              ' or appropriate trap training can disarm it.'
            : 'Its records and treasure remain to be investigated.'),
      'Dungeon discovery',
    );
    s.scenes.push({
      title: r.name,
      body:
        'Beyond ' +
        p.label.toLowerCase() +
        ' lies ' +
        r.name.toLowerCase() +
        '. ' +
        (r.encounter
          ? 'Movement inside forces the explorer to stop at the entrance. A clearing contract is now available.'
          : r.trap
            ? 'Marks around the mechanism warn of a ' +
              r.trap +
              ' trap. Bring the right skill before investigating.'
            : 'The explorer marks a return route before approaching the surviving records.'),
    });
    if (r.encounter) {
      s.threats ||= {};
      s.threats[r.encounter] ||= { progress: 0 };
    }
  }
  return { x: r.x + 70, y: r.y, floor: r.y, vy: 0 };
}
export function leaveChamber(s, id) {
  const r = chambers.find((r) => r.id === id),
    back = s.dungeonReturns?.[id];
  if (!r || !back) throw Error('No marked return route.');
  return { ...back, vy: 0 };
}
export function investigateChamber(s, id) {
  const r = chambers.find((r) => r.id === id),
    c = home(s).find((c) => c.id === s.selected);
  if (!r || !c || !s.flags['discovered_' + id]) throw Error('Discover this room first.');
  if (s.flags['searched_' + id])
    throw Error('The room’s records and treasure are already recovered.');
  if (damagedRooms(s).length)
    throw Error('Repair the damaged guild rooms before continuing investigations.');
  if (r.encounter && !s.flags['cleared_' + id]) throw Error('Clear the room’s creature first.');
  if (
    r.trap &&
    !c.skills.includes(r.skill) &&
    !(c.talents || []).includes(r.trap === 'physical' ? 'lockcraft' : 'runeThief')
  )
    throw Error(
      'The ' +
        r.trap +
        ' trap needs ' +
        r.skill +
        ' or ' +
        (r.trap === 'physical' ? 'Lockcraft' : 'Rune thief') +
        '. Investigating without it is unsafe.',
    );
  s.flags['searched_' + id] = true;
  if (r.key) s.flags['key_' + r.key] = true;
  if (r.item) {
    s.inventory ||= [];
    s.inventory.push({
      uid: 'item-' + (s.nextItem = (s.nextItem || 0) + 1),
      id: r.item,
      owner: null,
    });
  }
  note(
    s,
    r.story +
      (r.item
        ? ' Recovered ' + itemDefinition(r.item).name + '; it is now in the store room.'
        : '') +
      (r.key ? ' A labelled key or route clue opens the next passage.' : ''),
    'Dungeon record',
  );
  s.scenes.push({
    title: 'Investigation: ' + r.name,
    body:
      r.story +
      (r.item
        ? '\nRecovered ' + itemDefinition(r.item).name + '. Visit the shared store to equip it.'
        : '') +
      (r.key ? '\nThe recovered key or route clue now unlocks a labelled passage.' : ''),
  });
}
export function discoverSleeper(s, id) {
  const d = sleepers.find((c) => c.id === id);
  if (!d || d.requires.some((f) => !s.flags[f])) throw Error('This discovery is not accessible.');
  if (s.flags['found_' + id]) throw Error('Already investigated.');
  s.flags['found_' + id] = true;
  const text = `${d.name} · ${d.condition}. ${d.bio} Awakening: ${d.method}.`;
  note(s, text, 'Discovery');
  s.scenes.push({ title: 'Someone is still here: ' + d.name, body: text });
}
export function awaken(s, id) {
  const c = home(s).find((c) => c.id === s.selected);
  const error = awakeningCheck(s, id, c);
  if (error) throw Error(error);
  const d = sleepers.find((c) => c.id === id);
  s.roster.push({
    ...d,
    skills: [...d.skills],
    xp: 0,
    points: 0,
    gear: null,
    equipmentSlots: {},
    status: 'home',
    recovery: 0,
    visits: 0,
    bond: 0,
    traits: [d.ability],
    memories: [{ day: s.day, text: d.story }],
  });
  migrateTraining(s.roster.at(-1));
  rememberPosition(s, id, { x: d.x, floor: d.y });
  s.flags['awakened_' + id] = true;
  s.knowledge++;
  note(s, d.story, 'Awakening');
  s.scenes.push({ title: d.name + ' awakens', body: d.story + '\n' + d.ability });
}
export function recruit(s, id) {
  const r = recruits.find((c) => c.id === id);
  if (!r || (r.requires || []).some((f) => !s.flags[f]) || s.roster.some((c) => c.id === id))
    throw Error('Resident unavailable.');
  s.roster.push({
    ...r,
    level: 1,
    xp: 0,
    points: 0,
    levelChoices: {},
    skills: [...(r.startingSkills || [])],
    gear: null,
    equipmentSlots: {},
    status: 'home',
    recovery: 0,
    injury: 0,
    visits: 0,
    bond: 0,
    traits: [],
    memories: [],
  });
  note(s, `${r.name} returned to the guild.`, 'Resident');
}
export function recoverResident(s, id, origin) {
  const d = residentDiscoveries.find((d) => d.id === id);
  if (!d || !discoveryAvailable(s, d))
    throw Error('This resident’s room is not accessible or they are already free.');
  if (!origin || origin.floor !== d.y || Math.abs(origin.x - d.x) > 58)
    throw Error('Walk to the trapped resident first.');
  recruit(s, id);
  s.flags['found_' + id] = true;
  const c = s.roster.at(-1);
  c.bio = d.story;
  c.memories.push({ day: s.day, text: d.story });
  rememberPosition(s, id, { x: d.x, floor: d.y });
  note(s, d.story, 'Resident discovery');
  s.scenes.push({
    title: c.name + ' returns',
    body: d.story,
  });
}
export function advance(s, id, stat, chosenLevel) {
  const c = readyResident(s, id),
    skill = skills[c.type].find((k) => k.id === stat);
  if (skill && (c.undead || c.skills.includes(stat)))
    throw Error('Skill already learned or unavailable.');
  if (!skill && !['str', 'agi', 'int', 'end'].includes(stat)) throw Error('Unknown stat.');
  const eligible = unspentLevels(c).filter((level) => level >= (skill?.level || 2));
  const level = chosenLevel === undefined ? eligible[0] : Number(chosenLevel);
  if (!eligible.includes(level))
    throw Error('An unspent level choice and its skill requirements are needed.');
  spendLevel(c, level, skill ? 'skill' : 'stat', stat);
  if (skill) c.skills.push(stat);
  else c[stat]++;
  note(
    s,
    c.name +
      ' chose ' +
      (skill?.name || stat.toUpperCase() + ' +1') +
      ' for level ' +
      level +
      '. Other choices for that level are closed.',
    'Training choice',
  );
}
export function specialise(s, id, branch) {
  const c = readyResident(s, id);
  if (c.undead || c.specialisation || c.level < 3 || !classes[c.type]?.branches.includes(branch))
    throw Error('Choose an available class branch at level 3.');
  c.specialisation = branch;
  c.talents ||= [];
  note(
    s,
    c.name + ' chose the ' + classes[branch].name + ' path. Future levels use its stat growth.',
    'Class choice',
  );
}
export function learnTalent(s, id, key) {
  const c = readyResident(s, id),
    t = availableTalents(c).find((t) => t.id === key);
  if (c.undead || !t || talentSlots(c) < 1)
    throw Error('A class talent choice and its prerequisites are required.');
  c.talents ||= [];
  spendLevel(c, t.level, 'talent', key);
  c.talents.push(key);
  if (t.effects.echo && !c.skills.includes('echoSight')) c.skills.push('echoSight');
  note(s, c.name + ' learned ' + t.name + '. ' + t.desc, 'Class skill');
}
export function spellTargets(s, id, key) {
  const c = resident(s, id);
  if (!hasTalent(c, key) || !['home', 'injured', 'assigned', 'away'].includes(c.status)) return [];
  const mission = activeMissions(s).find((m) => m.party.includes(id));
  return s.roster.filter(
    (p) =>
      p.status !== 'dead' &&
      p.injury > 0 &&
      (key === 'mend' ? p.undead : !p.undead) &&
      (mission ? mission.party.includes(p.id) : ['home', 'injured'].includes(p.status)),
  );
}
export function castRestoration(s, id, targetId, key = 'heal') {
  const c = resident(s, id),
    target = spellTargets(s, id, key).find((p) => p.id === targetId);
  if (!target || c.lastCastDay === s.day)
    throw Error('Choose a wounded companion within reach; one spell per caster each day.');
  const amount = Math.max(
    ...c.talents.map((id) => talents.find((t) => t.id === id)?.effects[key] || 0),
  );
  target.injury = Math.max(0, target.injury - amount);
  target.recovery = Math.max(0, target.recovery - amount * 2);
  if (!target.injury) target.recovery = 0;
  if (target.status === 'injured' && !target.recovery) target.status = 'home';
  c.lastCastDay = s.day;
  const m = activeMissions(s).find((m) => m.party.includes(targetId) && m.status === 'travelling');
  if (m) {
    const next = assessContract(
      contracts.find((d) => d.id === m.id),
      m.party.map((id) => resident(s, id)),
      m.progress,
    );
    m.remaining = next.days || 0;
    m.stalled = !next.rate;
  }
  note(
    s,
    c.name +
      ' ' +
      (key === 'mend' ? 'repaired' : 'healed') +
      ' ' +
      target.name +
      ' to ' +
      injuryNames[target.injury] +
      '.',
    'Restoration',
  );
}
export function recoverRemains(s, id) {
  const c = resident(s, id);
  if (c.status !== 'dead' || c.bodyRecovered) throw Error('No missing remains to recover.');
  if (activeMissions(s).some((m) => m.party.includes(id)))
    throw Error('The fallen resident is still with an active party. Withdraw its survivors first.');
  pay(s, 60, 'Recovery crew for ' + c.name);
  day(s);
  c.bodyRecovered = true;
  returnEquipment(s, c);
  note(
    s,
    'Mara’s recovery crew brought ' + c.name + ' and their equipment home.',
    'Remains recovered',
  );
}
export function raiseDead(s, id, targetId) {
  const caster = readyResident(s, id),
    target = resident(s, targetId);
  if (
    !hasTalent(caster, 'raise') ||
    caster.lastCastDay === s.day ||
    target.status !== 'dead' ||
    !target.bodyRecovered ||
    target.undead ||
    activeMissions(s).some((m) => m.party.includes(targetId))
  )
    throw Error('Raise dead needs a rested necromancer and recovered mortal remains at home.');
  pay(s, 80, 'Raise dead · ' + target.name);
  target.originalClass = target.specialisation || target.type;
  target.undead = true;
  target.specialisation = null;
  target.talents = [];
  target.legacyTalents = [];
  for (const level of Object.keys(target.levelChoices || {}))
    target.levelChoices[level] = { kind: 'legacy', id: 'preserved' };
  target.skills = ['undeadLabour', 'graveEndurance'];
  target.str += 6;
  target.end += 8;
  target.agi = Math.max(1, target.agi - 3);
  target.int = Math.max(1, Math.floor(target.int / 2));
  target.status = 'home';
  target.injury = 0;
  target.recovery = 0;
  target.color = '#8fa98c';
  caster.lastCastDay = s.day;
  target.traits.push('Reanimated zombie');
  target.memories.push({
    day: s.day,
    text: 'Returned as a zombie through ' + caster.name + '’s death magic.',
  });
  note(
    s,
    caster.name +
      ' raised ' +
      target.name +
      ' as a zombie. Their living class abilities are gone. They have stronger bodies, reduced agility and intellect, and need repairs instead of natural healing.',
    'Reanimation',
  );
}
export function buyEquipment(s, gear) {
  const def = itemDefinition(gear);
  if (!def) throw Error('Unknown equipment.');
  if (def.rarity === 'rare' && !s.flags.truth)
    throw Error('Rare equipment requires uncovering the guild truth.');
  pay(s, def.cost, def.name + ' placed in store room');
  s.inventory ||= [];
  const item = { uid: 'item-' + (s.nextItem = (s.nextItem || 0) + 1), id: gear, owner: null };
  s.inventory.push(item);
  return item.uid;
}
export function storeAvailable(s) {
  return Boolean(s.flags.repaired && !s.damagedRooms?.service);
}
export function enterStore(s, id) {
  readyResident(s, id);
  if (!s.flags.repaired)
    throw Error('Restore the service room to unlock its adjoining store room.');
  if (s.damagedRooms?.service) throw Error('Repair the service room before opening the store.');
  s.storeVisitor = id;
}
export function leaveStore(s) {
  delete s.storeVisitor;
}
export function equipItem(s, id, uid) {
  const c = readyResident(s, id);
  if (s.storeVisitor !== id) throw Error('This resident must enter the store room.');
  const item = s.inventory?.find((e) => e.uid === uid);
  if (!item || item.owner) throw Error('Item is not in storage.');
  const def = itemDefinition(item.id);
  const slots = ensureEquipmentSlots(c);
  if (slots[def.slot]) throw Error('Unequip the current item in the ' + def.slot + ' slot first.');
  if (c.level < def.minLevel) throw Error('Requires level ' + def.minLevel + '.');
  item.owner = id;
  slots[def.slot] = { id: item.id, uid };
  syncLegacyGear(c);
}
export function unequip(s, id, slot) {
  const c = readyResident(s, id);
  if (s.storeVisitor !== id) throw Error('This resident must enter the store room.');
  const slots = ensureEquipmentSlots(c);
  if (!slot) slot = itemDefinition(c.gear)?.slot;
  const item = s.inventory?.find((e) => e.uid === slots[slot]?.uid);
  if (!item) throw Error('No equipped item.');
  item.owner = null;
  delete slots[slot];
  syncLegacyGear(c);
}
// Kept for older callers: a purchase now goes into storage, never directly onto a resident.
export function equip(s, id, gear) {
  readyResident(s, id);
  return buyEquipment(s, gear);
}
export function canWithdraw(s, m) {
  return m.status === 'travelling' || m.status === 'decision'
    ? m.party.some((id) => conscious(resident(s, id)))
    : false;
}
export function applyHarm(s, c, def) {
  c.injury = Math.min(5, (c.injury || 0) + 1);
  if (c.injury === 5 && !def.lethal) c.injury = 4;
  c.recovery += Math.max(1, def.injuryDays - (s.flags.hospice ? 1 : 0));
  if (c.injury === 5) {
    c.bodyRecovered = !!def.internal;
    c.status = 'dead';
    c.recovery = 0;
    note(
      s,
      c.name + ' died on ' + def.name + '. Their name remains in the guild register.',
      'Death',
    );
  }
}

function requirements(s, def) {
  if ((def.requires || []).some((f) => !s.flags[f])) return false;
  if (def.any && !def.any.some((f) => s.flags[f])) return false;
  if (def.communityMin && s.community < def.communityMin) return false;
  if (def.exclusive && s.flags[def.exclusive]) return false;
  if (def.personal) {
    const c = s.roster.find((c) => c.id === def.personal);
    if (!c || c.visits < (def.visits || 0)) return false;
  }
  return true;
}
export function damagedRooms(s) {
  return Object.keys(s.damagedRooms || {}).filter((id) => s.damagedRooms[id]);
}
export function repairDamage(s, id) {
  const damage = s.damagedRooms?.[id];
  if (!damage) throw Error('This room is not damaged.');
  pay(s, damage.cost, 'Repair ghost damage · ' + id);
  delete s.damagedRooms[id];
  note(
    s,
    `${id === 'service' ? 'Service room' : id === 'quarters' ? 'Quarters' : rooms.find((r) => r.id === id).name} repaired.`,
    'Room repaired',
  );
}
export function availableContracts(s) {
  return contracts.filter(
    (m) =>
      (!m.choices || !damagedRooms(s).length) &&
      requirements(s, m) &&
      !s.missions.some((x) => x.id === m.id && activeMission(x)) &&
      (!m.choices || !s.missions.some((x) => x.id === m.id && x.status === 'resolved')) &&
      (m.id !== 'dragon' || !s.flags.dragonSlain) &&
      (!m.homeEvent || (homeAttacksEnabled(s) && s.threats?.[m.id]?.active)) &&
      (!(!m.internal && !m.choices) ||
        !s.missions.some(
          (x) => x.id === m.id && x.status === 'resolved' && x.completedDay === s.day,
        )),
  );
}
export function missionCost(s, m) {
  return m.id === 'lattice' && (s.knowledge >= 4 || s.flags.laboratory || s.flags.ivoResolved)
    ? 100
    : m.cost || 0;
}
function effective(c, stat) {
  return c[stat] + equipmentBonus(c, stat);
}
export function risk(s, id, ids) {
  const def = contracts.find((m) => m.id === id);
  if (!def) throw Error('Unknown contract.');
  const party = ids.map((id) => s.roster.find((c) => c.id === id)).filter(Boolean);
  const progress = def.internal ? s.threats?.[id]?.progress || 0 : 0;
  const result = assessContract(def, party, progress);
  return {
    ...result,
    safe: result.threat === 0,
    injuryDays: Math.max(1, def.injuryDays - (s.flags.hospice ? 1 : 0)),
    reasons: [
      `Party ${result.requirement.stat.toUpperCase()} ${result.combined} / ${result.requirement.amount}`,
      result.days === null
        ? 'No progress without the required stat'
        : `${result.days} days · ${result.threat}% harm chance each day`,
      ...result.reductions.map(
        (r) => `${r.label}: −${Math.round(r.amount * 10) / 10} percentage points`,
      ),
    ],
  };
}
function random(s) {
  s.seed = (s.seed * 16807) % 2147483647;
  return s.seed % 100;
}
export function activeMissions(s) {
  return s.missions.filter(activeMission);
}
export function dispatch(s, id, ids, supplies = false) {
  const def = availableContracts(s).find((m) => m.id === id);
  if (!def) throw Error('Contract unavailable or already completed.');
  if (
    def.exclusive &&
    activeMissions(s).some((x) => contracts.find((d) => d.id === x.id)?.exclusive === def.exclusive)
  )
    throw Error(
      'One final preparation is already underway. Finish it before choosing another method.',
    );
  if (!ids.length || ids.length > def.capacity || new Set(ids).size !== ids.length)
    throw Error('Choose a distinct party within capacity.');
  const party = ids.map((id) => s.roster.find((c) => c.id === id));
  if (party.some((c) => !c || c.status !== 'home'))
    throw Error('All party members must be fit and at home.');
  if (def.personal && !ids.includes(def.personal))
    throw Error(
      `${recruits.find((c) => c.id === def.personal).name} must join their personal expedition.`,
    );
  const assessment = risk(s, id, ids);
  if (!assessment.rate)
    throw Error(
      'This party has no usable ' +
        assessment.requirement.stat.toUpperCase() +
        '. It cannot make progress.',
    );
  const cost = missionCost(s, def) + (supplies ? 10 : 0);
  if (cost) pay(s, cost, `${def.name}: preparation${supplies ? ' and one medical kit' : ''}`);
  if (def.internal) {
    s.threats ||= {};
    s.threats[id] ||= { progress: 0 };
  }
  const used = party.flatMap((c) =>
    (c.talents || [])
      .map((id) => talents.find((t) => t.id === id))
      .filter(
        (t) =>
          t &&
          (t.effects[assessment.damageType] ||
            t.effects.work ||
            (t.effects.zombieWork && party.some((p) => p.undead)) ||
            t.effects.str ||
            t.effects.agi ||
            t.effects.injuryWork ||
            t.effects.partyDeathWard ||
            t.effects.deathWard),
      ),
  );
  if (used.length)
    note(
      s,
      def.name +
        ' · party plan: ' +
        [...new Set(used.map((t) => t.name))].join(', ') +
        '. These abilities affect work, protection or emergency survival on this journey.',
      'Class plan',
    );
  const roll = random(s);
  s.missions.push({
    uid: `${s.day}-${s.seed}`,
    id,
    party: [...ids],
    participants: [...ids],
    remaining: assessment.days,
    status: 'travelling',
    supplies,
    roll,
    cost,
    simulation: 'daily',
    progress: def.internal ? s.threats[id].progress : 0,
    elapsed: 0,
    harm: [],
    kits: supplies ? 1 : 0,
  });
  party.forEach((c) => (c.status = def.internal ? 'assigned' : 'away'));
  if (ids.includes(s.selected)) s.selected = 'rowan';
  note(
    s,
    `${party.map((c) => c.name).join(', ')} ${def.internal ? 'began clearing' : 'departed for'} ${def.name}. Estimated ${assessment.days} days at ${assessment.threat}% daily harm risk.`,
    'Assignment',
  );
}
function recoverFallenEquipment(s, m) {
  if (!m.party.some((id) => resident(s, id).status !== 'dead')) return;
  for (const id of m.party) {
    const c = resident(s, id);
    if (c.status === 'dead') {
      c.bodyRecovered = true;
      returnEquipment(s, c);
    }
  }
}
function releaseParty(s, m, ids = m.party) {
  for (const id of ids) {
    const c = resident(s, id);
    if (c.status !== 'dead') c.status = c.recovery > 0 ? 'injured' : 'home';
  }
}
export function withdraw(s, uid, ids = null) {
  const m = s.missions.find((m) => m.uid === uid);
  const def = m && contracts.find((d) => d.id === m.id);
  if (!m || !def || !['travelling', 'decision'].includes(m.status))
    throw Error('No active party to withdraw.');
  if (!def.internal && !canWithdraw(s, m))
    throw Error('Nobody is conscious enough to lead a withdrawal.');
  if (!def.internal) {
    if (ids) throw Error('An external party must retreat together, carrying its wounded.');
    m.status = 'returning';
    m.remaining = 1;
    m.retreat = true;
    if (m.party.some((id) => hasTalent(resident(s, id), 'retreat'))) {
      recoverFallenEquipment(s, m);
      releaseParty(s, m);
      m.status = 'withdrawn';
      m.remaining = 0;
    }
    note(
      s,
      'The party is withdrawing from ' +
        def.name +
        '. Conscious survivors carry the wounded; they return in one day, or immediately with Escape artist. No reward is paid.',
      'Withdrawal',
    );
    return;
  }
  const leaving = ids || [...m.party];
  if (
    !leaving.length ||
    new Set(leaving).size !== leaving.length ||
    leaving.some((id) => !m.party.includes(id))
  )
    throw Error('Choose assigned members of this party.');
  const names = leaving.map((id) => resident(s, id).name);
  releaseParty(s, m, leaving);
  m.party = m.party.filter((id) => !leaving.includes(id));
  if (!m.party.length) {
    m.status = 'withdrawn';
    m.remaining = 0;
  } else {
    const next = assessContract(
      def,
      m.party.map((id) => resident(s, id)),
      m.progress,
    );
    if (!next.rate) {
      names.push(...m.party.map((id) => resident(s, id).name));
      releaseParty(s, m);
      m.party = [];
      m.status = 'withdrawn';
      m.remaining = 0;
    } else m.remaining = next.days;
  }
  note(
    s,
    `${names.join(', ')} withdrew from ${def.name}. Damage already dealt is preserved; no reward has been claimed.`,
    'Withdrawal',
  );
  s.reports.unshift({
    day: s.day,
    title: 'Withdrawal: ' + def.name,
    text: `${names.join(', ')} returned from the guild defence. Clearing progress: ${Math.floor((m.progress / (def.days * profiles[def.id].amount)) * 100)}%. Injuries remain and require recovery.`,
    reward: 0,
    xp: 0,
    cost: 0,
    party: names,
  });
}
function applyChoice(s, key, choice) {
  const result = outcomeText(s, choice.result);
  s.choices[key] = choice.id;
  setFlags(s, choice.sets);
  s.community += choice.community || 0;
  s.knowledge += choice.knowledge || 0;
  for (const [id, delta] of Object.entries(choice.bond || {})) {
    const c = s.roster.find((c) => c.id === id);
    if (c) {
      c.bond += delta;
      c.memories.push({ day: s.day, text: result });
    }
  }
  if (choice.trait) {
    const c = resident(s, choice.trait.id);
    if (!c.traits.includes(choice.trait.name)) {
      c.traits.push(choice.trait.name);
      c[choice.trait.stat]++;
    }
  }
  note(s, result, 'Decision');
  return result;
}
function outcomeText(s, text) {
  if (!s.roster.some((c) => c.id === 'bryn'))
    text = text
      .replace('Bryn closes the journal', 'Mara closes the journal')
      .replace(
        'Bryn turns one key and Mara the other',
        'Mara turns one key and an outside keeper the other',
      );
  if (!s.flags.brynResolved)
    text = text.replace(
      'Bryn asks to put the memorial rubbing where a patient can read it without sitting up.',
      'Mara puts the guild’s corrected register where a patient can read it without sitting up.',
    );
  return text;
}
function legacyRisk(s, def, ids) {
  const party = ids.map((id) => resident(s, id));
  return {
    safe: def.checks.some((check) =>
      party.some((c) =>
        check.skill ? c.skills.includes(check.skill) : effectiveStat(c, check.stat) >= check.min,
      ),
    ),
    injuryDays: Math.max(1, def.injuryDays - (s.flags.hospice ? 1 : 0)),
  };
}
function resolve(s, m, choice) {
  if (m.status === 'resolved') return;
  const def = contracts.find((x) => x.id === m.id),
    party = m.party.map((id) => resident(s, id)),
    assessment = m.simulation === 'daily' ? risk(s, m.id, m.party) : legacyRisk(s, def, m.party);
  let reward = def.reward,
    details = [],
    outcome = '';
  if (!def.homeEvent) {
    const loot = party.reduce((n, c) => n + talentValue(c, 'loot'), 0);
    reward += loot;
    if (loot) details.push('Class salvage skills recovered ' + loot + ' extra gold.');
  }
  if (m.id === 'quarry' && party.some((c) => c.skills.includes('tracking'))) {
    reward += 20;
    details.push('Tracking uncovered a cache: +20 gold.');
  }
  if (m.simulation !== 'daily' && !assessment.safe && m.roll < 65 && !m.supplies) {
    party[0].status = 'injured';
    party[0].recovery = assessment.injuryDays;
    details.push(
      `${party[0].name} was injured: ${assessment.injuryDays} days of recovery. The party lacked the recommended capability.`,
    );
  } else if (m.simulation !== 'daily')
    details.push(
      assessment.safe
        ? 'The party’s capabilities secured a safe passage.'
        : m.supplies
          ? 'Medical supplies prevented a lasting injury.'
          : 'A fortunate passage avoided injury.',
    );
  if (m.simulation === 'daily') {
    details.push(`Completed after ${m.elapsed} working days. ${m.harm.length} daily harm events.`);
    for (const hit of m.harm)
      details.push(
        `Day ${hit.day}: ${resident(s, hit.id).name} was hurt${hit.treated ? ' · medical kit used' : ` · ${hit.injuryDays} recovery days added`}.`,
      );
  }
  if (def.homeEvent) {
    s.threats[def.id].active = false;
    note(
      s,
      `${def.name} was cleared by ${party.map((c) => c.name).join(', ')}. the guild is safe again.`,
      'Home defended',
    );
    s.scenes.push({
      title: 'The guild is safe',
      body: `${party.map((c) => c.name).join(', ')} cleared ${def.name.toLowerCase()}. The damage stops. They earned experience defending their home, and the guild is safe.`,
    });
  }
  if (def.id === 'dragon') {
    setFlags(s, def.sets);
    s.scenes.push({
      title: 'The furnace is clear',
      body: 'The dragon falls beside the old furnace. The party waits for the flames to die before searching its nest. Beneath the ash are guild pay chests containing 240 gold and the missing forge tools. The furnace room can be used again.',
    });
    note(
      s,
      'The furnace dragon was killed. Its nest held 240 gold and the guild’s old forge tools.',
      'Threat cleared',
    );
  }
  if (def.internal && !def.homeEvent && def.id !== 'dragon') {
    setFlags(s, def.sets);
    note(s, def.result, 'Dungeon cleared');
    s.scenes.push({ title: def.name + ' cleared', body: def.result });
  }
  if (def.choices) {
    outcome = applyChoice(s, 'mission:' + def.id, choice);
    setFlags(s, def.sets);
    reward += choice.bonus || 0;
    details.push(outcome);
    s.scenes.push({
      title: def.name,
      body:
        outcome +
        (def.id === 'anchor'
          ? '\nThe keeper also sends the bell-tower and labyrinth-gate keys, recovered from the old landing register. The brass fitting is installed in its service-room socket.\nTimber settles beyond the doorway. The missing landing comes into view with its worn chair still against the wall.\nRowan stops at the old boundary. Mara waits on the other side. They take one step, then another. The familiar pain does not begin.\nThere are marks on the timber they can now read. The fitting has returned one piece of the house, and Rowan can move through it. Other surviving fittings may lead to other rooms.'
          : ''),
    });
  }
  if (def.support) {
    setFlags(s, def.sets);
    details.push(def.result);
    note(s, def.result, 'Outside assistance');
    s.scenes.push({ title: def.name, body: def.result });
  }
  if (def.oneShot) {
    setFlags(s, def.sets);
    details.push(def.result);
    note(s, def.result, 'Contract completed');
    s.scenes.push({ title: def.name, body: def.result });
  }
  recoverFallenEquipment(s, m);
  if (reward > 0) {
    earn(s, reward, def.name);
    note(s, 'Received ' + reward + ' gold for ' + def.name + '.', 'Payment');
  }
  if (def.xp > 0)
    note(
      s,
      party
        .filter((c) => c.status !== 'dead')
        .map((c) => c.name)
        .join(', ') +
        ' earned ' +
        def.xp +
        ' XP each.',
      'Experience',
    );
  for (const c of party) {
    if (c.status === 'dead') continue;
    const leveled = awardExperience(c, def.xp);
    c.visits++;
    if (leveled)
      note(
        s,
        c.name + ' reached level ' + c.level + '. Choose one advancement in Training.',
        'Level gained',
      );
    if (m.simulation === 'daily') c.status = c.recovery > 0 ? 'injured' : 'home';
    else if (c.status === 'away') c.status = 'home';
    c.memories.push({
      day: s.day,
      text: `Returned from ${def.name}.${choice ? ' ' + outcome : ''}`,
    });
  }
  m.status = 'resolved';
  m.completedDay = s.day;
  s.reports.unshift({
    day: s.day,
    title: def.name,
    text: details.join('\n\n'),
    reward,
    xp: def.xp,
    cost: m.cost || 0,
    party: party.map((c) => c.name),
  });
}
function homeAttacksEnabled(s) {
  return s.roster.filter((c) => !['dead', 'departed'].includes(c.status)).length >= 2;
}
export function dailyHomeEvent(s) {
  if (!homeAttacksEnabled(s)) return;
  s.eventSeed = ((s.eventSeed ?? 97) * 48271) % 2147483647;
  const current = homeThreats.find((d) => s.threats?.[d.id]?.active);
  if (current) {
    const t = s.threats[current.id];
    t.age++;
    if (!activeMissions(s).some((m) => m.id === current.id)) {
      if (current.id === 'ghost' || current.assault) {
        t.undefended = (t.undefended || 0) + 1;
        if (t.undefended % 2 === 1) {
          const victims = s.roster.filter((c) => c.status === 'home');
          const victim = victims.length ? victims[s.eventSeed % victims.length] : null;
          if (victim) {
            victim.status = 'injured';
            victim.injury = Math.max(1, victim.injury || 0);
            victim.recovery = 2;
            note(
              s,
              `${current.name} attacked ${victim.name} in the guildhall. They need two days of recovery. It will attack a room next if nobody defends the house.`,
              'Ghost attack',
            );
          } else {
            s.rowanRecovery = 2;
            note(
              s,
              `${current.name} attacked Rowan while the adventurers were unavailable. Rowan needs two days of recovery before investigating or making story decisions. The next undefended attack will damage a room.`,
              'Home attack',
            );
          }
        } else {
          const targets = [
            ...(s.flags.repaired ? [{ id: 'service', name: 'Service room' }] : []),
            ...rooms.filter((r) => s.flags[r.operational]).map((r) => ({ id: r.id, name: r.name })),
            { id: 'quarters', name: 'Quarters' },
          ];
          s.damagedRooms ||= {};
          const target = targets.find((r) => !s.damagedRooms[r.id]);
          if (target) {
            s.damagedRooms[target.id] = { day: s.day, cost: 30 };
            note(
              s,
              `${current.name} smashed ${target.name}. Story work is paused until the damaged room is repaired for 30 gold. Clearing the threat does not repair it.`,
              'Room damaged',
            );
          }
        }
      } else {
        const damage = Math.min(8, s.gold);
        s.gold -= damage;
        if (damage)
          s.transactions.unshift({
            day: s.day,
            amount: -damage,
            text: current.name + ' · undefended damage',
          });
        t.damage = (t.damage || 0) + damage;
        note(
          s,
          `${current.name} remains undefended. Damaged supplies and fittings cost ${damage} gold today.`,
          'Guild damage',
        );
      }
    }
    return;
  }

  if (s.roster.length && s.eventSeed % 100 < 8) {
    const unlocked = homeThreats.slice(
      0,
      Math.min(homeThreats.length, 2 + Math.floor(s.roster.length / 3)),
    );
    const def = unlocked[Math.floor(s.eventSeed / 100) % unlocked.length];
    s.threats ||= {};
    const locations = [
      { room: 'guildhall', x: 640, y: 380 },
      ...(s.flags.repaired ? [{ room: 'service', x: 865, y: 380 }] : []),
      ...rooms
        .filter((r) => s.flags[r.operational])
        .map((r) => ({ room: r.id, x: r.x + 170, y: 380 })),
    ];
    const location = locations[Math.floor(s.eventSeed / 1000) % locations.length];
    s.threats[def.id] = { progress: 0, active: true, age: 0, damage: 0, ...location };
    note(
      s,
      `${def.name}! Assign a defence party from residents at home. Unanswered attacks damage the guild each following day.`,
      'Home threat',
    );
    s.scenes.push({
      title: 'Defend your home',
      body:
        def.desc +
        '\nOpen Contracts to assign a defence party. Residents away on expeditions cannot help.',
    });
  }
}
export function homeDanger(s) {
  if (!homeAttacksEnabled(s)) return null;
  return homeThreats.find((d) => s.threats?.[d.id]?.active) || null;
}
export function day(s) {
  s.day++;
  if (s.rowanRecovery > 0) s.rowanRecovery--;
  s.roster
    .filter((c) => c.status === 'injured' && !c.undead)
    .forEach((c) => {
      c.recovery--;
      if (c.injury) c.injury = Math.min(c.injury, Math.ceil(c.recovery / 2));
      if (c.recovery <= 0) {
        c.recovery = 0;
        c.injury = 0;
        c.status = 'home';
      }
    });
  dailyHomeEvent(s);
  for (const m of s.missions.filter((m) => ['travelling', 'returning'].includes(m.status))) {
    if (m.status === 'returning') {
      if (--m.remaining <= 0) {
        recoverFallenEquipment(s, m);
        releaseParty(s, m);
        m.status = 'withdrawn';
        s.reports.unshift({
          day: s.day,
          title: 'Retreat: ' + contracts.find((d) => d.id === m.id).name,
          text: 'Survivors returned with the wounded. No reward was claimed.',
          reward: 0,
          xp: 0,
          cost: m.cost || 0,
          party: m.party.map((id) => resident(s, id).name),
        });
      }
      continue;
    }
    const def = contracts.find((d) => d.id === m.id);
    if (m.simulation !== 'daily') {
      if (--m.remaining <= 0) {
        if (def.choices) m.status = 'decision';
        else resolve(s, m);
      }
      continue;
    }
    const assessment = assessContract(
      def,
      m.party.map((id) => resident(s, id)),
      m.progress,
    );
    m.elapsed++;
    m.progress = Math.min(assessment.work, Math.round((m.progress + assessment.rate) * 100) / 100);
    if (random(s) < assessment.threat) {
      const targets = m.party.filter((id) => resident(s, id).status !== 'dead');
      const target = targets[Math.floor((random(s) * targets.length) / 100)],
        c = resident(s, target),
        treated = m.kits > 0,
        injuryDays = Math.max(1, def.injuryDays - (s.flags.hospice ? 1 : 0));
      let warded = false;
      if (treated) m.kits--;
      else {
        const ward =
          m.party.map((id) => resident(s, id)).find((p) => hasTalent(p, 'partyDeathWard')) ||
          ((c.talents || []).some((id) => talents.find((t) => t.id === id)?.effects.deathWard)
            ? c
            : null);
        if (c.injury === 4 && def.lethal && ward && !(m.wardsUsed || []).includes(ward.id)) {
          m.wardsUsed ||= [];
          m.wardsUsed.push(ward.id);
          warded = true;
          note(
            s,
            ward.name +
              ' prevented a fatal blow to ' +
              c.name +
              '. This ward is spent for the assignment.',
            'Death ward',
          );
        } else applyHarm(s, c, def);
      }
      m.harm.push({
        day: s.day,
        id: target,
        injuryDays: treated || warded ? 0 : injuryDays,
        treated,
        warded,
        level: injuryLevel(c),
      });
      note(
        s,
        `${c.name}: ${injuryNames[injuryLevel(c)]} on ${def.name}${treated ? '; the medical kit treated the injury' : warded ? '; a death ward prevented the fatal blow' : `; ${c.status === 'dead' ? 0 : injuryDays} recovery days added`}.`,
        'Daily harm',
      );
    }
    const next = assessContract(
      def,
      m.party.map((id) => resident(s, id)),
      m.progress,
    );
    m.remaining = next.rate > 0 ? next.days : 0;
    m.stalled = !next.rate && m.progress < assessment.work;
    if (m.party.every((id) => resident(s, id).status === 'dead')) {
      m.status = 'failed';
      m.remaining = 0;
      note(
        s,
        'The entire party was lost on ' + def.name + '. The contract remains unfinished.',
        'Party lost',
      );
      continue;
    }
    if (def.internal) s.threats[def.id].progress = m.progress;
    if (m.stalled && !def.lethal && def.internal) {
      withdraw(s, m.uid);
      continue;
    }
    if (m.stalled && !def.lethal && !def.internal) {
      m.status = 'returning';
      m.remaining = 1;
      m.retreat = true;
      note(
        s,
        'Local rescuers are bringing the unconscious party home from ' +
          def.name +
          '. The contract failed and pays nothing.',
        'Rescue',
      );
    }
    if (m.remaining === 0 && !m.stalled) {
      if (def.choices) m.status = 'decision';
      else resolve(s, m);
    }
  }
}
export function decide(s, uid, id) {
  const m = s.missions.find((m) => m.uid === uid);
  if (!m || m.status !== 'decision') throw Error('No pending choice.');
  if (damagedRooms(s).length)
    throw Error('Repair the damaged rooms before continuing this story report.');
  const choice = contracts.find((c) => c.id === m.id).choices.find((c) => c.id === id);
  if (!choice) throw Error('Unknown expedition choice.');
  resolve(s, m, choice);
}
export function availableChoices(s, who = null) {
  return choiceNodes.filter(
    (n) =>
      (n.who || !damagedRooms(s).length) &&
      !s.choices[n.id] &&
      requirements(s, n) &&
      !(n.until || []).some((f) => s.flags[f]) &&
      (!n.who ||
        s.roster.some(
          (c) => c.id === n.who && c.status === 'home' && c.visits >= (n.visits || 0),
        )) &&
      (who ? n.who === who : !n.who),
  );
}
export function choiceNode(s, id) {
  return availableChoices(s)
    .concat(...s.roster.map((c) => availableChoices(s, c.id)))
    .find((n) => n.id === id);
}
export function narrativeChoice(s, id, option) {
  if (s.selected === 'rowan' && s.rowanRecovery > 0)
    throw Error('Rowan is recovering from the ghost attack.');
  const node = choiceNode(s, id);
  if (!node) throw Error('This discovery or conversation is unavailable or already answered.');
  if (id === 'release' && s.selected !== 'rowan')
    throw Error('Bring Rowan to the threshold. Removing their binding is Rowan’s own decision.');
  if (id === 'release' && !home(s)[0].skills.includes('anchorSight'))
    throw Error(
      'Rowan must learn Anchor sight from the restored observatory before inspecting the replacement anchors.',
    );
  const choice = node.choices.find((c) => c.id === option);
  if (!choice || !requirements(s, choice)) throw Error('Choice prerequisites not met.');
  const outcome = applyChoice(s, id, choice);
  if (id.startsWith('homecoming-')) releaseCompanion(s, node.who);
  setFlags(s, node.sets);
  s.scenes.push({ title: node.title, body: outcome });
}
export function optionAvailable(s, option) {
  return requirements(s, option);
}
export function missionLetter(s, id) {
  const m = contracts.find((m) => m.id === id);
  if (!m?.arrival) return '';
  const callbacks = {
    navigator: s.flags.voiceHeard
      ? 'Sera listens to the keeper’s recording. It uses words spoken by the party during the visit. “It did that on the ship,” she says. “My mother’s voice first. Then mine. I was standing there listening to it.”'
      : 'Sera recognises the keeper’s sailcloth. “He still wraps everything twice,” she says. “Did you help him with the bell?” She listens to the account before bringing out her charts.',
    orchard: s.flags.openArchive
      ? 'Edda has read the corrected acquisition record. Her mother’s letter is attached now. “I wondered if you’d still have it,” she says. She points out the unanswered question about returning the greenhouse.'
      : 'Edda returns the verification questions with answers and two dates corrected. She asks the party to read those corrections before discussing the root system.',
    lens: s.flags.crewSaved
      ? 'A rescued deckhand has sent Elian a letter asking about the alarm. He remembers being told to stay aboard after the evacuation began. Elian reads the question twice before setting the letter beside his watch log.'
      : 'Sera’s chart marks Elian’s tower with the evacuation signal. He checks the mark against his log. The dates match; the contradictory orders do not.',
    ivoPast: s.flags.laboratory
      ? 'The party brings a living seal grown from the greenhouse roots. Ada asks where they came from and what was promised in exchange. She checks the growth measurements before discussing the transfer.'
      : 'Ada has prepared a mechanical alternative that needs no rare roots. The party checks its settings against the copied archive diagrams. The operator must not leave the circle until the replacement has held.',
    witness: s.flags.elianHome
      ? 'Elian waits for the cylinder at the guild. His watch log can establish when the signal changed. The medical recording may show what happened afterward.'
      : s.flags.calibratedLens
        ? 'Elian’s log accompanies the party. Its alarm times match the cylinder’s station marks. Both records place the treatment during the evacuation, before the doors were severed.'
        : 'The observatory measurements identify the infirmary’s old position. The cylinder’s station stamp matches it. The record can be compared with the surviving accounts rather than accepted only because it speaks.',
    covenant: s.flags.hospice
      ? 'A recovering greenhouse patient asks who represents residents without a home village. The keepers add a place for them before the covenant is signed.'
      : 'Edda brings an apple cutting from the first return shipment. She sets it beside the anchor drawings and asks when the next batch will be ready.',
    lattice: s.flags.adaHome
      ? 'Ada hands the test sheet to another keeper. She will answer questions about the design, but the frame must also work when its author is not operating it.'
      : s.flags.adaStayed
        ? 'Ada sends corrections checked by the monastery’s relief keeper. Both sign the revised timing sheet. The test crew checks the new settings against the frame.'
        : 'The published design includes operating settings and failure tests. The crew follows them in order. The system must work without its author or a particular companion present.',
  };
  let text = m.arrival + (callbacks[id] ? '\n' + callbacks[id] : '');
  if (id === 'witness') {
    if (s.choices.orenRemember)
      text +=
        '\nOren’s drawing places the first failure beneath the rear-stair door mechanism. The recording captures the collapse after the alarm changed. His account and the cylinder describe different parts of the same event.';
    if (s.choices.maelinRemember)
      text +=
        '\nThe cylinder records three strokes, an extra strike and the continuous alarm. Maelin’s testimony identifies the first signal as evacuation and the second as the false instruction to wait.';
    if (s.choices.ysraRemember)
      text +=
        '\nYsra’s map shows the last route into the infirmary. The recording identifies the carried patient as Rowan, the face she could not see from the corridor.';
  }
  if (!s.roster.some((c) => c.id === 'nell'))
    text = text.replace(
      'Nell asks whether strangers will have a place at the table.',
      'A shelter keeper asks whether strangers will have a place at the table.',
    );
  return text;
}
export function roomAvailable(s, room) {
  return !!s.flags[room.anchor];
}
export function walkingBoundary(s, id) {
  return id === 'rowan' && !s.flags.repaired && !s.flags.anchor ? 680 : worldBoundary(s);
}
export function worldBoundary(s) {
  let max = s.flags.anchor ? 1220 : s.flags.breach ? 955 : 690;
  for (const room of originalRooms) {
    if (!roomAvailable(s, room)) break;
    if (room.id === 'library' && !s.flags.libraryOpened) {
      max = 1260;
      break;
    }
    max = room.x + room.w - 25;
  }
  if (s.flags.free)
    for (const room of expansionRooms) {
      if (!roomAvailable(s, room)) break;
      max = room.x + room.w - 25;
    }
  return max;
}
export function repairRoom(s, id) {
  if (damagedRooms(s).length)
    throw Error('Repair the ghost-damaged rooms before restoring further story rooms.');
  const room = rooms.find((r) => r.id === id);
  if (!room || !roomAvailable(s, room)) throw Error('Recover this room’s anchor first.');
  if (s.flags[room.operational]) throw Error('The room is already operational.');
  const c = home(s).find((c) => c.id === s.selected);
  if (!c) throw Error('Select an available resident.');
  if (room.requiresSkill && !c.skills.includes(room.requiresSkill) && !s.flags.archiveAssistance)
    throw Error(
      'The archive seal requires a present resident with Magical literacy. Learn literacy or escort the independent archivist in Contracts.',
    );
  if (room.id === 'threshold' && !s.flags.prepared)
    throw Error('Prepare a safe covenant or containment lattice before stabilising the threshold.');
  pay(s, room.cost, `${room.name}: workers, materials and stabilisation`);
  s.flags[room.operational] = true;
  if (room.id === 'library') {
    s.flags.libraryOpened = true;
    if (!c.skills.includes('literacy'))
      note(
        s,
        'The independent archivist checks the locking spell while ' +
          c.name +
          ' directs the restoration crew. The guild used outside expertise because its residents chose other training.',
        'Different route',
      );
  }
  note(
    s,
    `${room.name} is restored. Its former purpose is preserved in the surviving records. New work can begin here.`,
  );
}
export function interact(s, action) {
  if (action === 'mara') {
    s.scenes.push(maraDialogue(s));
    return;
  }
  if (action.startsWith('repairDamage:')) {
    repairDamage(s, action.slice(13));
    return;
  }
  if (damagedRooms(s).length && ['ledger', 'inscription'].includes(action))
    throw Error('Repair the damaged guild rooms before continuing story work.');
  if (s.selected === 'rowan' && s.rowanRecovery > 0)
    throw Error('Rowan is recovering from the ghost attack.');
  const c = home(s).find((c) => c.id === s.selected);
  if (!c) throw Error('Select an available resident.');
  if (action === 'drain') {
    if (!s.flags.stairs) throw Error('Repair the cellar stairs first.');
    if (s.flags.cellarDrained) throw Error('The cellar is already drained.');
    if (!c.skills.includes('water'))
      throw Error('Water breathing is required to reach the submerged drain wheel.');
    s.flags.cellarDrained = true;
    note(
      s,
      `${c.name} opened the submerged sluice. Water emptied into the old drainage tunnel. The wheel is locked open; every resident can now use the cellar.`,
      'Area unlocked',
    );
    s.scenes.push({
      title: 'The cellar drains',
      body: `${c.name} dives beside the ship’s bow and finds the red drain wheel beneath a layer of silt. Turning it lifts the sluice gate.\nThe water runs into the old drainage tunnel until the stone floor is exposed. The wheel locks open. Everyone can now enter the cellar without Water breathing.`,
    });
    return;
  }
  if (action === 'dragon') {
    if (!s.flags.labyrinthHeart) throw Error('Find the lower labyrinth first.');
    if (s.flags.dragonFound) return;
    s.flags.dragonFound = true;
    s.threats ||= {};
    s.threats.dragon = { progress: 0 };
    note(
      s,
      'Beyond the labyrinth’s east door, a dragon has nested around the old furnace. The party cannot approach its hoard safely. A clearing contract is now available.',
      'Internal threat',
    );
    s.scenes.push({
      title: 'A dragon beneath the guild',
      body: 'Heat escapes through the east door. Inside, the furnace has been dragged open and packed with nesting stone. A dragon lifts its head from the coals.\nThe resident closes the door before it can force its shoulders through. Claws scrape against the other side.',
    });
    return;
  }
  if (action === 'tower') {
    if (!s.flags.anchor)
      throw Error(
        'The tower hatch is locked. Complete The bell at Wren’s Crossing to recover its key.',
      );
    if (s.flags.tower) throw Error('Tower already restored.');
    pay(
      s,
      s.roster.some((r) => r.skills.includes('stoneSong') && r.status === 'home') ? 40 : 80,
      'Tower stair and bell landings',
    );
    s.flags.tower = true;
    note(
      s,
      'Two bell-tower landings return above the quarters. Blue ice surrounds a figure at the crown.',
      'Discovery',
    );
    return;
  }
  if (action === 'labyrinth') {
    if (!s.flags.stairs || !s.flags.anchor)
      throw Error(
        'The labyrinth gate is locked. Wren’s Crossing awards its key; repair the cellar stair to reach the gate.',
      );
    if (s.flags.labyrinth) throw Error('Labyrinth already opened.');
    s.flags.labyrinth = true;
    note(
      s,
      'A brass thread under the dry landing unrolls into two labyrinth floors. Someone has erased the exit from the map.',
      'Discovery',
    );
    return;
  }
  if (action.startsWith('discover:')) {
    discoverSleeper(s, action.slice(9));
    return;
  }
  if (action.startsWith('awaken:')) {
    awaken(s, action.slice(7));
    return;
  }
  if (action.startsWith('room:')) {
    repairRoom(s, action.slice(5));
    return;
  }
  if (action === 'wall') {
    if (s.flags.breach) throw Error('The wall is already open.');
    if (c.str < 10) throw Error(`${c.name} has Strength ${c.str}. This wall needs Strength 10.`);
    s.flags.breach = true;
    note(s, `${c.name} broke through a wall bricked from the inside. A service room lies beyond.`);
  } else if (action === 'repair') {
    if (!s.flags.breach || s.flags.repaired)
      throw Error('Breach the wall before restoring the service room.');
    pay(s, serviceRepairCost(s), 'Service room workers and materials');
    s.flags.repaired = true;
    note(
      s,
      'The cleared service room contains expedition shelves and a cellar key hung beside the stair plan. A rack conceals the old ledger. Several entries refer to disputed acquisitions omitted from the public catalogue. The plastered wall kept visitors away from these records as well as from the damaged room.',
    );
  } else if (action === 'ledger') {
    if (!s.flags.repaired || s.flags.ledger)
      throw Error('Restore the service room to uncover its ledger.');
    s.flags.ledger = true;
    note(
      s,
      'The hidden ledger lists the brass fitting for the missing landing and the socket where it belongs. It was sent to Wren’s Crossing during the severance. A newer letter from the keeper offers to return it if a party can help reach the village bell. An evacuation instruction warns against opening the great threshold. The repair has a location; the warning still needs an explanation.',
    );
  } else if (action === 'stairs') {
    if (!s.flags.repaired)
      throw Error(
        'The cellar hatch is locked. Restore the service room to recover its access key.',
      );
    if (s.flags.stairs) throw Error('Stairs already repaired.');
    pay(s, 45, 'Cellar stair repairs');
    s.flags.stairs = true;
    note(
      s,
      'The workers replace the cellar stair and brace the ceiling over its dry landing. Mason’s marks continue into the buried passages below. Water fills the passage beyond it; a resident with Water breathing can reach the submerged drain wheel, empty the cellar and open it to everyone.',
    );
  } else if (action === 'cellar') {
    if (!s.flags.stairs || (!s.flags.cellarDrained && !c.skills.includes('water')))
      throw Error(
        'The stairs lead to a dry landing. Investigating the submerged ship requires Water breathing.',
      );
    if (s.flags.cellar) throw Error('The ship fragment has been recorded.');
    s.flags.cellar = true;
    note(
      s,
      'The bow carries Sera Venn’s name. Its slate records the coast where the stern was stranded during the severance. Find Sera there to learn what happened to the ship’s passengers and recover her archive chart.',
    );
    s.scenes.push({
      title: 'A ship with nowhere to sail',
      body: 'The ship’s bow is lodged behind the cellar masonry. A spoon has slipped beneath a bunk; a child’s shoe rests beside it. Rowan remembers passengers sleeping here during the evacuation.\nThe navigator’s slate names Captain Sera Venn and marks the coast where the stern was stranded. The ship did not enter the cellar whole. Its evacuation connection broke while passengers were moving through it.\nThe surviving chart gives the party somewhere to look for Sera. If the landing has not yet returned, its fitting must be recovered before Rowan can read the matching guild inscription.',
    });
  } else if (action === 'inscription') {
    if (c.id !== 'rowan' || !c.skills.includes('inscriptions'))
      throw Error('Rowan must reconnect the landing to read this inscription.');
    if (s.flags.inscription) throw Error('The inscription is already in the journal.');
    s.flags.inscription = true;
    note(
      s,
      'House inscription: “We severed the road to keep the guest outside.” Below it: “Sera Venn kept the chart. Do not trust a voice simply because it knows your name.”',
    );
    s.scenes.push({
      title: 'The road was cut from inside',
      body: 'The landing inscription records an emergency severance from inside the guild. It orders the small evacuation routes closed because an unknown intelligence was repeating signals through them. The great threshold was to remain disconnected.\nSera Venn is listed as the navigator who charted the surviving routes. Her ship’s coastal position can lead the party to her.\nThe landing register also names its former residents. Anwen’s name matches the carving beneath the chair. Rowan remembers changing a kitchen entry with that name. They do not yet know what happened to its owner.',
    });
  } else throw Error('Unknown interaction.');
}
export function finish(s) {
  if (damagedRooms(s).length) throw Error('Repair the damaged rooms before completing the story.');
  if (s.selected !== 'rowan' || !s.flags.gateOpen || s.flags.free) return false;
  s.flags.free = true;
  note(
    s,
    'Rowan walked beyond the gate. The binding is gone. The house remains a place they may return to, not a condition of being alive.',
  );
  const allies = s.roster
    .filter((c) => c.status !== 'departed' && c.status !== 'dead' && c.bond >= 3)
    .map((c) => c.name);
  s.scenes.push({
    title: 'The first ordinary morning',
    body: `The road is muddy. Rowan puts one foot beyond the gate and waits for the old pain.
Nothing pulls them back.
${s.flags.nellWalk ? 'Nell walks beside them until the first turn, then lets Rowan choose the next one.' : allies.length ? `${allies.join(', ')} ${allies.length === 1 ? 'waits' : 'wait'} by the gate. Nobody asks for a promise to return.` : 'Mara is at the gate. “There you are,” she says, as if Rowan has only stepped out to check the weather.'}\n${s.flags.endingReturn ? 'Behind them, the keepers are arranging the return of borrowed rooms. The work will go on without needing Rowan to hold it together.' : 'Behind them, a patient opens a window, someone argues over a map, and the kettle begins to sing. The house is still a home.'}
Rowan takes out the old travel list. They cannot read the smallest writing in this light. It can wait until they find somewhere to sit.
Beyond the grounds, a bird calls from a hedge Rowan has never reached. They turn toward the sound and keep walking.`,
  });
  return true;
}
export function emergency(s) {
  if (activeMissions(s).length) throw Error('Wait for the active expedition first.');
  day(s);
  earn(s, 12, 'Mara’s doorstep mending job');
}
export function treat(s, id) {
  const c = resident(s, id);
  if (c.status !== 'injured') throw Error('No injury to treat.');
  pay(s, 15, `Treatment for ${c.name}`);
  c.status = 'home';
  c.recovery = 0;
  c.injury = 0;
}

export function nextSteps(s) {
  return currentInvestigation(s).next;
}
export function characterArc(s, c) {
  return c.status === 'departed' ? journeys[c.id].farewell : characterAccount(s, c);
}
export function characterRecap(s, id) {
  const key = Object.keys(s.choices || {})
    .reverse()
    .find((key) => choiceNodes.some((n) => n.id === key && n.who === id));
  if (!key) return null;
  const node = choiceNodes.find((n) => n.id === key);
  return { title: node.title, text: node.choices.find((c) => c.id === s.choices[key]).result };
}
export function save(s) {
  return JSON.stringify(s);
}
export function load(raw) {
  const s = JSON.parse(raw);
  if (
    !s ||
    ![1, 2].includes(s.version) ||
    !Number.isInteger(s.gold) ||
    s.gold < 0 ||
    !Array.isArray(s.roster) ||
    !Array.isArray(s.missions) ||
    !s.flags ||
    !Array.isArray(s.journal) ||
    !Array.isArray(s.transactions) ||
    !Array.isArray(s.reports) ||
    !Number.isInteger(s.seed)
  )
    throw Error('Invalid or unsupported save.');
  if (s.version === 1) {
    s.version = 2;
    s.choices = {};
    s.community = 0;
    s.knowledge = 0;
    s.scenes = [];
    for (const c of s.roster) {
      c.visits = s.missions.filter((m) => m.status === 'resolved' && m.party.includes(c.id)).length;
      c.bond = 0;
      c.traits = [];
      c.memories = [];
    }
    if (s.flags.anchor) s.choices['mission:anchor'] = 'safe';
  }
  if (
    !s.choices ||
    typeof s.choices !== 'object' ||
    Array.isArray(s.choices) ||
    Array.isArray(s.flags) ||
    Object.values(s.flags).some((v) => typeof v !== 'boolean') ||
    !Array.isArray(s.scenes) ||
    s.scenes.some((n) => typeof n.title !== 'string' || typeof n.body !== 'string') ||
    s.journal.some((n) => typeof n.kind !== 'string' || typeof n.text !== 'string') ||
    !Number.isInteger(s.community) ||
    s.community < 0 ||
    !Number.isInteger(s.knowledge) ||
    s.knowledge < 0 ||
    !Number.isInteger(s.day) ||
    s.day < 1
  )
    throw Error('Invalid campaign data.');
  if (
    new Set(s.roster.map((c) => c.id)).size !== s.roster.length ||
    s.roster.some(
      (c) =>
        ![...recruits, ...sleepers].some((r) => r.id === c.id) ||
        !['home', 'away', 'assigned', 'injured', 'dead', 'departed'].includes(c.status) ||
        !Array.isArray(c.skills) ||
        !Array.isArray(c.traits) ||
        !Array.isArray(c.memories) ||
        !Number.isInteger(c.bond) ||
        !Number.isInteger(c.visits) ||
        c.visits < 0 ||
        !['str', 'agi', 'int', 'end', 'level', 'xp', 'points', 'recovery'].every(
          (k) => Number.isInteger(c[k]) && c[k] >= 0,
        ) ||
        (c.gear && !itemDefinition(c.gear)) ||
        (c.injury !== undefined && (!Number.isInteger(c.injury) || c.injury < 0 || c.injury > 5)),
    )
  )
    throw Error('Save contains invalid residents.');
  for (const c of s.roster) {
    if (
      (c.specialisation && !classes[c.type]?.branches.includes(c.specialisation)) ||
      (c.undead !== undefined && typeof c.undead !== 'boolean') ||
      (c.talents !== undefined &&
        (!Array.isArray(c.talents) ||
          new Set(c.talents).size !== c.talents.length ||
          c.talents.length >
            Math.floor(Math.min(c.level, 20) / 3) +
              (c.legacyTalents || []).length -
              new Set((c.legacyTalents || []).map((id) => talents.find((t) => t.id === id)?.level))
                .size ||
          c.talents.some((id) => {
            const t = talents.find((t) => t.id === id);
            return (
              !t ||
              t.branch !== c.specialisation ||
              t.level > c.level ||
              !t.requires.every((p) => c.talents.includes(p))
            );
          }))) ||
      (c.lastCastDay !== undefined &&
        (!Number.isInteger(c.lastCastDay) || c.lastCastDay < 1 || c.lastCastDay > s.day)) ||
      (c.bodyRecovered !== undefined && typeof c.bodyRecovered !== 'boolean')
    )
      throw Error('Invalid class progression.');
  }
  if (
    s.eventSeed !== undefined &&
    (!Number.isInteger(s.eventSeed) || s.eventSeed <= 0 || s.eventSeed >= 2147483647)
  )
    throw Error('Invalid home-event seed.');
  if (
    s.navigationSeen !== undefined &&
    (!s.navigationSeen ||
      typeof s.navigationSeen !== 'object' ||
      Array.isArray(s.navigationSeen) ||
      Object.entries(s.navigationSeen).some(([key, value]) =>
        ['contracts', 'stories'].includes(key)
          ? !Array.isArray(value) || value.some((id) => typeof id !== 'string')
          : !['reports', 'journal'].includes(key) || !Number.isInteger(value) || value < 0,
      ))
  )
    throw Error('Invalid navigation read markers.');
  if (s.rowanRecovery !== undefined && (!Number.isInteger(s.rowanRecovery) || s.rowanRecovery < 0))
    throw Error('Invalid Rowan recovery.');
  if (
    s.damagedRooms !== undefined &&
    (!s.damagedRooms ||
      Array.isArray(s.damagedRooms) ||
      Object.entries(s.damagedRooms).some(
        ([id, d]) =>
          !['service', 'quarters', ...rooms.map((r) => r.id)].includes(id) ||
          !d ||
          d.cost !== 30 ||
          !Number.isInteger(d.day) ||
          d.day < 1 ||
          d.day > s.day,
      ))
  )
    throw Error('Invalid room damage.');
  if (
    s.dungeonReturns !== undefined &&
    (!s.dungeonReturns ||
      Array.isArray(s.dungeonReturns) ||
      Object.entries(s.dungeonReturns).some(
        ([id, b]) =>
          !passages.some((p) => p.to === id && p.x === b?.x && p.y === b?.y && b.floor === p.y) ||
          !s.flags['discovered_' + id],
      ))
  )
    throw Error('Invalid dungeon return route.');
  for (const c of s.roster) {
    if (c.id === 'ivo' && !c.undead && !c.skills.includes('literacy')) c.skills.push('literacy');
    migrateTraining(c);
    if (
      !c.levelChoices ||
      Array.isArray(c.levelChoices) ||
      (c.legacyTalents !== undefined &&
        (!Array.isArray(c.legacyTalents) ||
          c.legacyTalents.some((id) => !c.talents?.includes(id)))) ||
      Object.entries(c.levelChoices).some(
        ([level, v]) =>
          !Number.isInteger(Number(level)) ||
          Number(level) < 2 ||
          Number(level) > c.level ||
          !v ||
          !['legacy', 'stat', 'skill', 'talent'].includes(v.kind) ||
          (v.kind === 'stat' && !['str', 'agi', 'int', 'end'].includes(v.id)) ||
          (v.kind === 'skill' &&
            !skills[c.type].some((k) => k.id === v.id && k.level <= Number(level))) ||
          (v.kind === 'talent' &&
            !talents.some(
              (t) => t.id === v.id && t.level === Number(level) && c.talents?.includes(t.id),
            )),
      ) ||
      c.points !== unspentLevels(c).length ||
      (c.talents || []).some(
        (id) =>
          !(c.legacyTalents || []).includes(id) &&
          c.levelChoices[talents.find((t) => t.id === id).level]?.id !== id,
      )
    )
      throw Error('Invalid level training choices.');
  }
  const activeMembers = new Set();
  for (const m of s.missions) {
    const def = contracts.find((c) => c.id === m.id);
    if (
      !def ||
      !['travelling', 'decision', 'returning', 'resolved', 'withdrawn', 'failed'].includes(
        m.status,
      ) ||
      !Array.isArray(m.party) ||
      (!m.party.length && m.status !== 'withdrawn') ||
      m.party.length > def.capacity ||
      new Set(m.party).size !== m.party.length ||
      m.party.some((id) => !s.roster.some((c) => c.id === id)) ||
      !Number.isInteger(m.roll) ||
      m.roll < 0 ||
      m.roll > 99 ||
      !Number.isInteger(m.remaining) ||
      (m.status === 'decision' && !def.choices)
    )
      throw Error('Save contains invalid expeditions.');
    if (activeMission(m))
      for (const id of m.party) {
        if (
          activeMembers.has(id) ||
          (resident(s, id).status !== 'dead' &&
            resident(s, id).status !== (def.internal ? 'assigned' : 'away'))
        )
          throw Error('Save contains conflicting assignments.');
        activeMembers.add(id);
      }
  }
  if (s.roster.some((c) => ['away', 'assigned'].includes(c.status) && !activeMembers.has(c.id)))
    throw Error('An away resident has no expedition.');
  for (const [key, id] of Object.entries(s.choices)) {
    const node = key.startsWith('mission:')
      ? contracts.find((m) => m.id === key.slice(8))
      : choiceNodes.find((n) => n.id === key);
    if (!node?.choices?.some((c) => c.id === id))
      throw Error('Save contains unknown narrative choices.');
  }
  if (
    s.threats !== undefined &&
    (!s.threats ||
      Array.isArray(s.threats) ||
      Object.entries(s.threats).some(
        ([id, t]) =>
          !contracts.some((d) => d.internal && d.id === id) ||
          !t ||
          !Number.isFinite(t.progress) ||
          t.progress < 0 ||
          t.progress > contracts.find((d) => d.id === id).days * profiles[id].amount ||
          (contracts.find((d) => d.id === id).homeEvent &&
            (typeof t.active !== 'boolean' ||
              !Number.isInteger(t.age) ||
              t.age < 0 ||
              !Number.isInteger(t.damage) ||
              t.damage < 0 ||
              (t.undefended !== undefined &&
                (!Number.isInteger(t.undefended) || t.undefended < 0)))),
      ))
  )
    throw Error('Invalid guild threat progress.');
  for (const m of s.missions.filter((m) => m.simulation === 'daily')) {
    const def = contracts.find((d) => d.id === m.id);
    if (
      !Number.isFinite(m.progress) ||
      m.progress < 0 ||
      m.progress > def.days * profiles[m.id].amount ||
      !Number.isInteger(m.elapsed) ||
      m.elapsed < 0 ||
      !Number.isInteger(m.kits) ||
      m.kits < 0 ||
      m.kits > 1 ||
      !Array.isArray(m.harm) ||
      m.harm.some(
        (h) =>
          !s.roster.some((c) => c.id === h.id) ||
          !Number.isInteger(h.day) ||
          h.day < 1 ||
          !Number.isInteger(h.injuryDays) ||
          h.injuryDays < 0 ||
          typeof h.treated !== 'boolean',
      )
    )
      throw Error('Invalid daily contract data.');
    if (
      def.internal &&
      (!s.threats?.[m.id] ||
        (activeMission(m) &&
          (s.threats[m.id].progress !== m.progress || (def.homeEvent && !s.threats[m.id].active))))
    )
      throw Error('Conflicting guild threat progress.');
  }
  for (const m of s.missions.filter((m) => m.simulation === 'daily')) {
    const def = contracts.find((d) => d.id === m.id),
      work = def.days * profiles[m.id].amount;
    if (m.status === 'travelling') {
      const a = assessContract(
        def,
        m.party.map((id) => resident(s, id)),
        m.progress,
      );
      if (
        (!a.rate ? !m.stalled || m.remaining !== 0 : m.remaining !== a.days) ||
        m.progress === work
      )
        throw Error('Invalid daily contract timing.');
    } else if (
      m.status !== 'returning' &&
      (m.remaining !== 0 || (!['withdrawn', 'failed'].includes(m.status) && m.progress !== work))
    )
      throw Error('Invalid completed contract progress.');
  }
  if (!s.inventory) {
    s.inventory = [];
    s.nextItem = 0;
    for (const c of s.roster)
      if (c.gear) {
        const uid = 'item-' + ++s.nextItem;
        s.inventory.push({ uid, id: c.gear, owner: c.id });
        c.gearUid = uid;
      }
  }
  for (const c of s.roster) ensureEquipmentSlots(c);
  if (
    !Number.isInteger(s.nextItem) ||
    s.nextItem < 0 ||
    !Array.isArray(s.inventory) ||
    new Set(s.inventory.map((e) => e.uid)).size !== s.inventory.length ||
    s.inventory.some(
      (e) =>
        !itemDefinition(e.id) ||
        typeof e.uid !== 'string' ||
        !/^item-[1-9][0-9]*$/.test(e.uid) ||
        Number(e.uid.slice(5)) > s.nextItem ||
        (e.owner !== null &&
          !s.roster.some(
            (c) =>
              c.id === e.owner &&
              c.equipmentSlots[itemDefinition(e.id).slot]?.uid === e.uid &&
              c.equipmentSlots[itemDefinition(e.id).slot]?.id === e.id,
          )),
    ) ||
    s.roster.some((c) =>
      Object.entries(c.equipmentSlots).some(
        ([slot, item]) =>
          !equipmentSlots.includes(slot) ||
          itemDefinition(item.id)?.slot !== slot ||
          !s.inventory.some((e) => e.uid === item.uid && e.owner === c.id && e.id === item.id),
      ),
    )
  )
    throw Error('Invalid equipment inventory.');
  delete s.storeVisitor;
  if (
    s.roster.some(
      (c) =>
        c.status === 'departed' &&
        (!journeys[c.id] ||
          !s.flags['departed_' + c.id] ||
          s.choices['homecoming-' + c.id] !== 'release'),
    )
  )
    throw Error('Invalid companion departure.');
  if (
    s.residentPositions !== undefined &&
    (!s.residentPositions ||
      Array.isArray(s.residentPositions) ||
      Object.entries(s.residentPositions).some(
        ([id, p]) =>
          (id !== 'rowan' && !s.roster.some((c) => c.id === id)) ||
          !p ||
          !Number.isFinite(p.x) ||
          p.x < -600 ||
          p.x > 30000 ||
          p.y !== p.floor ||
          ![380, 140, -100, 510, 555, 790, 1020, 1250, ...chambers.map((r) => r.y)].includes(
            p.floor,
          ),
      ))
  )
    throw Error('Invalid resident positions.');
  if (!home(s).some((c) => c.id === s.selected)) s.selected = 'rowan';
  return cleanStoredCopy(s);
}

export function validateContent() {
  const errors = [],
    ids = new Set();
  for (const m of contracts) {
    if (ids.has(m.id)) errors.push(`Duplicate mission ${m.id}`);
    ids.add(m.id);
    if (
      !m.checks?.length ||
      m.days < 1 ||
      m.reward < 0 ||
      !profiles[m.id] ||
      profiles[m.id].amount <= 0 ||
      profiles[m.id].threat < 0 ||
      profiles[m.id].threat > 100
    )
      errors.push(`Invalid mission ${m.id}`);
  }
  for (const n of [...contracts, ...choiceNodes]) {
    for (const flag of [...(n.requires || []), ...(n.any || [])])
      if (!knownFlags.has(flag)) errors.push(`Unknown flag ${flag} in ${n.id}`);
    if (n.choices) {
      const seen = new Set();
      for (const c of n.choices) {
        if (seen.has(c.id)) errors.push(`Duplicate choice ${n.id}/${c.id}`);
        seen.add(c.id);
        for (const f of c.requires || [])
          if (!knownFlags.has(f)) errors.push(`Unknown choice requirement ${f}`);
      }
    }
  }
  // Resolve all possible flag producers to a fixed point, detecting impossible cycles.
  const physical = [
    ...records.map((r) => ({ requires: r.requires, sets: ['record_' + r.id] })),
    ...chambers.map((r) => ({
      requires: [],
      sets: ['discovered_' + r.id, 'searched_' + r.id, ...(r.key ? ['key_' + r.key] : [])],
    })),
    { requires: ['gateOpen'], sets: ['free'] },
    { requires: ['labyrinthHeart'], sets: ['dragonFound'] },
    { requires: ['anchor'], sets: ['tower'] },
    { requires: ['tower'], sets: ['towerCrown'] },
    { requires: ['labyrinth'], sets: ['labyrinthHeart'] },
    { requires: ['stairs', 'anchor'], sets: ['labyrinth'] },
    ...sleepers.map((c) => ({ requires: c.requires, sets: ['found_' + c.id, 'awakened_' + c.id] })),
    { requires: [], sets: ['breach', 'stairs'] },
    { requires: ['breach'], sets: ['repaired'] },
    { requires: ['repaired'], sets: ['ledger'] },
    { requires: ['stairs'], sets: ['cellar'] },
    { requires: ['anchor'], sets: ['inscription'] },
  ];
  const reachable = new Set(['opening']);
  let changed = true;
  while (changed) {
    changed = false;
    for (const n of [
      ...physical,
      ...contracts,
      ...choiceNodes,
      ...rooms.map((r) => ({
        requires: [r.anchor, ...(r.id === 'threshold' ? ['prepared'] : [])],
        sets: [r.operational, ...(r.id === 'library' ? ['libraryOpened'] : [])],
      })),
    ]) {
      if ((n.requires || []).every((f) => reachable.has(f))) {
        for (const f of [...(n.sets || []), ...(n.choices || []).flatMap((c) => c.sets || [])])
          if (!reachable.has(f)) {
            reachable.add(f);
            changed = true;
          }
      }
    }
  }
  for (const n of [...contracts, ...choiceNodes])
    for (const f of n.requires || [])
      if (!reachable.has(f)) errors.push(`Unreachable prerequisite ${f} in ${n.id}`);
  return errors;
}
