# Classes and skill choices

This describes implemented gameplay. The next level costs **35 + 15 × (current level − 1) + 10 × (current level − 1)² XP**, up to level 20. Each completed contract grants **at most one level**; surplus XP carries forward. Automatic class stats still grow. Every earned level grants **one permanent choice shared by stats, foundation skills and class talents**. Class talents are offered at levels **3, 6, 9, 12, 15 and 18**. Choosing one option closes all other options for that exact level, including sibling talents; later choices cannot buy them. Choose a permanent class at level 3. Class talents now have level and class gates rather than mandatory chains, so any earlier selection leaves later options usable. Unspent levels remain individually tracked. Legacy saves preserve earned stats and abilities, but future choices follow these rules.

## Automatic stat growth and class traits

| Class | Per-level gains | Traits |
| --- | --- | --- |
| Reanimated zombie | STR +2, END +2 | Strong, tireless and resistant to physical attacks and ghost terror; vulnerable to magic. Cannot learn living-class talents or heal naturally. |
| Warrior | STR +1, END +1 | Strength and Endurance grow each level. |
| Wizard | INT +2 | Intellect grows each level. |
| Scout | AGI +1, INT +1 | Agility and Intellect grow each level. |
| Barbarian | STR +2, END +2 | High Strength and Endurance. Physical harm risk −12 points; magical harm risk +10 points. |
| Paladin | STR +1, END +2, INT +1 | An armoured holy defender. Physical risk −6; ghosts and undead −15. |
| Necromancer | INT +3, END +1 | Controls death magic. Undead risk −12. Can learn Raise dead and repair animated bodies. |
| Healer / Priest | INT +2, END +2 | A priest of restoration. Undead risk −18. Healing spells reduce injuries, including on adventures. |
| Thief | AGI +3, INT +1 | Agility specialist. Physical risk −5. Disarms traps and retrieves extra salvage. |
| Archer | AGI +2, STR +1, END +1 | Ranged defence. Physical risk −7. Covering fire protects the party and speeds clearing work. |

## How skills affect contracts and story

Contracts expose physical, magical or undead harm. Class resistances and vulnerabilities are averaged across conscious party members; learned protective talents affect the party directly. Unconscious residents contribute no active skills. Stat bonuses affect summed mission requirements; work bonuses multiply daily progress and can shorten the base plan. All of these changes affect exposure to daily injury rolls on story quests as well as paid work and home defence.

## Barbarian

High Strength and Endurance. Physical harm risk −12 points; magical harm risk +10 points.

| Talent | Level | Mutually exclusive alternatives | Implemented effect | Story / game use |
| --- | --- | --- | --- | --- |
| Rage | 3 | Iron hide | Party work +15% while conscious. | Speeds daily progress on every assigned story job or internal clearing fight |
| Iron hide | 3 | Rage | Physical daily threat −8. | Reduces risk on The bell at Wren’s Crossing; The woman who charts absences; The orchard that remembers winter |
| Unstoppable | 6 | War cry | Hurt and injured: full work; incapacitated: 50% work. | Keeps a wounded fighter productive on prolonged story missions |
| War cry | 6 | Unstoppable | Physical daily threat −8; the benefit is shared with the party. | Reduces risk on The bell at Wren’s Crossing; The woman who charts absences; The orchard that remembers winter |
| Spell scar | 9 | Cleave | Magical daily threat −12, overcoming the class weakness. | Reduces risk on A house that can refuse; Alchemical slime; Chest mimic |
| Cleave | 9 | Spell scar | Party work +20%. | Speeds daily progress on every assigned story job or internal clearing fight |
| Last stand | 12 | Stat or foundation skill | Once per assignment, prevents a fatal blow. | Prevents the holder’s first fatal hit per assignment on marked lethal regional jobs |
| Titan grip | 15 | Stat or foundation skill | Strength +8 when working. | Adds to combined Strength for furnace clearing, heavy repairs and Strength-based regional jobs |
| Ancestral guard | 18 | Stat or foundation skill | Magical daily threat −15. | Reduces risk on A house that can refuse; Alchemical slime; Chest mimic |

## Paladin

