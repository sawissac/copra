import { Component } from "./component/component.js";
import {
  createElement,
  getElementList,
  parseToElement,
  setElement,
  setInstruction,
} from "../packages/automa/src/automa.js";
import { cps } from "./state/state.js";
import { addIcon, pick } from "./app.build.con.js";
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
} from "./colorData.js";

const optionList = ["Empty", "Header", "Line", "Footer"];

function pillBtn(props) {
  return createElement({
    el: "pill-btn-div",
    class: ["btn", props.btncolor],
    text: props.text,
    build: (el, mod) => {
      mod.action("click", props.click);
    },
  });
}
console.log(getElementList());

//optionInnerLayer

export class ComponentBuilder extends Component {
  constructor() {
    super();
    this.currentStorageColor = stoV2.getCanvasBackground();

    this.element = parseToElement([
      "colorpicker-div",
      "cb-label-div-.btnBorderLight,h33,borderBot,rounded0",
      "cb-container-div",
    ]);

    this.element["colorpicker"] = pickerBtn({
      color: "#000000",
    });

    setInstruction(this.element, ["cbContainer = cbLabel,colorpicker"]);

    this.pickcb = setElement(this.element);

    this.colorBoxBtn = colorData.map((i) => {
      return createElement({
        el: "color-box-div",
        class: ["btn"],
        build: (el, mod) => {
          let reportColor = () => {
            pickerCircle(this.pickcb("colorpicker"),i);
            pickerLabel(this.pickcb("colorpicker"),i);
            pickerHide();
          };
          mod.action("click", reportColor);
          pickerBoxStyle(mod,i)
        },
      });
    });

    this.build();

    this.component = { type: null, text: "", height: 0, textColor: "" };
  }
  build() {
    this.pickcb("cbLabel").modify((el) => {
      addIcon({
        target: el,
        text: "Type",
        textBold: true,
      });
    });

    this.pickcb("colorpicker").action("click",()=>{
      pickerShow();
      showColorList(this.colorBoxBtn);
    })

    pick("optionInnerLayer").children([this.pickcb("cbContainer")]);
  }
  // build() {
  //   this.getHost()._layer_.appendChild(MainContainer.target);
  //   let builderElementToggler = true;
  //   builderElementLabel.onclick = () => {
  //     if (builderElementToggler === true) {
  //       builderElementWarper.classList.remove("d-none");
  //       builderElementToggler = false;
  //     } else {
  //       builderElementWarper.classList.add("d-none");
  //       builderElementToggler = true;
  //     }
  //   };
  //   let builderOptionsToggler = true;
  //   builderOptionLabel.onclick = () => {
  //     if (builderOptionsToggler === true) {
  //       builderOption.classList.remove("d-none");
  //       builderOptionsToggler = false;
  //     } else {
  //       builderOption.classList.add("d-none");
  //       builderOptionsToggler = true;
  //     }
  //   };
  //   optionList.map((i) => {
  //     const options = createElement({
  //       el: "option-list-div",
  //       class: ["btn","btn-light","fs-12","mx-2","my-2"],
  //       text: i,
  //       build: (_) => {
  //         _.onclick = () => {
  //           this.component.type = i;
  //           builderOption.classList.add("d-none");
  //           builderOptionsToggler = true;
  //           this.updateElementType();
  //           this.updateCpsState();
  //           this.getWorker();
  //         };
  //       },
  //     });
  //     builderOption.appendChild(options.target);
  //   });
  //   let boxSize = 272.02 / 8 - 10;
  //   for (let i in colorDataArr) {
  //     let div = document.createElement("div");
  //     let style = {
  //       width: boxSize + "px",
  //       height: boxSize + "px",
  //       backgroundColor: colorDataArr[i],
  //     };
  //     if (i == 0) {
  //       style.display = "grid";
  //       style.placeItems = "center";
  //       style.color = "white";
  //       style.fontSize = "10px";
  //       let icon = document.createElement("div");
  //       icon.classList.add(...["bi", "bi-app"]);
  //       div.appendChild(icon);
  //     }
  //     Object.assign(div.style, style);
  //     div.onclick = () => {
  //       this.component.textColor = colorDataArr[i];
  //       builderColorDisplay.style.color = colorDataArr[i];
  //     };
  //     colorContainer.appendChild(div);
  //   }
  //   let builderColorToggler = true;
  //   builderColorLabelBtn.onclick = () => {
  //     if (builderColorToggler === true) {
  //       builderColorWarper.classList.remove("d-none");
  //       builderColorDisplay.style.backgroundColor = stoV2.getCanvasBackground();
  //       builderColorDisplay.style.color = this.state[0].component.textColor;
  //       builderColorToggler = false;
  //     } else {
  //       builderColorWarper.classList.add("d-none");
  //       builderColorToggler = true;
  //     }
  //   };
  //   colorConfirmBtn.onclick = () => {
  //     this.updateTextColor();
  //     this.updateCpsState();
  //     this.getWorker();
  //     builderColorWarper.classList.add("d-none");
  //     builderColorToggler = true;
  //   };

