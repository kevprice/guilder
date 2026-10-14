import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as D from '../domain.js';
import * as G from '../guild-management.js';

// A restored-house checkpoint, with starter money/stocks and zero advanced materials.
// Room/blueprint discovery is the scenario premise, never a material or money grant.
export function progressionScenario() {
  let s = D.initial({ opening: 'legacy' });
  Object.assign(s.flags, { repaired: true, tower: true, garden: true, fenRoom1Ready: true });
  s.guild.blueprints = ['mill', 'tower'];
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  D.assignRoomWorker(s, 'service', 2, 'mara');
  D.assignRoomWorker(s, 'garden', 1, 'rowan');
  const stages = [];
  const tick = () => {
    s.eventSeed = 97;
    D.day(s);
    assert(s.day < 250, 'Progression must not stall');
  };
  const finish = () => {
    const previous = D.assignedRoom(s, 'bryn');
    D.assignRoomWorker(s, 'service', 0, 'bryn');
    while (s.guild.facilities.workshop.project) tick();
    D.assignRoomWorker(s, previous?.id || 'store', 0, 'bryn');
  };
  const fund = (recipe) => {
    for (let tries = 0; G.resourceShortfall(s, recipe).length; tries++) {
      assert(tries < 250, 'Resources must be reachable');
      const missing = G.resourceShortfall(s, recipe)[0];
      if (missing.resource === 'components') {
        craft('brassComponents');
        continue;
      }
      if (missing.resource === 'ore') {
        craft('recoverMetal');
        continue;
      }
      if (missing.resource === 'gold' && s.guild.supplies > 4) {
        D.sellResource(s, 'supplies', s.guild.supplies - 4);
        continue;
      }
      if (missing.resource === 'gold' || missing.resource === 'salvage') {
        D.assignRoomWorker(s, 'store', 0, 'bryn');
        if (missing.resource === 'gold' && s.guild.salvage > 4) {
          D.sellResource(s, 'salvage', s.guild.salvage - 4);
          continue;
        }
      } else {
        const room = { timber: 'corridor', cloth: 'quarters', aether: 'tower', herbs: 'fenRoom1' }[
          missing.resource
        ];
        assert(room, 'Every needed material must have a source');
        D.assignRoomWorker(
          s,
          room,
          0,
          missing.resource === 'cloth' || missing.resource === 'timber' ? 'rowan' : 'ivo',
        );
      }
      tick();
    }
  };
  const checkpoint = (recipe, uid) => {
    // Return temporary gatherers to ongoing production between orders.
    D.assignRoomWorker(s, 'garden', 1, 'rowan');
    D.assignRoomWorker(s, 'tower', 0, 'ivo');
    s = D.load(D.save(s));
    stages.push({
      recipe,
      uid,
      day: s.day,
      gold: s.gold,
      mastery: G.craftingProgress(s).name,
      designs: G.craftingProgress(s).count,
    });
  };
  const craft = (id) => {
    const recipe = G.projectRecipe(s, 'workshop', id, null);
    fund(recipe);
    D.startRoomProject(s, 'workshop', id);
    finish();
    const output = G.recipes.find((r) => r.id === id);
    const uid = output.furniture
      ? s.guild.furniture.at(-1).uid
      : output.item
        ? s.inventory.at(-1).uid
        : null;
    checkpoint(id, uid);
    return uid;
  };
  const upgrade = (id, uid) => {
    const recipe = G.projectRecipe(s, 'workshop', id, null);
    fund(recipe);
    D.startWorkshopConversion(s, id, uid);
    finish();
    checkpoint(id, uid);
  };
  const forge = craft('forge');
  upgrade('upgrade_reinforcedForge', forge);
  upgrade('upgrade_runeForge', forge);
  assert.equal(s.guild.furniture.find((i) => i.uid === forge).id, 'runeForge');
  D.placeFurniture(s, 'workshop', 'utility', forge);
  const sword = craft('shortSword');
  upgrade('refitSword', sword);
  upgrade('enchantHearthBlade', sword);
  D.enterStore(s, 'bryn');
  D.equipItem(s, 'bryn', sword);
  D.leaveStore(s);
  const beds = craft('raisedBeds');
  upgrade('upgrade_irrigatedBeds', beds);
  upgrade('upgrade_livingBeds', beds);
  if (s.guild.facilities.garden.project) D.cancelRoomProject(s, 'garden');
  D.placeFurniture(s, 'garden', 'utility', beds);
  const shelf = craft('materials_shelf');
  upgrade('upgrade_runeShelf', shelf);
  D.placeFurniture(s, 'room_tower', 'decoration0', shelf);
  const banner = craft('materials_banner');
  upgrade('upgrade_wardBanner', banner);
  D.placeFurniture(s, 'room_entrance', 'decoration0', banner);
  D.assignRoomWorker(s, 'entrance', 0, 'bryn');
  const plant = craft('materials_plant');
  upgrade('upgrade_verdantPlant', plant);
  D.placeFurniture(s, 'room_fenRoom1', 'decoration0', plant);
  assert.equal(G.craftingProgress(s).name, 'Guildwright');
  assert.equal(s.guild.nextFurniture, 5, 'Enhancements must not mint replacement furniture');
  assert.equal(s.nextItem, 1, 'Enhancements must not mint replacement equipment');
  assert.equal(s.missions.length, 0);
  assert(!s.flags.dragonSlain, 'Metal must be obtainable before the furnace boss');
  return { state: D.load(D.save(s)), stages, days: s.day - 1 };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { stages, days } = progressionScenario();
  console.log(JSON.stringify({ days, stages }, null, 2));
}
