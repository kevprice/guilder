import { renderRooms } from './room-panel.js';
import { renderPatternRewards } from './management-ui.js';
import { renderNavigation, renderHudResources } from './interface-navigation.js';
import { paintProductionBadges, productionBadgeAt } from './production-art.js';
import { roomProduction } from './production-view.js';
import { paintHouseFurnishings, paintRoomWorker } from './house-art.js';
import { renderGuildRewards, paintGuildFurnishings } from './guild-art.js';
import { renderQuestReward } from './quest-rewards.js';
import { renderEquipmentRewards, equipmentIcon } from './equipment-rewards.js';
import { navigationNotices, acknowledgeNavigation } from './navigation-notices.js';
import { missionTabs, missionCategory, missionImpact } from './mission-categories.js';
import { paintChamber } from './dungeon-art.js';
import { playerCopy, rewardSummary } from './player-copy.js';
import { renderCharacterPanel } from './character-panel.js';
import { paintInterior, paintAffordance } from './room-personality.js';
import {
  GraphicsEngine,
  screenToWorld,
  visibleBounds,
  paintEquipment,
  paintSpell,
  paintCreature,
  paintRoomIdentity,
  paintResidentPrison,
  glow,
} from './graphics-engine.js';
import {
  chamberTreasureX,
  chamberObjective,
  passageLabel,
  trapDisarmed,
  trapRequirement,
  currentSource,
} from './sprawl.js';
import { paintSky, paintGuildRoof, paintMagicMotes } from './scenery.js';
import { abilityNames } from './contracts.js';
import { paintRoom, paintCharacter } from './artwork.js';
import { portraits } from './portraits.js';
import { guildStairs, towerObjective } from './exploration.js';
import * as D from './domain.js';
import { houseChoices } from './narrative.js';
import { useStairs } from './movement.js';
import { mara } from './mara.js';
import { recordEntry } from './homecoming.js';

const $ = (id) => document.getElementById(id),
  canvas = $('game'),
  ctx = canvas.getContext('2d');
const graphics = new GraphicsEngine(canvas);
graphics.resize(window.devicePixelRatio || 1);
graphics.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
window.addEventListener('resize', () => {
  graphics.resize(window.devicePixelRatio || 1);
  graphics.focusKey = null;
  updatePanelAccess();
});
let state = D.initial(),
  tab = null,
  keys = {},
  player = spawn(),
  camera = 0,
  cameraY = 0,
  last = 0,
  grounded = true,
  walkTarget = null;
let trainingResident = null,
  trainingSection = 'choices',
  trainingLevels = {},
  trainingTargets = {};
let hoveredObject = null;
let characterPage = null;
let selectedRecord = null;
let contractTab = 'all';
let roomSection = 'dashboard',
  workshopQuantity = 1;
let decoratingFurniture = null;
let houseRoom = null;
let decorationRoom = null;
let productionSnapshots = [];
let moreOpen = false,
  roomFilter = 'all',
  roomSearch = '',
  craftCategory = 'all',
  craftRecipe = null,
  craftSource = null,
  materialId = null,
  saleQuantity = 1;
function renderRecords() {
  const available = D.availableRecords(state),
    pages = D.records.filter(
      (r) => state.flags['record_' + r.id] || available.some((a) => a.id === r.id),
    );
  const current = pages.find((r) => r.id === selectedRecord) || pages[0];
  selectedRecord = current?.id;
  return card(
    '',
    `<select id="personal-record" aria-label="Choose a page">${pages.map((r) => `<option value="${r.id}" ${r.id === selectedRecord ? 'selected' : ''}>${esc(r.room + ' · ' + r.author)}${state.flags['record_' + r.id] ? '' : ' · unread'}</option>`).join('')}</select>${current ? (state.flags['record_' + current.id] ? renderRecordPage(current) : btn('Read ' + current.room, 'record:' + current.id)) : '<p>No records are accessible yet.</p>'}`,
  );
}
const esc = (s) =>
  playerCopy(s).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
  );
function spawn() {
  return { x: 160, y: 380, vy: 0, floor: 380 };
}
function toast(t) {
  $('toast').textContent = t;
  $('toast').style.display = 'block';
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => ($('toast').style.display = 'none'), 5500);
}
function paragraphs(text) {
  return playerCopy(text)
    .split('\n')
    .filter(Boolean)
    .map((p) => `<p>${esc(p)}</p>`)
    .join('');
}
function renderRecordPage(record) {
  return `<article class="record-page">${paragraphs(recordEntry(record))}</article>`;
}
function btn(text, action, disabled = false) {
  return `<button data-action="${action}" ${disabled ? 'disabled' : ''}>${esc(text)}</button>`;
}
function persist() {
  try {
    localStorage.setItem('bound-house-auto', D.save(state));
  } catch {
    toast('Browser storage unavailable. Export a save from Journal.');
  }
}
window.addEventListener('pagehide', () => {
  D.rememberPosition(state, state.selected, player);
  persist();
});
function scene(
  title,
  body,
  options = [],
  recordId = null,
  equipmentRewards = [],
  questReward = null,
  guildRewards = [],
  recipeRewards = [],
) {
  const record = D.records.find((r) => r.id === recordId);
  $('scene-label').hidden = true;
  $('scene-label').textContent = 'THE HOUSE REMEMBERS';
  $('scene-body').classList.remove('record-page');
  $('scene-title').textContent = title;
  $('scene-body').innerHTML =
    renderPatternRewards(recipeRewards, { esc }) +
    renderGuildRewards(guildRewards, esc, state) +
    renderQuestReward(questReward, { esc }) +
    renderEquipmentRewards(equipmentRewards, { esc, storeAvailable: D.storeAvailable(state) }) +
    (questReward ? '' : record ? renderRecordPage(record) : paragraphs(body));
  $('scene-options').innerHTML = options
    .map((c) => `<div class="card">${btn(c.label, c.action, c.disabled)}</div>`)
    .join('');
  $('close-scene').textContent = options.length ? 'Close' : 'Continue →';
  if (!$('scene').open) $('scene').showModal();
  keys = {};
  walkTarget = null;
}
function presentScene() {
  const next = state.scenes.shift();
  if (next) {
    persist();
    scene(
      next.title,
      next.body,
      [],
      next.recordId,
      next.equipmentRewards,
      next.questReward,
      next.guildRewards,
      next.recipeRewards,
    );
  }
}
$('dismiss-scene').onclick = () => {
  $('scene').close();
};
$('close-scene').onclick = () => {
  $('scene').close();
  if (state.scenes.length) presentScene();
};
function act(fn) {
  try {
    const selectedBefore = state.selected;
    D.rememberPosition(state, selectedBefore, player);
    fn();
    if (selectedBefore !== state.selected) {
      player = D.residentPosition(state, state.selected);
      walkTarget = null;
    }
    persist();
    renderUI();
    presentScene();
  } catch (e) {
    toast(e.message);
  }
}
function openChoice(id) {
  const node = D.choiceNode(state, id);
  if (!node) {
    toast('That discovery has already been answered or is not yet available.');
    return;
  }
  scene(
    node.title,
    node.body,
    node.choices.map((c) => ({
      ...c,
      action: `story:${id}:${c.id}`,
      disabled: !D.optionAvailable(state, c),
    })),
  );
}
function openMission(uid) {
  const m = state.missions.find((m) => m.uid === uid && m.status === 'decision');
  if (!m) return;
  const def = D.contracts.find((d) => d.id === m.id);
  scene(
    def.name,
    D.missionLetter(state, m.id),
    def.choices.map((c) => ({ ...c, action: `decide:${uid}:${c.id}` })),
  );
}
function openExpeditionDecision(uid) {
  const decision = D.expeditionDecision(state, uid);
  if (!decision) return;
  scene(
    decision.title,
    decision.body,
    decision.options.map((o) => ({ ...o, action: 'expeditionDecision:' + uid + ':' + o.id })),
  );
}
function card(title, body) {
  return `<div class="card">${title ? `<h3>${esc(title)}</h3>` : ''}${body}</div>`;
}

