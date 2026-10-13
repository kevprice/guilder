import * as D from './domain.js';
import { furnitureIcon } from './guild-art.js';
import { equipmentIcon } from './equipment-rewards.js';
import {
  renderHouse,
  renderMaterials,
  renderMara,
  renderCrew,
  materialCost,
} from './house-panel.js';
import {
  managementHeader,
  renderRoomDashboard,
  renderRoomInspector,
  renderCrafting,
  renderStores,
} from './management-ui.js';

export function renderRooms(
  s,
  { esc, card, btn },
  {
    section = 'all',
    orderQuantity = 1,
    furnitureUid = null,
    houseRoom = null,
    decorationRoom = null,
    compact = false,
    roomFilter = 'all',
    roomSearch = '',
    craftCategory = 'all',
    craftRecipe = null,
    craftSource = null,
    materialId = null,
    saleQuantity = 1,
  } = {},
) {
  const g = s.guild;
  const header = managementHeader(s, section, { esc });
  if (section === 'dashboard')
    return header + renderRoomDashboard(s, { esc, card, btn }, { roomFilter, roomSearch });
  if (section === 'house') return header + renderRoomInspector(s, { esc, card, btn }, houseRoom);
  if (section === 'recipes')
    return (
      header + renderCrafting(s, { esc, card, btn }, { craftCategory, craftRecipe, craftSource })
    );
  if (section === 'stores')
    return header + renderStores(s, { esc, card, btn }, { materialId, saleQuantity });
  const sections = [
    ['overview', 'Overview'],
    ['house', 'House rooms'],
    ['workshop', 'Workshop'],
    ['garden', 'Garden'],
    ['infirmary', 'Infirmary'],
    ['decorate', 'Decorate'],
    ['storage', 'Furniture storage'],
    ['materials', 'Materials'],
    ['mara', 'Mara'],
  ];
  const cost = materialCost;
  const canAfford = (r) => !D.resourceShortfall(s, r).length;
  const recipeName = (r) =>
    r.name
      ? r.name
      : r.item
        ? D.equipment.find((e) => e.id === r.item).name
        : r.furniture
          ? D.furnishings.find((f) => f.id === r.furniture).name
          : r.category === 'crop'
            ? 'Expedition crop'
            : 'Treatment';
  const breakdown = (id, recipe = null) => {
    const w = D.workBreakdown(s, id, recipe),
      worker = D.guildWorker(s, w.workerId),
      stat = D.facilities.find((f) => f.id === id).stat.toUpperCase();
    return [
      w.mara ? 'Mara caretaker +1' : '',
      w.upgrade ? 'tier bonus +' + w.upgrade : '',
      ...w.crew.map(
        (c) =>
          c.name +
          (c.fit
            ? ' +' + c.work + ' · ' + stat + ' ' + c.stat
            : '/ ' + c.status + ' · bonus paused'),
      ),
      w.utility ? 'forge +1' : '',
    ]
      .filter(Boolean)
      .join(' · ');
  };
  const shortfallText = (missing) =>
    missing
      .map(
        (r) =>
          r.amount +
          ' ' +
          (D.resources.find((d) => d.id === r.resource)?.name.toLowerCase() || r.resource),
      )
      .join(' + ');
  const suppliesText = (n) => n + (n === 1 ? ' supply' : ' supplies');
  let html = compact
    ? header
    : `<div class="room-tabs" role="group" aria-label="Room pages">${sections.map(([id, name]) => `<button data-action="roomPage:${id}" aria-pressed="${section === id}">${name}</button>`).join('')}</div><div class="resource-stock"><span>Gold <strong>${s.gold}</strong></span><span>Scrap <strong>${g.salvage}</strong></span><span>Supplies <strong>${g.supplies}</strong></span></div>`;
  html += `<div class="room-day-controls"><span class="stats">Day ${s.day} · rooms, recovery and expeditions</span>${btn('Advance guild day →', 'roomDay')}</div>`;
  if (section === 'house') return html + renderHouse(s, { esc, card, btn }, houseRoom);
  if (section === 'materials') return html + renderMaterials(s, { esc, card, btn });
  if (section === 'mara') return html + renderMara(s, { esc, card, btn });
  if (section === 'decorate')
    return html + renderDecorating(s, { esc, card, btn }, furnitureUid, decorationRoom);
  if (['all', 'overview'].includes(section))
    html +=
      '<p class="stats">Assign Rowan, Mara or companions to worker slots. Unassigned Mara provides caretaker work; assigning her directs that work to one room. Adventurers gain 5 XP on a staffed completion; home work does not count as an expedition visit.</p>';
  if (['all', 'overview'].includes(section))
    html += card(
      'Work throughout the house',
      `<p>${D.houseRooms.filter((r) => D.roomUnlocked(s, r)).length} discovered workplaces · ${D.guildWorkers(s).filter((c) => D.assignedRoom(s, c.id)).length} workers assigned. Room workers produce timber, ore, herbs, cloth, aether and fittings, or guard the home.</p><div class="row">${btn('Assign room crews', 'roomPage:house')}${btn('Materials and crafting', 'roomPage:materials')}${btn('Upgrade Mara', 'roomPage:mara')}</div>`,
    );
  if (['all', 'overview'].includes(section) && g.furniture.length)
    html += card(
      'Decorate your rooms',
      `<p>${g.furniture.length} owned furnishings. Place banners, rugs, plants and shelves throughout the house, or move pieces between rooms.</p>${btn('Place and move furnishings →', 'roomPage:decorate')}`,
    );
  if (['all', 'overview'].includes(section) && g.dailySummary?.lines.length)
    html += card(
      'Day ' + g.dailySummary.day + ' · Room work',
      '<ul class="work-summary">' +
        g.dailySummary.lines.map((l) => '<li>' + esc(l) + '</li>').join('') +
        '</ul>',
    );
  if (['all', 'overview'].includes(section))
    html += card(
      'Quartermaster resources',
      `<div class="row">${btn('Buy 2 supplies · 15g', 'resource:supplies', s.gold < 15)}${btn('Buy 4 scrap · 60g', 'resource:salvage', s.gold < 60)}</div>`,
    );
  const care = D.carePlan(s);
  if (
    ['all', 'overview'].includes(section) &&
    D.facilitySite(s, 'infirmary') &&
    care.mode === 'auto'
  ) {
    const crop = D.projectForecast(s, 'garden');
    html += card(
      'Supply plan',
      `<p>${suppliesText(care.reserve)} protected from automatic care · ${care.aboveReserve} available above the reserve.</p><p class="stats">${g.facilities.infirmary.project ? 'A paid treatment is already in progress.' : care.next ? 'Next patient: ' + esc(care.next.name) + ' · 1 supply' + (care.waiting ? ' · ' + esc(care.waiting.toLowerCase()) : ' · starts next game day') : 'No eligible patients waiting.'}${D.facilitySite(s, 'garden') ? '<br>Garden: ' + (crop.days === null ? esc(crop.paused || 'Waiting') : 'next harvest in ' + crop.days + (crop.days === 1 ? ' day' : ' days')) : ''}</p>${care.gardenConflict ? '<p class="production-paused">The garden target cannot build a surplus above your care reserve. Raise its target to fund automatic treatment.</p>' : ''}${btn('Manage care plan', 'roomPage:infirmary')}`,
    );
  }
  if (section === 'storage') {
    const project = g.facilities.workshop.project;
    if (project?.source?.kind === 'furniture') {
      const d = D.furnishings.find((f) => f.id === project.source.item.id);
      html += card(
        d.name + ' · Held at the workshop',
        `${furnitureIcon(d.id, esc)}<p>Reserved for reclamation · ${project.progress}/${project.work} work. Cancellation returns this exact piece to storage.</p>${btn('Manage reclamation', 'roomPage:workshop')}`,
      );
    }
    const placed = new Set(
      g.furniture.filter((i) => D.furniturePlacement(s, i.uid)).map((i) => i.uid),
    );
    html +=
      '<h3>Owned furnishings</h3><p class="stats">Stored pieces are available to every compatible room. Removing a furnishing returns it here.</p>';
    const owned = D.furnishings.filter((d) => g.furniture.some((i) => i.id === d.id));
    if (!owned.length)
      html +=
        '<p>No furnishings owned yet. Craft decorations in the workshop; surveys unlock utility blueprints.</p>';
    for (const d of owned) {
      const copies = g.furniture.filter((i) => i.id === d.id),
        availableCopies = copies.filter((i) => !placed.has(i.uid)).length;
      const places = D.facilities.filter(
        (f) => (!d.facility || d.facility === f.id) && D.facilitySite(s, f.id),
      );
      html += card(
        d.name,
        `${furnitureIcon(d.id, esc)}<p>${esc(d.effect)}</p><p class="stats">${copies.length} owned · ${availableCopies} in storage · ${copies.length - availableCopies} placed</p><div class="row">${places.map((f) => btn('Manage ' + f.name, 'roomPage:' + f.id)).join('')}</div>`,
      );
    }
    html += btn('Craft furniture in the workshop', 'roomPage:workshop');
    html += btn('Place and move furnishings →', 'roomPage:decorate');
    html +=
      '<p class="stats">Spare stored pieces can be reclaimed for scrap in the workshop. Placed furnishings and earned trophies are kept intact.</p>';
    return html;
  }
  for (const def of D.facilities.filter((f) => ['all', 'overview', f.id].includes(section))) {
    const f = g.facilities[def.id],
      site = D.facilitySite(s, def.id),
      available = D.facilityAvailable(s, def.id);
    if (!site) {
      html += card(
        def.name + ' · Unavailable',
        `<p>${esc(def.unlock)}</p>${def.id === 'infirmary' && s.flags.laboratory ? '<p class="stats">The greenhouse remains a laboratory. A restored regional medical room can provide treatment later.</p>' : ''}`,
      );
      continue;
    }
    const name =
      site === 'service' ? 'Restored service room' : D.rooms.find((r) => r.id === site)?.name;
    const nextRecipe = def.id === 'workshop' ? f.queue[0]?.recipe : null;
    const r = f.project
      ? D.projectRecipe(s, def.id, f.project.recipe)
      : nextRecipe
        ? D.projectRecipe(s, def.id, nextRecipe)
        : null;
    const work = D.dailyWork(s, def.id, r);
    const forecast = D.projectForecast(s, def.id);
    const paused = D.productionPause(s, def.id);
    if (section === 'overview') {
      let overview = `<span class="tag">${esc(name)} · Tier ${f.tier}</span><p class="stats">${esc(breakdown(def.id, r))}</p>`;
      if (f.project)
        overview += `<p>${esc(recipeName(r))} · ${f.project.progress}/${f.project.work} work${forecast.days === null ? ' · ' + esc(paused || 'Waiting') : ' · completes in ' + forecast.days + (forecast.days === 1 ? ' game day' : ' game days')}</p>`;
      else
        overview += `<p>${paused ? esc(paused) : def.id === 'garden' ? 'Automatic crop ready' : def.id === 'workshop' && f.queue.length ? 'Next order starts when you advance a day' : 'Ready for a project'}</p>`;
      if (def.id === 'workshop' && f.queue.length) {
        const queue = D.workshopQueueForecast(s),
          first = queue[0];
        overview += `<p class="stats">${queue.reduce((n, o) => n + o.remaining, 0)} items planned${first.affordableUnits === 0 && first.shortfall.length ? ' · waiting for resources' : ''}</p>`;
      }
      if (def.id === 'infirmary')
        overview += `<p class="stats">${care.mode === 'manual' ? 'Manual care' : 'Automatic care · ' + (care.priority === 'longest' ? 'longest recovery first' : 'soonest home first') + ' · protects ' + suppliesText(care.reserve)}${!f.project && care.mode === 'auto' ? '<br>' + esc(care.waiting || 'Next: ' + care.next.name) : ''}</p>`;
      overview += btn('Manage ' + def.name, 'roomPage:' + def.id);
      html += card(def.name, overview);
      continue;
    }
    let body = `<span class="tag">${esc(name)} · Tier ${f.tier}</span><p class="stats">${work} work per day<br>${esc(breakdown(def.id, r))}</p>`;
    if (!available)
      body += `<p class="threat-badge">Room damaged · production paused</p>${btn('Repair room · 30g', 'repairDamage:' + site, s.gold < 30)}`;
    body += `<label class="room-worker">Lead worker<select data-room-worker="${def.id}" aria-label="${def.name} worker" ${available ? '' : 'disabled'}><option value="">Empty lead slot</option>${D.guildWorkers(
      s,
    )
      .filter((c) => !['dead', 'departed'].includes(c.status))
      .map((c) =>
        (() => {
          const candidate = D.projectForecast(s, def.id, c.id),
            other = D.facilities.find(
              (other) => other.id !== def.id && g.facilities[other.id].worker === c.id,
            );
          return `<option value="${c.id}" ${f.worker === c.id ? 'selected' : ''}>${esc(c.name)} · ${esc(c.status)} · ${def.stat.toUpperCase()} ${candidate.workerStat} · ${candidate.workerFit ? '+' + candidate.leadWork + ' work' : 'bonus paused'}${candidate.days === null ? '' : ' · ' + candidate.scope + ' ' + candidate.days + (candidate.days === 1 ? ' day' : ' days')}${other ? ' · moves from ' + other.name : ''}</option>`;
        })(),
      )
      .join('')}</select></label>`;
    body += renderCrew(s, D.facilityRoom(s, def.id), { esc }, true);
    if (f.project) {
      const p = f.project,
        days = work ? Math.ceil((p.work - p.progress) / work) : null;
      body += `<div class="room-project"><strong>${esc(recipeName(r))}${p.patient ? ' · ' + esc(s.roster.find((c) => c.id === p.patient).name) : ''}</strong><label class="stats">${p.progress}/${p.work} work<progress value="${p.progress}" max="${p.work}"></progress></label><p class="stats">${days === null ? esc(paused || 'Work paused') : 'Estimated ' + days + ' more game ' + (days === 1 ? 'day' : 'days') + ' · day ' + (s.day + days)} · Reserved: ${cost(p.inputs)}</p>${btn(p.orderUid ? 'Cancel current item · refund inputs' : 'Cancel · refund inputs', 'cancelProject:' + def.id)}</div>`;
      if (p.source) {
        const input =
          p.source.kind === 'equipment'
            ? D.equipment.find((e) => e.id === p.source.item.id)
            : D.furnishings.find((d) => d.id === p.source.item.id);
        body += `<p class="conversion-held">Held: ${esc(input.name)} · #${p.source.item.uid.split('-').at(-1)}. ${r.reclaim ? 'Completion dismantles it for ' + p.yield + ' scrap.' : 'Completion replaces it with ' + esc(D.equipment.find((e) => e.id === r.item).name) + '.'} Cancel to return this piece and all paid inputs.</p>`;
      }
    } else if (def.id === 'garden') {
      const crop = D.projectRecipe(s, 'garden', 'crop');
      body += `<p>Automatic crop · ${crop.work} work → ${crop.yield} supplies. The next crop starts when you advance a day.</p>`;
    }
    if (def.id === 'infirmary') {
      const treatment = D.projectRecipe(s, 'infirmary', 'treatment'),
        patients = D.eligiblePatients(s).filter((c) => c.id !== f.project?.patient);
      body += `<div class="care-policy"><h4>Care plan</h4><label>Care mode<select id="care-policy-mode" aria-label="Infirmary care mode"><option value="manual" ${care.mode === 'manual' ? 'selected' : ''}>Manual · choose each treatment</option><option value="auto" ${care.mode === 'auto' ? 'selected' : ''}>Automatic · treat when useful</option></select></label><label>Patient priority<select id="care-policy-priority" aria-label="Automatic care priority"><option value="longest" ${care.priority === 'longest' ? 'selected' : ''}>Longest recovery first</option><option value="soonest" ${care.priority === 'soonest' ? 'selected' : ''}>Soonest home first</option></select></label><label>Protected supplies<input id="care-policy-reserve" aria-label="Protected supplies" type="number" min="0" step="1" value="${care.reserve}"></label><p class="stats">Automatic care spends 1 supply only when a new treatment starts, keeping ${suppliesText(care.reserve)} available for expeditions. Paid work continues if you change the plan. Manual treatment can use the reserve.</p>${btn('Apply care plan', 'carePolicy')}<p class="stats">${esc(care.waiting || 'Next: ' + care.next.name + ' · starts when you advance a day')}.</p>${care.mode === 'auto' ? '<p class="stats">' + suppliesText(care.aboveReserve) + ' above the reserve.</p>' : ''}${care.gardenConflict ? '<p class="production-paused">The garden target is too low to fund care above this reserve.</p>' : ''}${care.mode === 'auto' && D.facilitySite(s, 'garden') ? '<p class="stats">Grow a buffer for treatment while keeping the reserve available for trips.</p>' + btn('Set garden target · ' + care.gardenTarget + ' supplies', 'careGarden') : ''}</div>`;
      body += `<p>Treatment · 1 supply / ${treatment.work} work · removes two recovery days. Natural recovery continues.</p>`;
      body +=
        !f.project && patients.length
          ? patients
              .map((c) =>
                btn(
                  'Treat ' + c.name + ' · ' + c.recovery + ' recovery days left',
                  'project:infirmary:treatment:' + c.id,
                  !available || !canAfford(treatment),
                ),
              )
              .join('')
          : !f.project
            ? '<p class="stats">No eligible patients. Treatment is offered when it can finish before natural recovery.</p>'
            : '';
      if (!f.project && patients.length && !g.supplies)
        body +=
          '<p class="stats">Waiting for supplies · harvest crops or buy from the quartermaster.</p>';
      const recovering = s.roster.filter(
        (c) => c.recovery > 0 && !['dead', 'departed'].includes(c.status),
      );
      if (recovering.length) {
        body +=
          '<h4>Recovery forecast</h4><p class="stats">Compare one course of treatment with natural recovery, using current staff. Waiting time and further injuries can change these estimates.</p><div class="care-patients">';
        for (const c of recovering) {
          const forecast = D.treatmentForecast(s, c.id);
          body += `<article class="care-patient"><strong>${esc(c.name)}${f.project?.patient === c.id ? ' · In treatment' : ''}</strong><p class="stats">${forecast.naturalDays === null ? esc(forecast.reason) : 'Natural recovery: ' + forecast.naturalDays + (forecast.naturalDays === 1 ? ' day' : ' days') + '<br>' + (forecast.eligible ? 'With treatment: ' + forecast.homeDays + (forecast.homeDays === 1 ? ' day' : ' days') + ' · returns ' + forecast.savedDays + (forecast.savedDays === 1 ? ' day' : ' days') + ' earlier<br>Care finishes in ' + forecast.days + (forecast.days === 1 ? ' day' : ' days') + (f.project?.patient === c.id ? ' · supply already paid' : ' · 1 supply') : esc(forecast.reason))}</p></article>`;
        }
        body += '</div>';
      }
    }
    if (def.id === 'garden') {
      const policy = g.gardenPolicy;
      body += `<div class="garden-policy"><h4>Production plan</h4><label>Growing mode<select id="garden-policy-mode" aria-label="Garden growing mode">${[
        ['continuous', 'Grow continuously'],
        ['reserve', 'Maintain a supply reserve'],
        ['paused', 'Pause growing'],
      ]
        .map(
          ([id, label]) =>
            `<option value="${id}" ${policy.mode === id ? 'selected' : ''}>${label}</option>`,
        )
        .join(
          '',
        )}</select></label><label>Supply reserve target<input id="garden-policy-reserve" type="number" min="1" step="1" value="${policy.reserve}" aria-label="Supply reserve target"></label><p class="stats">Reserve mode pauses at ${policy.reserve} supplies and resumes when stocks drop below it. Partial crop work is saved, and harvests may exceed the target.</p>${btn('Apply growing plan', 'gardenPolicy')}${paused ? '<p class="production-paused">' + esc(paused) + ' · crop progress is preserved.</p>' : ''}</div>`;
    }
    if (def.id === 'workshop') {
      const queue = D.workshopQueueForecast(s);
      body +=
        '<div class="workshop-orders"><h4>Planned orders</h4><p class="stats">Each item is charged when it starts. Orders wait for missing resources. Only one project works at a time; removing an order leaves the current item running. Estimates use current staff and furnishings.</p>';
      if (!queue.length) body += '<p class="stats">No orders planned.</p>';
      for (const [index, order] of queue.entries()) {
        const name = recipeName(D.projectRecipe(s, 'workshop', order.recipe));
        body += `<article class="workshop-order"><strong>${index + 1}. ${esc(name)} × ${order.remaining}</strong><p class="stats">Remaining inputs: ${cost(order.cost)}<br>${order.completionDay === null ? (order.shortfall.length ? (index ? 'After earlier orders, short by ' : 'Current stock is short by ') + shortfallText(order.shortfall) : 'Waiting for the room or earlier orders') : 'Estimated complete: day ' + order.completionDay}${order.affordableUnits < order.remaining ? '<br>Current budget covers ' + order.affordableUnits + ' of these items.' : ''}</p><div class="row">${btn('Move earlier', 'moveOrder:' + order.uid + ':up', index === 0)}${btn('Move later', 'moveOrder:' + order.uid + ':down', index === queue.length - 1)}${btn('Remove remaining order', 'removeOrder:' + order.uid)}</div></article>`;
      }
      body +=
        '</div><label class="order-quantity">Items per new order<input id="workshop-quantity" type="number" min="1" max="99" step="1" value="' +
        orderQuantity +
        '" aria-label="Items per new order"></label>';
      if (!compact)
        body +=
          '<details open><summary>Craft equipment</summary><div class="room-recipes">' +
          D.recipes
            .filter(
              (r) =>
                r.item &&
                !r.materials &&
                !r.sourceEquipment &&
                (!r.blueprint || g.blueprints.includes(r.blueprint)),
            )
            .map((base) => {
              const r = D.projectRecipe(s, def.id, base.id),
                item = D.equipment.find((e) => e.id === r.item);
              return `<div class="room-recipe"><strong>${esc(item.name)}</strong><p class="stats">${esc(item.slot)} · ${Object.entries(
                item.stats,
              )
                .map(([stat, n]) => stat.toUpperCase() + ' +' + n)
                .join(
                  ' · ',
                )}<br>${cost(r)} / ${r.work} work${r.item ? '<br>' + (s.inventory || []).filter((i) => i.id === r.item).length + ' already owned' : ''}</p>${!f.project && !f.queue.length ? btn('Craft ' + item.name, 'project:workshop:' + r.id, !available || !canAfford(r)) : ''}${btn('Add order: ' + item.name, 'queueOrder:' + r.id)}</div>`;
            })
            .join('') +
          '</div></details><details><summary>Craft furniture</summary><div class="room-recipes">' +
          D.recipes
            .filter(
              (r) =>
                r.furniture && !r.materials && (!r.blueprint || g.blueprints.includes(r.blueprint)),
            )
            .map((base) => {
              const r = D.projectRecipe(s, def.id, base.id),
                item = D.furnishings.find((f) => f.id === r.furniture);
              return `<div class="room-recipe">${furnitureIcon(item.id, esc)}<strong>${esc(item.name)}</strong><p class="stats">${esc(item.effect)}<br>${cost(r)} / ${r.work} work</p>${!f.project && !f.queue.length ? btn('Craft ' + item.name, 'project:workshop:' + r.id, !available || !canAfford(r)) : ''}${btn('Add order: ' + item.name, 'queueOrder:' + r.id)}</div>`;
            })
            .join('') +
          '</div></details>';
      const conversions = D.workshopConversions(s);
      for (const reclaim of [false, true]) {
        const options = conversions.filter((r) => !!r.reclaim === reclaim);
        body += `<details class="workshop-conversions"><summary>${reclaim ? 'Reclaim spare equipment and furniture' : 'Refit stored equipment'}</summary><p class="stats">${reclaim ? 'Dismantle a stored piece for scrap. No gold cost. Rare equipment, equipped gear, placed furniture and trophies are kept intact.' : 'Reuse a stored short sword or padded coat to make sturdier equipment. Survey the mill road to discover these patterns.'} Each project reserves its exact item. Cancellation returns the piece and paid inputs. Started projects take priority over planned orders.</p>`;
        if (!options.length)
          body += `<p class="stats">${reclaim ? 'No spare stored pieces available.' : !g.blueprints.includes('mill') ? 'Survey the mill road to unlock refit patterns.' : 'Store a short sword or padded coat to use these patterns.'}</p>`;
        body +=
          '<div class="room-recipes">' +
          options
            .map((r) => {
              const output = r.item && D.equipment.find((e) => e.id === r.item);
              const input =
                r.source.kind === 'equipment'
                  ? D.equipment.find((e) => e.id === r.source.item.id)
                  : D.furnishings.find((d) => d.id === r.source.item.id);
              const name = r.reclaim ? 'Reclaim ' + r.inputName : r.name;
              return `<div class="room-recipe">${r.source.kind === 'equipment' ? equipmentIcon(input, esc) : furnitureIcon(input.id, esc)}<strong>${esc(name)}</strong><p class="stats">Uses ${esc(r.inputName)} · #${r.uid.split('-').at(-1)}<br>Result: ${
                output
                  ? esc(output.name) +
                    ' · ' +
                    Object.entries(output.stats)
                      .map(([stat, n]) => stat.toUpperCase() + ' +' + n)
                      .join(' · ')
                  : '+' + r.yield + ' scrap'
              }<br>${cost(r)} / ${r.work} work${r.days ? ' · ' + r.days + (r.days === 1 ? ' game day' : ' game days') : ''}</p>${btn((r.reclaim ? 'Start reclaim: ' : 'Start refit: ') + r.inputName + ' #' + r.uid.split('-').at(-1), 'workshopConversion:' + r.id + ':' + r.uid, !available || !!f.project || !canAfford(r))}</div>`;
            })
            .join('') +
          '</div></details>';
      }
      if (!g.blueprints.length)
        body +=
          '<p class="stats">Survey the mill road, lower drains and tower approaches to discover utility furniture blueprints.</p>';
    }
    body += '<h4>Furnishings</h4><div class="furniture-slots">';
    for (const [slot, uid, label] of [
      ['utility', f.utility, 'Utility'],
      ['decoration0', f.decorations[0], 'Decoration 1'],
      ['decoration1', f.decorations[1], 'Decoration 2'],
    ]) {
      const current = g.furniture.find((i) => i.uid === uid),
        placed = D.furnishings.find((d) => d.id === current?.id);
      const options = g.furniture.filter((i) => {
        const d = D.furnishings.find((d) => d.id === i.id);
        const used = Object.values(g.facilities).some(
          (f) => f.utility === i.uid || f.decorations.includes(i.uid),
        );
        return (
          (i.uid === uid || !used) && (slot === 'utility' ? d.facility === def.id : d.decoration)
        );
      });
      body += `<label class="furniture-slot">${label}${placed ? furnitureIcon(placed.id, esc) : '<span class="empty-furniture">◇</span>'}<select data-furniture-facility="${def.id}" data-furniture-slot="${slot}" aria-label="${def.name} ${label}" ${!available || (slot === 'utility' && f.project) ? 'disabled' : ''}><option value="">Empty · remove to storage</option>${options.map((i) => `<option value="${i.uid}" ${uid === i.uid ? 'selected' : ''}>${esc(D.furnishings.find((d) => d.id === i.id).name)} · #${i.uid.slice(10)}</option>`).join('')}</select><small>${placed ? esc(placed.effect) : 'Owned pieces can be placed and reused.'}</small></label>`;
    }
    body +=
      '</div>' +
      (f.project
        ? '<p class="stats">Finish or cancel this project before changing utility furniture.</p>'
        : '');
    if (f.tier === 1)
      body += btn(
        'Upgrade to tier 2 · 40g + 6 scrap · +1 work/day',
        'upgradeRoom:' + def.id,
        !available || s.gold < 40 || g.salvage < 6,
      );
    html += `<section class="facility" aria-label="${def.name}">${card(def.name, body)}</section>`;
  }
  if (['all', 'overview'].includes(section) && g.completions.length)
    html +=
      '<details><summary>Completed room projects · ' +
      g.completions.length +
      '</summary>' +
      g.completions
        .slice(-12)
        .reverse()
        .map((c) => `<p class="stats">Day ${c.day} · ${esc(c.text)}</p>`)
        .join('') +
      '</details>';
  return html;
}

