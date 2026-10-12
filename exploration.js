export const sleepers = [
  {
    id: 'oren',
    name: 'Oren',
    type: 'warrior',
    level: 4,
    str: 12,
    agi: 4,
    int: 6,
    end: 11,
    color: '#ba936c',
    skills: ['guard', 'stoneSong'],
    location: 'The crypt of erased names',
    x: 2050,
    y: 2070,
    requires: ['searched_crypt'],
    condition: 'Petrified',
    method: 'Strength 10 · remove the casting ring',
    bio: 'A guild mason trapped in his own stone-skin spell while bracing the collapsing burial stair beneath the holding cells.',
    story:
      'Beyond the restored memorial lantern, the burial stair rests on new timber now. The stone figure beneath it is still bent under a beam that no longer needs him.\nHis casting ring is jammed shut. When it is forced open, stone flakes from his shoulders. He drops to his knees and immediately reaches for the support.\n“Did they get down?” he asks.\nRowan tells him the stair was cleared. They do not know what happened to every passenger afterward.\nOren listens while Mara explains the thirty years. His tool belt is intact. He touches the buckle, then asks if they can find his daughter. She was seven when he came to work that morning.',
    ability: 'Stone song · covers falling-stone routes and strengthens tower access.',
  },
  {
    id: 'maelin',
    name: 'Maelin',
    type: 'mage',
    level: 5,
    str: 4,
    agi: 7,
    int: 12,
    end: 8,
    color: '#83bfca',
    skills: ['literacy', 'water', 'echoSight'],
    location: 'Bell tower crown',
    x: 520,
    y: -100,
    requires: ['towerCrown'],
    condition: 'Frozen in blue ice',
    method: 'Bell ward release diagram · Magical literacy',
    bio: 'The tower bellkeeper sealed herself inside a frost ward when the alarm began ringing on its own.',
    story:
      'The thaw takes time. Ice drains from Maelin’s sleeves while she remains braced against the bell rope.\nHer first movement is to catch the clapper. Nobody tells her to let go yet.\n“It rang after my hand left the rope,” she says. “I could hear Vey in the wall. Vey was downstairs.”\nShe recognises Rowan and asks who relieved the watch. Rowan explains that the others left thirty years ago.\nMaelin asks for a chair without releasing the clapper. Mara wraps it in a towel and holds it while she sits. They will look for the watchkeepers’ records. Tonight the bell can remain silent.',
    ability: 'Echo sight · opens the labyrinth’s lower passage and reads false paths.',
  },
  {
    id: 'ysra',
    name: 'Ysra',
    type: 'scout',
    level: 5,
    str: 5,
    agi: 12,
    int: 10,
    end: 8,
    color: '#d1a7c4',
    skills: ['tracking', 'threadwalk'],
    location: 'Labyrinth heart',
    x: 790,
    y: 1020,
    requires: ['labyrinthHeart', 'searched_maze'],
    condition: 'Bound in living ink',
    method: 'Magical literacy · cancel the tracking rune',
    bio: 'A cartographer trapped in a live map she used to guide people through the shifting house.',
    story:
      'The unfinished map keeps drawing an ink figure in the middle of a corridor that no longer exists. When the tracking rune is cancelled, the figure stops moving. Ink runs across the floor, and Ysra is there, clutching her pen.\nShe asks someone to tell the people at the stair that the infirmary route is failing.\nRowan sits beside her and explains the year. Ysra looks at the pen. Its nib has worn down to a blunt edge.\n“I was still drawing,” she says.\nShe asks for fresh paper. Her first sketch shows where the infirmary moved during the collapse. Then she draws a little kitchen beside it and asks whether anyone remembers who lived there.',
    ability: 'Threadwalk · covers unstable crossings and reveals safe routes.',
  },
];
export const sleeperConversations = [
  {
    id: 'orenRemember',
    who: 'oren',
    requires: ['awakened_oren'],
    title: 'The beam above the stair',
    body: 'Oren keeps finding white dust on his hands. He rubs it off on his trousers, apologises, and does it again.\nHe remembers six people above him when the stair began to fail. He used the stone spell and got beneath the beam. The next collapse bent his casting ring shut.\n“Three strokes first,” he says. “That meant clear the outer rooms and the stairs. Then it kept ringing. Continuous meant hold where you were.”\nThe people above him stopped moving. He shouted for them to run anyway.\nHe cannot say who rang the second alarm. From where he stood, he could not see the tower.\nWhen Rowan asks about his daughter, he starts describing a seven-year-old and has to stop. He asks to check the tower supports instead. It is something he knows how to do.',
    choices: [
      {
        id: 'choice',
        label: '“Check the tower supports. Tell Mara what timber you need.”',
        preview: 'Oren takes on the repair survey. Gain trust and a local repair contact.',
        bond: { oren: 1 },
        community: 1,
        result:
          'Oren marks three unsafe supports. Mara orders timber; he asks for another pair of hands rather than putting himself under the beam.\nIf Bryn can help, he shows her how to hear a split joint with a mallet. He has not yet found a way to talk about his daughter.',
      },
      {
        id: 'record',
        label: '“Draw the stair as it was that night.”',
        preview: 'Record where the collapse began. Gain trust and a structural clue.',
        bond: { oren: 1 },
        knowledge: 1,
        result:
          'Oren draws the stair and marks where the first support broke. The damage began beneath the outer-door mechanism.\n“That thing pulled before the floor fell,” he says. Rowan keeps his drawing to compare with the other accounts. It does not prove who gave the order.',
      },
    ],
  },
  {
    id: 'maelinRemember',
    who: 'maelin',
    requires: ['awakened_maelin'],
    title: 'The bell rang after she let go',
    body: 'Maelin flinches when a spoon drops. She is angry with herself for it.\n“Three strokes,” she says. “Vey was in the doorway. Disconnect the outer rooms. Clear the stairs.”\nShe rang the signal. After her hand left the rope, the bell struck again. The voice in the wall told people to stay where they were, using Vey’s voice.\nMaelin caught the rope. The sound continued. Her frost ward was the quickest way to silence the bell and the repeating mechanism together.\n“I thought someone would cut the rune after the doors closed.”\nNobody did. She looks at her palm, where the rope burns are still new, and asks Rowan to help write down the names of her watch.',
    choices: [
      {
        id: 'choice',
        label: '“Help us make the alarm safe before we use it again.”',
        preview: 'Maelin helps rebuild the alarm. Gain trust and a reliable warning system.',
        bond: { maelin: 1 },
        community: 1,
        result:
          'Maelin removes the repeating mechanism. She rings three strokes by hand, stops and waits.\nNo fourth stroke follows. She waits a little longer before unwrapping the clapper.',
      },
      {
        id: 'record',
        label: '“Write down Vey’s order while you remember the wording.”',
        preview: 'Preserve an eyewitness account. Gain trust and evidence about the evacuation.',
        bond: { maelin: 1 },
        knowledge: 1,
        result:
          'Maelin records Vey’s three-stroke order and the continuous alarm that followed. Rowan reads the two entries back.\n“Keep them separate,” she says. “People died between them.” She signs beneath both.',
      },
    ],
  },
  {
    id: 'ysraRemember',
    who: 'ysra',
    requires: ['awakened_ysra'],
    title: 'The route to the infirmary',
    body: 'Ysra draws the changing house on the kitchen floor. She has to move a chair to make room for the infirmary stair.\n“It was upstairs first. Then the connection shifted here. I kept the map live so they could find it.”\nThe exit vanished while her tracking spell was running. With no connected room left to place her in, the spell held her inside the map.\nShe remembers Halden, an assistant and a patient being carried through the last doorway. She did not see the patient’s face.\nRowan asks if the passage went anywhere else. Ysra draws three houses along its old route, then sits back.\n“I left those off the official survey. There were people in them.”',
    choices: [
      {
        id: 'choice',
        label: '“Mark the false turns before another search party goes below.”',
        preview: 'Ysra makes the maze safer to navigate. Gain trust and a usable return route.',
        bond: { ysra: 1 },
        community: 1,
        result:
          'Ysra marks the false turns and draws arrows back to the stair. She asks Mara to record who enters the lower passages and who returns.\nHer chalk is worn to a stub when she finishes. She puts it away instead of beginning another map.',
      },
      {
        id: 'record',
        label: '“Keep that route. It may help us find the infirmary.”',
        preview: 'Preserve the last known route. Gain trust and an infirmary clue.',
        bond: { ysra: 1 },
        knowledge: 1,
        result:
          "Ysra copies the infirmary route and marks where its doorway disappeared. The patient’s identity remains blank.\n“I didn't see them,” she tells Rowan. “I'm sorry. I can't make the drawing give us that.”",
      },
    ],
  },
];
export function awakeningCheck(s, id, c) {
  const d = sleepers.find((r) => r.id === id);
  if (!d) return 'Unknown resident.';
  if (s.roster.some((r) => r.id === id)) return 'Already awakened.';
  if (d.requires.some((f) => !s.flags[f])) return 'Recover access to this part of the house first.';
  if (!s.flags['found_' + id]) return 'Investigate the figure before attempting to awaken them.';
  if (id === 'maelin' && !s.flags.searched_potions)
    return 'Recover Maelin’s bell ward release diagram from beneath the cooling tiles in the suspended potion kitchen, then return to the tower crown.';
  if (id === 'oren' && c.str < 10) return 'Strength 10 is needed to remove Oren’s casting ring.';
  if (id !== 'oren' && !c.skills.includes('literacy') && !s.flags.archiveAssistance)
    return 'A present resident with Magical literacy must release this seal.';
  return null;
}
export function guildStairs(player, direction, s, c) {
  const { x, y } = player;
  if (player.floor === 1250) {
    if (x < 315 || x > 385) return { error: 'Return to the furnace door at the west end.' };
    return direction === 'up'
      ? { x: 875, y: 1020 }
      : { error: 'The furnace is the lowest floor. Use W to leave.' };
  }
  if (x >= 315 && x <= 385 && [380, 140, -100].includes(player.floor)) {
    if (!s.flags.tower)
      return {
        error:
          'Repair the tower stair at its foot with E. Complete The bell at Wren’s Crossing for its key.',
      };
    if (direction === 'up')
      return player.floor === -100
        ? { error: 'You are at the tower crown.' }
        : { x: 350, y: player.floor === 380 ? 140 : -100 };
    return player.floor === 380
      ? { error: 'The tower stair goes up. Cellar stairs are in the service corridor.' }
      : { x: 350, y: player.floor === -100 ? 140 : 380 };
  }
  if ([790, 1020].includes(player.floor)) {
    if (x < 485 || x > 570)
      return { error: 'Use the labyrinth stair at the brass thread (x 530).' };
    if (direction === 'up') return { x: 535, y: player.floor === 1020 ? 790 : 510 };
    if (player.floor === 1020) return { error: 'This is the labyrinth heart.' };
    if (
      !c.skills.includes('tracking') &&
      !c.skills.includes('echoSight') &&
      !c.skills.includes('threadwalk')
    )
      return { error: 'Tracking or Echo sight reveals the stair hidden in the false floor.' };
    return { x: 530, y: 1020 };
  }
  return null;
}

export function towerObjective(s) {
  if (!s.roster.some((c) => c.id === 'ivo'))
    return 'Investigate Ivo’s unfinished rune on the lower landing. Climb at the stair to inspect the frozen bell ward above.';
  if (!s.flags.searched_study)
    return 'Control Ivo. Enter the wizard’s study through the lower landing’s east doorway using Magical literacy, then investigate its notes and treasure.';
  if (!s.flags.searched_potions)
    return 'Follow the hidden shelf stair in the study with the recovered key. Search the potion kitchen for the cancellation sequence that releases the frozen bellkeeper.';
  if (!s.flags.awakened_maelin)
    return 'Climb to the tower crown. Investigate the frozen figure, then use Ivo’s Magical literacy to awaken Maelin. She joins with Echo sight.';
  return 'Maelin has Echo sight. Control her to enter the study’s reflection stair or reveal the false routes in the labyrinth.';
}
