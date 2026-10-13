# The Bound House

A fantasy guild game about belonging, responsibility and the freedom to leave. Rowan survived the old guild's collapse through a binding to its magical house. Exploration recovers personal records, reconnects scattered rooms and releases thirty former guild members trapped during the evacuation. Their homecomings change the party as the guild learns to let people go.

## Run

```powershell
npm start
```

Open http://127.0.0.1:4173/. Node.js 20 or newer runs the game and tests. Install development tools with `npm install`.

## Play

- A/D or arrow keys move; Space jumps; W/S use stairs; E interacts.
- Click an object to approach it. Its description appears below the canvas; nearby objects show an interaction key.
- Switch characters through the home strip or Tab while the playfield is focused. Each person keeps their own room and position.
- Use Focus room, Wide view, +/− or the mouse wheel to adjust the camera.
- Characters, Training and Diaries use individual pages. Stories follows the investigation; Reports records completed expeditions.

Bryn is the opening companion. Ivo is discovered on the restored tower’s lower landing and starts with Magical literacy. Nell is found after investigating the holding cells; Oren waits beneath the crypt’s burial stair. Later discoveries follow recovered records, keys and regional expedition milestones.

The wall survey, mason's tool recovery and another opening request can bring Bryn to Strength 10. The tools reduce service restoration to 50 gold. The cellar-timber contract repairs the stairs. The dry landing leads to the flooded cellar; Water breathing reaches the submerged wheel that drains it and opens deeper exploration.

## Current game systems

The main interface uses House, Residents, Contracts and Story, with Equipment, Training, Exploration, Diaries, Reports and Journal under More. The resource HUD opens material details directly. House has five pages: Rooms, Craft, Stores, Decorate and Mara. Room production badges on the cutaway open the same inspector as the room cards. Active workplaces appear first; filters and live search help manage a larger house. Inspectors show batch output, the average per game day, the next completion and worker slots, with production rules and advanced policies inside expandable details. The canvas adapts to screen width without stretching characters; phone management opens a full drawer and keeps keyboard focus out of the background.

Craft groups material and scrap variants under one equipment or furnishing design. Choosing an ingredient opens its stock, uses, known recipes, production sources and sale value. Surplus can be sold in exact quantities: timber 1g, ore and herbs 2g, cloth/scrap/supplies 3g, aether 6g, and brass components 8g per unit. Sales remove stock and add one gold-ledger payment. No resources are sold automatically.

Six additional material patterns are discovered through play: scholar hood from the unfinished study, iron shield from the searched holding cells, scholar robe from the potion kitchen, scout boots from the searched maze, iron axe from the reclaimed furnace, and long sword from the mill-road survey. Discovery awards a recipe card linking to Craft; it does not grant the finished item or change its existing bonuses. Old saves gain patterns earned by their recorded exploration quietly during management version 6 migration. New patterns retain an unread marker until viewed.

Contracts identify story leads, plot rewards, companion journeys, regional work, exploration and repeatable wages. Party stats combine to determine duration. Each working day has a harm roll modified by protection, skills and equipment. Home attacks begin once three surviving companions have joined. The early jailer, rat king and crypt warden take two base days, and ordinary injuries add one recovery day. The rat king uses intellect to plan safe approaches rather than requiring a scout before one can be recruited. A specialist opens magical seals and marks hidden routes once; other companions can follow the prepared route. Traps are disarmed separately and remain safe for the guild. Underwater routes still require Water breathing. Conscious survivors can retreat; home defenders remain visible beside the threat.

XP requirements grow quadratically from 35, 60 and 105 XP. Each contract can grant one level and carry surplus XP forward. Stats increase automatically with class growth. Each earned level gives one choice between skills, spells, class talents and a quartermaster equipment requisition. Equipment requisitions add a physical item to shared storage without charging gold. Warriors specialise as Barbarian or Paladin, Wizards as Necromancer or Healer, and Scouts as Thief or Archer.

Companion investigations start from level 4. Three later chapters open at levels 6, 10 and 14; farewell requires level 16. The last fighter cannot leave before the sewer rat and holding-cell guardian are cleared unless another fighter has joined. Early saves can invite a living companion who left below level 16 back through their character page.

Equipment belongs to shared storage. Companions visit the store to equip and return items in separate weapon, shield, head, body, feet and accessory slots.

