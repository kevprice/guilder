import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { useStairs } from './movement.js';
import { gainLevel } from './classes.js';

function tick(s) {
  s.eventSeed = 97;
  D.day(s);
}
function rest(s) {
  while (s.roster.some((c) => c.status === 'injured')) tick(s);
}
function fund(s, n) {
  rest(s);
  while (s.gold < n) {
    if (s.gold < 10) D.emergency(s);
    if (!D.availableContracts(s).some((d) => d.id === 'road')) tick(s);
    D.dispatch(s, 'road', ['bryn'], true);
    while (s.missions.at(-1).status === 'travelling') tick(s);
    rest(s);
  }
}
function travel(
  s,
  id,
  choice,
  party = s.roster.filter((c) => c.status === 'home').map((c) => c.id),
) {
  const def = D.contracts.find((c) => c.id === id);
  fund(s, D.missionCost(s, def) + 10);
  D.dispatch(s, id, party, true);
  while (s.missions.at(-1).status === 'travelling') tick(s);
  const m = s.missions.at(-1);
  assert.equal(m.status, 'decision');
  // Every expedition is persisted while awaiting a decision.
  const restored = D.load(D.save(s));
  assert.deepEqual(restored, s);
  D.decide(s, m.uid, choice);
  assert.equal(m.status, 'resolved');
  rest(s);
}
function firstChapter() {
  const s = D.initial({ opening: 'legacy' });
  D.recruit(s, 'bryn');
  while (s.roster[0].str < 10) {
    rest(s);
    if (!D.availableContracts(s).some((d) => d.id === 'road')) tick(s);
    D.dispatch(s, 'road', ['bryn'], true);
    while (s.missions.at(-1).status === 'travelling') tick(s);
    rest(s);
    if (s.roster[0].str < 10 && D.unspentLevels(s.roster[0]).length) D.advance(s, 'bryn', 'str');
  }
  s.selected = 'bryn';
  D.interact(s, 'wall');
  D.interact(s, 'repair');
  D.interact(s, 'ledger');
  travel(s, 'anchor', 'safe', ['bryn']);
  s.selected = 'rowan';
  D.interact(s, 'inscription');
  return s;
}
function campaign(branch, settings = {}) {
  const s = firstChapter();
  D.narrativeChoice(s, 'landingPurpose', branch === 'community' ? 'welcome' : 'remember');
  D.recruit(s, 'ivo');
  D.recruit(s, 'nell');
  travel(s, 'navigator', branch === 'community' ? 'crew' : 'chart');
  if (settings.scholar) {
    fund(s, 60);
    D.dispatch(
      s,
      'outsideArchivist',
      s.roster.filter((c) => c.status === 'home').map((c) => c.id),
      true,
    );
    while (s.missions.at(-1).status === 'travelling') tick(s);
    rest(s);
    assert(s.flags.archiveAssistance);
    assert(s.roster.find((c) => c.id === 'ivo').skills.includes('literacy'));
  } else {
    while (s.roster.find((c) => c.id === 'ivo').level < 2) {
      fund(s, 20);
      if (!D.availableContracts(s).some((d) => d.id === 'road')) tick(s);
      D.dispatch(s, 'road', ['bryn', 'ivo'], true);
      while (s.missions.at(-1).status === 'travelling') tick(s);
      rest(s);
    }
    assert(s.roster.find((c) => c.id === 'ivo').skills.includes('literacy'));
  }
  if (settings.paths)
    for (const [id, path] of Object.entries(settings.paths)) {
      const c = s.roster.find((c) => c.id === id);
      while (c.level < 3) {
        fund(s, 20);
        if (!D.availableContracts(s).some((d) => d.id === 'road')) tick(s);
        D.dispatch(
          s,
          'road',
          ['bryn', id].filter((v, i, a) => a.indexOf(v) === i),
          true,
        );
        while (s.missions.at(-1).status === 'travelling') tick(s);
        rest(s);
      }
      D.specialise(s, id, path);
      const root = D.availableTalents(c).filter((t) => t.level === 3)[settings.right ? 1 : 0];
      D.learnTalent(s, id, root.id);
      for (const level of D.unspentLevels(c).filter((l) => l < 3)) D.advance(s, id, 'end', level);
    }
  s.selected = 'ivo';
  fund(s, 110);
  D.repairRoom(s, 'library');
  D.narrativeChoice(s, 'archive', branch === 'community' ? 'open' : 'study');
  travel(s, 'orchard', branch === 'community' ? 'return' : 'study');
  fund(s, 150);
  D.repairRoom(s, 'garden');
  assert.throws(() =>
    D.narrativeChoice(s, 'gardenUse', branch === 'community' ? 'laboratory' : 'hospice'),
  );
  D.narrativeChoice(s, 'gardenUse', branch === 'community' ? 'hospice' : 'laboratory');
  travel(s, 'lens', branch === 'community' ? 'witness' : 'record');
  fund(s, 180);
  D.repairRoom(s, 'observatory');
  D.narrativeChoice(s, 'observatoryUse', branch === 'community' ? 'listen' : 'measure');
  travel(s, 'witness', branch === 'community' ? 'publish' : 'private');
  return s;
}

