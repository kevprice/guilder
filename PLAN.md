# Implementation plan and record

1. Inspect brief, repository and runtime. **Complete:** empty Git repository; Node and Python available; no existing engine or repository instructions found.
2. Build independent campaign simulation and meaningful tests. **Complete:** economy, roster, equipment, XP, capabilities, party validation, seeded expeditions, injury, recovery, story, journal and versioned persistence.
3. Build a physical fixed house. **Complete:** movement, jumping, stairs, context interactions, home switching, follow camera, visible sealed/flooded/missing areas and visual repairs.
4. Connect the first chapter end to end. **Complete:** recruit → contracts → Strength 10 → breach → repair → ledger → story choice → anchor → landing → Rowan inscription-reading.
5. Verify automated invariants and browser behaviour; document delivery. **Complete:** five domain tests passed; full browser loop played from recruitment through Rowan’s landing inscription; checkpoint/load and reload retained progress; no browser console errors. Strength 10 and paid repairs verified physically in the world.

The supplied brief is the concept reference, while the user authorized planning and building in this workspace. Proposed defaults have been selected for this slice, not treated as demands for a full campaign. No extra campaign wings or finale are implemented.

## Second phase — authorised narrative expansion

The user next requested a stair fix, a large branching narrative, house discoveries and expansion, increasingly demanding missions, and character development over time. Mechanics, style and UI redesign are deferred. This expands the original slice’s scope explicitly.

1. Separate dry stair access from underwater capability. **Implemented and browser-verified:** S reaches the dry landing without Water breathing; W returns from the lower stair foot. Failures state their reason.
2. Author a coherent campaign bible and reusable content resources. **Implemented:** six chapters, ten story/personal/preparation contracts, six repeatable contracts, twelve resident conversations, five room-policy decisions and branch callbacks.
3. Connect choices to persistent consequences. **Implemented:** community/research readiness, room purposes, personal traits, trust, memories, unlocked work, mutually exclusive preparation and differentiated endings.
4. Extend the spatial estate and preserve player control. **Implemented:** archive, greenhouse, observatory and threshold; specialist archive gate, paid repairs, Rowan abilities and final walk beyond the entrance.
5. Migrate existing games and verify both routes. **Complete:** fifteen passing tests include community and research campaigns, all three personal stories, reference cycles, preparation exclusion, later injury benefits and legacy pending choices. An isolated localhost browser save was played from recruitment through the community ending, including actual stair descent/ascent, policy exclusions, earlier-choice callbacks, all room restorations, Rowan walking beyond the gate, and final checkpoint/load/reload. Bryn’s personal expedition was additionally played to verify her trait and evolving conversations. No browser console errors appeared. The player’s original 127.0.0.1 save remains at its original day, gold and progress; its migration was inspected without using it for the long playtest.

The original scope statement above describes phase one. The new campaign and ending are now implemented under the user’s second request. `CAMPAIGN.md` is the expanded narrative source and contains author spoilers.

## Narrative continuity (author knowledge)

The brass token permits visitors to find the entrance again. Rowan remains bound to the connected estate. The service room was sealed to hide a ledger detailing borrowed anchors. Wren’s Crossing remembers both a rescue and an unconsented removal of its shore. Its small anchor can restore the landing without reopening the great threshold. A voice at the bell and the landing inscription foreshadow deliberate severance and an intelligence kept outside. Rowan was saved by the binding and became part of containment; this hidden explanation is not exposed by the opening UI. Full reconnection must eventually find a safe solution. This chapter grants movement and perception, not freedom from the estate.

## Vertical house and awakened residents

Implemented the Characters catalogue and seven individual vector portraits, three physical dormant-resident discoveries, level 4/5 starting specialists, one personal conversation per awakened resident, and ability effects in route safety and labyrinth access. Oren reduces tower repair cost when fit at home. Added two tower floors and two labyrinth floors, concealed lower/crown interiors until visited, vertical camera settling, and a story rail that remains visible beside management panels. Refined Canvas walls, windows, floorboards, fire, beds, roofs, bell and class silhouettes. Fixed save-import input replacement discovered during verification.

