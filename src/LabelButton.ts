"use strict";
import {Button} from "./Button";

export interface LabelButtonParameterObject {
  scene: g.Scene;
  width: number;
  text: string;
  image: g.Surface;
}

export class LabelButton extends g.Pane implements Button {

  onClick: g.Trigger<void>;
  private label: g.Label;

  constructor(param: LabelButtonParameterObject) {
    super({
      scene: param.scene,
      width: param.width,
      height: param.image.height,
      backgroundImage: param.image,
      backgroundEffector: new g.NinePatchSurfaceEffector(param.scene.game, Math.floor(param.image.width / 2)),
      touchable: true
    });
    this.onClick = new g.Trigger<void>();
    const font = new g.DynamicFont({
      game: param.scene.game,
      fontFamily: g.FontFamily.SansSerif,
      size: 15
    });
    this.label = new g.Label({
      scene: param.scene,
      font,
      text: param.text,
      fontSize: 18,
      textColor: "white",
    });
    this.label.aligning(this.width, g.TextAlign.Center);
    this.label.invalidate();
    this.append(this.label);
    this.pointUp.add(this.onPointUp, this);
  }

  destroy(): void {
    this.onClick.destroy();
    this.onClick = null;
    this.label = null;
    super.destroy();
  }

  private onPointUp(e: g.PointUpEvent) {
    this.onClick.fire();
  }
}
