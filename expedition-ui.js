import { renderPartyEquipment } from './equipment-ui.js';
import { equippedItems } from './equipment.js';
import * as D from './domain.js';
import { resourceIcon } from './resource-icons.js';
import { recipeCosts } from './resource-ledger.js';
import { siteDefinitions, recommissions } from './expedition-content.js';
import { portraits } from './portraits.js';
export function creaturePortrait(p, esc) {
  const unknown = p === 'unknown';
  return `<svg class="creature-portrait" viewBox="0 0 160 130" role="img" aria-label="${esc(unknown ? 'Creature not identified' : 'Observed horned creature')}"><rect width="160" height="130" rx="15" fill="#142c32"/><circle cx="80" cy="64" r="48" fill="#284246"/>${unknown ? '<path d="M69 45q0-18 20-16 23 4 11 23L84 67v9m0 11v5" stroke="#729a9d" stroke-width="7" fill="none"/>' : '<path d="M65 49 47 27 48 7m0 20L27 15m29 22 10-19m29 31 18-22-1-20m0 20 21-12m-29 22-10-19" stroke="#d6bf90" stroke-width="5" fill="none" stroke-linecap="round"/><path d="m49 46 21 9 10-6 10 6 21-9-13 22-2 28-16 20-16-20-2-28z" fill="#779787" stroke="#acb59b" stroke-width="2"/><path d="m68 60 12 15 12-15m-22 26 10 12 10-12" stroke="#344c40" stroke-width="3" fill="none"/><path d="m57 58 16 4m14 0 16-4" stroke="#dfd3ab" stroke-width="3"/><circle cx="69" cy="62" r="3" fill="#152b29"/><circle cx="91" cy="62" r="3" fill="#152b29"/><path d="m73 98 7 5 7-5" fill="#233b35"/>'}</svg>`;
}
const costIcons = (cost, esc) =>
  Object.entries(recipeCosts(cost))
    .map(
      ([id, n]) =>
        `<span class="field-cost">${resourceIcon(id, esc(D.resources.find((r) => r.id === id).name))}<strong>${n}</strong></span>`,
    )
    .join('');
