// Authored campaign content. Requirements are public only after their parent lead is found.
export const chapters = [
  { id: 'survival', title: 'I · A wage and a wall' },
  { id: 'shore', title: 'II · Things brought home' },
  { id: 'accounts', title: 'III · The price of wonders' },
  { id: 'truth', title: 'IV · Who closed the door' },
  { id: 'preparation', title: 'V · A different kind of guild' },
  { id: 'freedom', title: 'VI · The road beyond' },
];

export const storyMissions = [
  {
    id: 'navigator',
    name: 'The captain on the stranded shore',
    days: 3,
    reward: 125,
    xp: 110,
    capacity: 3,
    requires: ['inscription'],
    sets: ['archiveSeal'],
    chapter: 'shore',
    desc: 'The landing register names Captain Sera Venn. The bow of her ship is in the cellar; its stern was stranded on the coast when the guild connections broke. Find Sera and ask what became of her passengers. Her navigation charts also record the archive’s last position.',
    checks: [
      { stat: 'agi', min: 8, label: 'Agility 8 finds a route over the broken sea wall' },
      { skill: 'water', label: 'Water breathing crosses the drowned road' },
    ],
    injuryDays: 3,
    arrival:
      'The stern of Sera’s ship rests above the beach on timber props. Washing hangs between its masts. Someone has planted beans in a lifeboat.\nSera recognises the guild token before anyone introduces themselves.\n“Thirty years,” she says. “You might have sent a letter.”\nShe listens to the explanation. Then she brings out a chart and an archive seal. The guild used her ship to evacuate passengers through the cellar doorway. When the connection broke, the bow vanished into the house. The stern and the people still aboard were left here.\n“Most made lives ashore. Some stayed angry. You’ll find I managed both.”\nA horn sounds from the beach. Three deckhands inspecting the reef are cut off by water surging through another damaged guild connection. The same surge is flooding Sera’s chart room. There is time to secure its fragile survey sheets or take the boat out to the reef. Sera has shore volunteers who can attempt the other task, but they cannot promise the same result.\nShe hands over the archive seal now. “Take this either way. The chart will tell you where to use it. But tell me what your people are doing before I send mine.”',
    choices: [
      {
        id: 'crew',
        label: 'Bring the deckhands home',
        preview:
          'Rescue all three deckhands. Recover the surviving part of Sera’s chart and the archive seal. Gain Sera’s trust and unlock community escort work.',
        sets: ['crewSaved'],
        bond: { nell: 1, bryn: 1 },
        community: 2,
        result:
          'The party rows out with Sera. The youngest deckhand cannot swim; he has tied himself to a marker post and is trying to pretend he is not frightened. They bring all three back before the water covers the reef.\nThe volunteers save only part of the chart. The archive’s position remains legible, but several smaller routes are lost.\nThat evening the rescued crew sit at the guild table in borrowed clothes. Bryn finds them dry boots. They argue about whose fault the boat was, then ask for seconds.\nSera sends a message offering escort work along the coast. Beneath the contract details she adds: “I’ll redraw what I can. Thank you for bringing them back.”',
      },
      {
        id: 'chart',
        label: 'Preserve the complete chart',
        preview:
          'Recover the complete chart, the archive seal and 25 extra gold. Sera and shore volunteers attempt the rescue; the deckhands survive but face a longer journey home. Gain survey knowledge for containment.',
        sets: ['completeChart'],
        bonus: 25,
        knowledge: 2,
        bond: { ivo: 1, nell: -1 },
        result:
          'The party secures the survey sheets while Sera takes a boat out with shore volunteers. They return to find her boat missing from the beach.\nThe complete chart identifies smaller surviving connections that will help design the replacement seal. Sera has left the agreed payment with the archive case: twenty-five gold more for recovering the full survey.\nHer letter arrives later. The deckhands survived, but the rescue boat lost its rudder. They had to shelter farther down the coast and make a difficult journey back.\n“Use those routes,” she writes. “I would like to think we bought something better than a tidy archive.”',
      },
    ],
  },
  {
    id: 'orchard',
    name: 'Winter in Alder',
    days: 3,
    reward: 155,
    xp: 120,
    capacity: 3,
    requires: ['archiveRead'],
    sets: ['gardenAnchor'],
    chapter: 'accounts',
    desc: 'The archive shows that the guild acquired Alder’s communal greenhouse through a disputed debt settlement. Its damaged heating spell still drains warmth from the village soil. Edda, the current keeper, can release the room’s anchor. She also needs help deciding where to establish a living root system that could repair the damage.',
    checks: [
      { skill: 'tracking', label: 'Tracking finds paths through the displaced roots' },
      { stat: 'end', min: 10, label: 'Endurance 10 withstands the cold pollen' },
    ],
    injuryDays: 3,
    arrival:
      'There are apples on the trees in Alder, small and hard beneath a skin of frost. Edda cuts one open with her pruning knife. The middle is black.\n“We used to send six carts to market,” she says. “My mother kept the figures. People think she exaggerated.”\nThe greenhouse once circulated warmth through the orchard. Its connection was severed while the heating spell was running. The buried network still draws heat from the soil, but the warmth now disappears into the stranded room.\nEdda has spent years cultivating a replacement root system. Established here, it could restore the orchard. Established in the guild’s recovered greenhouse, it could produce medicine and cuttings for future repairs. It is not strong enough to divide yet. Moving it to the house means Alder must wait for replacement plants.\nShe will release the greenhouse either way. The village has already rebuilt its seed store elsewhere.\n“I want the orchard back,” she says. “If you take the roots, tell me how long you expect us to wait. And put the money and the promise in writing. My mother was told to be patient too.”',
    choices: [
      {
        id: 'return',
        label: 'Leave the seed bank with Alder',
        preview:
          'Alder becomes an ally. Reclaimed greenhouse can become a hospice. Opens the neighbour-based final method.',
        sets: ['seedsReturned'],
        community: 2,
        bond: { nell: 1 },
        result:
          'Edda and the party plant the root system beneath the oldest tree. At first nothing happens. Then water begins to drip from the branches.\nShe keeps watching after everyone else has gone to eat.\nThe greenhouse returns to the guild without its rare plants. Edda sends trays of ordinary herbs and several cracked pots. There is space for beds between the benches.\nHer next letter reports that the frost has not returned. She offers to introduce Rowan to the neighbouring keepers when the guild is ready to replace its old connections.',
      },
      {
        id: 'study',
        label: 'Bring the root lattice to the house',
        preview:
          'Reclaimed greenhouse can become a botanical laboratory. Gain containment knowledge; Alder receives payment and a written promise of cuttings.',
        sets: ['rootsStudied'],
        knowledge: 2,
        bonus: 20,
        bond: { ivo: 1, nell: -1 },
        result:
          'Edda counts the payment twice. She writes the agreement herself: the first viable cuttings go to Alder, and the guild sends progress reports even if the work fails.\nAt the house, the roots settle into the greenhouse beds. They can support medicinal plants and respond to changes in the anchor frame. The research may help separate Rowan from the house.\nThe guild’s first measurements begin. Rowan enters the promised cuttings in the ledger beside the money received.\nEdda’s orchard is still cold. Their first letter home has to say so.',
      },
    ],
  },
  {
    id: 'lens',
    name: 'A light above the salt cliff',
    days: 3,
    reward: 165,
    xp: 125,
    capacity: 3,
    requires: ['archiveRead'],
    sets: ['lens'],
    chapter: 'accounts',
    desc: 'Elian, the old guild lookout, maintains a coastal watchtower fitted with the missing observatory lens. He heard the orders given during the evacuation. Recover the lens and ask him to explain the contradictory alarms.',
    checks: [
      { stat: 'str', min: 11, label: 'Strength 11 secures the falling counterweight' },
      { stat: 'int', min: 10, label: 'Intellect 10 aligns the tower safely' },
    ],
    injuryDays: 3,
    arrival:
      'Elian meets the party halfway up the tower stairs. He carries a lamp despite the daylight. His knees no longer trust the steps.\nThe enchanted lens is still searching for the guild observatory it once served. Its beam turns inland, away from the harbour that needs it.\n“I kept expecting somebody to fix that,” Elian says. “Then I became the somebody people expected.”\nHe recognises the token. On the night of the disaster, he relayed the order to open the evacuation doors. Later he heard Vey order them closed. Between those orders, the signal repeated instructions nobody had sent.\nHe has kept his watch log. Harbour families have asked for an explanation for years; he has given them numbers when they wanted a person to answer.\nRemoving the lens will darken the tower until an ordinary beacon is fitted. Elian can travel back to give his account himself, or remain here while the party carries his signed log and calibrated instruments.',
    choices: [
      {
        id: 'witness',
        label: 'Bring Elian home to testify',
        preview:
          'Gain a witness and community trust. Observatory becomes a listening station. Bryn values an answer given in person.',
        sets: ['elianHome'],
        community: 1,
        bond: { bryn: 1 },
        result:
          'Elian packs a change of clothes, his watch log and the worn alarm rope. He takes a long time locking the tower door.\nAt the guild, a harbour widow reads his list of missing ships. She corrects her husband’s name and asks why Elian waited so long.\nHe begins with the answer he has practised, stops, and says, “I was afraid you would believe I could have prevented it.”\nShe does not forgive him that afternoon. She agrees to return with her son. The lens is fitted in the observatory while Mara finds Elian a room.',
      },
      {
        id: 'record',
        label: 'Carry his record; let him keep watch',
        preview:
          'Gain calibrated instruments and containment knowledge. Observatory becomes a survey station. His signed account still enters the journal.',
        sets: ['calibratedLens'],
        knowledge: 2,
        bond: { ivo: 1 },
        result:
          'The party helps Elian install an ordinary harbour light before lifting out the enchanted lens. For the first time in years, its beam stays on the channel.\nHe signs his account and includes the dates when families asked to see it. He asks the party to tell them he will receive questions at the tower.\nAs they leave, he calls down the stairs: “If the boy from the rope-maker’s comes, send him up. I owe his mother an answer.”\nThe lens and instruments return to the guild. Elian remains on watch, with a signal people can use and an appointment he can no longer avoid.',
      },
    ],
  },
  {
    id: 'brynPast',
    name: 'The stones we leave standing',
    days: 2,
    reward: 95,
    xp: 100,
    capacity: 3,
    requires: ['anchor'],
    personal: 'bryn',
    visits: 2,
    sets: ['brynResolved'],
    chapter: 'shore',
    desc: 'Bryn finds her father’s mark on the service wall and a record of his waystation job. A recent demolition notice reports a chamber beneath that station. Search it for news of what happened after the severance.',
    checks: [
      { stat: 'str', min: 10, label: 'Strength 10 supports the failing lintel' },
      { skill: 'guard', label: 'Guard protects the demolition crew' },
    ],
    injuryDays: 3,
    arrival:
      'The foreman leads Bryn beneath the waystation. Her father’s mason mark is cut into the arch above a memorial chamber. Inside are the names of workers killed during the severance.\nBryn finds his name near the bottom. The letters are less neat than the rest: someone else finished the list.\nThe foreman shows her a pay entry. Her father survived the first collapse and returned to shore up the damaged waystation. He died there the following winter. No letter reached the sealed guild.\nBefore Bryn can ask more, a shout comes from the adjoining excavation. An apprentice is trapped beneath a fallen section of roof. The crew’s remaining support timbers are bracing the memorial chamber. Moving them will let the rescuers reach him, but the chamber and its carved wall will collapse. Keeping them in place preserves the memorial while a second rescue crew travels from town.\nBryn rests her shield against the wall. “How far is that crew?” she asks. She does not look at the names again.',
    choices: [
      {
        id: 'apprentice',
        label: 'Use the supports to reach the apprentice',
        preview:
          'Rescue the apprentice now; the memorial chamber collapses. Preserve the surviving names as rubbings. Gain Bryn’s trust and Steadfast (+1 Endurance).',
        bond: { bryn: 2 },
        trait: { id: 'bryn', name: 'Steadfast', stat: 'end' },
        community: 1,
        result:
          'Bryn makes the foreman show her where the timbers must go. She helps carry them.\nThe apprentice is pulled free before the memorial chamber falls. Afterward, she retrieves fragments from the rubble and takes rubbings of every name she can find. One corner of her father’s name is missing.\nAt home, she washes the dust out of her hair before supper. The apprentice’s family sends thanks. She reads their letter twice, then asks Mara for somewhere dry to lay the rubbings.\nThe shield stays beside her bed that night, its latch turned toward the wall.',
      },
      {
        id: 'memorial',
        label: 'Recover the memorial; call another rescue crew',
        preview:
          'Recover the memorial intact. A second crew rescues the apprentice later, but his leg is permanently injured. Bryn gains Keeper of names (+1 Strength).',
        bond: { bryn: 1 },
        trait: { id: 'bryn', name: 'Keeper of names', stat: 'str' },
        knowledge: 1,
        result:
          'The party lifts the carved stones onto a cart. Bryn keeps the last slab steady while the foreman sends for the second rescue crew.\nThey reach the apprentice at dusk. He survives, but the injury to his leg will be permanent.\nBryn visits him before leaving. He asks whether the memorial was worth saving. She tells him whose names it holds. Neither knows what to say after that.\nAt the guild she records the second crew’s delay and his injury alongside the recovered stones. She insists the report keep both.',
      },
    ],
  },
  {
    id: 'nellPast',
    name: 'The path her grandmother hid',
    days: 3,
    reward: 110,
    xp: 110,
    capacity: 3,
    requires: ['archiveSeal'],
    personal: 'nell',
    visits: 2,
    sets: ['nellResolved'],
    chapter: 'accounts',
    desc: 'Sera’s chart marks the shelter route Nell learned from her grandmother and used during the evacuation. Its current keepers may know what happened to the families she guided there.',
    checks: [
      { skill: 'tracking', label: 'Tracking locates the unmarked stepping stones' },
      { stat: 'agi', min: 10, label: 'Agility 10 crosses the ravine' },
    ],
    injuryDays: 3,
    arrival:
      'The shelter keeper meets Nell at a stand of alder trees. A blue sleeve is tied above the path. Nell touches its cuff as though recognising a friend.\nHer grandmother used these cloth markers to guide families around the guild customs post. Nell later used the same route during the evacuation. The keeper brings out a register: some of those families reached safety, some moved away, and several descendants still maintain the shelters.\n“She said someone would come back for the maps,” the keeper tells her. “We stopped knowing who she meant.”\nA trader has offered to buy the route and charge for passage. The keepers have refused. They ask whether Nell will help publish reliable directions or keep the map among trusted guides. A public route would reach more strangers, but it would also be easier for patrols to follow. Shelter addresses can remain private in either case.\nNell reads the register before answering. Her grandmother’s name is written beside a delivery of blankets.',
    choices: [
      {
        id: 'open',
        label: 'Publish the route with shelter keepers',
        preview:
          'Nell becomes a Wayfinder (+1 Agility), and community escorts open. Gain trust; shelter addresses stay protected.',
        sets: ['shelterRoute'],
        community: 2,
        bond: { nell: 2 },
        trait: { id: 'nell', name: 'Wayfinder', stat: 'agi' },
        result:
          'Nell works with the shelter keepers on a public route. They remove household addresses and arrange places where travellers can ask for a guide.\nShe draws the blue sleeve beside the first meeting point. The keeper laughs. “We use painted posts now. Coats keep getting stolen.”\nAt home Nell adds her grandmother’s name to the map credits. She writes to the ferry cottages about escort work and puts aside lamp oil for the next visit.',
      },
      {
        id: 'quiet',
        label: 'Keep a quiet guild passage',
        preview:
          'Nell becomes a Keeper of paths (+1 Intellect). Opens discreet salvage work. Refugees may still use it; the guild controls who receives the map.',
        sets: ['quietRoute'],
        knowledge: 1,
        bonus: 30,
        bond: { nell: 1 },
        trait: { id: 'nell', name: 'Keeper of paths', stat: 'int' },
        result:
          'Nell and the keepers retain the detailed map among the guides. The trader’s copy is destroyed, and the guild receives a route for discreet salvage and escorted travel.\nNell lists who holds each copy. She includes herself.\n“I’ll take people through,” she tells Rowan. “I won’t promise I can tell at a glance who deserves it. Grandmother got that wrong sometimes.”\nShe leaves the shelter register on the table. Tomorrow she means to write to the families whose names she recognises.',
      },
    ],
  },
  {
    id: 'ivoPast',
    name: 'A teacher’s last lesson',
    days: 3,
    reward: 120,
    xp: 120,
    capacity: 3,
    requires: ['archiveRead'],
    personal: 'ivo',
    visits: 2,
    sets: ['ivoResolved'],
    chapter: 'accounts',
    desc: 'An archive supply receipt is signed by Ada Merrow. Ivo’s former teacher survived the disaster and now maintains a damaged connection at a monastery. Find her and ask what happened to the warning she dismissed.',
    checks: [
      { skill: 'literacy', label: 'Magical literacy reads the safe seal sequence' },
      { stat: 'int', min: 11, label: 'Intellect 11 solves the reverse bell pattern' },
    ],
    injuryDays: 4,
    arrival:
      'Ivo recognises Ada’s voice before her face. She corrects the way he holds his lamp, then covers her mouth.\n“You haven’t changed,” she says.\nHe has spent thirty years inside a protective rune. She has spent them growing old.\nThe chalk circle around her chair supports a damaged threshold. Monastery staff bring meals and keep watch, but the existing design cannot release its operator safely. Ada has refused to abandon it before a replacement is ready.\nIvo shows her the witness statement. She remembers it. The repeated voices did not fit her model, so she treated the witness as unreliable. She also removed failed tests from the public report because she feared the funding would be withdrawn.\n“I taught you better than that,” she says. “Then I did it anyway.”\nHer revised calculations allow a living lattice or a slower mechanical seal to take over. Both can release her. She asks to remain at the monastery after the transfer, helping the people who have kept her alive. Ivo would like to bring her back to the guild. For once, he cannot make the decision by solving a calculation.',
    choices: [
      {
        id: 'home',
        label: 'Replace the seal and invite Ada home',
        preview:
          'Ada teaches a safe containment method. Ivo becomes a Questioner (+1 Intellect). Gain his trust; the teacher must answer for her work in public.',
        sets: ['adaHome'],
        knowledge: 2,
        bond: { ivo: 2 },
        trait: { id: 'ivo', name: 'Questioner', stat: 'int' },
        result:
          'They test the replacement through a full night. Ada watches it long after the last measurement is complete.\nWhen she steps out of the circle, Ivo offers his arm. She takes it without correcting him.\nAt the guild she asks for a desk and the original witness statement. She will answer questions about her report before teaching the replacement method.\nIvo puts her favourite cup beside the desk. She remembers it; he has been carrying it since the evacuation. Neither mentions how long that has been.',
      },
      {
        id: 'stay',
        label: 'Respect her choice; bring back her method',
        preview:
          'Ada remains by choice with supplies and a replacement keeper. Ivo becomes an Independent scholar (+1 Endurance). Recover the same essential method without bringing her home.',
        sets: ['adaStayed'],
        knowledge: 2,
        bond: { ivo: 1 },
        trait: { id: 'ivo', name: 'Independent scholar', stat: 'end' },
        result:
          'The replacement holds. Ada leaves the circle, then chooses a room overlooking the monastery garden. A trained relief keeper takes the next watch.\nIvo stays for breakfast. They disagree about a calculation and discover that neither particularly wants to stop talking.\nHe brings her revised method back to the guild, together with an account of her part in the experiment. Ada promises further answers. Her next letter contains a correction, a request for fresh ink and a question about whether he is sleeping enough.',
      },
    ],
  },
  {
    id: 'witness',
    name: 'The night they cut the road',
    days: 4,
    reward: 200,
    xp: 160,
    capacity: 3,
    requires: ['observatoryRead', 'gardenRead'],
    sets: ['truth'],
    chapter: 'truth',
    desc: 'The observatory has located the infirmary used during the evacuation. A medical recording may explain how Halden saved Rowan and what happened when the outer connections were cut. Its anchor is failing; retrieve the cylinder before the room is lost.',
    checks: [
      { stat: 'end', min: 12, label: 'Endurance 12 holds against the memory storm' },
      {
        skill: 'literacy',
        label: 'Magical literacy separates the record from the voice imitating it',
      },
    ],
    injuryDays: 4,
    arrival:
      'The recording begins with someone asking for clean cloth. Rowan knows the voice. For a moment they can almost smell Halden’s soap.\nThen an alarm drowns it out.\nVey asks whether the joining can still be stabilised. Halden tells her to come to the stair and count the injured. Rowan’s younger voice interrupts: “There are people above us.” Timber breaks. Someone calls their name.\nThe recording continues in the infirmary. Halden asks their assistant to hold a lamp. Rowan’s pulse is failing; moving them through another doorway will kill them. The surviving house magic is the only support Halden can reach in time.\n“Bind the pulse here,” they say. “Not to the destination. To the house.”\nTheir assistant asks what happens when Rowan wakes.\n“We replace it. As soon as the doors are safe.”\nVey orders the outer road severed. Halden protests that the infirmary will be cut off too. Vey says the false orders have already reached the evacuation doors. There is no time for another transfer.\n“Then put it in the record,” Halden says. “This is treatment. They have not agreed to hold your guild together.”\nThe cylinder ends with the sound of the doors closing.\nFor thirty years Rowan has remembered falling and then waking in an empty house. Now there is something between those moments: Halden working, frightened, still expecting to see them again.\nMara sits beside Rowan without opening the packet of letters. They have been there since she arrived. Today Rowan asks for the last one.\nHalden writes about a walk they could no longer manage, Mara’s work, and the places still on their old travel list. Then: “I wanted you to have a life. It did not have to be a life with me.”\nRowan folds the letter along its old crease. The recording has identified the binding that must be replaced. It has also answered a question Rowan had never managed to ask: they were not left behind because Halden stopped trying.',
    choices: [
      {
        id: 'publish',
        label: 'Publish the record, including Rowan’s binding',
        preview:
          'The guild accepts public accountability. More neighbours will help a consent-based reconnection. Rowan’s truth is made public by Rowan’s decision.',
        sets: ['truthPublished'],
        community: 2,
        result:
          'Rowan listens to the recording again before deciding to release it in full. Mara prepares a transcript and leaves space for questions.\nA former patient brings flowers for Halden. An Alder resident brings an unpaid claim. Rowan asks Mara to keep both.\nWhen a visitor calls the binding a sacrifice, Rowan corrects them. “I was unconscious. Halden saved me. Those aren’t the same thing.”\nThe accounts of the catastrophe become public. So does the problem the new guild is trying to solve.',
      },
      {
        id: 'private',
        label: 'Publish the collapse; keep Rowan’s injury private',
        preview:
          'The catastrophe remains public, but Rowan keeps control over their personal history. Gain a careful containment analysis from a limited circle of witnesses.',
        sets: ['truthPrivate'],
        knowledge: 2,
        result:
          'The published transcript records the orders, the injured passengers and the severance. Rowan’s medical treatment is retained for the people preparing the replacement.\nA visitor asks Bryn for the missing pages. She directs him to the public account and returns to her work.\nLater Rowan thanks her. “Wasn’t much,” she says. She has nevertheless moved the private folder into a cupboard that locks.',
      },
    ],
  },
  {
    id: 'covenant',
    name: 'A hundred small doors',
    days: 4,
    reward: 150,
    xp: 180,
    capacity: 3,
    cost: 90,
    requires: ['truth', 'gardenRead'],
    communityMin: 3,
    sets: ['prepared', 'covenantPrepared'],
    chapter: 'preparation',
    exclusive: 'prepared',
    desc: 'Travel to the connected settlements and arrange small anchors maintained by their keepers. Each must be able to close independently while the others support the house. Materials and travel cost 90 gold.',
    checks: [
      { stat: 'end', min: 11, label: 'Endurance 11 carries the anchor posts between settlements' },
      { skill: 'tracking', label: 'Tracking reaches each keeper before the agreed tide' },
    ],
    injuryDays: 4,
    arrival:
      'The keepers meet in the guild dining room. Sera arrives late and complains about the road; Edda has brought apple cuttings wrapped in damp cloth.\nThe proposed covenant uses many small connections instead of one living anchor. Each community maintains its own link and can close it. The others will carry the load while repairs are made. Before anyone agrees, they need to know who pays, who answers an alarm and where visitors sleep.\nRowan listens while they argue through the details. For years an unfamiliar voice in the house meant danger. These voices are disagreeing over tea.\nThey can establish a guild charter with visiting and withdrawal rights, or share authority through a commons of community keepers. Both plans can release Rowan. Neither works unless the people around the table commit to doing the work.',
    choices: [
      {
        id: 'charter',
        label: 'Write a charter for a welcoming guild',
        preview:
          'The house remains a guild, with enforceable visiting and withdrawal rights. Residents keep the home they built. Prepare the safe threshold.',
        sets: ['charter'],
        community: 1,
        result:
          'The charter sets out maintenance, visiting rights and the procedure for closing a connection. Sera makes them rewrite the repair deadlines. Edda asks for a copy she can read without magical training.\nDuring the test, one keeper shuts her door. Rowan feels the familiar tightening in their chest begin, then ease as the remaining anchors take the strain.\n“Again,” they ask.\nShe closes it again. The house holds. Mara writes down the time with a hand that is not quite steady.',
      },
      {
        id: 'commons',
        label: 'Let the house become a shared commons',
        preview:
          'Communities share authority over the connections. The guild becomes one resident among several. Prepare the same safe threshold.',
        sets: ['commons'],
        community: 2,
        result:
          'The communities appoint their keepers. Guild residents take their seats beside them rather than at the head of the table.\nThe first meeting runs past supper. Somebody reheats the soup. By the end, there are named people responsible for every connection and a procedure for changing those names.\nRowan’s part of the anchor diagram is crossed out for the test. The lamps stay lit.\nMara asks whether they want the old sheet kept. Rowan says yes. She folds it and puts it away.',
      },
    ],
  },
  {
    id: 'lattice',
    name: 'A house that can refuse',
    days: 4,
    reward: 150,
    xp: 180,
    capacity: 3,
    cost: 140,
    requires: ['truth', 'observatoryRead'],
    sets: ['prepared', 'latticePrepared'],
    chapter: 'preparation',
    exclusive: 'prepared',
    desc: 'Assemble Ada’s published mechanical seal and the observatory’s independent shutoff. This route remains available even without community allies or Ivo. It costs 140 gold; research allies reduce that to 100.',
    checks: [
      { stat: 'int', min: 12, label: 'Intellect 12 verifies the independent shutoff' },
      { skill: 'literacy', label: 'Magical literacy distinguishes the guest’s false commands' },
    ],
    injuryDays: 4,
    arrival:
      'Ada’s revised design divides the house connection into narrow channels, with shutters that close independently. No single opening is large enough for the Guest to complete its crossing. None requires a living mind to correct it.\nThe first test is conducted with Rowan’s binding still in place as a precaution. The second must show that the frame can take over the entire load.\nThe remaining decision is who holds the shutoff keys. A rotating pair of guild residents can maintain the system from within, or independent keepers can hold the keys outside. Neither key works alone. Rowan will not be required to hold either.',
    choices: [
      {
        id: 'residents',
        label: 'Give rotating residents the paired keys',
        preview:
          'Guild residents share responsibility; no single leader controls reconnection. Prepare a safe mechanical threshold.',
        sets: ['residentKeys'],
        knowledge: 1,
        result:
          'Bryn turns the first key. Mara waits for the marked interval and turns the second. The test lamp goes dark while the rest of the house stays lit.\nThey repeat it with one channel blocked. Then with a delayed signal. Rowan watches the diagram through every test.\nWhen the frame takes the whole load, they stand up expecting the floor to move beneath them. It does not.\nMara asks if they would like to sit down. Rowan laughs once, unexpectedly, and says they have been sitting down long enough.',
      },
      {
        id: 'outside',
        label: 'Entrust the keys to independent keepers',
        preview:
          'Outside witnesses can stop an unsafe joining. The guild accepts oversight. Prepare the same safe mechanical threshold.',
        sets: ['outsideKeys'],
        community: 1,
        result:
          'The outside keepers bring their keys back for the final test. One stays at the frame; the other watches from the entrance.\nA channel repeats Halden’s voice. The shutter closes before the sound reaches the adjoining room. The ordinary test signal then passes through a separate channel.\nRowan asks them to repeat both. The results hold.\nThe keepers record the settings and their next inspection date. Rowan can leave without taking the keys with them.',
      },
    ],
  },
];

