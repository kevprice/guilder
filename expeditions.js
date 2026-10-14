import { siteDefinitions, species } from './expedition-content.js';
import { equippedItems, equipmentBonus, conscious } from './equipment.js';
import { effectiveWorkStat, crewContribution } from './workforce.js';
import { hasTalent, personalProtection, talentValue, talents } from './classes.js';
import { guildWorker } from './guild-workers.js';
import { tradeResources, spendResources, creditResources } from './resource-ledger.js';
import { recordRelationship } from './household-social.js';

const phases = [
  'outbound',
  'observing',
  'detected',
  'hiding',
  'engaged',
  'recovering',
  'returning',
  'resolved',
  'failed',
  'joined',
];
const terminal = new Set(['resolved', 'failed', 'joined']);
const integer = (n) => Number.isSafeInteger(n) && n >= 0;
const resident = (s, id) => s.roster.find((c) => c.id === id);
const living = (s, o) =>
  o.party.map((id) => resident(s, id)).filter((c) => c && c.status !== 'dead');
export function expeditionState(seed = 48271) {
  let next = Math.max(1, seed % 2147483647);
  const sites = Object.fromEntries(
    siteDefinitions.map((d) => {
      next = (next * 16807) % 2147483647;
      return [d.id, generateSite(d, next, 1)];
    }),
  );
  return {
    version: 1,
    seed: next,
    nextOperation: 0,
    nextEvent: 0,
    sites,
    operations: [],
    intel: {},
    bestiary: {},
    research: null,
    events: [],
  };
}
function generateSite(def, seed, generation, createdDay = 1) {
  const count = def.species ? 1 : 2 + (seed % 3);
  return {
    id: def.id,
    generation,
    createdDay,
    seed,
    count,
    vigilance: def.species ? 8 + (seed % 9) : 14 + (seed % 12),
    danger: def.species ? 55 : 40 + count * 6,
    work: def.species ? 45 + (seed % 16) : count * 16,
    alertUntil: 0,
    clearedDay: null,
  };
}
export function ensureExpeditions(s) {
  if (s.outside === undefined) s.outside = expeditionState(s.seed);
  if (s.outside?.version === 1 && s.outside.sites)
    for (const site of Object.values(s.outside.sites))
      if (site.createdDay === undefined) site.createdDay = 1;
}
export function activeExpeditions(s) {
  return (s.outside?.operations || []).filter((o) => !terminal.has(o.phase));
}
export function residentExpedition(s, id) {
  return activeExpeditions(s).find((o) => o.party.includes(id));
}
export function pendingOrders(s) {
  return activeExpeditions(s).filter((o) => o.pending);
}
export function assertOrders(s) {
  if (pendingOrders(s).length)
    throw Error('Choose retreat, hide or engage for the spotted party before advancing a day.');
}
function event(s, o, type, text, data = {}) {
  const e = {
    uid: 'outside-event-' + ++s.outside.nextEvent,
    day: s.day,
    operation: o?.uid || null,
    type,
    text,
    ...data,
  };
  s.outside.events.push(e);
  for (const id of new Set(o?.participants || [])) {
    const c = resident(s, id);
    if (c) c.memories.push({ day: s.day, text });
  }
  return e;
}
function preparationSources(s, o) {
  return [o, ...s.outside.operations.filter((p) => p.phase === 'joined' && p.parent === o.uid)];
}
function roll(o) {
  o.rng = (o.rng * 16807) % 2147483647;
  return o.rng % 100;
}
export function infiltration(party) {
  const scores = party.map(
    (c) =>
      effectiveWorkStat(c, 'agi') * 2 +
      (!c.undead && c.type === 'scout' ? 8 : 0) +
      (c.skills.includes('sneaking') ? 12 : 0) +
      (c.specialisation === 'thief' ? 8 : 0) +
      (hasTalent(c, 'retreat') ? 4 : 0) +
      equippedItems(c).reduce((n, e) => n + (e.stealth || 0), 0),
  );
  const noise = party.reduce(
    (n, c) => n + equippedItems(c).reduce((v, e) => v + (e.noise || 0), 0),
    0,
  );
  return {
    capability: scores.length ? Math.min(...scores) : 0,
    group: Math.max(0, party.length - 1) * 10,
    noise,
  };
}
export function detectionChance(s, siteId, party) {
  const site = s.outside.sites[siteId],
    own = infiltration(party);
  return Math.min(
    95,
    Math.max(
      5 + own.group * 0.2 + own.noise * 0.5,
      20 +
        site.vigilance +
        own.group +
        own.noise +
        (site.alertUntil >= s.day ? 15 : 0) -
        own.capability,
    ),
  );
}
function validParty(s, ids, max) {
  if (
    !Array.isArray(ids) ||
    !ids.length ||
    ids.length > max ||
    new Set(ids).size !== ids.length ||
    ids.some(
      (id) => !resident(s, id) || resident(s, id).status !== 'home' || resident(s, id).injury,
    )
  )
    throw Error('Choose a distinct fit party at home, within capacity.');
  return ids.map((id) => resident(s, id));
}
function siteFor(s, id) {
  const d = siteDefinitions.find((d) => d.id === id),
    site = s.outside.sites[id];
  if (!d || !site) throw Error('Unknown expedition site.');
  if (site.clearedDay !== null)
    throw Error('This site is quiet. A new report will appear seven days after clearance.');
  return { d, site };
}
function preparationCosts(intent, p) {
  if (
    !p ||
    typeof p !== 'object' ||
    Array.isArray(p) ||
    Object.keys(p).some((k) => !['fire', 'medical'].includes(k)) ||
    ['fire', 'medical'].some((k) => p[k] !== undefined && typeof p[k] !== 'boolean')
  )
    throw Error('Choose valid expedition preparation.');
  return {
    gold: intent === 'scout' ? 0 : 5,
    supplies: (intent === 'scout' ? 1 : 2) + Number(!!p.medical),
    materials: p.fire ? { flameKit: 1 } : {},
  };
}
export function expeditionPreview(s, siteId, intent, ids = [], preparation = {}) {
  const d = siteDefinitions.find((d) => d.id === siteId);
  if (!d) throw Error('Unknown expedition site.');
  const intel = s.outside?.intel[siteId];
  const party = ids.map((id) => resident(s, id)).filter(Boolean);
  const own = infiltration(party);
  return {
    id: d.id,
    name: d.name,
    report: d.report,
    warning: d.warning,
    reward: d.reward,
    counterElements: intel?.picture ? dossier(s, intel.species).counters || [] : [],
    travelDays: 1,
    returnDays: 1,
    capacity: intent === 'scout' ? 3 : 6,
    cost: preparationCosts(intent, preparation),
    group: own.group,
    noise: own.noise,
    capability: own.capability,
    intel: intel
      ? {
          ...intel,
          stale: s.day - intel.day >= 3 || intel.generation !== s.outside.sites[siteId].generation,
        }
      : null,
    cleared: s.outside?.sites[siteId].clearedDay !== null,
    nextReport:
      s.outside?.sites[siteId].clearedDay === null ? null : s.outside.sites[siteId].clearedDay + 7,
  };
}
export function reconnaissanceReport(siteId, intel) {
  if (!intel || intel.count === null) return 'No reliable observations were gathered.';
  const d = siteDefinitions.find((d) => d.id === siteId);
  const count = (intel.complete ? '' : 'at least ') + intel.count;
  const observed = d.species
    ? 'Scouts observed ' +
      count +
      ' large horned creature' +
      (intel.count === 1 ? '' : 's') +
      '. A creature sketch is available for research.'
    : 'Scouts counted ' +
      count +
      ' armed patrol member' +
      (intel.count === 1 ? '' : 's') +
      ' near the old toll arch.';
  return (
    'Observed on day ' +
    intel.day +
    '. ' +
    observed +
    (intel.complete
      ? ''
      : ' Scouting was interrupted; this is a partial report and more threats may remain unseen.')
  );
}
function createOperation(s, id, intent, ids, p, hooks, parent = null, reinforcementIntent = null) {
  const { d, site } = siteFor(s, id);
  const party = validParty(s, ids, intent === 'scout' ? 3 : 6);
  const cost = preparationCosts(intent, p);
  if (s.outside.nextOperation === Number.MAX_SAFE_INTEGER)
    throw Error('Expedition counter is full.');
  spendResources(s, cost, hooks, 'Prepare expedition: ' + d.name);
  const n = ++s.outside.nextOperation;
  const o = {
    uid: 'outside-' + n,
    site: id,
    siteSeed: site.seed,
    workTarget: site.work,
    originParty: [...ids],
    generation: site.generation,
    intent,
    party: [...ids],
    participants: [...ids],
    cost: cost.gold,
    originIntent: intent,
    phase: 'outbound',
    pending: false,
    remaining: 1,
    startedDay: s.day,
    progress: 0,
    labour: 0,
    rng: ((site.seed + n * 104729) % 2147483646) + 1,
    observed: { picture: false, complete: false, count: null, day: s.day },
    preparation: { fire: !!p.fire, medical: !!p.medical },
    fireUsed: false,
    medicalUsed: false,
    refunded: false,
    rewarded: false,
    rescued: false,
    outcome: null,
    socialApplied: false,
    parent,
    reinforcementIntent,
    stance: 'press',
  };
  s.outside.operations.push(o);
  party.forEach((c) => (c.status = 'away'));
  if (ids.includes(s.selected)) s.selected = 'rowan';
  event(
    s,
    o,
    'departed',
    party.map((c) => c.name).join(', ') + ' departed for ' + d.name + ' (' + intent + ').',
  );
  return o.uid;
}
export function dispatchExpedition(s, id, intent, ids, preparation = {}, hooks = {}) {
  ensureExpeditions(s);
  if (!['scout', 'assault'].includes(intent))
    throw Error('Choose scouting or assault; rescue targets an existing expedition.');
  if (activeExpeditions(s).some((o) => o.site === id))
    throw Error(
      'A party is already there or travelling there. Send reinforcements to its operation.',
    );
  return createOperation(s, id, intent, ids, preparation, hooks);
}
export function reinforceExpedition(s, uid, ids, intent, preparation = {}, hooks = {}) {
  const parent = s.outside.operations.find((o) => o.uid === uid);
  if (
    !parent ||
    !['extract', 'assault'].includes(intent) ||
    parent.parent ||
    ['resolved', 'joined'].includes(parent.phase) ||
    (parent.phase !== 'failed' && parent.generation !== s.outside.sites[parent.site].generation) ||
    (parent.phase === 'failed' &&
      !parent.party.some(
        (id) => resident(s, id).status === 'dead' && !resident(s, id).bodyRecovered,
      ))
  )
    throw Error('Choose an expedition that still needs help.');
  if (activeExpeditions(s).some((o) => o.site === parent.site && !o.parent && o.uid !== parent.uid))
    throw Error('Another force is already working at this site. Reinforce that operation first.');
  const existing = activeExpeditions(s)
    .filter((o) => o.site === parent.site)
    .flatMap((o) => o.party)
    .filter((id) => resident(s, id).status !== 'dead');
  validParty(s, ids, 6);
  if (new Set([...existing, ...ids]).size > 8)
    throw Error('No more than eight active residents can occupy one site.');
  return createOperation(s, parent.site, 'rescue', ids, preparation, hooks, uid, intent);
}
export function orderExpedition(s, uid, order, hooks = {}) {
  const o = s.outside.operations.find((o) => o.uid === uid);
  if (
    !o ||
    terminal.has(o.phase) ||
    ['outbound', 'returning', 'recovering'].includes(o.phase) ||
    !['retreat', 'hide', 'engage', 'guard', 'bait'].includes(order)
  )
    throw Error('Choose an available expedition order.');
  if (
    order === 'bait' &&
    (!siteDefinitions.find((d) => d.id === o.site).species ||
      (s.outside.bestiary.briarStag?.tier || 0) < 2)
  )
    throw Error('Research the charge pattern before using bait.');
  o.pending = false;
  if (order === 'retreat' && !living(s, o).some(conscious))
    throw Error('Nobody can lead a retreat. Hold position and send a rescue force.');
  if (order === 'retreat') {
    o.phase = 'returning';
    o.remaining = 1;
    o.outcome = 'withdrawn';
  } else if (order === 'hide') o.phase = 'hiding';
  else {
    if (order === 'engage') o.intent = 'assault';
    o.phase = 'engaged';
    o.stance = order === 'guard' ? 'guard' : order === 'bait' ? 'bait' : 'press';
  }
  event(
    s,
    o,
    'order',
    'Party ordered to ' + order + ' at ' + siteDefinitions.find((d) => d.id === o.site).name + '.',
  );
  if (order === 'retreat' && living(s, o).some((c) => hasTalent(c, 'retreat'))) {
    o.remaining = 0;
    returnParty(s, o, hooks);
  }
}
function observe(s, o, complete = false) {
  const site = s.outside.sites[o.site],
    d = siteDefinitions.find((d) => d.id === o.site);
  o.observed = {
    picture: !!d.species,
    complete,
    count: complete ? site.count : Math.max(1, site.count - 1),
    day: s.day,
  };
}
function spotted(s, o) {
  o.phase = 'detected';
  o.pending = true;
  s.outside.sites[o.site].alertUntil = s.day + 3;
  event(
    s,
    o,
    'spotted',
    'The party was spotted. Choose retreat, hide or engage before another day advances.',
  );
}
function publishIntel(s, o) {
  if (o.observed.count === null) return;
  const previous = s.outside.intel[o.site];
  if (
    !previous ||
    previous.generation !== o.generation ||
    o.observed.complete ||
    !previous.complete
  )
    s.outside.intel[o.site] = {
      ...o.observed,
      generation: o.generation,
      species: siteDefinitions.find((d) => d.id === o.site).species,
    };
  if (o.observed.picture) {
    const id = siteDefinitions.find((d) => d.id === o.site).species;
    const entry = (s.outside.bestiary[id] ||= { seen: true, sketch: false, tier: 0 });
    entry.sketch ||= o.observed.complete;
  }
}
export function combatAssessment(s, o) {
  const def = siteDefinitions.find((d) => d.id === o.site),
    site = s.outside.sites[o.site];
  const party = living(s, o).filter(conscious);
  const fire =
    preparationSources(s, o).some((p) => p.preparation.fire) ||
    party.some(
      (c) =>
        c.skills.includes('quietFlame') ||
        equippedItems(c).some((e) => e.elements?.includes('fire')),
    );
  const power = party.reduce(
    (n, c) => n + Math.max(...['str', 'agi', 'int'].map((k) => effectiveWorkStat(c, k))),
    0,
  );
  const training = party.reduce((n, c) => n + talentValue(c, 'work'), 0);
  const protectedAmount = party.reduce(
    (n, c) =>
      n +
      effectiveWorkStat(c, 'end') * 0.4 +
      equipmentBonus(c, 'protection') +
      equippedItems(c).reduce((n, e) => n + (e.armour || 0), 0) +
      personalProtection(c, 'physical') +
      talentValue(c, 'physical'),
    0,
  );
  const counter = !!def.species && fire;
  return {
    rate: Math.max(
      0,
      Math.floor(
        power *
          (1 + training / 100) *
          (def.species ? (counter ? 1.6 : 0.75) : 1) *
          (o.stance === 'guard' ? 0.7 : o.stance === 'bait' ? 1.2 : 1),
      ),
    ),
    harmChance: Math.max(
      5,
      Math.min(
        95,
        Math.round(
          site.danger -
            protectedAmount -
            (counter ? 18 : 0) -
            (o.stance === 'guard' ? 15 : o.stance === 'bait' ? 12 : 0),
        ),
      ),
    ),
    counter,
    fire,
    power,
  };
}
function harm(s, o, hooks) {
  const targets = living(s, o);
  if (!targets.length) return;
  const victim = targets[roll(o) % targets.length];
  const medical = preparationSources(s, o).find((p) => p.preparation.medical && !p.medicalUsed);
  if (medical) {
    medical.medicalUsed = true;
    event(s, o, 'treated', 'Field medicine prevented injury to ' + victim.name + '.');
    return;
  }
  const ward =
    targets.find((c) => hasTalent(c, 'partyDeathWard')) ||
    ((victim.talents || []).some((id) => talents.find((t) => t.id === id)?.effects.deathWard)
      ? victim
      : null);
  o.wardsUsed ||= [];
  if (victim.injury === 4 && ward && !o.wardsUsed.includes(ward.id)) {
    o.wardsUsed.push(ward.id);
    event(s, o, 'ward', 'A death ward protected ' + victim.name + '.');
    return;
  }
  hooks.harm(s, victim, {
    name: siteDefinitions.find((d) => d.id === o.site).name,
    lethal: true,
    internal: false,
    injuryDays: 2,
  });
  event(s, o, 'injury', victim.name + (victim.status === 'dead' ? ' died.' : ' was injured.'), {
    resident: victim.id,
  });
}
function outcomeSocial(s, o) {
  if (o.socialApplied) return;
  const e = event(
    s,
    o,
    'outcome',
    o.outcome === 'rescued' || o.rescued
      ? 'A rescue force saved survivors or recovered the fallen.'
      : o.outcome === 'success' || o.outcome === 'scouted'
        ? 'The party completed its objective together.'
        : 'The party returned without completing its objective.',
  );
  const livingIds = o.participants.filter(
    (id) => !resident(s, id).undead && resident(s, id).status !== 'dead',
  );
  recordRelationship(
    s,
    e.uid,
    livingIds,
    o.outcome === 'rescued' || o.rescued ? 10 : ['success', 'scouted'].includes(o.outcome) ? 3 : -3,
    e.text,
  );
  o.socialApplied = true;
}
function completeObjective(s, o, hooks) {
  const def = siteDefinitions.find((d) => d.id === o.site);
  if (!o.rewarded) {
    const rewards =
      o.intent === 'rescue'
        ? {}
        : def.species
          ? { gold: def.reward, briarHorn: 1, briarSample: 1 }
          : { gold: def.reward, salvage: 4 };
    tradeResources(s, {}, rewards, hooks, 'Expedition: ' + def.name);
    o.rewarded = true;
    event(
      s,
      o,
      'reward',
      'Objective completed; rewards are immediately available throughout the house.',
      { rewards },
    );
    s.outside.sites[o.site].clearedDay = s.day;
    for (const lost of s.outside.operations.filter(
      (p) => p.site === o.site && p.phase === 'failed',
    ))
      recoverBodies(s, lost, hooks);
    if (o.parent)
      recoverBodies(
        s,
        s.outside.operations.find((p) => p.uid === o.parent),
        hooks,
      );
  }
  observe(s, o, true);
  o.phase = 'returning';
  o.remaining = 1;
  o.outcome = o.intent === 'rescue' ? 'rescued' : 'success';
}
function recoverBodies(s, o, hooks) {
  if (!o) return;
  for (const id of o.party) {
    const c = resident(s, id);
    if (c.status === 'dead') {
      c.bodyRecovered = true;
      hooks.returnEquipment(s, c);
    }
  }
}
function returnParty(s, o, hooks) {
  publishIntel(s, o);
  if (o.outcome === 'scouted' && !o.rewarded) {
    if (o.observed.picture) creditResources(s, { briarSample: 1 });
    o.rewarded = true;
    event(s, o, 'reward', 'Scouts brought back their notes and an available sample.', {
      rewards: o.observed.picture ? { briarSample: 1 } : {},
    });
  }
  for (const receipt of preparationSources(s, o).filter((p) => !p.refunded)) {
    creditResources(s, {
      ...(receipt.preparation.fire && !receipt.fireUsed ? { flameKit: 1 } : {}),
      ...(receipt.preparation.medical && !receipt.medicalUsed ? { supplies: 1 } : {}),
    });
    receipt.refunded = true;
    event(
      s,
      receipt,
      'preparation-returned',
      'Unused medicine and counter items returned to shared stores.',
    );
  }
  recoverBodies(s, o, hooks);
  for (const c of living(s, o)) {
    c.status = c.injury || c.recovery ? 'injured' : 'home';
    hooks.xp(s, c, o.outcome === 'success' ? 35 : o.outcome === 'scouted' ? 15 : 10);
  }
  outcomeSocial(s, o);
  o.phase = 'resolved';
  const scouting = o.intent === 'scout';
  const scoutingText = scouting ? reconnaissanceReport(o.site, o.observed) : '';
  if (scouting) {
    const names = living(s, o)
      .map((c) => c.name)
      .join(', ');
    const body =
      (names ? 'Scouts returned: ' + names + '.' : 'The scouting expedition has ended.') +
      '\n\n' +
      scoutingText;
    const notice = event(s, o, 'scouts-returned', body);
    s.scenes.unshift({
      title: 'Scouting report · ' + siteDefinitions.find((d) => d.id === o.site).name,
      body,
      operation: o.uid,
      event: notice.uid,
    });
  }
  s.reports.unshift({
    day: s.day,
    title:
      (scouting ? 'Scouting report · ' : '') +
      siteDefinitions.find((d) => d.id === o.site).name +
      ': ' +
      o.outcome,
    text: s.outside.events
      .filter((e) => e.operation === o.uid)
      .map((e) => e.text)
      .join('\n\n'),
    reward:
      o.outcome === 'success' && o.intent !== 'rescue'
        ? siteDefinitions.find((d) => d.id === o.site).reward
        : 0,
    xp: o.outcome === 'success' ? 35 : o.outcome === 'scouted' ? 15 : 10,
    cost: preparationSources(s, o).reduce((n, p) => n + p.cost, 0),
    party: o.participants.map((id) => resident(s, id).name),
    operation: o.uid,
  });
}
function arrive(s, o, hooks) {
  if (o.parent) {
    const parent = s.outside.operations.find((p) => p.uid === o.parent);
    if (parent.phase === 'failed') {
      if (o.reinforcementIntent === 'assault') o.intent = 'assault';
      o.rescued = true;
      o.phase = 'engaged';
      o.stance = 'guard';
      observe(s, o);
      event(s, o, 'arrival', 'The rescue force reached the site. They must secure the remains.');
      return;
    }
    if (parent.phase === 'resolved' || parent.phase === 'returning') {
      o.phase = 'returning';
      o.remaining = 1;
      o.outcome = 'withdrawn';
      event(
        s,
        o,
        'arrival',
        'The original party is already returning. Reinforcements are coming home.',
      );
      return;
    }
    parent.party.push(...o.party);
    parent.participants = [...new Set([...parent.participants, ...o.participants])];
    // Preserve unused preparations as separate receipts, never lose or duplicate a reinforcement kit.
    o.phase = 'joined';
    o.socialApplied = true;
    parent.pending = false;
    parent.rescued = true;
    if (o.reinforcementIntent === 'extract') {
      parent.phase = 'returning';
      parent.remaining = 1;
      parent.outcome = 'rescued';
    } else {
      parent.intent = 'assault';
      parent.phase = 'engaged';
      parent.stance = 'guard';
    }
    event(
      s,
      parent,
      'reinforced',
      'Reinforcements arrived: ' +
        o.party.map((id) => resident(s, id).name).join(', ') +
        (o.reinforcementIntent === 'extract'
          ? '. The force is extracting the survivors.'
          : '. The combined force will complete the mission.'),
    );
    return;
  }
  observe(s, o);
  if (o.intent === 'scout') {
    if (roll(o) < detectionChance(s, o.site, living(s, o))) spotted(s, o);
    else {
      o.phase = 'observing';
      event(s, o, 'arrival', 'The scouts reached a concealed observation point.');
    }
  } else {
    o.phase = 'engaged';
    event(
      s,
      o,
      'arrival',
      'The party reached the threat. Combat begins on the next day; withdrawal remains available.',
    );
  }
}
export function advanceExpeditions(s, hooks) {
  ensureExpeditions(s);
  for (const d of siteDefinitions) {
    const site = s.outside.sites[d.id];
    if (
      (site.clearedDay !== null
        ? s.day >= site.clearedDay + 7
        : !d.species && s.day >= site.createdDay + 7) &&
      !activeExpeditions(s).some((o) => o.site === d.id)
    ) {
      s.outside.seed = (s.outside.seed * 16807) % 2147483647;
      s.outside.sites[d.id] = generateSite(d, s.outside.seed, site.generation + 1, s.day);
      event(
        s,
        null,
        'new-report',
        'A fresh report came from ' + d.name + '. Local occupants may have changed.',
      );
    }
  }
  const current = [...activeExpeditions(s)];
  for (const o of current.filter((o) => o.phase !== 'outbound')) {
    if (o.pending) continue;
    if (o.phase === 'returning') {
      if (--o.remaining <= 0) returnParty(s, o, hooks);
      continue;
    }
    if (!living(s, o).length) {
      o.phase = 'failed';
      o.outcome = 'failed';
      outcomeSocial(s, o);
      event(s, o, 'lost', 'The entire party was lost. A rescue force can recover their remains.');
      continue;
    }
    if (o.phase === 'observing') {
      observe(s, o, true);
      o.phase = 'returning';
      o.remaining = 1;
      o.outcome = 'scouted';
      event(s, o, 'observed', 'Scouts recorded the threat without engaging it.');
    } else if (o.phase === 'hiding') {
      if (roll(o) < Math.max(5, detectionChance(s, o.site, living(s, o)) - 15)) {
        o.phase = 'engaged';
        o.stance = 'guard';
        event(
          s,
          o,
          'found',
          'The hiding place was discovered. The party is holding defensively; it can still retreat.',
        );
        harm(s, o, hooks);
      } else
        event(
          s,
          o,
          'concealed',
          'The party remained concealed for another day while the outside world continued.',
        );
    } else if (o.phase === 'engaged') {
      const assessment = combatAssessment(s, o);
      if (assessment.counter && !preparationSources(s, o).some((p) => p.fireUsed)) {
        const receipt = preparationSources(s, o).find((p) => p.preparation.fire);
        if (receipt) receipt.fireUsed = true;
      }
      o.progress = Math.min(s.outside.sites[o.site].work, o.progress + assessment.rate);
      if (roll(o) < assessment.harmChance) harm(s, o, hooks);
      if (!living(s, o).length) {
        o.phase = 'failed';
        o.outcome = 'failed';
        outcomeSocial(s, o);
      } else if (o.progress >= s.outside.sites[o.site].work) {
        o.phase = 'recovering';
        event(
          s,
          o,
          'secured',
          'The threat is overcome. The crew is recovering useful material; necromantic labour can help this work.',
        );
      } else if (!living(s, o).some(conscious)) {
        o.phase = 'detected';
        o.pending = true;
        event(
          s,
          o,
          'stranded',
          'Nobody can continue fighting. Order withdrawal or call for extraction.',
        );
      }
    } else if (o.phase === 'recovering') {
      const crew = crewContribution(s, living(s, o), 'str', { away: true });
      o.labour = Math.min(6, o.labour + crew.total);
      if (o.labour >= 6) completeObjective(s, o, hooks);
      else
        event(
          s,
          o,
          'recovery',
          'Material recovery: ' +
            o.labour +
            '/6 work' +
            (crew.supervision ? ' · necromancer +' + crew.supervision : '') +
            '.',
        );
    }
  }
  // Travel arrivals happen after existing parties have faced today's danger.
  for (const o of current.filter((o) => o.phase === 'outbound'))
    if (--o.remaining <= 0) arrive(s, o, hooks);
}
export function dossier(s, id) {
  const d = species[id],
    known = s.outside?.bestiary[id];
  if (!d || !known?.seen)
    return {
      id,
      known: false,
      name: 'Unidentified creature',
      portrait: 'unknown',
      traits: [],
      counters: [],
      tier: 0,
      sketch: false,
    };
  return {
    id,
    known: true,
    name: d.name,
    portrait: d.portrait,
    description: d.description,
    tier: known.tier,
    counters: known.tier ? [d.weakness] : [],
    sketch: known.sketch,
    traits: known.tier
      ? ['Vulnerable to fire', 'Bark resists ordinary physical attacks', 'Harvestable briar horn']
      : [],
    advanced: known.tier >= 2 ? 'Bait its charge, then strike while it recovers.' : null,
  };
}
export function researchForecast(s) {
  const p = s.outside?.research;
  if (!p) return null;
  const workers = s.guild.house.rooms[p.room].workers
    .map((id) => guildWorker(s, id))
    .filter((c) => c && c.id !== 'mara' && !c.undead);
  const crew = crewContribution(s, workers, 'int', { supervision: false });
  const paused = s.damagedRooms?.[p.room] || !s.guild.house.rooms[p.room].enabled || !crew.total;
  return {
    ...crew,
    total: paused ? 0 : crew.total,
    days: paused ? null : Math.ceil((p.work - p.progress) / crew.total),
    paused: paused ? 'Assign a fit living researcher in the operational alchemy room.' : null,
  };
}
export function startResearch(s, id, hooks = {}) {
  ensureExpeditions(s);
  const d = species[id],
    entry = s.outside.bestiary[id];
  if (!d || !entry?.sketch || entry.tier >= 2)
    throw Error('Bring back a clear scouting sketch before research.');
  if (s.outside.research) throw Error('Finish or cancel the current research first.');
  if (!s.flags.tower && !s.household?.rooms.includes('tower'))
    throw Error('Recommission the alchemy room first.');
  const tier = entry.tier + 1,
    cost = tier === 2 ? { materials: { briarSample: 1 } } : {};
  spendResources(s, cost, hooks, 'Creature research');
  s.outside.research = {
    species: id,
    tier,
    room: 'tower',
    progress: 0,
    work: tier === 1 ? d.researchWork : d.advancedWork,
    inputs: cost,
  };
}
export function cancelResearch(s) {
  const p = s.outside?.research;
  if (!p) throw Error('No research to cancel.');
  creditResources(s, p.inputs.materials || {});
  s.outside.research = null;
}
export function advanceResearch(s, hooks) {
  const p = s.outside?.research;
  if (!p) return;
  const f = researchForecast(s);
  if (!f.total) return;
  p.progress = Math.min(p.work, p.progress + f.total);
  if (p.progress < p.work) return;
  s.outside.bestiary[p.species].tier = p.tier;
  const e = event(
    s,
    null,
    'research',
    'Research completed: ' +
      species[p.species].name +
      (p.tier === 1
        ? '. Fire counters its bark; horns can improve the forge or make quiet equipment.'
        : '. Its charge can be baited to expose a vulnerable recovery.'),
  );
  s.reports.unshift({
    day: s.day,
    title: 'Research: ' + species[p.species].name,
    text: e.text,
    reward: 0,
    xp: 5,
    cost: 0,
    party: f.workers.filter((c) => c.fit).map((c) => c.name),
  });
  s.scenes.push({ title: 'Creature research completed', body: e.text });
  for (const c of f.workers.filter((c) => c.fit))
    if (resident(s, c.id)) hooks.xp(s, resident(s, c.id), 5);
  s.outside.research = null;
}
export function validateExpeditions(s) {
  const g = s.outside,
    bad = () => {
      throw Error('Invalid outside expedition save.');
    };
  if (
    !g ||
    g.version !== 1 ||
    !integer(g.seed) ||
    g.seed < 1 ||
    g.seed >= 2147483647 ||
    !integer(g.nextOperation) ||
    !integer(g.nextEvent) ||
    !g.sites ||
    Object.keys(g.sites).length !== siteDefinitions.length ||
    !Array.isArray(g.operations) ||
    g.operations.length !== g.nextOperation ||
    !Array.isArray(g.events) ||
    g.events.length !== g.nextEvent ||
    !g.intel ||
    !g.bestiary
  )
    bad();
  for (const d of siteDefinitions) {
    const p = g.sites[d.id];
    if (
      !p ||
      p.id !== d.id ||
      !integer(p.seed) ||
      p.seed < 1 ||
      p.seed >= 2147483647 ||
      !integer(p.generation) ||
      p.generation < 1 ||
      !integer(p.createdDay) ||
      p.createdDay < 1 ||
      p.createdDay > s.day ||
      !integer(p.alertUntil) ||
      (p.clearedDay !== null && (!integer(p.clearedDay) || p.clearedDay > s.day))
    )
      bad();
    const generated = generateSite(d, p.seed, p.generation);
    if (['count', 'vigilance', 'danger', 'work'].some((k) => p[k] !== generated[k])) bad();
  }
  const occupied = new Set();
  for (const [i, o] of g.operations.entries()) {
    if (
      !o ||
      !integer(o.siteSeed) ||
      o.siteSeed < 1 ||
      o.siteSeed >= 2147483647 ||
      !Array.isArray(o.originParty) ||
      !o.originParty.length ||
      new Set(o.originParty).size !== o.originParty.length ||
      o.originParty.length > (o.originIntent === 'scout' ? 3 : 6) ||
      o.originParty.some((id) => !resident(s, id)) ||
      o.uid !== 'outside-' + (i + 1) ||
      !g.sites[o.site] ||
      !['scout', 'assault', 'rescue'].includes(o.intent) ||
      !['scout', 'assault', 'rescue'].includes(o.originIntent) ||
      o.cost !== (o.originIntent === 'scout' ? 0 : 5) ||
      !phases.includes(o.phase) ||
      !Array.isArray(o.party) ||
      !o.party.length ||
      o.party.filter((id) => resident(s, id)?.status !== 'dead').length > 8 ||
      new Set(o.party).size !== o.party.length ||
      o.party.some((id) => !resident(s, id)) ||
      !Array.isArray(o.participants) ||
      new Set(o.participants).size !== o.participants.length ||
      o.party.some((id) => !o.participants.includes(id)) ||
      o.participants.some((id) => !resident(s, id)) ||
      !integer(o.generation) ||
      o.generation < 1 ||
      o.generation > g.sites[o.site].generation ||
      !integer(o.rng) ||
      o.rng < 1 ||
      o.rng >= 2147483647 ||
      !integer(o.startedDay) ||
      o.startedDay < 1 ||
      o.startedDay > s.day ||
      !integer(o.progress) ||
      !integer(o.labour) ||
      o.labour > 6 ||
      !integer(o.remaining) ||
      !['press', 'guard', 'bait'].includes(o.stance) ||
      [
        'pending',
        'rewarded',
        'rescued',
        'refunded',
        'socialApplied',
        'fireUsed',
        'medicalUsed',
      ].some((k) => typeof o[k] !== 'boolean') ||
      !o.preparation ||
      ['fire', 'medical'].some((k) => typeof o.preparation[k] !== 'boolean') ||
      !o.observed ||
      typeof o.observed.picture !== 'boolean' ||
      typeof o.observed.complete !== 'boolean' ||
      (o.observed.count !== null && (!integer(o.observed.count) || o.observed.count < 1)) ||
      !integer(o.observed.day) ||
      o.observed.day > s.day ||
      ![null, 'success', 'scouted', 'withdrawn', 'rescued', 'failed'].includes(o.outcome) ||
      o.pending !== (o.phase === 'detected') ||
      (o.parent !== null &&
        (!g.operations.some((p) => p.uid === o.parent && p.site === o.site && !p.parent) ||
          o.originIntent !== 'rescue')) ||
      (o.parent === null
        ? o.reinforcementIntent !== null
        : !['extract', 'assault'].includes(o.reinforcementIntent))
    )
      bad();
    const expected = generateSite(
      siteDefinitions.find((d) => d.id === o.site),
      o.siteSeed,
      o.generation,
    );
    if (
      o.workTarget !== expected.work ||
      o.progress > o.workTarget ||
      (o.generation === g.sites[o.site].generation && o.siteSeed !== g.sites[o.site].seed)
    )
      bad();
    const originalAndJoined = [
      ...new Set([
        ...o.originParty,
        ...g.operations
          .filter((child) => child.parent === o.uid && child.phase === 'joined')
          .flatMap((child) => child.party),
      ]),
    ];
    if (
      originalAndJoined.length !== o.party.length ||
      originalAndJoined.some((id) => !o.party.includes(id)) ||
      o.participants.length !== o.party.length ||
      o.participants.some((id) => !o.party.includes(id)) ||
      (o.parent && g.operations.findIndex((p) => p.uid === o.parent) >= i)
    )
      bad();
    for (const type of ['reward', 'outcome', 'preparation-returned'])
      if (g.events.filter((e) => e.operation === o.uid && e.type === type).length > 1) bad();
    if (!terminal.has(o.phase)) {
      if (o.generation !== g.sites[o.site].generation) bad();
      for (const id of o.party) {
        if (occupied.has(id) || !['away', 'dead'].includes(resident(s, id).status)) bad();
        occupied.add(id);
      }
    }
    if (
      (o.phase === 'resolved' && (!o.refunded || !o.socialApplied || !o.outcome)) ||
      o.rewarded !== g.events.some((e) => e.operation === o.uid && e.type === 'reward') ||
      o.refunded !==
        g.events.some((e) => e.operation === o.uid && e.type === 'preparation-returned') ||
      (o.phase !== 'joined' &&
        o.socialApplied !== g.events.some((e) => e.operation === o.uid && e.type === 'outcome'))
    )
      bad();
  }
  for (const site of siteDefinitions)
    if (
      activeExpeditions(s)
        .filter((o) => o.site === site.id)
        .flatMap((o) => o.party)
        .filter((id) => resident(s, id).status !== 'dead').length > 8
    )
      bad();
  for (const [i, e] of g.events.entries())
    if (
      !e ||
      e.uid !== 'outside-event-' + (i + 1) ||
      !integer(e.day) ||
      e.day < 1 ||
      e.day > s.day ||
      typeof e.type !== 'string' ||
      typeof e.text !== 'string' ||
      (e.operation !== null && !g.operations.some((o) => o.uid === e.operation))
    )
      bad();
  for (const [id, intel] of Object.entries(g.intel))
    if (
      !g.sites[id] ||
      !intel ||
      !integer(intel.day) ||
      intel.day > s.day ||
      !integer(intel.generation) ||
      intel.generation > g.sites[id].generation ||
      !integer(intel.count) ||
      intel.count < 1 ||
      typeof intel.complete !== 'boolean' ||
      typeof intel.picture !== 'boolean' ||
      intel.species !== siteDefinitions.find((d) => d.id === id).species
    )
      bad();
  for (const [id, b] of Object.entries(g.bestiary))
    if (
      !species[id] ||
      !b ||
      b.seen !== true ||
      typeof b.sketch !== 'boolean' ||
      ![0, 1, 2].includes(b.tier) ||
      (b.tier && !b.sketch)
    )
      bad();
  const r = g.research;
  if (
    r !== null &&
    (!r ||
      !species[r.species] ||
      !g.bestiary[r.species]?.sketch ||
      r.tier !== g.bestiary[r.species].tier + 1 ||
      ![1, 2].includes(r.tier) ||
      r.room !== 'tower' ||
      !integer(r.progress) ||
      r.work !==
        (r.tier === 1 ? species[r.species].researchWork : species[r.species].advancedWork) ||
      r.progress >= r.work ||
      JSON.stringify(r.inputs) !==
        JSON.stringify(r.tier === 1 ? {} : { materials: { briarSample: 1 } }))
  )
    bad();
  return occupied;
}

