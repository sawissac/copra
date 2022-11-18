import { Component } from "./component/component.js";
import {
  createElement,
  parseToElement,
  setElement,
  setInstruction,
} from "../packages/automa/src/automa.js";
import { pick } from "./app.build.init.js";
import { stoV2 } from "./state/storage.js";
import { getCopraImageData, updateCopraImageData } from "./localDatabase/db.js";
import { addIcon } from "./iconEngine.js";
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

export class BackgroundEngine extends Component {
  constructor() {
    super();

    this.currentStorageColor = stoV2.getCanvasBackground();

    this.element = parseToElement([
      "colorpicker-div",
      "background-label-div-.btnBorderLight,h33,borderBot,rounded0",
      "background-upload-btn",
      "background-upload-container-div-.btn,bgLight,dFlex,jStart,aiCenter,borderBot,rounded0,pdb2",
      "background-upload-btn-div-.btnPill,tCenter,my1,f12",
      "background-file-input-.dNone",
      "background-container-div",
    ]);

    this.element["colorpicker"] = pickerBtn({
      color: this.currentStorageColor,
    });

    setInstruction(this.element, [
      "backgroundUploadContainer = backgroundUploadBtn",
      "backgroundContainer = backgroundLabel,colorpicker,backgroundUploadContainer,backgroundFile",
    ]);

    this.pickbg = setElement(this.element);

    this.colorBoxBtn = colorData.map((i) => {
      return createElement({
        el: "color-box-div",
        class: ["btn"],
        build: (el, mod) => {
          let reportColor = () => {
            this.canvasBackground(i);
            stoV2.val(i).storeToCanvasBackground();
            pickerCircle(this.pickbg("colorpicker"),i);
            pickerLabel(this.pickbg("colorpicker"),i);
            pickerHide();
          };
          mod.action("click", reportColor);
          pickerBoxStyle(mod,i)
        },
      });
    });
  }

  canvasBackground(color) {
    pick("htmlImage").style({
      backgroundColor: color,
    });
  }

  canvasImage(url) {
    pick("htmlImage").style({
      backgroundImage: url,
    });
  }

  build() {
    let upLabel = this.pickbg("backgroundUploadBtn");

    getCopraImageData().then((imageData) => {
      if (imageData.length > 0) {
        this.canvasImage(`url(${imageData})`);
        upLabel.text("Cancel");
      }
    });
    pickerCircle(this.pickbg("colorpicker"), this.currentStorageColor);
    pickerLabel(this.pickbg("colorpicker"), this.currentStorageColor);
    
    this.pickbg("backgroundLabel").modify((el) => {
      addIcon({
        target: el,
        text: "Background",
        textBold: true,
      });
    });
    this.pickbg("backgroundUploadBtn").modify((el, mod) => {
      let openFile = () => {
        if (upLabel.target.textContent !== "Cancel") {
          this.pickbg("backgroundFile").target.click();
        } else {
          this.pickbg("backgroundFile").target.value = "";
          this.canvasImage("");
          upLabel.text("Upload Image");
          updateCopraImageData("");
        }
      };
      mod.action("click", openFile);
      mod.text("Upload Image");
    });
    this.pickbg("backgroundFile").modify((el, mod) => {
      el.type = "file";
      let openFile = function () {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const uploaded_image = reader.result;
          pick("htmlImage").modify((_) => {
            _.style.backgroundImage = `url(${uploaded_image})`;
            updateCopraImageData(uploaded_image);
          });
          upLabel.text("Cancel");
        });
        reader.readAsDataURL(this.files[0]);
      };
      mod.action("change", openFile);
    });
    
    this.canvasBackground(this.currentStorageColor);

    this.pickbg("colorpicker").action("click", () => {
      pickerShow();
      showColorList(this.colorBoxBtn);
    });

    pick("optionInnerLayer").children([this.pickbg("backgroundContainer")]);
  }
}