Browser verification on a separate port 4181 save: imported the fixture, descended as Bryn, discovered and awakened Oren; entered the labyrinth; controlled Ivo, repaired the tower for the Oren-reduced 40 gold, climbed both floors and awakened Maelin; controlled Maelin, used Echo sight to descend through the false floor and awakened Ysra with Magical literacy. Reload retained all three residents and portraits. Desktop 1920×1080 checks confirmed portraits load and narrative remains visible beside the Characters ledger. The original 127.0.0.1:4173 guild was not used for the awakening playtest.

## Narrative correction after player feedback

The player’s early Stories excerpt showed generic resident placeholders, abstract resource counters, an empty house-purpose slogan and unexplained optional-wing advertising. Replaced that screen with an evidence-based current investigation, its cause and next action, discovered history, individual character accounts, authored conversation recaps and only currently known optional leads. Added state tests matching the quoted progress, pending-report guidance and old placeholder-memory suppression. Rewrote twelve original resident conversations and three awakened-resident conversations with distinct work, motives and physical evidence. Replaced the awakened residents’ vague symbolic traps with specified casting-ring, repeating-frost and live-map mechanisms. Their testimony corroborates the infirmary recording only after the relevant conversations have occurred. Reviewed the live Stories panel and preserved saved progression. All 22 tests passed. Tests verify continuity and mechanics; prose quality remains a writing judgment.


## Party work and daily threats

Implemented summed stat targets, proportional duration for weaker parties, independent daily harm rolls, defensive stat and ability reductions, a one-event medical kit, cumulative exposure previews, and accumulated recovery time. The labyrinth furnace reveals an optional dragon contract with unknown rewards. Whole-party and individual immediate withdrawal retain clearing progress; reassignment resumes it. Completion reveals the hoard once. Legacy dispatched missions preserve their committed rules. All 28 tests pass, including both campaign branches, daily repeat injuries, partial withdrawal, reward timing, progress persistence and legacy completion. Browser checks on port 4181 verified STR 10 / 20 gives four days, a daily dragon injury appears in the card, withdrawal leaves the day unchanged and retains damage.


## Restored service-room access correction

Removed Rowan’s stale service-corridor movement limit after restoration, centralised the ground-floor limit in walkingBoundary, and removed the remaining wall fragment from the cleared opening. Strength is needed only to breach the wall. Restored rooms are available to every resident. Replaced the early anchor explanation with an enchanted brass fitting, its visible service-room socket and the specific result of fitting it: the missing landing reappears. Updated the contract, ledger entry and return scene consistently. All 29 tests pass. An isolated browser save verified Rowan walking into the room and reading its ledger before the landing is restored.


## Magical scenery pass

Replaced the repeated suburban roof-and-chimney pattern with one entrance hearth chimney and a continuous moss-covered guild wing. Added layered rural woodland, mist, a crescent moon, drifting magical lights and floating stones. The scenery becomes cooler and more otherworldly further inside; tower floors show stronger aurora, constellations and floating landscape above the forest. Underground floors use subdued mineral glows. Scenery is isolated in scenery.js and does not change room access or saved progression. Syntax checks passed, and isolated browser climbing verified both tower landings with no console warnings or errors. The player save remains Day 6 / 204 gold.


## Visible story-gated routes

Added the missing quarters stair, permanent tower/cellar/labyrinth route signs and a visible furnace door. Route signs can be clicked to walk to their actual interaction point. House Overview describes unlocks and links directly to the ground-floor stairs. The restored service room yields a cellar hatch key; Wren’s Crossing yields tower and labyrinth keys. Existing completed-quest flags represent key possession, preserving saves. The Journal lists recovered keys. Door/room access remains tied to story rewards or learned abilities, with repair costs after unlocking. All 30 tests pass, including locked-route attempts preserving funds, quest rewards unlocking routes and save compatibility. Browser inspection confirms the previously invisible quarters stair and its key state are visible without approaching a tooltip.


## Permanent flooded-cellar drainage

Added a visible submerged drain wheel beside the ship, usable with Water breathing. Opening the sluice saves cellarDrained, removes the water rendering and opens the cellar to all residents, including Rowan. Ship investigation no longer requires water magic after draining. Route guidance, room name and journal record update with the saved state. All 31 tests pass, including ability checks, rejected attempts preserving state, persistence, duplicate activation and non-swimmer/Rowan access.


