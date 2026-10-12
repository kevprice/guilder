import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as D from './domain.js';
import { allChoiceNodes } from './narrative.js';
import { sleeperConversations } from './exploration.js';
import { homecomingChoices } from './homecoming.js';
import { classes, talents } from './classes.js';
import { playerCopy, rewardSummary } from './player-copy.js';
import { renderCharacterPanel } from './character-panel.js';

const retiredCopy =
  /recruitment fee|service obligation|no gold reward|no pay for|earns no gold|nobody is hired|no hiring fee|hire for \d+|120 \+ 80|level 2 needs 120/i;
function allStrings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

test('current story, discoveries, mechanics and interface use current player-facing copy', async () => {
  const content = [
    D.contracts,
    D.recruits,
    D.sleepers,
    D.residentDiscoveries,
    D.records,
    D.journeys,
    D.regions,
    D.equipment,
    allChoiceNodes(),
    sleeperConversations,
    homecomingChoices,
    classes,
    talents,
  ];
  for (const text of content.flatMap(allStrings)) assert.doesNotMatch(text, retiredCopy, text);
  for (const file of ['game.js', 'character-panel.js', 'index.html'])
    assert.doesNotMatch(await readFile(file, 'utf8'), retiredCopy, file);
});

test('Nell’s old return scene is migrated in every stored surface and stays clean after resaving', () => {
  const s = D.initial();
  D.recoverResident(s, 'nell', { x: 430, floor: 380 });
  const old =
    'Nell steps out of the folded corridor.\n“There is no recruitment fee or service obligation.”';
  s.scenes.push({ title: 'Nell returns', body: old });
  s.journal.push({ kind: 'Resident discovery', text: old });
  s.reports.push({ day: 1, title: 'Nell returns', text: old, reward: 0, xp: 0, party: ['Nell'] });
  s.roster[0].memories.push({ day: 1, text: old });
  s.roster[0].bio = old;
  const migrated = D.load(D.save(s));
  assert.doesNotMatch(D.save(migrated), retiredCopy);
  assert.match(migrated.scenes.at(-1).body, /Nell steps out/);
  assert.equal(migrated.gold, s.gold);
  assert.deepEqual(migrated.flags, s.flags);
  assert.deepEqual(D.load(D.save(migrated)), migrated);
});

test('copy migration recognises punctuation variants while preserving story restrictions and actual rewards', () => {
  assert.equal(
    playerCopy('There is no recruitment\nfee or service obligation! Nell returns.'),
    'Nell returns.',
  );
  assert.equal(
    playerCopy('Rowan cannot leave until the binding is replaced.'),
    'Rowan cannot leave until the binding is replaced.',
  );
  assert.equal(rewardSummary(0, 15), '+15 XP per surviving party member');
  assert.equal(rewardSummary(38, 0), '+38 gold');
  assert.equal(rewardSummary(0, 0), '');
});

test('both reference helpers follow the current cast and XP model', async () => {
  for (const file of [
    'CHARACTERS.md',
    'CLASSES_AND_SKILLS.md',
    'HOMECOMINGS.md',
    'RESIDENT_DISCOVERIES.md',
    'generate-reference.mjs',
    'reference-tables.mjs',
    'write-homecoming-reference.mjs',
  ])
    assert.doesNotMatch(await readFile(file, 'utf8'), retiredCopy, file);
  assert.match(await readFile('CLASSES_AND_SKILLS.md', 'utf8'), /35, 60, 105/);
});

test('the character page renders one person and keeps old Nell prose out of biographies and memories', () => {
  const state = D.initial();
  D.recoverResident(state, 'bryn', { x: 240, floor: 380 });
  D.recoverResident(state, 'nell', { x: 430, floor: 380 });
  state.roster
    .find((person) => person.id === 'nell')
    .memories.push({
      day: 1,
      text: 'Nell returns. There is no recruitment fee or service obligation.',
    });
  const html = renderCharacterPanel(D.load(D.save(state)), 'nell', {
    esc: playerCopy,
    paragraphs: (text) => `<p>${playerCopy(text)}</p>`,
    card: (title, text) => `<article><h3>${title}</h3>${text}</article>`,
    btn: (title) => `<button>${title}</button>`,
  });
  assert.doesNotMatch(html, retiredCopy);
  assert.match(html, /<h3>Nell<\/h3>/);
  assert.doesNotMatch(html, /<h3>Bryn<\/h3>/);
  assert.match(html, /character-page/);
});

test('character sheets separate descriptive biography from actions and expose actual attributes', () => {
  const state = D.initial();
  const html = renderCharacterPanel(state, 'rowan', {
    esc: playerCopy,
    paragraphs: (text) => `<p>${playerCopy(text)}</p>`,
    btn: (title) => `<button>${title}</button>`,
  });
  const biography = html.match(/<h4>Biography<\/h4>(.*?)<\/section>/s)[1];
  assert.match(biography, /spell keeps them alive/);
  assert.doesNotMatch(biography, /Recover |Ask |Open |Control /);
  assert.match(html, /Strength<\/span><strong>2<\/strong>/);
  assert.match(html, /Intellect<\/span><strong>7<\/strong>/);
  assert.match(html, /aria-label="Character actions"/);
  assert.match(html, /Control Rowan/);
});