  //   let textToggler = true;
  //   textInputLabel.onclick = () => {
  //     if (textToggler === true) {
  //       textInput.classList.remove("d-none");
  //       textToggler = false;
  //     } else {
  //       textInput.classList.add("d-none");
  //       textToggler = true;
  //     }
  //   };
  //   textInput.onkeypress = (ev) => {
  //     if (ev.code === "Enter") {
  //       this.component.text = textInput.value;
  //       this.updateTextInput();
  //       this.updateCpsState();
  //       this.getWorker();
  //     }
  //   };
  //   let heightToggler = true;
  //   heightInputLabel.onclick = () => {
  //     if (heightToggler === true) {
  //       heightInput.classList.remove("d-none");
  //       heightToggler = false;
  //     } else {
  //       heightInput.classList.add("d-none");
  //       heightToggler = true;
  //     }
  //   };
  //   heightInput.onkeypress = (ev) => {
  //     if (ev.code === "Enter") {
  //       this.component.height = heightInput.value;
  //       this.updateElementHeight();
  //       this.updateCpsState();
  //       this.getWorker();
  //     }
  //   };
  // }
  // getCpsState() {
  //   let activePageLayer = cps
  //     .getPageLayerData()
  //     .filter((i) => i.canvas.isHighlight === true);
  //   this.setState(activePageLayer[0].canvas.data);
  // }
  // updateElementHeight() {
  //   let updatedElementState = this.state.reduce((p, c) => {
  //     if (c.isHighlight === true) {
  //       c.component.height = this.component.height;
  //       p.push(c);
  //     } else {
  //       p.push(c);
  //     }
  //     return p;
  //   }, []);
  //   this.setState(updatedElementState);
  // }
  // updateElementType() {
  //   let updatedElementState = this.state.reduce((p, c) => {
  //     if (c.isHighlight === true) {
  //       c.component.type = this.component.type;
  //       p.push(c);
  //     } else {
  //       p.push(c);
  //     }
  //     return p;
  //   }, []);
  //   this.setState(updatedElementState);
  // }
  // updateTextColor() {
  //   let updatedElementState = this.state.reduce((p, c) => {
  //     if (c.isHighlight === true) {
  //       c.component.textColor = this.component.textColor;
  //       p.push(c);
  //     } else {
  //       p.push(c);
  //     }
  //     return p;
  //   }, []);
  //   this.setState(updatedElementState);
  // }
  // updateTextInput() {
  //   let updatedElementState = this.state.reduce((p, c) => {
  //     if (c.isHighlight === true) {
  //       c.component.text = this.component.text;
  //       p.push(c);
  //     } else {
  //       p.push(c);
  //     }
  //     return p;
  //   }, []);
  //   this.setState(updatedElementState);
  // }
  // updateCpsState() {
  //   let initState = cps.getPageLayerData();
  //   cps.setPageLayerData(
  //     initState.reduce((p, c) => {
  //       if (c.canvas.isHighlight === true) {
  //         c.canvas.data = this.state;
  //         p.push(c);
  //       } else {
  //         p.push(c);
  //       }
  //       return p;
  //     }, [])
  //   );
  // }
  // updateBuilder() {
  //   this.getCpsState();
  //   let activeElement = this.state.filter((i) => i.isHighlight === true);
  //   builderColorDisplay.style.backgroundColor = stoV2.getCanvasBackground();
  //   if (activeElement.length > 0) {
  //     let text = activeElement[0].component.text;
  //     let height = activeElement[0].component.height;
  //     builderStatus.textContent = `E: ${activeElement[0].component.type} | T: ${
  //       text.length > 0 ? text : "none"
  //     }`;
  //     textInput.value = text;
  //     heightInput.value = height;
  //   }
  // }
}
