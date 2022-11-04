import { Component } from "./component/component.js";
import { cps } from "./state/state.js";
import { createElement } from "../packages/automa/src/automa.js";
import { pick } from "./app.build.con.js";

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
        this.response();
      }
    };
  }
  render() {
    this.getHost()._layer_.innerHTML = "";
    this.getCpsState();
    this.updateTitle();
    this.buildCanvas(this.state);
  }

  buildCanvas(state) {
    state.map((i) => {
      let LayerEl = null;

      if (i.component.type === "Empty") {
        LayerEl = createElement({
          el: "layer-none-div",
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
        LayerEl = createElement({
          el: "canvas-header-div",
          class: [
            "com-header",
            i.isHighlight === true ? "com-highlight" : "com-not-highlight",
          ],
          children: [
            createElement({
              el: "header-inner-div",
              class: ["inner"],
              children: [
                createElement({
                  el: "option-div",
                  class: ["option"],
                  children: [
                    createElement({
                      el: "circle1-div",
                      class: ["circle"],
                    }),
                    createElement({
                      el: "circle2-div",
                      class: ["circle2"],
                    }),
                    createElement({
                      el: "circle3-div",
                      class: ["circle3"],
                    }),
                  ],
                }),
                createElement({
                  el: "label-div",
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
        LayerEl = createElement({
          el: "line-div",
          class: [
            "com-line",
            i.isHighlight === true ? "com-highlight" : "com-not-highlight",
          ],
          children: [
            createElement({
              el: "line-inner-div",
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
        LayerEl = createElement({
          el: "footer-div",
          class: [
            "com-footer",
            i.isHighlight === true ? "com-highlight" : "com-not-highlight",
          ],
          children: [
            createElement({
              el: "footer-inner-div",
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
          this.response();
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
    const titleEl = pick("htmlInnerTitle").target;
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
