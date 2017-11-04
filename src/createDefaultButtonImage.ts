"use strict";

export function createDefaultButtonImage(
  game: g.Game,
  width: number,
  height: number,
  color: string
): g.Surface {
  const w = Math.round(width);
  const h = Math.round(height);
  const s = game.resourceFactory.createSurface(w, h);
  const r = s.renderer();
  r.begin();
  r.fillRect(0, 0, w, h, color);
  r.end();
  return s;
}
