import * as D from './domain.js';
import { itemDefinition } from './equipment.js';
import { equipmentIcon } from './equipment-rewards.js';
import { portraits } from './portraits.js';
export const slotNames = {
  sword: 'Weapon',
  shield: 'Shield',
  head: 'Head',
  body: 'Body',
  feet: 'Feet',
  accessory: 'Accessory',
};
const stats = (d) =>
  [
    ...Object.entries(d.stats).map(([k, v]) => k.toUpperCase() + ' +' + v),
    ...(d.armour ? ['armour ' + d.armour] : []),
    ...(d.noise ? ['noise ' + d.noise] : []),
    ...(d.elements || []).map((e) => e + ' magic'),
  ].join(' · ');
export function renderPartyEquipment(s, ids, { esc, btn }) {
  const people = ids
    .map((id) => s.roster.find((c) => c.id === id))
    .filter((c) => c?.status === 'home' && !c.injury);
  const stock = (s.inventory || []).filter((i) => itemDefinition(i.id));
  if (!people.length) return '<p class="stats">Choose the residents you want to equip.</p>';
  let html = `<section class="party-loadouts" aria-label="Selected party equipment"><div class="section-heading"><h4>Equip your party</h4><span class="tag">${stock.length} owned pieces</span></div><p class="stats">Choose from equipment you own. Replacing a piece returns it to shared storage; gear on outside parties stays with them.</p>`;
  if (!stock.length)
    html +=
      '<p>No equipment in storage yet. This party can still depart. Craft gear in the workshop or buy it from the shop.</p>';
  for (const c of people) {
    const slots = D.equipmentSlots.filter(
      (slot) => stock.some((i) => itemDefinition(i.id).slot === slot) || c.equipmentSlots?.[slot],
    );
    html += `<article class="party-loadout" data-loadout-resident="${c.id}"><div class="loadout-resident"><img src="${portraits[c.id]}" alt=""/><div><strong>${esc(c.name)}</strong><small>${esc(D.classOf(c).name)} · STR ${c.str + D.equipmentBonus(c, 'str')} · AGI ${c.agi + D.equipmentBonus(c, 'agi')} · INT ${c.int + D.equipmentBonus(c, 'int')} · END ${c.end + D.equipmentBonus(c, 'end')}</small></div></div>${
      slots.length
        ? slots
            .map((slot) => {
              const current = c.equipmentSlots?.[slot];
              const options = stock
                .filter((i) => itemDefinition(i.id).slot === slot)
                .map((i) => {
                  const d = itemDefinition(i.id),
                    owner = s.roster.find((c) => c.id === i.owner),
                    away = owner && !['home', 'injured'].includes(owner.status);
                  return `<option value="${i.uid}" ${current?.uid === i.uid ? 'selected' : ''} ${away || c.level < d.minLevel ? 'disabled' : ''}>${esc(d.name)} · ${esc(stats(d))}${owner && owner.id !== c.id ? ' · ' + esc(owner.name) + (away ? ' (away)' : '') : ''}${c.level < d.minLevel ? ' · level ' + d.minLevel : ''}</option>`;
                })
                .join('');
              return `<label class="loadout-slot"><span>${slotNames[slot]}</span><select data-party-gear="${c.id}" data-gear-slot="${slot}" aria-label="${esc(c.name)} ${slotNames[slot]}"><option value="" ${!current ? 'selected' : ''}>Empty</option>${options}</select></label>`;
            })
            .join('')
        : '<p class="stats">Unequipped · ready to travel</p>'
    }</article>`;
  }
  return (
    html +
    `<div class="loadout-actions">${btn('Craft & upgrade', 'roomPage:recipes')}${btn('Equipment shop', 'partyShop')}</div></section>`
  );
}
export function renderEquipmentStore(
  s,
  ids,
  { esc, btn },
  { slot = 'sword', resident = null, shopOpen = false } = {},
) {
  const home = s.roster.filter((c) => c.status === 'home' && !c.injury);
  const selected = ids.filter((id) => home.some((c) => c.id === id));
  const current =
    home.find((c) => c.id === resident) || home.find((c) => c.id === s.selected) || home[0];
  let html = '<h3>Equipment you own</h3>';
  if (selected.length)
    html +=
      '<p class="stats">Preparing: ' +
      selected.map((id) => esc(home.find((c) => c.id === id).name)).join(', ') +
      '</p>' +
      btn('Back to mission', 'partyReturn');
  else
    html += `<label>Resident<select id="equipment-resident">${home.map((c) => `<option value="${c.id}" ${current?.id === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select></label>`;
  html += renderPartyEquipment(s, selected.length ? selected : current ? [current.id] : [], {
    esc,
    btn,
  });
  const source = s.guild.facilities.workshop.project?.source;
  if (source?.kind === 'equipment')
    html += `<p class="stats">${esc(itemDefinition(source.item.id).name)} is being upgraded at the workshop. It returns to storage when the work completes.</p>`;
  const level = Math.max(
    1,
    ...(selected.length
      ? selected.map((id) => home.find((c) => c.id === id).level)
      : [current?.level || 1]),
  );
  html += `<details class="equipment-shop" ${shopOpen ? 'open' : ''}><summary>Buy equipment</summary><p class="stats">Purchases add a physical piece to storage. Equip it above, or craft gear using house materials.</p><label>Category<select id="equipment-shop-slot">${D.equipmentSlots.map((k) => `<option value="${k}" ${slot === k ? 'selected' : ''}>${slotNames[k]}</option>`).join('')}</select></label><div class="equipment-shop-items">${
    D.equipment
      .filter(
        (d) =>
          d.slot === slot &&
          !d.craftOnly &&
          d.minLevel <= level &&
          (d.rarity !== 'rare' || s.flags.truth),
      )
      .map(
        (d) =>
          `<article class="equipment-shop-item">${equipmentIcon(d, esc)}<div><strong>${esc(d.name)}</strong><p class="stats">${esc(stats(d))}</p>${btn('Buy · ' + d.cost + 'g', 'buy:' + d.id, s.gold < d.cost)}</div></article>`,
      )
      .join('') || '<p>No equipment available for this category yet.</p>'
  }</div></details>`;
  return html;
}
