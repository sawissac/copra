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
          this.createPageLayer();
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
          this.deletePageLayer();
          this.updateCpsState();
          this.render();
        };
      },
    });
    const Block = er.component({
      element: "block-div",
      class: ["block"],
    });
    this.getHost()._btn_.appendChild(Block.target);
    this.getHost()._btn_.appendChild(EditBtn.target);
    this.getHost()._btn_.appendChild(AddBtn.target);
    this.getHost()._btn_.appendChild(DeleteBtn.target);
    this.render();
  }
  render() {
    this.getHost()._layer_.innerHTML = "";
    this.getCpsState();
    this.state.map((i) => {
      let layerBtn = er.component({
        element: "layer-btn-div",
        class: [
          "btn-btn",
          "btn-light",
          "d-flex",
          "j-left",
          "fs-12",
          "text-dark",
          i.canvas.isHighlight === true ? "highlight" : "not-highlight",
        ],
        build: (_) => {
          er.icon(_, ["bi", "bi-collection"], true, i.canvas.layerName, true);
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
        },
      });

      if (this.edit && i.canvas.isHighlight) {
        layerBtn = er.component({
          element: "layer-btn-div",
          class: [
            "btn-btn",
            "text-dark",
            "btn-light",
            "border-bottom-2",
            
            "d-flex",
            "j-left",
            "fs-12",
            "br-5",
            "my-4",
            i.canvas.isHighlight === true ? "highlight" : "not-highlight",
          ],
          build: (_btn) => {
            er.icon(_btn, ["bi", "bi-collection"], true, "", false);
            const input = er.component({
              element: "cansvas-input-input",
              class: ["text-left"],
              build: (_input) => {
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
      this.getHost()._layer_.appendChild(layerBtn.target);
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
