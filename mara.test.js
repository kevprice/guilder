import test from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { playerCopy } from './player-copy.js';
import { maraDialogue } from './mara.js';

test('Mara is introduced as a golem and can be spoken to without advancing time', () => {
  const state = D.initial();
  assert.match(state.journal[0].text, /brass golem/);
  const before = D.save(state);
  D.interact(state, 'mara');
  assert.match(state.scenes.at(-1).body, /I chose you, Rowan/);
  state.scenes.pop();
  assert.equal(D.save(state), before);
});

test('existing Mara descriptions migrate to the familiar identity', () => {
  assert.match(playerCopy('Mara is Halden’s adopted daughter.'), /brass golem/);
  assert.match(playerCopy('“Halden raised me,” she said.'), /built me, then raised me/);
});

test('Mara recognises Rowan’s release', () => {
  const state = D.initial();
  state.flags.gateOpen = true;
  assert.match(maraDialogue(state).body, /anchors are holding/);
  assert.equal(D.finish(state), true);
  assert.match(maraDialogue(state).body, /Go where you like/);
});
