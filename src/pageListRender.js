import { Component } from "./component/component.js";

export class PageListRender extends Component {
  constructor() {
    super();
    this.edit = false;
  }
  createPageLayer() {
    this.state.push({
      canvas: {
        id: Symbol(),
        layerName: "New Canvas",
        isHighlight: false,
        data: [],
      },
    });
  }
  deletePageLayer() {
    if (this.state.length > 1) {
      this.setState(this.state.filter((i) => i.canvas.isHighlight !== true));
    }
  }
  build() {
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
          this.createPageLayer();
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
          this.deletePageLayer();
          this.updateCpsState();
          this.render();
        };
      },
    });
    const Block = am.component({
      el: "block-div",
      class: ["flex-fill"],
    });
    this.getHost()._btn_.children([Block, EditBtn, AddBtn, DeleteBtn]);
    this.render();
  }
  render() {
    this.getHost()._layer_._children();
    this.getCpsState();
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
          i.canvas.isHighlight === true ? "highlight" : "not-highlight",
        ],
        build: (_) => {
          addIcon({
            target: _,
            iconstart: ["bi", "bi-collection","pe-1"],
            text: i.canvas.layerName,
          });
          _.onclick = () => {
            if (i.canvas.isHighlight !== true) {
              this.edit = false;
              this.checkState(
                i.canvas.id,
                "isHighlight",
                this.highlightSetting
              );
              this.updateCpsState();
              this.render();
              this.getWorker();
            }
          };
          _.ondblclick = () => {
            this.edit = true;
            this.render();
          };
        },
      });

      if (this.edit && i.canvas.isHighlight) {
        layerBtn = am.component({
          el: "layer-btn-div",
          class: [
            "btn",
            "btn-sm",
            "btn-light",
            "d-flex",
            "fs-12",
            "my-1",
            i.canvas.isHighlight === true ? "highlight" : "not-highlight",
          ],
          build: (_btn, mod) => {
            addIcon({
              target: _btn,
              iconstart: ["bi", "bi-collection"],
            });
            const input = am.component({
              el: "cansvas-input-input",
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
                    this.setState(
                      this.state.reduce((p, c) => {
                        if (c.canvas.isHighlight === true) {
                          c.canvas.layerName = _input.value;
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
                    this.getWorker();
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
    if (c.canvas.id === id) {
      c.canvas[key] = true;
      p.push(c);
    } else {
      c.canvas[key] = false;
      p.push(c);
    }
    return p;
  }
  getCpsState() {
    this.setState(
      cps.getPageLayerData().reduce((p, c) => {
        c.canvas.id = Symbol();
        p.push(c);
        return p;
      }, [])
    );
  }
  updateCpsState() {
    cps.setPageLayerData(
      this.state.map((i) => {
        delete i.canvas.id;
        return i;
      })
    );
  }
}