Rooms → House rooms manages 68 workplaces across the estate, returned regional rooms, tower and underworld. Each has one to three companion slots and a defined job: timber, ore, herbs, cloth, aether, scrap, supplies, local commissions or the home watch. Leave a companion in a room and switch characters to assign them, or use the room’s worker controls. Each companion holds one assignment. Away, assigned defenders and injured workers pause and resume when fit at home; death or departure frees their slot. Effective job stats contribute one work unit, two at 10, or three at 20. Work and automatic collection advance on game days, with at most one batch per room per day; paused progress remains saved. Staffed completions grant 5 XP, capped at 5 home-work XP per resident per day, without counting as expedition visits. Tools, study, gardening and watch animations show the activity without advancing simulation time.

The workshop remains in the restored service room, the garden in the restored greenhouse, and the infirmary in the greenhouse hospice or a restored regional medical room. Mara contributes one baseline work unit to each active facility project per game day, in addition to the room’s entire fit crew. Rooms must be restored and repaired; dungeon workplaces require their guardian cleared, trap disarmed and investigation completed. Assigning workers never opens a story passage or bypasses discovery requirements.

Rooms → Materials shows stocks and gathering sources. Material recipes offer another way to craft the existing basic equipment and decorations, plus supply packs, scrap fittings and brass components. The workshop reserves actual materials and gold when a project starts; cancellation refunds them. Mara’s three sequential workshop upgrades use brass components, ore, timber and aether and add four personal defence strength per tier. Watch-room crews add twice their daily work to her defence. A strong watch holds off an attack while clearing it; a weak watch reduces ordinary monster damage. The watch also supports a dispatched home defence party. Mara stays home when adventurers travel, and her upgrades do not enable early home attacks. Rooms → Mara controls the watch and shows the next upgrade.

New and existing games receive 6 scrap and 4 supplies once. New material stocks start at zero. Crafting reserves its gold and scrap; cancellation refunds all inputs. Crops repeat automatically, and treatment costs one supply only when it can improve on natural recovery. Projects collect their outputs automatically. Tier 2 facilities add one daily work unit. The three facilities have reusable utility furniture slots, and every workplace has two decoration slots; utility changes require completing or cancelling the current project. Decorations and earned guardian trophies have no stat bonuses.

Rooms has an overview, individual facility pages and shared furniture storage. Workshop orders can plan batches of up to 99 items, be reordered, or have their unstarted quantities removed. Each item pays its inputs when it begins work; a missing resource pauses the order without taking payment. One item can complete per workshop per game day, and the next begins on the following day. Cancelling an active item refunds its reserved inputs without removing the rest of its order. Order estimates use current staffing, furnishings and the budget remaining after earlier orders.

Rooms → Decorate lists owned furnishings with a room picker for every compatible secured workplace. Furniture completion popups link directly to the finished piece, and workplace pages link to decorating that room. Players can move a piece between slots, rooms and floors, replace another piece (returning it to storage), or remove it without losing ownership. Decorative pieces can be placed during production; utility changes still require finishing or cancelling active work. Furnishing positions preserve doors, tower stairs, labels and interaction areas; the garden and hospice have separate zones.

Garden production can grow continuously, maintain a player-selected supply reserve, or pause. Partial crop progress is preserved while paused, and reserve farming resumes when stocks fall below the target. The reserve is a production target, with no storage cap: harvests can exceed it and supplies remain available for treatment and expeditions. Worker options show effective stats and bonuses. Expedition preparation previews its resource expense and the effect of sending assigned room workers away.

Infirmary care stays manual by default. Players can enable automatic treatment, prioritise the longest recovery or the earliest return home, and protect a supply reserve from automatic spending. Useful treatment starts only on a game day, costs one supply when started, and is reassessed before another course begins. Changing the plan leaves paid work running; ineffective work still refunds its supply. Manual treatments and expedition kits can use the protected reserve. Recovery forecasts compare one course with natural recovery using current staffing and partial progress. The Rooms overview shows care funding and the next harvest; conflicting garden targets are explained, with a control to grow a treatment buffer above the reserve. Laboratory playthroughs still need a restored regional medical room.

The workshop can reclaim spare stored equipment or furniture for scrap in two work units. Crafted pieces return half their base scrap, rounded down with a minimum of one; other common equipment returns up to three scrap based on its stats. Equipped gear, placed furnishings, rare equipment and earned trophies cannot be reclaimed. Mill-road blueprints also allow refitting a stored short sword into a long sword (6 scrap + 50g / 4 work), or a padded coat into leather armour (7 scrap + 50g / 4 work). Forge and outfitter effects apply normally. Each conversion holds its exact physical input until completion; cancellation returns that piece and all payments. Started conversions take priority over planned orders, which resume on a later game day.

