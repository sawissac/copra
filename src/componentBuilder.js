import { Component } from "./component/component.js";
import {
  autoClass,
  createElement,
  parseToElement,
  setElement,
  setInstruction,
} from "../packages/automa/src/automa.js";
import { cps } from "./state/copra.state.global.js";
import { addIcon, pick } from "./app.build.init.js";
import { stoV2 } from "./state/storage.js";
import {
  colorData,
  pickerBoxStyle,
  pickerBtn,
  pickerCircle,
  pickerHide,
  pickerLabel,
  pickerShow,
  showColorList,
} from "./color.picker.js";
import {
  getActiveLayerComponent,
  updateActiveLayerComponent,
} from "./state/canvas.state.api.js";

function pillBtn(props) {
  return createElement({
    el: "pill-con-div",
    class: [
      "col-6",
      "d-flex",
      "justify-content-center",
      "align-items-center",
      "py-1",
    ],
    children: [
      createElement({
        el: "pill-btn-div",
        class: ["btn", "btn-sm", props.btncolor],
        text: props.text,
        build: (el, mod) => {
          autoClass({
            el: { target: el },
            class: "btnPill",
          });
          autoClass({
            el: { target: el },
            class: "borderNone",
          });
          autoClass({
            el: { target: el },
            class: "f12",
          });
          mod.action("click", props.click);
        },
      }),
    ],
  });
}

//optionInnerLayer

export class ComponentBuilder extends Component {
  constructor() {
    super();

    this.typeOptions = [
      "Empty",
      "Text 1",
      "Text 2",
      "Flat Text 1",
      "Flat Text 2",
      "Header",
      "Line",
      "Footer",
    ];

    this.currentStorageColor = stoV2.getCanvasBackground();

    this.element = parseToElement([
      "colorpicker-div",
      "cb-label-div-.btnBorderLight,h33,borderBot,rounded0",
      "type-con-div-.h100,bgLight,flowY",
      "type-inner-con-div-.row,m0,mt2",
      "text-label-div-.btnBorderLight,h33,borderY,rounded0",
      "text-inp-input-.btnBorderLight,h33,border2,tStart,mxauto,my2",
      "height-label-div-.btnBorderLight,h33,borderY,rounded0",
      "height-inp-input-.btnBorderLight,h33,border2,tStart,mxauto,my2",
      "cb-container-div-.pdb2",
    ]);

    this.element["colorpicker"] = pickerBtn({
      color: "#000000",
    });

    setInstruction(this.element, [
      "typeCon = typeInnerCon",
      "cbContainer = cbLabel,typeCon,textLabel,colorpicker,textInp,heightLabel,heightInp",
    ]);

    this.pickcb = setElement(this.element);

    this.colorBoxBtn = colorData.map((i) => {
      return createElement({
        el: "color-box-div",
        class: ["btn"],
        build: (el, mod) => {
          let reportColor = () => {
            if (!this.isCanvasBtn()) {
              this.updateComponent({ textColor: i });
              this.setColorTextPicker(i);
              this.response();
            }
            pickerHide();
          };
          mod.action("click", reportColor);
          pickerBoxStyle(mod, i);
        },
      });
    });
  }

  setColorTextPicker(color) {
    pickerCircle(this.pickcb("colorpicker"), color);
    pickerLabel(this.pickcb("colorpicker"), color);
  }

  setContentInput(value) {
    this.pickcb("textInp").target.value = value;
  }

  setHeightInput(value) {
    this.pickcb("heightInp").target.value = value;
  }

  build() {
    this.refreshBuilder();

    this.pickcb("cbLabel").modify((el) => {
      addIcon({
        target: el,
        text: "Type",
        textBold: true,
      });
    });

    this.pickcb("textLabel").modify((el) => {
      addIcon({
        target: el,
        text: "Text",
        textBold: true,
      });
    });

    this.pickcb("textInp").modify((el, mod) => {
      el.type = "text";
      el.placeholder = "Content";
      mod.style({
        width: "230px",
      });
      mod.action("keydown", (ev) => {
        if (!this.isCanvasBtn() && ev.code === "Enter") {
          this.updateComponent({ text: el.value });
          this.response();
        }
      });
    });

    this.pickcb("heightLabel").modify((el) => {
      addIcon({
        target: el,
        text: "Height",
        textBold: true,
      });
    });

    this.pickcb("heightInp").modify((el, mod) => {
      el.type = "text";
      el.placeholder = "height";
      mod.style({
        width: "230px",
      });
      mod.action("keydown", (ev) => {
        if (!this.isCanvasBtn() && ev.code === "Enter") {
          this.updateComponent({ height: el.value });
          this.response();
        }
      });
    });

    this.pickcb("colorpicker").action("click", () => {
      pickerShow();
      showColorList(this.colorBoxBtn);
    });
    pick("optionInnerLayer").children([this.pickcb("cbContainer")]);
  }

  setTypeOption(type) {
    this.pickcb("typeInnerCon")._children();

    this.typeOptions.map((i) => {
      this.pickcb("typeInnerCon").children([
        pillBtn({
          btncolor: i === type ? "btn-primary" : "btn-light",
          text: i,
          click: () => {
            if (!this.isCanvasBtn()) {
              this.updateComponent({ type: i });
              this.setTypeOption(i);
              this.response();
            }
          },
        }),
      ]);
    });
  }

  refreshBuilder() {
    const lr = getActiveLayerComponent(cps.getPageLayerData());
    if (this.isCanvasBtn()) {
      this.setColorTextPicker("#EF0D50");
      this.setTypeOption("");
      this.setContentInput("Can't be change");
      this.setHeightInput("Can't be change");
    } else {
      this.setColorTextPicker(lr.textColor);
      this.setTypeOption(lr.type);
      this.setContentInput(lr.text);
      this.setHeightInput(lr.height);
    }
  }

  updateComponent(props) {
    const updatedLayer = updateActiveLayerComponent(
      cps.getPageLayerData(),
      props
    );
    cps.setPageLayerData(updatedLayer);
  }

  isCanvasBtn() {
    return getActiveLayerComponent(cps.getPageLayerData()).length === 0;
  }
}
