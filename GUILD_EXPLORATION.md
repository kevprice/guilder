# The sprawling guild: playable exploration

The existing practical entrance, quarters and service rooms remain the centre. Three story routes lead into an irregular exploration graph: the drained cellar, the lower labyrinth and the bell tower landing. This expansion adds **18 chambers, 21 passages and 10 persistent clearing contracts**. The Canvas engine remains in place while we establish the game’s feel.

## Underground

The drained cellar opens the old sluice works. Its maintenance key opens the prison intake; Water breathing takes the western spillway into the rat king’s cistern. Prison testimony leads to the crypt of erased names and the bone library. The lower labyrinth conceals a second maze, an oubliette and a root-bound treasury. The cistern branches into luminous fungal caverns and a drowned doorway between worlds.

These discoveries reveal a concrete history: guild officials hid witnesses in prison rooms after they disputed the ownership of recovered interiors. Burial records restore erased names. Maintenance records explain polluted runoff and the seawater leak. Treasure records identify owners before the guild claims its salvage fee.

## Wizard’s tower

Magical literacy opens the stair to the unfinished study. Apprentice notes reveal a shelf stair to a suspended potion kitchen. Echo sight reveals a reflected passage into an afternoon trapped in a mirror. Beyond its creature lie a summoning theatre, a magical menagerie, an orrery, a bottled storm and the observatory beyond midnight.

The apprentice preserved failed experiments and safety instructions that were removed from public records. Each investigation supplies evidence, equipment or a usable route clue. Traps require Magical literacy, Tracking or Echo sight; appropriate Thief talents provide alternate disarming routes.

## Rules implemented

- E enters a labelled passage. Door markers remain visible on the map. The Exploration ledger lists local routes and recovered discoveries.
- Keys come from investigating authored rooms. Abilities open specific paths; paying gold alone does not open these chambers.
- Every first visit records a discovery and marks a return route. An explorer can leave a dangerous chamber immediately.
- Creatures stop exploration beyond the entrance and block deeper passages and treasure. Assign residents at home through Contracts. Watch fight shows the defenders in the correct chamber.
- Clearing progress survives withdrawal and saving. Rewards remain unknown until completion. Deep cavern and storm encounters can kill.
- Recovered magic items enter the shared store, where residents can equip and transfer them under the existing rules.
- Secret routes connect the root treasury upward into the study, the orrery downward into the crypt, and the bone library to the high observatory once its key is found.
- Each chamber has its own drawing, theme, narrative discovery and reward. Natural caverns use irregular outlines; interiors contain characteristic props rather than repeated domestic windows.

The complete graph can be explored in `guild-sprawl.html`; `sprawl.js` is the source of chamber stories and gates. `sprawl.test.js` checks connectivity, key production, trap gates, persistent combat, return routes and save validation.

## Future feel work

The new tower and underworld sprawl; the previously recovered regional wings still use the original eastward corridor. A later layout pass can fold those wings into courtyards and bridges. Dynamic lighting, richer combat animation and a graphics engine change remain future work. This expansion establishes room identities and playable consequences before that visual overhaul.
