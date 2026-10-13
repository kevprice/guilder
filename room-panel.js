import * as D from './domain.js';
import { furnitureIcon } from './guild-art.js';
import { equipmentIcon } from './equipment-rewards.js';

export function renderRooms(s, { esc, card, btn }, { section = 'all', orderQuantity = 1 } = {}) {
  const g = s.guild;
  const sections = [
    ['overview', 'Overview'],
    ['workshop', 'Workshop'],
    ['garden', 'Garden'],
    ['infirmary', 'Infirmary'],
    ['storage', 'Furniture storage'],
  ];
  const cost = (r) =>
    [
      r.gold ? r.gold + 'g' : '',
      r.salvage ? r.salvage + ' salvage' : '',
      r.supplies ? r.supplies + ' supply' : '',
    ]
      .filter(Boolean)
      .join(' + ') || 'No additional resources';
  const canAfford = (r) =>
    s.gold >= r.gold && g.salvage >= r.salvage && g.supplies >= (r.supplies || 0);
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
      worker = s.roster.find((c) => c.id === w.workerId),
      stat = D.facilities.find((f) => f.id === id).stat.toUpperCase();
    return [
      'Mara 1',
      w.upgrade ? 'tier bonus +' + w.upgrade : '',
      worker
        ? worker.name +
          (w.workerFit
            ? ' +' + (w.worker + w.stat) + ' · ' + stat + ' ' + w.workerStat + '/10'
            : ' · ' + worker.status + ' · bonus paused')
        : '',
      w.utility ? 'forge +1' : '',
    ]
      .filter(Boolean)
      .join(' · ');
  };
  const shortfallText = (missing) =>
    missing.map((r) => r.amount + ' ' + (r.resource === 'gold' ? 'gold' : r.resource)).join(' + ');
  let html = `<div class="room-tabs" role="group" aria-label="Room pages">${sections.map(([id, name]) => `<button data-action="roomPage:${id}" aria-pressed="${section === id}">${name}</button>`).join('')}</div><div class="resource-stock"><span>Gold <strong>${s.gold}</strong></span><span>Salvage <strong>${g.salvage}</strong></span><span>Supplies <strong>${g.supplies}</strong></span></div>`;
  html += `<div class="room-day-controls"><span class="stats">Day ${s.day} · rooms, recovery and expeditions</span>${btn('Advance guild day →', 'roomDay')}</div>`;
  if (['all', 'overview'].includes(section))
    html +=
      '<p class="stats">Mara keeps room work moving while adventurers travel. Workers gain 5 XP on a staffed completion; home work does not count as an expedition visit.</p>';
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
      `<div class="row">${btn('Buy 2 supplies · 15g', 'resource:supplies', s.gold < 15)}${btn('Buy 4 salvage · 60g', 'resource:salvage', s.gold < 60)}</div>`,
    );
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
      Object.values(g.facilities)
        .flatMap((f) => [f.utility, ...f.decorations])
        .filter(Boolean),
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
    html +=
      '<p class="stats">Spare stored pieces can be reclaimed for salvage in the workshop. Placed furnishings and earned trophies are kept intact.</p>';
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
      overview += btn('Manage ' + def.name, 'roomPage:' + def.id);
      html += card(def.name, overview);
      continue;
    }
    let body = `<span class="tag">${esc(name)} · Tier ${f.tier}</span><p class="stats">${work} work per day<br>${esc(breakdown(def.id, r))}</p>`;
    if (!available)
      body += `<p class="threat-badge">Room damaged · production paused</p>${btn('Repair room · 30g', 'repairDamage:' + site, s.gold < 30)}`;
    body += `<label class="room-worker">Assigned resident<select data-room-worker="${def.id}" aria-label="${def.name} worker" ${available ? '' : 'disabled'}><option value="">Mara only</option>${s.roster
      .filter((c) => !['dead', 'departed'].includes(c.status))
      .map((c) =>
        (() => {
          const candidate = D.projectForecast(s, def.id, c.id),
            other = D.facilities.find(
              (other) => other.id !== def.id && g.facilities[other.id].worker === c.id,
            );
          return `<option value="${c.id}" ${f.worker === c.id ? 'selected' : ''}>${esc(c.name)} · ${esc(c.status)} · ${def.stat.toUpperCase()} ${candidate.workerStat} · ${candidate.workerFit ? '+' + (candidate.worker + candidate.stat) + ' work' : 'bonus paused'}${candidate.days === null ? '' : ' · ' + candidate.scope + ' ' + candidate.days + (candidate.days === 1 ? ' day' : ' days')}${other ? ' · moves from ' + other.name : ''}</option>`;
        })(),
      )
      .join('')}</select></label>`;
    if (f.project) {
      const p = f.project,
        days = work ? Math.ceil((p.work - p.progress) / work) : null;
      body += `<div class="room-project"><strong>${esc(recipeName(r))}${p.patient ? ' · ' + esc(s.roster.find((c) => c.id === p.patient).name) : ''}</strong><label class="stats">${p.progress}/${p.work} work<progress value="${p.progress}" max="${p.work}"></progress></label><p class="stats">${days === null ? esc(paused || 'Work paused') : 'Estimated ' + days + ' more game ' + (days === 1 ? 'day' : 'days') + ' · day ' + (s.day + days)} · Reserved: ${cost(p.inputs)}</p>${btn(p.orderUid ? 'Cancel current item · refund inputs' : 'Cancel · refund inputs', 'cancelProject:' + def.id)}</div>`;
      if (p.source) {
        const input =
          p.source.kind === 'equipment'
            ? D.equipment.find((e) => e.id === p.source.item.id)
            : D.furnishings.find((d) => d.id === p.source.item.id);
        body += `<p class="conversion-held">Held: ${esc(input.name)} · #${p.source.item.uid.split('-').at(-1)}. ${r.reclaim ? 'Completion dismantles it for ' + p.yield + ' salvage.' : 'Completion replaces it with ' + esc(D.equipment.find((e) => e.id === r.item).name) + '.'} Cancel to return this piece and all paid inputs.</p>`;
      }
    } else if (def.id === 'garden') {
      const crop = D.projectRecipe(s, 'garden', 'crop');
      body += `<p>Automatic crop · ${crop.work} work → ${crop.yield} supplies. The next crop starts when you advance a day.</p>`;
    } else if (def.id === 'infirmary') {
      const treatment = D.projectRecipe(s, 'infirmary', 'treatment'),
        patients = D.eligiblePatients(s);
      body += `<p>Treatment · 1 supply / ${treatment.work} work · removes two recovery days. Natural recovery continues.</p>`;
      body += patients.length
        ? patients
            .map((c) =>
              btn(
                'Treat ' + c.name + ' · ' + c.recovery + ' recovery days left',
                'project:infirmary:treatment:' + c.id,
                !available || !canAfford(treatment),
              ),
            )
            .join('')
        : '<p class="stats">No eligible patients. Treatment is offered when it can finish before natural recovery.</p>';
      if (patients.length && !g.supplies)
        body +=
          '<p class="stats">Waiting for supplies · harvest crops or buy from the quartermaster.</p>';
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
      body +=
        '<details open><summary>Craft equipment</summary><div class="room-recipes">' +
        D.recipes
          .filter(
            (r) =>
              r.item && !r.sourceEquipment && (!r.blueprint || g.blueprints.includes(r.blueprint)),
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
          .filter((r) => r.furniture && (!r.blueprint || g.blueprints.includes(r.blueprint)))
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
        body += `<details class="workshop-conversions"><summary>${reclaim ? 'Reclaim spare equipment and furniture' : 'Refit stored equipment'}</summary><p class="stats">${reclaim ? 'Dismantle a stored piece for salvage. No gold cost. Rare equipment, equipped gear, placed furniture and trophies are kept intact.' : 'Reuse a stored short sword or padded coat to make sturdier equipment. Survey the mill road to discover these patterns.'} Each project reserves its exact item. Cancellation returns the piece and paid inputs. Started projects take priority over planned orders.</p>`;
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
                  : '+' + r.yield + ' salvage'
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
        'Upgrade to tier 2 · 40g + 6 salvage · +1 work/day',
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
