import { Component } from "./component/component.js";

export class htmlRender extends Component {
  constructor() {
    super();
    this.canvas = false;
  }
  build() {
    this.getHost()._htmlTitle_.onclick = () => {
      if (this.canvas !== true) {
        this.canvas = true;
        this.getHost()._layer_.classList.add("com-highlight");
        this.stateRefresh("isHighlight", false);
        this.updateCpsState();
        this.render();
        this.getWorker();
      }
    };
  }
  render() {
    this.getHost()._layer_.innerHTML = "";
    this.getCpsState();
    this.updateTitle();
    this.state.map((i) => {
      let LayerEl = null;

      if (i.component.type === "Empty") {
        LayerEl = er.component({
          element: "layer-none-div",
          class: [
            "com-empty",
            i.isHighlight === true ? "com-highlight" : "com-not-highlight",
          ],
          text: i.component.text.length > 0 ? i.component.text : "",
          build: (_) => {
            _.style.color = i.component.textColor;
            _.style.height = i.component.height + "px";
          },
        });
      }
      if (i.component.type === "Header") {
        LayerEl = er.component({
          element: "canvas-header-div",
          class: [
            "com-header",
            i.isHighlight === true ? "com-highlight" : "com-not-highlight",
          ],
          children: [
            er.component({
              element: "header-inner-div",
              class: ["inner"],
              children: [
                er.component({
                  element: "option-div",
                  class: ["option"],
                  children: [
                    er.component({
                      element: "circle1-div",
                      class: ["circle"],
                    }),
                    er.component({
                      element: "circle2-div",
                      class: ["circle2"],
                    }),
                    er.component({
                      element: "circle3-div",
                      class: ["circle3"],
                    }),
                  ],
                }),
                er.component({
                  element: "label-div",
                  text: i.component.text.length > 0 ? i.component.text : "",
                  class: ["label"],
                  build: (_) => {
                    _.style.color = i.component.textColor;
                  },
                }),
              ],
            }),
          ],
        });
      }
      if (i.component.type === "Line") {
        LayerEl = er.component({
          element: "line-div",
          class: [
            "com-line",
            i.isHighlight === true ? "com-highlight" : "com-not-highlight",
          ],
          children: [
            er.component({
              element: "line-inner-div",
              class: ["inner"],
              text: i.component.text,
              build: (_) => {
                _.style.color = i.component.textColor;
              },
            }),
          ],
        });
      }
      if (i.component.type === "Footer") {
        LayerEl = er.component({
          element: "footer-div",
          class: [
            "com-footer",
            i.isHighlight === true ? "com-highlight" : "com-not-highlight",
          ],
          children: [
            er.component({
              element: "footer-inner-div",
              class: ["inner"],
            }),
          ],
        });
      }

      LayerEl.target.onclick = () => {
        if (i.isHighlight !== true) {
          this.canvas = false;
          this.getHost()._layer_.classList.remove("com-highlight");
          this.checkState(i.id, "isHighlight", this.highlightSetting);
          this.updateCpsState();
          this.render();
          this.getWorker();
        }
      };
      this.getHost()._layer_.appendChild(LayerEl.target);
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
  updateTitle() {
    const activePageLayer = cps
      .getPageLayerData()
      .filter((i) => i.canvas.isHighlight === true);
    const titleEl = er.element.htmlInnerTitle.target;
    if (activePageLayer.length !== 0) {
      titleEl.textContent = activePageLayer[0].canvas.layerName;
    }
    const activeEleLayer = activePageLayer[0].canvas.data.filter(
      (i) => i.isHighlight === true
    );
    if (activeEleLayer.length > 0) {
      this.canvas = false;
      this.getHost()._layer_.classList.remove("com-highlight");
    } else {
      this.canvas = true;
      this.getHost()._layer_.classList.add("com-highlight");
    }
  }
}