export const laterContracts = [
  {
    id: 'marsh',
    name: 'Letters across the sleeping marsh',
    days: 2,
    reward: 100,
    xp: 85,
    capacity: 3,
    requires: ['archiveSeal'],
    desc: 'Coastal families have lost contact with relatives along the severed routes. Carry their letters through the marsh to the addresses confirmed by Sera’s latest chart. The lights on the water do not mark safe paths.',
    checks: [
      { stat: 'agi', min: 9, label: 'Agility 9 crosses the moving causeways' },
      { skill: 'tracking', label: 'Tracking recognises the human paths' },
    ],
    injuryDays: 3,
  },
  {
    id: 'escorts',
    name: 'Guests on the long way home',
    days: 2,
    reward: 105,
    xp: 90,
    capacity: 3,
    requires: ['anchor'],
    any: ['crewSaved', 'shelterRoute'],
    desc: 'Escort travellers between the recovered settlements. Some have not seen their old homes since the severance. Bring enough supplies for those who cannot keep the party’s usual pace.',
    checks: [
      { stat: 'end', min: 9, label: 'Endurance 9 carries supplies for the slowest traveller' },
      { skill: 'guard', label: 'Guard protects the group at the narrow bridge' },
    ],
    injuryDays: 3,
  },
  {
    id: 'salvage',
    name: 'Quiet cargo, careful questions',
    days: 3,
    reward: 155,
    xp: 110,
    capacity: 3,
    requires: ['quietRoute'],
    desc: 'Recover abandoned instruments along Nell’s quiet passage. Record their owners before sale or return, and reserve the agreed share for restitution. Nell’s guides can keep the cargo away from the disputed customs road.',
    checks: [
      { stat: 'agi', min: 11, label: 'Agility 11 moves fragile cargo through the ravine' },
      { skill: 'tracking', label: 'Tracking avoids the false trail' },
    ],
    injuryDays: 3,
  },
  {
    id: 'fragments',
    name: 'Survey of the wandering fragments',
    days: 3,
    reward: 180,
    xp: 130,
    capacity: 3,
    requires: ['observatoryRead'],
    desc: 'The observatory has identified smaller stranded rooms. Survey their connections, contact the residents and stabilise the routes that can be made safe. Mark unsafe approaches clearly for later search parties.',
    checks: [
      { stat: 'int', min: 11, label: 'Intellect 11 calibrates the portable anchor' },
      { skill: 'literacy', label: 'Magical literacy identifies the false doorway' },
    ],
    injuryDays: 4,
  },
];

