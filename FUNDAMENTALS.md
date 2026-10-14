# Economy first

The game should be enjoyable as a guild workshop before missions or narrative are added. The intended play is active management: move a limited crew between gathering and crafting, choose ingredient variants, fund a build plan, and turn finished goods into useful equipment and a more capable workshop.

## The foundation now implemented

- Resource metadata and production definitions no longer import room layouts or narrative. `resource-catalogue.js` and `production-catalogue.js` describe the materials and jobs.
- `resource-ledger.js` normalises costs and checks every balance before changing stock or recording gold. Production, crafting payments, exact refunds and surplus sales use that path. Negative, fractional, unknown and overflowing amounts fail before a payment.
- `workforce.js` is the single calculation for effective worker stats and work contributions. Crew availability, equipment and class bonuses mean the same thing in forecasts and production.
- `guild-content.js` holds facility, crafting and contract definitions; `guild-management.js` orchestrates their behaviour rather than also owning all those definitions.
- `production-planning.js` is a read-only query for batch costs, earlier queue commitments, deficits, acquisition sources and current crew timing. Plans do not spend or reserve resources. Paid work is already removed from stock and is not counted twice.
- Craft shows quantities, ingredient alternatives, the material plan, crew links, queue priorities and expertise together. A workshop without workers reports a pause instead of inventing a one-day estimate. A blocked active job blocks later completion dates too.
- Production completion records now retain the recipe identifier. Long patterns use their actual work requirement when validating saves; the former fixed work whitelist incorrectly rejected valid eight- and ten-work projects.

## Progression that rewards decisions

First completions of three different products earn Artisan and +1 workshop work/day. Eight earn Guildwright and +2. The bonus applies only while a fit worker is assigned to the workshop; expertise and furnishings cannot run an empty room. Repeat batches remain useful stock, but cannot farm expertise. Scrap and material versions of the same item count as one design. Reclamation and cancelled projects do not award mastery.

Crew stats, facility upgrades, specialist utility furniture, new recipes and workshop expertise are separate, visible ways to improve output. These thresholds are an initial balance pass, not a claim that the economy is finally tuned.

Management save version 9 keeps stocks, inventories, workers, projects and queues. Historical expertise is recovered from explicit workshop completion records, not inferred from owning purchased or found equipment. Saves with no surviving craft evidence start their expertise record from the next completion. No old craft is reproduced or charged again.

## Physical upgrades and enchantments

Recipes can consume one specific stored piece and improve it through a bounded chain. Forge → reinforced forge → runic forge, raised beds → irrigated beds → living beds, and short sword → long sword → hearth-forged sword retain their original UID. Banners, shelves and plants can also be enchanted. No replacement object is minted; another copy is unaffected. Active work reserves the piece and the exact receipt. Cancellation and partial-work saves preserve the original stage. Placed furnishings must be removed and equipment unequipped before work begins.

Runic forges contribute +3 weapon work or +1 other workshop work. Living beds harvest four supplies in three work. Whispering shelves add one aether to that room’s completed distillation; evergreen planters add one herb to completed herb harvests. Ward banners contribute four defence in operational staffed watch rooms. Duplicate enchanted decorations do not stack. A fit hearth-forged sword wielder contributes one additional workshop work. Furniture and facility upgrades cannot operate an empty workshop. Enchanted graphics use anchored runes, reinforced structures and irrigation; active effects stop pulsing when reduced motion is enabled.

Metal recovery converts two scrap to two ore in three workshop work, without a gold cost. This provides a metal route before the late furnace guardian. Material recipes and surplus sales make it possible to reinvest production without taking a mission.

`npm run test:progression` runs a deterministic restored-house checkpoint: starter 100 gold, six scrap, four supplies and zero advanced materials; Rowan, Mara, Bryn and Ivo; known mill/tower blueprints and restored workshop, garden, bell-tower and herb-production rooms. It earns materials through crews, recycles metal, crafts components and funds overhead by selling surplus. It reloads each completed stage. With the current strategy, the first forge finishes on day 3, reinforcement on 17, runic forge on 29, Guildwright/hearth sword on 59, and all five house enchantments on 135. Temporary gatherers return to garden and aether work between orders; no room produces without an assigned crew. The route creates only five furnishings and one equipment object. This is evidence for the restored-house economy, not a playthrough of the opening campaign or an optimal speed route.

## Build the next layers in this order

1. **Economy and progression:** playtest the gather/build/equip loop with small crews. Measure time to first useful craft, material bottlenecks, alternatives to spending all cash, and the marginal benefit of each upgrade. Every essential material needs a readable acquisition route or a viable alternative input before its first required use.
2. **Missions and contracts:** define each reward against the economy: cash for overhead, materials for a current bottleneck, patterns that open a different decision, or physical items with a distinct role. Model preparation costs and the production lost while workers travel. Give each offer structured reward data so the simulation, previews and report all agree. Avoid another disconnected currency or crafting interface.
3. **Story:** attach narrative conditions and consequences to those established jobs, rooms and rewards. Story should explain and vary the economic choices. It should not be needed by the transaction or production engine to function.

