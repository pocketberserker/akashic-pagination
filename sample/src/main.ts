"use strict";
import {Pagination, Position} from "../../lib/index";

module.exports = function() {
  const scene = new g.Scene({game: g.game});
  scene.loaded.add(() => {
    const pagination = new Pagination({
      scene,
      x: 0,
      y: 0,
      width: 100,
      height: 200,
      limit: 8,
      position: Position.Bottom
    });
    scene.append(pagination);
    const colors = [
      "red",
      "green",
      "blue",
      "yellow",
      "black"
    ];
    for(let i = 0; i < 100; i++) {
      const rect = new g.FilledRect({
        scene,
        cssColor: colors[g.game.random.get(0, 4)],
        width: 80,
        height: 10,
        x: 10,
        y: 10
      });
      pagination.content.append(rect);
    }
  });
  g.game.pushScene(scene);
}