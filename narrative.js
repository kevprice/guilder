// Authored campaign content. Requirements are public only after their parent lead is found.
export const chapters = [
  {id:'survival',title:'I · A wage and a wall'},
  {id:'shore',title:'II · Things brought home'},
  {id:'accounts',title:'III · The price of wonders'},
  {id:'truth',title:'IV · Who closed the door'},
  {id:'preparation',title:'V · A different kind of guild'},
  {id:'freedom',title:'VI · The road beyond'},
];

export const storyMissions = [
  {
    id:'navigator',name:'The woman who charts absences',days:3,reward:125,xp:110,capacity:3,
    requires:['inscription'],sets:['archiveSeal'],chapter:'shore',
    desc:'The landing inscription names Captain Sera Venn, whose ship is lodged beneath the house. She is alive, on a coast with no tides. Her charts may locate the missing archive.',
    checks:[{stat:'agi',min:8,label:'Agility 8 finds a route over the broken sea wall'},{skill:'water',label:'Water breathing crosses the drowned road'}],injuryDays:3,
    arrival:'The shore is paved with shells that have never heard a sea. Sera waits beside a hull painted with the old guild mark.\n“You kept the bow,” she says. “We kept everyone who was standing behind it.”\nA storm made of displaced water is approaching. Sera can retrieve her chart, but three deckhands are trapped on the reef. The party cannot reach both before the storm. She places the archive seal in your hand regardless. “That belongs to the people who wrote it. Tell them we are still here.”',
    choices:[
      {id:'crew',label:'Bring the deckhands home',preview:'Sera trusts the new guild. Recover a partial chart and open a community escort contract. The archive still returns.',sets:['crewSaved'],bond:{nell:1,bryn:1},community:2,
        result:'The party turns toward the reef. Sera tears the safe half from her chart and presses it into the youngest deckhand’s coat. Three people come through the gate coughing seawater. That evening they teach the guild a song with no final verse. Sera promises to write when she has drawn the missing coast again.'},
      {id:'chart',label:'Preserve the complete chart',preview:'Recover survey knowledge for the final containment method and 25 extra gold. The deckhands take shelter on the reef; Sera stays to reach them.',sets:['completeChart'],bonus:25,knowledge:2,bond:{ivo:1,nell:-1},
        result:'The party saves the chart from the rain. Sera watches the reef until her knuckles turn white. “Now use it,” she says. “Do not make this a framed map of people you left behind.” She stays with a lantern. A later letter confirms that the deckhands survived, but their route home will be longer.'},
    ],
  },
  {
    id:'orchard',name:'The orchard that remembers winter',days:3,reward:155,xp:120,capacity:3,
    requires:['archiveRead'],sets:['gardenAnchor'],chapter:'accounts',
    desc:'The archive identifies a greenhouse taken from the village of Alder. The village has harvested frost ever since. Its keeper offers the anchor if you help decide what should return with it.',
    checks:[{skill:'tracking',label:'Tracking finds paths through the displaced roots'},{stat:'end',min:10,label:'Endurance 10 withstands the cold pollen'}],injuryDays:3,
    arrival:'Alder’s apple trees are covered in frost despite the summer heat. The guild’s old greenhouse drew warmth through a root network under the village. When its anchor was cut, that network began drawing heat without returning it.\nKeeper Edda has grown a seed bank that could give the village ordinary seasons again. Its root lattice can also become a medicine garden within the house. Splitting it will kill both halves.\n“The room can go,” she says. “We learned to live without it. The roots are another matter.”',
    choices:[
      {id:'return',label:'Leave the seed bank with Alder',preview:'Alder becomes an ally. Reclaimed greenhouse can become a hospice. Opens the neighbour-based final method.',sets:['seedsReturned'],community:2,bond:{nell:1},
        result:'Edda places the first root beneath the village’s old apple tree. The frost peels from its bark. The returned greenhouse is mostly empty; the villagers fill its shelves with donated cuttings, and leave space for beds. A missing room becomes a place that can receive people, rather than take things.'},
      {id:'study',label:'Bring the root lattice to the house',preview:'Reclaimed greenhouse can become a botanical laboratory. Gain containment knowledge; Alder receives payment and a written promise of cuttings.',sets:['rootsStudied'],knowledge:2,bonus:20,bond:{ivo:1,nell:-1},
        result:'Edda accepts a payment but makes Rowan sign the promise personally. The lattice settles into the returned room and lights its glass from beneath. Ivo sees a way to grow living seals. A place in Alder stays cold. The promise is entered in the guild’s public ledger where nobody can quietly erase it.'},
    ],
  },
  {
    id:'lens',name:'A light above the salt cliff',days:3,reward:165,xp:125,capacity:3,
    requires:['archiveRead'],sets:['lens'],chapter:'accounts',
    desc:'The observatory’s lens lies in a watchtower maintained by a former guild lookout. Its last light might reveal the threshold’s surviving connections.',
    checks:[{stat:'str',min:11,label:'Strength 11 secures the falling counterweight'},{stat:'int',min:10,label:'Intellect 10 aligns the tower safely'}],injuryDays:3,
    arrival:'The tower’s beacon still sweeps a sea it can no longer reach. Its keeper, Elian, has counted every sweep since the house vanished. He was the lookout who rang the last alarm.\n“There were two orders,” he says. “Open the road. Then burn the road. I rang for both.”\nThe lens can be removed, but the tower will go dark. Elian asks whether his testimony should travel with it. The harbour below has spent thirty years blaming him for ships that never returned.',
    choices:[
      {id:'witness',label:'Bring Elian home to testify',preview:'Gain a witness and community trust. Observatory becomes a listening station. Bryn values an answer given in person.',sets:['elianHome'],community:1,bond:{bryn:1},
        result:'Elian packs no clothes. He brings the rope that rang the alarm and a list of names. At the house he sits by the entrance, correcting the spelling of each lost sailor. The lens returns the observatory; someone returns with it who can explain what it saw.'},
      {id:'record',label:'Carry his record; let him keep watch',preview:'Gain calibrated instruments and containment knowledge. Observatory becomes a survey station. His signed account still enters the journal.',sets:['calibratedLens'],knowledge:2,bond:{ivo:1},
        result:'The party helps Elian construct an ordinary beacon before removing the lens. He signs every page of his account and stays to keep watch with a light that can finally reach the water. His instruments return to the house. His testimony is a document, not a man in a chair.'},
    ],
  },
  {
    id:'brynPast',name:'The stones we leave standing',days:2,reward:95,xp:100,capacity:3,
    requires:['anchor'],personal:'bryn',visits:2,sets:['brynResolved'],chapter:'shore',
    desc:'Bryn recognises her father’s mason mark in the service wall. His last job was at a guild waystation. A letter says demolition workers have found something beneath it.',
    checks:[{stat:'str',min:10,label:'Strength 10 supports the failing lintel'},{skill:'guard',label:'Guard protects the demolition crew'}],injuryDays:3,
    arrival:'Under the waystation is a row of stone names. Bryn’s father carved them for people the guild could not bring back. One name is his own, added by a different hand.\nThe demolition foreman can keep the chamber open long enough to recover the memorial, or divert the last supports to rescue an apprentice trapped in a neighbouring tunnel.\nBryn removes her shield. “You hired me for strong arms. This is the first time I wish they were longer.”',
    choices:[
      {id:'apprentice',label:'Use the supports to reach the apprentice',preview:'Bryn chooses the living over an intact memorial. Gain her trust and the Steadfast trait (+1 Endurance). Preserve the names in a rubbing.',bond:{bryn:2},trait:{id:'bryn',name:'Steadfast',stat:'end'},community:1,
        result:'The memorial breaks while the apprentice crawls free. Bryn makes a rubbing from every recoverable piece. At home she hangs the paper beside the beds. “He did not build stones,” she says. “He built places people could leave alive.” For the first time, she calls the house ours.'},
      {id:'memorial',label:'Recover the memorial; call another rescue crew',preview:'Bryn gains the Keeper of names trait (+1 Strength). The apprentice is rescued later with a lasting injury. Bryn trusts your promise, but remembers its cost.',bond:{bryn:1},trait:{id:'bryn',name:'Keeper of names',stat:'str'},knowledge:1,
        result:'The stone names come home whole. A second crew reaches the apprentice at dusk; a broken leg will never mend entirely. Bryn reads the memorial aloud once and then asks for the apprentice’s name. She adds it to the report under “what this cost”, although he is still alive.'},
    ],
  },
  {
    id:'nellPast',name:'The path her grandmother hid',days:3,reward:110,xp:110,capacity:3,
    requires:['archiveSeal'],personal:'nell',visits:2,sets:['nellResolved'],chapter:'accounts',
    desc:'Sera’s chart includes a trail Nell’s grandmother taught her never to mark. It led displaced residents away from a guild customs post. Someone is using it again.',
    checks:[{skill:'tracking',label:'Tracking locates the unmarked stepping stones'},{stat:'agi',min:10,label:'Agility 10 crosses the ravine'}],injuryDays:3,
    arrival:'Nell finds a gate woven from travelling coats. Refugees have stitched directions into their cuffs for generations. Her grandmother did not guide explorers; she smuggled people out of places the guild had claimed.\nA trader offers to purchase the route. Keeping it secret would give the new guild a valuable passage. Publishing it with protected shelters would give strangers a way home, and make Nell responsible for keeping that promise.',
    choices:[
      {id:'open',label:'Publish the route with shelter keepers',preview:'Nell becomes a Wayfinder (+1 Agility), and community escorts open. Gain trust; shelter addresses stay protected.',sets:['shelterRoute'],community:2,bond:{nell:2},trait:{id:'nell',name:'Wayfinder',stat:'agi'},
        result:'Nell draws a public map of the path, but the shelter locations are given only to their keepers. “A path does not belong to whoever survives it first,” she says. Her grandmother’s name appears on the guild wall, beneath the heading “People who knew better than us”.'},
      {id:'quiet',label:'Keep a quiet guild passage',preview:'Nell becomes a Keeper of paths (+1 Intellect). Opens discreet salvage work. Refugees may still use it; the guild controls who receives the map.',sets:['quietRoute'],knowledge:1,bonus:30,bond:{nell:1},trait:{id:'nell',name:'Keeper of paths',stat:'int'},
        result:'Nell burns the trader’s copy and keeps the original herself. She will guide people who ask, but no longer believes every traveller means well. “If we are keeping a secret,” she tells Rowan, “I will be one of the people deciding who it protects.”'},
    ],
  },
  {
    id:'ivoPast',name:'A teacher’s last lesson',days:3,reward:120,xp:120,capacity:3,
    requires:['archiveRead'],personal:'ivo',visits:2,sets:['ivoResolved'],chapter:'accounts',
    desc:'An annotation in the archive is in Ivo’s teacher’s handwriting. Professor Ada Merrow is holding a small threshold closed at a monastery where the bells ring inward.',
    checks:[{skill:'literacy',label:'Magical literacy reads the safe seal sequence'},{stat:'int',min:11,label:'Intellect 11 solves the reverse bell pattern'}],injuryDays:4,
    arrival:'Ada has grown old inside a chalk circle. She was not a guild leader. She helped calculate the first joining and trusted the people who said the destination was empty.\n“I called silence an absence of life,” she tells Ivo. “I was a good mathematician and a poor listener.”\nHer seal can be replaced by a living lattice if the greenhouse has one. Otherwise the party can install a slower mechanical seal. Either frees her, but she asks to remain and finish the work herself.',
    choices:[
      {id:'home',label:'Replace the seal and invite Ada home',preview:'Ada teaches a safe containment method. Ivo becomes a Questioner (+1 Intellect). Gain his trust; the teacher must answer for her work in public.',sets:['adaHome'],knowledge:2,bond:{ivo:2},trait:{id:'ivo',name:'Questioner',stat:'int'},
        result:'Ivo waits until the replacement has held through one full night. Ada steps out of the circle without falling. At home she refuses a portrait and asks for a desk opposite the public ledger. Ivo stops calling her infallible. He starts calling her by her name.'},
      {id:'stay',label:'Respect her choice; bring back her method',preview:'Ada remains by choice with supplies and a replacement keeper. Ivo becomes an Independent scholar (+1 Endurance). Recover the same essential method without bringing her home.',sets:['adaStayed'],knowledge:2,bond:{ivo:1},trait:{id:'ivo',name:'Independent scholar',stat:'end'},
        result:'The party leaves food, a fresh seal and a keeper trained to relieve Ada. Ivo carries her calculations home, but writes a new proof in the margin. “You can love a teacher,” he says, “without making their life your assignment.” Ada’s next letter is addressed to a colleague.'},
    ],
  },
  {
    id:'witness',name:'The night they cut the road',days:4,reward:200,xp:160,capacity:3,
    requires:['observatoryRead','gardenRead'],sets:['truth'],chapter:'truth',
    desc:'The observatory locates a severed infirmary. A memory cylinder inside it recorded the last hour of the old guild. Bring back the record before its anchor fails.',
    checks:[{stat:'end',min:12,label:'Endurance 12 holds against the memory storm'},{skill:'literacy',label:'Magical literacy separates the record from the voice imitating it'}],injuryDays:4,
    arrival:'The cylinder contains people interrupting each other. Commander Vey insists the joining can still be saved. Surgeon Halden tells her there are already voices in the walls. Elian’s alarm begins.\nThen Rowan’s younger voice: “There are people on the stair.” A crash. Halden says Rowan will die before they can carry them out. He binds Rowan to the house, using a living mind as the last stabilising anchor.\n“Will they be able to leave?” someone asks. Halden does not answer. Vey orders the road cut. The dangerous guest never finishes crossing.\nMara sets a packet beside the cylinder: Halden’s letters across twenty-nine years. Halden searched for Rowan, raised Mara, continued treating patients, and died before the entrance could be reached. Rowan remembers the journey they had planned together and kept postponing.\nThe last letter says: “I wanted you to have a life. It did not have to be a life with me.” Mara inherited the token and chose to follow the unfinished treatment. She has a life elsewhere; she has not inherited a duty to remain.\nHalden’s instruction on the cylinder is clear: “Do not turn my emergency into their obligation.”',
    choices:[
      {id:'publish',label:'Publish the record, including Rowan’s binding',preview:'The guild accepts public accountability. More neighbours will help a consent-based reconnection. Rowan’s truth is made public by Rowan’s decision.',sets:['truthPublished'],community:2,
        result:'Rowan listens alone before authorising the full record. Mara posts a copy at the gate. Some visitors leave flowers; others leave bills. For once, neither is thrown away. The new guild must answer for the house it inherited, without pretending it chose every stone.'},
      {id:'private',label:'Publish the collapse; keep Rowan’s injury private',preview:'The catastrophe remains public, but Rowan keeps control over their personal history. Gain a careful containment analysis from a limited circle of witnesses.',sets:['truthPrivate'],knowledge:2,
        result:'The public record includes every order that joined and severed the threshold. Rowan’s injury is shared only with those preparing the new seal. Bryn closes the journal when a visitor asks to see it. “You can owe people an answer,” she says, “without owing them every part of yourself.”'},
    ],
  },
  {
    id:'covenant',name:'A hundred small doors',days:4,reward:150,xp:180,capacity:3,cost:90,
    requires:['truth','gardenRead'],communityMin:3,sets:['prepared','covenantPrepared'],chapter:'preparation',exclusive:'prepared',
    desc:'Ask the returned shores and shelter keepers to hold the house with many small, revocable connections. The road will depend on relationships rather than one captive anchor. Materials and travel cost 90 gold.',
    checks:[{stat:'end',min:11,label:'Endurance 11 carries the anchor posts between settlements'},{skill:'tracking',label:'Tracking reaches each keeper before the agreed tide'}],injuryDays:4,
    arrival:'No ceremony can make a bargain fair by itself. Edda asks who can close a door. Sera asks what happens if a village needs its anchor back. Nell asks whether strangers will have a place at the table.\nThe covenant can be written as a guild charter with guaranteed visiting rights, or a commons where each connected community appoints a keeper. Both let any community withdraw its connection. Both remove Rowan from the machinery.',
    choices:[
      {id:'charter',label:'Write a charter for a welcoming guild',preview:'The house remains a guild, with enforceable visiting and withdrawal rights. Residents keep the home they built. Prepare the safe threshold.',sets:['charter'],community:1,
        result:'Rowan signs the charter first, leaving the space for “permanent anchor” blank. The keepers sign in their own languages. Nobody signs for an absent village. When one little door closes during the test, the others hold. The house can survive a refusal.'},
      {id:'commons',label:'Let the house become a shared commons',preview:'Communities share authority over the connections. The guild becomes one resident among several. Prepare the same safe threshold.',sets:['commons'],community:2,
        result:'The table has more chairs than guild members. Mara laughs at how much longer meetings will take. The first motion is to give the house a front-door key that belongs to nobody in particular. Rowan’s name is removed from the anchor diagram and written among the residents.'},
    ],
  },
  {
    id:'lattice',name:'A house that can refuse',days:4,reward:150,xp:180,capacity:3,cost:140,
    requires:['truth','observatoryRead'],sets:['prepared','latticePrepared'],chapter:'preparation',exclusive:'prepared',
    desc:'Assemble Ada’s published mechanical seal and the observatory’s independent shutoff. This route remains available even without community allies or Ivo. It costs 140 gold; research allies reduce that to 100.',
    checks:[{stat:'int',min:12,label:'Intellect 12 verifies the independent shutoff'},{skill:'literacy',label:'Magical literacy distinguishes the guest’s false commands'}],injuryDays:4,
    arrival:'The new design has no living anchor. It has several deliberately imperfect connections, each too narrow for the guest to cross. A house that cannot be opened all at once can still have a front door.\nThe final question is who controls the shutoff. Ivo’s notes warn against a single brilliant custodian. Ada’s published design allows either a rotating pair of guild residents or an independent council from outside the house.',
    choices:[
      {id:'residents',label:'Give rotating residents the paired keys',preview:'Guild residents share responsibility; no single leader controls reconnection. Prepare a safe mechanical threshold.',sets:['residentKeys'],knowledge:1,
        result:'Two keys are cut, and neither works alone. Rowan declines the first rotation. The house will have people who maintain it; it will not have a person who must be it. For the first test, Bryn turns one key and Mara the other. Nothing screams.'},
      {id:'outside',label:'Entrust the keys to independent keepers',preview:'Outside witnesses can stop an unsafe joining. The guild accepts oversight. Prepare the same safe mechanical threshold.',sets:['outsideKeys'],community:1,
        result:'The keys leave in separate pockets. The keepers return for the test because they choose to. A shutter closes at the first imitation of Halden’s voice. Ivo writes three words beside the result: “It can refuse.” Rowan adds a fourth: “So can I.”'},
    ],
  },
];

