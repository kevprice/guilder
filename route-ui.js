import * as D from './domain.js';
import { resourceIcon } from './resource-icons.js';

const keyIcon =
  '<svg viewBox="0 0 64 64" role="img" aria-label="Route item"><circle cx="21" cy="23" r="13" fill="none" stroke="currentColor" stroke-width="5"/><path d="m30 32 24 24m-8-8 6-6m-14-2 6-6" fill="none" stroke="currentColor" stroke-width="5"/></svg>';
export function renderDoorCard(s, id, { esc, btn }, origin = null) {
  const r = D.routeStatus(s, id);
  if (!r) return '';
  const local = origin?.floor === r.passage.y,
    atDoor = local && Math.abs(origin.x - r.passage.x) <= 65;
  const patterns = D.patternRecipes.filter((p) => p.sourceFlag === 'searched_' + r.destination.id);
  let html = `<article class="door-inspector"><div class="section-heading"><h3>${esc(r.name)}</h3><span class="production-state">${r.visited ? 'Explored' : r.ready ? 'Ready to open' : r.canSolve ? 'Solution earned' : 'Locked'}</span></div><p class="route-location">${esc(r.source)} → ${esc(r.destination.name)}</p><div class="door-benefit"><span class="eyebrow">WHAT YOU GAIN</span><p>${esc(D.roomBenefit(s, r.destination.id))}</p>${patterns.length ? '<p>Patterns: ' + patterns.map((p) => esc(p.name || D.equipment.find((e) => e.id === p.item)?.name)).join(', ') + ' · secure and search the room.</p>' : ''}${r.destination.encounter ? '<p>Guardian: ' + esc(D.contracts.find((m) => m.id === r.destination.encounter)?.name) + '. Its treasure is beyond it.</p>' : ''}${r.destination.trap ? '<p>Contains a ' + esc(r.destination.trap) + ' trap. Bring a specialist.</p>' : ''}</div>`;
  if (r.solved)
    html += '<p class="requirement met">✓ This mechanism is secured for all companions.</p>';
  else {
    html += `<h4>Door requirements</h4><div class="door-requirements">${r.primary.map((p) => `<div class="requirement ${p.met ? 'met' : 'missing'}"><strong>${p.met ? '✓' : '○'} ${esc(p.label)}</strong><p>${esc(p.lead)}</p></div>`).join('')}</div>`;
    if (r.alternatives.length)
      html += `<h4>Other earned solutions</h4>${r.alternatives
        .map(
          (o) =>
            `<div class="requirement ${o.met ? 'met' : 'missing'}"><strong>${o.met ? '✓' : '○'} ${esc(o.label)}</strong><p>${esc(o.detail)}</p>${
              o.recipe &&
              D.recipeKnown(
                s,
                D.recipes.find((r) => r.id === o.recipe),
              )
                ? btn('View mechanism recipe', 'recipeOpen:' + o.recipe)
                : ''
            }${o.met && !r.guardian && r.sourceReached ? btn('Secure this route', 'routeSolve:' + id + ':' + o.id) : ''}</div>`,
        )
        .join('')}`;
  }
  if (r.guardian)
    html += `<p class="production-paused">First defeat ${esc(D.contracts.find((m) => m.id === r.guardian)?.name)} in the source room.</p>${btn('View clearing contract', 'routeContract:' + r.guardian)}`;
  if (r.ready && atDoor) html += btn('Open ' + r.name + ' →', 'doorOpen:' + id);
  else if (local) html += btn('Walk to this door', 'routeWalk:' + id);
  else
    html += `<p class="stats">To visit: return to ${esc(r.source)}, then use ${esc(r.name)}.</p>`;
  if (s.selected === 'rowan' && !s.flags.free)
    html +=
      '<p class="stats">Rowan is still bound to the entrance. Control an adventurer to explore this route.</p>';
  return html + '</article>';
}
export function renderRouteLedger(s, helpers, { here, selected = null, origin } = {}) {
  const { esc, btn } = helpers,
    known = D.passages.filter((p) => D.routeVisible(s, p)),
    current =
      known.find((p) => p.id === selected) || known.find((p) => p.from === here) || known[0];
  let html = `<div class="management-heading"><div><h3>Routes & expansion</h3><p>You are in ${esc(D.sourceName(here || 'the main estate'))}. Doors lead to useful workplaces; secure and search them before assigning a crew.</p></div></div>`;
  if (!current)
    return (
      html +
      '<p>Restore the tower or drain the cellar to discover the first branch. Their recovered keys are listed in the Journal.</p>'
    );
  html += `<label class="search-control">Known doors<select id="route-select" aria-label="Known doors">${known
    .map((p) => {
      const r = D.routeStatus(s, p.id);
      return `<option value="${p.id}" ${p.id === current.id ? 'selected' : ''}>${esc(r.name)} · ${esc(r.source)} · ${r.visited ? 'explored' : r.ready ? 'ready' : r.canSolve ? 'solution earned' : 'locked'}</option>`;
    })
    .join('')}</select></label>`;
  html += renderDoorCard(s, current.id, helpers, origin);
  const ready = known.filter(
    (p) =>
      !s.flags['discovered_' + p.to] &&
      (D.routeStatus(s, p.id).ready || D.routeStatus(s, p.id).canSolve),
  );
  if (ready.length)
    html += `<details class="quiet-details" open><summary>Earned routes · ${ready.length}</summary>${ready.map((p) => btn(D.doorName(p.id), 'routeSelect:' + p.id)).join('')}</details>`;
  return html;
}
export function renderRouteRewards(s, ids, { esc, btn }) {
  return ids
    .map((id) => {
      const p = id.startsWith('door_') ? D.passages.find((p) => 'door_' + p.id === id) : null,
        tool = D.mechanismRecipes.find((r) => 'tool_' + r.routeTool === id),
        item = D.routeItems.find((r) => r.id === id),
        doors = p ? [p.id] : (tool || item)?.doors || [],
        name = p ? D.doorName(p.id) : tool?.name || item?.name;
      return `<article class="guild-reward route-reward">${tool ? resourceIcon('craft', esc(name)) : keyIcon}<div><span class="eyebrow">${p ? 'DOOR SOLUTION EARNED' : tool ? 'MECHANISM COMPLETED' : 'KEY OR ROUTE CLUE RECOVERED'}</span><strong>${esc(name)}</strong>${tool ? '<p>' + esc(tool.purpose) + '</p>' : ''}${doors
        .map((id) => {
          const route = D.passages.find((p) => p.id === id);
          return `<p>Unlocks <strong>${esc(D.doorName(id))}</strong>${route ? ' · ' + esc(D.sourceName(route.from)) + ' → ' + esc(route.to === 'stars' ? D.chambers.find((r) => r.id === route.to).name : D.chambers.find((r) => r.id === route.to)?.name || '') : ''}.</p>${route && D.routeVisible(s, route) ? btn('Inspect door →', 'rewardRoute:' + id) : ''}`;
        })
        .join('')}</div></article>`;
    })
    .join('');
}
export function renderDevelopmentRewards(s, ids, { esc, btn }) {
  return ids
    .map((id) => {
      const r = D.houseRooms.find((r) => r.id === id),
        f = D.roomForecast(s, id),
        resource = Object.keys(f.role.output)[0] || 'craft';
      return `<article class="guild-reward">${resourceIcon(resource, esc(f.role.name))}<div><span class="eyebrow">WORKPLACE SECURED</span><strong>${esc(r.name)}</strong><p>${esc(D.roomBenefit(s, id))}</p>${btn('Assign room crew →', 'rewardWorkplace:' + id)}</div></article>`;
    })
    .join('');
}
