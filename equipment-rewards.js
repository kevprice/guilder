import { itemDefinition } from './equipment.js';
const shapes = {
  sword:
    '<path d="M42 9 50 6 48 14 27 39 22 34Z" fill="#dce5e9"/><path d="m16 30 16 13M22 39l-9 12" stroke="#dab875" stroke-width="5"/>',
  dagger:
    '<path d="m39 13 12-6-5 14-19 19-5-5Z" fill="#b8e5ec"/><path d="m18 33 14 14m-10-6-9 10" stroke="#b99568" stroke-width="5"/>',
  spear:
    '<path d="m15 54 29-37" stroke="#b18a55" stroke-width="5"/><path d="m39 23 5-17 13-2-4 13Z" fill="#d5e3de"/>',
  hammer:
    '<path d="m19 53 22-31" stroke="#ac8252" stroke-width="6"/><path d="m25 15 9-10 24 16-9 12Z" fill="#e6c478" stroke="#fff0b6" stroke-width="2"/>',
  bow: '<path d="M15 9Q62 32 15 55" fill="none" stroke="#bb9460" stroke-width="5"/><path d="M15 9v46M11 32h42m-7-5 7 5-7 5" fill="none" stroke="#d9e5e2" stroke-width="2"/>',
  staff:
    '<path d="m22 56 15-37" stroke="#a98560" stroke-width="5"/><circle cx="40" cy="14" r="9" fill="#83c8ce" stroke="#dce9d6" stroke-width="2"/>',
  shield:
    '<path d="M12 12h40v19Q48 49 32 56 16 49 12 31Z" fill="#866746" stroke="#d3b475" stroke-width="3"/><path d="M32 15v34M17 29h30" stroke="#d3b475" stroke-width="3"/>',
  head: '<path d="M14 43V29a18 18 0 0 1 36 0v14l-10 8V34H24v17Z" fill="#aebcbf" stroke="#e0cf9c" stroke-width="2"/>',
  crown:
    '<path d="m11 20 12 9 9-17 9 17 12-9-5 28H16Z" fill="#acb87b" stroke="#e4d495" stroke-width="2"/><circle cx="32" cy="38" r="4" fill="#82c7bf"/>',
  body: '<path d="m21 11-14 9 7 16 8-4v23h20V32l8 4 7-16-14-9-11 8Z" fill="#778e94" stroke="#d4bf91" stroke-width="2"/>',
  cloak:
    '<path d="M25 9h14l16 46H9Z" fill="#91bfc7" stroke="#d1e6e4" stroke-width="2"/><path d="m25 9 7 14 7-14M32 23v32" stroke="#d1e6e4" fill="none"/>',
  feet: '<path d="M10 12h17v27l9 7v9H9V41Zm29 0h15v28l6 7v8H38V39Z" fill="#98724f" stroke="#d6bd8f" stroke-width="2"/>',
  ring: '<circle cx="32" cy="37" r="15" fill="none" stroke="#d5b775" stroke-width="7"/><path d="m23 18 9-9 9 9-9 11Z" fill="#91c5cb" stroke="#e8d79f" stroke-width="2"/>',
  compass:
    '<circle cx="32" cy="33" r="21" fill="#435b63" stroke="#d8b878" stroke-width="4"/><path d="m40 18-4 19-12 11 4-19Z" fill="#c2e1da"/><path d="M28 7h8" stroke="#d8b878" stroke-width="4"/>',
  lens: '<circle cx="28" cy="27" r="17" fill="#85c9d366" stroke="#d4bf88" stroke-width="4"/><path d="m40 40 13 13" stroke="#ad8656" stroke-width="7"/>',
  pin: '<path d="m32 15-8 14L8 19l12 21 12 12 12-12 12-21-16 10Z" fill="#e1a16b" stroke="#efd29a" stroke-width="2"/>',
  charm:
    '<path d="M19 8q13 8 26 0L32 34Z" fill="none" stroke="#c6ac79" stroke-width="3"/><path d="M32 27q-19 17 0 28 19-11 0-28" fill="#82bcbc" stroke="#e0d3a7" stroke-width="2"/>',
};
export function equipmentIcon(item, esc) {
  const kind = item.id.includes('Spear')
    ? 'spear'
    : item.id.includes('Hammer')
      ? 'hammer'
      : /Bow$/.test(item.id)
        ? 'bow'
        : /Staff$|Rod$/.test(item.id)
          ? 'staff'
          : /Dagger$/.test(item.id)
            ? 'dagger'
            : /Crown$/.test(item.id)
              ? 'crown'
              : /Cloak$/.test(item.id)
                ? 'cloak'
                : item.id === 'echoLens'
                  ? 'lens'
                  : item.id === 'starCompass'
                    ? 'compass'
                    : item.id === 'threadRing'
                      ? 'ring'
                      : item.id === 'phoenixPin'
                        ? 'pin'
                        : item.slot === 'accessory'
                          ? 'charm'
                          : item.slot;
  return `<svg class="equipment-icon" viewBox="0 0 64 64" role="img" aria-label="${esc(item.name)} icon">${shapes[kind] || shapes.sword}${item.houseWork ? '<path d="M34 18l5 4-4 5-5-4z" fill="#8bd2dc" stroke="#d9efe6"/>' : ''}</svg>`;
}
export function renderEquipmentRewards(ids, { esc, storeAvailable = true } = {}) {
  return (ids || [])
    .map((id) => {
      const item = itemDefinition(id);
      if (!item) return '';
      const bonuses = Object.entries(item.stats)
        .map(([stat, value]) => `${stat.toUpperCase()} +${value}`)
        .join(' · ');
      return `<article class="equipment-reward equipment-reward-${item.rarity}" aria-label="Equipment recovered: ${esc(item.name)}"><div class="equipment-reward-art">${equipmentIcon(item, esc)}</div><div><p class="equipment-reward-label">Equipment recovered</p><h3>${esc(item.name)}</h3><p>${esc(item.slot)} slot · ${esc(item.rarity)} equipment</p><p class="equipment-reward-bonuses">${esc(bonuses)}${item.protection ? ' · Protection ' + item.protection : ''}</p><p>${esc(item.desc)}</p><p class="equipment-reward-location"><strong>Added to guild storage. You can now equip it in the store room.</strong>${item.minLevel > 1 ? `<br>Requires a level ${item.minLevel} character.` : ''}${!storeAvailable ? '<br>Restore the service room to open the store.' : ''}</p><button data-action="rewardStore" ${storeAvailable ? '' : 'disabled'}>Open store room →</button></div></article>`;
    })
    .join('');
}
