"use strict";

export function createDefaultButtonImage(
  game: g.Game,
  width: number,
  height: number,
  color: string
): g.Surface {
  const s = game.resourceFactory.createSurface(width, height);
  const r = s.renderer();
  r.begin();
  r.fillRect(0, 0, width, height, color);
  r.end();
  return s;
}
