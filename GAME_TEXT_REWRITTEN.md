# The Bound House — revised game text

This is a complete replacement catalogue containing every entry in the supplied snapshot. Narrative scenes, discoveries, personal records and regional reports have been rewritten below. Clear functional labels, mechanical descriptions, code fragments and many already serviceable short objectives are retained. This is a text deliverable, not a change to the running game.

## Applying this revision

Use each original source filename, line reference and Context path to locate the runtime field. Lines will shift after edits; Context paths and the original export are the reliable companions to the line references. Conditional alternatives and dynamic expressions remain separate. Preserve numbers, flags, rewards, prerequisites and actual branch behaviour. The source-template blocks reflect replacement wording. Do not paste this whole Markdown document into a JavaScript string.

The original source repository was not supplied. References to implemented behaviour are grounded in the exported text and cannot substitute for a runtime check. In particular, verify whether regional generated mission reports override the old `regions.jobs` descriptions, and apply both relevant versions. The old regional prose sometimes put a trapped resident outside before their discovery in the house; this revision consistently uses recovered field records and current local crews. This does not require a specific companion to be available.

Mara’s opening account needs to appear on the first encounter or in the immediately accessible initial journal, not hidden behind a later quest. The correspondence packet is present from the beginning; later personal-record unlocks are opportunities to read particular letters from it, not claims that Halden wrote new letters inside sealed rooms. If the UI physically places those records, label them as correspondence Mara supplied. No newly added spell, reward or interactive object is implied by incidental scene details.

Read long scenes as short paragraphs with player-controlled continuation. The infirmary recording, its immediate aftermath and the last letter are successive passages of the existing event; let the player pause between them. Do not auto-advance their text. The final Guest scene likewise needs room between the invitation, the repeated answer and closing the shutter.

## Continuity used throughout

- Rowan, Bryn, Nell, Ivo, Oren, Maelin and Ysra were present during the disaster. The adventurers were trapped; Rowan remained conscious in the surviving house. Outside, thirty years passed normally. Halden lived twenty-nine of those years and died last autumn; the opening occurs during the thirtieth year.
- Halden uses they/them. Rowan and Halden shared affection, a home and a planned journey. The script does not force a romance label where the existing game has none. Mara is a small brass golem built and raised by Halden, now Rowan’s familiar, a present-day craftswoman, and has a life outside the guild.
- Rowan knew Halden tried to save them but not the treatment’s workings. Mara tells Rowan about Halden’s death at the start. The late recording explains the emergency binding, not their death or Mara’s parentage for the first time.
- Bryn’s father worked at the waystation after the severance and died the following winter. Bryn missed that year while trapped. She was not searching the outside world for thirty years.
- Nell learned the shelter route as a child and used it herself as a guild pathfinder. Its keepers and descendants maintained it while she was trapped. Ivo was Ada’s apprentice at the guild, not a new student corresponding from elsewhere.
- Three bell strokes mean clear the outer rooms and stairs. A continuous signal means hold position. The false signal begins with an extra stroke and continues, reversing the evacuation instruction. Maelin’s frost ward suppresses it.
- Vey authorised the experiment, suspended it after the repeated voice results, then restarted it after a reassuring test. The stop order reached the study; it was not mysteriously intercepted. Ada withheld failures from the public report. Both made consequential choices. Vey’s ultimate fate remains unconfirmed by the supplied evidence; do not claim a recovered body or final confession.
- Brass fittings connect specific places. The disaster severed the connections. Small reclaimed links extend Rowan’s reach. The great threshold is the route the Guest needs for its full crossing. Both existing replacement methods release Rowan.
- The Guest copies traces from connected places. Its imitations cannot supply experiences lived beyond those connections. It wants one enduring interior with no departures. It has an intention, not universal knowledge or an excuse to invalidate every piece of evidence.
- Lark, Ves, Sorrel, Sal and Tavi are spirits whose deaths are established through personal records. Do not describe them as living people physically rescued outside before discovery. Other regional residents were trapped in house wards; current local keepers conduct outside repairs using recovered procedures.
- Death, injury, class changes and resurrection retain their existing mechanics. This text cannot invent companion reactions unsupported by the runtime. Halden’s burial instruction is a moral challenge, not an assurance that the current raising mechanic already checks prior wishes. A future reaction scene must be implemented as a scene, not claimed in a result that does not execute it.

## Narrative spine

A person who believed usefulness earned them a home wakes into a home they cannot leave. Rebuilding the guild brings people into it again. The investigation reveals both real rescues and acts of dispossession. Rowan recognises their own small part in the latter. Halden’s letters show that love continued through an outside life Rowan could not share. The records identify the binding, and the new guild builds a replacement. The Guest offers the life Rowan remembers without the changes that made other people themselves. Rowan refuses it and receives a future, not restitution of the lost years.

The house remains a place for people who are injured, changed, finished with their work, or preparing to leave. Not every disagreement ends in reconciliation. Not every loss produces a lesson. Symbols recur through ordinary objects—the bowl, door latch, travel list, names, bell, lamps—whose literal history is established before they carry emotional weight.

## Mystery and revelation order

| Evidence                            | Answer supplied                                                           | Next question                                   |
| ----------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------------- |
| Service ledger                      | The landing fitting exists at Wren’s Crossing                             | Why was the connection deliberately removed?    |
| Bell signal and landing inscription | The severance stopped an intelligence copying orders                      | What happened to the people using those routes? |
| Ship and Sera                       | An evacuation connection stranded passengers; she charted surviving rooms | What did the official records omit?             |
| Archive                             | Acquisitions were disputed and repeatable warnings dismissed              | Who authorised continuation?                    |
| Tower papers and mirror             | The suspension arrived and was countermanded after a reassuring test      | What happened when it failed?                   |
| Survivor testimony                  | False instructions delayed evacuation and separated the infirmary         | How did Rowan survive?                          |
| Medical cylinder                    | Halden used the house as emergency life support                           | What can take over its entire function?         |
| Replacement tests                   | The binding can be removed safely                                         | What life does Rowan choose now?                |

Optional evidence can enrich this order without becoming mandatory or granting knowledge before its flag is learned. The main route must still explain enough when optional rooms are skipped.

## Complete replacement catalogue

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

The captain on the stranded shore

### narrative.js:22

**Context:** storyMissions → navigator → desc

The landing register names Captain Sera Venn. The bow of her ship is in the cellar; its stern was stranded on the coast when the guild connections broke. Find Sera and ask what became of her passengers. Her navigation charts also record the archive’s last position.

### narrative.js:24

**Context:** storyMissions → navigator → checks → label

Agility 8 finds a route over the broken sea wall

### narrative.js:25

**Context:** storyMissions → navigator → checks → label

Water breathing crosses the drowned road

### narrative.js:29

**Context:** storyMissions → navigator → arrival

The stern of Sera’s ship rests above the beach on timber props. Washing hangs between its masts. Someone has planted beans in a lifeboat.
Sera recognises the guild token before anyone introduces themselves.
“Thirty years,” she says. “You might have sent a letter.”
She listens to the explanation. Then she brings out a chart and an archive seal. The guild used her ship to evacuate passengers through the cellar doorway. When the connection broke, the bow vanished into the house. The stern and the people still aboard were left here.
“Most made lives ashore. Some stayed angry. You’ll find I managed both.”
A horn sounds from the beach. Three deckhands inspecting the reef are cut off by water surging through another damaged guild connection. The same surge is flooding Sera’s chart room. There is time to secure its fragile survey sheets or take the boat out to the reef. Sera has shore volunteers who can attempt the other task, but they cannot promise the same result.
She hands over the archive seal now. “Take this either way. The chart will tell you where to use it. But tell me what your people are doing before I send mine.”

### narrative.js:33

**Context:** storyMissions → navigator → choices → crew → label

Bring the deckhands home

### narrative.js:35

**Context:** storyMissions → navigator → choices → crew → preview

Rescue all three deckhands. Recover the surviving part of Sera’s chart and the archive seal. Gain Sera’s trust and unlock community escort work.

### narrative.js:40

**Context:** storyMissions → navigator → choices → crew → result

The party rows out with Sera. The youngest deckhand cannot swim; he has tied himself to a marker post and is trying to pretend he is not frightened. They bring all three back before the water covers the reef.
The volunteers save only part of the chart. The archive’s position remains legible, but several smaller routes are lost.
That evening the rescued crew sit at the guild table in borrowed clothes. Bryn finds them dry boots. They argue about whose fault the boat was, then ask for seconds.
Sera sends a message offering escort work along the coast. Beneath the contract details she adds: “I’ll redraw what I can. Thank you for bringing them back.”

### narrative.js:44

**Context:** storyMissions → navigator → choices → chart → label

Preserve the complete chart

### narrative.js:46

**Context:** storyMissions → navigator → choices → chart → preview

Recover the complete chart, the archive seal and 25 extra gold. Sera and shore volunteers attempt the rescue; the deckhands survive but face a longer journey home. Gain survey knowledge for containment.

### narrative.js:52

**Context:** storyMissions → navigator → choices → chart → result

The party secures the survey sheets while Sera takes a boat out with shore volunteers. They return to find her boat missing from the beach.
The complete chart identifies smaller surviving connections that will help design the replacement seal. Sera has left the agreed payment with the archive case: twenty-five gold more for recovering the full survey.
Her letter arrives later. The deckhands survived, but the rescue boat lost its rudder. They had to shelter farther down the coast and make a difficult journey back.
“Use those routes,” she writes. “I would like to think we bought something better than a tidy archive.”

### narrative.js:58

**Context:** storyMissions → orchard → name

Winter in Alder

### narrative.js:66

**Context:** storyMissions → orchard → desc

The archive shows that the guild acquired Alder’s communal greenhouse through a disputed debt settlement. Its damaged heating spell still drains warmth from the village soil. Edda, the current keeper, can release the room’s anchor. She also needs help deciding where to establish a living root system that could repair the damage.

### narrative.js:68

**Context:** storyMissions → orchard → checks → label

Tracking finds paths through the displaced roots

### narrative.js:69

**Context:** storyMissions → orchard → checks → label

Endurance 10 withstands the cold pollen

### narrative.js:73

**Context:** storyMissions → orchard → arrival

There are apples on the trees in Alder, small and hard beneath a skin of frost. Edda cuts one open with her pruning knife. The middle is black.
“We used to send six carts to market,” she says. “My mother kept the figures. People think she exaggerated.”
The greenhouse once circulated warmth through the orchard. Its connection was severed while the heating spell was running. The buried network still draws heat from the soil, but the warmth now disappears into the stranded room.
Edda has spent years cultivating a replacement root system. Established here, it could restore the orchard. Established in the guild’s recovered greenhouse, it could produce medicine and cuttings for future repairs. It is not strong enough to divide yet. Moving it to the house means Alder must wait for replacement plants.
She will release the greenhouse either way. The village has already rebuilt its seed store elsewhere.
“I want the orchard back,” she says. “If you take the roots, tell me how long you expect us to wait. And put the money and the promise in writing. My mother was told to be patient too.”

### narrative.js:77

**Context:** storyMissions → orchard → choices → return → label

Leave the seed bank with Alder

### narrative.js:79

**Context:** storyMissions → orchard → choices → return → preview

Alder becomes an ally. Reclaimed greenhouse can become a hospice. Opens the neighbour-based final method.

### narrative.js:84

**Context:** storyMissions → orchard → choices → return → result

Edda and the party plant the root system beneath the oldest tree. At first nothing happens. Then water begins to drip from the branches.
She keeps watching after everyone else has gone to eat.
The greenhouse returns to the guild without its rare plants. Edda sends trays of ordinary herbs and several cracked pots. There is space for beds between the benches.
Her next letter reports that the frost has not returned. She offers to introduce Rowan to the neighbouring keepers when the guild is ready to replace its old connections.

### narrative.js:88

**Context:** storyMissions → orchard → choices → study → label

Bring the root lattice to the house

### narrative.js:90

**Context:** storyMissions → orchard → choices → study → preview

Reclaimed greenhouse can become a botanical laboratory. Gain containment knowledge; Alder receives payment and a written promise of cuttings.

### narrative.js:96

**Context:** storyMissions → orchard → choices → study → result

Edda counts the payment twice. She writes the agreement herself: the first viable cuttings go to Alder, and the guild sends progress reports even if the work fails.
At the house, the roots settle into the greenhouse beds. They can support medicinal plants and respond to changes in the anchor frame. The research may help separate Rowan from the house.
The guild’s first measurements begin. Rowan enters the promised cuttings in the ledger beside the money received.
Edda’s orchard is still cold. Their first letter home has to say so.

### narrative.js:102

**Context:** storyMissions → lens → name

A light above the salt cliff

### narrative.js:110

**Context:** storyMissions → lens → desc

Elian, the old guild lookout, maintains a coastal watchtower fitted with the missing observatory lens. He heard the orders given during the evacuation. Recover the lens and ask him to explain the contradictory alarms.

### narrative.js:112

**Context:** storyMissions → lens → checks → label

Strength 11 secures the falling counterweight

### narrative.js:113

**Context:** storyMissions → lens → checks → label

Intellect 10 aligns the tower safely

### narrative.js:117

**Context:** storyMissions → lens → arrival

Elian meets the party halfway up the tower stairs. He carries a lamp despite the daylight. His knees no longer trust the steps.
The enchanted lens is still searching for the guild observatory it once served. Its beam turns inland, away from the harbour that needs it.
“I kept expecting somebody to fix that,” Elian says. “Then I became the somebody people expected.”
He recognises the token. On the night of the disaster, he relayed the order to open the evacuation doors. Later he heard Vey order them closed. Between those orders, the signal repeated instructions nobody had sent.
He has kept his watch log. Harbour families have asked for an explanation for years; he has given them numbers when they wanted a person to answer.
Removing the lens will darken the tower until an ordinary beacon is fitted. Elian can travel back to give his account himself, or remain here while the party carries his signed log and calibrated instruments.

### narrative.js:121

**Context:** storyMissions → lens → choices → witness → label

Bring Elian home to testify

### narrative.js:123

**Context:** storyMissions → lens → choices → witness → preview

Gain a witness and community trust. Observatory becomes a listening station. Bryn values an answer given in person.

### narrative.js:128

**Context:** storyMissions → lens → choices → witness → result

Elian packs a change of clothes, his watch log and the worn alarm rope. He takes a long time locking the tower door.
At the guild, a harbour widow reads his list of missing ships. She corrects her husband’s name and asks why Elian waited so long.
He begins with the answer he has practised, stops, and says, “I was afraid you would believe I could have prevented it.”
She does not forgive him that afternoon. She agrees to return with her son. The lens is fitted in the observatory while Mara finds Elian a room.

### narrative.js:132

**Context:** storyMissions → lens → choices → record → label

Carry his record; let him keep watch

### narrative.js:134

**Context:** storyMissions → lens → choices → record → preview

Gain calibrated instruments and containment knowledge. Observatory becomes a survey station. His signed account still enters the journal.

### narrative.js:139

**Context:** storyMissions → lens → choices → record → result

The party helps Elian install an ordinary harbour light before lifting out the enchanted lens. For the first time in years, its beam stays on the channel.
He signs his account and includes the dates when families asked to see it. He asks the party to tell them he will receive questions at the tower.
As they leave, he calls down the stairs: “If the boy from the rope-maker’s comes, send him up. I owe his mother an answer.”
The lens and instruments return to the guild. Elian remains on watch, with a signal people can use and an appointment he can no longer avoid.

### narrative.js:145

**Context:** storyMissions → brynPast → name

The stones we leave standing

### narrative.js:155

**Context:** storyMissions → brynPast → desc

Bryn finds her father’s mark on the service wall and a record of his waystation job. A recent demolition notice reports a chamber beneath that station. Search it for news of what happened after the severance.

### narrative.js:157

**Context:** storyMissions → brynPast → checks → label

Strength 10 supports the failing lintel

### narrative.js:158

**Context:** storyMissions → brynPast → checks → label

Guard protects the demolition crew

### narrative.js:162

**Context:** storyMissions → brynPast → arrival

The foreman leads Bryn beneath the waystation. Her father’s mason mark is cut into the arch above a memorial chamber. Inside are the names of workers killed during the severance.
Bryn finds his name near the bottom. The letters are less neat than the rest: someone else finished the list.
The foreman shows her a pay entry. Her father survived the first collapse and returned to shore up the damaged waystation. He died there the following winter. No letter reached the sealed guild.
Before Bryn can ask more, a shout comes from the adjoining excavation. An apprentice is trapped beneath a fallen section of roof. The crew’s remaining support timbers are bracing the memorial chamber. Moving them will let the rescuers reach him, but the chamber and its carved wall will collapse. Keeping them in place preserves the memorial while a second rescue crew travels from town.
Bryn rests her shield against the wall. “How far is that crew?” she asks. She does not look at the names again.

### narrative.js:166

**Context:** storyMissions → brynPast → choices → apprentice → label

Use the supports to reach the apprentice

### narrative.js:168

**Context:** storyMissions → brynPast → choices → apprentice → preview

Rescue the apprentice now; the memorial chamber collapses. Preserve the surviving names as rubbings. Gain Bryn’s trust and Steadfast (+1 Endurance).

### narrative.js:170

**Context:** storyMissions → brynPast → choices → apprentice → trait → bryn → name

Steadfast

### narrative.js:173

**Context:** storyMissions → brynPast → choices → apprentice → result

Bryn makes the foreman show her where the timbers must go. She helps carry them.
The apprentice is pulled free before the memorial chamber falls. Afterward, she retrieves fragments from the rubble and takes rubbings of every name she can find. One corner of her father’s name is missing.
At home, she washes the dust out of her hair before supper. The apprentice’s family sends thanks. She reads their letter twice, then asks Mara for somewhere dry to lay the rubbings.
The shield stays beside her bed that night, its latch turned toward the wall.

### narrative.js:177

**Context:** storyMissions → brynPast → choices → memorial → label

Recover the memorial; call another rescue crew

### narrative.js:179

**Context:** storyMissions → brynPast → choices → memorial → preview

Recover the memorial intact. A second crew rescues the apprentice later, but his leg is permanently injured. Bryn gains Keeper of names (+1 Strength).

