import { renderHouseholdMilestones } from './expedition-ui.js';
import { renderUpgrades } from './upgrade-ui.js';
import { craftPlan, queueCommitments } from './production-planning.js';
import * as D from './domain.js';
import { portraits } from './portraits.js';
import { furnitureIcon } from './guild-art.js';
import { equipmentIcon } from './equipment-rewards.js';
import { renderCrew, renderMara } from './house-panel.js';
import { roomProduction, recipeName, number } from './production-view.js';
import { resourceIcon } from './resource-icons.js';

export const managementPages = [
  ['dashboard', 'Rooms'],
  ['recipes', 'Craft'],
  ['stores', 'Stores'],
  ['decorate', 'Decorate'],
  ['mara', 'Mara'],
];
const group = (r) =>
  r.routeTool
    ? 'mechanisms'
    : r.maraTier
      ? 'mara'
      : r.category === 'weapon'
        ? 'weapons'
        : r.category === 'armour'
          ? 'armour'
          : r.furniture
            ? 'furniture'
            : 'materials';
const categoryNames = {
  all: 'All',
  weapons: 'Weapons',
  armour: 'Armour',
  furniture: 'Furniture',
  materials: 'Supplies & parts',
  mechanisms: 'Door mechanisms',
};
function recipeTiles(recipes) {
  const grouped = new Map();
  for (const r of recipes) {
    const key = r.item || r.furniture || r.id,
      previous = grouped.get(key);
    if (!previous || r.pattern || (!previous.pattern && r.materials)) grouped.set(key, r);
  }
  return [...grouped.values()];
}
const iconForRecipe = (r, esc) =>
  r.item
    ? equipmentIcon(
        D.equipment.find((e) => e.id === r.item),
        esc,
      )
    : r.furniture
      ? furnitureIcon(r.furniture, esc)
      : resourceIcon(
          Object.keys(r.materialOutput || r.resourceOutput || {})[0] || 'craft',
          esc(recipeName(r)),
        );
const chip = (s, id, esc) => {
  const r = D.resources.find((r) => r.id === id);
  return `<button class="stock-chip" data-action="material:${id}" title="${esc(r.use)}" aria-label="${esc(r.name)}: ${D.resourceStock(s, id)}. View uses"><span style="color:${r.color}">${resourceIcon(id, esc(r.name))}</span><strong>${D.resourceStock(s, id)}</strong><span>${esc(r.name)}</span></button>`;
};
export function managementHeader(s, section, { esc }) {
  const active = ['house', 'workshop', 'garden', 'infirmary', 'overview'].includes(section)
    ? 'dashboard'
    : section === 'storage'
      ? 'decorate'
      : section === 'materials'
        ? 'stores'
        : section;
  const unread = s.guild.patterns?.filter((id) => !s.guild.readPatterns.includes(id)).length || 0;
  return `<div class="management-tabs" role="group" aria-label="House management">${managementPages.map(([id, label]) => `<button data-action="roomPage:${id}" aria-pressed="${id === active}" ${id === active ? 'class="selected"' : ''} title="${label}" aria-label="${label}">${resourceIcon({ dashboard: 'house', recipes: 'craft', stores: 'salvage', decorate: 'components', mara: 'guard' }[id], label)}${id === 'recipes' && unread ? '<span class="nav-notice">' + unread + '</span>' : ''}</button>`).join('')}</div><div class="stock-strip">${['gold', 'salvage', 'supplies'].map((id) => chip(s, id, esc)).join('')}</div>`;
}
function outputButtons(p, { esc }) {
  if (p.recipe?.item || p.recipe?.furniture)
    return `<div class="production-art">${iconForRecipe(p.recipe, esc)}</div>`;
  return `<button class="production-art" data-action="${p.watch ? 'roomPage:mara' : p.resource === 'craft' ? 'roomPage:recipes' : p.resource === 'care' ? 'material:supplies' : 'material:' + p.resource}" aria-label="${esc(p.resourceName)} uses" style="color:${D.resources.find((r) => r.id === p.resource)?.color || '#91c9c3'}">${resourceIcon(p.resource, esc(p.resourceName))}</button>`;
}
const workerFaces = (s, p, esc) =>
  `<span class="crew-faces" aria-label="${p.assigned} of ${p.capacity} worker slots">${s.guild.house.rooms[
    p.id
  ].workers
    .map((id) => {
      const c = D.guildWorker(s, id);
      return c
        ? `<img src="${portraits[id]}" alt="${esc(c.name)} · ${c.status}" class="${c.status === 'home' && !c.injury ? '' : 'unavailable'}">`
        : '<span aria-label="Empty worker slot">+</span>';
    })
    .join('')}</span>`;

