# The Bound House

Room personality: `room-personality.js` replaces the domestic window-grid template with architecture and lived-in details: curtained quarters and laundry, a stone hearth with paired bowls, archive shelves, curved greenhouse ribs, a soot-dark forge, a star dome, tide arches, gears and frostwork. The returned landing is a rain-facing porch with an empty chair; the service corridor has shoring and a delivery cart. World placards and dungeon explanation boxes have been removed. Doors, books and stairs have subtle glows, object icons and proximity key cues; hover details appear in the information strip below the canvas.

Graphics: `graphics-engine.js` supplies a smooth room camera, 70–300% zoom, high-DPI Canvas rendering, room furnishings and light, visible equipment, spell particles and distinct creature silhouettes. Use **Focus room**, **Wide view**, the +/− buttons or the mouse wheel. Focus adjusts when entering a differently sized room; click-to-walk and stair clicks use the inverse camera transform. Rendering respects reduced-motion preferences for its new effects. `/graphics-preview.html` shows the actual room, equipment and monster renderer without changing a campaign save.

Opening balance: twelve new one-time requests provide varied work across early chapters. The wall survey leads to a mason’s tool chest that reduces service restoration to 50g. After restoration, the cellar-timber contract repairs the stairs directly. Bryn can reach STR 10 through three distinct opening jobs without choosing stat upgrades. Contracts identify main-story plot rewards, companion stories, regional stories, optional requests and repeatable wages; story progress sorts ahead of ordinary work.

Story update: open **Diaries** to read room records and companion correspondence one page at a time. Personal discoveries unlock permanent homecomings in **Stories** and **Characters**. Released companions return equipment to storage and remain in the register. See [STORY_REVISION.md](STORY_REVISION.md) for the revised canon and its current limits.

A playable fantasy guild campaign with a directly controlled cutaway estate, branching room discoveries, a tower, a subterranean labyrinth and 31 characters including three awakened former residents and 24 regional recruits. No dependency install or build step is required. Node.js 18+ runs the local server and tests.

```
npm start
```

Open http://127.0.0.1:4173. Run `npm test` for domain, campaign, movement-gate and save-migration checks.

## Controls

A/D or left/right walk; click in the house to walk to a spot. Space jumps. E investigates, repairs, reads and begins nearby conversations. Tab switches eligible home residents. Stories offers walk-to-discovery buttons while preserving the physical world interactions.

At the corridor stairs, E first repairs them for 45 gold. **S descends to a dry landing; W returns upstairs.** These stairs work for every adventurer without Water breathing. Pressing S again enters the water only with that ability; W works at the lower stair foot to return upstairs. Rowan can enter the connected cellar after the first landing anchor returns. Failure messages explain collapsed stairs, distance, binding or the water gate separately.

Expeditions advance only when you advance a day. Contracts displays party capability coverage, duration, rewards and injuries. When a letter arrives, open it and choose an approach. Dialogue pauses movement and can be deferred with Think about it.

## Starting and continuing

Recruit Bryn (30 gold), escort the lamplighter three times, and spend three advancement points on Strength to reach 10. Control Bryn and breach the service wall with E. Pay 70 gold to restore it, then read its ledger. Recover Wren’s Crossing’s small anchor. Control Rowan and read the landing inscription. This first chapter now leads into the larger campaign rather than stopping.

Follow Sera’s navigator expedition, recruit Ivo and teach him Magical literacy from expedition XP. Take him to the returned archive door and restore it. The archive reveals greenhouse and observatory leads, while shared work opens personal stories. Stories and Journal always offer the current next steps. Personal quests, relationships and room policies carry forward into preparation and the ending.

The catalogue now contains 131 contracts, including 96 sequential regional story jobs and eight optional lethal hunts. The estate has 36 recoverable wing rooms, plus its original public rooms, cellar, tower, labyrinth, furnace and new store room. After Rowan gains freedom, the campaign continues through eight regions damaged by the old guild’s machinery and spells.

Autosaves follow management actions and discoveries. Journal offers a separate checkpoint, JSON export/import and New guild. Existing schema-v1 saves migrate to v2 and retain gold, characters, repairs, flags, unresolved missions and committed outcomes. Old saves cannot recover a first-chapter choice the original version did not store; its completed anchor is migrated as the keeper’s safe choice. Current choices, relationships, memories and queued scenes persist in v2. Movement resets to the entrance on switching or loading.

## Architecture and verification

