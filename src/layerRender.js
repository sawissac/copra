import { Component } from "./component/component.js";
import { createElement } from "../packages/automa/src/automa.js";
import { addIcon, pick } from "./app.build.con.js";
import { cps } from "./state/state.js";
import { iconList } from "./iconEngine.js";
import { createLayerState } from "./defaultBuild.js";
import {
  getActiveCanvasLayer,
  updataActiveCanvasLayer,
} from "./state/canvasState.js";
import {
  moveCancelBtn,
  moveBtn,
  noneMoveBtn,
  layerBtnStyle,
} from "./layer.common.js";

export class LayerRander extends Component {
  constructor() {
    super();
    this.edit = false;
    this.canvas = false;
    this.build();
  }
  createLayer() {
    this.state.push(createLayerState({ layerName: "New Layer" }));
    this.updateCpsState();
    this.render();
    this.response();
  }
  deleteLayer() {
    if (this.state.length > 1) {
      this.setState(this.state.filter((i) => i.isHighlight !== true));
      this.state[0].canvas.isHighlight = true;
    }
    this.updateCpsState();
    this.render();
    this.response();
  }
  moveLayer() {
    const isactiveLayer = this.state.filter((i) => i.isHighlight === true);

    if (isactiveLayer.length !== 0) {
      pick("layerInnerLayerList")._children();

      pick("layerInnerLayerList").children([
        moveCancelBtn({
          action: () => {
            this.render();
          },
        }),
      ]);

      this.state.map((i, index) => {
        pick("layerInnerLayerList").children([
          createElement({
            el: "move-layer-btn-div",
            class: [
              "justify-content-between",
              ...layerBtnStyle.filter((i) => i !== "py-2"),
              i.isHighlight === true ? "highlight" : "not-highlight",
            ],
            children:
              i.isHighlight !== true
                ? moveBtn({
                    upAction: () => {
                      this.moveArray(index, -1);
                      this.updateCpsState();
                      this.render();
                      this.response();
                    },
                    layerName: i.layerName,
                    downAction: () => {
                      this.moveArray(index, 1);
                      this.updateCpsState();
                      this.render();
                      this.response();
                    },
                  })
                : noneMoveBtn({ layerName: i.layerName }),
          }),
        ]);
      });
    }
  }

  build() {
    pick("layerInnerCanvasButton").action("click", () => {
      if (this.canvas !== true) {
        this.canvasBtnOn();
        this.layerRefresh();
        this.updateCpsState();
        this.render();
        this.response();
      }
    });
    this.createControlBtn();
    this.updatePageTitle();
    this.render();
  }

  canvasBtnOff() {
    this.canvas = false;
    pick("layerInnerCanvasButton").target.classList.remove("highlight");
  }

  canvasBtnOn() {
    this.canvas = true;
    pick("layerInnerCanvasButton").target.classList.add("highlight");
  }

  render() {
    pick("layerInnerLayerList")._children();
    this.getCpsState();
    this.updatePageTitle();
    this.state.map((i, index) => {
      let layerBtn = createElement({
        el: "layer-btn-div",
        class: [
          ...layerBtnStyle,
          i.isHighlight === true ? "highlight" : "not-highlight",
        ],
        build: (_) => {
          addIcon({
            target: _,
            iconstart: ["bi", "bi-bounding-box-circles"],
            text: i.layerName,
          });
          _.onclick = () => {
            if (i.isHighlight !== true) {
              this.edit = false;
              this.layerHighlight(index);
              this.updateCpsState();
              this.render();
              this.response();
              if (this.canvas === true) {
                this.canvasBtnOff();
              }
            }
          };
          _.ondblclick = () => {
            this.edit = true;
            this.render();
          };
        },
      });
      if (this.edit && i.isHighlight) {
        layerBtn = createElement({
          el: "layer-btn-div",
          class: [
            ...layerBtnStyle,
            i.isHighlight === true ? "highlight" : "not-highlight",
          ],
          build: (_btn) => {
            addIcon({
              target: _btn,
              iconstart: ["bi", "bi-bounding-box-circles"],
            });
            const input = createElement({
              el: "cansvas-input-input",
              class: ["outline-none", "fs-12", "ms-1", "fw-bold"],
              build: (_input, mod) => {
                mod.style({
                  background: "transparent",
                });
                _input.type = "text";
                _input.value = i.layerName;
                _input.onclick = () => {
                  _input.focus();
                  _input.select();
                };
                _input.onkeydown = (ev) => {
                  if (ev.code === "Enter") {
                    this.edit = false;
                    this.renameLayer(_input.value);
                    this.updateCpsState();
                    this.render();
                  }
                };
                setTimeout(() => {
                  _input.focus();
                  _input.select();
                }, 100);
              },
            });
            _btn.appendChild(input.target);
          },
        });
      }
      pick("layerInnerLayerList").children([layerBtn]);
    });
  }

