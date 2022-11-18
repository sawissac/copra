import { pick } from "./app.build.init.js";
import { Component } from "./component/component.js";

export class CanvasScaler extends Component {
  constructor(canvasName) {
    super();
    this.defaultX = -50;
    this.defaultY = -50;
    this.x = -50;
    this.y = -50;
    this.max = 0;
    this.min = 0;
    this.scale = 1;
    this.scalePercent = 0;
    this.element = null;
    this.scaleBy = 5;
    this.verticalMove = false;
    this.horizontalMove = false;
    this.direction = "non";
    this.canvas = pick(canvasName).target;
  }
  setCanvasPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  scaleBy(value) {
    this.scaleBy = value;
  }
  getScale() {
    return this.scale;
  }
  setMinMax(min, max) {
    this.min = min;
    this.max = max;
    return this;
  }
  setScalePercentMiddle() {
    this.scalePercent = this.max / 2;
    this.scale = this.scalePercent / 100;
    return this;
  }
  parseScale(value) {
    return `scale(${value})`;
  }
  parseTranslate(x, y) {
    return `translate(${x}%,${y}%)`;
  }

  scaleTranslate(scale, x, y) {
    return (
      "style",
      "transform: " +
        this.parseTranslate(x, y) +
        " " +
        this.parseScale(scale) +
        ";"
    );
  }

  scaleTo(value) {
    this.scalePercent = value * 100;
    this.scale = this.scalePercent / 100;
    this.changeCanvas();
    return this;
  }

  changeCanvas() {
    this.canvas.setAttribute(
      "style",
      this.scaleTranslate(this.scale, this.x, this.y)
    );
    return this;
  }
  canvasReset() {
    this.scalePercent = this.max / 2;
    this.scale = this.scalePercent / 100;
    this.setCanvasPosition(this.defaultX, this.defaultY);
    this.canvas.setAttribute(
      "style",
      this.scaleTranslate(this.scale, this.x, this.y)
    );
  }
  verticalMoveOn() {
    this.verticalMove = true;
  }
  verticalMoveOff() {
    this.verticalMove = false;
  }
  horizontalMoveOn() {
    this.horizontalMove = true;
  }
  horizontalMoveOff() {
    this.horizontalMove = false;
  }

  getPercentage() {
    let percent = String(this.scalePercent);
    let decimal = percent.split(".");
    return decimal[0] + "%";
  }

  build() {
    this.canvas.addEventListener("wheel", (ev) => {
      //scroll down decrease
      if (ev.deltaY > 0 && !this.verticalMove && !this.horizontalMove) {
        this.scalePercent -= this.scaleBy;
      }
      // scroll up increase
      if (ev.deltaY < 0 && !this.verticalMove && !this.horizontalMove) {
        this.scalePercent += this.scaleBy;
      }
      //scroll down decrease
      if (ev.deltaY > 0 && this.verticalMove) {
        this.direction = "down";
        this.y -= this.scaleBy;
      }
      // scroll up increase
      if (ev.deltaY < 0 && this.verticalMove) {
        this.direction = "up";
        this.y += this.scaleBy;
      }
      //scroll down decrease
      if (ev.deltaY > 0 && this.horizontalMove) {
        this.direction = "left";
        this.x += this.scaleBy;
      }
      // scroll up increase
      if (ev.deltaY < 0 && this.horizontalMove) {
        this.direction = "right";
        this.x -= this.scaleBy;
      }
      if (this.scalePercent > this.max) {
        this.scalePercent = this.max;
      }

      if (this.scalePercent < this.min) {
        this.scalePercent = this.min;
      }

      this.scale = this.scalePercent / 100;

      this.canvas.setAttribute(
        "style",
        this.scaleTranslate(this.scale, this.x, this.y)
      );

      this.response();
    });
  }
}