`narrative.js`: authored chapters, missions, choices, rooms and conversations. `domain.js`: seeded simulation, content references, finance, progression, relationship state, gates and save migration. `movement.js`: stair transitions and explicit dry/water prerequisites. `game.js`: Canvas movement/rendering and focused panels. `CAMPAIGN.md` is the author-facing narrative bible, including spoilers and every branching consequence.

Tests cover the original loop and both complete campaign branches, exactly-once rewards/decisions, money validation, assignment, equipment ownership, character traits, incompatible policies, personal-party requirements, recovery routes, stairs, reference/prerequisite validation and pending-choice persistence. The browser playtest record is in `PLAN.md`.

## Current defaults and limits

Native Canvas artwork and JavaScript; no accounts, backend, runtime story generation or third-party runtime libraries. An optional Google Fonts stylesheet falls back to system fonts offline. The fixed estate expands sideways as rooms return. The current narrative remains a playable backbone with short scenes, not a finished long-form RPG script.

Mechanical balance remains intentionally simple: 35 XP for the first level, rising quadratically (35 + 15n + 10n², where n is current level minus one), with at most one level per contract up to level 20, automatic class stat growth, one equipment slot, seeded independent daily injury rolls, one medical kit treating one harm event, escalating injuries and permanent deaths on marked lethal missions, and one report decision per story journey. There is no audio, mobile movement scheme, elaborate combat or resident AI. Vector portraits, a persistent narrative rail and vertically centred exploration are implemented; art and deeper multi-stage expeditions can continue to develop. The hospice’s recovery benefit and laboratory’s preparation discount give the current room choices modest practical consequences.

The low-risk lantern road and one-day doorstep jobs remain recovery routes. Residents can permanently die on lethal adventures; the early paid work remains nonlethal, and final mechanical preparation is available without completed personal stories or high community ties. Freedom requires a safe method, threshold materials and Rowan’s decision; it is never restricted to a single moral branch.

## Visual direction

Exploration opens with the ledger closed. The brass-framed home strip selects residents; the bottom-left card identifies the controlled person. Management tabs pause movement; Close or Escape returns focus to the house. The gold counter opens Journal and its transaction ledger. Expedition summaries sit at the screen edge. House overview lists known rooms and offers walk-to actions without revealing missing interiors.

The UI uses ink, slate, parchment, brass and spectral teal with amber room lighting. Canvas silhouettes include steep roofs, one hearth chimney, varied ceiling heights, broken void edges and class-specific character equipment. Artwork remains a prototype; authored resident routines, sound and painted textures are still future work.

## The residents and vertical house

Characters lists Rowan, hired residents Bryn, Nell and Ivo, and three discoverable former guild members. Every playable character has an individual SVG portrait. Dormant identities and backstories become available after investigating their physical figure.

* Oren: level 4 mason, petrified on the dry cellar landing. Strength 10 removes his casting ring. Stone song secures falling-stone routes and halves the tower repair cost while Oren is fit at home.
* Maelin: level 5 bellkeeper, frozen in the tower crown. Magical literacy disables her frost ward’s repeating rune. Starts with Water breathing and Echo sight, which reveals the labyrinth stair.
* Ysra: level 5 cartographer, trapped in living ink in the labyrinth heart. Magical literacy cancels the map’s tracking rune. Threadwalk covers unstable crossings.

With the first landing anchor home, E at the quarters stair reconnects two tower floors for 80 gold. W climbs and S descends at x350. E at the dry cellar landing follows the brass thread, opening the labyrinth; E again enters it. W / S at its brass stair (x530) travels between the cellar and two subterranean floors. Tracking or Echo sight is needed for the lower stair. Returning from the labyrinth brings you to the dry cellar, where W returns upstairs. Every floor is centred vertically by the camera. The persistent story rail keeps the objective and latest event outside the exploration surface.

See `CHARACTERS.md` for the complete playable and supporting cast, awakening methods and narrative roles.

## Following the narrative

Stories is an investigation log: the current problem and why it matters, a concrete next action, discoveries actually made, distinct character motives, and known optional leads. It does not advertise the tower or labyrinth before the landing/stair discoveries. Pending expeditions show a return estimate or waiting report instead of prompting another dispatch. Character recaps are reconstructed from the saved choice IDs, so older placeholder memory text does not overwrite the revised player-facing account. Historical journal entries remain saved.


