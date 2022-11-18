import { regis } from "../packages/automa/src/automa";
import { addIcon, pick } from "./app.build.init";
import { Tooltips } from "./tooltips";

export class MenuController {
  constructor() {
    this.offset = [0, 15];
    this.rationTooltip = new Tooltips();
    this.imageTooltip = new Tooltips();
    this.fileTooltip = new Tooltips();
    this.scalarTooltip = new Tooltips();
    this.build();
  }
  build() {
    pick("controllerFileBtn").modify((el) => {
      addIcon({
        target: el,
        iconstart: ["bi", "bi-file-earmark-text-fill"],
        dropdown: true,
        iconStartExpand: true,
      });
    });
    pick("controllerImageBtn").modify((el) => {
      addIcon({
        target: el,
        iconstart: ["bi", "bi-file-image-fill"],
        dropdown: true,
        iconStartExpand: true,
      });
    });
    pick("controllerScalePercentBtn").modify((el) => {
      const [iconPercentLabel] = addIcon({
        target: el,
        text: "100%",
        dropdown: true,
      });
      regis({
        name: "iconPercentLabel",
        el: iconPercentLabel,
      });
    });
    pick("controllerRatioBtn").modify((_) => {
      addIcon({
        target: _,
        iconstart: ["bi", "bi-aspect-ratio-fill"],
        dropdown: true,
        iconStartExpand: true,
      });
    });
    pick("controllerCanvasCenterButton").modify((_) => {
      addIcon({ target: _, iconstart: ["bi", "bi-align-center"] });
    });
    pick("controllerCanvasScrollYButton").modify((_) => {
      const [Icon] = addIcon({
        target: _,
        iconstart: ["bi", "bi-arrows-expand"],
        text: "N",
      });
      regis({ name: "iconScrollY", el: Icon });
    });
    pick("controllerCanvasScrollXButton").modify((_) => {
      const [Icon] = addIcon({
        target: _,
        iconstart: ["bi", "bi-arrows-expand", "rotate-90"],
        text: "N",
      });
      regis({ name: "iconScrollX", el: Icon });
    });
    this.rationTooltip
      .setHost({
        btn: pick("controllerRatioBtn").target,
        box: pick("controllerRatioBox").target,
      })
      .setListIconStyle(["bi", "bi-star-fill"])
      .offset(this.offset);
    this.imageTooltip
      .setHost({
        btn: pick("controllerImageBtn").target,
        box: pick("controllerImageBox").target,
      })
      .setListIconStyle(["bi", "bi-list"])
      .offset(this.offset);
    this.fileTooltip
      .setHost({
        btn: pick("controllerFileBtn").target,
        box: pick("controllerFileBox").target,
      })
      .setListIconStyle(["bi", "bi-list"])
      .offset(this.offset);
    this.scalarTooltip
      .setHost({
        btn: pick("controllerScalePercentBtn").target,
        box: pick("controllerScalePercentBox").target,
      })
      .setListIconStyle(["bi", "bi-zoom-in"])
      .offset(this.offset);
  }
  setFileList(list) {
    this.fileTooltip.set(list).build();
  }
  setImageList(list) {
    this.imageTooltip.set(list).build();
  }
  setScalarList(list) {
    this.scalarTooltip.set(list).build();
  }
  setRatioList(list) {
    this.rationTooltip.set(list).build();
  }
}
