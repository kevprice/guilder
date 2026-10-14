import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { expansionMissions } from './expansion.js';
import { revisedCopy } from './revised-copy.js';
import { playerCopy } from './player-copy.js';

test('Mara establishes Halden’s death and the correspondence packet at the opening', () => {
  const text = D.initial({ opening: 'legacy' }).journal[0].text;
  assert.match(text, /Halden built me, then raised me/);
  assert.match(text, /They died last autumn/);
  assert.match(text, /letters/);
  const letter = D.contracts.find((contract) => contract.id === 'witness').arrival;
  assert.match(letter, /For thirty years/);
  assert.doesNotMatch(letter, /He binds|He does not answer/);
});

test('Halden’s room records identify their existing correspondence rather than a newly discovered letter', () => {
  const state = D.initial({ opening: 'legacy' });
  state.flags.cellarDrained = true;
  D.recoverRecord(state, 'cellar');
  const record = D.records.find((record) => record.id === 'cellar');
  assert.match(record.provenance, /correspondence Mara brought/);
  assert.doesNotMatch(state.scenes.at(-1).body, /correspondence Mara brought|Recovered on/);
  assert.equal(D.records.find((record) => record.id === 'cellar').requires[0], 'cellarDrained');
});

test('regional record recovery retains the revised specific field evidence', () => {
  const jobs = expansionMissions.filter((mission) => mission.id.endsWith('Quest2'));
  assert.equal(jobs.length, 8);
  for (const mission of jobs) {
    assert.doesNotMatch(mission.arrival, /recovering the resident is a separate task/);
    assert.match(mission.arrival, /records|notes|register|notebook|log|papers|ledger|plan/i);
    assert.equal(mission.choices[0].id, 'public');
    assert.equal(mission.choices[1].id, 'study');
  }
});

test('an old opening account migrates to the revised text without changing campaign progress', () => {
  const state = D.initial({ opening: 'legacy' });
  const old = [...revisedCopy].find(([text]) => text.startsWith('Mara introduced herself'));
  assert.ok(old);
  state.journal[0].text = old[0];
  const loaded = D.load(D.save(state));
  assert.equal(loaded.journal[0].text, playerCopy(old[1]));
  assert.equal(loaded.gold, state.gold);
  assert.deepEqual(loaded.flags, state.flags);
  assert.deepEqual(loaded.choices, state.choices);
});