export const laterContracts = [
  {id:'marsh',name:'Letters across the sleeping marsh',days:2,reward:100,xp:85,capacity:3,requires:['archiveSeal'],
    desc:'Sera’s people send letters to relatives whose villages returned in the wrong order. Deliver them without trusting the lights on the water.',
    checks:[{stat:'agi',min:9,label:'Agility 9 crosses the moving causeways'},{skill:'tracking',label:'Tracking recognises the human paths'}],injuryDays:3},
  {id:'escorts',name:'Guests on the long way home',days:2,reward:105,xp:90,capacity:3,requires:['anchor'],any:['crewSaved','shelterRoute'],
    desc:'Shelter keepers ask the guild to escort travellers between returned places. Some will see their homes for the first time since the severance.',
    checks:[{stat:'end',min:9,label:'Endurance 9 carries supplies for the slowest traveller'},{skill:'guard',label:'Guard protects the group at the narrow bridge'}],injuryDays:3},
  {id:'salvage',name:'Quiet cargo, careful questions',days:3,reward:155,xp:110,capacity:3,requires:['quietRoute'],
    desc:'Nell’s passage can carry valuable abandoned instruments. She insists every load includes its recorded owner and a share set aside for restitution.',
    checks:[{stat:'agi',min:11,label:'Agility 11 moves fragile cargo through the ravine'},{skill:'tracking',label:'Tracking avoids the false trail'}],injuryDays:3},
  {id:'fragments',name:'Survey of the wandering fragments',days:3,reward:180,xp:130,capacity:3,requires:['observatoryRead'],
    desc:'The observatory finds small rooms caught between destinations. Map their residents and stabilise the safe ones. The guild now leaves warnings beside places it cannot save.',
    checks:[{stat:'int',min:11,label:'Intellect 11 calibrates the portable anchor'},{skill:'literacy',label:'Magical literacy identifies the false doorway'}],injuryDays:4},
];

