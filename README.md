# The Bound House

A fantasy guild game about belonging, responsibility and the freedom to leave. Rowan survived the old guild's collapse through a binding to its magical house. Exploration recovers personal records, reconnects scattered rooms and releases thirty former guild members trapped during the evacuation. Their homecomings change the party as the guild learns to let people go.

## Run

```powershell
npm start
```

Open http://127.0.0.1:4173/. Node.js 20 or newer runs the game and tests. Install development tools with `npm install`.

## Play

- A/D or arrow keys move; Space jumps; W/S use stairs; E interacts.
- Click an object to approach it. Its description appears below the canvas; nearby objects show an interaction key.
- Switch characters through the home strip or Tab. Each person keeps their own room and position.
- Use Focus room, Wide view, +/− or the mouse wheel to adjust the camera.
- Characters, Training and Diaries use individual pages. Stories follows the investigation; Reports records completed expeditions.

Bryn is the opening companion. Ivo is discovered on the restored tower’s lower landing and starts with Magical literacy. Nell is found after investigating the holding cells; Oren waits beneath the crypt’s burial stair. Later discoveries follow recovered records, keys and regional expedition milestones.

The wall survey, mason's tool recovery and another opening request can bring Bryn to Strength 10. The tools reduce service restoration to 50 gold. The cellar-timber contract repairs the stairs. The dry landing leads to the flooded cellar; Water breathing reaches the submerged wheel that drains it and opens deeper exploration.

## Current game systems

Contracts identify story leads, plot rewards, companion journeys, regional work, exploration and repeatable wages. Party stats combine to determine duration. Each working day has a harm roll modified by protection, skills and equipment. Conscious survivors can retreat; home defenders remain visible beside the threat.

XP requirements grow quadratically from 35, 60 and 105 XP. Each contract can grant one level and carry surplus XP forward. Stats increase automatically with class growth. Each earned level gives one choice between skills, spells, class talents and a quartermaster equipment requisition. Equipment requisitions add a physical item to shared storage without charging gold. Warriors specialise as Barbarian or Paladin, Wizards as Necromancer or Healer, and Scouts as Thief or Archer.

Companion investigations start from level 4. Three later chapters open at levels 6, 10 and 14; farewell requires level 16. The last fighter cannot leave before the sewer rat and holding-cell guardian are cleared unless another fighter has joined. Early saves can invite a living companion who left below level 16 back through their character page.

Equipment belongs to shared storage. Companions visit the store to equip and return items in separate weapon, shield, head, body, feet and accessory slots.

Village workshop commissions spend one day earning 12 gold by repairing neighbours’ tools. Damaged guild rooms use their separate repair actions. Injuries, lethal expeditions, recovery, reanimation and permanent homecomings are saved alongside character positions, room discoveries and story decisions.

## Story and design references

- [Campaign](CAMPAIGN.md): history, investigation, central conflict and endings.
- [Characters](CHARACTERS.md): the complete playable cast and supporting witnesses.
- [Resident discoveries](RESIDENT_DISCOVERIES.md): rooms, trapping conditions and release scenes.
- [Homecomings](HOMECOMINGS.md): personal destinations and farewells.
- [Personal records](PERSONAL_RECORDS.md): diaries, letters and testimony.
- [Classes and skills](CLASSES_AND_SKILLS.md): growth, choices and game uses.
- [Guild exploration](GUILD_EXPLORATION.md): the tower and underworld routes.
- [Project status](PLAN.md): implemented features and planned extensions.

The live [graphics workshop](http://127.0.0.1:4173/graphics-preview.html) uses the game renderer. The [tower and underworld map](http://127.0.0.1:4173/guild-sprawl.html) and [wing atlas](http://127.0.0.1:4173/guild-complete.html) are visual references.

## Development

The applied editorial revision is preserved in [GAME_TEXT_REWRITTEN.md](GAME_TEXT_REWRITTEN.md). [GAME_TEXT.md](GAME_TEXT.md) is the current runtime catalogue; [GAME_TEXT_ORIGINAL.md](GAME_TEXT_ORIGINAL.md) preserves the reviewed snapshot. The import audit is in `TEXT_REVISION_AUDIT.json`.

```powershell
npm run docs
npm run format
npm run check
```

`generate-reference.mjs` is the single reference-generation entry point. It reads the same character, discovery, skill and diary data as the game. Edit those source definitions, then regenerate and format the references.

The simulation lives in `domain.js`, supported by focused modules for contracts, classes, equipment, exploration and homecomings. `game.js` coordinates input and presentation; `character-panel.js` renders character pages. The graphics modules paint the house, furnishings, equipment, creatures and affordances. `player-copy.js` migrates retired prose from stored games. The static server sends fresh resources for local development.

Existing versioned saves preserve progress and earned builds. Copy migration updates stored scenes, journal entries, reports and memories while retaining their mechanical state. Repository-wide searches should include ignored source files explicitly: `rg --no-ignore -g '!node_modules/**' -g '!.git/**'`.
