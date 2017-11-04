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
      limit: {
        vertical: 8,
        horizontal: 1
      },
      position: Position.Bottom,
      paddingRight: 10
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

    const multiColumn = new Pagination({
      scene,
      x: 100,
      y: 0,
      width: 150,
      height: 150,
      limit: {
        vertical: 5,
        horizontal: 5
      },
      position: Position.Bottom,
      paddingRight: 10
    });
    scene.append(multiColumn);
    for(let i = 0; i < 100; i++) {
      const rect = new g.FilledRect({
        scene,
        cssColor: colors[g.game.random.get(0, 4)],
        width: 10,
        height: 10,
        x: 10,
        y: 10
      });
      multiColumn.content.append(rect);
    }
  });
  g.game.pushScene(scene);
}