Contracts now sum the party’s primary stat. Estimated days are `ceil(base days × target / combined stat)`, with a minimum of the base duration. Defensive stats and relevant abilities reduce the displayed daily harm chance. A 60% daily threat is rolled again on every working day; one random party member receives recovery time when harm occurs. Residents continue working, then recover after returning. A kit treats the first event only. The preview also shows the chance of at least one event across the estimated duration.

Exploring the east door of the lower labyrinth uncovers the furnace dragon (STR 60, ten base days, 85% base daily threat). Its reward stays unknown until defeat. Assigned residents can be withdrawn individually or together without advancing time; damage dealt persists, injured residents recover at home, and a later party resumes that damage. Only completion pays the hoard and XP. Previously dispatched saved expeditions keep their original timing and outcome rules.


Routes now have visible stair, hatch and gate landmarks. Click a route sign to walk to its interaction point, then use E to unlock/repair it or W/S to climb. House Overview lists route requirements and provides direct walking buttons. Restoring the service room awards the cellar hatch key. Completing Wren’s Crossing awards the bell-tower and labyrinth-gate keys alongside the landing fitting; old saves with that contract already completed retain equivalent access. Water breathing gates the flooded passage, Tracking/Echo sight gates the lower labyrinth, and Magical literacy gates the archive seal. Other restored wings remain tied to their story-contract rewards.


A resident with Water breathing can now open the labelled submerged drain wheel beside the ship (E). The sluice locks open, permanently draining the cellar. Every resident, including Rowan, can then enter the exposed floor without water magic and investigate the ship. Drained status is saved; repeat activation is rejected.


## Daily home defence and completed work

Every advancing day rolls an independent seeded 8% chance of a home event once there are recruits. A ghost (INT 12, two base days, 45% daily threat) or wandering monster (STR 16, two base days, 55% threat) creates an unpaid internal defence contract. Only fit residents at home can be assigned. At most one such event is active. On undefended days, ghosts alternate between injuring a resident (two days of recovery) and damaging a restored room. Rowan is attacked when no fit recruits are home. Each damaged room costs 30 gold to repair in Contracts; damage survives clearing the ghost and saving, and blocks story contracts, room restoration and plot decisions until repaired. Wandering monsters destroy up to 8 gold of supplies per undefended day. Active defenders prevent these home attacks while facing the usual daily injury rolls. Defence pays no gold and grants 15 XP. Withdrawal preserves progress and resumes building damage. HUD, narrative and Contracts prioritise the attack. Completed contracts are archived in Journal/Reports; repeatable paid postings are hidden on completion day and refreshed the next day. All 43 tests pass. An isolated browser check verified an away recruit cannot be picked, a home defender can, daily harm is displayed, and active defence prevents gold loss.


## Expanded combat and equipment

Home parties remain on the map alongside their threat, with attack animations and a progress bar. Watch fight centres the encounter. The ten threat types are ghost, wandering beast, frost spiders, alchemical slime, chest mimic, thorn hounds, possessed armour, void moths, stone golem and bell wraith. The daily event roll stays at 8%; stronger threats join the pool as the roster grows. Most attack residents first and rooms second on undefended days; the original wandering beast destroys supplies.

Injury stages are Fit → Hurt → Injured → Incapacitated → Unconscious → Dead. Work factors are 100%, 85%, 60%, 20%, 0%, 0%. Each untreated harm event advances a stage and adds recovery time. Only missions visibly marked LETHAL can kill. Nonlethal unconscious parties are rescued; home defenders can be pulled out immediately. A lethal unconscious party stops making progress and remains exposed. Death leaves a permanent entry in the register. Surviving returning parties recover fallen members’ equipment; equipment lost with an entire party remains unavailable.

External parties can retreat while at least one member is conscious, including an incapacitated survivor. They carry their wounded home the next day, receive no reward and retain their injuries. External progress is abandoned; internal clearing progress persists.

The quartermaster sells 21 equipment types. Purchases enter shared inventory. Restoring the service room unlocks its labelled STORE door: control a fit recruit, walk to the door and press E. Inside, equip an available item or return the carried item before giving it to someone else. Each physical object has a saved ID and one owner. Legacy equipped shields and boots migrate without a second charge. Magic items modify stats and reduce daily threat.

43 tests cover these rules, all 96 regional story jobs, room and recruit unlocks, deaths, conscious retreat, inventory migration, ownership and saved campaign progress. Browser verification used an isolated test save; the player’s Day 6 / 204 gold save was preserved.


## Classes and talent trees

