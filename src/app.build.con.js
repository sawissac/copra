import {
  config,
  pick as p,
  regis,
} from "../packages/automa/src/automa.js";
import { DEFINE, ARRANGE } from "./app.build.js";
import { CLASS1, CLASS2 } from "./app.class.js";

import { addIcon as ie} from "./iconEngine.js";

config({
  class1: CLASS1,
  class2: CLASS2,
  define: DEFINE,
  arrange: ARRANGE,
});

export const addIcon = ie;

/**@Header */
p("headerLogo").text("CoPra").attr("type", "button");
p("headerFile").text("file demo length length");
p("headerSaveBtn").text("save");
p("headerVersion").text("1.1.0v");

/**@controller */
p("controllerFileBtn").modify((el) => {
  addIcon({
    target: el,
    iconstart: ["bi", "bi-file-earmark-text-fill"],
    dropdown: true,
    iconStartExpand: true
  });
});
p("controllerImageBtn").modify((el) => {
  addIcon({
    target: el,
    iconstart: ["bi", "bi-file-image-fill"],
    dropdown: true,
    iconStartExpand: true
  });
});
p("controllerScalePercentBtn").modify((el) => {
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
p("controllerRatioBtn").modify((_) => {
  addIcon({
    target: _,
    iconstart: ["bi", "bi-aspect-ratio-fill"],
    dropdown: true,
    iconStartExpand: true
  });
});
p("controllerCanvasCenterButton").modify((_) => {
  addIcon({ target: _, iconstart: ["bi", "bi-align-center"] });
});
p("controllerCanvasScrollYButton").modify((_) => {
  const [Icon] = addIcon({
    target: _,
    iconstart: ["bi", "bi-arrows-expand"],
    text: "N",
  });
  regis({ name: "iconScrollY", el: Icon });
});
p("controllerCanvasScrollXButton").modify((_) => {
  const [Icon] = addIcon({
    target: _,
    iconstart: ["bi", "bi-arrows-expand", "rotate-90"],
    text: "N",
  });
  regis({ name: "iconScrollX", el: Icon });
});

/** @layer */
p("layerInnerPageBtn").modify((el) => {
  addIcon({
    target: el,
    text: "Page",
    textBold: true
  });
});
p("layerInnerLayerLabel").modify((el) => {
  addIcon({
    target: el,
    text: "Layer",
    textBold: true,
  });
});
p("layerInnerCanvasButton").modify((el, mod) => {
  addIcon({
    target: el,
    iconstart: ["bi", "bi-collection"],
    text: "Page",
    textBold: true,
  });
});
/**@option */
p("optionInnerLabel").modify((el, mod) => {
  addIcon({
    target: el,
    text: "Option",
    textBold: true,
  });
});

/** @htmlcanvas */
p("htmlInnerTitle").text("New Canvas");

/**@globaldownload */

p("globalFileInput").modify((el) => {
  el.type = "file";
});

export const pick = p;
