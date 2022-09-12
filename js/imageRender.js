import { Component } from "./component/component.js";

let scaleBtnStyle = [
  "ts-12",
  "btn-btn",
  "btn-max",
  "btn-secoundary",
  "text-white",
  "b-primary",
  "br-5",
  "mx-4",
];
let renderDownloadBtn = er.component({
  element: "download-a",
  class: scaleBtnStyle,
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
      this.getHost()._imageScene_.style.display = "none";
      this.canvasHighlightOff(false);
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
      let btn = er.component({
        element: "sacle-btn-div",
        class: scaleBtnStyle,
        text: i.type,
        build: (_) => {
          _.onclick = i.fun;
        },
      });
      this.getHost()._controller_.appendChild(btn.target);
    });
    let closeBtn = er.component({
      element: "image-close-div",
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
    this.getHost()._imageScene_.style.display = "";
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
      er.element.htmlLayer.set((_) => {
        _.classList.remove("com-highlight");
      });
    }
    if (activeEleLayer.length === 0 && value === false){
      er.element.htmlLayer.set((_) => {
        _.classList.add("com-highlight");
      });
    }
  }
}