test('stairs always reach the dry landing; water is a separate gate; return works from lower stair foot', () => {
  const opts = { repaired: true, water: false, selected: 'bryn', anchor: false };
  const down = useStairs({ x: 505, y: 380 }, 'down', opts);
  assert.deepEqual(down, { x: 535, y: 510 });
  assert.match(useStairs(down, 'down', opts).error, /Water breathing/);
  assert.deepEqual(useStairs({ x: 580, y: 555 }, 'up', opts), { x: 505, y: 380 });
  assert.deepEqual(useStairs(down, 'down', { ...opts, water: true }), { x: 570, y: 555 });
  assert.match(
    useStairs({ x: 505, y: 380 }, 'down', { ...opts, repaired: false }).error,
    /collapsed/,
  );
  assert.match(
    useStairs({ x: 505, y: 380 }, 'down', { ...opts, selected: 'rowan' }).error,
    /binding/,
  );
});
test('authored content references and prerequisite graph are valid', () =>
  assert.deepEqual(D.validateContent(), []));
test('full community campaign: lasting policies, room boundaries, personal developments and freedom', () => {
  const s = campaign('community');
  assert(s.flags.hospice);
  assert(s.community >= 3);
  assert.equal(D.worldBoundary(s), 2400);
  for (const [id, choice] of [
    ['brynPast', 'apprentice'],
    ['nellPast', 'open'],
    ['ivoPast', 'home'],
  ]) {
    const def = D.contracts.find((m) => m.id === id);
    const c = s.roster.find((c) => c.id === def.personal);
    while (c.visits < 2) {
      if (!D.availableContracts(s).some((d) => d.id === 'road')) tick(s);
      D.dispatch(
        s,
        'road',
        ['bryn', c.id].filter((v, i, a) => a.indexOf(v) === i),
        true,
      );
      tick(s);
      rest(s);
    }
    travel(s, id, choice);
    assert(c.traits.length);
    assert(c.bond > 0);
    assert(s.flags[c.id + 'Resolved']);
  }
  const initialBond = s.roster.find((c) => c.id === 'nell').bond;
  D.narrativeChoice(s, 'nellAfter', 'together');
  assert.equal(s.roster.find((c) => c.id === 'nell').bond, initialBond + 1);
  assert.throws(() => D.narrativeChoice(s, 'nellAfter', 'alone'));
  travel(s, 'covenant', 'commons');
  assert(!D.availableContracts(s).some((m) => m.id === 'lattice'));
  fund(s, 220);
  s.selected = 'rowan';
  D.repairRoom(s, 'threshold');
  D.narrativeChoice(s, 'release', 'home');
  assert(!s.flags.free);
  assert.equal(D.finish(s), true);
  assert.equal(D.finish(s), false);
  assert(s.flags.free);
  assert.match(s.scenes.at(-1).body, /Nell walks/);
  assert.deepEqual(D.load(D.save(s)), s);
});
test('research branch: choices exclude opposite room uses and final methods', () => {
  const s = campaign('research');
  assert(s.flags.laboratory);
  assert(!s.flags.hospice);
  assert(s.knowledge >= 4);
  assert.equal(
    D.missionCost(
      s,
      D.contracts.find((m) => m.id === 'lattice'),
    ),
    100,
  );
  travel(s, 'lattice', 'residents');
  fund(s, 220);
  D.repairRoom(s, 'threshold');
  s.selected = 'ivo';
  assert.throws(() => D.narrativeChoice(s, 'release', 'return'), /Rowan/);
  s.selected = 'rowan';
  D.narrativeChoice(s, 'release', 'return');
  D.finish(s);
  assert(s.flags.endingReturn);
  assert(!s.flags.endingHome);
});
test('final recovery route remains open with no relationship or optional personal quest', () => {
  const s = campaign('research');
  s.community = 0;
  s.knowledge = 0;
  delete s.flags.laboratory;
  assert(D.availableContracts(s).some((m) => m.id === 'lattice'));
  assert(!D.availableContracts(s).some((m) => m.id === 'covenant'));
  assert.equal(
    D.missionCost(
      s,
      D.contracts.find((m) => m.id === 'lattice'),
    ),
    140,
  );
});
test('personal missions require the resident; research callbacks reflect earlier decisions', () => {
  const s = firstChapter();
  assert.throws(() => D.dispatch(s, 'brynPast', ['ivo']));
  assert.match(D.missionLetter(s, 'navigator'), /keeper’s sailcloth/);
  s.flags.voiceHeard = true;
  assert.match(D.missionLetter(s, 'navigator'), /mother’s voice/);
  D.recruit(s, 'nell');
  if (!D.availableContracts(s).some((d) => d.id === 'road')) tick(s);
  D.dispatch(s, 'road', ['bryn', 'nell']);
  tick(s);
  // Faster opening access no longer implies that Bryn has reached the personal-story gate.
  const personal = D.contracts.find((m) => m.id === 'brynPast');
  while (s.roster[0].level < (personal.minLevel || 4)) gainLevel(s.roster[0]);
  assert.throws(() => D.dispatch(s, 'brynPast', ['nell']), /Bryn must/);
});
test('v1 campaigns migrate without losing an existing decision, roster or progression', () => {
  const s = firstChapter();
  s.version = 1;
  delete s.choices;
  delete s.community;
  delete s.knowledge;
  delete s.scenes;
  for (const c of s.roster) {
    delete c.visits;
    delete c.bond;
    delete c.traits;
    delete c.memories;
  }
  const migrated = D.load(JSON.stringify(s));
  assert.equal(migrated.version, 2);
  assert(migrated.flags.inscription);
  assert.equal(migrated.gold, s.gold);
  assert.equal(
    migrated.roster[0].visits,
    s.missions.filter((m) => m.status === 'resolved' && m.party.includes('bryn')).length,
  );
  assert(D.availableContracts(migrated).some((m) => m.id === 'navigator'));
  assert.deepEqual(D.load(D.save(migrated)), migrated);
});
test('conflicting saves are rejected and pending preparations cannot double-dispatch', () => {
  const s = campaign('community');
  fund(s, 500);
  D.dispatch(s, 'covenant', ['bryn']);
  assert.throws(() => D.dispatch(s, 'lattice', ['ivo']), /already underway/);
  const bad = JSON.parse(D.save(s));
  bad.missions.push({ ...bad.missions.at(-1), uid: 'duplicate' });
  assert.throws(() => D.load(JSON.stringify(bad)), /conflicting/);
});
test('hospice reduces later injuries; obsolete dialogues retire; missing residents are not invented', () => {
  const s = campaign('community');
  const c = s.roster.find((c) => c.id === 'bryn');
  assert(!D.availableChoices(s, 'bryn').some((n) => n.id === 'brynStart'));
  const without = D.load(D.save(s));
  delete without.flags.hospice;
  D.dispatch(s, 'fragments', ['bryn']);
  s.seed = 1;
  tick(s);
  assert.equal(c.recovery, 3);
  D.dispatch(without, 'fragments', ['bryn']);
  without.seed = 1;
  D.day(without);
  assert.equal(without.roster.find((c) => c.id === 'bryn').recovery, 4);
  s.roster = s.roster.filter((c) => c.id !== 'nell');
  assert.match(D.missionLetter(s, 'covenant'), /A recovering greenhouse patient asks/);
  assert.doesNotMatch(D.missionLetter(s, 'covenant'), /Nell asks/);
  const bad = JSON.parse(D.save(s));
  bad.scenes = [{ title: 'broken', body: null }];
  assert.throws(() => D.load(JSON.stringify(bad)), /campaign data/);
});
test('a legacy pending anchor decision retains its committed roll and resolves once after migration', () => {
  const s = firstChapter();
  delete s.flags.anchor;
  s.missions = s.missions.filter((m) => m.id !== 'anchor');
  delete s.choices['mission:anchor'];
  D.dispatch(s, 'anchor', ['bryn']);
  while (s.missions.at(-1).status === 'travelling') {
    s.seed = 100;
    tick(s);
  }
  const roll = s.missions.at(-1).roll;
  s.version = 1;
  delete s.choices;
  delete s.community;
  delete s.knowledge;
  delete s.scenes;
  for (const c of s.roster) {
    delete c.visits;
    delete c.bond;
    delete c.traits;
    delete c.memories;
  }
  const migrated = D.load(JSON.stringify(s)),
    m = migrated.missions.at(-1);
  assert.equal(m.status, 'decision');
  assert.equal(m.roll, roll);
  D.decide(migrated, m.uid, 'deep');
  const gold = migrated.gold;
  assert.throws(() => D.decide(migrated, m.uid, 'safe'));
  assert.equal(migrated.gold, gold);
  assert(migrated.flags.voiceHeard);
});