function renderDecorating(s, { esc, card, btn }, furnitureUid, decorationRoom) {
  const furniture = s.guild.furniture;
  const name = (id) => D.furnishings.find((d) => d.id === id).name;
  const facilityName = (id) => D.furnitureTarget(s, id).name;
  const where = (i) => {
    const placed = D.furniturePlacement(s, i.uid);
    return placed
      ? facilityName(placed.facility) +
          ' · ' +
          (placed.slot === 'utility'
            ? 'Utility'
            : 'Decoration ' + (Number(placed.slot.slice(-1)) + 1))
      : 'In storage';
  };
  let html =
    '<h3>Decorate your rooms</h3><p>Choose an owned furnishing, then pick a room and slot. Placed pieces appear immediately in the room. Moving or removing a piece keeps it owned by the guild.</p>';
  if (!furniture.length) {
    html += '<p>No completed furnishings yet.</p>';
    const p = s.guild.facilities.workshop.project;
    const recipe = p && D.recipes.find((r) => r.id === p.recipe);
    if (recipe?.furniture)
      html += `<p class="stats">${esc(name(recipe.furniture))} is still being built · ${p.progress}/${p.work} work. Advance game days to finish it.</p>`;
    return html + btn('Open workshop', 'roomPage:workshop');
  }
  const selected =
    furniture.find((i) => i.uid === furnitureUid) ||
    furniture.find(
      (i) => D.furnishings.find((d) => d.id === i.id).decoration && !D.furniturePlacement(s, i.uid),
    ) ||
    furniture.find((i) => !D.furniturePlacement(s, i.uid)) ||
    furniture[0];
  const definition = D.furnishings.find((d) => d.id === selected.id);
  const current = D.furniturePlacement(s, selected.uid);
  const sourceBlocked =
    current &&
    (!D.furnitureTarget(s, current.facility).available ||
      (current.slot === 'utility' && D.furnitureTarget(s, current.facility).state.project));
  html += `<label class="furniture-picker">Choose furnishing<select id="decorate-furniture" aria-label="Choose furnishing">${furniture.map((i) => `<option value="${i.uid}" ${i.uid === selected.uid ? 'selected' : ''}>${esc(name(i.id))} · #${i.uid.slice(10)} · ${esc(where(i))}</option>`).join('')}</select></label>`;
  html += card(
    name(selected.id),
    `${furnitureIcon(selected.id, esc)}<p>${esc(definition.effect)}</p><p class="stats">${esc(where(selected))} · #${selected.uid.slice(10)}</p>${current ? btn('Remove to furniture storage', 'furnitureRemove:' + current.facility + ':' + current.slot, !!sourceBlocked) : ''}`,
  );
  const destinations = D.furnitureDestinations(s, selected.uid);
  const chosen =
    destinations.find((d) => d.facility === decorationRoom) ||
    destinations.find((d) => d.facility === current?.facility) ||
    destinations[0];
  if (chosen)
    html += `<label class="furniture-picker">Choose room<select id="decorate-room" aria-label="Choose room to decorate">${destinations.map((d) => `<option value="${d.facility}" ${d === chosen ? 'selected' : ''}>${esc(d.name)}${d.slots.every((slot) => slot.blocked) ? ' · ' + esc(d.slots[0].blocked) : ''}</option>`).join('')}</select></label>`;
  if (!destinations.length)
    html += `<p>${esc(D.facilities.find((f) => f.id === definition.facility)?.unlock || 'Restore a facility to place this furnishing.')}</p>`;
  for (const destination of chosen ? [chosen] : []) {
    const room =
      destination.site === 'service'
        ? 'Restored service room'
        : D.houseRooms.find((r) => r.id === destination.site)?.name ||
          D.rooms.find((r) => r.id === destination.site)?.name;
    let body = `<p class="stats">${esc(room)}${destination.site === 'garden' ? ' · ' + (destination.facility === 'infirmary' ? 'Hospice area' : 'Garden area') : ''}</p>`;
    for (const slot of destination.slots) {
      const occupied = furniture.find((i) => i.uid === slot.uid);
      body += `<div class="decoration-destination"><strong>${slot.label}</strong><p class="stats">${slot.uid === selected.uid ? esc(name(selected.id)) + ' is placed here.' : occupied ? esc(name(occupied.id)) + ' · replacing it returns it to storage.' : 'Empty slot'}</p>${slot.uid === selected.uid ? '' : btn((current ? 'Move' : 'Place') + ' in ' + slot.label, 'furnitureMove:' + destination.facility + ':' + slot.slot + ':' + selected.uid, !!slot.blocked)}${slot.blocked ? '<p class="stats">' + esc(slot.blocked) + '.</p>' : ''}</div>`;
    }
    html += `<section aria-label="Decorate ${destination.name}">${card(destination.name, body)}</section>`;
  }
  return html;
}
