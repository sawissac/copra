import {
  autoClass,
  createElement,
  parseToElement,
  pick,
  setElement,
  setInstruction,
} from "../packages/automa/src/automa";
import { addIcon } from "./app.build.con";

const Colors = [
  "#2d2d2d#FFFFFF#FDF5DF#5EBEC4#F92C85#ABF62D#D6A3FB#FECD45#2568FB#A0AECD#A350A3#C1436D#000000",
  "#6E6E6E#BCFD4C#1A2238#9DAAF2#FF6A3D#F4DB7D#9CF6FB#E1FCFD#394F8A#4A5FC1#E5B9A8#EAD6CD#490B3D",
  "#BD1E51#F1B814#00ABE1#161F6D#00A9D8#0D9EDF#259B9A#F7F7F7#7DA2A9#A7BC5B#8DA242#3FD2C7#99DDFF",
  "#00458B#FB8122#1D2228#E1E2E2#D48166#373A36#E6E2DD#051622#1BA098#DEB992#E40C2B#1D1D2C#F7F4E9",
  "#3CBCC3#EBA63F#438945#5C6E58#8AA899#F2D349#181818#2CCCC3#FACD3D#5626C4#E60576#FDD935#E1F2F7",
  "#EF0D50#EB3A70#E5BACE#56642A#849531#92A332#FAF0DC#0B4141#FF6864#150734#0F2557#28559A#3778C2",
  "#4B9FE1#63BCE5#7ED5EA#5DAA68#3F6844#FAF1CF#EE7879#2A3166#F4ABAA#9E15BF#4AC6D2#44449B#444444",
];

let colorDataArr = Colors.join("")
  .split("#")
  .reduce((p, c) => {
    let hashColor = "#" + c;
    p.push(hashColor);
    return p;
  }, []);

colorDataArr.shift();

export const colorData = colorDataArr;

const element = parseToElement([
  "colorpicker-container-div-.btn,btnLight,bgLight,colorPicker,shadow,layerTop",
  "colorpicker-close-btn-div-.btnBorderLight,h33,borderBot,rounded0,pdx3",
  "colorpicker-list-div-.h400,flowY,flow0,pdx2,pdy2",
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
    margin: "5px 0",
    borderRadius: "4px",
    backgroundColor: color,
  });
}
export function generateList() {
  return;
}
