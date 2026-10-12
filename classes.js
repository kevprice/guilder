import { conscious, injuryLevel } from './equipment.js';
export const classes = {
  zombie: {
    name: 'Reanimated zombie',
    growth: { str: 2, end: 2 },
    branches: [],
    desc: 'Strong, tireless and resistant to physical attacks and ghost terror; vulnerable to magic. Cannot learn living-class talents or heal naturally.',
  },
  warrior: {
    name: 'Warrior',
    growth: { str: 1, end: 1 },
    branches: ['barbarian', 'paladin'],
    desc: 'Strength and Endurance grow each level.',
  },
  mage: {
    name: 'Wizard',
    growth: { int: 2 },
    branches: ['necromancer', 'healer'],
    desc: 'Intellect grows each level.',
  },
  scout: {
    name: 'Scout',
    growth: { agi: 1, int: 1 },
    branches: ['thief', 'archer'],
    desc: 'Agility and Intellect grow each level.',
  },
  barbarian: {
    name: 'Barbarian',
    base: 'warrior',
    growth: { str: 2, end: 2 },
    physical: 12,
    magical: -10,
    desc: 'High Strength and Endurance. Physical harm risk −12 points; magical harm risk +10 points.',
  },
  paladin: {
    name: 'Paladin',
    base: 'warrior',
    growth: { str: 1, end: 2, int: 1 },
    physical: 6,
    undead: 15,
    desc: 'An armoured holy defender. Physical risk −6; ghosts and undead −15.',
  },
  necromancer: {
    name: 'Necromancer',
    base: 'mage',
    growth: { int: 3, end: 1 },
    undead: 12,
    desc: 'Controls death magic. Undead risk −12. Can learn Raise dead and repair animated bodies.',
  },
  healer: {
    name: 'Healer / Priest',
    base: 'mage',
    growth: { int: 2, end: 2 },
    undead: 18,
    desc: 'A priest of restoration. Undead risk −18. Healing spells reduce injuries, including on adventures.',
  },
  thief: {
    name: 'Thief',
    base: 'scout',
    growth: { agi: 3, int: 1 },
    physical: 5,
    desc: 'Agility specialist. Physical risk −5. Disarms traps and retrieves extra salvage.',
  },
  archer: {
    name: 'Archer',
    base: 'scout',
    growth: { agi: 2, str: 1, end: 1 },
    physical: 7,
    desc: 'Ranged defence. Physical risk −7. Covering fire protects the party and speeds clearing work.',
  },
};
// Branch trees contain choices, prerequisites and actual simulation effects.
const rows = [
  ['barbarian', 'rage', 'Rage', 3, [], { work: 15 }, 'Party work +15% while conscious.'],
  ['barbarian', 'ironHide', 'Iron hide', 3, [], { physical: 8 }, 'Physical daily threat −8.'],
  [
    'barbarian',
    'unstoppable',
    'Unstoppable',
    6,
    ['rage'],
    { injuryWork: true },
    'Hurt and injured: full work; incapacitated: 50% work.',
  ],
  [
    'barbarian',
    'warCry',
    'War cry',
    6,
    [],
    { physical: 8 },
    'Physical daily threat −8; the benefit is shared with the party.',
  ],
  [
    'barbarian',
    'spellScar',
    'Spell scar',
    9,
    ['ironHide'],
    { magical: 12 },
    'Magical daily threat −12, overcoming the class weakness.',
  ],
  ['barbarian', 'cleave', 'Cleave', 9, ['rage'], { work: 20 }, 'Party work +20%.'],
  [
    'barbarian',
    'lastStand',
    'Last stand',
    12,
    ['unstoppable'],
    { deathWard: true },
    'Once per assignment, prevents a fatal blow.',
  ],
  ['barbarian', 'titanGrip', 'Titan grip', 15, ['cleave'], { str: 8 }, 'Strength +8 when working.'],
  [
    'barbarian',
    'ancestralGuard',
    'Ancestral guard',
    18,
    ['spellScar'],
    { magical: 15 },
    'Magical daily threat −15.',
  ],
  ['paladin', 'holyLight', 'Holy light', 3, [], { undead: 15 }, 'Undead daily threat −15.'],
  [
    'paladin',
    'shieldOath',
    'Shield oath',
    3,
    [],
    { physical: 10 },
    'Physical daily threat −10 for the party.',
  ],
  [
    'paladin',
    'layHands',
    'Lay on hands',
    6,
    ['holyLight'],
    { heal: 1 },
    'Once per day, heal one living resident by one injury stage.',
  ],
  [
    'paladin',
    'sanctuary',
    'Sanctuary',
    6,
    ['shieldOath'],
    { magical: 10 },
    'Magical daily threat −10.',
  ],
  [
    'paladin',
    'consecrate',
    'Consecrate',
    9,
    ['holyLight'],
    { undead: 15 },
    'Undead daily threat −15.',
  ],
  [
    'paladin',
    'rally',
    'Rally the fallen',
    9,
    ['layHands'],
    { heal: 2 },
    'Heal two injury stages once per day; can wake unconscious allies.',
  ],
  [
    'paladin',
    'martyrWard',
    'Martyr’s ward',
    12,
    ['sanctuary'],
    { partyDeathWard: true },
    'Once per assignment, prevent a fatal blow to any party member.',
  ],
  [
    'paladin',
    'radiantBlade',
    'Radiant blade',
    15,
    ['consecrate'],
    { work: 20 },
    'Party work +20%.',
  ],
  [
    'paladin',
    'dawnOath',
    'Dawn oath',
    18,
    ['martyrWard'],
    { magical: 15, undead: 15 },
    'Magic and undead daily threat −15.',
  ],
  [
    'necromancer',
    'graveSight',
    'Grave sight',
    3,
    [],
    { undead: 10, echo: true },
    'Undead threat −10; reveals false labyrinth routes.',
  ],
  ['necromancer', 'boneWard', 'Bone ward', 3, [], { physical: 10 }, 'Physical daily threat −10.'],
  [
    'necromancer',
    'raiseDead',
    'Raise dead',
    6,
    ['graveSight'],
    { raise: true },
    'At home, animate a recovered fallen resident as a zombie for 80 gold.',
  ],
  [
    'necromancer',
    'soulWard',
    'Soul ward',
    6,
    ['boneWard'],
    { magical: 12 },
    'Magical daily threat −12.',
  ],
  [
    'necromancer',
    'mendUndead',
    'Mend undead',
    9,
    ['raiseDead'],
    { mend: 2 },
    'Repair two zombie injury stages once per day.',
  ],
  [
    'necromancer',
    'deathPact',
    'Death pact',
    9,
    ['soulWard'],
    { deathWard: true },
    'Once per assignment, prevent your own fatal blow.',
  ],
  [
    'necromancer',
    'corpseMarch',
    'Corpse march',
    12,
    ['raiseDead'],
    { zombieWork: 30 },
    'With a zombie in the party, work +30%.',
  ],
  [
    'necromancer',
    'dreadCircle',
    'Dread circle',
    15,
    ['soulWard'],
    { magical: 15, undead: 15 },
    'Magic and undead daily threat −15.',
  ],
  [
    'necromancer',
    'deathMastery',
    'Death mastery',
    18,
    ['mendUndead'],
    { mend: 4 },
    'Repair four zombie injury stages once per day.',
  ],
  [
    'healer',
    'turnUndead',
    'Turn undead',
    3,
    [],
    { undead: 15 },
    'Ghosts and undead daily threat −15.',
  ],
  [
    'healer',
    'protectivePrayer',
    'Protective prayer',
    3,
    [],
    { magical: 10 },
    'Magical daily threat −10.',
  ],
  [
    'healer',
    'healingWord',
    'Healing word',
    6,
    [],
    { heal: 1 },
    'Heal a living resident by one injury stage once per day, at home or on your assignment.',
  ],
  [
    'healer',
    'blessing',
    'Blessing',
    6,
    ['protectivePrayer'],
    { physical: 10 },
    'Physical daily threat −10.',
  ],
  [
    'healer',
    'greaterHeal',
    'Greater healing',
    9,
    ['healingWord'],
    { heal: 2 },
    'Heal two stages; can restore consciousness for withdrawal.',
  ],
  ['healer', 'exorcism', 'Exorcism', 9, ['turnUndead'], { undead: 20 }, 'Undead daily threat −20.'],
  [
    'healer',
    'guardianAngel',
    'Guardian angel',
    12,
    ['blessing'],
    { partyDeathWard: true },
    'Once per assignment, prevent one fatal blow to any companion.',
  ],
  [
    'healer',
    'restoration',
    'Restoration',
    15,
    ['greaterHeal'],
    { heal: 3 },
    'Heal three injury stages once per day.',
  ],
  [
    'healer',
    'miracle',
    'Miracle',
    18,
    ['restoration'],
    { heal: 4 },
    'Heal four injury stages. Cannot resurrect a dead resident.',
  ],
  [
    'thief',
    'lockcraft',
    'Lockcraft',
    3,
    [],
    { physical: 8 },
    'Physical threat −8 from trap awareness.',
  ],
  ['thief', 'shadowStep', 'Shadow step', 3, [], { work: 15 }, 'Party work +15%.'],
  [
    'thief',
    'salvager',
    'Salvager',
    6,
    ['lockcraft'],
    { loot: 20 },
    'Completed paid contracts reward +20 gold.',
  ],
  [
    'thief',
    'escapeArtist',
    'Escape artist',
    6,
    ['shadowStep'],
    { retreat: true },
    'Immediate external retreat when this thief is conscious.',
  ],
  ['thief', 'runeThief', 'Rune thief', 9, ['lockcraft'], { magical: 12 }, 'Magical threat −12.'],
  [
    'thief',
    'ghostWalk',
    'Ghost walk',
    9,
    ['shadowStep'],
    { echo: true, undead: 10 },
    'Reveal false labyrinth paths; undead threat −10.',
  ],
  [
    'thief',
    'masterSalvager',
    'Master salvager',
    12,
    ['salvager'],
    { loot: 40 },
    'Completed paid contracts reward another +40 gold.',
  ],
  [
    'thief',
    'vanish',
    'Vanish',
    15,
    ['escapeArtist'],
    { physical: 15 },
    'Physical daily threat −15.',
  ],
  ['thief', 'perfectRoute', 'Perfect route', 18, ['ghostWalk'], { work: 25 }, 'Party work +25%.'],
  [
    'archer',
    'coveringFire',
    'Covering fire',
    3,
    [],
    { physical: 10 },
    'Physical daily threat −10.',
  ],
  ['archer', 'huntersMark', 'Hunter’s mark', 3, [], { work: 15 }, 'Party work +15%.'],
  [
    'archer',
    'silverArrows',
    'Silver arrows',
    6,
    ['coveringFire'],
    { undead: 15 },
    'Undead daily threat −15.',
  ],
  ['archer', 'eagleEye', 'Eagle eye', 6, ['huntersMark'], { agi: 5 }, 'Agility +5 when working.'],
  [
    'archer',
    'spellshot',
    'Spellshot',
    9,
    ['silverArrows'],
    { magical: 12 },
    'Magical daily threat −12.',
  ],
  ['archer', 'volley', 'Volley', 9, ['huntersMark'], { work: 20 }, 'Party work +20%.'],
  [
    'archer',
    'watchfulGuard',
    'Watchful guard',
    12,
    ['coveringFire'],
    { partyDeathWard: true },
    'Once per assignment, prevent a fatal blow to a companion.',
  ],
  ['archer', 'trueAim', 'True aim', 15, ['eagleEye'], { agi: 8 }, 'Agility +8 when working.'],
  [
    'archer',
    'starshot',
    'Starshot',
    18,
    ['spellshot'],
    { magical: 15, undead: 15 },
    'Magic and undead daily threat −15.',
  ],
];
export const talents = rows.map(([branch, id, name, level, requires, effects, desc]) => ({
  branch,
  id,
  name,
  level,
  requires: [],
  recommended: requires,
  effects,
  desc,
}));
export function classOf(c) {
  return c.undead ? classes.zombie : classes[c.specialisation || c.type] || classes.warrior;
}
export function talentEffects(c) {
  return (c.talents || []).map((id) => talents.find((t) => t.id === id)?.effects || {});
}
export function talentValue(c, key) {
  return conscious(c)
    ? talentEffects(c).reduce((n, e) => n + (typeof e[key] === 'number' ? e[key] : 0), 0)
    : 0;
}
export function hasTalent(c, key) {
  return conscious(c) && talentEffects(c).some((e) => e[key]);
}
export const trainingLevels = [3, 6, 9, 12, 15, 18];
export function xpRequired(level) {
  const n = level - 1;
  return 35 + 15 * n + 10 * n * n;
}
export function unspentLevels(c) {
  return Array.from({ length: Math.max(0, Math.min(c.level, 20) - 1) }, (_, i) => i + 2).filter(
    (level) => !c.levelChoices?.[level],
  );
}
export function talentSlots(c) {
  return unspentLevels(c).filter((level) => trainingLevels.includes(level)).length;
}
export function availableTalents(c) {
  return talents.filter(
    (t) =>
      t.branch === c.specialisation &&
      c.level >= t.level &&
      unspentLevels(c).includes(t.level) &&
      !(c.talents || []).some((id) => talents.find((t) => t.id === id)?.level === t.level),
  );
}
export function spendLevel(c, level, kind, id) {
  if (!unspentLevels(c).includes(level)) throw Error('This level already has a training choice.');
  c.levelChoices ||= {};
  c.levelChoices[level] = { kind, id };
  c.points = unspentLevels(c).length;
}
export function gainLevel(c) {
  if (c.level >= 20) return false;
  c.levelChoices ||= {};
  c.level++;
  c.points = unspentLevels(c).length;
  for (const [stat, n] of Object.entries(classOf(c).growth)) c[stat] += n;
  return true;
}
export function awardExperience(c, amount) {
  c.xp += amount;
  const required = xpRequired(c.level);
  if (c.level < 20 && c.xp >= required) {
    c.xp -= required;
    gainLevel(c);
    if (c.level >= 20) c.xp = 0;
    return true;
  }
  if (c.level >= 20) c.xp = 0;
  return false;
}
// Preserve earned builds, but reserve consumed levels and prevent future duplicate choices.
export function migrateTraining(c) {
  if (c.levelChoices) return;
  c.levelChoices = {};
  c.legacyTalents = [...(c.talents || [])];
  const occupied = new Set(c.legacyTalents.map((id) => talents.find((t) => t.id === id)?.level));
  for (let level = 2; level <= Math.min(c.level, 20); level++)
    c.levelChoices[level] = { kind: 'legacy', id: 'preserved' };
  let pending = Math.min(c.points || 0, c.level - 1);
  for (let level = Math.min(c.level, 20); level >= 2 && pending > 0; level--)
    if (!occupied.has(level)) {
      delete c.levelChoices[level];
      pending--;
    }
  c.points = unspentLevels(c).length;
}
export function damageType(def) {
  if (def.damageType) return def.damageType;
  if (['ghost', 'wraith', 'armour'].includes(def.id)) return 'undead';
  if (
    ['slime', 'moths'].includes(def.id) ||
    def.id === 'dragon' ||
    ['int'].includes(def.checks?.[0]?.stat) ||
    ['glass', 'frost', 'star'].includes(def.region)
  )
    return 'magical';
  return 'physical';
}
export function personalProtection(c, type) {
  if (!conscious(c)) return 0;
  const klass = classOf(c);
  return (
    (klass[type] || 0) +
    (type === 'undead' ? klass.magical || 0 : 0) +
    (c.undead && c.skills.includes('graveEndurance')
      ? type === 'physical'
        ? 10
        : type === 'undead'
          ? 15
          : -15
      : 0)
  );
}
export function classWorkFactor(c) {
  const stage = injuryLevel(c);
  return hasTalent(c, 'injuryWork')
    ? [1, 1, 1, 0.5, 0, 0][stage]
    : [1, 0.85, 0.6, 0.2, 0, 0][stage];
}
