// Stair access and underwater access are separate. A key press commits one transition.
export function useStairs(
  { x, y },
  direction,
  { repaired, water, selected, anchor, drained = false },
) {
  const lower = y > 420;
  if (x < (lower ? 470 : 455) || x > (lower ? 645 : 555))
    return { error: 'Stand by the cellar stairwell to use W / S.' };
  if (!repaired)
    return { error: 'The stairs are collapsed. Press E at the top to repair them for 45 gold.' };
  if (direction === 'up')
    return lower ? { x: 505, y: 380 } : { error: 'You are already at the top of the stairs.' };
  if (!lower) {
    if (selected === 'rowan' && !anchor && !drained)
      return {
        error:
          'Rowan’s binding does not reach the cellar yet. An adventurer can use the dry landing.',
      };
    return { x: 535, y: 510 };
  }
  if (!water && !drained)
    return {
      error:
        'The cellar is flooded. A resident with Water breathing must reach the submerged drain wheel and empty it first.',
    };
  return { x: 570, y: 555 };
}