## Debt still to address

- `domain.js` and `game.js` remain large orchestration files. Further extraction needs behaviour tests and clear ownership, rather than moving code into more mutually importing modules.
- Facility-specific advanced forms still coexist with the newer management views. They share production rules now, but should be consolidated before adding more management features.
- The ready-house opening supplies economic routes for essential first-slice materials. The preserved campaign still has narrative restoration and guarded rooms; its pacing remains a separate compatibility concern.
- Mission reward definitions and story reward handlers still need a unified reward adapter. Existing rewards and campaign behaviour were deliberately preserved in this foundation pass.
- Forecasts describe the current crew, upgrades and funds. They cannot promise future mission injuries, purchases, worker moves or expertise gains during the queue. The deterministic restored-house simulation covers the upgrade loop; opening-campaign pacing and broader crew strategies still need focused playtesting.

## Acceptance checks

Run `npm run check`. `foundation.test.js` exercises production without missions or campaign state, failed payments and refunds, physical item ownership, genuine mastery, batch commitments, paused queues, source forecasts, long-pattern save/load and version-7 migration. Existing campaign and management regressions remain in the same suite.

`upgrades.test.js` covers physical upgrade chains, prerequisites, exact refunds, partial-work saves, corrupt sources, queue bypasses, actual house output and defence, duplicate stacking, enchanted equipment, early metal recovery and the complete earned-resource playthrough.

## The connected household slice

New games now begin with Rowan, Mara, Bryn, Ivo and Nell, functional gathering, crafting, research/alchemy, care and watch rooms, and shared completed resources. The starting wing connects the workshop, returned landing, archive, greenhouse and care room; the tower crown supplies medicinal herbs. Further cellar workplaces can be recommissioned through costs and workshop expertise. The old furnace must first be discovered and its guardian cleared. Secured chamber discovery still unlocks workplaces and residents. Existing saves keep their opening, residents, room discoveries, stocks, physical ownership, campaign flags and active legacy missions. They receive the new expedition, knowledge and relationship systems without fabricated friendships or replayed rewards. `initial({ opening: 'legacy' })` remains available for campaign fixtures.

`expeditions.js` owns the daily lifecycle; `expedition-content.js` supplies the two first encounter families. Public domain operations are `dispatchExpedition`, `orderExpedition`, `reinforceExpedition`, `startResearch`, `cancelResearch` and `recommissionRoom`. Presentation uses `expeditionPreview`, `operationView` and `dossier` so undiscovered enemy profiles are withheld. Site occupants and operation RNG are saved. Scouting sees an existing situation. A detection warning blocks the next game day until retreat, hide or engagement is ordered; concealment and defensive combat keep resolving while reinforcements travel. Travel takes one day each way. Incoming help joins after the threatened party's daily resolution, with an eight-living-resident site limit. Extraction, withdrawal, partial intelligence, failed parties and successful objectives produce distinct recorded outcomes.

Scouting exposure uses the weakest infiltrator, group size and explicit equipment noise. Armour and rarity are distinct properties. Intelligence carries its observation day and becomes potentially stale after three days. Detection alerts a site for three days. Cleared sites renew after seven days; inactive patrols can rotate after seven days. Creature knowledge survives local changes. Research shares the alchemy crew and pauses aether production while preserving paid progress. A sketch enables initial creature research; a specimen enables deeper study. The stag's fire vulnerability exists before research, and a flame preparation is craftable from ordinary house production before a hunt. A successful hunt credits exactly one horn to shared stores at objective completion, while residents still travel home. The horn upgrades a specific runic forge or padded coat into a quiet briar cloak, preserving its UID.

`household-social.js` records pair affinity and dated reasons separately from trust with Rowan. Operation outcomes are applied once: success +3, failure −3, rescue +10. Completed coworker jobs can add +1 per pair per day. `workforce.js` uses the average affinity of fit living coworkers for a bounded +1/−1 room modifier at ±25, retaining at least one work. Zombies do not enter this calculation. A fit necromancer in the same crew triples base work for up to two zombies, occupies a slot, and loses the bonus immediately on dispatch, reassignment or injury. This applies to noncombat expedition labour and never triples combat or watch strength. New raisings preserve identity, historical memories and archived living stats while using STR 8, END 10, AGI 2, INT 1 with equipment and no living advancement. Older zombies retain their earned profile. Injured zombies require necromantic repair.

