import { ElementListRender } from "./elementListRender.js";
import { StateManager } from "./stateManager.js";
import { Storage } from "./storage.js";

const sto = new Storage();
const er = new ElementListRender();

function getHeaderEle(){
  return er.component({
    element: "header-inner-div",
    style: ["inner"],
    children: [
      er.component({
        element: "option-div",
        style: ["option"],
        children: [
          er.component({
            element: "circle1-div",
            style: ["circle"],
          }),
          er.component({
            element: "circle2-div",
            style: ["circle2"],
          }),
          er.component({
            element: "circle3-div",
            style: ["circle3"],
          }),
        ],
      }),
      er.component({
        element: 'label-div',
        text: "hello",
        style: ['label']
      })
    ],
  });
}
function getTextEle(){
  return 
}

export class htmlRender extends StateManager {
  #worker = null;
  #htmlEle = null;
  #hideHighlight = false;
  constructor() {
    super();
  }
  setHtmlLayer(ele) {
    this.#htmlEle = ele;
  }
  getHtmlLayer() {
    return this.#htmlEle;
  }
  worker(callback) {
    this.#worker = callback;
  }
  renderHtml() {
    this.getStorageState();
    this.#htmlEle.innerHTML = "";
    this.state.map((i) => {
      const div = document.createElement("div");
      if (i.isHighlight && this.#hideHighlight !== true) {
        div.classList.add("com-highlight");
      } 
      if(i.component.type === 'none') {
        div.classList.add("com-none");
        div.textContent = "Element";
      }
      
      if (i.component.type === "Empty") {
        div.classList.add("com-empty");
        if (i.component.text.length != 0) {
          div.textContent = i.component.text;
        }
      }
      if (i.component.type === "Header") {
        div.classList.add("com-header");
        let headerEle = getHeaderEle();
        headerEle.inner.label.target.textContent = i.component.text;
        div.appendChild(headerEle.target);
      }

      if(i.component.type === 'Line'){
        div.classList.add('com-line');
        let lineEle = er.component({
          element: "text-inner-div",
          style: ["inner"],
          text: i.component.text
        });
        div.appendChild(lineEle.target);
      }
      if(i.component.type === 'Footer'){
        div.classList.add('com-footer');
        let footerEle = er.component({
          element: "footer-inner-div",
          style: ["inner"],
        });
        div.appendChild(footerEle.target);
      }
      div.onclick = () => {
        sto.storage("type", "layer");
        this.toggleState(i.id, "isHighlight");
        this.storageUpdate();
        this.reRenderHtml();
        this.#worker();
      };
      this.#htmlEle.appendChild(div);
    });
  }
  reRenderHtml() {
    this.renderHtml();
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
