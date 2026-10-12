import {writeFile} from 'node:fs/promises';
import {journeys,records} from './homecoming.js';
import {recruits,sleepers} from './domain.js';
const cast=[...recruits,...sleepers];
const chapters=Object.entries(journeys).map(([id,j])=>{
 const c=cast.find(c=>c.id===id);
 return `## ${c.name}\n\n${j.kind==='spirit'?'Spirit held by the house':j.kind==='preserved'?'Survivor preserved through magic':'Living companion'} · ${c.type==='mage'?'Wizard':c.type==='scout'?'Scout':'Warrior'}\n\n${c.bio}\n\n**Destination:** ${j.home}.\n\n**Personal record:**\n\n> ${j.record}\n\n**Farewell:** ${j.farewell}\n`;
});
await writeFile('HOMECOMINGS.md','# Companion lives and farewells\n\nCurrent authored content, with spoilers. Correspondence unlocks after personal or regional story progress. Read it in Diaries, then talk to the resident at home. Departures are permanent but may be postponed. Rowan’s history is in STORY_REVISION.md.\n\n'+chapters.join('\n'));
await writeFile('PERSONAL_RECORDS.md','# Room diaries, letters and testimony\n\nCurrent authored records. This document includes spoilers; the game only exposes accessible pages. Character correspondence is also collected in HOMECOMINGS.md.\n\n'+records.filter(r=>!r.who).map(r=>`## ${r.room}\n\n**${r.author}**\n\n${r.text}\n`).join('\n'));
