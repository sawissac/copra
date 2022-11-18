import { Component } from "./component/component.js";
import { createElement } from "../packages/automa/src/automa.js";
import { addIcon } from "./app.build.init.js";
import { createPopper } from "../node_modules/@popperjs/core/dist/esm/index.js";

export class Tooltips extends Component {
  constructor() {
    super();
    this.offsetValue = [];
    this.listIcon = [];
    this.btnLabelEl = null;
  }
  set(list) {
    this.setState(list);
    return this;
  }
  setListIconStyle(iconList) {
    this.listIcon = iconList;
    return this;
  }
  getBtnLabel() {
    return this.btnLabelEl;
  }
  offset(value) {
    this.offsetValue = value;
    return this;
  }
  build() {
    const popperInstance = createPopper(
      this.getHost().btn,
      this.getHost().box,
      {
        modifiers: [
          {
            name: "offset",
            options: {
              offset: this.offsetValue,
            },
          },
        ],
      }
    );
    let buttonToggle = false;
    this.getHost().btn.onclick = () => {
      buttonToggle = !buttonToggle;
      if (buttonToggle) {
        popperInstance.update();
        this.getHost().box.style.display = "block";
      } else {
        popperInstance.update();
        this.getHost().box.style.display = "none";
      }
    };
    this.getHost().box.onmouseleave = () => {
      buttonToggle = false;
      this.getHost().box.style.display = "none";
    };
    this.state.map((i) => {
      const listEl = createElement({
        el: "list-div",
        class: ["d-flex", "fs-12", "btn","btn-dark", "justify-content-left"],
        build: (_) => {
          addIcon({
            target: _,
            iconstart: this.listIcon,
            text: i.listName,
          });
          _.onclick = () => {
            i.fun();
            this.getHost().box.style.display = "none";
          };
        },
      });
      this.getHost().box.appendChild(listEl.target);
    });
  }
}