function partyPicker(s, esc, id, selected = []) {
  return `<fieldset class="outside-party" id="${id}"><legend>Choose residents at home</legend>${
    s.roster
      .filter((c) => c.status === 'home' && !c.injury)
      .map(
        (c) =>
          `<label><input type="checkbox" value="${c.id}" ${selected.includes(c.id) ? 'checked' : ''}/><img src="${portraits[c.id]}" alt=""/><span><strong>${esc(c.name)}</strong><small>${esc(c.specialisation || c.type)}${c.skills.includes('sneaking') ? ' · sneaking' : ''}${equippedItems(c).some((e) => e.elements?.includes('fire')) ? ' · fire channel' : ''} · AGI ${c.agi + D.equipmentBonus(c, 'agi')} · noise ${D.expeditionPreview(s, 'briarHollow', 'scout', [c.id]).noise} · armour ${equippedItems(c).reduce((n, e) => n + (e.armour || 0), 0)}</small></span></label>`,
      )
      .join('') || '<p>No fit residents are at home. Return a party or finish their recovery.</p>'
  }</fieldset>`;
}
export function renderExpeditions(
  s,
  { esc, btn },
  { site = 'briarHollow', page = 'sites', party = [], loadout = false } = {},
) {
  let html = `<div class="field-heading"><h3>Beyond the house</h3><div class="craft-filters">${[
    ['sites', 'Reports & expeditions'],
    ['bestiary', 'Creature research'],
    ['work', 'Paid work'],
    ['guild', 'Guild discovery'],
  ]
    .map(([id, label]) => btn(label, 'fieldPage:' + id))
    .join('')}</div></div>`;
  html += renderHomeDefence(s, { esc, btn });
  const pending = D.pendingOrders(s);
  if (pending.length)
    html += `<div class="field-alert">${resourceIcon('guard', 'Decision required')}<strong>A spotted party needs orders before another day can advance.</strong></div>`;
  html += renderOutsideOperations(s, { esc, btn });
  if (page === 'work')
    html += `<section class="field-card"><h4>Neighbourhood commissions</h4><p>Spend a game day repairing local tools for 12 gold. House crews keep working. This is separate from repairing damage to your own rooms.</p>${btn('Complete a commission · +12g', 'emergency', !!pending.length || !!D.activeMissions(s).length)}</section>`;
  else if (page === 'guild')
    html += `<section class="field-card"><h4>Discover the old guild</h4><p>Explore secured passages, investigate rooms, clear guardians and find residents. New workplaces become available after their rooms are safe.</p>${btn('Passages & expansion', 'openExploration')}</section>`;
  else if (page === 'bestiary') html += renderBestiary(s, { esc, btn });
  else {
    html += `<p class="stats">Reports reveal what witnesses observed. Threat numbers and weaknesses remain unknown until someone investigates. Supplies and finished rewards use shared stores.</p><div class="site-picker">${siteDefinitions.map((d) => btn(d.name, 'fieldSite:' + d.id)).join('')}</div>`;
    const mission = D.partyLaunchPreview(s, site, party, 'assault'),
      scout = D.partyLaunchPreview(s, site, party, 'scout'),
      p = mission;
    const absent = D.roomWorkAbsence(s, party);
    const known = p.intel?.species ? D.dossier(s, p.intel.species) : null;
    const packed = p.preparation.fire
      ? 'Includes an owned ember flask for the researched weakness.'
      : '';
    html += `<section class="field-card mission-planner"><span class="eyebrow">${p.cleared ? 'SITE CLEARED' : 'MISSION'}</span><h4>${esc(p.name)}</h4><p>${esc(p.report)}</p><p class="field-warning">${esc(p.warning)}</p><div class="mission-knowledge">${p.intel ? `${resourceIcon('research', 'Intelligence')}<span>${p.intel.complete ? 'Observed' : 'Partial sighting'}: ${p.intel.count}${known?.known ? ' · ' + esc(known.name) : ''} · day ${p.intel.day}${p.intel.stale ? ' · may have changed' : ''}</span>` : `${resourceIcon('lock', 'Unknown threat')}<span>Threat: unknown. You can send a party now, or scout for information first.</span>`}</div>${p.cleared ? `<p>A fresh report can appear from day ${p.nextReport}.</p>` : partyPicker(s, esc, 'field-party', party) + `<div class="party-toolbar"><strong>${party.length} selected</strong>${btn(loadout ? 'Hide equipment' : 'Equip party', 'fieldLoadout', !party.length)}${btn('Craft & upgrade', 'roomPage:recipes')}</div>${loadout ? renderPartyEquipment(s, party, { esc, btn }) : ''}<div id="field-party-preview" class="party-readiness" aria-live="polite"><div class="field-costs">${costIcons(p.cost, esc)}<span>1 day out · 1 day home · ${p.reward}g objective reward</span></div><p>${p.medicine ? 'Journey food and one treatment packed automatically.' : 'Journey food included; medicine is added when supplies allow.'} ${packed}</p>${mission.blocked ? `<p class="field-warning">${esc(mission.blocked)}</p>` : ''}<details><summary>Scouting & household impact</summary><p>Weakest infiltration ${scout.capability} · group exposure +${scout.group} · gear noise +${scout.noise}. Scouts can contain up to three residents.</p><p>${absent.length ? 'Home work: ' + absent.map((a) => esc(a.name) + ' ' + a.before + ' → ' + a.after).join('; ') : 'No assigned home crew affected.'}</p></details>${p.missing.some(([id]) => id === 'supplies') ? `<p>Supplies feed travelling parties and treat injuries. Grow them in the greenhouse or buy a pack.</p>${btn('Buy 2 supplies · 15g', 'resource:supplies', s.gold < 15)}${btn('Greenhouse crew', 'workplace:garden')}` : ''}</div><div class="mission-launch"><button class="primary-launch" data-action="fieldDispatch:${site}:assault" ${mission.blocked ? 'disabled' : ''}>${resourceIcon('contracts', 'Mission')}Send party</button><button data-action="fieldDispatch:${site}:scout" ${scout.blocked ? 'disabled' : ''}>${resourceIcon('research', 'Scout')}Scout first</button></div><p class="stats">Send party attempts the objective. Scout first gathers information for a later expedition.</p>`}${p.intel ? `<details class="field-intel"><summary>Reconnaissance & research · day ${p.intel.day}</summary><p>${p.intel.complete ? 'Observed force: ' : 'Partial sighting: at least '}${p.intel.count} · ${p.intel.stale ? 'the local situation may have changed' : 'recent observations'}</p>${p.intel.picture ? creaturePortrait('stag', esc) : ''}${known?.tier ? '<p>' + known.traits.map(esc).join(' · ') + '</p>' : ''}${p.intel.picture ? btn('Creature research', 'fieldPage:bestiary') : ''}</details>` : ''}</section>`;
  }
  return html;
}

