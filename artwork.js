// World sprites and room materials keep one art direction.
import { paintInterior } from './room-personality.js';
export { paintCharacter } from './sprite-art.js';
export function paintRoom(ctx, camera, x, w, name, restored, details) {
  paintInterior(ctx, camera, x, w, name, restored, 0);
}