export function renderRoomDashboard(s, helpers, { roomFilter = 'all', roomSearch = '' } = {}) {
  const { esc, btn } = helpers;
  const known = D.houseRooms
    .filter((r) => D.roomUnlocked(s, r))
    .map((r) => roomProduction(s, r.id))
    .sort(
      (a, b) =>
        ({ working: 0, paused: 1, blocked: 2, idle: 3 })[a.status] -
        { working: 0, paused: 1, blocked: 2, idle: 3 }[b.status],
    );
  const shown = known.filter(
    (p) =>
      (roomFilter === 'all' ||
        (roomFilter === 'working' && p.status === 'working') ||
        (roomFilter === 'empty' && !p.assigned) ||
        (roomFilter === 'paused' && ['paused', 'blocked'].includes(p.status))) &&
      p.room.name.toLowerCase().includes(roomSearch.toLowerCase()),
  );
  let html = `<div class="management-heading"><div><h3>Your house</h3><p>${known.filter((p) => p.status === 'working').length} producing · ${known.filter((p) => !p.assigned).length} need a crew</p></div><button data-action="roomDay" title="Advance one day" aria-label="Advance one day">${resourceIcon('next', 'Advance one day')}</button></div><div class="room-filters" role="group" aria-label="Filter rooms">${[
    ['all', 'All rooms'],
    ['working', 'Working'],
    ['empty', 'Needs crew'],
    ['paused', 'Paused'],
  ]
    .map(
      ([id, label]) =>
        `<button data-action="roomFilter:${id}" aria-pressed="${roomFilter === id}">${label}</button>`,
    )
    .join(
      '',
    )}</div><label class="search-control">Find a room<input id="room-search" type="search" value="${esc(roomSearch)}" placeholder="Room name" aria-label="Find a room"></label><div class="production-grid">`;
  for (const p of shown)
    html += `<button class="production-card state-${p.status}" data-action="workplace:${p.id}" aria-label="Manage ${esc(p.room.name)}: ${esc(p.reason || p.rate)}"><span class="production-card-top"><span class="resource-disc" style="color:${D.resources.find((r) => r.id === p.resource)?.color || '#91c9c3'}">${resourceIcon(p.resource, esc(p.resourceName))}</span><span class="production-state">${p.status === 'working' ? 'Working' : p.status === 'blocked' ? 'Locked' : p.status === 'paused' ? 'Paused' : 'Idle'}</span></span><strong>${esc(p.room.name)}</strong><span class="production-name">${esc(p.recipe ? recipeName(p.recipe) : p.resourceName)}</span><span class="production-rate">${esc(p.reason || p.rate)}</span><progress value="${p.progress}" max="${p.target || 1}" aria-label="${esc(p.room.name)} progress"></progress><span class="production-card-bottom">${workerFaces(s, p, esc)}<span>${p.nextDays ? 'Next: ' + p.nextDays + 'd' : p.watch ? 'Home watch' : p.assigned + '/' + p.capacity + ' assigned'}</span></span></button>`;
  html += '</div>';
  if (!shown.length)
    html +=
      '<div class="empty-state"><h3>No matching rooms</h3><p>Try another filter or room name.</p></div>';
  if (s.guild.dailySummary?.lines.length)
    html += `<details class="quiet-details"><summary>Last day’s production · Day ${s.guild.dailySummary.day}</summary><ul>${s.guild.dailySummary.lines.map((l) => '<li>' + esc(l) + '</li>').join('')}</ul></details>`;
  html +=
    '<details class="quiet-details"><summary>Managing residents</summary><p>Leave a companion in a room and switch characters to assign them, or choose their worker slot in the room inspector. Missions and injuries pause home work.</p></details>';
  return html + renderHouseholdMilestones(s, helpers);
}

