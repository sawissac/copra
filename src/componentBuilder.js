import { Component } from "./component/component.js";

const optionList = ["Empty", "Header", "Line", "Footer"];
const layerStyleBtn = [
  "btn",
  "btn-light",
  "bg-white",
  "d-flex",
  "justify-content-left",
  "fs-12",
  "text-dark",
  "border",
  "rounded-0",
  "border-grey",
  "border-2",
  "border-top-0",
  "border-start-0",
  "border-end-0",
];

const MainContainer = am.component({
  el: "main-conponent-div",
  class: ["m-top-4", "br-5"],
  children: [
    am.component({
      el: "builder-element-label-div",
      text: "Element",
      class: [
        "btn",
        "btn-light",
        "bg-white",
        "d-flex",
        "justify-content-left",
        "fs-12",
        "text-dark",
        "border",
        "rounded-0",
        "border-grey",
        "border-2",
        "border-top-0",
        "border-start-0",
        "border-end-0",
        "shadow-sm"
      ],
    }),
    am.component({
      el: "warper-div",
      class: ["d-none"],
      children: [
        am.component({
          el: "status-div",
          class: [
            "my-4",
            "px-4",
            "bg-grey-dark",
            "text-dark",
            "br-5",
            "py-10",
            "d-flex",
            "j-center",
            "fs-12",
          ],
        }),
        am.component({
          el: "builder-options-label-div",
          class: [...layerStyleBtn, "my-1"],
          build: (_) => {
            addIcon({ target: _, text: "Choose element", dropdown: true });
          },
        }),
        am.component({
          el: "builder-options-div",
          class: ["my-1", "px-1", "h-100", "overflow-y", "d-none"],
        }),
        am.component({
          el: "builder-color-label-div",
          class: [...layerStyleBtn, "my-1"],
          build: (_) => {
            addIcon({ target: _, text: "Text color", dropdown: true });
          },
        }),
        am.component({
          el: "builder-color-warper-div",
          class: ["d-none"],
          children: [
            am.component({
              el: "builder-color-display-div",
              class: [
                "d-flex",
                "justify-content-center",
                "fs-12",
                "text-bold",
                "py-2",
                "mt-2",
                "rounded",
              ],
              text: "Your text",
            }),
            am.component({
              el: "color-container-div",
              class: [
                "h-100",
                "d-flex",
                "flex-wrap",
                "overflow-y",
                "my-2",
                "justify-content-center",
              ],
            }),
            am.component({
              el: "color-comfirm-div",
              class: ["btn", "btn-primary", "fs-12","d-block"],
              text: "Comfirm text color",
            }),
          ],
        }),
        am.component({
          el: "text-label-div",
          class: [...layerStyleBtn, "my-1"],
          build: (_) => {
            addIcon({
              target: _,
              text: "Text",
              dropdown: true,
            });
          },
        }),
        am.component({
          el: "text-input-input",
          class: ["form-control","outline-none","fs-12","bg-light","d-none"],
          build: (_) => {
            _.type = "text";
            _.placeholder = "Your text";
          },
        }),
        am.component({
          el: "height-label-div",
          class: [...layerStyleBtn],
          build: (_) => {
            addIcon({
              target: _,
              text: "Height",
              dropdown: true,
            });
          },
        }),
        am.component({
          el: "height-input-input",
          class: ["form-control","outline-none","fs-12","bg-light","d-none","my-1"],
          build: (_) => {
            _.type = "text";
            _.placeholder = "0";
          },
        }),
      ],
    }),
  ],
});
const builderElementLabel = MainContainer.inner.builderElementLabel.target;
const builderElementWarper = MainContainer.inner.warper.target;
const builderOptionLabel =
  MainContainer.inner.warper.inner.builderOptionsLabel.target;
const builderOption = MainContainer.inner.warper.inner.builderOptions.target;
const builderStatus = MainContainer.inner.warper.inner.status.target;
const builderColorLabelBtn =
  MainContainer.inner.warper.inner.builderColorLabel.target;
const builderColorWarper =
  MainContainer.inner.warper.inner.builderColorWarper.target;
const builderColorDisplay =
  MainContainer.inner.warper.inner.builderColorWarper.inner.builderColorDisplay
    .target;
const colorContainer =
  MainContainer.inner.warper.inner.builderColorWarper.inner.colorContainer
    .target;
const colorConfirmBtn =
  MainContainer.inner.warper.inner.builderColorWarper.inner.colorComfirm.target;
