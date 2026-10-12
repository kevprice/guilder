export const questRewards = {
  bellWardDiagram: {
    name: 'Bell ward release diagram',
    source: 'Recovered from the suspended potion kitchen',
    description:
      'A separate sheet is pinned beneath the cooling tiles, labelled “Maelin — emergency bell ward”. It shows the repeating frost rune, the bell clapper, and the cancellation stroke that releases its caster safely. The shape matches the blue ice around the woman at the tower crown.',
    purpose:
      'Maelin is the woman frozen beside the bell at the tower crown. Her emergency ward stopped the false alarm, but its repeating rune also trapped her. This diagram supplies the missing release instructions.',
    next: 'Return through the study to the tower’s lower landing, climb to the crown, and investigate Maelin if you have not already. Control Ivo and press E beside her to apply the cancellation stroke using Magical literacy. Maelin joins with Echo sight.',
  },
};
export function renderQuestReward(id, { esc }) {
  const reward = Object.hasOwn(questRewards, id) ? questRewards[id] : null;
  if (!reward) return '';
  return `<article class="quest-reward" aria-label="Quest item recovered: ${esc(reward.name)}"><div class="quest-reward-heading"><svg viewBox="0 0 64 64" role="img" aria-label="Bell ward release diagram icon"><path d="M14 8h37v44H14Z" fill="#d9c79d" stroke="#eeddba" stroke-width="2"/><path d="M10 8h8v8h-8ZM10 48h45v8H10Z" fill="#bda678"/><path d="m25 27 7-10 7 10v7H25Zm7 7v5m-12 5h25" fill="none" stroke="#507b85" stroke-width="3"/><path d="M42 15v15m-4-7h8" stroke="#8c6a4c" stroke-width="2"/></svg><div><p class="equipment-reward-label">Quest item recovered</p><h3>${esc(reward.name)}</h3><p>${esc(reward.source)}</p></div></div><p>${esc(reward.description)}</p><p>${esc(reward.purpose)}</p><div class="quest-reward-next"><strong>Next: free Maelin at the tower crown</strong><p>${esc(reward.next)}</p></div></article>`;
}