An armoured holy defender. Physical risk −6; ghosts and undead −15.

| Talent | Level | Mutually exclusive alternatives | Implemented effect | Story / game use |
| --- | --- | --- | --- | --- |
| Holy light | 3 | Shield oath | Undead daily threat −15. | Counters Ghost in the guildhall; Possessed armour; Bell wraith |
| Shield oath | 3 | Holy light | Physical daily threat −10 for the party. | Reduces risk on The bell at Wren’s Crossing; The woman who charts absences; The orchard that remembers winter |
| Lay on hands | 6 | Sanctuary | Once per day, heal one living resident by one injury stage. | Training spell action heals living companions at home or on the same adventure; can restore consciousness for retreat |
| Sanctuary | 6 | Lay on hands | Magical daily threat −10. | Reduces risk on A house that can refuse; Alchemical slime; Chest mimic |
| Consecrate | 9 | Rally the fallen | Undead daily threat −15. | Counters Ghost in the guildhall; Possessed armour; Bell wraith |
| Rally the fallen | 9 | Consecrate | Heal two injury stages once per day; can wake unconscious allies. | Training spell action heals living companions at home or on the same adventure; can restore consciousness for retreat |
| Martyr’s ward | 12 | Stat or foundation skill | Once per assignment, prevent a fatal blow to any party member. | A conscious protector prevents one fatal hit to any companion per assignment |
| Radiant blade | 15 | Stat or foundation skill | Party work +20%. | Speeds daily progress on every assigned story job or internal clearing fight |
| Dawn oath | 18 | Stat or foundation skill | Magic and undead daily threat −15. | Reduces risk on A house that can refuse; Alchemical slime; Chest mimic; Counters Ghost in the guildhall; Possessed armour; Bell wraith |

## Necromancer

Controls death magic. Undead risk −12. Can learn Raise dead and repair animated bodies.

| Talent | Level | Mutually exclusive alternatives | Implemented effect | Story / game use |
| --- | --- | --- | --- | --- |
| Grave sight | 3 | Bone ward | Undead threat −10; reveals false labyrinth routes. | Counters Ghost in the guildhall; Possessed armour; Bell wraith; Grants Echo sight, opening the lower labyrinth and the route to Ysra |
| Bone ward | 3 | Grave sight | Physical daily threat −10. | Reduces risk on The bell at Wren’s Crossing; The woman who charts absences; The orchard that remembers winter |
| Raise dead | 6 | Soul ward | At home, animate a recovered fallen resident as a zombie for 80 gold. | Training ritual returns a recovered fallen resident as a zombie with different abilities |
| Soul ward | 6 | Raise dead | Magical daily threat −12. | Reduces risk on A house that can refuse; Alchemical slime; Chest mimic |
| Mend undead | 9 | Death pact | Repair two zombie injury stages once per day. | Training spell action repairs wounded zombies at home or on the same adventure |
| Death pact | 9 | Mend undead | Once per assignment, prevent your own fatal blow. | Prevents the holder’s first fatal hit per assignment on marked lethal regional jobs |
| Corpse march | 12 | Stat or foundation skill | With a zombie in the party, work +30%. | Speeds story work and defence when the necromancer travels with an animated resident |
| Dread circle | 15 | Stat or foundation skill | Magic and undead daily threat −15. | Reduces risk on A house that can refuse; Alchemical slime; Chest mimic; Counters Ghost in the guildhall; Possessed armour; Bell wraith |
| Death mastery | 18 | Stat or foundation skill | Repair four zombie injury stages once per day. | Training spell action repairs wounded zombies at home or on the same adventure |

## Healer / Priest

A priest of restoration. Undead risk −18. Healing spells reduce injuries, including on adventures.