test('a Water breather drains the cellar permanently and opens it to other residents', () => {
  const s = D.initial({ opening: 'legacy' });
  s.gold = 500;
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  s.flags.repaired = true;
  D.interact(s, 'stairs');
  s.selected = 'bryn';
  const before = D.save(s);
  assert.throws(() => D.interact(s, 'drain'), /Water breathing/);
  assert.equal(D.save(s), before);
  const ivo = s.roster.find((c) => c.id === 'ivo');
  ivo.level = 3;
  ivo.points = 1;
  D.advance(s, 'ivo', 'water');
  s.selected = 'ivo';
  D.interact(s, 'drain');
  assert(s.flags.cellarDrained);
  const saved = D.load(D.save(s));
  const gold = saved.gold,
    count = saved.journal.length;
  assert.throws(() => D.interact(saved, 'drain'), /already drained/);
  assert.equal(saved.gold, gold);
  assert.equal(saved.journal.length, count);
  assert.deepEqual(
    useStairs({ x: 535, y: 510 }, 'down', {
      repaired: true,
      water: false,
      selected: 'bryn',
      drained: saved.flags.cellarDrained,
    }),
    { x: 570, y: 555 },
  );
  assert.deepEqual(
    useStairs({ x: 505, y: 380 }, 'down', {
      repaired: true,
      water: false,
      selected: 'rowan',
      anchor: false,
      drained: true,
    }),
    { x: 535, y: 510 },
  );
  saved.selected = 'bryn';
  D.interact(saved, 'cellar');
  assert(saved.flags.cellar);
});

for (const [index, paths] of Array.from({ length: 8 }, (_, i) => ({
  bryn: i & 1 ? 'paladin' : 'barbarian',
  ivo: i & 2 ? 'healer' : 'necromancer',
  nell: i & 4 ? 'archer' : 'thief',
})).entries())
  for (const right of [false, true])
    test(
      'complete ending with archivist assistance: class combination ' +
        index +
        ' · ' +
        (right ? 'right' : 'left') +
        ' skill choices',
      () => {
        const ending = right ? 'community' : 'research',
          s = campaign(ending, { scholar: true, paths, right });
        assert(s.flags.archiveAssistance);
        assert(s.roster.find((c) => c.id === 'ivo').skills.includes('literacy'));
        travel(
          s,
          ending === 'community' ? 'covenant' : 'lattice',
          ending === 'community' ? 'commons' : 'residents',
        );
        fund(s, 220);
        s.selected = 'rowan';
        D.repairRoom(s, 'threshold');
        D.narrativeChoice(s, 'release', ending === 'community' ? 'home' : 'return');
        D.finish(s);
        assert(s.flags.free);
        assert.deepEqual(D.load(D.save(s)), s);
      },
    );
