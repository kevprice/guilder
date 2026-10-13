import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as D from './domain.js';
import { roomProduction, productionBadge } from './production-view.js';
import { productionBadgeAt } from './production-art.js';
import {
  renderRoomDashboard,
  renderRoomInspector,
  renderCrafting,
  renderStores,
  renderPatternRewards,
} from './management-ui.js';
import { renderNavigation } from './interface-navigation.js';
import { navigationNotices, acknowledgeNavigation } from './navigation-notices.js';
import { resources } from './guild-economy.js';

const helpers = {
  esc: (s) => String(s).replaceAll('<', '&lt;').replaceAll('"', '&quot;'),
  card: (t, b) => `<h3>${t}</h3>${b}`,
  btn: (t, a, d) => `<button data-action="${a}" ${d ? 'disabled' : ''}>${t}</button>`,
};
const reload = (s) => D.load(D.save(s));
function guild() {
  const s = D.initial();
  s.flags.repaired = s.flags.wallSurveyed = s.flags.tower = s.flags.garden = s.flags.hospice = true;
  s.gold = 500;
  D.recruit(s, 'bryn');
  D.recruit(s, 'ivo');
  for (const m of D.materials) s.guild.house.materials[m.id] = 12;
  return s;
}
const tick = (s, n = 1) => {
  for (let i = 0; i < n; i++) {
    s.eventSeed = 97;
    D.day(s);
  }
};

