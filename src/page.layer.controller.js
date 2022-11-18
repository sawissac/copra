import { Component } from "./component/component.js";
import {
  createElement,
  parseToElement,
  setElement,
  setInstruction,
} from "../packages/automa/src/automa.js";
import { addIcon, pick } from "./app.build.init.js";
import { cps } from "./state/copra.state.global.js";
import { iconList } from "./iconEngine.js";
import { createPageLayerState } from "./layer.api.js";
import { updateActiveCanvasLayer } from "./state/canvas.state.api.js";
import {
  layerBtnStyle,
  moveBtn,
  moveCancelBtn,
  noneMoveBtn,
} from "./layer.common.js";

export class PageLayerController extends Component {
  constructor() {
    super();
    this.edit = false;
    this.element = parseToElement([
      "layer-div",
      "layer-inner-page-div-.mh180,dFlex,fColumn,bgLight,rounded,shadow",
      "layer-inner-page-btn-button-.btnBorderLight,mt2,h33,borderBot,rounded0",
      "layer-inner-page-list-div-.h150,flowY,pdx2,pdy2",
    ]);

    this.element.layer = pick("layer");

    setInstruction(this.element, [
      "layerInnerPage = layerInnerPageBtn,layerInnerPageList",
      "layer = layerInnerPage",
    ]);

    this.pick = setElement(this.element);
    this.build();
  }

  createPageLayer() {
    this.state.push(createPageLayerState({ layerName: "New Page" }));
    this.updateCpsState();
    this.render();
  }

  deletePageLayer() {
    if (this.state.length > 1) {
      this.setState(this.state.filter((i) => i.canvas.isHighlight !== true));
      this.state[0].canvas.isHighlight = true;
      this.updateCpsState();
      this.render();
      this.response();
    }
  }

  moveLayer() {
    this.pick("layerInnerPageList")._children();

    this.pick("layerInnerPageList").children([
      moveCancelBtn({
        action: () => {
          this.render();
        },
      }),
    ]);

    this.state.map((i, index) => {
      const MoveLayerBtn = createElement({
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
                },
                layerName: i.canvas.layerName,
                downAction: () => {
                  this.moveArray(index, 1);
                  this.updateCpsState();
                  this.render();
                },
              })
            : noneMoveBtn({ layerName: i.canvas.layerName }),
      });

      this.pick("layerInnerPageList").children([MoveLayerBtn]);
    });
  }

  build() {
    this.pick("layerInnerPageBtn").modify((el) => {
      addIcon({
        target: el,
        text: "Page",
        textBold: true,
      });
    });
    let moveFun = () => {
      this.moveLayer();
    };
    let addFun = () => {
      this.edit = false;
      this.createPageLayer();
    };
    let editFun = () => {
      this.edit = true;
      this.render();
    };
    let delFun = () => {
      this.edit = false;
      this.deletePageLayer();
    };
    this.pick("layerInnerPageBtn").children(
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
    this.render();
  }

  render() {
    this.pick("layerInnerPageList")._children();
    this.getCpsState();
    this.state.map((i, index) => {
      let layerBtn = createElement({
        el: "layer-btn-div",
        class: [
          ...layerBtnStyle,
          i.canvas.isHighlight === true ? "highlight" : "not-highlight",
        ],
        build: (_) => {
          addIcon({
            target: _,
            iconstart: ["bi", "bi-collection", "pe-1"],
            text: i.canvas.layerName,
            iconStartMuted: true,
          });
          _.onclick = () => {
            if (i.canvas.isHighlight !== true) {
              this.edit = false;
              this.canvasHighlight(index);
              this.updateCpsState();
              this.render();
              this.response();
            }
          };
          _.ondblclick = () => {
            this.edit = true;
            this.render();
          };
        },
      });

      if (this.edit && i.canvas.isHighlight) {
        layerBtn = createElement({
          el: "layer-btn-div",
          class: [
            ...layerBtnStyle,
            i.canvas.isHighlight === true ? "highlight" : "not-highlight",
          ],
          build: (_btn) => {
            addIcon({
              target: _btn,
              iconstart: ["bi", "bi-collection"],
            });
            const input = createElement({
              el: "canvas-input-input",
              class: ["outline-none", "fs-12", "ms-1", "fw-bold"],
              build: (_input, mod) => {
                mod.style({
                  background: "transparent",
                });
                _input.type = "text";
                _input.value = i.canvas.layerName;
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
                    this.response();
                  }
                };
                _input.onblur = () => {
                  this.edit = false;
                  this.render();
                }
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

      this.pick("layerInnerPageList").children([layerBtn]);
    });
  }

  canvasHighlight(preIndex) {
    this.setState(
      this.state.reduce((p, c, curIndex) => {
        if (curIndex === preIndex) {
          c.canvas.isHighlight = true;
          p.push(c);
        } else {
          c.canvas.isHighlight = false;
          p.push(c);
        }
        return p;
      }, [])
    );
  }

  renameLayer(value) {
    this.setState(
      updateActiveCanvasLayer(cps.getPageLayerData(), {
        layerName: value,
      })
    );
  }

  getCpsState() {
    this.setState(cps.getPageLayerData());
  }

  updateCpsState() {
    cps.setPageLayerData(this.state);
  }

  moveArray(preIndex, direction) {
    let targetArray = this.state.filter((i) => i.canvas.isHighlight === true);
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
          if (c.canvas.isHighlight !== true) {
            p.push(c);
          }
        }
        return p;
      }, [])
    );
  }
}