Saved operation events have unique identities and feed reports, discoveries and relationship memories. Paid preparation refunds, objective resources and social consequences are validated against those recorded events across reloads. Research, scouting, supervision and intervention appear in the relevant panels and actual crew animations; the cutaway remains icon-led. Home defence, damage repair and living care remain directly accessible during outside operations.

## First-slice verification

`expeditions.test.js` covers deterministic cautious preparation, aggressive assault, failed scouting followed by rescue, death followed by supervised reanimation, knowledge filtering, gear noise, partial information, daily danger, incoming help, refunds, physical horn choices, dated intelligence, relationships, forecast parity, old active missions and corrupt saves. The existing campaign/content/copy regressions remain in the full suite.

`npm run test:household` runs the actual new-game opening without advanced stock grants or campaign missions. It earns and trades materials with assigned crews, scouts, researches, crafts a flame counter, hunts, and upgrades its original forge. With the current strategy, scouting completes on day 4, research on 10, preparation on 15, the horn hunt on 21, runic forging on 46 and the hornbound forge on 54 (53 elapsed days). Each completed stage reloads. The script fixes unrelated home-event randomness to isolate economy progression; these timings are a reproducible strategy, not an optimal route or a worst-case survival guarantee. The full campaign production harness remains `npm run test:progression`.

The browser checks exercise the real desktop controls through scouting, research, counter crafting, home intervention and a successful hunt; a separate checkpoint checks detection's blocked-day warning, hiding, rescue, phone memories and removal of supervision on dispatch. Phone layouts are checked at 390 pixels wide.

Next content should use these same operations and events: escort jobs, specimen recovery, recruit rescues and negotiation, followed by personal ambitions, faction relationships and reactive story threads. These are subsequent extensions, not first-slice content.

## Opening and interaction repairs

Household layout version 2 connects every starting workplace to usable paths. The repaired workshop has an open wall, and the archive passage leads to the greenhouse. The initial herb crew uses the tower garden rather than a distant undiscovered regional room. Version-1 household saves retain stocks, paid work, furniture and crews; the herb crew, decorations and partial progress move to the connected tower garden. Previously commissioned cellar rooms gain usable stairs. Already commissioned furnaces retain a maintenance-stair connection without fabricating a defeated guardian.

Resident portraits switch control without changing work assignments; game days do not infer jobs from a controlled character's location. An assigned resident returns to their existing workstation after control switches away. Outside residents remain as muted, badged portraits that open their condition sheet. Character sheets use their own heading layout, isolated from toolbar CSS. Generic floating diamonds are replaced with contextual passage, record and conversation symbols or a single nearby interaction cue.

Home attacks select operational rooms within the connected house boundary. The saved threat location, intervention preview and defender artwork share this calculation; older attacks in isolated rooms relocate to the connected guildhall while retaining progress and parties. Guild discovery has its own Contracts view and the route ledger works in both openings. Investigating a chamber still requires its guardian and trap resolved before production can begin. Discovered mechanisms become craftable after their pattern is earned.

`household-interface.test.js` covers these behaviours, layout migration, connected workplaces and restored chamber production. Isolated browser checks cover actual control switching after walking, desktop and 390px phone sheets, mission portraits, home intervention and entering the wizard's study through its visible passage.

## Direct missions and party loadouts

The mission planner always provides **Send party** to attempt the objective and **Scout first** to gather information. Unknown threats, missing research and unequipped residents do not block a funded launch. Reports and preparation affect the chances and decisions outside. Crew choices persist through site changes, equipment adjustments and trips to the shop.

`party-preparation.js` supplies a read-only launch preview and automatic provision policy. Scouting uses one supply; missions use two plus one treatment when a spare supply is available. Optional medicine never prevents an otherwise affordable launch. A researched, observed fire vulnerability can prompt packing an owned ember flask when the party has no fire equipment or trained flame spell. No universal flame checkbox or kit-reservation workflow is required. Equipped counters still work before discovery. Existing explicit preparation calls and paid saved receipts remain compatible.

The domain's `launchParty` validates and launches this policy; `equipPartyMember` changes one resident's owned loadout without changing control or jobs. Ownership, slot and level checks precede mutations. Replacing gear returns its previous physical item to storage; transferring it from another resident at home removes the former owner's equipped reference. Away gear and workshop-reserved pieces stay unavailable.

Owned equipment and selected residents come first in the preparation view. The shop is a separate, filtered section. Household purchases explain that supplies pay for travelling food and injury care, while scrap makes starter gear, furnishings and recovered metal. Material-source queries use actual room forecasts, including the tower herb garden.

`party-preparation.test.js` covers direct unknown missions, affordable departures without optional care, known counter packing, safe swaps and transfers, save ownership, and both launch actions. Browser checks exercise selected-party equipment, a shop round trip without losing selections, a direct unknown-threat mission, the researched hunt, and the phone's visible launch action.
