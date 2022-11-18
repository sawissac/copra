import { Component } from "./component/component.js";
import { cps } from "./state/copra.state.global.js";
import { pick } from "./app.build.init.js";
import {
  getActiveCanvasLayer,
  updateActiveCanvasLayer,
} from "./state/canvas.state.api.js";
import {
  emptyComponent,
  footerComponent,
  headerComponent,
  lineComponent,
  textComponent,
} from "./html.render.com.js";
import { CanvasScaler } from "./canvas.scaler.js";
import {
  changeHtmlCanvasAspectRatio,
  isHtmlMode,
} from "./canvasAspectRatio.js";
import { stoV2 } from "./state/storage.js";

export class htmlRender extends Component {
  constructor() {
    super();
    this.canvas = false;
    this.htmlCanvasScaler = new CanvasScaler("htmlInnerCenter");
    this.build();
  }

  build() {
    this.htmlCanvasScaler
      .setMinMax(10, 300)
      .setScalePercentMiddle()
      .changeCanvas()
      .listen(() => {
        pick("iconPercentLabel").text(this.htmlCanvasScaler.getPercentage());
      })
      .build();

    pick("iconPercentLabel").text(this.htmlCanvasScaler.getPercentage());

    pick("htmlInnerTitle").action("click", () => {
      if (this.canvas !== true) {
        this.canvas = true;
        pick("htmlLayer").class(["com-highlight"]);
        this.clearSelect();
        this.updateCpsState();
        this.render();
        this.response();
      }
    });

    this.updateTitle();
    this.render();
  }

  render() {
    changeHtmlCanvasAspectRatio(getActiveCanvasLayer(cps.getPageLayerData()).aspectRatio);
    pick("htmlLayer")._children();
    this.getCpsState();
    this.updateTitle();
    this.buildCanvas(this.state);
  }

  buildCanvas(state) {
    state.map((i, index) => {
      let LayerEl = null;

      if (i.component.type === "Empty") {
        LayerEl = emptyComponent(i);
      }
      if (i.component.type === "Text 1") {
        LayerEl = textComponent(i, 16, true);
      }
      if (i.component.type === "Text 2") {
        LayerEl = textComponent(i, 9, true);
      }
      if (i.component.type === "Flat Text 1") {
        LayerEl = textComponent(i, 16);
      }
      if (i.component.type === "Flat Text 2") {
        LayerEl = textComponent(i, 9);
      }
      if (i.component.type === "Header") {
        LayerEl = headerComponent(i);
      }
      if (i.component.type === "Line") {
        LayerEl = lineComponent(i);
      }
      if (i.component.type === "Footer") {
        LayerEl = footerComponent(i);
      }

      LayerEl.target.onclick = () => {
        if (i.isHighlight !== true) {
          this.canvas = false;
          pick("htmlLayer").target.classList.remove("com-highlight");
          this.checkComponent(index);
          this.updateCpsState();
          this.render();
          this.response();
        }
      };

      pick("htmlLayer").children([LayerEl]);
    });
  }

  canvasHighlightOn() {
    this.canvas = true;
    pick("htmlLayer").class(["com-highlight"]);
  }

  canvasHighlightOff() {
    this.canvas = false;
    pick("htmlLayer").target.classList.remove("com-highlight");
  }

  checkComponent(preIndex) {
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

  clearSelect() {
    this.setState(
      this.state.reduce((p, c) => {
        c.isHighlight = false;
        p.push(c);
        return p;
      }, [])
    );
  }

  updateCpsState() {
    const updatedLayer = updateActiveCanvasLayer(cps.getPageLayerData(), {
      data: this.state,
    });
    cps.setPageLayerData(updatedLayer);
  }

  isLayerSelected() {
    return this.state.filter((i) => i.isHighlight === true).length === 0;
  }

  updateTitle() {
    pick("htmlInnerTitle").text(
      getActiveCanvasLayer(cps.getPageLayerData()).layerName
    );

    if (this.isLayerSelected() && isHtmlMode()) {
      this.canvasHighlightOn();
    } else {
      this.canvasHighlightOff();
    }
  }
  scaleBackToNormal() {
    this.htmlCanvasScaler.canvasReset();
    pick("iconPercentLabel").text(this.htmlCanvasScaler.getPercentage());
  }
  enableMoveX() {
    this.htmlCanvasScaler.horizontalMoveOn();
  }
  disableMoveX() {
    this.htmlCanvasScaler.horizontalMoveOff();
  }
  enableMoveY() {
    this.htmlCanvasScaler.verticalMoveOn();
  }
  disableMoveY() {
    this.htmlCanvasScaler.verticalMoveOff();
  }
  disableMove() {
    this.disableMoveX();
    this.disableMoveY();
  }
  scaleCanvasTo(value) {
    this.htmlCanvasScaler.scaleTo(value);
    pick("iconPercentLabel").text(this.htmlCanvasScaler.getPercentage());
  }
}
