import { Component } from "./component/component.js";
import { createElement,getElementList } from "../packages/automa/src/automa.js";
import { cps } from "./state/state.js";
import { stoV2 } from "./state/storage.js";

let scaleBtnStyle = [
  "btn",
  "btn-sm",
  "btn-light",
  "bg-white",
  "border",
  "border-2",
  "rounded",
  "py-1",
  "mx-1",
  "fs-12",
  "d-flex",
];
let renderDownloadBtn = createElement({
  el: "download-a",
  class: [
    "btn",
    "btn-sm",
    "btn-primary",
    "py-1",
    "mx-1",
    "fs-12",
    "d-flex",
  ],
  text: "DOWNLOAD",
  build: (_) => {
    _.style.textDecoration = "none";
  },
});
export class ImageRender extends Component {
  constructor() {
    super();
    this.pixelRatio = 2;
    this.engine = null;
  }
  build() {
    let canvasRefresh = () => {
      this.getHost()._image_.innerHTML = "";
      this.render();
    };
    let closeCanvas = () => {
      this.hide();
      this.canvasHighlightOff(false);
      stoV2.val("htmlmode").storeToCanvasMode();
    };
    let scaleBtns = [
      {
        type: "0.5x",
        fun: () => {
          this.pixelRatio = 0.5;
          canvasRefresh();
        },
      },
      {
        type: "2x",
        fun: () => {
          this.pixelRatio = 2;
          canvasRefresh();
        },
      },
      {
        type: "4x",
        fun: () => {
          this.pixelRatio = 4;
          canvasRefresh();
        },
      },
      {
        type: "9x",
        fun: () => {
          this.pixelRatio = 9;
          canvasRefresh();
        },
      },
    ];
    scaleBtns.map((i) => {
      let btn = createElement({
        el: "sacle-btn-div",
        class: scaleBtnStyle,
        text: i.type,
        build: (_) => {
          _.onclick = i.fun;
        },
      });
      this.getHost()._controller_.appendChild(btn.target);
    });
    let closeBtn = createElement({
      el: "image-close-div",
      class: scaleBtnStyle,
      text: "Close",
      build: (_) => {
        _.onclick = closeCanvas;
      },
    });
    this.getHost()._controller_.appendChild(renderDownloadBtn.target);
    this.getHost()._controller_.appendChild(closeBtn.target);
  }
  show() {
    this.getHost()._imageScene_.classList.remove("d-none");
  }
  hide(){
    this.getHost()._imageScene_.classList.add("d-none");
  }
  getRatio() {
    return this.pixelRatio;
  }
  setRatio(value) {
    this.pixelRatio = value;
    return this;
  }
  setEngine(engine) {
    this.engine = engine;
    return this;
  }
  render() {
    this.canvasHighlightOff(true);
    this.getHost()._image_.innerHTML = "";
    this.engine
      .toCanvas(this.getHost()._html_, {
        pixelRatio: this.pixelRatio,
      })
      .then((canvas) => {
        this.getHost()._image_.appendChild(canvas);
      });

    const activePageLayer = cps
      .getPageLayerData()
      .filter((i) => i.canvas.isHighlight === true);

    this.engine
      .toPng(this.getHost()._html_, {
        pixelRatio: this.pixelRatio,
      })
      .then(function (dataUrl) {
        renderDownloadBtn.target.href = dataUrl;
        renderDownloadBtn.target.download = activePageLayer[0].canvas.layerName;
      });
  }
  canvasHighlightOff(value) {
    const activePageLayer = cps
      .getPageLayerData()
      .filter((i) => i.canvas.isHighlight === true);
    const activeEleLayer = activePageLayer[0].canvas.data.filter(
      (i) => i.isHighlight === true
    );
    if (activeEleLayer.length === 0 && value === true) {
      getElementList().htmlLayer.modify((_) => {
        _.classList.remove("com-highlight");
      });
    }
    if (activeEleLayer.length === 0 && value === false) {
      getElementList().htmlLayer.modify((_) => {
        _.classList.add("com-highlight");
      });
    }
  }
}
