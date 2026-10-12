import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { missionTabs, missionCategory, missionImpact } from './mission-categories.js';
const mission = (id) => D.contracts.find((def) => def.id === id);
test('mission tabs distinguish plot progress from paid work and optional hunts', () => {
  for (const id of [
    'anchor',
    'navigator',
    'witness',
    'covenant',
    'lattice',
    'wallSurvey',
    'masonTools',
    'cellarTimber',
    'outsideArchivist',
  ]) {
    assert(mission(id), id);
    assert.equal(missionCategory(mission(id)), 'main', id);
    assert.match(missionImpact(mission(id)).impact, /Advances the main plot/);
  }
  for (const id of ['road', 'quarry']) {
    assert.equal(missionCategory(mission(id)), 'work');
    assert.match(missionImpact(mission(id)).impact, /does not advance/);
  }
  assert.equal(missionCategory(mission('brynPast')), 'companion');
  assert.equal(missionCategory(mission('fenQuest0')), 'regional');
  assert.equal(missionCategory(mission('fenBounty')), 'optional');
  assert.match(missionImpact(mission('fenBounty')).detail, /High-risk paid adventure/);
  assert.equal(missionCategory(mission('ghost')), 'defence');
  assert.equal(missionCategory(mission('lostGoat')), 'optional');
});
test('every mission belongs to exactly one named tab and describes its plot impact', () => {
  const types = missionTabs.map(([id]) => id).filter((id) => id !== 'all');
  for (const def of D.contracts) {
    assert(types.includes(missionCategory(def)), def.id);
    assert(missionImpact(def).impact.length, def.id);
    assert(missionImpact(def).detail.length, def.id);
    if (def.internal && !def.homeEvent) assert.equal(missionCategory(def), 'exploration');
  }
});