| Talent | Level | Mutually exclusive alternatives | Implemented effect | Story / game use |
| --- | --- | --- | --- | --- |
| Turn undead | 3 | Protective prayer | Ghosts and undead daily threat −15. | Counters Ghost in the guildhall; Possessed armour; Bell wraith |
| Protective prayer | 3 | Turn undead | Magical daily threat −10. | Reduces risk on A house that can refuse; Alchemical slime; Chest mimic |
| Healing word | 6 | Blessing | Heal a living resident by one injury stage once per day, at home or on your assignment. | Training spell action heals living companions at home or on the same adventure; can restore consciousness for retreat |
| Blessing | 6 | Healing word | Physical daily threat −10. | Reduces risk on The bell at Wren’s Crossing; The woman who charts absences; The orchard that remembers winter |
| Greater healing | 9 | Exorcism | Heal two stages; can restore consciousness for withdrawal. | Training spell action heals living companions at home or on the same adventure; can restore consciousness for retreat |
| Exorcism | 9 | Greater healing | Undead daily threat −20. | Counters Ghost in the guildhall; Possessed armour; Bell wraith |
| Guardian angel | 12 | Stat or foundation skill | Once per assignment, prevent one fatal blow to any companion. | A conscious protector prevents one fatal hit to any companion per assignment |
| Restoration | 15 | Stat or foundation skill | Heal three injury stages once per day. | Training spell action heals living companions at home or on the same adventure; can restore consciousness for retreat |
| Miracle | 18 | Stat or foundation skill | Heal four injury stages. Cannot resurrect a dead resident. | Training spell action heals living companions at home or on the same adventure; can restore consciousness for retreat |

## Thief

Agility specialist. Physical risk −5. Disarms traps and retrieves extra salvage.

| Talent | Level | Mutually exclusive alternatives | Implemented effect | Story / game use |
| --- | --- | --- | --- | --- |
| Lockcraft | 3 | Shadow step | Physical threat −8 from trap awareness. | Reduces risk on The bell at Wren’s Crossing; The woman who charts absences; The orchard that remembers winter |
| Shadow step | 3 | Lockcraft | Party work +15%. | Speeds daily progress on every assigned story job or internal clearing fight |
| Salvager | 6 | Escape artist | Completed paid contracts reward +20 gold. | Adds gold to completed paid/story contracts, helping fund returned-room restoration; home defence remains unpaid |
| Escape artist | 6 | Salvager | Immediate external retreat when this thief is conscious. | A conscious Thief leads an external party straight home, bringing its wounded without a further day of exposure |
| Rune thief | 9 | Ghost walk | Magical threat −12. | Reduces risk on A house that can refuse; Alchemical slime; Chest mimic |
| Ghost walk | 9 | Rune thief | Reveal false labyrinth paths; undead threat −10. | Grants Echo sight, opening the lower labyrinth and the route to Ysra; Counters Ghost in the guildhall; Possessed armour; Bell wraith |
| Master salvager | 12 | Stat or foundation skill | Completed paid contracts reward another +40 gold. | Adds gold to completed paid/story contracts, helping fund returned-room restoration; home defence remains unpaid |
| Vanish | 15 | Stat or foundation skill | Physical daily threat −15. | Reduces risk on The bell at Wren’s Crossing; The woman who charts absences; The orchard that remembers winter |
| Perfect route | 18 | Stat or foundation skill | Party work +25%. | Speeds daily progress on every assigned story job or internal clearing fight |

## Archer

Ranged defence. Physical risk −7. Covering fire protects the party and speeds clearing work.

| Talent | Level | Mutually exclusive alternatives | Implemented effect | Story / game use |
| --- | --- | --- | --- | --- |
| Covering fire | 3 | Hunter’s mark | Physical daily threat −10. | Reduces risk on The bell at Wren’s Crossing; The woman who charts absences; The orchard that remembers winter |
| Hunter’s mark | 3 | Covering fire | Party work +15%. | Speeds daily progress on every assigned story job or internal clearing fight |
| Silver arrows | 6 | Eagle eye | Undead daily threat −15. | Counters Ghost in the guildhall; Possessed armour; Bell wraith |
| Eagle eye | 6 | Silver arrows | Agility +5 when working. | Adds to combined Agility on crossings, rescue routes and coastal jobs |
| Spellshot | 9 | Volley | Magical daily threat −12. | Reduces risk on A house that can refuse; Alchemical slime; Chest mimic |
| Volley | 9 | Spellshot | Party work +20%. | Speeds daily progress on every assigned story job or internal clearing fight |
| Watchful guard | 12 | Stat or foundation skill | Once per assignment, prevent a fatal blow to a companion. | A conscious protector prevents one fatal hit to any companion per assignment |
| True aim | 15 | Stat or foundation skill | Agility +8 when working. | Adds to combined Agility on crossings, rescue routes and coastal jobs |
| Starshot | 18 | Stat or foundation skill | Magic and undead daily threat −15. | Reduces risk on A house that can refuse; Alchemical slime; Chest mimic; Counters Ghost in the guildhall; Possessed armour; Bell wraith |

