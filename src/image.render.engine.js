import { Component } from "./component/component.js";
import { createElement } from "../packages/automa/src/automa.js";
import { cps } from "./state/copra.state.global.js";
import { stoV2 } from "./state/storage.js";
import {
  renderCanvasImage,
  renderPngImage,
} from "../packages/htmlToImage/index.js";
import { pick } from "./app.build.init.js";
import { getActiveCanvasLayer } from "./state/canvas.state.api.js";
import { CanvasScaler } from "./canvas.scaler.js";

let buttonStyle = {
  light: [
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
  ],
  primary: [
    "btn",
    "btn-sm",
    "btn-primary",
    "py-1",
    "mx-1",
    "fs-12",
    "d-flex",
    "text-decoration-none",
  ],
};

let createButton = (type, style, text, callback) => {
  return createElement({
    el: type,
    class: style,
    text: text,
    build: (el, mod) => {
      if (callback) {
        mod.action("click", callback);
      }
    },
  });
};

let renderDownloadBtn = createButton(
  "download-image-a",
  buttonStyle.primary,
  "DOWNLOAD"
);

export class ImageRender extends Component {
  constructor() {
    super();
    this.pixelRatio = 2;
    this.imageCanvasScaler = new CanvasScaler("renderInnerCenter");
    this.build();
  }
  build() {
    this.imageCanvasScaler
      .setMinMax(10, 300)
      .setScalePercentMiddle()
      .changeCanvas()
      .listen(() => {
        pick("iconPercentLabel").text(this.imageCanvasScaler.getPercentage());
      })
      .build();

    pick("iconPercentLabel").text(this.imageCanvasScaler.getPercentage());

    let canvasRefresh = () => {
      pick("renderInnerCanvas")._children();
      this.render();
    };

    let closeCanvas = () => {
      this.hide();
      stoV2.val("htmlmode").storeToCanvasMode();
    };

    let scaleButtonList = [
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

    scaleButtonList.map((i) => {
      pick("renderController").children([
        createButton("scale-btn-div", buttonStyle.light, i.type, () => {
          i.fun();
        }),
      ]);
    });

    let closeBtn = createButton(
      "image-close-div",
      buttonStyle.light,
      "Close",
      () => {
        closeCanvas();
      }
    );

    pick("renderController").children([renderDownloadBtn, closeBtn]);
  }
  show() {
    pick("renderCanvas").target.classList.remove("d-none");
  }
  hide() {
    pick("renderCanvas").class(["d-none"]);
  }
  render() {
    pick("renderInnerCanvas")._children();
    renderCanvasImage(
      pick("htmlInnerCanvas"),
      this.pixelRatio,
      function (canvas) {
        pick("renderInnerCanvas").target.appendChild(canvas);
      }
    );
    renderPngImage(
      pick("htmlInnerCanvas"),
      this.pixelRatio,
      function (dataUrl) {
        renderDownloadBtn.target.href = dataUrl;
        renderDownloadBtn.target.download = getActiveCanvasLayer(
          cps.getPageLayerData()
        ).layerName;
      }
    );
  }
  scaleBackToNormal() {
    this.imageCanvasScaler.canvasReset();
    pick("iconPercentLabel").text(this.imageCanvasScaler.getPercentage());
  }
  enableMoveX() {
    this.imageCanvasScaler.horizontalMoveOn();
  }
  disableMoveX() {
    this.imageCanvasScaler.horizontalMoveOff();
  }
  enableMoveY() {
    this.imageCanvasScaler.verticalMoveOn();
  }
  disableMoveY() {
    this.imageCanvasScaler.verticalMoveOff();
  }
  disableMove() {
    this.disableMoveX();
    this.disableMoveY();
  }
  scaleCanvasTo(value) {
    this.imageCanvasScaler.scaleTo(value);
    pick("iconPercentLabel").text(this.imageCanvasScaler.getPercentage());
  }
}