function renderOutsideOperations(s, { esc, btn }) {
  let html = '';
  const operations = (s.outside?.operations || []).filter(
    (o) =>
      !['resolved', 'joined'].includes(o.phase) &&
      (o.phase !== 'failed' ||
        o.party.some((id) => !s.roster.find((c) => c.id === id).bodyRecovered)),
  );
  if (operations.length) html += '<h3>Parties outside</h3>';
  for (const o of operations) {
    const view = D.operationView(s, o.uid);
    html += `<section class="field-card ${o.pending ? 'needs-orders' : ''}"><div class="section-heading"><h4>${esc(view.name)}</h4><span class="tag">${esc(view.phase)}</span></div><div class="field-people">${view.party.map((c) => `<span><img src="${portraits[c.id]}" alt=""/>${esc(c.name)} · ${esc(c.condition)}</span>`).join('')}</div><p>${esc(view.message)}</p>${view.picture ? creaturePortrait('stag', esc) : ''}${view.progress !== null ? `<progress value="${view.progress}" max="100" aria-label="Encounter progress"></progress>` : ''}<div class="field-orders">${view.canOrder ? btn('Retreat', 'fieldOrder:' + o.uid + ':retreat', !view.canRetreat) + btn('Hide', 'fieldOrder:' + o.uid + ':hide') + btn('Engage', 'fieldOrder:' + o.uid + ':engage') + btn('Hold defensively', 'fieldOrder:' + o.uid + ':guard') + (view.canBait ? btn('Bait the charge', 'fieldOrder:' + o.uid + ':bait') : '') : ''}</div>${view.party.flatMap((c) => ['heal', 'mend'].flatMap((key) => D.spellTargets(s, c.id, key).map((target) => btn((key === 'heal' ? 'Heal ' : 'Mend ') + target.name + ' · ' + c.name, key + ':' + c.id + ':' + target.id, s.roster.find((p) => p.id === c.id).lastCastDay === s.day)))).join('')}${view.canReinforce ? `<details class="field-rescue"><summary>Send help · arrives after the party faces one more day</summary>${partyPicker(s, esc, 'rescue-' + o.uid)}<p class="stats">Help costs 5g and two supplies. Field medicine is packed automatically when another supply is available.</p>${btn('Rescue & extract', 'fieldRescue:' + o.uid + ':extract')}${btn('Reinforce & complete', 'fieldRescue:' + o.uid + ':assault')}</details>` : ''}</section>`;
  }
  return html;
}
export function renderBestiary(s, { esc, btn }) {
  const d = D.dossier(s, 'briarStag'),
    p = s.outside.research,
    f = D.researchForecast(s);
  return `<section class="field-card"><span class="eyebrow">PERMANENT CREATURE KNOWLEDGE</span><h4>${esc(d.name)}</h4>${creaturePortrait(d.portrait, esc)}${d.known ? `<p>${esc(d.description)}</p><p>${d.tier ? d.traits.map(esc).join(' · ') : 'Its behaviour and weaknesses are not researched.'}</p>${d.advanced ? '<p>' + esc(d.advanced) + '</p>' : ''}<p class="stats">${d.sketch ? 'A clear sketch supports research.' : 'Bring back a complete scouting sketch.'} Specimens available: ${D.resourceStock(s, 'briarSample')}.</p>` : '<p>Send a scout and bring back observations before studying the creature.</p>'}${p ? `<h5>Research in progress · stage ${p.tier}</h5><progress value="${p.progress}" max="${p.work}" aria-label="Creature research progress"></progress><p>${p.progress}/${p.work} work · ${esc(f.paused || f.days + ' days with current crew')}</p>${btn('Cancel & return specimen', 'fieldResearchCancel')}` : btn(d.tier === 1 ? 'Study a specimen · 12 work' : d.tier === 2 ? 'Research complete' : 'Study the sketch · 6 work', 'fieldResearch:briarStag', !d.sketch || d.tier === 2 || (d.tier === 1 && !D.resourceStock(s, 'briarSample')))}${btn('Assign research / alchemy crew', 'workplace:tower')}<p class="stats">Research uses the alchemy room’s fit living crew and pauses aether production there. Existing aether progress is retained.</p></section>`;
}
export function renderHouseholdMilestones(s, { esc, btn }) {
  if (s.household?.opening !== 'ready') return '';
  return `<section class="house-milestones"><h4>Prebuilt rooms to recommission</h4><p class="stats">The rooms already exist. Grow workshop expertise and pay to put their workplaces into service.</p>${recommissions.map((d) => `<div class="queue-line"><span><strong>${esc(d.name)}</strong><small>${d.designs} designs · ${d.gold}g + ${d.salvage} scrap${D.recommissionError(s, d.room) ? ' · ' + esc(D.recommissionError(s, d.room)) : ''}</small></span>${btn(s.household.rooms.includes(d.room) ? 'Ready' : 'Recommission', 'recommission:' + d.room, s.household.rooms.includes(d.room) || D.craftingProgress(s).count < d.designs || s.gold < d.gold || s.guild.salvage < d.salvage || !!D.recommissionError(s, d.room))}</div>`).join('')}</section>`;
}
export function renderRelationships(s, id, { esc }) {
  const relationships = D.relationshipsFor(s, id);
  return relationships.length
    ? relationships
        .map((p) => {
          const other =
            p.other === 'rowan'
              ? 'Rowan'
              : p.other === 'mara'
                ? 'Mara'
                : s.roster.find((c) => c.id === p.other).name;
          return `<div class="relationship-memory"><strong>${esc(other)} · ${p.affinity >= 25 ? 'Trusted' : p.affinity <= -25 ? 'Strained' : 'Developing'} (${p.affinity})</strong>${p.memories
            .slice(-3)
            .map(
              (m) =>
                `<p class="stats">Day ${m.day} · ${esc(m.text)} ${m.delta > 0 ? '+' : ''}${m.delta}</p>`,
            )
            .join('')}</div>`;
        })
        .join('')
    : '<p>No shared memories yet. Expeditions and completed work develop relationships.</p>';
}

