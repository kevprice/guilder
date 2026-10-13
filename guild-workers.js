import { mara } from './mara.js';

// House staff are workers, without becoming expedition recruits or gaining adventurer levels.
export function guildWorker(s, id) {
  if (id === 'rowan')
    return {
      id,
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
      status: s.rowanRecovery > 0 ? 'injured' : 'home',
      injury: s.rowanRecovery > 0 ? 1 : 0,
    };
  if (id === 'mara') {
    const tier = s.guild.house?.mara.tier || 1;
    const defending =
      s.guild.house?.mara.defend &&
      s.roster.filter((c) => !['dead', 'departed'].includes(c.status)).length >= 3 &&
      Object.values(s.threats || {}).some((t) => t.active);
    return {
      id,
      name: mara.name,
      type: 'brass caretaker',
      color: '#d4ad62',
      str: 6 + (tier - 1) * 4,
      agi: 4 + (tier - 1) * 2,
      int: 8 + (tier - 1) * 4,
      end: 8 + (tier - 1) * 4,
      skills: [],
      status: defending ? 'defending' : 'home',
      injury: 0,
    };
  }
  return s.roster.find((c) => c.id === id) || null;
}
export function guildWorkers(s) {
  return [
    guildWorker(s, 'rowan'),
    guildWorker(s, 'mara'),
    ...s.roster.filter((c) => !['dead', 'departed'].includes(c.status)),
  ];
}
