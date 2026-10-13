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
- Switch characters through the home strip or Tab. Each person keeps their own room and position.
- Use Focus room, Wide view, +/− or the mouse wheel to adjust the camera.
- Characters, Training and Diaries use individual pages. Stories follows the investigation; Reports records completed expeditions.

Bryn is the opening companion. Ivo is discovered on the restored tower’s lower landing and starts with Magical literacy. Nell is found after investigating the holding cells; Oren waits beneath the crypt’s burial stair. Later discoveries follow recovered records, keys and regional expedition milestones.

The wall survey, mason's tool recovery and another opening request can bring Bryn to Strength 10. The tools reduce service restoration to 50 gold. The cellar-timber contract repairs the stairs. The dry landing leads to the flooded cellar; Water breathing reaches the submerged wheel that drains it and opens deeper exploration.

## Current game systems

Contracts identify story leads, plot rewards, companion journeys, regional work, exploration and repeatable wages. Party stats combine to determine duration. Each working day has a harm roll modified by protection, skills and equipment. Home attacks begin once three surviving companions have joined. The early jailer, rat king and crypt warden take two base days, and ordinary injuries add one recovery day. The rat king uses intellect to plan safe approaches rather than requiring a scout before one can be recruited. A specialist opens magical seals and marks hidden routes once; other companions can follow the prepared route. Traps are disarmed separately and remain safe for the guild. Underwater routes still require Water breathing. Conscious survivors can retreat; home defenders remain visible beside the threat.

XP requirements grow quadratically from 35, 60 and 105 XP. Each contract can grant one level and carry surplus XP forward. Stats increase automatically with class growth. Each earned level gives one choice between skills, spells, class talents and a quartermaster equipment requisition. Equipment requisitions add a physical item to shared storage without charging gold. Warriors specialise as Barbarian or Paladin, Wizards as Necromancer or Healer, and Scouts as Thief or Archer.

Companion investigations start from level 4. Three later chapters open at levels 6, 10 and 14; farewell requires level 16. The last fighter cannot leave before the sewer rat and holding-cell guardian are cleared unless another fighter has joined. Early saves can invite a living companion who left below level 16 back through their character page.

Equipment belongs to shared storage. Companions visit the store to equip and return items in separate weapon, shield, head, body, feet and accessory slots.

The Rooms page manages a workshop in the restored service room, a garden in the restored greenhouse, and an infirmary in the greenhouse hospice or a restored regional medical room. Mara contributes one work unit to each active room project per game day. A fit assigned resident contributes another, plus one more at effective STR 10 (workshop), INT 10 (garden), or END 10 (infirmary). Away or injured workers keep their assignments and resume on return. Staffed completions grant 5 XP, capped at 5 home-work XP per resident per day, without counting as expedition visits.

New and existing games receive 6 salvage and 4 supplies once. Crafting reserves its gold and salvage; cancellation refunds all inputs. Crops repeat automatically, and treatment costs one supply only when it can improve on natural recovery. Projects collect their outputs automatically. Tier 2 facilities add one daily work unit. Each room has one reusable utility furniture slot and two decoration slots; utility changes require completing or cancelling the current project. Decorations and earned guardian trophies have no stat bonuses.

Rooms has an overview, individual facility pages and shared furniture storage. Workshop orders can plan batches of up to 99 items, be reordered, or have their unstarted quantities removed. Each item pays its inputs when it begins work; a missing resource pauses the order without taking payment. One item can complete per workshop per game day, and the next begins on the following day. Cancelling an active item refunds its reserved inputs without removing the rest of its order. Order estimates use current staffing, furnishings and the budget remaining after earlier orders.

Garden production can grow continuously, maintain a player-selected supply reserve, or pause. Partial crop progress is preserved while paused, and reserve farming resumes when stocks fall below the target. The reserve is a production target, with no storage cap: harvests can exceed it and supplies remain available for treatment and expeditions. Worker options show effective stats and bonuses. Expedition preparation previews its resource expense and the effect of sending assigned room workers away.

The workshop can reclaim spare stored equipment or furniture for salvage in two work units. Crafted pieces return half their base salvage, rounded down with a minimum of one; other common equipment returns up to three salvage based on its stats. Equipped gear, placed furnishings, rare equipment and earned trophies cannot be reclaimed. Mill-road blueprints also allow refitting a stored short sword into a long sword (6 salvage + 50g / 4 work), or a padded coat into leather armour (7 salvage + 50g / 4 work). Forge and outfitter effects apply normally. Each conversion holds its exact physical input until completion; cancellation returns that piece and all payments. Started conversions take priority over planned orders, which resume on a later game day.

Survey and Salvage have their own contract tabs. Surveys along the mill road, lower drains and tower approaches unlock utility furniture blueprints; completed surveys open repeatable salvage trips with a two-day cooldown. Each trip offers a decision after its first working day and waits safely for an answer. Supplies can secure a bonus, or the party can attempt it using the displayed stat threshold and extra injury chance. Existing expeditions remain playable without supplies. Medical kits can be purchased for 10 gold or funded with supplies.

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

The simulation lives in `domain.js`, supported by focused modules for contracts, classes, equipment, exploration, guild management and homecomings. `guild-management.js` defines facilities, resources, projects, furniture and development expeditions; `room-panel.js` and `guild-art.js` provide their UI and furnishing zones. `game.js` coordinates input and presentation; `character-panel.js` renders character pages. The graphics modules paint the house, furnishings, equipment, creatures and affordances. `player-copy.js` migrates retired prose from stored games. The static server sends fresh resources for local development.

For isolated browser verification, run the server with `PORT=4174` and open `/guild-management-preview.html`. It provides hospice, laboratory, workshop and pending-decision demos on that separate origin, preserving the normal port 4173 save. The automated guild-management tests cover migration, costs and refunds, production, assignments, equipment and furniture ownership, treatment, medical-kit compatibility, decisions, withdrawals, cooldowns and navigation notices. `guild-production.test.js` also checks order payments and priority, production policies, partial crops and staffing forecasts. `guild-conversions.test.js` verifies refits, reclamation, physical reservations, corruption rejection and management migration through version 3 without resetting resources or existing projects.

Existing versioned saves preserve progress and earned builds. Copy migration updates stored scenes, journal entries, reports and memories while retaining their mechanical state. Repository-wide searches should include ignored source files explicitly: `rg --no-ignore -g '!node_modules/**' -g '!.git/**'`.
