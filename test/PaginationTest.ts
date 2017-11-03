"use strict";
import * as assert from "assert";
import {Context} from "@xnv/headless-akashic";
import "@xnv/headless-akashic/polyfill";
import {Pagination, Position} from "../src/Pagination";

describe("Pagination", () => {
  function prepareScene(fun: (game: g.Game, scene: g.Scene) => (void | Promise<void>)): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const ctx = new Context();
      ctx.start().then((game: g.Game) => {
        const scene = new g.Scene({ game });
        scene.loaded.add(() => {
          (fun(game, scene) || Promise.resolve()).then(() => {
            ctx.end();
            resolve();
          });
        });
        game.pushScene(scene);
      });
    });
  }

  it("can be appended entities and clicked", () => {
    return prepareScene((game, scene) => {
      const pagination = new Pagination({
        scene,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        limit: 8,
        position: Position.Bottom
      });
      scene.append(pagination);
      const redRect = new g.FilledRect({
        scene,
        cssColor: "red",
        width: 80,
        height: 10,
        x: 10,
        y: 10
      });
      pagination.content.append(redRect);
      assert(redRect.y === 10);
      const blueRect = new g.FilledRect({
        scene,
        cssColor: "blue",
        width: 80,
        height: 2,
        x: 10,
        y: 10
      });
      pagination.content.append(blueRect);
      assert(blueRect.y === 30);
    });
  });

  it("can be selected button position", () => {
    return prepareScene((game, scene) => {
      const pagination = new Pagination({
        scene,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        limit: 1,
        position: Position.Top
      });
      scene.append(pagination);
      const redRect = new g.FilledRect({
        scene,
        cssColor: "red",
        width: 80,
        height: 10,
        x: 10,
        y: 10
      });
      pagination.content.append(redRect);
      assert(redRect.y === 34);
    });
  });

  it("can be set limit", () => {
    return prepareScene((game, scene) => {
      const pagination = new Pagination({
        scene,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        limit: 1,
        position: Position.Bottom
      });
      scene.append(pagination);
      const redRect = new g.FilledRect({
        scene,
        cssColor: "red",
        width: 80,
        height: 10,
        x: 10,
        y: 10
      });
      pagination.content.append(redRect);
      const blueRect = new g.FilledRect({
        scene,
        cssColor: "blue",
        width: 80,
        height: 10,
        x: 10,
        y: 10
      });
      pagination.content.append(blueRect);
      assert(blueRect.x === 110);
      assert(blueRect.y === 10);
    });
  });
});
