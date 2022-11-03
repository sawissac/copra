import { Component } from "./component/component.js";
import { createElement } from "../packages/automa/src/automa.js";
import { addIcon, pick } from "./app.build.con.js";
import { cps } from "./state/state.js";
import { iconList } from "./iconEngine.js";
import { createPageLayerState } from "./defaultBuild.js";

const layerBtnStyle = [
  "btn",
  "btn-sm",
  "btn-light",
  "d-flex",
  "fs-12",
  "my-1",
  "py-2",
];

export class PageListRender extends Component {
  constructor() {
    super();
    this.edit = false;
    this.setHost({
      _btn_: pick("layerInnerPageBtn"),
      _layer_: pick("layerInnerPageList"),
    });
    this.build();
  }
  createPageLayer() {
    this.state.push(createPageLayerState({layerName: "New Page"}));
  }
  deletePageLayer() {
    if (this.state.length > 1) {
      this.setState(this.state.filter((i) => i.canvas.isHighlight !== true));
      this.state[0].canvas.isHighlight = true;
    }
  }
  build() {
    let addFun = () => {
      this.edit = false;
      this.createPageLayer();
      this.updateCpsState();
      this.render();
    };
    let editFun = () => {
      this.edit = true;
      this.render();
    };
    let delFun = () => {
      this.edit = false;
      this.deletePageLayer();
      this.updateCpsState();
      this.render();
      this.worker();
    };
    this.getHost()._btn_.children(
      iconList([
        {
          el: "flex-fill-div",
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
    this.getHost()._layer_._children();
    this.getCpsState();
    this.state.map((i) => {
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
        layerBtn = createElement({
          el: "layer-btn-div",
          class: [
            ...layerBtnStyle,
            i.canvas.isHighlight === true ? "highlight" : "not-highlight",
          ],
          build: (_btn, mod) => {
            addIcon({
              target: _btn,
              iconstart: ["bi", "bi-collection"],
            });
            const input = createElement({
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
