import { StateManager } from "./stateManager.js";
import { Storage } from "./storage.js";

const sto = new Storage();

export class PageListRender extends StateManager {
  #addBtn = null;
  #delBtn = null;
  #layerEle = null;
  #worker = null;
  constructor() {
    super();
  }
  setLayer(layer) {
    this.#layerEle = layer;
  }
  setController(add, del) {
    this.#addBtn = add;
    this.#delBtn = del;
  }
  createPage() {
    this.state.push({
      canvas: {
        layerName: "New Canvas",
        isHighlight: false,
        data: [],
      },
    });
  }
  deletePage() {
    if(this.state.length === 1){
      this.setState([]);
    }else{
      this.setState(this.state.filter((i) => i.canvas.isHighlight !== true));
    }
  }
  worker(callback) {
    this.#worker = callback;
  }
  renderLayer() {
    this.getStorageState();
    this.#layerEle.innerHTML = "";

    for (let i of this.state) {
      let layerList = document.createElement("div");
      layerList.textContent = i.canvas.layerName;
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
      if (i.canvas.isHighlight) {
        layerList.classList.add("highlight");
      }
      layerList.onclick = () => {
        this.toggleState(i.canvas.id, "isHighlight");
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
    this.#addBtn.onclick = (ev) => {
      this.createPage();
      this.storageUpdate();
      this.reRenderLayer();
    };
    this.#delBtn.onclick = (ev) => {
      this.deletePage();
      this.storageUpdate();
      this.reRenderLayer();
      this.#worker();
    };
  }
  toggleState(id, key) {
    const res = this.state.reduce((p, c) => {
      if (c.canvas.id === id) {
        c.canvas[key] = true;
        p.push(c);
      } else {
        c.canvas[key] = false;
        p.push(c);
      }
      return p;
    }, []);
    this.setState(res);
  }
  getStorageState(){
    sto.getStorage("pageData");
    this.setState(sto.state);
  }
  storageUpdate(){
    sto.storage("pageData", this.state);
  }
}
