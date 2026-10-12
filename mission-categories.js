import { contractLabel } from './opening-contracts.js';
export const missionTabs = [
  ['all', 'All'],
  ['main', 'Main plot'],
  ['companion', 'Companion stories'],
  ['regional', 'Regional stories'],
  ['exploration', 'Exploration'],
  ['defence', 'Home defence'],
  ['optional', 'Optional jobs'],
  ['work', 'Daily work'],
];
export function missionCategory(def) {
  if (def.homeEvent) return 'defence';
  if (def.personal) return 'companion';
  if (def.internal) return 'exploration';
  if (def.lethal || def.category === 'OPTIONAL JOB') return 'optional';
  if (def.region) return 'regional';
  if (
    def.chapter ||
    ['STORY LEAD', 'PLOT ITEM'].includes(def.category) ||
    contractLabel(def).kind.startsWith('MAIN STORY')
  )
    return 'main';
  if (def.choices) return 'regional';
  return 'work';
}
export function missionImpact(def) {
  const category = missionCategory(def);
  const label = contractLabel(def);
  const impact = {
    main: 'Advances the main plot',
    companion: 'Advances a companion story · optional to the main plot',
    regional: 'Advances a regional story · optional to the main plot',
    exploration: 'Unlocks exploration and records · optional to the main plot',
    defence: 'Protects the guild · does not advance the plot',
    optional: 'Optional job · does not advance the plot',
    work: 'Repeatable work · does not advance the plot',
  }[category];
  return {
    category,
    impact,
    detail:
      category === 'optional' && def.region
        ? 'Optional regional hunt · gold and experience'
        : label.detail,
  };
}