export function renderHomeDefence(s, { esc, btn }) {
  let html = '';
  const danger = D.homeDanger(s);
  const defending = D.activeMissions(s).filter(
    (m) => D.contracts.find((d) => d.id === m.id)?.homeEvent,
  );
  if (danger) {
    const active = defending.find((m) => m.id === danger.id);
    html += `<section class="field-card needs-orders"><span class="eyebrow">HOME DEFENCE</span><h4>${esc(danger.name)}</h4><p class="stats">${esc(D.homeThreatLocation(s, danger.id).name)} · connected ground floor</p><p>${esc(danger.desc)}</p><p class="stats">Mara and the home watch: ${D.maraPower(s)} defence work per day. Outside parties cannot defend the house.</p>${active ? `<p>${active.party.map((id) => esc(s.roster.find((c) => c.id === id).name)).join(', ')} are defending · ${active.remaining} days estimated.</p>${btn('Release defenders', 'withdraw:' + active.uid)}` : partyPicker(s, esc, 'home-party') + btn('Assign home defenders', 'homeDefend:' + danger.id)}${btn('Manage home watch', 'workplace:entrance')}</section>`;
  }
  const damaged = Object.keys(s.damagedRooms || {});
  if (damaged.length)
    html += `<section class="field-card"><h4>Damaged workplaces</h4><p>Production waits until these rooms are repaired.</p>${damaged.map((id) => btn('Repair ' + (D.houseRooms.find((r) => r.id === id)?.name || id) + ' · 30g', 'repairDamage:' + id, s.gold < 30)).join('')}</section>`;
  const patients = s.roster.filter((c) => c.status === 'injured');
  if (patients.length)
    html += `<section class="field-card"><h4>Resident care</h4>${patients.map((c) => `<p>${esc(c.name)} · ${esc(D.injuryNames[c.injury])}${c.undead ? ' · requires necromantic repairs' : ' · ' + c.recovery + ' recovery days'}</p>${c.undead ? btn('Necromancer training & repairs', 'trainingOpen:' + (s.roster.find((p) => p.specialisation === 'necromancer')?.id || c.id)) : btn('Treat ' + c.name + ' · 15g', 'treat:' + c.id, s.gold < 15)}`).join('')}${btn('Manage infirmary', 'workplace:' + D.facilityRoom(s, 'infirmary'))}</section>`;
  return html;
}
