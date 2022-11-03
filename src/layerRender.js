import { Component } from "./component/component.js";
import { createElement } from "../packages/automa/src/automa.js";
import { addIcon, pick } from "./app.build.con.js";
import { cps } from "./state/state.js";
import { iconList } from "./iconEngine.js";
import { createLayerState } from "./defaultBuild.js";

const layerBtnStyle = [
  "btn",
  "btn-sm",
  "btn-light",
  "d-flex",
  "fs-12",
  "my-1",
  "py-2",
];

export class LayerRander extends Component {
  constructor() {
    super();
    this.edit = false;
    this.canvas = false;
    this.setHost({
      _htmltitle_: pick("htmlInnerTitle"),
      _layerlabel_: pick("layerInnerLayerLabel"),
      _canvasbtn_: pick("layerInnerCanvasButton"),
      _layer_: pick("layerInnerLayerList"),
      _canvaslayer_: pick("htmlLayer"),
    });
    this.build();
  }
  createLayer() {
    this.state.push(createLayerState({layerName: "New Layer"}));
    this.updateCpsState();
    this.getWorker();
  }
  deleteLayer() {
    if (this.state.length > 1) {
      this.setState(this.state.filter((i) => i.isHighlight !== true));
    }
    this.updateCpsState();
    this.getWorker();
  }
  moveLayer() {
    const isactiveLayer = this.state.filter((i) => i.isHighlight === true);
    if (isactiveLayer.length !== 0) {
      this.getHost()._layer_._children();
      const MoveLayerCancelBtn = createElement({
        el: "move-layer-cancel-div",
        class: [
          "btn",
          "btn-sm",
          "btn-primary",
          "d-block",
          "fs-12",
          "my-1",
          "text-center",
          "py-2",
        ],
        text: "CANCEL",
        build: (_, mod) => {
          _.onclick = () => {
            this.render();
          };
        },
      });
      this.getHost()._layer_.children([MoveLayerCancelBtn]);
      this.state.map((i) => {
        const MoveLayerBtn = createElement({
          el: "move-layer-btn-div",
          class: [
            "btn",
            "btn-sm",
            "btn-light",
            "d-flex",
            "fs-12",
            "my-1",
            "justify-content-between",
            i.isHighlight === true ? "highlight" : "not-highlight",
          ],
          children:
            i.isHighlight !== true
              ? [
                  createElement({
                    el: "up-layer-btn-div",
                    class: [
                      "btn",
                      "btn-sm",
                      "btn-primary",
                      "d-flex",
                      "fs-12",
                      "my-1",
                      "text-center",
                    ],
                    build: (_) => {
                      addIcon({
                        target: _,
                        iconstart: ["bi", "bi-chevron-compact-up"],
                      });
                      _.onclick = () => {
                        this.moveArray(i.id, -1);
                        this.updateCpsState();
                        this.render();
                        this.worker();
                      };
                    },
                  }),
                  createElement({
                    el: "label-layer-btn-div",
                    class: [
                      "btn",
                      "btn-sm",
                      "fs-12",
                      "text-center",
                      "d-flex",
                      "align-items-center",
                      "border-0"
                    ],
                    text: i.layerName,
                  }),
                  createElement({
                    el: "down-layer-btn-div",
                    class: [
                      "btn",
                      "btn-sm",
                      "btn-primary",
                      "d-flex",
                      "fs-12",
                      "my-1",
                      "text-center",
                    ],
                    build: (_) => {
                      addIcon({
                        target: _,
                        iconstart: ["bi", "bi-chevron-compact-down"],
                      });
                      _.onclick = () => {
                        this.moveArray(i.id, 1);
                        this.updateCpsState();
                        this.render();
                        this.worker();
                      };
                    },
                  }),
                ]
              : [
                  createElement({
                    el: "up-layer-btn-div",
                    class: ["flex-fill", "py-1","text-primary"],
                    text: i.layerName,
                  }),
                ],
        });
        this.getHost()._layer_.children([MoveLayerBtn]);
      });
    }
  }
  build() {
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
      this.updateCpsState();
      this.render();
    };
    let delFun = () => {
      this.edit = false;
      this.deleteLayer();
      this.updateCpsState();
      this.render();
    }

    this.getHost()._canvasbtn_.target.onclick = () => {
      if (this.canvas !== true) {
        this.canvasBtnOn();
        this.stateRefresh("isHighlight", false);
        this.updateCpsState();
        this.render();
        this.getWorker();
      }
    };
    this.updatePageTitle();
    this.getHost()._layerlabel_.children(
      iconList([
        {
          el: "flex-fill-div",
        },
        {
          el: "move-layer-div",
          icon: "bi-arrows-move",
          click:moveFun
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
  canvasBtnOff() {
    this.canvas = false;
    this.getHost()._canvasbtn_.target.classList.remove("highlight");
  }
  canvasBtnOn() {
    this.canvas = true;
    this.getHost()._canvasbtn_.target.classList.add("highlight");
  }
  render() {
    this.getHost()._layer_._children();
    this.getCpsState();
    this.updatePageTitle();
    this.state.map((i) => {
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
              this.checkState(i.id, "isHighlight", this.highlightSetting);
              this.updateCpsState();
              this.render();
              this.getWorker();
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
                    this.setState(
                      this.state.reduce((p, c) => {
                        if (c.isHighlight === true) {
                          c.layerName = _input.value;
                          p.push(c);
                        } else {
                          p.push(c);
                        }
                        return p;
                      }, [])
                    );
                    this.edit = false;
                    this.updateCpsState();
                    this.render();
                  }
                };
              },
            });
            _btn.appendChild(input.target);
          },
        });
      }
      this.getHost()._layer_.children([layerBtn]);
    });
  }
  highlightSetting(p, c, id, key) {
    if (c.id === id) {
      c[key] = true;
      p.push(c);
    } else {
      c[key] = false;
      p.push(c);
    }
    return p;
  }
  getCpsState() {
    let activePageLayer = cps
      .getPageLayerData()
      .filter((i) => i.canvas.isHighlight === true);
    this.setState(
      activePageLayer[0].canvas.data.reduce((p, c) => {
        c.id = Symbol();
        p.push(c);
        return p;
      }, [])
    );
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
  moveArray(id, direction) {
    let targetArray = this.state.filter((i) => i.isHighlight === true);
    this.setState(
      this.state.reduce((p, c) => {
        if (c.id === id) {
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
  layerUnSelectAll() {
    this.stateRefresh("isHighlight", false);
    this.canvasBtnOn();
    this.render();
    this.getWorker();
  }
  updatePageTitle() {
    const activePageLayer = cps
      .getPageLayerData()
      .filter((i) => i.canvas.isHighlight === true);
    if (activePageLayer.length !== 0) {
      let layercanvasbtn = this.getHost()._canvasbtn_;
      layercanvasbtn._children();
      addIcon({
        target: layercanvasbtn.target,
        iconstart: ["bi", "bi-collection"],
        text: activePageLayer[0].canvas.layerName,
        textBold: true
      });
    }
    const activeEleLayer = activePageLayer[0].canvas.data.filter(
      (i) => i.isHighlight === true
    );
    if (activeEleLayer.length === 0) {
      this.canvasBtnOn();
    } else {
      this.canvasBtnOff();
    }
  }
}