export function operationView(s, uid) {
  const o = s.outside.operations.find((o) => o.uid === uid);
  if (!o) throw Error('Unknown operation.');
  const canOrder =
    !terminal.has(o.phase) && !['outbound', 'returning', 'recovering'].includes(o.phase);
  return {
    uid,
    name: siteDefinitions.find((d) => d.id === o.site).name,
    phase: o.phase,
    pending: o.pending,
    picture: o.observed.picture,
    party: o.party.map((id) => {
      const c = resident(s, id);
      return {
        id,
        name: c.name,
        condition:
          c.status === 'dead'
            ? 'Fallen'
            : ['Fit', 'Hurt', 'Injured', 'Incapacitated', 'Unconscious'][c.injury || 0],
      };
    }),
    canOrder,
    canRetreat: living(s, o).some(conscious),
    canBait:
      (s.outside.bestiary.briarStag?.tier || 0) >= 2 &&
      !!siteDefinitions.find((d) => d.id === o.site).species,
    canReinforce:
      !o.parent &&
      !['resolved', 'joined'].includes(o.phase) &&
      (o.phase !== 'failed' || o.party.some((id) => !resident(s, id).bodyRecovered)),
    progress:
      o.phase === 'engaged'
        ? Math.floor((o.progress / s.outside.sites[o.site].work) * 100)
        : o.phase === 'recovering'
          ? Math.floor((o.labour / 6) * 100)
          : null,
    message: o.pending
      ? 'Choose an order before the next day. No attack has been resolved during this decision.'
      : o.phase === 'hiding'
        ? 'Exposure continues each day; concealment may fail while help travels.'
        : o.phase === 'returning'
          ? 'Home tomorrow. Observations will join the guild’s reports.'
          : o.phase === 'recovering'
            ? 'Threat overcome. The crew is recovering materials for shared stores.'
            : o.phase === 'failed'
              ? 'A rescue force can recover remains from this site.'
              : o.phase === 'outbound'
                ? 'Arrives at the end of the next day.'
                : 'The party can change tactics or withdraw before another day.',
  };
}

export function recordHomeOutcome(s, m, success) {
  if (s.household?.opening !== 'ready' || s.outside.events.some((e) => e.legacyOperation === m.uid))
    return;
  const ids = (m.participants || m.party).filter(
    (id) => resident(s, id) && resident(s, id).status !== 'dead' && !resident(s, id).undead,
  );
  const e = event(
    s,
    null,
    'home-outcome',
    success
      ? 'The residents held their home together.'
      : 'The defence party withdrew before the threat was cleared.',
    { legacyOperation: m.uid },
  );
  recordRelationship(s, e.uid, ids, success ? 3 : -3, e.text);
}