## Foundation, awakened and protagonist abilities

Foundation skills spend the same level choice as a stat or class talent. A level may teach only one option. Regional hires may start with them. Awakened residents keep their listed skills before selecting a specialisation.

| Ability | Acquisition | Concrete use |
| --- | --- | --- |
| Guard | Warrior, level 2; several residents start trained | Reduces falling-stone, escort, monster and dragon risk. |
| Tracking | Scout, level 2; Ysra and regional guides | Opens the lower labyrinth; lowers expedition risk; quarry cache gives +20 gold. |
| Magical literacy | Wizard, level 2; Maelin and regional mages | Opens/restores the archive; releases Maelin’s frost rune and Ysra’s living-ink seal; lowers magical mission risk. |
| Water breathing | Wizard, level 3; Maelin, Tamsin, Liora and Sal | Reaches the submerged drain wheel; draining permanently opens the cellar to everyone; lowers flooded/coastal mission risk. |
| Stone song | Oren, Bram and Maro | Any fit Stone singer reduces tower repairs from 80 to 40 gold; lowers quarry, falling-stone, monster and dragon risk. |
| Echo sight | Maelin, regional mages, Grave sight or Ghost walk | Opens the lower labyrinth, reaching Ysra and the infirmary route; reduces ghost, recording and false-path mission risk. |
| Threadwalk | Ysra, Fenn, Eda and Tavi | Protects unstable crossings and coastal/rescue jobs; reduces dragon clearing risk. |
| House inscriptions | Rowan, after the landing fitting returns | Reads the deliberate road-cut warning and Sera’s name, unlocking the navigator investigation. |
| Anchor sight | Rowan, after the observatory investigation | Required to inspect the replacement anchors at the threshold before releasing the binding. |
| Undead labour | Reanimated zombies | Conscious zombies add +10% daily party work on contracts and defence. |
| Grave endurance | Reanimated zombies | Physical risk −10 and undead risk −15; magical vulnerability +15. Zombies require repairs rather than natural recovery. |

## Completion without a required build

If nobody learns Magical literacy, **Escort an independent archivist** becomes available after Sera returns the archive seal. It costs 50 gold, takes four base days and exposes the escort to daily harm. The scholar supplies diagrams that open the archive and release Maelin and Ysra. Maelin starts with Water breathing and Echo sight, so the drained cellar and lower labyrinth remain reachable even when hired residents choose other training. Literacy saves this paid detour; protection and work talents change its risk and duration. All eight combinations of the six class branches and both root skill alternatives are tested through completed endings without literacy.

## Active spells, recovery and restrictions

Use living healing, undead repairs and Raise dead from Training. Each caster may cast once per day. The caster must be conscious and with the target: in the same adventure party, or both at home. Healing cannot raise the dead or repair zombies; necromantic repair cannot heal living residents. A fit necromancer raises recovered mortal remains at home for 80 gold. Lost remains recovery costs 60 gold and advances a day. A zombie can never be raised a second time.

Death wards are automatic and spent once per holder per assignment. A personal ward can protect its unconscious holder; party wards require a conscious protector. Ordinary retreat takes one day; Escape artist makes it immediate. Neither awards contract pay. Injuries and internal threat progress persist.

## Coverage audit

Every one of the 54 talents has a supported effect handler. skill-coverage.test.js verifies passive effects alter real contract assessments and checks the explicit story gates. classes.test.js covers growth, exclusive choices, spell use, reanimation, undead repair, escape and death wards. Existing campaign tests cover literacy, water, tracking/echo routes, awakenings and both complete endings. No listed skill is a placeholder.

Sources: classes.js, contracts.js, domain.js, exploration.js and movement.js.