export const rooms = [
  {id:'library',name:'RETURNED ARCHIVE',x:1265,w:290,anchor:'archiveSeal',cost:110,operational:'library',read:'archiveRead',requiresSkill:'literacy',
    ruined:'Sealed shelves; a door that reads its reader',restored:'Names restored to the account',
    discovery:{id:'archive',title:'Margins in the official account',requires:['library'],sets:['archiveRead'],
      body:'The guild’s official history occupies one shelf. Corrections occupy four. On a rescue list, “volunteers” has been crossed out and replaced with “passengers”. On a botanical invoice, “gift” has become “taken in lieu of debts”.\nIvo finds an older warning: “A destination may be silent because it is listening.” The warning was filed under superstition before the last expedition.\nTwo useful leads survive: the greenhouse taken from Alder, and the observatory lens sent to Elian’s watchtower. Before sending parties, Rowan must decide whether visitors can inspect these records directly or whether a small team should verify them first.',
      choices:[
        {id:'open',label:'Open the records with protected names',preview:'Visitors can challenge the guild’s history; vulnerable witnesses choose when to be named. Gain community trust.',sets:['openArchive'],community:2,bond:{nell:1},result:'Rowan places the records beside an empty correction book. The first visitor adds six names to a rescue list. The second asks to remove hers from a public display. Both requests are honoured. The orchard and observatory leads are copied into the expedition ledger.'},
        {id:'study',label:'Build a careful research archive',preview:'A small team verifies accounts before publication. Gain containment knowledge; uncensored originals remain preserved.',sets:['researchArchive'],knowledge:2,bond:{ivo:1},result:'Ivo creates two catalogues: what the guild claimed, and what a witness could confirm. Some pages stay unresolved. The warning about the listening destination is sent to every expedition leader. Leads to Alder’s orchard and the salt-cliff observatory are marked for investigation.'},
      ]}},
  {id:'garden',name:'RECLAIMED GREENHOUSE',x:1555,w:290,anchor:'gardenAnchor',cost:150,operational:'garden',read:'gardenRead',
    ruined:'Roots from another season',restored:'A room learning what to give',
    discovery:{id:'gardenUse',title:'What should grow here?',requires:['garden'],sets:['gardenRead'],
      body:'The greenhouse floor retains the outline of Edda’s orchard. Rain arrives at noon, whether there are clouds or not. New cuttings reach toward the quarters, as though people sleeping there were a source of light.\nA room once devoted to collecting rare things can learn another purpose. The choice will affect who comes to the house and how the final connections can be made.',
      choices:[
        {id:'hospice',label:'Make room for beds and ordinary medicine',requires:['seedsReturned'],preview:'A hospice shortens future expedition injuries by one day. Alder’s keepers can help the final covenant.',sets:['hospice'],community:1,bond:{bryn:1},result:'The first beds are built from the old specimen cases. Edda sends common herbs instead of rarities. Bryn asks to put the memorial rubbing where a patient can read it without sitting up. The house begins to bring people home without needing them to be useful first.'},
        {id:'laboratory',label:'Grow a lattice that can close a threshold',requires:['rootsStudied'],preview:'A botanical laboratory reduces containment preparation costs. Rowan accepts the duty to share future cuttings with Alder.',sets:['laboratory'],knowledge:2,bond:{ivo:1},result:'The roots grow through an empty anchor frame and close it when a false voice speaks. Ivo leaves a copy of every result for Edda. The first shipment back to Alder includes ordinary apple cuttings, with no bill attached. Research becomes a promise carried out in small deliveries.'},
      ]}},
  {id:'observatory',name:'RECONNECTED OBSERVATORY',x:1845,w:290,anchor:'lens',cost:180,operational:'observatory',read:'observatoryRead',
    ruined:'A blind dome above a borrowed sky',restored:'The sky is a map of missing rooms',
    discovery:{id:'observatoryUse',title:'Lights with someone behind them',requires:['observatory'],sets:['observatoryRead'],
      body:'Through the lens, the night is full of rooms: a kitchen turning slowly over a salt flat, an infirmary against a red dawn, a threshold chamber illuminated from the wrong side.\nRowan can feel the small anchors now. Each bright point corresponds to an anchor still connected to a room. Several have people moving inside. The infirmary’s light dims every few seconds.\nThe infirmary is failing. The chamber is waiting. Which question will guide the observatory?',
      choices:[
        {id:'listen',label:'Ask who is still there',preview:'Listening station strengthens community ties. Rowan gains anchor sight; the infirmary’s final record becomes reachable.',community:1,sets:['listeningStation'],result:'Elian’s recorded voice accompanies the first beacon: “If you can hear this, you can say no.” Replies arrive in knocks, bird calls and one very irritated letter. A kitchen asks to be left alone until dinner is finished. The infirmary answers with Halden’s name.'},
        {id:'measure',label:'Measure which connections are safe',preview:'Survey station strengthens containment knowledge. Rowan gains the same anchor sight and infirmary lead.',knowledge:2,sets:['surveyStation'],result:'The survey separates distance from strain. A room can be close and still unsafe. A room can be far and already belong to its residents. Rowan circles the failing infirmary and crosses out a route that would join it through the great threshold. There is a slower way.'},
      ]}},
  {id:'threshold',name:'THRESHOLD CHAMBER',x:2135,w:290,anchor:'truth',cost:220,operational:'threshold',read:'release',
    ruined:'The road that was deliberately cut',restored:'A door with the right to stay closed'},
];