### narrative.js:181

**Context:** storyMissions → brynPast → choices → memorial → trait → bryn → name

Keeper of names

### narrative.js:184

**Context:** storyMissions → brynPast → choices → memorial → result

The party lifts the carved stones onto a cart. Bryn keeps the last slab steady while the foreman sends for the second rescue crew.
They reach the apprentice at dusk. He survives, but the injury to his leg will be permanent.
Bryn visits him before leaving. He asks whether the memorial was worth saving. She tells him whose names it holds. Neither knows what to say after that.
At the guild she records the second crew’s delay and his injury alongside the recovered stones. She insists the report keep both.

### narrative.js:190

**Context:** storyMissions → nellPast → name

The path her grandmother hid

### narrative.js:200

**Context:** storyMissions → nellPast → desc

Sera’s chart marks the shelter route Nell learned from her grandmother and used during the evacuation. Its current keepers may know what happened to the families she guided there.

### narrative.js:202

**Context:** storyMissions → nellPast → checks → label

Tracking locates the unmarked stepping stones

### narrative.js:203

**Context:** storyMissions → nellPast → checks → label

Agility 10 crosses the ravine

### narrative.js:207

**Context:** storyMissions → nellPast → arrival

The shelter keeper meets Nell at a stand of alder trees. A blue sleeve is tied above the path. Nell touches its cuff as though recognising a friend.
Her grandmother used these cloth markers to guide families around the guild customs post. Nell later used the same route during the evacuation. The keeper brings out a register: some of those families reached safety, some moved away, and several descendants still maintain the shelters.
“She said someone would come back for the maps,” the keeper tells her. “We stopped knowing who she meant.”
A trader has offered to buy the route and charge for passage. The keepers have refused. They ask whether Nell will help publish reliable directions or keep the map among trusted guides. A public route would reach more strangers, but it would also be easier for patrols to follow. Shelter addresses can remain private in either case.
Nell reads the register before answering. Her grandmother’s name is written beside a delivery of blankets.

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

Nell works with the shelter keepers on a public route. They remove household addresses and arrange places where travellers can ask for a guide.
She draws the blue sleeve beside the first meeting point. The keeper laughs. “We use painted posts now. Coats keep getting stolen.”
At home Nell adds her grandmother’s name to the map credits. She writes to the ferry cottages about escort work and puts aside lamp oil for the next visit.

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

Nell and the keepers retain the detailed map among the guides. The trader’s copy is destroyed, and the guild receives a route for discreet salvage and escorted travel.
Nell lists who holds each copy. She includes herself.
“I’ll take people through,” she tells Rowan. “I won’t promise I can tell at a glance who deserves it. Grandmother got that wrong sometimes.”
She leaves the shelter register on the table. Tomorrow she means to write to the families whose names she recognises.

### narrative.js:238

**Context:** storyMissions → ivoPast → name

A teacher’s last lesson

### narrative.js:248

**Context:** storyMissions → ivoPast → desc

An archive supply receipt is signed by Ada Merrow. Ivo’s former teacher survived the disaster and now maintains a damaged connection at a monastery. Find her and ask what happened to the warning she dismissed.

### narrative.js:250

**Context:** storyMissions → ivoPast → checks → label

Magical literacy reads the safe seal sequence

### narrative.js:251

**Context:** storyMissions → ivoPast → checks → label

Intellect 11 solves the reverse bell pattern

### narrative.js:255

**Context:** storyMissions → ivoPast → arrival

Ivo recognises Ada’s voice before her face. She corrects the way he holds his lamp, then covers her mouth.
“You haven’t changed,” she says.
He has spent thirty years inside a protective rune. She has spent them growing old.
The chalk circle around her chair supports a damaged threshold. Monastery staff bring meals and keep watch, but the existing design cannot release its operator safely. Ada has refused to abandon it before a replacement is ready.
Ivo shows her the witness statement. She remembers it. The repeated voices did not fit her model, so she treated the witness as unreliable. She also removed failed tests from the public report because she feared the funding would be withdrawn.
“I taught you better than that,” she says. “Then I did it anyway.”
Her revised calculations allow a living lattice or a slower mechanical seal to take over. Both can release her. She asks to remain at the monastery after the transfer, helping the people who have kept her alive. Ivo would like to bring her back to the guild. For once, he cannot make the decision by solving a calculation.

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

They test the replacement through a full night. Ada watches it long after the last measurement is complete.
When she steps out of the circle, Ivo offers his arm. She takes it without correcting him.
At the guild she asks for a desk and the original witness statement. She will answer questions about her report before teaching the replacement method.
Ivo puts her favourite cup beside the desk. She remembers it; he has been carrying it since the evacuation. Neither mentions how long that has been.

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

The replacement holds. Ada leaves the circle, then chooses a room overlooking the monastery garden. A trained relief keeper takes the next watch.
Ivo stays for breakfast. They disagree about a calculation and discover that neither particularly wants to stop talking.
He brings her revised method back to the guild, together with an account of her part in the experiment. Ada promises further answers. Her next letter contains a correction, a request for fresh ink and a question about whether he is sleeping enough.

### narrative.js:285

**Context:** storyMissions → witness → name

The night they cut the road

### narrative.js:293

**Context:** storyMissions → witness → desc

The observatory has located the infirmary used during the evacuation. A medical recording may explain how Halden saved Rowan and what happened when the outer connections were cut. Its anchor is failing; retrieve the cylinder before the room is lost.

### narrative.js:295

**Context:** storyMissions → witness → checks → label

Endurance 12 holds against the memory storm

### narrative.js:298

**Context:** storyMissions → witness → checks → label

Magical literacy separates the record from the voice imitating it

### narrative.js:303

**Context:** storyMissions → witness → arrival

The recording begins with someone asking for clean cloth. Rowan knows the voice. For a moment they can almost smell Halden’s soap.
Then an alarm drowns it out.
Vey asks whether the joining can still be stabilised. Halden tells her to come to the stair and count the injured. Rowan’s younger voice interrupts: “There are people above us.” Timber breaks. Someone calls their name.
The recording continues in the infirmary. Halden asks their assistant to hold a lamp. Rowan’s pulse is failing; moving them through another doorway will kill them. The surviving house magic is the only support Halden can reach in time.
“Bind the pulse here,” they say. “Not to the destination. To the house.”
Their assistant asks what happens when Rowan wakes.
“We replace it. As soon as the doors are safe.”
Vey orders the outer road severed. Halden protests that the infirmary will be cut off too. Vey says the false orders have already reached the evacuation doors. There is no time for another transfer.
“Then put it in the record,” Halden says. “This is treatment. They have not agreed to hold your guild together.”
The cylinder ends with the sound of the doors closing.
For thirty years Rowan has remembered falling and then waking in an empty house. Now there is something between those moments: Halden working, frightened, still expecting to see them again.
Mara sits beside Rowan without opening the packet of letters. They have been there since she arrived. Today Rowan asks for the last one.
Halden writes about a walk they could no longer manage, Mara’s work, and the places still on their old travel list. Then: “I wanted you to have a life. It did not have to be a life with me.”
Rowan folds the letter along its old crease. The recording has identified the binding that must be replaced. It has also answered a question Rowan had never managed to ask: they were not left behind because Halden stopped trying.

### narrative.js:307

**Context:** storyMissions → witness → choices → publish → label

Publish the record, including Rowan’s binding

### narrative.js:309

**Context:** storyMissions → witness → choices → publish → preview

The guild accepts public accountability. More neighbours will help a consent-based reconnection. Rowan’s truth is made public by Rowan’s decision.

### narrative.js:313

**Context:** storyMissions → witness → choices → publish → result

Rowan listens to the recording again before deciding to release it in full. Mara prepares a transcript and leaves space for questions.
A former patient brings flowers for Halden. An Alder resident brings an unpaid claim. Rowan asks Mara to keep both.
When a visitor calls the binding a sacrifice, Rowan corrects them. “I was unconscious. Halden saved me. Those aren’t the same thing.”
The accounts of the catastrophe become public. So does the problem the new guild is trying to solve.

### narrative.js:317

**Context:** storyMissions → witness → choices → private → label

Publish the collapse; keep Rowan’s injury private

### narrative.js:319

**Context:** storyMissions → witness → choices → private → preview

The catastrophe remains public, but Rowan keeps control over their personal history. Gain a careful containment analysis from a limited circle of witnesses.

### narrative.js:323

**Context:** storyMissions → witness → choices → private → result

The published transcript records the orders, the injured passengers and the severance. Rowan’s medical treatment is retained for the people preparing the replacement.
A visitor asks Bryn for the missing pages. She directs him to the public account and returns to her work.
Later Rowan thanks her. “Wasn’t much,” she says. She has nevertheless moved the private folder into a cupboard that locks.

### narrative.js:329

**Context:** storyMissions → covenant → name

A hundred small doors

### narrative.js:340

**Context:** storyMissions → covenant → desc

Travel to the connected settlements and arrange small anchors maintained by their keepers. Each must be able to close independently while the others support the house. Materials and travel cost 90 gold.

### narrative.js:342

**Context:** storyMissions → covenant → checks → label

Endurance 11 carries the anchor posts between settlements

### narrative.js:343

**Context:** storyMissions → covenant → checks → label

Tracking reaches each keeper before the agreed tide

### narrative.js:347

**Context:** storyMissions → covenant → arrival

The keepers meet in the guild dining room. Sera arrives late and complains about the road; Edda has brought apple cuttings wrapped in damp cloth.
The proposed covenant uses many small connections instead of one living anchor. Each community maintains its own link and can close it. The others will carry the load while repairs are made. Before anyone agrees, they need to know who pays, who answers an alarm and where visitors sleep.
Rowan listens while they argue through the details. For years an unfamiliar voice in the house meant danger. These voices are disagreeing over tea.
They can establish a guild charter with visiting and withdrawal rights, or share authority through a commons of community keepers. Both plans can release Rowan. Neither works unless the people around the table commit to doing the work.

### narrative.js:351

**Context:** storyMissions → covenant → choices → charter → label

Write a charter for a welcoming guild

### narrative.js:353

**Context:** storyMissions → covenant → choices → charter → preview

The house remains a guild, with enforceable visiting and withdrawal rights. Residents keep the home they built. Prepare the safe threshold.

### narrative.js:357

**Context:** storyMissions → covenant → choices → charter → result

The charter sets out maintenance, visiting rights and the procedure for closing a connection. Sera makes them rewrite the repair deadlines. Edda asks for a copy she can read without magical training.
During the test, one keeper shuts her door. Rowan feels the familiar tightening in their chest begin, then ease as the remaining anchors take the strain.
“Again,” they ask.
She closes it again. The house holds. Mara writes down the time with a hand that is not quite steady.

### narrative.js:361

**Context:** storyMissions → covenant → choices → commons → label

Let the house become a shared commons

### narrative.js:363

**Context:** storyMissions → covenant → choices → commons → preview

Communities share authority over the connections. The guild becomes one resident among several. Prepare the same safe threshold.

### narrative.js:367

**Context:** storyMissions → covenant → choices → commons → result

The communities appoint their keepers. Guild residents take their seats beside them rather than at the head of the table.
The first meeting runs past supper. Somebody reheats the soup. By the end, there are named people responsible for every connection and a procedure for changing those names.
Rowan’s part of the anchor diagram is crossed out for the test. The lamps stay lit.
Mara asks whether they want the old sheet kept. Rowan says yes. She folds it and puts it away.

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

Ada’s revised design divides the house connection into narrow channels, with shutters that close independently. No single opening is large enough for the Guest to complete its crossing. None requires a living mind to correct it.
The first test is conducted with Rowan’s binding still in place as a precaution. The second must show that the frame can take over the entire load.
The remaining decision is who holds the shutoff keys. A rotating pair of guild residents can maintain the system from within, or independent keepers can hold the keys outside. Neither key works alone. Rowan will not be required to hold either.

### narrative.js:394

**Context:** storyMissions → lattice → choices → residents → label

Give rotating residents the paired keys

### narrative.js:396

**Context:** storyMissions → lattice → choices → residents → preview

Guild residents share responsibility; no single leader controls reconnection. Prepare a safe mechanical threshold.

### narrative.js:400

**Context:** storyMissions → lattice → choices → residents → result

Bryn turns the first key. Mara waits for the marked interval and turns the second. The test lamp goes dark while the rest of the house stays lit.
They repeat it with one channel blocked. Then with a delayed signal. Rowan watches the diagram through every test.
When the frame takes the whole load, they stand up expecting the floor to move beneath them. It does not.
Mara asks if they would like to sit down. Rowan laughs once, unexpectedly, and says they have been sitting down long enough.

### narrative.js:404

**Context:** storyMissions → lattice → choices → outside → label

Entrust the keys to independent keepers

### narrative.js:406

**Context:** storyMissions → lattice → choices → outside → preview

Outside witnesses can stop an unsafe joining. The guild accepts oversight. Prepare the same safe mechanical threshold.

### narrative.js:410

**Context:** storyMissions → lattice → choices → outside → result

The outside keepers bring their keys back for the final test. One stays at the frame; the other watches from the entrance.
A channel repeats Halden’s voice. The shutter closes before the sound reaches the adjoining room. The ordinary test signal then passes through a separate channel.
Rowan asks them to repeat both. The results hold.
The keepers record the settings and their next inspection date. Rowan can leave without taking the keys with them.

### narrative.js:419

**Context:** laterContracts → marsh → name

Letters across the sleeping marsh

### narrative.js:425

**Context:** laterContracts → marsh → desc

Coastal families have lost contact with relatives along the severed routes. Carry their letters through the marsh to the addresses confirmed by Sera’s latest chart. The lights on the water do not mark safe paths.

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

Escort travellers between the recovered settlements. Some have not seen their old homes since the severance. Bring enough supplies for those who cannot keep the party’s usual pace.

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

Recover abandoned instruments along Nell’s quiet passage. Record their owners before sale or return, and reserve the agreed share for restitution. Nell’s guides can keep the cargo away from the disputed customs road.

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

The observatory has identified smaller stranded rooms. Survey their connections, contact the residents and stabilise the routes that can be made safe. Mark unsafe approaches clearly for later search parties.

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

Rowan finds an acquisition form they recognise. They remember ruling the columns themselves.
It describes Alder’s greenhouse as a debt settlement. A letter attached to the back asks when the villagers can have it again. The letter was never entered in the catalogue.
Other files contain objections to room removals, passenger lists labelled as volunteer expeditions, and testimony from people detained after asking for their property back.
A reader brings Rowan the original report of voices from the experimental doorway. The witness describes the same words repeating after everyone present has stopped speaking. Ada marked the account unverified. The test was authorised anyway.
Two addresses give them somewhere to begin: Edda’s village in Alder and Elian’s coastal watchtower. The greenhouse and observatory lens can be recovered there.
Before parties leave, Rowan must decide how visitors can examine the records: open access with vulnerable names protected, or a research team checking the accounts before publication. Either way, the originals must remain intact.

### narrative.js:502

**Context:** rooms → library → discovery → archive → choices → open → label

Open the records with protected names

### narrative.js:504

**Context:** rooms → library → discovery → archive → choices → open → preview

Visitors can challenge the guild’s history; vulnerable witnesses choose when to be named. Gain community trust.

### narrative.js:509

**Context:** rooms → library → discovery → archive → choices → open → result

Mara lays the records on the long table and opens a correction book. A visitor recognises her father among the passengers. Another asks that her statement stay private until she has spoken to her family.
Rowan looks up the original forms while the visitors explain them. Some corrections are straightforward. Others will take further evidence.
The addresses in Alder and at the watchtower are copied into the expedition ledger. Rowan stays to hear the next account.

### narrative.js:513

**Context:** rooms → library → discovery → archive → choices → study → label

Build a careful research archive

### narrative.js:515

**Context:** rooms → library → discovery → archive → choices → study → preview

A small team verifies accounts before publication. Gain containment knowledge; uncensored originals remain preserved.

### narrative.js:520

**Context:** rooms → library → discovery → archive → choices → study → result

The research team labels each account with its source and what remains unconfirmed. Rowan adds the letters omitted from the old catalogue.
The warning about repeated voices is copied for expedition leaders. Visitors can submit corrections, and the original documents remain available to the verification team.
They mark Alder and the watchtower for investigation. A reader starts to write “empty destination” on the expedition map, stops, and replaces it with “destination unknown”.

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

With its damaged heating circuit disconnected, the greenhouse is safe to use. Rainwater beads on the glass, and the old growing benches still bear the marks of village tools.
The guild can fit beds and grow ordinary medicinal herbs, using the help offered by Alder. Alternatively, it can build a botanical laboratory to study roots that respond to the house’s magic and help develop the replacement seal.
Both are useful. The house needs to care for the people coming back injured, and Rowan needs a way to leave. The benches and floor space must be arranged for one main purpose.

### narrative.js:545

**Context:** rooms → garden → discovery → gardenUse → choices → hospice → label

Make room for beds and ordinary medicine

### narrative.js:548

**Context:** rooms → garden → discovery → gardenUse → choices → hospice → preview

A hospice shortens future expedition injuries by one day. Alder’s keepers can help the final covenant.

### narrative.js:553

**Context:** rooms → garden → discovery → gardenUse → choices → hospice → result

Bryn builds beds from the cleared specimen cases. Edda’s herbs go into labelled pots where patients can reach the windows.
The first injured adventurer complains that the blankets itch. Mara finds different ones. Someone else asks whether recovery time will cost them their room. Rowan says no.
That evening the greenhouse windows remain lit after the workshops have closed.

### narrative.js:557

**Context:** rooms → garden → discovery → gardenUse → choices → laboratory → label

Grow a lattice that can close a threshold

### narrative.js:560

**Context:** rooms → garden → discovery → gardenUse → choices → laboratory → preview

A botanical laboratory reduces containment preparation costs. Rowan accepts the duty to share future cuttings with Alder.

### narrative.js:565

**Context:** rooms → garden → discovery → gardenUse → choices → laboratory → result

