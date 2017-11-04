"use strict";
import {Button} from "./Button";
import {LabelButton} from "./LabelButton";
import {createDefaultButtonImage} from "./createDefaultButtonImage";

export enum Position {
  Top,
  Bottom
}

export interface Limit {
  vertical: number;
  horizontal: number;
}

export interface PaginationContentParameterObject extends g.EParameterObject {
  limit: Limit;
  padding: number;
}

export class PaginationContent extends g.E {

  private offset: number;
  private _limit: Limit;
  private _width: number;
  private padding: number;
  private lastOffset: number;

  constructor(param: PaginationContentParameterObject) {
    super(param);
    this._limit = param.limit;
    this.offset = 0;
    this._width = this.width;
    this.padding = param.padding;
    this.lastOffset = 0;
    this.touchable = true;
  }

  append(e: g.E): void {
    if(this.children) {
      const prev = this.children[this.children.length - 1];
      if(this.children.length % this.limit === 0) {
        e.x =  prev.x + prev.width + this.padding + e.x;
      } else if(this.children.length % this._limit.horizontal === 0) {
        e.x = this.children[this.children.length - this._limit.horizontal].x;
        e.y = prev.y + prev.height + e.y;
      } else {
        e.x =  prev.x + prev.width + this.padding + e.x;
        e.y = prev.y;
      }
    }
    super.append(e);
    const l = Math.floor(this.children.length / this.limit);
    this.lastOffset = this.children.length % this.limit === 0 ? l - 1 : l;
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
    if(this.offset < this.lastOffset) {
      this.move(this.lastOffset);
    }
  }

  move(target: number) {
    if(this.offset !== target && target >= 0 && target <= this.lastOffset) {
      const current = this.offset;
      this.x = this.x + this._width * (current - target);
      this.offset = target;
      this.modified();
    }
  }

  modified(isBubbling?: boolean): void {
    this.resize();
    super.modified(isBubbling);
  }

  private get limit() {
    return this._limit.vertical * this._limit.horizontal;
  }

  private resize(): void {
    const last = this.children[this.children.length - 1];
    this.width = Math.max(this.width, last.x + last.width);
  }
}

export interface PaginationParameterObject extends g.PaneParameterObject {
  limit: Limit;
  position: Position;
  previous?: Button;
  next?: Button;
  first?: boolean | Button;
  last?: boolean | Button;
  paddingRight: number;
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
      padding: param.paddingRight
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

  moveOffset(target: number): void {
    this._content.move(target);
  }

  destroy(): void {

    this.previous = null; // destroy() called as destroying this.children.
    this.next = null; // ditto.
    this.first = null; // ditto.
    this.last = null; // ditto.
    this._content = null; // ditto.
    if(this._image) {
      this._image.destroy();
      this._image = null;
    }

    super.destroy();
  }
}