Training grants automatic class growth and one shared choice per earned level. Choose a stat, foundation skill, or a class talent at milestone levels (3, 6, 9, 12, 15, 18). Choosing closes all other options for that level permanently; future choices cannot buy rejected sibling talents. Six class branches and 54 talents remain available. Class talents use class/level gates, allowing any earlier choices. XP requirements rise quadratically from 35, then 60, 105, 170, 255 and 360 and a contract can grant only one level. Existing saves preserve earned builds. An independent archivist escort offers a paid story route when no resident learns literacy.

| Base → branch | Automatic gains per level | Signature tradeoffs |
| --- | --- | --- |
| Warrior | STR +1, END +1 | Foundation before specialisation. |
| Barbarian | STR +2, END +2 | Physical risk −12; magical risk +10. Rage speeds work, Unstoppable reduces injury penalties; Last stand prevents one fatal blow per assignment. |
| Paladin | STR +1, END +2, INT +1 | Physical risk −6 and undead risk −15. Holy light, Lay on hands, Sanctuary and companion death wards. |
| Wizard | INT +2 | Foundation before specialisation. |
| Necromancer | INT +3, END +1 | Undead risk −12. Grave sight opens false labyrinth paths; Raise dead, Mend undead and Corpse march support zombies. |
| Healer / Priest | INT +2, END +2 | Undead risk −18. Turn undead, healing spells, Exorcism and Guardian angel. |
| Scout | AGI +1, INT +1 | Foundation before specialisation. |
| Thief | AGI +3, INT +1 | Physical risk −5. Better salvage, magical trap protection and immediate retreat through Escape artist. |
| Archer | AGI +2, STR +1, END +1 | Physical risk −7. Covering fire, Silver arrows, Spellshot and faster clearing with Volley. |

Contracts expose physical, magical or undead harm, class defences, vulnerabilities and work bonuses. Class resistances are averaged across conscious party members; learned protective talents support the whole party. Unconscious members contribute no active abilities. Work talents can shorten the base plan. Death wards prevent one lethal hit per ward holder per assignment.

Restoration spells are used from Training, once per caster per day, by conscious casters. An away caster may heal their own party, while a home caster may heal residents in the guild. Greater healing can wake an unconscious companion and permit retreat. Living healing does not work on zombies. Necromancers can repair them with Mend undead.

Raise dead requires a fit home necromancer with the talent, recovered mortal remains and 80 gold. Survivors bring fallen companions home; a lost party’s remains can be recovered by Mara’s crew for 60 gold and one day. The resident becomes a zombie: STR +6, END +8, AGI −3 (minimum 1), INT halved (minimum 1), living skills and talents removed. Zombies gain STR +2 / END +2 on subsequent levels, resist physical and undead threats, are vulnerable to magic and need repairs rather than natural healing. They cannot specialise or be raised twice. Their identity, relationships and journal remain.

All 50 tests pass. An isolated browser save verified Ivo’s necromancer prerequisites, available talent choices and raising Bryn as a persistent zombie. The main player save was preserved.


## Complete reference and guild image

- [All available characters](CHARACTERS.md): 31 controllable characters, portraits, starting stats, arrivals, class branches, abilities and supporting cast.
- [All classes and skill choices](CLASSES_AND_SKILLS.md): growth, 54 talents, prerequisites and concrete story/game use for every ability.
- [Completed guild image](completed-guild.jpg): all 48 interiors. The east wings are folded into rows for readability, rather than representing extra in-game floors.
- [Interactive-size guild atlas](guild-complete.html): the same cutaway, built from the game’s room data and artwork.

Run `node generate-reference.mjs` after changing character or class content to regenerate the references and portrait files. The latest skill audit adds explicit zombie work/resistance effects, any-possessor Stone song tower savings and Rowan’s final Anchor sight check. Named class abilities appear in the party’s journey plan. All 53 tests pass.


## Branching tower and underworld

The playable guild now includes 18 additional chambers and 21 passages with persistent creatures, skill-gated traps, recovered keys and shared magic equipment. Read [GUILD_EXPLORATION.md](GUILD_EXPLORATION.md) or open `/guild-sprawl.html` for the complete branching map. Exploration lists local doors and marked return routes.


## Compact information panels

Ledger and story panels keep their heading and top-right close control outside the scrolling content. Training selects one character and one unspent level at a time, with separate Training, Class, Abilities and Spells pages. Character, page and level controls stay visible while reading. Healing and reanimation use target selectors instead of long lists of action buttons.