export const rooms = [
  {
    id: 'library',
    name: 'RETURNED ARCHIVE',
    x: 1265,
    w: 290,
    anchor: 'archiveSeal',
    cost: 110,
    operational: 'library',
    read: 'archiveRead',
    requiresSkill: 'literacy',
    ruined: 'Sealed shelves; a door that reads its reader',
    restored: 'Names restored to the account',
    discovery: {
      id: 'archive',
      title: 'Margins in the official account',
      requires: ['library'],
      sets: ['archiveRead'],
      body: 'Rowan finds an acquisition form they recognise. They remember ruling the columns themselves.\nIt describes Alder’s greenhouse as a debt settlement. A letter attached to the back asks when the villagers can have it again. The letter was never entered in the catalogue.\nOther files contain objections to room removals, passenger lists labelled as volunteer expeditions, and testimony from people detained after asking for their property back.\nA reader brings Rowan the original report of voices from the experimental doorway. The witness describes the same words repeating after everyone present has stopped speaking. Ada marked the account unverified. The test was authorised anyway.\nTwo addresses give them somewhere to begin: Edda’s village in Alder and Elian’s coastal watchtower. The greenhouse and observatory lens can be recovered there.\nBefore parties leave, Rowan must decide how visitors can examine the records: open access with vulnerable names protected, or a research team checking the accounts before publication. Either way, the originals must remain intact.',
      choices: [
        {
          id: 'open',
          label: 'Open the records with protected names',
          preview:
            'Visitors can challenge the guild’s history; vulnerable witnesses choose when to be named. Gain community trust.',
          sets: ['openArchive'],
          community: 2,
          bond: { nell: 1 },
          result:
            'Mara lays the records on the long table and opens a correction book. A visitor recognises her father among the passengers. Another asks that her statement stay private until she has spoken to her family.\nRowan looks up the original forms while the visitors explain them. Some corrections are straightforward. Others will take further evidence.\nThe addresses in Alder and at the watchtower are copied into the expedition ledger. Rowan stays to hear the next account.',
        },
        {
          id: 'study',
          label: 'Build a careful research archive',
          preview:
            'A small team verifies accounts before publication. Gain containment knowledge; uncensored originals remain preserved.',
          sets: ['researchArchive'],
          knowledge: 2,
          bond: { ivo: 1 },
          result:
            'The research team labels each account with its source and what remains unconfirmed. Rowan adds the letters omitted from the old catalogue.\nThe warning about repeated voices is copied for expedition leaders. Visitors can submit corrections, and the original documents remain available to the verification team.\nThey mark Alder and the watchtower for investigation. A reader starts to write “empty destination” on the expedition map, stops, and replaces it with “destination unknown”.',
        },
      ],
    },
  },
  {
    id: 'garden',
    name: 'RECLAIMED GREENHOUSE',
    x: 1555,
    w: 290,
    anchor: 'gardenAnchor',
    cost: 150,
    operational: 'garden',
    read: 'gardenRead',
    ruined: 'Roots from another season',
    restored: 'A room learning what to give',
    discovery: {
      id: 'gardenUse',
      title: 'What should grow here?',
      requires: ['garden'],
      sets: ['gardenRead'],
      body: 'With its damaged heating circuit disconnected, the greenhouse is safe to use. Rainwater beads on the glass, and the old growing benches still bear the marks of village tools.\nThe guild can fit beds and grow ordinary medicinal herbs, using the help offered by Alder. Alternatively, it can build a botanical laboratory to study roots that respond to the house’s magic and help develop the replacement seal.\nBoth are useful. The house needs to care for the people coming back injured, and Rowan needs a way to leave. The benches and floor space must be arranged for one main purpose.',
      choices: [
        {
          id: 'hospice',
          label: 'Make room for beds and ordinary medicine',
          requires: ['seedsReturned'],
          preview:
            'A hospice shortens future expedition injuries by one day. Alder’s keepers can help the final covenant.',
          sets: ['hospice'],
          community: 1,
          bond: { bryn: 1 },
          result:
            'Bryn builds beds from the cleared specimen cases. Edda’s herbs go into labelled pots where patients can reach the windows.\nThe first injured adventurer complains that the blankets itch. Mara finds different ones. Someone else asks whether recovery time will cost them their room. Rowan says no.\nThat evening the greenhouse windows remain lit after the workshops have closed.',
        },
        {
          id: 'laboratory',
          label: 'Grow a lattice that can close a threshold',
          requires: ['rootsStudied'],
          preview:
            'A botanical laboratory reduces containment preparation costs. Rowan accepts the duty to share future cuttings with Alder.',
          sets: ['laboratory'],
          knowledge: 2,
          bond: { ivo: 1 },
          result:
            'The researchers fit an anchor frame among the growing beds. The roots close around it when the false signal begins, then loosen when the ordinary test signal returns.\nThey send the measurements to Edda. The first viable apple cuttings go back with them, as promised.\nRowan checks the receipt when it arrives. Alder has planted them beside the oldest tree. The repayment has begun; it is not finished.',
        },
      ],
    },
  },
  {
    id: 'observatory',
    name: 'RECONNECTED OBSERVATORY',
    x: 1845,
    w: 290,
    anchor: 'lens',
    cost: 180,
    operational: 'observatory',
    read: 'observatoryRead',
    ruined: 'A blind dome above a borrowed sky',
    restored: 'The sky is a map of missing rooms',
    discovery: {
      id: 'observatoryUse',
      title: 'Lights with someone behind them',
      requires: ['observatory'],
      sets: ['observatoryRead'],
      body: 'The lens brings distant anchor sites into focus. Each point of light resolves into a room: tables, windows, an unmade bed. Several contain moving figures.\nThe infirmary appears beneath a red dawn. Its lamp fades and returns at uneven intervals. The pattern is checked against the lens markings: its connection is failing.\nAnother signal comes from the great threshold. It is steady, waiting where the old warning says no one should open a door.\nThe observatory can be arranged to contact surviving residents or measure the connections before attempting travel. Either approach can locate the infirmary. Rowan looks at its narrow bed and remembers Halden pulling the curtains for a patient to sleep.',
      choices: [
        {
          id: 'listen',
          label: 'Ask who is still there',
          preview:
            'Listening station strengthens community ties. Rowan gains anchor sight; the infirmary’s final record becomes reachable.',
          community: 1,
          sets: ['listeningStation'],
          result:
            'The first messages receive no reply. Then a kitchen window lights up, and somebody complains that the signal is disturbing supper.\nOther answers follow: a watchkeeper, a stranded household, a voice asking whether the road is safe. Each is checked against known records before a route is marked.\nThe infirmary transmits its old station name and the identification of Halden’s recording cylinder. Nobody answers from inside. Rowan asks for its position to be written down.',
        },
        {
          id: 'measure',
          label: 'Measure which connections are safe',
          preview:
            'Survey station strengthens containment knowledge. Rowan gains the same anchor sight and infirmary lead.',
          knowledge: 2,
          sets: ['surveyStation'],
          result:
            'The measurements show that the nearest connection is not necessarily the safest. The infirmary’s direct route passes through the great threshold; a smaller, slower approach avoids it.\nRowan marks that approach. The room’s intermittent signal identifies a medical recording, made during the evacuation.\nThey ask for the route to be checked once more before a party is sent.',
        },
      ],
    },
  },
  {
    id: 'threshold',
    name: 'THRESHOLD CHAMBER',
    x: 2135,
    w: 290,
    anchor: 'truth',
    cost: 220,
    operational: 'threshold',
    read: 'release',
    ruined: 'The road that was deliberately cut',
    restored: 'A door with the right to stay closed',
  },
];