test('room rates use discrete batch timing and distinguish daily averages from work and partial progress', () => {
  const s = guild();
  s.roster[0].str = 20;
  D.assignRoomWorker(s, 'corridor', 0, 'bryn');
  const p = roomProduction(s, 'corridor');
  assert.equal(p.work, 3);
  assert.equal(p.cycleDays, 2);
  assert.equal(p.average, 1);
  assert.equal(p.nextDays, 2);
  assert.equal(p.rate, '2 timber / 2 days');
  tick(s);
  assert.equal(roomProduction(s, 'corridor').nextDays, 1);
  tick(s);
  assert.equal(roomProduction(s, 'corridor').progress, 0);
  assert.equal(s.guild.house.materials.timber, 14);
});
test('garden rates include Mara, tiers and reserves, and gathering rates pause for absent crew', () => {
  const s = guild();
  assert.equal(roomProduction(s, 'garden').rate, '2 supplies / 4 days');
  D.assignRoomWorker(s, 'garden', 0, 'ivo');
  s.roster[1].int = 20;
  D.upgradeFacility(s, 'garden');
  assert.equal(roomProduction(s, 'garden').average, 2);
  D.setGardenPolicy(s, 'reserve', 2);
  assert.equal(roomProduction(s, 'garden').average, 0);
  assert.equal(roomProduction(s, 'garden').status, 'paused');
  D.assignRoomWorker(s, 'corridor', 0, 'bryn');
  tick(s);
  D.dispatch(s, 'survey_mill', ['bryn']);
  const p = roomProduction(s, 'corridor');
  assert.equal(p.average, 0);
  assert.equal(p.nextDays, null);
  assert.equal(p.progress, 1);
  assert.equal(p.status, 'paused');
});
test('production cards prioritise active rooms, filter and search them, and inspectors show useful rates', () => {
  const s = guild();
  s.roster[0].str = 20;
  D.assignRoomWorker(s, 'corridor', 0, 'bryn');
  const html = renderRoomDashboard(s, helpers);
  assert(html.indexOf('workplace:corridor') < html.indexOf('workplace:entrance'));
  assert.match(html, /2 timber \/ 2 days/);
  const filtered = renderRoomDashboard(s, helpers, {
    roomFilter: 'working',
    roomSearch: 'corridor',
  });
  assert.match(filtered, /workplace:corridor/);
  assert.doesNotMatch(filtered, /workplace:garden/);
  const inspector = renderRoomInspector(s, helpers, 'corridor');
  assert.match(inspector, /Average 1 timber per game day/);
  assert.match(inspector, /Ready in 2 days/);
  assert.match(inspector, /Service corridor worker 1/);
  assert.match(inspector, /material:timber/);
  assert.match(renderRoomInspector(s, helpers, 'hospice'), /No injured companions/);
});
test('workshop summaries name material output and queued projects wait for missing inputs', () => {
  const s = guild();
  D.startRoomProject(s, 'workshop', 'brassComponents');
  const p = roomProduction(s, 'service');
  assert.equal(p.resource, 'components');
  assert.equal(p.amount, 2);
  assert.equal(p.rate, '2 brass components / 4 days');
  D.cancelRoomProject(s, 'workshop');
  s.guild.house.materials.ore = 0;
  D.queueWorkshopOrder(s, 'brassComponents');
  assert.equal(roomProduction(s, 'service').status, 'paused');
  assert.match(roomProduction(s, 'service').reason, /materials/);
});
test('stores explain uses, stock, links and sale value without mutating the guild', () => {
  const s = guild(),
    before = D.save(s),
    html = renderStores(s, helpers, { materialId: 'ore', saleQuantity: 3 });
  assert.match(html, /Forges weapons and armour/);
  assert.match(html, /12 in storage/);
  assert.match(html, /2 gold each/);
  assert.match(html, /Sell for 6g/);
  assert.match(html, /recipeOpen:materials_shortSword/);
  assert.match(html, /Mara upgrades/);
  assert.equal(D.save(s), before);
});
test('sales remove exact stock, add one itemized gold payment and survive save/load', () => {
  let s = guild(),
    stock = s.guild.house.materials.ore,
    gold = s.gold;
  D.sellResource(s, 'ore', 3);
  assert.equal(s.guild.house.materials.ore, stock - 3);
  assert.equal(s.gold, gold + 6);
  assert.match(s.transactions[0].text, /Sold 3 ore/);
  s = reload(s);
  assert.equal(s.guild.house.materials.ore, stock - 3);
  assert.equal(s.gold, gold + 6);
  D.sellResource(s, 'supplies', 2);
  assert.equal(s.guild.supplies, 2);
  assert.equal(s.gold, gold + 12);
});
test('invalid sales fail atomically and purchasing then selling cannot create gold', () => {
  const s = guild(),
    before = D.save(s);
  for (const [id, n] of [
    ['ore', 0],
    ['ore', -1],
    ['ore', 0.5],
    ['ore', 13],
    ['gold', 1],
    ['fake', 1],
    ['ore', Number.MAX_SAFE_INTEGER],
  ])
    assert.throws(() => D.sellResource(s, id, n));
  assert.equal(D.save(s), before);
  for (const id of ['salvage', 'supplies']) {
    const gold = s.gold;
    D.buyResources(s, id);
    D.sellResource(s, id, id === 'salvage' ? 4 : 2);
    assert(s.gold < gold);
  }
  assert(resources.filter((r) => r.id !== 'gold').every((r) => r.sell > 0));
});
test('new patterns need exploration proof, show a discovery reward once, and existing recipes stay available', () => {
  const s = guild();
  assert.throws(() => D.startRoomProject(s, 'workshop', 'pattern_scholarHood'), /Discover/);
  assert.throws(() => D.queueWorkshopOrder(s, 'pattern_scholarHood'), /Discover/);
  D.startRoomProject(s, 'workshop', 'materials_shortSword');
  D.cancelRoomProject(s, 'workshop');
  s.flags.discovered_study = true;
  D.investigateChamber(s, 'study');
  assert(s.guild.patterns.includes('pattern_scholarHood'));
  assert(s.scenes.some((scene) => scene.recipeRewards?.includes('pattern_scholarHood')));
  const count = s.scenes.length;
  D.discoverPatterns(s);
  assert.equal(s.scenes.length, count);
  assert.equal(s.inventory.filter((i) => i.id === 'scholarHood').length, 0);
  D.startRoomProject(s, 'workshop', 'pattern_scholarHood');
  tick(s, 6);
  assert.equal(s.inventory.filter((i) => i.id === 'scholarHood').length, 1);
});
test('surveys reveal a material pattern without altering equipment bonuses or duplicating it', () => {
  let s = guild();
  D.dispatch(s, 'survey_mill', ['ivo']);
  tick(s);
  D.resolveExpeditionDecision(s, s.missions[0].uid, 'normal');
  tick(s, 5);
  assert(s.guild.patterns.includes('pattern_longSword'));
  s = reload(s);
  D.discoverPatterns(s);
  assert.equal(s.guild.patterns.filter((id) => id === 'pattern_longSword').length, 1);
  const recipe = D.projectRecipe(s, 'workshop', 'pattern_longSword');
  assert.equal(D.equipment.find((e) => e.id === recipe.item).stats.str, 2);
});
test('read markers and pending recipe popups persist; room visits do not dismiss unread recipes', () => {
  let s = guild();
  s.flags.searched_study = true;
  D.discoverPatterns(s);
  assert.equal(navigationNotices(s).Rooms.count, 1);
  acknowledgeNavigation(s, 'Rooms');
  assert.equal(navigationNotices(s).Rooms.count, 1);
  D.readPattern(s, 'pattern_scholarHood');
  assert.equal(navigationNotices(s).Rooms.count, 0);
  s = reload(s);
  assert(s.scenes.some((scene) => scene.recipeRewards?.includes('pattern_scholarHood')));
  assert.equal(navigationNotices(s).Rooms.count, 0);
  assert.throws(() => D.readPattern(s, 'pattern_ironAxe'), /Discover/);
  assert.match(
    renderPatternRewards(['pattern_scholarHood'], helpers),
    /recipeReward:pattern_scholarHood/,
  );
});
test('version 5 saves quietly gain earned patterns with no change to resources, work, injuries or current recipes', () => {
  const s = guild();
  s.flags.searched_study = true;
  s.guild.version = 5;
  delete s.guild.patterns;
  delete s.guild.readPatterns;
  D.startRoomProject(s, 'workshop', 'materials_shortSword');
  const before = structuredClone(s),
    loaded = reload(s);
  assert.equal(loaded.guild.version, 6);
  assert.deepEqual(loaded.guild.patterns, ['pattern_scholarHood']);
  assert.deepEqual(loaded.scenes, before.scenes);
  for (const key of ['gold', 'roster', 'flags', 'inventory', 'missions'])
    assert.deepEqual(loaded[key], before[key]);
  assert.deepEqual(loaded.guild.house, before.guild.house);
  assert.deepEqual(loaded.guild.facilities, before.guild.facilities);
  assert.deepEqual(reload(loaded), loaded);
});
test('corrupt ownership, read markers, pending recipe rewards and undiscovered queued patterns are rejected', () => {
  const original = guild();
  for (const corrupt of [
    (s) => s.guild.patterns.push('fake'),
    (s) => s.guild.patterns.push('pattern_scholarHood', 'pattern_scholarHood'),
    (s) => s.guild.readPatterns.push('pattern_ironAxe'),
    (s) => s.scenes.push({ title: 'bad', body: 'bad', recipeRewards: ['fake'] }),
  ]) {
    const s = structuredClone(original);
    corrupt(s);
    assert.throws(() => reload(s));
  }
  const s = guild();
  s.flags.searched_study = true;
  D.discoverPatterns(s);
  D.queueWorkshopOrder(s, 'pattern_scholarHood');
  s.guild.patterns = [];
  assert.throws(() => reload(s), /management/);
});
test('crafting groups duplicate item recipes, offers alternate inputs and keeps unknown patterns uncraftable', () => {
  const s = guild(),
    html = renderCrafting(s, helpers, {
      craftRecipe: 'materials_shortSword',
      craftCategory: 'weapons',
    });
  assert.match(html, /Use materials/);
  assert.match(html, /Use scrap/);
  assert.match(html, /Patterns to discover/);
  assert.doesNotMatch(html, /project:workshop:pattern_ironAxe/);
  assert.equal(
    (
      html.match(/class="recipe-tile[^>]*data-action="craftRecipe:(?:materials_)?shortSword"/g) ||
      []
    ).length,
    1,
  );
  assert.match(renderCrafting(s, helpers, { craftSource: 'herbs' }), /Uses Herbs/);
  s.guild.blueprints.push('mill');
  D.discoverPatterns(s);
  assert.match(renderCrafting(s, helpers), /data-action="craftRecipe:pattern_longSword"/);
  assert.match(renderCrafting(s, helpers), /Found pattern · NEW/);
});
test('four primary navigation destinations retain keyboard-accessible secondary pages and unread notices', () => {
  const s = guild(),
    notices = navigationNotices(s),
    closed = renderNavigation('Rooms', notices, { ...helpers, storeAvailable: true }),
    open = renderNavigation('Rooms', notices, { ...helpers, storeAvailable: true, moreOpen: true });
  assert.equal((closed.match(/data-tab=/g) || []).length, 4);
  assert.match(closed, /aria-expanded="false"/);
  assert.match(open, /aria-expanded="true"/);
  assert.match(open, /Training/);
  assert.match(open, /Diaries/);
  assert.match(open, /Equipment/);
  assert.match(open, /aria-label="More game pages"/);
});
test('room production badge targets stay clear of stairs, decorations and the garden/hospice split', () => {
  const s = guild();
  for (const id of ['quarters', 'service', 'tower', 'garden', 'hospice']) {
    const r = D.houseRooms.find((r) => r.id === id),
      b = productionBadge(r);
    assert.equal(productionBadgeAt(s, b.x + b.w / 2, b.y + b.h / 2)?.id, id);
  }
  const q = productionBadge(D.houseRooms.find((r) => r.id === 'quarters'));
  assert(q.x > 375);
  assert(q.y + q.h <= 250);
  const garden = productionBadge(D.houseRooms.find((r) => r.id === 'garden')),
    hospice = productionBadge(D.houseRooms.find((r) => r.id === 'hospice'));
  assert(hospice.x + hospice.w < garden.x);
});
