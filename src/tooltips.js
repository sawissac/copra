import { Component } from "./component/component.js";
import { createElement } from "../packages/automa/src/automa.js";
import { addIcon } from "./app.build.con.js";
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
      this.getHost()._btn_,
      this.getHost()._box_,
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
    this.getHost()._btn_.onclick = () => {
      buttonToggle = !buttonToggle;
      if (buttonToggle) {
        popperInstance.update();
        this.getHost()._box_.style.display = "block";
      } else {
        popperInstance.update();
        this.getHost()._box_.style.display = "none";
      }
    };
    this.getHost()._box_.onmouseleave = () => {
      buttonToggle = false;
      this.getHost()._box_.style.display = "none";
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
            this.getHost()._box_.style.display = "none";
          };
        },
      });

      this.getHost()._box_.appendChild(listEl.target);
    });
  }
}
