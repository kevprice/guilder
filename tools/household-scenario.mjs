import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as D from '../domain.js';
import * as G from '../guild-management.js';
export function householdScenario() {
  let s = D.initial();
  D.assignRoomWorker(s, 'service', 2, 'mara');
  const stages = [];
  const tick = () => {
    if (D.pendingOrders(s).length) D.orderExpedition(s, D.pendingOrders(s)[0].uid, 'guard');
    s.eventSeed = 97;
    D.day(s);
    assert(s.day < 160, 'Economy must not stall');
  };
  const checkpoint = (label) => {
    s = D.load(D.save(s));
    stages.push({
      label,
      day: s.day,
      gold: s.gold,
      horns: D.resourceStock(s, 'briarHorn'),
      rank: D.craftingProgress(s).name,
    });
  };
  D.assignRoomWorker(s, 'service', 0, 'bryn');
  D.assignRoomWorker(s, 'garden', 0, 'rowan');
  D.assignRoomWorker(s, 'tower', 0, 'ivo');
  D.assignRoomWorker(s, 'quarters', 0, 'nell');
  const scout = D.dispatchExpedition(s, 'briarHollow', 'scout', ['nell']);
  while (D.activeExpeditions(s).some((o) => o.uid === scout)) tick();
  assert.equal(s.outside.operations[0].outcome, 'scouted');
  checkpoint('Reconnaissance returned');
  D.startResearch(s, 'briarStag');
  while (s.outside.research) tick();
  checkpoint('Creature researched');
  const finish = () => {
    const before = D.assignedRoom(s, 'bryn');
    D.assignRoomWorker(s, 'service', 0, 'bryn');
    while (s.guild.facilities.workshop.project) tick();
    D.assignRoomWorker(s, before?.id || 'service', 0, 'bryn');
  };
  const fund = (recipe) => {
    for (let i = 0; G.resourceShortfall(s, recipe).length; i++) {
      assert(i < 80);
      const missing = G.resourceShortfall(s, recipe)[0];
      if (missing.resource === 'components') {
        craft('brassComponents');
        continue;
      }
      if (missing.resource === 'ore') {
        craft('recoverMetal');
        continue;
      }
      if (missing.resource === 'gold') {
        if (s.guild.supplies > 4) {
          D.sellResource(s, 'supplies', s.guild.supplies - 4);
        } else {
          s.eventSeed = 97;
          D.emergency(s);
        }
        continue;
      }
      if (missing.resource === 'salvage') D.assignRoomWorker(s, 'store', 0, 'bryn');
      else {
        const room = {
          timber: 'corridor',
          cloth: 'quarters',
          aether: 'tower',
          herbs: 'towerCrown',
        }[missing.resource];
        assert(room, 'Every ingredient must have an economic source');
        D.assignRoomWorker(
          s,
          room,
          0,
          missing.resource === 'aether' ? 'ivo' : missing.resource === 'timber' ? 'rowan' : 'nell',
        );
      }
      tick();
    }
  };
  const craft = (id) => {
    fund(G.projectRecipe(s, 'workshop', id));
    D.startRoomProject(s, 'workshop', id);
    finish();
    const r = D.recipes.find((r) => r.id === id);
    return r.furniture ? s.guild.furniture.at(-1).uid : r.item ? s.inventory.at(-1).uid : null;
  };
  const upgrade = (id, uid) => {
    fund(G.projectRecipe(s, 'workshop', id, null));
    D.startWorkshopConversion(s, id, uid);
    finish();
  };
  craft('flamePreparation');
  checkpoint('Counter preparation crafted');
  const hunt = D.dispatchExpedition(s, 'briarHollow', 'assault', ['bryn', 'ivo', 'nell'], {
    fire: true,
    medical: true,
  });
  while (D.activeExpeditions(s).some((o) => o.uid === hunt)) tick();
  assert.equal(s.outside.operations.find((o) => o.uid === hunt).outcome, 'success');
  assert.equal(D.resourceStock(s, 'briarHorn'), 1);
  checkpoint('Horn hunt completed');
  const forge = craft('forge');
  upgrade('upgrade_reinforcedForge', forge);
  upgrade('upgrade_runeForge', forge);
  checkpoint('Runic forge established');
  upgrade('hornboundForge', forge);
  D.placeFurniture(s, 'workshop', 'utility', forge);
  checkpoint('Horn invested in the original forge');
  assert.equal(s.guild.nextFurniture, 1);
  assert.equal(D.resourceStock(s, 'briarHorn'), 0);
  assert.equal(s.guild.furniture.find((i) => i.uid === forge).id, 'hornboundForge');
  assert.equal(s.missions.length, 0);
  assert(!s.flags.truth);
  assert(!s.flags.dragonSlain);
  return { state: s, stages, days: s.day - 1 };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { stages, days } = householdScenario();
  console.log(JSON.stringify({ days, stages }, null, 2));
}
