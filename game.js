import { renderEquipmentStore } from './equipment-ui.js';
import { renderResidentStrip } from './resident-interface.js';
import {
  renderExpeditions,
  renderHouseholdMilestones,
  renderRelationships,
} from './expedition-ui.js';
import { resourceIcon, paintIcon } from './resource-icons.js';
import { renderRooms } from './room-panel.js';
import { renderPatternRewards } from './management-ui.js';
import { renderNavigation, renderHudResources } from './interface-navigation.js';
import { paintProductionBadges, productionBadgeAt } from './production-art.js';
import { roomProduction } from './production-view.js';
import {
  renderRouteLedger,
  renderDoorCard,
  renderRouteRewards,
  renderDevelopmentRewards,
} from './route-ui.js';
import { planResidentWalk, walkSample } from './resident-motion.js';
import { paintHouseFurnishings, paintHouseWorkstations, workerActivity } from './house-art.js';
import { trackSprite } from './character-pose.js';
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
const residentWalks = new Map();
const homePresence = new Map();
const spriteTracks = new Map();
let motionState = state;
let routeSelection = null,
  pendingDoor = null;
let characterPage = null;
let selectedRecord = null;
let contractTab = 'all';
let roomSection = 'dashboard',
  workshopQuantity = 1;
let fieldSite = 'briarHollow',
  fieldPage = 'sites',
  fieldParty = [],
  fieldLoadout = false;
let storeParty = [],
  storeResident = null,
  storeShopSlot = 'sword',
  storeShopOpen = false;
