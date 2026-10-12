import { writeFile } from 'node:fs/promises';
import { journeys, records } from './homecoming.js';
import { recruits, sleepers } from './domain.js';
import { residentDiscoveries } from './resident-discoveries.js';
import { expansionRooms } from './expansion.js';
const cast = [...recruits, ...sleepers];
const chapters = Object.entries(journeys).map(([id, j]) => {
  const c = cast.find((c) => c.id === id);
  return `## ${c.name}\n\n${j.kind === 'spirit' ? 'Spirit held by the house' : j.kind === 'preserved' ? 'Survivor preserved through magic' : 'Living companion'} · ${c.type === 'mage' ? 'Wizard' : c.type === 'scout' ? 'Scout' : 'Warrior'}\n\n${c.bio}\n\n**Destination:** ${j.home}.\n\n**Personal record:**\n\n> ${j.record}\n\n**Farewell:** ${j.farewell}\n`;
});
await writeFile(
  'HOMECOMINGS.md',
  '# Companion lives and farewells\n\nCurrent authored content, with spoilers. Correspondence unlocks after personal or regional story progress. Read it in Diaries, then talk to the resident at home. Departures are permanent but may be postponed. Rowan’s history is in STORY_REVISION.md.\n\n' +
    chapters.join('\n'),
);
await writeFile(
  'PERSONAL_RECORDS.md',
  '# Room diaries, letters and testimony\n\nCurrent authored records. This document includes spoilers; the game only exposes accessible pages. Character correspondence is also collected in HOMECOMINGS.md.\n\n' +
    records
      .filter((r) => !r.who)
      .map(
        (r) =>
          `## ${r.room}\n\n**${r.author}**\n\n${r.provenance ? r.provenance + '\n\n' : ''}${r.text}\n`,
      )
      .join('\n'),
);
await writeFile(
  'RESIDENT_DISCOVERIES.md',
  '# People trapped in the old guild\n\nAll thirty companions are discovered within the house. Release is free. Approach the figure and press E; the three original sealed residents retain their existing skill requirements. Regional missions recover doorways and records, rather than recruiting people outside.\n\n' +
    [...residentDiscoveries, ...sleepers]
      .map((d) => {
        const c = cast.find((c) => c.id === d.id),
          room =
            d.location ||
            { bryn: 'Entrance hall', nell: 'Quarters', ivo: 'Restored service room' }[d.id] ||
            expansionRooms.find((r) => d.requires.includes(r.operational))?.name;
        return `## ${c.name}\n\n**Room:** ${room}. **Condition:** ${d.condition}.\n\n**Release:** ${d.method}.\n\n${d.story}\n`;
      })
      .join('\n'),
);
const entries = cast.map((c) => {
  const d = [...residentDiscoveries, ...sleepers].find((d) => d.id === c.id),
    room =
      d.location ||
      { bryn: 'Entrance hall', nell: 'Quarters', ivo: 'Restored service room' }[d.id] ||
      expansionRooms.find((r) => d.requires.includes(r.operational))?.name,
    j = journeys[c.id];
  return `## ${c.name}\n\n![${c.name}](portraits/${c.id}.svg)\n\n**Class:** ${c.type === 'mage' ? 'Wizard' : c.type === 'scout' ? 'Scout' : 'Warrior'}. **Starting level:** ${c.level || 1}. **Stats:** STR ${c.str} · AGI ${c.agi} · INT ${c.int} · END ${c.end}.\n\n**Found in:** ${room}. **Trapped by:** ${d.condition}. **Release:** ${d.method}.\n\n${d.story}\n\n**Starting abilities:** ${(c.skills || c.startingSkills || []).join(', ') || 'Learn through Training'}.\n\n**Homecoming:** ${j.home}. ${j.kind === 'spirit' ? 'Their personal evidence reveals a spirit who can pass on.' : 'Magic preserved them across the years; returning home means discovering what changed.'}\n`;
});
await writeFile(
  'CHARACTERS.md',
  '# Available characters\n\nThere are 31 controllable characters: Rowan and thirty discoverable former guild members. Regional missions recover rooms and records; residents are released inside restored guild rooms. Every character has a portrait. Existing saved parties remain available.\n\n## Rowan\n\n![Rowan](portraits/rowan.svg)\n\nThe bound survivor and protagonist, STR 2 · AGI 4 · INT 7 · END 4. Rowan belonged to the old guild and helped catalogue its acquired rooms. Halden saved their life through the emergency binding. Rowan cannot leave until a replacement is prepared. House inscriptions and Anchor sight are gained through the main investigation.\n\n' +
    entries.join('\n') +
    '\n## Supporting cast\n\nMara, raised by Halden, returns the inherited token and helps with repairs. Ada Merrow is Ivo’s teacher and an old guild researcher. Vey authorised the joining and severance. Halden saved Rowan, lived outside for twenty-nine years, and died before the entrance reopened. Sera Venn, Edda and Elian are surviving witnesses. Present regional keepers are distinct from the old guild residents trapped in the house. These supporting people are not additional playable recruits.\n\nReferences: [Discovery scenes](RESIDENT_DISCOVERIES.md), [Homecomings](HOMECOMINGS.md), [Classes and skills](CLASSES_AND_SKILLS.md), [Story revision](STORY_REVISION.md).\n',
);