export const houseChoices = [
  {
    id: 'landingPurpose',
    title: 'The empty chair on the landing',
    requires: ['inscription'],
    sets: ['landingDecided'],
    body: 'The landing chair has a patched seat and a name carved underneath: Anwen. The same name appears in the list of residents displaced by guild acquisitions. Rowan remembers telling someone that personal names did not belong in an official room catalogue.\nA plaque above the chair reads, “For those we promised to bring home.” Beside it, the anchor’s original test procedure is cut into the timber.\nMara proposes fitting the small landing as a visitors’ room, with somewhere to sit while claims and letters are heard. Rowan could instead use it as a quiet memorial and study, preserving the exposed anchor work for examination. Fitting either use will take the available space and repair materials.\nThe chair and Anwen’s name will remain in either arrangement.',
    choices: [
      {
        id: 'welcome',
        label: 'Put the chair by the gate',
        preview:
          'The landing becomes a visitors’ room. Gain community trust and a first conversation about restitution.',
        sets: ['welcomeLanding'],
        community: 1,
        bond: { nell: 1 },
        result:
          'The chair is placed near the gate. Its first visitor is a courier asking about her missing brother.\nMara brings tea and the register. The courier sits forward while Rowan checks the spelling. When they find the entry, she asks for a copy to take to her mother.\nAfter she leaves, Rowan looks under the seat again. They write Anwen’s name on a label where nobody needs to turn the chair over to see it.',
      },
      {
        id: 'remember',
        label: 'Keep the oath where it was written',
        preview:
          'The landing becomes a memorial and study. Gain knowledge of small-anchor work; preserve its former residents’ traces.',
        sets: ['memorialLanding'],
        knowledge: 1,
        bond: { bryn: 1 },
        result:
          'The landing is fitted with a desk and a place to keep witness accounts. Rowan copies the anchor tests from the exposed timber; the sequence explains how a small connection can be closed without pulling the others apart.\nAnwen’s name is written beside the chair in the room register. There is a blank space for information about her family.\nRowan leaves a pencil there. Someone may know more than the old catalogue did.',
      },
    ],
  },
  {
    id: 'release',
    title: 'A door, not a debt',
    requires: ['threshold', 'prepared'],
    sets: ['gateOpen'],
    body: 'The replacement holds through its last test. Rowan can be disconnected.\nBefore the shutters close, the Guest opens a view into the old dining room. Halden sits beside Rowan’s usual chair. Other people are there: friends who died, companions who left. The cups are the ones Rowan remembers.\n“You can sit down,” Halden says.\nRowan asks what Mara was like as a child.\n“You can sit down,” Halden says again, with the same fond impatience.\nThe Guest speaks through the room. It has learned voices from the connected places: words said often, arguments repeated, names called into empty passages. It can keep these traces together. It wants the house to open every surviving connection so nothing can be separated from it again.\nSomeone at the table who had wanted to leave says they never wished to go. Rowan watches Halden lift a cup. The handle turns toward their old injured hand, the hand that only began to shake years after this room was cut off.\nThe Guest has Halden’s remembered voice. It does not have the life Halden went on to live.\nRowan asks for the shutter to be closed. For a moment they are angry with everyone who is ready to do it. Then the table disappears.\nMara waits. She does not say it was only an imitation.\nWhen Rowan can speak, they ask whether the removal will hurt. Mara goes over the procedure with them again.\nAfterward, the house’s rooms can remain connected under their new agreements, or begin returning to their communities. Neither decision delays Rowan’s freedom. Mara has a room ready at her own home if they want it. They can also choose another destination.',
    choices: [
      {
        id: 'home',
        label: 'Keep the house as a home with open visiting roads',
        preview:
          'Preserve the rooms and the agreements you made. Rowan may leave and return by choice. Walk left through the entrance gate to complete the campaign.',
        sets: ['endingHome'],
        result:
          'The replacement takes the load. Rowan feels the old pull fade, waits for it to return, and finally lets go of the table edge.\nThe rooms remain under the agreements made with their keepers. There is work tomorrow, but Rowan does not have to be here for it.\nMara finds their coat. The old travel list is still folded in the pocket. The gate is open.',
      },
      {
        id: 'return',
        label: 'Begin returning the borrowed rooms to their shores',
        preview:
          'The guild will share its work with the communities those rooms came from. Residents prepare new homes by consent. Walk left through the gate to finish.',
        sets: ['endingReturn'],
        result:
          'The replacement takes the load, and Rowan’s binding is removed.\nThe keepers set dates for returning the rooms. Families need somewhere to receive them; records and patients must travel safely. It will take time, and Mara begins a list of what must happen first.\nRowan starts to offer help with the first item. Mara asks whether they would rather see the road today.\nTheir coat is by the door. The rooms can be returned without waiting for Rowan, and Rowan can leave without waiting for the rooms.',
      },
    ],
  },
];

