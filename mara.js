// Mara stays at the doorstep: a familiar and caretaker, not an expedition recruit.
export const mara = { x: 115, y: 380, name: 'Mara', kind: 'brass golem' };

export function maraDialogue(state) {
  return {
    title: 'Mara · brass golem familiar',
    body:
      'Mara sets down the kettle. Her brass fingers click softly against its handle. A worn guild token hangs beside the blue light in her chest.\n“Halden built me, then raised me,” she says. “They taught me to mend things. They also taught me that I could choose who to stay with. I chose you, Rowan.”\nShe keeps Halden’s letters in a dry compartment beneath her breastplate. She can cross the boundary to arrange supplies and workers while Rowan searches the house. She stays out of expedition parties to keep the entrance and its deliveries safe.\n' +
      (state.flags.free
        ? '“The house can manage without you now. Go where you like. I’ll keep the kettle warm.”'
        : state.flags.gateOpen
          ? '“The new anchors are holding. When you’re ready, I’ll meet you at the gate.”'
          : '“We’ll find a way to let you leave. Until then, you have me.”'),
  };
}

export function maraCopy(text) {
  return text
    .replaceAll(
      'Halden’s adopted daughter, a craftswoman',
      'a small brass golem built and raised by Halden',
    )
    .replaceAll(
      'Halden’s adopted daughter',
      'a small brass golem built and raised by Halden, now Rowan’s familiar',
    )
    .replaceAll('Halden raised me', 'Halden built me, then raised me')
    .replaceAll('Halden raised her outside', 'Halden built and raised her outside')
    .replaceAll('Mara reached the gate with', 'Mara, a small brass golem, reached the gate with');
}
