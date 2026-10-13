import * as D from './domain.js';
import { equipmentIcon } from './equipment-rewards.js';
import { furnitureIcon } from './guild-art.js';
export function materialCost(r) {
  return (
    [
      r.gold ? r.gold + 'g' : '',
      r.salvage ? r.salvage + ' scrap' : '',
      r.supplies ? r.supplies + ' supplies' : '',
      ...Object.entries(r.materials || {}).map(
        ([id, n]) => n + ' ' + (D.materials.find((m) => m.id === id)?.name.toLowerCase() || id),
      ),
    ]
      .filter(Boolean)
      .join(' + ') || 'No inputs'
  );
}
export function renderCrew(s, id, { esc }, leadOnly = false) {
  const r = D.houseRooms.find((r) => r.id === id),
    room = s.guild.house.rooms[id];
  const core = D.coreFacility(s, id),
    role = D.activities[core || r.activity];
  return `<div class="room-crew"><p class="stats">${room.workers.filter(Boolean).length}/${r.capacity} worker slots filled · ${role.stat.toUpperCase()} improves production at 10, 20, 30 and 40.</p>${room.workers
    .map((uid, index) => {
      if (leadOnly && index === 0) return '';
      return `<label>Worker ${index + 1}<select data-house-room="${r.id}" data-house-slot="${index}" aria-label="${esc(r.name)} worker ${index + 1}" ${D.roomPause(s, r) ? 'disabled' : ''}><option value="">Empty slot</option>${D.guildWorkers(
        s,
      )
        .filter((c) => !['dead', 'departed'].includes(c.status))
        .map((c) => {
          const other = D.assignedRoom(s, c.id),
            v = D.workerContribution(c, role.stat),
            restriction = D.workerAssignmentError(s, c.id, r);
          return `<option value="${c.id}" ${uid === c.id ? 'selected' : ''} ${restriction ? 'disabled' : ''}>${esc(c.name)} · ${restriction ? esc(restriction) : esc(c.status) + ' · ' + v.work + ' work/day'}${other && other.id !== id ? ' · moves from ' + esc(other.name) : ''}</option>`;
        })
        .join('')}</select></label>`;
    })
    .join('')}</div>`;
}
export function renderHouse(s, helpers, selectedRoom = null) {
  const { esc, card, btn } = helpers;
  const known = D.houseRooms.filter((r) => D.roomUnlocked(s, r));
  const r = known.find((r) => r.id === selectedRoom) || known[0];
  let html =
    '<h3>House workplaces</h3><p>Leave a companion in a room and switch characters to put them to work, or assign them here. Each companion holds one slot. Missions, defence duties and injuries pause their contribution; they resume when fit at home. Restore rooms and clear, disarm and search dungeon rooms before setting up work or decorations.</p>';
  html += `<label class="furniture-picker">Choose workplace<select id="house-room" aria-label="Choose workplace">${known.map((r) => `<option value="${r.id}" ${r.id === selectedRoom ? 'selected' : ''}>${esc(r.name)} · ${s.guild.house.rooms[r.id].workers.filter(Boolean).length}/${r.capacity} workers${D.roomPause(s, r) ? ' · ' + esc(D.roomPause(s, r)) : ''}</option>`).join('')}</select></label>`;
  const f = D.roomForecast(s, r.id),
    state = s.guild.house.rooms[r.id];
  let body = `<p>${esc(f.role.name)} · ${f.role.stat.toUpperCase()}</p>${renderCrew(s, r.id, helpers)}<div class="worker-contributions">${f.workers.map((w) => `<p>${esc(w.name)} · ${f.role.stat.toUpperCase()} ${w.stat} · ${w.fit ? w.work + ' work/day' : esc(w.status) + ' · work paused'}</p>`).join('') || '<p>No workers assigned.</p>'}</div>`;
  if (f.core)
    body += `<p>Mara contributes 1 baseline work unit. This crew works on the facility’s current project.</p>${btn('Manage ' + f.core, 'roomPage:' + f.core)}`;
  else if (f.role.animation === 'watch')
    body += `<p>Fit workers add ${f.work * 2} defence strength to Mara’s home watch.</p>${btn('Manage Mara and defence', 'roomPage:mara')}`;
  else
    body += `<p>Each batch: ${Object.entries(f.role.output)
      .map(([id, n]) => n + ' ' + (id === 'salvage' ? 'scrap' : id))
      .join(' + ')} / ${f.role.work} work${
      f.role.inputs
        ? ' · uses ' +
          Object.entries(f.role.inputs)
            .map(([id, n]) => n + ' ' + id)
            .join(' + ')
        : ''
    }.</p><progress value="${state.progress}" max="${f.role.work}"></progress><p class="stats">${state.progress}/${f.role.work} work · ${f.paused ? esc(f.paused) : f.work + ' work/day · next batch in ' + f.days + (f.days === 1 ? ' day' : ' days')}. At most one batch completes each game day.</p>${btn(state.enabled ? 'Pause room production' : 'Resume room production', 'housePause:' + r.id + ':' + (state.enabled ? 'pause' : 'resume'))}`;
  html +=
    card(r.name, body) + btn('Decorate this room', 'decorateRoom:' + (f.core || 'room_' + r.id));
  html += '<details><summary>All discovered workplaces · ' + known.length + '</summary>';
  for (const room of known) {
    const role = D.activities[D.coreFacility(s, room.id) || room.activity];
    html += `<p class="stats"><strong>${esc(room.name)}</strong> · ${esc(role.name)} · ${room.capacity} worker slots</p>`;
  }
  return html + '</details>';
}
export function renderMaterials(s, helpers) {
  const { esc, card, btn } = helpers;
  let html =
    '<h3>Room materials</h3><div class="material-stocks">' +
    D.materials
      .map(
        (m) =>
          `<span>${m.symbol} ${m.name} <strong>${s.guild.house.materials[m.id]}</strong></span>`,
      )
      .join('') +
    '</div><p>Staff rooms to gather materials. The workshop turns them into equipment, furnishings, supply packs and brass components for Mara.</p>';
  html += '<details><summary>Where to gather materials</summary>';
  for (const m of D.materials.filter((m) => m.id !== 'components')) {
    const sources = D.houseRooms.filter(
      (r) => D.roomUnlocked(s, r) && D.activities[r.activity].output[m.id],
    );
    html += `<p><strong>${m.name}</strong> · ${sources.length ? sources.map((r) => esc(r.name)).join(', ') : 'Explore and restore more rooms to find a workplace.'}</p>${sources[0] ? btn('Staff ' + sources[0].name, 'workplace:' + sources[0].id) : ''}`;
  }
  html += '</details>';
  if (!D.facilitySite(s, 'workshop'))
    return html + '<p>Restore the service room to begin crafting.</p>';
  const active = s.guild.facilities.workshop.project;
  if (active)
    html += `<p class="stats">Workshop occupied · ${active.progress}/${active.work} work.</p>${btn('Manage current project', 'roomPage:workshop')}`;
  for (const base of D.recipes.filter((r) => r.materials && !r.maraTier && D.recipeKnown(s, r))) {
    const r = D.projectRecipe(s, 'workshop', base.id),
      equipment = r.item && D.equipment.find((e) => e.id === r.item),
      furniture = r.furniture && D.furnishings.find((d) => d.id === r.furniture);
    const name = equipment?.name || furniture?.name || r.name;
    html += card(
      name,
      `${equipment ? equipmentIcon(equipment, esc) : furniture ? furnitureIcon(furniture.id, esc) : ''}<p class="stats">${materialCost(r)} / ${r.work} work${
        equipment
          ? '<br>' +
            Object.entries(equipment.stats)
              .map(([id, n]) => id.toUpperCase() + ' +' + n)
              .join(' · ')
          : ''
      }${
        r.materialOutput || r.resourceOutput
          ? '<br>Produces ' +
            Object.entries({ ...r.materialOutput, ...r.resourceOutput })
              .map(([id, n]) => n + ' ' + (id === 'salvage' ? 'scrap' : id))
              .join(' + ')
          : ''
      }</p>${!active ? btn('Craft ' + name, 'project:workshop:' + r.id, !D.facilityAvailable(s, 'workshop') || !!D.resourceShortfall(s, r).length) : ''}${btn('Plan ' + name, 'queueOrder:' + r.id)}`,
    );
  }
  return html;
}
export function renderMara(s, helpers) {
  const { esc, card, btn } = helpers,
    mara = s.guild.house.mara,
    power = D.maraPower(s),
    next = D.recipes.find((r) => r.maraTier === mara.tier + 1);
  let html = card(
    'Mara · brass caretaker',
    `<p>Tier ${mara.tier} · ${['', 'Caretaker', 'Reinforced frame', 'Sentry frame', 'Runic guard'][mara.tier]}</p><p>${(mara.tier - 1) * 4} personal defence strength · ${power} total home-watch strength.</p><p class="stats">The home watch makes daily progress against attacks and supports assigned defence parties. A weak watch can reduce damage; a strong watch holds attackers off while clearing them. Mara stays home when companions leave.</p>${btn(mara.defend ? 'Stand down home watch' : 'Enable home watch', 'maraGuard:' + (mara.defend ? 'off' : 'on'))}`,
  );
  const station = D.assignedRoom(s, 'mara'),
    worker = D.guildWorker(s, 'mara');
  html += card(
    'Workstation',
    `<p>${station ? 'Assigned to ' + esc(station.name) : 'Unassigned · provides 1 caretaker work per day to each restored facility'}.</p><p class="stats">STR ${worker.str} · AGI ${worker.agi} · INT ${worker.int} · END ${worker.end}. Frame upgrades improve her work stats. Assigning a slot directs all her work there; other facilities need workers. Home defence takes priority during an attack.</p>${btn('Choose a workstation', 'roomPage:dashboard')}`,
  );
  if (next) {
    const r = D.projectRecipe(s, 'workshop', next.id),
      active = s.guild.facilities.workshop.project;
    html += card(
      next.name,
      `<p>${materialCost(r)} / ${r.work} work.</p><p>Upgrade to tier ${next.maraTier} · ${(next.maraTier - 1) * 4} personal defence strength.</p>${active ? '<p class="stats">Finish or cancel the current workshop project first.</p>' : btn('Build ' + next.name, 'project:workshop:' + next.id, !D.facilityAvailable(s, 'workshop') || !!D.resourceShortfall(s, r).length)}${btn('Gather and craft materials', 'roomPage:materials')}`,
    );
  }
  const threat = D.homeDanger(s);
  if (threat) {
    const total = threat.days * D.profiles[threat.id].amount,
      progress = s.threats[threat.id].progress || 0;
    const party = D.activeMissions(s).find((m) => m.id === threat.id),
      days = party ? party.remaining : power ? Math.ceil((total - progress) / power) : null;
    html += card(
      'Home under attack',
      `<p>${esc(threat.name)} · ${progress}/${total} defence work.</p><progress value="${progress}" max="${total}"></progress><p class="stats">The watch contributes ${power} work per day. ${days === null ? 'Assign guards or a defence party to make progress.' : 'Estimated ' + days + ' more game ' + (days === 1 ? 'day' : 'days') + (party ? ' with the defence party.' : ' with the watch alone.')}<br>${Math.ceil(D.profiles[threat.id].amount / 2)} watch strength holds off attacks while clearing this threat.</p>${btn('Assign a defence party', 'homeContracts')}`,
    );
  }
  return html;
}