function renderGuild() {
  return renderCharacterPanel(state, characterPage || state.selected, {
    esc,
    card,
    btn,
    paragraphs,
  });
}
function renderStore() {
  if (!D.storeAvailable(state)) return '';
  const visitor = state.roster.find((c) => c.id === state.storeVisitor && c.status === 'home');
  let html = '';
  html += visitor
    ? card(
        visitor.name + ' · in the store',
        D.equipmentSlots
          .map((slot) => {
            const item = D.ensureEquipmentSlots(visitor)[slot];
            return `<p>${esc(slot)}: ${esc(D.equipment.find((e) => e.id === item?.id)?.name || 'empty')}</p>${item ? btn('Return to storage', 'unequip:' + visitor.id + ':' + slot) : ''}`;
          })
          .join(''),
      )
    : card('Store room', `${btn('Walk to store door', 'walk:790')}`);
  html += card(
    'Expedition resources',
    `<p>${state.guild.salvage} scrap · ${state.guild.supplies} supplies</p><div class="row">${btn('Buy 2 supplies · 15g', 'resource:supplies', state.gold < 15)}${btn('Buy 4 scrap · 60g', 'resource:salvage', state.gold < 60)}</div>`,
  );
  if (state.guild.furniture.length)
    html += card(
      'Furniture and decorations',
      `<p>${state.guild.furniture.length} owned furnishings are available in Rooms.</p>${btn('Decorate rooms →', 'roomPage:decorate')}`,
    );
  html += '<h3>Guild inventory</h3>';
  const heldProject = state.guild.facilities.workshop.project;
  if (heldProject?.source?.kind === 'equipment') {
    const held = D.equipment.find((e) => e.id === heldProject.source.item.id);
    html += card(
      held.name + ' · Held at the workshop',
      `${equipmentIcon(held, esc)}<p>This piece is reserved for ${heldProject.recipe.startsWith('refit') ? 'a refit' : 'reclamation'} (${heldProject.progress}/${heldProject.work} work). Open Rooms → Workshop to follow progress or cancel and return it to storage.</p>`,
    );
  }
  for (const item of state.inventory || []) {
    const def = D.equipment.find((e) => e.id === item.id),
      owner = state.roster.find((c) => c.id === item.owner);
    html += card(
      def.name,
      `${equipmentIcon(def, esc)}<p>${esc(def.slot)} · ${owner ? (owner.status === 'dead' ? 'Lost with ' : 'Carried by ') + esc(owner.name) : 'Available in storage'} · ${Object.entries(
        def.stats,
      )
        .map(([k, v]) => k.toUpperCase() + ' +' + v)
        .join(
          ' · ',
        )}${def.protection ? ' · ' + def.protection + ' threat reduction' : ''}</p>${visitor && !owner ? btn('Equip on ' + visitor.name, 'equipItem:' + visitor.id + ':' + item.uid, !!D.ensureEquipmentSlots(visitor)[def.slot] || visitor.level < def.minLevel) : ''}`,
    );
  }
  html +=
    '<h3>Quartermaster catalogue</h3>' +
    D.equipment
      .map((e) =>
        card(
          e.name,
          `<p>${esc(e.desc)}</p><p>${esc(e.slot)} · ${esc(e.rarity)} · Level ${e.minLevel}</p><p class="stats">${Object.entries(
            e.stats,
          )
            .map(([k, v]) => k.toUpperCase() + ' +' + v)
            .join(
              ' · ',
            )}${e.protection ? ' · ' + e.protection + ' percentage points less daily threat' : ''}</p>${btn('Buy into storage · ' + e.cost + 'g', 'buy:' + e.id, state.gold < e.cost || (e.rarity === 'rare' && !state.flags.truth))}`,
        ),
      )
      .join('');
  return html;
}
function renderContracts() {
  const available = D.availableContracts(state).sort(
    (a, b) => D.contractLabel(a).priority - D.contractLabel(b).priority,
  );
  const filtered = available.filter(
    (def) => contractTab === 'all' || missionCategory(def) === contractTab,
  );
  let html = `<div class="mission-tabs" role="group" aria-label="Mission types">${missionTabs
    .map(([id, name]) => {
      const count = available.filter((def) => id === 'all' || missionCategory(def) === id).length;
      return `<button data-action="contractTab:${id}" aria-pressed="${contractTab === id}">${esc(name)} <span>${count}</span></button>`;
    })
    .join('')}</div>`;

  if (state.flags.truth)
    html += `<p class="stats">Preparation resources: ${state.community} community contacts; ${state.knowledge} research findings.</p>`;
  for (const id of D.damagedRooms(state))
    html += card(
      (id === 'service'
        ? 'Service room'
        : id === 'quarters'
          ? 'Quarters'
          : D.rooms.find((r) => r.id === id).name) + ' · DAMAGED',
      `${btn('Repair room · 30g', 'repairDamage:' + id)}`,
    );
  if (D.homeDanger(state))
    html += card(
      'HOME UNDER ATTACK',
      `<p class="threat-badge">${esc(D.homeDanger(state).name)}</p>`,
    );
  if (D.activeMissions(state).length) html += '<h3>Active missions</h3>';
  for (const m of D.activeMissions(state).sort(
    (a, b) =>
      Number(D.contracts.find((d) => d.id === b.id).homeEvent || false) -
      Number(D.contracts.find((d) => d.id === a.id).homeEvent || false),
  )) {
    const def = D.contracts.find((d) => d.id === m.id),
      assessment = D.risk(state, m.id, m.party),
      total = def.days * D.profiles[m.id].amount,
      progress = m.simulation === 'daily' ? Math.floor((m.progress / total) * 100) : null;
    html += card(
      def.name,
      `<span class="tag">${def.internal ? 'GUILD THREAT · PARTY AT HOME' : def.lethal ? 'LETHAL EXPEDITION' : 'EXPEDITION'}</span>${renderMissionImpact(def)}<p>${m.party
        .map((id) => {
          const c = state.roster.find((c) => c.id === id);
          return esc(c.name) + ' (' + D.injuryNames[D.injuryLevel(c)] + ')';
        })
        .join(
          ', ',
        )} · ${m.pendingEvent ? 'Safely camped · decision waiting' : m.status === 'decision' ? 'Report waiting' : m.status === 'returning' ? 'Retreat · home tomorrow' : m.stalled ? 'No conscious workers · stranded' : m.remaining + ' days remaining'}</p>${
        progress !== null
          ? `<label class="stats">${def.internal ? 'Clearing progress' : 'Work'} · ${progress}%<progress value="${m.progress}" max="${total}"></progress></label><p class="stats">${m.elapsed} days worked · ${m.harm.length} harm events · ${m.kits} medical kits remaining${
              m.harm.length
                ? '<br>Latest: ' +
                  m.harm
                    .slice(-3)
                    .map(
                      (h) =>
                        `Day ${h.day}: ${esc(state.roster.find((c) => c.id === h.id).name)}${h.treated ? ' · kit used' : h.warded ? ' · death ward used' : ' · ' + (D.injuryNames[h.level] || 'hurt') + ' · +' + h.injuryDays + ' recovery days'}`,
                    )
                    .join('<br>')
                : ''
            }</p>`
          : '<p class="stats">The expedition is underway.</p>'
      }${m.status === 'travelling' && !m.pendingEvent && m.simulation === 'daily' ? `<p class="threat-badge">⚠ ${assessment.threat}% harm chance each day</p>` : ''}${m.pendingEvent ? btn('Choose the expedition’s next step', 'expeditionEvent:' + m.uid) : ''}${m.status === 'decision' ? btn('Read the expedition letter', 'letter:' + m.uid) : ''}${['travelling', 'decision'].includes(m.status) ? `<div class="row">${def.internal ? btn('Watch fight', 'watch:' + m.uid) : ''}${btn(def.internal ? 'Withdraw entire party' : 'Retreat · return tomorrow', 'withdraw:' + m.uid, !def.internal && !D.canWithdraw(state, m))}${(def.internal ? m.party : []).map((id) => btn('Withdraw ' + state.roster.find((c) => c.id === id).name, 'withdraw:' + m.uid + ':' + id)).join('')}</div>` : ''}`,
    );
  }
  html += `<h3>${esc(missionTabs.find(([id]) => id === contractTab)[1])} · Available missions</h3>`;
  if (!filtered.length)
    html +=
      '<p class="stats">No missions of this type are available yet. Explore the house or follow another story lead.</p>';
  for (const def of filtered) {
    const profile = D.profiles[def.id],
      cost = D.missionCost(state, def),
      saved = def.internal ? state.threats?.[def.id]?.progress || 0 : 0,
      total = def.days * profile.amount;
    html += card(
      def.name,
      `<span class="tag">${esc(contractKind(def))}</span>${renderMissionImpact(def)}<p>${esc(def.desc)}</p>${def.lethal ? '<p class="threat-badge">LETHAL</p>' : ''}<div class="contract-target"><strong>Party ${profile.stat.toUpperCase()} ${profile.amount}</strong><span>${def.days} base days · ${profile.threat}% base daily threat · ${D.risk(state, def.id, []).damageType} harm</span></div><p class="stats">${def.homeEvent ? '' + def.xp + ' defence XP per resident' : def.hiddenReward ? 'Reward and XP unknown until cleared' : rewardSummary(def.reward, def.xp)}${def.activity ? ' · ' + (def.activity === 'survey' ? '2 scrap + 1 supply + facility blueprints' : '4 scrap · two-day cooldown') : ''}${cost ? ' · ' + cost + 'g preparation' : ''} · Up to ${def.capacity} residents</p>${saved ? `<label class="stats">Damage preserved · ${Math.floor((saved / total) * 100)}%<progress value="${saved}" max="${total}"></progress></label>` : ''}${def.personal ? `<p>${D.recruits.find((c) => c.id === def.personal).name} must join.</p>` : ''}<div class="party-picker">${state.roster
        .filter((c) => c.status === 'home')
        .map(
          (c) =>
            `<label><input type="checkbox" data-party="${def.id}" value="${c.id}"><span><strong>${esc(c.name)}</strong><small>STR ${c.str} · AGI ${c.agi} · INT ${c.int} · END ${c.end}${c.skills.length ? ' · ' + c.skills.map((k) => esc(abilityNames[k] || k)).join(', ') : ''}</small></span></label>`,
        )
        .join(
          '',
        )}</div><div class="party-preview" data-risk="${def.id}">—</div><label class="stats">Medical kit · one treatment<select id="kit-${def.id}" aria-label="Medical kit for ${esc(def.name)}"><option value="none">No kit · no cost</option><option value="gold" ${state.gold < cost + 10 ? 'disabled' : ''}>Pay 10g</option><option value="supplies" ${state.guild.supplies < D.medicalKitSupplyCost(state) ? 'disabled' : ''}>Use ${D.medicalKitSupplyCost(state)} supplies</option></select></label>${btn(def.internal ? 'Assign clearing party' : 'Dispatch party', 'dispatch:' + def.id, true)}`,
    );
  }
  if (['all', 'work'].includes(contractTab))
    html += card(
      'Work at the doorstep',
      `<p class="mission-impact">Paid local work · one day · earns 12 gold</p><p>Repair villagers’ tools for wages. Guild room repairs have their own repair actions.</p>${btn('Take village workshop commission · earn 12g', 'emergency')}`,
    );
  return html;
}
function renderMissionImpact(def) {
  const { category, impact, detail } = missionImpact(def);
  return `<p class="mission-impact mission-impact-${category}"><strong>${esc(impact)}</strong><br><span>${esc(detail)}</span></p>`;
}
function contractKind(def) {
  if (def.activity)
    return def.activity === 'survey' ? 'Guild development · Survey' : 'Resources · Recovery';
  if (def.homeEvent) return 'Defence';
  if (def.internal) return 'Clearing';
  if (def.lethal) return 'Lethal expedition';
  if (def.personal) return D.recruits.find((c) => c.id === def.personal)?.name || 'Request';
  if (def.region) return D.regions.find((r) => r.id === def.region)?.name || 'Expedition';
  return D.contractLabel(def).kind === 'REPEATABLE WORK' ? 'Daily work' : 'Request';
}
function updatePartyPreview(id) {
  const ids = [...document.querySelectorAll(`[data-party="${id}"]:checked`)].map((x) => x.value),
    target = document.querySelector(`[data-risk="${id}"]`),
    button = document.querySelector(`[data-action="dispatch:${id}"]`);
  if (!ids.length) {
    target.textContent = '—';
    button.disabled = true;
    return;
  }
  const r = D.risk(state, id, ids),
    def = D.contracts.find((d) => d.id === id);
  target.innerHTML = `<strong>Combined ${r.requirement.stat.toUpperCase()} ${r.combined} / ${r.requirement.amount}</strong><p>${r.days === null ? 'No progress' : r.days + ' days'}${r.combined < r.requirement.amount ? ' · below target; longer exposure' : ''} · <strong>${r.threat}% chance of harm each day</strong></p><p class="stats">${r.damageType} harm · ${r.workBonus}% class work bonus<br>${r.baseThreat}% base threat${r.reductions.length ? ' − ' + r.reductions.map((x) => esc(x.label) + ' (' + (x.amount < 0 ? 'adds ' + Math.abs(Math.round(x.amount * 10) / 10) + ' risk points' : Math.round(x.amount * 10) / 10 + ' points') + ')').join(' − ') : ''}<br>${r.exposure}% risk over assignment</p>`;
  const kit = $('kit-' + id).value;
  const goldCost = D.missionCost(state, def) + (kit === 'gold' ? 10 : 0),
    supplyCost = kit === 'supplies' ? D.medicalKitSupplyCost(state) : 0;
  target.innerHTML += `<p class="stats">Preparation: ${goldCost}g + ${supplyCost} supplies · remaining stocks: ${Math.max(0, state.gold - goldCost)}g, ${Math.max(0, state.guild.supplies - supplyCost)} supplies</p>`;
  const homeWork = D.roomWorkAbsence(state, ids);
  if (homeWork.length)
    target.innerHTML += `<div class="room-assignment-impact"><strong>Room work while this party is away</strong>${homeWork.map((f) => `<p>${esc(f.name)}: ${f.before} → ${f.after} work/day${f.beforeDays === null ? '' : ' · ' + esc(f.scope) + ' ' + f.beforeDays + ' days → ' + (f.afterDays === null ? 'paused' : f.afterDays + ' days')}</p>`).join('')}<small>Mara maintains facility projects. Staffed gathering resumes when companions return fit.</small></div>`;
  button.disabled =
    !r.rate ||
    ids.length > def.capacity ||
    (def.personal && !ids.includes(def.personal)) ||
    state.gold < goldCost ||
    state.guild.supplies < supplyCost;
}
function renderTraining() {
  if (!state.roster.length)
    return '<p>Find the trapped mason in the entrance hall to begin training.</p>';
  const c =
    state.roster.find((c) => c.id === trainingResident) ||
    state.roster.find((c) => c.id === state.selected) ||
    state.roster[0];
  trainingResident = c.id;
  const klass = D.classOf(c),
    fit = c.status === 'home',
    pending = D.unspentLevels(c);
  if (!pending.includes(trainingLevels[c.id])) trainingLevels[c.id] = pending[0];
  const levelPicker =
    trainingSection === 'choices' && pending.length
      ? `<div class="training-level-picker"><label for="training-level">Level to train</label><select id="training-level">${pending.map((l) => `<option value="${l}" ${l === trainingLevels[c.id] ? 'selected' : ''}>Level ${l} · one choice</option>`).join('')}</select></div>`
      : '';
  let html = `<div class="training-toolbar"><label for="training-character">Character</label><select id="training-character">${state.roster.map((r) => `<option value="${r.id}" ${r.id === c.id ? 'selected' : ''}>${esc(r.name)} · Level ${r.level} · ${esc(D.classOf(r).name)}</option>`).join('')}</select><div class="training-tabs" role="group" aria-label="Training pages">${[
    ['choices', 'Training'],
    ['path', 'Class'],
    ['abilities', 'Abilities'],
    ['spells', 'Spells'],
  ]
    .map(
      ([id, name]) =>
        `<button data-action="trainingPage:${id}" aria-pressed="${trainingSection === id}">${name}</button>`,
    )
    .join('')}</div>${levelPicker}</div>`;
  html += `<div class="training-profile"><img class="portrait" src="${portraits[c.id]}" alt="${esc(c.name)} portrait"><div><h3>${esc(c.name)}</h3><span class="tag">${klass.name} · Level ${c.level} · ${D.injuryNames[D.injuryLevel(c)]}</span></div></div><p class="stats">STR ${c.str} · AGI ${c.agi} · INT ${c.int} · END ${c.end}<br>${c.level >= 20 ? 'Maximum level' : c.xp + ' / ' + D.xpRequired(c.level) + ' XP to next level'} · ${pending.length} unspent ${pending.length === 1 ? 'choice' : 'choices'} · ${c.status}</p>`;
  if (trainingSection === 'choices') {
    if (pending.length) {
      const level = trainingLevels[c.id];
      html += `<h3 class="training-choice-title">Level ${level} · Choose an ability or equipment</h3><p class="stats">Stats increase automatically each level: ${Object.entries(
        klass.growth,
      )
        .map(([stat, n]) => stat.toUpperCase() + ' +' + n)
        .join(' · ')}.</p>`;
      if (!c.undead) {
        html +=
          '<div class="training-options">' +
          D.skills[c.type]
            .filter((k) => k.level <= level && !c.skills.includes(k.id))
            .map(
              (k) =>
                `<div class="class-node"><strong>${k.name}</strong><p>${k.desc}</p>${btn('Choose ' + k.name, 'advance:' + c.id + ':' + k.id + ':' + level, !fit)}</div>`,
            )
            .join('') +
          D.availableTalents(c)
            .filter((t) => t.level === level)
            .map(
              (t) =>
                `<div class="class-node"><strong>${t.name}</strong><p>${t.desc}</p>${btn('Choose ' + t.name, 'talent:' + c.id + ':' + t.id, !fit)}</div>`,
            )
            .join('') +
          '</div>';
        if ([3, 6, 9, 12, 15, 18].includes(level) && !c.specialisation)
          html += '' + btn('Choose class →', 'trainingPage:path');
      }
      html +=
        '<h3>Quartermaster requisition · use this level choice</h3><p class="stats">Choose one physical item for guild storage instead of learning an ability. No gold cost; equip it in the store room.</p><div class="training-options">' +
        D.trainingEquipment(c, level)
          .map(
            (item) =>
              `<div class="class-node">${equipmentIcon(item, esc)}<strong>${esc(item.name)}</strong><p>${esc(item.slot)} · ${Object.entries(
                item.stats,
              )
                .map(([k, v]) => k.toUpperCase() + ' +' + v)
                .join(
                  ' · ',
                )}</p>${btn('Requisition ' + item.name, 'trainingGear:' + c.id + ':' + item.id + ':' + level, !fit)}</div>`,
          )
          .join('') +
        '</div>';
    }
  }
  if (trainingSection === 'path') {
    if (!c.undead && !c.specialisation && c.level >= 3)
      html +=
        '<h3>Choose a permanent class</h3><div class="training-options">' +
        D.classes[c.type].branches
          .map(
            (id) =>
              `<div class="class-node"><strong>${D.classes[id].name}</strong><p>${D.classes[id].desc}</p>${btn('Become ' + D.classes[id].name, 'specialise:' + c.id + ':' + id, !fit)}</div>`,
          )
          .join('') +
        '</div>';
    if (c.specialisation || c.undead)
      html += `<h3>${klass.name}</h3><p>${klass.desc}</p><p class="stats">Growth each level: ${Object.entries(
        klass.growth,
      )
        .map(([k, v]) => k.toUpperCase() + ' +' + v)
        .join(' · ')}. This class is permanent.</p>`;
    else if (c.level < 3) html += '<p>Class · Level 3</p>';
  }
  if (trainingSection === 'abilities') {
    html += `<p>${klass.desc}</p><h3>Learned abilities</h3>`;
    html += (c.skills || [])
      .map(
        (id) =>
          `<div class="class-node"><strong>${esc(abilityNames[id] || id)}</strong><p>${esc(D.skills[c.type].find((k) => k.id === id)?.desc || '')}</p></div>`,
      )
      .join('');
    html += (c.talents || [])
      .map((id) => {
        const t = D.talents.find((t) => t.id === id);
        return `<div class="class-node learned"><strong>${t.name}</strong><p>${t.desc}</p></div>`;
      })
      .join('');
    if (!c.skills.length && !c.talents?.length) html += '<p>No abilities learned yet.</p>';
    html +=
      '<details><summary>Choices by level</summary>' +
      Object.entries(c.levelChoices || {})
        .map(
          ([level, v]) =>
            `<p class="stats">Level ${level}: ${esc((v.kind === 'equipment' ? 'Equipment: ' + D.equipment.find((item) => item.id === v.id)?.name : '') || D.talents.find((t) => t.id === v.id)?.name || D.skills[c.type].find((k) => k.id === v.id)?.name || (v.kind === 'legacy' ? 'Preserved earlier training' : v.id.toUpperCase() + ' +1'))}</p>`,
        )
        .join('') +
      '</details>';
  }
  if (trainingSection === 'spells') {
    const prepared =
      c.type === 'mage'
        ? D.skills.mage.filter((skill) => c.skills.includes(skill.id) && skill.effects)
        : [];
    if (prepared.length)
      html +=
        '<h3>Prepared expedition spells</h3><p class="stats">These spells take effect automatically while the caster is conscious.</p>' +
        prepared.map((skill) => card(skill.name, paragraphs(skill.desc))).join('');
    let actions = '';
    for (const key of ['heal', 'mend']) {
      const targets = D.spellTargets(state, c.id, key);
      if (!targets.length) continue;
      const target = targets.find((t) => t.id === trainingTargets[key]) || targets[0];
      trainingTargets[key] = target.id;
      actions += `<h3>${key === 'heal' ? 'Heal a companion' : 'Repair a zombie'}</h3><label for="training-target-${key}">Target</label><select id="training-target-${key}" data-training-target="${key}">${targets.map((p) => `<option value="${p.id}" ${p.id === target.id ? 'selected' : ''}>${esc(p.name)} · ${D.injuryNames[D.injuryLevel(p)]}</option>`).join('')}</select>${btn((key === 'heal' ? 'Heal ' : 'Mend ') + target.name, key + ':' + c.id + ':' + target.id, c.lastCastDay === state.day)}`;
    }
    if (fit && (c.talents || []).includes('raiseDead')) {
      const targets = state.roster.filter((p) => p.status === 'dead' && !p.undead);
      if (targets.length) {
        const target = targets.find((t) => t.id === trainingTargets.raise) || targets[0];
        trainingTargets.raise = target.id;
        actions += `<h3>Raise dead</h3><p class="stats">Recovered remains become a zombie with different abilities.</p><label for="training-target-raise">Fallen resident</label><select id="training-target-raise" data-training-target="raise">${targets.map((p) => `<option value="${p.id}" ${p.id === target.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')}</select>${target.bodyRecovered ? btn('Raise ' + target.name + ' · 80g', 'raise:' + c.id + ':' + target.id, c.lastCastDay === state.day || state.gold < 80) : btn('Recover ' + target.name + ' · 60g · one day', 'remains:' + target.id)}`;
      }
    }
    html += actions
      ? '<p class="stats">One cast per caster per day. The target must be at home with the caster or in the same adventure party.</p>' +
        actions
      : '<p>No spells to cast at home. Learn class spells through Training.</p>';
  }
  return html;
}

function roomInvestigation() {
  const room = D.roomAt(player.floor);
  if (room)
    return {
      title: room.name,
      next: chamberObjective(state, room),
      summary: state.flags['searched_' + room.id]
        ? room.story
        : 'Explore this chamber and recover its records.',
    };
  if (
    [140, -100].includes(player.floor) &&
    (player.floor !== 140 || player.x < 700) &&
    state.flags.tower
  )
    return {
      title: player.floor === -100 ? 'The frozen bell ward' : 'Explore the bell tower',
      next: towerObjective(state),
      summary: 'The tower’s ward connects to the wizard’s study and potion kitchen.',
    };
  return D.currentInvestigation(state);
}
function renderStories() {
  // Recovered records are browsable individually; unopened rooms reveal no text.
  const chamber = D.roomAt(player.floor);
  const investigation = roomInvestigation();
  let html = `<article class="investigation"><h3>${esc(investigation.title)}</h3><p>${esc(investigation.next || '')}</p>${investigation.walk ? btn(investigation.title, 'walk:' + investigation.walk) : investigation.tab ? `<button data-tab="${investigation.tab}">Open ${investigation.tab} →</button>` : ''}</article>`;
  if (state.flags.searched_potions && !state.flags.awakened_maelin)
    html += card(
      'Free the frozen bellkeeper',
      btn('Read the bell ward release diagram', 'bellDiagram'),
    );
  html +=
    '<h3 class="story-section">What we have learned</h3>' +
    D.knownHistory(state)
      .reverse()
      .map((e) => card(e.title, paragraphs(e.text)))
      .join('');
  for (const c of state.roster) {
    const personal = D.availableChoices(state, c.id);
    if (personal.length)
      html +=
        `<h3>${esc(c.name)} · Companion story</h3>` +
        personal
          .map((node) =>
            card(
              node.title,
              `<p>${node.minLevel ? 'Level ' + node.minLevel + ' chapter' : 'Personal conversation'}</p>${btn('Read and discuss', 'talk:' + node.id)}`,
            ),
          )
          .join('');
  }
  const discoveries = D.availableChoices(state);
  if (discoveries.length) {
    html += '<h3 class="story-section">Places to investigate</h3>';
    for (const n of discoveries) {
      const x = choiceLocation(n.id);
      html += card(n.title, `${btn('Walk there', 'walk:' + x)}`);
    }
  }
  if (state.flags.free) {
    html +=
      '<h3>Roads beyond the guild</h3>' +
      D.regions
        .map((r) => {
          const completed = Array.from(
            { length: 12 },
            (_, i) => state.flags[r.id + 'Step' + i],
          ).filter(Boolean).length;
          return card(
            r.name,
            `<p>${esc(r.problem)}</p><label class="stats">${completed}/12<progress value="${completed}" max="12"></progress></label>${completed === 12 ? paragraphs(r.ending) : ''}`,
          );
        })
        .join('');
  }
  if (state.roster.length) html += '<h3 class="story-section">People and their leads</h3>';
  for (const c of state.roster) {
    let body = paragraphs(D.characterArc(state, c));
    const active = D.activeMissions(state).find((m) => m.party.includes(c.id));
    if (active) {
      const def = D.contracts.find((m) => m.id === active.id);
      body += `<p class="stats">${def.internal ? 'Assigned to' : 'Away on'} ${esc(def.name)} · ${active.status === 'decision' ? 'Report waiting in Contracts' : active.remaining + (def.internal ? ' days to clear' : ' days until return')}</p>`;
    } else if (c.status === 'injured')
      body += `<p class="stats">Recovering · ${c.recovery} days remaining.</p>`;
    const recap = D.characterRecap(state, c.id);
    if (recap)
      body += `<details><summary>Last conversation: ${esc(recap.title)}</summary>${paragraphs(recap.text)}</details>`;
    for (const n of D.availableChoices(state, c.id))
      body += btn('Talk: ' + n.title, 'talk:' + n.id);
    const returned = [...state.missions]
      .reverse()
      .find((m) => m.status === 'resolved' && m.party.includes(c.id));
    if (returned)
      body += `<p class="stats">Last expedition: ${esc(D.contracts.find((m) => m.id === returned.id).name)}.</p>`;
    html += card(c.name, body);
  }
  const leads = D.optionalHouseLeads(state);
  if (leads.length)
    html +=
      '<h3 class="story-section">Other leads inside the house</h3>' +
      leads.map((l) => card(l.title, paragraphs(l.text))).join('');
  return html;
}
function renderUI() {
  productionSnapshots = D.houseRooms
    .filter((r) => r.w >= 90 && D.roomUnlocked(state, r))
    .map((r) => roomProduction(state, r.id));
  if (tab === 'Store room' && !D.storeAvailable(state)) tab = null;
  $('status').textContent = `Day ${state.day}`;
  $('hud-resources').innerHTML = renderHudResources(state, esc);
  const selected = D.home(state).find((c) => c.id === state.selected);
  const portrait = (c) =>
    `<img class="portrait" src="${portraits[c.id]}" alt="${esc(c.name)} portrait" style="--accent:${c.color || '#76BDB5'}">`;
  const chamber = D.roomAt(player.floor);
  const investigation = roomInvestigation();
  $('chapter-label').textContent = '';
  $('objective').textContent = investigation.title;
  $('story-event').textContent = investigation.next || '';
  $('character-hud').innerHTML = selected
    ? `${portrait(selected)}<div><strong>${esc(selected.name)}</strong><span class="stats">${selected.id === 'rowan' ? (state.flags.gateOpen ? 'Unbound · House sight' : state.flags.anchor ? 'Bound · House sight' : 'Bound') : 'Home · Level ' + selected.level}</span></div>`
    : '';
  $('home-strip').innerHTML = D.home(state)
    .map(
      (c) =>
        `<button data-action="select:${c.id}" class="${c.id === state.selected ? 'active' : ''}" aria-pressed="${c.id === state.selected}">${portrait(c)}${esc(c.name)}${c.points ? ' · ↑' : ''}</button>`,
    )
    .join('');
  $('expeditions').innerHTML =
    (D.homeDanger(state)
      ? `<button class="threat-badge" data-tab="Contracts"><strong>HOME UNDER ATTACK</strong>${esc(D.homeDanger(state).name)}<br>${D.activeMissions(state).some((m) => m.id === D.homeDanger(state).id) ? 'Defence in progress' : D.maraPower(state) > 0 ? 'Mara and the home watch defending' : 'Assign defenders'}</button>`
      : '') +
    D.activeMissions(state)
      .map(
        (m) =>
          `<button data-tab="Contracts"><strong>${esc(D.contracts.find((d) => d.id === m.id).name)}</strong>${m.party.map((id) => esc(state.roster.find((c) => c.id === id).name)).join(', ')}<br>${m.pendingEvent ? 'Safely camped · decision due' : m.status === 'decision' ? 'Decision due' : m.remaining + ' days remaining'}</button>`,
      )
      .join('');
  $('panel').hidden = !tab;
  $('resident').textContent =
    `Controlling ${D.home(state).find((c) => c.id === state.selected)?.name || 'Rowan'}`;
  acknowledgeNavigation(state, tab, contractTab);
  const notices = navigationNotices(state);
  $('nav').innerHTML = renderNavigation(tab, notices, {
    esc,
    storeAvailable: D.storeAvailable(state),
    moreOpen,
  });
  let html = `<div class="panel-header"><div><h2>${{ Rooms: 'House', Characters: 'Residents', Stories: 'Story' }[tab] || tab || ''}</h2></div><button class="panel-close" data-close="true" aria-label="Close panel">×</button></div><div id="panel-content" class="panel-content" tabindex="0" aria-label="Panel content">`;
  if (tab === 'Options')
    html +=
      '<dl class="controls"><dt>Walk</dt><dd>A / D · ← / →</dd><dt>Jump</dt><dd>Space</dd><dt>Stairs</dt><dd>W / S</dd><dt>Interact</dt><dd>E</dd><dt>Switch resident</dt><dd>Tab</dd><dt>Zoom</dt><dd>Mouse wheel · + / −</dd><dt>Close</dt><dd>Escape</dd></dl>';
  if (tab === 'Overview') {
    html +=
      '<p><a href="/guild-sprawl.html" target="_blank" rel="noopener">View the full tower and underworld map →</a></p>';
    html += card(
      'Stairs',
      btn('Tower · ' + (state.flags.tower ? 'open' : 'locked'), 'walk:350') +
        btn('Cellar · ' + (state.flags.stairs ? 'open' : 'locked'), 'walk:505'),
    );
    const known = [
      { name: 'Entrance', x: 160 },
      { name: 'Quarters', x: 340 },
      { name: 'Service corridor', x: 505 },
      {
        name: state.flags.repaired ? 'Service room' : 'Service wall',
        x: state.flags.repaired ? 870 : 680,
      },
      ...(state.flags.anchor ? [{ name: 'Returned landing', x: 1100 }] : []),
      ...D.rooms.filter((r) => state.flags[r.anchor]).map((r) => ({ name: r.name, x: r.x + 50 })),
    ];
    html += known.map((r) => card(r.name, btn('Walk to room →', 'walk:' + r.x))).join('');
    if (state.flags.stairs)
      html += card(
        state.flags.cellarDrained ? 'Drained cellar' : 'Flooded cellar',
        state.flags.cellarDrained
          ? '<p>Drain open</p>'
          : '<p>Submerged drain · Water breathing</p>',
      );
    if (state.flags.tower) html += card('Bell tower · 2 floors', btn('Tower stair', 'walk:350'));
    if (state.flags.labyrinth)
      html += card('Labyrinth · 2 floors', '<p>Lower stair · Tracking / Echo sight</p>');
  }
  if (tab === 'Exploration') {
    const here = currentSource(player.floor),
      room = D.roomAt(player.floor);
    if (room)
      html += card(
        'Inside this chamber',
        btn('Walk to the return passage', 'localWalk:' + 48) +
          btn(
            room?.encounter && !state.flags['cleared_' + room.id]
              ? 'Treasure beyond the guardian · clear it first'
              : 'Walk to records and treasure',
            'localWalk:treasure',
            !!room?.encounter && !state.flags['cleared_' + room.id],
          ),
      );
    if (state.flags.searched_potions && !state.flags.awakened_maelin)
      html += card(
        'Recovered rescue instructions',
        btn('Read the bell ward release diagram', 'bellDiagram'),
      );
    html += D.passages
      .filter((p) => p.from === here)
      .map((p) => card(passageLabel(state, p), btn('Walk to this passage', 'routeWalk:' + p.id)))
      .join('');
    html += D.chambers
      .filter((r) => state.flags['discovered_' + r.id])
      .map((r) =>
        card(
          r.name,
          `<p>${state.flags['searched_' + r.id] ? esc(r.story) : ''}</p><span class="stats">${r.encounter && !state.flags['cleared_' + r.id] ? 'Creature guards this room' : state.flags['searched_' + r.id] ? 'Searched' : 'Investigate the marked plinth'}</span>`,
        ),
      )
      .join('');
  }
  if (tab === 'Store room') html += renderStore();
  if (tab === 'Guild' || tab === 'Characters') html += renderGuild();
  if (tab === 'Contracts') html += renderContracts();
  if (tab === 'Rooms')
    html += renderRooms(
      state,
      { esc, card, btn },
      {
        section: roomSection,
        orderQuantity: workshopQuantity,
        furnitureUid: decoratingFurniture,
        houseRoom,
        decorationRoom,
        compact: true,
        roomFilter,
        roomSearch,
        craftCategory,
        craftRecipe,
        craftSource,
        materialId,
        saleQuantity,
      },
    );
  if (tab === 'Training') html += renderTraining();
  if (tab === 'Stories') html += renderStories();
  if (tab === 'Diaries') html += renderRecords();
  if (tab === 'Reports')
    html += state.reports.length
      ? state.reports
          .map((r) =>
            card(
              r.title,
              `<span class="tag">Day ${r.day}${rewardSummary(r.reward, r.xp) ? ' · ' + rewardSummary(r.reward, r.xp) : ''}</span>${paragraphs(r.text)}<div class="stats">${esc(r.party.join(', '))}${r.cost > 0 ? ' · Preparation expense: ' + r.cost + 'g' : ''}</div>`,
            ),
          )
          .join('')
      : '<p>No reports.</p>';
  if (tab === 'Journal')
    html += `<details><summary>Completed contracts · ${state.missions.filter((m) => m.status === 'resolved').length}</summary>${state.missions
      .filter((m) => m.status === 'resolved')
      .reverse()
      .map(
        (m) =>
          `<p>${esc(D.contracts.find((d) => d.id === m.id).name)} · completed${m.completedDay ? ' Day ' + m.completedDay : ''}</p>`,
      )
      .join(
        '',
      )}</details><div class="card"><h3>Recovered keys</h3><p>${state.flags.repaired ? 'Cellar hatch key · recovered from the restored service room.<br>' : ''}${state.flags.anchor ? 'Bell-tower key and labyrinth-gate key · returned by Wren’s keeper.' : ''}</p></div><div class="row">${btn('Save checkpoint', 'save')}${btn('Load checkpoint', 'load')}${btn('Export save', 'export')}${btn('Import save', 'import')}${btn('New guild', 'new')}</div><input hidden type="file" id="save-file" accept="application/json">${[
      ...state.journal,
    ]
      .reverse()
      .map((j) => card(j.kind, paragraphs(j.text)))
      .join('')}<h3>Gold ledger</h3>${state.transactions
      .filter((t) => t.amount !== 0)
      .slice(0, 40)
      .map((t) => `<p>Day ${t.day} · ${t.amount > 0 ? '+' : ''}${t.amount}g · ${esc(t.text)}</p>`)
      .join('')}`;
  const scroll = $('panel-content')?.scrollTop || 0,
    oldTab = $('panel').dataset.section;
  $('panel').dataset.section = tab || '';
  $('panel').innerHTML = html + '</div>';
  if (oldTab === tab) $('panel-content').scrollTop = scroll;
  updatePanelAccess();
}
function updatePanelAccess() {
  const modal = !!tab && window.innerWidth <= 700;
  for (const element of [document.querySelector('header'), $('nav'), $('world'), $('story-rail')])
    if (element) element.inert = modal;
  $('panel').setAttribute('role', modal ? 'dialog' : 'complementary');
  if (modal) $('panel').setAttribute('aria-modal', 'true');
  else $('panel').removeAttribute('aria-modal');
}
function closePanel() {
  D.leaveStore(state);
  tab = null;
  keys = {};
  renderUI();
  canvas.focus();
}
$('status').onclick = () => {
  tab = 'Journal';
  keys = {};
  walkTarget = null;
  renderUI();
};
function chooseResident(id) {
  D.leaveStore(state);
  if (!D.home(state).some((c) => c.id === id)) throw Error('Resident unavailable.');
  D.rememberPosition(state, state.selected, player);
  const leaving = state.selected,
    assigned = D.settleResident(state, leaving, player);
  if (assigned)
    toast(D.recruits.find((c) => c.id === leaving)?.name + ' now works in ' + assigned.name + '.');
  state.selected = id;
  player = D.residentPosition(state, id);
  keys = {};
  hoveredObject = null;
  walkTarget = null;
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  if (b.dataset.close) {
    closePanel();
    return;
  }
  if (b.dataset.tab) {
    if (b.dataset.tab === 'Store room' && !D.storeAvailable(state)) return;
    tab = tab === b.dataset.tab ? null : b.dataset.tab;
    if (tab === 'Rooms') roomSection = 'dashboard';
    moreOpen = false;
    keys = {};
    walkTarget = null;
    renderUI();
    return;
  }
  const a = b.dataset.action;
  if (!a) return;
  const [op, id, value, choiceLevel] = a.split(':');
  if (op === 'navMore') {
    moreOpen = !moreOpen;
    renderUI();
    $('nav').querySelector('[data-action="navMore"]').focus();
    return;
  }
  moreOpen = false;
  if (op === 'material') {
    materialId = id;
    saleQuantity = 1;
    roomSection = 'stores';
    tab = 'Rooms';
    keys = {};
    walkTarget = null;
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (op === 'roomFilter') {
    roomFilter = id;
    renderUI();
    return;
  }
  if (op === 'craftCategory') {
    craftCategory = id;
    renderUI();
    return;
  }
  if (['craftRecipe', 'recipeOpen', 'recipeReward'].includes(op)) {
    craftRecipe = id;
    if (op !== 'craftRecipe') {
      craftCategory = 'all';
      craftSource = null;
    }
    if (op === 'recipeReward') $('scene').close();
    if (state.guild.patterns.includes(id)) D.readPattern(state, id);
    roomSection = 'recipes';
    tab = 'Rooms';
    persist();
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (op === 'craftSource') {
    craftSource = id === 'all' ? null : id;
    craftCategory = 'all';
    roomSection = 'recipes';
    tab = 'Rooms';
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (op === 'facilitySettings') {
    roomSection = id;
    tab = 'Rooms';
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (op === 'bellDiagram') {
    act(() => D.showBellWardDiagram(state));
    return;
  }
  if (op === 'rewardStore') {
    if (!D.storeAvailable(state)) return;
    $('scene').close();
    tab = 'Store room';
    renderUI();
    return;
  }
  if (op === 'rewardFurniture') {
    if (!state.guild.furniture.some((i) => i.uid === id)) return;
    decoratingFurniture = id;
    decorationRoom = null;
    $('scene').close();
    roomSection = 'decorate';
    tab = 'Rooms';
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (op === 'contractTab') {
    if (!missionTabs.some(([key]) => key === id)) return;
    contractTab = id;
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (op === 'roomPage') {
    if (
      ![
        'dashboard',
        'recipes',
        'stores',
        'overview',
        'house',
        'materials',
        'mara',
        'workshop',
        'garden',
        'infirmary',
        'decorate',
        'storage',
      ].includes(id)
    )
      return;
    roomSection = id;
    tab = 'Rooms';
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (op === 'decorateRoom') {
    decorationRoom = id;
    roomSection = 'decorate';
    tab = 'Rooms';
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (op === 'workplace') {
    houseRoom = id;
    roomSection = 'house';
    tab = 'Rooms';
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (op === 'trainingPage') {
    trainingSection = id;
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (op === 'import') {
    $('save-file').click();
    return;
  }
  if (op === 'homeContracts') {
    tab = 'Contracts';
    contractTab = 'all';
    renderUI();
    return;
  }
  if (op === 'talk') {
    openChoice(id);
    return;
  }
  if (op === 'expeditionEvent') {
    openExpeditionDecision(id);
    return;
  }
  if (op === 'letter') {
    openMission(id);
    return;
  }
  if (op === 'localWalk') {
    const room = D.roomAt(player.floor);
    if (!room || !['48', '135', 'treasure'].includes(id)) return;
    if (id !== '48' && room.encounter && !state.flags['cleared_' + room.id]) {
      toast('Clear the room’s guardian before approaching its treasure.');
      return;
    }
    closePanel();
    walkTarget = id === '48' ? room.x + 48 : chamberTreasureX(room);
    canvas.focus();
    return;
  }
  if (op === 'routeWalk') {
    const p = D.passages.find((p) => p.id === id);
    if (!p || p.from !== currentSource(player.floor)) {
      toast('Reach the source room first.');
      return;
    }
    closePanel();
    walkTarget = p.x;
    canvas.focus();
    return;
  }
  if (op === 'visitStore') {
    if (!D.storeAvailable(state)) return;
    chooseResident(id);
    closePanel();
    walkTarget = 790;
    canvas.focus();
    return;
  }
  if (op === 'walk') {
    if (Number(id) === 790 && !D.storeAvailable(state)) return;
    if (player.floor !== 380) {
      toast('Return to the ground floor using W / S first.');
      return;
    }
    closePanel();
    walkTarget = Number(id);
    canvas.focus();
    toast('On the way.');
    return;
  }
  act(() => {
    if (op === 'sellMaterial') {
      const qty = Number($('material-sale-quantity').value);
      D.sellResource(state, id, qty);
      saleQuantity = 1;
      toast('Sold ' + qty + ' ' + D.resources.find((r) => r.id === id).name.toLowerCase() + '.');
    }
    if (op === 'roomDay') advanceGuildDay();
    if (op === 'housePause') D.setRoomProduction(state, id, value === 'resume');
    if (op === 'maraGuard') D.setMaraDefence(state, id === 'on');
    if (op === 'queueOrder') {
      const quantity = Number($('workshop-quantity')?.value || 1);
      D.queueWorkshopOrder(state, id, quantity);
      workshopQuantity = quantity;
    }
    if (op === 'removeOrder') D.removeWorkshopOrder(state, id);
    if (op === 'moveOrder') D.moveWorkshopOrder(state, id, value);
    if (op === 'gardenPolicy')
      D.setGardenPolicy(
        state,
        $('garden-policy-mode').value,
        Number($('garden-policy-reserve').value),
      );
    if (op === 'carePolicy')
      D.setCarePolicy(
        state,
        $('care-policy-mode').value,
        $('care-policy-priority').value,
        Number($('care-policy-reserve').value),
      );
    if (op === 'careGarden') D.setGardenPolicy(state, 'reserve', D.carePlan(state).gardenTarget);
    if (op === 'project') D.startRoomProject(state, id, value, choiceLevel || null);
    if (op === 'workshopConversion') D.startWorkshopConversion(state, id, value);
    if (op === 'furnitureMove') {
      D.moveFurniture(state, id, value, choiceLevel);
      decoratingFurniture = choiceLevel;
      toast(
        D.furnishings.find(
          (d) => d.id === state.guild.furniture.find((i) => i.uid === choiceLevel).id,
        ).name +
          ' placed in ' +
          D.furnitureTarget(state, id).name +
          '.',
      );
    }
    if (op === 'furnitureRemove') D.placeFurniture(state, id, value, null);
    if (op === 'cancelProject') D.cancelRoomProject(state, id);
    if (op === 'upgradeRoom') D.upgradeFacility(state, id);
    if (op === 'resource') D.buyResources(state, id);
    if (op === 'expeditionDecision') {
      D.resolveExpeditionDecision(state, id, value);
      $('scene').close();
    }
    if (op === 'record') D.recoverRecord(state, id);
    if (op === 'new') {
      if (!confirm('Start a new guild? Export your current save first to keep it.')) return;
      state = D.initial();
      state.flags.opening = true;
      player = spawn();
      walkTarget = null;
      toast('A new guild begins.');
    }
    if (op === 'select') chooseResident(id);
    if (op === 'gear') D.equip(state, id, value);
    if (op === 'treat') D.treat(state, id);
    if (op === 'advance') D.advance(state, id, value, choiceLevel);
    if (op === 'buy') D.buyEquipment(state, id);
    if (op === 'equipItem') D.equipItem(state, id, value);
    if (op === 'unequip') D.unequip(state, id, value);
    if (op === 'watch') {
      const m = state.missions.find((m) => m.uid === id),
        def = D.contracts.find((d) => d.id === m.id),
        loc = def.homeEvent
          ? { x: 640, y: 380, ...state.threats[m.id] }
          : def.location || { x: 760, y: 1250 };
      player = { x: loc.x - 170, y: loc.y, floor: loc.y, vy: 0 };
      tab = null;
      walkTarget = null;
    }
    if (op === 'specialise') D.specialise(state, id, value);
    if (op === 'talent') D.learnTalent(state, id, value);
    if (op === 'heal' || op === 'mend') D.castRestoration(state, id, value, op);
    if (op === 'raise') D.raiseDead(state, id, value);
    if (op === 'remains') D.recoverRemains(state, id);
    if (op === 'repairDamage') D.repairDamage(state, id);
    if (op === 'withdraw') D.withdraw(state, id, value ? [value] : null);
    if (op === 'dispatch')
      D.dispatch(
        state,
        id,
        [...document.querySelectorAll(`[data-party="${id}"]:checked`)].map((x) => x.value),
        { medicalKit: $('kit-' + id).value },
      );
    if (op === 'decide') {
      D.decide(state, id, value);
      $('scene').close();
    }
    if (op === 'story') {
      D.narrativeChoice(state, id, value);
      $('scene').close();
    }
    if (op === 'recallCompanion') D.recallEarlyCompanion(state, id);
    if (op === 'trainingGear') D.chooseTrainingEquipment(state, id, value, choiceLevel);
    if (op === 'emergency') D.emergency(state);
    if (op === 'save') {
      localStorage.setItem('bound-house-checkpoint', D.save(state));
      toast('Checkpoint saved.');
    }
    if (op === 'load') {
      const raw = localStorage.getItem('bound-house-checkpoint');
      if (!raw) throw Error('No checkpoint yet.');
      state = D.load(raw);
      player = D.residentPosition(state, state.selected);
      walkTarget = null;
      toast('Checkpoint restored.');
    }
    if (op === 'export') {
      const url = URL.createObjectURL(new Blob([D.save(state)], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = 'bound-house-save.json';
      link.click();
      URL.revokeObjectURL(url);
    }
    if (op === 'import') $('save-file').click();
  });
});
document.addEventListener('input', (e) => {
  if (e.target.id === 'room-search') {
    roomSearch = e.target.value;
    clearTimeout(renderUI.searchTimer);
    const caret = e.target.selectionStart;
    renderUI.searchTimer = setTimeout(() => {
      renderUI();
      const input = $('room-search');
      if (input) {
        input.focus();
        input.setSelectionRange(caret, caret);
      }
    }, 180);
  }
  if (e.target.id === 'material-sale-quantity') {
    saleQuantity = Number(e.target.value || 0);
    const button = $('panel-content').querySelector('[data-action^="sellMaterial:"]'),
      r = D.resources.find((r) => r.id === materialId);
    if (button && r) {
      button.textContent = 'Sell for ' + saleQuantity * r.sell + 'g';
      button.disabled =
        !Number.isSafeInteger(saleQuantity) ||
        saleQuantity < 1 ||
        saleQuantity > D.resourceStock(state, r.id);
    }
  }
});
document.addEventListener('change', async (e) => {
  if (e.target.id === 'room-search') {
    roomSearch = e.target.value;
    renderUI();
    $('room-search')?.focus();
    return;
  }
  if (e.target.id === 'material-sale-quantity') {
    return;
  }
  if (e.target.id === 'workshop-quantity') {
    const quantity = Number(e.target.value);
    if (Number.isInteger(quantity) && quantity >= 1 && quantity <= 99) workshopQuantity = quantity;
    else {
      toast('Choose between 1 and 99 items per order.');
      e.target.value = workshopQuantity;
    }
    return;
  }
  if (e.target.id.startsWith('kit-')) {
    updatePartyPreview(e.target.id.slice(4));
    return;
  }
  if (e.target.dataset.roomWorker) {
    act(() => {
      D.assignWorker(state, e.target.dataset.roomWorker, e.target.value || null);
      if (e.target.value === state.selected) {
        player = D.residentPosition(state, state.selected);
        walkTarget = null;
      }
    });
    return;
  }
  if (e.target.id === 'house-room') {
    houseRoom = e.target.value;
    renderUI();
    return;
  }
  if (e.target.id === 'decorate-room') {
    decorationRoom = e.target.value;
    renderUI();
    return;
  }
  if (e.target.dataset.houseRoom) {
    act(() => {
      D.assignRoomWorker(
        state,
        e.target.dataset.houseRoom,
        Number(e.target.dataset.houseSlot),
        e.target.value || null,
      );
      if (e.target.value === state.selected) {
        player = D.residentPosition(state, state.selected);
        walkTarget = null;
      }
    });
    return;
  }
  if (e.target.id === 'decorate-furniture') {
    decoratingFurniture = e.target.value || null;
    renderUI();
    return;
  }
  if (e.target.dataset.furnitureFacility) {
    act(() =>
      D.placeFurniture(
        state,
        e.target.dataset.furnitureFacility,
        e.target.dataset.furnitureSlot,
        e.target.value || null,
      ),
    );
    return;
  }
  if (e.target.id === 'personal-record') {
    selectedRecord = e.target.value;
    renderUI();
    return;
  }
  if (e.target.id === 'character-page') {
    characterPage = e.target.value;
    renderUI();
    return;
  }
  if (e.target.id === 'training-character') {
    trainingResident = e.target.value;
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (e.target.id === 'training-level') {
    trainingLevels[trainingResident] = Number(e.target.value);
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (e.target.dataset.trainingTarget) {
    trainingTargets[e.target.dataset.trainingTarget] = e.target.value;
    renderUI();
    return;
  }
  if (e.target.dataset.party) updatePartyPreview(e.target.dataset.party);
  if (e.target.id === 'save-file' && e.target.files[0]) {
    try {
      state = D.load(await e.target.files[0].text());
      player = D.residentPosition(state, state.selected);
      walkTarget = null;
      persist();
      renderUI();
      presentScene();
      toast('Save imported.');
    } catch (err) {
      toast(err.message);
    }
  }
});
function advanceGuildDay() {
  D.day(state);
  const m = state.missions.find((m) => m.status === 'decision' || m.pendingEvent);
  const summary = state.guild.dailySummary?.lines || [];
  if (summary.length || m)
    toast(
      (summary.length ? summary.join(' · ') : '') +
        (m ? ' · An expedition decision is waiting in Contracts.' : ''),
    );
}
$('day').onclick = () => act(advanceGuildDay);

function choiceLocation(id) {
  if (id === 'landingPurpose') return 1185;
  const r = D.rooms.find((r) => r.discovery?.id === id || r.read === id);
  return r ? r.x + 145 : 160;
}
function locationName(id) {
  if (id === 'landingPurpose') return 'the returned landing';
  return (
    D.rooms.find((r) => r.discovery?.id === id || r.read === id)?.name.toLowerCase() ||
    'the quarters'
  );
}
function residentPosition(c) {
  return D.residentPosition(state, c.id).x;
}
function visualRoom() {
  const dungeon = D.roomAt(player.floor);
  if (dungeon) return dungeon;
  if (player.floor === 380)
    return [
      { x: 55, w: 230, name: 'Entrance' },
      { x: 285, w: 190, name: 'Quarters' },
      { x: 475, w: 230, name: 'Service corridor' },
      { x: 705, w: 270, name: 'Service room' },
      { x: 975, w: 290, name: 'Returned landing' },
      ...D.rooms,
    ].find((r) => player.x >= r.x && player.x < r.x + r.w);
  if (player.floor === 555) return { x: 430, w: 390, name: 'Cellar' };
  if (player.floor === 510) return { x: 450, w: 330, name: 'Dry landing' };
  if (player.floor === 140 && player.x > 700) return { x: 705, w: 270, name: 'Store room' };
  return {
    x: 300,
    w: player.floor === 140 ? 390 : 600,
    name: player.floor < 380 ? 'Bell tower' : 'Labyrinth',
  };
}
const zoomControls = document.createElement('div');
zoomControls.className = 'zoom-controls';
zoomControls.setAttribute('aria-label', 'Room camera');
zoomControls.innerHTML =
  '<button id="zoom-out" aria-label="Zoom out">−</button><output id="zoom-level" aria-live="polite">125%</output><button id="zoom-in" aria-label="Zoom in">+</button><button id="focus-room">Focus room</button><button id="wide-view">Wide view</button>';
$('world').append(zoomControls);
function setZoom(value) {
  graphics.setZoom(value);
  $('zoom-level').textContent = Math.round(graphics.targetZoom * 100) + '%';
}
$('zoom-in').onclick = () => {
  graphics.focus = false;
  setZoom(graphics.targetZoom + 0.25);
};
$('zoom-out').onclick = () => {
  graphics.focus = false;
  setZoom(graphics.targetZoom - 0.25);
};
$('wide-view').onclick = () => {
  graphics.focus = false;
  setZoom(0.85);
};
$('focus-room').onclick = () => {
  graphics.focus = true;
  const room = visualRoom();
  setZoom(Math.min(2.5, (graphics.width * 0.8) / (room?.w || 500)));
};
canvas.addEventListener(
  'wheel',
  (e) => {
    if (tab || $('scene').open) return;
    e.preventDefault();
    graphics.focus = false;
    setZoom(graphics.targetZoom + (e.deltaY < 0 ? 0.15 : -0.15));
  },
  { passive: false },
);
canvas.addEventListener('mousemove', (e) => {
  if (tab || $('scene').open) {
    hoveredObject = null;
    return;
  }
  const b = canvas.getBoundingClientRect(),
    scale = Math.min(b.width / graphics.width, b.height / 650);
  const point = screenToWorld(
    (e.clientX - b.left - (b.width - graphics.width * scale) / 2) / scale,
    (e.clientY - b.top - (b.height - 650 * scale) / 2) / scale,
    camera,
    cameraY,
    graphics.zoom,
    graphics.width,
  );
  hoveredObject =
    hotspots().find(
      (h) =>
        !h.done &&
        (h.action || h.choice) &&
        h.y === player.floor &&
        Math.abs(h.x - point.x) < 22 &&
        Math.abs(h.y - 37 - point.y) < 27,
    ) || null;
  canvas.style.cursor =
    hoveredObject || productionBadgeAt(state, point.x, point.y) ? 'pointer' : 'default';
});
canvas.addEventListener('mouseleave', () => {
  hoveredObject = null;
  canvas.style.cursor = 'default';
});
function hotspots() {
  const list = [
    { x: mara.x, y: mara.y, action: 'mara', text: 'E · Speak to Mara · brass golem familiar' },
    {
      x: 790,
      y: 380,
      action: 'storeEnter',
      text: 'E · Enter STORE ROOM · shared equipment',
      show: D.storeAvailable(state),
    },
    {
      x: 865,
      y: 140,
      action: 'storeOpen',
      text: 'E · Open equipment shelves',
      show: D.storeAvailable(state),
    },
    { x: 750, y: 140, action: 'storeExit', text: 'E · Leave store room' },
    {
      x: 880,
      y: 1020,
      action: 'furnace',
      text: state.flags.dragonFound ? 'E · Enter the furnace room' : 'E · Open the warm iron door',
      show: state.flags.labyrinthHeart,
    },
    {
      x: 350,
      y: 1250,
      action: 'leaveFurnace',
      text: 'E / W · Return to the labyrinth',
      done: false,
    },
    {
      x: 350,
      y: 380,
      action: 'tower',
      text: state.flags.tower
        ? 'W · Climb the bell tower'
        : `E · Reconnect tower stairs · ${state.roster.some((c) => c.skills.includes('stoneSong') && c.status === 'home') ? 40 : 80}g · Wren’s key`,
      done: state.flags.tower,
    },
    { x: 350, y: 140, text: 'W · Tower crown / S · Ground floor', done: true },
    { x: 350, y: -100, text: 'S · Lower tower landing', done: true },
    {
      x: 530,
      y: 790,
      text: 'W · Cellar / S · Labyrinth heart · Tracking or Echo sight',
      done: true,
    },
    { x: 530, y: 1020, text: 'W · Upper labyrinth', done: true },
    {
      x: 555,
      y: 510,
      action: state.flags.labyrinth ? 'enterLabyrinth' : 'labyrinth',
      text: state.flags.labyrinth
        ? 'E · Enter the labyrinth'
        : 'E · Follow the brass thread · Wren’s key',
      show: state.flags.anchor,
    },
    {
      x: 705,
      y: 380,
      action: state.flags.breach ? 'repair' : 'wall',
      text: state.flags.breach
        ? state.flags.repaired
          ? 'Service room restored'
          : 'E · Restore service room · ' + D.serviceRepairCost(state) + 'g'
        : 'E · Breach sealed wall · Strength 10',
      done: state.flags.repaired,
    },
    {
      x: 870,
      y: 380,
      action: 'ledger',
      text: state.flags.ledger ? 'Ledger recorded' : 'E · Read concealed ledger',
      done: state.flags.ledger,
      show: state.flags.repaired,
    },
    {
      x: 505,
      y: 380,
      action: 'stairs',
      text: state.flags.stairs
        ? 'S · Descend to the dry cellar landing'
        : 'E · Repair cellar stairs · 45g',
      done: state.flags.stairs,
    },
    {
      x: 535,
      y: 510,
      action: 'stairsHelp',
      text: state.flags.cellarDrained
        ? 'W · Upstairs · S · Enter drained cellar'
        : 'W · Upstairs · S · Dive to drain wheel (Water breathing)',
      done: true,
      show: state.flags.stairs,
    },
    {
      x: 715,
      y: 555,
      action: 'drain',
      text: state.flags.cellarDrained
        ? 'Drain locked open'
        : 'E · Open drain wheel · Water breathing',
      done: state.flags.cellarDrained,
      show: state.flags.stairs,
    },
    {
      x: 580,
      y: 555,
      action: 'cellar',
      text: state.flags.cellar
        ? 'Ship chart recorded · W near stairs to return'
        : state.flags.cellarDrained
          ? 'E · Investigate exposed ship fragment'
          : 'E · Investigate ship fragment · Water breathing',
      done: state.flags.cellar,
    },
    {
      x: 1100,
      y: 380,
      action: 'inscription',
      text: state.flags.inscription
        ? 'The house inscription is recorded'
        : 'E · Read inscription · Rowan’s house sight',
      show: state.flags.anchor,
      done: state.flags.inscription,
    },
  ];
  for (const n of D.availableChoices(state)) {
    list.push({ x: choiceLocation(n.id), y: 380, choice: n.id, text: 'E · ' + n.title });
  }
  for (const r of D.rooms.filter((r) => state.flags[r.anchor])) {
    if (!state.flags[r.operational])
      list.push({
        x: r.id === 'library' && !state.flags.libraryOpened ? 1260 : r.x + 65,
        y: 380,
        action: 'room:' + r.id,
        text: `E · Restore ${r.name.toLowerCase()} · ${r.cost}g${r.requiresSkill ? ' · Magical literacy' : ''}${r.id === 'threshold' ? ' · Safe preparation' : ''}`,
      });
  }
  for (const c of D.home(state).filter((c) => c.id !== state.selected)) {
    const n = D.availableChoices(state, c.id)[0];
    if (n)
      list.push({
        x: residentPosition(c),
        y: D.residentPosition(state, c.id).floor,
        choice: n.id,
        text: `E · Speak with ${c.name}: ${n.title}`,
      });
  }
  for (const d of D.sleepers) {
    if (d.requires.every((f) => state.flags[f]) && !state.roster.some((c) => c.id === d.id))
      list.push({
        x: d.x,
        y: d.y,
        action: (state.flags['found_' + d.id] ? 'awaken:' : 'discover:') + d.id,
        text:
          'E · ' +
          (state.flags['found_' + d.id]
            ? 'Awaken ' + d.name + ' · ' + d.method
            : 'Investigate ' + d.condition.toLowerCase() + ' figure'),
        done: false,
      });
  }
  for (const d of D.residentDiscoveries.filter((d) => D.discoveryAvailable(state, d)))
    list.push({
      x: d.x,
      y: d.y,
      action: 'recover:' + d.id,
      text: 'E · ' + d.condition + ' · ' + d.method,
    });
  for (const p of D.passages.filter((p) => p.from === currentSource(player.floor))) {
    if (
      (p.from === 'tower' && !state.flags.tower) ||
      (p.from === 'labyrinth' && !state.flags.labyrinthHeart)
    )
      continue;
    list.push({ x: p.x, y: p.y, action: 'passage:' + p.id, text: 'E · ' + passageLabel(state, p) });
  }
  const room = D.roomAt(player.floor);
  if (room) {
    list.push({
      x: room.x + 48,
      y: room.y,
      action: 'leave:' + room.id,
      text: 'E · Return through the marked passage',
    });
    list.push({
      x: chamberTreasureX(room),
      y: room.y,
      action:
        room.trap && !trapDisarmed(state, room) && !state.flags['searched_' + room.id]
          ? 'disarm:' + room.id
          : 'search:' + room.id,
      text:
        room.trap && !trapDisarmed(state, room) && !state.flags['searched_' + room.id]
          ? 'E · Disarm trap · ' + trapRequirement(room)
          : state.flags['searched_' + room.id]
            ? 'Records and treasure recovered'
            : 'E · Investigate the room’s records and treasure',
      done: state.flags['searched_' + room.id],
    });
  }
  for (const record of D.availableRecords(state).filter((r) => !r.who)) {
    const chamber = D.chambers.find((r) => r.id === record.id),
      main = D.rooms.find((r) => r.id === record.id);
    const locations = {
      entrance: [185, 380],
      service: [920, 380],
      quarters: [440, 380],
      cellar: [850, 555],
      tower: [620, -100],
      labyrinth: [730, 1020],
    };
    const location = chamber
      ? [chamber.encounter ? chamberTreasureX(chamber) - 65 : chamber.x + 235, chamber.y]
      : main
        ? [main.x + 225, 380]
        : locations[record.id];
    if (location)
      list.push({
        x: location[0],
        y: location[1],
        action: 'record:' + record.id,
        text: 'E · Personal record · ' + record.author,
      });
  }
  return list.filter((h) => h.show !== false);
}
function nearest() {
  return hotspots()
    .filter((h) => Math.abs(h.x - player.x) < 58 && Math.abs(h.y - player.y) < 45)
    .sort(
      (a, b) =>
        (a.action?.includes(':') ? 0 : a.done ? 2 : 1) -
          (b.action?.includes(':') ? 0 : b.done ? 2 : 1) ||
        Math.abs(a.x - player.x) - Math.abs(b.x - player.x),
    )[0];
}
function stair(direction) {
  const c = D.home(state).find((c) => c.id === state.selected);
  const dest =
    guildStairs(player, direction, state, c) ||
    useStairs(player, direction, {
      repaired: state.flags.stairs,
      water: c.skills.includes('water'),
      selected: c.id,
      anchor: state.flags.anchor,
      drained: state.flags.cellarDrained,
    });
  if (dest.error) {
    toast(dest.error);
    return;
  }
  player = { ...dest, vy: 0, floor: dest.y };
  grounded = true;
  walkTarget = null;
  D.visitFloor(state, dest.y);
  persist();
  renderUI();
}
canvas.tabIndex = 0;
canvas.addEventListener('click', (e) => {
  const bounds = canvas.getBoundingClientRect();
  const scale = Math.min(bounds.width / graphics.width, bounds.height / 650);
  const inset = (bounds.width - graphics.width * scale) / 2;
  const insetY = (bounds.height - 650 * scale) / 2;
  const point = screenToWorld(
      (e.clientX - bounds.left - inset) / scale,
      (e.clientY - bounds.top - insetY) / scale,
      camera,
      cameraY,
      graphics.zoom,
      graphics.width,
    ),
    wx = point.x,
    wy = point.y;
  const selectedRoom = productionBadgeAt(state, wx, wy);
  if (selectedRoom) {
    houseRoom = selectedRoom.id;
    roomSection = 'house';
    tab = 'Rooms';
    keys = {};
    walkTarget = null;
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (tab) return;
  const route = [
    { x: 400, y: 380, to: 350 },
    { x: 505, y: 380, to: 505 },
    { x: 600, y: 510, to: 555 },
    { x: 530, y: 790, to: 530 },
  ].find((r) => Math.abs(wx - r.x) < 45 && wy > r.y - 95 && wy < r.y - 15 && player.floor === r.y);
  walkTarget = hoveredObject
    ? hoveredObject.x + Math.sign(player.x - hoveredObject.x || -1) * 30
    : route
      ? route.to
      : wx;
  canvas.focus();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && moreOpen) {
    moreOpen = false;
    renderUI();
    $('nav').querySelector('[data-action="navMore"]').focus();
    return;
  }
  if (e.key === 'Escape' && tab) {
    closePanel();
    return;
  }
  if (
    tab ||
    moreOpen ||
    $('scene').open ||
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) ||
    (e.target.closest('button,a,summary') && ['Tab', ' '].includes(e.key))
  )
    return;
  if (['Tab', ' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key))
    e.preventDefault();
  const key = e.key.toLowerCase();
  if (!e.repeat && !keys[key]) {
    if (e.key === 'Tab') {
      const list = D.home(state);
      act(() =>
        chooseResident(list[(list.findIndex((c) => c.id === state.selected) + 1) % list.length].id),
      );
    }
    if (key === 'e') {
      const h = nearest();
      if (h && !h.done) {
        if (h.action?.startsWith('recover:')) {
          act(() =>
            D.recoverResident(state, h.action.slice(8), { x: player.x, floor: player.floor }),
          );
          return;
        }
        if (h.action?.startsWith('passage:')) {
          act(() => {
            player = D.enterPassage(state, h.action.split(':')[1], {
              x: player.x,
              floor: player.floor,
            });
            walkTarget = null;
            grounded = true;
          });
          return;
        }
        if (h.action?.startsWith('leave:')) {
          act(() => {
            player = D.leaveChamber(state, h.action.split(':')[1]);
            walkTarget = null;
            grounded = true;
          });
          return;
        }
        if (h.action?.startsWith('record:')) {
          act(() => D.recoverRecord(state, h.action.slice(7)));
          return;
        }
        if (h.action?.startsWith('disarm:')) {
          act(() => D.disarmChamberTrap(state, h.action.split(':')[1]));
          return;
        }
        if (h.action?.startsWith('search:')) {
          act(() => D.investigateChamber(state, h.action.split(':')[1]));
          return;
        }
        if (h.action === 'storeEnter') {
          if (state.selected === 'rowan') {
            toast('Control a fit recruit to visit the store.');
            return;
          }
          act(() => D.enterStore(state, state.selected));
          if (state.storeVisitor) {
            player = { x: 865, y: 140, floor: 140, vy: 0 };
            tab = 'Store room';
            renderUI();
          }
          return;
        }
        if (h.action === 'storeOpen') {
          act(() => {
            D.enterStore(state, state.selected);
            tab = 'Store room';
          });
          return;
        }
        if (h.action === 'storeExit') {
          D.leaveStore(state);
          player = { x: 865, y: 380, floor: 380, vy: 0 };
          return;
        }
        if (h.action === 'furnace') {
          act(() => D.interact(state, 'dragon'));
          player = { x: 350, y: 1250, floor: 1250, vy: 0 };
          keys = {};
          walkTarget = null;
          return;
        }
        if (h.action === 'leaveFurnace') {
          player = { x: 875, y: 1020, floor: 1020, vy: 0 };
          keys = {};
          walkTarget = null;
          return;
        }
        if (h.action === 'enterLabyrinth') {
          player = { x: 530, y: 790, vy: 0, floor: 790 };
          keys = {};
          walkTarget = null;
          return;
        }
        if (h.choice) openChoice(h.choice);
        else
          act(() => {
            D.interact(state, h.action);
            toast(
              h.action === 'wall'
                ? 'The wall opens. Restoration is a separate job.'
                : h.action === 'ledger'
                  ? 'A new expedition lead is in Contracts.'
                  : h.action === 'mara'
                    ? 'Mara sets the kettle down to listen.'
                    : 'The house has changed.',
            );
          });
      }
    }
    if (key === 'w' || key === 'arrowup') stair('up');
    if (key === 's' || key === 'arrowdown') stair('down');
    if (e.key === ' ' && grounded) {
      player.vy = -440;
      grounded = false;
    }
  }
  keys[key] = true;
});
document.addEventListener('keyup', (e) => (keys[e.key.toLowerCase()] = false));
window.addEventListener('blur', () => (keys = {}));

function drawMara() {
  const threat = D.homeDanger(state),
    target = threat && D.maraPower(state) > 0 ? state.threats[threat.id] : null;
  const x = target ? target.x - 210 : mara.x,
    y = target ? target.y : mara.y,
    tier = state.guild.house.mara.tier;
  rect(x - 15, y - 30, 30, 22, '#a77c39');
  rect(x - 12, y - 49, 24, 18, '#d4ad62');
  rect(x - 19, y - 29, 5, 19, '#d4ad62');
  rect(x + 15, y - 29, 5, 19, '#d4ad62');
  rect(x - 11, y - 8, 8, 8, '#73572e');
  rect(x + 3, y - 8, 8, 8, '#73572e');
  rect(x - 7, y - 43, 4, 4, '#a8eff0');
  rect(x + 3, y - 43, 4, 4, '#a8eff0');
  rect(x - 4, y - 25, 8, 8, '#89d9e5');
  rect(x + 8, y - 19, 4, 7, '#f3d68c');
  text('MARA · BRASS GOLEM', x - 48, y - 59, 9, '#e4c890');
  if (tier > 1) {
    rect(x - 17, y - 34, 34, 5, tier >= 3 ? '#96c8c4' : '#b5b6a0');
    rect(x + 18, y - 28, 9, 18, '#9faeaa');
    text('T' + tier, x - 7, y - 73, 8, '#b8d4cb');
  }
  if (target)
    paintSpell(
      ctx,
      camera,
      { x, y: y - 25 },
      { x: target.x, y: target.y - 35 },
      graphics.reducedMotion ? 0 : last / 1000,
      'warrior',
    );
}
function rect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x - camera, y, w, h);
}
function text(t, x, y, size = 14, color = '#adbaab') {
  ctx.fillStyle = color;
  ctx.font = `${size}px Georgia`;
  ctx.fillText(t, x - camera, y);
}
function drawRoom(x, w, name, restored, details) {
  const view = visibleBounds(camera, cameraY, graphics.zoom, graphics.width);
  if (x + w < view.left - 50 || x > view.right + 50) return;
  paintInterior(ctx, camera, x, w, name, restored, graphics.reducedMotion ? 0 : last / 1000);
  paintRoomIdentity(ctx, camera, x, w, name, restored, graphics.reducedMotion ? 0 : last / 1000);
}
function missingRoom(x, w, name, lead) {
  rect(x, 204, w, 200, '#0d111a');
  for (let i = 0; i < 9; i++) rect(x + (i % 2) * 9, 205 + i * 21, 13, 15, '#535048');
  rect(x, 395, 40, 12, '#796348');
  text(name, x + 20, 275, 15, '#708d7b');
  text(lead, x + 20, 300, 12, '#708d7b');
}
function drawResident(c, x, y, controlled = false) {
  paintCharacter(ctx, camera, c, x, y, controlled, player.facing || 1);
  paintEquipment(
    ctx,
    camera,
    c,
    x,
    y,
    graphics.reducedMotion ? 0 : last / 1000,
    controlled ? player.facing || 1 : 1,
  );
  if (c.specialisation || c.undead)
    text(D.classOf(c).name, x - 30, y - 78, 9, c.undead ? '#99c58e' : '#d8bc82');
  if (!controlled && D.availableChoices(state, c.id).length)
    text('…', x - 5, y - 75, 20, '#c5a268');
}
function drawWorld(c) {
  const activeRoom = visualRoom();
  if (graphics.focus && activeRoom) {
    const key = player.floor + ':' + activeRoom.x;
    if (graphics.focusKey !== key) {
      graphics.focusKey = key;
      setZoom(Math.min(2.5, (graphics.width * 0.8) / activeRoom.w));
    }
  }
  const target =
    graphics.focus && activeRoom
      ? activeRoom.x + activeRoom.w / 2 - graphics.width / 2
      : player.x - graphics.width / 2;
  camera += (target - camera) * 0.08;
  cameraY += (player.floor - 380 - (graphics.focus ? 55 : 0) - cameraY) * 0.09;
  graphics.begin(ctx);
  const ambience = {
    camera,
    cameraY,
    floor: player.floor,
    time: graphics.reducedMotion ? 0 : last / 1000,
    width: graphics.width,
  };
  paintSky(ctx, ambience);
  graphics.world(ctx, cameraY);
  paintGuildRoof(ctx, camera, last / 1000);
  drawRoom(55, 230, 'ENTRANCE', true, 'The token keeps the road open');
  drawRoom(285, 190, 'QUARTERS', true, 'Beds for those who return');
  drawRoom(475, 230, 'SERVICE CORRIDOR', true, 'Stairs reach a dry landing');
  drawRoom(
    705,
    270,
    'SERVICE ROOM',
    state.flags.repaired,
    state.flags.repaired ? 'The ledger found a shore' : 'Bricked shut from within',
  );
  if (!state.flags.breach) {
    for (let y = 240; y < 395; y += 20)
      for (let x = 698; x < 728; x += 16) rect(x + (y % 40 ? 0 : 6), y, 14, 18, '#877b65');
    text('STR 10', 686, 330, 12, '#e8be82');
  } else {
    rect(698, 236, 30, 7, '#a59874');
  }
  if (state.flags.repaired) {
    rect(780, 319, 22, 61, '#283c44');
    text('STORE ↑ · E', 758, 305, 10, '#b9d8d2');
    rect(850, 350, 50, 14, '#ae8958');
    rect(870, 338, 20, 12, '#e0cb91');
    rect(935, 312, 8, 62, '#cead5e');
    rect(930, 331, 18, 18, '#18202a');
    if (state.flags.anchor) rect(934, 335, 10, 10, '#d3ad61');
    text(state.flags.anchor ? 'BRASS FITTING' : 'EMPTY SOCKET', 904, 300, 9, '#cead5e');
  }
  if (state.flags.anchor) {
    drawRoom(
      975,
      290,
      'THE RETURNED LANDING',
      true,
      state.flags.welcomeLanding
        ? 'A chair for visitors'
        : state.flags.memorialLanding
          ? 'An oath worth reading'
          : 'Rain falls from a distant shore',
    );
    rect(1090, 323, 28, 44, '#4d7a69');
    text('◇', 1098, 350, 22, '#d8d197');
    rect(1175, 360, 16, 22, '#a78a61');
    rect(1175, 348, 5, 20, '#a78a61');
  } else missingRoom(975, 290, 'A MISSING LANDING', 'An anchor might bring it home');
  const view = visibleBounds(camera, cameraY, graphics.zoom, graphics.width);
  for (const r of D.rooms) {
    if (r.x + r.w < view.left - 50 || r.x > view.right + 50) continue;
    if (state.flags[r.anchor]) {
      drawRoom(
        r.x,
        r.w,
        r.name,
        state.flags[r.operational],
        state.flags[r.operational] ? r.restored : r.ruined,
      );
      if (r.region) {
        const color = {
          fen: '#83bba9',
          ash: '#dba876',
          glass: '#a5cbe0',
          root: '#99be88',
          frost: '#b2d9e0',
          clock: '#d9bd83',
          deep: '#7abfbf',
          star: '#bcabe0',
        }[r.region];
        for (let i = 0; i < 3; i++) {
          rect(r.x + 125 + i * 42, 340, 24, 42, color + '55');
          rect(r.x + 122 + i * 42, 335, 30, 5, color);
        }
        text('◇ ' + D.regions.find((g) => g.id === r.region).name, r.x + 100, 325, 11, color);
      }
      if (r.id === 'library') {
        for (let i = 0; i < 8; i++) rect(r.x + 140 + i * 10, 330 - (i % 3) * 8, 7, 50, '#938d63');
        if (!state.flags.libraryOpened) {
          rect(r.x - 5, 250, 14, 145, '#6f637e');
          text('LITERACY', r.x + 12, 320, 11, '#b8a5ce');
        }
      }
      if (r.id === 'garden') {
        for (let i = 0; i < 5; i++) {
          rect(r.x + 120 + i * 22, 355, 15, 28, '#a4815c');
          rect(r.x + 125 + i * 22, 315, 6, 45, '#72946c');
        }
        if (state.flags.hospice) rect(r.x + 35, 357, 65, 24, '#b8baa0');
      }
      if (r.id === 'observatory') {
        rect(r.x + 130, 295, 10, 75, '#a79a71');
        rect(r.x + 102, 285, 90, 14, '#b4b59a');
      }
      if (r.id === 'threshold') {
        rect(r.x + 100, 290, 90, 104, state.flags.gateOpen ? '#7b9a77' : '#4e6a65');
        rect(r.x + 112, 302, 66, 92, '#152a27');
        text(state.flags.prepared ? 'SAFE SEAL' : 'SEVERED', r.x + 112, 348, 11, '#d8d197');
      }
    } else
      missingRoom(
        r.x,
        r.w,
        r.id === 'library' && state.flags.anchor ? 'A MISSING ARCHIVE' : 'A DISTANT FRAGMENT',
        r.id === 'library' && state.flags.anchor
          ? 'Sera kept the chart'
          : 'Its destination is not yet known',
      );
  }
  paintGuildFurnishings(
    ctx,
    camera,
    state,
    D.rooms,
    graphics.reducedMotion ? 0 : last / 1000,
    false,
  );
  rect(430, 435, 390, 145, '#252e38');
  for (let ry = 440; ry < 574; ry += 18)
    for (let rx = 435; rx < 815; rx += 44) {
      rect(rx + (ry % 36 ? 12 : 0), ry, 39, 16, '#303943');
    }
  rect(450, 450, 330, 123, state.flags.cellarDrained ? '#343b38' : '#1a3839');
  rect(450, 568, 330, 12, '#5b6050');
  text(state.flags.cellarDrained ? 'DRAINED CELLAR' : 'FLOODED CELLAR', 480, 475, 15, '#8cabac');
  text('A dry landing above the ship', 480, 492, 11, '#8cabac');
  rect(460, 505, 106, 12, '#6c6354');
  rect(460, 516, 10, 54, '#51493e');
  rect(590, 522, 150, 38, '#273d40');
  if (!state.flags.cellarDrained)
    for (let i = 0; i < 7; i++) rect(550, 530 + i * 5, 230, 1, '#365c5b');
  rect(620, 528, 100, 22, '#665840');
  ctx.strokeStyle = state.flags.cellarDrained ? '#8fd6b7' : '#d38c70';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(735 - camera, 538, 10, 0, Math.PI * 2);
  ctx.moveTo(725 - camera, 538);
  ctx.lineTo(745 - camera, 538);
  ctx.moveTo(735 - camera, 528);
  ctx.lineTo(735 - camera, 548);
  ctx.stroke();
  text(state.flags.cellarDrained ? 'DRAIN OPEN' : 'DRAIN WHEEL · E', 683, 516, 10, '#e4c8a0');
  if (state.flags.stairs) {
    for (let i = 0; i < 6; i++) rect(495 + i * 8, 404 + i * 19, 26, 5, '#aa9270');
    rect(520, 525, 44, 6, '#aa9270');
  } else text('STAIRS COLLAPSED', 480, 425, 10, '#c3ac7b');
  rect(-330, 395, 385, 12, '#736749');
  rect(43, 275, 12, 120, '#8c7d5c');
  text(state.flags.gateOpen ? 'THE ROAD IS OPEN' : 'BOUNDARY', -100, 340, 12, '#c3b38b');
  drawMara();
  if (state.flags.repaired) {
    ctx.save();
    ctx.translate(0, -240);
    drawRoom(705, 270, 'STORE ROOM', true, 'Shared equipment · E at the shelves');
    for (let i = 0; i < 4; i++) {
      rect(795 + i * 34, 330, 26, 50, '#654f3b');
      rect(795 + i * 34, 342, 26, 3, '#c49c62');
    }
    ctx.restore();
  }
  drawVerticalRooms();
  for (const r of D.chambers.filter(
    (r) =>
      state.flags['discovered_' + r.id] &&
      r.x + r.w >= view.left &&
      r.x <= view.right &&
      r.y >= view.top &&
      r.y - 190 <= view.bottom,
  ))
    paintChamber(ctx, camera, r, state, ambience.time);
  paintHouseFurnishings(ctx, camera, state);
  paintProductionBadges(ctx, camera, state, productionSnapshots);
  for (const r of D.home(state).filter((r) => r.id !== c.id)) {
    const position = D.residentPosition(state, r.id);
    drawResident(r, position.x, position.y);
    paintRoomWorker(ctx, camera, state, r, position, graphics.reducedMotion ? 0 : last / 1000);
  }
  for (const d of D.residentDiscoveries.filter((d) => D.discoveryAvailable(state, d))) {
    drawResident(
      { ...D.recruits.find((c) => c.id === d.id), name: '', color: '#9bb3ad' },
      d.x,
      d.y,
    );
    paintResidentPrison(ctx, camera, d, graphics.reducedMotion ? 0 : last / 1000);
  }
  for (const d of D.sleepers) {
    if (
      (d.id === 'maelin' ? !state.flags.towerCrown : d.requires.some((f) => !state.flags[f])) ||
      state.roster.some((c) => c.id === d.id)
    )
      continue;
    rect(
      d.x - 25,
      d.y - 66,
      50,
      66,
      d.id === 'maelin' ? '#76bdb566' : d.id === 'oren' ? '#797974' : '#4c385d',
    );
    drawResident({ ...d, color: d.id === 'oren' ? '#92918a' : d.color }, d.x, d.y);
    if (d.id === 'maelin') {
      ctx.strokeStyle = '#b5e2e0';
      ctx.strokeRect(d.x - 25 - camera, d.y - 66, 50, 66);
    }
    text('◇', d.x - 8, d.y - 85, 23, '#76bdb5');
  }
  drawPassageMarkers();
  drawRouteLandmarks();
  drawHomeAttack();
  drawResident(c, player.x, player.y, true);
  if (!keys.a && !keys.d && !keys.arrowleft && !keys.arrowright && walkTarget === null)
    paintRoomWorker(ctx, camera, state, c, player, graphics.reducedMotion ? 0 : last / 1000);
  graphics.end(ctx);
  paintMagicMotes(ctx, ambience);
}
function drawPassageMarkers() {
  const active = hoveredObject || nearest();
  for (const h of hotspots().filter(
    (h) =>
      h.y === player.floor &&
      (!h.done || (h.text || '').startsWith('W') || (h.text || '').startsWith('S')),
  )) {
    paintAffordance(
      ctx,
      camera,
      h,
      graphics.reducedMotion ? 0 : last / 1000,
      h.action === active?.action && h.choice === active?.choice && h.x === active?.x,
    );
    if (D.roomAt(player.floor)?.id === 'study' && /^(passage|leave):/.test(h.action || '')) {
      const label =
        h.action === 'passage:shelfStair'
          ? 'Potion kitchen'
          : h.action === 'passage:mirrorDoor'
            ? 'Reflection stair · Echo sight'
            : 'Return passage';
      ctx.save();
      ctx.font = '11px system-ui';
      ctx.fillStyle = '#e4d7ab';
      ctx.textAlign = 'center';
      ctx.fillText(label, h.x - camera, h.y + 16);
      ctx.restore();
    }
  }
}
function drawHomeAttack() {
  const d = D.homeDanger(state);
  const battles = D.activeMissions(state).filter(
    (m) => D.contracts.find((def) => def.id === m.id).internal,
  );
  const threats = [
    ...(d ? [{ def: d, location: state.threats[d.id] }] : []),
    ...battles
      .filter((m) => m.id === 'dragon')
      .map((m) => ({ def: D.contracts.find((d) => d.id === m.id), location: { x: 760, y: 1250 } })),
    ...D.contracts
      .filter((d) => d.location && state.threats?.[d.id] && !state.flags[d.exclusive])
      .map((def) => ({ def, location: def.location })),
  ];
  for (const { def, location } of threats) {
    const x = location?.x || 640,
      y = location?.y || 380,
      shape = def.shape || 'dragon',
      time = last / 1000;
    if (def.id !== 'dragon')
      paintCreature(
        ctx,
        camera,
        x,
        y,
        shape,
        def.color || '#c99360',
        graphics.reducedMotion ? 0 : time,
        def.id,
      );
    text(def.name, x - 80, y - 105, 12, '#efbc98');
    const m = battles.find((m) => m.id === def.id);
    if (m) {
      m.party.forEach((id, i) => {
        const c = state.roster.find((c) => c.id === id),
          side = i % 2 ? -1 : 1,
          px = x + side * (90 + Math.floor(i / 2) * 55),
          bob = D.injuryLevel(c) >= 4 || graphics.reducedMotion ? 0 : Math.sin(time * 3 + i) * 3;
        if (c.status !== 'dead') {
          drawResident(c, px, y + bob);
          if (D.injuryLevel(c) >= 4) {
            text('UNCONSCIOUS', px - 28, y + 18, 9, '#edaaa0');
          } else {
            paintSpell(
              ctx,
              camera,
              { x: px, y },
              { x, y },
              graphics.reducedMotion ? 0 : time + i * 0.3,
              c.specialisation || c.type,
            );
          }
        }
      });
      const total = def.days * D.profiles[def.id].amount;
      rect(x - 45, y - 121, 90, 5, '#30242a');
      rect(x - 45, y - 121, 90 * (1 - m.progress / total), 5, '#dc9b74');
      text(
        'FIGHT · ' + Math.floor((m.progress / total) * 100) + '% cleared',
        x - 65,
        y - 105,
        10,
        '#ead4b1',
      );
    }
  }
}
function drawRouteLandmarks() {
  // Visible stair silhouettes and actual doors replace explanatory placards.
  rect(325, 256, 50, 132, '#17252c');
  for (let i = 0; i < 8; i++)
    rect(327 + i * 2, 378 - i * 15, 40, 5, state.flags.tower ? '#cbb28a' : '#666b69');
  rect(326, 244, 49, 9, '#8c9e90');
  if (!state.flags.tower) {
    rect(352, 322, 9, 11, '#bda477');
    ctx.strokeStyle = '#bda477';
    ctx.beginPath();
    ctx.arc(356 - camera, 322, 4, Math.PI, 0);
    ctx.stroke();
  }
  rect(487, 380, 43, 7, state.flags.stairs ? '#bb9870' : '#655a50');
  rect(505, 383, 3, 19, '#cdb78b');
  if (state.flags.stairs) {
    rect(565, 428, 25, 76, '#645e51');
    rect(570, 434, 15, 65, '#172b31');
  }
  if (state.flags.labyrinthHeart) {
    rect(857, 926, 46, 94, '#423b35');
    rect(864, 934, 32, 82, '#20212a');
    rect(884, 978, 5, 5, '#daa662');
  }
  for (const id of D.damagedRooms(state)) {
    const x =
      id === 'service' ? 810 : id === 'quarters' ? 310 : D.rooms.find((r) => r.id === id).x + 30;
    ctx.strokeStyle = '#d28b76';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - camera, 250);
    ctx.lineTo(x + 20 - camera, 290);
    ctx.lineTo(x + 6 - camera, 318);
    ctx.stroke();
  }
}
function drawVerticalRooms() {
  function chamber(x, y, w, title, color) {
    const personality = title.includes('MAP')
      ? 'RETURNED ARCHIVE'
      : title.includes('LABYRINTH')
        ? 'TIDE VAULT'
        : title.includes('CROWN')
          ? 'FROST LABORATORY'
          : title.includes('FURNACE')
            ? 'ASH FORGE'
            : 'CLOCK WORKSHOP';
    ctx.save();
    ctx.translate(0, y - 380);
    paintInterior(ctx, camera, x, w, personality, true, graphics.reducedMotion ? 0 : last / 1000);
    paintRoomIdentity(
      ctx,
      camera,
      x,
      w,
      personality,
      true,
      graphics.reducedMotion ? 0 : last / 1000,
    );
    ctx.restore();
  }
  if (state.flags.tower) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(280 - camera, -500, 670, 410);
    ctx.rect(280 - camera, -90, 420, 300);
    // The lower landing ends before the store room at x 705.
    ctx.clip();
    rect(292, -290, 626, 495, '#353a40');
    ctx.strokeStyle = '#83bbb766';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(605 - camera, -322, 24, 0, Math.PI * 2);
    ctx.moveTo(605 - camera, -358);
    ctx.lineTo(605 - camera, -287);
    ctx.stroke();
    for (let side of [286, 918]) {
      ctx.strokeStyle = '#64887088';
      ctx.beginPath();
      ctx.moveTo(side - camera, -240);
      ctx.bezierCurveTo(side - 15 - camera, -110, side + 18 - camera, 45, side - camera, 183);
      ctx.stroke();
    }
    for (let ry = -280; ry < 205; ry += 22) {
      rect(294, ry, 8, 2, '#7d746044');
      rect(909, ry, 8, 2, '#7d746044');
    }
    ctx.fillStyle = '#30323b';
    ctx.beginPath();
    ctx.moveTo(280 - camera, -290);
    ctx.lineTo(605 - camera, -420);
    ctx.lineTo(932 - camera, -290);
    ctx.fill();
    chamber(300, 140, 390, 'THE BELL TOWER · lower landing', '#425968');
    if (state.flags.towerCrown) chamber(300, -100, 610, 'THE SILENT CROWN', '#405a69');
    else {
      rect(300, -275, 610, 185, '#101722');
      text('THE SILENT CROWN', 330, -185, 16, '#76bdb5');
    }
    for (const y of [140, -100]) {
      for (let i = 0; i < 12; i++) rect(328 + i * 2, y + 15 + i * 18, 38, 5, '#9a805d');
    }
    if (state.flags.towerCrown) {
      rect(747, -240, 66, 7, '#65513c');
      rect(777, -235, 5, 20, '#c5a268');
      ctx.fillStyle = '#a78855';
      ctx.beginPath();
      ctx.moveTo(751 - camera, -155);
      ctx.quadraticCurveTo(763 - camera, -173, 761 - camera, -193);
      ctx.quadraticCurveTo(779 - camera, -228, 797 - camera, -193);
      ctx.quadraticCurveTo(795 - camera, -173, 809 - camera, -155);
      ctx.closePath();
      ctx.fill();
      rect(748, -155, 65, 6, '#c5a268');
      rect(775, -149, 9, 8, '#b9af9f');
      text('An alarm caught between heartbeats', 580, -120, 11, '#76bdb5');
    }
    ctx.restore();
  }
  if (state.flags.labyrinth) {
    rect(290, 605, 630, 445, '#181e27');
    chamber(300, 790, 610, 'THE LABYRINTH · the borrowed paths', '#344342');
    if (state.flags.labyrinthHeart)
      chamber(300, 1020, 610, 'THE MAP THAT KEPT ITS MAKER', '#473c50');
    else {
      rect(300, 850, 610, 210, '#0e141e');
      text('THE FALSE FLOOR', 330, 920, 15, '#76bdb5');
      text('Tracking or Echo sight finds a path below', 330, 946, 12, '#b9af9f');
    }
    for (const y of state.flags.labyrinthHeart ? [790, 1020] : [790]) {
      for (let i = 0; i < 11; i++) rect(505 + i * 2, y - 213 + i * 20, 40, 5, '#8d7355');
      rect(350, y + 8, 470, 2, '#c5a268');
      for (let i = 0; i < 3; i++) {
        rect(410 + i * 140, y - 112, 35, 114, '#303540');
        text('◇', 420 + i * 140, y - 77, 22, '#76bdb5');
      }
    }
  }
  if (state.flags.dragonFound) {
    chamber(300, 1250, 610, 'THE OLD FURNACE', '#773e30');
    drawFurnaceThreat();
  }
}
function drawFurnaceThreat() {
  rect(700, 1120, 160, 143, '#3d2928');
  rect(728, 1140, 100, 120, '#13151d');
  text(
    state.flags.dragonSlain ? 'THE FURNACE IS CLEAR' : 'KEEP BEHIND THE FIREBREAK',
    330,
    1160,
    13,
    '#e6aa60',
  );
  if (!state.flags.dragonSlain) {
    ctx.save();
    ctx.translate(760 - camera, 1250);
    ctx.scale(2, 2);
    paintCreature(
      ctx,
      0,
      0,
      0,
      'dragon',
      '#884a51',
      graphics.reducedMotion ? 0 : last / 1000,
      'dragon',
    );
    ctx.restore();
    const progress = state.threats?.dragon?.progress || 0;
    text(
      'Clearing progress · ' + Math.floor((progress / 600) * 100) + '%',
      665,
      1100,
      14,
      '#d87575',
    );
  } else {
    rect(765, 1210, 65, 42, '#947341');
    rect(765, 1228, 65, 4, '#c5a268');
    text('Forge tools recovered', 670, 1190, 13, '#c5a268');
  }
}
function frame(now) {
  const dt = Math.min((now - last) / 1000 || 0, 0.035);
  last = now;
  graphics.tick(dt);
  const c = D.home(state).find((c) => c.id === state.selected) || D.home(state)[0];
  if (!$('scene').open && !tab) {
    let dir = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
    if (dir) walkTarget = null;
    else if (walkTarget !== null) {
      if (Math.abs(walkTarget - player.x) < 8) walkTarget = null;
      else dir = Math.sign(walkTarget - player.x);
    }
    if (dir) player.facing = dir;
    player.x += dir * 210 * dt;
    const chamber = D.roomAt(player.floor);
    const min = chamber
      ? chamber.x + 20
      : player.floor < 380 || player.floor >= 790
        ? 300
        : c.id === 'rowan' && state.flags.gateOpen
          ? -180
          : 70;
    const max = chamber
      ? chamber.encounter && !state.flags['cleared_' + chamber.id]
        ? chamber.x + 220
        : chamber.x + chamber.w - 20
      : player.floor === 1250 && !state.flags.dragonSlain
        ? 605
        : player.floor < 380 || player.floor >= 790
          ? 900
          : D.walkingBoundary(state, c.id);
    player.x = Math.max(min, Math.min(player.x, max));
    if (player.floor === 510) player.x = Math.max(520, Math.min(player.x, 555));
    if (player.floor === 555) player.x = Math.max(540, Math.min(player.x, 760));
    player.vy += 1100 * dt;
    player.y += player.vy * dt;
    if (player.y >= player.floor) {
      player.y = player.floor;
      player.vy = 0;
      grounded = true;
    }
    if (player.floor === 380 && c.id === 'rowan' && player.x < 0 && !state.flags.free)
      act(() => D.finish(state));
  }
  if (hoveredObject && hoveredObject.y !== player.floor) hoveredObject = null;
  D.rememberPosition(state, state.selected, player);
  drawWorld(c);
  const h = hoveredObject || nearest();
  $('hint').textContent = h ? h.text : '';
  $('position').textContent =
    visualRoom()?.name ||
    (player.floor === 140 && player.x > 705
      ? 'Store room'
      : {
          380: 'Ground floor',
          140: 'Tower landing',
          '-100': 'Bell tower crown',
          510: 'Dry cellar landing',
          555: state.flags.cellarDrained ? 'Drained cellar' : 'Flooded cellar',
          790: 'Upper labyrinth',
          1020: 'Labyrinth heart',
          1250: 'Old furnace',
        }[player.floor]);
  requestAnimationFrame(frame);
}
let loadedSave = false;
try {
  const raw = localStorage.getItem('bound-house-auto');
  if (raw) {
    state = D.load(raw);
    loadedSave = true;
  }
} catch {
  toast('Autosave could not be read; export a checkpoint if needed.');
}
const contentErrors = D.validateContent();
if (contentErrors.length) console.error(contentErrors);
player = D.residentPosition(state, state.selected);
if (loadedSave) persist();
renderUI();
requestAnimationFrame(frame);
if (!state.flags.opening) {
  scene('The visitor at the gate', D.initial().journal[0].text);
  state.flags.opening = true;
  persist();
} else if (state.scenes.length) presentScene();
