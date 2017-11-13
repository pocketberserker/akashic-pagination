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
        limit: {
          vertical: 8,
          horizontal: 1
        },
        position: Position.Bottom,
        paddingRight: 0
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
      assert(redRect.x === 10);
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
      assert(blueRect.x === 10);
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
        limit: {
          vertical: 1,
          horizontal: 1
        },
        position: Position.Top,
        paddingRight: 0
      });
      scene.append(pagination);
      assert(pagination.content.y === 24);
    });
  });

  it("can be moved offset", () => {
    return prepareScene((game, scene) => {
      const pagination = new Pagination({
        scene,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        limit: {
          vertical: 1,
          horizontal: 1
        },
        position: Position.Bottom,
        paddingRight: 0
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
        height: 2,
        x: 10,
        y: 10
      });
      pagination.content.append(blueRect);

      pagination.moveOffset(1);
      assert(pagination.content.x === -100);
    });
  });

  it("can be set limit", () => {
    return prepareScene((game, scene) => {
      const pagination = new Pagination({
        scene,
        x: 0,
        y: 0,
        width: 200,
        height: 100,
        limit: {
          vertical: 2,
          horizontal: 2
        },
        position: Position.Bottom,
        paddingRight: 10
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
      assert(redRect.x === 10);
      assert(redRect.y === 10);
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
      const yellowRect = new g.FilledRect({
        scene,
        cssColor: "yellow",
        width: 80,
        height: 10,
        x: 10,
        y: 10
      });
      pagination.content.append(yellowRect);
      assert(yellowRect.x === 10);
      assert(yellowRect.y === 30);
      const greenRect = new g.FilledRect({
        scene,
        cssColor: "green",
        width: 80,
        height: 10,
        x: 10,
        y: 10
      });
      pagination.content.append(greenRect);
      assert(greenRect.x === 110);
      assert(greenRect.y === 30);
      const blackRect = new g.FilledRect({
        scene,
        cssColor: "black",
        width: 80,
        height: 10,
        x: 10,
        y: 10
      });
      pagination.content.append(blackRect);
      assert(blackRect.x === 210);
      assert(blackRect.y === 10);
    });
  });

  it("never throws while scene transition", () => {
    return prepareScene((game, scene) => {
      const pagination = new Pagination({
        scene,
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        limit: {
          vertical: 1,
          horizontal: 1
        },
        position: Position.Top,
        paddingRight: 0
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
      return new Promise<void>((resolve, reject) => {
        scene.setTimeout(function () {
          var nextScene = new g.Scene({ game });
          nextScene.loaded.add(() => resolve());
          game.replaceScene(nextScene);
        }, 1);
      });
    });
  });
});
