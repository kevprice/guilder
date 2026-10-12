import { rooms } from './narrative.js';
import { chambers } from './sprawl.js';
import { regions, expansionRooms, expansionRecruits } from './expansion.js';
import { residentDiscoveries } from './resident-discoveries.js';

// Personal records are deliberately separate from official room accounts.
const rowanPages = {
  service:
    "My first wage bought a coat. Halden said it was too big. I said there was room to grow into it. We both knew there wasn't much growing left to do. They folded the cuffs while I ate. I bought a second bowl the next week.",
  quarters:
    "Late again. There was still soup in the pot, and Halden had put a spoon across my chair so nobody would take it. We talked about the coast after supper. They have a list of places. I asked for one more month of wages. They said that was what I'd said last month.",
  library:
    "The kitchen owner asked me to leave Anwen's name on the door. I explained the numbering system. She waited until I had finished and asked again. I wrote Provisioning Room Four. I remember thinking I had handled it well.",
  garden:
    "A child's height marks were scratched into the greenhouse frame. The form said debt settlement. A letter beneath the trays asked when the room would be returned. I put it behind the invoice. The ledger looked better without loose ends.",
  observatory:
    'Vey told us about a child who died while the healer was stranded beyond the pass. She built the first doors because of that. I have seen the people they saved. Today a village refused a connection, and she called them selfish. I wanted to believe she was only tired.',
  threshold:
    "Halden packed the travel list in my coat. I had volunteered for another watch. We argued about it in the kitchen. They asked whether I could imagine a day when nobody needed me. I said we'd talk when I came back. They were still standing by the table when I left.",
};
const dungeonPages = {
  sluice: [
    'A drain worker',
    "The visitors used the front hall. We brought the prisoners through the drains. My son asked why I never took him to see where I worked. I told him it was dangerous. That was true, but it wasn't my reason.",
  ],
  cells: [
    'A detained kitchen owner',
    "The agreement was for the winter. I would open our kitchen to travellers until the mountain road cleared. They kept it in spring. The clerk took Mother's name off the door. Anwen. If somebody finds this, that was her name.",
  ],
  ratway: [
    'A missing drain worker',
    'The blue-handled awl is for my daughter. She made the handle and knows it is loose. Tell her I tried to fix it, but I liked it better the way she made it. My other tools can go to the crew.',
  ],
  crypt: [
    'The burial keeper',
    'I was told to remove the names under dispute. Nobody told me what to say when their families came. I hid the register beneath the last shelf. The ink is good. It should last longer than the stones.',
  ],
  ossuary: [
    'Halden',
    "Instructions for the burial attendant: a funeral agreement is not permission to raise the body. Look for the person's own recorded wishes before preparing the rite. If there is no answer, do not let a grieving friend supply one. I know how hard that will be. — Halden",
  ],
  maze: [
    'Ysra',
    'The survey line crosses three kitchens. On the clean copy they look like empty squares. I know the family in the middle one. I have eaten there. I have not told them what the line means.',
  ],
  oubliette: [
    'A captive',
    "The bucket comes down in the morning. I say my name before I ask for water. Today the keeper said it wasn't necessary. Please tell my sister I didn't go away on purpose. She will think I did.",
  ],
  vault: [
    'Rowan',
    "The owner's address was tied to the chest. I stamped it as salvage and passed it to the treasury. I thought somebody there would send it back. I never checked. The address is still on it.",
  ],
  fungus: [
    'The prison alchemist',
    'The filtration beds work. The water is clean enough to drink. I have written that in every report. No report asks why people are held down here. I keep answering the question I can answer.',
  ],
  rift: [
    'Halden',
    'Year seven. The road ended in water again. I came back soaked, and Mara had made bread. It was nearly impossible to cut. We ate it with soup. Rowan, I have been looking for you. I have also had days like this. I wish I could tell you about them over supper.',
  ],
  study: [
    'Ada’s apprentice',
    "The voice repeated the test phrase after we disconnected the speaking tube. I performed the test again. Professor Merrow asked me to omit it from the public summary until we understood it. I kept this copy. It happened. Understanding it later won't change that.",
  ],
  potions: [
    'Halden',
    "Year fourteen. My hand shook during a dressing today. Mara finished it. I was unpleasant about her taking over and apologised afterward. I've shown her the treatment diagrams. She wants to understand them. I must remember that is not the same as promising to finish them.",
  ],
  mirror: [
    'Rowan',
    "Halden laughed at something in the kitchen. After they went upstairs, the wall laughed in the same way. I answered before I realised. I didn't tell them. I am writing it here because it happened again.",
  ],
  summoning: [
    'Vey',
    'I signed the suspension order after the second voice test. Then the room answered with the correct signal and I let Merrow restart it. I wanted the good result to settle everything. This is the first order. Keep it with the revised one. Nobody should have to take my word for what I knew. — Vey',
  ],
  menagerie: [
    'A keeper',
    "The feeding card says specimen eleven. The mooncat comes when I call it Pipkin, the name the fisher gave me. Her husband slept with it on his chair. She asked whether the animal would come back. I said I would find out. I haven't.",
  ],
  orrery: [
    'Rowan',
    'Every point is a room. Someone washed those windows. Someone put a chair there. I used to enter the distances before the names. Several names are missing. I will have to ask.',
  ],
  storm: [
    'Oren',
    'Six people above the stair. If I let go tonight, they fall. If I get through this, I want to remember that tonight was different from every other day. I keep offering to hold things people could put down.',
  ],
  stars: [
    'Halden',
    'Year twenty-nine. Mara, the token and the papers are yours. Do what you choose with them. Rowan, there are places left on our list. You may choose somewhere I never knew. I wanted you to have a life. It did not have to be a life with me.',
  ],
};
export const journeys = {
  bryn: {
    kind: 'living',
    requires: ['brynResolved'],
    home: 'the rebuilt waystation',
    record:
      "Father's name is in front of me now. I still turn when someone knocks. The apprentice wants to learn masonry once he's well enough. I could teach him. I think I'd like a workshop where the work ends before supper.",
    farewell:
      'Bryn leaves for the waystation with her shield, tools and plans for the workshop. Before going she checks the new beds one last time. Mara promises to write if a leg breaks. Bryn says somebody else can learn to fix it.',
  },
  nell: {
    kind: 'living',
    requires: ['nellResolved', 'free'],
    home: 'the shelter roads',
    record:
      "I've written to the shelter keepers. They need guides, and I know the roads badly enough to keep checking them. Rowan can come as a traveller. I would like to see them arrive with nothing they have to deliver.",
    farewell:
      'Nell takes the shelter road with two maps: one for the keepers and one for Rowan. She leaves the second on their table. At the gate she waves, then turns to watch where she is walking.',
  },
  ivo: {
    kind: 'living',
    requires: ['ivoResolved', 'truth'],
    home: 'an independent school beside Ada’s monastery',
    record:
      "The monastery has offered a room for a school. Ada thinks it's too small. I told her that gives us something to agree on later. I want students who will ask the questions I used to swallow. I also want a window that opens.",
    farewell:
      'Ivo packs the school books badly. Ada has sent a list of supplies longer than his original request. He leaves copies of his calculations at the guild and takes the unfinished lesson page with him.',
  },
  oren: {
    kind: 'preserved',
    requires: ['truth'],
    home: 'his daughter’s riverside workshop',
    record:
      "My daughter is older than I am. Mara's letter says she has a workshop by the river. She asked whether I'd like to see it. I spent an hour drafting a list of repairs I could do and then threw it away. I don't know how to go there with empty hands.",
    farewell:
      'Oren allows the empty commemorative arch to be dismantled before leaving. Its sound stones will make garden steps. He sets out for his daughter’s workshop carrying a small bag and no timber order.',
  },
  maelin: {
    kind: 'preserved',
    requires: ['truth'],
    home: 'the watchkeepers’ coastal memorial',
    record:
      'Some of the watch lived twenty years after the evacuation. There are children and grandchildren who want to meet me. I keep trying to work out whether they had good lives. The records cannot tell me all of that. Tonight I rang for supper. I managed to let go of the rope.',
    farewell:
      'Maelin leaves to meet the watchkeepers’ families. She checks that the dinner bell works by hand before going. That evening somebody else rings it.',
  },
  ysra: {
    kind: 'preserved',
    requires: ['truth'],
    home: 'the community displaced by her survey',
    record:
      "The families have read my survey. Their children want me to see where the line went. I've agreed to go without a finished map. I'll need to listen first. I don't know whether they will want me to draw anything afterward.",
    farewell:
      'Ysra leaves with blank paper and the families’ invitation. The map she leaves at the guild still has an unfinished edge. She asks them not to fill it in for her.',
  },
};
const regionalLives = [
  [
    'tamsin',
    'living',
    'the fen relief camp',
    "Hesta put the water mark above the door. I measured it three more times because I didn't want it to mean what it meant. The families are moving until the pump is safe. I want to help with the dry camp. We can measure again tomorrow.",
  ],
  [
    'rufus',
    'living',
    'his sister’s ferry landing',
    "My sister kept the boat tied up for years. Then she gave it to someone who needed it. I was angry when I read that. Her second letter says there's a room if I want one. I think I will go. I can ask about the boat when I get there.",
  ],
  [
    'lark',
    'spirit',
    'the culvert memorial',
    "The log gives the time they cut my air hose. The colleague I kept searching for was me. My partner needs the log, not another promise to dive. I want to tell them I didn't turn back because I stopped caring.",
  ],
  [
    'kest',
    'living',
    'the firewatch settlement',
    "The furnace is out. I woke expecting the watch horn and couldn't decide what to do when it didn't sound. My crew wants to learn another trade. I'd like to join them. I don't know if I'll be any good at starting again.",
  ],
  [
    'ves',
    'spirit',
    'the kiln workers’ burial ground',
    "The watch order lists me among the dead. The kiln keepers had it all along; I kept delivering an instruction they couldn't obey. They've asked for my name at the burial ground. I would like to go without the order in my hand.",
  ],
  [
    'dara',
    'living',
    'her family’s farm',
    "My brother planted the field without me. In my head it was still waiting for seed. He says there's work if I come, and a bed whether I work or not. I folded that letter so often it split along the crease.",
  ],
  [
    'corin',
    'living',
    'the coastal lens workshop',
    "My daughter showed me a lens she made. It's better than mine. I began telling her how to improve it before I'd even thanked her. She's offered me the bench by the window. I will try to sit there before reaching for her tools.",
  ],
  [
    'fenn',
    'spirit',
    'the harbour where their partner lives',
    "The register says our rescue boat sank. I knew the kitchen in the false light. I didn't know it was the one my partner had moved out of. I want to hear what happened afterward from them, if they'll tell me.",
  ],
  [
    'mira',
    'living',
    'the harbour watch',
    "The lighthouse workers have asked me to join their watch. We argued about who gives the orders and how long a shift lasts. They argued back. I rather liked that. They've sent the rota for me to look at.",
  ],
  [
    'asha',
    'living',
    'the village seed house',
    "The old planting notes have Mother's handwriting beside mine. I followed them after the village grew around the garden, as though nothing else could change. The new seed house wants help. I will ask what they want to grow before I bring anything.",
  ],
  [
    'bram',
    'living',
    'the village carpenters’ yard',
    "My son has his own yard. He says I can work beside him. I keep thinking of the boy who held my nails, and he keeps describing someone I haven't met. I want to meet him before asking to change the workshop.",
  ],
  [
    'sorrel',
    'spirit',
    'the canopy hospice',
    "The medicine book records my last delivery and my death. The nurse who received it is still alive. She wrote that the children recovered. I have carried the basket long enough. I'd like to hear her say it once.",
  ],
  [
    'neris',
    'living',
    'the mountain weather station',
    "We lost people in the first avalanche. I kept restarting the ward when the safety readings failed. I wanted another morning to try. The cylinder records all of them. I will go back and help take today's measurements, even if they say the pass must stay closed.",
  ],
  [
    'tor',
    'living',
    'the mountain porters’ lodge',
    'The travellers are down. There will be others. There are other porters too. My family asked if I can come for a week without bringing a party. I said yes before I could turn it into another job.',
  ],
  [
    'eda',
    'preserved',
    'her grown apprentice’s survey hut',
    'My apprentice is the senior surveyor. She still has my broken measuring pole. She asked me to visit, and I nearly sent instructions instead. I have bought a new notebook. I want to find out what she knows now.',
  ],
  [
    'perrin',
    'living',
    'the town’s public workshop',
    "The court clock is moving. I want it in the public workshop where someone can open the case if it goes wrong. I used to hate people touching it. I would like to teach an apprentice who isn't afraid to do that.",
  ],
  [
    'joss',
    'living',
    'the prisoners’ public hearing',
    "Some of the cells I opened were ones I'd guarded. The people inside remember me. They've asked me to testify. I am afraid of what they will ask, and more afraid of deciding that means I shouldn't go.",
  ],
  [
    'pip',
    'living',
    'their mother’s bakery',
    "Mother was among the detained bakers. I found every service passage except the road to her shop. I thought she'd ask why it took so long. Her letter asks whether I've eaten. I don't know why that made me cry.",
  ],
  [
    'liora',
    'living',
    'the quay deposit office',
    "The chests are back, but some owners died before we reached them. Their families need help with the accounts. Returning the treasure was the easy part. I'd like to stay for the claims nobody can settle with a key.",
  ],
  [
    'maro',
    'preserved',
    'his grandchildren’s quay house',
    "My children have children. They've invited me to dinner. I have written their names on a card because I'm frightened of mixing them up. I hope they'll laugh if I do. I don't know what else to bring.",
  ],
  [
    'sal',
    'spirit',
    'the divers’ shore vigil',
    "The crew recovered everyone but me. They searched the wrong pressure chamber for years. I want to bring them the ledger. They can know where I was. They don't have to keep going down.",
  ],
  [
    'sable',
    'living',
    'the roadkeepers’ signal school',
    "The beacon was built to call people home. Some couldn't come, and it kept calling. I have plans for lamps a person can put out. I want to teach the keepers how to tell when the last light has done its work.",
  ],
  [
    'wynn',
    'living',
    'the surviving road camp',
    "My family moved the camp after the first attack. I kept defending the old fence. I know why I did it, but I can't explain it without sounding foolish. They've sent directions to the new place. I'll take them.",
  ],
  [
    'tavi',
    'spirit',
    'the hill travellers’ memorial',
    "The register puts my name in the missing column. I counted everyone through except myself. My sister has kept a lamp in the window. I'd like her to know I saw it. Then she can sleep without checking the wick.",
  ],
];
regionalLives.forEach(([id, kind, home, record]) => {
  const recruit = expansionRecruits.find((c) => c.id === id);
  const region = regions.find((r) => recruit.requires.includes(r.id + 'Step2'));
  if (!region) throw Error('Missing homecoming region: ' + id);
  journeys[id] = {
    kind,
    home,
    record,
    requires: [region.id + 'Step11'],
    farewell:
      kind === 'spirit'
        ? `${recruit.name} meets the people who have kept their memory. They can finally speak about the last journey and hear what happened afterward. When it is time to part, the guild records the farewell beside their name. Their place in its history remains.`
        : `${recruit.name} leaves for ${home}. Mara keeps their address, and the room is prepared for the next visitor. Their letters and the work they did remain in the guild records.`,
  };
});
for (const discovery of residentDiscoveries) {
  const journey = journeys[discovery.id];
  if (journey && journey.kind === 'living') journey.kind = 'preserved';
}

