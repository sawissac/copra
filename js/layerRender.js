import { StateManager } from "./stateManager.js";
import { Storage } from "./storage.js";

const sto = new Storage();

export class LayerRander extends StateManager {
  #canvasBtn = null;
  #canvasText = null;
  #addBtn = null;
  #editBtn = null;
  #delBtn = null;
  #moveBtn = null;
  #layerEle = null;
  #worker = null;
  #htmlTitle = null;
  #isCanvasOn = false;
  constructor() {
    super();
  }
  setHtmlTitle(ele) {
    this.#htmlTitle = ele;
  }
  setCanvasText(ele) {
    this.#canvasText = ele;
  }
  getCanvasText() {
    return this.#canvasText;
  }
  setCanvasBtn(canvsBtn) {
    this.#canvasBtn = canvsBtn;
  }
  setLayer(layer) {
    this.#layerEle = layer;
  }
  worker(callback) {
    this.#worker = callback;
  }
  setController(move, add, edit, del) {
    this.#addBtn = add;
    this.#editBtn = edit;
    this.#delBtn = del;
    this.#moveBtn = move;
  }
  createLayer() {
    this.state.push({
      layerName: "Element",
      isHighlight: false,
      isEdit: false,
      isMove: false,
      component: {type:"none", text:'', height: 0},
    });
  }
  delteLayer() {
    this.getStorageState();
    this.setState(this.state.filter((i) => i.isHighlight !== true));
  }
  moveLayer() {
    this.getStorageState();
    this.#layerEle.innerHTML = "";
    this.state.map((i) => {
      let layerList = document.createElement("div");

      if (!i.isHighlight) {
        layerList.classList.add(
          "btn-btn",
          "d-flex",
          "flex-column",
          "j-center",
          "fs-12",
          "text-white",
          "bg-secoundary",
          "br-5",
          "my-4",
          "p-0"
        );
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const p = document.createElement("div");

        div1.setAttribute(
          "class",
          "bi bi-chevron-compact-up btn-secoundary btn-btn"
        );
        div2.setAttribute(
          "class",
          "bi bi-chevron-compact-down btn-secoundary btn-btn"
        );

        div1.onclick = () => {
          const filteredData = this.state.filter((i) => i.isHighlight === true);
          this.setState(
            this.state.reduce((p, c) => {
              if (c.id === i.id) {
                p.push(...filteredData);
              }
              if (!c.isHighlight) {
                p.push(c);
              }
              return p;
            }, [])
          );
          this.storageUpdate();
          this.reRenderLayer();
          this.#worker();
        };
        div2.onclick = () => {
          const filteredData = this.state.filter((i) => i.isHighlight === true);
          this.setState(
            this.state.reduce((p, c) => {
              if (!c.isHighlight) {
                p.push(c);
              }
              if (c.id === i.id) {
                p.push(...filteredData);
              }
              return p;
            }, [])
          );
          this.storageUpdate();
          this.reRenderLayer();
          this.#worker();
        };
        p.textContent = i.layerName;

        layerList.appendChild(div1);
        layerList.appendChild(p);
        layerList.appendChild(div2);
        this.#layerEle.appendChild(layerList);
      } else {
        layerList.classList.add(
          "btn-btn",
          "d-flex",
          "j-center",
          "fs-12",
          "text-white",
          "btn-secoundary",
          "br-5",
          "my-4",
          "highlight"
        );
        layerList.textContent = i.layerName;
        this.#layerEle.appendChild(layerList);
      }
    });
  }
  editLayer() {
    this.getStorageState();
    this.#layerEle.innerHTML = "";
    this.state.map((i) => {
      let layerList = document.createElement("div");

      if (i.isHighlight) {
        layerList.classList.add(
          "btn-btn",
          "d-flex",
          "j-center",
          "fs-12",
          "text-white",
          "bg-secoundary",
          "br-5",
          "my-4",
          "highlight"
        );
        const input = document.createElement("input");
        input.type = "text";
        input.autocomplete = "off";
        input.value = i.layerName;
        input.onclick = () => {
          input.focus();
          input.select();
        };
        input.onkeydown = (ev) => {
          if (ev.code === "Enter") {
            this.toggleState(i.id, "layerName", input.value);
            this.storageUpdate();
            this.reRenderLayer();
            this.#worker();
          }
        };
        layerList.appendChild(input);
        this.#layerEle.appendChild(layerList);
      } else {
        layerList.classList.add(
          "btn-btn",
          "d-flex",
          "j-center",
          "fs-12",
          "text-white",
          "bg-secoundary",
          "br-5",
          "my-4"
        );
        layerList.textContent = i.layerName;
        this.#layerEle.appendChild(layerList);
      }
    });
  }
  renderLayer() {
    this.getStorageState();
    this.#layerEle.innerHTML = "";
    let getCanvas = sto.state.filter((i) => i.canvas.isHighlight === true)[0]
      .canvas.layerName;
    this.#canvasText.textContent = getCanvas;
    this.#htmlTitle.textContent = getCanvas;

    for (let i of this.state) {
      let layerList = document.createElement("div");
      layerList.textContent = i.layerName;
      layerList.classList.add(
        "btn-btn",
        "d-flex",
        "j-center",
        "fs-12",
        "text-white",
        "btn-secoundary",
        "br-5",
        "my-4"
      );
      let checkCanvasHighlight = this.#canvasBtn.classList;
      checkCanvasHighlight = [...checkCanvasHighlight].includes("highlight");
      if (checkCanvasHighlight && sto.getStorageValue("type") === "layer") {
        this.#canvasBtn.classList.remove("highlight");
        this.#isCanvasOn = false;
      }
      if (i.isHighlight) {
        layerList.classList.add("highlight");
      }
      layerList.onclick = () => {
        sto.storage("type", "layer");
        if (this.#isCanvasOn) {
          this.#canvasBtn.classList.remove("highlight");
          this.#isCanvasOn = false;
        }
        this.toggleState(i.id, "isHighlight");
        this.storageUpdate();
        this.reRenderLayer();
        this.#worker();
      };
      this.#layerEle.appendChild(layerList);
    }
  }
  reRenderLayer() {
    this.renderLayer();
  }
  run() {
    this.#addBtn.onclick = () => {
      if (sto.state.length !== 0) {
        this.createLayer();
        this.storageUpdate();
        this.reRenderLayer();
        this.#worker();
      }
    };
    this.#delBtn.onclick = () => {
      if (sto.state.length !== 0 && !this.#isCanvasOn) {
        this.delteLayer();
        this.storageUpdate();
        this.reRenderLayer();
        this.#worker();
      }
    };
    this.#moveBtn.onclick = () => {
      if (sto.state.length !== 0 && !this.#isCanvasOn) {
        this.moveLayer();
      }
    };
    this.#editBtn.onclick = () => {
      if (sto.state.length !== 0 && !this.#isCanvasOn) {
        this.editLayer();
      }
      if (this.#isCanvasOn) {
        this.editCanvasBtn();
      }
    };
    this.#canvasBtn.onclick = () => {
      this.#isCanvasOn = true;
      sto.storage("type", "canvas");
      this.#canvasBtn.classList.add("highlight");
      this.stateRefresh("isHighlight");
      this.storageUpdate();
      this.reRenderLayer();
      this.#worker();
    };
  }
  editCanvasBtn() {
    const layerList = document.createElement("div");
    const icon = document.createElement("i");
    const input = document.createElement("input");
    icon.classList.add("bi", "bi-bounding-box-circles");
    layerList.classList.add(
      "btn-btn",
      "d-flex",
      "j-left",
      "fs-12",
      "text-white",
      "bg-secoundary",
      "br-5",
      "my-4",
      "highlight"
    );
    input.classList.add("text-left", "mx-4");
    input.type = "text";
    input.autocomplete = "off";

    let canvasName = sto.state.filter((i) => i.canvas.isHighlight === true);
    input.value = canvasName[0].canvas.layerName;
    input.onclick = () => {
      input.focus();
      input.select();
    };
    input.onkeydown = (ev) => {
      if (ev.code === "Enter") {
        sto.storage(
          "pageData",
          sto.state.reduce((p, c) => {
            if (c.canvas.isHighlight) {
              c.canvas.layerName = input.value;
              p.push(c);
            } else {
              p.push(c);
            }
            return p;
          }, [])
        );
        layerList.parentNode.replaceChild(this.#canvasBtn, layerList);
        this.#canvasText.textContent = input.value;
        this.#canvasBtn.classList.remove("highlight");
        this.storageUpdate();
        this.reRenderLayer();
        this.#worker();
      }
    };
    layerList.appendChild(icon);
    layerList.appendChild(input);
    this.#canvasBtn.parentNode.replaceChild(layerList, this.#canvasBtn);
    this.#isCanvasOn = false;
  }
  getStorageState() {
    sto.getStorage("pageData");
    let canvasData = sto.state.filter((i) => i.canvas.isHighlight === true);
    if (canvasData.length !== 0) {
      this.setState(
        canvasData[0].canvas.data.reduce((p, c) => {
          c.id = Symbol();
          p.push(c);
          return p;
        }, [])
      );
    } else {
      this.setState([]);
    }
  }
  storageUpdate() {
    sto.getStorage("pageData");
    let updatedData = sto.state.reduce((p, c) => {
      if (c.canvas.isHighlight) {
        c.canvas.data = this.state;
        p.push(c);
      } else {
        p.push(c);
      }
      return p;
    }, []);
    sto.storage("pageData", updatedData);
  }
}