const textInput = MainContainer.inner.warper.inner.textInput.target;
const textInputLabel = MainContainer.inner.warper.inner.textLabel.target;
const heightInputLabel = MainContainer.inner.warper.inner.heightLabel.target;
const heightInput = MainContainer.inner.warper.inner.heightInput.target;
export class ComponentBuilder extends Component {
  constructor() {
    super();
    this.component = { type: null, text: "", height: 0, textColor: "" };
  }
  build() {
    this.getHost()._layer_.appendChild(MainContainer.target);
    let builderElementToggler = true;
    builderElementLabel.onclick = () => {
      if (builderElementToggler === true) {
        builderElementWarper.classList.remove("d-none");
        builderElementToggler = false;
      } else {
        builderElementWarper.classList.add("d-none");
        builderElementToggler = true;
      }
    };
    let builderOptionsToggler = true;
    builderOptionLabel.onclick = () => {
      if (builderOptionsToggler === true) {
        builderOption.classList.remove("d-none");
        builderOptionsToggler = false;
      } else {
        builderOption.classList.add("d-none");
        builderOptionsToggler = true;
      }
    };
    optionList.map((i) => {
      const options = am.component({
        el: "option-list-div",
        class: ["btn","btn-light","fs-12","mx-2","my-2"],
        text: i,
        build: (_) => {
          _.onclick = () => {
            this.component.type = i;
            builderOption.classList.add("d-none");
            builderOptionsToggler = true;
            this.updateElementType();
            this.updateCpsState();
            this.getWorker();
          };
        },
      });
      builderOption.appendChild(options.target);
    });
    let boxSize = 272.02 / 8 - 10;
    for (let i in colorDataArr) {
      let div = document.createElement("div");
      let style = {
        width: boxSize + "px",
        height: boxSize + "px",
        backgroundColor: colorDataArr[i],
      };
      if (i == 0) {
        style.display = "grid";
        style.placeItems = "center";
        style.color = "white";
        style.fontSize = "10px";
        let icon = document.createElement("div");
        icon.classList.add(...["bi", "bi-app"]);
        div.appendChild(icon);
      }
      Object.assign(div.style, style);
      div.onclick = () => {
        this.component.textColor = colorDataArr[i];
        builderColorDisplay.style.color = colorDataArr[i];
      };
      colorContainer.appendChild(div);
    }
    let builderColorToggler = true;
    builderColorLabelBtn.onclick = () => {
      if (builderColorToggler === true) {
        builderColorWarper.classList.remove("d-none");
        builderColorDisplay.style.backgroundColor = stoV2.getCanvasBackground();
        builderColorDisplay.style.color = this.state[0].component.textColor;
        builderColorToggler = false;
      } else {
        builderColorWarper.classList.add("d-none");
        builderColorToggler = true;
      }
    };
    colorConfirmBtn.onclick = () => {
      this.updateTextColor();
      this.updateCpsState();
      this.getWorker();
      builderColorWarper.classList.add("d-none");
      builderColorToggler = true;
    };

    let textToggler = true;
    textInputLabel.onclick = () => {
      if (textToggler === true) {
        textInput.classList.remove("d-none");
        textToggler = false;
      } else {
        textInput.classList.add("d-none");
        textToggler = true;
      }
    };
    textInput.onkeypress = (ev) => {
      if (ev.code === "Enter") {
        this.component.text = textInput.value;
        this.updateTextInput();
        this.updateCpsState();
        this.getWorker();
      }
    };
    let heightToggler = true;
    heightInputLabel.onclick = () => {
      if (heightToggler === true) {
        heightInput.classList.remove("d-none");
        heightToggler = false;
      } else {
        heightInput.classList.add("d-none");
        heightToggler = true;
      }
    };
    heightInput.onkeypress = (ev) => {
      if (ev.code === "Enter") {
        this.component.height = heightInput.value;
        this.updateElementHeight();
        this.updateCpsState();
        this.getWorker();
      }
    };
  }

  getCpsState() {
    let activePageLayer = cps
      .getPageLayerData()
      .filter((i) => i.canvas.isHighlight === true);
    this.setState(activePageLayer[0].canvas.data);
  }
  updateElementHeight() {
    let updatedElementState = this.state.reduce((p, c) => {
      if (c.isHighlight === true) {
        c.component.height = this.component.height;
        p.push(c);
      } else {
        p.push(c);
      }
      return p;
    }, []);
    this.setState(updatedElementState);
  }
  updateElementType() {
    let updatedElementState = this.state.reduce((p, c) => {
      if (c.isHighlight === true) {
        c.component.type = this.component.type;
        p.push(c);
      } else {
        p.push(c);
      }
      return p;
    }, []);
    this.setState(updatedElementState);
  }
  updateTextColor() {
    let updatedElementState = this.state.reduce((p, c) => {
      if (c.isHighlight === true) {
        c.component.textColor = this.component.textColor;
        p.push(c);
      } else {
        p.push(c);
      }
      return p;
    }, []);
    this.setState(updatedElementState);
  }
  updateTextInput() {
    let updatedElementState = this.state.reduce((p, c) => {
      if (c.isHighlight === true) {
        c.component.text = this.component.text;
        p.push(c);
      } else {
        p.push(c);
      }
      return p;
    }, []);
    this.setState(updatedElementState);
  }
  updateCpsState() {
    let initState = cps.getPageLayerData();
    cps.setPageLayerData(
      initState.reduce((p, c) => {
        if (c.canvas.isHighlight === true) {
          c.canvas.data = this.state;
          p.push(c);
        } else {
          p.push(c);
        }
        return p;
      }, [])
    );
  }
  updateBuilder() {
    this.getCpsState();
    let activeElement = this.state.filter((i) => i.isHighlight === true);
    builderColorDisplay.style.backgroundColor = stoV2.getCanvasBackground();
    if (activeElement.length > 0) {
      let text = activeElement[0].component.text;
      let height = activeElement[0].component.height;
      builderStatus.textContent = `E: ${activeElement[0].component.type} | T: ${
        text.length > 0 ? text : "none"
      }`;
      textInput.value = text;
      heightInput.value = height;
    }
  }
}
