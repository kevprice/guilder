import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { questRewards, renderQuestReward } from './quest-rewards.js';
const esc = (value) => String(value).replaceAll('<', '&lt;').replaceAll('"', '&quot;');
function guild() {
  const s = D.initial();
  D.recruit(s, 'ivo');
  s.selected = 'ivo';
  s.flags.tower = true;
  return s;
}
function enter(s, id) {
  const p = D.passages.find((p) => p.id === id);
  D.enterPassage(s, id, { x: p.x, floor: p.y });
}
test('Maelin can be discovered in the tower before finding the diagram, but cannot yet be freed', () => {
  const s = guild();
  D.visitFloor(s, -100);
  D.discoverSleeper(s, 'maelin');
  assert(s.flags.found_maelin);
  assert(!s.flags.searched_potions);
  assert.match(s.scenes.at(-1).body, /She has been trapped here/);
  assert.throws(() => D.awaken(s, 'maelin'), /release diagram/);
  enter(s, 'studyDoor');
  D.investigateChamber(s, 'study');
  enter(s, 'shelfStair');
  D.investigateChamber(s, 'potions');
  const notice = s.scenes.find((scene) => scene.questReward === 'bellWardDiagram');
  assert(notice);
  assert.match(notice.title, /Bell ward release diagram/);
  D.awaken(s, 'maelin');
  assert(s.roster.find((c) => c.id === 'maelin').skills.includes('echoSight'));
  assert.deepEqual(D.load(D.save(s)), s);
});
test('the quest reward explains the connection and is distinct from equipable treasure', () => {
  const html = renderQuestReward('bellWardDiagram', { esc });
  assert.match(html, /role="img"/);
  assert.match(html, /Quest item recovered/);
  assert.match(html, /Maelin is the woman frozen beside the bell/);
  assert.match(html, /cancellation stroke/);
  assert.match(html, /Control Ivo/);
  assert.match(html, /Maelin joins with Echo sight/);
  assert.doesNotMatch(html, /equip it in the store room/);
  assert(questRewards.bellWardDiagram.description.includes('separate sheet'));
});
test('players who already searched the potion kitchen can reopen the diagram without duplicating gear', () => {
  const s = guild();
  s.flags.searched_potions = true;
  const gold = s.gold;
  const inventory = s.inventory.length;
  D.showBellWardDiagram(s);
  D.showBellWardDiagram(s);
  assert.equal(s.scenes.at(-1).questReward, 'bellWardDiagram');
  assert.equal(s.inventory.length, inventory);
  assert.equal(s.gold, gold);
  assert.deepEqual(D.load(D.save(s)), s);
});
test('the release diagram is unavailable before searching and invalid saved reward ids are rejected', () => {
  const s = guild();
  assert.throws(() => D.showBellWardDiagram(s), /cooling tiles/);
  s.scenes.push({ title: 'Invalid', body: 'Invalid', questReward: 'not-a-reward' });
  assert.throws(() => D.load(D.save(s)), /campaign data/);
});
