import { Component } from "./component/component.js";

export class CanvasScaler extends Component {
  constructor() {
    super();
    this.defalutX = -50;
    this.defaultY = -50;
    this.x = -50;
    this.y = -50;
    this.max = 1;
    this.min = 0;
    this.scale = 1;
    this.scalePercent = 0;
    this.element = null;
    this.scaleBy = 5;
    this.verticalMove = false;
    this.horizontalMove = false;
    this.direction = "non";
  }
  setCanvasPostion(x, y) {
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
    return this;
  }
  parseScale(value) {
    return `scale(${value})`;
  }
  parseTranslate(x, y) {
    return `translate(${x}%,${y}%)`;
  }
  changeCanvas() {
    this.getHost()._canvas_.setAttribute(
      "style",
      "transform: " +
        this.parseTranslate(this.x, this.y) +
        " " +
        this.parseScale(this.scale) +
        ";"
    );
  }
  canvasReset() {
    this.scalePercent = this.max / 2;
    this.scale = 1;
    this.getHost()._canvas_.setAttribute(
      "style",
      "transform: " +
        this.parseTranslate(this.x, this.y) +
        " " +
        this.parseScale(this.scale) +
        ";"
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
  formatPerscent(val) {
    let valDecimal = val.split(".");
    return valDecimal[0];
  }
  build() {
    this.getHost()._canvas_.addEventListener("wheel", (ev) => {
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
      this.getHost()._canvas_.setAttribute(
        "style",
        "transform: " +
          this.parseTranslate(this.x, this.y) +
          " " +
          this.parseScale(this.scale) +
          ";"
      );
      this.response();
    });
  }
}
