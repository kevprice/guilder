# The Bound House — complete text catalogue

Editorial snapshot of the current runtime source, including spoilers and unfinished or inconsistent wording. This records what is written in the game; it is not a revised story bible.

## How to rewrite this script

Each entry identifies its source file, line and scene or field. Keep those identifiers with your rewritten text so changes can be applied to the right place. Rewrite descriptions as descriptions, and put instructions in objective or action fields. Conditional alternatives are separate entries: review every branch.

Dynamic values appear as ⟦expressions⟧. Keep their meaning when rewriting; they supply character names, quantities, chosen outcomes and other changing details. Some short entries are fragments joined at runtime, so read the surrounding entries and source template together. Templates containing markup include both display text and the original template.

This catalogue covers narrative, discoveries, conversations, diaries, homecomings, quests, choices, reports, descriptions, abilities, equipment, objectives, labels and runtime messages. A few technical fragments are retained where they sit alongside interface wording. Art data, compatibility-only retired prose, tests and developer reference generators are excluded. Existing saves can contain older wording not authored in the current script.

**Editing:** This document is a working copy, not an input loaded by the game. Your rewrites must be applied back to the source. Do not regenerate it over an edited copy; export a fresh snapshot under a different name if needed.

2454 source entries, plus the permanent HTML interface.

## Contents

- narrative.js
- resident-discoveries.js
- homecoming.js
- exploration.js
- opening-contracts.js
- expansion.js
- sprawl.js
- story-model.js
- domain.js
- character-panel.js
- classes.js
- equipment.js
- contracts.js
- game.js
- artwork.js
- dungeon-art.js
- graphics-engine.js
- movement.js
- room-personality.js
- scenery.js
- index.html

## narrative.js

### narrative.js:3

**Context:** chapters → survival → title

I · A wage and a wall

### narrative.js:4

**Context:** chapters → shore → title

II · Things brought home

### narrative.js:5

**Context:** chapters → accounts → title

III · The price of wonders

### narrative.js:6

**Context:** chapters → truth → title

IV · Who closed the door

### narrative.js:7

**Context:** chapters → preparation → title

V · A different kind of guild

### narrative.js:8

**Context:** chapters → freedom → title

VI · The road beyond

### narrative.js:14

**Context:** storyMissions → navigator → name

The woman who charts absences

### narrative.js:22

**Context:** storyMissions → navigator → desc

The landing inscription names Captain Sera Venn, whose ship is lodged beneath the house. She is alive, on a coast with no tides. Her charts may locate the missing archive.

### narrative.js:24

**Context:** storyMissions → navigator → checks → label

Agility 8 finds a route over the broken sea wall

### narrative.js:25

**Context:** storyMissions → navigator → checks → label

Water breathing crosses the drowned road

### narrative.js:29

**Context:** storyMissions → navigator → arrival

The shore is paved with shells that have never heard a sea. Sera waits beside a hull painted with the old guild mark.
“You kept the bow,” she says. “We kept everyone who was standing behind it.”
A storm made of displaced water is approaching. Sera can retrieve her chart, but three deckhands are trapped on the reef. The party cannot reach both before the storm. She places the archive seal in your hand regardless. “That belongs to the people who wrote it. Tell them we are still here.”

### narrative.js:33

**Context:** storyMissions → navigator → choices → crew → label

Bring the deckhands home

### narrative.js:35

**Context:** storyMissions → navigator → choices → crew → preview

Sera trusts the new guild. Recover a partial chart and open a community escort contract. The archive still returns.

### narrative.js:40

**Context:** storyMissions → navigator → choices → crew → result

The party turns toward the reef. Sera tears the safe half from her chart and presses it into the youngest deckhand’s coat. Three people come through the gate coughing seawater. That evening they teach the guild a song with no final verse. Sera promises to write when she has drawn the missing coast again.

### narrative.js:44

**Context:** storyMissions → navigator → choices → chart → label

Preserve the complete chart

### narrative.js:46

**Context:** storyMissions → navigator → choices → chart → preview

Recover survey knowledge for the final containment method and 25 extra gold. The deckhands take shelter on the reef; Sera stays to reach them.

### narrative.js:52

**Context:** storyMissions → navigator → choices → chart → result

The party saves the chart from the rain. Sera watches the reef until her knuckles turn white. “Now use it,” she says. “Do not make this a framed map of people you left behind.” She stays with a lantern. A later letter confirms that the deckhands survived, but their route home will be longer.

### narrative.js:58

**Context:** storyMissions → orchard → name

The orchard that remembers winter

### narrative.js:66

**Context:** storyMissions → orchard → desc

The archive identifies a greenhouse taken from the village of Alder. The village has harvested frost ever since. Its keeper offers the anchor if you help decide what should return with it.

### narrative.js:68

**Context:** storyMissions → orchard → checks → label

Tracking finds paths through the displaced roots

### narrative.js:69

**Context:** storyMissions → orchard → checks → label

Endurance 10 withstands the cold pollen

### narrative.js:73

**Context:** storyMissions → orchard → arrival

Alder’s apple trees are covered in frost despite the summer heat. The guild’s old greenhouse drew warmth through a root network under the village. When its anchor was cut, that network began drawing heat without returning it.
Keeper Edda has grown a seed bank that could give the village ordinary seasons again. Its root lattice can also become a medicine garden within the house. Splitting it will kill both halves.
“The room can go,” she says. “We learned to live without it. The roots are another matter.”

### narrative.js:77

**Context:** storyMissions → orchard → choices → return → label

Leave the seed bank with Alder

### narrative.js:79

**Context:** storyMissions → orchard → choices → return → preview

Alder becomes an ally. Reclaimed greenhouse can become a hospice. Opens the neighbour-based final method.

### narrative.js:84

**Context:** storyMissions → orchard → choices → return → result

Edda places the first root beneath the village’s old apple tree. The frost peels from its bark. The returned greenhouse is mostly empty; the villagers fill its shelves with donated cuttings, and leave space for beds. A missing room becomes a place that can receive people, rather than take things.

### narrative.js:88

**Context:** storyMissions → orchard → choices → study → label

Bring the root lattice to the house

### narrative.js:90

**Context:** storyMissions → orchard → choices → study → preview

Reclaimed greenhouse can become a botanical laboratory. Gain containment knowledge; Alder receives payment and a written promise of cuttings.

### narrative.js:96

**Context:** storyMissions → orchard → choices → study → result

Edda accepts a payment but makes Rowan sign the promise personally. The lattice settles into the returned room and lights its glass from beneath. Ivo sees a way to grow living seals. A place in Alder stays cold. The promise is entered in the guild’s public ledger where nobody can quietly erase it.

### narrative.js:102

**Context:** storyMissions → lens → name

A light above the salt cliff

### narrative.js:110

**Context:** storyMissions → lens → desc

The observatory’s lens lies in a watchtower maintained by a former guild lookout. Its last light might reveal the threshold’s surviving connections.

### narrative.js:112

**Context:** storyMissions → lens → checks → label

Strength 11 secures the falling counterweight

### narrative.js:113

**Context:** storyMissions → lens → checks → label

Intellect 10 aligns the tower safely

### narrative.js:117

**Context:** storyMissions → lens → arrival

The tower’s beacon still sweeps a sea it can no longer reach. Its keeper, Elian, has counted every sweep since the house vanished. He was the lookout who rang the last alarm.
“There were two orders,” he says. “Open the road. Then burn the road. I rang for both.”
The lens can be removed, but the tower will go dark. Elian asks whether his testimony should travel with it. The harbour below has spent thirty years blaming him for ships that never returned.

### narrative.js:121

**Context:** storyMissions → lens → choices → witness → label

Bring Elian home to testify

### narrative.js:123

**Context:** storyMissions → lens → choices → witness → preview

Gain a witness and community trust. Observatory becomes a listening station. Bryn values an answer given in person.

### narrative.js:128

**Context:** storyMissions → lens → choices → witness → result

Elian packs no clothes. He brings the rope that rang the alarm and a list of names. At the house he sits by the entrance, correcting the spelling of each lost sailor. The lens returns the observatory; someone returns with it who can explain what it saw.

### narrative.js:132

**Context:** storyMissions → lens → choices → record → label

Carry his record; let him keep watch

### narrative.js:134

**Context:** storyMissions → lens → choices → record → preview

Gain calibrated instruments and containment knowledge. Observatory becomes a survey station. His signed account still enters the journal.

### narrative.js:139

**Context:** storyMissions → lens → choices → record → result

The party helps Elian construct an ordinary beacon before removing the lens. He signs every page of his account and stays to keep watch with a light that can finally reach the water. His instruments return to the house. His testimony is a document, not a man in a chair.

### narrative.js:145

**Context:** storyMissions → brynPast → name

The stones we leave standing

### narrative.js:155

**Context:** storyMissions → brynPast → desc

Bryn recognises her father’s mason mark in the service wall. His last job was at a guild waystation. A letter says demolition workers have found something beneath it.

### narrative.js:157

**Context:** storyMissions → brynPast → checks → label

Strength 10 supports the failing lintel

### narrative.js:158

**Context:** storyMissions → brynPast → checks → label

Guard protects the demolition crew

### narrative.js:162

**Context:** storyMissions → brynPast → arrival

Under the waystation is a row of stone names. Bryn’s father carved them for people the guild could not bring back. One name is his own, added by a different hand.
The demolition foreman can keep the chamber open long enough to recover the memorial, or divert the last supports to rescue an apprentice trapped in a neighbouring tunnel.
Bryn removes her shield. “You freed me from the stair. This is the first time I wish they were longer.”

### narrative.js:166

**Context:** storyMissions → brynPast → choices → apprentice → label

Use the supports to reach the apprentice

### narrative.js:168

**Context:** storyMissions → brynPast → choices → apprentice → preview

Bryn chooses the living over an intact memorial. Gain her trust and the Steadfast trait (+1 Endurance). Preserve the names in a rubbing.

### narrative.js:170

**Context:** storyMissions → brynPast → choices → apprentice → trait → bryn → name

Steadfast

### narrative.js:173

**Context:** storyMissions → brynPast → choices → apprentice → result

The memorial breaks while the apprentice crawls free. Bryn makes a rubbing from every recoverable piece. At home she hangs the paper beside the beds. “He did not build stones,” she says. “He built places people could leave alive.” For the first time, she calls the house ours.

### narrative.js:177

**Context:** storyMissions → brynPast → choices → memorial → label

Recover the memorial; call another rescue crew

### narrative.js:179

**Context:** storyMissions → brynPast → choices → memorial → preview

Bryn gains the Keeper of names trait (+1 Strength). The apprentice is rescued later with a lasting injury. Bryn trusts your promise, but remembers its cost.

### narrative.js:181

**Context:** storyMissions → brynPast → choices → memorial → trait → bryn → name

Keeper of names

### narrative.js:184

**Context:** storyMissions → brynPast → choices → memorial → result

The stone names come home whole. A second crew reaches the apprentice at dusk; a broken leg will never mend entirely. Bryn reads the memorial aloud once and then asks for the apprentice’s name. She adds it to the report under “what this cost”, although he is still alive.

### narrative.js:190

**Context:** storyMissions → nellPast → name

The path her grandmother hid

### narrative.js:200

**Context:** storyMissions → nellPast → desc

Sera’s chart includes a trail Nell’s grandmother taught her never to mark. It led displaced residents away from a guild customs post. Someone is using it again.

### narrative.js:202

**Context:** storyMissions → nellPast → checks → label

Tracking locates the unmarked stepping stones

### narrative.js:203

**Context:** storyMissions → nellPast → checks → label

Agility 10 crosses the ravine

### narrative.js:207

**Context:** storyMissions → nellPast → arrival

Nell finds a gate woven from travelling coats. Refugees have stitched directions into their cuffs for generations. Her grandmother did not guide explorers; she smuggled people out of places the guild had claimed.
A trader offers to purchase the route. Keeping it secret would give the new guild a valuable passage. Publishing it with protected shelters would give strangers a way home, and make Nell responsible for keeping that promise.

### narrative.js:211

**Context:** storyMissions → nellPast → choices → open → label

Publish the route with shelter keepers

### narrative.js:213

**Context:** storyMissions → nellPast → choices → open → preview

Nell becomes a Wayfinder (+1 Agility), and community escorts open. Gain trust; shelter addresses stay protected.

### narrative.js:217

**Context:** storyMissions → nellPast → choices → open → trait → nell → name

Wayfinder

### narrative.js:219

**Context:** storyMissions → nellPast → choices → open → result

Nell draws a public map of the path, but the shelter locations are given only to their keepers. “A path does not belong to whoever survives it first,” she says. Her grandmother’s name appears on the guild wall, beneath the heading “People who knew better than us”.

### narrative.js:223

**Context:** storyMissions → nellPast → choices → quiet → label

Keep a quiet guild passage

### narrative.js:225

**Context:** storyMissions → nellPast → choices → quiet → preview

Nell becomes a Keeper of paths (+1 Intellect). Opens discreet salvage work. Refugees may still use it; the guild controls who receives the map.

### narrative.js:230

**Context:** storyMissions → nellPast → choices → quiet → trait → nell → name

Keeper of paths

### narrative.js:232

**Context:** storyMissions → nellPast → choices → quiet → result

Nell burns the trader’s copy and keeps the original herself. She will guide people who ask, but no longer believes every traveller means well. “If we are keeping a secret,” she tells Rowan, “I will be one of the people deciding who it protects.”

### narrative.js:238

**Context:** storyMissions → ivoPast → name

A teacher’s last lesson

### narrative.js:248

**Context:** storyMissions → ivoPast → desc

An annotation in the archive is in Ivo’s teacher’s handwriting. Professor Ada Merrow is holding a small threshold closed at a monastery where the bells ring inward.

### narrative.js:250

**Context:** storyMissions → ivoPast → checks → label

Magical literacy reads the safe seal sequence

### narrative.js:251

**Context:** storyMissions → ivoPast → checks → label

Intellect 11 solves the reverse bell pattern

### narrative.js:255

**Context:** storyMissions → ivoPast → arrival

Ada has grown old inside a chalk circle. She was not a guild leader. She helped calculate the first joining and trusted the people who said the destination was empty.
“I called silence an absence of life,” she tells Ivo. “I was a good mathematician and a poor listener.”
Her seal can be replaced by a living lattice if the greenhouse has one. Otherwise the party can install a slower mechanical seal. Either frees her, but she asks to remain and finish the work herself.

### narrative.js:259

**Context:** storyMissions → ivoPast → choices → home → label

Replace the seal and invite Ada home

### narrative.js:261

**Context:** storyMissions → ivoPast → choices → home → preview

Ada teaches a safe containment method. Ivo becomes a Questioner (+1 Intellect). Gain his trust; the teacher must answer for her work in public.

### narrative.js:265

**Context:** storyMissions → ivoPast → choices → home → trait → ivo → name

Questioner

### narrative.js:267

**Context:** storyMissions → ivoPast → choices → home → result

Ivo waits until the replacement has held through one full night. Ada steps out of the circle without falling. At home she refuses a portrait and asks for a desk opposite the public ledger. Ivo stops calling her infallible. He starts calling her by her name.

### narrative.js:271

**Context:** storyMissions → ivoPast → choices → stay → label

Respect her choice; bring back her method

### narrative.js:273

**Context:** storyMissions → ivoPast → choices → stay → preview

Ada remains by choice with supplies and a replacement keeper. Ivo becomes an Independent scholar (+1 Endurance). Recover the same essential method without bringing her home.

### narrative.js:277

**Context:** storyMissions → ivoPast → choices → stay → trait → ivo → name

Independent scholar

### narrative.js:279

**Context:** storyMissions → ivoPast → choices → stay → result

The party leaves food, a fresh seal and a keeper trained to relieve Ada. Ivo carries her calculations home, but writes a new proof in the margin. “You can love a teacher,” he says, “without making their life your assignment.” Ada’s next letter is addressed to a colleague.

### narrative.js:285

**Context:** storyMissions → witness → name

The night they cut the road

### narrative.js:293

**Context:** storyMissions → witness → desc

The observatory locates a severed infirmary. A memory cylinder inside it recorded the last hour of the old guild. Bring back the record before its anchor fails.

### narrative.js:295

**Context:** storyMissions → witness → checks → label

Endurance 12 holds against the memory storm

### narrative.js:298

**Context:** storyMissions → witness → checks → label

Magical literacy separates the record from the voice imitating it

### narrative.js:303

**Context:** storyMissions → witness → arrival

The cylinder contains people interrupting each other. Commander Vey insists the joining can still be saved. Surgeon Halden tells her there are already voices in the walls. Elian’s alarm begins.
Then Rowan’s younger voice: “There are people on the stair.” A crash. Halden says Rowan will die before they can carry them out. He binds Rowan to the house, using a living mind as the last stabilising anchor.
“Will they be able to leave?” someone asks. Halden does not answer. Vey orders the road cut. The dangerous guest never finishes crossing.
Mara sets a packet beside the cylinder: Halden’s letters across twenty-nine years. Halden searched for Rowan, raised Mara, continued treating patients, and died before the entrance could be reached. Rowan remembers the journey they had planned together and kept postponing.
The last letter says: “I wanted you to have a life. It did not have to be a life with me.” Mara inherited the token and chose to follow the unfinished treatment. She has a life elsewhere; she has not inherited a duty to remain.
Halden’s instruction on the cylinder is clear: “Do not turn my emergency into their obligation.”

### narrative.js:307

**Context:** storyMissions → witness → choices → publish → label

Publish the record, including Rowan’s binding

### narrative.js:309

**Context:** storyMissions → witness → choices → publish → preview

The guild accepts public accountability. More neighbours will help a consent-based reconnection. Rowan’s truth is made public by Rowan’s decision.

### narrative.js:313

**Context:** storyMissions → witness → choices → publish → result

Rowan listens alone before authorising the full record. Mara posts a copy at the gate. Some visitors leave flowers; others leave bills. For once, neither is thrown away. The new guild must answer for the house it inherited, without pretending it chose every stone.

### narrative.js:317

**Context:** storyMissions → witness → choices → private → label

Publish the collapse; keep Rowan’s injury private

### narrative.js:319

**Context:** storyMissions → witness → choices → private → preview

The catastrophe remains public, but Rowan keeps control over their personal history. Gain a careful containment analysis from a limited circle of witnesses.

### narrative.js:323

**Context:** storyMissions → witness → choices → private → result

The public record includes every order that joined and severed the threshold. Rowan’s injury is shared only with those preparing the new seal. Bryn closes the journal when a visitor asks to see it. “You can owe people an answer,” she says, “without owing them every part of yourself.”

### narrative.js:329

**Context:** storyMissions → covenant → name

A hundred small doors

### narrative.js:340

**Context:** storyMissions → covenant → desc

Ask the returned shores and shelter keepers to hold the house with many small, revocable connections. The road will depend on relationships rather than one captive anchor. Materials and travel cost 90 gold.

### narrative.js:342

**Context:** storyMissions → covenant → checks → label

Endurance 11 carries the anchor posts between settlements

### narrative.js:343

**Context:** storyMissions → covenant → checks → label

Tracking reaches each keeper before the agreed tide

### narrative.js:347

**Context:** storyMissions → covenant → arrival

No ceremony can make a bargain fair by itself. Edda asks who can close a door. Sera asks what happens if a village needs its anchor back. Nell asks whether strangers will have a place at the table.
The covenant can be written as a guild charter with guaranteed visiting rights, or a commons where each connected community appoints a keeper. Both let any community withdraw its connection. Both remove Rowan from the machinery.

### narrative.js:351

**Context:** storyMissions → covenant → choices → charter → label

Write a charter for a welcoming guild

### narrative.js:353

**Context:** storyMissions → covenant → choices → charter → preview

The house remains a guild, with enforceable visiting and withdrawal rights. Residents keep the home they built. Prepare the safe threshold.

### narrative.js:357

**Context:** storyMissions → covenant → choices → charter → result

Rowan signs the charter first, leaving the space for “permanent anchor” blank. The keepers sign in their own languages. Nobody signs for an absent village. When one little door closes during the test, the others hold. The house can survive a refusal.

### narrative.js:361

**Context:** storyMissions → covenant → choices → commons → label

Let the house become a shared commons

### narrative.js:363

**Context:** storyMissions → covenant → choices → commons → preview

Communities share authority over the connections. The guild becomes one resident among several. Prepare the same safe threshold.

### narrative.js:367

**Context:** storyMissions → covenant → choices → commons → result

The table has more chairs than guild members. Mara laughs at how much longer meetings will take. The first motion is to give the house a front-door key that belongs to nobody in particular. Rowan’s name is removed from the anchor diagram and written among the residents.

### narrative.js:373

**Context:** storyMissions → lattice → name

A house that can refuse

### narrative.js:383

**Context:** storyMissions → lattice → desc

Assemble Ada’s published mechanical seal and the observatory’s independent shutoff. This route remains available even without community allies or Ivo. It costs 140 gold; research allies reduce that to 100.

### narrative.js:385

**Context:** storyMissions → lattice → checks → label

Intellect 12 verifies the independent shutoff

### narrative.js:386

**Context:** storyMissions → lattice → checks → label

Magical literacy distinguishes the guest’s false commands

### narrative.js:390

**Context:** storyMissions → lattice → arrival

The new design has no living anchor. It has several deliberately imperfect connections, each too narrow for the guest to cross. A house that cannot be opened all at once can still have a front door.
The final question is who controls the shutoff. Ivo’s notes warn against a single brilliant custodian. Ada’s published design allows either a rotating pair of guild residents or an independent council from outside the house.

### narrative.js:394

**Context:** storyMissions → lattice → choices → residents → label

Give rotating residents the paired keys

### narrative.js:396

**Context:** storyMissions → lattice → choices → residents → preview

Guild residents share responsibility; no single leader controls reconnection. Prepare a safe mechanical threshold.

### narrative.js:400

**Context:** storyMissions → lattice → choices → residents → result

Two keys are cut, and neither works alone. Rowan declines the first rotation. The house will have people who maintain it; it will not have a person who must be it. For the first test, Bryn turns one key and Mara the other. Nothing screams.

### narrative.js:404

**Context:** storyMissions → lattice → choices → outside → label

Entrust the keys to independent keepers

### narrative.js:406

**Context:** storyMissions → lattice → choices → outside → preview

Outside witnesses can stop an unsafe joining. The guild accepts oversight. Prepare the same safe mechanical threshold.

### narrative.js:410

**Context:** storyMissions → lattice → choices → outside → result

The keys leave in separate pockets. The keepers return for the test because they choose to. A shutter closes at the first imitation of Halden’s voice. Ivo writes three words beside the result: “It can refuse.” Rowan adds a fourth: “So can I.”

### narrative.js:419

**Context:** laterContracts → marsh → name

Letters across the sleeping marsh

### narrative.js:425

**Context:** laterContracts → marsh → desc

Sera’s people send letters to relatives whose villages returned in the wrong order. Deliver them without trusting the lights on the water.

### narrative.js:427

**Context:** laterContracts → marsh → checks → label

Agility 9 crosses the moving causeways

### narrative.js:428

**Context:** laterContracts → marsh → checks → label

Tracking recognises the human paths

### narrative.js:434

**Context:** laterContracts → escorts → name

Guests on the long way home

### narrative.js:441

**Context:** laterContracts → escorts → desc

Shelter keepers ask the guild to escort travellers between returned places. Some will see their homes for the first time since the severance.

### narrative.js:443

**Context:** laterContracts → escorts → checks → label

Endurance 9 carries supplies for the slowest traveller

### narrative.js:444

**Context:** laterContracts → escorts → checks → label

Guard protects the group at the narrow bridge

### narrative.js:450

**Context:** laterContracts → salvage → name

Quiet cargo, careful questions

### narrative.js:456

**Context:** laterContracts → salvage → desc

Nell’s passage can carry valuable abandoned instruments. She insists every load includes its recorded owner and a share set aside for restitution.

### narrative.js:458

**Context:** laterContracts → salvage → checks → label

Agility 11 moves fragile cargo through the ravine

### narrative.js:459

**Context:** laterContracts → salvage → checks → label

Tracking avoids the false trail

### narrative.js:465

**Context:** laterContracts → fragments → name

Survey of the wandering fragments

### narrative.js:471

**Context:** laterContracts → fragments → desc

The observatory finds small rooms caught between destinations. Map their residents and stabilise the safe ones. The guild now leaves warnings beside places it cannot save.

### narrative.js:473

**Context:** laterContracts → fragments → checks → label

Intellect 11 calibrates the portable anchor

### narrative.js:474

**Context:** laterContracts → fragments → checks → label

Magical literacy identifies the false doorway

### narrative.js:483

**Context:** rooms → library → name

RETURNED ARCHIVE

### narrative.js:491

**Context:** rooms → library → ruined

Sealed shelves; a door that reads its reader

### narrative.js:492

**Context:** rooms → library → restored

Names restored to the account

### narrative.js:495

**Context:** rooms → library → discovery → archive → title

Margins in the official account

### narrative.js:498

**Context:** rooms → library → discovery → archive → body

The guild’s official history occupies one shelf. Corrections occupy four. On a rescue list, “volunteers” has been crossed out and replaced with “passengers”. On a botanical invoice, “gift” has become “taken in lieu of debts”.
Ivo finds an older warning: “A destination may be silent because it is listening.” The warning was filed under superstition before the last expedition.
Two useful leads survive: the greenhouse taken from Alder, and the observatory lens sent to Elian’s watchtower. Before sending parties, Rowan must decide whether visitors can inspect these records directly or whether a small team should verify them first.

### narrative.js:502

**Context:** rooms → library → discovery → archive → choices → open → label

Open the records with protected names

### narrative.js:504

**Context:** rooms → library → discovery → archive → choices → open → preview

Visitors can challenge the guild’s history; vulnerable witnesses choose when to be named. Gain community trust.

### narrative.js:509

**Context:** rooms → library → discovery → archive → choices → open → result

Rowan places the records beside an empty correction book. The first visitor adds six names to a rescue list. The second asks to remove hers from a public display. Both requests are honoured. The orchard and observatory leads are copied into the expedition ledger.

### narrative.js:513

**Context:** rooms → library → discovery → archive → choices → study → label

Build a careful research archive

### narrative.js:515

**Context:** rooms → library → discovery → archive → choices → study → preview

A small team verifies accounts before publication. Gain containment knowledge; uncensored originals remain preserved.

### narrative.js:520

**Context:** rooms → library → discovery → archive → choices → study → result

Ivo creates two catalogues: what the guild claimed, and what a witness could confirm. Some pages stay unresolved. The warning about the listening destination is sent to every expedition leader. Leads to Alder’s orchard and the salt-cliff observatory are marked for investigation.

### narrative.js:527

**Context:** rooms → garden → name

RECLAIMED GREENHOUSE

### narrative.js:534

**Context:** rooms → garden → ruined

Roots from another season

### narrative.js:535

**Context:** rooms → garden → restored

A room learning what to give

### narrative.js:538

**Context:** rooms → garden → discovery → gardenUse → title

What should grow here?

### narrative.js:541

**Context:** rooms → garden → discovery → gardenUse → body

The greenhouse floor retains the outline of Edda’s orchard. Rain arrives at noon, whether there are clouds or not. New cuttings reach toward the quarters, as though people sleeping there were a source of light.
A room once devoted to collecting rare things can learn another purpose. The choice will affect who comes to the house and how the final connections can be made.

### narrative.js:545

**Context:** rooms → garden → discovery → gardenUse → choices → hospice → label

Make room for beds and ordinary medicine

### narrative.js:548

**Context:** rooms → garden → discovery → gardenUse → choices → hospice → preview

A hospice shortens future expedition injuries by one day. Alder’s keepers can help the final covenant.

### narrative.js:553

**Context:** rooms → garden → discovery → gardenUse → choices → hospice → result

The first beds are built from the old specimen cases. Edda sends common herbs instead of rarities. Bryn asks to put the memorial rubbing where a patient can read it without sitting up. The house begins to bring people home without needing them to be useful first.

### narrative.js:557

**Context:** rooms → garden → discovery → gardenUse → choices → laboratory → label

Grow a lattice that can close a threshold

### narrative.js:560

**Context:** rooms → garden → discovery → gardenUse → choices → laboratory → preview

A botanical laboratory reduces containment preparation costs. Rowan accepts the duty to share future cuttings with Alder.

### narrative.js:565

**Context:** rooms → garden → discovery → gardenUse → choices → laboratory → result

The roots grow through an empty anchor frame and close it when a false voice speaks. Ivo leaves a copy of every result for Edda. The first shipment back to Alder includes ordinary apple cuttings, with no bill attached. Research becomes a promise carried out in small deliveries.

### narrative.js:572

**Context:** rooms → observatory → name

RECONNECTED OBSERVATORY

### narrative.js:579

**Context:** rooms → observatory → ruined

A blind dome above a borrowed sky

### narrative.js:580

**Context:** rooms → observatory → restored

The sky is a map of missing rooms

### narrative.js:583

**Context:** rooms → observatory → discovery → observatoryUse → title

Lights with someone behind them

### narrative.js:586

**Context:** rooms → observatory → discovery → observatoryUse → body

Through the lens, the night is full of rooms: a kitchen turning slowly over a salt flat, an infirmary against a red dawn, a threshold chamber illuminated from the wrong side.
Rowan can feel the small anchors now. Each bright point corresponds to an anchor still connected to a room. Several have people moving inside. The infirmary’s light dims every few seconds.
The infirmary is failing. The chamber is waiting. Which question will guide the observatory?

### narrative.js:590

**Context:** rooms → observatory → discovery → observatoryUse → choices → listen → label

Ask who is still there

### narrative.js:592

**Context:** rooms → observatory → discovery → observatoryUse → choices → listen → preview

Listening station strengthens community ties. Rowan gains anchor sight; the infirmary’s final record becomes reachable.

### narrative.js:596

**Context:** rooms → observatory → discovery → observatoryUse → choices → listen → result

Elian’s recorded voice accompanies the first beacon: “If you can hear this, you can say no.” Replies arrive in knocks, bird calls and one very irritated letter. A kitchen asks to be left alone until dinner is finished. The infirmary answers with Halden’s name.

### narrative.js:600

**Context:** rooms → observatory → discovery → observatoryUse → choices → measure → label

Measure which connections are safe

### narrative.js:602

**Context:** rooms → observatory → discovery → observatoryUse → choices → measure → preview

Survey station strengthens containment knowledge. Rowan gains the same anchor sight and infirmary lead.

### narrative.js:606

**Context:** rooms → observatory → discovery → observatoryUse → choices → measure → result

The survey separates distance from strain. A room can be close and still unsafe. A room can be far and already belong to its residents. Rowan circles the failing infirmary and crosses out a route that would join it through the great threshold. There is a slower way.

### narrative.js:613

**Context:** rooms → threshold → name

THRESHOLD CHAMBER

### narrative.js:620

**Context:** rooms → threshold → ruined

The road that was deliberately cut

### narrative.js:621

**Context:** rooms → threshold → restored

A door with the right to stay closed

### narrative.js:628

**Context:** houseChoices → landingPurpose → title

The empty chair on the landing

### narrative.js:631

**Context:** houseChoices → landingPurpose → body

A chair returned with the landing. A carved name beneath the seat matches one of the people listed as missing in the landing’s register. A small brass plaque reads: “For those we promised to bring home.”
Mara wants to put the chair by the gate for visitors. Rowan recognises a guild oath carved beneath the seat. Keeping it on the landing would preserve an inscription that might help understand the old anchor work.
Mara needs a place to receive visitors. Rowan also needs somewhere to study the inscription without people walking through. The landing has room for one of those uses.

### narrative.js:635

**Context:** houseChoices → landingPurpose → choices → welcome → label

Put the chair by the gate

### narrative.js:637

**Context:** houseChoices → landingPurpose → choices → welcome → preview

The landing becomes a visitors’ room. Gain community trust and a first conversation about restitution.

### narrative.js:642

**Context:** houseChoices → landingPurpose → choices → welcome → result

The first person to sit in it is a courier who does not want a job. She wants to know whether the guild still has her brother’s name. Mara brings the correction book, and an ordinary cup of tea. The plaque remains on the chair.

### narrative.js:646

**Context:** houseChoices → landingPurpose → choices → remember → label

Keep the oath where it was written

### narrative.js:648

**Context:** houseChoices → landingPurpose → choices → remember → preview

The landing becomes a memorial and study. Gain knowledge of small-anchor work; preserve its former residents’ traces.

### narrative.js:653

**Context:** houseChoices → landingPurpose → choices → remember → result

Rowan reads the oath with the new house sight. It lists how the landing anchor was tested before each journey. Rowan copies the procedure at a desk beneath the plaque. The chair and its owner’s name remain on the landing.

### narrative.js:659

**Context:** houseChoices → release → title

A door, not a debt

### narrative.js:662

**Context:** houseChoices → release → body

The new connections hold without Rowan. Through the shutter, the Guest shows a dinner table. Halden is there, younger than Mara. The people who have died are seated beside the people who chose to leave.
“I can keep this,” it says. It learned their voices from the rooms: their arguments, habits and grief. It wants every connected place drawn into one enduring interior. It can reproduce a farewell, but cannot understand why anyone would permit a departure.
Rowan asks Halden about the years outside. The figure begins their old conversation again. Someone who wanted to leave says they have always wanted to stay. The table is beautiful. Nobody at it can change their mind.
Rowan closes the shutter. Halden lived those years, raised Mara, and died. That life cannot be replaced by the house’s memory of it. The Guest has not been defeated everywhere; it has been denied a road through this house.
The binding can now be removed safely. Mara lays the inherited token on the table. “I have to go home tonight,” she says. “You can come with me. Or choose somewhere else.”

### narrative.js:666

**Context:** houseChoices → release → choices → home → label

Keep the house as a home with open visiting roads

### narrative.js:668

**Context:** houseChoices → release → choices → home → preview

Preserve the rooms and the agreements you made. Rowan may leave and return by choice. Walk left through the entrance gate to complete the campaign.

### narrative.js:671

**Context:** houseChoices → release → choices → home → result

Rowan’s name lifts from the anchor diagram. The returned rooms remain connected by their new agreements. A place that once kept them alive by keeping them captive becomes a home they can leave. The gate is open. The final step is yours.

### narrative.js:675

**Context:** houseChoices → release → choices → return → label

Begin returning the borrowed rooms to their shores

### narrative.js:677

**Context:** houseChoices → release → choices → return → preview

The guild will share its work with the communities those rooms came from. Residents prepare new homes by consent. Walk left through the gate to finish.

### narrative.js:680

**Context:** houseChoices → release → choices → return → result

The returned rooms will not vanish tonight. Their keepers set dates, pack records and decide which connections to keep. Rowan’s binding is removed now, without waiting for the work to end. Some good things take a long time. Freedom is no longer one of them. The gate is open.

### narrative.js:693

**Context:** conversations → brynStart → title

The latch on Bryn’s shield

### narrative.js:694

**Context:** conversations → brynStart → body

Bryn is tightening the iron straps on her shield. There is still a latch on its edge.
“It was the workshop door,” she says. “Father fitted it. When the landlord cleared the place, it was the one thing too awkward to take away.”
She tests the straps with her full weight.
“I’m not asking you to find him. I need paid work. But if his name turns up in those old records, tell me.”

### narrative.js:698

**Context:** conversations → brynStart → choices → honest → label

“I’ll tell you what I find. I can’t promise more than that.”

### narrative.js:699

**Context:** conversations → brynStart → choices → honest → preview

Agree to share any evidence about her father. +1 trust.

### narrative.js:702

**Context:** conversations → brynStart → choices → honest → result

Bryn nods and goes back to the strap. “That’ll do.” She shows Rowan the small chisel mark beside the latch so they will recognise her father’s work.

### narrative.js:706

**Context:** conversations → brynStart → choices → purpose → label

“Help me repair the quarters. We’ll search the records after.”

### narrative.js:707

**Context:** conversations → brynStart → choices → purpose → preview

Give Bryn a practical first job. +1 trust.

### narrative.js:710

**Context:** conversations → brynStart → choices → purpose → result

Bryn finds a length of string and measures the beds. Two legs need replacing. She puts the shield beside the workbench and asks Mara where the spare timber is.

### narrative.js:719

**Context:** conversations → nellStart → title

Nell checks the entrance road

### narrative.js:720

**Context:** conversations → nellStart → body

Nell brings back a muddy sketch of the road. One bridge has shifted since yesterday.
“This bend leads to your gate if I’m carrying the token. Without it, I end up at the lime quarry.”
She has crossed out a shortcut. Rowan asks why.
“My grandmother used it. She wouldn’t take guild officers that way. I was twelve; I thought she just disliked their horses.”
Nell rolls the map up. “I can get your parties out. I’d like to know I can get them back.”

### narrative.js:724

**Context:** conversations → nellStart → choices → invite → label

“Ask the local keepers which bridges they’re using.”

### narrative.js:726

**Context:** conversations → nellStart → choices → invite → preview

Nell checks the route with people living nearby. +1 trust and community confidence.

### narrative.js:730

**Context:** conversations → nellStart → choices → invite → result

Nell visits the mill and the ferry cottage. She returns with two corrected crossings and the ferryman’s price. She marks where a tired party can stop before the last hill.

### narrative.js:734

**Context:** conversations → nellStart → choices → learn → label

“Survey it yourself. Mark anything that has moved.”

### narrative.js:735

**Context:** conversations → nellStart → choices → learn → preview

Nell makes a measured route survey. +1 trust and research knowledge.

### narrative.js:739

**Context:** conversations → nellStart → choices → learn → result

Nell drives numbered stakes along the shifting road. Her second sketch records distances as well as turns. She keeps the first so tomorrow’s changes can be compared.

### narrative.js:748

**Context:** conversations → ivoStart → title

Ivo’s missing teacher

### narrative.js:749

**Context:** conversations → ivoStart → body

Ivo spreads three letters on the table. They are all from Professor Ada Merrow. The last ends halfway through a calculation.
“She stopped writing after she came here,” he says. “The college says she resigned. The letter doesn’t sound like a resignation.”
He asks whether he can examine Rowan’s binding. He thinks the symbols on the wall may be part of the same calculation.
“I would start with a tracing. No spellwork. I need to know whether the walls change when you move.”

### narrative.js:753

**Context:** conversations → ivoStart → choices → consent → label

“Explain each test first. Then I’ll decide.”

### narrative.js:754

**Context:** conversations → ivoStart → choices → consent → preview

Allow carefully explained tests of the binding. +1 trust.

### narrative.js:757

**Context:** conversations → ivoStart → choices → consent → result

Ivo describes the tracing procedure and its risks before unpacking the ink. Rowan agrees to the first measurement. He writes the result beside Ada’s unfinished calculation.

### narrative.js:761

**Context:** conversations → ivoStart → choices → house → label

“Start with the wall inscriptions. Leave my binding alone.”

### narrative.js:762

**Context:** conversations → ivoStart → choices → house → preview

Ivo investigates the house’s records first. +1 trust.

### narrative.js:765

**Context:** conversations → ivoStart → choices → house → result

Ivo moves his equipment to the corridor. He makes three copies of the inscription and finds a repeated symbol also used in Ada’s letter. He leaves Rowan’s part of the diagram blank.

### narrative.js:773

**Context:** conversations → brynAnchor → title

Her father’s mason mark

### narrative.js:774

**Context:** conversations → brynAnchor → body

Bryn has scraped a patch of plaster from the service-room wall. Under it is the chisel mark she showed Rowan.
“My father cut this. Same slip on the bottom stroke.”
She remembers his last letter: a repair job at a guild waystation, two weeks’ wages, home before winter. He never returned.
A demolition notice in the old papers gives the waystation’s location. Bryn puts her finger on it. “I want to go there.”

### narrative.js:778

**Context:** conversations → brynAnchor → choices → promise → label

“We’ll put a party together. You’re going with them.”

### narrative.js:780

**Context:** conversations → brynAnchor → choices → promise → preview

Support Bryn’s search. Her expedition requires two completed contracts. +1 trust.

### narrative.js:783

**Context:** conversations → brynAnchor → choices → promise → result

Bryn copies the waystation’s location into the contract book. She asks Mara for rope, lamps and someone who can recognise a failing roof.

### narrative.js:787

**Context:** conversations → brynAnchor → choices → choice → label

“Check the notice with the demolition crew before we set out.”

### narrative.js:788

**Context:** conversations → brynAnchor → choices → choice → preview

Support the same search with advance enquiries. +1 trust.

### narrative.js:791

**Context:** conversations → brynAnchor → choices → choice → result

Bryn writes to the demolition foreman. His reply confirms a sealed chamber beneath the waystation. He will leave its door alone until the guild party arrives.

### narrative.js:799

**Context:** conversations → nellShore → title

The coats beside the trail

### narrative.js:800

**Context:** conversations → nellShore → body

Nell points out a line on Sera’s chart. “That’s Grandmother’s path. She told me never to put it on a guild map.”
She remembers coats hanging from trees: a blue sleeve at a fork, two grey cuffs at a crossing. She thought people had lost their washing.
“They were directions. She was taking families around the customs post.”
There is a fresh shelter mark at the end of the chart. Nell wants to know who is still using the route.

### narrative.js:804

**Context:** conversations → nellShore → choices → lead → label

“Take a party and check the shelters.”

### narrative.js:805

**Context:** conversations → nellShore → choices → lead → preview

Prepare Nell’s personal search. +1 trust.

### narrative.js:808

**Context:** conversations → nellShore → choices → lead → result

Nell makes a route card for the party and a second copy for Mara. If they do not return, Mara will know where to send help.

### narrative.js:812

**Context:** conversations → nellShore → choices → ask → label

“Send word to the shelter keepers before we arrive.”

### narrative.js:813

**Context:** conversations → nellShore → choices → ask → preview

Prepare the search with the keepers’ help. +1 trust and community confidence.

### narrative.js:817

**Context:** conversations → nellShore → choices → ask → result

Nell sends the message through the ferryman rather than the old guild post. A shelter keeper replies with a safe meeting place and asks the party to bring lamp oil.

### narrative.js:825

**Context:** conversations → ivoArchive → title

Ada’s note in the archive

### narrative.js:826

**Context:** conversations → ivoArchive → body

Ivo has found Ada’s handwriting in an expedition margin. A witness reported voices from an unoccupied doorway. Ada wrote “No corroborating evidence” and allowed the joining test to continue.
“She taught me to check every assumption,” he says. “She didn’t check this one.”
A later supply record sends food to Ada at a monastery. It is the first evidence that she survived. Ivo asks to follow it.

### narrative.js:830

**Context:** conversations → ivoArchive → choices → human → label

“Find her. Ask why she dismissed the warning.”

### narrative.js:831

**Context:** conversations → ivoArchive → choices → human → preview

Support Ivo’s search for his teacher. +1 trust.

### narrative.js:834

**Context:** conversations → ivoArchive → choices → human → result

Ivo copies the supply address. His letter asks Ada about the witness, the test and what happened afterward. He does not know whether she will reply.

### narrative.js:838

**Context:** conversations → ivoArchive → choices → rigour → label

“Take copies of both records. Check her account against them.”

### narrative.js:840

**Context:** conversations → ivoArchive → choices → rigour → preview

Prepare the same search with documentary evidence. +1 trust and research knowledge.

### narrative.js:844

**Context:** conversations → ivoArchive → choices → rigour → result

Ivo packs the witness statement beside Ada’s note. He adds blank pages for her answer and asks another resident to check the dates.

### narrative.js:852

**Context:** conversations → brynAfter → title

After the waystation

### narrative.js:853

**Context:** conversations → brynAfter → body

Bryn has her father’s name in front of her: a rubbing or a piece of stone, depending on what the party brought back.
“I’ve spent years thinking he might turn up,” she says. “Now I keep looking at the gate anyway.”
She rubs the latch on her shield with her thumb. “I’ll finish the repairs I took on. After that I need to decide what work I actually want.”
She asks Rowan what they would do if they could leave tomorrow.

### narrative.js:857

**Context:** conversations → brynAfter → choices → ordinary → label

“Walk into town. Buy breakfast somewhere else.”

### narrative.js:858

**Context:** conversations → brynAfter → choices → ordinary → preview

Share an ordinary plan with Bryn. +1 trust.

### narrative.js:861

**Context:** conversations → brynAfter → choices → ordinary → result

Bryn recommends a bakery by the bridge. She draws its sign on a scrap of timber so Rowan will recognise it.

### narrative.js:865

**Context:** conversations → brynAfter → choices → return → label

“Spend a night away. See whether I miss this place.”

### narrative.js:866

**Context:** conversations → brynAfter → choices → return → preview

Tell Bryn what leaving would mean to Rowan. +1 trust.

### narrative.js:869

**Context:** conversations → brynAfter → choices → return → result

Bryn checks the latch on Rowan’s bedroom door. “You won’t lose the room for going away,” she says. She leaves the key on the table.

### narrative.js:877

**Context:** conversations → nellAfter → title

A route for Rowan

### narrative.js:878

**Context:** conversations → nellAfter → body

Nell brings Rowan a small map. It begins at the gate and ends at the next market town. She has marked the difficult bridge and a decent place to stay.
“No guild jobs on this one,” she says. “Just a road.”
She offers to walk the first stretch when Rowan is able to leave. She knows the road changes, and she would rather check it in person.

### narrative.js:882

**Context:** conversations → nellAfter → choices → together → label

“Walk with me until the road turns.”

### narrative.js:883

**Context:** conversations → nellAfter → choices → together → preview

Invite Nell to accompany Rowan’s first steps. +1 trust.

### narrative.js:887

**Context:** conversations → nellAfter → choices → together → result

Nell puts the map in Rowan’s coat pocket. She will bring a second copy and enough food for the morning.

### narrative.js:891

**Context:** conversations → nellAfter → choices → alone → label

“I want to try the first stretch alone. Meet me in town.”

### narrative.js:892

**Context:** conversations → nellAfter → choices → alone → preview

Arrange to meet Nell after Rowan leaves. +1 trust.

### narrative.js:895

**Context:** conversations → nellAfter → choices → alone → result

Nell circles the inn beside the market. She explains how to recognise the bridge if it shifts before they meet.

### narrative.js:903

**Context:** conversations → ivoAfter → title

Testing the replacement seal

### narrative.js:904

**Context:** conversations → ivoAfter → body

Ivo lays out the design brought back from the monastery. Its anchor frame is mechanical; nobody has to be bound into it.
He has underlined three failure cases. “If these two links break together, the whole frame can open. I haven’t solved that yet.”
He looks tired, but he has stopped hiding the rough calculations beneath his clean copy. He asks Rowan how to check the remaining risk.

### narrative.js:908

**Context:** conversations → ivoAfter → choices → test → label

“Build a small frame and deliberately break the links.”

### narrative.js:909

**Context:** conversations → ivoAfter → choices → test → preview

Test the failure cases at a safe scale. +1 trust and research knowledge.

### narrative.js:913

**Context:** conversations → ivoAfter → choices → test → result

Ivo constructs a table-sized frame. It fails on the second test. He writes down exactly how, then adds a separate shutoff before trying again.

### narrative.js:917

**Context:** conversations → ivoAfter → choices → share → label

“Send copies to the outside keepers. Ask them to check it.”

### narrative.js:918

**Context:** conversations → ivoAfter → choices → share → preview

Have independent readers review the design. +1 trust and community confidence.

### narrative.js:922

**Context:** conversations → ivoAfter → choices → share → result

Ivo sends the failure list with the drawings. A reply identifies a timing error in the shutoff. He corrects it and credits the keeper beside the calculation.

### narrative.js:930

**Context:** conversations → brynTruth → title

Repairing the rear stair

### narrative.js:931

**Context:** conversations → brynTruth → body

Bryn has listened to Halden’s recording. She goes to the rear stair and stays there long enough for Mara to check on her.
“You went back for the people on it,” she tells Rowan. “I can see where the first support broke.”
She can repair the stair. She cannot tell Rowan what it was like to be carried out of it. She asks whether Rowan wants to discuss the work now or come back another day.

### narrative.js:935

**Context:** conversations → brynTruth → choices → future → label

“Show me what needs replacing.”

### narrative.js:936

**Context:** conversations → brynTruth → choices → future → preview

Work through the repairs with Bryn. +1 trust.

### narrative.js:939

**Context:** conversations → brynTruth → choices → future → result

Bryn marks each damaged joint. Rowan holds the lamp while she measures. They stop when the oil runs low.

### narrative.js:943

**Context:** conversations → brynTruth → choices → space → label

“Another day. Sit with me for a while.”

### narrative.js:944

**Context:** conversations → brynTruth → choices → space → preview

Defer the repair discussion. +1 trust.

### narrative.js:947

**Context:** conversations → brynTruth → choices → space → result

Bryn puts the measuring string away. They sit on the dry landing until Mara brings the evening meal.

### narrative.js:955

**Context:** conversations → nellTruth → title

The map beyond the boundary

### narrative.js:956

**Context:** conversations → nellTruth → body

Nell leaves a map of the valley on Rowan’s table. The house is marked with an ordinary building symbol.
“I can plan the journey,” she says. “I can’t tell you when you’ll be ready for it.”
She offers to check the bridges while the replacement anchors are being prepared. She asks whether Rowan wants the details now.

### narrative.js:960

**Context:** conversations → nellTruth → choices → future → label

“Show me the route. Let’s plan it.”

### narrative.js:961

**Context:** conversations → nellTruth → choices → future → preview

Plan a journey outside with Nell. +1 trust.

### narrative.js:964

**Context:** conversations → nellTruth → choices → future → result

Nell explains the two usable crossings and the ferryman’s hours. Rowan chooses which route to try first.

### narrative.js:968

**Context:** conversations → nellTruth → choices → space → label

“Leave the map. I’ll look at it later.”

### narrative.js:969

**Context:** conversations → nellTruth → choices → space → preview

Keep the route available without planning today. +1 trust.

### narrative.js:972

**Context:** conversations → nellTruth → choices → space → result

Nell leaves the map and a pencil. She will survey the crossings again before Rowan needs them.

### narrative.js:980

**Context:** conversations → ivoTruth → title

Removing Rowan from the diagram

### narrative.js:981

**Context:** conversations → ivoTruth → body

Ivo has compared Halden’s emergency binding with the replacement design. He points to the place where Rowan’s mind is used to correct the house’s unstable links.
“The frame has to take over all of this before we disconnect you. Not most of it. All.”
He lists the tests still needed. He asks whether Rowan wants to go through them now.

### narrative.js:985

**Context:** conversations → ivoTruth → choices → future → label

“Go through the tests with me.”

### narrative.js:986

**Context:** conversations → ivoTruth → choices → future → preview

Review the replacement plan with Ivo. +1 trust.

### narrative.js:989

**Context:** conversations → ivoTruth → choices → future → result

Ivo explains each test in order. Rowan asks him to repeat the shutoff procedure. He rewrites that section so a resident without magical training can use it.

### narrative.js:993

**Context:** conversations → ivoTruth → choices → space → label

“Tomorrow. I’ve heard enough for today.”

### narrative.js:994

**Context:** conversations → ivoTruth → choices → space → preview

Defer the technical discussion. +1 trust.

### narrative.js:997

**Context:** conversations → ivoTruth → choices → space → result

Ivo closes the diagram and leaves the test list on the table. He takes the apparatus back to the workroom.

### narrative.js:1013

**Context:** Interface / runtime text

Start

### narrative.js:1013

**Context:** Interface / runtime text

Resolved

### narrative.js:1014

**Context:** Interface / runtime text

Resolved

## resident-discoveries.js

### resident-discoveries.js:9

**Context:** first → bryn → condition

Caught beneath a stasis-bound door

### resident-discoveries.js:10

**Context:** first → bryn → method

Lift the loose latch

### resident-discoveries.js:12

**Context:** first → bryn → story

The workshop door stands across a woman’s shoulder. Dust hangs motionless around its latch. Rowan lifts the latch and the ward releases. Bryn catches the door before it falls. Her father made it; she was carrying it to brace the stair when the evacuation spell stopped her. She recognises the guild mark and asks whether her father got out. The door will become her shield.

### resident-discoveries.js:19

**Context:** first → nell → condition

Hidden inside a folded corridor

### resident-discoveries.js:20

**Context:** first → nell → method

Unfold the chalk route

### resident-discoveries.js:22

**Context:** first → nell → story

A chalk line beneath a quarters curtain doubles back into itself. Rowan rubs out its final turn. Nell steps through carrying a guide’s satchel. She was the old guild’s local pathfinder; she hid families from its customs patrol and became caught in the escape route she folded behind them. The shelter addresses in her satchel begin her own search.

### resident-discoveries.js:29

**Context:** first → ivo → condition

Held inside an unfinished protective rune

### resident-discoveries.js:30

**Context:** first → ivo → method

Close the open line in Ada’s diagram

### resident-discoveries.js:32

**Context:** first → ivo → story

Ada’s apprentice is suspended above an open notebook. His own protective rune kept the falling shelves away but never received its finishing stroke. A diagram in the margin shows where to close it. Ivo lands with the book in his hands. He remembers Rowan cataloguing these rooms and asks where Professor Merrow went. The answer lies in the archive.

### resident-discoveries.js:37

**Context:** traps

Held in a reversed-water ward

### resident-discoveries.js:38

**Context:** traps

Turn the disconnected hand valve

### resident-discoveries.js:39

**Context:** traps

Their drainage ward stopped the disaster at this room’s door, but held its keeper in the same unfinished moment.

### resident-discoveries.js:42

**Context:** traps

Caught in a cooling circle

### resident-discoveries.js:43

**Context:** traps

Break the chalk circuit with its wooden switch

### resident-discoveries.js:44

**Context:** traps

The old guild’s fire crew sealed this room before the furnace spread. The protective circle never released its occupants.

### resident-discoveries.js:47

**Context:** traps

Caught behind a reflected doorway

### resident-discoveries.js:48

**Context:** traps

Cover the spare mirror with its cloth

### resident-discoveries.js:49

**Context:** traps

The coast watch tried to close a false road. Their own reflection kept calling them back into the room.

### resident-discoveries.js:52

**Context:** traps

Sleeping inside a root cradle

### resident-discoveries.js:53

**Context:** traps

Open the labelled pruning latch

### resident-discoveries.js:54

**Context:** traps

The guild’s growers used a living shelter to protect this room. Its roots held the occupants after the evacuation ended.

### resident-discoveries.js:57

**Context:** traps

Preserved in a snow ward

### resident-discoveries.js:58

**Context:** traps

Turn the thaw lever shown on the wall

### resident-discoveries.js:59

**Context:** traps

The weather crew stopped the collapsing roof with a freezing ward. The ward preserved them alongside the ice.

### resident-discoveries.js:62

**Context:** traps

Held by the emergency clock

### resident-discoveries.js:63

**Context:** traps

Release the local pendulum brake

### resident-discoveries.js:64

**Context:** traps

The guild’s court staff were held by a clock that refused to let the emergency hour finish.

### resident-discoveries.js:67

**Context:** traps

Suspended inside a pressure seal

### resident-discoveries.js:68

**Context:** traps

Open the isolated pressure release

### resident-discoveries.js:69

**Context:** traps

The guild’s divers sealed the borrowed room against the sea. Their safety spell trapped them inside its pressure boundary.

### resident-discoveries.js:72

**Context:** traps

Lost inside a signal echo

### resident-discoveries.js:73

**Context:** traps

Disconnect the local echo receiver

### resident-discoveries.js:74

**Context:** traps

The roadkeepers brought this room into the house during the evacuation. Its broken receiver kept repeating their final signal.

### resident-discoveries.js:81

**Context:** residentDiscoveries → room

Room

### resident-discoveries.js:91

**Context:** residentDiscoveries → story

⟦c.name⟧ wears the old guild’s ⟦c.type === 'mage' ? 'spellkeeper' : c.type === 'warrior' ? 'watch' : 'pathfinder'⟧ insignia. ⟦trap[2]⟧ The explorer follows the surviving diagram and releases the ward. ⟦c.name⟧ remembers working here before the severance. They search the belongings left in the room for a letter from home.

**Source template:**

```text
⟦c.name⟧ wears the old guild’s ⟦c.type === 'mage' ? 'spellkeeper' : c.type === 'warrior' ? 'watch' : 'pathfinder'⟧ insignia. ⟦trap[2]⟧ The explorer follows the surviving diagram and releases the ward. ⟦c.name⟧ remembers working here before the severance. They search the belongings left in the room for a letter from home.
```

### resident-discoveries.js:91

**Context:** residentDiscoveries → story

mage

### resident-discoveries.js:91

**Context:** residentDiscoveries → story

spellkeeper

### resident-discoveries.js:91

**Context:** residentDiscoveries → story

warrior

### resident-discoveries.js:91

**Context:** residentDiscoveries → story

watch

### resident-discoveries.js:91

**Context:** residentDiscoveries → story

pathfinder

## homecoming.js

### homecoming.js:9

**Context:** rowanPages → service

My first wage bought a coat and a second bowl. Halden asked who the bowl was for. I said visitors. They put it beside mine without asking again.

### homecoming.js:11

**Context:** rowanPages → quarters

There is a place for me at dinner even when I am late. I have begun saying home when I mean this building. Halden keeps a list of places we could go without a contract. I keep asking for one more month.

### homecoming.js:13

**Context:** rowanPages → library

I entered a kitchen as Provisioning Room Four. The owner asked me to keep her mother’s name on the door. I said the catalogue needed consistent names. I remember being pleased with how professional I sounded.

### homecoming.js:15

**Context:** rowanPages → garden

The greenhouse arrived with a child’s height marks on its frame. The acquisition form said debt settlement. I copied it. There was a letter beneath the seed trays asking when it would come back. I did not put the letter in the catalogue.

### homecoming.js:17

**Context:** rowanPages → observatory

Vey told us about the child a healer could not reach before the pass closed. The first doors saved people. When a village refused a connection, Vey called it an obstacle. I wanted those two things to remain the same story.

### homecoming.js:19

**Context:** rowanPages → threshold

Halden packed the list of places into my coat. We argued because I had volunteered for another departure. They said they wanted a life with me, and that could include days when nobody needed either of us. I promised to talk after the watch.

### homecoming.js:23

**Context:** dungeonPages → sluice

A drain worker

### homecoming.js:24

**Context:** dungeonPages → sluice

They called it a service passage. We carried prisoners through it so visitors would never see them. My son asked why my boots smelled of the cells. I told him it was honest work.

### homecoming.js:27

**Context:** dungeonPages → cells

A detained kitchen owner

### homecoming.js:28

**Context:** dungeonPages → cells

I signed for a winter connection, not for the kitchen to be taken forever. The clerk called it Provisioning Room Four. My mother painted the door. Her name was Anwen.

### homecoming.js:31

**Context:** dungeonPages → ratway

A missing drain worker

### homecoming.js:32

**Context:** dungeonPages → ratway

I have left my good tools here. If I do not return, take the blue-handled awl to my daughter. She knows the handle is loose; she made it.

### homecoming.js:35

**Context:** dungeonPages → crypt

The burial keeper

### homecoming.js:36

**Context:** dungeonPages → crypt

I was ordered to remove the disputed names. A blank stone could not contradict a report. I hid the register because I could not bear to make their families search twice.

### homecoming.js:39

**Context:** dungeonPages → ossuary

Halden

### homecoming.js:40

**Context:** dungeonPages → ossuary

A body consenting to burial has not consented to another life. Ask before the rite. Write down the answer. A grieving friend cannot give it for them.

### homecoming.js:43

**Context:** dungeonPages → maze

Ysra

### homecoming.js:44

**Context:** dungeonPages → maze

I drew a clean line through three occupied houses. The survey asked where a door could go, not who would lose a room. I ought to have drawn the people.

### homecoming.js:47

**Context:** dungeonPages → oubliette

A captive

### homecoming.js:48

**Context:** dungeonPages → oubliette

There is no door, but there is a bucket. I tell the keeper my name each morning. If this page reaches anyone, tell my sister I did not leave without saying goodbye.

### homecoming.js:51

**Context:** dungeonPages → vault

Rowan

### homecoming.js:52

**Context:** dungeonPages → vault

I stamped the salvage inventory. The owner’s address was still attached. I thought returning it was someone else’s task. That was how every task became nobody’s.

### homecoming.js:55

**Context:** dungeonPages → fungus

The prison alchemist

### homecoming.js:56

**Context:** dungeonPages → fungus

The beds make the water drinkable. They cannot make the cells just. I kept answering the question I knew how to solve.

### homecoming.js:59

**Context:** dungeonPages → rift

Halden

### homecoming.js:60

**Context:** dungeonPages → rift

Year seven. Another road ended at water. I came home to Mara’s first attempt at bread. We ate it anyway. Rowan, I have not stopped looking. I am also living. I hope you will forgive neither of those things; they need no forgiveness.

### homecoming.js:63

**Context:** dungeonPages → study

Ada’s apprentice

### homecoming.js:64

**Context:** dungeonPages → study

The warning was repeatable. Professor Merrow said repetition did not prove a listener. I wrote down the failures here after she asked for the public copy to be shortened.

### homecoming.js:67

**Context:** dungeonPages → potions

Halden

### homecoming.js:68

**Context:** dungeonPages → potions

Year fourteen. My hand shakes now. Mara has learned the stitches I can no longer make neatly. I have left the treatment diagrams with her. She must be allowed to choose what to do with them.

### homecoming.js:71

**Context:** dungeonPages → mirror

Rowan

### homecoming.js:72

**Context:** dungeonPages → mirror

Halden laughed in the kitchen this afternoon. The wall repeated the laugh after they left. I laughed back before I understood.

### homecoming.js:75

**Context:** dungeonPages → summoning

Vey

### homecoming.js:76

**Context:** dungeonPages → summoning

When help could not cross the pass, we buried a child. I built the first road so it would not happen again. Today I called a mother selfish for refusing us her doorway. I wrote the stop order. I should have listened before it needed writing.

### homecoming.js:79

**Context:** dungeonPages → menagerie

A keeper

### homecoming.js:80

**Context:** dungeonPages → menagerie

The little mooncat waits beside the wrong door at dusk. Its feeding card calls it specimen eleven. The fisher who brought it called it her husband’s companion.

### homecoming.js:83

**Context:** dungeonPages → orrery

Rowan

### homecoming.js:84

**Context:** dungeonPages → orrery

Every light is a household. I used to see destinations. The machine does not know whether anyone there has said yes. We do.

### homecoming.js:87

**Context:** dungeonPages → storm

Oren

### homecoming.js:88

**Context:** dungeonPages → storm

If I stop holding the beam, they will fall. That is true tonight. I am frightened of how easily I believe it on every other night.

### homecoming.js:91

**Context:** dungeonPages → stars

Halden

### homecoming.js:92

**Context:** dungeonPages → stars

Year twenty-nine. Mara, the token is yours, not an instruction. Rowan, I wanted you to have a life. It did not have to be a life with me. There are places left on our list. You may also choose somewhere I never knew.

### homecoming.js:99

**Context:** journeys → bryn → home

the rebuilt waystation

### homecoming.js:101

**Context:** journeys → bryn → record

I thought finding Father would tell me where to go next. His name is on the stone. The apprentice is still here. I want to build a workshop where someone can learn without inheriting a debt.

### homecoming.js:103

**Context:** journeys → bryn → farewell

Bryn takes her shield and leaves to build the waystation workshop. She promises letters, not a term of service.

### homecoming.js:108

**Context:** journeys → nell → home

the shelter roads

### homecoming.js:110

**Context:** journeys → nell → record

Grandmother kept the addresses private because people needed somewhere safe, not because she wanted them to belong to her. I want to work those roads again. Rowan can come as a traveller.

### homecoming.js:112

**Context:** journeys → nell → farewell

Nell returns to the shelter keepers. She leaves Rowan a map with room for another route.

### homecoming.js:117

**Context:** journeys → ivo → home

an independent school beside Ada’s monastery

### homecoming.js:119

**Context:** journeys → ivo → record

I used to want Ada to say I was right. Now I want students who can tell me I am wrong. I have asked the monastery for a room. The first lesson will be how to refuse an experiment.

### homecoming.js:121

**Context:** journeys → ivo → farewell

Ivo leaves to establish the school. His calculations remain available to the guild; his life is his own.

### homecoming.js:126

**Context:** journeys → oren → home

his daughter’s riverside workshop

### homecoming.js:128

**Context:** journeys → oren → record

Mara found my daughter. She is older than I am. She does not need the father I remember being. She asked if I would like to learn the work she does now. I do not know how to arrive without offering to repair something.

### homecoming.js:130

**Context:** journeys → oren → farewell

Oren goes to his daughter. Before leaving, he lets the empty commemorative arch be dismantled. Nobody is beneath it. Its stone becomes steps in the garden.

### homecoming.js:135

**Context:** journeys → maelin → home

the watchkeepers’ coastal memorial

### homecoming.js:137

**Context:** journeys → maelin → record

The names include people who lived twenty years after the evacuation. I saved time for them, not a promise of happiness. Their families have invited me to the coast. Tonight I rang the bell for dinner. Everyone came because they wanted to.

### homecoming.js:139

**Context:** journeys → maelin → farewell

Maelin leaves to meet the watchkeepers’ families and decide where to live. The guild keeps an ordinary, hand-rung dinner bell.

### homecoming.js:144

**Context:** journeys → ysra → home

the community displaced by her survey

### homecoming.js:146

**Context:** journeys → ysra → record

My old map was used to move families. Their children have asked me to come and listen before drawing anything. I will leave private places blank. A map can be useful without claiming to contain everyone.

### homecoming.js:148

**Context:** journeys → ysra → farewell

Ysra leaves with an unfinished map. She has agreed to listen to the displaced families before deciding what to draw.

### homecoming.js:155

**Context:** regionalLives

the fen relief camp

### homecoming.js:156

**Context:** regionalLives

I measured the rising water because a number seemed easier to face than leaving. The families are moving with their grave markers. I want to help them build somewhere the children can stay dry.

### homecoming.js:161

**Context:** regionalLives

his sister’s ferry landing

### homecoming.js:162

**Context:** regionalLives

My sister has kept my boat tied up. I kept rescuing people because asking whether she still wanted me home frightened me more than the river. She sent a key, not a summons.

### homecoming.js:167

**Context:** regionalLives

the culvert memorial

### homecoming.js:168

**Context:** regionalLives

The recovered dive log ends with my name. I was the colleague who did not return. My partner has waited for an answer, not for another search party. Let me bring the log to them.

### homecoming.js:173

**Context:** regionalLives

the firewatch settlement

### homecoming.js:174

**Context:** regionalLives

Closing the furnace has ended the watch that shaped my life. My crew wants to learn another trade together. I want to be there without pretending there is still a fire.

### homecoming.js:179

**Context:** regionalLives

the kiln workers’ burial ground

### homecoming.js:180

**Context:** regionalLives

The final order names me among the dead. I kept carrying it because nobody acknowledged receiving it. The workers have made a place for my name. I would like to stop delivering the same message.

### homecoming.js:185

**Context:** regionalLives

her family’s farm

### homecoming.js:186

**Context:** regionalLives

My brother planted without asking when I would return. I was angry, then relieved. There is work I can join, and a life that did not have to wait for me.

### homecoming.js:191

**Context:** regionalLives

the coastal lens workshop

### homecoming.js:192

**Context:** regionalLives

My daughter can make a better lens than mine. I kept correcting her because being needed felt safer than being welcome. She has offered me the bench by the window.

### homecoming.js:197

**Context:** regionalLives

the harbour where their partner lives

### homecoming.js:198

**Context:** regionalLives

The true register says my rescue boat sank. The false light kept showing our kitchen. I want to hear what my partner actually says, even if they have learned to live without me.

### homecoming.js:203

**Context:** regionalLives

the harbour watch

### homecoming.js:204

**Context:** regionalLives

The workers want a guard who answers to them. I have been offered the post. I want a duty I can put down at the end of a shift.

### homecoming.js:209

**Context:** regionalLives

the village seed house

### homecoming.js:210

**Context:** regionalLives

I grew the old garden until it swallowed other people’s doors. The children need seeds for their gardens now. I will go back and learn their names.

### homecoming.js:215

**Context:** regionalLives

the village carpenters’ yard

### homecoming.js:216

**Context:** regionalLives

My son has become a carpenter while I was away. He asked me to work beside him, not to take the yard back. I am trying to believe that is enough.

### homecoming.js:221

**Context:** regionalLives

the canopy hospice

### homecoming.js:222

**Context:** regionalLives

The medicine book records my last delivery and my death. The nurse who received it is still alive. I want to know whether it helped, then let her close the book.

### homecoming.js:227

**Context:** regionalLives

the mountain weather station

### homecoming.js:228

**Context:** regionalLives

I kept the storm running because the next morning meant admitting who we lost. The watch needs current measurements. I need to see a morning I did not arrange.

### homecoming.js:233

**Context:** regionalLives

the mountain porters’ lodge

### homecoming.js:234

**Context:** regionalLives

The travellers are down. My family has asked me to come home. There will be other travellers, but there are other porters too.

### homecoming.js:239

**Context:** regionalLives

her grown apprentice’s survey hut

### homecoming.js:240

**Context:** regionalLives

My apprentice is the senior surveyor now. She kept my broken measuring pole. I want to meet the person she became, rather than ask her to be my apprentice again.

### homecoming.js:245

**Context:** regionalLives

the town’s public workshop

### homecoming.js:246

**Context:** regionalLives

The emergency is over. I want the clock where anyone can inspect it. If I return, it will be as a clockmaker, not the keeper of everybody’s hours.

### homecoming.js:251

**Context:** regionalLives

the prisoners’ public hearing

### homecoming.js:252

**Context:** regionalLives

I opened cells I once guarded. Some people will not forgive me. They have asked me to testify. Returning means accepting their questions, not earning a clean record.

### homecoming.js:257

**Context:** regionalLives

their mother’s bakery

### homecoming.js:258

**Context:** regionalLives

Mother was among the detained bakers. I mapped every passage except the one home because I feared she would ask why I took so long. Her letter asks whether I have eaten.

### homecoming.js:263

**Context:** regionalLives

the quay deposit office

### homecoming.js:264

**Context:** regionalLives

Returning a chest does not return the years someone spent without it. The owners want help following the accounts. I want to stay for the difficult part after the treasure is gone.

### homecoming.js:269

**Context:** regionalLives

his grandchildren’s quay house

### homecoming.js:270

**Context:** regionalLives

The roof held. My children grew up. Their children have invited me to dinner. I will go without a plan for what they ought to remember.

### homecoming.js:275

**Context:** regionalLives

the divers’ shore vigil

### homecoming.js:276

**Context:** regionalLives

The pressure ledger records my final dive. My crew recovered everyone but me. They are bringing my name to the shore. I want them to know they may stop searching.

### homecoming.js:281

**Context:** regionalLives

the roadkeepers’ signal school

### homecoming.js:282

**Context:** regionalLives

The beacon called for people who will not return. We have turned it off. I want to teach lamps that someone can choose to extinguish.

### homecoming.js:287

**Context:** regionalLives

the surviving road camp

### homecoming.js:288

**Context:** regionalLives

My family has built a new camp. I kept defending the old one after they left. I want to ask where they would like the next fence, if they want one at all.

### homecoming.js:293

**Context:** regionalLives

the hill travellers’ memorial

### homecoming.js:294

**Context:** regionalLives

I counted everyone through except myself. The return register has my name in its missing column. My sister has kept the last lamp lit. I want to tell her she can put it out.

### homecoming.js:300

**Context:** Interface / runtime text

Missing homecoming region:

### homecoming.js:307

**Context:** farewell

spirit

### homecoming.js:308

**Context:** farewell

⟦recruit.name⟧ meets the people keeping their memory. They hear the answer they came for and pass on. Their name remains in the guild register.

**Source template:**

```text
⟦recruit.name⟧ meets the people keeping their memory. They hear the answer they came for and pass on. Their name remains in the guild register.
```

### homecoming.js:309

**Context:** farewell

⟦recruit.name⟧ leaves for ⟦home⟧. Their room is left available for a visitor; nobody promises on their behalf that they will return.

**Source template:**

```text
⟦recruit.name⟧ leaves for ⟦home⟧. Their room is left available for a visitor; nobody promises on their behalf that they will return.
```

### homecoming.js:320

**Context:** records → entrance → room

Entrance hall

### homecoming.js:321

**Context:** records → entrance → author

Rowan

### homecoming.js:323

**Context:** records → entrance → text

I came here with a bag and no address to put on the register. Halden left the address blank and showed me a room. I thought I would do anything to deserve it.

### homecoming.js:327

**Context:** records → service → room

Service room

### homecoming.js:328

**Context:** records → service → author

Rowan

### homecoming.js:334

**Context:** records → quarters → room

Quarters

### homecoming.js:335

**Context:** records → quarters → author

Rowan

### homecoming.js:341

**Context:** records → cellar → room

Flooded cellar

### homecoming.js:342

**Context:** records → cellar → author

Halden

### homecoming.js:344

**Context:** records → cellar → text

Year one. The severed road will not open. I can still treat people out here. Today I took Mara home. She needs a bed; she does not need to become the answer to my grief.

### homecoming.js:348

**Context:** records → tower → room

Bell tower

### homecoming.js:349

**Context:** records → tower → author

Maelin

### homecoming.js:351

**Context:** records → tower → text

Three strokes mean clear the stairs. I heard four after my hand left the rope. If the ice holds, nobody will obey that fourth stroke. I hope someone will know when it is safe to let the bell ring again.

### homecoming.js:355

**Context:** records → labyrinth → room

Labyrinth heart

### homecoming.js:356

**Context:** records → labyrinth → author

Ysra

### homecoming.js:358

**Context:** records → labyrinth → text

The infirmary is still on the map. I am leaving this note outside the rune. If I cannot finish it, look for the people before you look for the route.

### homecoming.js:363

**Context:** records → author

Rowan

### homecoming.js:367

**Context:** records → text

We kept a place at the table. I must learn to leave the chair empty without treating its owner as missing.

### homecoming.js:387

**Context:** records → text

We have written the return addresses beside the room keys. ⟦region.ending⟧ A room brought here must still have a road home.

**Source template:**

```text
We have written the return addresses beside the room keys. ⟦region.ending⟧ A room brought here must still have a road home.
```

### homecoming.js:392

**Context:** records → room

Personal correspondence

### homecoming.js:409

**Context:** recoverRecord

This personal record is not accessible or has already been read.

### homecoming.js:411

**Context:** recoverRecord → text

⟦r.author⟧ · ⟦r.room⟧
⟦r.text⟧

**Source template:**

```text
⟦r.author⟧ · ⟦r.room⟧
⟦r.text⟧
```

### homecoming.js:412

**Context:** recoverRecord → kind

Personal record

### homecoming.js:419

**Context:** homecomingChoices → A road home → title

A road home

### homecoming.js:423

**Context:** homecomingChoices → A road home → body

They want to return to

### homecoming.js:426

**Context:** homecomingChoices → A road home → body

spirit

### homecoming.js:427

**Context:** homecomingChoices → A road home → body

The house has held them since their death. Finding the people who remember them will let them pass on.

### homecoming.js:428

**Context:** homecomingChoices → A road home → body

They ask Rowan to help them begin the journey.

### homecoming.js:432

**Context:** homecomingChoices → A road home → choices → release → label

spirit

### homecoming.js:432

**Context:** homecomingChoices → A road home → choices → release → label

Help them pass on

### homecoming.js:432

**Context:** homecomingChoices → A road home → choices → release → label

Wish them well and let them leave

### homecoming.js:434

**Context:** homecomingChoices → A road home → choices → release → preview

They leave the guild permanently. Their equipment returns to the store room, and their story remains in the journal.

### homecoming.js:442

**Context:** releaseCompanion

The companion must return home before departure.

### homecoming.js:450

**Context:** releaseCompanion → kind

Farewell

## exploration.js

### exploration.js:4

**Context:** sleepers → oren → name

Oren

### exploration.js:13

**Context:** sleepers → oren → location

Dry cellar landing

### exploration.js:17

**Context:** sleepers → oren → condition

Petrified

### exploration.js:18

**Context:** sleepers → oren → method

Strength 10 · remove the casting ring

### exploration.js:19

**Context:** sleepers → oren → bio

A guild mason trapped in his own stone-skin spell while bracing the collapsing cellar stair.

### exploration.js:21

**Context:** sleepers → oren → story

The repair crew has braced the ceiling with new timber. The figure beneath it no longer carries its weight, but the iron ring on his wrist is bent shut. An old guild craft manual identifies it as a stone-skin casting ring.
When the ring is forced open, flakes of stone fall from the man’s shoulders. He folds at the knees and catches the new support.
“Did they get down?” he asks. “The people on the stair.”
His tool belt carries the name Oren. He remembers the warning bell, then the beam coming down. Mara brings water while Rowan explains how long the house has been cut off.

### exploration.js:22

**Context:** sleepers → oren → ability

Stone song · covers falling-stone routes and strengthens tower access.

### exploration.js:26

**Context:** sleepers → maelin → name

Maelin

### exploration.js:35

**Context:** sleepers → maelin → location

Bell tower crown

### exploration.js:39

**Context:** sleepers → maelin → condition

Frozen in blue ice

### exploration.js:40

**Context:** sleepers → maelin → method

Magical literacy · disable the repeating rune

### exploration.js:41

**Context:** sleepers → maelin → bio

The tower bellkeeper sealed herself inside a frost ward when the alarm began ringing on its own.

### exploration.js:43

**Context:** sleepers → maelin → story

The ice surrounds a woman, the bell rope and the bell’s clapper. A ward on the floor repeats the same frost rune. It cannot thaw while the repeating line remains closed.
The literate resident breaks that line before opening the warming rune. The ice melts slowly. Maelin’s first movement is to catch the clapper so it cannot strike.
“It rang after I let go,” she says. “Something in the wall had learned the alarm.”
She recognises Rowan, but asks where the other watchkeepers are. Nobody at the house knows. She agrees to stay while the guild searches the surviving records.

### exploration.js:44

**Context:** sleepers → maelin → ability

Echo sight · opens the labyrinth’s lower passage and reads false paths.

### exploration.js:48

**Context:** sleepers → ysra → name

Ysra

### exploration.js:57

**Context:** sleepers → ysra → location

Labyrinth heart

### exploration.js:61

**Context:** sleepers → ysra → condition

Bound in living ink

### exploration.js:62

**Context:** sleepers → ysra → method

Magical literacy · cancel the tracking rune

### exploration.js:63

**Context:** sleepers → ysra → bio

A cartographer trapped in a live map she used to guide people through the shifting house.

### exploration.js:65

**Context:** sleepers → ysra → story

The map redraws itself whenever someone moves in the chamber. One ink figure remains in its centre. The tracking rune beneath it has no finishing mark.
The literate resident adds that mark. The ink stops moving and runs off the table. Ysra is left on the floor, gripping a pen that has worn through her glove.
“I kept the route to the infirmary open,” she says. “Then the corridor vanished. The spell kept trying to place me somewhere.”
She asks for paper. Her first drawing shows the route she remembers, including a rear stair Rowan no longer recognises.

### exploration.js:66

**Context:** sleepers → ysra → ability

Threadwalk · covers unstable crossings and reveals safe routes.

### exploration.js:74

**Context:** sleeperConversations → orenRemember → title

The beam above the stair

### exploration.js:75

**Context:** sleeperConversations → orenRemember → body

Oren sits with a mug between his hands. He has not drunk from it. A white dust comes away wherever his thumb rubs the handle.
“Rear stair went first,” he says. “Six people above me. I put the stone spell on, got under the beam, and told them to run. The casting ring bent when the next floor came down.”
Rowan asks about the warning bell.
“Three strokes. Then it kept ringing. That was wrong. Three meant clear the outer rooms; a continuous bell meant hold your position. I couldn’t see who was pulling it.”
He notices the tower through the window. “You aren’t sending anyone up there on those supports, are you?”

### exploration.js:79

**Context:** sleeperConversations → orenRemember → choices → choice → label

“Check the tower supports. Tell Mara what timber you need.”

### exploration.js:80

**Context:** sleeperConversations → orenRemember → choices → choice → preview

Oren takes on the repair survey. Gain trust and a local repair contact.

### exploration.js:84

**Context:** sleeperConversations → orenRemember → choices → choice → result

Oren leaves his tea and takes Mara to the stair. He taps each support with a mallet, then marks three with chalk. “These come out before anyone climbs.” Mara writes a timber order. He asks Bryn to help if she is available.

### exploration.js:88

**Context:** sleeperConversations → orenRemember → choices → record → label

“Draw the stair as it was that night.”

### exploration.js:89

**Context:** sleeperConversations → orenRemember → choices → record → preview

Record where the collapse began. Gain trust and a structural clue.

### exploration.js:93

**Context:** sleeperConversations → orenRemember → choices → record → result

Oren draws the rear stair from memory. The first broken support was beneath the outer-door mechanism, not under the heaviest room. He circles it twice. Rowan keeps the drawing with the expedition records.

### exploration.js:101

**Context:** sleeperConversations → maelinRemember → title

The bell rang after she let go

### exploration.js:102

**Context:** sleeperConversations → maelinRemember → body

Maelin has wrapped the bell’s clapper in a towel. She flinches when a spoon hits the kitchen table.
“Vey called for three strokes. Disconnect the outer doors; clear the stairs. I rang them. Then the bell rang a fourth time.”
She shows Rowan the burns across her palm.
“I caught the rope. It rang anyway. The voice in the wall was giving the next order in Vey’s voice. I put the frost ward over the whole thing. Bell, rope, me. I meant to hold it until someone cut the repeating rune.”
She asks how long she was in the ice. Rowan tells her. She sits down before asking another question.

### exploration.js:106

**Context:** sleeperConversations → maelinRemember → choices → choice → label

“Help us make the alarm safe before we use it again.”

### exploration.js:107

**Context:** sleeperConversations → maelinRemember → choices → choice → preview

Maelin helps rebuild the alarm. Gain trust and a reliable warning system.

### exploration.js:111

**Context:** sleeperConversations → maelinRemember → choices → choice → result

Maelin disconnects the repeating mechanism. The bell will now ring only while someone pulls its rope. She tests three strokes, stops, and waits. The fourth does not come.

### exploration.js:115

**Context:** sleeperConversations → maelinRemember → choices → record → label

“Write down Vey’s order while you remember the wording.”

### exploration.js:116

**Context:** sleeperConversations → maelinRemember → choices → record → preview

Preserve an eyewitness account. Gain trust and evidence about the evacuation.

### exploration.js:120

**Context:** sleeperConversations → maelinRemember → choices → record → result

Maelin writes: “Disconnect the outer doors. Clear the stairs. Three strokes.” Below it she records the false fourth stroke. She makes Rowan read the two lines back before signing them.

### exploration.js:128

**Context:** sleeperConversations → ysraRemember → title

The route to the infirmary

### exploration.js:129

**Context:** sleeperConversations → ysraRemember → body

Ysra asks for chalk and draws the house on the kitchen floor. She corrects Rowan’s position of the infirmary twice.
“It was upstairs then. After the first break, its door was on the rear stair. I kept the map linked so people could find it.”
She draws a line, stops, and puts the chalk down.
“That’s where the exit disappeared. My tracking spell was still following me. There was no room left for it to draw me in, so it drew me into itself.”
Rowan asks who reached the infirmary.
“Halden, his assistant, and somebody they were carrying. I couldn’t see the face.”

### exploration.js:133

**Context:** sleeperConversations → ysraRemember → choices → choice → label

“Mark the false turns before another search party goes below.”

### exploration.js:134

**Context:** sleeperConversations → ysraRemember → choices → choice → preview

Ysra makes the maze safer to navigate. Gain trust and a usable return route.

### exploration.js:138

**Context:** sleeperConversations → ysraRemember → choices → choice → result

Ysra leaves chalk arrows at the labyrinth’s false turns. Each arrow points back toward the stair. She returns with the chalk worn to a stub and checks that someone was keeping count of the people below.

### exploration.js:142

**Context:** sleeperConversations → ysraRemember → choices → record → label

“Keep that route. It may help us find the infirmary.”

### exploration.js:143

**Context:** sleeperConversations → ysraRemember → choices → record → preview

Preserve the last known route. Gain trust and an infirmary clue.

### exploration.js:147

**Context:** sleeperConversations → ysraRemember → choices → record → result

Ysra copies the infirmary route onto paper and marks where its door vanished. She leaves the patient’s identity blank. “A face I didn’t see,” she tells Rowan, “isn’t a name I can give you.”

### exploration.js:154

**Context:** awakeningCheck

Unknown resident.

### exploration.js:155

**Context:** awakeningCheck

Already awakened.

### exploration.js:156

**Context:** awakeningCheck

Recover access to this part of the house first.

### exploration.js:157

**Context:** awakeningCheck

Investigate the figure before attempting to awaken them.

### exploration.js:158

**Context:** awakeningCheck

Strength 10 is needed to remove Oren’s casting ring.

### exploration.js:160

**Context:** awakeningCheck

A present resident with Magical literacy must release this seal.

### exploration.js:166

**Context:** guildStairs → error

Return to the furnace door at the west end.

### exploration.js:169

**Context:** guildStairs → error

The furnace is the lowest floor. Use W to leave.

### exploration.js:175

**Context:** guildStairs → error

Repair the tower stair at its foot with E. Complete The bell at Wren’s Crossing for its key.

### exploration.js:179

**Context:** guildStairs → error

You are at the tower crown.

### exploration.js:182

**Context:** guildStairs → error

The tower stair goes up. Cellar stairs are in the service corridor.

### exploration.js:187

**Context:** guildStairs → error

Use the labyrinth stair at the brass thread (x 530).

### exploration.js:189

**Context:** guildStairs → error

This is the labyrinth heart.

### exploration.js:195

**Context:** guildStairs → error

Tracking or Echo sight reveals the stair hidden in the false floor.

## opening-contracts.js

### opening-contracts.js:4

**Context:** jobs

Survey the sealed service wall

### opening-contracts.js:13

**Context:** jobs

STORY LEAD

### opening-contracts.js:14

**Context:** jobs

The wall survey identifies the hidden service room and a missing mason’s tool chest.

### opening-contracts.js:15

**Context:** jobs

Walk Mara’s surveyor along the estate boundary and compare the sealed wall with the surviving plans.

### opening-contracts.js:16

**Context:** jobs

The surveyor marks the service room on the plan. Strength 10 can open its wall. A mason’s tool chest at the old cart shed can reduce restoration costs.

### opening-contracts.js:20

**Context:** jobs

Recover the mason’s tool chest

### opening-contracts.js:29

**Context:** jobs

PLOT ITEM

### opening-contracts.js:30

**Context:** jobs

Mason’s tools · service-room restoration costs 50g instead of 70g.

### opening-contracts.js:31

**Context:** jobs

Retrieve chisels and shoring clamps from a cart shed overgrown with brambles.

### opening-contracts.js:32

**Context:** jobs

The chest contains chisels and usable shoring clamps. Mara can now restore the service room for 50 gold once the wall is open.

### opening-contracts.js:36

**Context:** jobs

The goat on the chapel roof

### opening-contracts.js:45

**Context:** jobs

OPTIONAL JOB

### opening-contracts.js:46

**Context:** jobs

One-time rescue · gold and experience.

### opening-contracts.js:47

**Context:** jobs

The bell rope has lifted a farmer’s goat onto the ruined chapel roof. Brace a ladder and bring it down before the next rain.

### opening-contracts.js:48

**Context:** jobs

The goat returns to its owner. The ladder and chapel roof are made safe; this request is finished.

### opening-contracts.js:52

**Context:** jobs

Medicine before the rain

### opening-contracts.js:61

**Context:** jobs

OPTIONAL JOB

### opening-contracts.js:62

**Context:** jobs

One-time delivery · gold and experience.

### opening-contracts.js:63

**Context:** jobs

Carry dry medicines to the hillside midwife before the ford rises.

### opening-contracts.js:64

**Context:** jobs

The medicines reach the midwife dry. She pays the agreed wage and sends a receipt, rather than posting the same emergency again.

### opening-contracts.js:68

**Context:** jobs

A rope for the mill bridge

### opening-contracts.js:77

**Context:** jobs

OPTIONAL JOB

### opening-contracts.js:78

**Context:** jobs

One-time repair · gold and experience.

### opening-contracts.js:79

**Context:** jobs

Cross the mill’s fallen footbridge with a guide rope so its workers can install a new handrail.

### opening-contracts.js:80

**Context:** jobs

The millworkers finish the handrail. The repaired crossing no longer needs this contract.

### opening-contracts.js:84

**Context:** jobs

The lantern-market pickpocket

### opening-contracts.js:93

**Context:** jobs

OPTIONAL JOB

### opening-contracts.js:94

**Context:** jobs

One-time investigation · gold and experience.

### opening-contracts.js:95

**Context:** jobs

Compare stallholders’ accounts and identify who is moving stolen purses through the evening market.

### opening-contracts.js:96

**Context:** jobs

The purses return to their owners. The watch takes the evidence and closes the case.

### opening-contracts.js:100

**Context:** jobs

Bring home the cellar stair timbers

### opening-contracts.js:109

**Context:** jobs

PLOT ITEM

### opening-contracts.js:110

**Context:** jobs

Fitted stair timbers · unlocks the dry cellar landing.

### opening-contracts.js:111

**Context:** jobs

Escort Mara’s carpenter and the replacement stair timbers from the sawmill. The service-room key gives access to the cellar hatch.

### opening-contracts.js:112

**Context:** jobs

The carpenter fits the recovered timbers beneath the cellar hatch. The stairs are repaired: use S at the service corridor to reach the dry landing. Water magic is only needed beyond it.

### opening-contracts.js:116

**Context:** jobs

The courier who missed supper

### opening-contracts.js:125

**Context:** jobs

OPTIONAL JOB

### opening-contracts.js:126

**Context:** jobs

One-time search · gold and experience.

### opening-contracts.js:127

**Context:** jobs

Follow dropped letters to a courier stranded beside the north ridge. Bring the courier and the undelivered post home.

### opening-contracts.js:128

**Context:** jobs

The courier reaches the village with the recovered letters. Their family is waiting at the door.

### opening-contracts.js:132

**Context:** jobs

Beetles in the seed carts

### opening-contracts.js:141

**Context:** jobs

OPTIONAL JOB

### opening-contracts.js:142

**Context:** jobs

One-time containment · gold and experience.

### opening-contracts.js:143

**Context:** jobs

Separate enchanted beetles from the seed stock without burning the village’s next planting.

### opening-contracts.js:144

**Context:** jobs

The beetles are contained and the seed carts are returned intact.

### opening-contracts.js:148

**Context:** jobs

A voice from the quarry well

### opening-contracts.js:157

**Context:** jobs

OPTIONAL JOB

### opening-contracts.js:158

**Context:** jobs

One-time rescue · gold and experience.

### opening-contracts.js:159

**Context:** jobs

Lower a braced basket into an abandoned quarry well and recover the worker trapped below its broken ladder.

### opening-contracts.js:160

**Context:** jobs

The worker returns with a fractured ankle. Their crew seals the well and pays the rescue fee.

### opening-contracts.js:164

**Context:** jobs

Keep the storm shelter open

### opening-contracts.js:173

**Context:** jobs

OPTIONAL JOB

### opening-contracts.js:174

**Context:** jobs

One-time defence · gold and experience.

### opening-contracts.js:175

**Context:** jobs

Guard a hillside shelter while its residents replace a door battered by storm creatures.

### opening-contracts.js:176

**Context:** jobs

The new shelter door holds. Its residents can maintain the watch themselves.

### opening-contracts.js:180

**Context:** jobs

The map sold twice

### opening-contracts.js:189

**Context:** jobs

OPTIONAL JOB

### opening-contracts.js:190

**Context:** jobs

One-time investigation · gold and experience.

### opening-contracts.js:191

**Context:** jobs

Follow two contradictory salvage maps and recover evidence before either party enters the unsafe passage.

### opening-contracts.js:192

**Context:** jobs

Both parties return. The fraudulent maps enter the public archive with the seller’s signed receipts.

### opening-contracts.js:227

**Context:** openingContracts → checks → label

Combined

### opening-contracts.js:237

**Context:** rewards → anchor

Landing fitting + bell-tower key + labyrinth-gate key

### opening-contracts.js:238

**Context:** rewards → navigator

Archive door seal

### opening-contracts.js:239

**Context:** rewards → orchard

Greenhouse fitting + seeds or research roots

### opening-contracts.js:240

**Context:** rewards → lens

Observatory lens

### opening-contracts.js:241

**Context:** rewards → witness

Rowan’s binding revealed + replacement-system plans

### opening-contracts.js:242

**Context:** rewards → covenant

Safe replacement system · unlocks liberation

### opening-contracts.js:243

**Context:** rewards → lattice

Safe replacement system · unlocks liberation

### opening-contracts.js:244

**Context:** rewards → outsideArchivist

Seal diagrams · opens archive and awakens sealed residents

### opening-contracts.js:248

**Context:** contractLabel → kind

HOME DEFENCE

### opening-contracts.js:248

**Context:** contractLabel → detail

Protects residents and rooms

### opening-contracts.js:253

**Context:** contractLabel → priority

OPTIONAL JOB

### opening-contracts.js:257

**Context:** contractLabel → kind

COMPANION STORY

### opening-contracts.js:258

**Context:** contractLabel → detail

Advances a companion’s personal history and road home

### opening-contracts.js:263

**Context:** contractLabel → kind

REGIONAL STORY

### opening-contracts.js:265

**Context:** contractLabel → detail

Advances the regional campaign

### opening-contracts.js:266

**Context:** contractLabel → detail

Key

### opening-contracts.js:266

**Context:** contractLabel → detail

· returns a room key

### opening-contracts.js:270

**Context:** contractLabel → kind

MAIN STORY · PLOT REWARD

### opening-contracts.js:272

**Context:** contractLabel → kind

STORY MISSION

### opening-contracts.js:272

**Context:** contractLabel → detail

New evidence and a story decision

### opening-contracts.js:275

**Context:** contractLabel → kind

GUILD EXPLORATION

### opening-contracts.js:277

**Context:** contractLabel → detail

Clears a room · reward unknown until completion

### opening-contracts.js:278

**Context:** contractLabel → detail

Clears a room and opens its investigation

### opening-contracts.js:282

**Context:** contractLabel → kind

OPTIONAL · LETHAL

### opening-contracts.js:282

**Context:** contractLabel → detail

High-risk paid adventure

### opening-contracts.js:283

**Context:** contractLabel → kind

REPEATABLE WORK

### opening-contracts.js:283

**Context:** contractLabel → detail

Gold and experience

## expansion.js

### expansion.js:5

**Context:** regions → fen → name

The Lantern Fen

### expansion.js:6

**Context:** regions → fen → keeper

Tamsin

### expansion.js:7

**Context:** regions → fen → localKeeper

Hesta

### expansion.js:9

**Context:** regions → fen → problem

The old guild’s drainage pump has reversed. Water is rising through inhabited houses.

### expansion.js:11

**Context:** regions → fen → ending

The pump now empties into the river at a measured rate. Families return after the water marks stop rising.

### expansion.js:12

**Context:** regions → fen → rooms

Sluice workshop

### expansion.js:12

**Context:** regions → fen → rooms

Reed conservatory

### expansion.js:12

**Context:** regions → fen → rooms

River infirmary

### expansion.js:12

**Context:** regions → fen → rooms

Lantern dock

### expansion.js:15

**Context:** regions → fen → jobs

Measure the rising water

### expansion.js:16

**Context:** regions → fen → jobs

Mark the waterline in three occupied houses and find the broken outflow.

### expansion.js:19

**Context:** regions → fen → jobs

Carry the children to high ground

### expansion.js:20

**Context:** regions → fen → jobs

Escort the school boat past the drowned willow causeway.

### expansion.js:22

**Context:** regions → fen → jobs

Recover the pump plans

### expansion.js:22

**Context:** regions → fen → jobs

Retrieve the engineer’s folio from a submerged toll house.

### expansion.js:23

**Context:** regions → fen → jobs

Find the missing diver

### expansion.js:23

**Context:** regions → fen → jobs

Follow her air hose into a collapsed culvert and bring her out.

### expansion.js:24

**Context:** regions → fen → jobs

Break the eel nest

### expansion.js:24

**Context:** regions → fen → jobs

Clear the intake without opening the floodgate above the village.

### expansion.js:25

**Context:** regions → fen → jobs

Bring home the sluice workshop

### expansion.js:25

**Context:** regions → fen → jobs

Recover the workshop key from the pump keeper.

### expansion.js:26

**Context:** regions → fen → jobs

Secure a dry camp

### expansion.js:26

**Context:** regions → fen → jobs

Drive marsh wolves away from the relief camp.

### expansion.js:27

**Context:** regions → fen → jobs

Retrieve the copper impeller

### expansion.js:27

**Context:** regions → fen → jobs

Lift the original impeller from the flooded foundry.

### expansion.js:29

**Context:** regions → fen → jobs

Repair the channel seals

### expansion.js:30

**Context:** regions → fen → jobs

Fit the seals while the village workers hold the temporary dam.

### expansion.js:33

**Context:** regions → fen → jobs

Silence the false flood bell

### expansion.js:34

**Context:** regions → fen → jobs

Remove the mimic that has been calling families toward unsafe ground.

### expansion.js:36

**Context:** regions → fen → jobs

Turn the pump outward

### expansion.js:36

**Context:** regions → fen → jobs

Hold the engine room while Tamsin reverses its damaged drive.

### expansion.js:38

**Context:** regions → fen → jobs

Open the river road

### expansion.js:39

**Context:** regions → fen → jobs

Escort the first returning families and inspect the repaired outflow.

### expansion.js:45

**Context:** regions → ash → name

The Ash March

### expansion.js:46

**Context:** regions → ash → keeper

Kest

### expansion.js:47

**Context:** regions → ash → localKeeper

Brindle

### expansion.js:49

**Context:** regions → ash → problem

A buried furnace feeds fires beneath the farms. Its controller still obeys an evacuation order issued thirty years ago.

### expansion.js:51

**Context:** regions → ash → ending

The furnace is cold. Kest gives the recovered guild rooms back after the farmers inspect the new controls.

### expansion.js:52

**Context:** regions → ash → rooms

Ash forge

### expansion.js:52

**Context:** regions → ash → rooms

Cinder baths

### expansion.js:52

**Context:** regions → ash → rooms

Firewatch hall

### expansion.js:52

**Context:** regions → ash → rooms

Kiln archive

### expansion.js:54

**Context:** regions → ash → jobs

Read the scorch lines

### expansion.js:54

**Context:** regions → ash → jobs

Survey the fields and locate the underground fuel trench.

### expansion.js:55

**Context:** regions → ash → jobs

Evacuate the grain carts

### expansion.js:55

**Context:** regions → ash → jobs

Escort grain and farm workers before the next ground fire.

### expansion.js:56

**Context:** regions → ash → jobs

Recover Kest’s patrol

### expansion.js:56

**Context:** regions → ash → jobs

Find the firewatch crew stranded beside a molten culvert.

### expansion.js:57

**Context:** regions → ash → jobs

Take the cooling salts

### expansion.js:57

**Context:** regions → ash → jobs

Collect salts from the abandoned kiln under salamander attack.

### expansion.js:59

**Context:** regions → ash → jobs

Close the western fuel gate

### expansion.js:60

**Context:** regions → ash → jobs

Reach the manual valve before fire crosses into the orchard.

### expansion.js:62

**Context:** regions → ash → jobs

Recover the ash forge

### expansion.js:62

**Context:** regions → ash → jobs

Bring the forge’s door key and cooled tools back to the guild.

### expansion.js:64

**Context:** regions → ash → jobs

Enter the furnace control room

### expansion.js:65

**Context:** regions → ash → jobs

Clear the armour animated by the furnace’s security spell.

### expansion.js:68

**Context:** regions → ash → jobs

Read the last watch order

### expansion.js:69

**Context:** regions → ash → jobs

Recover the signed instruction that left the furnace running.

### expansion.js:71

**Context:** regions → ash → jobs

Reach the buried reservoir

### expansion.js:71

**Context:** regions → ash → jobs

Cut a passage to the water kept for emergencies.

### expansion.js:72

**Context:** regions → ash → jobs

Hold the steam passage

### expansion.js:72

**Context:** regions → ash → jobs

Protect the workers while they attach the cooling pipe.

### expansion.js:73

**Context:** regions → ash → jobs

Extinguish the deep furnace

### expansion.js:73

**Context:** regions → ash → jobs

Disable its controller under attack from the cinder drake.

### expansion.js:75

**Context:** regions → ash → jobs

Return the land to its keepers

### expansion.js:76

**Context:** regions → ash → jobs

Walk the fuel trench with the farmers and seal every inlet.

### expansion.js:82

**Context:** regions → glass → name

The Glass Coast

### expansion.js:83

**Context:** regions → glass → keeper

Corin

### expansion.js:84

**Context:** regions → glass → localKeeper

Toren

### expansion.js:86

**Context:** regions → glass → problem

A lighthouse projects copies of ships onto the rocks. Rescue crews keep following signals from people who are already safe.

### expansion.js:88

**Context:** regions → glass → ending

The lighthouse shines one beam again. Corin posts the real rescue register beside its door.

### expansion.js:89

**Context:** regions → glass → rooms

Mirror studio

### expansion.js:89

**Context:** regions → glass → rooms

Tide chart room

### expansion.js:89

**Context:** regions → glass → rooms

Salt chapel

### expansion.js:89

**Context:** regions → glass → rooms

Beacon gallery

### expansion.js:91

**Context:** regions → glass → jobs

Compare the rescue registers

### expansion.js:91

**Context:** regions → glass → jobs

Find which missing ships have already reached harbour.

### expansion.js:92

**Context:** regions → glass → jobs

Escort a real fishing boat

### expansion.js:92

**Context:** regions → glass → jobs

Guide its crew through the false lights at dusk.

### expansion.js:93

**Context:** regions → glass → jobs

Recover the lens maker

### expansion.js:93

**Context:** regions → glass → jobs

Find Corin in the mirror caves below the lighthouse.

### expansion.js:94

**Context:** regions → glass → jobs

Break the reflected sentries

### expansion.js:94

**Context:** regions → glass → jobs

Clear the stair guarded by copies of the coast patrol.

### expansion.js:96

**Context:** regions → glass → jobs

Bring back the lens ledger

### expansion.js:97

**Context:** regions → glass → jobs

Retrieve the serial numbers of the lighthouse’s enchanted lenses.

### expansion.js:99

**Context:** regions → glass → jobs

Return the mirror studio

### expansion.js:99

**Context:** regions → glass → jobs

Detach the borrowed studio after its owner signs the release.

### expansion.js:100

**Context:** regions → glass → jobs

Mark the true coastline

### expansion.js:100

**Context:** regions → glass → jobs

Plant lamps along the safe channel using measured bearings.

### expansion.js:101

**Context:** regions → glass → jobs

Find the duplicate lens

### expansion.js:101

**Context:** regions → glass → jobs

Trace the extra beam to a lens hidden beneath the foundation.

### expansion.js:102

**Context:** regions → glass → jobs

Rescue the night watch

### expansion.js:102

**Context:** regions → glass → jobs

Reach the keepers trapped between reflected staircases.

### expansion.js:103

**Context:** regions → glass → jobs

Shatter the copied beacon

### expansion.js:103

**Context:** regions → glass → jobs

Destroy the duplicate without breaking the real light.

### expansion.js:104

**Context:** regions → glass → jobs

Recalibrate the lighthouse

### expansion.js:104

**Context:** regions → glass → jobs

Defend Corin while he sets the beam to the harbour channel.

### expansion.js:106

**Context:** regions → glass → jobs

Sail the safe passage

### expansion.js:107

**Context:** regions → glass → jobs

Escort the first convoy and verify every beacon against the chart.

### expansion.js:113

**Context:** regions → root → name

The Rootwild

### expansion.js:114

**Context:** regions → root → keeper

Asha

### expansion.js:115

**Context:** regions → root → localKeeper

Moss

### expansion.js:117

**Context:** regions → root → problem

A guild growth spell has sealed a forest village inside its own shelter trees. Cutting the roots makes them tighten.

### expansion.js:119

**Context:** regions → root → ending

The trees grow around the houses instead of through them. Asha keeps the pruning instructions where every family can read them.

### expansion.js:120

**Context:** regions → root → rooms

Root nursery

### expansion.js:120

**Context:** regions → root → rooms

Herbal kitchen

### expansion.js:120

**Context:** regions → root → rooms

Seed vault

### expansion.js:120

**Context:** regions → root → rooms

Green council room

### expansion.js:122

**Context:** regions → root → jobs

Listen at the sealed gates

### expansion.js:122

**Context:** regions → root → jobs

Locate families by the voices heard through the roots.

### expansion.js:124

**Context:** regions → root → jobs

Carry medicine through the canopy

### expansion.js:125

**Context:** regions → root → jobs

Reach the sick without cutting their supporting branches.

### expansion.js:127

**Context:** regions → root → jobs

Find the original seed keeper

### expansion.js:127

**Context:** regions → root → jobs

Follow Asha’s carved marks to her blocked watch hut.

### expansion.js:128

**Context:** regions → root → jobs

Recover the pruning spell

### expansion.js:128

**Context:** regions → root → jobs

Retrieve the book caught in the village school’s roots.

### expansion.js:129

**Context:** regions → root → jobs

Clear the thorn hounds

### expansion.js:129

**Context:** regions → root → jobs

Protect the path used by food carriers.

### expansion.js:131

**Context:** regions → root → jobs

Recover the root nursery

### expansion.js:132

**Context:** regions → root → jobs

Move its seedlings with the keeper’s permission and its door key.

### expansion.js:134

**Context:** regions → root → jobs

Gather dormant spores

### expansion.js:134

**Context:** regions → root → jobs

Collect the fungus that pauses enchanted growth.

### expansion.js:135

**Context:** regions → root → jobs

Reach the buried well

### expansion.js:135

**Context:** regions → root → jobs

Free the well rope before the village runs out of clean water.

### expansion.js:136

**Context:** regions → root → jobs

Release the schoolhouse

### expansion.js:136

**Context:** regions → root → jobs

Apply the growth pause and unwind its roots by hand.

### expansion.js:138

**Context:** regions → root → jobs

Break the parasitic knot

### expansion.js:139

**Context:** regions → root → jobs

Kill the root parasite using the guild spell as its food source.

### expansion.js:141

**Context:** regions → root → jobs

Open the shelter trees

### expansion.js:141

**Context:** regions → root → jobs

Defend the pruning crew until the village gates are clear.

### expansion.js:143

**Context:** regions → root → jobs

Write a new planting agreement

### expansion.js:144

**Context:** regions → root → jobs

Return the growth spell with measured limits and local control.

### expansion.js:150

**Context:** regions → frost → name

The White Stair

### expansion.js:151

**Context:** regions → frost → keeper

Neris

### expansion.js:152

**Context:** regions → frost → localKeeper

Ansel

### expansion.js:154

**Context:** regions → frost → problem

An avalanche ward is trapping travellers in repeated snowfall. Its weather station lost the record that tells it when to stop.

### expansion.js:156

**Context:** regions → frost → ending

The ward now follows the mountain watch’s measurements. The pass is opened only after the avalanche poles are checked.

### expansion.js:157

**Context:** regions → frost → rooms

Frost laboratory

### expansion.js:157

**Context:** regions → frost → rooms

Mountain guesthouse

### expansion.js:157

**Context:** regions → frost → rooms

Snow observatory

### expansion.js:157

**Context:** regions → frost → rooms

Bell hospital

### expansion.js:160

**Context:** regions → frost → jobs

Count the repeated footprints

### expansion.js:161

**Context:** regions → frost → jobs

Locate the point where the mountain road begins repeating.

### expansion.js:164

**Context:** regions → frost → jobs

Bring supplies to the watch huts

### expansion.js:165

**Context:** regions → frost → jobs

Escort food through the storm to stranded watchkeepers.

### expansion.js:167

**Context:** regions → frost → jobs

Rescue Neris from the ice shelf

### expansion.js:167

**Context:** regions → frost → jobs

Cross the shelf before the ward resets the snowfall.

### expansion.js:168

**Context:** regions → frost → jobs

Recover the weather cylinder

### expansion.js:168

**Context:** regions → frost → jobs

Find the station’s missing measurement record.

### expansion.js:169

**Context:** regions → frost → jobs

Clear the frost spiders

### expansion.js:169

**Context:** regions → frost → jobs

Secure the station stair for the rescue team.

### expansion.js:171

**Context:** regions → frost → jobs

Recover the mountain guesthouse

### expansion.js:172

**Context:** regions → frost → jobs

Bring back its key and all travellers still sheltering inside.

### expansion.js:174

**Context:** regions → frost → jobs

Repair the avalanche poles

### expansion.js:174

**Context:** regions → frost → jobs

Replace the broken measuring poles along the ridge.

### expansion.js:175

**Context:** regions → frost → jobs

Recover the buried counterweight

### expansion.js:175

**Context:** regions → frost → jobs

Lift the mechanism that limits the ward’s snowfall.

### expansion.js:176

**Context:** regions → frost → jobs

Reach the storm engine

### expansion.js:176

**Context:** regions → frost → jobs

Cross the upper pass under attack from the rime wyvern.

### expansion.js:177

**Context:** regions → frost → jobs

Stop the repeating snowfall

### expansion.js:177

**Context:** regions → frost → jobs

Fit the cylinder while Neris holds the manual override.

### expansion.js:178

**Context:** regions → frost → jobs

Test the thaw route

### expansion.js:178

**Context:** regions → frost → jobs

Protect the mountain crew as they test the pass.

### expansion.js:180

**Context:** regions → frost → jobs

Reopen the white stair

### expansion.js:181

**Context:** regions → frost → jobs

Escort travellers down and return the station to the watchkeepers.

### expansion.js:187

**Context:** regions → clock → name

The Clockwork Ward

### expansion.js:188

**Context:** regions → clock → keeper

Perrin

### expansion.js:189

**Context:** regions → clock → localKeeper

Remi

### expansion.js:191

**Context:** regions → clock → problem

Mechanical guards are arresting residents under an expired guild charter. The courthouse clock never advanced past the emergency.

### expansion.js:193

**Context:** regions → clock → ending

The emergency charter is struck out in public. Perrin’s guards follow the town council’s current register.

### expansion.js:194

**Context:** regions → clock → rooms

Clock workshop

### expansion.js:194

**Context:** regions → clock → rooms

Brass court

### expansion.js:194

**Context:** regions → clock → rooms

Automaton stable

### expansion.js:194

**Context:** regions → clock → rooms

Timekeeper archive

### expansion.js:196

**Context:** regions → clock → jobs

Read the arrest notices

### expansion.js:196

**Context:** regions → clock → jobs

Compare the guards’ warrants with the town register.

### expansion.js:198

**Context:** regions → clock → jobs

Escort the detained bakers

### expansion.js:199

**Context:** regions → clock → jobs

Bring the first prisoners out through an unguarded service route.

### expansion.js:201

**Context:** regions → clock → jobs

Find Perrin’s missing key

### expansion.js:201

**Context:** regions → clock → jobs

Retrieve the court clock key from a sealed counting house.

### expansion.js:202

**Context:** regions → clock → jobs

Stop the brass patrol

### expansion.js:202

**Context:** regions → clock → jobs

Disable a patrol without destroying its memory plates.

### expansion.js:203

**Context:** regions → clock → jobs

Recover the emergency charter

### expansion.js:203

**Context:** regions → clock → jobs

Bring the original order to the town council.

### expansion.js:204

**Context:** regions → clock → jobs

Return the clock workshop

### expansion.js:204

**Context:** regions → clock → jobs

Detach its doorway after the apprentices have evacuated.

### expansion.js:205

**Context:** regions → clock → jobs

Release the courthouse cells

### expansion.js:205

**Context:** regions → clock → jobs

Reach the prisoner ledger and unlock each occupied cell.

### expansion.js:206

**Context:** regions → clock → jobs

Repair the council bell

### expansion.js:206

**Context:** regions → clock → jobs

Restore a public alarm controlled by the town.

### expansion.js:207

**Context:** regions → clock → jobs

Face the iron adjudicator

### expansion.js:207

**Context:** regions → clock → jobs

Disable the judge-machine guarding the clock mechanism.

### expansion.js:208

**Context:** regions → clock → jobs

Advance the courthouse clock

### expansion.js:208

**Context:** regions → clock → jobs

Turn the key and end the emergency date.

### expansion.js:209

**Context:** regions → clock → jobs

Rewrite the guard register

### expansion.js:209

**Context:** regions → clock → jobs

Defend Perrin while the council records its current laws.

### expansion.js:211

**Context:** regions → clock → jobs

Witness the first open hearing

### expansion.js:212

**Context:** regions → clock → jobs

Bring the saved memory plates to a public review of the arrests.

### expansion.js:218

**Context:** regions → deep → name

The Undersea Vault

### expansion.js:219

**Context:** regions → deep → keeper

Liora

### expansion.js:220

**Context:** regions → deep → localKeeper

Noma

### expansion.js:222

**Context:** regions → deep → problem

A sealed guild treasury is drawing seawater through the town’s wells. Its guardians mistake every rescue diver for a thief.

### expansion.js:224

**Context:** regions → deep → ending

The treasury valve is shut. Liora records the recovered property before any guild reward is paid.

### expansion.js:225

**Context:** regions → deep → rooms

Diving room

### expansion.js:225

**Context:** regions → deep → rooms

Pearl infirmary

### expansion.js:225

**Context:** regions → deep → rooms

Coral archive

### expansion.js:225

**Context:** regions → deep → rooms

Deep treasury

### expansion.js:227

**Context:** regions → deep → jobs

Taste the salt in the wells

### expansion.js:227

**Context:** regions → deep → jobs

Trace the seawater leak to the treasury conduit.

### expansion.js:228

**Context:** regions → deep → jobs

Evacuate the lower quay

### expansion.js:228

**Context:** regions → deep → jobs

Escort families before the next tide reaches their homes.

### expansion.js:229

**Context:** regions → deep → jobs

Find Liora’s dive team

### expansion.js:229

**Context:** regions → deep → jobs

Recover divers trapped beneath the cracked treasury roof.

### expansion.js:231

**Context:** regions → deep → jobs

Recover the ownership register

### expansion.js:232

**Context:** regions → deep → jobs

Retrieve the record of deposits before claiming any treasure.

### expansion.js:234

**Context:** regions → deep → jobs

Clear the coral sentinels

### expansion.js:234

**Context:** regions → deep → jobs

Secure a route to the pressure chamber.

### expansion.js:235

**Context:** regions → deep → jobs

Recover the diving room

### expansion.js:235

**Context:** regions → deep → jobs

Return its equipment and key to a dry guild landing.

### expansion.js:236

**Context:** regions → deep → jobs

Patch the town conduit

### expansion.js:236

**Context:** regions → deep → jobs

Fit a temporary sleeve to keep the wells usable.

### expansion.js:237

**Context:** regions → deep → jobs

Retrieve the pressure stones

### expansion.js:237

**Context:** regions → deep → jobs

Find the weights that hold the main valve shut.

### expansion.js:238

**Context:** regions → deep → jobs

Face the abyssal keeper

### expansion.js:238

**Context:** regions → deep → jobs

Clear the treasury guardian while the divers brace its roof.

### expansion.js:240

**Context:** regions → deep → jobs

Seal the treasury intake

### expansion.js:241

**Context:** regions → deep → jobs

Hold the valve chamber until Liora finishes the pressure test.

### expansion.js:243

**Context:** regions → deep → jobs

Return the deposited wealth

### expansion.js:243

**Context:** regions → deep → jobs

Escort the register and chests to their surviving owners.

### expansion.js:244

**Context:** regions → deep → jobs

Close the flooded vault

### expansion.js:244

**Context:** regions → deep → jobs

Inspect the wells and certify the town’s fresh water.

### expansion.js:249

**Context:** regions → star → name

The Fallen Star

### expansion.js:250

**Context:** regions → star → keeper

Sable

### expansion.js:251

**Context:** regions → star → localKeeper

Vale

### expansion.js:253

**Context:** regions → star → problem

A guild signal beacon fell into the hills. Its damaged transmitter calls predators from every connected road.

### expansion.js:255

**Context:** regions → star → ending

The transmitter is silent. Sable leaves a hand-operated signal lamp at each surviving road, with a keeper responsible for it.

### expansion.js:256

**Context:** regions → star → rooms

Star laboratory

### expansion.js:256

**Context:** regions → star → rooms

Sky infirmary

### expansion.js:256

**Context:** regions → star → rooms

Roadkeepers hall

### expansion.js:256

**Context:** regions → star → rooms

Dawn terrace

### expansion.js:258

**Context:** regions → star → jobs

Count the roads that answer

### expansion.js:258

**Context:** regions → star → jobs

Survey the lights responding to the fallen beacon.

### expansion.js:259

**Context:** regions → star → jobs

Escort the roadkeepers

### expansion.js:259

**Context:** regions → star → jobs

Bring the isolated watchkeepers back before the next signal.

### expansion.js:260

**Context:** regions → star → jobs

Find Sable’s wrecked camp

### expansion.js:260

**Context:** regions → star → jobs

Recover the beacon engineer and her field notes.

### expansion.js:261

**Context:** regions → star → jobs

Retrieve the signal prism

### expansion.js:261

**Context:** regions → star → jobs

Reach the broken transmitter’s cooling chamber.

### expansion.js:262

**Context:** regions → star → jobs

Clear the void moth swarm

### expansion.js:262

**Context:** regions → star → jobs

Protect the camps from creatures following the light.

### expansion.js:263

**Context:** regions → star → jobs

Return the star laboratory

### expansion.js:263

**Context:** regions → star → jobs

Carry its samples and key home under a covered lantern.

### expansion.js:265

**Context:** regions → star → jobs

Cut the eastern signal road

### expansion.js:266

**Context:** regions → star → jobs

Close the first connection after all its travellers return.

### expansion.js:268

**Context:** regions → star → jobs

Recover the hand lamps

### expansion.js:268

**Context:** regions → star → jobs

Retrieve the manual signals from the old roadkeeper store.

### expansion.js:269

**Context:** regions → star → jobs

Face the starved wyrm

### expansion.js:269

**Context:** regions → star → jobs

Clear the predator nesting on the transmitter roof.

### expansion.js:270

**Context:** regions → star → jobs

Disconnect the fallen beacon

### expansion.js:270

**Context:** regions → star → jobs

Defend Sable while she removes its power prism.

### expansion.js:272

**Context:** regions → star → jobs

Inspect every surviving road

### expansion.js:273

**Context:** regions → star → jobs

Escort local keepers as they take control of the remaining lamps.

### expansion.js:275

**Context:** regions → star → jobs

Light the dawn terrace

### expansion.js:275

**Context:** regions → star → jobs

Open a shared meeting place for the eight restored regions.

### expansion.js:281

**Context:** reports → fen

The water marks rose overnight. The pump outlet is feeding the village drains.

### expansion.js:282

**Context:** reports → fen

The school boat reached the relief camp with every child accounted for.

### expansion.js:283

**Context:** reports → fen

The folio identifies the reversing gear and the manual stop.

### expansion.js:284

**Context:** reports → fen

The diver was freed from the culvert and returned with a broken pressure gauge.

### expansion.js:285

**Context:** reports → fen

The intake is clear. Workers secured the floodgate before the eels were disturbed.

### expansion.js:286

**Context:** reports → fen

Tamsin returned the workshop key after the party disconnected its pump pipe.

### expansion.js:287

**Context:** reports → fen

The wolves were driven out of the camp. Food carriers have a guarded route.

### expansion.js:288

**Context:** reports → fen

The original copper impeller was recovered intact from the foundry.

### expansion.js:289

**Context:** reports → fen

New seals hold the channel closed under the temporary dam.

### expansion.js:290

**Context:** reports → fen

The false bell was a mimic attached to the alarm rope. The rope is now clear.

### expansion.js:291

**Context:** reports → fen

Tamsin reversed the drive while the party held the engine room.

### expansion.js:292

**Context:** reports → fen

The outflow stayed below the agreed water mark as the first families returned.

### expansion.js:295

**Context:** reports → ash

The scorched fields follow a buried fuel trench leading to the old furnace.

### expansion.js:296

**Context:** reports → ash

The grain carts and their drivers reached the stone road before the ground fire.

### expansion.js:297

**Context:** reports → ash

Kest’s patrol escaped the culvert with its fire measurements.

### expansion.js:298

**Context:** reports → ash

The cooling salts were recovered after the salamanders were driven from the kiln.

### expansion.js:299

**Context:** reports → ash

The western valve is shut. The orchard’s fuel branch has gone cold.

### expansion.js:300

**Context:** reports → ash

The forge cooled before its doorway and key were brought home.

### expansion.js:301

**Context:** reports → ash

The animated armour was disabled. The controller still carries the evacuation seal.

### expansion.js:302

**Context:** reports → ash

The signed watch order says to keep the furnace burning until an all-clear arrives.

### expansion.js:303

**Context:** reports → ash

The emergency reservoir still holds enough water to cool the engine.

### expansion.js:304

**Context:** reports → ash

Workers attached the cooling pipe behind the party’s guard line.

### expansion.js:305

**Context:** reports → ash

The cinder drake was cleared and the controller disconnected. The furnace cooled.

### expansion.js:306

**Context:** reports → ash

The farmers inspected every fuel inlet and sealed the trench.

### expansion.js:309

**Context:** reports → glass

Four supposedly missing ships are already in harbour. Their distress lights are copies.

### expansion.js:310

**Context:** reports → glass

The fishing boat reached harbour using measured bearings instead of the false beam.

### expansion.js:311

**Context:** reports → glass

Corin escaped the mirror caves with a fragment of the lighthouse lens.

### expansion.js:312

**Context:** reports → glass

The copied patrol dissolved when its reflecting panels were covered.

### expansion.js:313

**Context:** reports → glass

The ledger lists six lenses. The lighthouse is projecting a seventh beam.

### expansion.js:314

**Context:** reports → glass

The studio’s owner signed its release before its doorway was detached.

### expansion.js:315

**Context:** reports → glass

Fixed channel lamps now mark the rocks independently of the lighthouse.

### expansion.js:316

**Context:** reports → glass

The seventh lens was found beneath the foundation, reflecting the rescue register.

### expansion.js:317

**Context:** reports → glass

The night watch reached the true stair behind the party’s marked route.

### expansion.js:318

**Context:** reports → glass

The duplicate lens was shattered behind a screen protecting the real beacon.

### expansion.js:319

**Context:** reports → glass

Corin aligned the surviving beam with the harbour channel.

### expansion.js:320

**Context:** reports → glass

The convoy reached harbour. Every beacon matched the measured chart.

### expansion.js:323

**Context:** reports → root

All twelve families answered through the shelter roots. The schoolhouse is still occupied.

### expansion.js:324

**Context:** reports → root

Medicine reached the sick families through a supported canopy route.

### expansion.js:325

**Context:** reports → root

Asha was found in the blocked watch hut with her dormant-growth seeds.

### expansion.js:326

**Context:** reports → root

The pruning book specifies a growth pause before any branch is cut.

### expansion.js:327

**Context:** reports → root

The thorn hounds were cleared from the food carriers’ path.

### expansion.js:328

**Context:** reports → root

The seedlings and nursery key reached the guild without breaking their root beds.

### expansion.js:329

**Context:** reports → root

The collected spores paused enchanted growth in a test branch.

### expansion.js:330

**Context:** reports → root

The well rope was freed and clean water reached the relief station.

### expansion.js:331

**Context:** reports → root

The schoolhouse roots unwound while the growth pause held. Every pupil came out.

### expansion.js:332

**Context:** reports → root

The parasite was removed from the spell’s main root knot.

### expansion.js:333

**Context:** reports → root

The pruning crew opened the village gates without cutting load-bearing branches.

### expansion.js:334

**Context:** reports → root

The village keeps the spell, its limits and its stop procedure.

### expansion.js:337

**Context:** reports → frost

The same footprints appear twice above the lower station. The storm resets there.

### expansion.js:338

**Context:** reports → frost

The watch huts received food and fuel for another week.

### expansion.js:339

**Context:** reports → frost

Neris crossed the ice shelf behind the rescue party’s safety ropes.

### expansion.js:340

**Context:** reports → frost

The recovered cylinder records the last safe snowfall measurement.

### expansion.js:341

**Context:** reports → frost

The frost spiders were cleared from the weather station stair.

### expansion.js:342

**Context:** reports → frost

Every guest left before the guesthouse key and doorway were recovered.

### expansion.js:343

**Context:** reports → frost

Replacement avalanche poles now measure the full ridge.

### expansion.js:344

**Context:** reports → frost

The counterweight was lifted out of the snow and fitted to the limiting arm.

### expansion.js:345

**Context:** reports → frost

The rime wyvern was driven from the upper pass. The storm engine is accessible.

### expansion.js:346

**Context:** reports → frost

Neris fitted the cylinder and released the manual override. The snowfall stopped repeating.

### expansion.js:347

**Context:** reports → frost

The mountain crew marked a thaw route beneath the repaired poles.

### expansion.js:348

**Context:** reports → frost

Travellers reached the lower road after the pass inspection.

### expansion.js:351

**Context:** reports → clock

The warrants cite an emergency date thirty years older than the town register.

### expansion.js:352

**Context:** reports → clock

The detained bakers reached the council hall with copies of their warrants.

### expansion.js:353

**Context:** reports → clock

Perrin’s court-clock key was recovered from the counting house.

### expansion.js:354

**Context:** reports → clock

The patrol was disabled without erasing its arrest records.

### expansion.js:355

**Context:** reports → clock

The charter expires when the court clock advances beyond the emergency date.

### expansion.js:356

**Context:** reports → clock

The apprentices evacuated before the workshop doorway was detached.

### expansion.js:357

**Context:** reports → clock

The prisoner ledger was checked against every occupied cell. All listed prisoners were released.

### expansion.js:358

**Context:** reports → clock

The repaired bell is controlled from the council hall.

### expansion.js:359

**Context:** reports → clock

The adjudicator was disabled and its judgement plates preserved.

### expansion.js:360

**Context:** reports → clock

Perrin advanced the clock. The emergency charter expired.

### expansion.js:361

**Context:** reports → clock

The council entered its current laws into the guard register.

### expansion.js:362

**Context:** reports → clock

The saved plates were read aloud at the first open hearing.

### expansion.js:365

**Context:** reports → deep

Salt enters the wells through a conduit connected to the treasury intake.

### expansion.js:366

**Context:** reports → deep

The lower-quay families reached the upper shelters before the tide.

### expansion.js:367

**Context:** reports → deep

Liora’s divers were brought out from beneath the cracked roof.

### expansion.js:368

**Context:** reports → deep

The deposit register names the owners of every stored chest.

### expansion.js:369

**Context:** reports → deep

The coral sentinels were cleared from the pressure-chamber approach.

### expansion.js:370

**Context:** reports → deep

The diving room and its equipment were recovered onto a dry landing.

### expansion.js:371

**Context:** reports → deep

The temporary conduit sleeve kept seawater out of the town wells.

### expansion.js:372

**Context:** reports → deep

The pressure stones were recovered and placed beside the main valve.

### expansion.js:373

**Context:** reports → deep

The abyssal keeper was cleared while divers braced the treasury roof.

### expansion.js:374

**Context:** reports → deep

The intake stayed shut through Liora’s pressure test.

### expansion.js:375

**Context:** reports → deep

The recovered chests were returned against signed entries in the deposit register.

### expansion.js:376

**Context:** reports → deep

Every town well passed its fresh-water check after the vault was sealed.

### expansion.js:379

**Context:** reports → star

Eight roads answer the beacon. Three still carry isolated watchkeepers.

### expansion.js:380

**Context:** reports → star

The watchkeepers reached the camp before the next signal.

### expansion.js:381

**Context:** reports → star

Sable was rescued with notes identifying the damaged transmitter prism.

### expansion.js:382

**Context:** reports → star

The signal prism was recovered from the cooling chamber.

### expansion.js:383

**Context:** reports → star

The moth swarm was cleared and the camp lamps covered.

### expansion.js:384

**Context:** reports → star

The laboratory samples and doorway reached home under a covered lantern.

### expansion.js:385

**Context:** reports → star

The eastern road closed after its last travellers were counted home.

### expansion.js:386

**Context:** reports → star

The hand-operated lamps were recovered from the roadkeeper store.

### expansion.js:387

**Context:** reports → star

The wyrm was cleared from the transmitter roof.

### expansion.js:388

**Context:** reports → star

Sable removed the power prism while the party held the roof. The beacon fell silent.

### expansion.js:389

**Context:** reports → star

Each surviving road now has a local keeper and a manual lamp.

### expansion.js:390

**Context:** reports → star

Representatives of all eight regions met on the restored dawn terrace.

### expansion.js:395

**Context:** expansionRooms → id

Room

### expansion.js:399

**Context:** expansionRooms → anchor

Key

### expansion.js:400

**Context:** expansionRooms → operational

Room

### expansion.js:400

**Context:** expansionRooms → operational

Ready

### expansion.js:401

**Context:** expansionRooms → read

Room

### expansion.js:401

**Context:** expansionRooms → read

Read

### expansion.js:403

**Context:** expansionRooms → ruined

A locked room returned from

### expansion.js:404

**Context:** expansionRooms → restored

· maintained with

### expansion.js:413

**Context:** expansionMissions → report

The party recovered ⟦r.keeper⟧’s old guild field records. They identify the ward holding the guild’s missing room and the local controls that can make its return safe.

**Source template:**

```text
The party recovered ⟦r.keeper⟧’s old guild field records. They identify the ward holding the guild’s missing room and the local controls that can make its return safe.
```

### expansion.js:416

**Context:** expansionMissions → id

Quest

### expansion.js:417

**Context:** expansionMissions → name

Recover

### expansion.js:417

**Context:** expansionMissions → name

’s guild records

### expansion.js:424

**Context:** expansionMissions → requires

Step

### expansion.js:425

**Context:** expansionMissions → sets

Step

### expansion.js:425

**Context:** expansionMissions → sets

Key

### expansion.js:429

**Context:** expansionMissions → desc

Retrieve the field records of an old guild resident still trapped inside the house. These records help recover the room that holds them.

### expansion.js:434

**Context:** expansionMissions → arrival

The local keepers report:

### expansion.js:437

**Context:** expansionMissions → arrival

The signed record identifies the next repair or rescue.

### expansion.js:441

**Context:** expansionMissions → choices → public → label

File the report with the local keepers

### expansion.js:442

**Context:** expansionMissions → choices → public → preview

Share the evidence and give the settlement a copy. Gain community trust.

### expansion.js:447

**Context:** expansionMissions → choices → public → result

A signed account is left with the local keepers.

### expansion.js:451

**Context:** expansionMissions → choices → study → label

Record the mechanism and its failure

### expansion.js:452

**Context:** expansionMissions → choices → study → preview

Preserve the measurements for the guild’s repair crews. Gain knowledge.

### expansion.js:458

**Context:** expansionMissions → choices → study → result

The guild records the mechanism, its damage and its repair. Local keepers retain a copy.

### expansion.js:486

**Context:** people

Tamsin

### expansion.js:489

**Context:** people

Pump keeper who stayed to measure the rising water.

### expansion.js:492

**Context:** people

Rufus

### expansion.js:492

**Context:** people

Ferryman who carried the school to high ground.

### expansion.js:495

**Context:** people

Lark

### expansion.js:498

**Context:** people

Diver searching for the colleague lost in the culvert.

### expansion.js:503

**Context:** people

Kest

### expansion.js:506

**Context:** people

Firewatch captain who wants the furnace shut down safely.

### expansion.js:509

**Context:** people

Ves

### expansion.js:509

**Context:** people

Kiln apprentice carrying the last watch order.

### expansion.js:512

**Context:** people

Dara

### expansion.js:515

**Context:** people

Farm runner who knows the underground fuel routes.

### expansion.js:520

**Context:** people

Corin

### expansion.js:523

**Context:** people

Lens maker determined to restore one truthful beacon.

### expansion.js:528

**Context:** people

Fenn

### expansion.js:531

**Context:** people

Rescue sailor who has followed too many false lights.

### expansion.js:534

**Context:** people

Mira

### expansion.js:534

**Context:** people

Harbour guard protecting the lighthouse workers.

### expansion.js:537

**Context:** people

Asha

### expansion.js:540

**Context:** people

Seed keeper who knows how to pause the growth spell.

### expansion.js:545

**Context:** people

Bram

### expansion.js:548

**Context:** people

Village carpenter protecting the food carriers.

### expansion.js:553

**Context:** people

Sorrel

### expansion.js:556

**Context:** people

Herbalist reaching sick families through the canopy.

### expansion.js:561

**Context:** people

Neris

### expansion.js:564

**Context:** people

Weather keeper stranded by her own station’s broken ward.

### expansion.js:569

**Context:** people

Tor

### expansion.js:572

**Context:** people

Mountain porter who refuses to leave travellers behind.

### expansion.js:577

**Context:** people

Eda

### expansion.js:580

**Context:** people

Avalanche surveyor with a record of every broken pole.

### expansion.js:585

**Context:** people

Perrin

### expansion.js:588

**Context:** people

Clockmaker trying to end the expired emergency charter.

### expansion.js:593

**Context:** people

Joss

### expansion.js:596

**Context:** people

Former court guard who now escorts released prisoners.

### expansion.js:601

**Context:** people

Pip

### expansion.js:604

**Context:** people

Apprentice who mapped the courthouse service passages.

### expansion.js:609

**Context:** people

Liora

### expansion.js:612

**Context:** people

Treasury diver determined to return every recovered deposit.

### expansion.js:617

**Context:** people

Maro

### expansion.js:620

**Context:** people

Quay worker who braces the flooded vault roof.

### expansion.js:623

**Context:** people

Sal

### expansion.js:623

**Context:** people

Deep-water courier guiding trapped divers home.

### expansion.js:626

**Context:** people

Sable

### expansion.js:629

**Context:** people

Signal engineer carrying the plans for manual road lamps.

### expansion.js:634

**Context:** people

Wynn

### expansion.js:637

**Context:** people

Roadkeeper who held the camp against the beacon’s predators.

### expansion.js:642

**Context:** people

Tavi

### expansion.js:645

**Context:** people

Hill runner who counts travellers before closing a road.

### expansion.js:664

**Context:** lethalBounties → id

Bounty

### expansion.js:666

**Context:** lethalBounties → name

Hydra at the drowned mill

### expansion.js:667

**Context:** lethalBounties → name

Cinder drake’s hoard

### expansion.js:668

**Context:** lethalBounties → name

Leviathan on the glass reef

### expansion.js:669

**Context:** lethalBounties → name

The thorn king

### expansion.js:670

**Context:** lethalBounties → name

Rime wyvern on the ridge

### expansion.js:671

**Context:** lethalBounties → name

The iron adjudicator

### expansion.js:672

**Context:** lethalBounties → name

Abyssal guardian

### expansion.js:673

**Context:** lethalBounties → name

Wyrm of the fallen star

### expansion.js:683

**Context:** lethalBounties → desc

A dangerous optional hunt in

### expansion.js:685

**Context:** lethalBounties → desc

. Repeated harm can kill a resident. Withdraw while at least one party member remains conscious.

### expansion.js:686

**Context:** lethalBounties → checks → label

Combined Strength

### expansion.js:694

**Context:** label

Combined

## sprawl.js

### sprawl.js:5

**Context:** chambers → sluice → name

The old sluice works

### sprawl.js:12

**Context:** chambers → sluice → story

The drain wheel opened a passage the guild had bricked over. Maintenance chalk points toward a prison intake. A brass maintenance key hangs beside the pump: somebody used these drains to move prisoners without crossing the hall.

### sprawl.js:18

**Context:** chambers → cells → name

The abandoned holding cells

### sprawl.js:25

**Context:** chambers → cells → story

The cell doors are numbered with expedition dates. A scratched list names witnesses detained after they disputed the guild’s room claims. One prisoner hid a crypt key under a loose bunk board. The scratched testimony becomes part of the public register.

### sprawl.js:31

**Context:** chambers → ratway → name

The rat king’s cistern

### sprawl.js:38

**Context:** chambers → ratway → story

The cistern has swallowed the drain crew’s tools. The rat king nests around their supply chest. After clearing it, the guild recovers an enchanted spear and a map of the western spillway.

### sprawl.js:44

**Context:** chambers → crypt → name

The crypt of erased names

### sprawl.js:51

**Context:** chambers → crypt → story

Guild plaques were chiselled blank before the crypt was sealed. A surviving burial register supplies the missing names. Returning those names quiets the death ward; a memorial lantern marks a safe route deeper underground.

### sprawl.js:58

**Context:** chambers → ossuary → name

The bone library

### sprawl.js:65

**Context:** chambers → ossuary → story

Bone labels record the spells cast over each burial. A ledger distinguishes willing funeral rites from later experiments. The guild seals the experiment shelves and preserves the consent records. A protective pin rests inside the keeper’s desk.

### sprawl.js:70

**Context:** chambers → maze → name

The maze beyond the map

### sprawl.js:77

**Context:** chambers → maze → story

Ysra’s map stops at the doorway because this maze was built to hide its destination. Chalk routes reveal a stair going upward inside the wall. A broken survey instrument points to a buried treasury.

### sprawl.js:83

**Context:** chambers → oubliette → name

The oubliette beneath the well

### sprawl.js:90

**Context:** chambers → oubliette → story

The well shaft ends above a room without a door. A captive recorded the visiting keeper’s name on the bucket. The guild installs a permanent ladder so this room can never be used to hide a prisoner again.

### sprawl.js:96

**Context:** chambers → vault → name

The treasury under the roots

### sprawl.js:103

**Context:** chambers → vault → story

Roots have grown through the treasury locks. Deposit records identify the owners of its gold. The guild claims only its signed salvage fee and leaves the recovered ownership list with Mara. The keeper’s ring opens a secret passage into the wizard’s tower.

### sprawl.js:110

**Context:** chambers → fungus → name

The luminous fungal caverns

### sprawl.js:117

**Context:** chambers → fungus → story

The lights are living colonies, planted by an alchemist to clean the prison runoff. A control slate explains how to stop the toxic bloom without killing the filtration beds. The guild restores clean water to the deeper tunnels.

### sprawl.js:123

**Context:** chambers → rift → name

The drowned door between worlds

### sprawl.js:130

**Context:** chambers → rift → story

A disconnected guild door opens onto a sea held vertically in the frame. Behind it is the source of the salt in the lower drains. Closing its damaged feed valve stabilises the passage; the recovered staff can shield future expeditions.

### sprawl.js:136

**Context:** chambers → study → name

The wizard’s unfinished study

### sprawl.js:143

**Context:** chambers → study → story

Ada’s apprentice copied every test result here, including failures removed from the public archive. Her notebook shows that the tower has a second stair hidden behind the shelves. A lens reveals the writing erased from its diagrams.

### sprawl.js:149

**Context:** chambers → potions → name

The suspended potion kitchen

### sprawl.js:156

**Context:** chambers → potions → story

Bottles hang from the ceiling because the floor’s gravity changes when the cooker heats. The apprentice left a shutoff sequence on the cooling tiles. Once the sequence is followed, the guild recovers the protective cloak kept for kitchen accidents.

### sprawl.js:163

**Context:** chambers → mirror → name

The mirror that kept an afternoon

### sprawl.js:170

**Context:** chambers → mirror → story

The mirror repeats the afternoon before the evacuation. Its reflection shows Vey’s messenger carrying a warning past the study. Echo sight distinguishes the recorded messenger from the creature imitating them. A glass dagger is trapped behind the false reflection.

### sprawl.js:176

**Context:** chambers → summoning → name

The broken summoning theatre

### sprawl.js:183

**Context:** chambers → summoning → story

The containment circle is broken where somebody lifted the stone to hide a letter. The letter ordered the experiment stopped. After the trapped creature is cleared, the guild replaces the missing stone and keeps the letter with the evacuation record.

### sprawl.js:190

**Context:** chambers → menagerie → name

The moonlit menagerie

### sprawl.js:197

**Context:** chambers → menagerie → story

The cages contain animals collected from returned rooms. Their feeding records name the shores they came from. The guild stabilises the keeper’s walkways, frees the trapped attendants and prepares the creatures for return instead of adding them to its collection.

### sprawl.js:204

**Context:** chambers → orrery → name

The room orbiting its own ceiling

### sprawl.js:211

**Context:** chambers → orrery → story

The orrery was used to choose which distant rooms to collect. A ledger lists the households left without them. The guild disconnects its automatic selector and copies the routes for voluntary return journeys. A ring marks a secret stair down to the crypt.

### sprawl.js:219

**Context:** chambers → storm → name

The storm caught in a bottle

### sprawl.js:226

**Context:** chambers → storm → story

The bottle feeds the tower’s light and is cracked at its neck. The apprentice’s grounding instructions let the guild discharge the storm into the lightning rods. The recovered breastplate was designed for the person who had to hold the switch.

### sprawl.js:232

**Context:** chambers → stars → name

The observatory with no outside

### sprawl.js:239

**Context:** chambers → stars → story

Its windows show the destinations of every surviving guild door. The guild records which roads still have travellers before disconnecting the unsafe ones. Rowan sees the house as a network of places that need keepers, rather than a machine that needs one captive life.

### sprawl.js:262

**Context:** passages

Maintenance door · drain the cellar

### sprawl.js:271

**Context:** passages

Iron intake gate · maintenance key

### sprawl.js:280

**Context:** passages

Submerged spillway · Water breathing

### sprawl.js:282

**Context:** passages

Burial stair · crypt key

### sprawl.js:290

**Context:** passages

Funeral arch · burial register

### sprawl.js:299

**Context:** passages

False arch · Tracking / Echo sight / Threadwalk

### sprawl.js:309

**Context:** passages

Hidden well ladder · Tracking

### sprawl.js:319

**Context:** passages

Survey tunnel · recovered route

### sprawl.js:328

**Context:** passages

Filtration tunnel · maintenance key

### sprawl.js:337

**Context:** passages

Drowned tunnel · Water breathing

### sprawl.js:346

**Context:** passages

Wizard’s stair · Magical literacy

### sprawl.js:355

**Context:** passages

Hidden shelf stair · apprentice’s notes

### sprawl.js:365

**Context:** passages

Reflection stair · Echo sight

### sprawl.js:375

**Context:** passages

Rune stair · Magical literacy

### sprawl.js:384

**Context:** passages

Keeper’s bridge · circle key

### sprawl.js:393

**Context:** passages

Floating moon stair · Threadwalk

### sprawl.js:402

**Context:** passages

Counterweight stair · orrery key

### sprawl.js:411

**Context:** passages

Stair of lightning glass · Magical literacy

### sprawl.js:420

**Context:** passages

Secret chimney to the wizard’s study

### sprawl.js:430

**Context:** passages

Spiral inside the wall · down to the crypt

### sprawl.js:440

**Context:** passages

Astral funeral stair · observatory key

### sprawl.js:445

**Context:** enemies

Iron jailer

### sprawl.js:446

**Context:** enemies

Rat king of the cistern

### sprawl.js:447

**Context:** enemies

Warden of the erased crypt

### sprawl.js:448

**Context:** enemies

Shade in the oubliette

### sprawl.js:449

**Context:** enemies

Root-bound treasury mimic

### sprawl.js:450

**Context:** enemies

Cavern spore beast

### sprawl.js:451

**Context:** enemies

Keeper of the drowned rift

### sprawl.js:452

**Context:** enemies

The false messenger

### sprawl.js:453

**Context:** enemies

Fiend in the broken circle

### sprawl.js:454

**Context:** enemies

The bottled storm

### sprawl.js:479

**Context:** dungeonContracts → desc

An internal threat in

### sprawl.js:481

**Context:** dungeonContracts → desc

. Clearing it preserves progress on withdrawal and opens the room’s records and treasure.

### sprawl.js:482

**Context:** dungeonContracts → checks → label

Combined

### sprawl.js:485

**Context:** dungeonContracts → result

The party cleared

### sprawl.js:487

**Context:** dungeonContracts → result

from

### sprawl.js:489

**Context:** dungeonContracts → result

. Its records and treasure can now be investigated.

### sprawl.js:518

**Context:** passageError

Follow the story first:

### sprawl.js:519

**Context:** passageError

Find the key or clue first:

### sprawl.js:521

**Context:** passageError

Bring a resident with

### sprawl.js:523

**Context:** passageError

This passage needs Tracking, Echo sight or Threadwalk.

### sprawl.js:526

**Context:** passageError

Clear the room’s creature before using its deeper passage.

## story-model.js

### story-model.js:16

**Context:** task → next

decision

### story-model.js:17

**Context:** task → next

⟦names⟧ sent a report. Read it in Contracts and choose what they should do.

**Source template:**

```text
⟦names⟧ sent a report. Read it in Contracts and choose what they should do.
```

### story-model.js:18

**Context:** task → next

⟦names⟧ are on this journey. They are due back in ⟦m.remaining⟧ ⟦m.remaining === 1 ? 'day' : 'days'⟧. Advance the day when your work at home is finished.

**Source template:**

```text
⟦names⟧ are on this journey. They are due back in ⟦m.remaining⟧ ⟦m.remaining === 1 ? 'day' : 'days'⟧. Advance the day when your work at home is finished.
```

### story-model.js:18

**Context:** task → next

day

### story-model.js:18

**Context:** task → next

days

### story-model.js:19

**Context:** task → tab

Contracts

### story-model.js:22

**Context:** task → tab

Contracts

### story-model.js:29

**Context:** currentInvestigation → Repair the damaged guild rooms → title

Repair the damaged guild rooms

### story-model.js:31

**Context:** currentInvestigation → Repair the damaged guild rooms → summary

A home attack has damaged

### story-model.js:34

**Context:** currentInvestigation → Repair the damaged guild rooms → summary

service

### story-model.js:34

**Context:** currentInvestigation → Repair the damaged guild rooms → summary

the service room

### story-model.js:34

**Context:** currentInvestigation → Repair the damaged guild rooms → summary

quarters

### story-model.js:34

**Context:** currentInvestigation → Repair the damaged guild rooms → summary

the quarters

### story-model.js:37

**Context:** currentInvestigation → Repair the damaged guild rooms → summary

. Story work is blocked, even after the threat is cleared.

### story-model.js:38

**Context:** currentInvestigation → Repair the damaged guild rooms → next

Defend the guild if the attack is still active, then use the 30-gold room repair buttons in Contracts. Previous discoveries will be preserved.

### story-model.js:39

**Context:** currentInvestigation → Repair the damaged guild rooms → tab

Contracts

### story-model.js:44

**Context:** currentInvestigation → Defend the guild → title

Defend the guild

### story-model.js:46

**Context:** currentInvestigation → Defend the guild → summary

monster

### story-model.js:47

**Context:** currentInvestigation → Defend the guild → summary

A home threat is haunting the guildhall. It attacks a resident first, then damages a room on its next undefended day. Damaged rooms need repairs before story work can continue.

### story-model.js:48

**Context:** currentInvestigation → Defend the guild → summary

A wandering monster is attacking the gate. Each undefended day destroys up to 8 gold of supplies.

### story-model.js:49

**Context:** currentInvestigation → Defend the guild → summary

Away residents cannot defend the house.

### story-model.js:51

**Context:** currentInvestigation → Defend the guild → next

Defenders are fighting at home. Advance a day to continue; inspect daily injuries or withdraw residents from Contracts.

### story-model.js:52

**Context:** currentInvestigation → Defend the guild → next

Open Contracts and assign fit residents currently at home. Defence uses party stats and daily harm rolls.

### story-model.js:53

**Context:** currentInvestigation → Defend the guild → tab

Contracts

### story-model.js:58

**Context:** currentInvestigation → Clear the furnace dragon → title

Clear the furnace dragon

### story-model.js:60

**Context:** currentInvestigation → Clear the furnace dragon → summary

A dragon has nested in the guild’s old furnace. Its hoard cannot be inspected until the room is safe. Damage dealt by a clearing party is preserved when they withdraw.

### story-model.js:62

**Context:** currentInvestigation → Clear the furnace dragon → next

The clearing party has ⟦m.remaining⟧ days of work left. Advance days to fight, or withdraw any assigned resident immediately from Contracts.

**Source template:**

```text
The clearing party has ⟦m.remaining⟧ days of work left. Advance days to fight, or withdraw any assigned resident immediately from Contracts.
```

### story-model.js:63

**Context:** currentInvestigation → Clear the furnace dragon → next

Build a party in Contracts. The target is combined Strength 60 for a ten-day clearing plan; weaker parties take longer. Check the daily harm risk before assigning anyone.

### story-model.js:64

**Context:** currentInvestigation → Clear the furnace dragon → tab

Contracts

### story-model.js:79

**Context:** currentInvestigation

Open Contracts to send a party. High-risk later jobs can kill; retreat while someone is conscious.

### story-model.js:85

**Context:** currentInvestigation → Beyond the gate → title

Beyond the gate

### story-model.js:87

**Context:** currentInvestigation → Beyond the gate → summary

Rowan has left the estate without being pulled back. The replacement anchors are holding.

### story-model.js:88

**Context:** currentInvestigation → Beyond the gate → next

Continue guild work or follow unfinished personal leads.

### story-model.js:89

**Context:** currentInvestigation → Beyond the gate → tab

Contracts

### story-model.js:93

**Context:** currentInvestigation → Try the road → title

Try the road

### story-model.js:95

**Context:** currentInvestigation → Try the road → summary

The new anchors are holding the house without Rowan. The gate is open, but Rowan has not yet stepped through it.

### story-model.js:96

**Context:** currentInvestigation → Try the road → next

Control Rowan and walk left through the entrance gate.

### story-model.js:101

**Context:** currentInvestigation → Disconnect Rowan from the house → title

Disconnect Rowan from the house

### story-model.js:103

**Context:** currentInvestigation → Disconnect Rowan from the house → summary

The replacement anchor system has passed its tests. It can now take over from the spell keeping Rowan alive.

### story-model.js:105

**Context:** currentInvestigation → Disconnect Rowan from the house → next

Bring Rowan to the anchor table in the threshold chamber.

### story-model.js:106

**Context:** currentInvestigation → Disconnect Rowan from the house → next

Restore the threshold chamber for 220 gold, then bring Rowan to its anchor table.

### story-model.js:117

**Context:** currentInvestigation

Prepare the replacement anchors

### story-model.js:118

**Context:** currentInvestigation

The guild has sent a party to arrange a system that can support the house without Rowan.

### story-model.js:119

**Context:** currentInvestigation

Check Contracts for the party’s report.

### story-model.js:124

**Context:** currentInvestigation → Find a replacement for Rowan → title

Find a replacement for Rowan

### story-model.js:126

**Context:** currentInvestigation → Find a replacement for Rowan → summary

Halden’s recording explains the binding: he used Rowan to stabilise the house after the stair collapse. Removing it before another system is in place would kill Rowan.

### story-model.js:127

**Context:** currentInvestigation → Find a replacement for Rowan → next

Contracts has two preparation plans: anchors maintained by neighbouring settlements, or Ada’s mechanical seal. Either can support the house without Rowan.

### story-model.js:128

**Context:** currentInvestigation → Find a replacement for Rowan → tab

Contracts

### story-model.js:134

**Context:** currentInvestigation

Recover the infirmary recording

### story-model.js:135

**Context:** currentInvestigation

The restored observatory has located the infirmary where Rowan was treated during the disaster. Its damaged anchor is failing. A recording inside may explain why Rowan cannot leave.

### story-model.js:136

**Context:** currentInvestigation

Dispatch “The night they cut the road” from Contracts before the record is lost.

### story-model.js:140

**Context:** currentInvestigation

Visit Alder to recover the greenhouse anchor

### story-model.js:141

**Context:** currentInvestigation

restore the greenhouse for 150 gold

### story-model.js:142

**Context:** currentInvestigation

inspect the restored greenhouse

### story-model.js:143

**Context:** currentInvestigation

visit Elian’s watchtower for the observatory lens

### story-model.js:144

**Context:** currentInvestigation

restore the observatory for 180 gold

### story-model.js:145

**Context:** currentInvestigation

use the observatory lens

### story-model.js:147

**Context:** currentInvestigation → Follow the archive’s leads → title

Follow the archive’s leads

### story-model.js:149

**Context:** currentInvestigation → Follow the archive’s leads → summary

The archive records two pieces of the missing house: a greenhouse from Alder and an observatory lens held by lookout Elian. Its expedition notes also warn that the destination chosen for the last joining was inhabited.

### story-model.js:151

**Context:** currentInvestigation → Follow the archive’s leads → tab

Contracts

### story-model.js:156

**Context:** currentInvestigation → Open the returned archive → title

Open the returned archive

### story-model.js:158

**Context:** currentInvestigation → Open the returned archive → summary

Sera’s seal has brought the archive door back. Its locking spell is still active. The old expedition records are inside.

### story-model.js:160

**Context:** currentInvestigation → Open the returned archive → next

Inspect the records inside the archive.

### story-model.js:162

**Context:** currentInvestigation → Open the returned archive → next

The escorted archivist has supplied the seal diagrams. Take any available resident to the archive door and pay 110 gold for restoration.

### story-model.js:163

**Context:** currentInvestigation → Open the returned archive → next

Learn Magical literacy, use a trained resident, or escort the independent archivist in Contracts. Then restore the archive for 110 gold.

### story-model.js:170

**Context:** currentInvestigation

Find Captain Sera Venn

### story-model.js:171

**Context:** currentInvestigation

The landing inscription says the connecting road was cut deliberately to keep something outside. It names Sera Venn as the keeper of the chart. She may know where the missing archive went.

### story-model.js:172

**Context:** currentInvestigation

Send a party to find Sera on the coast: “The woman who charts absences” in Contracts.

### story-model.js:176

**Context:** currentInvestigation → Read the marks on the returned landing → title

Read the marks on the returned landing

### story-model.js:178

**Context:** currentInvestigation → Read the marks on the returned landing → summary

The anchor from Wren’s Crossing has reconnected the landing. Rowan can now walk beyond the old boundary, and the marks on its wall have become readable.

### story-model.js:179

**Context:** currentInvestigation → Read the marks on the returned landing → next

Control Rowan, walk onto the landing and press E at the inscription.

### story-model.js:186

**Context:** currentInvestigation

Recover the landing anchor

### story-model.js:187

**Context:** currentInvestigation

The ledger describes an enchanted brass fitting for the missing landing. Placing it in the socket beside the service room will bring that part of the house back. The fitting is at Wren’s Crossing, where the keeper offers to return it if the guild helps him reach the village bell.

### story-model.js:188

**Context:** currentInvestigation

Dispatch “The bell at Wren’s Crossing” from Contracts.

### story-model.js:192

**Context:** currentInvestigation → Search the service-room records → title

Search the service-room records

### story-model.js:194

**Context:** currentInvestigation → Search the service-room records → summary

The service room is safe to enter. Its shelves contain the old guild’s expedition records. One rack conceals a ledger.

### story-model.js:195

**Context:** currentInvestigation → Search the service-room records → next

Walk to the ledger in the service room and press E to read it.

### story-model.js:200

**Context:** currentInvestigation → Make the service room safe → title

Make the service room safe

### story-model.js:202

**Context:** currentInvestigation → Make the service room safe → summary

The sealed wall is open. Fallen timber and loose masonry still block the records inside. Mara can hire workers to shore the ceiling and clear the room.

### story-model.js:204

**Context:** currentInvestigation → Make the service room safe → next

Bring

### story-model.js:206

**Context:** currentInvestigation → Make the service room safe → next

gold to the opening in the service corridor and press E to restore the room. Contracts can fund the repair.

### story-model.js:211

**Context:** currentInvestigation → Get through the sealed wall → title

Get through the sealed wall

### story-model.js:213

**Context:** currentInvestigation → Get through the sealed wall → summary

Rowan cannot pass the end of the service corridor. Someone bricked up the adjoining room from the inside. The mortar is too thick to break without a strong resident.

### story-model.js:214

**Context:** currentInvestigation → Get through the sealed wall → next

Start with the wall survey and tool recovery in Contracts. Three varied early jobs can bring Bryn to Strength 10 through automatic growth; choosing Strength in Training can get there sooner. Then control Bryn and press E at the wall.

### story-model.js:218

**Context:** currentInvestigation → Someone beneath the workshop door → title

Someone beneath the workshop door

### story-model.js:220

**Context:** currentInvestigation → Someone beneath the workshop door → summary

Mara’s token has made the entrance reachable. A mason of the old guild is trapped beneath a door in a motionless fall. Rowan can release its latch.

### story-model.js:221

**Context:** currentInvestigation → Someone beneath the workshop door → next

Walk to the trapped figure in the entrance hall and press E to free Bryn.

### story-model.js:232

**Context:** characterAccount

mission:brynPast

### story-model.js:233

**Context:** characterAccount

Bryn recovered her father’s memorial. The apprentice was rescued by a second crew, but his leg was badly injured. She has entered his name and injury in the report.

### story-model.js:234

**Context:** characterAccount

Bryn helped rescue the trapped apprentice. Her father’s stone memorial broke during the rescue; she brought home rubbings of the surviving names.

### story-model.js:237

**Context:** characterAccount

Bryn recognised her father’s mason mark under the service-room plaster. He never returned from his last guild job. She wants to search the waystation where he was sent.

### story-model.js:241

**Context:** characterAccount

Bryn is repairing the quarters before searching the old records. Her shield was made from her father’s workshop door.

### story-model.js:242

**Context:** characterAccount

Bryn showed Rowan her father’s chisel mark on the workshop door she uses as a shield. Rowan agreed to tell her if his name turns up in the records.

### story-model.js:245

**Context:** characterAccount

Bryn was a mason of the old guild. The evacuation ward caught her beneath the workshop door she now carries as a shield. Her father did not return; the service room may contain his last work.

### story-model.js:249

**Context:** characterAccount

mission:nellPast

### story-model.js:250

**Context:** characterAccount

Nell has kept the shelter route off public maps. She will guide travellers herself and keeps the trader’s copy out of circulation.

### story-model.js:251

**Context:** characterAccount

Nell and the shelter keepers have published the travelling route. The shelters themselves are marked only on the keepers’ private copies.

### story-model.js:254

**Context:** characterAccount

Nell recognised a path on Sera’s chart. Her grandmother used it to guide displaced families around the old guild’s customs post. Nell wants to find out who is using the shelters now.

### story-model.js:257

**Context:** characterAccount

Nell was a guild pathfinder, trapped in a folded evacuation route behind the quarters curtain. Her grandmother refused commissions from the old guild. Nell’s shelter maps begin the search for the people she guided away.

### story-model.js:261

**Context:** characterAccount

mission:ivoPast

### story-model.js:262

**Context:** characterAccount

Ivo found Ada at the monastery and helped install a replacement seal. She chose to stay with a relief keeper. He brought her calculations back to the guild.

### story-model.js:263

**Context:** characterAccount

Ivo helped replace the seal Ada had been maintaining at the monastery. His former teacher has returned to the house with the calculations needed for a safer anchor.

### story-model.js:266

**Context:** characterAccount

Ivo recognised his teacher Ada’s handwriting in the archive. She dismissed a warning before the disaster. He wants to find her and ask what she knew.

### story-model.js:270

**Context:** characterAccount

Ivo is studying the wall inscriptions while Rowan keeps the binding off limits. He hopes the old records will lead to his missing teacher, Ada.

### story-model.js:271

**Context:** characterAccount

Ivo wants to understand Rowan’s binding. Rowan has agreed to experiments only after each procedure is explained. He is also searching for his missing teacher, Ada.

### story-model.js:274

**Context:** characterAccount

Ivo was Ada Merrow’s guild apprentice. An unfinished protective rune held him above the service-room shelves. Now free, he wants to learn what happened to his teacher during the years he missed.

### story-model.js:277

**Context:** characterAccount

Oren used a stone-skin spell to brace the cellar ceiling during the collapse. An iron casting ring jammed and kept the spell active. The repaired stair now supports the ceiling; removing the ring freed him.

### story-model.js:281

**Context:** characterAccount

He is checking the tower supports before anyone climbs. He asked for new timber and a second pair of hands.

### story-model.js:282

**Context:** characterAccount

He has drawn the old stair layout and marked the places where the supports failed.

### story-model.js:285

**Context:** characterAccount

His last memories before the stone-skin hardened are a warning bell and the rear stair collapsing.

### story-model.js:288

**Context:** characterAccount

Maelin sealed herself and the tower bell in a frost ward when the alarm began repeating without anyone pulling its rope. The ward stopped the bell but trapped her inside. Disabling its repeating rune let the ice thaw.

### story-model.js:292

**Context:** characterAccount

She is repairing the alarm so a person has to ring it; it can no longer repeat a sound from the walls.

### story-model.js:293

**Context:** characterAccount

She has written down the order she heard: disconnect the outer doors and clear the stairs.

### story-model.js:294

**Context:** characterAccount

She remembers the voice that gave the evacuation order that night.

### story-model.js:297

**Context:** characterAccount

Ysra linked her map to the house to guide people out while the corridors shifted. The map kept drawing her position after its exit disappeared, pulling her into the ink. Cancelling that tracking rune released her.

### story-model.js:301

**Context:** characterAccount

She is marking the labyrinth’s false turns with chalk so the next search party can find its way back.

### story-model.js:302

**Context:** characterAccount

She has reconstructed the route used on the night of the collapse. It ends at the missing infirmary.

### story-model.js:305

**Context:** characterAccount

The infirmary was the last place her map lost. She remembers who was still on its route.

### story-model.js:313

**Context:** knownHistory → events → Mara found the entrance → title

Mara found the entrance

### story-model.js:314

**Context:** knownHistory → events → Mara found the entrance → text

Mara is Halden’s adopted daughter, a craftswoman who grew up outside the severed guild. She inherited Halden’s brass guild token and brought it to the gate, making the estate reachable again. She now organises supplies and repairs at the doorstep while Rowan searches the house.

### story-model.js:319

**Context:** knownHistory → The service wall was opened → title

The service wall was opened

### story-model.js:321

**Context:** knownHistory → The service wall was opened → text

Workers cleared the fallen timber and secured the service room. Its records can be searched.

### story-model.js:322

**Context:** knownHistory → The service wall was opened → text

There is a room behind the wall. It needs shoring and clearance before its records can be searched.

### story-model.js:326

**Context:** knownHistory → The ledger named Wren’s Crossing → title

The ledger named Wren’s Crossing

### story-model.js:327

**Context:** knownHistory → The ledger named Wren’s Crossing → text

A landing anchor was recorded there. The ledger warns against reconnecting the larger threshold.

### story-model.js:331

**Context:** knownHistory → The landing returned → title

The landing returned

### story-model.js:332

**Context:** knownHistory → The landing returned → text

The Wren’s Crossing anchor reconnected a missing part of the estate and extended Rowan’s walking boundary.

### story-model.js:336

**Context:** knownHistory → The road was cut deliberately → title

The road was cut deliberately

### story-model.js:337

**Context:** knownHistory → The road was cut deliberately → text

The landing inscription says something was kept outside. It names Sera Venn as the keeper of the chart.

### story-model.js:341

**Context:** knownHistory → The archive contradicted the official account → title

The archive contradicted the official account

### story-model.js:342

**Context:** knownHistory → The archive contradicted the official account → text

Witness corrections identify disputed removals from Alder and a warning ignored before the last joining.

### story-model.js:346

**Context:** knownHistory → title

The furnace dragon was killed

### story-model.js:346

**Context:** knownHistory → title

A dragon is occupying the furnace

### story-model.js:348

**Context:** knownHistory → text

The nest held 240 gold and the guild’s missing forge tools. The room is safe.

### story-model.js:349

**Context:** knownHistory → text

The dragon’s hoard is uninspected. A high-risk clearing contract is available; wounded parties can withdraw and resume later.

### story-model.js:352

**Context:** knownHistory → completed

Step

### story-model.js:362

**Context:** knownHistory → text

The guild has completed

### story-model.js:364

**Context:** knownHistory → text

stages of the repair and rescue effort.

### story-model.js:369

**Context:** knownHistory → Halden’s recording explained the binding → title

Halden’s recording explained the binding

### story-model.js:370

**Context:** knownHistory → Halden’s recording explained the binding → text

Rowan was injured on the stair. Halden bound Rowan’s life to the house to keep them alive. Vey ordered the connecting road cut.

### story-model.js:379

**Context:** optionalHouseLeads → Drain the flooded cellar → title

Drain the flooded cellar

### story-model.js:380

**Context:** optionalHouseLeads → Drain the flooded cellar → text

Train Ivo to level 3 and learn Water breathing, or use Maelin. Dive from the dry landing, find the labelled drain wheel beside the ship and press E. Opening the sluice drains the room permanently so everyone can enter.

### story-model.js:384

**Context:** optionalHouseLeads → title

Free the stone mason

### story-model.js:384

**Context:** optionalHouseLeads → title

The figure on the cellar landing

### story-model.js:386

**Context:** optionalHouseLeads → text

Oren’s casting ring is jammed. A resident with Strength 10 can remove it once the stair repairs are supporting the ceiling.

### story-model.js:387

**Context:** optionalHouseLeads → text

The repaired stairs lead to a dry landing with a human figure standing beneath a broken beam. Investigate it with E.

### story-model.js:391

**Context:** optionalHouseLeads → The stair above the quarters → title

The stair above the quarters

### story-model.js:393

**Context:** optionalHouseLeads → The stair above the quarters → text

Wren’s keeper returned the bell-tower key with the brass fitting. The quarters hatch can now be opened. Repairing its supports costs

### story-model.js:394

**Context:** optionalHouseLeads → The stair above the quarters → text

oren

### story-model.js:394

**Context:** optionalHouseLeads → The stair above the quarters → text

home

### story-model.js:395

**Context:** optionalHouseLeads → The stair above the quarters → text

gold. Use E at its foot, then W to climb.

### story-model.js:399

**Context:** optionalHouseLeads → Search the bell tower → title

Search the bell tower

### story-model.js:400

**Context:** optionalHouseLeads → Search the bell tower → text

The lower landing is connected. Climb again at the stair to reach the bell chamber.

### story-model.js:404

**Context:** optionalHouseLeads → Break the frost ward → title

Break the frost ward

### story-model.js:405

**Context:** optionalHouseLeads → Break the frost ward → text

Maelin is trapped with the bell at the tower crown. Magical literacy, or diagrams supplied by the escorted independent archivist, disables the repeating frost rune.

### story-model.js:409

**Context:** optionalHouseLeads → The thread below the cellar → title

The thread below the cellar

### story-model.js:410

**Context:** optionalHouseLeads → The thread below the cellar → text

Wren’s keeper returned the labyrinth gate key. The labelled gate is on the dry cellar landing. Use E there to unlock the lower passage.

### story-model.js:414

**Context:** optionalHouseLeads → Find the stair hidden in the labyrinth → title

Find the stair hidden in the labyrinth

### story-model.js:415

**Context:** optionalHouseLeads → Find the stair hidden in the labyrinth → text

The upper passage ends at a false floor. Tracking or Maelin’s Echo sight can reveal the lower stair.

### story-model.js:419

**Context:** optionalHouseLeads → Release the cartographer → title

Release the cartographer

### story-model.js:420

**Context:** optionalHouseLeads → Release the cartographer → text

Ysra is caught in the living map at the labyrinth heart. Use Magical literacy or the independent archivist’s annotated diagrams to cancel its tracking rune.

### story-model.js:424

**Context:** optionalHouseLeads → The warm iron door → title

The warm iron door

### story-model.js:425

**Context:** optionalHouseLeads → The warm iron door → text

An iron door at the east end of the lower labyrinth is warm to the touch. Investigate it with E.

## domain.js

### domain.js:82

**Context:** recruits → bryn → name

Bryn

### domain.js:89

**Context:** recruits → bryn → bio

A mason’s daughter who carries a shield made from a door. She came to repair the guild’s reputation, one paid job at a time.

### domain.js:93

**Context:** recruits → nell → name

Nell

### domain.js:100

**Context:** recruits → nell → bio

A local guide who remembers paths that the maps have forgotten. Her grandmother once sheltered a returning guild party.

### domain.js:104

**Context:** recruits → ivo → name

Ivo

### domain.js:111

**Context:** recruits → ivo → bio

An apprentice archivist searching for a missing teacher. He suspects the house’s silence is a language.

### domain.js:121

**Context:** contracts → road → name

Lanterns on the old road

### domain.js:126

**Context:** contracts → road → desc

Escort the lamplighter along the abandoned guild road. Reliable work keeps a little light in the valley.

### domain.js:128

**Context:** contracts → road → checks → label

Agility 7 crosses the loose scree

### domain.js:129

**Context:** contracts → road → checks → label

Endurance 7 protects the lamplighter

### domain.js:135

**Context:** contracts → quarry → name

The hollow quarry

### domain.js:140

**Context:** contracts → quarry → desc

Recover tools from a quarry whose echoes answer a heartbeat late. Tracking finds a hidden cache.

### domain.js:142

**Context:** contracts → quarry → checks → label

Strength 9 secures the falling stone

### domain.js:143

**Context:** contracts → quarry → checks → label

Guard shields the party

### domain.js:149

**Context:** contracts → anchor → name

The bell at Wren’s Crossing

### domain.js:158

**Context:** contracts → anchor → desc

The keeper at Wren’s Crossing needs help reaching the village bell across a damaged bridge. In return, he offers the enchanted brass fitting that can restore the guild’s missing landing.

### domain.js:160

**Context:** contracts → anchor → checks → label

Agility 7 crosses the unstable bridge

### domain.js:161

**Context:** contracts → anchor → checks → label

Intellect 7 identifies a safe route

### domain.js:164

**Context:** contracts → anchor → arrival

The keeper has waited thirty years beside a bell without a clapper. When the guild token approaches, the bell rings.
“The old guild saved our children,” he says. “Then it took the shore they played on. There is room in a story for both.”
He offers the small anchor willingly. A voice beneath the bell asks you to listen longer. It sounds almost like someone you once knew.

### domain.js:168

**Context:** contracts → anchor → choices → safe → label

Accept the anchor and the keeper’s warning

### domain.js:169

**Context:** contracts → anchor → choices → safe → preview

Recover the landing. Honour the keeper’s boundary and gain community trust.

### domain.js:172

**Context:** contracts → anchor → choices → safe → result

The keeper wraps the anchor in a sailcloth. The party leaves the great threshold closed. He asks the new guild to return with questions instead of claims. The landing comes home carrying a chair that has waited longer than anyone should.

### domain.js:176

**Context:** contracts → anchor → choices → deep → label

Listen longer; keep the threshold shut

### domain.js:178

**Context:** contracts → anchor → choices → deep → preview

Recover the same landing, a disturbing clue and 20 extra gold. Gain knowledge of the voice without opening its road.

### domain.js:183

**Context:** contracts → anchor → choices → deep → result

The bell answers in a familiar voice, then another, then a voice no one recognises. “Let me finish coming home.” The party records the sound and closes the case. Nothing is invited through. The keeper looks relieved that curiosity has not become permission.

### domain.js:189

**Context:** contracts → outsideArchivist → name

Escort an independent archivist

### domain.js:200

**Context:** contracts → outsideArchivist → checks → label

Endurance 14 protects the scholar and their equipment

### domain.js:203

**Context:** contracts → outsideArchivist → desc

If nobody learned Magical literacy, escort an outside scholar to the guild. Their annotated seal diagrams open the archive and release the tower and map-room wards. Costs 50 gold and exposes a party for four base days; learning literacy avoids this detour.

### domain.js:205

**Context:** contracts → outsideArchivist → result

The independent archivist reaches the guild with annotated seal diagrams. Mara records their fee and gives them a desk beside the returned archive. The guild can now open its archive and release the sealed residents without teaching anyone Magical literacy.

### domain.js:221

**Context:** skills → warrior → guard → name

Guard

### domain.js:222

**Context:** skills → warrior → guard → desc

Protects the party from falling stone and escorts travellers safely.

### domain.js:229

**Context:** skills → scout → tracking → name

Tracking

### domain.js:230

**Context:** skills → scout → tracking → desc

Finds quarry caches, safe paths and shelter routes.

### domain.js:237

**Context:** skills → mage → literacy → name

Magical literacy

### domain.js:238

**Context:** skills → mage → literacy → desc

Opens the returned archive and distinguishes safe seals from false commands.

### domain.js:243

**Context:** skills → mage → water → name

Water breathing

### domain.js:244

**Context:** skills → mage → water → desc

Traverses the water beyond the dry cellar landing and explores the ship fragment.

### domain.js:302

**Context:** initial → journal → kind

Observed

### domain.js:303

**Context:** initial → journal → text

Mara introduced herself at the gate: Halden raised her outside the severed guild. She brought the brass guild token she inherited from them. For the first time in decades, the entrance holds steady. She is arranging supplies and repairs at the doorstep.

### domain.js:314

**Context:** home → rowan → name

Rowan

### domain.js:315

**Context:** home → rowan → type

bound survivor

### domain.js:327

**Context:** home

home

### domain.js:345

**Context:** pay

Need ⟦n⟧ gold; you have ⟦s.gold⟧.

**Source template:**

```text
Need ⟦n⟧ gold; you have ⟦s.gold⟧.
```

### domain.js:356

**Context:** note

Observed

### domain.js:364

**Context:** resident

Find this resident in the guild first.

### domain.js:369

**Context:** readyResident

This resident must be at home and fit.

### domain.js:377

**Context:** visitFloor

This floor is not connected.

### domain.js:382

**Context:** visitFloor

The tower crown holds a bell encased in ice. A woman holds its clapper as if the alarm must never ring.

### domain.js:383

**Context:** visitFloor

The labyrinth heart is a map room. Living ink holds a cartographer inside the route she refused to draw.

### domain.js:384

**Context:** visitFloor

Discovery

### domain.js:391

**Context:** enterPassage

Walk to the labelled passage first.

### domain.js:393

**Context:** enterPassage

Rowan is still bound to the entrance. Send an adventurer.

### domain.js:399

**Context:** enterPassage

Reach this part of the guild first.

### domain.js:410

**Context:** enterPassage

discovered.

### domain.js:412

**Context:** enterPassage

A creature guards its records. Assign a clearing party in Contracts.

### domain.js:414

**Context:** enterPassage

The room contains a

### domain.js:416

**Context:** enterPassage

trap.

### domain.js:418

**Context:** enterPassage

or appropriate trap training can disarm it.

### domain.js:419

**Context:** enterPassage

Its records and treasure remain to be investigated.

### domain.js:420

**Context:** enterPassage

Dungeon discovery

### domain.js:425

**Context:** enterPassage → body

Beyond

### domain.js:427

**Context:** enterPassage → body

lies

### domain.js:431

**Context:** enterPassage → body

Movement inside forces the explorer to stop at the entrance. A clearing contract is now available.

### domain.js:433

**Context:** enterPassage → body

Marks around the mechanism warn of a

### domain.js:435

**Context:** enterPassage → body

trap. Bring the right skill before investigating.

### domain.js:436

**Context:** enterPassage → body

The explorer marks a return route before approaching the surviving records.

### domain.js:448

**Context:** leaveChamber

No marked return route.

### domain.js:454

**Context:** investigateChamber

Discover this room first.

### domain.js:456

**Context:** investigateChamber

The room’s records and treasure are already recovered.

### domain.js:458

**Context:** investigateChamber

Repair the damaged guild rooms before continuing investigations.

### domain.js:459

**Context:** investigateChamber

Clear the room’s creature first.

### domain.js:466

**Context:** investigateChamber

The

### domain.js:468

**Context:** investigateChamber

trap needs

### domain.js:471

**Context:** investigateChamber

Lockcraft

### domain.js:471

**Context:** investigateChamber

Rune thief

### domain.js:472

**Context:** investigateChamber

. Investigating without it is unsafe.

### domain.js:488

**Context:** investigateChamber

Recovered

### domain.js:488

**Context:** investigateChamber

; it is now in the store room.

### domain.js:490

**Context:** investigateChamber

A labelled key or route clue opens the next passage.

### domain.js:491

**Context:** investigateChamber

Dungeon record

### domain.js:494

**Context:** investigateChamber → title

Investigation:

### domain.js:498

**Context:** investigateChamber → body

Recovered

### domain.js:498

**Context:** investigateChamber → body

. Visit the shared store to equip it.

### domain.js:500

**Context:** investigateChamber → body

The recovered key or route clue now unlocks a labelled passage.

### domain.js:505

**Context:** discoverSleeper

This discovery is not accessible.

### domain.js:506

**Context:** discoverSleeper

Already investigated.

### domain.js:508

**Context:** discoverSleeper → text

⟦d.name⟧ · ⟦d.condition⟧. ⟦d.bio⟧ Awakening: ⟦d.method⟧.

**Source template:**

```text
⟦d.name⟧ · ⟦d.condition⟧. ⟦d.bio⟧ Awakening: ⟦d.method⟧.
```

### domain.js:509

**Context:** discoverSleeper

Discovery

### domain.js:510

**Context:** discoverSleeper → title

Someone is still here:

### domain.js:534

**Context:** awaken

Awakening

### domain.js:535

**Context:** awaken → title

awakens

### domain.js:540

**Context:** recruit

Resident unavailable.

### domain.js:557

**Context:** recruit

⟦r.name⟧ returned to the guild.

**Source template:**

```text
⟦r.name⟧ returned to the guild.
```

### domain.js:557

**Context:** recruit

Resident

### domain.js:562

**Context:** recoverResident

This resident’s room is not accessible or they are already free.

### domain.js:564

**Context:** recoverResident

Walk to the trapped resident first.

### domain.js:571

**Context:** recoverResident

Resident discovery

### domain.js:573

**Context:** recoverResident → title

returns

### domain.js:581

**Context:** advance

Skill already learned or unavailable.

### domain.js:582

**Context:** advance

Unknown stat.

### domain.js:586

**Context:** advance

An unspent level choice and its skill requirements are needed.

### domain.js:595

**Context:** advance

for level

### domain.js:597

**Context:** advance

. Other choices for that level are closed.

### domain.js:598

**Context:** advance

Training choice

### domain.js:604

**Context:** specialise

Choose an available class branch at level 3.

### domain.js:609

**Context:** specialise

chose the

### domain.js:609

**Context:** specialise

path. Future levels use its stat growth.

### domain.js:610

**Context:** specialise

Class choice

### domain.js:617

**Context:** learnTalent

A class talent choice and its prerequisites are required.

### domain.js:622

**Context:** learnTalent

Class skill

### domain.js:640

**Context:** castRestoration

Choose a wounded companion within reach; one spell per caster each day.

### domain.js:669

**Context:** castRestoration

Restoration

### domain.js:674

**Context:** recoverRemains

No missing remains to recover.

### domain.js:676

**Context:** recoverRemains

The fallen resident is still with an active party. Withdraw its survivors first.

### domain.js:677

**Context:** recoverRemains

Recovery crew for

### domain.js:686

**Context:** recoverRemains

Mara’s recovery crew brought

### domain.js:686

**Context:** recoverRemains

and their equipment home.

### domain.js:687

**Context:** recoverRemains

Remains recovered

### domain.js:701

**Context:** raiseDead

Raise dead needs a rested necromancer and recovered mortal remains at home.

### domain.js:702

**Context:** raiseDead

Raise dead ·

### domain.js:720

**Context:** raiseDead

Reanimated zombie

### domain.js:723

**Context:** raiseDead → text

Returned as a zombie through

### domain.js:723

**Context:** raiseDead → text

’s death magic.

### domain.js:730

**Context:** raiseDead

as a zombie. Their living class abilities are gone. They have stronger bodies, reduced agility and intellect, and need repairs instead of natural healing.

### domain.js:731

**Context:** raiseDead

Reanimation

### domain.js:736

**Context:** buyEquipment

Unknown equipment.

### domain.js:737

**Context:** buyEquipment

placed in store room

### domain.js:746

**Context:** enterStore

Restore the service room to unlock its adjoining store room.

### domain.js:747

**Context:** enterStore

Repair the service room before opening the store.

### domain.js:755

**Context:** equipItem

This resident must enter the store room.

### domain.js:757

**Context:** equipItem

Item is not in storage.

### domain.js:758

**Context:** equipItem

Unequip the current item first.

### domain.js:765

**Context:** unequip

This resident must enter the store room.

### domain.js:767

**Context:** unequip

No equipped item.

### domain.js:792

**Context:** applyHarm

died on

### domain.js:792

**Context:** applyHarm

. Their name remains in the guild register.

### domain.js:793

**Context:** applyHarm

Death

### domain.js:814

**Context:** repairDamage

This room is not damaged.

### domain.js:815

**Context:** repairDamage

Repair ghost damage ·

### domain.js:819

**Context:** repairDamage

⟦id === 'service' ? 'Service room' : id === 'quarters' ? 'Quarters' : rooms.find((r) => r.id === id).name⟧ repaired. Its previous story progress is preserved.

**Source template:**

```text
⟦id === 'service' ? 'Service room' : id === 'quarters' ? 'Quarters' : rooms.find((r) => r.id === id).name⟧ repaired. Its previous story progress is preserved.
```

### domain.js:819

**Context:** repairDamage

Service room

### domain.js:819

**Context:** repairDamage

Quarters

### domain.js:820

**Context:** repairDamage

Room repaired

### domain.js:851

**Context:** risk

Unknown contract.

### domain.js:860

**Context:** risk → reasons

Party ⟦result.requirement.stat.toUpperCase()⟧ ⟦result.combined⟧ / ⟦result.requirement.amount⟧

**Source template:**

```text
Party ⟦result.requirement.stat.toUpperCase()⟧ ⟦result.combined⟧ / ⟦result.requirement.amount⟧
```

### domain.js:862

**Context:** risk → reasons

No progress without the required stat

### domain.js:863

**Context:** risk → reasons

⟦result.days⟧ days · ⟦result.threat⟧% harm chance each day

**Source template:**

```text
⟦result.days⟧ days · ⟦result.threat⟧% harm chance each day
```

### domain.js:865

**Context:** risk → reasons

⟦r.label⟧: −⟦Math.round(r.amount * 10) / 10⟧ percentage points

**Source template:**

```text
⟦r.label⟧: −⟦Math.round(r.amount * 10) / 10⟧ percentage points
```

### domain.js:879

**Context:** dispatch

Contract unavailable or already completed.

### domain.js:885

**Context:** dispatch

One final preparation is already underway. Finish it before choosing another method.

### domain.js:888

**Context:** dispatch

Choose a distinct party within capacity.

### domain.js:891

**Context:** dispatch

All party members must be fit and at home.

### domain.js:894

**Context:** dispatch

⟦recruits.find((c) => c.id === def.personal).name⟧ must join their personal expedition.

**Source template:**

```text
⟦recruits.find((c) => c.id === def.personal).name⟧ must join their personal expedition.
```

### domain.js:899

**Context:** dispatch

This party has no usable

### domain.js:901

**Context:** dispatch

. It cannot make progress.

### domain.js:904

**Context:** dispatch

⟦def.name⟧: preparation⟦supplies ? ' and one medical kit' : ''⟧

**Source template:**

```text
⟦def.name⟧: preparation⟦supplies ? ' and one medical kit' : ''⟧
```

### domain.js:904

**Context:** dispatch

and one medical kit

### domain.js:929

**Context:** dispatch

· party plan:

### domain.js:931

**Context:** dispatch

. These abilities affect work, protection or emergency survival on this journey.

### domain.js:932

**Context:** dispatch

Class plan

### domain.js:936

**Context:** dispatch → uid

⟦s.day⟧-⟦s.seed⟧

**Source template:**

```text
⟦s.day⟧-⟦s.seed⟧
```

### domain.js:955

**Context:** dispatch

⟦party.map((c) => c.name).join(', ')⟧ ⟦def.internal ? 'began clearing' : 'departed for'⟧ ⟦def.name⟧. Estimated ⟦assessment.days⟧ days at ⟦assessment.threat⟧% daily harm risk.

**Source template:**

```text
⟦party.map((c) => c.name).join(', ')⟧ ⟦def.internal ? 'began clearing' : 'departed for'⟧ ⟦def.name⟧. Estimated ⟦assessment.days⟧ days at ⟦assessment.threat⟧% daily harm risk.
```

### domain.js:955

**Context:** dispatch

began clearing

### domain.js:955

**Context:** dispatch

departed for

### domain.js:956

**Context:** dispatch

Assignment

### domain.js:984

**Context:** withdraw

No active party to withdraw.

### domain.js:986

**Context:** withdraw

Nobody is conscious enough to lead a withdrawal.

### domain.js:988

**Context:** withdraw

An external party must retreat together, carrying its wounded.

### domain.js:1000

**Context:** withdraw

The party is withdrawing from

### domain.js:1002

**Context:** withdraw

. Conscious survivors carry the wounded; they return in one day, or immediately with Escape artist. No reward is paid.

### domain.js:1003

**Context:** withdraw

Withdrawal

### domain.js:1013

**Context:** withdraw

Choose assigned members of this party.

### domain.js:1036

**Context:** withdraw

⟦names.join(', ')⟧ withdrew from ⟦def.name⟧. Damage already dealt is preserved; no reward has been claimed.

**Source template:**

```text
⟦names.join(', ')⟧ withdrew from ⟦def.name⟧. Damage already dealt is preserved; no reward has been claimed.
```

### domain.js:1037

**Context:** withdraw

Withdrawal

### domain.js:1041

**Context:** withdraw → title

Withdrawal:

### domain.js:1042

**Context:** withdraw → text

⟦names.join(', ')⟧ returned from the guild defence. Clearing progress: ⟦Math.floor((m.progress / (def.days * profiles[def.id].amount)) * 100)⟧%. Injuries remain and require recovery.

**Source template:**

```text
⟦names.join(', ')⟧ returned from the guild defence. Clearing progress: ⟦Math.floor((m.progress / (def.days * profiles[def.id].amount)) * 100)⟧%. Injuries remain and require recovery.
```

### domain.js:1069

**Context:** applyChoice

Decision

### domain.js:1075

**Context:** outcomeText

Bryn closes the journal

### domain.js:1075

**Context:** outcomeText

Mara closes the journal

### domain.js:1077

**Context:** outcomeText

Bryn turns one key and Mara the other

### domain.js:1078

**Context:** outcomeText

Mara turns one key and an outside keeper the other

### domain.js:1082

**Context:** outcomeText

Bryn asks to put the memorial rubbing where a patient can read it without sitting up.

### domain.js:1083

**Context:** outcomeText

Mara puts the guild’s corrected register where a patient can read it without sitting up.

### domain.js:1109

**Context:** resolve

Class salvage skills recovered

### domain.js:1109

**Context:** resolve

extra gold.

### domain.js:1113

**Context:** resolve

Tracking uncovered a cache: +20 gold.

### domain.js:1119

**Context:** resolve

⟦party[0].name⟧ was injured: ⟦assessment.injuryDays⟧ days of recovery. The party lacked the recommended capability.

**Source template:**

```text
⟦party[0].name⟧ was injured: ⟦assessment.injuryDays⟧ days of recovery. The party lacked the recommended capability.
```

### domain.js:1124

**Context:** resolve

The party’s capabilities secured a safe passage.

### domain.js:1126

**Context:** resolve

Medical supplies prevented a lasting injury.

### domain.js:1127

**Context:** resolve

A fortunate passage avoided injury.

### domain.js:1130

**Context:** resolve

Completed after ⟦m.elapsed⟧ working days. ⟦m.harm.length⟧ daily harm events.

**Source template:**

```text
Completed after ⟦m.elapsed⟧ working days. ⟦m.harm.length⟧ daily harm events.
```

### domain.js:1133

**Context:** resolve

Day ⟦hit.day⟧: ⟦resident(s, hit.id).name⟧ was hurt⟦hit.treated ? ' · medical kit used' : ` · ${hit.injuryDays} recovery days added`⟧.

**Source template:**

```text
Day ⟦hit.day⟧: ⟦resident(s, hit.id).name⟧ was hurt⟦hit.treated ? ' · medical kit used' : ` · ${hit.injuryDays} recovery days added`⟧.
```

### domain.js:1133

**Context:** resolve

· medical kit used

### domain.js:1133

**Context:** resolve

· ⟦hit.injuryDays⟧ recovery days added

**Source template:**

```text
 · ⟦hit.injuryDays⟧ recovery days added
```

### domain.js:1140

**Context:** resolve

⟦def.name⟧ was cleared by ⟦party.map((c) => c.name).join(', ')⟧. the guild is safe again.

**Source template:**

```text
⟦def.name⟧ was cleared by ⟦party.map((c) => c.name).join(', ')⟧. the guild is safe again.
```

### domain.js:1141

**Context:** resolve

Home defended

### domain.js:1144

**Context:** resolve → The guild is safe → title

The guild is safe

### domain.js:1145

**Context:** resolve → The guild is safe → body

⟦party.map((c) => c.name).join(', ')⟧ cleared ⟦def.name.toLowerCase()⟧. The damage stops. They earned experience defending their home, and the guild is safe.

**Source template:**

```text
⟦party.map((c) => c.name).join(', ')⟧ cleared ⟦def.name.toLowerCase()⟧. The damage stops. They earned experience defending their home, and the guild is safe.
```

### domain.js:1151

**Context:** resolve → The furnace is clear → title

The furnace is clear

### domain.js:1152

**Context:** resolve → The furnace is clear → body

The dragon falls beside the old furnace. The party waits for the flames to die before searching its nest. Beneath the ash are guild pay chests containing 240 gold and the missing forge tools. The furnace room can be used again.

### domain.js:1156

**Context:** resolve

The furnace dragon was killed. Its nest held 240 gold and the guild’s old forge tools.

### domain.js:1157

**Context:** resolve

Threat cleared

### domain.js:1162

**Context:** resolve

Dungeon cleared

### domain.js:1163

**Context:** resolve → title

cleared

### domain.js:1166

**Context:** resolve

mission:

### domain.js:1174

**Context:** resolve → body

anchor

### domain.js:1175

**Context:** resolve → body

The keeper also returns two labelled guild keys: bell tower and labyrinth gate. Back at the guild, the party fits the brass piece into the empty socket beside the service room. The missing landing reappears beyond the doorway. Rowan’s boundary extends, and marks on the walls become readable. There are other rooms out there.

### domain.js:1182

**Context:** resolve

Outside assistance

### domain.js:1188

**Context:** resolve

Contract completed

### domain.js:1194

**Context:** resolve

Received

### domain.js:1194

**Context:** resolve

gold for

### domain.js:1194

**Context:** resolve

Payment

### domain.js:1205

**Context:** resolve

XP each.

### domain.js:1206

**Context:** resolve

Experience

### domain.js:1215

**Context:** resolve

reached level

### domain.js:1215

**Context:** resolve

. Choose one advancement in Training.

### domain.js:1216

**Context:** resolve

Level gained

### domain.js:1222

**Context:** resolve → text

Returned from ⟦def.name⟧.⟦choice ? ' ' + outcome : ''⟧

**Source template:**

```text
Returned from ⟦def.name⟧.⟦choice ? ' ' + outcome : ''⟧
```

### domain.js:1255

**Context:** dailyHomeEvent

⟦current.name⟧ attacked ⟦victim.name⟧ in the guildhall. They need two days of recovery. It will attack a room next if nobody defends the house.

**Source template:**

```text
⟦current.name⟧ attacked ⟦victim.name⟧ in the guildhall. They need two days of recovery. It will attack a room next if nobody defends the house.
```

### domain.js:1256

**Context:** dailyHomeEvent

Ghost attack

### domain.js:1262

**Context:** dailyHomeEvent

⟦current.name⟧ attacked Rowan while the adventurers were unavailable. Rowan needs two days of recovery before investigating or making story decisions. The next undefended attack will damage a room.

**Source template:**

```text
⟦current.name⟧ attacked Rowan while the adventurers were unavailable. Rowan needs two days of recovery before investigating or making story decisions. The next undefended attack will damage a room.
```

### domain.js:1263

**Context:** dailyHomeEvent

Home attack

### domain.js:1268

**Context:** dailyHomeEvent → targets → service → name

Service room

### domain.js:1270

**Context:** dailyHomeEvent → targets → quarters → name

Quarters

### domain.js:1278

**Context:** dailyHomeEvent

⟦current.name⟧ smashed ⟦target.name⟧. Story work is paused until the damaged room is repaired for 30 gold. Clearing the threat does not repair it.

**Source template:**

```text
⟦current.name⟧ smashed ⟦target.name⟧. Story work is paused until the damaged room is repaired for 30 gold. Clearing the threat does not repair it.
```

### domain.js:1279

**Context:** dailyHomeEvent

Room damaged

### domain.js:1290

**Context:** dailyHomeEvent → text

· undefended damage

### domain.js:1295

**Context:** dailyHomeEvent

⟦current.name⟧ remains undefended. Damaged supplies and fittings cost ⟦damage⟧ gold today.

**Source template:**

```text
⟦current.name⟧ remains undefended. Damaged supplies and fittings cost ⟦damage⟧ gold today.
```

### domain.js:1296

**Context:** dailyHomeEvent

Guild damage

### domain.js:1311

**Context:** dailyHomeEvent → locations → room

guildhall

### domain.js:1312

**Context:** dailyHomeEvent → locations → room

service

### domain.js:1321

**Context:** dailyHomeEvent

⟦def.name⟧! Assign a defence party from residents at home. Unanswered attacks damage the guild each following day.

**Source template:**

```text
⟦def.name⟧! Assign a defence party from residents at home. Unanswered attacks damage the guild each following day.
```

### domain.js:1322

**Context:** dailyHomeEvent

Home threat

### domain.js:1325

**Context:** dailyHomeEvent → Defend your home → title

Defend your home

### domain.js:1328

**Context:** dailyHomeEvent → Defend your home → body

Open Contracts to assign a defence party. Residents away on expeditions cannot help.

### domain.js:1358

**Context:** day → title

Retreat:

### domain.js:1359

**Context:** day → text

Survivors returned with the wounded. No reward was claimed.

### domain.js:1404

**Context:** day

prevented a fatal blow to

### domain.js:1406

**Context:** day

. This ward is spent for the assignment.

### domain.js:1407

**Context:** day

Death ward

### domain.js:1421

**Context:** day

⟦c.name⟧: ⟦injuryNames[injuryLevel(c)]⟧ on ⟦def.name⟧⟦treated ? '; the medical kit treated the injury' : warded ? '; a death ward prevented the fatal blow' : `; ${c.status === 'dead' ? 0 : injuryDays} recovery days added`⟧.

**Source template:**

```text
⟦c.name⟧: ⟦injuryNames[injuryLevel(c)]⟧ on ⟦def.name⟧⟦treated ? '; the medical kit treated the injury' : warded ? '; a death ward prevented the fatal blow' : `; ${c.status === 'dead' ? 0 : injuryDays} recovery days added`⟧.
```

### domain.js:1421

**Context:** day

; the medical kit treated the injury

### domain.js:1421

**Context:** day

; a death ward prevented the fatal blow

### domain.js:1421

**Context:** day

; ⟦c.status === 'dead' ? 0 : injuryDays⟧ recovery days added

**Source template:**

```text
; ⟦c.status === 'dead' ? 0 : injuryDays⟧ recovery days added
```

### domain.js:1422

**Context:** day

Daily harm

### domain.js:1437

**Context:** day

The entire party was lost on

### domain.js:1437

**Context:** day

. The contract remains unfinished.

### domain.js:1438

**Context:** day

Party lost

### domain.js:1453

**Context:** day

Local rescuers are bringing the unconscious party home from

### domain.js:1455

**Context:** day

. The contract failed and pays nothing.

### domain.js:1456

**Context:** day

Rescue

### domain.js:1467

**Context:** decide

No pending choice.

### domain.js:1469

**Context:** decide

Repair the damaged rooms before continuing this story report.

### domain.js:1471

**Context:** decide

Unknown expedition choice.

### domain.js:1495

**Context:** narrativeChoice

Rowan is recovering from the ghost attack.

### domain.js:1497

**Context:** narrativeChoice

This discovery or conversation is unavailable or already answered.

### domain.js:1499

**Context:** narrativeChoice

Bring Rowan to the threshold. Removing their binding is Rowan’s own decision.

### domain.js:1502

**Context:** narrativeChoice

Rowan must learn Anchor sight from the restored observatory before inspecting the replacement anchors.

### domain.js:1505

**Context:** narrativeChoice

Choice prerequisites not met.

### domain.js:1519

**Context:** missionLetter → callbacks → navigator

The keeper’s recording travels with the party. Sera hears the familiar voice and takes a step back. “It used my mother’s voice the night the shore went.”

### domain.js:1520

**Context:** missionLetter → callbacks → navigator

Sera recognises the keeper’s sailcloth around the small anchor. “He trusted you to stop at the small road,” she says. “Keep doing that.”

### domain.js:1522

**Context:** missionLetter → callbacks → orchard

Edda has read the public corrections. She has added her mother’s name to one of them. “You left room for us to answer. Let us see whether you can leave room for us to keep something.”

### domain.js:1523

**Context:** missionLetter → callbacks → orchard

Edda has received a request to verify the research catalogue. She answers the questions in her own hand and makes the party read them before discussing the roots.

### domain.js:1525

**Context:** missionLetter → callbacks → lens

One rescued deckhand recognises Elian’s name and has sent a letter. It says, “I would like to hear why the bell rang.” Elian reads it twice.

### domain.js:1526

**Context:** missionLetter → callbacks → lens

Sera has sent a copy of the recovered chart. Elian’s watchtower is marked with an alarm symbol. He asks whether anyone still knows what the alarm meant.

### domain.js:1528

**Context:** missionLetter → callbacks → ivoPast

The party carries a living seal grown under the greenhouse’s new promise to Alder. Ada recognises the roots. “Then someone finally asked the keeper.”

### domain.js:1529

**Context:** missionLetter → callbacks → ivoPast

Ada’s calculations include a mechanical replacement that needs no rare roots. Ivo checks it against the archive before letting anyone step inside the circle.

### domain.js:1531

**Context:** missionLetter → callbacks → witness

Elian is waiting at home for the cylinder. His account will be checked against the voices rather than replaced by them.

### domain.js:1533

**Context:** missionLetter → callbacks → witness

Elian’s signed log accompanies the party. Its timing gives the cylinder a date: the record happened before the public disappearance, not after.

### domain.js:1534

**Context:** missionLetter → callbacks → witness

The observatory’s measurements give the record a place and a time. It is evidence that can be questioned, not an oracle.

### domain.js:1536

**Context:** missionLetter → callbacks → covenant

A patient from the greenhouse asks to sign as a resident rather than a recipient of charity. The keepers add a place for people without a village to represent them.

### domain.js:1537

**Context:** missionLetter → callbacks → covenant

Edda brings a cutting grown from the promised return shipment. The covenant begins with a promise already kept, small enough to inspect.

### domain.js:1539

**Context:** missionLetter → callbacks → lattice

Ada refuses to lead the test herself. “You invited me home,” she says. “That was not a licence to put me in charge again.”

### domain.js:1541

**Context:** missionLetter → callbacks → lattice

A letter from Ada arrives with corrections made by the replacement keeper. Ivo reads both signatures aloud.

### domain.js:1542

**Context:** missionLetter → callbacks → lattice

The method was published for people who would never meet its author. The party follows the proof and checks its failure cases, without needing a special person to make it true.

### domain.js:1548

**Context:** missionLetter

Oren’s account placed the first collapse on the rear stair. The recording’s crash comes from the same direction.

### domain.js:1551

**Context:** missionLetter

The alarm gives three strokes, then a fourth. Maelin’s account of the false stroke matches the recording.

### domain.js:1554

**Context:** missionLetter

Ysra’s last infirmary route shows where Halden carried the injured patient. The recording supplies the identity she could not see.

### domain.js:1558

**Context:** missionLetter

Nell asks whether strangers will have a place at the table.

### domain.js:1559

**Context:** missionLetter

A shelter keeper asks whether strangers will have a place at the table.

### domain.js:1588

**Context:** repairRoom

Repair the ghost-damaged rooms before restoring further story rooms.

### domain.js:1590

**Context:** repairRoom

Recover this room’s anchor first.

### domain.js:1591

**Context:** repairRoom

The room is already operational.

### domain.js:1593

**Context:** repairRoom

Select an available resident.

### domain.js:1596

**Context:** repairRoom

The archive seal requires a present resident with Magical literacy. Learn literacy or escort the independent archivist in Contracts.

### domain.js:1599

**Context:** repairRoom

Prepare a safe covenant or containment lattice before stabilising the threshold.

### domain.js:1600

**Context:** repairRoom

⟦room.name⟧: workers, materials and stabilisation

**Source template:**

```text
⟦room.name⟧: workers, materials and stabilisation
```

### domain.js:1607

**Context:** repairRoom

The independent archivist checks the locking spell while

### domain.js:1609

**Context:** repairRoom

directs the restoration crew. The guild used outside expertise because its residents chose other training.

### domain.js:1610

**Context:** repairRoom

Different route

### domain.js:1615

**Context:** repairRoom

⟦room.name⟧ is restored. Its former purpose is preserved in the surviving records. New work can begin here.

**Source template:**

```text
⟦room.name⟧ is restored. Its former purpose is preserved in the surviving records. New work can begin here.
```

### domain.js:1619

**Context:** interact

repairDamage:

### domain.js:1624

**Context:** interact

Repair the damaged guild rooms before continuing story work.

### domain.js:1626

**Context:** interact

Rowan is recovering from the ghost attack.

### domain.js:1628

**Context:** interact

Select an available resident.

### domain.js:1630

**Context:** interact

Repair the cellar stairs first.

### domain.js:1631

**Context:** interact

The cellar is already drained.

### domain.js:1633

**Context:** interact

Water breathing is required to reach the submerged drain wheel.

### domain.js:1637

**Context:** interact

⟦c.name⟧ opened the submerged sluice. Water emptied into the old drainage tunnel. The wheel is locked open; every resident can now use the cellar.

**Source template:**

```text
⟦c.name⟧ opened the submerged sluice. Water emptied into the old drainage tunnel. The wheel is locked open; every resident can now use the cellar.
```

### domain.js:1638

**Context:** interact

Area unlocked

### domain.js:1641

**Context:** interact → The cellar drains → title

The cellar drains

### domain.js:1642

**Context:** interact → The cellar drains → body

⟦c.name⟧ dives beside the ship’s bow and finds the red drain wheel beneath a layer of silt. Turning it lifts the sluice gate.
The water runs into the old drainage tunnel until the stone floor is exposed. The wheel locks open. Everyone can now enter the cellar without Water breathing.

**Source template:**

```text
⟦c.name⟧ dives beside the ship’s bow and finds the red drain wheel beneath a layer of silt. Turning it lifts the sluice gate.
The water runs into the old drainage tunnel until the stone floor is exposed. The wheel locks open. Everyone can now enter the cellar without Water breathing.
```

### domain.js:1647

**Context:** interact

Find the lower labyrinth first.

### domain.js:1654

**Context:** interact

Beyond the labyrinth’s east door, a dragon has nested around the old furnace. The party cannot approach its hoard safely. A clearing contract is now available.

### domain.js:1655

**Context:** interact

Internal threat

### domain.js:1658

**Context:** interact → A dragon beneath the guild → title

A dragon beneath the guild

### domain.js:1659

**Context:** interact → A dragon beneath the guild → body

Heat escapes through the east door. Inside, the furnace has been dragged open and packed with nesting stone. A dragon lifts its head from the coals.
The resident closes the door before it can force its shoulders through. The passage is clear enough for a fighting party, but this will take repeated attacks and days of work.
A contract is now in Contracts. Its daily threat is high. You can pull assigned residents back immediately; the dragon will remain wounded until you resume. Nobody has reached the hoard, so the reward is unknown.

### domain.js:1666

**Context:** interact

The tower hatch is locked. Complete The bell at Wren’s Crossing to recover its key.

### domain.js:1668

**Context:** interact

Tower already restored.

### domain.js:1672

**Context:** interact

Tower stair and bell landings

### domain.js:1677

**Context:** interact

Two bell-tower landings return above the quarters. Blue ice surrounds a figure at the crown.

### domain.js:1678

**Context:** interact

Discovery

### domain.js:1685

**Context:** interact

The labyrinth gate is locked. Wren’s Crossing awards its key; repair the cellar stair to reach the gate.

### domain.js:1687

**Context:** interact

Labyrinth already opened.

### domain.js:1691

**Context:** interact

A brass thread under the dry landing unrolls into two labyrinth floors. Someone has erased the exit from the map.

### domain.js:1692

**Context:** interact

Discovery

### domain.js:1696

**Context:** interact

discover:

### domain.js:1700

**Context:** interact

awaken:

### domain.js:1704

**Context:** interact

room:

### domain.js:1709

**Context:** interact

The wall is already open.

### domain.js:1710

**Context:** interact

⟦c.name⟧ has Strength ⟦c.str⟧. This wall needs Strength 10.

**Source template:**

```text
⟦c.name⟧ has Strength ⟦c.str⟧. This wall needs Strength 10.
```

### domain.js:1712

**Context:** interact

⟦c.name⟧ broke through a wall bricked from the inside. A service room lies beyond.

**Source template:**

```text
⟦c.name⟧ broke through a wall bricked from the inside. A service room lies beyond.
```

### domain.js:1715

**Context:** interact

Breach the wall before restoring the service room.

### domain.js:1716

**Context:** interact

Service room workers and materials

### domain.js:1720

**Context:** interact

The restored service room reveals shelves once used for returned expedition records. A labelled cellar key hangs beside the stair plan. A ledger remains hidden behind a rack.

### domain.js:1724

**Context:** interact

Restore the service room to uncover its ledger.

### domain.js:1728

**Context:** interact

A hidden ledger lists the brass fitting for the missing landing. Its inscription says that placing it in the service-room socket will bring the landing back. The fitting was sent to Wren’s Crossing. A letter from the keeper offers its return in exchange for help reaching the village bell. A separate warning reads: “Do not open the great threshold.”

### domain.js:1733

**Context:** interact

The cellar hatch is locked. Restore the service room to recover its access key.

### domain.js:1735

**Context:** interact

Stairs already repaired.

### domain.js:1736

**Context:** interact

Cellar stair repairs

### domain.js:1740

**Context:** interact

The workers replace the cellar stair and brace the ceiling over its dry landing. A stone figure stands beneath the old beam. Water fills the passage beyond it; a resident with Water breathing can reach the submerged drain wheel, empty the cellar and open it to everyone.

### domain.js:1745

**Context:** interact

The stairs lead to a dry landing. Investigating the submerged ship requires Water breathing.

### domain.js:1747

**Context:** interact

The ship fragment has been recorded.

### domain.js:1751

**Context:** interact

The ship’s bow bears Captain Sera Venn’s name. A water-stained chart shows how the guild tore the archive and ship apart. The navigator is still alive at the shore of no tides.

### domain.js:1754

**Context:** interact → A ship with nowhere to sail → title

A ship with nowhere to sail

### domain.js:1755

**Context:** interact → A ship with nowhere to sail → body

The flooded bow contains a spoon, a child’s shoe and a navigator’s slate. The ship was carrying passengers when the guild connected it to the cellar. The surviving chart records where the stern and its crew were stranded.
The slate records Sera Venn’s name. If the landing inscription is not yet read, Rowan can learn to read it when the small anchor returns.

### domain.js:1759

**Context:** interact

Rowan must reconnect the landing to read this inscription.

### domain.js:1760

**Context:** interact

The inscription is already in the journal.

### domain.js:1764

**Context:** interact

House inscription: “We severed the road to keep the guest outside.” Below it: “Sera Venn kept the chart. Do not trust a voice simply because it knows your name.”

### domain.js:1767

**Context:** interact → The road was cut from inside → title

The road was cut from inside

### domain.js:1768

**Context:** interact → The road was cut from inside → body

Rowan reads the letters without touching them. Whoever cut the road did it deliberately. Whatever the catastrophe began as, someone ended it to keep a guest out.
Below the warning is a navigator’s name: Sera Venn. A new expedition can follow the coast attached to the cellar’s ship.
The landing’s register and the name carved under its chair may identify someone who never returned.

### domain.js:1770

**Context:** interact

Unknown interaction.

### domain.js:1773

**Context:** finish

Repair the damaged rooms before completing the story.

### domain.js:1778

**Context:** finish

Rowan walked beyond the gate. The binding is gone. The house remains a place they may return to, not a condition of being alive.

### domain.js:1784

**Context:** finish → The first ordinary morning → title

The first ordinary morning

### domain.js:1785

**Context:** finish → The first ordinary morning → body

The road has mud on it. Rowan stops with one foot beyond the gate, expecting pain, expecting a summons, expecting anything but a breeze.
Nothing pulls them back.
⟦s.flags.nellWalk ? 'Nell walks beside them until the first turn, then lets Rowan choose the next one.' : allies.length ? `${allies.join(', ')} ${allies.length === 1 ? 'waits' : 'wait'} by the gate. Nobody asks for a promise to return.` : 'Mara is at the gate. “There you are,” she says, as if Rowan has only stepped out to check the weather.'⟧
⟦s.flags.endingReturn ? 'Behind them, the keepers are arranging the return of borrowed rooms. The work will go on without needing Rowan to hold it together.' : 'Behind them, a patient opens a window, someone argues over a map, and the kettle begins to sing. The house is still a home.'⟧
The guild’s story will continue. This part of Rowan’s story ends with a step, and begins with another.

**Source template:**

```text
The road has mud on it. Rowan stops with one foot beyond the gate, expecting pain, expecting a summons, expecting anything but a breeze.
Nothing pulls them back.
⟦s.flags.nellWalk ? 'Nell walks beside them until the first turn, then lets Rowan choose the next one.' : allies.length ? `${allies.join(', ')} ${allies.length === 1 ? 'waits' : 'wait'} by the gate. Nobody asks for a promise to return.` : 'Mara is at the gate. “There you are,” she says, as if Rowan has only stepped out to check the weather.'⟧
⟦s.flags.endingReturn ? 'Behind them, the keepers are arranging the return of borrowed rooms. The work will go on without needing Rowan to hold it together.' : 'Behind them, a patient opens a window, someone argues over a map, and the kettle begins to sing. The house is still a home.'⟧
The guild’s story will continue. This part of Rowan’s story ends with a step, and begins with another.
```

### domain.js:1785

**Context:** finish → The first ordinary morning → body

Nell walks beside them until the first turn, then lets Rowan choose the next one.

### domain.js:1785

**Context:** finish → The first ordinary morning → body

⟦allies.join(', ')⟧ ⟦allies.length === 1 ? 'waits' : 'wait'⟧ by the gate. Nobody asks for a promise to return.

**Source template:**

```text
⟦allies.join(', ')⟧ ⟦allies.length === 1 ? 'waits' : 'wait'⟧ by the gate. Nobody asks for a promise to return.
```

### domain.js:1785

**Context:** finish → The first ordinary morning → body

waits

### domain.js:1785

**Context:** finish → The first ordinary morning → body

wait

### domain.js:1785

**Context:** finish → The first ordinary morning → body

Mara is at the gate. “There you are,” she says, as if Rowan has only stepped out to check the weather.

### domain.js:1785

**Context:** finish → The first ordinary morning → body

Behind them, the keepers are arranging the return of borrowed rooms. The work will go on without needing Rowan to hold it together.

### domain.js:1785

**Context:** finish → The first ordinary morning → body

Behind them, a patient opens a window, someone argues over a map, and the kettle begins to sing. The house is still a home.

### domain.js:1790

**Context:** emergency

Wait for the active expedition first.

### domain.js:1792

**Context:** emergency

Mara’s doorstep mending job

### domain.js:1796

**Context:** treat

No injury to treat.

### domain.js:1797

**Context:** treat

Treatment for ⟦c.name⟧

**Source template:**

```text
Treatment for ⟦c.name⟧
```

### domain.js:1835

**Context:** load

Invalid or unsupported save.

### domain.js:1848

**Context:** load

mission:anchor

### domain.js:1866

**Context:** load

Invalid campaign data.

### domain.js:1886

**Context:** load

Save contains invalid residents.

### domain.js:1912

**Context:** load

Invalid class progression.

### domain.js:1918

**Context:** load

Invalid home-event seed.

### domain.js:1920

**Context:** load

Invalid Rowan recovery.

### domain.js:1935

**Context:** load

Invalid room damage.

### domain.js:1946

**Context:** load

Invalid dungeon return route.

### domain.js:1977

**Context:** load

Invalid level training choices.

### domain.js:1998

**Context:** load

Save contains invalid expeditions.

### domain.js:2006

**Context:** load

Save contains conflicting assignments.

### domain.js:2011

**Context:** load

An away resident has no expedition.

### domain.js:2013

**Context:** load → node

mission:

### domain.js:2017

**Context:** load

Save contains unknown narrative choices.

### domain.js:2040

**Context:** load

Invalid guild threat progress.

### domain.js:2063

**Context:** load

Invalid daily contract data.

### domain.js:2070

**Context:** load

Conflicting guild threat progress.

### domain.js:2085

**Context:** load

Invalid daily contract timing.

### domain.js:2090

**Context:** load

Invalid completed contract progress.

### domain.js:2122

**Context:** load

Invalid equipment inventory.

### domain.js:2133

**Context:** load

Invalid companion departure.

### domain.js:2151

**Context:** load

Invalid resident positions.

### domain.js:2160

**Context:** validateContent

Duplicate mission ⟦m.id⟧

**Source template:**

```text
Duplicate mission ⟦m.id⟧
```

### domain.js:2171

**Context:** validateContent

Invalid mission ⟦m.id⟧

**Source template:**

```text
Invalid mission ⟦m.id⟧
```

### domain.js:2175

**Context:** validateContent

Unknown flag ⟦flag⟧ in ⟦n.id⟧

**Source template:**

```text
Unknown flag ⟦flag⟧ in ⟦n.id⟧
```

### domain.js:2179

**Context:** validateContent

Duplicate choice ⟦n.id⟧/⟦c.id⟧

**Source template:**

```text
Duplicate choice ⟦n.id⟧/⟦c.id⟧
```

### domain.js:2182

**Context:** validateContent

Unknown choice requirement ⟦f⟧

**Source template:**

```text
Unknown choice requirement ⟦f⟧
```

### domain.js:2230

**Context:** validateContent

Unreachable prerequisite ⟦f⟧ in ⟦n.id⟧

**Source template:**

```text
Unreachable prerequisite ⟦f⟧ in ⟦n.id⟧
```

## character-panel.js

### character-panel.js:8

**Context:** renderCharacterPanel → html

**Display text** (markup removed):

Character⟦people.map((entry) => `${esc(entry.name)}`).join('')⟧

**Source template:**

```text
<div class="sheet-picker"><label for="character-page">Character</label><select id="character-page">⟦people.map((entry) => `<option value="${entry.id}" ${entry.id === person.id ? 'selected' : ''}>${esc(entry.name)}</option>`).join('')⟧</select></div>
```

### character-panel.js:8

**Context:** renderCharacterPanel → html

**Display text** (markup removed):

⟦esc(entry.name)⟧

**Source template:**

```text
<option value="⟦entry.id⟧" ⟦entry.id === person.id ? 'selected' : ''⟧>⟦esc(entry.name)⟧</option>
```

### character-panel.js:11

**Context:** renderCharacterPanel → description

The house is a home Rowan can leave and return to.

### character-panel.js:13

**Context:** renderCharacterPanel → description

The binding is gone. Rowan can walk beyond the gate.

### character-panel.js:14

**Context:** renderCharacterPanel → description

Rowan survived the collapse through Halden’s binding. The spell keeps them alive and ties them to the house. Its scattered records hold the history of that night.

### character-panel.js:20

**Context:** renderCharacterPanel

Unbound survivor

### character-panel.js:20

**Context:** renderCharacterPanel

Bound survivor

### character-panel.js:22

**Context:** renderCharacterPanel

At home

### character-panel.js:23

**Context:** renderCharacterPanel

Control Rowan

### character-panel.js:23

**Context:** renderCharacterPanel

select:rowan

### character-panel.js:32

**Context:** renderCharacterPanel → condition

Journey completed

### character-panel.js:34

**Context:** renderCharacterPanel → condition

Fallen

### character-panel.js:38

**Context:** renderCharacterPanel → condition

Recovering · ⟦person.recovery⟧ days

**Source template:**

```text
Recovering · ⟦person.recovery⟧ days
```

### character-panel.js:39

**Context:** renderCharacterPanel → condition

At home

### character-panel.js:42

**Context:** renderCharacterPanel

**Display text** (markup removed):

⟦btn('Control ' + person.name, 'select:' + person.id)⟧⟦btn('Visit store room', 'visitStore:' + person.id)⟧

**Source template:**

```text
<div class="row">⟦btn('Control ' + person.name, 'select:' + person.id)⟧⟦btn('Visit store room', 'visitStore:' + person.id)⟧</div>
```

### character-panel.js:42

**Context:** renderCharacterPanel

Control

### character-panel.js:42

**Context:** renderCharacterPanel

select:

### character-panel.js:42

**Context:** renderCharacterPanel

Visit store room

### character-panel.js:42

**Context:** renderCharacterPanel

visitStore:

### character-panel.js:43

**Context:** renderCharacterPanel

Arrange treatment · 15 gold

### character-panel.js:43

**Context:** renderCharacterPanel

treat:

### character-panel.js:45

**Context:** renderCharacterPanel

**Display text** (markup removed):

⟦btn(node.title, 'talk:' + node.id)⟧

**Source template:**

```text
<div class="row">⟦btn(node.title, 'talk:' + node.id)⟧</div>
```

### character-panel.js:45

**Context:** renderCharacterPanel

talk:

### character-panel.js:48

**Context:** renderCharacterPanel → history

**Display text** (markup removed):

Personal history⟦memories
.slice(-5)
.map((memory) => `Day ${memory.day}${paragraphs(memory.text)}`)
.join('')⟧

**Source template:**

```text
<details class="sheet-history"><summary>Personal history</summary>⟦memories
        .slice(-5)
        .map((memory) => `<p class="stats">Day ${memory.day}</p>${paragraphs(memory.text)}`)
        .join('')⟧</details>
```

### character-panel.js:50

**Context:** renderCharacterPanel → history

**Display text** (markup removed):

Day ⟦memory.day⟧⟦paragraphs(memory.text)⟧

**Source template:**

```text
<p class="stats">Day ⟦memory.day⟧</p>⟦paragraphs(memory.text)⟧
```

### character-panel.js:69

**Context:** attributes

Strength

### character-panel.js:70

**Context:** attributes

Agility

### character-panel.js:71

**Context:** attributes

Intellect

### character-panel.js:72

**Context:** attributes

Endurance

### character-panel.js:75

**Context:** houseAbilities → stoneSong

Steadies falling stone and opens weakened stone passages.

### character-panel.js:76

**Context:** houseAbilities → echoSight

Distinguishes remembered voices from echoes and false signals.

### character-panel.js:77

**Context:** houseAbilities → threadwalk

Follows folded paths and hidden connections through the house.

### character-panel.js:78

**Context:** houseAbilities → inscriptions

Reads the house’s inscriptions and binding diagrams.

### character-panel.js:79

**Context:** houseAbilities → anchorSight

Perceives the connections that hold the house together.

### character-panel.js:80

**Context:** houseAbilities → undeadLabour

Sustains work without living fatigue.

### character-panel.js:81

**Context:** houseAbilities → graveEndurance

Resists physical harm and ghost terror.

### character-panel.js:108

**Context:** sheet → abilityList

**Display text** (markup removed):

⟦abilities.map((ability) => `${esc(ability.name)}${esc(ability.desc)}`).join('')⟧

**Source template:**

```text
<ul class="sheet-abilities">⟦abilities.map((ability) => `<li><strong>${esc(ability.name)}</strong><p>${esc(ability.desc)}</p></li>`).join('')⟧</ul>
```

### character-panel.js:108

**Context:** sheet → abilityList

**Display text** (markup removed):

⟦esc(ability.name)⟧⟦esc(ability.desc)⟧

**Source template:**

```text
<li><strong>⟦esc(ability.name)⟧</strong><p>⟦esc(ability.desc)⟧</p></li>
```

### character-panel.js:109

**Context:** sheet → abilityList

**Display text** (markup removed):

Practical experience and an unfinished education.

**Source template:**

```text
<p class="sheet-muted">Practical experience and an unfinished education.</p>
```

### character-panel.js:112

**Context:** sheet → progression

**Display text** (markup removed):

Level ⟦person.level⟧⟦person.level ⟦person.level ` : ''⟧

**Source template:**

```text
<div class="sheet-progress"><span>Level ⟦person.level⟧⟦person.level < 20 ? ` · ${person.xp} / ${D.xpRequired(person.level)} XP` : ' · Mastery'⟧</span>⟦person.level < 20 ? `<progress aria-label="Experience towards next level" value="${Math.min(person.xp, D.xpRequired(person.level))}" max="${D.xpRequired(person.level)}"></progress>` : ''⟧</div>
```

### character-panel.js:112

**Context:** sheet → progression

· ⟦person.xp⟧ / ⟦D.xpRequired(person.level)⟧ XP

**Source template:**

```text
 · ⟦person.xp⟧ / ⟦D.xpRequired(person.level)⟧ XP
```

### character-panel.js:113

**Context:** sheet

**Display text** (markup removed):

The guild register⟦esc(person.name)⟧⟦esc(className)⟧⟦progression⟧⟦esc(condition)⟧ · ⟦rowan ? (state.rowanRecovery > 0 ? 'Recovering' : 'Fit') : esc(D.injuryNames[D.injuryLevel(person)])⟧
⟦attributes.map(([key, name]) => `${name}${person[key]}${!rowan && effectiveStat(person, key) !== person[key] ? `${effectiveStat(person, key)} on contracts` : ''}`).join('')⟧
⟦section('Abilities & talents', abilityList)⟧⟦section(
'Equipment',
gear
? `${esc(gear.name)}${paragraphs(gear.desc)}${Object.entries(
            gear.stats,
          )
            .map(([key, value]) => `${attributes.find(([id]) => id === key)?.[1] || key} +${value}`)
            .join(' · ')}${gear.protection ? ` · Protection ${gear.protection}` : ''}`
: 'Standard kit',
)⟧⟦rowan ? '' : section('Relationship', `Trust ${person.bond}`)⟧⟦section('Biography', paragraphs(biography))⟧⟦history⟧
⟦actions ? `${actions}` : ''⟧

**Source template:**

```text
<article class="character-sheet" aria-label="⟦esc(person.name)⟧ character sheet">
    <header class="sheet-identity"><img src="⟦portraits[person.id]⟧" alt="⟦esc(person.name)⟧ portrait"><div><p class="sheet-eyebrow">The guild register</p><h3>⟦esc(person.name)⟧</h3><p class="sheet-class">⟦esc(className)⟧</p>⟦progression⟧<p class="sheet-condition">⟦esc(condition)⟧ · ⟦rowan ? (state.rowanRecovery > 0 ? 'Recovering' : 'Fit') : esc(D.injuryNames[D.injuryLevel(person)])⟧</p></div></header>
    <div class="sheet-attributes">⟦attributes.map(([key, name]) => `<div class="sheet-attribute"><span>${name}</span><strong>${person[key]}</strong>${!rowan && effectiveStat(person, key) !== person[key] ? `<small>${effectiveStat(person, key)} on contracts</small>` : ''}</div>`).join('')⟧</div>
    <div class="sheet-columns"><div>⟦section('Abilities & talents', abilityList)⟧⟦section(
      'Equipment',
      gear
        ? `<strong>${esc(gear.name)}</strong>${paragraphs(gear.desc)}<p class="sheet-muted">${Object.entries(
            gear.stats,
          )
            .map(([key, value]) => `${attributes.find(([id]) => id === key)?.[1] || key} +${value}`)
            .join(' · ')}${gear.protection ? ` · Protection ${gear.protection}` : ''}</p>`
        : '<p>Standard kit</p>',
    )⟧⟦rowan ? '' : section('Relationship', `<p>Trust <strong>${person.bond}</strong></p>`)⟧</div><div>⟦section('Biography', paragraphs(biography))⟧⟦history⟧</div></div>
    ⟦actions ? `<footer class="sheet-actions" aria-label="Character actions">${actions}</footer>` : ''⟧</article>
```

### character-panel.js:114

**Context:** sheet

Recovering

### character-panel.js:114

**Context:** sheet

Fit

### character-panel.js:115

**Context:** sheet

**Display text** (markup removed):

⟦name⟧⟦person[key]⟧⟦!rowan && effectiveStat(person, key) !== person[key] ? `${effectiveStat(person, key)} on contracts` : ''⟧

**Source template:**

```text
<div class="sheet-attribute"><span>⟦name⟧</span><strong>⟦person[key]⟧</strong>⟦!rowan && effectiveStat(person, key) !== person[key] ? `<small>${effectiveStat(person, key)} on contracts</small>` : ''⟧</div>
```

### character-panel.js:115

**Context:** sheet

**Display text** (markup removed):

⟦effectiveStat(person, key)⟧ on contracts

**Source template:**

```text
<small>⟦effectiveStat(person, key)⟧ on contracts</small>
```

### character-panel.js:116

**Context:** sheet

Abilities & talents

### character-panel.js:117

**Context:** sheet

Equipment

### character-panel.js:119

**Context:** sheet

**Display text** (markup removed):

⟦esc(gear.name)⟧⟦paragraphs(gear.desc)⟧⟦Object.entries(
gear.stats,
)
.map(([key, value]) => `${attributes.find(([id]) => id === key)?.[1] || key} +${value}`)
.join(' · ')⟧⟦gear.protection ? ` · Protection ${gear.protection}` : ''⟧

**Source template:**

```text
<strong>⟦esc(gear.name)⟧</strong>⟦paragraphs(gear.desc)⟧<p class="sheet-muted">⟦Object.entries(
            gear.stats,
          )
            .map(([key, value]) => `${attributes.find(([id]) => id === key)?.[1] || key} +${value}`)
            .join(' · ')⟧⟦gear.protection ? ` · Protection ${gear.protection}` : ''⟧</p>
```

### character-panel.js:122

**Context:** sheet

⟦attributes.find(([id]) => id === key)?.[1] || key⟧ +⟦value⟧

**Source template:**

```text
⟦attributes.find(([id]) => id === key)?.[1] || key⟧ +⟦value⟧
```

### character-panel.js:123

**Context:** sheet

· Protection ⟦gear.protection⟧

**Source template:**

```text
 · Protection ⟦gear.protection⟧
```

### character-panel.js:124

**Context:** sheet

**Display text** (markup removed):

Standard kit

**Source template:**

```text
<p>Standard kit</p>
```

### character-panel.js:125

**Context:** sheet

Relationship

### character-panel.js:125

**Context:** sheet

**Display text** (markup removed):

Trust ⟦person.bond⟧

**Source template:**

```text
<p>Trust <strong>⟦person.bond⟧</strong></p>
```

### character-panel.js:125

**Context:** sheet

Biography

## classes.js

### classes.js:4

**Context:** classes → zombie → Reanimated zombie → name

Reanimated zombie

### classes.js:7

**Context:** classes → zombie → Reanimated zombie → desc

Strong, tireless and resistant to physical attacks and ghost terror; vulnerable to magic. Cannot learn living-class talents or heal naturally.

### classes.js:10

**Context:** classes → warrior → Warrior → name

Warrior

### classes.js:13

**Context:** classes → warrior → Warrior → desc

Strength and Endurance grow each level.

### classes.js:16

**Context:** classes → mage → Wizard → name

Wizard

### classes.js:19

**Context:** classes → mage → Wizard → desc

Intellect grows each level.

### classes.js:22

**Context:** classes → scout → Scout → name

Scout

### classes.js:25

**Context:** classes → scout → Scout → desc

Agility and Intellect grow each level.

### classes.js:28

**Context:** classes → barbarian → Barbarian → name

Barbarian

### classes.js:33

**Context:** classes → barbarian → Barbarian → desc

High Strength and Endurance. Physical harm risk −12 points; magical harm risk +10 points.

### classes.js:36

**Context:** classes → paladin → Paladin → name

Paladin

### classes.js:41

**Context:** classes → paladin → Paladin → desc

An armoured holy defender. Physical risk −6; ghosts and undead −15.

### classes.js:44

**Context:** classes → necromancer → Necromancer → name

Necromancer

### classes.js:48

**Context:** classes → necromancer → Necromancer → desc

Controls death magic. Undead risk −12. Can learn Raise dead and repair animated bodies.

### classes.js:51

**Context:** classes → healer → Healer / Priest → name

Healer / Priest

### classes.js:55

**Context:** classes → healer → Healer / Priest → desc

A priest of restoration. Undead risk −18. Healing spells reduce injuries, including on adventures.

### classes.js:58

**Context:** classes → thief → Thief → name

Thief

### classes.js:62

**Context:** classes → thief → Thief → desc

Agility specialist. Physical risk −5. Disarms traps and retrieves extra salvage.

### classes.js:65

**Context:** classes → archer → Archer → name

Archer

### classes.js:69

**Context:** classes → archer → Archer → desc

Ranged defence. Physical risk −7. Covering fire protects the party and speeds clearing work.

### classes.js:74

**Context:** rows

Rage

### classes.js:74

**Context:** rows

Party work +15% while conscious.

### classes.js:75

**Context:** rows

Iron hide

### classes.js:75

**Context:** rows

Physical daily threat −8.

### classes.js:79

**Context:** rows

Unstoppable

### classes.js:83

**Context:** rows

Hurt and injured: full work; incapacitated: 50% work.

### classes.js:88

**Context:** rows

War cry

### classes.js:92

**Context:** rows

Physical daily threat −8; the benefit is shared with the party.

### classes.js:97

**Context:** rows

Spell scar

### classes.js:101

**Context:** rows

Magical daily threat −12, overcoming the class weakness.

### classes.js:103

**Context:** rows

Cleave

### classes.js:103

**Context:** rows

Party work +20%.

### classes.js:107

**Context:** rows

Last stand

### classes.js:111

**Context:** rows

Once per assignment, prevents a fatal blow.

### classes.js:113

**Context:** rows

Titan grip

### classes.js:113

**Context:** rows

Strength +8 when working.

### classes.js:117

**Context:** rows

Ancestral guard

### classes.js:121

**Context:** rows

Magical daily threat −15.

### classes.js:123

**Context:** rows

Holy light

### classes.js:123

**Context:** rows

Undead daily threat −15.

### classes.js:127

**Context:** rows

Shield oath

### classes.js:131

**Context:** rows

Physical daily threat −10 for the party.

### classes.js:136

**Context:** rows

Lay on hands

### classes.js:140

**Context:** rows

Once per day, heal one living resident by one injury stage.

### classes.js:145

**Context:** rows

Sanctuary

### classes.js:149

**Context:** rows

Magical daily threat −10.

### classes.js:154

**Context:** rows

Consecrate

### classes.js:158

**Context:** rows

Undead daily threat −15.

### classes.js:163

**Context:** rows

Rally the fallen

### classes.js:167

**Context:** rows

Heal two injury stages once per day; can wake unconscious allies.

### classes.js:172

**Context:** rows

Martyr’s ward

### classes.js:176

**Context:** rows

Once per assignment, prevent a fatal blow to any party member.

### classes.js:181

**Context:** rows

Radiant blade

### classes.js:185

**Context:** rows

Party work +20%.

### classes.js:190

**Context:** rows

Dawn oath

### classes.js:194

**Context:** rows

Magic and undead daily threat −15.

### classes.js:199

**Context:** rows

Grave sight

### classes.js:203

**Context:** rows

Undead threat −10; reveals false labyrinth routes.

### classes.js:205

**Context:** rows

Bone ward

### classes.js:205

**Context:** rows

Physical daily threat −10.

### classes.js:209

**Context:** rows

Raise dead

### classes.js:213

**Context:** rows

At home, animate a recovered fallen resident as a zombie for 80 gold.

### classes.js:218

**Context:** rows

Soul ward

### classes.js:222

**Context:** rows

Magical daily threat −12.

### classes.js:227

**Context:** rows

Mend undead

### classes.js:231

**Context:** rows

Repair two zombie injury stages once per day.

### classes.js:236

**Context:** rows

Death pact

### classes.js:240

**Context:** rows

Once per assignment, prevent your own fatal blow.

### classes.js:245

**Context:** rows

Corpse march

### classes.js:249

**Context:** rows

With a zombie in the party, work +30%.

### classes.js:254

**Context:** rows

Dread circle

### classes.js:258

**Context:** rows

Magic and undead daily threat −15.

### classes.js:263

**Context:** rows

Death mastery

### classes.js:267

**Context:** rows

Repair four zombie injury stages once per day.

### classes.js:272

**Context:** rows

Turn undead

### classes.js:276

**Context:** rows

Ghosts and undead daily threat −15.

### classes.js:281

**Context:** rows

Protective prayer

### classes.js:285

**Context:** rows

Magical daily threat −10.

### classes.js:290

**Context:** rows

Healing word

### classes.js:294

**Context:** rows

Heal a living resident by one injury stage once per day, at home or on your assignment.

### classes.js:299

**Context:** rows

Blessing

### classes.js:303

**Context:** rows

Physical daily threat −10.

### classes.js:308

**Context:** rows

Greater healing

### classes.js:312

**Context:** rows

Heal two stages; can restore consciousness for withdrawal.

### classes.js:314

**Context:** rows

Exorcism

### classes.js:314

**Context:** rows

Undead daily threat −20.

### classes.js:318

**Context:** rows

Guardian angel

### classes.js:322

**Context:** rows

Once per assignment, prevent one fatal blow to any companion.

### classes.js:327

**Context:** rows

Restoration

### classes.js:331

**Context:** rows

Heal three injury stages once per day.

### classes.js:336

**Context:** rows

Miracle

### classes.js:340

**Context:** rows

Heal four injury stages. Cannot resurrect a dead resident.

### classes.js:345

**Context:** rows

Lockcraft

### classes.js:349

**Context:** rows

Physical threat −8 from trap awareness.

### classes.js:351

**Context:** rows

Shadow step

### classes.js:351

**Context:** rows

Party work +15%.

### classes.js:355

**Context:** rows

Salvager

### classes.js:359

**Context:** rows

Completed paid contracts reward +20 gold.

### classes.js:364

**Context:** rows

Escape artist

### classes.js:368

**Context:** rows

Immediate external retreat when this thief is conscious.

### classes.js:370

**Context:** rows

Rune thief

### classes.js:370

**Context:** rows

Magical threat −12.

### classes.js:374

**Context:** rows

Ghost walk

### classes.js:378

**Context:** rows

Reveal false labyrinth paths; undead threat −10.

### classes.js:383

**Context:** rows

Master salvager

### classes.js:387

**Context:** rows

Completed paid contracts reward another +40 gold.

### classes.js:392

**Context:** rows

Vanish

### classes.js:396

**Context:** rows

Physical daily threat −15.

### classes.js:398

**Context:** rows

Perfect route

### classes.js:398

**Context:** rows

Party work +25%.

### classes.js:402

**Context:** rows

Covering fire

### classes.js:406

**Context:** rows

Physical daily threat −10.

### classes.js:408

**Context:** rows

Hunter’s mark

### classes.js:408

**Context:** rows

Party work +15%.

### classes.js:412

**Context:** rows

Silver arrows

### classes.js:416

**Context:** rows

Undead daily threat −15.

### classes.js:418

**Context:** rows

Eagle eye

### classes.js:418

**Context:** rows

Agility +5 when working.

### classes.js:422

**Context:** rows

Spellshot

### classes.js:426

**Context:** rows

Magical daily threat −12.

### classes.js:428

**Context:** rows

Volley

### classes.js:428

**Context:** rows

Party work +20%.

### classes.js:432

**Context:** rows

Watchful guard

### classes.js:436

**Context:** rows

Once per assignment, prevent a fatal blow to a companion.

### classes.js:438

**Context:** rows

True aim

### classes.js:438

**Context:** rows

Agility +8 when working.

### classes.js:442

**Context:** rows

Starshot

### classes.js:446

**Context:** rows

Magic and undead daily threat −15.

### classes.js:496

**Context:** spendLevel

This level already has a training choice.

## equipment.js

### equipment.js:3

**Context:** equipment

Oak shield

### equipment.js:3

**Context:** equipment

A dependable shield from Mara’s workshop.

### equipment.js:4

**Context:** equipment

Trail boots

### equipment.js:4

**Context:** equipment

Dry soles and firm footing.

### equipment.js:7

**Context:** equipment

Ember blade

### equipment.js:11

**Context:** equipment

A warm blade forged from the furnace’s recovered iron.

### equipment.js:13

**Context:** equipment

Moon bow

### equipment.js:13

**Context:** equipment

Its silver string reveals moving shadows.

### equipment.js:14

**Context:** equipment

Ward staff

### equipment.js:14

**Context:** equipment

A portable circle of protection.

### equipment.js:17

**Context:** equipment

Stone mail

### equipment.js:21

**Context:** equipment

Flexible plates carved with Oren’s craft marks.

### equipment.js:25

**Context:** equipment

River charm

### equipment.js:29

**Context:** equipment

Keeps its wearer steady on flooded roads.

### equipment.js:31

**Context:** equipment

Echo lens

### equipment.js:31

**Context:** equipment

Shows a second image where an illusion stands.

### equipment.js:34

**Context:** equipment

Thorn spear

### equipment.js:38

**Context:** equipment

Living thorns turn toward approaching danger.

### equipment.js:40

**Context:** equipment

Frost cloak

### equipment.js:40

**Context:** equipment

Absorbs the heat of hostile spells.

### equipment.js:41

**Context:** equipment

Sun hammer

### equipment.js:41

**Context:** equipment

Breaks armour and lights sealed passages.

### equipment.js:44

**Context:** equipment

Star compass

### equipment.js:48

**Context:** equipment

Always points toward the last safe camp.

### equipment.js:52

**Context:** equipment

Phoenix pin

### equipment.js:56

**Context:** equipment

Reduces daily harm risk; it cannot resurrect the dead.

### equipment.js:58

**Context:** equipment

Mist boots

### equipment.js:58

**Context:** equipment

Steps leave a trail of blue vapour.

### equipment.js:61

**Context:** equipment

Oath shield

### equipment.js:65

**Context:** equipment

Inscribed with the names of the people it protects.

### equipment.js:69

**Context:** equipment

Root crown

### equipment.js:73

**Context:** equipment

Whispers when living roots are disturbed.

### equipment.js:77

**Context:** equipment

Glass dagger

### equipment.js:81

**Context:** equipment

Its edge reflects the nearest threat.

### equipment.js:83

**Context:** equipment

Storm rod

### equipment.js:83

**Context:** equipment

Stores lightning collected above the tower.

### equipment.js:86

**Context:** equipment

Iron heart

### equipment.js:90

**Context:** equipment

A clockwork breastplate made for long journeys.

### equipment.js:94

**Context:** equipment

Lantern spear

### equipment.js:98

**Context:** equipment

Carries a small, steady flame through the dark.

### equipment.js:102

**Context:** equipment

Thread ring

### equipment.js:106

**Context:** equipment

Marks the path back without binding its wearer.

### equipment.js:112

**Context:** injuryNames

Fit

### equipment.js:112

**Context:** injuryNames

Hurt

### equipment.js:112

**Context:** injuryNames

Injured

### equipment.js:112

**Context:** injuryNames

Incapacitated

### equipment.js:112

**Context:** injuryNames

Unconscious

### equipment.js:112

**Context:** injuryNames

Dead

## contracts.js

### contracts.js:8

**Context:** abilityNames → guard

Guard

### contracts.js:9

**Context:** abilityNames → tracking

Tracking

### contracts.js:10

**Context:** abilityNames → literacy

Magical literacy

### contracts.js:11

**Context:** abilityNames → water

Water breathing

### contracts.js:12

**Context:** abilityNames → stoneSong

Stone song

### contracts.js:13

**Context:** abilityNames → echoSight

Echo sight

### contracts.js:14

**Context:** abilityNames → threadwalk

Threadwalk

### contracts.js:15

**Context:** abilityNames → undeadLabour

Undead labour

### contracts.js:16

**Context:** abilityNames → graveEndurance

Grave endurance

### contracts.js:17

**Context:** abilityNames → inscriptions

House inscriptions

### contracts.js:18

**Context:** abilityNames → anchorSight

Anchor sight

### contracts.js:98

**Context:** dragonContract → dragon → name

Dragon in the old furnace

### contracts.js:108

**Context:** dragonContract → dragon → desc

A dragon has nested around the guild’s old furnace. Clear it before anyone can use the forge. Party work damages the dragon each day; withdrawing preserves that damage. Its hoard has not been inspected.

### contracts.js:109

**Context:** dragonContract → dragon → checks → label

Combined Strength 60 for the ten-day clearing plan

### contracts.js:114

**Context:** homeThreats → ghost → name

Ghost in the guildhall

### contracts.js:124

**Context:** homeThreats → ghost → desc

A ghost has entered the guildhall. Only fit residents at home can defend it. Its first undefended attack injures a resident; its next damages a room. This repeats until defended. Damaged rooms need 30-gold repairs before story work can continue.

### contracts.js:125

**Context:** homeThreats → ghost → checks → label

Combined Intellect 12

### contracts.js:129

**Context:** homeThreats → monster → name

Wandering monster at the gate

### contracts.js:139

**Context:** homeThreats → monster → desc

A wandering monster is attacking the entrance. Keep residents home to defend the guild. Every undefended day causes up to 8 gold of damage.

### contracts.js:140

**Context:** homeThreats → monster → checks → label

Combined Strength 16

### contracts.js:146

**Context:** invaders

Frost spiders

### contracts.js:151

**Context:** invaders

Frost spiders have nested beneath the quarters stair. Their webs freeze the doors shut.

### contracts.js:156

**Context:** invaders

Alchemical slime

### contracts.js:161

**Context:** invaders

A split laboratory jar has released a slime that dissolves wood and leather.

### contracts.js:166

**Context:** invaders

Chest mimic

### contracts.js:171

**Context:** invaders

A borrowed chest has unfolded teeth in the service room.

### contracts.js:176

**Context:** invaders

Thorn hounds

### contracts.js:181

**Context:** invaders

A pack followed a returning party into the guild. Living thorns cover their hides.

### contracts.js:186

**Context:** invaders

Possessed armour

### contracts.js:191

**Context:** invaders

An empty suit of armour is attacking anyone who approaches the records.

### contracts.js:196

**Context:** invaders

Void moth swarm

### contracts.js:201

**Context:** invaders

A swarm pours through a lamp connected to the fallen beacon.

### contracts.js:206

**Context:** invaders

Broken stone golem

### contracts.js:211

**Context:** invaders

A maintenance golem has mistaken the guild’s residents for intruders.

### contracts.js:216

**Context:** invaders

Bell wraith

### contracts.js:221

**Context:** invaders

The old alarm has called a wraith into the hall. It attacks the living, then the walls.

### contracts.js:249

**Context:** desc

Only residents at home can defend. Undefended attacks injure residents first, then damage rooms.

### contracts.js:250

**Context:** checks → label

Combined

### contracts.js:292

**Context:** assessContract → label

Combined ⟦stat.toUpperCase()⟧ ⟦totals[stat]⟧

**Source template:**

```text
Combined ⟦stat.toUpperCase()⟧ ⟦totals[stat]⟧
```

### contracts.js:305

**Context:** assessContract → label

Class defences / vulnerabilities (

### contracts.js:310

**Context:** assessContract → label

Class skills (

### contracts.js:312

**Context:** assessContract → label

Equipped magic wards

## game.js

### game.js:31

**Context:** Interface / runtime text

(prefers-reduced-motion: reduce)

### game.js:57

**Context:** renderRecords

Personal records · diaries and letters

### game.js:58

**Context:** renderRecords

**Display text** (markup removed):

Read one page at a time. Restored and investigated rooms reveal records; correspondence opens roads home.Room or correspondence⟦pages.map((r) => `${esc(r.room + ' · ' + r.author)}${state.flags['record_' + r.id] ? ' · collected' : ' · unread'}`).join('')⟧⟦current ? (state.flags['record_' + current.id] ? paragraphs(current.text) : 'This record is ready to recover.' + btn('Read ' + current.room, 'record:' + current.id)) : 'No records are accessible yet.'⟧

**Source template:**

```text
<p>Read one page at a time. Restored and investigated rooms reveal records; correspondence opens roads home.</p><label for="personal-record">Room or correspondence</label><select id="personal-record">⟦pages.map((r) => `<option value="${r.id}" ${r.id === selectedRecord ? 'selected' : ''}>${esc(r.room + ' · ' + r.author)}${state.flags['record_' + r.id] ? ' · collected' : ' · unread'}</option>`).join('')⟧</select>⟦current ? (state.flags['record_' + current.id] ? paragraphs(current.text) : '<p>This record is ready to recover.</p>' + btn('Read ' + current.room, 'record:' + current.id)) : '<p>No records are accessible yet.</p>'⟧
```

### game.js:58

**Context:** renderRecords

**Display text** (markup removed):

⟦esc(r.room + ' · ' + r.author)⟧⟦state.flags['record_' + r.id] ? ' · collected' : ' · unread'⟧

**Source template:**

```text
<option value="⟦r.id⟧" ⟦r.id === selectedRecord ? 'selected' : ''⟧>⟦esc(r.room + ' · ' + r.author)⟧⟦state.flags['record_' + r.id] ? ' · collected' : ' · unread'⟧</option>
```

### game.js:58

**Context:** renderRecords

**Display text** (markup removed):

This record is ready to recover.

**Source template:**

```text
<p>This record is ready to recover.</p>
```

### game.js:58

**Context:** renderRecords

Read

### game.js:58

**Context:** renderRecords

record:

### game.js:58

**Context:** renderRecords

**Display text** (markup removed):

No records are accessible yet.

**Source template:**

```text
<p>No records are accessible yet.</p>
```

### game.js:89

**Context:** persist

Browser storage unavailable. Export a save from Journal.

### game.js:103

**Context:** scene

**Display text** (markup removed):

⟦esc(c.preview)⟧⟦btn(c.label, c.action, c.disabled)⟧

**Source template:**

```text
<div class="card"><p>⟦esc(c.preview)⟧</p>⟦btn(c.label, c.action, c.disabled)⟧</div>
```

### game.js:106

**Context:** scene

Think about it

### game.js:106

**Context:** scene

Continue →

### game.js:144

**Context:** openChoice

That discovery has already been answered or is not yet available.

### game.js:152

**Context:** openChoice → action

story:⟦id⟧:⟦c.id⟧

**Source template:**

```text
story:⟦id⟧:⟦c.id⟧
```

### game.js:164

**Context:** openMission → action

decide:⟦uid⟧:⟦c.id⟧

**Source template:**

```text
decide:⟦uid⟧:⟦c.id⟧
```

### game.js:182

**Context:** renderStore → html

**Display text** (markup removed):

Purchases are delivered to shared storage. Each resident carries one item. Return it here before another resident can use it.

**Source template:**

```text
<p>Purchases are delivered to shared storage. Each resident carries one item. Return it here before another resident can use it.</p>
```

### game.js:185

**Context:** renderStore

· in the store

### game.js:186

**Context:** renderStore

**Display text** (markup removed):

Equipped: ⟦esc(D.equipment.find((e) => e.id === visitor.gear)?.name || 'nothing')⟧⟦visitor.gear ? btn('Return equipment to storage', 'unequip:' + visitor.id) : ''⟧

**Source template:**

```text
<p>Equipped: ⟦esc(D.equipment.find((e) => e.id === visitor.gear)?.name || 'nothing')⟧</p>⟦visitor.gear ? btn('Return equipment to storage', 'unequip:' + visitor.id) : ''⟧
```

### game.js:186

**Context:** renderStore

Return equipment to storage

### game.js:186

**Context:** renderStore

unequip:

### game.js:189

**Context:** renderStore

Visit the store to equip items

### game.js:190

**Context:** renderStore

**Display text** (markup removed):

Control a fit resident, walk to the service room’s labelled STORE door, and press E. Rowan cannot carry expedition equipment.⟦btn('Walk to store door', 'walk:790')⟧

**Source template:**

```text
<p>Control a fit resident, walk to the service room’s labelled STORE door, and press E. Rowan cannot carry expedition equipment.</p>⟦btn('Walk to store door', 'walk:790')⟧
```

### game.js:190

**Context:** renderStore

Walk to store door

### game.js:190

**Context:** renderStore

walk:790

### game.js:192

**Context:** renderStore

**Display text** (markup removed):

Guild inventory

**Source template:**

```text
<h3>Guild inventory</h3>
```

### game.js:198

**Context:** renderStore

**Display text** (markup removed):

⟦owner ? (owner.status === 'dead' ? 'Lost with ' : 'Carried by ') + esc(owner.name) : 'Available in storage'⟧ · ⟦Object.entries(
def.stats,
)
.map(([k, v]) => k.toUpperCase() + ' +' + v)
.join(
' · ',
)⟧⟦def.protection ? ' · ' + def.protection + ' threat reduction' : ''⟧⟦visitor && !owner ? btn('Equip on ' + visitor.name, 'equipItem:' + visitor.id + ':' + item.uid, !!visitor.gear) : ''⟧

**Source template:**

```text
<p>⟦owner ? (owner.status === 'dead' ? 'Lost with ' : 'Carried by ') + esc(owner.name) : 'Available in storage'⟧ · ⟦Object.entries(
        def.stats,
      )
        .map(([k, v]) => k.toUpperCase() + ' +' + v)
        .join(
          ' · ',
        )⟧⟦def.protection ? ' · ' + def.protection + ' threat reduction' : ''⟧</p>⟦visitor && !owner ? btn('Equip on ' + visitor.name, 'equipItem:' + visitor.id + ':' + item.uid, !!visitor.gear) : ''⟧
```

### game.js:198

**Context:** renderStore

Lost with

### game.js:198

**Context:** renderStore

Carried by

### game.js:198

**Context:** renderStore

Available in storage

### game.js:204

**Context:** renderStore

threat reduction

### game.js:204

**Context:** renderStore

Equip on

### game.js:204

**Context:** renderStore

equipItem:

### game.js:208

**Context:** renderStore

**Display text** (markup removed):

Quartermaster catalogue

**Source template:**

```text
<h3>Quartermaster catalogue</h3>
```

### game.js:213

**Context:** renderStore

**Display text** (markup removed):

⟦esc(e.desc)⟧⟦Object.entries(e.stats)
.map(([k, v]) => k.toUpperCase() + ' +' + v)
.join(
' · ',
)⟧⟦e.protection ? ' · ' + e.protection + ' percentage points less daily threat' : ''⟧⟦btn('Buy into storage · ' + e.cost + 'g', 'buy:' + e.id, state.gold < e.cost)⟧

**Source template:**

```text
<p>⟦esc(e.desc)⟧</p><p class="stats">⟦Object.entries(e.stats)
            .map(([k, v]) => k.toUpperCase() + ' +' + v)
            .join(
              ' · ',
            )⟧⟦e.protection ? ' · ' + e.protection + ' percentage points less daily threat' : ''⟧</p>⟦btn('Buy into storage · ' + e.cost + 'g', 'buy:' + e.id, state.gold < e.cost)⟧
```

### game.js:217

**Context:** renderStore

percentage points less daily threat

### game.js:217

**Context:** renderStore

Buy into storage ·

### game.js:217

**Context:** renderStore

buy:

### game.js:225

**Context:** renderContracts → html

**Display text** (markup removed):

Party stats add together. Below the target, a contract takes longer. Every working day has a fresh chance of harm to one party member. Defensive stats and relevant abilities reduce that chance.

**Source template:**

```text
<p>Party stats add together. Below the target, a contract takes longer. Every working day has a fresh chance of harm to one party member. Defensive stats and relevant abilities reduce that chance.</p>
```

### game.js:227

**Context:** renderContracts

**Display text** (markup removed):

Every day has an 8% chance of a home attack. Keep some residents at home. Story and plot-item missions appear first. One-time requests disappear permanently when finished; repeatable work is labelled and returns the next day.Completed contracts in Journal

**Source template:**

```text
<p class="stats">Every day has an 8% chance of a home attack. Keep some residents at home. Story and plot-item missions appear first. One-time requests disappear permanently when finished; repeatable work is labelled and returns the next day.</p><button data-tab="Journal">Completed contracts in Journal</button>
```

### game.js:229

**Context:** renderContracts

**Display text** (markup removed):

Preparation resources: ⟦state.community⟧ community contacts; ⟦state.knowledge⟧ research findings.

**Source template:**

```text
<p class="stats">Preparation resources: ⟦state.community⟧ community contacts; ⟦state.knowledge⟧ research findings.</p>
```

### game.js:233

**Context:** renderContracts

Service room

### game.js:235

**Context:** renderContracts

Quarters

### game.js:237

**Context:** renderContracts

**Display text** (markup removed):

Story work is blocked until this room is repaired. Clearing the attacker does not restore it.⟦btn('Repair room · 30g', 'repairDamage:' + id)⟧

**Source template:**

```text
<p>Story work is blocked until this room is repaired. Clearing the attacker does not restore it.</p>⟦btn('Repair room · 30g', 'repairDamage:' + id)⟧
```

### game.js:237

**Context:** renderContracts

Repair room · 30g

### game.js:237

**Context:** renderContracts

repairDamage:

### game.js:241

**Context:** renderContracts

HOME UNDER ATTACK

### game.js:242

**Context:** renderContracts

**Display text** (markup removed):

⟦esc(D.homeDanger(state).name)⟧ · ⟦D.homeDanger(state).id !== 'monster' ? 'Attacks residents first, then damages rooms. Each damaged room needs a 30g repair.' : state.threats[D.homeDanger(state).id].damage + ' gold lost to damage. Undefended days cost up to 8 gold.'⟧ Only fit residents at home can help.

**Source template:**

```text
<p class="threat-badge">⟦esc(D.homeDanger(state).name)⟧ · ⟦D.homeDanger(state).id !== 'monster' ? 'Attacks residents first, then damages rooms. Each damaged room needs a 30g repair.' : state.threats[D.homeDanger(state).id].damage + ' gold lost to damage. Undefended days cost up to 8 gold.'⟧ Only fit residents at home can help.</p>
```

### game.js:242

**Context:** renderContracts

Attacks residents first, then damages rooms. Each damaged room needs a 30g repair.

### game.js:242

**Context:** renderContracts

gold lost to damage. Undefended days cost up to 8 gold.

### game.js:255

**Context:** renderContracts

**Display text** (markup removed):

⟦def.internal ? 'GUILD THREAT · PARTY AT HOME' : def.lethal ? 'LETHAL EXPEDITION' : 'EXPEDITION'⟧⟦m.party
.map((id) => {
const c = state.roster.find((c) => c.id === id);
return esc(c.name) + ' (' + D.injuryNames[D.injuryLevel(c)] + ')';
})
.join(
', ',
)⟧ · ⟦m.status === 'decision' ? 'Report waiting' : m.status === 'returning' ? 'Retreat · home tomorrow' : m.stalled ? 'No conscious workers · stranded' : m.remaining + ' days remaining'⟧⟦progress !== null
? `${def.internal ? 'Clearing progress' : 'Work'} · ${progress}%${m.elapsed} days worked · ${m.harm.length} harm events · ${m.kits} medical kits remaining${
              m.harm.length
                ? 'Latest: ' +
                  m.harm
                    .slice(-3)
                    .map(
                      (h) =>
                        `Day ${h.day}: ${esc(state.roster.find((c) => c.id === h.id).name)}${h.treated ? ' · kit used' : h.warded ? ' · death ward used' : ' · ' + (D.injuryNames[h.level] || 'hurt') + ' · +' + h.injuryDays + ' recovery days'}`,
                    )
                    .join('')
                : ''
            }`
: 'The expedition is underway.'⟧⟦m.status === 'travelling' && m.simulation === 'daily' ? `⚠ ${assessment.threat}% harm chance each day` : ''⟧⟦m.status === 'decision' ? btn('Read the expedition letter', 'letter:' + m.uid) : ''⟧⟦['travelling', 'decision'].includes(m.status) ? `${def.internal ? btn('Watch fight', 'watch:' + m.uid) : ''}${btn(def.internal ? 'Withdraw entire party' : 'Retreat · return tomorrow', 'withdraw:' + m.uid, !def.internal && !D.canWithdraw(state, m))}${(def.internal ? m.party : []).map((id) => btn('Withdraw ' + state.roster.find((c) => c.id === id).name, 'withdraw:' + m.uid + ':' + id)).join('')}${def.internal ? 'Withdrawal is immediate. Clearing progress stays.' : 'A conscious survivor must lead the retreat. The party returns tomorrow with its wounded.'} Injuries need recovery. ${def.homeEvent ? 'Defenders protect the guild.' : 'The hoard is paid only after clearing the threat.'}` : ''⟧

**Source template:**

```text
<span class="tag">⟦def.internal ? 'GUILD THREAT · PARTY AT HOME' : def.lethal ? 'LETHAL EXPEDITION' : 'EXPEDITION'⟧</span><p>⟦m.party
        .map((id) => {
          const c = state.roster.find((c) => c.id === id);
          return esc(c.name) + ' (' + D.injuryNames[D.injuryLevel(c)] + ')';
        })
        .join(
          ', ',
        )⟧ · ⟦m.status === 'decision' ? 'Report waiting' : m.status === 'returning' ? 'Retreat · home tomorrow' : m.stalled ? 'No conscious workers · stranded' : m.remaining + ' days remaining'⟧</p>⟦progress !== null
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
          : '<p class="stats">The expedition is underway.</p>'⟧⟦m.status === 'travelling' && m.simulation === 'daily' ? `<p class="threat-badge">⚠ ${assessment.threat}% harm chance each day</p>` : ''⟧⟦m.status === 'decision' ? btn('Read the expedition letter', 'letter:' + m.uid) : ''⟧⟦['travelling', 'decision'].includes(m.status) ? `<div class="row">${def.internal ? btn('Watch fight', 'watch:' + m.uid) : ''}${btn(def.internal ? 'Withdraw entire party' : 'Retreat · return tomorrow', 'withdraw:' + m.uid, !def.internal && !D.canWithdraw(state, m))}${(def.internal ? m.party : []).map((id) => btn('Withdraw ' + state.roster.find((c) => c.id === id).name, 'withdraw:' + m.uid + ':' + id)).join('')}</div><p class="stats">${def.internal ? 'Withdrawal is immediate. Clearing progress stays.' : 'A conscious survivor must lead the retreat. The party returns tomorrow with its wounded.'} Injuries need recovery. ${def.homeEvent ? 'Defenders protect the guild.' : 'The hoard is paid only after clearing the threat.'}</p>` : ''⟧
```

### game.js:255

**Context:** renderContracts

GUILD THREAT · PARTY AT HOME

### game.js:255

**Context:** renderContracts

LETHAL EXPEDITION

### game.js:255

**Context:** renderContracts

EXPEDITION

### game.js:262

**Context:** renderContracts

Report waiting

### game.js:262

**Context:** renderContracts

Retreat · home tomorrow

### game.js:262

**Context:** renderContracts

No conscious workers · stranded

### game.js:262

**Context:** renderContracts

days remaining

### game.js:264

**Context:** renderContracts

**Display text** (markup removed):

⟦def.internal ? 'Clearing progress' : 'Work'⟧ · ⟦progress⟧%⟦m.elapsed⟧ days worked · ⟦m.harm.length⟧ harm events · ⟦m.kits⟧ medical kits remaining⟦m.harm.length
? 'Latest: ' +
m.harm
.slice(-3)
.map(
(h) =>
`Day ${h.day}: ${esc(state.roster.find((c) => c.id === h.id).name)}${h.treated ? ' · kit used' : h.warded ? ' · death ward used' : ' · ' + (D.injuryNames[h.level] || 'hurt') + ' · +' + h.injuryDays + ' recovery days'}`,
)
.join('')
: ''⟧

**Source template:**

```text
<label class="stats">⟦def.internal ? 'Clearing progress' : 'Work'⟧ · ⟦progress⟧%<progress value="⟦m.progress⟧" max="⟦total⟧"></progress></label><p class="stats">⟦m.elapsed⟧ days worked · ⟦m.harm.length⟧ harm events · ⟦m.kits⟧ medical kits remaining⟦m.harm.length
                ? '<br>Latest: ' +
                  m.harm
                    .slice(-3)
                    .map(
                      (h) =>
                        `Day ${h.day}: ${esc(state.roster.find((c) => c.id === h.id).name)}${h.treated ? ' · kit used' : h.warded ? ' · death ward used' : ' · ' + (D.injuryNames[h.level] || 'hurt') + ' · +' + h.injuryDays + ' recovery days'}`,
                    )
                    .join('<br>')
                : ''⟧</p>
```

### game.js:264

**Context:** renderContracts

Clearing progress

### game.js:264

**Context:** renderContracts

Work

### game.js:266

**Context:** renderContracts

**Display text** (markup removed):

Latest:

**Source template:**

```text
<br>Latest:
```

### game.js:271

**Context:** renderContracts

Day ⟦h.day⟧: ⟦esc(state.roster.find((c) => c.id === h.id).name)⟧⟦h.treated ? ' · kit used' : h.warded ? ' · death ward used' : ' · ' + (D.injuryNames[h.level] || 'hurt') + ' · +' + h.injuryDays + ' recovery days'⟧

**Source template:**

```text
Day ⟦h.day⟧: ⟦esc(state.roster.find((c) => c.id === h.id).name)⟧⟦h.treated ? ' · kit used' : h.warded ? ' · death ward used' : ' · ' + (D.injuryNames[h.level] || 'hurt') + ' · +' + h.injuryDays + ' recovery days'⟧
```

### game.js:271

**Context:** renderContracts

· kit used

### game.js:271

**Context:** renderContracts

· death ward used

### game.js:271

**Context:** renderContracts

recovery days

### game.js:276

**Context:** renderContracts

**Display text** (markup removed):

The expedition is underway.

**Source template:**

```text
<p class="stats">The expedition is underway.</p>
```

### game.js:277

**Context:** renderContracts

**Display text** (markup removed):

⚠ ⟦assessment.threat⟧% harm chance each day

**Source template:**

```text
<p class="threat-badge">⚠ ⟦assessment.threat⟧% harm chance each day</p>
```

### game.js:277

**Context:** renderContracts

Read the expedition letter

### game.js:277

**Context:** renderContracts

letter:

### game.js:277

**Context:** renderContracts

**Display text** (markup removed):

⟦def.internal ? btn('Watch fight', 'watch:' + m.uid) : ''⟧⟦btn(def.internal ? 'Withdraw entire party' : 'Retreat · return tomorrow', 'withdraw:' + m.uid, !def.internal && !D.canWithdraw(state, m))⟧⟦(def.internal ? m.party : []).map((id) => btn('Withdraw ' + state.roster.find((c) => c.id === id).name, 'withdraw:' + m.uid + ':' + id)).join('')⟧⟦def.internal ? 'Withdrawal is immediate. Clearing progress stays.' : 'A conscious survivor must lead the retreat. The party returns tomorrow with its wounded.'⟧ Injuries need recovery. ⟦def.homeEvent ? 'Defenders protect the guild.' : 'The hoard is paid only after clearing the threat.'⟧

**Source template:**

```text
<div class="row">⟦def.internal ? btn('Watch fight', 'watch:' + m.uid) : ''⟧⟦btn(def.internal ? 'Withdraw entire party' : 'Retreat · return tomorrow', 'withdraw:' + m.uid, !def.internal && !D.canWithdraw(state, m))⟧⟦(def.internal ? m.party : []).map((id) => btn('Withdraw ' + state.roster.find((c) => c.id === id).name, 'withdraw:' + m.uid + ':' + id)).join('')⟧</div><p class="stats">⟦def.internal ? 'Withdrawal is immediate. Clearing progress stays.' : 'A conscious survivor must lead the retreat. The party returns tomorrow with its wounded.'⟧ Injuries need recovery. ⟦def.homeEvent ? 'Defenders protect the guild.' : 'The hoard is paid only after clearing the threat.'⟧</p>
```

### game.js:277

**Context:** renderContracts

Watch fight

### game.js:277

**Context:** renderContracts

watch:

### game.js:277

**Context:** renderContracts

Withdraw entire party

### game.js:277

**Context:** renderContracts

Retreat · return tomorrow

### game.js:277

**Context:** renderContracts

withdraw:

### game.js:277

**Context:** renderContracts

Withdraw

### game.js:277

**Context:** renderContracts

withdraw:

### game.js:277

**Context:** renderContracts

Withdrawal is immediate. Clearing progress stays.

### game.js:277

**Context:** renderContracts

A conscious survivor must lead the retreat. The party returns tomorrow with its wounded.

### game.js:277

**Context:** renderContracts

Defenders protect the guild.

### game.js:277

**Context:** renderContracts

The hoard is paid only after clearing the threat.

### game.js:289

**Context:** renderContracts

**Display text** (markup removed):

⟦esc(D.contractLabel(def).kind)⟧⟦esc(D.contractLabel(def).detail)⟧⟦esc(def.desc)⟧⟦def.lethal ? 'LETHAL · repeated harm can kill. Retreat before everyone loses consciousness.' : ''⟧Party ⟦profile.stat.toUpperCase()⟧ ⟦profile.amount⟧⟦def.days⟧ base days · ⟦profile.threat⟧% base daily threat · ⟦D.risk(state, def.id, []).damageType⟧ harm⟦def.homeEvent ? '' + def.xp + ' defence XP per resident' : def.hiddenReward ? 'Reward and XP unknown until cleared' : rewardSummary(def.reward, def.xp)⟧⟦cost ? ' · ' + cost + 'g preparation' : ''⟧ · Up to ⟦def.capacity⟧ residents⟦saved ? `Damage preserved · ${Math.floor((saved / total) * 100)}%` : ''⟧⟦def.personal ? `${D.recruits.find((c) => c.id === def.personal).name} must join.` : ''⟧⟦state.roster
.filter((c) => c.status === 'home')
.map(
(c) =>
`${esc(c.name)}STR ${c.str} · AGI ${c.agi} · INT ${c.int} · END ${c.end}${c.skills.length ? ' · ' + c.skills.map((k) => esc(abilityNames[k] || k)).join(', ') : ''}`,
)
.join(
'',
)⟧Select residents to calculate time and daily threat. One medical kit · 10g · treats the first harm event; later harm still causes injury⟦btn(def.internal ? 'Assign clearing party' : 'Dispatch party', 'dispatch:' + def.id, true)⟧

**Source template:**

```text
<span class="tag">⟦esc(D.contractLabel(def).kind)⟧</span><p><strong>⟦esc(D.contractLabel(def).detail)⟧</strong></p><p>⟦esc(def.desc)⟧</p>⟦def.lethal ? '<p class="threat-badge">LETHAL · repeated harm can kill. Retreat before everyone loses consciousness.</p>' : ''⟧<div class="contract-target"><strong>Party ⟦profile.stat.toUpperCase()⟧ ⟦profile.amount⟧</strong><span>⟦def.days⟧ base days · ⟦profile.threat⟧% base daily threat · ⟦D.risk(state, def.id, []).damageType⟧ harm</span></div><p class="stats">⟦def.homeEvent ? '' + def.xp + ' defence XP per resident' : def.hiddenReward ? 'Reward and XP unknown until cleared' : rewardSummary(def.reward, def.xp)⟧⟦cost ? ' · ' + cost + 'g preparation' : ''⟧ · Up to ⟦def.capacity⟧ residents</p>⟦saved ? `<label class="stats">Damage preserved · ${Math.floor((saved / total) * 100)}%<progress value="${saved}" max="${total}"></progress></label>` : ''⟧⟦def.personal ? `<p>${D.recruits.find((c) => c.id === def.personal).name} must join.</p>` : ''⟧<div class="party-picker">⟦state.roster
        .filter((c) => c.status === 'home')
        .map(
          (c) =>
            `<label><input type="checkbox" data-party="${def.id}" value="${c.id}"><span><strong>${esc(c.name)}</strong><small>STR ${c.str} · AGI ${c.agi} · INT ${c.int} · END ${c.end}${c.skills.length ? ' · ' + c.skills.map((k) => esc(abilityNames[k] || k)).join(', ') : ''}</small></span></label>`,
        )
        .join(
          '',
        )⟧</div><div class="party-preview" data-risk="⟦def.id⟧">Select residents to calculate time and daily threat.</div><label class="stats"><input type="checkbox" id="supply-⟦def.id⟧"> One medical kit · 10g · treats the first harm event; later harm still causes injury</label>⟦btn(def.internal ? 'Assign clearing party' : 'Dispatch party', 'dispatch:' + def.id, true)⟧
```

### game.js:289

**Context:** renderContracts

**Display text** (markup removed):

LETHAL · repeated harm can kill. Retreat before everyone loses consciousness.

**Source template:**

```text
<p class="threat-badge">LETHAL · repeated harm can kill. Retreat before everyone loses consciousness.</p>
```

### game.js:289

**Context:** renderContracts

defence XP per resident

### game.js:289

**Context:** renderContracts

Reward and XP unknown until cleared

### game.js:289

**Context:** renderContracts

g preparation

### game.js:289

**Context:** renderContracts

**Display text** (markup removed):

Damage preserved · ⟦Math.floor((saved / total) * 100)⟧%

**Source template:**

```text
<label class="stats">Damage preserved · ⟦Math.floor((saved / total) * 100)⟧%<progress value="⟦saved⟧" max="⟦total⟧"></progress></label>
```

### game.js:289

**Context:** renderContracts

**Display text** (markup removed):

⟦D.recruits.find((c) => c.id === def.personal).name⟧ must join.

**Source template:**

```text
<p>⟦D.recruits.find((c) => c.id === def.personal).name⟧ must join.</p>
```

### game.js:293

**Context:** renderContracts

**Display text** (markup removed):

⟦esc(c.name)⟧STR ⟦c.str⟧ · AGI ⟦c.agi⟧ · INT ⟦c.int⟧ · END ⟦c.end⟧⟦c.skills.length ? ' · ' + c.skills.map((k) => esc(abilityNames[k] || k)).join(', ') : ''⟧

**Source template:**

```text
<label><input type="checkbox" data-party="⟦def.id⟧" value="⟦c.id⟧"><span><strong>⟦esc(c.name)⟧</strong><small>STR ⟦c.str⟧ · AGI ⟦c.agi⟧ · INT ⟦c.int⟧ · END ⟦c.end⟧⟦c.skills.length ? ' · ' + c.skills.map((k) => esc(abilityNames[k] || k)).join(', ') : ''⟧</small></span></label>
```

### game.js:297

**Context:** renderContracts

Assign clearing party

### game.js:297

**Context:** renderContracts

Dispatch party

### game.js:297

**Context:** renderContracts

dispatch:

### game.js:301

**Context:** renderContracts

Work at the doorstep

### game.js:302

**Context:** renderContracts

**Display text** (markup removed):

Mara pays 12 gold for a day of mending. Available with no active assignment. Time passes and injured residents recover.⟦btn('Spend a day mending · +12g', 'emergency')⟧

**Source template:**

```text
<p>Mara pays 12 gold for a day of mending. Available with no active assignment. Time passes and injured residents recover.</p>⟦btn('Spend a day mending · +12g', 'emergency')⟧
```

### game.js:302

**Context:** renderContracts

Spend a day mending · +12g

### game.js:309

**Context:** updatePartyPreview → button

[data-action="dispatch:⟦id⟧"]

**Source template:**

```text
[data-action="dispatch:⟦id⟧"]
```

### game.js:311

**Context:** updatePartyPreview

Select residents to calculate time and daily threat.

### game.js:317

**Context:** updatePartyPreview

**Display text** (markup removed):

Combined ⟦r.requirement.stat.toUpperCase()⟧ ⟦r.combined⟧ / ⟦r.requirement.amount⟧⟦r.days === null ? 'No progress' : r.days + ' days'⟧⟦r.combined ⟦r.threat⟧% chance of harm each day⟦r.damageType⟧ harm · ⟦r.workBonus⟧% class work bonus⟦r.baseThreat⟧% base threat⟦r.reductions.length ? ' − ' + r.reductions.map((x) => esc(x.label) + ' (' + (x.amount Approximately ⟦r.exposure⟧% chance of at least one harm event over this assignment. A kit treats one event; it does not prevent the roll.

**Source template:**

```text
<strong>Combined ⟦r.requirement.stat.toUpperCase()⟧ ⟦r.combined⟧ / ⟦r.requirement.amount⟧</strong><p>⟦r.days === null ? 'No progress' : r.days + ' days'⟧⟦r.combined < r.requirement.amount ? ' · below target; longer exposure' : ''⟧ · <strong>⟦r.threat⟧% chance of harm each day</strong></p><p class="stats">⟦r.damageType⟧ harm · ⟦r.workBonus⟧% class work bonus<br>⟦r.baseThreat⟧% base threat⟦r.reductions.length ? ' − ' + r.reductions.map((x) => esc(x.label) + ' (' + (x.amount < 0 ? 'adds ' + Math.abs(Math.round(x.amount * 10) / 10) + ' risk points' : Math.round(x.amount * 10) / 10 + ' points') + ')').join(' − ') : ''⟧<br>Approximately ⟦r.exposure⟧% chance of at least one harm event over this assignment. A kit treats one event; it does not prevent the roll.</p>
```

### game.js:317

**Context:** updatePartyPreview

No progress

### game.js:317

**Context:** updatePartyPreview

· below target; longer exposure

### game.js:317

**Context:** updatePartyPreview

risk points

### game.js:323

**Context:** renderTraining

**Display text** (markup removed):

Find the trapped mason in the entrance hall to begin training.

**Source template:**

```text
<p>Find the trapped mason in the entrance hall to begin training.</p>
```

### game.js:335

**Context:** renderTraining → levelPicker

**Display text** (markup removed):

Level to train⟦pending.map((l) => `Level ${l} · one choice`).join('')⟧

**Source template:**

```text
<div class="training-level-picker"><label for="training-level">Level to train</label><select id="training-level">⟦pending.map((l) => `<option value="${l}" ${l === trainingLevels[c.id] ? 'selected' : ''}>Level ${l} · one choice</option>`).join('')⟧</select></div>
```

### game.js:335

**Context:** renderTraining → levelPicker

**Display text** (markup removed):

Level ⟦l⟧ · one choice

**Source template:**

```text
<option value="⟦l⟧" ⟦l === trainingLevels[c.id] ? 'selected' : ''⟧>Level ⟦l⟧ · one choice</option>
```

### game.js:337

**Context:** renderTraining → html

**Display text** (markup removed):

Character⟦state.roster.map((r) => `${esc(r.name)} · Level ${r.level} · ${esc(D.classOf(r).name)}`).join('')⟧⟦[
['choices', 'Training'],
['path', 'Class'],
['abilities', 'Abilities'],
['spells', 'Spells'],
]
.map(
([id, name]) =>
`${name}`,
)
.join('')⟧⟦levelPicker⟧

**Source template:**

```text
<div class="training-toolbar"><label for="training-character">Character</label><select id="training-character">⟦state.roster.map((r) => `<option value="${r.id}" ${r.id === c.id ? 'selected' : ''}>${esc(r.name)} · Level ${r.level} · ${esc(D.classOf(r).name)}</option>`).join('')⟧</select><div class="training-tabs" role="group" aria-label="Training pages">⟦[
    ['choices', 'Training'],
    ['path', 'Class'],
    ['abilities', 'Abilities'],
    ['spells', 'Spells'],
  ]
    .map(
      ([id, name]) =>
        `<button data-action="trainingPage:${id}" aria-pressed="${trainingSection === id}">${name}</button>`,
    )
    .join('')⟧</div>⟦levelPicker⟧</div>
```

### game.js:337

**Context:** renderTraining → html

**Display text** (markup removed):

⟦esc(r.name)⟧ · Level ⟦r.level⟧ · ⟦esc(D.classOf(r).name)⟧

**Source template:**

```text
<option value="⟦r.id⟧" ⟦r.id === c.id ? 'selected' : ''⟧>⟦esc(r.name)⟧ · Level ⟦r.level⟧ · ⟦esc(D.classOf(r).name)⟧</option>
```

### game.js:338

**Context:** renderTraining → html

Training

### game.js:339

**Context:** renderTraining → html

Class

### game.js:340

**Context:** renderTraining → html

Abilities

### game.js:341

**Context:** renderTraining → html

Spells

### game.js:348

**Context:** renderTraining

**Display text** (markup removed):

⟦esc(c.name)⟧⟦klass.name⟧ · Level ⟦c.level⟧ · ⟦D.injuryNames[D.injuryLevel(c)]⟧STR ⟦c.str⟧ · AGI ⟦c.agi⟧ · INT ⟦c.int⟧ · END ⟦c.end⟧⟦c.level >= 20 ? 'Maximum level' : c.xp + ' / ' + D.xpRequired(c.level) + ' XP to next level'⟧ · ⟦pending.length⟧ unspent ⟦pending.length === 1 ? 'choice' : 'choices'⟧ · ⟦c.status⟧

**Source template:**

```text
<div class="training-profile"><img class="portrait" src="⟦portraits[c.id]⟧" alt="⟦esc(c.name)⟧ portrait"><div><h3>⟦esc(c.name)⟧</h3><span class="tag">⟦klass.name⟧ · Level ⟦c.level⟧ · ⟦D.injuryNames[D.injuryLevel(c)]⟧</span></div></div><p class="stats">STR ⟦c.str⟧ · AGI ⟦c.agi⟧ · INT ⟦c.int⟧ · END ⟦c.end⟧<br>⟦c.level >= 20 ? 'Maximum level' : c.xp + ' / ' + D.xpRequired(c.level) + ' XP to next level'⟧ · ⟦pending.length⟧ unspent ⟦pending.length === 1 ? 'choice' : 'choices'⟧ · ⟦c.status⟧</p>
```

### game.js:348

**Context:** renderTraining

Maximum level

### game.js:348

**Context:** renderTraining

XP to next level

### game.js:352

**Context:** renderTraining

**Display text** (markup removed):

Level ⟦level⟧ · Choose oneChoosing closes every other option for this level.⟦['str', 'agi', 'int', 'end'].map((k) => btn(k.toUpperCase() + ' +1', 'advance:' + c.id + ':' + k + ':' + level, !fit)).join('')⟧

**Source template:**

```text
<h3 class="training-choice-title">Level ⟦level⟧ · Choose one</h3><p class="stats">Choosing closes every other option for this level.</p><div class="row">⟦['str', 'agi', 'int', 'end'].map((k) => btn(k.toUpperCase() + ' +1', 'advance:' + c.id + ':' + k + ':' + level, !fit)).join('')⟧</div>
```

### game.js:352

**Context:** renderTraining

advance:

### game.js:360

**Context:** renderTraining

**Display text** (markup removed):

⟦k.name⟧⟦k.desc⟧⟦btn('Choose ' + k.name, 'advance:' + c.id + ':' + k.id + ':' + level, !fit)⟧

**Source template:**

```text
<div class="class-node"><strong>⟦k.name⟧</strong><p>⟦k.desc⟧</p>⟦btn('Choose ' + k.name, 'advance:' + c.id + ':' + k.id + ':' + level, !fit)⟧</div>
```

### game.js:360

**Context:** renderTraining

Choose

### game.js:360

**Context:** renderTraining

advance:

### game.js:367

**Context:** renderTraining

**Display text** (markup removed):

⟦t.name⟧⟦t.desc⟧⟦btn('Choose ' + t.name, 'talent:' + c.id + ':' + t.id, !fit)⟧

**Source template:**

```text
<div class="class-node"><strong>⟦t.name⟧</strong><p>⟦t.desc⟧</p>⟦btn('Choose ' + t.name, 'talent:' + c.id + ':' + t.id, !fit)⟧</div>
```

### game.js:367

**Context:** renderTraining

Choose

### game.js:367

**Context:** renderTraining

talent:

### game.js:373

**Context:** renderTraining

**Display text** (markup removed):

Choose a class first to see its talent alternatives.

**Source template:**

```text
<p>Choose a class first to see its talent alternatives.</p>
```

### game.js:374

**Context:** renderTraining

Choose class →

### game.js:374

**Context:** renderTraining

trainingPage:path

### game.js:376

**Context:** renderTraining

**Display text** (markup removed):

Complete contracts to earn your next level and its training choice.

**Source template:**

```text
<p>Complete contracts to earn your next level and its training choice.</p>
```

### game.js:377

**Context:** renderTraining

**Display text** (markup removed):

How progression worksThe first level costs ⟦D.xpRequired(1)⟧ XP. The next two cost ⟦D.xpRequired(2)⟧ and ⟦D.xpRequired(3)⟧ XP; later requirements grow progressively. Each contract can grant one level, with surplus XP carried forward. Each earned level gives one choice: stat, skill or talent. Talents appear at levels 3, 6, 9, 12, 15 and 18.The independent archivist can supply seal diagrams after Sera’s archive seal is recovered.

**Source template:**

```text
<details class="training-help"><summary>How progression works</summary><p>The first level costs ⟦D.xpRequired(1)⟧ XP. The next two cost ⟦D.xpRequired(2)⟧ and ⟦D.xpRequired(3)⟧ XP; later requirements grow progressively. Each contract can grant one level, with surplus XP carried forward. Each earned level gives one choice: stat, skill or talent. Talents appear at levels 3, 6, 9, 12, 15 and 18.</p><p>The independent archivist can supply seal diagrams after Sera’s archive seal is recovered.</p></details>
```

### game.js:382

**Context:** renderTraining

**Display text** (markup removed):

Choose a permanent class

**Source template:**

```text
<h3>Choose a permanent class</h3><div class="training-options">
```

### game.js:386

**Context:** renderTraining

**Display text** (markup removed):

⟦D.classes[id].name⟧⟦D.classes[id].desc⟧⟦btn('Become ' + D.classes[id].name, 'specialise:' + c.id + ':' + id, !fit)⟧

**Source template:**

```text
<div class="class-node"><strong>⟦D.classes[id].name⟧</strong><p>⟦D.classes[id].desc⟧</p>⟦btn('Become ' + D.classes[id].name, 'specialise:' + c.id + ':' + id, !fit)⟧</div>
```

### game.js:386

**Context:** renderTraining

Become

### game.js:386

**Context:** renderTraining

specialise:

### game.js:391

**Context:** renderTraining

**Display text** (markup removed):

⟦klass.name⟧⟦klass.desc⟧Growth each level: ⟦Object.entries(
klass.growth,
)
.map(([k, v]) => k.toUpperCase() + ' +' + v)
.join(' · ')⟧. This class is permanent.

**Source template:**

```text
<h3>⟦klass.name⟧</h3><p>⟦klass.desc⟧</p><p class="stats">Growth each level: ⟦Object.entries(
        klass.growth,
      )
        .map(([k, v]) => k.toUpperCase() + ' +' + v)
        .join(' · ')⟧. This class is permanent.</p>
```

### game.js:396

**Context:** renderTraining

**Display text** (markup removed):

Class specialisation unlocks at level 3.

**Source template:**

```text
<p>Class specialisation unlocks at level 3.</p>
```

### game.js:399

**Context:** renderTraining

**Display text** (markup removed):

⟦klass.desc⟧Learned abilities

**Source template:**

```text
<p>⟦klass.desc⟧</p><h3>Learned abilities</h3>
```

### game.js:403

**Context:** renderTraining

**Display text** (markup removed):

⟦esc(abilityNames[id] || id)⟧⟦esc(D.skills[c.type].find((k) => k.id === id)?.desc || 'Innate ability used in exploration and contract assessments.')⟧

**Source template:**

```text
<div class="class-node"><strong>⟦esc(abilityNames[id] || id)⟧</strong><p>⟦esc(D.skills[c.type].find((k) => k.id === id)?.desc || 'Innate ability used in exploration and contract assessments.')⟧</p></div>
```

### game.js:403

**Context:** renderTraining

Innate ability used in exploration and contract assessments.

### game.js:409

**Context:** renderTraining

**Display text** (markup removed):

⟦t.name⟧⟦t.desc⟧

**Source template:**

```text
<div class="class-node learned"><strong>⟦t.name⟧</strong><p>⟦t.desc⟧</p></div>
```

### game.js:412

**Context:** renderTraining

**Display text** (markup removed):

No abilities learned yet.

**Source template:**

```text
<p>No abilities learned yet.</p>
```

### game.js:414

**Context:** renderTraining

**Display text** (markup removed):

Choices by level

**Source template:**

```text
<details><summary>Choices by level</summary>
```

### game.js:418

**Context:** renderTraining

**Display text** (markup removed):

Level ⟦level⟧: ⟦esc(D.talents.find((t) => t.id === v.id)?.name || D.skills[c.type].find((k) => k.id === v.id)?.name || (v.kind === 'legacy' ? 'Preserved earlier training' : v.id.toUpperCase() + ' +1'))⟧

**Source template:**

```text
<p class="stats">Level ⟦level⟧: ⟦esc(D.talents.find((t) => t.id === v.id)?.name || D.skills[c.type].find((k) => k.id === v.id)?.name || (v.kind === 'legacy' ? 'Preserved earlier training' : v.id.toUpperCase() + ' +1'))⟧</p>
```

### game.js:418

**Context:** renderTraining

Preserved earlier training

### game.js:430

**Context:** renderTraining

**Display text** (markup removed):

⟦key === 'heal' ? 'Heal a companion' : 'Repair a zombie'⟧Target⟦targets.map((p) => `${esc(p.name)} · ${D.injuryNames[D.injuryLevel(p)]}`).join('')⟧⟦btn((key === 'heal' ? 'Heal ' : 'Mend ') + target.name, key + ':' + c.id + ':' + target.id, c.lastCastDay === state.day)⟧

**Source template:**

```text
<h3>⟦key === 'heal' ? 'Heal a companion' : 'Repair a zombie'⟧</h3><label for="training-target-⟦key⟧">Target</label><select id="training-target-⟦key⟧" data-training-target="⟦key⟧">⟦targets.map((p) => `<option value="${p.id}" ${p.id === target.id ? 'selected' : ''}>${esc(p.name)} · ${D.injuryNames[D.injuryLevel(p)]}</option>`).join('')⟧</select>⟦btn((key === 'heal' ? 'Heal ' : 'Mend ') + target.name, key + ':' + c.id + ':' + target.id, c.lastCastDay === state.day)⟧
```

### game.js:430

**Context:** renderTraining

Heal a companion

### game.js:430

**Context:** renderTraining

Repair a zombie

### game.js:430

**Context:** renderTraining

**Display text** (markup removed):

⟦esc(p.name)⟧ · ⟦D.injuryNames[D.injuryLevel(p)]⟧

**Source template:**

```text
<option value="⟦p.id⟧" ⟦p.id === target.id ? 'selected' : ''⟧>⟦esc(p.name)⟧ · ⟦D.injuryNames[D.injuryLevel(p)]⟧</option>
```

### game.js:430

**Context:** renderTraining

Heal

### game.js:430

**Context:** renderTraining

Mend

### game.js:437

**Context:** renderTraining

**Display text** (markup removed):

Raise deadRecovered remains become a zombie with different abilities.Fallen resident⟦targets.map((p) => `${esc(p.name)}`).join('')⟧⟦target.bodyRecovered ? btn('Raise ' + target.name + ' · 80g', 'raise:' + c.id + ':' + target.id, c.lastCastDay === state.day || state.gold < 80) : btn('Recover ' + target.name + ' · 60g · one day', 'remains:' + target.id)⟧

**Source template:**

```text
<h3>Raise dead</h3><p class="stats">Recovered remains become a zombie with different abilities.</p><label for="training-target-raise">Fallen resident</label><select id="training-target-raise" data-training-target="raise">⟦targets.map((p) => `<option value="${p.id}" ${p.id === target.id ? 'selected' : ''}>${esc(p.name)}</option>`).join('')⟧</select>⟦target.bodyRecovered ? btn('Raise ' + target.name + ' · 80g', 'raise:' + c.id + ':' + target.id, c.lastCastDay === state.day || state.gold < 80) : btn('Recover ' + target.name + ' · 60g · one day', 'remains:' + target.id)⟧
```

### game.js:437

**Context:** renderTraining

**Display text** (markup removed):

⟦esc(p.name)⟧

**Source template:**

```text
<option value="⟦p.id⟧" ⟦p.id === target.id ? 'selected' : ''⟧>⟦esc(p.name)⟧</option>
```

### game.js:437

**Context:** renderTraining

Raise

### game.js:437

**Context:** renderTraining

raise:

### game.js:437

**Context:** renderTraining

Recover

### game.js:437

**Context:** renderTraining

· 60g · one day

### game.js:437

**Context:** renderTraining

remains:

### game.js:441

**Context:** renderTraining

**Display text** (markup removed):

One cast per caster per day. The target must be at home with the caster or in the same adventure party.

**Source template:**

```text
<p class="stats">One cast per caster per day. The target must be at home with the caster or in the same adventure party.</p>
```

### game.js:443

**Context:** renderTraining

**Display text** (markup removed):

No spell actions available. Learn a healing, repair or reanimation talent; wounded companions must be within reach.

**Source template:**

```text
<p>No spell actions available. Learn a healing, repair or reanimation talent; wounded companions must be within reach.</p>
```

### game.js:455

**Context:** renderStories → investigation → next

cleared_

### game.js:456

**Context:** renderStories → investigation → next

Assign a clearing party in Contracts, or return through the entrance.

### game.js:457

**Context:** renderStories → investigation → next

searched_

### game.js:458

**Context:** renderStories → investigation → next

Follow the labelled passages; keys and resident abilities open new routes.

### game.js:459

**Context:** renderStories → investigation → next

Investigate the marked plinth to recover records, keys and equipment.

### game.js:460

**Context:** renderStories → investigation → summary

searched_

### game.js:462

**Context:** renderStories → investigation → summary

A new chamber has been discovered. Its records still need investigation.

### game.js:465

**Context:** renderStories → html

**Display text** (markup removed):

CURRENT INVESTIGATION⟦esc(investigation.title)⟧⟦esc(investigation.summary)⟧⟦esc(investigation.next)⟧⟦investigation.walk ? btn('Walk to the next step', 'walk:' + investigation.walk) : investigation.tab ? `Open ${investigation.tab} →` : ''⟧

**Source template:**

```text
<article class="investigation"><small>CURRENT INVESTIGATION</small><h3>⟦esc(investigation.title)⟧</h3><p>⟦esc(investigation.summary)⟧</p><p class="story-next">⟦esc(investigation.next)⟧</p>⟦investigation.walk ? btn('Walk to the next step', 'walk:' + investigation.walk) : investigation.tab ? `<button data-tab="${investigation.tab}">Open ${investigation.tab} →</button>` : ''⟧</article>
```

### game.js:465

**Context:** renderStories → html

Walk to the next step

### game.js:465

**Context:** renderStories → html

walk:

### game.js:465

**Context:** renderStories → html

**Display text** (markup removed):

Open ⟦investigation.tab⟧ →

**Source template:**

```text
<button data-tab="⟦investigation.tab⟧">Open ⟦investigation.tab⟧ →</button>
```

### game.js:467

**Context:** renderStories

**Display text** (markup removed):

What we have learned

**Source template:**

```text
<h3 class="story-section">What we have learned</h3>
```

### game.js:474

**Context:** renderStories

**Display text** (markup removed):

Places to investigate

**Source template:**

```text
<h3 class="story-section">Places to investigate</h3>
```

### game.js:479

**Context:** renderStories

**Display text** (markup removed):

There is more to inspect in ⟦locationName(n.id)⟧.⟦btn('Walk there', 'walk:' + x)⟧

**Source template:**

```text
<p>There is more to inspect in ⟦locationName(n.id)⟧.</p>⟦btn('Walk there', 'walk:' + x)⟧
```

### game.js:479

**Context:** renderStories

Walk there

### game.js:479

**Context:** renderStories

walk:

### game.js:485

**Context:** renderStories

**Display text** (markup removed):

Roads beyond the guild

**Source template:**

```text
<h3>Roads beyond the guild</h3>
```

### game.js:490

**Context:** renderStories → completed

Step

### game.js:494

**Context:** renderStories

**Display text** (markup removed):

⟦esc(r.problem)⟧⟦completed⟧/12 story contracts completed⟦completed === 12 ? paragraphs(r.ending) : ''⟧

**Source template:**

```text
<p>⟦esc(r.problem)⟧</p><label class="stats">⟦completed⟧/12 story contracts completed<progress value="⟦completed⟧" max="12"></progress></label>⟦completed === 12 ? paragraphs(r.ending) : ''⟧
```

### game.js:499

**Context:** renderStories

**Display text** (markup removed):

People and their leads

**Source template:**

```text
<h3 class="story-section">People and their leads</h3>
```

### game.js:505

**Context:** renderStories

**Display text** (markup removed):

⟦def.internal ? 'Assigned to' : 'Away on'⟧ ⟦esc(def.name)⟧ · ⟦active.status === 'decision' ? 'Report waiting in Contracts' : active.remaining + (def.internal ? ' days to clear' : ' days until return')⟧

**Source template:**

```text
<p class="stats">⟦def.internal ? 'Assigned to' : 'Away on'⟧ ⟦esc(def.name)⟧ · ⟦active.status === 'decision' ? 'Report waiting in Contracts' : active.remaining + (def.internal ? ' days to clear' : ' days until return')⟧</p>
```

### game.js:505

**Context:** renderStories

Assigned to

### game.js:505

**Context:** renderStories

Away on

### game.js:505

**Context:** renderStories

Report waiting in Contracts

### game.js:505

**Context:** renderStories

days to clear

### game.js:505

**Context:** renderStories

days until return

### game.js:507

**Context:** renderStories

**Display text** (markup removed):

Recovering · ⟦c.recovery⟧ days remaining.

**Source template:**

```text
<p class="stats">Recovering · ⟦c.recovery⟧ days remaining.</p>
```

### game.js:510

**Context:** renderStories

**Display text** (markup removed):

Last conversation: ⟦esc(recap.title)⟧⟦paragraphs(recap.text)⟧

**Source template:**

```text
<details><summary>Last conversation: ⟦esc(recap.title)⟧</summary>⟦paragraphs(recap.text)⟧</details>
```

### game.js:512

**Context:** renderStories

Talk:

### game.js:512

**Context:** renderStories

talk:

### game.js:517

**Context:** renderStories

**Display text** (markup removed):

Last expedition: ⟦esc(D.contracts.find((m) => m.id === returned.id).name)⟧. The report is in Reports.

**Source template:**

```text
<p class="stats">Last expedition: ⟦esc(D.contracts.find((m) => m.id === returned.id).name)⟧. The report is in Reports.</p>
```

### game.js:523

**Context:** renderStories

**Display text** (markup removed):

Other leads inside the house

**Source template:**

```text
<h3 class="story-section">Other leads inside the house</h3>
```

### game.js:528

**Context:** renderUI

Day ⟦state.day⟧ · ⟦state.gold⟧ gold

**Source template:**

```text
Day ⟦state.day⟧ · ⟦state.gold⟧ gold
```

### game.js:537

**Context:** renderUI → investigation → next

cleared_

### game.js:538

**Context:** renderUI → investigation → next

Assign a clearing party in Contracts, or return through the entrance.

### game.js:539

**Context:** renderUI → investigation → next

searched_

### game.js:540

**Context:** renderUI → investigation → next

Follow the labelled passages; keys and resident abilities open new routes.

### game.js:541

**Context:** renderUI → investigation → next

Investigate the marked plinth to recover records, keys and equipment.

### game.js:542

**Context:** renderUI → investigation → summary

searched_

### game.js:544

**Context:** renderUI → investigation → summary

A new chamber has been discovered. Its records still need investigation.

### game.js:551

**Context:** renderUI

**Display text** (markup removed):

⟦portrait(selected)⟧⟦esc(selected.name)⟧⟦selected.id === 'rowan' ? (state.flags.gateOpen ? 'Unbound · House sight' : state.flags.anchor ? 'Bound protagonist · House sight' : 'Bound protagonist · Entrance') : 'Home · Level ' + selected.level⟧

**Source template:**

```text
⟦portrait(selected)⟧<div><strong>⟦esc(selected.name)⟧</strong><span class="stats">⟦selected.id === 'rowan' ? (state.flags.gateOpen ? 'Unbound · House sight' : state.flags.anchor ? 'Bound protagonist · House sight' : 'Bound protagonist · Entrance') : 'Home · Level ' + selected.level⟧</span></div>
```

### game.js:551

**Context:** renderUI

Unbound · House sight

### game.js:551

**Context:** renderUI

Bound protagonist · House sight

### game.js:551

**Context:** renderUI

Bound protagonist · Entrance

### game.js:551

**Context:** renderUI

Home · Level

### game.js:556

**Context:** renderUI

**Display text** (markup removed):

⟦portrait(c)⟧⟦esc(c.name)⟧⟦c.points ? ' · ↑' : ''⟧

**Source template:**

```text
<button data-action="select:⟦c.id⟧" class="⟦c.id === state.selected ? 'active' : ''⟧" aria-pressed="⟦c.id === state.selected⟧">⟦portrait(c)⟧⟦esc(c.name)⟧⟦c.points ? ' · ↑' : ''⟧</button>
```

### game.js:561

**Context:** renderUI

**Display text** (markup removed):

HOME UNDER ATTACK⟦esc(D.homeDanger(state).name)⟧⟦D.activeMissions(state).some((m) => m.id === D.homeDanger(state).id) ? 'Defence in progress' : 'Assign defenders'⟧

**Source template:**

```text
<button class="threat-badge" data-tab="Contracts"><strong>HOME UNDER ATTACK</strong>⟦esc(D.homeDanger(state).name)⟧<br>⟦D.activeMissions(state).some((m) => m.id === D.homeDanger(state).id) ? 'Defence in progress' : 'Assign defenders'⟧</button>
```

### game.js:561

**Context:** renderUI

Defence in progress

### game.js:561

**Context:** renderUI

Assign defenders

### game.js:566

**Context:** renderUI

**Display text** (markup removed):

⟦esc(D.contracts.find((d) => d.id === m.id).name)⟧⟦m.party.map((id) => esc(state.roster.find((c) => c.id === id).name)).join(', ')⟧⟦m.status === 'decision' ? 'Decision due' : m.remaining + ' days remaining'⟧

**Source template:**

```text
<button data-tab="Contracts"><strong>⟦esc(D.contracts.find((d) => d.id === m.id).name)⟧</strong>⟦m.party.map((id) => esc(state.roster.find((c) => c.id === id).name)).join(', ')⟧<br>⟦m.status === 'decision' ? 'Decision due' : m.remaining + ' days remaining'⟧</button>
```

### game.js:566

**Context:** renderUI

Decision due

### game.js:566

**Context:** renderUI

days remaining

### game.js:571

**Context:** renderUI

Controlling ⟦D.home(state).find((c) => c.id === state.selected)?.name || 'Rowan'⟧

**Source template:**

```text
Controlling ⟦D.home(state).find((c) => c.id === state.selected)?.name || 'Rowan'⟧
```

### game.js:571

**Context:** renderUI

Rowan

### game.js:573

**Context:** renderUI

Exploration

### game.js:574

**Context:** renderUI

Characters

### game.js:575

**Context:** renderUI

Contracts

### game.js:576

**Context:** renderUI

Store room

### game.js:577

**Context:** renderUI

Training

### game.js:578

**Context:** renderUI

Stories

### game.js:579

**Context:** renderUI

Diaries

### game.js:580

**Context:** renderUI

Reports

### game.js:581

**Context:** renderUI

Journal

### game.js:585

**Context:** renderUI → html

**Display text** (markup removed):

GUILD LEDGER⟦tab || ''⟧×

**Source template:**

```text
<div class="panel-header"><div><small>GUILD LEDGER</small><h2>⟦tab || ''⟧</h2></div><button class="panel-close" data-close="true" aria-label="Close panel">×</button></div><div id="panel-content" class="panel-content" tabindex="0" aria-label="Panel content">
```

### game.js:586

**Context:** renderUI

Options

### game.js:588

**Context:** renderUI

**Display text** (markup removed):

Camera: mouse wheel or + / − zooms. Focus room fits the current room; Wide view shows the surrounding guild. Open the graphics workshop.A / D or arrows walks. Space jumps; W / S uses stairs; E investigates; Tab switches home residents.Management pauses exploration. Close the ledger or press Escape to return.

**Source template:**

```text
<p>Camera: mouse wheel or + / − zooms. Focus room fits the current room; Wide view shows the surrounding guild. <a href="/graphics-preview.html" target="_blank" rel="noopener">Open the graphics workshop</a>.</p><p>A / D or arrows walks. Space jumps; W / S uses stairs; E investigates; Tab switches home residents.</p><p>Management pauses exploration. Close the ledger or press Escape to return.</p>
```

### game.js:589

**Context:** renderUI

Overview

### game.js:591

**Context:** renderUI

**Display text** (markup removed):

View the full tower and underworld map →

**Source template:**

```text
<p><a href="/guild-sprawl.html" target="_blank" rel="noopener">View the full tower and underworld map →</a></p>
```

### game.js:593

**Context:** renderUI

Routes and unlocks

### game.js:594

**Context:** renderUI

**Display text** (markup removed):

Every route has a visible stair or door. Walk directly to its entrance using these buttons.⟦btn('Tower stair · ' + (state.flags.tower ? 'open' : state.flags.anchor ? 'Wren’s key recovered · repair required' : 'key from Wren’s Crossing contract'), 'walk:350')⟧Wren’s keeper returns the tower key with the landing fitting. Repair the supports, then use W to climb.⟦btn('Cellar stair · ' + (state.flags.stairs ? 'open' : 'repair required'), 'walk:505')⟧Restore the service room to recover the cellar access key. The dry landing needs no water magic; a resident with Water breathing must open the submerged drain wheel. Once drained, everyone can enter.Labyrinth gate: the second key from Wren’s Crossing opens it from the dry cellar landing. Tracking or Echo sight reveals the stair to its lower floor.Archive: Sera’s quest returns its door seal; Magical literacy or the escorted independent archivist opens it. Greenhouse: Edda’s quest returns its fitting. Observatory: Elian’s quest returns its lens. Threshold: the infirmary recording reveals its location; a completed safety-plan contract unlocks restoration.

**Source template:**

```text
<p>Every route has a visible stair or door. Walk directly to its entrance using these buttons.</p>⟦btn('Tower stair · ' + (state.flags.tower ? 'open' : state.flags.anchor ? 'Wren’s key recovered · repair required' : 'key from Wren’s Crossing contract'), 'walk:350')⟧<p>Wren’s keeper returns the tower key with the landing fitting. Repair the supports, then use W to climb.</p>⟦btn('Cellar stair · ' + (state.flags.stairs ? 'open' : 'repair required'), 'walk:505')⟧<p>Restore the service room to recover the cellar access key. The dry landing needs no water magic; a resident with Water breathing must open the submerged drain wheel. Once drained, everyone can enter.</p><p>Labyrinth gate: the second key from Wren’s Crossing opens it from the dry cellar landing. Tracking or Echo sight reveals the stair to its lower floor.</p><p>Archive: Sera’s quest returns its door seal; Magical literacy or the escorted independent archivist opens it. Greenhouse: Edda’s quest returns its fitting. Observatory: Elian’s quest returns its lens. Threshold: the infirmary recording reveals its location; a completed safety-plan contract unlocks restoration.</p>
```

### game.js:594

**Context:** renderUI

Tower stair ·

### game.js:594

**Context:** renderUI

Wren’s key recovered · repair required

### game.js:594

**Context:** renderUI

key from Wren’s Crossing contract

### game.js:594

**Context:** renderUI

walk:350

### game.js:594

**Context:** renderUI

Cellar stair ·

### game.js:594

**Context:** renderUI

repair required

### game.js:594

**Context:** renderUI

walk:505

### game.js:596

**Context:** renderUI

**Display text** (markup removed):

Known rooms of the estate. Unreturned interiors remain concealed.

**Source template:**

```text
<p>Known rooms of the estate. Unreturned interiors remain concealed.</p>
```

### game.js:598

**Context:** renderUI → known → Entrance → name

Entrance

### game.js:599

**Context:** renderUI → known → Quarters → name

Quarters

### game.js:600

**Context:** renderUI → known → Service corridor → name

Service corridor

### game.js:602

**Context:** renderUI → known → name

Service room

### game.js:602

**Context:** renderUI → known → name

Service wall

### game.js:605

**Context:** renderUI → known → Returned landing → name

Returned landing

### game.js:608

**Context:** renderUI

Walk to room →

### game.js:608

**Context:** renderUI

walk:

### game.js:611

**Context:** renderUI

Drained cellar

### game.js:611

**Context:** renderUI

Flooded cellar

### game.js:613

**Context:** renderUI

**Display text** (markup removed):

The drain is locked open. All residents can use the cellar.

**Source template:**

```text
<p>The drain is locked open. All residents can use the cellar.</p>
```

### game.js:614

**Context:** renderUI

**Display text** (markup removed):

S reaches the dry landing. A Water breather can dive, walk to the labelled drain wheel and press E. Draining permanently opens the cellar to everyone.

**Source template:**

```text
<p>S reaches the dry landing. A Water breather can dive, walk to the labelled drain wheel and press E. Draining permanently opens the cellar to everyone.</p>
```

### game.js:618

**Context:** renderUI

Bell tower · 2 floors

### game.js:619

**Context:** renderUI

**Display text** (markup removed):

W at the quarters stair climbs to the lower landing, then the crown. S returns.

**Source template:**

```text
<p>W at the quarters stair climbs to the lower landing, then the crown. S returns.</p>
```

### game.js:623

**Context:** renderUI

Labyrinth · 2 floors

### game.js:624

**Context:** renderUI

**Display text** (markup removed):

E at the dry landing enters the upper maze. Tracking or Echo sight reveals the stair to its heart.

**Source template:**

```text
<p>E at the dry landing enters the upper maze. Tracking or Echo sight reveals the stair to its heart.</p>
```

### game.js:627

**Context:** renderUI

Exploration

### game.js:629

**Context:** renderUI

**Display text** (markup removed):

The old cellar leads into drains and prison tunnels. The lower labyrinth branches into caverns and crypts. The bell tower opens into the wizard’s rooms. E uses labelled passages; every chamber keeps a return route.

**Source template:**

```text
<p>The old cellar leads into drains and prison tunnels. The lower labyrinth branches into caverns and crypts. The bell tower opens into the wizard’s rooms. E uses labelled passages; every chamber keeps a return route.</p>
```

### game.js:634

**Context:** renderUI

Inside this chamber

### game.js:635

**Context:** renderUI

Walk to the return passage

### game.js:635

**Context:** renderUI

localWalk:

### game.js:636

**Context:** renderUI

Walk to records and treasure

### game.js:636

**Context:** renderUI

localWalk:

### game.js:640

**Context:** renderUI

Walk to this passage

### game.js:640

**Context:** renderUI

routeWalk:

### game.js:647

**Context:** renderUI

**Display text** (markup removed):

⟦state.flags['searched_' + r.id] ? esc(r.story) : 'Records not yet recovered.'⟧⟦r.encounter && !state.flags['cleared_' + r.id] ? 'Creature guards this room' : state.flags['searched_' + r.id] ? 'Investigated · treasure in shared store' : 'Investigate the marked plinth'⟧

**Source template:**

```text
<p>⟦state.flags['searched_' + r.id] ? esc(r.story) : 'Records not yet recovered.'⟧</p><span class="stats">⟦r.encounter && !state.flags['cleared_' + r.id] ? 'Creature guards this room' : state.flags['searched_' + r.id] ? 'Investigated · treasure in shared store' : 'Investigate the marked plinth'⟧</span>
```

### game.js:647

**Context:** renderUI

Records not yet recovered.

### game.js:647

**Context:** renderUI

Creature guards this room

### game.js:647

**Context:** renderUI

Investigated · treasure in shared store

### game.js:647

**Context:** renderUI

Investigate the marked plinth

### game.js:652

**Context:** renderUI

Store room

### game.js:653

**Context:** renderUI

Guild

### game.js:653

**Context:** renderUI

Characters

### game.js:654

**Context:** renderUI

Contracts

### game.js:655

**Context:** renderUI

Training

### game.js:656

**Context:** renderUI

Stories

### game.js:657

**Context:** renderUI

Diaries

### game.js:658

**Context:** renderUI

Reports

### game.js:660

**Context:** renderUI

**Display text** (markup removed):

Reports record journeys, discoveries and rewards.

**Source template:**

```text
<p>Reports record journeys, discoveries and rewards.</p>
```

### game.js:666

**Context:** renderUI

**Display text** (markup removed):

Day ⟦r.day⟧⟦rewardSummary(r.reward, r.xp) ? ' · ' + rewardSummary(r.reward, r.xp) : ''⟧⟦paragraphs(r.text)⟧⟦esc(r.party.join(', '))⟧⟦r.cost > 0 ? ' · Preparation expense: ' + r.cost + 'g' : ''⟧

**Source template:**

```text
<span class="tag">Day ⟦r.day⟧⟦rewardSummary(r.reward, r.xp) ? ' · ' + rewardSummary(r.reward, r.xp) : ''⟧</span>⟦paragraphs(r.text)⟧<div class="stats">⟦esc(r.party.join(', '))⟧⟦r.cost > 0 ? ' · Preparation expense: ' + r.cost + 'g' : ''⟧</div>
```

### game.js:666

**Context:** renderUI

· Preparation expense:

### game.js:670

**Context:** renderUI

**Display text** (markup removed):

Expedition reports will appear here when your parties return.

**Source template:**

```text
<p>Expedition reports will appear here when your parties return.</p>
```

### game.js:671

**Context:** renderUI

Journal

### game.js:672

**Context:** renderUI

**Display text** (markup removed):

Completed contracts · ⟦state.missions.filter((m) => m.status === 'resolved').length⟧⟦state.missions
.filter((m) => m.status === 'resolved')
.reverse()
.map(
(m) =>
`${esc(D.contracts.find((d) => d.id === m.id).name)} · completed${m.completedDay ? ' Day ' + m.completedDay : ''}`,
)
.join(
'',
)⟧Recovered keys⟦state.flags.repaired ? 'Cellar hatch key · recovered from the restored service room.' : ''⟧⟦state.flags.anchor ? 'Bell-tower key and labyrinth-gate key · returned by Wren’s keeper.' : 'Complete The bell at Wren’s Crossing to recover the tower and labyrinth keys.'⟧Next: ⟦esc(D.nextSteps(state))⟧⟦btn('Save checkpoint', 'save')⟧⟦btn('Load checkpoint', 'load')⟧⟦btn('Export save', 'export')⟧⟦btn('Import save', 'import')⟧⟦btn('New guild', 'new')⟧⟦[
...state.journal,
]
.reverse()
.map((j) => card(j.kind, paragraphs(j.text)))
.join('')⟧Gold ledger⟦state.transactions
.filter((t) => t.amount !== 0)
.slice(0, 40)
.map((t) => `Day ${t.day} · ${t.amount > 0 ? '+' : ''}${t.amount}g · ${esc(t.text)}`)
.join('')⟧

**Source template:**

```text
<details><summary>Completed contracts · ⟦state.missions.filter((m) => m.status === 'resolved').length⟧</summary>⟦state.missions
      .filter((m) => m.status === 'resolved')
      .reverse()
      .map(
        (m) =>
          `<p>${esc(D.contracts.find((d) => d.id === m.id).name)} · completed${m.completedDay ? ' Day ' + m.completedDay : ''}</p>`,
      )
      .join(
        '',
      )⟧</details><div class="card"><h3>Recovered keys</h3><p>⟦state.flags.repaired ? 'Cellar hatch key · recovered from the restored service room.<br>' : ''⟧⟦state.flags.anchor ? 'Bell-tower key and labyrinth-gate key · returned by Wren’s keeper.' : 'Complete The bell at Wren’s Crossing to recover the tower and labyrinth keys.'⟧</p></div><p>Next: ⟦esc(D.nextSteps(state))⟧</p><div class="row">⟦btn('Save checkpoint', 'save')⟧⟦btn('Load checkpoint', 'load')⟧⟦btn('Export save', 'export')⟧⟦btn('Import save', 'import')⟧⟦btn('New guild', 'new')⟧</div><input hidden type="file" id="save-file" accept="application/json">⟦[
      ...state.journal,
    ]
      .reverse()
      .map((j) => card(j.kind, paragraphs(j.text)))
      .join('')⟧<h3>Gold ledger</h3>⟦state.transactions
      .filter((t) => t.amount !== 0)
      .slice(0, 40)
      .map((t) => `<p>Day ${t.day} · ${t.amount > 0 ? '+' : ''}${t.amount}g · ${esc(t.text)}</p>`)
      .join('')⟧
```

### game.js:677

**Context:** renderUI

**Display text** (markup removed):

⟦esc(D.contracts.find((d) => d.id === m.id).name)⟧ · completed⟦m.completedDay ? ' Day ' + m.completedDay : ''⟧

**Source template:**

```text
<p>⟦esc(D.contracts.find((d) => d.id === m.id).name)⟧ · completed⟦m.completedDay ? ' Day ' + m.completedDay : ''⟧</p>
```

### game.js:677

**Context:** renderUI

Day

### game.js:681

**Context:** renderUI

**Display text** (markup removed):

Cellar hatch key · recovered from the restored service room.

**Source template:**

```text
Cellar hatch key · recovered from the restored service room.<br>
```

### game.js:681

**Context:** renderUI

Bell-tower key and labyrinth-gate key · returned by Wren’s keeper.

### game.js:681

**Context:** renderUI

Complete The bell at Wren’s Crossing to recover the tower and labyrinth keys.

### game.js:681

**Context:** renderUI

Save checkpoint

### game.js:681

**Context:** renderUI

Load checkpoint

### game.js:681

**Context:** renderUI

Export save

### game.js:681

**Context:** renderUI

Import save

### game.js:681

**Context:** renderUI

New guild

### game.js:689

**Context:** renderUI

**Display text** (markup removed):

Day ⟦t.day⟧ · ⟦t.amount > 0 ? '+' : ''⟧⟦t.amount⟧g · ⟦esc(t.text)⟧

**Source template:**

```text
<p>Day ⟦t.day⟧ · ⟦t.amount > 0 ? '+' : ''⟧⟦t.amount⟧g · ⟦esc(t.text)⟧</p>
```

### game.js:705

**Context:** Interface / runtime text

Journal

### game.js:712

**Context:** chooseResident

Resident unavailable.

### game.js:766

**Context:** Interface / runtime text

Reach the source room first.

### game.js:783

**Context:** Interface / runtime text

Return to the ground floor using W / S first.

### game.js:789

**Context:** Interface / runtime text

Walking toward the discovery. Use E when you arrive.

### game.js:795

**Context:** Interface / runtime text

Start a new guild? Export your current save first to keep it.

### game.js:800

**Context:** Interface / runtime text

A new guild begins. Find Bryn in the entrance hall.

### game.js:844

**Context:** Interface / runtime text

Checkpoint saved.

### game.js:848

**Context:** Interface / runtime text

No checkpoint yet.

### game.js:852

**Context:** Interface / runtime text

Checkpoint restored.

### game.js:858

**Context:** Interface / runtime text

bound-house-save.json

### game.js:902

**Context:** Interface / runtime text

Save imported.

### game.js:912

**Context:** Interface / runtime text

An expedition letter is waiting in Contracts.

### game.js:921

**Context:** locationName

the returned landing

### game.js:924

**Context:** locationName

the quarters

### game.js:935

**Context:** visualRoom → Entrance → name

Entrance

### game.js:936

**Context:** visualRoom → Quarters → name

Quarters

### game.js:937

**Context:** visualRoom → Service corridor → name

Service corridor

### game.js:938

**Context:** visualRoom → Service room → name

Service room

### game.js:939

**Context:** visualRoom → Returned landing → name

Returned landing

### game.js:942

**Context:** visualRoom → Cellar → name

Cellar

### game.js:943

**Context:** visualRoom → Dry landing → name

Dry landing

### game.js:944

**Context:** visualRoom → Store room → name

Store room

### game.js:945

**Context:** visualRoom → name

Bell tower

### game.js:945

**Context:** visualRoom → name

Labyrinth

### game.js:949

**Context:** Interface / runtime text

Room camera

### game.js:951

**Context:** Interface / runtime text

**Display text** (markup removed):

−125%+Focus roomWide view

**Source template:**

```text
<button id="zoom-out" aria-label="Zoom out">−</button><output id="zoom-level" aria-live="polite">125%</output><button id="zoom-in" aria-label="Zoom in">+</button><button id="focus-room">Focus room</button><button id="wide-view">Wide view</button>
```

### game.js:1019

**Context:** hotspots → list → text

E · Enter STORE ROOM · shared equipment

### game.js:1022

**Context:** hotspots → list → text

E · Open equipment shelves

### game.js:1023

**Context:** hotspots → list → text

E · Leave store room

### game.js:1028

**Context:** hotspots → list → text

E · Enter the furnace room

### game.js:1028

**Context:** hotspots → list → text

E · Open the warm iron door

### game.js:1035

**Context:** hotspots → list → text

E / W · Return to the labyrinth

### game.js:1043

**Context:** hotspots → list → text

W · Climb the bell tower

### game.js:1044

**Context:** hotspots → list → text

E · Reconnect tower stairs · ⟦state.roster.some((c) => c.skills.includes('stoneSong') && c.status === 'home') ? 40 : 80⟧g · Wren’s key

**Source template:**

```text
E · Reconnect tower stairs · ⟦state.roster.some((c) => c.skills.includes('stoneSong') && c.status === 'home') ? 40 : 80⟧g · Wren’s key
```

### game.js:1044

**Context:** hotspots → list → text

stoneSong

### game.js:1044

**Context:** hotspots → list → text

home

### game.js:1047

**Context:** hotspots → list → text

W · Tower crown / S · Ground floor

### game.js:1048

**Context:** hotspots → list → text

S · Lower tower landing

### game.js:1052

**Context:** hotspots → list → text

W · Cellar / S · Labyrinth heart · Tracking or Echo sight

### game.js:1055

**Context:** hotspots → list → text

W · Upper labyrinth

### game.js:1061

**Context:** hotspots → list → text

E · Enter the labyrinth

### game.js:1062

**Context:** hotspots → list → text

E · Follow the brass thread · Wren’s key

### game.js:1071

**Context:** hotspots → list → text

Service room restored

### game.js:1072

**Context:** hotspots → list → text

E · Restore service room ·

### game.js:1072

**Context:** hotspots → list → text

g

### game.js:1073

**Context:** hotspots → list → text

E · Breach sealed wall · Strength 10

### game.js:1080

**Context:** hotspots → list → text

Ledger recorded

### game.js:1080

**Context:** hotspots → list → text

E · Read concealed ledger

### game.js:1089

**Context:** hotspots → list → text

S · Descend to the dry cellar landing

### game.js:1090

**Context:** hotspots → list → text

E · Repair cellar stairs · 45g

### game.js:1098

**Context:** hotspots → list → text

W · Upstairs · S · Enter drained cellar

### game.js:1099

**Context:** hotspots → list → text

W · Upstairs · S · Dive to drain wheel (Water breathing)

### game.js:1108

**Context:** hotspots → list → text

Drain locked open

### game.js:1109

**Context:** hotspots → list → text

E · Open drain wheel · Water breathing

### game.js:1118

**Context:** hotspots → list → text

Ship chart recorded · W near stairs to return

### game.js:1120

**Context:** hotspots → list → text

E · Investigate exposed ship fragment

### game.js:1121

**Context:** hotspots → list → text

E · Investigate ship fragment · Water breathing

### game.js:1129

**Context:** hotspots → list → text

The house inscription is recorded

### game.js:1130

**Context:** hotspots → list → text

E · Read inscription · Rowan’s house sight

### game.js:1136

**Context:** hotspots → text

E ·

### game.js:1143

**Context:** hotspots → action

room:

### game.js:1144

**Context:** hotspots → text

E · Restore ⟦r.name.toLowerCase()⟧ · ⟦r.cost⟧g⟦r.requiresSkill ? ' · Magical literacy' : ''⟧⟦r.id === 'threshold' ? ' · Safe preparation' : ''⟧

**Source template:**

```text
E · Restore ⟦r.name.toLowerCase()⟧ · ⟦r.cost⟧g⟦r.requiresSkill ? ' · Magical literacy' : ''⟧⟦r.id === 'threshold' ? ' · Safe preparation' : ''⟧
```

### game.js:1144

**Context:** hotspots → text

· Magical literacy

### game.js:1144

**Context:** hotspots → text

threshold

### game.js:1144

**Context:** hotspots → text

· Safe preparation

### game.js:1154

**Context:** hotspots → text

E · Speak with ⟦c.name⟧: ⟦n.title⟧

**Source template:**

```text
E · Speak with ⟦c.name⟧: ⟦n.title⟧
```

### game.js:1162

**Context:** hotspots → action

awaken:

### game.js:1162

**Context:** hotspots → action

discover:

### game.js:1164

**Context:** hotspots → text

E ·

### game.js:1165

**Context:** hotspots → text

found_

### game.js:1166

**Context:** hotspots → text

Awaken

### game.js:1167

**Context:** hotspots → text

Investigate

### game.js:1167

**Context:** hotspots → text

figure

### game.js:1175

**Context:** hotspots → action

recover:

### game.js:1176

**Context:** hotspots → text

E ·

### game.js:1184

**Context:** hotspots → action

passage:

### game.js:1184

**Context:** hotspots → text

E ·

### game.js:1191

**Context:** hotspots → action

leave:

### game.js:1192

**Context:** hotspots → text

E · Return through the marked passage

### game.js:1197

**Context:** hotspots → action

search:

### game.js:1198

**Context:** hotspots → text

searched_

### game.js:1199

**Context:** hotspots → text

Records and treasure recovered

### game.js:1200

**Context:** hotspots → text

E · Investigate the room’s records and treasure

### game.js:1224

**Context:** hotspots → action

record:

### game.js:1225

**Context:** hotspots → text

E · Personal record ·

### game.js:1292

**Context:** Interface / runtime text

Escape

### game.js:1296

**Context:** Interface / runtime text

INPUT

### game.js:1296

**Context:** Interface / runtime text

TEXTAREA

### game.js:1297

**Context:** Interface / runtime text

Tab

### game.js:1297

**Context:** Interface / runtime text

ArrowLeft

### game.js:1297

**Context:** Interface / runtime text

ArrowRight

### game.js:1297

**Context:** Interface / runtime text

ArrowUp

### game.js:1297

**Context:** Interface / runtime text

ArrowDown

### game.js:1301

**Context:** Interface / runtime text

Tab

### game.js:1310

**Context:** Interface / runtime text

recover:

### game.js:1316

**Context:** Interface / runtime text

passage:

### game.js:1327

**Context:** Interface / runtime text

leave:

### game.js:1335

**Context:** Interface / runtime text

record:

### game.js:1339

**Context:** Interface / runtime text

search:

### game.js:1345

**Context:** Interface / runtime text

Control a fit recruit to visit the store.

### game.js:1351

**Context:** Interface / runtime text

Store room

### game.js:1359

**Context:** Interface / runtime text

Store room

### game.js:1393

**Context:** Interface / runtime text

The wall opens. Restoration is a separate job.

### game.js:1395

**Context:** Interface / runtime text

A new expedition lead is in Contracts.

### game.js:1396

**Context:** Interface / runtime text

The house has changed.

### game.js:1419

**Context:** text

⟦size⟧px Georgia

**Source template:**

```text
⟦size⟧px Georgia
```

### game.js:1474

**Context:** drawWorld

ENTRANCE

### game.js:1474

**Context:** drawWorld

The token keeps the road open

### game.js:1475

**Context:** drawWorld

QUARTERS

### game.js:1475

**Context:** drawWorld

Beds for those who return

### game.js:1476

**Context:** drawWorld

SERVICE CORRIDOR

### game.js:1476

**Context:** drawWorld

Stairs reach a dry landing

### game.js:1480

**Context:** drawWorld

SERVICE ROOM

### game.js:1482

**Context:** drawWorld

The ledger found a shore

### game.js:1482

**Context:** drawWorld

Bricked shut from within

### game.js:1487

**Context:** drawWorld

STR 10

### game.js:1493

**Context:** drawWorld

STORE ↑ · E

### game.js:1499

**Context:** drawWorld

BRASS FITTING

### game.js:1499

**Context:** drawWorld

EMPTY SOCKET

### game.js:1505

**Context:** drawWorld

THE RETURNED LANDING

### game.js:1508

**Context:** drawWorld

A chair for visitors

### game.js:1510

**Context:** drawWorld

An oath worth reading

### game.js:1511

**Context:** drawWorld

Rain falls from a distant shore

### game.js:1517

**Context:** drawWorld

A MISSING LANDING

### game.js:1517

**Context:** drawWorld

An anchor might bring it home

### game.js:1550

**Context:** drawWorld

LITERACY

### game.js:1567

**Context:** drawWorld

SAFE SEAL

### game.js:1567

**Context:** drawWorld

SEVERED

### game.js:1573

**Context:** drawWorld

A MISSING ARCHIVE

### game.js:1573

**Context:** drawWorld

A DISTANT FRAGMENT

### game.js:1575

**Context:** drawWorld

Sera kept the chart

### game.js:1576

**Context:** drawWorld

Its destination is not yet known

### game.js:1586

**Context:** drawWorld

DRAINED CELLAR

### game.js:1586

**Context:** drawWorld

FLOODED CELLAR

### game.js:1587

**Context:** drawWorld

A dry landing above the ship

### game.js:1603

**Context:** drawWorld

DRAIN OPEN

### game.js:1603

**Context:** drawWorld

DRAIN WHEEL · E

### game.js:1607

**Context:** drawWorld

STAIRS COLLAPSED

### game.js:1610

**Context:** drawWorld

THE ROAD IS OPEN

### game.js:1610

**Context:** drawWorld

BOUNDARY

### game.js:1618

**Context:** drawWorld

STORE ROOM

### game.js:1618

**Context:** drawWorld

Shared equipment · E at the shelves

### game.js:1655

**Context:** drawPassageMarkers

W

### game.js:1655

**Context:** drawPassageMarkers

S

### game.js:1707

**Context:** drawHomeAttack

UNCONSCIOUS

### game.js:1724

**Context:** drawHomeAttack

FIGHT ·

### game.js:1771

**Context:** drawVerticalRooms → chamber → personality

MAP

### game.js:1772

**Context:** drawVerticalRooms → chamber → personality

RETURNED ARCHIVE

### game.js:1773

**Context:** drawVerticalRooms → chamber → personality

LABYRINTH

### game.js:1774

**Context:** drawVerticalRooms → chamber → personality

TIDE VAULT

### game.js:1775

**Context:** drawVerticalRooms → chamber → personality

CROWN

### game.js:1776

**Context:** drawVerticalRooms → chamber → personality

FROST LABORATORY

### game.js:1777

**Context:** drawVerticalRooms → chamber → personality

FURNACE

### game.js:1778

**Context:** drawVerticalRooms → chamber → personality

ASH FORGE

### game.js:1779

**Context:** drawVerticalRooms → chamber → personality

CLOCK WORKSHOP

### game.js:1820

**Context:** drawVerticalRooms

THE BELL TOWER · lower landing

### game.js:1821

**Context:** drawVerticalRooms

THE SILENT CROWN

### game.js:1824

**Context:** drawVerticalRooms

THE SILENT CROWN

### game.js:1842

**Context:** drawVerticalRooms

An alarm caught between heartbeats

### game.js:1847

**Context:** drawVerticalRooms

THE LABYRINTH · the borrowed paths

### game.js:1849

**Context:** drawVerticalRooms

THE MAP THAT KEPT ITS MAKER

### game.js:1852

**Context:** drawVerticalRooms

THE FALSE FLOOR

### game.js:1853

**Context:** drawVerticalRooms

Tracking or Echo sight finds a path below

### game.js:1865

**Context:** drawVerticalRooms

THE OLD FURNACE

### game.js:1890

**Context:** drawFurnaceThreat

THE FURNACE IS CLEAR

### game.js:1890

**Context:** drawFurnaceThreat

KEEP BEHIND THE FIREBREAK

### game.js:1913

**Context:** drawFurnaceThreat

Clearing progress ·

### game.js:1922

**Context:** drawFurnaceThreat

Forge tools recovered

### game.js:1976

**Context:** frame

Rowan’s binding ends here. An adventurer must go further.

### game.js:1978

**Context:** frame

E at a marked door · Exploration lists routes and return passage

### game.js:1980

**Context:** frame

Explore this floor · W / S at the stair · E investigate

### game.js:1982

**Context:** frame

Rowan can walk left through the entrance gate.

### game.js:1984

**Context:** frame

The next span is missing. Follow the house’s leads before crossing.

### game.js:1985

**Context:** frame

Explore the rooms · E investigates and starts conversations

### game.js:1989

**Context:** frame

Store room

### game.js:1991

**Context:** frame → 380

Ground floor

### game.js:1992

**Context:** frame → 140

Tower landing

### game.js:1993

**Context:** frame → -100

Bell tower crown

### game.js:1994

**Context:** frame → 510

Dry cellar landing

### game.js:1995

**Context:** frame → 555

Drained cellar

### game.js:1995

**Context:** frame → 555

Flooded cellar

### game.js:1996

**Context:** frame → 790

Upper labyrinth

### game.js:1997

**Context:** frame → 1020

Labyrinth heart

### game.js:1998

**Context:** frame → 1250

Old furnace

### game.js:2010

**Context:** Interface / runtime text

Autosave could not be read; export a checkpoint if needed.

### game.js:2020

**Context:** Interface / runtime text

The visitor at the gate

### game.js:2021

**Context:** Interface / runtime text

A craftswoman waits at the gate with a brass guild token. “I’m Mara. Halden raised me. They kept this for you.” Rowan recognises the name: Halden was the guild surgeon, and someone they loved. Mara grew up outside while the house was cut off. She has come to find the person Halden spoke about.
The token steadies the entrance for the first time in decades. Mara sets down her tools and begins arranging supplies and repairs at the doorstep. Rowan is still bound to the house, but its rooms are beginning to answer.
A woman stands beneath a workshop door in the entrance hall, held in a motionless fall. In the quarters, a chalk route folds around someone hidden behind a curtain. These are people of the old guild, waiting for the moment that trapped them to end. Walk to the woman beneath the door and press E. Her name is Bryn. Freeing her begins both the rebuilding and her own story.

## artwork.js

### artwork.js:177

**Context:** paintCharacter

12px Georgia

## dungeon-art.js

### dungeon-art.js:59

**Context:** paintChamber

16px Georgia

### dungeon-art.js:61

**Context:** paintChamber

10px sans-serif

### dungeon-art.js:63

**Context:** paintChamber

DEPTH

### dungeon-art.js:67

**Context:** paintChamber

RECORDS RECOVERED

### dungeon-art.js:69

**Context:** paintChamber

CREATURE IN ROOM

### dungeon-art.js:71

**Context:** paintChamber

TRAPPED MECHANISM

### dungeon-art.js:72

**Context:** paintChamber

UNEXPLORED RECORDS

## graphics-engine.js

### graphics-engine.js:135

**Context:** paintEquipment

Spear

## movement.js

### movement.js:9

**Context:** useStairs → error

Stand by the cellar stairwell to use W / S.

### movement.js:11

**Context:** useStairs → error

The stairs are collapsed. Press E at the top to repair them for 45 gold.

### movement.js:13

**Context:** useStairs → error

You are already at the top of the stairs.

### movement.js:18

**Context:** useStairs → error

Rowan’s binding does not reach the cellar yet. An adventurer can use the dry landing.

### movement.js:25

**Context:** useStairs → error

The cellar is flooded. A resident with Water breathing must reach the submerged drain wheel and empty it first.

## room-personality.js

### room-personality.js:678

**Context:** paintAffordance

record:

### room-personality.js:678

**Context:** paintAffordance

search:

### room-personality.js:707

**Context:** paintAffordance

10px system-ui

### room-personality.js:709

**Context:** paintAffordance

S

### room-personality.js:709

**Context:** paintAffordance

S

### room-personality.js:709

**Context:** paintAffordance

W

### room-personality.js:709

**Context:** paintAffordance

E

## index.html — permanent interface

The Bound House

        THE OLD GUILD ESTATE
        The Bound House

        JournalOptionsAdvance day →

          A HOME BETWEEN WORLDSKeep the hearth. Recover the house.

        ◇ House overview

          A / D · walk   Space · jump   W / S · stairs   E · interact   Tab ·
            switch

        Follow the story →

          THE HOUSE REMEMBERS

        ×

        Continue →
