import { Component } from "./component/component.js";

export class LayerRander extends Component {
  constructor() {
    super();
    this.edit = false;
    this.canvas = false;
  }
  createLayer() {
    this.state.push({
      layerName: "Element",
      isHighlight: false,
      component: { type: "Empty", text: "", height: 50, textColor: "" },
    });
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
      const MoveLayerCancelBtn = am.component({
        el: "move-layer-cancel-div",
        class: [
          "btn",
          "btn-sm",
          "btn-primary",
          "d-block",
          "fs-12",
          "my-1",
          "text-center",
          "py-2"
        ],
        text: "CANCEL",
        build: (_,mod) => {
          _.onclick = () => {
            this.render();
          };
        },
      });
      this.getHost()._layer_.children([MoveLayerCancelBtn]);
      this.state.map((i) => {
        const MoveLayerBtn = am.component({
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
                  am.component({
                    el: "up-layer-btn-div",
                    class: [
                      "btn",
                      "btn-sm",
                      "btn-light",
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
                  am.component({
                    el: "up-layer-btn-div",
                    class: [
                      "btn",
                      "btn-sm",
                      "btn-light",
                      "fs-12",
                      "text-center",
                      "d-flex",
                      "align-items-center"
                    ],
                    text: i.layerName,
                  }),
                  am.component({
                    el: "up-layer-btn-div",
                    class: [
                      "btn",
                      "btn-sm",
                      "btn-light",
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
                  am.component({
                    el: "up-layer-btn-div",
                    class: ["flex-fill","py-1"],
                    text: i.layerName,
                  }),
                ],
        });
        this.getHost()._layer_.children([MoveLayerBtn]);
      });
    }
  }
  build() {
    const MoveBtn = am.component({
      el: "move-btn-div",
      class: ["me-1"],
      build: (_) => {
        addIcon({
          target: _,
          iconstart: ["bi", "bi-arrows-move"],
        });
        _.onclick = () => {
          this.moveLayer();
        };
      },
    });
    const EditBtn = am.component({
      el: "add-btn-div",
      build: (_) => {
        addIcon({
          target: _,
          iconstart: ["bi", "bi-pen-fill"],
        });
        _.onclick = () => {
          this.edit = true;
          this.render();
        };
      },
    });
    const AddBtn = am.component({
      el: "add-btn-div",
      build: (_) => {
        addIcon({
          target: _,
          iconstart: ["bi", "bi-plus-lg"],
        });
        _.onclick = () => {
          this.edit = false;
          this.createLayer();
          this.updateCpsState();
          this.render();
        };
      },
    });
    const DeleteBtn = am.component({
      el: "delete-btn-div",
      build: (_) => {
        addIcon({
          target: _,
          iconstart: ["bi", "bi-trash3-fill"],
        });
        _.onclick = () => {
          this.edit = false;
          this.deleteLayer();
          this.updateCpsState();
          this.render();
        };
      },
    });
    const Block = am.component({
      el: "block-div",
      class: ["flex-fill"],
    });

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
    this.getHost()._layerlabel_.children([
      Block,
      MoveBtn,
      EditBtn,
      AddBtn,
      DeleteBtn,
    ]);
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
      let layerBtn = am.component({
        el: "layer-btn-div",
        class: [
          "btn",
          "btn-sm",
          "btn-light",
          "d-flex",
          "fs-12",
          "my-1",
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
        layerBtn = am.component({
          el: "layer-btn-div",
          class: [
            "btn",
            "btn-sm",
            "btn-light",
            "d-flex",
            "fs-12",
            "my-1",
            i.isHighlight === true ? "highlight" : "not-highlight",
          ],
          build: (_btn) => {
            addIcon({
              target: _btn,
              iconstart: ["bi", "bi-bounding-box-circles"],
            });
            const input = am.component({
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
