import { portraits } from './portraits.js';
import { resourceIcon } from './resource-icons.js';
export function residentTiles(s) {
  return [
    { id: 'rowan', name: 'Rowan', status: 'home' },
    ...s.roster.filter((c) => c.status !== 'departed'),
  ].map((c) => {
    const controllable = c.status === 'home';
    const label = controllable
      ? 'At home'
      : c.status === 'away'
        ? 'On expedition'
        : c.status === 'assigned'
          ? 'Defending the house'
          : c.status === 'injured'
            ? 'Recovering'
            : 'Fallen';
    return {
      ...c,
      controllable,
      label,
      icon:
        c.status === 'away'
          ? 'contracts'
          : c.status === 'assigned'
            ? 'guard'
            : c.status === 'dead'
              ? 'skull'
              : 'infirmary',
    };
  });
}
export function renderResidentStrip(s, { esc, walking = () => null, assignment = () => null }) {
  return residentTiles(s)
    .map((c) => {
      const action = c.controllable ? 'select:' : 'inspectResident:';
      const detail = walking(c.id)
        ? 'Walking to ' + walking(c.id)
        : assignment(c.id)
          ? 'Assigned to ' + assignment(c.id)
          : c.label;
      return `<span class="home-resident ${c.controllable ? '' : 'unavailable'} ${c.points && c.controllable ? 'has-training' : ''}" data-resident="${c.id}"><button aria-label="${c.controllable ? 'Control' : 'Inspect'} ${esc(c.name)}${c.controllable ? '' : ' · ' + esc(c.label)}" data-action="${action + c.id}" class="${c.id === s.selected ? 'active' : ''}" aria-pressed="${c.id === s.selected}" title="${esc(c.name + ': ' + (c.controllable ? detail : c.label))}"><img src="${portraits[c.id]}" alt=""/>${c.controllable ? '' : `<span class="resident-state">${resourceIcon(c.icon, c.label)}</span>`}</button>${c.points && c.controllable ? `<button class="level-up" data-action="trainingOpen:${c.id}" aria-label="Train ${esc(c.name)}" title="${esc(c.name)} · ${c.points} unspent training choices">${resourceIcon('plus', 'Train')}</button>` : ''}</span>`;
    })
    .join('');
}
