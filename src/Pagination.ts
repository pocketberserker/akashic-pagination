"use strict";
import {Button} from "./Button";
import {LabelButton} from "./LabelButton";
import {createDefaultButtonImage} from "./createDefaultButtonImage";

export enum Position {
  Top,
  Bottom
}

export interface PaginationContentParameterObject extends g.EParameterObject {
  limit: number;
  offset?: number;
}

export class PaginationContent extends g.E {

  private offset: number;
  private limit: number;
  private _width: number;

  constructor(param: PaginationContentParameterObject) {
    super(param);
    this.limit = param.limit;
    this.offset = param.offset ? param.offset : 0;
    this._width = this.width;
    this.touchable = true;
  }

  append(e: g.E): void {
    e.x = this.x + this._width * (this.lastOffset - this.offset) + e.x;
    if(this.children && this.children.length % this.limit !== 0) {
      const prev = this.children[this.children.length - 1];
      e.y = this.y + prev.y + prev.height + e.y;
    } else {
      e.y = this.y + e.height;
    }
    super.append(e);
  }

  previous(): void {
    if(this.offset > 0) {
      this.move(this.offset - 1);
    }
  }

  next(): void {
    if(this.offset < this.lastOffset) {
      this.move(this.offset + 1);
    }
  }

  first(): void {
    if(this.offset > 0) {
      this.move(0);
    }
  }

  last(): void {
    const l = this.lastOffset;
    if(this.offset < l) {
      this.move(l);
    }
  }

  modified(isBubbling?: boolean): void {
    this.resize();
    super.modified(isBubbling);
  }

  private get lastOffset() {
    if(this.children) {
      return Math.floor(this.children.length / this.limit);
    } else {
      return 0;
    }
  }

  private move(target: number) {
    const current = this.offset;
    this.x = this.x + this._width * (current - target);
    this.offset = target;
    this.modified();
  }

  private resize(): void {
    const last = this.children[this.children.length - 1];
    this.width = Math.max(this.width, last.x + last.width);
  }
}

export interface PaginationParameterObject extends g.PaneParameterObject {
  limit: number;
  position: Position;
  previous?: Button;
  next?: Button;
  first?: boolean | Button;
  last?: boolean | Button;
  offset?: number;
}

export class Pagination extends g.Pane {

  private previous: Button;
  private next: Button;
  private first: Button;
  private last: Button;
  private _image: g.Surface;
  private _content: PaginationContent;

  constructor(param: PaginationParameterObject) {
    super(param);

    if(param.previous === undefined || param.next === undefined || param.first === true || param.last === true) {
      this._image = createDefaultButtonImage(param.scene.game, this.width / 4, 24, "rgba(164, 164, 164, 0.7)");;
    }

    let contentY: number;
    switch(param.position) {
      case Position.Top:
        contentY = param.previous ? param.previous.height : this._image.height;
        break;
      default:
        contentY = param.y ? param.y : 0;
        break;
    }
    this._content = new PaginationContent({
      scene: param.scene,
      width: param.width,
      height: param.height,
      y: contentY,
      limit: param.limit,
      offset: param.offset
    });
    this.append(this._content);

    this.touchable = true;
    this.previous = param.previous ? param.previous : new LabelButton({ scene: param.scene, width: param.width / 4, text: "<", image: this._image });
    this.previous.onClick.add(
      () => this._content.previous(),
      this
    );
    this.previous.x = param.width / 4;
    let buttonY: number;
    switch(param.position) {
      case Position.Top:
        buttonY = 0;
        break;
      case Position.Bottom:
        buttonY = param.height - this.previous.height;
        break;
    }
    this.previous.y = buttonY;
    this.append(this.previous);
    this.next = param.next ? param.next : new LabelButton({ scene: param.scene, width: param.width / 4, text: ">", image: this._image });
    this.next.onClick.add(
      () => this._content.next(),
      this
    );
    this.next.x = param.width / 2;
    this.next.y = buttonY;
    this.append(this.next);
    if(param.first) {
      this.first = param.first === true ? new LabelButton({ scene: param.scene, width: param.width / 4, text: "|<", image: this._image })
        : param.first;
      this.first.onClick.add(
        () => this._content.first(),
        this
      );
      this.first.x = 0;
      this.first.y = buttonY;
      this.append(this.first);
    }
    if(param.last) {
      this.last = param.last === true ? new LabelButton({ scene: param.scene, width: param.width / 4, text: ">|", image: this._image })
        : param.last;
      this.last.onClick.add(
        () => this._content.last(),
        this
      );
      this.last.x = param.width / 4 * 3;
      this.last.y = buttonY;
      this.append(this.last);
    }
  }

  get content(): g.E {
    return this._content;
  }

  destroy(): void {

    this.previous = null; // destroy() called as destroying this.children.
    this.next = null; // ditto.
    this.first = null; // ditto.
    this.last = null; // ditto.
    if(this._image) {
      this._image.destroy();
      this._image = null;
    }

    super.destroy();
  }
}
