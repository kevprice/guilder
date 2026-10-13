import { resourceIcon } from './resource-icons.js';
import { resources } from './guild-economy.js';
export function renderNavigation(tab, notices, { esc, storeAvailable, moreOpen = false }) {
  const badge = (t) =>
    notices[t]?.count
      ? `<span class="nav-notice" aria-label="${notices[t].count} ${esc(notices[t].label)}">${notices[t].count}</span>`
      : '';
  const primary = [
    ['Rooms', 'House', '▦'],
    ['Characters', 'Residents', '♙'],
    ['Contracts', 'Contracts', '⌖'],
    ['Stories', 'Story', '◇'],
  ];
  const secondary = [
    ...(storeAvailable ? ['Store room'] : []),
    'Training',
    'Exploration',
    'Diaries',
    'Reports',
    'Journal',
    'Options',
  ];
  const moreCount = secondary.reduce((n, t) => n + (notices[t]?.count || 0), 0);
  return (
    primary
      .map(
        ([t, label, icon]) =>
          `<button data-tab="${t}" class="${t === tab ? 'active' : ''}" ${t === tab ? 'aria-current="page"' : ''}><span aria-hidden="true">${icon}</span><span class="nav-label">${label}</span>${badge(t)}</button>`,
      )
      .join('') +
    `<div class="nav-more"><button data-action="navMore" aria-expanded="${moreOpen}" aria-controls="nav-more-menu" class="${secondary.includes(tab) ? 'active' : ''}"><span aria-hidden="true">•••</span><span class="nav-label">More</span>${moreCount ? '<span class="nav-notice">' + moreCount + '</span>' : ''}</button>${moreOpen ? '<div id="nav-more-menu" class="more-menu" role="group" aria-label="More game pages">' + secondary.map((t) => `<button data-tab="${t}">${t === 'Store room' ? 'Equipment' : t}${badge(t)}</button>`).join('') + '</div>' : ''}</div>`
  );
}
export function renderHudResources(s, esc) {
  return ['gold', 'salvage', 'supplies']
    .map((id) => {
      const name = resources.find((r) => r.id === id).name;
      return `<button data-action="material:${id}" aria-label="${esc(name)}: ${id === 'gold' ? s.gold : s.guild[id]}. View resource" title="${esc(name)}">${resourceIcon(id, esc(name))}<strong>${id === 'gold' ? s.gold : s.guild[id]}</strong></button>`;
    })
    .join('');
}
