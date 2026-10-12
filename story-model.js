import { regions, expansionMissions } from './expansion.js';
import { storyMissions } from './narrative.js';
import { homeThreats } from './contracts.js';
import { activeMission } from './contracts.js';
// Player-facing accounts are reconstructed from saved events, never from generic roster placeholders.
function mission(s, id) {
  return s.missions.find((m) => m.id === id && activeMission(m));
}
function task(s, id, title, summary, next) {
  const m = mission(s, id);
  if (m) {
    const names = m.party.map((id) => s.roster.find((c) => c.id === id)?.name || id).join(', ');
    return {
      title,
      summary,
      next:
        m.status === 'decision'
          ? `${names} sent a report. Read it in Contracts and choose what they should do.`
          : `${names} are on this journey. They are due back in ${m.remaining} ${m.remaining === 1 ? 'day' : 'days'}. Advance the day when your work at home is finished.`,
      tab: 'Contracts',
    };
  }
  return { title, summary, next, tab: 'Contracts' };
}
export function currentInvestigation(s) {
  const f = s.flags;
  const broken = Object.keys(s.damagedRooms || {});
  if (broken.length)
    return {
      title: 'Repair the damaged guild rooms',
      summary:
        'A home attack has damaged ' +
        broken
          .map((id) =>
            id === 'service' ? 'the service room' : id === 'quarters' ? 'the quarters' : id,
          )
          .join(', ') +
        '. Story work is blocked, even after the threat is cleared.',
      next: 'Defend the guild if the attack is still active, then use the 30-gold room repair buttons in Contracts. Previous discoveries will be preserved.',
      tab: 'Contracts',
    };
  const attack = homeThreats.find((d) => s.threats?.[d.id]?.active)?.id;
  if (attack)
    return {
      title: 'Defend the guild',
      summary:
        (attack !== 'monster'
          ? 'A home threat is haunting the guildhall. It attacks a resident first, then damages a room on its next undefended day. Damaged rooms need repairs before story work can continue.'
          : 'A wandering monster is attacking the gate. Each undefended day destroys up to 8 gold of supplies.') +
        ' Away residents cannot defend the house.',
      next: s.missions.some((m) => m.id === attack && activeMission(m))
        ? 'Defenders are fighting at home. Advance a day to continue; inspect daily injuries or withdraw residents from Contracts.'
        : 'Open Contracts and assign fit residents currently at home. Defence uses party stats and daily harm rolls.',
      tab: 'Contracts',
    };
  if (f.dragonFound && !f.dragonSlain) {
    const m = mission(s, 'dragon');
    return {
      title: 'Clear the furnace dragon',
      summary:
        'A dragon has nested in the guild’s old furnace. Its hoard cannot be inspected until the room is safe. Damage dealt by a clearing party is preserved when they withdraw.',
      next: m
        ? `The clearing party has ${m.remaining} days of work left. Advance days to fight, or withdraw any assigned resident immediately from Contracts.`
        : 'Build a party in Contracts. The target is combined Strength 60 for a ten-day clearing plan; weaker parties take longer. Check the daily harm risk before assigning anyone.',
      tab: 'Contracts',
    };
  }
  if (f.free) {
    const next = expansionMissions.find(
      (m) => !f[m.sets[0]] && (m.requires || []).every((flag) => f[flag]),
    );
    if (next) {
      const region = regions.find((r) => r.id === next.region);
      return task(
        s,
        next.id,
        region.name,
        region.problem,
        next.desc +
          ' Open Contracts to send a party. High-risk later jobs can kill; retreat while someone is conscious.',
      );
    }
  }
  if (f.free)
    return {
      title: 'Beyond the gate',
      summary:
        'Rowan has left the estate without being pulled back. The replacement anchors are holding.',
      next: 'Continue guild work or follow unfinished personal leads.',
      tab: 'Contracts',
    };
  if (f.gateOpen)
    return {
      title: 'Try the road',
      summary:
        'The new anchors are holding the house without Rowan. The gate is open, but Rowan has not yet stepped through it.',
      next: 'Control Rowan and walk left through the entrance gate.',
      walk: 160,
    };
  if (f.prepared)
    return {
      title: 'Disconnect Rowan from the house',
      summary:
        'The replacement anchor system has passed its tests. It can now take over from the spell keeping Rowan alive.',
      next: f.threshold
        ? 'Bring Rowan to the anchor table in the threshold chamber.'
        : 'Restore the threshold chamber for 220 gold, then bring Rowan to its anchor table.',
      walk: 2200,
    };
  if (
    f.truth &&
    s.missions.some((m) => ['covenant', 'lattice'].includes(m.id) && activeMission(m))
  ) {
    const m = s.missions.find((m) => ['covenant', 'lattice'].includes(m.id) && activeMission(m));
    return task(
      s,
      m.id,
      'Prepare the replacement anchors',
      'The guild has sent a party to arrange a system that can support the house without Rowan.',
      'Check Contracts for the party’s report.',
    );
  }
  if (f.truth)
    return {
      title: 'Find a replacement for Rowan',
      summary:
        'The recording shows Halden using the surviving house connection to support Rowan’s failing pulse. Rowan’s mind has been correcting that connection ever since. A replacement must perform the entire function before the binding can be removed.',
      next: 'Contracts has two preparation plans: anchors maintained by neighbouring settlements, or Ada’s mechanical seal. Either can support the house without Rowan.',
      tab: 'Contracts',
    };
  if (f.observatoryRead && f.gardenRead)
    return task(
      s,
      'witness',
      'Recover the infirmary recording',
      'The observatory has found the evacuation infirmary. Its recording can explain Halden’s treatment and the severance. The room’s anchor is failing, so the cylinder must be retrieved before the connection is lost.',
      `Dispatch “${storyMissions.find((mission) => mission.id === 'witness').name}” from Contracts before the record is lost.`,
    );
  if (f.archiveRead) {
    const tasks = [];
    if (!f.gardenAnchor) tasks.push('Visit Alder to recover the greenhouse anchor');
    else if (!f.garden) tasks.push('restore the greenhouse for 150 gold');
    else if (!f.gardenRead) tasks.push('inspect the restored greenhouse');
    if (!f.lens) tasks.push('visit Elian’s watchtower for the observatory lens');
    else if (!f.observatory) tasks.push('restore the observatory for 180 gold');
    else if (!f.observatoryRead) tasks.push('use the observatory lens');
    return {
      title: 'Follow the archive’s leads',
      summary:
        'The archive identifies Alder’s disputed greenhouse and the observatory lens at Elian’s tower. It also preserves a report of voices repeating after a test signal stopped. Those reports were dismissed before the experiment continued.',
      next: tasks.join('; ') + '.',
      tab: 'Contracts',
    };
  }
  if (f.archiveSeal)
    return {
      title: 'Open the returned archive',
      summary:
        'Sera’s seal has brought the archive door back. Its locking spell is still active. The old expedition records are inside.',
      next: f.library
        ? 'Inspect the records inside the archive.'
        : f.archiveAssistance
          ? 'The escorted archivist has supplied the seal diagrams. Take any available resident to the archive door and pay 110 gold for restoration.'
          : 'Learn Magical literacy, use a trained resident, or escort the independent archivist in Contracts. Then restore the archive for 110 gold.',
      walk: 1260,
    };
  if (f.inscription)
    return task(
      s,
      'navigator',
      'Find Captain Sera Venn',
      'The landing inscription says the connecting road was cut deliberately to keep something outside. It names Sera Venn as the keeper of the chart. She may know where the missing archive went.',
      `Send a party to find Sera on the coast: “${storyMissions.find((mission) => mission.id === 'navigator').name}” in Contracts.`,
    );
  if (f.anchor)
    return {
      title: 'Read the marks on the returned landing',
      summary:
        'The anchor from Wren’s Crossing has reconnected the landing. Rowan can now walk beyond the old boundary, and the marks on its wall have become readable.',
      next: 'Control Rowan, walk onto the landing and press E at the inscription.',
      walk: 1100,
    };
  if (f.ledger)
    return task(
      s,
      'anchor',
      'Recover the landing anchor',
      'The ledger describes an enchanted brass fitting for the missing landing. Placing it in the socket beside the service room will bring that part of the house back. The fitting is at Wren’s Crossing, where the keeper offers to return it if the guild helps him reach the village bell.',
      'Dispatch “The bell at Wren’s Crossing” from Contracts.',
    );
  if (f.repaired)
    return {
      title: 'Search the service-room records',
      summary:
        'The service room is safe to enter. Its shelves contain the old guild’s expedition records. One rack conceals a ledger.',
      next: 'Walk to the ledger in the service room and press E to read it.',
      walk: 870,
    };
  if (f.breach)
    return {
      title: 'Make the service room safe',
      summary:
        'The sealed wall is open. Fallen timber and loose masonry still block the records inside. Mara can hire workers to shore the ceiling and clear the room.',
      next:
        'Bring ' +
        (f.repairSupplies ? 50 : 70) +
        ' gold to the opening in the service corridor and press E to restore the room. Contracts can fund the repair.',
      walk: 705,
    };
  if (s.roster.length)
    return {
      title: 'Get through the sealed wall',
      summary:
        'Rowan cannot pass the end of the service corridor. Someone bricked up the adjoining room from the inside. The mortar is too thick to break without a strong resident.',
      next: 'Start with the wall survey and tool recovery in Contracts. Three varied early jobs can bring Bryn to Strength 10 through automatic growth; choosing Strength in Training can get there sooner. Then control Bryn and press E at the wall.',
      walk: 680,
    };
  return {
    title: 'Someone beneath the workshop door',
    summary:
      'Mara’s token has made the entrance reachable. A mason of the old guild is trapped beneath a door in a motionless fall. Rowan can release its latch.',
    next: 'Walk to the trapped figure in the entrance hall and press E to free Bryn.',
    walk: 240,
  };
}
export function characterAccount(s, c) {
  const f = s.flags,
    q = s.choices || {};
  let text = c.bio || '';
  if (c.id === 'bryn') {
    if (f.brynResolved)
      text =
        q['mission:brynPast'] === 'memorial'
          ? 'Bryn recovered her father’s memorial. The apprentice was rescued by a second crew, but his leg was badly injured. She has entered his name and injury in the report.'
          : 'Bryn helped rescue the trapped apprentice. Her father’s stone memorial broke during the rescue; she brought home rubbings of the surviving names.';
    else if (q.brynAnchor || s.missions.some((m) => m.id === 'brynPast'))
      text =
        'Bryn recognised her father’s mason mark under the service-room plaster. He never returned from his last guild job. She wants to search the waystation where he was sent.';
    else if (q.brynStart)
      text =
        q.brynStart === 'purpose'
          ? 'Bryn is repairing the quarters before searching the old records. Her shield was made from her father’s workshop door.'
          : 'Bryn showed Rowan her father’s chisel mark on the workshop door she uses as a shield. Rowan agreed to tell her if his name turns up in the records.';
    else
      text =
        'Bryn worked as a mason at the old guild and was trapped carrying her father’s door toward the failing stair. Thirty years passed outside. She wants to find the records of his waystation job and learn what happened to him afterward.';
  } else if (c.id === 'nell') {
    if (f.nellResolved)
      text =
        q['mission:nellPast'] === 'quiet'
          ? 'Nell has kept the shelter route off public maps. She will guide travellers herself and keeps the trader’s copy out of circulation.'
          : 'Nell and the shelter keepers have published the travelling route. The shelters themselves are marked only on the keepers’ private copies.';
    else if (q.nellShore || s.missions.some((m) => m.id === 'nellPast'))
      text =
        'Nell recognises the shelter route she learned from her grandmother and later used during the evacuation. Sera’s newer marks show that somebody maintained it during the thirty years Nell missed. She wants to meet the keepers and trace the families she guided.';
    else
      text =
        'Nell guided families past guild patrols, then folded the evacuation route behind them. The severance trapped her inside it. The road is open again, but she does not yet know which shelters and households survived.';
  } else if (c.id === 'ivo') {
    if (f.ivoResolved)
      text =
        q['mission:ivoPast'] === 'stay'
          ? 'Ivo found Ada at the monastery and helped install a replacement seal. She chose to stay with a relief keeper. He brought her calculations back to the guild.'
          : 'Ivo helped replace the seal Ada had been maintaining at the monastery. His former teacher has returned to the house with the calculations needed for a safer anchor.';
    else if (q.ivoArchive || s.missions.some((m) => m.id === 'ivoPast'))
      text =
        'Ivo recognised his teacher Ada’s handwriting in the archive. She dismissed a warning before the disaster. He wants to find her and ask what she knew.';
    else if (q.ivoStart)
      text =
        q.ivoStart === 'house'
          ? 'Ivo is tracing the house inscriptions without examining Rowan directly. Ada’s old symbols appear in them. He hopes the archive will show where his teacher went during the thirty years he missed.'
          : 'Ivo wants to understand Rowan’s binding. Rowan has agreed to experiments only after each procedure is explained. He is also searching for his missing teacher, Ada.';
    else
      text =
        'Ivo was Ada Merrow’s guild apprentice. An unfinished protective rune held him above the service-room shelves. Now free, he wants to learn what happened to his teacher during the years he missed.';
  } else if (c.id === 'oren') {
    text =
      'Oren used a stone-skin spell to brace the cellar ceiling during the collapse. An iron casting ring jammed and kept the spell active. The repaired stair now supports the ceiling; removing the ring freed him.';
    if (q.orenRemember)
      text +=
        q.orenRemember === 'choice'
          ? ' He is checking the tower supports before anyone climbs. He asked for new timber and a second pair of hands.'
          : ' He has drawn the old stair layout and marked the places where the supports failed.';
    else
      text +=
        ' His last memories before the stone-skin hardened are a warning bell and the rear stair collapsing.';
  } else if (c.id === 'maelin') {
    text =
      'Maelin sealed herself and the tower bell in a frost ward when the alarm began repeating without anyone pulling its rope. The ward stopped the bell but trapped her inside. Disabling its repeating rune let the ice thaw.';
    if (q.maelinRemember)
      text +=
        q.maelinRemember === 'choice'
          ? ' She is repairing the alarm so a person has to ring it; it can no longer repeat a sound from the walls.'
          : ' She has written down the order she heard: disconnect the outer doors and clear the stairs.';
    else
      text +=
        ' Maelin remembers Vey’s order to clear the stairs and the false instruction that followed in the same voice. Her frost ward stopped the bell carrying that second signal.';
  } else if (c.id === 'ysra') {
    text =
      'Ysra linked her map to the house to guide people out while the corridors shifted. The map kept drawing her position after its exit disappeared, pulling her into the ink. Cancelling that tracking rune released her.';
    if (q.ysraRemember)
      text +=
        q.ysraRemember === 'choice'
          ? ' She is marking the labyrinth’s false turns with chalk so the next search party can find its way back.'
          : ' She has reconstructed the route used on the night of the collapse. It ends at the missing infirmary.';
    else
      text +=
        ' The infirmary was the last place her map lost. She remembers who was still on its route.';
  }
  return text;
}
export function knownHistory(s) {
  const f = s.flags,
    events = [
      {
        title: 'Mara found the entrance',
        text: 'Mara is Halden’s adopted daughter. Following their final treatment notes, she repaired the entrance connection with their brass token. She told Rowan that Halden died last autumn and brought the letters from their years outside. Mara arranges supplies while the guild earns enough to reopen the house.',
      },
    ];
  if (f.breach)
    events.push({
      title: 'The service wall was opened',
      text: f.repaired
        ? 'Workers cleared the fallen timber and secured the service room. Its records can be searched.'
        : 'There is a room behind the wall. It needs shoring and clearance before its records can be searched.',
    });
  if (f.ledger)
    events.push({
      title: 'The ledger named Wren’s Crossing',
      text: 'A landing anchor was recorded there. The ledger warns against reconnecting the larger threshold.',
    });
  if (f.anchor)
    events.push({
      title: 'The landing returned',
      text: 'The Wren’s Crossing anchor reconnected a missing part of the estate and extended Rowan’s walking boundary.',
    });
  if (f.inscription)
    events.push({
      title: 'The road was cut deliberately',
      text: 'The landing inscription says something was kept outside. It names Sera Venn as the keeper of the chart.',
    });
  if (f.archiveRead)
    events.push({
      title: 'The archive contradicted the official account',
      text: 'Witness corrections identify disputed removals from Alder and a warning ignored before the last joining.',
    });
  if (f.dragonFound)
    events.push({
      title: f.dragonSlain ? 'The furnace dragon was killed' : 'A dragon is occupying the furnace',
      text: f.dragonSlain
        ? 'The nest held 240 gold and the guild’s missing forge tools. The room is safe.'
        : 'The dragon’s hoard is uninspected. A high-risk clearing contract is available; wounded parties can withdraw and resume later.',
    });
  for (const r of regions) {
    const completed = Array.from({ length: 12 }, (_, i) => f[r.id + 'Step' + i]).filter(
      Boolean,
    ).length;
    if (completed)
      events.push({
        title: r.name + ' · ' + completed + '/12',
        text:
          completed === 12
            ? r.ending
            : r.problem +
              ' The guild has completed ' +
              completed +
              ' stages of the repair and rescue effort.',
      });
  }
  if (f.truth)
    events.push({
      title: 'Halden’s recording explained the binding',
      text: 'The infirmary recording shows Halden binding Rowan’s failing pulse to the surviving house connection. They intended to replace the treatment once the doors were safe. Vey ordered the road severed before Rowan could be transferred. The new guild now knows what its replacement must take over.',
    });
  return events;
}
export function optionalHouseLeads(s) {
  const f = s.flags,
    out = [];
  if (f.stairs && !f.cellarDrained)
    out.push({
      title: 'Drain the flooded cellar',
      text: 'Train Ivo to level 3 and learn Water breathing, or use Maelin. Dive from the dry landing, find the labelled drain wheel beside the ship and press E. Opening the sluice drains the room permanently so everyone can enter.',
    });
  if (f.stairs && !f.awakened_oren)
    out.push({
      title: f.found_oren ? 'Free the stone mason' : 'The figure on the cellar landing',
      text: f.found_oren
        ? 'Oren’s casting ring is jammed. A resident with Strength 10 can remove it once the stair repairs are supporting the ceiling.'
        : 'The repaired stairs lead to a dry landing with a human figure standing beneath a broken beam. Investigate it with E.',
    });
  if (f.anchor && !f.tower)
    out.push({
      title: 'The stair above the quarters',
      text:
        'Wren’s keeper returned the bell-tower key with the brass fitting. The quarters hatch can now be opened. Repairing its supports costs ' +
        (s.roster.some((c) => c.id === 'oren' && c.status === 'home') ? 40 : 80) +
        ' gold. Use E at its foot, then W to climb.',
    });
  if (f.tower && !f.towerCrown)
    out.push({
      title: 'Search the bell tower',
      text: 'The lower landing is connected. Climb again at the stair to reach the bell chamber.',
    });
  if (f.found_maelin && !f.awakened_maelin)
    out.push({
      title: 'Break the frost ward',
      text: 'Maelin is trapped with the bell at the tower crown. Magical literacy, or diagrams supplied by the escorted independent archivist, disables the repeating frost rune.',
    });
  if (f.stairs && f.anchor && !f.labyrinth)
    out.push({
      title: 'The thread below the cellar',
      text: 'Wren’s keeper returned the labyrinth gate key. The labelled gate is on the dry cellar landing. Use E there to unlock the lower passage.',
    });
  if (f.labyrinth && !f.labyrinthHeart)
    out.push({
      title: 'Find the stair hidden in the labyrinth',
      text: 'The upper passage ends at a false floor. Tracking or Maelin’s Echo sight can reveal the lower stair.',
    });
  if (f.found_ysra && !f.awakened_ysra)
    out.push({
      title: 'Release the cartographer',
      text: 'Ysra is caught in the living map at the labyrinth heart. Use Magical literacy or the independent archivist’s annotated diagrams to cancel its tracking rune.',
    });
  if (f.labyrinthHeart && !f.dragonFound)
    out.push({
      title: 'The warm iron door',
      text: 'An iron door at the east end of the lower labyrinth is warm to the touch. Investigate it with E.',
    });
  return out;
}
