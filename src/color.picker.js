import {
  parseToElement,
  pick,
  setElement,
  setInstruction,
} from "../packages/automa/src/automa";
import { ColorHex } from "../packages/colordata/color.data.js";
import { addIcon } from "./app.build.init.js";

export const colorData = ColorHex;

const element = parseToElement([
  "colorpicker-container-div-.btn,btnLight,bgLight,colorPicker,shadow,layerTop",
  "colorpicker-close-btn-div-.btnBorderLight,h33,borderBot,rounded0,pdx3,rowReverse",
  "colorpicker-list-div-.h300,flowY,pdx2,pdy2",
]);

setInstruction(element, [
  "colorpickerContainer = colorpickerCloseBtn,colorpickerList",
]);

const pickcp = setElement(element);

pickcp("colorpickerCloseBtn").modify((el, mod) => {
  addIcon({
    target: el,
    iconstart: ["bi", "bi-plus-lg", "rotate-45", "fs-6"],
  });
  let hidePicker = () => {
    pickerHide();
  };
  mod.action("click", hidePicker);
});

pickerHide();

export function pickerHide() {
  pickcp("colorpickerContainer").class(["d-none"]);
}

export function pickerShow() {
  pickcp("colorpickerContainer").target.classList.remove("d-none");
}

export function pickerInit() {
  pick("coreComponent").children([pickcp("colorpickerContainer")]);
}

export function pickerBtn(props) {
  const element = parseToElement([
    "colorpicker-open-btn-div-.btn,bgLight,dFlex,jStart,aiCenter,h33,borderNone,rounded0,mt2",
    "colorpicker-circle-div-.colorPickerCircle,me2",
    "colorpicker-hex-label-div-.tdf12,fwBold",
  ]);

  setInstruction(element, [
    "colorpickerOpenBtn = colorpickerCircle,colorpickerHexLabel",
  ]);

  const pickcp = setElement(element);

  pickcp("colorpickerCircle").style({
    backgroundColor: props.color,
  });

  pickcp("colorpickerHexLabel").text(props.color);

  return pickcp("colorpickerOpenBtn");
}

export function pickerCircle(el, color) {
  const circle = el.inner.colorpickerCircle;
  circle.style({
    backgroundColor: color,
  });
}

export function pickerLabel(el, color) {
  el.inner.colorpickerHexLabel.text(color);
}

export function showColorList(list) {
  pickcp("colorpickerList")._children();
  pickcp("colorpickerList").children(list);
}

export function pickerBoxStyle(mod,color) {
  mod.style({
    height: "30px",
    width: "30px",
    margin: "5px",
    borderRadius: "4px",
    backgroundColor: color,
  });
}
