import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { talents, hasTalent, classWorkFactor } from './classes.js';
import { assessContract, profiles } from './contracts.js';
const effectHandlers = new Set([
  'work',
  'physical',
  'magical',
  'undead',
  'injuryWork',
  'deathWard',
  'partyDeathWard',
  'str',
  'agi',
  'heal',
  'mend',
  'raise',
  'echo',
  'zombieWork',
  'loot',
  'retreat',
]);
test('every talent has a supported effect and every passive combat talent changes an actual contract assessment', () => {
  for (const t of talents) {
    assert(Object.keys(t.effects).length, t.id);
    for (const key of Object.keys(t.effects)) assert(effectHandlers.has(key), t.id + ' / ' + key);
    const c = {
      id: 'test',
      type: D.classes[t.branch].base,
      specialisation: t.branch,
      level: 18,
      str: 3,
      agi: 3,
      int: 3,
      end: 3,
      skills: [],
      talents: [],
      status: 'home',
      injury: 0,
    };
    for (const [kind, id] of Object.entries({
      physical: 'quarry',
      magical: 'lattice',
      undead: 'ghost',
    }))
      if (t.effects[kind]) {
        const def = D.contracts.find((d) => d.id === id),
          before = assessContract(def, [c]);
        c.talents = [t.id];
        assert(assessContract(def, [c]).threat < before.threat, t.id);
        c.talents = [];
      }
    if (t.effects.work || t.effects.zombieWork) {
      const def = D.contracts.find((d) => d.id === 'quarry'),
        z = { ...c, id: 'z', undead: true };
      const party = t.effects.zombieWork ? [c, z] : [c];
      const before = assessContract(def, party).rate;
      c.talents = [t.id];
      assert(assessContract(def, party).rate > before, t.id);
    }
    for (const stat of ['str', 'agi'])
      if (t.effects[stat]) {
        c.talents = [];
        const def = D.contracts.find((d) => profiles[d.id].stat === stat),
          before = assessContract(def, [c]).combined;
        c.talents = [t.id];
        assert(assessContract(def, [c]).combined > before, t.id);
      }
    if (t.effects.injuryWork) {
      c.injury = 2;
      c.talents = [t.id];
      assert.equal(classWorkFactor(c), 1);
    }
    for (const key of ['raise', 'echo', 'retreat', 'deathWard', 'partyDeathWard'])
      if (t.effects[key]) {
        c.injury = 0;
        c.talents = [t.id];
        assert(hasTalent(c, key), t.id);
      }
  }
});
test('all foundation skills have a contract use or a tested story gate; zombie abilities are not cosmetic', () => {
  for (const skill of [
    'guard',
    'tracking',
    'literacy',
    'water',
    'stoneSong',
    'echoSight',
    'threadwalk',
  ])
    assert(
      Object.values(profiles).some((p) => p.skills[skill] > 0),
      skill,
    );
  const c = {
    id: 'z',
    type: 'warrior',
    undead: true,
    str: 10,
    end: 10,
    int: 2,
    agi: 2,
    skills: [],
    injury: 0,
  };
  const def = D.contracts.find((d) => d.id === 'quarry'),
    base = assessContract(def, [c]);
  c.skills = ['undeadLabour', 'graveEndurance'];
  const active = assessContract(def, [c]);
  assert(active.rate > base.rate);
  assert(active.threat < base.threat);
});
test('Anchor sight and Stone song affect story interactions rather than only descriptions', () => {
  const s = D.initial({ opening: 'legacy' });
  s.gold = 100;
  s.flags = { threshold: true, prepared: true };
  assert.throws(() => D.narrativeChoice(s, 'release', 'home'), /Anchor sight/);
  s.flags.observatoryRead = true;
  D.narrativeChoice(s, 'release', 'home');
  assert(s.flags.gateOpen);
  const q = D.initial({ opening: 'legacy' });
  q.gold = 500;
  D.recruit(q, 'bryn');
  q.roster[0].skills = ['stoneSong'];
  q.flags.anchor = true;
  const gold = q.gold;
  D.interact(q, 'tower');
  assert.equal(q.gold, gold - 40);
});