export function renderRoomInspector(s, helpers, id, facilityDetails = '') {
  const { esc, btn } = helpers,
    r = D.houseRooms.find((r) => r.id === id && D.roomUnlocked(s, r));
  if (!r) return renderRoomDashboard(s, helpers);
  const p = roomProduction(s, id),
    state = s.guild.house.rooms[id];
  let html =
    btn('← All rooms', 'roomPage:dashboard') +
    `<div class="inspector-title"><h3>${esc(r.name)}</h3><span class="production-state state-${p.status}">${p.status === 'working' ? 'Working' : p.status === 'blocked' ? 'Locked' : p.status === 'paused' ? 'Paused' : 'Idle'}</span></div><div class="production-hero">${outputButtons(p, helpers)}<div><span class="eyebrow">${p.watch ? 'HOME DEFENCE' : 'PRODUCES'}</span><strong>${esc(p.recipe ? recipeName(p.recipe) : p.amount ? p.amount + ' ' + p.resourceName : p.resourceName)}</strong><p>${esc(p.reason || p.rate)}</p>${p.average && D.resources.some((r) => r.id === p.resource) ? '<span class="stats">Average ' + number(p.average) + ' ' + esc(p.resourceName.toLowerCase()) + ' per game day</span>' : ''}</div></div>`;
  if (p.target)
    html += `<div class="production-timing"><progress value="${p.progress}" max="${p.target}" aria-label="Production progress"></progress><span>${p.nextDays ? 'Ready in ' + p.nextDays + (p.nextDays === 1 ? ' day' : ' days') : 'Work paused'}${p.nextDays ? ' · Day ' + (s.day + p.nextDays) : ''}</span></div>`;
  const forecast = D.roomForecast(s, id);
  const context =
    s.outside?.research?.room === id
      ? D.researchForecast(s)
      : p.core
        ? D.workBreakdown(s, p.core, p.recipe)
        : forecast;
  html += `<p class="crew-effects">${context.relationship ? 'Relationships: ' + (context.relationship > 0 ? '+' : '') + context.relationship + ' work. ' : ''}${context.supervision ? 'Necromancer supervision: +' + context.supervision + ' work for up to two zombies.' : ''}</p>`;
  if (!p.core && forecast.quality > 1)
    html += `<p class="production-milestone">${forecast.yieldBonus ? '✓ +' + forecast.yieldBonus + ' output per batch earned. ' : ''}Richer workplace · effective ${p.stat.toUpperCase()} 20 adds +1 output per batch${forecast.quality >= 3 ? '; 30 adds another +1' : ''}. Current best worker: ${forecast.bestStat}.</p>`;
  html += `<div class="section-heading"><h4>Room crew</h4><span>${p.fit} working / ${p.capacity} ${p.capacity === 1 ? 'slot' : 'slots'} · ${p.stat.toUpperCase()}</span></div>${renderCrew(s, id, helpers)}<details class="quiet-details"><summary>How production works</summary><p>${p.core ? 'Rooms need fit assigned workers. Mara uses a normal worker slot. Empty rooms pause and keep their progress. ' : ''}Each fit worker adds 1 work; effective ${p.stat.toUpperCase()} 10 adds another, 20 a third, 30 a fourth and 40 a fifth. Away and injured residents keep their slots and resume on return. Mara pauses production to defend during attacks.</p><p>${p.work} current work per day${p.target ? ' · ' + p.progress + '/' + p.target + ' work completed' : ''}. Outputs collect automatically on game days. At most one batch completes per day.</p>${Object.entries(
    D.activities[p.core || r.activity].inputs || {},
  )
    .map(
      ([id, n]) =>
        '<p>Each batch consumes ' +
        n +
        ' ' +
        esc(D.resources.find((r) => r.id === id).name.toLowerCase()) +
        '.</p>',
    )
    .join('')}</details>`;
  if (id === 'tower') html += btn('Creature research', 'fieldPage:bestiary');
  if (p.core === 'workshop')
    html += `<div class="room-primary-actions">${btn('Choose a recipe', 'roomPage:recipes')}${p.recipe ? btn('Manage project & orders', 'facilitySettings:workshop') : ''}</div>`;
  else if (p.core) html += renderFacilityControls(s, helpers, p.core);
  else if (p.watch) html += btn('Mara & home defence', 'roomPage:mara');
  else
    html += btn(
      state.enabled ? 'Pause production' : 'Resume production',
      'housePause:' + id + ':' + (state.enabled ? 'pause' : 'resume'),
    );
  html += `<div class="room-secondary-actions">${btn('Decorate this room', 'decorateRoom:' + (p.core || 'room_' + id))}${p.core ? btn('Room upgrades & furnishings', 'facilitySettings:' + p.core) : ''}${D.roomPause(s, r) === 'Repair the room first' ? btn('Repair room · 30g', 'repairDamage:' + (id === 'hospice' ? 'garden' : id), s.gold < 30) : ''}</div>`;
  return html;
}

