import { mkdir, writeFile } from 'node:fs/promises';
import { classes, talents, xpRequired } from './classes.js';
import { portraits } from './portraits.js';
import { abilityNames } from './contracts.js';
import { skills } from './domain.js';

await mkdir('portraits', { recursive: true });
for (const [id, data] of Object.entries(portraits)) {
  await writeFile(`portraits/${id}.svg`, decodeURIComponent(data.split(',').slice(1).join(',')));
}

const effects = {
  physical: 'Reduces physical harm during expeditions and home defence.',
  magical: 'Reduces magical harm from wards, hostile spells and magical creatures.',
  undead: 'Reduces harm from ghosts, wraiths and undead guardians.',
  work: 'Increases daily party progress, shortening exposure to danger.',
  zombieWork: 'Increases daily work when travelling with an animated resident.',
  str: 'Adds party Strength for heavy repairs, rescues and clearing fights.',
  agi: 'Adds party Agility for crossings, pursuit and coastal rescues.',
  injuryWork: 'Keeps wounded fighters productive during prolonged assignments.',
  deathWard: 'Protects the wearer from one fatal hit per assignment.',
  partyDeathWard: 'Protects a companion from one fatal hit per assignment.',
  heal: 'Heals living companions at home or in the same expedition party.',
  mend: 'Repairs animated companions at home or in the same expedition party.',
  raise: 'Returns recovered remains as a zombie with a different ability set.',
  echo: 'Grants Echo sight for hidden routes and false-path investigations.',
  loot: 'Adds recovered gold to successful paid and story expeditions.',
  retreat: 'Brings an external party and its wounded home immediately.',
};
const milestones = [...new Set(talents.map((talent) => talent.level))].sort((a, b) => a - b);
let doc = `# Classes and skill choices

Automatic class growth increases stats when a character levels up. Each level grants one permanent choice shared by stat upgrades, foundation skills and class talents. Specialisation begins at level 3. Talent milestones are ${milestones.join(', ')}.

XP requirements grow quadratically: **35 + 15n + 10n²**, where n is the current level minus one. The first six requirements are **${Array.from({ length: 6 }, (_, i) => xpRequired(i + 1)).join(', ')} XP**. A contract grants at most one level; surplus XP carries forward. The maximum level is 20.

## Class growth

| Class | Automatic growth per level | Role |
| --- | --- | --- |
`;
for (const definition of Object.values(classes)) {
  const growth = Object.entries(definition.growth)
    .map(([stat, value]) => `${stat.toUpperCase()} +${value}`)
    .join(', ');
  doc += `| ${definition.name} | ${growth} | ${definition.desc} |\n`;
}
doc +=
  '\n## Choosing a skill\n\nChoose one option for each earned level. Class talents, foundation skills and stat upgrades share that choice. Class talents are available according to class and level; the other alternatives at that milestone close after selection. Any build can complete the main campaign.\n\n';
for (const [id, definition] of Object.entries(classes).filter(
  ([, definition]) => definition.base,
)) {
  doc += `## ${definition.name}\n\n${definition.desc}\n\n| Talent | Level | Alternatives | Game and story effect |\n| --- | --- | --- | --- |\n`;
  for (const talent of talents.filter((talent) => talent.branch === id)) {
    const alternatives = talents
      .filter(
        (other) => other.branch === id && other.level === talent.level && other.id !== talent.id,
      )
      .map((other) => other.name)
      .join(', ');
    const use = Object.keys(talent.effects)
      .map((effect) => effects[effect])
      .filter(Boolean)
      .join(' ');
    doc += `| ${talent.name} | ${talent.level} | ${alternatives} | ${talent.desc} ${use} |\n`;
  }
  doc += '\n';
}
doc += '## Foundation abilities\n\n| Ability | Class and level | Use |\n| --- | --- | --- |\n';
for (const [type, choices] of Object.entries(skills)) {
  for (const skill of choices)
    doc += `| ${skill.name} | ${classes[type].name}, level ${skill.level} | ${skill.desc} |\n`;
}
doc += `
## Discovery abilities and story gates

- Oren, Bram and Maro have **${abilityNames.stoneSong}**. A Stone singer at home reduces tower repairs from 80 to 40 gold and protects falling-stone expeditions.
- Maelin and several other residents have **${abilityNames.echoSight}**. It reveals the lower labyrinth and protects against false paths and undead threats.
- Ysra, Fenn, Eda and Tavi have **${abilityNames.threadwalk}**. It protects unstable crossings and rescue routes.
- **Water breathing** reaches the cellar's submerged drain wheel. Opening the sluice makes the cellar accessible to the whole guild.
- Rowan gains **House inscriptions** through the returned landing and **Anchor sight** through the observatory. These reveal the navigator lead and enable the final binding inspection.
- The independent archivist supplies seal diagrams after the archive seal is recovered. The escort costs 50 gold and four base days. The diagrams open the archive and release Maelin and Ysra.

## Injury, death and reanimation

Injury progresses through hurt, injured, incapacitated, unconscious and dead. Marked lethal assignments can kill. A conscious survivor can lead a retreat with the wounded and recovered remains. Mara's recovery crew retrieves lost remains for 60 gold and one day.

A rested necromancer with Raise dead can animate recovered remains for 80 gold. The resident retains identity, memories and relationships, gains STR +6 and END +8, loses 3 Agility and half their Intellect, and exchanges their living abilities for Undead labour and Grave endurance. Zombies gain STR +2 and END +2 per level and recover through repairs. A caster can perform one restoration or raising each day.

## References

[Characters](CHARACTERS.md) · [Discoveries](RESIDENT_DISCOVERIES.md) · [Campaign](CAMPAIGN.md)
`;
await writeFile('CLASSES_AND_SKILLS.md', doc);