export const houseChoices = [
  {
    id:'landingPurpose',title:'The empty chair on the landing',requires:['inscription'],sets:['landingDecided'],
    body:'A chair returned with the landing. A carved name beneath the seat matches one of the people listed as missing in the landing’s register. A small brass plaque reads: “For those we promised to bring home.”\nMara wants to put the chair by the gate for visitors. Rowan recognises a guild oath carved beneath the seat. Keeping it on the landing would preserve an inscription that might help understand the old anchor work.\nMara needs a place to receive visitors. Rowan also needs somewhere to study the inscription without people walking through. The landing has room for one of those uses.',
    choices:[
      {id:'welcome',label:'Put the chair by the gate',preview:'The landing becomes a visitors’ room. Gain community trust and a first conversation about restitution.',sets:['welcomeLanding'],community:1,bond:{nell:1},result:'The first person to sit in it is a courier who does not want a job. She wants to know whether the guild still has her brother’s name. Mara brings the correction book, and an ordinary cup of tea. The plaque remains on the chair.'},
      {id:'remember',label:'Keep the oath where it was written',preview:'The landing becomes a memorial and study. Gain knowledge of small-anchor work; preserve its former residents’ traces.',sets:['memorialLanding'],knowledge:1,bond:{bryn:1},result:'Rowan reads the oath with the new house sight. It lists how the landing anchor was tested before each journey. Rowan copies the procedure at a desk beneath the plaque. The chair and its owner’s name remain on the landing.'},
    ],
  },
  {
    id:'release',title:'A door, not a debt',requires:['threshold','prepared'],sets:['gateOpen'],
    body:'The new connections hold without Rowan. Through the shutter, the Guest shows a dinner table. Halden is there, younger than Mara. The people who have died are seated beside the people who chose to leave.\n“I can keep this,” it says. It learned their voices from the rooms: their arguments, habits and grief. It wants every connected place drawn into one enduring interior. It can reproduce a farewell, but cannot understand why anyone would permit a departure.\nRowan asks Halden about the years outside. The figure begins their old conversation again. Someone who wanted to leave says they have always wanted to stay. The table is beautiful. Nobody at it can change their mind.\nRowan closes the shutter. Halden lived those years, raised Mara, and died. That life cannot be replaced by the house’s memory of it. The Guest has not been defeated everywhere; it has been denied a road through this house.\nThe binding can now be removed safely. Mara lays the inherited token on the table. “I have to go home tonight,” she says. “You can come with me. Or choose somewhere else.”',
    choices:[
      {id:'home',label:'Keep the house as a home with open visiting roads',preview:'Preserve the rooms and the agreements you made. Rowan may leave and return by choice. Walk left through the entrance gate to complete the campaign.',sets:['endingHome'],result:'Rowan’s name lifts from the anchor diagram. The returned rooms remain connected by their new agreements. A place that once kept them alive by keeping them captive becomes a home they can leave. The gate is open. The final step is yours.'},
      {id:'return',label:'Begin returning the borrowed rooms to their shores',preview:'The guild will share its work with the communities those rooms came from. Residents prepare new homes by consent. Walk left through the gate to finish.',sets:['endingReturn'],result:'The returned rooms will not vanish tonight. Their keepers set dates, pack records and decide which connections to keep. Rowan’s binding is removed now, without waiting for the work to end. Some good things take a long time. Freedom is no longer one of them. The gate is open.'},
    ],
  },
];