The researchers fit an anchor frame among the growing beds. The roots close around it when the false signal begins, then loosen when the ordinary test signal returns.
They send the measurements to Edda. The first viable apple cuttings go back with them, as promised.
Rowan checks the receipt when it arrives. Alder has planted them beside the oldest tree. The repayment has begun; it is not finished.

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

The lens brings distant anchor sites into focus. Each point of light resolves into a room: tables, windows, an unmade bed. Several contain moving figures.
The infirmary appears beneath a red dawn. Its lamp fades and returns at uneven intervals. The pattern is checked against the lens markings: its connection is failing.
Another signal comes from the great threshold. It is steady, waiting where the old warning says no one should open a door.
The observatory can be arranged to contact surviving residents or measure the connections before attempting travel. Either approach can locate the infirmary. Rowan looks at its narrow bed and remembers Halden pulling the curtains for a patient to sleep.

### narrative.js:590

**Context:** rooms → observatory → discovery → observatoryUse → choices → listen → label

Ask who is still there

### narrative.js:592

**Context:** rooms → observatory → discovery → observatoryUse → choices → listen → preview

Listening station strengthens community ties. Rowan gains anchor sight; the infirmary’s final record becomes reachable.

### narrative.js:596

**Context:** rooms → observatory → discovery → observatoryUse → choices → listen → result

The first messages receive no reply. Then a kitchen window lights up, and somebody complains that the signal is disturbing supper.
Other answers follow: a watchkeeper, a stranded household, a voice asking whether the road is safe. Each is checked against known records before a route is marked.
The infirmary transmits its old station name and the identification of Halden’s recording cylinder. Nobody answers from inside. Rowan asks for its position to be written down.

### narrative.js:600

**Context:** rooms → observatory → discovery → observatoryUse → choices → measure → label

Measure which connections are safe

### narrative.js:602

**Context:** rooms → observatory → discovery → observatoryUse → choices → measure → preview

Survey station strengthens containment knowledge. Rowan gains the same anchor sight and infirmary lead.

### narrative.js:606

**Context:** rooms → observatory → discovery → observatoryUse → choices → measure → result

The measurements show that the nearest connection is not necessarily the safest. The infirmary’s direct route passes through the great threshold; a smaller, slower approach avoids it.
Rowan marks that approach. The room’s intermittent signal identifies a medical recording, made during the evacuation.
They ask for the route to be checked once more before a party is sent.

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

The landing chair has a patched seat and a name carved underneath: Anwen. The same name appears in the list of residents displaced by guild acquisitions. Rowan remembers telling someone that personal names did not belong in an official room catalogue.
A plaque above the chair reads, “For those we promised to bring home.” Beside it, the anchor’s original test procedure is cut into the timber.
Mara proposes fitting the small landing as a visitors’ room, with somewhere to sit while claims and letters are heard. Rowan could instead use it as a quiet memorial and study, preserving the exposed anchor work for examination. Fitting either use will take the available space and repair materials.
The chair and Anwen’s name will remain in either arrangement.

### narrative.js:635

**Context:** houseChoices → landingPurpose → choices → welcome → label

Put the chair by the gate

### narrative.js:637

**Context:** houseChoices → landingPurpose → choices → welcome → preview

The landing becomes a visitors’ room. Gain community trust and a first conversation about restitution.

### narrative.js:642

**Context:** houseChoices → landingPurpose → choices → welcome → result

The chair is placed near the gate. Its first visitor is a courier asking about her missing brother.
Mara brings tea and the register. The courier sits forward while Rowan checks the spelling. When they find the entry, she asks for a copy to take to her mother.
After she leaves, Rowan looks under the seat again. They write Anwen’s name on a label where nobody needs to turn the chair over to see it.

### narrative.js:646

**Context:** houseChoices → landingPurpose → choices → remember → label

Keep the oath where it was written

### narrative.js:648

**Context:** houseChoices → landingPurpose → choices → remember → preview

The landing becomes a memorial and study. Gain knowledge of small-anchor work; preserve its former residents’ traces.

### narrative.js:653

**Context:** houseChoices → landingPurpose → choices → remember → result

The landing is fitted with a desk and a place to keep witness accounts. Rowan copies the anchor tests from the exposed timber; the sequence explains how a small connection can be closed without pulling the others apart.
Anwen’s name is written beside the chair in the room register. There is a blank space for information about her family.
Rowan leaves a pencil there. Someone may know more than the old catalogue did.

### narrative.js:659

**Context:** houseChoices → release → title

A door, not a debt

### narrative.js:662

**Context:** houseChoices → release → body

The replacement holds through its last test. Rowan can be disconnected.
Before the shutters close, the Guest opens a view into the old dining room. Halden sits beside Rowan’s usual chair. Other people are there: friends who died, companions who left. The cups are the ones Rowan remembers.
“You can sit down,” Halden says.
Rowan asks what Mara was like as a child.
“You can sit down,” Halden says again, with the same fond impatience.
The Guest speaks through the room. It has learned voices from the connected places: words said often, arguments repeated, names called into empty passages. It can keep these traces together. It wants the house to open every surviving connection so nothing can be separated from it again.
Someone at the table who had wanted to leave says they never wished to go. Rowan watches Halden lift a cup. The handle turns toward their old injured hand, the hand that only began to shake years after this room was cut off.
The Guest has Halden’s remembered voice. It does not have the life Halden went on to live.
Rowan asks for the shutter to be closed. For a moment they are angry with everyone who is ready to do it. Then the table disappears.
Mara waits. She does not say it was only an imitation.
When Rowan can speak, they ask whether the removal will hurt. Mara goes over the procedure with them again.
Afterward, the house’s rooms can remain connected under their new agreements, or begin returning to their communities. Neither decision delays Rowan’s freedom. Mara has a room ready at her own home if they want it. They can also choose another destination.

### narrative.js:666

**Context:** houseChoices → release → choices → home → label

Keep the house as a home with open visiting roads

### narrative.js:668

**Context:** houseChoices → release → choices → home → preview

Preserve the rooms and the agreements you made. Rowan may leave and return by choice. Walk left through the entrance gate to complete the campaign.

### narrative.js:671

**Context:** houseChoices → release → choices → home → result

The replacement takes the load. Rowan feels the old pull fade, waits for it to return, and finally lets go of the table edge.
The rooms remain under the agreements made with their keepers. There is work tomorrow, but Rowan does not have to be here for it.
Mara finds their coat. The old travel list is still folded in the pocket. The gate is open.

### narrative.js:675

**Context:** houseChoices → release → choices → return → label

Begin returning the borrowed rooms to their shores

### narrative.js:677

**Context:** houseChoices → release → choices → return → preview

The guild will share its work with the communities those rooms came from. Residents prepare new homes by consent. Walk left through the gate to finish.

### narrative.js:680

**Context:** houseChoices → release → choices → return → result

The replacement takes the load, and Rowan’s binding is removed.
The keepers set dates for returning the rooms. Families need somewhere to receive them; records and patients must travel safely. It will take time, and Mara begins a list of what must happen first.
Rowan starts to offer help with the first item. Mara asks whether they would rather see the road today.
Their coat is by the door. The rooms can be returned without waiting for Rowan, and Rowan can leave without waiting for the rooms.

### narrative.js:693

**Context:** conversations → brynStart → title

The latch on Bryn’s shield

### narrative.js:694

**Context:** conversations → brynStart → body

Bryn is trying to remove a splinter from her shield. There is still a latch on one edge.
“Workshop door,” she says. “Father made it. I was carrying it to the stair when the ward caught me. He’d have been furious about these straps.”
She tests them anyway.
Mara has told her the year. Bryn asks again, as though a second answer might differ.
“He was working at the waystation. I need to know if he came back.” She scrapes at the splinter. “Until we find something, I can take jobs. I’m better with a hammer than with waiting.”

### narrative.js:698

**Context:** conversations → brynStart → choices → honest → label

“I’ll tell you what I find. I can’t promise more than that.”

### narrative.js:699

**Context:** conversations → brynStart → choices → honest → preview

Agree to share any evidence about her father. +1 trust.

### narrative.js:702

**Context:** conversations → brynStart → choices → honest → result

Bryn points out the small chisel mark beside the latch. “That’s his. He tried to teach me to make it neatly. Mine always looks like a bent nail.”
Rowan promises to look for it in the records. She goes back to the strap, working more slowly.

### narrative.js:706

**Context:** conversations → brynStart → choices → purpose → label

“Help me repair the quarters. We’ll search the records after.”

### narrative.js:707

**Context:** conversations → brynStart → choices → purpose → preview

Give Bryn a practical first job. +1 trust.

### narrative.js:710

**Context:** conversations → brynStart → choices → purpose → result

Bryn measures the damaged beds and asks Mara for spare timber. She makes a list short enough to afford.
“We’ll start with somewhere to sleep,” she says. “I can think about the rest after that.”

### narrative.js:719

**Context:** conversations → nellStart → title

Nell checks the entrance road

### narrative.js:720

**Context:** conversations → nellStart → body

Nell puts a muddy road sketch on the table. The token leads her to the gate; without it, the same bend takes her toward the quarry.
“I used to know every stone here,” she says. “The ferry cottage is painted yellow now. I nearly knocked at the shed.”
She has crossed out a shortcut her grandmother kept off guild maps. Nell used it to move families during the evacuation. She does not know which shelters still exist.
“I can guide your parties out. Before I promise the way back, I should ask who’s living on it.”

### narrative.js:724

**Context:** conversations → nellStart → choices → invite → label

“Ask the local keepers which bridges they’re using.”

### narrative.js:726

**Context:** conversations → nellStart → choices → invite → preview

Nell checks the route with people living nearby. +1 trust and community confidence.

### narrative.js:730

**Context:** conversations → nellStart → choices → invite → result

The ferryman turns out to be the son of the man Nell remembers. He charges more and rows faster. She tells him both.
At the mill she learns which crossings have moved and where tired travellers can stay. She returns with corrected directions and a promise to bring news after the next expedition.

### narrative.js:734

**Context:** conversations → nellStart → choices → learn → label

“Survey it yourself. Mark anything that has moved.”

### narrative.js:735

**Context:** conversations → nellStart → choices → learn → preview

Nell makes a measured route survey. +1 trust and research knowledge.

### narrative.js:739

**Context:** conversations → nellStart → choices → learn → result

Nell measures the road twice and drives numbered stakes beside the shifting turns. She keeps yesterday’s sketch instead of rubbing it out.
“If the bridge moves again, I want to know how much. I’m tired of being surprised by bridges.”

### narrative.js:748

**Context:** conversations → ivoStart → title

Ivo’s missing teacher

### narrative.js:749

**Context:** conversations → ivoStart → body

Ivo has found a page from Ada’s lessons. His last calculation ends halfway through a line.
“She said she would check it after the joining,” he says. “I was worried she’d notice I’d borrowed her good ink.”
He looks at the date Mara has written beside the page. “She’ll be old now. If she’s alive.”
The same symbols appear around Rowan’s boundary. Ivo asks to trace them while Rowan moves between two marked points. No spells, just a measurement.
He explains the procedure too quickly, catches himself and starts again. “You can tell me to stop. I mean it. I haven’t done this before.”

### narrative.js:753

**Context:** conversations → ivoStart → choices → consent → label

“Explain each test first. Then I’ll decide.”

### narrative.js:754

**Context:** conversations → ivoStart → choices → consent → preview

Allow carefully explained tests of the binding. +1 trust.

### narrative.js:757

**Context:** conversations → ivoStart → choices → consent → result

Rowan agrees after Ivo has explained each step. He marks where they will stand and checks that the tracing does not change the boundary.
When he spills the ink, he is more embarrassed than Rowan thinks the occasion warrants. They remember Ada’s good ink too.

### narrative.js:761

**Context:** conversations → ivoStart → choices → house → label

“Start with the wall inscriptions. Leave my binding alone.”

### narrative.js:762

**Context:** conversations → ivoStart → choices → house → preview

Ivo investigates the house’s records first. +1 trust.

### narrative.js:765

**Context:** conversations → ivoStart → choices → house → result

Ivo takes his equipment into the corridor. He copies the wall inscriptions and marks the repeated symbol from Ada’s lesson.
Later he brings Rowan the page to look at, without asking them to stand inside anything.

### narrative.js:773

**Context:** conversations → brynAnchor → title

Her father’s mason mark

### narrative.js:774

**Context:** conversations → brynAnchor → body

Bryn has found her father’s mark beneath the service-room plaster.
“He cut this before the evacuation. Look at the bottom stroke.”
The ledger lists his next job: repairs at a guild waystation, two weeks’ wages. Bryn remembers his promise to visit afterward.
A recent demolition notice has reached Mara. Workers have found a sealed chamber beneath the same station.
Bryn lays the old job entry beside the notice. “If there’s a letter, it will be down there. If there isn’t—well. I still want to go.”

### narrative.js:778

**Context:** conversations → brynAnchor → choices → promise → label

“We’ll put a party together. You’re going with them.”

### narrative.js:780

**Context:** conversations → brynAnchor → choices → promise → preview

Support Bryn’s search. Her expedition requires two completed contracts. +1 trust.

### narrative.js:783

**Context:** conversations → brynAnchor → choices → promise → result

Bryn enters the location in the contract book. She asks for rope, lamps and another person who knows bad stonework.
She adds an extra length of rope after looking at the inventory. Rowan does not ask why.

### narrative.js:787

**Context:** conversations → brynAnchor → choices → choice → label

“Check the notice with the demolition crew before we set out.”

### narrative.js:788

**Context:** conversations → brynAnchor → choices → choice → preview

Support the same search with advance enquiries. +1 trust.

### narrative.js:791

**Context:** conversations → brynAnchor → choices → choice → result

Bryn writes to the foreman herself. His reply confirms the chamber and promises to leave it alone until the guild party arrives.
She keeps the envelope. It is the first letter addressed to her since she woke.

### narrative.js:799

**Context:** conversations → nellShore → title

The coats beside the trail

### narrative.js:800

**Context:** conversations → nellShore → body

Nell recognises a path on Sera’s chart. There is a shelter mark where her grandmother used to tie a blue sleeve to a branch.
“She taught me the route when I was twelve. Told me never to show it to an officer. I thought she was being difficult. She usually was.”
Nell later guided families through it herself. The mark on Sera’s chart is newer than the severance.
“Someone kept it going. I’d like to know who. And whether the people I sent there arrived.”

### narrative.js:804

**Context:** conversations → nellShore → choices → lead → label

“Take a party and check the shelters.”

### narrative.js:805

**Context:** conversations → nellShore → choices → lead → preview

Prepare Nell’s personal search. +1 trust.

### narrative.js:808

**Context:** conversations → nellShore → choices → lead → result

Nell makes a route card for the party and leaves a copy with Mara. She circles the last known shelter and writes when to send a search party.
“Don’t wait for us to become a story,” she says. “Come looking.”

### narrative.js:812

**Context:** conversations → nellShore → choices → ask → label

“Send word to the shelter keepers before we arrive.”

### narrative.js:813

**Context:** conversations → nellShore → choices → ask → preview

Prepare the search with the keepers’ help. +1 trust and community confidence.

### narrative.js:817

**Context:** conversations → nellShore → choices → ask → result

Nell sends a message through the ferry cottage. A shelter keeper replies with a safe meeting place and a request for lamp oil.
Below it is a name from Nell’s old list. She sits down to write a second letter before packing.

### narrative.js:825

**Context:** conversations → ivoArchive → title

Ada’s note in the archive

### narrative.js:826

**Context:** conversations → ivoArchive → body

Ivo has laid two pages beside one another. A witness reported repeated voices from the experimental doorway. Ada wrote that the account did not justify suspending the test.
“She made me check every line,” he says. “I used to hate her for it.”
He shows Rowan a later supply receipt addressed to Ada at a monastery. It proves she survived the first evacuation.
He wants to ask about the witness. He also wants to see her. He is annoyed that these do not feel like the same errand.

### narrative.js:830

**Context:** conversations → ivoArchive → choices → human → label

“Find her. Ask why she dismissed the warning.”

### narrative.js:831

**Context:** conversations → ivoArchive → choices → human → preview

Support Ivo’s search for his teacher. +1 trust.

### narrative.js:834

**Context:** conversations → ivoArchive → choices → human → result

Ivo writes to Ada at the supply address. His first page asks about the test; his second tells her he is alive.
He changes their order before sending them.

### narrative.js:838

**Context:** conversations → ivoArchive → choices → rigour → label

“Take copies of both records. Check her account against them.”

### narrative.js:840

**Context:** conversations → ivoArchive → choices → rigour → preview

Prepare the same search with documentary evidence. +1 trust and research knowledge.

### narrative.js:844

**Context:** conversations → ivoArchive → choices → rigour → result

Ivo packs both reports and asks Mara to check their dates. He leaves blank sheets for Ada’s answer.
At the last moment he adds the unfinished lesson page. He has questions about that too.

### narrative.js:852

**Context:** conversations → brynAfter → title

After the waystation

### narrative.js:853

**Context:** conversations → brynAfter → body

Bryn has brought her father’s name to the workbench, on the stone or rubbing recovered at the waystation.
“He died after I was trapped,” she says. “All this time I’ve been remembering someone who still had another winter.”
She presses the latch on her shield until it clicks.
“I used to think finding out would settle me. It hasn’t.”
There are repairs she has promised to finish. After that she would like to build a workshop of her own. She asks Rowan what they would do if the gate opened tomorrow.
“Something you want,” she adds. “Not something the house needs.”

### narrative.js:857

**Context:** conversations → brynAfter → choices → ordinary → label

“Walk into town. Buy breakfast somewhere else.”

### narrative.js:858

**Context:** conversations → brynAfter → choices → ordinary → preview

Share an ordinary plan with Bryn. +1 trust.

### narrative.js:861

**Context:** conversations → brynAfter → choices → ordinary → result

Bryn has heard of a bakery by the bridge. She draws its sign on a scrap of wood for Rowan.
“Bring me one of the apple things. If they still make them. I’ve missed thirty years of pastry.”

### narrative.js:865

**Context:** conversations → brynAfter → choices → return → label

“Spend a night away. See whether I miss this place.”

### narrative.js:866

**Context:** conversations → brynAfter → choices → return → preview

Tell Bryn what leaving would mean to Rowan. +1 trust.