function renderFacilityControls(s, { esc, btn }, id) {
  const f = s.guild.facilities[id];
  if (id === 'garden') {
    const p = s.guild.gardenPolicy;
    return `<details class="quiet-details"><summary>Harvest plan · ${p.mode === 'continuous' ? 'Continuous' : p.mode === 'reserve' ? 'Keep ' + p.reserve + ' supplies' : 'Paused'}</summary><label>Growing mode<select id="garden-policy-mode" aria-label="Garden growing mode"><option value="continuous" ${p.mode === 'continuous' ? 'selected' : ''}>Grow continuously</option><option value="reserve" ${p.mode === 'reserve' ? 'selected' : ''}>Maintain a supply reserve</option><option value="paused" ${p.mode === 'paused' ? 'selected' : ''}>Pause growing</option></select></label><label>Supply reserve target<input id="garden-policy-reserve" aria-label="Supply reserve target" type="number" min="1" value="${p.reserve}"></label>${btn('Apply growing plan', 'gardenPolicy')}<p class="stats">Reserve farming resumes when stocks fall below the target. Partial crop progress is saved.</p></details>`;
  }
  if (id === 'infirmary') {
    const patients = D.carePlan(s),
      p = s.guild.carePolicy;
    return `<div class="patient-list"><h4>Patients</h4>${
      s.roster
        .filter((c) => c.status === 'injured' && !c.undead)
        .map((c) => {
          const forecast = D.treatmentForecast(s, c.id);
          return `<div class="patient-row"><strong>${esc(c.name)}</strong><span>${c.recovery} recovery days${forecast.eligible ? ' · treatment saves ' + forecast.savedDays + 'd' : ' · natural recovery is faster'}</span>${btn(f.project?.patient === c.id ? 'In treatment' : 'Treat · 1 supply', 'project:infirmary:treatment:' + c.id, !!f.project || !forecast.eligible || !D.facilityAvailable(s, id) || s.guild.supplies < 1)}</div>`;
        })
        .join('') || '<p class="stats">No injured companions need treatment.</p>'
    }</div><details class="quiet-details"><summary>Care plan · ${p.mode === 'auto' ? 'Automatic' : 'Manual'}</summary><label>Care mode<select id="care-policy-mode" aria-label="Infirmary care mode"><option value="manual" ${p.mode === 'manual' ? 'selected' : ''}>Manual · choose treatments</option><option value="auto" ${p.mode === 'auto' ? 'selected' : ''}>Automatic · treat when useful</option></select></label><label>Patient priority<select id="care-policy-priority" aria-label="Automatic care priority"><option value="longest" ${p.priority === 'longest' ? 'selected' : ''}>Longest recovery first</option><option value="soonest" ${p.priority === 'soonest' ? 'selected' : ''}>Soonest home first</option></select></label><label>Protected supplies<input id="care-policy-reserve" aria-label="Protected supplies" type="number" min="0" value="${p.reserve}"></label>${btn('Apply care plan', 'carePolicy')}<p class="stats">${esc(patients.waiting || 'Next: ' + patients.next?.name)}. Treatments cost 1 supply and remove two recovery days.</p>${patients.gardenConflict ? '<p class="production-paused">Garden target is too low to fund care.</p>' + btn('Grow a care buffer', 'careGarden') : ''}</details>${f.project ? btn('Cancel & refund treatment', 'cancelProject:infirmary') : ''}`;
  }
  return '';
}

