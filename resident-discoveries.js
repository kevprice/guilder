import { expansionRooms, expansionRecruits } from './expansion.js';
import { sleepers } from './exploration.js';
const first = [
  {
    id: 'bryn',
    x: 240,
    y: 380,
    requires: [],
    condition: 'Caught beneath a stasis-bound door',
    method: 'Lift the loose latch',
    story:
      'The workshop door is balanced across Bryn’s shoulder. Dust hangs motionless around its latch. Rowan remembers her carrying it toward the failing stair.\nLifting the latch breaks the ward. Bryn catches the door, curses its weight and asks Rowan to take one end.\nShe thinks the alarm has only just stopped. Rowan tells her the year. She looks toward the stair, then back at them.\n“Father was meant to come on Friday,” she says.\nMara helps them lower the door. Bryn runs her hand over its familiar chisel mark. Later she will fit straps to it. For now she asks whether there are any letters.',
  },
  {
    id: 'nell',
    x: 1850,
    y: 1770,
    requires: ['searched_cells'],
    condition: 'Trapped behind a sealed door',
    method: 'Open the chalk doorway',
    story:
      'At the back of the abandoned holding cells, a doorway has been drawn in chalk. Rowan rubs out the line across its handle. A latch appears beneath their hand.\nNell steps through with a guide’s satchel. “Is anyone else still in here?”\nShe had led the last families out, given them directions to the shelters and come back to search the rooms. When she turned to leave, the door was gone.\nRowan tells her that was thirty years ago. Nell looks at the bread in her satchel. It is still soft.\nShe takes out a list of names and addresses. “These are the places I sent them. Can we ask?”',
  },
  {
    id: 'ivo',
    x: 650,
    y: 140,
    requires: ['ledger', 'anchor', 'tower'],
    condition: 'Held inside an unfinished protective rune',
    method: 'Close the open line in Ada’s diagram',
    story:
      'On the lower bell-tower landing, Ivo hangs above the notebook, one hand outstretched toward the finishing stroke of his rune. The spell keeps a fallen shelf from crushing him, but it has never released its caster.\nRowan follows Ada’s margin diagram and closes the line. Ivo lands badly, still trying to save the book. Mara helps him up.\n“Is the joining over?” he asks. Then, seeing Rowan’s face: “What happened?”\nHis last memory is Ada sending him to fetch the test records. Thirty years have passed since then.\nHe sits with the notebook on his knees. After a while he asks where his teacher is. Rowan remembers the records in the service room. They can start there.',
  },
];
const traps = [
  [
    'Held in a reversed-water ward',
    'Turn the disconnected hand valve',
    'Their drainage ward stopped the disaster at this room’s door, but held its keeper in the same unfinished moment.',
  ],
  [
    'Caught in a cooling circle',
    'Break the chalk circuit with its wooden switch',
    'The old guild’s fire crew sealed this room before the furnace spread. The protective circle never released its occupants.',
  ],
  [
    'Caught behind a reflected doorway',
    'Cover the spare mirror with its cloth',
    'The coast watch tried to close a false road. Their own reflection kept calling them back into the room.',
  ],
  [
    'Sleeping inside a root cradle',
    'Open the labelled pruning latch',
    'The guild’s growers used a living shelter to protect this room. Its roots held the occupants after the evacuation ended.',
  ],
  [
    'Preserved in a snow ward',
    'Turn the thaw lever shown on the wall',
    'The weather crew stopped the collapsing roof with a freezing ward. The ward preserved them alongside the ice.',
  ],
  [
    'Held by the emergency clock',
    'Release the local pendulum brake',
    'The guild’s court staff were held by a clock that refused to let the emergency hour finish.',
  ],
  [
    'Suspended inside a pressure seal',
    'Open the isolated pressure release',
    'The guild’s divers sealed the borrowed room against the sea. Their safety spell trapped them inside its pressure boundary.',
  ],
  [
    'Lost inside a signal echo',
    'Disconnect the local echo receiver',
    'The roadkeepers brought this room into the house during the evacuation. Its broken receiver kept repeating their final signal.',
  ],
];
export const residentDiscoveries = [
  ...first,
  ...expansionRecruits.map((c, i) => {
    const room = expansionRooms.find(
        (r) => r.region === c.region && r.id.endsWith('Room' + [0, 1, 3][i % 3]),
      ),
      trap = traps[Math.floor(i / 3)];
    return {
      id: c.id,
      x: room.x + 80,
      y: 380,
      requires: [room.operational, c.region + 'Step' + [6, 9, 11][i % 3]],
      condition: trap[0],
      method: trap[1],
      story: `${c.name} wears the old guild’s ${c.type === 'mage' ? 'spellkeeper' : c.type === 'warrior' ? 'watch' : 'pathfinder'} insignia. ${trap[2]} The explorer follows the surviving release diagram. When the ward opens, ${c.name} asks whether the evacuation is over. Rowan explains how long the room has been cut off. They sit together before looking through the belongings for a home address. Someone outside may still be waiting for news.`,
    };
  }),
];
export function discoveryAvailable(s, d) {
  return d.requires.every((f) => s.flags[f]) && !s.roster.some((c) => c.id === d.id);
}
export function residentPosition(s, id) {
  if (s.residentPositions?.[id]) return { ...s.residentPositions[id], vy: 0 };
  if (id === 'mara') return { x: 115, y: 380, floor: 380, vy: 0 };
  const d = [...residentDiscoveries, ...sleepers].find((d) => d.id === id);
  if (d && d.requires.every((f) => s.flags[f])) return { x: d.x, y: d.y, floor: d.y, vy: 0 };
  const index = s.roster.findIndex((c) => c.id === id);
  return {
    x: id === 'rowan' ? 160 : 235 + (Math.max(0, index) % 12) * 30,
    y: 380,
    floor: 380,
    vy: 0,
  };
}
export function rememberPosition(s, id, p) {
  s.residentPositions ||= {};
  s.residentPositions[id] = { x: p.x, y: p.floor, floor: p.floor };
}