### narrative.js:869

**Context:** conversations → brynAfter → choices → return → result

Bryn checks Rowan’s bedroom latch and leaves the key on the table.
“You can come back. I’m not giving your room away the minute you reach the road.”
She looks at her shield. “Mine either, I hope.”

### narrative.js:877

**Context:** conversations → nellAfter → title

A route for Rowan

### narrative.js:878

**Context:** conversations → nellAfter → body

Nell has drawn a map from the gate to the market town. It has an inn, a bridge and a bakery. No contracts.
“I checked the beds at the inn,” she says. “One squeaks. I’ve marked the other.”
She offers to walk with Rowan when the binding is removed. If Rowan would rather go alone, she can meet them farther on.
“I’ll be nervous either way,” she admits. “I’ve started thinking of you as part of the furniture. Sorry. Better furniture than most of this place.”

### narrative.js:882

**Context:** conversations → nellAfter → choices → together → label

“Walk with me until the road turns.”

### narrative.js:883

**Context:** conversations → nellAfter → choices → together → preview

Invite Nell to accompany Rowan’s first steps. +1 trust.

### narrative.js:887

**Context:** conversations → nellAfter → choices → together → result

Nell slips the map into Rowan’s coat pocket. She promises to bring food and complains that they will probably leave too late.
Rowan asks how early she means. The answer makes them reconsider the inn.

### narrative.js:891

**Context:** conversations → nellAfter → choices → alone → label

“I want to try the first stretch alone. Meet me in town.”

### narrative.js:892

**Context:** conversations → nellAfter → choices → alone → preview

Arrange to meet Nell after Rowan leaves. +1 trust.

### narrative.js:895

**Context:** conversations → nellAfter → choices → alone → result

Nell circles the inn and writes its name beneath the map. She will wait there rather than at the gate.
“If you get lost, ask someone. It’s embarrassing for about a minute. I do it constantly.”

### narrative.js:903

**Context:** conversations → ivoAfter → title

Testing the replacement seal

### narrative.js:904

**Context:** conversations → ivoAfter → body

Ivo shows Rowan the replacement frame. The drawing has crossed-out lines and three unresolved failure cases.
“I wanted to bring you something finished,” he says. “I kept finding reasons it wasn’t.”
If two channels fail together, the frame might open too wide. A separate shutoff could prevent that, but it needs testing. Alternatively, outside keepers could review the timing before construction.
He has left the rough calculations visible. Rowan can finally see how much he has changed since Ada’s perfect lesson pages.

### narrative.js:908

**Context:** conversations → ivoAfter → choices → test → label

“Build a small frame and deliberately break the links.”

### narrative.js:909

**Context:** conversations → ivoAfter → choices → test → preview

Test the failure cases at a safe scale. +1 trust and research knowledge.

### narrative.js:913

**Context:** conversations → ivoAfter → choices → test → result

The model fails on the second test. Ivo swears, checks whether Rowan heard, and swears again.
He records the failure and adds a separate shutoff. The next test stops safely. He keeps both results.

### narrative.js:917

**Context:** conversations → ivoAfter → choices → share → label

“Send copies to the outside keepers. Ask them to check it.”

### narrative.js:918

**Context:** conversations → ivoAfter → choices → share → preview

Have independent readers review the design. +1 trust and community confidence.

### narrative.js:922

**Context:** conversations → ivoAfter → choices → share → result

Ivo sends the drawings and failure list to outside keepers. A reply catches a timing error he missed.
He reads it twice before correcting the frame. Beside the change he writes the keeper’s name. Then he writes back to thank them.

### narrative.js:930

**Context:** conversations → brynTruth → title

Repairing the rear stair

### narrative.js:931

**Context:** conversations → brynTruth → body

Bryn stands at the rear stair after hearing the recording. She has brought a measuring string but has not unwound it.
“I remember you coming back up,” she tells Rowan. “I thought you’d forgotten something.”
The broken supports can be replaced. Bryn asks whether Rowan wants to go through the work or sit somewhere else today.
She does not ask them to tell her how the fall felt.

### narrative.js:935

**Context:** conversations → brynTruth → choices → future → label

“Show me what needs replacing.”

### narrative.js:936

**Context:** conversations → brynTruth → choices → future → preview

Work through the repairs with Bryn. +1 trust.

### narrative.js:939

**Context:** conversations → brynTruth → choices → future → result

Rowan holds the lamp while Bryn measures. One joint is worse than either expected; another can be saved.
They stop when the lamp runs low. Bryn leaves the string where she can find it tomorrow.

### narrative.js:943

**Context:** conversations → brynTruth → choices → space → label

“Another day. Sit with me for a while.”

### narrative.js:944

**Context:** conversations → brynTruth → choices → space → preview

Defer the repair discussion. +1 trust.

### narrative.js:947

**Context:** conversations → brynTruth → choices → space → result

Bryn puts the measuring string away. They sit on the dry landing until Mara calls them to eat.
On the way back, Bryn talks about the bakery. Rowan is grateful enough to let her repeat herself.

### narrative.js:955

**Context:** conversations → nellTruth → title

The map beyond the boundary

### narrative.js:956

**Context:** conversations → nellTruth → body

Nell brings a map of the valley. The guild is marked like any other building.
Rowan notices the ordinary symbol before the roads.
“I thought you might like that,” Nell says. “The map doesn’t need to know what happened inside.”
She can explain the journey now or leave it for another day. She will check the bridges again before Rowan leaves; yesterday’s good crossing is not always tomorrow’s.

### narrative.js:960

**Context:** conversations → nellTruth → choices → future → label

“Show me the route. Let’s plan it.”

### narrative.js:961

**Context:** conversations → nellTruth → choices → future → preview

Plan a journey outside with Nell. +1 trust.

### narrative.js:964

**Context:** conversations → nellTruth → choices → future → result

Nell explains the ferryman’s hours and the two usable crossings. Rowan chooses a route, then changes their mind.
Nell sharpens the pencil and lets them change it again.

### narrative.js:968

**Context:** conversations → nellTruth → choices → space → label

“Leave the map. I’ll look at it later.”

### narrative.js:969

**Context:** conversations → nellTruth → choices → space → preview

Keep the route available without planning today. +1 trust.

### narrative.js:972

**Context:** conversations → nellTruth → choices → space → result

Nell leaves the map folded to the valley rather than the whole region. She puts a pencil beside it.
“One day’s enough to start with,” she says.

### narrative.js:980

**Context:** conversations → ivoTruth → title

Removing Rowan from the diagram

### narrative.js:981

**Context:** conversations → ivoTruth → body

Ivo points to Rowan’s part of Halden’s diagram. Their mind has been correcting small instabilities in the house connection, continuously, even while they sleep.
“You weren’t failing to find the way out,” he says. “There wasn’t a safe one.”
The replacement must perform all those corrections before the binding is removed. He has a test list and a shutoff procedure written for someone without magical training.
He asks whether Rowan wants to see them now. This time he waits for the answer before spreading out the papers.

### narrative.js:985

**Context:** conversations → ivoTruth → choices → future → label

“Go through the tests with me.”

### narrative.js:986

**Context:** conversations → ivoTruth → choices → future → preview

Review the replacement plan with Ivo. +1 trust.

### narrative.js:989

**Context:** conversations → ivoTruth → choices → future → result

Ivo explains the tests in order. Rowan asks what happens if the operator freezes or hears a familiar voice.
He adds those questions to the list. They practise the shutoff twice, without connecting the frame.

### narrative.js:993

**Context:** conversations → ivoTruth → choices → space → label

“Tomorrow. I’ve heard enough for today.”

### narrative.js:994

**Context:** conversations → ivoTruth → choices → space → preview

Defer the technical discussion. +1 trust.

### narrative.js:997

**Context:** conversations → ivoTruth → choices → space → result

Ivo folds the diagram. He leaves the test list where Rowan can read it later and takes the apparatus away.
At the door he asks whether they want company. When Rowan says no, he says goodnight.

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

The workshop door is balanced across Bryn’s shoulder. Dust hangs motionless around its latch. Rowan remembers her carrying it toward the failing stair.
Lifting the latch breaks the ward. Bryn catches the door, curses its weight and asks Rowan to take one end.
She thinks the alarm has only just stopped. Rowan tells her the year. She looks toward the stair, then back at them.
“Father was meant to come on Friday,” she says.
Mara helps them lower the door. Bryn runs her hand over its familiar chisel mark. Later she will fit straps to it. For now she asks whether there are any letters.

### resident-discoveries.js:19

**Context:** first → nell → condition

Hidden inside a folded corridor

### resident-discoveries.js:20

**Context:** first → nell → method

Unfold the chalk route

### resident-discoveries.js:22

**Context:** first → nell → story

The chalk route behind the quarters curtain folds back on itself. Rowan recognises Nell’s mark for an emergency shelter and rubs out the final turn.
Nell steps through with a guide’s satchel. She asks how many people are still on the route. Rowan has to tell her the evacuation ended thirty years ago.
She opens the satchel on the floor. The shelter list, the bread wrapped for travellers, even the chalk dust are as she left them.
“Did they get there?” she asks. Nobody can answer yet.
She had folded the passage behind the escaping families to keep the patrol from following. The severance closed it around her. Now she has a list of addresses in a world that has had thirty years to change.

### resident-discoveries.js:29

**Context:** first → ivo → condition

Held inside an unfinished protective rune

### resident-discoveries.js:30

**Context:** first → ivo → method

Close the open line in Ada’s diagram

### resident-discoveries.js:32

**Context:** first → ivo → story

Ivo hangs above the notebook, one hand outstretched toward the finishing stroke of his rune. The spell keeps a fallen shelf from crushing him, but it has never released its caster.
Rowan follows Ada’s margin diagram and closes the line. Ivo lands badly, still trying to save the book. Mara helps him up.
“Is the joining over?” he asks. Then, seeing Rowan’s face: “What happened?”
His last memory is Ada sending him to fetch the test records. Thirty years have passed since then.
He sits with the notebook on his knees. After a while he asks where his teacher is. Rowan remembers the records in the service room. They can start there.

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

⟦c.name⟧ wears the old guild’s ⟦c.type === 'mage' ? 'spellkeeper' : c.type === 'warrior' ? 'watch' : 'pathfinder'⟧ insignia. ⟦trap[2]⟧ The explorer follows the surviving release diagram. When the ward opens, ⟦c.name⟧ asks whether the evacuation is over. Rowan explains how long the room has been cut off. They sit together before looking through the belongings for a home address. Someone outside may still be waiting for news.

**Source template:**