export const records = [
  {
    id: 'entrance',
    room: 'Entrance hall',
    author: 'Rowan',
    requires: [],
    text: "I came with a bag and no address for the register. Halden left the space blank. They showed me a room and asked if I'd eaten. I thought I would have to be worth keeping. That night somebody complained I'd taken their usual chair. I apologised. They pulled up another one.",
  },
  {
    id: 'service',
    room: 'Service room',
    author: 'Rowan',
    requires: ['repaired'],
    text: rowanPages.service,
  },
  {
    id: 'quarters',
    room: 'Quarters',
    author: 'Rowan',
    requires: ['repaired'],
    text: rowanPages.quarters,
  },
  {
    id: 'cellar',
    room: 'Flooded cellar',
    author: 'Halden',
    requires: ['cellarDrained'],
    text: 'Year one. Another attempt at the road failed. I took Mara home from the temporary infirmary today. She asked where her bed was before she asked my name. I can answer one of those questions easily. Tomorrow we will find her a bowl.',
  },
  {
    id: 'tower',
    room: 'Bell tower',
    author: 'Maelin',
    requires: ['towerCrown'],
    text: "Three strokes to clear the outer rooms and stairs. I rang three. The fourth came after my hand left the rope. I'm freezing the bell and its repeating circuit. If you find this, break the repeating line before you thaw it. Please check where my watch went.",
  },
  {
    id: 'labyrinth',
    room: 'Labyrinth heart',
    author: 'Ysra',
    requires: ['labyrinthHeart'],
    text: 'The infirmary door has moved to the rear stair. Keep the map live until the last patient is through. If the exit vanishes, stop the tracking rune. I have left the cancellation mark in the margin. There are still people on the route.',
  },
  ...rooms.map((r) => ({
    id: r.id,
    room: r.name,
    author: 'Rowan',
    requires: [r.operational],
    text:
      rowanPages[r.id] ||
      'I moved their cup this morning and put it back before lunch. They have gone where they wanted to go. I know that. The room can be empty without somebody needing a rescue party. I am getting used to how quiet it is.',
  })),
  ...chambers.map((r) => ({
    id: r.id,
    room: r.name,
    author: dungeonPages[r.id][0],
    requires: ['searched_' + r.id],
    text: dungeonPages[r.id][1],
  })),
  ...expansionRooms.map((r, i) => {
    const region = regions[Math.floor(i / 4)],
      people = regionalLives.slice(Math.floor(i / 4) * 3, Math.floor(i / 4) * 3 + 3),
      p = people[i % 4];
    return {
      id: r.id,
      room: r.name,
      author: p ? expansionRecruits.find((c) => c.id === p[0]).name : region.keeper,
      requires: [r.operational],
      text: p
        ? p[3]
        : `We have written the return addresses beside the room keys. ${region.ending} A room brought here must still have a road home.`,
    };
  }),
  ...Object.entries(journeys).map(([id, j]) => ({
    id: 'home-' + id,
    room: 'Personal correspondence',
    author: id,
    requires: j.requires,
    who: id,
    text: j.record,
  })),
].map((record) => ({
  ...record,
  ...(record.author === 'Halden'
    ? { provenance: 'From the correspondence Mara brought to the guild' }
    : {}),
}));
export function availableRecords(s) {
  return records.filter(
    (r) =>
      r.requires.every((f) => s.flags[f]) &&
      (!r.who || s.roster.some((c) => c.id === r.who)) &&
      !s.flags['record_' + r.id],
  );
}
export function recoverRecord(s, id) {
  const r = availableRecords(s).find((r) => r.id === id);
  if (!r) throw Error('This personal record is not accessible or has already been read.');
  s.flags['record_' + id] = true;
  const text = `${r.author} · ${r.room}${r.provenance ? '\n' + r.provenance : ''}\n${r.text}`;
  s.journal.push({ kind: 'Personal record', text });
  s.scenes.push({ title: r.room + ' · ' + r.author, body: text });
}
export const homecomingChoices = Object.entries(journeys).map(([id, j]) => ({
  id: 'homecoming-' + id,
  who: id,
  requires: [...j.requires, 'record_home-' + id],
  title: 'A road home',
  until: ['departed_' + id],
  body:
    j.record +
    '\nThey want to return to ' +
    j.home +
    '. ' +
    (j.kind === 'spirit'
      ? 'Their body did not survive the disaster, but the house kept their spirit here. They now know where the people who remember them can be found. Meeting them will allow a farewell and release the spirit from the house.'
      : 'They have found a place they want to go and ask Rowan to help arrange the journey.'),
  choices: [
    {
      id: 'release',
      label: j.kind === 'spirit' ? 'Help them pass on' : 'Wish them well and let them leave',
      preview:
        'They leave the guild permanently. Their equipment returns to the store room, and their story remains in the journal.',
      sets: ['departed_' + id],
      result: j.farewell,
    },
  ],
}));
export function releaseCompanion(s, id) {
  const c = s.roster.find((c) => c.id === id);
  if (!c || c.status !== 'home') throw Error('The companion must return home before departure.');
  for (const item of s.inventory || []) if (item.owner === id) item.owner = null;
  c.gear = null;
  delete c.gearUid;
  c.status = 'departed';
  if (s.selected === id) s.selected = 'rowan';
  if (s.storeVisitor === id) delete s.storeVisitor;
  c.memories.push({ day: s.day, text: journeys[id].farewell });
  s.journal.push({ kind: 'Farewell', text: journeys[id].farewell });
}