export function recipeCatalogue(s) {
  return D.recipes.filter(
    (r) =>
      r.facility === 'workshop' &&
      !r.sourceEquipment &&
      !r.sourceFurniture &&
      !r.reclaim &&
      !r.maraTier &&
      (s.household?.opening !== 'ready' || !r.sourceFlag || D.recipeKnown(s, r)),
  );
}
export function renderCrafting(
  s,
  helpers,
  { craftCategory = 'all', craftRecipe = null, craftSource = null, craftQuantity = 1 } = {},
) {
  const { esc, btn } = helpers,
    all = recipeCatalogue(s),
    filtered = all.filter(
      (r) =>
        (craftCategory === 'all' || group(r) === craftCategory) &&
        (!craftSource || r.materials?.[craftSource] || r[craftSource] > 0),
    );
  const known = filtered.filter((r) => D.recipeKnown(s, r)),
    selected =
      known.find((r) => r.id === craftRecipe) ||
      known.find((r) => !D.resourceShortfall(s, D.projectRecipe(s, 'workshop', r.id)).length) ||
      known[0];
  const tiles = recipeTiles(known),
    unread = s.guild.patterns.filter((id) => !s.guild.readPatterns.includes(id)).length;
  let html = `<div class="management-heading"><div><h3>Workshop</h3><p>${recipeTiles(all.filter((r) => D.recipeKnown(s, r))).length} known recipes · ${unread} new ${unread === 1 ? 'pattern' : 'patterns'}</p></div>${btn('Room crew', 'workplace:service')}</div><div class="craft-filters" role="group" aria-label="Recipe categories">${Object.entries(
    categoryNames,
  )
    .filter(
      ([id]) =>
        s.household?.opening !== 'ready' || id === 'all' || all.some((r) => group(r) === id),
    )
    .map(
      ([id, label]) =>
        `<button data-action="craftCategory:${id}" aria-pressed="${craftCategory === id}">${label}</button>`,
    )
    .join('')}</div>`;
  const mastery = D.craftingProgress(s);
  html += `<section class="craft-mastery" aria-label="Workshop progression"><div>${resourceIcon('craft', 'Workshop rank')}<strong>${esc(mastery.name)}</strong><span>${mastery.count}${mastery.next ? ' / ' + mastery.next.products : ''} designs completed</span></div><progress value="${mastery.count}" max="${mastery.next?.products || mastery.count || 1}" aria-label="Workshop mastery"></progress><p>${mastery.next ? 'Complete ' + mastery.remaining + ' different ' + (mastery.remaining === 1 ? 'design' : 'designs') + ' to reach ' + mastery.next.name + ': +' + mastery.next.bonus + ' work/day while staffed.' : 'Guildwright reached: +2 work/day while staffed.'} Repeating a design produces more items; new designs grow guild experience.</p></section>`;
  if (craftSource)
    html += `<div class="filter-banner">Uses ${esc(D.resources.find((r) => r.id === craftSource).name)} ${btn('Show all recipes', 'craftSource:all')}</div>`;
  if (!D.facilitySite(s, 'workshop'))
    html +=
      '<p class="production-paused">Restore the service room to craft. Your known recipes remain here.</p>';
  const active = s.guild.facilities.workshop.project;
  if (active)
    html += `<div class="active-craft"><strong>${active.source ? 'Upgrading' : 'Building'} ${esc(recipeName(D.recipes.find((r) => r.id === active.recipe)))}</strong><progress value="${active.progress}" max="${active.work}" aria-label="Current craft progress"></progress><span>${active.progress}/${active.work} work · ${D.projectForecast(s, 'workshop').days || '—'} days left</span>${btn('Cancel & refund', 'cancelProject:workshop')}</div>`;
  if (selected) {
    const plan = craftPlan(s, selected.id, selected.routeTool ? 1 : craftQuantity),
      recipe = plan.recipe,
      missing = plan.missing.map((m) => ({ resource: m.id, amount: m.missing })),
      days = plan.days,
      item = D.equipment.find((e) => e.id === recipe.item),
      furniture = D.furnishings.find((f) => f.id === recipe.furniture);
    const inputs = plan.cost;
    const variants = known.filter((r) =>
      recipe.item
        ? r.item === recipe.item
        : recipe.furniture
          ? r.furniture === recipe.furniture
          : r.id === recipe.id,
    );
    html += `<section class="recipe-detail" aria-label="Selected recipe"><div class="recipe-detail-heading">${iconForRecipe(recipe, esc)}<div><span class="eyebrow">${recipe.pattern ? 'DISCOVERED PATTERN' : Object.keys(recipe.materials).length ? 'MATERIAL RECIPE' : 'SCRAP RECIPE'}</span><h3>${esc(recipeName(recipe))}</h3></div></div>${variants.length > 1 ? '<div class="craft-filters" role="group" aria-label="Recipe inputs">' + variants.map((r) => `<button data-action="craftRecipe:${r.id}" aria-pressed="${r.id === recipe.id}">Use ${r.materials ? 'materials' : 'scrap'}</button>`).join('') + '</div>' : ''}<p>${esc(
      recipe.purpose ||
        item?.desc ||
        furniture?.effect ||
        'Produces ' +
          Object.entries(recipe.materialOutput || recipe.resourceOutput || {})
            .map(([id, n]) => n + ' ' + D.resources.find((r) => r.id === id).name.toLowerCase())
            .join(', '),
    )}</p>${
      item
        ? '<p class="recipe-benefit">' +
          esc(item.slot) +
          ' slot · ' +
          Object.entries(item.stats)
            .map(([id, n]) => id.toUpperCase() + ' +' + n)
            .join(' · ') +
          '</p>'
        : ''
    }<div class="recipe-costs">${Object.entries(inputs)
      .filter(([, n]) => n > 0)
      .map(
        ([id, n]) =>
          `<button data-action="material:${id}" class="${D.resourceStock(s, id) < n ? 'insufficient' : ''}">${resourceIcon(id, esc(D.resources.find((r) => r.id === id).name))}<strong>${n}</strong><span>${esc(D.resources.find((r) => r.id === id).name)}</span><small>${D.resourceStock(s, id)} owned</small></button>`,
      )
      .join(
        '',
      )}</div><div class="recipe-build-actions">${recipe.routeTool ? '' : '<label class="craft-quantity">Quantity<input id="craft-quantity" aria-label="Craft quantity" type="number" min="1" max="99" step="1" value="' + craftQuantity + '"></label>'}<span>${days === null ? esc(plan.paused || 'Assign workshop staff') : days + ' ' + (days === 1 ? 'day' : 'days') + ' of work with current staff'}</span>${recipe.routeTool ? btn(s.guild.mechanisms.includes(recipe.routeTool) ? 'Mechanism owned' : 'Craft mechanism', 'project:workshop:' + recipe.id, !D.facilityAvailable(s, 'workshop') || !!active || !!missing.length || s.guild.mechanisms.includes(recipe.routeTool)) : btn('Plan ' + plan.quantity + ' ' + recipeName(recipe), 'craftOrder:' + recipe.id, !D.facilitySite(s, 'workshop'))}</div>${missing.length ? '<p class="stats">Need ' + missing.map((m) => m.amount + ' ' + esc(D.resources.find((r) => r.id === m.resource)?.name || m.resource)).join(' + ') + '. Planned orders wait for materials.</p>' : ''}${recipe.pattern ? '<p class="stats">' + esc(recipe.source) + '.</p>' : ''}</section>`;
    html += `<section class="craft-plan" aria-label="Materials for this plan"><h4>Material plan</h4><p class="stats">Orders pay when each item starts. Current work is already paid; planned orders leave stock available for other uses.</p><div class="material-plan-grid">${plan.materials
      .map((m) => {
        const resource = D.resources.find((r) => r.id === m.id);
        return `<div class="material-plan-row ${m.plannedMissing ? 'needs-material' : ''}"><button data-action="material:${m.id}" title="${esc(resource.name)}">${resourceIcon(m.id, esc(resource.name))}</button><div><strong>${esc(resource.name)}</strong><span>${m.owned} owned · ${m.planned} in queue · ${m.amount} for this order</span><small>${m.plannedMissing ? 'Need ' + m.plannedMissing + ' more after earlier orders' : 'Enough for queue and this order'}</small>${m.sources.map((source) => `<button class="plan-source" data-action="workplace:${source.room}">${esc(source.name)} · ${esc(source.paused || '+' + source.amount + ' / ' + source.days + 'd')}</button>`).join('')}${m.recipes
          .filter((id) => id !== recipe.id)
          .map((id) =>
            btn('Craft ' + recipeName(D.recipes.find((r) => r.id === id)), 'recipeOpen:' + id),
          )
          .join(
            '',
          )}${m.plannedMissing && !m.sources.length && !m.recipes.length ? '<small>Use contracts, restore a source, or choose another input variant.</small>' : ''}</div></div>`;
      })
      .join(
        '',
      )}</div>${plan.newDesign ? '<p class="recipe-benefit">First completion of this design advances workshop mastery.</p>' : ''}</section>`;
  } else html += '<div class="empty-state"><p>No known recipes match this filter.</p></div>';
  html +=
    '<div class="recipe-list" aria-label="Known recipes">' +
    tiles
      .map(
        (r) =>
          `<button class="recipe-tile ${(r.item || r.furniture || r.id) === (selected?.item || selected?.furniture || selected?.id) ? 'selected' : ''}" data-action="craftRecipe:${r.id}" aria-pressed="${(r.item || r.furniture || r.id) === (selected?.item || selected?.furniture || selected?.id)}">${iconForRecipe(r, esc)}<span><strong>${esc(recipeName(r))}</strong><small>${r.pattern ? 'Found pattern' : 'Workshop recipe'}${r.pattern && !s.guild.readPatterns.includes(r.id) ? ' · NEW' : ''}</small></span></button>`,
      )
      .join('') +
    '</div>';
  const unknown = filtered.filter((r) => !D.recipeKnown(s, r));
  if (unknown.length)
    html += `<details class="quiet-details"><summary>Patterns to discover · ${unknown.length}</summary>${unknown.map((r) => `<div class="locked-recipe">${iconForRecipe(r, esc)}<div><strong>${esc(recipeName(r))}</strong><p>${esc(r.source || 'Complete the ' + (r.blueprint === 'mill' ? 'mill road' : r.blueprint === 'drains' ? 'lower drains' : 'tower approaches') + ' survey')}.</p></div></div>`).join('')}</details>`;
  const queue = D.workshopQueueForecast(s);
  html += `<section class="queue-board" aria-label="Workshop build plan"><div class="section-heading"><h4>Build plan · ${queue.reduce((sum, o) => sum + o.remaining, 0)} items</h4>${btn('Room crew', 'workplace:service')}</div>${queue.map((o, i) => `<div class="queue-line"><span><strong>${i + 1}. ${esc(recipeName(D.recipes.find((r) => r.id === o.recipe)))} ×${o.remaining}</strong><small>${o.days === null ? 'Waiting: ' + (o.shortfall.length ? o.shortfall.map((m) => m.amount + ' ' + D.resources.find((r) => r.id === m.resource).name.toLowerCase()).join(' + ') : 'finish active work or restore staffing') : 'Complete on day ' + o.completionDay + ' with current crew'}</small></span>${btn('↑', 'moveOrder:' + o.uid + ':up', i === 0)}${btn('↓', 'moveOrder:' + o.uid + ':down', i === queue.length - 1)}${btn('Remove', 'removeOrder:' + o.uid)}</div>`).join('') || '<p class="stats">Choose a design and quantity. Assign a crew, then advance a day to begin.</p>'}</section>${btn('Refit & reclaim stored items', 'facilitySettings:workshop')}`;
  return html + renderUpgrades(s, helpers);
}