```text
⟦c.name⟧ wears the old guild’s ⟦c.type === 'mage' ? 'spellkeeper' : c.type === 'warrior' ? 'watch' : 'pathfinder'⟧ insignia. ⟦trap[2]⟧ The explorer follows the surviving release diagram. When the ward opens, ⟦c.name⟧ asks whether the evacuation is over. Rowan explains how long the room has been cut off. They sit together before looking through the belongings for a home address. Someone outside may still be waiting for news.
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

My first wage bought a coat. Halden said it was too big. I said there was room to grow into it. We both knew there wasn't much growing left to do. They folded the cuffs while I ate. I bought a second bowl the next week.

### homecoming.js:11

**Context:** rowanPages → quarters

Late again. There was still soup in the pot, and Halden had put a spoon across my chair so nobody would take it. We talked about the coast after supper. They have a list of places. I asked for one more month of wages. They said that was what I'd said last month.

### homecoming.js:13

**Context:** rowanPages → library

The kitchen owner asked me to leave Anwen's name on the door. I explained the numbering system. She waited until I had finished and asked again. I wrote Provisioning Room Four. I remember thinking I had handled it well.

### homecoming.js:15

**Context:** rowanPages → garden

A child's height marks were scratched into the greenhouse frame. The form said debt settlement. A letter beneath the trays asked when the room would be returned. I put it behind the invoice. The ledger looked better without loose ends.

### homecoming.js:17

**Context:** rowanPages → observatory

Vey told us about a child who died while the healer was stranded beyond the pass. She built the first doors because of that. I have seen the people they saved. Today a village refused a connection, and she called them selfish. I wanted to believe she was only tired.

### homecoming.js:19

**Context:** rowanPages → threshold

Halden packed the travel list in my coat. I had volunteered for another watch. We argued about it in the kitchen. They asked whether I could imagine a day when nobody needed me. I said we'd talk when I came back. They were still standing by the table when I left.

### homecoming.js:23

**Context:** dungeonPages → sluice

A drain worker

### homecoming.js:24

**Context:** dungeonPages → sluice

The visitors used the front hall. We brought the prisoners through the drains. My son asked why I never took him to see where I worked. I told him it was dangerous. That was true, but it wasn't my reason.

### homecoming.js:27

**Context:** dungeonPages → cells

A detained kitchen owner

### homecoming.js:28

**Context:** dungeonPages → cells

The agreement was for the winter. I would open our kitchen to travellers until the mountain road cleared. They kept it in spring. The clerk took Mother's name off the door. Anwen. If somebody finds this, that was her name.

### homecoming.js:31

**Context:** dungeonPages → ratway

A missing drain worker

### homecoming.js:32

**Context:** dungeonPages → ratway

The blue-handled awl is for my daughter. She made the handle and knows it is loose. Tell her I tried to fix it, but I liked it better the way she made it. My other tools can go to the crew.

### homecoming.js:35

**Context:** dungeonPages → crypt

The burial keeper

### homecoming.js:36

**Context:** dungeonPages → crypt

I was told to remove the names under dispute. Nobody told me what to say when their families came. I hid the register beneath the last shelf. The ink is good. It should last longer than the stones.

### homecoming.js:39

**Context:** dungeonPages → ossuary

Halden

### homecoming.js:40

**Context:** dungeonPages → ossuary

Instructions for the burial attendant: a funeral agreement is not permission to raise the body. Look for the person's own recorded wishes before preparing the rite. If there is no answer, do not let a grieving friend supply one. I know how hard that will be. — Halden

### homecoming.js:43

**Context:** dungeonPages → maze

Ysra

### homecoming.js:44

**Context:** dungeonPages → maze

The survey line crosses three kitchens. On the clean copy they look like empty squares. I know the family in the middle one. I have eaten there. I have not told them what the line means.

### homecoming.js:47

**Context:** dungeonPages → oubliette

A captive

### homecoming.js:48

**Context:** dungeonPages → oubliette

The bucket comes down in the morning. I say my name before I ask for water. Today the keeper said it wasn't necessary. Please tell my sister I didn't go away on purpose. She will think I did.

### homecoming.js:51

**Context:** dungeonPages → vault

Rowan

### homecoming.js:52

**Context:** dungeonPages → vault

The owner's address was tied to the chest. I stamped it as salvage and passed it to the treasury. I thought somebody there would send it back. I never checked. The address is still on it.

### homecoming.js:55

**Context:** dungeonPages → fungus

The prison alchemist

### homecoming.js:56

**Context:** dungeonPages → fungus

The filtration beds work. The water is clean enough to drink. I have written that in every report. No report asks why people are held down here. I keep answering the question I can answer.

### homecoming.js:59

**Context:** dungeonPages → rift

Halden

### homecoming.js:60

**Context:** dungeonPages → rift

Year seven. The road ended in water again. I came back soaked, and Mara had made bread. It was nearly impossible to cut. We ate it with soup. Rowan, I have been looking for you. I have also had days like this. I wish I could tell you about them over supper.

### homecoming.js:63

**Context:** dungeonPages → study

Ada’s apprentice

### homecoming.js:64

**Context:** dungeonPages → study

The voice repeated the test phrase after we disconnected the speaking tube. I performed the test again. Professor Merrow asked me to omit it from the public summary until we understood it. I kept this copy. It happened. Understanding it later won't change that.

### homecoming.js:67

**Context:** dungeonPages → potions

Halden

### homecoming.js:68

**Context:** dungeonPages → potions

Year fourteen. My hand shook during a dressing today. Mara finished it. I was unpleasant about her taking over and apologised afterward. I've shown her the treatment diagrams. She wants to understand them. I must remember that is not the same as promising to finish them.

### homecoming.js:71

**Context:** dungeonPages → mirror

Rowan

### homecoming.js:72

**Context:** dungeonPages → mirror

Halden laughed at something in the kitchen. After they went upstairs, the wall laughed in the same way. I answered before I realised. I didn't tell them. I am writing it here because it happened again.

### homecoming.js:75

**Context:** dungeonPages → summoning

Vey

### homecoming.js:76

**Context:** dungeonPages → summoning

I signed the suspension order after the second voice test. Then the room answered with the correct signal and I let Merrow restart it. I wanted the good result to settle everything. This is the first order. Keep it with the revised one. Nobody should have to take my word for what I knew. — Vey

### homecoming.js:79

**Context:** dungeonPages → menagerie

A keeper

### homecoming.js:80

**Context:** dungeonPages → menagerie

The feeding card says specimen eleven. The mooncat comes when I call it Pipkin, the name the fisher gave me. Her husband slept with it on his chair. She asked whether the animal would come back. I said I would find out. I haven't.

### homecoming.js:83

**Context:** dungeonPages → orrery

Rowan

### homecoming.js:84

**Context:** dungeonPages → orrery

Every point is a room. Someone washed those windows. Someone put a chair there. I used to enter the distances before the names. Several names are missing. I will have to ask.

### homecoming.js:87

**Context:** dungeonPages → storm

Oren

### homecoming.js:88

**Context:** dungeonPages → storm

Six people above the stair. If I let go tonight, they fall. If I get through this, I want to remember that tonight was different from every other day. I keep offering to hold things people could put down.

### homecoming.js:91

**Context:** dungeonPages → stars

Halden

### homecoming.js:92

**Context:** dungeonPages → stars

Year twenty-nine. Mara, the token and the papers are yours. Do what you choose with them. Rowan, there are places left on our list. You may choose somewhere I never knew. I wanted you to have a life. It did not have to be a life with me.

### homecoming.js:99

**Context:** journeys → bryn → home

the rebuilt waystation

### homecoming.js:101

**Context:** journeys → bryn → record

Father's name is in front of me now. I still turn when someone knocks. The apprentice wants to learn masonry once he's well enough. I could teach him. I think I'd like a workshop where the work ends before supper.

### homecoming.js:103

**Context:** journeys → bryn → farewell

Bryn leaves for the waystation with her shield, tools and plans for the workshop. Before going she checks the new beds one last time. Mara promises to write if a leg breaks. Bryn says somebody else can learn to fix it.

### homecoming.js:108

**Context:** journeys → nell → home

the shelter roads

### homecoming.js:110

**Context:** journeys → nell → record

I've written to the shelter keepers. They need guides, and I know the roads badly enough to keep checking them. Rowan can come as a traveller. I would like to see them arrive with nothing they have to deliver.

### homecoming.js:112

**Context:** journeys → nell → farewell

Nell takes the shelter road with two maps: one for the keepers and one for Rowan. She leaves the second on their table. At the gate she waves, then turns to watch where she is walking.

### homecoming.js:117

**Context:** journeys → ivo → home

an independent school beside Ada’s monastery

### homecoming.js:119

**Context:** journeys → ivo → record

The monastery has offered a room for a school. Ada thinks it's too small. I told her that gives us something to agree on later. I want students who will ask the questions I used to swallow. I also want a window that opens.

### homecoming.js:121

**Context:** journeys → ivo → farewell

Ivo packs the school books badly. Ada has sent a list of supplies longer than his original request. He leaves copies of his calculations at the guild and takes the unfinished lesson page with him.

### homecoming.js:126

**Context:** journeys → oren → home

his daughter’s riverside workshop

### homecoming.js:128

**Context:** journeys → oren → record

My daughter is older than I am. Mara's letter says she has a workshop by the river. She asked whether I'd like to see it. I spent an hour drafting a list of repairs I could do and then threw it away. I don't know how to go there with empty hands.

### homecoming.js:130

**Context:** journeys → oren → farewell

Oren allows the empty commemorative arch to be dismantled before leaving. Its sound stones will make garden steps. He sets out for his daughter’s workshop carrying a small bag and no timber order.

### homecoming.js:135

**Context:** journeys → maelin → home

the watchkeepers’ coastal memorial

### homecoming.js:137

**Context:** journeys → maelin → record

Some of the watch lived twenty years after the evacuation. There are children and grandchildren who want to meet me. I keep trying to work out whether they had good lives. The records cannot tell me all of that. Tonight I rang for supper. I managed to let go of the rope.

### homecoming.js:139

**Context:** journeys → maelin → farewell

Maelin leaves to meet the watchkeepers’ families. She checks that the dinner bell works by hand before going. That evening somebody else rings it.

### homecoming.js:144

**Context:** journeys → ysra → home

the community displaced by her survey

### homecoming.js:146

**Context:** journeys → ysra → record

The families have read my survey. Their children want me to see where the line went. I've agreed to go without a finished map. I'll need to listen first. I don't know whether they will want me to draw anything afterward.

### homecoming.js:148

**Context:** journeys → ysra → farewell

Ysra leaves with blank paper and the families’ invitation. The map she leaves at the guild still has an unfinished edge. She asks them not to fill it in for her.

### homecoming.js:155

**Context:** regionalLives

the fen relief camp

### homecoming.js:156

**Context:** regionalLives

Hesta put the water mark above the door. I measured it three more times because I didn't want it to mean what it meant. The families are moving until the pump is safe. I want to help with the dry camp. We can measure again tomorrow.

### homecoming.js:161

**Context:** regionalLives

his sister’s ferry landing

### homecoming.js:162

**Context:** regionalLives

My sister kept the boat tied up for years. Then she gave it to someone who needed it. I was angry when I read that. Her second letter says there's a room if I want one. I think I will go. I can ask about the boat when I get there.

### homecoming.js:167

**Context:** regionalLives

the culvert memorial

### homecoming.js:168

**Context:** regionalLives

The log gives the time they cut my air hose. The colleague I kept searching for was me. My partner needs the log, not another promise to dive. I want to tell them I didn't turn back because I stopped caring.

### homecoming.js:173

**Context:** regionalLives

the firewatch settlement

### homecoming.js:174

**Context:** regionalLives

The furnace is out. I woke expecting the watch horn and couldn't decide what to do when it didn't sound. My crew wants to learn another trade. I'd like to join them. I don't know if I'll be any good at starting again.

### homecoming.js:179

**Context:** regionalLives

the kiln workers’ burial ground

### homecoming.js:180

**Context:** regionalLives

The watch order lists me among the dead. The kiln keepers had it all along; I kept delivering an instruction they couldn't obey. They've asked for my name at the burial ground. I would like to go without the order in my hand.

### homecoming.js:185

**Context:** regionalLives

her family’s farm

### homecoming.js:186

**Context:** regionalLives

My brother planted the field without me. In my head it was still waiting for seed. He says there's work if I come, and a bed whether I work or not. I folded that letter so often it split along the crease.

### homecoming.js:191

**Context:** regionalLives

the coastal lens workshop

### homecoming.js:192

**Context:** regionalLives

My daughter showed me a lens she made. It's better than mine. I began telling her how to improve it before I'd even thanked her. She's offered me the bench by the window. I will try to sit there before reaching for her tools.

### homecoming.js:197

**Context:** regionalLives

the harbour where their partner lives

### homecoming.js:198

**Context:** regionalLives

The register says our rescue boat sank. I knew the kitchen in the false light. I didn't know it was the one my partner had moved out of. I want to hear what happened afterward from them, if they'll tell me.

### homecoming.js:203

**Context:** regionalLives

the harbour watch

### homecoming.js:204

**Context:** regionalLives

The lighthouse workers have asked me to join their watch. We argued about who gives the orders and how long a shift lasts. They argued back. I rather liked that. They've sent the rota for me to look at.

### homecoming.js:209

**Context:** regionalLives

the village seed house

### homecoming.js:210

**Context:** regionalLives

The old planting notes have Mother's handwriting beside mine. I followed them after the village grew around the garden, as though nothing else could change. The new seed house wants help. I will ask what they want to grow before I bring anything.

### homecoming.js:215

**Context:** regionalLives

the village carpenters’ yard

### homecoming.js:216

**Context:** regionalLives

My son has his own yard. He says I can work beside him. I keep thinking of the boy who held my nails, and he keeps describing someone I haven't met. I want to meet him before asking to change the workshop.

### homecoming.js:221

**Context:** regionalLives

the canopy hospice

### homecoming.js:222

**Context:** regionalLives

The medicine book records my last delivery and my death. The nurse who received it is still alive. She wrote that the children recovered. I have carried the basket long enough. I'd like to hear her say it once.

### homecoming.js:227

**Context:** regionalLives

the mountain weather station

### homecoming.js:228

**Context:** regionalLives

We lost people in the first avalanche. I kept restarting the ward when the safety readings failed. I wanted another morning to try. The cylinder records all of them. I will go back and help take today's measurements, even if they say the pass must stay closed.

### homecoming.js:233

**Context:** regionalLives

the mountain porters’ lodge

### homecoming.js:234

**Context:** regionalLives

The travellers are down. There will be others. There are other porters too. My family asked if I can come for a week without bringing a party. I said yes before I could turn it into another job.

### homecoming.js:239

**Context:** regionalLives

her grown apprentice’s survey hut

### homecoming.js:240

**Context:** regionalLives

My apprentice is the senior surveyor. She still has my broken measuring pole. She asked me to visit, and I nearly sent instructions instead. I have bought a new notebook. I want to find out what she knows now.

### homecoming.js:245

**Context:** regionalLives

the town’s public workshop

### homecoming.js:246

**Context:** regionalLives

The court clock is moving. I want it in the public workshop where someone can open the case if it goes wrong. I used to hate people touching it. I would like to teach an apprentice who isn't afraid to do that.

### homecoming.js:251

**Context:** regionalLives

the prisoners’ public hearing

### homecoming.js:252

**Context:** regionalLives

Some of the cells I opened were ones I'd guarded. The people inside remember me. They've asked me to testify. I am afraid of what they will ask, and more afraid of deciding that means I shouldn't go.

### homecoming.js:257

**Context:** regionalLives

their mother’s bakery

### homecoming.js:258

**Context:** regionalLives

Mother was among the detained bakers. I found every service passage except the road to her shop. I thought she'd ask why it took so long. Her letter asks whether I've eaten. I don't know why that made me cry.

### homecoming.js:263

**Context:** regionalLives

the quay deposit office

### homecoming.js:264

**Context:** regionalLives

The chests are back, but some owners died before we reached them. Their families need help with the accounts. Returning the treasure was the easy part. I'd like to stay for the claims nobody can settle with a key.

### homecoming.js:269

**Context:** regionalLives

his grandchildren’s quay house

### homecoming.js:270

**Context:** regionalLives

My children have children. They've invited me to dinner. I have written their names on a card because I'm frightened of mixing them up. I hope they'll laugh if I do. I don't know what else to bring.

### homecoming.js:275

**Context:** regionalLives

the divers’ shore vigil

### homecoming.js:276

**Context:** regionalLives

The crew recovered everyone but me. They searched the wrong pressure chamber for years. I want to bring them the ledger. They can know where I was. They don't have to keep going down.

### homecoming.js:281

**Context:** regionalLives

the roadkeepers’ signal school

### homecoming.js:282

**Context:** regionalLives

The beacon was built to call people home. Some couldn't come, and it kept calling. I have plans for lamps a person can put out. I want to teach the keepers how to tell when the last light has done its work.

### homecoming.js:287

**Context:** regionalLives

the surviving road camp

### homecoming.js:288

**Context:** regionalLives

My family moved the camp after the first attack. I kept defending the old fence. I know why I did it, but I can't explain it without sounding foolish. They've sent directions to the new place. I'll take them.

### homecoming.js:293

**Context:** regionalLives

the hill travellers’ memorial

### homecoming.js:294

**Context:** regionalLives

The register puts my name in the missing column. I counted everyone through except myself. My sister has kept a lamp in the window. I'd like her to know I saw it. Then she can sleep without checking the wick.

### homecoming.js:300

**Context:** Interface / runtime text

Missing homecoming region:

### homecoming.js:307

**Context:** farewell

spirit

### homecoming.js:308

**Context:** farewell

⟦recruit.name⟧ meets the people who have kept their memory. They can finally speak about the last journey and hear what happened afterward. When it is time to part, the guild records the farewell beside their name. Their place in its history remains.

**Source template:**

```text
⟦recruit.name⟧ meets the people who have kept their memory. They can finally speak about the last journey and hear what happened afterward. When it is time to part, the guild records the farewell beside their name. Their place in its history remains.
```

### homecoming.js:309

**Context:** farewell

⟦recruit.name⟧ leaves for ⟦home⟧. Mara keeps their address, and the room is prepared for the next visitor. Their letters and the work they did remain in the guild records.

**Source template:**

```text
⟦recruit.name⟧ leaves for ⟦home⟧. Mara keeps their address, and the room is prepared for the next visitor. Their letters and the work they did remain in the guild records.
```

### homecoming.js:320

**Context:** records → entrance → room

Entrance hall

### homecoming.js:321

**Context:** records → entrance → author

Rowan

### homecoming.js:323

**Context:** records → entrance → text

I came with a bag and no address for the register. Halden left the space blank. They showed me a room and asked if I'd eaten. I thought I would have to be worth keeping. That night somebody complained I'd taken their usual chair. I apologised. They pulled up another one.

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

Year one. Another attempt at the road failed. I took Mara home from the temporary infirmary today. She asked where her bed was before she asked my name. I can answer one of those questions easily. Tomorrow we will find her a bowl.

### homecoming.js:348

**Context:** records → tower → room

Bell tower

### homecoming.js:349

**Context:** records → tower → author

Maelin

### homecoming.js:351

**Context:** records → tower → text

Three strokes to clear the outer rooms and stairs. I rang three. The fourth came after my hand left the rope. I'm freezing the bell and its repeating circuit. If you find this, break the repeating line before you thaw it. Please check where my watch went.

### homecoming.js:355

**Context:** records → labyrinth → room

Labyrinth heart

### homecoming.js:356

**Context:** records → labyrinth → author

Ysra

### homecoming.js:358

**Context:** records → labyrinth → text

The infirmary door has moved to the rear stair. Keep the map live until the last patient is through. If the exit vanishes, stop the tracking rune. I have left the cancellation mark in the margin. There are still people on the route.

### homecoming.js:363

**Context:** records → author

Rowan

### homecoming.js:367

**Context:** records → text

I moved their cup this morning and put it back before lunch. They have gone where they wanted to go. I know that. The room can be empty without somebody needing a rescue party. I am getting used to how quiet it is.

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

Their body did not survive the disaster, but the house kept their spirit here. They now know where the people who remember them can be found. Meeting them will allow a farewell and release the spirit from the house.

### homecoming.js:428

**Context:** homecomingChoices → A road home → body

They have found a place they want to go and ask Rowan to help arrange the journey.

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

The ceiling rests on new timber now. The stone figure beneath it is still bent under a beam that no longer needs him.
His casting ring is jammed shut. When it is forced open, stone flakes from his shoulders. He drops to his knees and immediately reaches for the support.
“Did they get down?” he asks.
Rowan tells him the stair was cleared. They do not know what happened to every passenger afterward.
Oren listens while Mara explains the thirty years. His tool belt is intact. He touches the buckle, then asks if they can find his daughter. She was seven when he came to work that morning.

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

The thaw takes time. Ice drains from Maelin’s sleeves while she remains braced against the bell rope.
Her first movement is to catch the clapper. Nobody tells her to let go yet.
“It rang after my hand left the rope,” she says. “I could hear Vey in the wall. Vey was downstairs.”
She recognises Rowan and asks who relieved the watch. Rowan explains that the others left thirty years ago.
Maelin asks for a chair without releasing the clapper. Mara wraps it in a towel and holds it while she sits. They will look for the watchkeepers’ records. Tonight the bell can remain silent.

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

The unfinished map keeps drawing an ink figure in the middle of a corridor that no longer exists. When the tracking rune is cancelled, the figure stops moving. Ink runs across the floor, and Ysra is there, clutching her pen.
She asks someone to tell the people at the stair that the infirmary route is failing.
Rowan sits beside her and explains the year. Ysra looks at the pen. Its nib has worn down to a blunt edge.
“I was still drawing,” she says.
She asks for fresh paper. Her first sketch shows where the infirmary moved during the collapse. Then she draws a little kitchen beside it and asks whether anyone remembers who lived there.

### exploration.js:66

**Context:** sleepers → ysra → ability

Threadwalk · covers unstable crossings and reveals safe routes.

### exploration.js:74

**Context:** sleeperConversations → orenRemember → title

The beam above the stair

### exploration.js:75

**Context:** sleeperConversations → orenRemember → body

Oren keeps finding white dust on his hands. He rubs it off on his trousers, apologises, and does it again.
He remembers six people above him when the stair began to fail. He used the stone spell and got beneath the beam. The next collapse bent his casting ring shut.
“Three strokes first,” he says. “That meant clear the outer rooms and the stairs. Then it kept ringing. Continuous meant hold where you were.”
The people above him stopped moving. He shouted for them to run anyway.
He cannot say who rang the second alarm. From where he stood, he could not see the tower.
When Rowan asks about his daughter, he starts describing a seven-year-old and has to stop. He asks to check the tower supports instead. It is something he knows how to do.

### exploration.js:79

**Context:** sleeperConversations → orenRemember → choices → choice → label

“Check the tower supports. Tell Mara what timber you need.”

### exploration.js:80

**Context:** sleeperConversations → orenRemember → choices → choice → preview

Oren takes on the repair survey. Gain trust and a local repair contact.

### exploration.js:84

**Context:** sleeperConversations → orenRemember → choices → choice → result

Oren marks three unsafe supports. Mara orders timber; he asks for another pair of hands rather than putting himself under the beam.
If Bryn can help, he shows her how to hear a split joint with a mallet. He has not yet found a way to talk about his daughter.

### exploration.js:88

**Context:** sleeperConversations → orenRemember → choices → record → label

“Draw the stair as it was that night.”

### exploration.js:89

**Context:** sleeperConversations → orenRemember → choices → record → preview

Record where the collapse began. Gain trust and a structural clue.

### exploration.js:93

**Context:** sleeperConversations → orenRemember → choices → record → result

Oren draws the stair and marks where the first support broke. The damage began beneath the outer-door mechanism.
“That thing pulled before the floor fell,” he says. Rowan keeps his drawing to compare with the other accounts. It does not prove who gave the order.

### exploration.js:101

**Context:** sleeperConversations → maelinRemember → title

The bell rang after she let go

### exploration.js:102

**Context:** sleeperConversations → maelinRemember → body

Maelin flinches when a spoon drops. She is angry with herself for it.
“Three strokes,” she says. “Vey was in the doorway. Disconnect the outer rooms. Clear the stairs.”
She rang the signal. After her hand left the rope, the bell struck again. The voice in the wall told people to stay where they were, using Vey’s voice.
Maelin caught the rope. The sound continued. Her frost ward was the quickest way to silence the bell and the repeating mechanism together.
“I thought someone would cut the rune after the doors closed.”
Nobody did. She looks at her palm, where the rope burns are still new, and asks Rowan to help write down the names of her watch.

### exploration.js:106

**Context:** sleeperConversations → maelinRemember → choices → choice → label

“Help us make the alarm safe before we use it again.”

### exploration.js:107

**Context:** sleeperConversations → maelinRemember → choices → choice → preview

Maelin helps rebuild the alarm. Gain trust and a reliable warning system.

### exploration.js:111

**Context:** sleeperConversations → maelinRemember → choices → choice → result

Maelin removes the repeating mechanism. She rings three strokes by hand, stops and waits.
No fourth stroke follows. She waits a little longer before unwrapping the clapper.

### exploration.js:115

**Context:** sleeperConversations → maelinRemember → choices → record → label

“Write down Vey’s order while you remember the wording.”

### exploration.js:116

**Context:** sleeperConversations → maelinRemember → choices → record → preview

Preserve an eyewitness account. Gain trust and evidence about the evacuation.

### exploration.js:120

**Context:** sleeperConversations → maelinRemember → choices → record → result

Maelin records Vey’s three-stroke order and the continuous alarm that followed. Rowan reads the two entries back.
“Keep them separate,” she says. “People died between them.” She signs beneath both.

### exploration.js:128

**Context:** sleeperConversations → ysraRemember → title

The route to the infirmary

### exploration.js:129

**Context:** sleeperConversations → ysraRemember → body

Ysra draws the changing house on the kitchen floor. She has to move a chair to make room for the infirmary stair.
“It was upstairs first. Then the connection shifted here. I kept the map live so they could find it.”
The exit vanished while her tracking spell was running. With no connected room left to place her in, the spell held her inside the map.
She remembers Halden, an assistant and a patient being carried through the last doorway. She did not see the patient’s face.
Rowan asks if the passage went anywhere else. Ysra draws three houses along its old route, then sits back.
“I left those off the official survey. There were people in them.”

### exploration.js:133

**Context:** sleeperConversations → ysraRemember → choices → choice → label

“Mark the false turns before another search party goes below.”

### exploration.js:134

**Context:** sleeperConversations → ysraRemember → choices → choice → preview

Ysra makes the maze safer to navigate. Gain trust and a usable return route.

### exploration.js:138

**Context:** sleeperConversations → ysraRemember → choices → choice → result

Ysra marks the false turns and draws arrows back to the stair. She asks Mara to record who enters the lower passages and who returns.
Her chalk is worn to a stub when she finishes. She puts it away instead of beginning another map.

### exploration.js:142

**Context:** sleeperConversations → ysraRemember → choices → record → label

“Keep that route. It may help us find the infirmary.”

### exploration.js:143

**Context:** sleeperConversations → ysraRemember → choices → record → preview

Preserve the last known route. Gain trust and an infirmary clue.

### exploration.js:147

**Context:** sleeperConversations → ysraRemember → choices → record → result

Ysra copies the infirmary route and marks where its doorway disappeared. The patient’s identity remains blank.
“I didn't see them,” she tells Rowan. “I'm sorry. I can't make the drawing give us that.”

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

The guild pump once kept the low houses dry. Its reversed drive now fills their drains. Hesta wants families moved to high ground until repairs hold; several refuse to leave homes their parents built. The relief work must make leaving possible before it can promise a safe return.

### expansion.js:11

**Context:** regions → fen → ending

The repaired pump holds below the agreed water mark. Some families return; others keep their homes on higher ground. Hesta saves the old flood marks for future inspections. The school boat becomes a ferry again.

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

Hold the engine room while the local crew follows Tamsin’s recovered drive procedure.

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

The buried furnace still obeys the last evacuation order: keep the signal fires burning until the all-clear. That signal never came. The fires now reach beneath farms once supplied by its workshops. Brindle needs it stopped, but workers fear losing the trade their families depended on.

### expansion.js:51

**Context:** regions → ash → ending

The furnace is cold and the fuel branches are sealed. Brindle arranges training in the recovered workshops; the farms can plant again. The firewatch closes its old rota. For the first week, several workers still wake at the watch hour.

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

The lighthouse copies distress signals from its rescue register. Crews chase boats that have already reached harbour or sank years ago. Toren needs reliable bearings, but some families keep visiting the false lights because they show a ship they remember.

### expansion.js:88

**Context:** regions → glass → ending

The lighthouse projects one measured beam. The true rescue register remains beside the door, including the ships that never returned. Families can visit it without sending another crew onto the rocks.

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

Recover Corin’s field records

### expansion.js:93

**Context:** regions → glass → jobs

Find Corin’s lens notes in the mirror caves. They identify the fault and the guild room where he was trapped.

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

Defend the lens crew while they use Corin’s measurements to align the beam.

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

The guild planted shelter trees to protect the village. Their growth spell was never adjusted as homes and paths changed. Now the roots block doors and tighten when cut. Moss must free the residents without destroying the trees that still hold their roofs. The original plan cannot simply be planted again.

### expansion.js:119

**Context:** regions → root → ending

The doors and schoolhouse are clear. Residents keep useful shelter trees and remove the growth that endangered them. The planting agreement includes a pause procedure and room for future changes. A new garden goes where the old plan marked an empty square.

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

Recover Asha’s planting records

### expansion.js:127

**Context:** regions → root → jobs

Follow Asha’s marks to the blocked watch hut. Recover the growth-pause notes and the record of her missing guild room.

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

The avalanche ward repeats its last snowfall because the station’s stopping record is missing. Travellers cannot finish the crossing. Neris’s old notes show repeated resets after a fatal avalanche: she kept seeking safer readings instead of accepting the route was closed. The mountain watch needs a way to measure the present storm.

### expansion.js:156

**Context:** regions → frost → ending

The ward follows current measurements. The watchkeepers inspect the poles before opening the pass; they can close it again when conditions change. The lost travellers remain in the station register. Today’s arrivals receive a new page.

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

Recover Neris’s weather records

### expansion.js:167

**Context:** regions → frost → jobs

Cross the shelf before the snowfall resets. Recover Neris’s field records; her suspended guild room must be reached separately.

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

Fit the cylinder while the mountain crew operates the override using Neris’s recovered procedure.

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

The courthouse clock stopped during the guild emergency. Its guards still arrest residents under the old charter. The town has grown around that suspended hour: some officials rely on its authority, while families are still trying to get people out of its cells. Advancing the clock will end the order, but the arrests also need to be heard.

### expansion.js:193

**Context:** regions → clock → ending

The emergency charter expires and the cells are opened. The town council takes responsibility for current laws. At the public hearing, former prisoners describe what the saved arrest plates cannot record. Ending the order has begun the work of answering for it.

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

The treasury’s failing intake sends seawater through the town wells. Below it are deposits the old guild never returned. Liora’s register records the owners, but some have died and others left their claims to families who no longer live on the quay. The water must be made safe before the wealth can travel.

### expansion.js:224

**Context:** regions → deep → ending

The wells are safe and the vault is sealed. Recovered deposits are returned against the surviving records; unresolved claims remain open for the families still being traced. The quay office keeps a desk for that work after the diving crews leave.

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

Hold the valve chamber while the town divers complete the test using Liora’s recovered measurements.

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

The fallen guild beacon keeps calling every connected road. Its light draws predators toward the camps. Some keepers still depend on it to guide missing travellers home. Sable must replace the useful signals before the transmitter can be shut down, and the last travelling names must be checked.

### expansion.js:255

**Context:** regions → star → ending

The beacon is silent. Local keepers control the remaining lamps, and the missing travellers have been checked against the road registers. Some lights remain for ordinary arrivals. Others are put out. The dawn terrace opens for a meeting of all eight regions.

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

Search Sable’s wrecked camp

### expansion.js:260

**Context:** regions → star → jobs

Recover Sable’s transmitter notes and the marks identifying her suspended guild room.

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

Defend the signal crew while they follow Sable’s procedure to remove the prism.

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

The party marks the water above three doorframes. Hesta compares the dates: it rose while the pump was running. One family is already packing; another insists the next tide will lower it. The outlet is feeding the drains, so waiting will not help.

### expansion.js:282

**Context:** reports → fen

Every child reaches the relief camp. A teacher checks the names twice. Rufus’s old ferry measurements make the causeway crossing possible; Hesta keeps a copy for the next boat. One pupil asks whether the classroom is coming too.

### expansion.js:283

**Context:** reports → fen

The recovered folio shows how the pump drive reverses. Its manual stop is accessible, but stopping it alone will leave the lower houses flooded. The party identifies the seals and impeller needed to make it drain safely.

### expansion.js:284

**Context:** reports → fen

The diver is brought out with a broken pressure gauge. Her air hose led the rescuers to the collapsed culvert. An old dive log among the equipment names Lark as an earlier casualty there. The current rescue and that older loss must not be entered as the same event.

### expansion.js:285

**Context:** reports → fen

Workers secure the upper floodgate before the party clears the eels. Water no longer pours through the disturbed intake. Hesta marks the gate position in chalk so a later crew can check it without guessing.

### expansion.js:286

**Context:** reports → fen

The workshop pipe is disconnected before its key returns to the guild. Hesta sends copies of the maintenance notes. Tamsin’s marks are still on them; the measurements can help identify the room where she was trapped.

### expansion.js:287

**Context:** reports → fen

The wolves are driven away and the food route is guarded. At the dry camp, families choose spaces for their beds. A man brings the marker from his parents’ grave and asks for it to be kept upright until they can go home.

### expansion.js:288

**Context:** reports → fen

The copper impeller is recovered intact. Its makers’ names are stamped on the underside. Hesta recognises one as her grandfather and asks for a rubbing before the part disappears inside the pump again.

### expansion.js:289

**Context:** reports → fen

The village crew holds the temporary dam while the new seals are fitted. The first test leaks; the second holds. Hesta records both. Families will not be sent back on the strength of one good reading.

### expansion.js:290

**Context:** reports → fen

The repeated flood alarm comes from a mimic wrapped around the rope. Once it is removed, a keeper rings the real bell and explains the signal at the relief camp. This time everyone knows which direction it means.

### expansion.js:291

**Context:** reports → fen

Tamsin’s recovered drive procedure lets the party reverse the pump under guard. Hesta’s workers take over the controls and watch the waterline. The pump begins draining the village instead of filling it.

### expansion.js:292

**Context:** reports → fen

The outflow remains below the agreed mark. Some families return with the first escort; others ask to stay on high ground. Hesta records where each has gone. The school boat makes its first ordinary crossing since the flood.

### expansion.js:295

**Context:** reports → ash

The party traces the scorched fields to the furnace’s fuel trench. Brindle names the workshops it once supplied. Closing those branches will protect the farms and end the last work still tied to the furnace.

### expansion.js:296

**Context:** reports → ash

The grain carts reach the stone road before the ground fire. A driver refuses to leave an empty cart behind; it belonged to her father. The party helps move it too. Brindle finds room for it beside the shelter.

### expansion.js:297

**Context:** reports → ash

The stranded firewatch crew escapes the molten culvert with its readings. Their captain is still listed as Kest in the old rota, although Kest’s guild room has remained sealed. They have been following his procedures without being able to ask him about them.

### expansion.js:298

**Context:** reports → ash

The party drives the salamanders out of the kiln and recovers the salts. Workers recognise their old supply labels. Enough remains for the cooling sequence, provided the fuel gates are shut first.

### expansion.js:299

**Context:** reports → ash

The western valve closes. The orchard branch begins cooling. Its keeper brings a bucket of water to test the soil, then sits down beside it. Brindle leaves someone to watch the line rather than declare the work finished.

### expansion.js:300

**Context:** reports → ash

The forge is allowed to cool before its doorway and key return. The tool rack has spaces for workers who never came back. Brindle sends their names with the equipment and asks that apprentices be allowed to use it.

### expansion.js:301

**Context:** reports → ash

The animated armour is disabled. The controller still bears the evacuation seal. It has been protecting an instruction nobody could cancel, not deciding for itself that the farms should burn.

### expansion.js:302

**Context:** reports → ash

The watch order requires the furnace to burn until an all-clear signal arrives. The severance cut that signal road. Ves’s name appears among the dead in the accompanying casualty list; the message they still carry was already received, but could never be obeyed.

### expansion.js:303

**Context:** reports → ash

The reservoir contains enough water for the cooling sequence. The party opens the supply route. Brindle asks workers to gather the tools they will need afterward; there will be no furnace shift tomorrow if the shutdown succeeds.

### expansion.js:304

**Context:** reports → ash

The workers fit the cooling pipe behind the party’s guard line. Steam makes it hard to hear the commands. They repeat each instruction before moving, using the names of the workers rather than the old watch numbers.

### expansion.js:305

**Context:** reports → ash

The cinder drake is cleared and the controller disconnected. The furnace cools. Workers wait for the all-clear horn out of habit before remembering there will not be one. Brindle sends word to the farms by courier.

### expansion.js:306

**Context:** reports → ash

Farmers inspect and seal every fuel inlet. The firewatch closes its emergency rota. The recovered forge can teach another trade, but some workers need time before choosing one. Brindle asks the guild to keep the offer open.

### expansion.js:309

**Context:** reports → glass

Four ships listed as missing are already in harbour. Their crews identify the distress calls as recordings. Toren begins a separate list for vessels that never returned; those names cannot be corrected into happy endings.

### expansion.js:310

**Context:** reports → glass

A fishing boat reaches harbour by measured bearings. Its skipper had seen a familiar mast in the false beam and nearly turned toward it. The temporary route is marked for the next crew before the party leaves.

### expansion.js:311

**Context:** reports → glass

The party finds Corin’s old field records in the mirror caves and recovers the lens fragment stored with them. Corin himself remains held in the guild room. The notes identify how to recover that room and compare the present beam with its original design.

### expansion.js:312

**Context:** reports → glass

Covering the panels dissolves the reflected patrol. One copy keeps giving its last order until the cloth reaches its face. The party marks the actual stair so the night watch will not follow the reflection again.

### expansion.js:313

**Context:** reports → glass

The ledger lists six lenses, but the lighthouse produces seven beams. Corin’s notes put the extra source beneath the foundation. The party can now search a specific chamber instead of chasing each false light.

### expansion.js:314

**Context:** reports → glass

The studio’s owner signs its release after checking which tools remain. Toren records where it is going and how to request access. The doorway is detached only when the room is empty.

### expansion.js:315

**Context:** reports → glass

Fixed lamps mark the safe channel independently of the lighthouse. Rescue crews can use them while the seventh lens is investigated. A family watches the old beam from the quay; the party explains why no boat will follow it tonight.

### expansion.js:316

**Context:** reports → glass

The seventh lens reflects the rescue register, replaying each ship’s recorded signal. Fenn’s boat appears among the lost vessels. The familiar kitchen in its reflected light belongs to the past, not to someone waiting inside the lighthouse.

### expansion.js:317

**Context:** reports → glass

The night watch follows the marked route back to the true stair. One keeper wants to look behind a door repeating her brother’s voice. Another takes her hand while the party gets them clear. Nobody asks her to be grateful yet.

### expansion.js:318

**Context:** reports → glass

The duplicate lens is shattered behind a protective screen. The six real lenses remain intact. At the quay, the familiar false ships vanish. Toren keeps the lost-vessel list where families can still read it.

### expansion.js:319

**Context:** reports → glass

The surviving beam is aligned to the harbour channel using Corin’s measurements. Each bearing is checked against the fixed lamps. The light guides a ship somewhere it can actually reach.

### expansion.js:320

**Context:** reports → glass

The convoy reaches harbour. The party verifies the lamps before removing its temporary markers. Toren opens the true register for corrections and for accounts of the ships no one can bring back.

### expansion.js:323

**Context:** reports → root

Twelve families answer through the roots, including the schoolhouse. Moss writes down who needs medicine first. The shelter trees are supporting several roofs; cutting a quick opening would bring those rooms down.

### expansion.js:324

**Context:** reports → root

Medicine reaches the sick through the canopy. Sorrel’s old delivery book names the route and its recipients. It also records her death on the final journey. The party preserves the book to show her when the house releases her spirit.

### expansion.js:325

**Context:** reports → root

Asha’s records and dormant-growth seeds are recovered from the blocked hut. The room that holds her can now be identified. Moss recognises her planting plan but points out houses built after it was drawn.

### expansion.js:326

**Context:** reports → root

The pruning book requires a growth pause before cutting. It also shows the old village, with empty plots where families now live. The procedure is useful; the layout must be changed.

### expansion.js:327

**Context:** reports → root

The thorn hounds are cleared from the food route. Residents lower baskets from the canopy while the party guards the carriers. Someone sends down enough soup for the guards as well.

### expansion.js:328

**Context:** reports → root

The nursery seedlings and key reach the guild intact, with the keeper’s agreement. Moss sends a list of plants needed locally. The rare specimens can wait; families need food and medicine first.

### expansion.js:329

**Context:** reports → root

The spores pause the growth in a test branch. It loosens without dropping the roof above it. The crew can begin opening occupied buildings one at a time instead of cutting through blindly.

### expansion.js:330

**Context:** reports → root

The well rope is freed. Buckets reach the relief station before the party rests. Moss asks for the well route to remain on the map when the emergency is over; it was omitted from the original planting plan.

### expansion.js:331

**Context:** reports → root

The crew pauses the schoolhouse roots and unwinds them by hand. Every pupil comes out. The teacher carries a box of drawings; several show the windows before the branches covered them.

### expansion.js:332

**Context:** reports → root

The parasite is removed from the main knot. Without it feeding on the spell, the pause lasts long enough for measured pruning. Moss marks the houses that need support before their roots can be moved.

### expansion.js:333

**Context:** reports → root

The village gates open without cutting the load-bearing branches. The crew leaves useful trees in place and clears the growth that blocks doors. Residents can reach one another without crossing the roofs.

### expansion.js:334

**Context:** reports → root

The new planting agreement includes the pause procedure, current homes and places where residents want nothing planted. The schoolchildren choose a small garden. Moss makes sure it is drawn on this version of the map.

### expansion.js:337

**Context:** reports → frost

The same footprints appear twice above the lower station. Each snowfall restores the old surface. The weather ward is repeating a saved measurement rather than responding to the storm now over the pass.

### expansion.js:338

**Context:** reports → frost

Food and fuel reach the watch huts. One keeper has scratched the days on a beam because the road keeps looking the same. The party adds the present date before taking the next supplies onward.

### expansion.js:339

**Context:** reports → frost

The party recovers Neris’s field records from the ice shelf using safety ropes. Neris remains held in her guild room. Her last entries describe repeated resets after an avalanche and identify the station’s missing measurement cylinder.

### expansion.js:340

**Context:** reports → frost

The cylinder records the last safe snowfall and the readings that followed. Several failed checks were reset. The old lost-traveller list stays with the record; ending the repeated snow will not change who died in the first avalanche.

### expansion.js:341

**Context:** reports → frost

The station stair is cleared of frost spiders. Workers carry in current measuring equipment. The party marks the safe exit before beginning work on the ward.

### expansion.js:342

**Context:** reports → frost

All guests leave before the guesthouse is recovered. A traveller retrieves the boots drying beneath a bed at the last moment. The guild receives the key and the register of everyone who sheltered there.

### expansion.js:343

**Context:** reports → frost

The broken poles are replaced along the ridge. Eda’s apprentice has added better intervals to the old survey. The party keeps those changes rather than restoring the original marks simply because they are older.

### expansion.js:344

**Context:** reports → frost

The buried counterweight is fitted to the limiting arm. The ward can now stop when the recorded limit is reached. Workers test the stop before connecting the measurement cylinder.

### expansion.js:345

**Context:** reports → frost

The rime wyvern is driven off the upper pass. The party secures the approach to the storm engine while the mountain crew checks the new readings. Clear weather alone does not prove the crossing is safe.

### expansion.js:346

**Context:** reports → frost

The recovered cylinder and Neris’s procedure release the manual override. The snowfall stops repeating. The watch records the first new measurement without resetting it, even though it requires keeping the pass closed a little longer.

### expansion.js:347

**Context:** reports → frost

The mountain crew tests a thaw route beneath the repaired poles. They open one section and leave another shut. Travellers receive the delay plainly, with a place to wait and enough food.

### expansion.js:348

**Context:** reports → frost

Travellers descend after the final inspection. The watchkeepers begin a new register page. They preserve the earlier names and measurements, including the people whose journeys ended before this morning.

### expansion.js:351

**Context:** reports → clock

The arrest notices cite the guild emergency thirty years ago. Current residents are being judged by an order older than many of them. The council asks for the original charter before challenging the guards.

### expansion.js:352

**Context:** reports → clock

The detained bakers reach the council hall with their warrants. One still carries flour on his sleeve. They ask who will return the goods spoiled while their shops were shut. The council records the question.

### expansion.js:353

**Context:** reports → clock

Perrin’s clock key is recovered from the counting house. The court mechanism can now be reached, but the guards will keep enforcing the charter until its expiry condition is changed.

### expansion.js:354

**Context:** reports → clock

The patrol is disabled without erasing its plates. Its records identify arrests, dates and the officers who confirmed them. Joss’s old watch insignia appears in several entries. These must be retained for the hearing.

### expansion.js:355

**Context:** reports → clock

The original charter expires when the court clock passes the emergency hour. The severance stopped that clock. Some officials have known this and continued accepting the guards’ arrests. The council can end the order and investigate who relied on it.

### expansion.js:356

**Context:** reports → clock

The apprentices evacuate before the clock workshop is detached. Pip’s service map shows the safe route. On its reverse is an old detention entry for their mother’s bakery; the party keeps it with the personal records.

### expansion.js:357

**Context:** reports → clock

The prisoner ledger is checked against every occupied cell. Those listed are released, and names missing from the ledger are added for investigation. Families meet outside the court; not all have been told where their relatives were held.

### expansion.js:358

**Context:** reports → clock

The council bell works again under local control. The guards cannot ring it automatically. Residents are told which signal means an assembly, and where to bring evidence for the hearing.

### expansion.js:359

**Context:** reports → clock

The adjudicator is disabled. Its judgement plates are preserved, including the orders that continued after objections were filed. Stopping the machine does not remove those decisions from the record.

### expansion.js:360

**Context:** reports → clock

Perrin’s recovered settings let the party advance the court clock. The emergency charter expires. The guards lower their weapons. People wait a moment before believing they can cross the square.

### expansion.js:361

**Context:** reports → clock

The council enters current laws into the guard register and appoints people to review arrests. The new entries include dates for review. Residents can inspect the register without asking the guild.

### expansion.js:362

**Context:** reports → clock

At the first public hearing, the saved plates are read alongside former prisoners’ testimony. Some accounts contradict the official record. The council keeps both and calls for further witnesses. Joss will have questions to answer when he comes home.

### expansion.js:365

**Context:** reports → deep

The well samples contain salt from the treasury intake. A quay resident brings the cup her child refused to drink from. The party maps the contaminated conduit before deciding where to patch it.

### expansion.js:366

**Context:** reports → deep

The lower-quay families reach the upper shelters before the tide. Several bring deposit receipts as well as bedding. The treasury may hold the money their parents spent years trying to recover.

### expansion.js:367

**Context:** reports → deep

The divers are brought clear of the cracked roof. Their recovered records identify Liora’s pressure-room ward inside the house. One asks the party to tell her that the register was saved before the intake failed.

### expansion.js:368

**Context:** reports → deep

The deposit register names the owners of the chests. Some entries have return requests unanswered for decades. Liora’s notes separate guild salvage fees from the deposits; there is no authority to claim the whole treasury.

### expansion.js:369

**Context:** reports → deep

The coral sentinels are cleared from the pressure chamber. The party leaves the valve setting untouched until the divers can brace the roof. A clear passage is not yet a safe one.

### expansion.js:370

**Context:** reports → deep

The diving room reaches a dry guild landing with its equipment intact. The pressure records include Sal’s final dive. The crew recovered the other divers but never found Sal’s chamber; the record will let them stop searching in the wrong place.

### expansion.js:371

**Context:** reports → deep

The temporary sleeve stops seawater entering the wells. The town can use them while the intake is repaired. Each well is tested separately; the party does not assume one clean sample clears them all.

### expansion.js:372

**Context:** reports → deep

The pressure stones are recovered and placed beside the main valve. Their weight will keep it shut without a diver holding the mechanism. Maro’s old bracing plan shows where the roof needs support during the transfer.

### expansion.js:373

**Context:** reports → deep

The guardian is cleared while divers brace the roof. The party reaches the deposit chamber. Several chests still bear letters requesting their return, tied directly to the locks.

### expansion.js:374

**Context:** reports → deep

The intake stays shut through the pressure test. Liora’s records and the town crew’s readings agree. The roof supports can remain in place while the chests are brought out.

### expansion.js:375

**Context:** reports → deep

The chests return against the deposit register. Where an owner has died, the claim is kept open for their family rather than paid to the first person who asks. The quay office keeps copies for the accounts still unresolved.

### expansion.js:376

**Context:** reports → deep

Every well passes its fresh-water check. The flooded vault is sealed. The diving work ends, but the deposit office remains open: returning money cannot settle all the years people spent without it.

### expansion.js:379

**Context:** reports → star

Eight roads answer the beacon. Three still carry isolated watchkeepers. Sable’s old signal table distinguishes travelling parties from repeated calls; the party begins checking actual names before any road is closed.

### expansion.js:380

**Context:** reports → star

The isolated keepers reach camp before the next signal. One brings a lamp that has burned for a missing sister. The party records her name rather than promising that shutting down the beacon will bring her back.

### expansion.js:381

**Context:** reports → star

Sable’s field notes are recovered from the wrecked camp. She remains trapped in the guild signal room. The notes identify the damaged prism and the manual lamps intended to replace the automatic call.

### expansion.js:382

**Context:** reports → star

The prism is recovered from the cooling chamber. It repeats the last return signal continuously. The party keeps the receiver powered until the occupied roads have been checked.

### expansion.js:383

**Context:** reports → star

The moth swarm is cleared. Covered lamps stop drawing more creatures to the camp. Keepers mark the paths by hand so travellers can still find the shelters.

### expansion.js:384

**Context:** reports → star

The laboratory reaches the guild with its samples covered. The receiver records Tavi’s last count, including everyone except Tavi. The sister who kept the final lamp needs that record when their spirit is ready to leave.

### expansion.js:385

**Context:** reports → star

The last travellers are counted off the eastern road before its connection closes. A keeper reads each name aloud. The party checks the list against arrivals rather than trusting the beacon’s repeated reply.

### expansion.js:386

**Context:** reports → star

The hand-operated lamps are recovered. Each needs a local keeper, not a continuous signal from the fallen beacon. The party demonstrates how to cover and extinguish them safely.

### expansion.js:387

**Context:** reports → star

The wyrm is cleared from the transmitter roof. The keepers move into position with the manual lamps. There is now another way to guide travellers before the old beacon goes dark.

### expansion.js:388

**Context:** reports → star

Using Sable’s procedure, the crew removes the power prism while the party holds the roof. The beacon falls silent. Nobody speaks for a while. Then a keeper lights an ordinary lamp beside the road.

### expansion.js:389

**Context:** reports → star

Every surviving road has a named keeper and a hand-operated lamp. The old missing list remains available for inquiries. Some families keep a light; others decide to put theirs out. Neither decision is made for them.

### expansion.js:390

**Context:** reports → star

Representatives meet on the dawn terrace. The reports are brought, but so are food, children and complaints about the journeys. Rowan has helped make this meeting possible. Other people will decide what they do next.

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

The party recovered ⟦r.keeper⟧’s field records. They explain the local failure and identify the guild room where its former keeper was trapped. The current settlement keepers can use the procedures now; recovering the resident is a separate task.

**Source template:**

```text
The party recovered ⟦r.keeper⟧’s field records. They explain the local failure and identify the guild room where its former keeper was trapped. The current settlement keepers can use the procedures now; recovering the resident is a separate task.
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

