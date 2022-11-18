import { Component } from "./component/component.js";
import { createElement } from "../packages/automa/src/automa.js";
import { addIcon } from "./app.build.init.js";
import { stoV2 } from "./state/storage.js";
import { getCopraPageData,getCopraImageData } from "./localDatabase/db.js";

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

let testCanvas = createElement({
  el: "test-canvas-div",
  build: (_) => {
    const boxArea = "300px";
    Object.assign(_.style, {
      width: boxArea,
      height: boxArea,
    });
  },
});
let testCanvasCon = createElement({
  el: "test-canvas-con-div",
  children: [testCanvas],
  build: (_) => {
    Object.assign(_.style, {
      width: "max-content",
      margin: "0 auto",
      marginTop: "30px",
    });
  },
});
let title = createElement({
  el: "title-div",
  text: "rendering...",
  class: ["text-center", "mt-30", "w-300"],
  build: (_) => {
    Object.assign(_.style, {
      margin: "0 auto",
      marginTop: "30px",
    });
  },
});
export class ImageRenderAll extends Component {
  constructor() {
    super();
    this.pixelRatio = 2;
    this.engine = null;
  }
  build() {
    let closeCanvas = () => {
      this.getHost()._scene_.classList.add("d-none");
      stoV2.val("htmlmode").storeToCanvasMode();
    };
    let closeBtn = createElement({
      el: "image-close-div",
      class: scaleBtnStyle,
      text: "Close",
      build: (_) => {
        _.onclick = closeCanvas;
      },
    });
    let scaleBtns = [
      {
        type: "0.5x",
        fun: () => {
          this.pixelRatio = 0.5;
          this.render();
        },
      },
      {
        type: "2x",
        fun: () => {
          this.pixelRatio = 2;
          this.render();
        },
      },
      {
        type: "4x",
        fun: () => {
          this.pixelRatio = 4;
          this.render();
        },
      },
      {
        type: "9x",
        fun: () => {
          this.pixelRatio = 9;
          this.render();
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
    this.getHost()._controller_.appendChild(closeBtn.target);
  }
  render() {
    this.getHost()._list_.innerHTML = "";
    this.getHost()._list_.appendChild(title.target);
    title.target.textContent = "Rendering...";
    this.getHost()._list_.appendChild(testCanvasCon.target);
    testCanvasCon.target.style.display = "block";
    testCanvas.target.classList.add(stoV2.getCanvasAspect().replace(":", "-"));
    getCopraImageData().then((data) => {
      if (data !== "") {
        testCanvas.target.style.backgroundImage = `url(${data})`;
        Object.assign(testCanvas.target.style, {
          backgroundImage: `url(${data})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        });
      } else {
        testCanvas.target.style.backgroundColor = stoV2.getCanvasBackground();
      }
    });
    getCopraPageData().then((data) => {
      data.map(async (i, index) => {
        this.getHost()._list_.appendChild(
          await this.demoImage(i.canvas, index, data.length - 1)
        );
      });
    });
  }
  setEngine(engine) {
    this.engine = engine;
  }
  buildCanvas(state) {
    testCanvas.target.innerHTML = "";
    state.map((i) => {
      let LayerEl = null;
      if (i.component.type === "Empty") {
        LayerEl = createElement({
          el: "com-empty-div",
          text: i.component.text.length > 0 ? i.component.text : "",
          class: ["hover-disable"],
          build: (_) => {
            _.style.color = i.component.textColor;
            _.style.height = i.component.height + "px";
          },
        });
      }
      if (i.component.type === "Header") {
        LayerEl = createElement({
          el: "canvas-header-div",
          class: ["com-header", "hover-disable"],
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
          el: "com-line-div",
          class: ["hover-disable"],
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
          el: "com-footer-div",
          class: ["hover-disable"],
          children: [
            createElement({
              el: "footer-inner-div",
              class: ["inner"],
            }),
          ],
        });
      }
      testCanvas.target.appendChild(LayerEl.target);
    });
  }
  demoImage(canvas, index, max) {
    return this.sleep(1000 * (index !== 0 ? index + 1 : 1)).then(async (v) => {
      this.buildCanvas(canvas.data);
      const demoImage = createElement({
        el: "demo-image-div",
        build: (_) => {
          Object.assign(_.style, {
            margin: "0 auto",
            marginTop: "30px",
            width: "max-content",
            display: "flex",
            flexDirection: "column",
          });
        },
      });
      await this.engine
        .toPng(testCanvas.target, {
          pixelRatio: this.pixelRatio,
        })
        .then((dataUrl) => {
          let imageDownlaodBtn = createElement({
            el: "download-a",
            class: ["text-dark", "text-decoration-none", "d-flex"],
            build: (_) => {
              _.href = dataUrl;
              _.download = canvas.layerName;
              addIcon({
                target: _,
                iconstart: ["bi", "bi-download"],
                text: canvas.layerName,
              });
            },
          });
          demoImage.target.appendChild(imageDownlaodBtn.target);
        });
      await this.engine
        .toCanvas(testCanvas.target, {
          pixelRatio: 1.3,
        })
        .then((canvas) => {
          demoImage.target.appendChild(canvas);
          if (index === max) {
            title.target.textContent =
              "Note: This is a preview of your canvas, not the final image. The final image is render in " +
              this.pixelRatio +
              "x";
            testCanvasCon.target.style.display = "none";
          }
        });
      return demoImage.target;
    });
  }
  show() {
    this.getHost()._scene_.classList.remove("d-none");
  }
  sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
}