export function renderStores(s, helpers, { materialId = null, saleQuantity = 1 } = {}) {
  const { esc, btn } = helpers,
    selected =
      D.resources.find((r) => r.id === materialId) || D.resources.find((r) => r.id === 'timber'),
    stock = D.resourceStock(s, selected.id);
  let html =
    '<div class="management-heading"><div><h3>Guild stores</h3><p>Select a resource to see why it matters.</p></div></div><div class="resource-grid">' +
    D.resources
      .map(
        (r) =>
          `<button data-action="material:${r.id}" class="resource-tile ${r.id === selected.id ? 'selected' : ''}" aria-pressed="${r.id === selected.id}"><span style="color:${r.color}">${resourceIcon(r.id, esc(r.name))}</span><strong>${D.resourceStock(s, r.id)}</strong><span>${esc(r.name)}</span></button>`,
      )
      .join('') +
    '</div>';
  html += `<section class="resource-detail" aria-label="${esc(selected.name)} details"><div class="recipe-detail-heading"><span style="color:${selected.color}">${resourceIcon(selected.id, esc(selected.name))}</span><div><h3>${esc(selected.name)}</h3><span>${stock} in storage</span></div></div><p>${esc(selected.use)}</p>`;
  const uses = recipeTiles(
    recipeCatalogue(s).filter(
      (r) => D.recipeKnown(s, r) && (r.materials?.[selected.id] || r[selected.id] > 0),
    ),
  );
  html += `<h4>Known recipes</h4>${
    uses.length
      ? '<div class="resource-uses">' +
        uses
          .slice(0, 6)
          .map(
            (r) =>
              `<button data-action="recipeOpen:${r.id}">${iconForRecipe(r, esc)}<span>${esc(recipeName(r))}</span></button>`,
          )
          .join('') +
        '</div>' +
        btn('All ' + uses.length + ' recipes using ' + selected.name, 'craftSource:' + selected.id)
      : '<p class="stats">No workshop recipes known yet. More patterns appear as you explore.</p>'
  }`;
  if (selected.id === 'components' || selected.id === 'aether' || selected.id === 'ore')
    html += btn('Mara upgrades', 'roomPage:mara');
  const planned = queueCommitments(s)[selected.id] || 0;
  if (planned)
    html += `<p class="production-paused">${planned} planned for workshop orders · ${Math.max(0, stock - planned)} left after the queue. Plans do not reserve stock.</p>`;
  const sources = D.houseRooms.filter(
    (r) => D.roomUnlocked(s, r) && D.roomForecast(s, r.id).role.output[selected.id],
  );
  html += `<h4>Where it comes from</h4>${
    sources.length
      ? sources
          .map((r) => {
            const p = roomProduction(s, r.id);
            return `<button class="source-row" data-action="workplace:${r.id}"><span>${esc(r.name)}</span><span>${esc(p.reason || p.rate)}</span></button>`;
          })
          .join('')
      : selected.id === 'components'
        ? '<p>Craft brass components from ore and aether in the workshop.</p>' +
          btn('Component recipe', 'recipeOpen:brassComponents')
        : selected.id === 'gold'
          ? '<p>Complete missions, work local commissions, or sell surplus materials.</p>'
          : '<p class="stats">Explore and restore more rooms to discover a source.</p>'
  }`;
  if (selected.sell)
    html += `<div class="material-sale"><div><strong>Sell surplus</strong><span>${selected.sell} gold each</span></div><label>Quantity<input id="material-sale-quantity" aria-label="Quantity to sell" type="number" min="1" max="${Math.max(1, stock)}" value="${saleQuantity}" step="1"></label>${btn('Sell for ' + saleQuantity * selected.sell + 'g', 'sellMaterial:' + selected.id, stock < saleQuantity || !Number.isSafeInteger(saleQuantity) || saleQuantity < 1)}<p class="stats">Selling removes materials from storage. Keep enough for your next project.</p></div>`;
  if (['salvage', 'supplies'].includes(selected.id))
    html += btn(
      selected.id === 'salvage' ? 'Buy 4 scrap · 60g' : 'Buy 2 supplies · 15g',
      'resource:' + selected.id,
      s.gold < (selected.id === 'salvage' ? 60 : 15),
    );
  return html + '</section>';
}

export function renderPatternRewards(ids, { esc }) {
  return ids
    .map((id) => {
      const r = D.patternRecipes.find((r) => r.id === id);
      return `<div class="guild-reward">${iconForRecipe(r, esc)}<div><span class="eyebrow">RECIPE DISCOVERED</span><strong>${esc(recipeName(r))}</strong><p>Available to craft in the guild workshop.</p><button data-action="recipeReward:${id}">View recipe →</button></div></div>`;
    })
    .join('');
}