  layerHighlight(preIndex) {
    this.setState(
      this.state.reduce((p, c, curIndex) => {
        if (curIndex === preIndex) {
          c.isHighlight = true;
          p.push(c);
        } else {
          c.isHighlight = false;
          p.push(c);
        }
        return p;
      }, [])
    );
  }

  getCpsState() {
    this.setState(getActiveCanvasLayer(cps.getPageLayerData()).data);
  }

  updateCpsState() {
    const updatedLayer = updataActiveCanvasLayer(cps.getPageLayerData(), {
      data: this.state,
    });
    cps.setPageLayerData(updatedLayer);
  }

  renameLayer(value) {
    this.setState(
      this.state.reduce((p, c) => {
        if (c.isHighlight === true) {
          c.layerName = value;
          p.push(c);
        } else {
          p.push(c);
        }
        return p;
      }, [])
    );
  }

  moveArray(preIndex, direction) {
    let targetArray = this.state.filter((i) => i.isHighlight === true);
    this.setState(
      this.state.reduce((p, c, curIndex) => {
        if (curIndex === preIndex) {
          if (direction === -1) {
            p.push(targetArray[0]);
          }
          p.push(c);
          if (direction === 1) {
            p.push(targetArray[0]);
          }
        } else {
          if (c.isHighlight !== true) {
            p.push(c);
          }
        }
        return p;
      }, [])
    );
  }

  createControlBtn() {
    let moveFun = () => {
      this.moveLayer();
    };
    let editFun = () => {
      this.edit = true;
      this.render();
    };
    let addFun = () => {
      this.edit = false;
      this.createLayer();
    };
    let delFun = () => {
      this.edit = false;
      this.deleteLayer();
    };
    pick("layerInnerLayerLabel").children(
      iconList([
        {
          el: "flex-fill-div",
        },
        {
          el: "move-layer-div",
          icon: "bi-arrows-move",
          click: moveFun,
        },
        {
          el: "edit-layer-div",
          icon: "bi-pen-fill",
          click: editFun,
        },
        {
          el: "add-layer-div",
          icon: "bi-plus-lg",
          click: addFun,
        },
        {
          el: "delete-layer-div",
          icon: "bi-trash3-fill",
          click: delFun,
        },
      ])
    );
  }

  layerRefresh() {
    this.setState(
      this.state.reduce((p, c) => {
        c.isHighlight = false;
        p.push(c);
        return p;
      }, [])
    );
  }

  updatePageTitle() {
    pick("layerInnerCanvasButton").modify((el, mod) => {
      mod._children();
      addIcon({
        target: el,
        iconstart: ["bi", "bi-collection"],
        text: getActiveCanvasLayer(cps.getPageLayerData()).layerName,
        textBold: true,
      });
    });

    const isLayerSelected = this.state.filter((i) => i.isHighlight === true);

    if (isLayerSelected.length === 0) {
      this.canvasBtnOn();
    } else {
      this.canvasBtnOff();
    }
  }
}