Survey and Recovery have their own contract tabs. Surveys along the mill road, lower drains and tower approaches unlock utility furniture blueprints; completed surveys open repeatable recovery trips with a two-day cooldown. Each trip offers a decision after its first working day and waits safely for an answer. Supplies can secure a bonus, or the party can attempt it using the displayed stat threshold and extra injury chance. Existing expeditions remain playable without supplies. Medical kits can be purchased for 10 gold or funded with supplies.

Village workshop commissions spend one day earning 12 gold by repairing neighbours’ tools. Damaged guild rooms use their separate repair actions. Injuries, lethal expeditions, recovery, reanimation and permanent homecomings are saved alongside character positions, room discoveries and story decisions.

## Story and design references

- [Campaign](CAMPAIGN.md): history, investigation, central conflict and endings.
- [Characters](CHARACTERS.md): the complete playable cast and supporting witnesses.
- [Resident discoveries](RESIDENT_DISCOVERIES.md): rooms, trapping conditions and release scenes.
- [Homecomings](HOMECOMINGS.md): personal destinations and farewells.
- [Personal records](PERSONAL_RECORDS.md): diaries, letters and testimony.
- [Classes and skills](CLASSES_AND_SKILLS.md): growth, choices and game uses.
- [Guild exploration](GUILD_EXPLORATION.md): the tower and underworld routes.
- [Project status](PLAN.md): implemented features and planned extensions.

The live [graphics workshop](http://127.0.0.1:4173/graphics-preview.html) uses the game renderer. The [tower and underworld map](http://127.0.0.1:4173/guild-sprawl.html) and [wing atlas](http://127.0.0.1:4173/guild-complete.html) are visual references.

## Development

The applied editorial revision is preserved in [GAME_TEXT_REWRITTEN.md](GAME_TEXT_REWRITTEN.md). [GAME_TEXT.md](GAME_TEXT.md) is the current runtime catalogue; [GAME_TEXT_ORIGINAL.md](GAME_TEXT_ORIGINAL.md) preserves the reviewed snapshot. The import audit is in `TEXT_REVISION_AUDIT.json`.

```powershell
npm run docs
npm run format
npm run check
```

`generate-reference.mjs` is the single reference-generation entry point. It reads the same character, discovery, skill and diary data as the game. Edit those source definitions, then regenerate and format the references.

The simulation lives in `domain.js`, supported by focused modules for contracts, classes, equipment, exploration, guild management and homecomings. `guild-management.js` defines facilities, resources, projects, furniture and development expeditions; `house-rooms.js` defines all workplaces, crews, material recipes and Mara upgrades. `room-panel.js`, `house-panel.js`, `guild-art.js` and `house-art.js` provide their UI, furnishings and work animations. `game.js` coordinates input and presentation; `character-panel.js` renders character pages. The graphics modules paint the house, furnishings, equipment, creatures and affordances. `player-copy.js` migrates retired prose from stored games. The static server sends fresh resources for local development.

For isolated browser verification, run the server with `PORT=4174` and open `/guild-management-preview.html`. It provides hospice, laboratory, workshop, care-planning, furniture, house-production, Mara-defence and pending-decision demos on that separate origin, preserving the normal port 4173 save. The automated guild-management tests cover migration, costs and refunds, production, assignments, equipment and furniture ownership, treatment, medical-kit compatibility, decisions, withdrawals, cooldowns and navigation notices. `guild-production.test.js` also checks order payments and priority, production policies, partial crops and staffing forecasts. `guild-conversions.test.js` verifies refits, reclamation, physical reservations and corruption rejection. `guild-care.test.js` checks care priorities, protected supplies, recovery forecasts and garden funding. `house-management.test.js` verifies all-room roles and capacities, multi-worker output, expedition pauses, material crafting, Mara defence, decorating across floors, reserved stairs and migration through management version 5 without resetting the campaign or retrospectively producing materials.

Existing versioned saves preserve progress and earned builds. Copy migration updates stored scenes, journal entries, reports and memories while retaining their mechanical state. Repository-wide searches should include ignored source files explicitly: `rg --no-ignore -g '!node_modules/**' -g '!.git/**'`.