Find the field records left by the old guild keeper. Their procedures can help the settlement now, and their room markings will help locate the resident still held inside the house.

### expansion.js:434

**Context:** expansionMissions → arrival

The local keepers report:

### expansion.js:437

**Context:** expansionMissions → arrival

The report records what the party found and identifies the next task. The local keepers check it before work continues.

### expansion.js:441

**Context:** expansionMissions → choices → public → label

File the report with the local keepers

### expansion.js:442

**Context:** expansionMissions → choices → public → preview

Share the evidence and give the settlement a copy. Gain community trust.

### expansion.js:447

**Context:** expansionMissions → choices → public → result

The party leaves a signed copy with the local keepers. They add corrections and the names of the people who will take over the next stage. The guild retains the same account.

### expansion.js:451

**Context:** expansionMissions → choices → study → label

Record the mechanism and its failure

### expansion.js:452

**Context:** expansionMissions → choices → study → preview

Preserve the measurements for the guild’s repair crews. Gain knowledge.

### expansion.js:458

**Context:** expansionMissions → choices → study → result

The guild preserves the measurements, failures and repair sequence. Local keepers receive a copy they can use without waiting for another guild party.

### expansion.js:486

**Context:** people

Tamsin

### expansion.js:489

**Context:** people

Tamsin measured the fen pump until numbers became easier to face than flooded homes. Her records can still help the families outside; she must learn how much has changed while her ward held her.