// These conversations unlock from actual campaign events and are answered once.
export const conversations = [
  {
    id: 'brynStart',
    who: 'bryn',
    requires: [],
    visits: 1,
    title: 'The latch on Bryn’s shield',
    body: 'Bryn is trying to remove a splinter from her shield. There is still a latch on one edge.\n“Workshop door,” she says. “Father made it. I was carrying it to the stair when the ward caught me. He’d have been furious about these straps.”\nShe tests them anyway.\nMara has told her the year. Bryn asks again, as though a second answer might differ.\n“He was working at the waystation. I need to know if he came back.” She scrapes at the splinter. “Until we find something, I can take jobs. I’m better with a hammer than with waiting.”',
    choices: [
      {
        id: 'honest',
        label: '“I’ll tell you what I find. I can’t promise more than that.”',
        preview: 'Agree to share any evidence about her father. +1 trust.',
        bond: { bryn: 1 },
        result:
          'Bryn points out the small chisel mark beside the latch. “That’s his. He tried to teach me to make it neatly. Mine always looks like a bent nail.”\nRowan promises to look for it in the records. She goes back to the strap, working more slowly.',
      },
      {
        id: 'purpose',
        label: '“Help me repair the quarters. We’ll search the records after.”',
        preview: 'Give Bryn a practical first job. +1 trust.',
        bond: { bryn: 1 },
        result:
          'Bryn measures the damaged beds and asks Mara for spare timber. She makes a list short enough to afford.\n“We’ll start with somewhere to sleep,” she says. “I can think about the rest after that.”',
      },
    ],
  },
  {
    id: 'nellStart',
    who: 'nell',
    requires: [],
    visits: 1,
    title: 'Nell checks the entrance road',
    body: 'Nell puts a muddy road sketch on the table. The token leads her to the gate; without it, the same bend takes her toward the quarry.\n“I used to know every stone here,” she says. “The ferry cottage is painted yellow now. I nearly knocked at the shed.”\nShe has crossed out a shortcut her grandmother kept off guild maps. Nell used it to move families during the evacuation. She does not know which shelters still exist.\n“I can guide your parties out. Before I promise the way back, I should ask who’s living on it.”',
    choices: [
      {
        id: 'invite',
        label: '“Ask the local keepers which bridges they’re using.”',
        preview:
          'Nell checks the route with people living nearby. +1 trust and community confidence.',
        bond: { nell: 1 },
        community: 1,
        result:
          'The ferryman turns out to be the son of the man Nell remembers. He charges more and rows faster. She tells him both.\nAt the mill she learns which crossings have moved and where tired travellers can stay. She returns with corrected directions and a promise to bring news after the next expedition.',
      },
      {
        id: 'learn',
        label: '“Survey it yourself. Mark anything that has moved.”',
        preview: 'Nell makes a measured route survey. +1 trust and research knowledge.',
        bond: { nell: 1 },
        knowledge: 1,
        result:
          'Nell measures the road twice and drives numbered stakes beside the shifting turns. She keeps yesterday’s sketch instead of rubbing it out.\n“If the bridge moves again, I want to know how much. I’m tired of being surprised by bridges.”',
      },
    ],
  },
  {
    id: 'ivoStart',
    who: 'ivo',
    requires: [],
    visits: 1,
    title: 'Ivo’s missing teacher',
    body: 'Ivo has found a page from Ada’s lessons. His last calculation ends halfway through a line.\n“She said she would check it after the joining,” he says. “I was worried she’d notice I’d borrowed her good ink.”\nHe looks at the date Mara has written beside the page. “She’ll be old now. If she’s alive.”\nThe same symbols appear around Rowan’s boundary. Ivo asks to trace them while Rowan moves between two marked points. No spells, just a measurement.\nHe explains the procedure too quickly, catches himself and starts again. “You can tell me to stop. I mean it. I haven’t done this before.”',
    choices: [
      {
        id: 'consent',
        label: '“Explain each test first. Then I’ll decide.”',
        preview: 'Allow carefully explained tests of the binding. +1 trust.',
        bond: { ivo: 1 },
        result:
          'Rowan agrees after Ivo has explained each step. He marks where they will stand and checks that the tracing does not change the boundary.\nWhen he spills the ink, he is more embarrassed than Rowan thinks the occasion warrants. They remember Ada’s good ink too.',
      },
      {
        id: 'house',
        label: '“Start with the wall inscriptions. Leave my binding alone.”',
        preview: 'Ivo investigates the house’s records first. +1 trust.',
        bond: { ivo: 1 },
        result:
          'Ivo takes his equipment into the corridor. He copies the wall inscriptions and marks the repeated symbol from Ada’s lesson.\nLater he brings Rowan the page to look at, without asking them to stand inside anything.',
      },
    ],
  },
  {
    id: 'brynAnchor',
    who: 'bryn',
    requires: ['anchor'],
    title: 'Her father’s mason mark',
    body: 'Bryn has found her father’s mark beneath the service-room plaster.\n“He cut this before the evacuation. Look at the bottom stroke.”\nThe ledger lists his next job: repairs at a guild waystation, two weeks’ wages. Bryn remembers his promise to visit afterward.\nA recent demolition notice has reached Mara. Workers have found a sealed chamber beneath the same station.\nBryn lays the old job entry beside the notice. “If there’s a letter, it will be down there. If there isn’t—well. I still want to go.”',
    choices: [
      {
        id: 'promise',
        label: '“We’ll put a party together. You’re going with them.”',
        preview:
          'Support Bryn’s search. Her expedition requires two completed contracts. +1 trust.',
        bond: { bryn: 1 },
        result:
          'Bryn enters the location in the contract book. She asks for rope, lamps and another person who knows bad stonework.\nShe adds an extra length of rope after looking at the inventory. Rowan does not ask why.',
      },
      {
        id: 'choice',
        label: '“Check the notice with the demolition crew before we set out.”',
        preview: 'Support the same search with advance enquiries. +1 trust.',
        bond: { bryn: 1 },
        result:
          'Bryn writes to the foreman herself. His reply confirms the chamber and promises to leave it alone until the guild party arrives.\nShe keeps the envelope. It is the first letter addressed to her since she woke.',
      },
    ],
  },
  {
    id: 'nellShore',
    who: 'nell',
    requires: ['archiveSeal'],
    title: 'The coats beside the trail',
    body: 'Nell recognises a path on Sera’s chart. There is a shelter mark where her grandmother used to tie a blue sleeve to a branch.\n“She taught me the route when I was twelve. Told me never to show it to an officer. I thought she was being difficult. She usually was.”\nNell later guided families through it herself. The mark on Sera’s chart is newer than the severance.\n“Someone kept it going. I’d like to know who. And whether the people I sent there arrived.”',
    choices: [
      {
        id: 'lead',
        label: '“Take a party and check the shelters.”',
        preview: 'Prepare Nell’s personal search. +1 trust.',
        bond: { nell: 1 },
        result:
          'Nell makes a route card for the party and leaves a copy with Mara. She circles the last known shelter and writes when to send a search party.\n“Don’t wait for us to become a story,” she says. “Come looking.”',
      },
      {
        id: 'ask',
        label: '“Send word to the shelter keepers before we arrive.”',
        preview: 'Prepare the search with the keepers’ help. +1 trust and community confidence.',
        bond: { nell: 1 },
        community: 1,
        result:
          'Nell sends a message through the ferry cottage. A shelter keeper replies with a safe meeting place and a request for lamp oil.\nBelow it is a name from Nell’s old list. She sits down to write a second letter before packing.',
      },
    ],
  },
  {
    id: 'ivoArchive',
    who: 'ivo',
    requires: ['archiveRead'],
    title: 'Ada’s note in the archive',
    body: 'Ivo has laid two pages beside one another. A witness reported repeated voices from the experimental doorway. Ada wrote that the account did not justify suspending the test.\n“She made me check every line,” he says. “I used to hate her for it.”\nHe shows Rowan a later supply receipt addressed to Ada at a monastery. It proves she survived the first evacuation.\nHe wants to ask about the witness. He also wants to see her. He is annoyed that these do not feel like the same errand.',
    choices: [
      {
        id: 'human',
        label: '“Find her. Ask why she dismissed the warning.”',
        preview: 'Support Ivo’s search for his teacher. +1 trust.',
        bond: { ivo: 1 },
        result:
          'Ivo writes to Ada at the supply address. His first page asks about the test; his second tells her he is alive.\nHe changes their order before sending them.',
      },
      {
        id: 'rigour',
        label: '“Take copies of both records. Check her account against them.”',
        preview:
          'Prepare the same search with documentary evidence. +1 trust and research knowledge.',
        bond: { ivo: 1 },
        knowledge: 1,
        result:
          'Ivo packs both reports and asks Mara to check their dates. He leaves blank sheets for Ada’s answer.\nAt the last moment he adds the unfinished lesson page. He has questions about that too.',
      },
    ],
  },
  {
    id: 'brynAfter',
    who: 'bryn',
    requires: ['brynResolved'],
    title: 'After the waystation',
    body: 'Bryn has brought her father’s name to the workbench, on the stone or rubbing recovered at the waystation.\n“He died after I was trapped,” she says. “All this time I’ve been remembering someone who still had another winter.”\nShe presses the latch on her shield until it clicks.\n“I used to think finding out would settle me. It hasn’t.”\nThere are repairs she has promised to finish. After that she would like to build a workshop of her own. She asks Rowan what they would do if the gate opened tomorrow.\n“Something you want,” she adds. “Not something the house needs.”',
    choices: [
      {
        id: 'ordinary',
        label: '“Walk into town. Buy breakfast somewhere else.”',
        preview: 'Share an ordinary plan with Bryn. +1 trust.',
        bond: { bryn: 1 },
        result:
          'Bryn has heard of a bakery by the bridge. She draws its sign on a scrap of wood for Rowan.\n“Bring me one of the apple things. If they still make them. I’ve missed thirty years of pastry.”',
      },
      {
        id: 'return',
        label: '“Spend a night away. See whether I miss this place.”',
        preview: 'Tell Bryn what leaving would mean to Rowan. +1 trust.',
        bond: { bryn: 1 },
        result:
          'Bryn checks Rowan’s bedroom latch and leaves the key on the table.\n“You can come back. I’m not giving your room away the minute you reach the road.”\nShe looks at her shield. “Mine either, I hope.”',
      },
    ],
  },
  {
    id: 'nellAfter',
    who: 'nell',
    requires: ['nellResolved'],
    title: 'A route for Rowan',
    body: 'Nell has drawn a map from the gate to the market town. It has an inn, a bridge and a bakery. No contracts.\n“I checked the beds at the inn,” she says. “One squeaks. I’ve marked the other.”\nShe offers to walk with Rowan when the binding is removed. If Rowan would rather go alone, she can meet them farther on.\n“I’ll be nervous either way,” she admits. “I’ve started thinking of you as part of the furniture. Sorry. Better furniture than most of this place.”',
    choices: [
      {
        id: 'together',
        label: '“Walk with me until the road turns.”',
        preview: 'Invite Nell to accompany Rowan’s first steps. +1 trust.',
        bond: { nell: 1 },
        sets: ['nellWalk'],
        result:
          'Nell slips the map into Rowan’s coat pocket. She promises to bring food and complains that they will probably leave too late.\nRowan asks how early she means. The answer makes them reconsider the inn.',
      },
      {
        id: 'alone',
        label: '“I want to try the first stretch alone. Meet me in town.”',
        preview: 'Arrange to meet Nell after Rowan leaves. +1 trust.',
        bond: { nell: 1 },
        result:
          'Nell circles the inn and writes its name beneath the map. She will wait there rather than at the gate.\n“If you get lost, ask someone. It’s embarrassing for about a minute. I do it constantly.”',
      },
    ],
  },
  {
    id: 'ivoAfter',
    who: 'ivo',
    requires: ['ivoResolved'],
    title: 'Testing the replacement seal',
    body: 'Ivo shows Rowan the replacement frame. The drawing has crossed-out lines and three unresolved failure cases.\n“I wanted to bring you something finished,” he says. “I kept finding reasons it wasn’t.”\nIf two channels fail together, the frame might open too wide. A separate shutoff could prevent that, but it needs testing. Alternatively, outside keepers could review the timing before construction.\nHe has left the rough calculations visible. Rowan can finally see how much he has changed since Ada’s perfect lesson pages.',
    choices: [
      {
        id: 'test',
        label: '“Build a small frame and deliberately break the links.”',
        preview: 'Test the failure cases at a safe scale. +1 trust and research knowledge.',
        bond: { ivo: 1 },
        knowledge: 1,
        result:
          'The model fails on the second test. Ivo swears, checks whether Rowan heard, and swears again.\nHe records the failure and adds a separate shutoff. The next test stops safely. He keeps both results.',
      },
      {
        id: 'share',
        label: '“Send copies to the outside keepers. Ask them to check it.”',
        preview: 'Have independent readers review the design. +1 trust and community confidence.',
        bond: { ivo: 1 },
        community: 1,
        result:
          'Ivo sends the drawings and failure list to outside keepers. A reply catches a timing error he missed.\nHe reads it twice before correcting the frame. Beside the change he writes the keeper’s name. Then he writes back to thank them.',
      },
    ],
  },
  {
    id: 'brynTruth',
    who: 'bryn',
    requires: ['truth'],
    title: 'Repairing the rear stair',
    body: 'Bryn stands at the rear stair after hearing the recording. She has brought a measuring string but has not unwound it.\n“I remember you coming back up,” she tells Rowan. “I thought you’d forgotten something.”\nThe broken supports can be replaced. Bryn asks whether Rowan wants to go through the work or sit somewhere else today.\nShe does not ask them to tell her how the fall felt.',
    choices: [
      {
        id: 'future',
        label: '“Show me what needs replacing.”',
        preview: 'Work through the repairs with Bryn. +1 trust.',
        bond: { bryn: 1 },
        result:
          'Rowan holds the lamp while Bryn measures. One joint is worse than either expected; another can be saved.\nThey stop when the lamp runs low. Bryn leaves the string where she can find it tomorrow.',
      },
      {
        id: 'space',
        label: '“Another day. Sit with me for a while.”',
        preview: 'Defer the repair discussion. +1 trust.',
        bond: { bryn: 1 },
        result:
          'Bryn puts the measuring string away. They sit on the dry landing until Mara calls them to eat.\nOn the way back, Bryn talks about the bakery. Rowan is grateful enough to let her repeat herself.',
      },
    ],
  },
  {
    id: 'nellTruth',
    who: 'nell',
    requires: ['truth'],
    title: 'The map beyond the boundary',
    body: 'Nell brings a map of the valley. The guild is marked like any other building.\nRowan notices the ordinary symbol before the roads.\n“I thought you might like that,” Nell says. “The map doesn’t need to know what happened inside.”\nShe can explain the journey now or leave it for another day. She will check the bridges again before Rowan leaves; yesterday’s good crossing is not always tomorrow’s.',
    choices: [
      {
        id: 'future',
        label: '“Show me the route. Let’s plan it.”',
        preview: 'Plan a journey outside with Nell. +1 trust.',
        bond: { nell: 1 },
        result:
          'Nell explains the ferryman’s hours and the two usable crossings. Rowan chooses a route, then changes their mind.\nNell sharpens the pencil and lets them change it again.',
      },
      {
        id: 'space',
        label: '“Leave the map. I’ll look at it later.”',
        preview: 'Keep the route available without planning today. +1 trust.',
        bond: { nell: 1 },
        result:
          'Nell leaves the map folded to the valley rather than the whole region. She puts a pencil beside it.\n“One day’s enough to start with,” she says.',
      },
    ],
  },
  {
    id: 'ivoTruth',
    who: 'ivo',
    requires: ['truth'],
    title: 'Removing Rowan from the diagram',
    body: 'Ivo points to Rowan’s part of Halden’s diagram. Their mind has been correcting small instabilities in the house connection, continuously, even while they sleep.\n“You weren’t failing to find the way out,” he says. “There wasn’t a safe one.”\nThe replacement must perform all those corrections before the binding is removed. He has a test list and a shutoff procedure written for someone without magical training.\nHe asks whether Rowan wants to see them now. This time he waits for the answer before spreading out the papers.',
    choices: [
      {
        id: 'future',
        label: '“Go through the tests with me.”',
        preview: 'Review the replacement plan with Ivo. +1 trust.',
        bond: { ivo: 1 },
        result:
          'Ivo explains the tests in order. Rowan asks what happens if the operator freezes or hears a familiar voice.\nHe adds those questions to the list. They practise the shutoff twice, without connecting the frame.',
      },
      {
        id: 'space',
        label: '“Tomorrow. I’ve heard enough for today.”',
        preview: 'Defer the technical discussion. +1 trust.',
        bond: { ivo: 1 },
        result:
          'Ivo folds the diagram. He leaves the test list where Rowan can read it later and takes the apparatus away.\nAt the door he asks whether they want company. When Rowan says no, he says goodnight.',
      },
    ],
  },
];

export function allChoiceNodes() {
  return [
    ...houseChoices,
    ...rooms.filter((r) => r.discovery).map((r) => r.discovery),
    ...conversations,
  ];
}

// Old conversations retire when their question has been answered through play.
for (const n of conversations) {
  if (n.id.endsWith('Start')) n.until = [n.who + 'Resolved', 'truth'];
  if (['brynAnchor', 'nellShore', 'ivoArchive'].includes(n.id)) n.until = [n.who + 'Resolved'];
}
