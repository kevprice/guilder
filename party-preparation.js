import { equippedItems } from './equipment.js';
import { expeditionPreview, activeExpeditions } from './expeditions.js';
import { resources } from './resource-catalogue.js';
import { recipeCosts } from './resource-ledger.js';
// This policy packs available care and known counters; optional items never block departure.
export function automaticPreparation(s, site, ids, intent = 'assault') {
  const p = expeditionPreview(s, site, intent, ids);
  const elements = ids.flatMap((id) => [
    ...equippedItems(s.roster.find((c) => c.id === id) || {}).flatMap((e) => e.elements || []),
    ...(s.roster.find((c) => c.id === id)?.skills.includes('quietFlame') ? ['fire'] : []),
  ]);
  const researched =
    s.outside?.intel[site]?.picture &&
    s.outside?.bestiary[s.outside.intel[site].species]?.tier >= 1;
  const counter =
    researched &&
    p.counterElements.includes('fire') &&
    !elements.includes('fire') &&
    (s.guild.house.materials.flameKit || 0) > 0;
  return {
    fire: !!counter,
    medical: intent !== 'scout' && s.guild.supplies >= p.cost.supplies + 1,
  };
}
export function partyLaunchPreview(s, site, ids, intent = 'assault') {
  const preparation = automaticPreparation(s, site, ids, intent),
    p = expeditionPreview(s, site, intent, ids, preparation);
  const cost = recipeCosts(p.cost);
  const missing = Object.entries(cost).filter(
    ([id, n]) =>
      (id === 'gold'
        ? s.gold
        : id === 'salvage'
          ? s.guild.salvage
          : id === 'supplies'
            ? s.guild.supplies
            : s.guild.house.materials[id]) < n,
  );
  let blocked = !ids.length
    ? 'Choose residents for this party.'
    : new Set(ids).size !== ids.length
      ? 'Choose each resident once.'
      : ids.length > p.capacity
        ? 'This party can contain up to ' + p.capacity + ' residents.'
        : ids.some((id) => !s.roster.some((c) => c.id === id && c.status === 'home' && !c.injury))
          ? 'Every selected resident must be fit and at home.'
          : p.cleared
            ? 'This site is cleared. Wait for its next report.'
            : activeExpeditions(s).some((o) => o.site === site)
              ? 'A party is already travelling to this site. Send help from its operation.'
              : missing.length
                ? 'Need ' +
                  missing
                    .map(
                      ([id, n]) => n + ' ' + resources.find((r) => r.id === id).name.toLowerCase(),
                    )
                    .join(' and ') +
                  '.'
                : null;
  return { ...p, preparation, blocked, missing, selected: [...ids], medicine: preparation.medical };
}
