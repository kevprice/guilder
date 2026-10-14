const clamp = (n) => Math.max(-100, Math.min(100, n));
export const pairKey = (a, b) => [a, b].sort().join(':');
export function socialState() {
  return { version: 1, pairs: {}, applied: [] };
}
export function affinity(s, a, b) {
  return s.social?.pairs[pairKey(a, b)]?.affinity || 0;
}
export function recordRelationship(s, eventId, ids, delta, text) {
  s.social ||= socialState();
  if (s.social.applied.includes(eventId)) return;
  s.social.applied.push(eventId);
  const members = [...new Set(ids)];
  for (let i = 0; i < members.length; i++)
    for (const b of members.slice(i + 1)) {
      const a = members[i],
        key = pairKey(a, b);
      const pair = (s.social.pairs[key] ||= { members: [a, b].sort(), affinity: 0, memories: [] });
      pair.affinity = clamp(pair.affinity + delta);
      pair.memories.push({ event: eventId, day: s.day, delta, text });
    }
}
export function coworkerMemory(s, workers) {
  const living = workers.filter((c) => !c.undead && c.status === 'home' && !c.injury);
  for (let i = 0; i < living.length; i++)
    for (const b of living.slice(i + 1))
      recordRelationship(
        s,
        'work:' + s.day + ':' + pairKey(living[i].id, b.id),
        [living[i].id, b.id],
        1,
        'Finished useful work together.',
      );
}
export function reanimationMemories(s, caster, fallen) {
  for (const c of s.roster.filter(
    (c) =>
      c.id !== caster.id &&
      c.id !== fallen.id &&
      !c.undead &&
      !['dead', 'departed'].includes(c.status),
  )) {
    const stance =
      c.necromancyAttitude ||
      (c.type === 'warrior' ? 'wary' : c.type === 'mage' ? 'pragmatic' : 'conflicted');
    const friend = affinity(s, c.id, fallen.id) >= 25;
    const delta = stance === 'pragmatic' ? 4 : stance === 'wary' ? (friend ? -8 : -4) : 0;
    recordRelationship(
      s,
      'raise:' + fallen.id + ':' + c.id,
      [caster.id, c.id],
      delta,
      stance === 'pragmatic'
        ? 'Appreciated the echo of ' + fallen.name + ' returning.'
        : stance === 'wary'
          ? 'Resented ' + fallen.name + ' being raised as a labouring echo.'
          : 'Felt conflicted about the echo of ' + fallen.name + '.',
    );
  }
}
export function relationshipsFor(s, id) {
  return Object.values(s.social?.pairs || {})
    .filter((p) => p.members.includes(id))
    .map((p) => ({ ...p, other: p.members.find((x) => x !== id) }));
}
export function validateSocial(s) {
  const g = s.social;
  const ids = new Set(['rowan', 'mara', ...s.roster.map((c) => c.id)]);
  const bad = () => {
    throw Error('Invalid household relationships.');
  };
  if (
    !g ||
    g.version !== 1 ||
    !g.pairs ||
    Array.isArray(g.pairs) ||
    !Array.isArray(g.applied) ||
    new Set(g.applied).size !== g.applied.length ||
    g.applied.some((x) => typeof x !== 'string')
  )
    bad();
  for (const [key, p] of Object.entries(g.pairs)) {
    if (
      !p ||
      !Array.isArray(p.members) ||
      p.members.length !== 2 ||
      p.members[0] === p.members[1] ||
      p.members.some((id) => !ids.has(id)) ||
      pairKey(...p.members) !== key ||
      !Number.isInteger(p.affinity) ||
      Math.abs(p.affinity) > 100 ||
      !Array.isArray(p.memories) ||
      p.memories.some(
        (m) =>
          !g.applied.includes(m.event) ||
          !Number.isInteger(m.day) ||
          m.day < 1 ||
          m.day > s.day ||
          !Number.isInteger(m.delta) ||
          typeof m.text !== 'string',
      ) ||
      new Set(p.memories.map((m) => m.event)).size !== p.memories.length
    )
      bad();
    if (p.memories.reduce((v, m) => clamp(v + m.delta), 0) !== p.affinity) bad();
  }
}
