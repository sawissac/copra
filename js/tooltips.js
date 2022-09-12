import { Component } from "./component/component.js";

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
  setBtnIconStyle(iconList, btnName) {
    const [labelEl] = er.icon(this.getHost()._btn_, iconList, true, btnName, true, true);
    this.btnLabelEl = labelEl;
    return this;
  }
  setListIconStyle(iconList){
    this.listIcon = iconList;
    return this;
  }
  getBtnLabel(){
    return this.btnLabelEl;
  }
  offset(value) {
    this.offsetValue = value;
    return this;
  }
  build() {
    const popperInstance = Popper.createPopper(
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
      const listEl = er.component({
        element: "list-div",
        class: ["btn-btn", "ts-12", "btn-dark", "j-left"],
        build: (_) => {
          er.icon(_, this.listIcon, true, i.listName, true);
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
