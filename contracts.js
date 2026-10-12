import { dungeonProfiles } from './sprawl.js';
import { openingProfiles } from './opening-contracts.js';
import { damageType, personalProtection, talentValue, classWorkFactor } from './classes.js';
import { conscious } from './equipment.js';
import { expansionProfiles } from './expansion.js';
import { itemDefinition, workFactor } from './equipment.js';
export const abilityNames = {
  guard: 'Guard',
  tracking: 'Tracking',
  literacy: 'Magical literacy',
  water: 'Water breathing',
  stoneSong: 'Stone song',
  echoSight: 'Echo sight',
  threadwalk: 'Threadwalk',
  undeadLabour: 'Undead labour',
  graveEndurance: 'Grave endurance',
  inscriptions: 'House inscriptions',
  anchorSight: 'Anchor sight',
};
// Contract work and daily hazard rules are independent of the campaign story.
export const profiles = {
  ...openingProfiles,
  ...expansionProfiles,
  ...dungeonProfiles,
  outsideArchivist: {
    stat: 'end',
    amount: 14,
    threat: 35,
    skills: { guard: 10, tracking: 8, literacy: 12 },
  },
  road: { stat: 'end', amount: 7, threat: 20, skills: { guard: 12, tracking: 8, threadwalk: 8 } },
  quarry: {
    stat: 'str',
    amount: 20,
    threat: 60,
    skills: { guard: 15, tracking: 8, stoneSong: 15 },
  },
  anchor: { stat: 'end', amount: 7, threat: 40, skills: { guard: 12, tracking: 8, water: 12 } },
  navigator: {
    stat: 'agi',
    amount: 8,
    threat: 60,
    skills: { guard: 10, water: 20, tracking: 10, threadwalk: 12 },
  },
  orchard: {
    stat: 'end',
    amount: 10,
    threat: 60,
    skills: { tracking: 15, literacy: 10, guard: 10 },
  },
  lens: { stat: 'str', amount: 11, threat: 65, skills: { guard: 15, stoneSong: 15, literacy: 8 } },
  brynPast: { stat: 'str', amount: 10, threat: 55, skills: { guard: 15, stoneSong: 15 } },
  nellPast: { stat: 'agi', amount: 10, threat: 55, skills: { tracking: 15, threadwalk: 15 } },
  ivoPast: { stat: 'int', amount: 11, threat: 65, skills: { literacy: 20, echoSight: 10 } },
  witness: {
    stat: 'end',
    amount: 12,
    threat: 70,
    skills: { literacy: 20, echoSight: 15, guard: 10 },
  },
  covenant: {
    stat: 'end',
    amount: 11,
    threat: 50,
    skills: { tracking: 15, guard: 10, threadwalk: 10 },
  },
  lattice: { stat: 'int', amount: 12, threat: 70, skills: { literacy: 20, echoSight: 15 } },
  marsh: {
    stat: 'agi',
    amount: 9,
    threat: 50,
    skills: { tracking: 15, water: 15, threadwalk: 10 },
  },
  escorts: { stat: 'end', amount: 9, threat: 50, skills: { guard: 20, tracking: 10 } },
  salvage: { stat: 'agi', amount: 11, threat: 60, skills: { tracking: 15, threadwalk: 15 } },
  fragments: {
    stat: 'int',
    amount: 11,
    threat: 70,
    skills: { literacy: 20, echoSight: 15, guard: 10 },
  },
  ghost: { stat: 'int', amount: 12, threat: 45, skills: { literacy: 15, echoSight: 20, guard: 8 } },
  monster: {
    stat: 'str',
    amount: 16,
    threat: 55,
    skills: { guard: 18, tracking: 10, stoneSong: 12 },
  },
  dragon: {
    stat: 'str',
    amount: 60,
    threat: 85,
    skills: { guard: 15, stoneSong: 12, echoSight: 10, threadwalk: 8 },
  },
};
export const dragonContract = {
  id: 'dragon',
  name: 'Dragon in the old furnace',
  internal: true,
  hiddenReward: true,
  days: 10,
  reward: 240,
  xp: 200,
  capacity: 6,
  requires: ['dragonFound'],
  sets: ['dragonSlain'],
  injuryDays: 3,
  desc: 'A dragon has nested around the guild’s old furnace. Clear it before anyone can use the forge. Party work damages the dragon each day; withdrawing preserves that damage. Its hoard has not been inspected.',
  checks: [{ stat: 'str', min: 60, label: 'Combined Strength 60 for the ten-day clearing plan' }],
};
export const homeThreats = [
  {
    id: 'ghost',
    name: 'Ghost in the guildhall',
    internal: true,
    homeEvent: true,
    days: 2,
    reward: 0,
    xp: 15,
    capacity: 4,
    requires: [],
    sets: [],
    injuryDays: 2,
    desc: 'A ghost has entered the guildhall. Only fit residents at home can defend it. Its first undefended attack injures a resident; its next damages a room. This repeats until defended. Damaged rooms need 30-gold repairs before story work can continue.',
    checks: [{ stat: 'int', min: 12, label: 'Combined Intellect 12' }],
  },
  {
    id: 'monster',
    name: 'Wandering monster at the gate',
    internal: true,
    homeEvent: true,
    days: 2,
    reward: 0,
    xp: 15,
    capacity: 4,
    requires: [],
    sets: [],
    injuryDays: 2,
    desc: 'A wandering monster is attacking the entrance. Keep residents home to defend the guild. Every undefended day causes up to 8 gold of damage.',
    checks: [{ stat: 'str', min: 16, label: 'Combined Strength 16' }],
  },
];
const invaders = [
  [
    'spiders',
    'Frost spiders',
    'agi',
    18,
    50,
    '#8bbfd2',
    'Frost spiders have nested beneath the quarters stair. Their webs freeze the doors shut.',
    'spider',
  ],
  [
    'slime',
    'Alchemical slime',
    'int',
    20,
    55,
    '#95d280',
    'A split laboratory jar has released a slime that dissolves wood and leather.',
    'slime',
  ],
  [
    'mimic',
    'Chest mimic',
    'int',
    22,
    60,
    '#d6a971',
    'A borrowed chest has unfolded teeth in the service room.',
    'mimic',
  ],
  [
    'hounds',
    'Thorn hounds',
    'agi',
    24,
    65,
    '#90b994',
    'A pack followed a returning party into the guild. Living thorns cover their hides.',
    'hound',
  ],
  [
    'armour',
    'Possessed armour',
    'str',
    28,
    70,
    '#acb8ce',
    'An empty suit of armour is attacking anyone who approaches the records.',
    'armour',
  ],
  [
    'moths',
    'Void moth swarm',
    'int',
    30,
    72,
    '#bd9bdd',
    'A swarm pours through a lamp connected to the fallen beacon.',
    'moth',
  ],
  [
    'golem',
    'Broken stone golem',
    'str',
    36,
    78,
    '#b0a591',
    'A maintenance golem has mistaken the guild’s residents for intruders.',
    'golem',
  ],
  [
    'wraith',
    'Bell wraith',
    'int',
    40,
    82,
    '#b0d4df',
    'The old alarm has called a wraith into the hall. It attacks the living, then the walls.',
    'wraith',
  ],
];
for (const [id, name, stat, amount, threat, color, desc, shape] of invaders) {
  profiles[id] = {
    stat,
    amount,
    threat,
    skills: { guard: 12, literacy: 10, echoSight: 12, tracking: 10, stoneSong: 10 },
  };
  homeThreats.push({
    id,
    name,
    internal: true,
    homeEvent: true,
    days: 3,
    reward: 0,
    xp: 35,
    capacity: 6,
    requires: [],
    sets: [],
    injuryDays: 2,
    color,
    shape,
    assault: true,
    desc:
      desc +
      ' Only residents at home can defend. Undefended attacks injure residents first, then damage rooms.',
    checks: [{ stat, min: amount, label: 'Combined ' + stat.toUpperCase() + ' ' + amount }],
  });
}
homeThreats[0].shape = 'ghost';
homeThreats[0].color = '#aed9e5';
homeThreats[1].shape = 'hound';
homeThreats[1].color = '#af7d62';
export function effectiveStat(c, stat) {
  return Math.floor(
    (c[stat] + (itemDefinition(c.gear)?.stats[stat] || 0) + talentValue(c, stat)) *
      classWorkFactor(c),
  );
}
export function assessContract(def, party, progress = 0) {
  const profile = profiles[def.id];
  const totals = Object.fromEntries(
    ['str', 'agi', 'int', 'end'].map((k) => [
      k,
      party.reduce((sum, c) => sum + effectiveStat(c, k), 0),
    ]),
  );
  const combined = totals[profile.stat],
    work = profile.amount * def.days,
    bonus = party.reduce(
      (n, c) =>
        n +
        (conscious(c) && c.skills.includes('undeadLabour') ? 10 : 0) +
        talentValue(c, 'work') +
        (party.some((p) => p.undead) ? talentValue(c, 'zombieWork') : 0),
      0,
    ),
    rate = Math.min(combined, profile.amount) * (1 + bonus / 100),
    remainingWork = Math.max(0, work - progress),
    days = rate > 0 ? Math.ceil(remainingWork / rate) : null;
  const reductions = [];
  for (const [stat, factor] of [
    ['end', 0.5],
    ['agi', 0.25],
    ['int', 0.2],
  ])
    if (stat !== profile.stat && totals[stat])
      reductions.push({
        label: `Combined ${stat.toUpperCase()} ${totals[stat]}`,
        amount: totals[stat] * factor,
      });
  const abilities = new Set(party.filter(conscious).flatMap((c) => c.skills));
  for (const [skill, amount] of Object.entries(profile.skills))
    if (abilities.has(skill)) reductions.push({ label: abilityNames[skill] || skill, amount });
  const type = damageType(def),
    active = party.filter(conscious),
    classProtection = active.length
      ? active.reduce((n, c) => n + personalProtection(c, type), 0) / active.length
      : 0;
  if (classProtection)
    reductions.push({
      label: 'Class defences / vulnerabilities (' + type + ')',
      amount: classProtection,
    });
  const talentProtection = active.reduce((n, c) => n + talentValue(c, type), 0);
  if (talentProtection)
    reductions.push({ label: 'Class skills (' + type + ')', amount: talentProtection });
  const protection = party.reduce((sum, c) => sum + (itemDefinition(c.gear)?.protection || 0), 0);
  if (protection) reductions.push({ label: 'Equipped magic wards', amount: protection });
  const threat = Math.min(
    100,
    Math.max(0, Math.round(profile.threat - reductions.reduce((sum, r) => sum + r.amount, 0))),
  );
  return {
    damageType: type,
    workBonus: bonus,
    requirement: { stat: profile.stat, amount: profile.amount },
    totals,
    combined,
    work,
    rate,
    days,
    baseDays: def.days,
    baseThreat: profile.threat,
    threat,
    reductions,
    exposure: days === null ? null : Math.round((1 - Math.pow(1 - threat / 100, days)) * 100),
  };
}
export function activeMission(m) {
  return m.status === 'travelling' || m.status === 'decision' || m.status === 'returning';
}
