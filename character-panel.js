import * as D from './domain.js';
import { portraits } from './portraits.js';
import { abilityNames, effectiveStat } from './contracts.js';

export function renderCharacterPanel(state, selectedId, { esc, btn, paragraphs }) {
  const people = [D.home(state)[0], ...state.roster];
  const person = people.find((person) => person.id === selectedId) || people[0];
  let html = `<div class="sheet-picker"><label for="character-page">Character</label><select id="character-page">${people.map((entry) => `<option value="${entry.id}" ${entry.id === person.id ? 'selected' : ''}>${esc(entry.name)}</option>`).join('')}</select></div>`;
  if (person.id === 'rowan') {
    const description = state.flags.free
      ? 'The house is a home Rowan can leave and return to.'
      : state.flags.gateOpen
        ? 'The binding is gone. Rowan can walk beyond the gate.'
        : 'Rowan survived the collapse through Halden’s binding. The spell keeps them alive and ties them to the house. Its scattered records hold the history of that night.';
    return (
      html +
      sheet(
        person,
        state,
        state.flags.free || state.flags.gateOpen ? 'Unbound survivor' : 'Bound survivor',
        description,
        'At home',
        btn('Control Rowan', 'select:rowan'),
        '',
        { esc, paragraphs },
      )
    );
  }
  const mission = D.activeMissions(state).find((mission) => mission.party.includes(person.id));
  const condition =
    person.status === 'departed'
      ? 'Journey completed'
      : person.status === 'dead'
        ? 'Fallen'
        : mission
          ? D.contracts.find((contract) => contract.id === mission.id).name
          : person.status === 'injured'
            ? `Recovering · ${person.recovery} days`
            : 'At home';
  let body = '';
  if (person.status === 'home')
    body += `<div class="row">${btn('Control ' + person.name, 'select:' + person.id)}${D.storeAvailable(state) ? btn('Visit store room', 'visitStore:' + person.id) : ''}</div>`;
  if (person.status === 'injured') body += btn('Arrange treatment · 15 gold', 'treat:' + person.id);
  for (const node of D.availableChoices(state, person.id))
    body += `<div class="row">${btn(node.title, 'talk:' + node.id)}</div>`;
  const memories = person.memories.filter((memory) => memory.text);
  const history = memories.length
    ? `<details class="sheet-history"><summary>Personal history</summary>${memories
        .slice(-5)
        .map((memory) => `<p class="stats">Day ${memory.day}</p>${paragraphs(memory.text)}`)
        .join('')}</details>`
    : '';
  return (
    html +
    sheet(
      person,
      state,
      D.classOf(person).name,
      D.characterArc(state, person),
      condition,
      body,
      history,
      { esc, paragraphs },
    )
  );
}

const attributes = [
  ['str', 'Strength'],
  ['agi', 'Agility'],
  ['int', 'Intellect'],
  ['end', 'Endurance'],
];
const houseAbilities = {
  stoneSong: 'Steadies falling stone and opens weakened stone passages.',
  echoSight: 'Distinguishes remembered voices from echoes and false signals.',
  threadwalk: 'Follows folded paths and hidden connections through the house.',
  inscriptions: 'Reads the house’s inscriptions and binding diagrams.',
  anchorSight: 'Perceives the connections that hold the house together.',
  undeadLabour: 'Sustains work without living fatigue.',
  graveEndurance: 'Resists physical harm and ghost terror.',
};
function sheet(
  person,
  state,
  className,
  biography,
  condition,
  actions,
  history,
  { esc, paragraphs },
) {
  const rowan = person.id === 'rowan';
  const section = (title, body) =>
    `<section class="sheet-section"><h4>${title}</h4>${body}</section>`;
  const skillDefs = Object.values(D.skills).flat();
  const abilities = (person.skills || []).map((id) => ({
    name: abilityNames[id] || id,
    desc: skillDefs.find((skill) => skill.id === id)?.desc || houseAbilities[id] || '',
  }));
  abilities.push(
    ...(person.talents || [])
      .map((id) => D.talents.find((talent) => talent.id === id))
      .filter(Boolean),
  );
  const abilityList = abilities.length
    ? `<ul class="sheet-abilities">${abilities.map((ability) => `<li><strong>${esc(ability.name)}</strong><p>${esc(ability.desc)}</p></li>`).join('')}</ul>`
    : '<p class="sheet-muted">Practical experience and an unfinished education.</p>';
  const progression = rowan
    ? ''
    : `<div class="sheet-progress"><span>Level ${person.level}${person.level < 20 ? ` · ${person.xp} / ${D.xpRequired(person.level)} XP` : ' · Mastery'}</span>${person.level < 20 ? `<progress aria-label="Experience towards next level" value="${Math.min(person.xp, D.xpRequired(person.level))}" max="${D.xpRequired(person.level)}"></progress>` : ''}</div>`;
  return `<article class="character-sheet" aria-label="${esc(person.name)} character sheet">
    <header class="sheet-identity"><img src="${portraits[person.id]}" alt="${esc(person.name)} portrait"><div><p class="sheet-eyebrow">The guild register</p><h3>${esc(person.name)}</h3><p class="sheet-class">${esc(className)}</p>${progression}<p class="sheet-condition">${esc(condition)} · ${rowan ? (state.rowanRecovery > 0 ? 'Recovering' : 'Fit') : esc(D.injuryNames[D.injuryLevel(person)])}</p></div></header>
    <div class="sheet-attributes">${attributes.map(([key, name]) => `<div class="sheet-attribute"><span>${name}</span><strong>${person[key]}</strong>${!rowan && effectiveStat(person, key) !== person[key] ? `<small>${effectiveStat(person, key)} on contracts</small>` : ''}</div>`).join('')}</div>
    <div class="sheet-columns"><div>${section('Abilities & talents', abilityList)}${section(
      'Equipment',
      D.equipmentSlots
        .map((slot) => {
          const item = person.equipmentSlots?.[slot];
          const def = D.equipment.find(
            (e) =>
              e.id === item?.id ||
              (!person.equipmentSlots && e.id === person.gear && e.slot === slot),
          );
          return `<p><strong>${esc(slot)}</strong>: ${esc(def?.name || 'empty')}${
            def
              ? ' · ' +
                Object.entries(def.stats)
                  .map(([k, v]) => `${k.toUpperCase()} +${v}`)
                  .join(' · ')
              : ''
          }</p>`;
        })
        .join(''),
    )}${rowan ? '' : section('Relationship', `<p>Trust <strong>${person.bond}</strong></p>`)}</div><div>${section('Biography', paragraphs(biography))}${history}</div></div>
    ${actions ? `<footer class="sheet-actions" aria-label="Character actions">${actions}</footer>` : ''}</article>`;
}
