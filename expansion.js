// Each region has a specific problem, witnesses, twelve sequential jobs and four recovered rooms.
export const regions = [
  {
    id: 'fen',
    name: 'The Lantern Fen',
    keeper: 'Tamsin',
    localKeeper: 'Hesta',
    problem:
      'The guild pump once kept the low houses dry. Its reversed drive now fills their drains. Hesta wants families moved to high ground until repairs hold; several refuse to leave homes their parents built. The relief work must make leaving possible before it can promise a safe return.',
    ending:
      'The repaired pump holds below the agreed water mark. Some families return; others keep their homes on higher ground. Hesta saves the old flood marks for future inspections. The school boat becomes a ferry again.',
    rooms: ['Sluice workshop', 'Reed conservatory', 'River infirmary', 'Lantern dock'],
    jobs: [
      [
        'Measure the rising water',
        'Mark the waterline in three occupied houses and find the broken outflow.',
      ],
      [
        'Carry the children to high ground',
        'Escort the school boat past the drowned willow causeway.',
      ],
      ['Recover the pump plans', 'Retrieve the engineer’s folio from a submerged toll house.'],
      ['Find the missing diver', 'Follow her air hose into a collapsed culvert and bring her out.'],
      ['Break the eel nest', 'Clear the intake without opening the floodgate above the village.'],
      ['Bring home the sluice workshop', 'Recover the workshop key from the pump keeper.'],
      ['Secure a dry camp', 'Drive marsh wolves away from the relief camp.'],
      ['Retrieve the copper impeller', 'Lift the original impeller from the flooded foundry.'],
      [
        'Repair the channel seals',
        'Fit the seals while the village workers hold the temporary dam.',
      ],
      [
        'Silence the false flood bell',
        'Remove the mimic that has been calling families toward unsafe ground.',
      ],
      [
        'Turn the pump outward',
        'Hold the engine room while the local crew follows Tamsin’s recovered drive procedure.',
      ],
      [
        'Open the river road',
        'Escort the first returning families and inspect the repaired outflow.',
      ],
    ],
  },
  {
    id: 'ash',
    name: 'The Ash March',
    keeper: 'Kest',
    localKeeper: 'Brindle',
    problem:
      'The buried furnace still obeys the last evacuation order: keep the signal fires burning until the all-clear. That signal never came. The fires now reach beneath farms once supplied by its workshops. Brindle needs it stopped, but workers fear losing the trade their families depended on.',
    ending:
      'The furnace is cold and the fuel branches are sealed. Brindle arranges training in the recovered workshops; the farms can plant again. The firewatch closes its old rota. For the first week, several workers still wake at the watch hour.',
    rooms: ['Ash forge', 'Cinder baths', 'Firewatch hall', 'Kiln archive'],
    jobs: [
      ['Read the scorch lines', 'Survey the fields and locate the underground fuel trench.'],
      ['Evacuate the grain carts', 'Escort grain and farm workers before the next ground fire.'],
      ['Recover Kest’s patrol', 'Find the firewatch crew stranded beside a molten culvert.'],
      ['Take the cooling salts', 'Collect salts from the abandoned kiln under salamander attack.'],
      [
        'Close the western fuel gate',
        'Reach the manual valve before fire crosses into the orchard.',
      ],
      ['Recover the ash forge', 'Bring the forge’s door key and cooled tools back to the guild.'],
      [
        'Enter the furnace control room',
        'Clear the armour animated by the furnace’s security spell.',
      ],
      [
        'Read the last watch order',
        'Recover the signed instruction that left the furnace running.',
      ],
      ['Reach the buried reservoir', 'Cut a passage to the water kept for emergencies.'],
      ['Hold the steam passage', 'Protect the workers while they attach the cooling pipe.'],
      ['Extinguish the deep furnace', 'Disable its controller under attack from the cinder drake.'],
      [
        'Return the land to its keepers',
        'Walk the fuel trench with the farmers and seal every inlet.',
      ],
    ],
  },
  {
    id: 'glass',
    name: 'The Glass Coast',
    keeper: 'Corin',
    localKeeper: 'Toren',
    problem:
      'The lighthouse copies distress signals from its rescue register. Crews chase boats that have already reached harbour or sank years ago. Toren needs reliable bearings, but some families keep visiting the false lights because they show a ship they remember.',
    ending:
      'The lighthouse projects one measured beam. The true rescue register remains beside the door, including the ships that never returned. Families can visit it without sending another crew onto the rocks.',
    rooms: ['Mirror studio', 'Tide chart room', 'Salt chapel', 'Beacon gallery'],
    jobs: [
      ['Compare the rescue registers', 'Find which missing ships have already reached harbour.'],
      ['Escort a real fishing boat', 'Guide its crew through the false lights at dusk.'],
      [
        'Recover Corin’s field records',
        'Find Corin’s lens notes in the mirror caves. They identify the fault and the guild room where he was trapped.',
      ],
      ['Break the reflected sentries', 'Clear the stair guarded by copies of the coast patrol.'],
      [
        'Bring back the lens ledger',
        'Retrieve the serial numbers of the lighthouse’s enchanted lenses.',
      ],
      ['Return the mirror studio', 'Detach the borrowed studio after its owner signs the release.'],
      ['Mark the true coastline', 'Plant lamps along the safe channel using measured bearings.'],
      ['Find the duplicate lens', 'Trace the extra beam to a lens hidden beneath the foundation.'],
      ['Rescue the night watch', 'Reach the keepers trapped between reflected staircases.'],
      ['Shatter the copied beacon', 'Destroy the duplicate without breaking the real light.'],
      [
        'Recalibrate the lighthouse',
        'Defend the lens crew while they use Corin’s measurements to align the beam.',
      ],
      [
        'Sail the safe passage',
        'Escort the first convoy and verify every beacon against the chart.',
      ],
    ],
  },
  {
    id: 'root',
    name: 'The Rootwild',
    keeper: 'Asha',
    localKeeper: 'Moss',
    problem:
      'The guild planted shelter trees to protect the village. Their growth spell was never adjusted as homes and paths changed. Now the roots block doors and tighten when cut. Moss must free the residents without destroying the trees that still hold their roofs. The original plan cannot simply be planted again.',
    ending:
      'The doors and schoolhouse are clear. Residents keep useful shelter trees and remove the growth that endangered them. The planting agreement includes a pause procedure and room for future changes. A new garden goes where the old plan marked an empty square.',
    rooms: ['Root nursery', 'Herbal kitchen', 'Seed vault', 'Green council room'],
    jobs: [
      ['Listen at the sealed gates', 'Locate families by the voices heard through the roots.'],
      [
        'Carry medicine through the canopy',
        'Reach the sick without cutting their supporting branches.',
      ],
      [
        'Recover Asha’s planting records',
        'Follow Asha’s marks to the blocked watch hut. Recover the growth-pause notes and the record of her missing guild room.',
      ],
      ['Recover the pruning spell', 'Retrieve the book caught in the village school’s roots.'],
      ['Clear the thorn hounds', 'Protect the path used by food carriers.'],
      [
        'Recover the root nursery',
        'Move its seedlings with the keeper’s permission and its door key.',
      ],
      ['Gather dormant spores', 'Collect the fungus that pauses enchanted growth.'],
      ['Reach the buried well', 'Free the well rope before the village runs out of clean water.'],
      ['Release the schoolhouse', 'Apply the growth pause and unwind its roots by hand.'],
      [
        'Break the parasitic knot',
        'Kill the root parasite using the guild spell as its food source.',
      ],
      ['Open the shelter trees', 'Defend the pruning crew until the village gates are clear.'],
      [
        'Write a new planting agreement',
        'Return the growth spell with measured limits and local control.',
      ],
    ],
  },
  {
    id: 'frost',
    name: 'The White Stair',
    keeper: 'Neris',
    localKeeper: 'Ansel',
    problem:
      'The avalanche ward repeats its last snowfall because the station’s stopping record is missing. Travellers cannot finish the crossing. Neris’s old notes show repeated resets after a fatal avalanche: she kept seeking safer readings instead of accepting the route was closed. The mountain watch needs a way to measure the present storm.',
    ending:
      'The ward follows current measurements. The watchkeepers inspect the poles before opening the pass; they can close it again when conditions change. The lost travellers remain in the station register. Today’s arrivals receive a new page.',
    rooms: ['Frost laboratory', 'Mountain guesthouse', 'Snow observatory', 'Bell hospital'],
    jobs: [
      [
        'Count the repeated footprints',
        'Locate the point where the mountain road begins repeating.',
      ],
      [
        'Bring supplies to the watch huts',
        'Escort food through the storm to stranded watchkeepers.',
      ],
      [
        'Recover Neris’s weather records',
        'Cross the shelf before the snowfall resets. Recover Neris’s field records; her suspended guild room must be reached separately.',
      ],
      ['Recover the weather cylinder', 'Find the station’s missing measurement record.'],
      ['Clear the frost spiders', 'Secure the station stair for the rescue team.'],
      [
        'Recover the mountain guesthouse',
        'Bring back its key and all travellers still sheltering inside.',
      ],
      ['Repair the avalanche poles', 'Replace the broken measuring poles along the ridge.'],
      ['Recover the buried counterweight', 'Lift the mechanism that limits the ward’s snowfall.'],
      ['Reach the storm engine', 'Cross the upper pass under attack from the rime wyvern.'],
      [
        'Stop the repeating snowfall',
        'Fit the cylinder while the mountain crew operates the override using Neris’s recovered procedure.',
      ],
      ['Test the thaw route', 'Protect the mountain crew as they test the pass.'],
      [
        'Reopen the white stair',
        'Escort travellers down and return the station to the watchkeepers.',
      ],
    ],
  },
  {
    id: 'clock',
    name: 'The Clockwork Ward',
    keeper: 'Perrin',
    localKeeper: 'Remi',
    problem:
      'The courthouse clock stopped during the guild emergency. Its guards still arrest residents under the old charter. The town has grown around that suspended hour: some officials rely on its authority, while families are still trying to get people out of its cells. Advancing the clock will end the order, but the arrests also need to be heard.',
    ending:
      'The emergency charter expires and the cells are opened. The town council takes responsibility for current laws. At the public hearing, former prisoners describe what the saved arrest plates cannot record. Ending the order has begun the work of answering for it.',
    rooms: ['Clock workshop', 'Brass court', 'Automaton stable', 'Timekeeper archive'],
    jobs: [
      ['Read the arrest notices', 'Compare the guards’ warrants with the town register.'],
      [
        'Escort the detained bakers',
        'Bring the first prisoners out through an unguarded service route.',
      ],
      ['Find Perrin’s missing key', 'Retrieve the court clock key from a sealed counting house.'],
      ['Stop the brass patrol', 'Disable a patrol without destroying its memory plates.'],
      ['Recover the emergency charter', 'Bring the original order to the town council.'],
      ['Return the clock workshop', 'Detach its doorway after the apprentices have evacuated.'],
      ['Release the courthouse cells', 'Reach the prisoner ledger and unlock each occupied cell.'],
      ['Repair the council bell', 'Restore a public alarm controlled by the town.'],
      ['Face the iron adjudicator', 'Disable the judge-machine guarding the clock mechanism.'],
      ['Advance the courthouse clock', 'Turn the key and end the emergency date.'],
      ['Rewrite the guard register', 'Defend Perrin while the council records its current laws.'],
      [
        'Witness the first open hearing',
        'Bring the saved memory plates to a public review of the arrests.',
      ],
    ],
  },
  {
    id: 'deep',
    name: 'The Undersea Vault',
    keeper: 'Liora',
    localKeeper: 'Noma',
    problem:
      'The treasury’s failing intake sends seawater through the town wells. Below it are deposits the old guild never returned. Liora’s register records the owners, but some have died and others left their claims to families who no longer live on the quay. The water must be made safe before the wealth can travel.',
    ending:
      'The wells are safe and the vault is sealed. Recovered deposits are returned against the surviving records; unresolved claims remain open for the families still being traced. The quay office keeps a desk for that work after the diving crews leave.',
    rooms: ['Diving room', 'Pearl infirmary', 'Coral archive', 'Deep treasury'],
    jobs: [
      ['Taste the salt in the wells', 'Trace the seawater leak to the treasury conduit.'],
      ['Evacuate the lower quay', 'Escort families before the next tide reaches their homes.'],
      ['Find Liora’s dive team', 'Recover divers trapped beneath the cracked treasury roof.'],
      [
        'Recover the ownership register',
        'Retrieve the record of deposits before claiming any treasure.',
      ],
      ['Clear the coral sentinels', 'Secure a route to the pressure chamber.'],
      ['Recover the diving room', 'Return its equipment and key to a dry guild landing.'],
      ['Patch the town conduit', 'Fit a temporary sleeve to keep the wells usable.'],
      ['Retrieve the pressure stones', 'Find the weights that hold the main valve shut.'],
      ['Face the abyssal keeper', 'Clear the treasury guardian while the divers brace its roof.'],
      [
        'Seal the treasury intake',
        'Hold the valve chamber while the town divers complete the test using Liora’s recovered measurements.',
      ],
      ['Return the deposited wealth', 'Escort the register and chests to their surviving owners.'],
      ['Close the flooded vault', 'Inspect the wells and certify the town’s fresh water.'],
    ],
  },
  {
    id: 'star',
    name: 'The Fallen Star',
    keeper: 'Sable',
    localKeeper: 'Vale',
    problem:
      'The fallen guild beacon keeps calling every connected road. Its light draws predators toward the camps. Some keepers still depend on it to guide missing travellers home. Sable must replace the useful signals before the transmitter can be shut down, and the last travelling names must be checked.',
    ending:
      'The beacon is silent. Local keepers control the remaining lamps, and the missing travellers have been checked against the road registers. Some lights remain for ordinary arrivals. Others are put out. The dawn terrace opens for a meeting of all eight regions.',
    rooms: ['Star laboratory', 'Sky infirmary', 'Roadkeepers hall', 'Dawn terrace'],
    jobs: [
      ['Count the roads that answer', 'Survey the lights responding to the fallen beacon.'],
      ['Escort the roadkeepers', 'Bring the isolated watchkeepers back before the next signal.'],
      [
        'Search Sable’s wrecked camp',
        'Recover Sable’s transmitter notes and the marks identifying her suspended guild room.',
      ],
      ['Retrieve the signal prism', 'Reach the broken transmitter’s cooling chamber.'],
      ['Clear the void moth swarm', 'Protect the camps from creatures following the light.'],
      ['Return the star laboratory', 'Carry its samples and key home under a covered lantern.'],
      [
        'Cut the eastern signal road',
        'Close the first connection after all its travellers return.',
      ],
      ['Recover the hand lamps', 'Retrieve the manual signals from the old roadkeeper store.'],
      ['Face the starved wyrm', 'Clear the predator nesting on the transmitter roof.'],
      [
        'Disconnect the fallen beacon',
        'Defend the signal crew while they follow Sable’s procedure to remove the prism.',
      ],
      [
        'Inspect every surviving road',
        'Escort local keepers as they take control of the remaining lamps.',
      ],
      ['Light the dawn terrace', 'Open a shared meeting place for the eight restored regions.'],
    ],
  },
];
const reports = {
  fen: [
    'The party marks the water above three doorframes. Hesta compares the dates: it rose while the pump was running. One family is already packing; another insists the next tide will lower it. The outlet is feeding the drains, so waiting will not help.',
    'Every child reaches the relief camp. A teacher checks the names twice. Rufus’s old ferry measurements make the causeway crossing possible; Hesta keeps a copy for the next boat. One pupil asks whether the classroom is coming too.',
    'The recovered folio shows how the pump drive reverses. Its manual stop is accessible, but stopping it alone will leave the lower houses flooded. The party identifies the seals and impeller needed to make it drain safely.',
    'The diver is brought out with a broken pressure gauge. Her air hose led the rescuers to the collapsed culvert. An old dive log among the equipment names Lark as an earlier casualty there. The current rescue and that older loss must not be entered as the same event.',
    'Workers secure the upper floodgate before the party clears the eels. Water no longer pours through the disturbed intake. Hesta marks the gate position in chalk so a later crew can check it without guessing.',
    'The workshop pipe is disconnected before its key returns to the guild. Hesta sends copies of the maintenance notes. Tamsin’s marks are still on them; the measurements can help identify the room where she was trapped.',
    'The wolves are driven away and the food route is guarded. At the dry camp, families choose spaces for their beds. A man brings the marker from his parents’ grave and asks for it to be kept upright until they can go home.',
    'The copper impeller is recovered intact. Its makers’ names are stamped on the underside. Hesta recognises one as her grandfather and asks for a rubbing before the part disappears inside the pump again.',
    'The village crew holds the temporary dam while the new seals are fitted. The first test leaks; the second holds. Hesta records both. Families will not be sent back on the strength of one good reading.',
    'The repeated flood alarm comes from a mimic wrapped around the rope. Once it is removed, a keeper rings the real bell and explains the signal at the relief camp. This time everyone knows which direction it means.',
    'Tamsin’s recovered drive procedure lets the party reverse the pump under guard. Hesta’s workers take over the controls and watch the waterline. The pump begins draining the village instead of filling it.',
    'The outflow remains below the agreed mark. Some families return with the first escort; others ask to stay on high ground. Hesta records where each has gone. The school boat makes its first ordinary crossing since the flood.',
  ],
  ash: [
    'The party traces the scorched fields to the furnace’s fuel trench. Brindle names the workshops it once supplied. Closing those branches will protect the farms and end the last work still tied to the furnace.',
    'The grain carts reach the stone road before the ground fire. A driver refuses to leave an empty cart behind; it belonged to her father. The party helps move it too. Brindle finds room for it beside the shelter.',
    'The stranded firewatch crew escapes the molten culvert with its readings. Their captain is still listed as Kest in the old rota, although Kest’s guild room has remained sealed. They have been following his procedures without being able to ask him about them.',
    'The party drives the salamanders out of the kiln and recovers the salts. Workers recognise their old supply labels. Enough remains for the cooling sequence, provided the fuel gates are shut first.',
    'The western valve closes. The orchard branch begins cooling. Its keeper brings a bucket of water to test the soil, then sits down beside it. Brindle leaves someone to watch the line rather than declare the work finished.',
    'The forge is allowed to cool before its doorway and key return. The tool rack has spaces for workers who never came back. Brindle sends their names with the equipment and asks that apprentices be allowed to use it.',
    'The animated armour is disabled. The controller still bears the evacuation seal. It has been protecting an instruction nobody could cancel, not deciding for itself that the farms should burn.',
    'The watch order requires the furnace to burn until an all-clear signal arrives. The severance cut that signal road. Ves’s name appears among the dead in the accompanying casualty list; the message they still carry was already received, but could never be obeyed.',
    'The reservoir contains enough water for the cooling sequence. The party opens the supply route. Brindle asks workers to gather the tools they will need afterward; there will be no furnace shift tomorrow if the shutdown succeeds.',
    'The workers fit the cooling pipe behind the party’s guard line. Steam makes it hard to hear the commands. They repeat each instruction before moving, using the names of the workers rather than the old watch numbers.',
    'The cinder drake is cleared and the controller disconnected. The furnace cools. Workers wait for the all-clear horn out of habit before remembering there will not be one. Brindle sends word to the farms by courier.',
    'Farmers inspect and seal every fuel inlet. The firewatch closes its emergency rota. The recovered forge can teach another trade, but some workers need time before choosing one. Brindle asks the guild to keep the offer open.',
  ],
  glass: [
    'Four ships listed as missing are already in harbour. Their crews identify the distress calls as recordings. Toren begins a separate list for vessels that never returned; those names cannot be corrected into happy endings.',
    'A fishing boat reaches harbour by measured bearings. Its skipper had seen a familiar mast in the false beam and nearly turned toward it. The temporary route is marked for the next crew before the party leaves.',
    'The party finds Corin’s old field records in the mirror caves and recovers the lens fragment stored with them. Corin himself remains held in the guild room. The notes identify how to recover that room and compare the present beam with its original design.',
    'Covering the panels dissolves the reflected patrol. One copy keeps giving its last order until the cloth reaches its face. The party marks the actual stair so the night watch will not follow the reflection again.',
    'The ledger lists six lenses, but the lighthouse produces seven beams. Corin’s notes put the extra source beneath the foundation. The party can now search a specific chamber instead of chasing each false light.',
    'The studio’s owner signs its release after checking which tools remain. Toren records where it is going and how to request access. The doorway is detached only when the room is empty.',
    'Fixed lamps mark the safe channel independently of the lighthouse. Rescue crews can use them while the seventh lens is investigated. A family watches the old beam from the quay; the party explains why no boat will follow it tonight.',
    'The seventh lens reflects the rescue register, replaying each ship’s recorded signal. Fenn’s boat appears among the lost vessels. The familiar kitchen in its reflected light belongs to the past, not to someone waiting inside the lighthouse.',
    'The night watch follows the marked route back to the true stair. One keeper wants to look behind a door repeating her brother’s voice. Another takes her hand while the party gets them clear. Nobody asks her to be grateful yet.',
    'The duplicate lens is shattered behind a protective screen. The six real lenses remain intact. At the quay, the familiar false ships vanish. Toren keeps the lost-vessel list where families can still read it.',
    'The surviving beam is aligned to the harbour channel using Corin’s measurements. Each bearing is checked against the fixed lamps. The light guides a ship somewhere it can actually reach.',
    'The convoy reaches harbour. The party verifies the lamps before removing its temporary markers. Toren opens the true register for corrections and for accounts of the ships no one can bring back.',
  ],
  root: [
    'Twelve families answer through the roots, including the schoolhouse. Moss writes down who needs medicine first. The shelter trees are supporting several roofs; cutting a quick opening would bring those rooms down.',
    'Medicine reaches the sick through the canopy. Sorrel’s old delivery book names the route and its recipients. It also records her death on the final journey. The party preserves the book to show her when the house releases her spirit.',
    'Asha’s records and dormant-growth seeds are recovered from the blocked hut. The room that holds her can now be identified. Moss recognises her planting plan but points out houses built after it was drawn.',
    'The pruning book requires a growth pause before cutting. It also shows the old village, with empty plots where families now live. The procedure is useful; the layout must be changed.',
    'The thorn hounds are cleared from the food route. Residents lower baskets from the canopy while the party guards the carriers. Someone sends down enough soup for the guards as well.',
    'The nursery seedlings and key reach the guild intact, with the keeper’s agreement. Moss sends a list of plants needed locally. The rare specimens can wait; families need food and medicine first.',
    'The spores pause the growth in a test branch. It loosens without dropping the roof above it. The crew can begin opening occupied buildings one at a time instead of cutting through blindly.',
    'The well rope is freed. Buckets reach the relief station before the party rests. Moss asks for the well route to remain on the map when the emergency is over; it was omitted from the original planting plan.',
    'The crew pauses the schoolhouse roots and unwinds them by hand. Every pupil comes out. The teacher carries a box of drawings; several show the windows before the branches covered them.',
    'The parasite is removed from the main knot. Without it feeding on the spell, the pause lasts long enough for measured pruning. Moss marks the houses that need support before their roots can be moved.',
    'The village gates open without cutting the load-bearing branches. The crew leaves useful trees in place and clears the growth that blocks doors. Residents can reach one another without crossing the roofs.',
    'The new planting agreement includes the pause procedure, current homes and places where residents want nothing planted. The schoolchildren choose a small garden. Moss makes sure it is drawn on this version of the map.',
  ],
  frost: [
    'The same footprints appear twice above the lower station. Each snowfall restores the old surface. The weather ward is repeating a saved measurement rather than responding to the storm now over the pass.',
    'Food and fuel reach the watch huts. One keeper has scratched the days on a beam because the road keeps looking the same. The party adds the present date before taking the next supplies onward.',
    'The party recovers Neris’s field records from the ice shelf using safety ropes. Neris remains held in her guild room. Her last entries describe repeated resets after an avalanche and identify the station’s missing measurement cylinder.',
    'The cylinder records the last safe snowfall and the readings that followed. Several failed checks were reset. The old lost-traveller list stays with the record; ending the repeated snow will not change who died in the first avalanche.',
    'The station stair is cleared of frost spiders. Workers carry in current measuring equipment. The party marks the safe exit before beginning work on the ward.',
    'All guests leave before the guesthouse is recovered. A traveller retrieves the boots drying beneath a bed at the last moment. The guild receives the key and the register of everyone who sheltered there.',
    'The broken poles are replaced along the ridge. Eda’s apprentice has added better intervals to the old survey. The party keeps those changes rather than restoring the original marks simply because they are older.',
    'The buried counterweight is fitted to the limiting arm. The ward can now stop when the recorded limit is reached. Workers test the stop before connecting the measurement cylinder.',
    'The rime wyvern is driven off the upper pass. The party secures the approach to the storm engine while the mountain crew checks the new readings. Clear weather alone does not prove the crossing is safe.',
    'The recovered cylinder and Neris’s procedure release the manual override. The snowfall stops repeating. The watch records the first new measurement without resetting it, even though it requires keeping the pass closed a little longer.',
    'The mountain crew tests a thaw route beneath the repaired poles. They open one section and leave another shut. Travellers receive the delay plainly, with a place to wait and enough food.',
    'Travellers descend after the final inspection. The watchkeepers begin a new register page. They preserve the earlier names and measurements, including the people whose journeys ended before this morning.',
  ],
  clock: [
    'The arrest notices cite the guild emergency thirty years ago. Current residents are being judged by an order older than many of them. The council asks for the original charter before challenging the guards.',
    'The detained bakers reach the council hall with their warrants. One still carries flour on his sleeve. They ask who will return the goods spoiled while their shops were shut. The council records the question.',
    'Perrin’s clock key is recovered from the counting house. The court mechanism can now be reached, but the guards will keep enforcing the charter until its expiry condition is changed.',
    'The patrol is disabled without erasing its plates. Its records identify arrests, dates and the officers who confirmed them. Joss’s old watch insignia appears in several entries. These must be retained for the hearing.',
    'The original charter expires when the court clock passes the emergency hour. The severance stopped that clock. Some officials have known this and continued accepting the guards’ arrests. The council can end the order and investigate who relied on it.',
    'The apprentices evacuate before the clock workshop is detached. Pip’s service map shows the safe route. On its reverse is an old detention entry for their mother’s bakery; the party keeps it with the personal records.',
    'The prisoner ledger is checked against every occupied cell. Those listed are released, and names missing from the ledger are added for investigation. Families meet outside the court; not all have been told where their relatives were held.',
    'The council bell works again under local control. The guards cannot ring it automatically. Residents are told which signal means an assembly, and where to bring evidence for the hearing.',
    'The adjudicator is disabled. Its judgement plates are preserved, including the orders that continued after objections were filed. Stopping the machine does not remove those decisions from the record.',
    'Perrin’s recovered settings let the party advance the court clock. The emergency charter expires. The guards lower their weapons. People wait a moment before believing they can cross the square.',
    'The council enters current laws into the guard register and appoints people to review arrests. The new entries include dates for review. Residents can inspect the register without asking the guild.',
    'At the first public hearing, the saved plates are read alongside former prisoners’ testimony. Some accounts contradict the official record. The council keeps both and calls for further witnesses. Joss will have questions to answer when he comes home.',
  ],
  deep: [
    'The well samples contain salt from the treasury intake. A quay resident brings the cup her child refused to drink from. The party maps the contaminated conduit before deciding where to patch it.',
    'The lower-quay families reach the upper shelters before the tide. Several bring deposit receipts as well as bedding. The treasury may hold the money their parents spent years trying to recover.',
    'The divers are brought clear of the cracked roof. Their recovered records identify Liora’s pressure-room ward inside the house. One asks the party to tell her that the register was saved before the intake failed.',
    'The deposit register names the owners of the chests. Some entries have return requests unanswered for decades. Liora’s notes separate guild salvage fees from the deposits; there is no authority to claim the whole treasury.',
    'The coral sentinels are cleared from the pressure chamber. The party leaves the valve setting untouched until the divers can brace the roof. A clear passage is not yet a safe one.',
    'The diving room reaches a dry guild landing with its equipment intact. The pressure records include Sal’s final dive. The crew recovered the other divers but never found Sal’s chamber; the record will let them stop searching in the wrong place.',
    'The temporary sleeve stops seawater entering the wells. The town can use them while the intake is repaired. Each well is tested separately; the party does not assume one clean sample clears them all.',
    'The pressure stones are recovered and placed beside the main valve. Their weight will keep it shut without a diver holding the mechanism. Maro’s old bracing plan shows where the roof needs support during the transfer.',
    'The guardian is cleared while divers brace the roof. The party reaches the deposit chamber. Several chests still bear letters requesting their return, tied directly to the locks.',
    'The intake stays shut through the pressure test. Liora’s records and the town crew’s readings agree. The roof supports can remain in place while the chests are brought out.',
    'The chests return against the deposit register. Where an owner has died, the claim is kept open for their family rather than paid to the first person who asks. The quay office keeps copies for the accounts still unresolved.',
    'Every well passes its fresh-water check. The flooded vault is sealed. The diving work ends, but the deposit office remains open: returning money cannot settle all the years people spent without it.',
  ],
  star: [
    'Eight roads answer the beacon. Three still carry isolated watchkeepers. Sable’s old signal table distinguishes travelling parties from repeated calls; the party begins checking actual names before any road is closed.',
    'The isolated keepers reach camp before the next signal. One brings a lamp that has burned for a missing sister. The party records her name rather than promising that shutting down the beacon will bring her back.',
    'Sable’s field notes are recovered from the wrecked camp. She remains trapped in the guild signal room. The notes identify the damaged prism and the manual lamps intended to replace the automatic call.',
    'The prism is recovered from the cooling chamber. It repeats the last return signal continuously. The party keeps the receiver powered until the occupied roads have been checked.',
    'The moth swarm is cleared. Covered lamps stop drawing more creatures to the camp. Keepers mark the paths by hand so travellers can still find the shelters.',
    'The laboratory reaches the guild with its samples covered. The receiver records Tavi’s last count, including everyone except Tavi. The sister who kept the final lamp needs that record when their spirit is ready to leave.',
    'The last travellers are counted off the eastern road before its connection closes. A keeper reads each name aloud. The party checks the list against arrivals rather than trusting the beacon’s repeated reply.',
    'The hand-operated lamps are recovered. Each needs a local keeper, not a continuous signal from the fallen beacon. The party demonstrates how to cover and extinguish them safely.',
    'The wyrm is cleared from the transmitter roof. The keepers move into position with the manual lamps. There is now another way to guide travellers before the old beacon goes dark.',
    'Using Sable’s procedure, the crew removes the power prism while the party holds the roof. The beacon falls silent. Nobody speaks for a while. Then a keeper lights an ordinary lamp beside the road.',
    'Every surviving road has a named keeper and a hand-operated lamp. The old missing list remains available for inquiries. Some families keep a light; others decide to put theirs out. Neither decision is made for them.',
    'Representatives meet on the dawn terrace. The reports are brought, but so are food, children and complaints about the journeys. Rowan has helped make this meeting possible. Other people will decide what they do next.',
  ],
};
export const expansionRooms = regions.flatMap((r, i) =>
  r.rooms.map((name, j) => ({
    id: r.id + 'Room' + j,
    name,
    x: 2460 + (i * 4 + j) * 310,
    w: 310,
    anchor: r.id + 'Key',
    operational: r.id + 'Room' + j + 'Ready',
    read: r.id + 'Room' + j + 'Read',
    cost: 80 + i * 25 + j * 15,
    ruined: 'A locked room returned from ' + r.name,
    restored: name + ' · maintained with ' + r.keeper,
    region: r.id,
  })),
);
export const expansionMissions = regions.flatMap((r, i) =>
  r.jobs.map(([name, objective], j) => {
    const local = (text) => text.replaceAll(r.keeper, r.localKeeper);
    const report = j === 2 ? reports[r.id][j] : local(reports[r.id][j]);
    return {
      id: r.id + 'Quest' + j,
      name: j === 2 ? 'Recover ' + r.keeper + '’s guild records' : name,
      region: r.id,
      days: 2 + Math.floor(j / 3),
      reward: 110 + i * 65 + j * 30,
      xp: 55 + i * 12 + j * 8,
      capacity: 6,
      injuryDays: 2,
      requires: [j ? r.id + 'Step' + (j - 1) : i ? regions[i - 1].id + 'Step11' : 'free'],
      sets: [r.id + 'Step' + j, ...(j === 5 ? [r.id + 'Key'] : [])],
      lethal: j >= 8,
      desc:
        (j === 2
          ? 'Find the field records left by the old guild keeper. Their procedures can help the settlement now, and their room markings will help locate the resident still held inside the house.'
          : local(objective)) +
        ' ' +
        (j === 0 ? r.problem : ''),
      arrival:
        'The local keepers report: ' +
        report +
        ' ' +
        (j === 11
          ? local(r.ending)
          : 'The report records what the party found and identifies the next task. The local keepers check it before work continues.'),
      choices: [
        {
          id: 'public',
          label: 'File the report with the local keepers',
          preview: 'Share the evidence and give the settlement a copy. Gain community trust.',
          community: 1,
          result:
            j === 11
              ? local(r.ending)
              : report +
                ' The party leaves a signed copy with the local keepers. They add corrections and the names of the people who will take over the next stage. The guild retains the same account.',
        },
        {
          id: 'study',
          label: 'Record the mechanism and its failure',
          preview: 'Preserve the measurements for the guild’s repair crews. Gain knowledge.',
          knowledge: 1,
          result:
            j === 11
              ? local(r.ending)
              : report +
                ' The guild preserves the measurements, failures and repair sequence. Local keepers receive a copy they can use without waiting for another guild party.',
        },
      ],
    };
  }),
);
export const expansionProfiles = Object.fromEntries(
  expansionMissions.map((m, n) => [
    m.id,
    {
      stat: ['end', 'agi', 'int', 'str'][n % 4],
      amount: 14 + Math.floor(n / 12) * 5 + (n % 12) * 2,
      threat: Math.min(98, 50 + Math.floor(n / 12) * 4 + (n % 12) * 3),
      skills: {
        guard: 8,
        tracking: 8,
        literacy: 8,
        water: m.region === 'deep' ? 18 : 4,
        echoSight: 8,
        stoneSong: 8,
        threadwalk: 8,
      },
    },
  ]),
);
const people = [
  [
    'tamsin',
    'Tamsin',
    'mage',
    'fen',
    'Tamsin measured the fen pump until numbers became easier to face than flooded homes. Her records can still help the families outside; she must learn how much has changed while her ward held her.',
    'water',
  ],
  [
    'rufus',
    'Rufus',
    'warrior',
    'fen',
    'Rufus ferried the school children to high ground during the disaster. The house kept him afterward. His sister has grown older, and the boat he expects to find may no longer be his.',
    'guard',
  ],
  [
    'lark',
    'Lark',
    'scout',
    'fen',
    'Lark remembers searching the culvert for a missing colleague. The old log records her own death there. Her spirit needs the answer her rescue crew could never bring her.',
    'tracking',
  ],
  [
    'kest',
    'Kest',
    'warrior',
    'ash',
    'Kest led the old firewatch. His procedures kept the crew working after he vanished, long past the end of the emergency. He must decide who he is when the watch finally stops.',
    'guard',
  ],
  [
    'ves',
    'Ves',
    'mage',
    'ash',
    'Ves carries the furnace watch order and waits for someone to acknowledge it. The kiln casualty list contains their name. Their spirit has another message to deliver before it can rest.',
    'literacy',
  ],
  [
    'dara',
    'Dara',
    'scout',
    'ash',
    'Dara remembers the farm before the disaster. Her brother has had thirty years to plant without her. She wants to return, but is afraid of finding a place that no longer needs her.',
    'tracking',
  ],
  [
    'corin',
    'Corin',
    'mage',
    'glass',
    'Corin made the original lighthouse lenses. His daughter has become a lens maker herself. He has to meet the craftswoman she is, rather than recover the apprentice he remembers.',
    'echoSight',
  ],
  [
    'fenn',
    'Fenn',
    'scout',
    'glass',
    'Fenn followed a distress signal on the last rescue voyage. The register records their boat’s loss. They want to speak to their partner rather than follow another reflection of their old kitchen.',
    'threadwalk',
  ],
  [
    'mira',
    'Mira',
    'warrior',
    'glass',
    'Mira guarded the old lighthouse workers. The present watch answers to a different community. She is interested in joining it, if the workers have a say in her duties.',
    'guard',
  ],
  [
    'asha',
    'Asha',
    'mage',
    'root',
    'Asha preserved her mother’s planting plan. The village grew around it while its magic continued unchanged. She must learn what the people living there now want to grow.',
    'literacy',
  ],
  [
    'bram',
    'Bram',
    'warrior',
    'root',
    'Bram helped build the village shelters. His son has become a carpenter while he was held in the house. Working beside him will mean letting someone else run the yard.',
    'stoneSong',
  ],
  [
    'sorrel',
    'Sorrel',
    'scout',
    'root',
    'Sorrel carried medicine through the canopy on her final journey. Her spirit still wants to know whether it arrived in time. The nurse who received it can give her an answer.',
    'tracking',
  ],
  [
    'neris',
    'Neris',
    'mage',
    'frost',
    'Neris reset the avalanche ward after the first loss, seeking a safer reading. The snow kept repeating while she was trapped. She wants to help the watch face the measurements it has now.',
    'echoSight',
  ],
  [
    'tor',
    'Tor',
    'warrior',
    'frost',
    'Tor brought travellers down the mountain and kept finding reasons to stay for the next party. His family would like him home for a week. Other porters can take the road.',
    'guard',
  ],
  [
    'eda',
    'Eda',
    'scout',
    'frost',
    'Eda surveyed the avalanche markers. Her apprentice now leads the work and has kept the broken pole from her last survey. Eda wants to meet the person who grew up without her.',
    'threadwalk',
  ],
  [
    'perrin',
    'Perrin',
    'mage',
    'clock',
    'Perrin built a clock for an emergency that never ended in its mechanisms. He wants to restore ordinary hours and let other people inspect the case.',
    'literacy',
  ],
  [
    'joss',
    'Joss',
    'warrior',
    'clock',
    'Joss guarded the court cells before the severance. The people released from them remember him. He can help now without expecting that help to erase their questions.',
    'guard',
  ],
  [
    'pip',
    'Pip',
    'scout',
    'clock',
    'Pip mapped courthouse service passages while their mother was detained. The way home was the route they kept avoiding. Her surviving letter asks whether they have eaten.',
    'tracking',
  ],
  [
    'liora',
    'Liora',
    'mage',
    'deep',
    'Liora kept the treasury deposits separate from guild claims. She wants them returned, including the difficult accounts where an owner has died or disappeared.',
    'water',
  ],
  [
    'maro',
    'Maro',
    'warrior',
    'deep',
    'Maro braced the vault roof while the other workers escaped. His family has grown by another generation. They have invited him to dinner, not another shift.',
    'stoneSong',
  ],
  [
    'sal',
    'Sal',
    'scout',
    'deep',
    'Sal’s spirit still follows the last dive route. The pressure ledger explains where the crew lost them. They want to bring it ashore so the search can end.',
    'water',
  ],
  [
    'sable',
    'Sable',
    'mage',
    'star',
    'Sable designed signals to bring travellers home. The broken beacon has never stopped calling. She wants local keepers to decide when their lamps should go dark.',
    'echoSight',
  ],
  [
    'wynn',
    'Wynn',
    'warrior',
    'star',
    'Wynn defended a road camp after his family had moved away. He wants to find their new camp and ask what they need, instead of rebuilding the fence they left.',
    'guard',
  ],
  [
    'tavi',
    'Tavi',
    'scout',
    'star',
    'Tavi counted the travellers through but never entered their own arrival. Their spirit follows the last lamp kept by their sister. The return register can finally explain the missing name.',
    'threadwalk',
  ],
];
export const expansionRecruits = people.map(([id, name, type, region, bio, skill], i) => ({
  id,
  name,
  type,
  region,
  requires: [region + 'Step2'],
  str: type === 'warrior' ? 12 + Math.floor(i / 3) : 5,
  agi: type === 'scout' ? 12 + Math.floor(i / 3) : 6,
  int: type === 'mage' ? 12 + Math.floor(i / 3) : 6,
  end: 8 + Math.floor(i / 3),
  color: ['#bf996d', '#85bcca', '#a6bc91', '#ba92bb'][i % 4],
  startingSkills: [skill],
  bio,
}));
export const lethalBounties = regions.map((r, i) => ({
  id: r.id + 'Bounty',
  name: [
    'Hydra at the drowned mill',
    'Cinder drake’s hoard',
    'Leviathan on the glass reef',
    'The thorn king',
    'Rime wyvern on the ridge',
    'The iron adjudicator',
    'Abyssal guardian',
    'Wyrm of the fallen star',
  ][i],
  days: 5 + i,
  reward: 700 + i * 350,
  xp: 220 + i * 60,
  capacity: 8,
  requires: [r.id + 'Step7'],
  injuryDays: 3,
  lethal: true,
  desc:
    'A dangerous optional hunt in ' +
    r.name +
    '. Repeated harm can kill a resident. Withdraw while at least one party member remains conscious.',
  checks: [{ stat: 'str', min: 45 + i * 8, label: 'Combined Strength ' + (45 + i * 8) }],
}));
for (const m of expansionMissions)
  m.checks = [
    {
      stat: expansionProfiles[m.id].stat,
      min: expansionProfiles[m.id].amount,
      label:
        'Combined ' +
        expansionProfiles[m.id].stat.toUpperCase() +
        ' ' +
        expansionProfiles[m.id].amount,
    },
  ];
for (const [i, m] of lethalBounties.entries())
  expansionProfiles[m.id] = {
    stat: 'str',
    amount: 45 + i * 8,
    threat: 95 + (i % 4),
    skills: { guard: 8, stoneSong: 8, tracking: 6, echoSight: 6 },
  };