### expansion.js:492

**Context:** people

Rufus

### expansion.js:492

**Context:** people

Rufus ferried the school children to high ground during the disaster. The house kept him afterward. His sister has grown older, and the boat he expects to find may no longer be his.

### expansion.js:495

**Context:** people

Lark

### expansion.js:498

**Context:** people

Lark remembers searching the culvert for a missing colleague. The old log records her own death there. Her spirit needs the answer her rescue crew could never bring her.

### expansion.js:503

**Context:** people

Kest

### expansion.js:506

**Context:** people

Kest led the old firewatch. His procedures kept the crew working after he vanished, long past the end of the emergency. He must decide who he is when the watch finally stops.

### expansion.js:509

**Context:** people

Ves

### expansion.js:509

**Context:** people

Ves carries the furnace watch order and waits for someone to acknowledge it. The kiln casualty list contains their name. Their spirit has another message to deliver before it can rest.

### expansion.js:512

**Context:** people

Dara

### expansion.js:515

**Context:** people

Dara remembers the farm before the disaster. Her brother has had thirty years to plant without her. She wants to return, but is afraid of finding a place that no longer needs her.

### expansion.js:520

**Context:** people

Corin

### expansion.js:523

**Context:** people

Corin made the original lighthouse lenses. His daughter has become a lens maker herself. He has to meet the craftswoman she is, rather than recover the apprentice he remembers.

### expansion.js:528

**Context:** people

Fenn

### expansion.js:531

**Context:** people

Fenn followed a distress signal on the last rescue voyage. The register records their boat’s loss. They want to speak to their partner rather than follow another reflection of their old kitchen.

### expansion.js:534

**Context:** people

Mira

### expansion.js:534

**Context:** people

Mira guarded the old lighthouse workers. The present watch answers to a different community. She is interested in joining it, if the workers have a say in her duties.

### expansion.js:537

**Context:** people

Asha

### expansion.js:540

**Context:** people

Asha preserved her mother’s planting plan. The village grew around it while its magic continued unchanged. She must learn what the people living there now want to grow.

### expansion.js:545

**Context:** people

Bram

### expansion.js:548

**Context:** people

Bram helped build the village shelters. His son has become a carpenter while he was held in the house. Working beside him will mean letting someone else run the yard.

### expansion.js:553

**Context:** people

Sorrel

### expansion.js:556

**Context:** people

Sorrel carried medicine through the canopy on her final journey. Her spirit still wants to know whether it arrived in time. The nurse who received it can give her an answer.

### expansion.js:561

**Context:** people

Neris

### expansion.js:564

**Context:** people

Neris reset the avalanche ward after the first loss, seeking a safer reading. The snow kept repeating while she was trapped. She wants to help the watch face the measurements it has now.

### expansion.js:569

**Context:** people

Tor

### expansion.js:572

**Context:** people

Tor brought travellers down the mountain and kept finding reasons to stay for the next party. His family would like him home for a week. Other porters can take the road.

### expansion.js:577

**Context:** people

Eda

### expansion.js:580

**Context:** people

Eda surveyed the avalanche markers. Her apprentice now leads the work and has kept the broken pole from her last survey. Eda wants to meet the person who grew up without her.

### expansion.js:585

**Context:** people

Perrin

### expansion.js:588

**Context:** people

Perrin built a clock for an emergency that never ended in its mechanisms. He wants to restore ordinary hours and let other people inspect the case.

### expansion.js:593

**Context:** people

Joss

### expansion.js:596

**Context:** people

Joss guarded the court cells before the severance. The people released from them remember him. He can help now without expecting that help to erase their questions.

### expansion.js:601

**Context:** people

Pip

### expansion.js:604

**Context:** people

Pip mapped courthouse service passages while their mother was detained. The way home was the route they kept avoiding. Her surviving letter asks whether they have eaten.

### expansion.js:609

**Context:** people

Liora

### expansion.js:612

**Context:** people

Liora kept the treasury deposits separate from guild claims. She wants them returned, including the difficult accounts where an owner has died or disappeared.

### expansion.js:617

**Context:** people

Maro

### expansion.js:620

**Context:** people

Maro braced the vault roof while the other workers escaped. His family has grown by another generation. They have invited him to dinner, not another shift.

### expansion.js:623

**Context:** people

Sal

### expansion.js:623

**Context:** people

Sal’s spirit still follows the last dive route. The pressure ledger explains where the crew lost them. They want to bring it ashore so the search can end.

### expansion.js:626

**Context:** people

Sable

### expansion.js:629

**Context:** people

Sable designed signals to bring travellers home. The broken beacon has never stopped calling. She wants local keepers to decide when their lamps should go dark.

### expansion.js:634

**Context:** people

Wynn

### expansion.js:637

**Context:** people

Wynn defended a road camp after his family had moved away. He wants to find their new camp and ask what they need, instead of rebuilding the fence they left.

### expansion.js:642

**Context:** people

Tavi

### expansion.js:645

**Context:** people

Tavi counted the travellers through but never entered their own arrival. Their spirit follows the last lamp kept by their sister. The return register can finally explain the missing name.

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

The passage opens behind the pump. Prison intake numbers are chalked where a maintenance crew would expect pipe measurements. Rowan follows them to a narrow stair that bypasses the public hall. A brass key hangs beside the wheel. The guild's visitors could have spent years upstairs without seeing who was brought through here.

### sprawl.js:18

**Context:** chambers → cells → name

The abandoned holding cells

### sprawl.js:25

**Context:** chambers → cells → story

The cell list records witnesses who challenged room acquisitions. Beside several names is the instruction 'hold pending clarification'. No release date follows. A loose bunk board hides a crypt key and an address for a prisoner's family. Rowan copies the address before returning the board. The testimony is added to the register with the names intact.

### sprawl.js:31

**Context:** chambers → ratway → name

The rat king’s cistern

### sprawl.js:38

**Context:** chambers → ratway → story

The cistern holds the missing crew's tools beneath the rat king's nest. When it is cleared, the party recovers an enchanted spear, a spillway map and an awl with a loose blue handle. The tools are useful, but the awl has a note tied to it. Rowan keeps it separate from the equipment being divided.

### sprawl.js:44

**Context:** chambers → crypt → name

The crypt of erased names

### sprawl.js:51

**Context:** chambers → crypt → story

The crypt plaques have been scraped blank. In the burial register, the same entries still have names and family addresses. Rowan reads them while Mara makes copies. As the names are restored, the death ward settles and the memorial lantern lights a safe path. Some addresses may no longer exist. They will have to be checked rather than treated as another finished list.

### sprawl.js:58

**Context:** chambers → ossuary → name

The bone library

### sprawl.js:65

**Context:** chambers → ossuary → story

The bone labels record two sets of rites. The first accompanies the burials. The second was added later for experiments, without new permission from the dead. Halden's instruction is tucked into the ledger. The party seals the experimental shelves and preserves the original wishes. A protective pin in the keeper's desk can be used; the people buried here will not be entered as available materials.

### sprawl.js:70

**Context:** chambers → maze → name

The maze beyond the map

### sprawl.js:77

**Context:** chambers → maze → story

The maze's turns conceal a stair toward the treasury. Ysra's survey tool lies beside a route she was told not to include on the public plan. Once the chalk marks are followed, the stair is easy to see. The difficulty was deliberate. Rowan keeps the private route with the account of the cells below.

### sprawl.js:83

**Context:** chambers → oubliette → name

The oubliette beneath the well

### sprawl.js:90

**Context:** chambers → oubliette → story

The shaft ends above a room with no door. A name is scratched on the bucket, then repeated lower down where the first letters wore away. There is no answer from the room. The guild installs a ladder and records the captive's message for their sister. The passage can be entered safely now. That does not tell them where the captive went.

### sprawl.js:96

**Context:** chambers → vault → name

The treasury under the roots

### sprawl.js:103

**Context:** chambers → vault → story

Roots have split the treasury locks. The deposits still carry owner names and return addresses. Rowan recognises their own salvage stamp on one tag. The guild records its signed fee separately and leaves the claims with Mara to trace. A ring in the keeper's desk opens a passage to the tower. Before leaving, Rowan unties the old address so it can be read without lifting the chest.