let decoratingFurniture = null;
let houseRoom = null;
let decorationRoom = null;
let productionSnapshots = [];
let routeIndicators = new Map();
let moreOpen = false,
  roomFilter = 'all',
  roomSearch = '',
  craftCategory = 'all',
  craftRecipe = null,
  craftQuantity = 1,
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
  if (!residentWalks.has(state.selected)) D.rememberPosition(state, state.selected, player);
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
  routeRewards = [],
  developmentRewards = [],
  door = null,
) {
  const record = D.records.find((r) => r.id === recordId);
  $('scene-label').hidden = true;
  $('scene-label').textContent = 'THE HOUSE REMEMBERS';
  $('scene-body').classList.remove('record-page');
  $('scene-title').textContent = title;
  $('scene-body').innerHTML =
    (door ? renderDoorCard(state, door, { esc, btn }, player) : '') +
    renderRouteRewards(state, routeRewards, { esc, btn }) +
    renderDevelopmentRewards(state, developmentRewards, { esc, btn }) +
    renderPatternRewards(recipeRewards, { esc }) +
    renderGuildRewards(guildRewards, esc, state) +
    renderQuestReward(questReward, { esc }) +
    renderEquipmentRewards(equipmentRewards, { esc, storeAvailable: D.storeAvailable(state) }) +
    (questReward || door ? '' : record ? renderRecordPage(record) : paragraphs(body));
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
      next.routeRewards,
      next.developmentRewards,
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
function act(fn, failureTitle = null) {
  try {
    const selectedBefore = state.selected;
    if (!residentWalks.has(selectedBefore)) D.rememberPosition(state, selectedBefore, player);
    fn();
    D.refreshRouteProgress(state);
    if (selectedBefore !== state.selected) {
      player = D.residentPosition(state, state.selected);
      walkTarget = null;
    }
    persist();
    renderUI();
    presentScene();
  } catch (e) {
    if (failureTitle) scene(failureTitle, e.message);
    else toast(e.message);
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
  return (
    renderEquipmentStore(
      state,
      storeParty,
      { esc, btn },
      { slot: storeShopSlot, resident: storeResident, shopOpen: storeShopOpen },
    ) +
    `<details class="house-purchases"><summary>Buy household materials</summary><article><h4>Food & medicine · ${state.guild.supplies} supplies</h4><p>One supply feeds a scouting trip. Two feed a mission party; another provides one injury treatment. Unused medicine returns to the house. The greenhouse produces more.</p>${btn('Buy 2 supplies · 15g', 'resource:supplies', state.gold < 15)}${btn('Greenhouse crew', 'workplace:garden')}</article><article><h4>Crafting material · ${state.guild.salvage} scrap</h4><p>Scrap makes starter equipment and furniture. Recovered metal turns two scrap into two ore for advanced recipes. Gather scrap in the store room or reclaim spare items.</p>${btn('Buy 4 scrap · 60g', 'resource:salvage', state.gold < 60)}${btn('Scrap uses & sources', 'material:salvage')}</article></details>`
  );
}

function renderContracts() {
  if (state.household?.opening === 'ready' && fieldPage !== 'guild')
    return renderExpeditions(
      state,
      { esc, btn },
      { site: fieldSite, page: fieldPage, party: fieldParty, loadout: fieldLoadout },
    );
  const available = D.availableContracts(state)
    .filter((d) => state.household?.opening !== 'ready' || !d.homeEvent)
    .sort((a, b) => D.contractLabel(a).priority - D.contractLabel(b).priority);
  const filtered = available.filter(
    (def) => contractTab === 'all' || missionCategory(def) === contractTab,
  );
  let html =
    renderExpeditions(
      state,
      { esc, btn },
      { site: fieldSite, page: fieldPage, party: fieldParty, loadout: fieldLoadout },
    ) +
    `<div class="mission-tabs" role="group" aria-label="Mission types">${missionTabs
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
  fieldParty = fieldParty.filter((id) =>
    state.roster.some((c) => c.id === id && c.status === 'home' && !c.injury),
  );
  if (motionState !== state) {
    residentWalks.clear();
    homePresence.clear();
    spriteTracks.clear();
    motionState = state;
    pendingDoor = null;
  }
  for (const c of D.guildWorkers(state)) {
    const fit = c.status === 'home' && !c.injury,
      room = D.assignedRoom(state, c.id);
    if (
      fit &&
      homePresence.get(c.id) === false &&
      room &&
      !graphics.reducedMotion &&
      !residentWalks.has(c.id)
    ) {
      const target = D.workerStation(room, state.guild.house.rooms[room.id].workers.indexOf(c.id));
      const legs = planResidentWalk(
        state,
        c,
        c.id === state.selected ? player : { x: 170, y: 380, floor: 380 },
        target,
      );
      if (legs) {
        D.rememberPosition(state, c.id, target);
        residentWalks.set(c.id, { legs, elapsed: 0, room: room.name });
      }
    }
    homePresence.set(c.id, fit);
  }
  if (tab === 'Exploration') {
    const known = D.passages.filter((p) => D.routeVisible(state, p)),
      current =
        known.find((p) => p.id === routeSelection) ||
        known.find((p) => p.from === currentSource(player.floor)) ||
        known[0];
    if (current) {
      routeSelection = current.id;
      D.inspectRoute(state, current.id);
      persist();
    }
  }
  productionSnapshots = D.houseRooms
    .filter((r) => r.w >= 90 && D.roomUnlocked(state, r))
    .map((r) => roomProduction(state, r.id));
  routeIndicators = new Map(
    [...D.passages.map((p) => p.id), 'stairs', 'tower', 'labyrinth'].map((id) => [
      id,
      D.routeIndicator(state, id),
    ]),
  );
  if (tab === 'Store room' && !D.storeAvailable(state)) tab = null;
  $('status').innerHTML = `${resourceIcon('day', 'Day')}<strong>${state.day}</strong>`;
  $('status').title = `Day ${state.day} - Open journal`;
  $('status').setAttribute('aria-label', $('status').title);
  $('hud-resources').innerHTML = renderHudResources(state, esc);
  const selected = D.home(state).find((c) => c.id === state.selected);
  const portrait = (c) =>
    `<img class="portrait" src="${portraits[c.id]}" alt="${esc(c.name)} portrait" style="--accent:${c.color || '#76BDB5'}">`;
  const chamber = D.roomAt(player.floor);
  const investigation = roomInvestigation();
  $('day').innerHTML = resourceIcon('next', 'Advance one day');
  $('day').disabled = D.pendingOrders(state).length > 0;
  $('day').title = $('day').disabled
    ? 'Choose orders for the spotted party before advancing the day'
    : 'Advance one day';
  $('day').setAttribute('aria-label', $('day').title);
  $('overview').innerHTML = resourceIcon('house', 'Manage house');
  $('chapter-label').textContent = '';
  $('story-rail').title = investigation.title + ': ' + (investigation.next || '');
  $('objective').textContent =
    state.household?.opening === 'ready'
      ? 'Prepare, scout, and bring the crew home'
      : investigation.title;
  $('story-event').textContent =
    state.household?.opening === 'ready'
      ? 'Assign crews, study what they find, and choose how the household grows.'
      : investigation.next || '';
  $('character-hud').innerHTML = selected
    ? `${portrait(selected)}<div><span class="stats">${resourceIcon(selected.id === 'rowan' ? 'aether' : 'residents', esc(selected.name))}${selected.level || ''}</span></div>`
    : '';
  $('home-strip').innerHTML = renderResidentStrip(state, {
    esc,
    walking: (id) => residentWalks.get(id)?.room,
    assignment: (id) => D.assignedRoom(state, id)?.name,
  });
  $('expeditions').innerHTML =
    D.activeExpeditions(state)
      .map(
        (o) =>
          `<button data-tab="Contracts" aria-label="${esc(D.operationView(state, o.uid).name + ': ' + o.phase)}" class="${o.pending ? 'threat-badge' : ''}">${resourceIcon(o.pending ? 'guard' : 'contracts', 'Outside expedition')}<strong>${o.pending ? '!' : o.phase === 'outbound' || o.phase === 'returning' ? '1' : '•'}</strong></button>`,
      )
      .join('') +
    (D.homeDanger(state)
      ? `<button class="threat-badge" data-tab="Contracts" title="Home under attack: ${esc(D.homeDanger(state).name)}" aria-label="Home under attack. Open contracts">${resourceIcon('guard', 'Home under attack')}</button>`
      : '') +
    D.activeMissions(state)
      .map((m) => {
        const decision = m.pendingEvent || m.status === 'decision';
        const name = D.contracts.find((d) => d.id === m.id).name;
        const label =
          name + ': ' + (decision ? 'Decision waiting' : m.remaining + ' days remaining');
        return `<button title="${esc(label)}" aria-label="${esc(label)}" ${m.pendingEvent ? 'data-action="expeditionEvent:' + m.uid + '"' : m.status === 'decision' ? 'data-action="letter:' + m.uid + '"' : 'data-tab="Contracts"'}>${resourceIcon(decision ? 'story' : 'contracts', esc(name))}<strong>${decision ? '!' : m.remaining}</strong></button>`;
      })
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
      '<dl class="controls"><dt>Walk</dt><dd>A / D · ← / →</dd><dt>Jump</dt><dd>Space</dd><dt>Stairs</dt><dd>W / S</dd><dt>Interact</dt><dd>E</dd><dt>Switch resident</dt><dd>Tab</dd><dt>Pan camera</dt><dd>Drag the view · Shift + arrow keys</dd><dt>Find resident</dt><dd>F · select their portrait</dd><dt>Zoom</dt><dd>Mouse wheel · + / −</dd><dt>Close</dt><dd>Escape</dd></dl>';
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
      ...D.rooms
        .filter((r) => state.flags[r.anchor] || D.householdRoomReady(state, r.id))
        .map((r) => ({ name: r.name, x: r.x + 50 })),
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
  if (tab === 'Exploration' && state.household?.opening === 'ready')
    html +=
      renderHouseholdMilestones(state, { esc, btn }) + btn('Outside reports', 'fieldPage:sites');
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
    html += renderRouteLedger(
      state,
      { esc, btn },
      { here, selected: routeSelection, origin: player },
    );
    const secured = D.houseRooms.filter((r) => r.kind === 'chamber' && !D.roomPause(state, r));
    if (secured.length)
      html += `<details class="quiet-details"><summary>Secured workplaces · ${secured.length}</summary>${secured.map((r) => btn(r.name, 'workplace:' + r.id)).join('')}</details>`;
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
        craftQuantity,
        craftSource,
        materialId,
        saleQuantity,
      },
    );
  if (tab === 'Training') html += renderTraining();
  if (tab === 'Stories')
    html +=
      state.household?.opening === 'ready'
        ? '<h3>The household’s story</h3><p>The house is ready. Its next chapter comes from the people you send out and bring home.</p>' +
          state.roster.map((c) => card(c.name, renderRelationships(state, c.id, { esc }))).join('')
        : renderStories();
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
  if (id === state.selected) {
    centerOnResident();
    return;
  }
  if (!D.home(state).some((c) => c.id === id)) throw Error('Resident unavailable.');
  pendingDoor = null;
  D.leaveStore(state);
  const leaving = state.selected,
    assigned = D.assignedRoom(state, leaving);
  if (assigned && !residentWalks.has(leaving) && !graphics.reducedMotion) {
    const target = D.workerStation(
      assigned,
      state.guild.house.rooms[assigned.id].workers.indexOf(leaving),
    );
    const legs = planResidentWalk(state, D.guildWorker(state, leaving), player, target);
    if (legs && (player.floor !== target.floor || Math.abs(player.x - target.x) > 8))
      residentWalks.set(leaving, { legs, elapsed: 0, room: assigned.name });
  }
  if (residentWalks.has(id)) {
    const journey = residentWalks.get(id),
      sample = walkSample(journey.legs, journey.elapsed);
    D.rememberPosition(state, id, { x: sample.x, floor: sample.floor });
    residentWalks.delete(id);
  }
  player = D.selectResident(state, id, residentWalks.has(leaving) ? null : player);
  centerOnResident();
  keys = {};
  hoveredObject = null;
  walkTarget = null;
}

function inspectDoor(id) {
  try {
    D.inspectRoute(state, id);
    routeSelection = id;
    pendingDoor = null;
    persist();
    renderUI();
    scene(D.doorName(id), '', [], null, [], null, [], [], [], [], id);
  } catch (e) {
    toast(e.message);
  }
}
function sendWorker(roomId, slot, id) {
  pendingDoor = null;
  const room = D.houseRooms.find((r) => r.id === roomId),
    c = D.guildWorker(state, id);
  const previous = state.guild.house.rooms[roomId].workers[slot];
  let legs = null,
    origin;
  if (c && c.status === 'home' && !c.injury) {
    const journey = residentWalks.get(id);
    origin = journey ? walkSample(journey.legs, journey.elapsed) : D.residentPosition(state, id);
    origin = { x: origin.x, y: origin.floor, floor: origin.floor };
    legs = planResidentWalk(state, c, origin, D.workerStation(room, slot));
    if (!legs)
      throw Error(
        'No secured route for ' +
          c.name +
          ' to ' +
          room.name +
          '. Open its passages with a specialist or an earned mechanism first.',
      );
  }
  D.assignRoomWorker(state, roomId, slot, id);
  if (previous && previous !== id && residentWalks.has(previous)) {
    const journey = residentWalks.get(previous),
      sample = walkSample(journey.legs, journey.elapsed);
    D.rememberPosition(state, previous, { x: sample.x, floor: sample.floor });
    residentWalks.delete(previous);
  }
  if (id && legs && !graphics.reducedMotion) {
    residentWalks.set(id, { legs, elapsed: 0, room: room.name });
    if (id === state.selected) {
      player = { ...origin, vy: 0 };
      walkTarget = null;
    }
    toast(c.name + ' is walking to ' + room.name + '. Work begins on game days.');
  } else if (id === state.selected && c?.status === 'home' && !c.injury)
    player = D.residentPosition(state, id);
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  if (b.dataset.close) {
    closePanel();
    return;
  }
  if (b.dataset.tab) {
    if (b.dataset.tab === 'Store room') {
      storeParty = [];
      storeShopOpen = false;
    }
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
  if (op === 'openExploration') {
    tab = 'Exploration';
    keys = {};
    walkTarget = null;
    renderUI();
    return;
  }
  if (op === 'inspectResident') {
    characterPage = id;
    tab = 'Characters';
    keys = {};
    walkTarget = null;
    renderUI();
    return;
  }
  if (op === 'select') {
    act(() => {
      chooseResident(id);
      D.leaveStore(state);
      tab = null;
      keys = {};
    });
    canvas.focus();
    return;
  }
  if (op === 'partyShop') {
    storeParty = tab === 'Contracts' ? [...fieldParty] : storeParty;
    storeShopOpen = true;
    tab = 'Store room';
    renderUI();
    return;
  }
  if (op === 'partyReturn') {
    fieldParty = [...storeParty];
    fieldPage = 'sites';
    fieldLoadout = true;
    tab = 'Contracts';
    renderUI();
    return;
  }
  if (op === 'trainingOpen') {
    const c = state.roster.find((c) => c.id === id);
    if (!c || !D.unspentLevels(c).length) return;
    trainingResident = id;
    trainingSection = 'choices';
    trainingLevels[id] = D.unspentLevels(c)[0];
    tab = 'Training';
    moreOpen = false;
    keys = {};
    walkTarget = null;
    renderUI();
    $('panel-content').scrollTop = 0;
    return;
  }
  if (op === 'navMore') {
    moreOpen = !moreOpen;
    renderUI();
    $('nav').querySelector('[data-action="navMore"]').focus();
    return;
  }
  moreOpen = false;
  if (op === 'routeSelect') {
    routeSelection = id;
    tab = 'Exploration';
    renderUI();
    return;
  }
  if (op === 'routeInspect' || op === 'rewardRoute') {
    if (op === 'rewardRoute') $('scene').close();
    inspectDoor(id);
    return;
  }
  if (op === 'routeSolve') {
    $('scene').close();
    act(() => D.solveRoute(state, id, value));
    return;
  }
  if (op === 'doorOpen') {
    $('scene').close();
    closePanel();
    act(() => {
      player = D.enterPassage(state, id, { x: player.x, floor: player.floor });
      walkTarget = null;
      grounded = true;
    });
    return;
  }
  if (op === 'rewardWorkplace') {
    $('scene').close();
    houseRoom = id;
    roomSection = 'house';
    tab = 'Rooms';
    renderUI();
    return;
  }
  if (op === 'routeContract') {
    $('scene').close();
    tab = 'Contracts';
    contractTab = 'exploration';
    renderUI();
    openMission(id);
    return;
  }
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
    if ($('scene').open) $('scene').close();
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
    storeParty = [];
    storeShopOpen = false;
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
    if (state.household?.opening === 'ready') fieldPage = 'guild';
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
    $('scene').close();
    walkTarget = p.x;
    pendingDoor = id;
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
    if (op === 'fieldPage') {
      fieldPage = id;
      tab = 'Contracts';
    }
    if (op === 'fieldSite') {
      fieldSite = id;
      fieldPage = 'sites';
    }
    if (op === 'fieldLoadout') fieldLoadout = !fieldLoadout;
    if (op === 'homeDefend') {
      const ids = [...document.querySelectorAll('#home-party input:checked')].map((e) => e.value);
      D.dispatch(state, id, ids);
      closePanel();
    }
    if (op === 'fieldDispatch') {
      D.launchParty(state, id, value, fieldParty);
      fieldParty = [];
      fieldLoadout = false;
      closePanel();
      toast(
        value === 'scout'
          ? 'Scouts departed to gather information.'
          : 'Party departed to complete the mission.',
      );
    }
    if (op === 'fieldOrder') D.orderExpedition(state, id, value);
    if (op === 'fieldRescue') {
      const ids = [...document.querySelectorAll('#rescue-' + id + ' input:checked')].map(
        (e) => e.value,
      );
      D.reinforceExpedition(state, id, ids, value, { medical: state.guild.supplies >= 3 });
      closePanel();
    }
    if (op === 'fieldResearch') D.startResearch(state, id);
    if (op === 'fieldResearchCancel') D.cancelResearch(state);
    if (op === 'recommission') D.recommissionRoom(state, id);
    if (op === 'roomDay') advanceGuildDay();
    if (op === 'housePause') D.setRoomProduction(state, id, value === 'resume');
    if (op === 'maraGuard') D.setMaraDefence(state, id === 'on');
    if (op === 'craftOrder') {
      D.queueWorkshopOrder(state, id, craftQuantity);
      toast(
        'Planned ' + craftQuantity + ' items. Assign workshop staff and advance a day to begin.',
      );
    }
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
      centerOnResident();
      walkTarget = null;
      toast('A new guild begins.');
    }
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
      camera = loc.x - graphics.width / 2;
      cameraY = loc.y - 380;
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
    if (op === 'dispatch') {
      D.dispatch(
        state,
        id,
        [...document.querySelectorAll(`[data-party="${id}"]:checked`)].map((x) => x.value),
        { medicalKit: $('kit-' + id).value },
      );
      closePanel();
    }
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
      centerOnResident();
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
  if (e.target.id === 'craft-quantity') {
    const quantity = Number(e.target.value);
    if (
      Number.isInteger(quantity) &&
      quantity >= 1 &&
      quantity <= 99 &&
      quantity !== craftQuantity
    ) {
      const focused = document.activeElement === e.target;
      craftQuantity = quantity;
      renderUI();
      if (focused) $('craft-quantity')?.focus();
    }
    return;
  }
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
  if (e.target.closest('#field-party')) {
    fieldParty = [...document.querySelectorAll('#field-party input:checked')].map((e) => e.value);
    const id = e.target.value;
    renderUI();
    $('field-party')
      ?.querySelector('input[value="' + id + '"]')
      ?.focus();
    return;
  }
  if (e.target.dataset.partyGear) {
    const id = e.target.dataset.partyGear,
      slot = e.target.dataset.gearSlot;
    const ids = tab === 'Store room' ? (storeParty.length ? storeParty : [id]) : fieldParty;
    act(() => D.equipPartyMember(state, ids, id, slot, e.target.value || null));
    document
      .querySelector('[data-party-gear="' + id + '"][data-gear-slot="' + slot + '"]')
      ?.focus();
    return;
  }
  if (e.target.id === 'equipment-resident') {
    storeResident = e.target.value;
    renderUI();
    return;
  }
  if (e.target.id === 'equipment-shop-slot') {
    storeShopSlot = e.target.value;
    storeShopOpen = true;
    renderUI();
    return;
  }
  if (e.target.id === 'craft-quantity') {
    const quantity = Number(e.target.value);
    if (Number.isInteger(quantity) && quantity >= 1 && quantity <= 99) {
      craftQuantity = quantity;
    } else {
      toast('Choose between 1 and 99 items per order.');
      e.target.value = craftQuantity;
    }
    return;
  }
  if (e.target.id === 'route-select') {
    routeSelection = e.target.value;
    renderUI();
    return;
  }
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
      sendWorker(D.facilityRoom(state, e.target.dataset.roomWorker), 0, e.target.value || null);
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
      sendWorker(
        e.target.dataset.houseRoom,
        Number(e.target.dataset.houseSlot),
        e.target.value || null,
      );
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
      centerOnResident();
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
  if (residentWalks.has(state.selected)) player = D.residentPosition(state, state.selected);
  residentWalks.clear();
  D.day(state);
  const m = state.missions.find((m) => m.status === 'decision' || m.pendingEvent);
  const summary = state.guild.dailySummary?.lines || [];
  const outside = D.pendingOrders(state);
  if (outside.length) {
    tab = 'Contracts';
    fieldPage = 'sites';
    fieldSite = outside[0].site;
    toast('The scouts were spotted. Choose orders before another day.');
  }
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
  '<button id="zoom-out" aria-label="Zoom out">−</button><output id="zoom-level" aria-live="polite">125%</output><button id="zoom-in" aria-label="Zoom in">+</button><button id="focus-resident" title="Find selected resident · F" aria-label="Find selected resident"></button><button id="focus-room" title="Focus room" aria-label="Focus room"></button><button id="wide-view" title="Wide view" aria-label="Wide view"></button>';
$('world').append(zoomControls);
$('focus-resident').innerHTML = resourceIcon('residents', 'Find selected resident');
$('focus-resident').onclick = centerOnResident;
$('focus-room').innerHTML = resourceIcon('focus', 'Focus room');
$('wide-view').innerHTML = resourceIcon('wide', 'Wide view');
// The view is independent of simulation positions. Only explicit focus actions recenter it.
function centerOnResident() {
  camera = player.x - graphics.width / 2;
  cameraY = player.floor - 380;
  graphics.focus = false;
  hoveredObject = null;
}
function panView(dx, dy) {
  camera += dx;
  cameraY += dy;
  graphics.focus = false;
  hoveredObject = null;
}
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
  const room = visualRoom();
  camera = (room ? room.x + room.w / 2 : player.x) - graphics.width / 2;
  cameraY = player.floor - 435;
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
let cameraDrag = null;
let suppressCameraClick = false;
canvas.style.touchAction = 'none';
canvas.addEventListener('pointerdown', (e) => {
  if (cameraDrag || tab || $('scene').open || ![0, 1, 2].includes(e.button)) return;
  cameraDrag = {
    id: e.pointerId,
    x: e.clientX,
    y: e.clientY,
    startX: e.clientX,
    startY: e.clientY,
    moved: false,
  };
  suppressCameraClick = false;
  canvas.setPointerCapture(e.pointerId);
  canvas.focus();
});
canvas.addEventListener('pointermove', (e) => {
  if (!cameraDrag || e.pointerId !== cameraDrag.id) return;
  if (tab || $('scene').open) {
    cameraDrag = null;
    return;
  }
  if (
    !cameraDrag.moved &&
    Math.hypot(e.clientX - cameraDrag.startX, e.clientY - cameraDrag.startY) < 6
  )
    return;
  const bounds = canvas.getBoundingClientRect();
  const scale = Math.min(bounds.width / graphics.width, bounds.height / 650) * graphics.zoom;
  panView((cameraDrag.x - e.clientX) / scale, (cameraDrag.y - e.clientY) / scale);
  cameraDrag.x = e.clientX;
  cameraDrag.y = e.clientY;
  cameraDrag.moved = true;
  canvas.style.cursor = 'grabbing';
});
function finishCameraDrag(e) {
  if (!cameraDrag || e.pointerId !== cameraDrag.id) return;
  suppressCameraClick = cameraDrag.moved || e.type === 'pointercancel';
  cameraDrag = null;
  if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
  canvas.style.cursor = 'default';
}
canvas.addEventListener('pointerup', finishCameraDrag);
canvas.addEventListener('pointercancel', finishCameraDrag);
canvas.addEventListener('lostpointercapture', finishCameraDrag);
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
canvas.addEventListener('mousemove', (e) => {
  if (cameraDrag?.moved) return;
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
        ((Math.abs(h.x - point.x) < 22 && Math.abs(h.y - 37 - point.y) < 27) ||
          (h.routeIndicator &&
            Math.abs(h.x - point.x) < 50 &&
            point.y >= h.y - 94 &&
            point.y <= h.y - 75)),
    ) || null;
  canvas.style.cursor =
    hoveredObject || productionBadgeAt(state, point.x, point.y) ? 'pointer' : 'default';
});
canvas.addEventListener('mouseleave', () => {
  hoveredObject = null;
  canvas.style.cursor = 'default';
});
function hotspots() {
  const household = state.household?.opening === 'ready';
  const readyInteractions = household
    ? [
        { x: 160, y: 380, action: 'outsideBoard', text: 'E · Reports from outside' },
        {
          ...maraLocation(),
          action: 'householdGuide',
          text: 'E · Household register',
          show: !residentWalks.has('mara'),
        },
        { x: 790, y: 380, action: 'storeEnter', text: 'E · Visit shared equipment storage' },
        { x: 865, y: 140, action: 'storeOpen', text: 'E · Equipment shelves' },
        { x: 750, y: 140, action: 'storeExit', text: 'E · Leave equipment storage' },
        ...D.houseRooms
          .filter((r) => D.roomUnlocked(state, r))
          .map((r) => ({
            x: r.x + Math.min(130, r.w / 2),
            y: r.y,
            action: 'housework:' + r.id,
            text: 'E · Manage ' + r.name,
          })),
        ...(D.householdRoomReady(state, 'furnace')
          ? [
              {
                x: 890,
                y: 140,
                action: 'furnaceService',
                text: 'E · Maintenance stair to the commissioned furnace',
              },
              {
                x: 350,
                y: 1250,
                action: 'furnaceServiceReturn',
                text: 'E · Return by maintenance stair to the store',
              },
            ]
          : []),
        { x: 350, y: 380, done: true, text: 'W · Alchemy room' },
        { x: 350, y: 140, done: true, text: 'S · Ground floor' },
      ].filter((h) => h.show !== false)
    : [];

  const list = [
    {
      ...maraLocation(),
      action: 'mara',
      text: 'E · Speak to Mara · brass golem familiar',
      show: !residentWalks.has('mara'),
    },
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
  for (const r of D.rooms.filter(
    (r) => state.flags[r.anchor] || D.householdRoomReady(state, r.id),
  )) {
    if (!state.flags[r.operational] && !D.householdRoomReady(state, r.id))
      list.push({
        x: r.id === 'library' && !state.flags.libraryOpened ? 1260 : r.x + 65,
        y: 380,
        action: 'room:' + r.id,
        text: `E · Restore ${r.name.toLowerCase()} · ${r.cost}g${r.requiresSkill ? ' · Magical literacy' : ''}${r.id === 'threshold' ? ' · Safe preparation' : ''}`,
      });
  }
  for (const c of D.home(state).filter(
    (c) => c.id !== state.selected && !residentWalks.has(c.id),
  )) {
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
  const shared = household
    ? list.filter(
        (h) =>
          !['mara', 'storeEnter', 'storeOpen', 'storeExit', 'wall', 'repair', 'tower'].includes(
            h.action,
          ),
      )
    : list;
  return [...readyInteractions, ...shared]
    .filter((h) => h.show !== false)
    .map((h) => {
      const id = h.action?.startsWith('passage:') ? h.action.slice(8) : h.action;
      const routeIndicator = routeIndicators.get(id);
      return routeIndicator
        ? { ...h, routeIndicator, text: h.text + ' · ' + routeIndicator.detail }
        : h;
    });
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
      anchor: state.flags.anchor || state.household?.opening === 'ready',
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
function interactNearby() {
  if (tab || moreOpen || $('scene').open) return;
  if (residentWalks.has(state.selected)) {
    toast('This companion is walking to their assigned room.');
    return;
  }
  const h = nearest();
  if (h && !h.done) {
    if (h.action === 'furnaceService' || h.action === 'furnaceServiceReturn') {
      player =
        h.action === 'furnaceService'
          ? { x: 350, y: 1250, floor: 1250, vy: 0 }
          : { x: 890, y: 140, floor: 140, vy: 0 };
      grounded = true;
      walkTarget = null;
      persist();
      renderUI();
      return;
    }
    if (h.action === 'outsideBoard') {
      tab = 'Contracts';
      fieldPage = 'sites';
      renderUI();
      return;
    }
    if (h.action === 'householdGuide') {
      tab = 'Stories';
      renderUI();
      return;
    }
    if (h.action?.startsWith('housework:')) {
      houseRoom = h.action.slice(10);
      roomSection = 'house';
      tab = 'Rooms';
      renderUI();
      return;
    }

    if (h.action?.startsWith('recover:')) {
      act(() => D.recoverResident(state, h.action.slice(8), { x: player.x, floor: player.floor }));
      return;
    }
    if (h.action?.startsWith('passage:')) {
      inspectDoor(h.action.split(':')[1]);
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
      act(
        () => {
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
        },
        ['wall', 'repair', 'tower', 'stairs', 'labyrinth', 'drain'].includes(h.action) ||
          h.action.startsWith('room:')
          ? 'Door requirement not met'
          : null,
      );
  }
}
$('hint').onclick = () => {
  const h = nearest();
  if (!h) return;
  if (h.action === 'furnaceService' || h.action === 'furnaceServiceReturn') {
    player =
      h.action === 'furnaceService'
        ? { x: 350, y: 1250, floor: 1250, vy: 0 }
        : { x: 890, y: 140, floor: 140, vy: 0 };
    grounded = true;
    walkTarget = null;
    persist();
    renderUI();
    return;
  }
  if (/^[WS]/.test(h.text || '')) stair(h.text[0] === 'W' ? 'up' : 'down');
  else interactNearby();
  canvas.focus();
};
canvas.tabIndex = 0;
canvas.addEventListener('click', (e) => {
  if (suppressCameraClick) {
    suppressCameraClick = false;
    return;
  }
  if ($('scene').open) return;
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
  const clickedDoor = D.passages.find(
    (p) =>
      p.y === player.floor &&
      p.from === currentSource(player.floor) &&
      ((Math.abs(wx - p.x) < 28 && Math.abs(wy - (p.y - 37)) < 40) ||
        (routeIndicators.get(p.id) && Math.abs(wx - p.x) < 50 && wy >= p.y - 94 && wy <= p.y - 75)),
  );
  if (clickedDoor) {
    walkTarget = clickedDoor.x;
    pendingDoor = clickedDoor.id;
    canvas.focus();
    return;
  }
  pendingDoor = null;
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
  if (e.shiftKey && key.startsWith('arrow')) {
    keys.shift = true;
    keys[key] = true;
    return;
  }
  if (!e.repeat && key === 'f') centerOnResident();
  if (['+', '='].includes(key)) setZoom(graphics.targetZoom + 0.25);
  if (['-', '_'].includes(key)) setZoom(graphics.targetZoom - 0.25);
  if (!e.repeat && !keys[key]) {
    if (e.key === 'Tab') {
      const list = D.home(state);
      act(() =>
        chooseResident(list[(list.findIndex((c) => c.id === state.selected) + 1) % list.length].id),
      );
    }
    if (key === 'e') interactNearby();
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

function maraLocation() {
  const threat = D.homeDanger(state),
    target = threat && D.maraPower(state) > 0 ? D.homeThreatLocation(state, threat.id) : null;
  const position = residentWalks.get('mara')?.sample || D.residentPosition(state, 'mara');
  return target
    ? { x: Math.max(target.min, target.x - 150), y: target.y, floor: target.y }
    : position;
}
function drawMara() {
  const threat = D.homeDanger(state);
  const target = threat && D.maraPower(state) > 0 ? D.homeThreatLocation(state, threat.id) : null;
  const position = maraLocation();
  const pose = drawResident(
    D.guildWorker(state, 'mara'),
    position.x,
    position.y,
    false,
    target ? Math.sign(target.x - position.x) : null,
    { combat: target ? 'warrior' : null },
  );
  if (target)
    paintSpell(
      ctx,
      camera,
      { x: position.x + pose.nearHand[0] * pose.facing, y: position.y + pose.nearHand[1] + 35 },
      { x: target.x, y: target.y },
      graphics.reducedMotion ? 0 : last / 1000,
      'warrior',
      pose.combatPhase,
    );
}
function rect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x - camera, y, w, h);
}
function text(t, x, y, size = 14, color = '#adbaab') {
  if (/[a-zA-Z]/.test(t)) {
    const symbol = /^STR/.test(t)
      ? 'guard'
      : t === 'UNCONSCIOUS'
        ? 'care'
        : /LITERACY/.test(t)
          ? 'story'
          : /SOCKET|FITTING/.test(t)
            ? 'components'
            : null;
    if (symbol) {
      ctx.strokeStyle = color;
      paintIcon(ctx, symbol, x - camera, y - 18, 18);
    }
    return;
  }
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
function drawResident(c, x, y, controlled = false, forcedFacing = null, presentation = {}) {
  const sample = residentWalks.get(c.id)?.sample;
  const airborne = controlled && !grounded && !sample;
  const track = trackSprite(
    spriteTracks.get(c.id),
    { x, y },
    {
      allowMovement: !!sample?.moving || (controlled && grounded),
      facing: forcedFacing || sample?.facing || (controlled ? player.facing : null),
    },
  );
  spriteTracks.set(c.id, track);
  const activity =
    presentation.combat || presentation.unconscious
      ? null
      : workerActivity(
          state,
          c,
          { x, y },
          {
            moving: track.moving,
            travelling: residentWalks.has(c.id),
            airborne,
          },
        );
  const facing = forcedFacing || (activity ? 1 : track.facing);
  ctx.save();
  ctx.globalAlpha *= sample?.opacity ?? 1;
  const pose = paintCharacter(ctx, camera, c, x, y, controlled, facing, {
    ...presentation,
    moving: track.moving,
    distance: track.distance,
    kind: sample?.kind,
    airborne,
    activity,
    drawStation: false,
    reducedMotion: graphics.reducedMotion,
    tier: c.id === 'mara' ? state.guild.house.mara.tier : undefined,
    time:
      graphics.reducedMotion ||
      presentation.unconscious ||
      (!controlled && c.status !== 'home' && !presentation.combat)
        ? 0
        : last / 1000,
  });
  if (!controlled && D.availableChoices(state, c.id).length)
    text('…', x - 5, y - 75, 20, '#c5a268');
  ctx.restore();
  return pose;
}
function drawWorld(c) {
  graphics.begin(ctx);
  const ambience = {
    camera,
    cameraY,
    floor: cameraY + 380,
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
  if (state.flags.anchor || D.householdRoomReady(state, 'landing')) {
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

    rect(1175, 360, 16, 22, '#a78a61');
    rect(1175, 348, 5, 20, '#a78a61');
  } else missingRoom(975, 290, 'A MISSING LANDING', 'An anchor might bring it home');
  const view = visibleBounds(camera, cameraY, graphics.zoom, graphics.width);
  for (const r of D.rooms) {
    if (r.x + r.w < view.left - 50 || r.x > view.right + 50) continue;
    if (state.flags[r.anchor] || D.householdRoomReady(state, r.id)) {
      drawRoom(
        r.x,
        r.w,
        r.name,
        state.flags[r.operational] || D.householdRoomReady(state, r.id),
        D.householdRoomReady(state, r.id)
          ? D.houseRooms.find((d) => d.id === r.id).name
          : state.flags[r.operational]
            ? r.restored
            : r.ruined,
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
        text(D.regions.find((g) => g.id === r.region).name, r.x + 100, 325, 11, color);
      }
      if (r.id === 'library') {
        for (let i = 0; i < 8; i++) rect(r.x + 140 + i * 10, 330 - (i % 3) * 8, 7, 50, '#938d63');
        if (!state.flags.libraryOpened && !D.householdRoomReady(state, 'library')) {
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
  paintHouseFurnishings(ctx, camera, state, graphics.reducedMotion ? 0 : last / 1000);
  paintProductionBadges(ctx, camera, state, productionSnapshots);
  paintHouseWorkstations(ctx, camera, state, graphics.reducedMotion ? 0 : last / 1000);
  drawMara();
  for (const r of D.home(state).filter((r) => r.id !== c.id)) {
    const position = residentWalks.get(r.id)?.sample || D.residentPosition(state, r.id);
    drawResident(r, position.x, position.y);
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
  }
  drawRouteLandmarks();
  drawPassageMarkers();
  drawHomeAttack();
  drawResident(c, player.x, player.y, true);
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
  }
}
function drawHomeAttack() {
  const d = D.homeDanger(state);
  const battles = D.activeMissions(state).filter(
    (m) => D.contracts.find((def) => def.id === m.id).internal,
  );
  const threats = [
    ...(d ? [{ def: d, location: D.homeThreatLocation(state, d.id) }] : []),
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
          px = def.homeEvent
            ? Math.max(
                location.min,
                Math.min(location.max, x + side * (75 + Math.floor(i / 2) * 40)),
              )
            : x + side * (90 + Math.floor(i / 2) * 55);
        if (c.status !== 'dead') {
          const pose = drawResident(c, px, y, false, Math.sign(x - px), {
            combat: c.type,
            unconscious: D.injuryLevel(c) >= 4,
          });
          if (D.injuryLevel(c) >= 4) {
            text('UNCONSCIOUS', px - 28, y + 18, 9, '#edaaa0');
          } else {
            paintSpell(
              ctx,
              camera,
              { x: px + pose.nearHand[0] * pose.facing, y: y + pose.nearHand[1] + 35 },
              { x, y },
              graphics.reducedMotion ? 0 : time + i * 0.3,
              c.specialisation || c.type,
              pose.combatPhase,
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
    if (state.flags.towerCrown || D.householdRoomReady(state, 'towerCrown'))
      chamber(
        300,
        -100,
        610,
        state.household?.opening === 'ready' ? 'TOWER HERB GARDEN' : 'THE SILENT CROWN',
        '#405a69',
      );
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
      }
    }
  }
  if (state.flags.dragonFound || D.householdRoomReady(state, 'furnace')) {
    chamber(300, 1250, 610, 'THE OLD FURNACE', '#773e30');
    drawFurnaceThreat();
  }
}
function drawFurnaceThreat() {
  rect(700, 1120, 160, 143, '#3d2928');
  rect(728, 1140, 100, 120, '#13151d');
  text(
    state.flags.dragonSlain || D.householdRoomReady(state, 'furnace')
      ? 'THE FURNACE IS CLEAR'
      : 'KEEP BEHIND THE FIREBREAK',
    330,
    1160,
    13,
    '#e6aa60',
  );
  if (!state.flags.dragonSlain && !D.householdRoomReady(state, 'furnace')) {
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
  if (keys.shift && !tab && !$('scene').open) {
    panView(
      (((keys.arrowright ? 1 : 0) - (keys.arrowleft ? 1 : 0)) * 600 * dt) / graphics.zoom,
      (((keys.arrowdown ? 1 : 0) - (keys.arrowup ? 1 : 0)) * 600 * dt) / graphics.zoom,
    );
  }
  for (const [id, journey] of residentWalks) {
    const resident = D.guildWorker(state, id);
    if (
      !resident ||
      resident.status !== 'home' ||
      resident.injury ||
      D.assignedRoom(state, id)?.name !== journey.room
    ) {
      residentWalks.delete(id);
      continue;
    }
    journey.elapsed += dt;
    journey.sample = walkSample(journey.legs, journey.elapsed);
    if (id === state.selected) player = { ...journey.sample, vy: 0 };
    if (journey.sample.arrived) {
      residentWalks.delete(id);
      const avatar = $('home-strip').querySelector('[data-action="select:' + id + '"]');
      if (avatar) avatar.title = 'Assigned to ' + journey.room;
      if (id === state.selected) player = D.residentPosition(state, id);
    }
  }
  const c = D.home(state).find((c) => c.id === state.selected) || D.home(state)[0];
  if (!$('scene').open && !tab && !residentWalks.has(state.selected)) {
    let dir = keys.shift
      ? 0
      : (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0);
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
      : player.floor === 1250 && !state.flags.dragonSlain && !D.householdRoomReady(state, 'furnace')
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
    if (
      state.household?.opening !== 'ready' &&
      player.floor === 380 &&
      c.id === 'rowan' &&
      player.x < 0 &&
      !state.flags.free
    )
      act(() => D.finish(state));
  }
  if (hoveredObject && hoveredObject.y !== player.floor) hoveredObject = null;
  if (!residentWalks.has(state.selected)) D.rememberPosition(state, state.selected, player);
  if (pendingDoor && !tab && !$('scene').open) {
    const door = D.passages.find((p) => p.id === pendingDoor);
    if (door && door.y === player.floor && Math.abs(door.x - player.x) <= 58) {
      walkTarget = null;
      inspectDoor(pendingDoor);
    }
  }
  drawWorld(c);
  const h = nearest();
  $('hint').hidden = !h;
  $('hint').title = h?.text || '';
  $('hint').setAttribute('aria-label', h?.text || '');
  const hintKey = h ? (/^[WS]/.test(h.text || '') ? h.text[0] : 'E') : '';
  if ($('hint').dataset.key !== hintKey) {
    $('hint').dataset.key = hintKey;
    $('hint').innerHTML = h ? resourceIcon('focus', 'Interact') + '<kbd>' + hintKey + '</kbd>' : '';
  }
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
centerOnResident();
if (loadedSave) persist();
renderUI();
requestAnimationFrame(frame);
if (!state.flags.opening) {
  scene('The visitor at the gate', D.initial().journal[0].text);
  state.flags.opening = true;
  persist();
} else if (state.scenes.length) presentScene();
