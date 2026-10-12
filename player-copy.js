import { revisedCopy } from './revised-copy.js';
import { maraCopy } from './mara.js';
// Compatibility for stored prose. Current authored content is checked separately.
const retiredSentences = [
  /Its previous story progress is preserved\.\s*/gi,
  /A contract is now in Contracts\. Its daily threat is high\. You can pull assigned residents back immediately; the dragon will remain wounded until you resume\. Nobody has reached the hoard, so the reward is unknown\./gi,
  /(?:["“]\s*)?there\s+is\s+no\s+recruitment\s+fee\s+or\s+service\s+obligation\s*[.!]?(?:\s*["”])?/gi,
  /nobody\s+is\s+hired\s*[.!]?/gi,
  /there\s+is\s+no\s+gold\s+reward\s*[.!]?/gi,
  /no\s+gold\s+reward\s*[;.!]?/gi,
  /home\s+defence\s+pays\s+no\s+gold\s*[.!]?/gi,
  /,?\s*but\s+there\s+is\s+no\s+pay\s+for\s+this\s+fight/gi,
  /\s+and\s+receives\s+no\s+reward/gi,
  /;\s*no\s+(?:skill|class)\s+(?:requirement|required)/gi,
  /no\s+gold\s+or\s+skill\s+is\s+required\s*[.!]?/gi,
  /a paid contract has become a first shared memory\.\s*speak with them at home\./gi,
];

export function playerCopy(value) {
  return retiredSentences
    .reduce(
      (text, pattern) => text.replace(pattern, ''),
      maraCopy(revisedCopy.get(String(value).trim()) || String(value)),
    )
    .replace(/[ \t]+\n/g, '\n')
    .replace(/ {2,}/g, ' ')
    .replace(/,\s*\./g, '.')
    .trim();
}

export function cleanStoredCopy(state) {
  const clean = (object, keys) => {
    if (!object || typeof object !== 'object') return;
    for (const key of keys)
      if (typeof object[key] === 'string') object[key] = playerCopy(object[key]);
  };
  for (const entry of state.scenes) clean(entry, ['title', 'body']);
  for (const entry of state.journal) clean(entry, ['kind', 'text']);
  for (const entry of state.reports) clean(entry, ['title', 'text']);
  for (const entry of state.transactions) clean(entry, ['text']);
  for (const resident of state.roster) {
    clean(resident, ['bio']);
    for (const memory of resident.memories) clean(memory, ['text']);
  }
  return state;
}

export function rewardSummary(gold, xp) {
  return [gold > 0 ? `+${gold} gold` : '', xp > 0 ? `+${xp} XP per surviving party member` : '']
    .filter(Boolean)
    .join(' · ');
}
