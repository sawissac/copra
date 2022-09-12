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
      component: { type: "Empty", text: "", height: 50,textColor:'' },
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
      this.getHost()._layer_.innerHTML = "";
      const MoveLayerCancelBtn = er.component({
        element: "move-layer-cancel-div",
        class: [
          "btn-btn",
          "d-flex",
          "j-center",
          "fs-12",
          "text-white",
          "btn-secoundary",
          "br-5",
          "my-4",
        ],
        text: "CANCEL",
        build: (_) => {
          _.onclick = () => {
            this.render();
          };
        },
      });
      this.getHost()._layer_.appendChild(MoveLayerCancelBtn.target);
      this.state.map((i) => {
        const MoveLayerBtn = er.component({
          element: "move-layer-btn-div",
          class: [
            "btn-btn",
            "d-flex",
            "j-center",
            "ai-center",
            "flex-column",
            "fs-12",
            "text-white",
            "bg-secoundary",
            "br-5",
            "my-4",
            "p-0",
            i.isHighlight === true ? "highlight" : "not-highlight",
          ],
          children:
            i.isHighlight !== true
              ? [
                  er.component({
                    element: "up-layer-btn-div",
                    class: [
                      "btn-btn",
                      "d-flex",
                      "j-center",
                      "ai-center",
                      "btn-secoundary",
                    ],
                    build: (_) => {
                      er.icon(_, ["bi", "bi-chevron-compact-up", "mx-5"], true);
                      _.onclick = () => {
                        this.moveArray(i.id, -1);
                        this.updateCpsState();
                        this.render();
                        this.worker();
                      };
                    },
                  }),
                  er.component({
                    element: "up-layer-btn-div",
                    text: i.layerName,
                  }),
                  er.component({
                    element: "up-layer-btn-div",
                    class: [
                      "btn-btn",
                      "d-flex",
                      "j-center",
                      "ai-center",
                      "btn-secoundary",
                    ],
                    build: (_) => {
                      er.icon(
                        _,
                        ["bi", "bi-chevron-compact-down", "mx-5"],
                        true
                      );
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
                  er.component({
                    element: "up-layer-btn-div",
                    class: ["py-10"],
                    text: i.layerName,
                  }),
                ],
        });
        this.getHost()._layer_.appendChild(MoveLayerBtn.target);
      });
    }
  }
  build() {
    const MoveBtn = er.component({
      element: "move-btn-div",
      class: ["mx-4"],
      build: (_) => {
        er.icon(_, ["bi", "bi-arrows-move", "mx-5"], true);
        _.onclick = () => {
          this.moveLayer();
        };
      },
    });
    const EditBtn = er.component({
      element: "add-btn-div",
      class: ["mx-4"],
      build: (_) => {
        er.icon(_, ["bi", "bi-pen-fill", "mx-5"], true);
        _.onclick = () => {
          this.edit = true;
          this.render();
        };
      },
    });
    const AddBtn = er.component({
      element: "add-btn-div",
      class: ["mx-4"],
      build: (_) => {
        er.icon(_, ["bi", "bi-plus-lg", "mx-5"], true);
        _.onclick = () => {
          this.edit = false;
          this.createLayer();
          this.updateCpsState();
          this.render();
        };
      },
    });
    const DeleteBtn = er.component({
      element: "delete-btn-div",
      class: ["mx-4"],
      build: (_) => {
        er.icon(_, ["bi", "bi-trash3-fill"], true);
        _.onclick = () => {
          this.edit = false;
          this.deleteLayer();
          this.updateCpsState();
          this.render();
        };
      },
    });
    const Block = er.component({
      element: "block-div",
      class: ["block"],
    });

    this.getHost()._canvasbtn_.onclick = () => {
      if (this.canvas !== true) {
        this.canvasBtnOn();
        this.stateRefresh("isHighlight", false);
        this.updateCpsState();
        this.render();
        this.getWorker();
      }
    };
    this.updatePageTitle();
    this.getHost()._layerlabel_.appendChild(Block.target);
    this.getHost()._layerlabel_.appendChild(MoveBtn.target);
    this.getHost()._layerlabel_.appendChild(EditBtn.target);
    this.getHost()._layerlabel_.appendChild(AddBtn.target);
    this.getHost()._layerlabel_.appendChild(DeleteBtn.target);
    this.render();
  }
  canvasBtnOff() {
    this.canvas = false;
    this.getHost()._canvasbtn_.classList.remove("highlight");
  }
  canvasBtnOn() {
    this.canvas = true;
    this.getHost()._canvasbtn_.classList.add("highlight");
  }
  render() {
    this.getHost()._layer_.innerHTML = "";
    this.getCpsState();
    this.updatePageTitle();
    this.state.map((i) => {
      let layerBtn = er.component({
        element: "layer-btn-div",
        class: [
          "btn-btn",
          "d-flex",
          "j-left",
          "fs-12",
          "text-white",
          "btn-secoundary",
          "br-5",
          "my-4",
          i.isHighlight === true ? "highlight" : "not-highlight",
        ],
        build: (_) => {
          er.icon(
            _,
            ["bi", "bi-bounding-box-circles"],
            true,
            i.layerName,
            true
          );
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
        },
      });
      if (this.edit && i.isHighlight) {
        layerBtn = er.component({
          element: "layer-btn-div",
          class: [
            "btn-btn",
            "d-flex",
            "j-left",
            "fs-12",
            "text-white",
            "bg-secoundary",
            "br-5",
            "my-4",
            i.isHighlight === true ? "highlight" : "not-highlight",
          ],
          build: (_btn) => {
            er.icon(_btn, ["bi", "bi-bounding-box-circles"], true, "", false);
            const input = er.component({
              element: "cansvas-input-input",
              class: ["text-left"],
              build: (_input) => {
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
      this.getHost()._layer_.appendChild(layerBtn.target);
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
  updatePageTitle() {
    const activePageLayer = cps
      .getPageLayerData()
      .filter((i) => i.canvas.isHighlight === true);
    if (activePageLayer.length !== 0) {
      this.getHost()._canvasbtn_.innerHTML = "";
      er.icon(
        this.getHost()._canvasbtn_,
        ["bi", "bi-collection"],
        true,
        activePageLayer[0].canvas.layerName,
        true
      );
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