## Daily home defence and completed work

Every advancing day rolls an independent seeded 8% chance of a home event once there are recruits. A ghost (INT 12, two base days, 45% daily threat) or wandering monster (STR 16, two base days, 55% threat) creates an unpaid internal defence contract. Only fit residents at home can be assigned. At most one such event is active. On undefended days, ghosts alternate between injuring a resident (two days of recovery) and damaging a restored room. Rowan is attacked when no fit recruits are home. Each damaged room costs 30 gold to repair in Contracts; damage survives clearing the ghost and saving, and blocks story contracts, room restoration and plot decisions until repaired. Wandering monsters destroy up to 8 gold of supplies per undefended day. Active defenders prevent these home attacks while facing the usual daily injury rolls. Defence pays no gold and grants 15 XP. Withdrawal preserves progress and resumes building damage. HUD, narrative and Contracts prioritise the attack. Completed contracts are archived in Journal/Reports; repeatable paid postings are hidden on completion day and refreshed the next day. All 36 tests pass. An isolated browser check verified an away recruit cannot be picked, a home defender can, daily harm is displayed, and active defence prevents gold loss.


## October 9 expansion delivered

131 contracts; 96 new story jobs across eight regional arcs, eight lethal bounties; 36 recoverable wing rooms; 31 characters including Rowan; ten home threats; 21 shared equipment types. The guild’s final horizontal boundary exceeds 12,000 units. New regional arcs follow Rowan’s original freedom ending. Visible home fighters and Watch fight are implemented. The store is a physical room above the service room with a labelled entrance, shared ownership and legacy-item migration. Injury severity reduces work; unconscious lethal parties are stranded, repeated harm can kill, conscious survivors can retreat in one day and recover fallen companions’ gear. Plot reports also require room repairs.

Verification: all 43 tests pass, including all 96 regional contracts in sequence, ownership transfers and migration, death persistence, no reward on retreat and ten home-defence types. Isolated browser checks confirmed Bryn/Ivo stay beside the ghost, Nell physically enters the store and equips/returns the same staff. Screenshots: visible-home-fight.jpg and shared-store-room.jpg. The main save remains Day 6 / 204 gold. No dependencies were installed.


## Class progression restored

Six specialisations with automatic stat growth, physical/magical/undead defences and vulnerabilities, and 54 prerequisite-based talents. Permanent branch at level 3; talent choices every three levels through 18; cap 20. Legacy earned stats preserved. Manual foundation skills and optional points remain compatible with existing exploration gates. Work bonuses, loot bonuses, immediate thief retreat, injury-work passives, one-use death wards, per-day living healing and zombie repair affect the simulation. Raise dead transforms recovered residents into zombies with different stats and abilities, not a free return to their previous class. Remains recovery has a financial and time cost. Training displays roots, prerequisites, locked talents, growth and usable spells. Sprite labels expose classes; zombie skin is distinct.

All 50 tests pass. Browser verification showed necromancer prerequisite locks and Ivo raising Bryn, with STR 21 / END 23 and living talents removed. Screenshot: class-progression.jpg. Main Day 6 / 204g save preserved.


## Complete guild and skill audit

Delivered guild-complete.html and completed-guild.jpg showing 48 interiors: sixteen main/vertical interiors plus 32 regional rooms. Regional east wings are folded into rows for legibility; the caption explicitly distinguishes this atlas from the in-game horizontal layout. Legacy guild-panorama.html redirects to the updated atlas. CHARACTERS.md now contains every controllable resident with portrait, starting stats, arrival, skills and narrative; CLASSES_AND_SKILLS.md documents every class and all 54 talents. generate-reference.mjs keeps references grounded in source data.

Closed cosmetic skill gaps: Undead labour adds 10% work, Grave endurance provides physical/undead resistance with magical vulnerability; Anchor sight is required for the final anchor inspection; Stone song repair savings follow the ability rather than Oren’s identity. Assignment journal entries name the relevant class abilities in the party’s plan. All 53 tests pass, including passive skill coverage and the original complete campaign branches. Atlas browser render contains every room, no script errors, and the main player save remains untouched.
