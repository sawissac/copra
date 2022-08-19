import { ElementListRender } from "./elementListRender.js";
import { Storage } from "./storage.js";

let er = new ElementListRender();
let sto = new Storage();

/**
 * {
            sto.getStorage("pageData");
            let activePage = sto.state.filter(i=>i.canvas.isHighlight === true);
            _.href = "#"
            _.download = activePage[0].canvas.layerName;
          }
 * 
 * 
 * 
 */
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
  style: scaleBtnStyle,
  text: "DOWNLOAD",
  build:(_)=>{
    _.style.textDecoration = "none";
  }
});
export class CanvasScreenRender {
  #htmlElement = null;
  #imageElement = null;
  #engine = null;
  #pixelRatio = 2;
  #controller = null;
  #canvasParent = null;
  #canvasScene = null;
  addController(ctr) {
    this.#controller = ctr;

    let canvasRefresh = () => {
      this.#canvasParent.innerHTML = "";
      this.render();
    };
    let closeCanvas = () =>{
      this.#canvasScene.style.display = "none";
    }
    let ctrInnerControl = er.component({
      element: "ctr-inner-div",
      style: ["d-flex"],
      children: [
        er.component({
          element: "sacle-zpf-div",
          style: scaleBtnStyle,
          text: "0.5x",
          build: (_) => {
            _.onclick = () => {
              this.#pixelRatio = 0.5;
              canvasRefresh();
            };
          },
        }),
        er.component({
          element: "sacle-zpf-div",
          style: scaleBtnStyle,
          text: "2x",
          build: (_) => {
            _.onclick = () => {
              this.#pixelRatio = 2;
              canvasRefresh();
            };
          },
        }),
        er.component({
          element: "sacle-zpf-div",
          style: scaleBtnStyle,
          text: "4x",
          build: (_) => {
            _.onclick = () => {
              this.#pixelRatio = 4;
              canvasRefresh();
            };
          },
        }),
        er.component({
          element: "sacle-zpf-div",
          style: scaleBtnStyle,
          text: "9x",
          build: (_) => {
            _.onclick = () => {
              this.#pixelRatio = 9;
              canvasRefresh();
            };
          },
        }),
        renderDownloadBtn,
        er.component({
          element: "cavas-close-btn-div",
          style: scaleBtnStyle,
          text: "Close",
          build: (_) => {
            _.onclick = () => {
              closeCanvas();
            };
          },
        }),
      ],
    });
    this.#controller.appendChild(ctrInnerControl.target);
  }
  setCanvasParent(ele) {
    this.#canvasParent = ele;
  }
  setCanvasScene(ele){
    this.#canvasScene = ele;
  }
  getRatio() {
    return this.#pixelRatio;
  }
  setHtml_RenderCanvas(htmlCanvasElement, imageCanvasElement) {
    this.#htmlElement = htmlCanvasElement;
    this.#imageElement = imageCanvasElement;
  }
  setRatio(value) {
    this.#pixelRatio = value;
  }

  engine(engine) {
    this.#engine = engine;
  }

  render() {
    this.#engine
      .toCanvas(this.#htmlElement, {
        pixelRatio: this.#pixelRatio,
      })
      .then((canvas) => {
        this.#imageElement.appendChild(canvas);
      });
    sto.getStorage("pageData");
    let activePage = sto.state.filter((i) => i.canvas.isHighlight === true);
    this.#engine
      .toPng(this.#htmlElement, {
        pixelRatio: this.#pixelRatio,
      })
      .then(function (dataUrl) {
        renderDownloadBtn.target.href = dataUrl;
        renderDownloadBtn.target.download = activePage[0].canvas.layerName;
      });
  }
}