// These conversations unlock from actual campaign events and are answered once.
export const conversations = [
 {id:'brynStart',who:'bryn',requires:[],visits:1,title:'The latch on Bryn’s shield',body:'Bryn is tightening the iron straps on her shield. There is still a latch on its edge.\n“It was the workshop door,” she says. “Father fitted it. When the landlord cleared the place, it was the one thing too awkward to take away.”\nShe tests the straps with her full weight.\n“I’m not asking you to find him. I need paid work. But if his name turns up in those old records, tell me.”',choices:[
  {id:'honest',label:'“I’ll tell you what I find. I can’t promise more than that.”',preview:'Agree to share any evidence about her father. +1 trust.',bond:{bryn:1},result:'Bryn nods and goes back to the strap. “That’ll do.” She shows Rowan the small chisel mark beside the latch so they will recognise her father’s work.'},
  {id:'purpose',label:'“Help me repair the quarters. We’ll search the records after.”',preview:'Give Bryn a practical first job. +1 trust.',bond:{bryn:1},result:'Bryn finds a length of string and measures the beds. Two legs need replacing. She puts the shield beside the workbench and asks Mara where the spare timber is.'}
 ]},
 {id:'nellStart',who:'nell',requires:[],visits:1,title:'Nell checks the entrance road',body:'Nell brings back a muddy sketch of the road. One bridge has shifted since yesterday.\n“This bend leads to your gate if I’m carrying the token. Without it, I end up at the lime quarry.”\nShe has crossed out a shortcut. Rowan asks why.\n“My grandmother used it. She wouldn’t take guild officers that way. I was twelve; I thought she just disliked their horses.”\nNell rolls the map up. “I can get your parties out. I’d like to know I can get them back.”',choices:[
  {id:'invite',label:'“Ask the local keepers which bridges they’re using.”',preview:'Nell checks the route with people living nearby. +1 trust and community confidence.',bond:{nell:1},community:1,result:'Nell visits the mill and the ferry cottage. She returns with two corrected crossings and the ferryman’s price. She marks where a tired party can stop before the last hill.'},
  {id:'learn',label:'“Survey it yourself. Mark anything that has moved.”',preview:'Nell makes a measured route survey. +1 trust and research knowledge.',bond:{nell:1},knowledge:1,result:'Nell drives numbered stakes along the shifting road. Her second sketch records distances as well as turns. She keeps the first so tomorrow’s changes can be compared.'}
 ]},
 {id:'ivoStart',who:'ivo',requires:[],visits:1,title:'Ivo’s missing teacher',body:'Ivo spreads three letters on the table. They are all from Professor Ada Merrow. The last ends halfway through a calculation.\n“She stopped writing after she came here,” he says. “The college says she resigned. The letter doesn’t sound like a resignation.”\nHe asks whether he can examine Rowan’s binding. He thinks the symbols on the wall may be part of the same calculation.\n“I would start with a tracing. No spellwork. I need to know whether the walls change when you move.”',choices:[
  {id:'consent',label:'“Explain each test first. Then I’ll decide.”',preview:'Allow carefully explained tests of the binding. +1 trust.',bond:{ivo:1},result:'Ivo describes the tracing procedure and its risks before unpacking the ink. Rowan agrees to the first measurement. He writes the result beside Ada’s unfinished calculation.'},
  {id:'house',label:'“Start with the wall inscriptions. Leave my binding alone.”',preview:'Ivo investigates the house’s records first. +1 trust.',bond:{ivo:1},result:'Ivo moves his equipment to the corridor. He makes three copies of the inscription and finds a repeated symbol also used in Ada’s letter. He leaves Rowan’s part of the diagram blank.'}
 ]},
 {id:'brynAnchor',who:'bryn',requires:['anchor'],title:'Her father’s mason mark',body:'Bryn has scraped a patch of plaster from the service-room wall. Under it is the chisel mark she showed Rowan.\n“My father cut this. Same slip on the bottom stroke.”\nShe remembers his last letter: a repair job at a guild waystation, two weeks’ wages, home before winter. He never returned.\nA demolition notice in the old papers gives the waystation’s location. Bryn puts her finger on it. “I want to go there.”',choices:[
  {id:'promise',label:'“We’ll put a party together. You’re going with them.”',preview:'Support Bryn’s search. Her expedition requires two completed contracts. +1 trust.',bond:{bryn:1},result:'Bryn copies the waystation’s location into the contract book. She asks Mara for rope, lamps and someone who can recognise a failing roof.'},
  {id:'choice',label:'“Check the notice with the demolition crew before we set out.”',preview:'Support the same search with advance enquiries. +1 trust.',bond:{bryn:1},result:'Bryn writes to the demolition foreman. His reply confirms a sealed chamber beneath the waystation. He will leave its door alone until the guild party arrives.'}
 ]},
 {id:'nellShore',who:'nell',requires:['archiveSeal'],title:'The coats beside the trail',body:'Nell points out a line on Sera’s chart. “That’s Grandmother’s path. She told me never to put it on a guild map.”\nShe remembers coats hanging from trees: a blue sleeve at a fork, two grey cuffs at a crossing. She thought people had lost their washing.\n“They were directions. She was taking families around the customs post.”\nThere is a fresh shelter mark at the end of the chart. Nell wants to know who is still using the route.',choices:[
  {id:'lead',label:'“Take a party and check the shelters.”',preview:'Prepare Nell’s personal search. +1 trust.',bond:{nell:1},result:'Nell makes a route card for the party and a second copy for Mara. If they do not return, Mara will know where to send help.'},
  {id:'ask',label:'“Send word to the shelter keepers before we arrive.”',preview:'Prepare the search with the keepers’ help. +1 trust and community confidence.',bond:{nell:1},community:1,result:'Nell sends the message through the ferryman rather than the old guild post. A shelter keeper replies with a safe meeting place and asks the party to bring lamp oil.'}
 ]},
 {id:'ivoArchive',who:'ivo',requires:['archiveRead'],title:'Ada’s note in the archive',body:'Ivo has found Ada’s handwriting in an expedition margin. A witness reported voices from an unoccupied doorway. Ada wrote “No corroborating evidence” and allowed the joining test to continue.\n“She taught me to check every assumption,” he says. “She didn’t check this one.”\nA later supply record sends food to Ada at a monastery. It is the first evidence that she survived. Ivo asks to follow it.',choices:[
  {id:'human',label:'“Find her. Ask why she dismissed the warning.”',preview:'Support Ivo’s search for his teacher. +1 trust.',bond:{ivo:1},result:'Ivo copies the supply address. His letter asks Ada about the witness, the test and what happened afterward. He does not know whether she will reply.'},
  {id:'rigour',label:'“Take copies of both records. Check her account against them.”',preview:'Prepare the same search with documentary evidence. +1 trust and research knowledge.',bond:{ivo:1},knowledge:1,result:'Ivo packs the witness statement beside Ada’s note. He adds blank pages for her answer and asks another resident to check the dates.'}
 ]},
 {id:'brynAfter',who:'bryn',requires:['brynResolved'],title:'After the waystation',body:'Bryn has her father’s name in front of her: a rubbing or a piece of stone, depending on what the party brought back.\n“I’ve spent years thinking he might turn up,” she says. “Now I keep looking at the gate anyway.”\nShe rubs the latch on her shield with her thumb. “I’ll finish the repairs I took on. After that I need to decide what work I actually want.”\nShe asks Rowan what they would do if they could leave tomorrow.',choices:[
  {id:'ordinary',label:'“Walk into town. Buy breakfast somewhere else.”',preview:'Share an ordinary plan with Bryn. +1 trust.',bond:{bryn:1},result:'Bryn recommends a bakery by the bridge. She draws its sign on a scrap of timber so Rowan will recognise it.'},
  {id:'return',label:'“Spend a night away. See whether I miss this place.”',preview:'Tell Bryn what leaving would mean to Rowan. +1 trust.',bond:{bryn:1},result:'Bryn checks the latch on Rowan’s bedroom door. “You won’t lose the room for going away,” she says. She leaves the key on the table.'}
 ]},
 {id:'nellAfter',who:'nell',requires:['nellResolved'],title:'A route for Rowan',body:'Nell brings Rowan a small map. It begins at the gate and ends at the next market town. She has marked the difficult bridge and a decent place to stay.\n“No guild jobs on this one,” she says. “Just a road.”\nShe offers to walk the first stretch when Rowan is able to leave. She knows the road changes, and she would rather check it in person.',choices:[
  {id:'together',label:'“Walk with me until the road turns.”',preview:'Invite Nell to accompany Rowan’s first steps. +1 trust.',bond:{nell:1},sets:['nellWalk'],result:'Nell puts the map in Rowan’s coat pocket. She will bring a second copy and enough food for the morning.'},
  {id:'alone',label:'“I want to try the first stretch alone. Meet me in town.”',preview:'Arrange to meet Nell after Rowan leaves. +1 trust.',bond:{nell:1},result:'Nell circles the inn beside the market. She explains how to recognise the bridge if it shifts before they meet.'}
 ]},
 {id:'ivoAfter',who:'ivo',requires:['ivoResolved'],title:'Testing the replacement seal',body:'Ivo lays out the design brought back from the monastery. Its anchor frame is mechanical; nobody has to be bound into it.\nHe has underlined three failure cases. “If these two links break together, the whole frame can open. I haven’t solved that yet.”\nHe looks tired, but he has stopped hiding the rough calculations beneath his clean copy. He asks Rowan how to check the remaining risk.',choices:[
  {id:'test',label:'“Build a small frame and deliberately break the links.”',preview:'Test the failure cases at a safe scale. +1 trust and research knowledge.',bond:{ivo:1},knowledge:1,result:'Ivo constructs a table-sized frame. It fails on the second test. He writes down exactly how, then adds a separate shutoff before trying again.'},
  {id:'share',label:'“Send copies to the outside keepers. Ask them to check it.”',preview:'Have independent readers review the design. +1 trust and community confidence.',bond:{ivo:1},community:1,result:'Ivo sends the failure list with the drawings. A reply identifies a timing error in the shutoff. He corrects it and credits the keeper beside the calculation.'}
 ]},
 {id:'brynTruth',who:'bryn',requires:['truth'],title:'Repairing the rear stair',body:'Bryn has listened to Halden’s recording. She goes to the rear stair and stays there long enough for Mara to check on her.\n“You went back for the people on it,” she tells Rowan. “I can see where the first support broke.”\nShe can repair the stair. She cannot tell Rowan what it was like to be carried out of it. She asks whether Rowan wants to discuss the work now or come back another day.',choices:[
  {id:'future',label:'“Show me what needs replacing.”',preview:'Work through the repairs with Bryn. +1 trust.',bond:{bryn:1},result:'Bryn marks each damaged joint. Rowan holds the lamp while she measures. They stop when the oil runs low.'},
  {id:'space',label:'“Another day. Sit with me for a while.”',preview:'Defer the repair discussion. +1 trust.',bond:{bryn:1},result:'Bryn puts the measuring string away. They sit on the dry landing until Mara brings the evening meal.'}
 ]},
 {id:'nellTruth',who:'nell',requires:['truth'],title:'The map beyond the boundary',body:'Nell leaves a map of the valley on Rowan’s table. The house is marked with an ordinary building symbol.\n“I can plan the journey,” she says. “I can’t tell you when you’ll be ready for it.”\nShe offers to check the bridges while the replacement anchors are being prepared. She asks whether Rowan wants the details now.',choices:[
  {id:'future',label:'“Show me the route. Let’s plan it.”',preview:'Plan a journey outside with Nell. +1 trust.',bond:{nell:1},result:'Nell explains the two usable crossings and the ferryman’s hours. Rowan chooses which route to try first.'},
  {id:'space',label:'“Leave the map. I’ll look at it later.”',preview:'Keep the route available without planning today. +1 trust.',bond:{nell:1},result:'Nell leaves the map and a pencil. She will survey the crossings again before Rowan needs them.'}
 ]},
 {id:'ivoTruth',who:'ivo',requires:['truth'],title:'Removing Rowan from the diagram',body:'Ivo has compared Halden’s emergency binding with the replacement design. He points to the place where Rowan’s mind is used to correct the house’s unstable links.\n“The frame has to take over all of this before we disconnect you. Not most of it. All.”\nHe lists the tests still needed. He asks whether Rowan wants to go through them now.',choices:[
  {id:'future',label:'“Go through the tests with me.”',preview:'Review the replacement plan with Ivo. +1 trust.',bond:{ivo:1},result:'Ivo explains each test in order. Rowan asks him to repeat the shutoff procedure. He rewrites that section so a resident without magical training can use it.'},
  {id:'space',label:'“Tomorrow. I’ve heard enough for today.”',preview:'Defer the technical discussion. +1 trust.',bond:{ivo:1},result:'Ivo closes the diagram and leaves the test list on the table. He takes the apparatus back to the workroom.'}
 ]}
];

export function allChoiceNodes() {
  return [...houseChoices,...rooms.filter(r=>r.discovery).map(r=>r.discovery),...conversations];
}

// Old conversations retire when their question has been answered through play.
for(const n of conversations){
  if(n.id.endsWith('Start'))n.until=[n.who+'Resolved','truth'];
  if(['brynAnchor','nellShore','ivoArchive'].includes(n.id))n.until=[n.who+'Resolved'];
}
