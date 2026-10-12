import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
function early() {
  const s = D.initial();
  s.gold = 500;
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  D.recruit(s, 'nell');
  s.flags.breach = true;
  s.flags.stairs = true;
  s.flags.searched_crypt = true;
  s.roster[0].str = 10;
  s.selected = 'bryn';
  D.discoverSleeper(s, 'oren');
  D.awaken(s, 'oren');
  D.narrativeChoice(s, 'orenRemember', 'choice');
  return s;
}
test('the quoted early state explains the repair and does not introduce undiscovered house wings', () => {
  const s = early(),
    story = D.currentInvestigation(s);
  assert.equal(story.title, 'Make the service room safe');
  assert.match(story.summary, /Fallen timber|loose masonry/);
  assert.match(story.next, /70 gold/);
  const leads = D.optionalHouseLeads(s);
  assert.ok(!leads.some((l) => /tower|labyrinth|thread/i.test(l.title + ' ' + l.text)));
  assert.ok(!D.knownHistory(s).some((e) => /archive|Sera|threshold/i.test(e.title + ' ' + e.text)));
});
test('resident accounts distinguish motives and reveal personal evidence only when encountered', () => {
  const s = early(),
    bryn = s.roster[0],
    ivo = s.roster[1],
    nell = s.roster[2];
  bryn.visits = ivo.visits = 1;
  assert.match(D.characterArc(s, bryn), /father/);
  assert.match(D.characterArc(s, ivo), /Ada/);
  assert.match(D.characterArc(s, nell), /families/);
  assert.doesNotMatch(D.characterArc(s, bryn), /recognised.*mark/);
  s.flags.anchor = true;
  D.narrativeChoice(s, 'brynAnchor', 'promise');
  assert.match(D.characterArc(s, bryn), /recognised.*mason mark/);
  assert.match(D.characterRecap(s, 'oren').text, /Mara orders timber/);
  assert.doesNotMatch(
    D.characterArc(s, s.roster[3]),
    /term of service|own name in the new register/,
  );
});
test('a pending story journey produces a return estimate or report action instead of a duplicate dispatch prompt', () => {
  const s = early();
  s.flags.repaired = true;
  s.flags.ledger = true;
  D.dispatch(s, 'anchor', ['bryn'], true);
  assert.match(D.currentInvestigation(s).next, /due back in 2 days/);
  D.day(s);
  D.day(s);
  assert.match(D.currentInvestigation(s).next, /Read it in Contracts/);
  D.decide(s, s.missions[0].uid, 'safe');
  assert.match(D.currentInvestigation(s).next, /Control Rowan/);
});
test('old saved placeholder memories do not become the current story or conversation recap', () => {
  const s = early();
  s.roster[3].memories.push({
    day: 1,
    text: 'Oren writes their own name in the new register. There is no term of service beneath it.',
  });
  const restored = D.load(D.save(s));
  assert.doesNotMatch(D.characterArc(restored, restored.roster[3]), /term of service/);
  assert.match(D.characterRecap(restored, 'oren').text, /timber/);
  assert.equal(restored.gold, s.gold);
  assert.deepEqual(restored.choices, s.choices);
});