### sprawl.js:110

**Context:** chambers → fungus → name

The luminous fungal caverns

### sprawl.js:117

**Context:** chambers → fungus → story

The filtration beds still clean runoff from the cells. Their keeper left measurements and a method for controlling the toxic bloom. The party follows it, preserving the beds while restoring clean water. Beside the slate is an unanswered request to inspect the prisoners' conditions. Someone here knew how to keep people alive and did not find a way to get them out.

### sprawl.js:123

**Context:** chambers → rift → name

The drowned door between worlds

### sprawl.js:130

**Context:** chambers → rift → story

Water stands vertically inside the damaged doorway and leaks through its feed pipe into the lower drains. The connection's label matches the coast on Sera's chart. Closing the valve stops the saltwater entering the house without opening the route. A shielding staff is recovered from the workbench. Rowan records where its old keeper expected the sea to be.

### sprawl.js:136

**Context:** chambers → study → name

The wizard’s unfinished study

### sprawl.js:143

**Context:** chambers → study → story

Ada's apprentice kept full copies of the tests removed from the public archive. The voice continued after the speaking tube was disconnected; the same result appears on three dates. The notes show a stair concealed behind the shelves. An examination lens makes the erased annotations readable. This was more than one frightened witness. Ada had measurements she chose not to publish.

### sprawl.js:149

**Context:** chambers → potions → name

The suspended potion kitchen

### sprawl.js:156

**Context:** chambers → potions → story

The cooker changes the pull of gravity as it heats. Bottles are suspended above the floor, but the shutoff sequence survives on the cooling tiles. Following it restores the room's ordinary weight. The party recovers the protective cloak kept for spills and explosions. On its inner seam someone has sewn a repair with blue thread. The laboratory had people working in it, not just apparatus waiting to be found.

### sprawl.js:163

**Context:** chambers → mirror → name

The mirror that kept an afternoon

### sprawl.js:170

**Context:** chambers → mirror → story

The mirror repeats the afternoon before the evacuation. Vey's messenger delivers the suspension order to the study. Later in the reflection, the same messenger returns carrying a revised instruction. Echo sight distinguishes those recorded actions from a creature copying the messenger's face. Once the false reflection is cleared, a glass dagger can be recovered. The mirror shows that the stop order arrived. They still need to know why the test restarted.

### sprawl.js:176

**Context:** chambers → summoning → name

The broken summoning theatre

### sprawl.js:183

**Context:** chambers → summoning → story

A loose stone beneath the circle protects the original suspension order. A note beside it records Vey's later authorisation to resume. The apprentice hid both when the failures were removed from the public file. After clearing the trapped creature, the guild replaces the stone and preserves the papers. Vey first stopped the test, then accepted a reassuring result and restarted it. The disaster followed that second decision.

### sprawl.js:190

**Context:** chambers → menagerie → name

The moonlit menagerie

### sprawl.js:197

**Context:** chambers → menagerie → story

The feeding cards give specimen numbers. The keepers' notes give names, habits and the households the animals came from. A mooncat comes when Rowan reads one name aloud. The party repairs the walkways and frees the attendants. Return arrangements can begin where a home is still available; animals without one will need care here. Nobody adds them to an acquisition list.

### sprawl.js:204

**Context:** chambers → orrery → name

The room orbiting its own ceiling

### sprawl.js:211

**Context:** chambers → orrery → story

The orrery marks the rooms available for collection. The household ledger beside it records objections the machine cannot display. Rowan disconnects the automatic selector and copies the routes needed for agreed return journeys. A ring reveals the stair toward the crypt. Before shutting the case, Rowan adds the household names to the map rather than leaving them in a separate book.

### sprawl.js:219

**Context:** chambers → storm → name

The storm caught in a bottle

### sprawl.js:226

**Context:** chambers → storm → story

The storm bottle powers the tower lights. Its neck is cracked, and the old breastplate beside it is scarred where somebody held the grounding switch. The apprentice left a safer discharge sequence. The party uses the lightning rods instead of asking one person to absorb the current. The breastplate can be recovered once the room is stable. The lights go out briefly, then return on the repaired circuit.

### sprawl.js:232

**Context:** chambers → stars → name

The observatory with no outside

### sprawl.js:239

**Context:** chambers → stars → story

The windows show the surviving door destinations. Rowan recognises the kitchens, watchrooms and workshops from the records collected below. Some hold residents. Others are empty, or belong to people who never agreed to the guild's claim. The party marks the occupied roads before closing unsafe connections. Rowan can see what a replacement must do: keep the useful routes working without requiring them to correct every fault.

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

The recording shows Halden using the surviving house connection to support Rowan’s failing pulse. Rowan’s mind has been correcting that connection ever since. A replacement must perform the entire function before the binding can be removed.

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

The observatory has found the evacuation infirmary. Its recording can explain Halden’s treatment and the severance. The room’s anchor is failing, so the cylinder must be retrieved before the connection is lost.

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

The archive identifies Alder’s disputed greenhouse and the observatory lens at Elian’s tower. It also preserves a report of voices repeating after a test signal stopped. Those reports were dismissed before the experiment continued.

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

Bryn worked as a mason at the old guild and was trapped carrying her father’s door toward the failing stair. Thirty years passed outside. She wants to find the records of his waystation job and learn what happened to him afterward.

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

Nell recognises the shelter route she learned from her grandmother and later used during the evacuation. Sera’s newer marks show that somebody maintained it during the thirty years Nell missed. She wants to meet the keepers and trace the families she guided.

### story-model.js:257

**Context:** characterAccount

Nell guided families past guild patrols, then folded the evacuation route behind them. The severance trapped her inside it. The road is open again, but she does not yet know which shelters and households survived.

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

Ivo is tracing the house inscriptions without examining Rowan directly. Ada’s old symbols appear in them. He hopes the archive will show where his teacher went during the thirty years he missed.

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

Maelin remembers Vey’s order to clear the stairs and the false instruction that followed in the same voice. Her frost ward stopped the bell carrying that second signal.

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

Mara is a small brass golem built and raised by Halden, now Rowan’s familiar. Following their final treatment notes, she repaired the entrance connection with their brass token. She told Rowan that Halden died last autumn and brought the letters from their years outside. Mara arranges supplies while the guild earns enough to reopen the house.

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

The infirmary recording shows Halden binding Rowan’s failing pulse to the surviving house connection. They intended to replace the treatment once the doors were safe. Vey ordered the road severed before Rowan could be transferred. The new guild now knows what its replacement must take over.

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

A mason of the old guild, released from an evacuation ward after thirty years. Bryn carries her father’s workshop door as a shield and hopes the surviving records will tell her what happened to him.

### domain.js:93

**Context:** recruits → nell → name

Nell

### domain.js:100

**Context:** recruits → nell → bio

A guild pathfinder who secretly guided displaced families past its customs posts. Nell has woken to roads and households changed by thirty years. She wants to find the people she helped escape.

### domain.js:104

**Context:** recruits → ivo → name

Ivo

### domain.js:111

**Context:** recruits → ivo → bio

Ada Merrow’s apprentice, preserved inside an unfinished protection spell. Ivo still has yesterday’s lesson in his notebook. His teacher has had thirty years to live with what happened next.

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

Wren’s Crossing has built a new footbridge beside the broken one. The bell still stands on the far bank, beyond the last safe section.
The keeper brings out the brass fitting. It was removed from the guild landing when the connection was severed; without it the landing cannot return. He wants the party to reach the bell and check the trapped signal before taking the fitting away.
“Your people got the children across that night,” he says. “I remember their names. I also remember the bills that came afterward.”
When the token nears the bell, it rings without a clapper. A familiar voice asks the party to keep listening. The keeper sets down his tools.
The fitting can be taken along the safe route now. Listening longer may reveal something about the false signal, but no doorway should be opened.

### domain.js:168

**Context:** contracts → anchor → choices → safe → label

Accept the anchor and the keeper’s warning

### domain.js:169

**Context:** contracts → anchor → choices → safe → preview

Recover the landing. Honour the keeper’s boundary and gain community trust.

### domain.js:172

**Context:** contracts → anchor → choices → safe → result

The party secures the fitting and leaves the repeating signal isolated. The keeper wraps the brass in sailcloth and sends the landing register with it.
He asks the guild to write once the repair holds. He would like to hear what the children they saved grew up to become.
The landing can be reconnected. Its chair and records have survived with it.

### domain.js:176

**Context:** contracts → anchor → choices → deep → label

Listen longer; keep the threshold shut

### domain.js:178

**Context:** contracts → anchor → choices → deep → preview

Recover the same landing, a disturbing clue and 20 extra gold. Gain knowledge of the voice without opening its road.

### domain.js:183

**Context:** contracts → anchor → choices → deep → result

The party records the signal without opening its connection. The first voice repeats a name from the keeper’s register. The next repeats a sentence spoken moments ago by the party itself.
Then it says, “Stay. I can keep you here.”
The keeper checks that the fitting is secured before they leave. The recording provides evidence that something learns words from the connection; it does not prove that the people whose voices it uses are there.

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

Mara, a small brass golem, reached the gate with Halden’s old brass token and a bag of tools. Rowan recognised the worn cord around it.
“Halden built me, then raised me,” she said. “They died last autumn.”
Rowan asked her to repeat that. Mara sat on the doorstep while they tried to understand the date.
Halden had spent years searching for a route back. Their last papers helped Mara align the token with the entrance fittings; she had finally made the crossing hold. She brought their letters too. Rowan could read them when they were ready.
Before dusk Mara asked where she could put her tools. The house had no safe beds and little money. There were local contracts they could take once Rowan found people fit to travel.
Rowan showed her the dry corner beside the entrance. Mara put the kettle there first.

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

The labyrinth heart holds a living map. Ysra’s unfinished tracking spell keeps drawing her in the corridor that vanished during the evacuation.

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

The keeper also sends the bell-tower and labyrinth-gate keys, recovered from the old landing register. The brass fitting is installed in its service-room socket.
Timber settles beyond the doorway. The missing landing comes into view with its worn chair still against the wall.
Rowan stops at the old boundary. Mara waits on the other side. They take one step, then another. The familiar pain does not begin.
There are marks on the timber they can now read. The fitting has returned one piece of the house, and Rowan can move through it. Other surviving fittings may lead to other rooms.

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

Sera listens to the keeper’s recording. It uses words spoken by the party during the visit. “It did that on the ship,” she says. “My mother’s voice first. Then mine. I was standing there listening to it.”

### domain.js:1520

**Context:** missionLetter → callbacks → navigator

Sera recognises the keeper’s sailcloth. “He still wraps everything twice,” she says. “Did you help him with the bell?” She listens to the account before bringing out her charts.

### domain.js:1522

**Context:** missionLetter → callbacks → orchard

Edda has read the corrected acquisition record. Her mother’s letter is attached now. “I wondered if you’d still have it,” she says. She points out the unanswered question about returning the greenhouse.

### domain.js:1523

**Context:** missionLetter → callbacks → orchard

Edda returns the verification questions with answers and two dates corrected. She asks the party to read those corrections before discussing the root system.

### domain.js:1525

**Context:** missionLetter → callbacks → lens

A rescued deckhand has sent Elian a letter asking about the alarm. He remembers being told to stay aboard after the evacuation began. Elian reads the question twice before setting the letter beside his watch log.

### domain.js:1526

**Context:** missionLetter → callbacks → lens

Sera’s chart marks Elian’s tower with the evacuation signal. He checks the mark against his log. The dates match; the contradictory orders do not.

### domain.js:1528

**Context:** missionLetter → callbacks → ivoPast

The party brings a living seal grown from the greenhouse roots. Ada asks where they came from and what was promised in exchange. She checks the growth measurements before discussing the transfer.

### domain.js:1529

**Context:** missionLetter → callbacks → ivoPast

Ada has prepared a mechanical alternative that needs no rare roots. The party checks its settings against the copied archive diagrams. The operator must not leave the circle until the replacement has held.

### domain.js:1531

**Context:** missionLetter → callbacks → witness

Elian waits for the cylinder at the guild. His watch log can establish when the signal changed. The medical recording may show what happened afterward.

### domain.js:1533

**Context:** missionLetter → callbacks → witness

Elian’s log accompanies the party. Its alarm times match the cylinder’s station marks. Both records place the treatment during the evacuation, before the doors were severed.

### domain.js:1534

**Context:** missionLetter → callbacks → witness

The observatory measurements identify the infirmary’s old position. The cylinder’s station stamp matches it. The record can be compared with the surviving accounts rather than accepted only because it speaks.

### domain.js:1536

**Context:** missionLetter → callbacks → covenant

A recovering greenhouse patient asks who represents residents without a home village. The keepers add a place for them before the covenant is signed.

### domain.js:1537

**Context:** missionLetter → callbacks → covenant

Edda brings an apple cutting from the first return shipment. She sets it beside the anchor drawings and asks when the next batch will be ready.

### domain.js:1539

**Context:** missionLetter → callbacks → lattice

Ada hands the test sheet to another keeper. She will answer questions about the design, but the frame must also work when its author is not operating it.

### domain.js:1541

**Context:** missionLetter → callbacks → lattice

Ada sends corrections checked by the monastery’s relief keeper. Both sign the revised timing sheet. The test crew checks the new settings against the frame.

### domain.js:1542

**Context:** missionLetter → callbacks → lattice

The published design includes operating settings and failure tests. The crew follows them in order. The system must work without its author or a particular companion present.

### domain.js:1548

**Context:** missionLetter

Oren’s drawing places the first failure beneath the rear-stair door mechanism. The recording captures the collapse after the alarm changed. His account and the cylinder describe different parts of the same event.

### domain.js:1551

**Context:** missionLetter

The cylinder records three strokes, an extra strike and the continuous alarm. Maelin’s testimony identifies the first signal as evacuation and the second as the false instruction to wait.

### domain.js:1554

**Context:** missionLetter

Ysra’s map shows the last route into the infirmary. The recording identifies the carried patient as Rowan, the face she could not see from the corridor.

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

The cleared service room contains expedition shelves and a cellar key hung beside the stair plan. A rack conceals the old ledger. Several entries refer to disputed acquisitions omitted from the public catalogue. The plastered wall kept visitors away from these records as well as from the damaged room.

### domain.js:1724

**Context:** interact

Restore the service room to uncover its ledger.

### domain.js:1728

**Context:** interact

The hidden ledger lists the brass fitting for the missing landing and the socket where it belongs. It was sent to Wren’s Crossing during the severance. A newer letter from the keeper offers to return it if a party can help reach the village bell. An evacuation instruction warns against opening the great threshold. The repair has a location; the warning still needs an explanation.

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

The bow carries Sera Venn’s name. Its slate records the coast where the stern was stranded during the severance. Find Sera there to learn what happened to the ship’s passengers and recover her archive chart.

### domain.js:1754

**Context:** interact → A ship with nowhere to sail → title

A ship with nowhere to sail

### domain.js:1755

**Context:** interact → A ship with nowhere to sail → body

The ship’s bow is lodged behind the cellar masonry. A spoon has slipped beneath a bunk; a child’s shoe rests beside it. Rowan remembers passengers sleeping here during the evacuation.
The navigator’s slate names Captain Sera Venn and marks the coast where the stern was stranded. The ship did not enter the cellar whole. Its evacuation connection broke while passengers were moving through it.
The surviving chart gives the party somewhere to look for Sera. If the landing has not yet returned, its fitting must be recovered before Rowan can read the matching guild inscription.

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

The landing inscription records an emergency severance from inside the guild. It orders the small evacuation routes closed because an unknown intelligence was repeating signals through them. The great threshold was to remain disconnected.
Sera Venn is listed as the navigator who charted the surviving routes. Her ship’s coastal position can lead the party to her.
The landing register also names its former residents. Anwen’s name matches the carving beneath the chair. Rowan remembers changing a kitchen entry with that name. They do not yet know what happened to its owner.

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

The road is muddy. Rowan puts one foot beyond the gate and waits for the old pain.
Nothing pulls them back.
⟦s.flags.nellWalk ? 'Nell walks beside them until the first turn, then lets Rowan choose the next one.' : allies.length ? `${allies.join(', ')} ${allies.length === 1 ? 'waits' : 'wait'} by the gate. Nobody asks for a promise to return.` : 'Mara is at the gate. “There you are,” she says, as if Rowan has only stepped out to check the weather.'⟧
⟦s.flags.endingReturn ? 'Behind them, the keepers are arranging the return of borrowed rooms. The work will go on without needing Rowan to hold it together.' : 'Behind them, a patient opens a window, someone argues over a map, and the kettle begins to sing. The house is still a home.'⟧
Rowan takes out the old travel list. They cannot read the smallest writing in this light. It can wait until they find somewhere to sit.
Beyond the grounds, a bird calls from a hedge Rowan has never reached. They turn toward the sound and keep walking.

**Source template:**

```text
The road is muddy. Rowan puts one foot beyond the gate and waits for the old pain.
Nothing pulls them back.
⟦s.flags.nellWalk ? 'Nell walks beside them until the first turn, then lets Rowan choose the next one.' : allies.length ? `${allies.join(', ')} ${allies.length === 1 ? 'waits' : 'wait'} by the gate. Nobody asks for a promise to return.` : 'Mara is at the gate. “There you are,” she says, as if Rowan has only stepped out to check the weather.'⟧
⟦s.flags.endingReturn ? 'Behind them, the keepers are arranging the return of borrowed rooms. The work will go on without needing Rowan to hold it together.' : 'Behind them, a patient opens a window, someone argues over a map, and the kettle begins to sing. The house is still a home.'⟧
Rowan takes out the old travel list. They cannot read the smallest writing in this light. It can wait until they find somewhere to sit.
Beyond the grounds, a bird calls from a hedge Rowan has never reached. They turn toward the sound and keep walking.
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

A craftswoman waits at the gate with a brass guild token. “I’m Mara. Halden built me, then raised me. They kept this for you.” Rowan recognises the name: Halden was the guild surgeon, and someone they loved. Mara grew up outside while the house was cut off. She has come to find the person Halden spoke about.
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
