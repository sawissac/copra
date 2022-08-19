import { ElementListRender } from "./elementListRender.js";
import { StateManager } from "./stateManager.js";
import { Storage } from "./storage.js";

const er = new ElementListRender();
const sto = new Storage();

const optionList = ["Empty","Header","Line","Footer"];
const componentOptionsBox = er.component({
  element: "component-build-warper-div",
  style: ["my-4", "px-7", "h-100", "overflow-y"],
});
const componentSelectBox = er.component({
  element: "builder-label-div",
  style: ["btn-btn", "btn-secoundary", "br-5", "j-left"],
  build: (_) => {
    er.icon(
      _,
      ["bi", "bi-aspect-ratio-fill"],
      true,
      "Choose component",
      true,
      true
    );
    componentOptionsBox.target.classList.add("d-none");
    _.onclick = () => {
      componentOptionsBox.target.classList.toggle("d-none");
    };
  },
});
const statusBox = er.component({
  element: "status-box-div",
  style: ["my-4", "px-7"],
  children: [
    er.component({
      element: "status-Type-div",
      style: ["d-flex", "my-4", "px-7", "text-white", "ts-12"],
      text: "T : none",
    }),
    er.component({
      element: "status-Height-div",
      style: ["d-flex", "my-4", "px-7", "text-white", "ts-12"],
      text: "H : 50",
    }),
  ],
});
const confirmButton = er.component({
  element: "confirm-btn",
  text: "CONFIRM",
  style: ["btn-btn", "btn-secoundary", "br-5", "m-top-4"],
});
const textOption = er.component({
  element: "textField-div",
  style: ["my-4"],
  children:[
    er.component({
      element: "label-div",
      style:["py-7","text-white"],
      text: "Text Prop"
    }),
    er.component({
      element: "text-input-input",
      style:["py-7","btn-btn","btn-white","bg-white", "text-dark", "br-5"],
      build:_ => {
        _.type = "text";
        _.autocomplete = "off";
      },
    }),
  ]
})
const componentBuildWarper = er.component({
  element: "component-build-warper-div",
  style: ["m-top-4"],
  children: [statusBox, componentSelectBox, componentOptionsBox,textOption,confirmButton],
});

export class ComponentBuilder extends StateManager {
  #optionEle = null;
  #type = {type:null,text:''};
  #worker = null;
  constructor() {
    super();
  }
  worker(callback) {
    this.#worker = callback;
  }
  setElementTarget(ele) {
    this.#optionEle = ele;
  }
  render() {
    optionList.map((i) => {
      const option = er.component({
        element: "component-options",
        style: ["btn-btn", "btn-secoundary", "my-4", "br-5", "j-left"],
        text: i,
      });
      option.target.onclick = () => {
        statusBox.inner.statusType.target.textContent = `T : ${i}`;
        this.#type.type = i;
      };
      componentOptionsBox.target.appendChild(option.target);
    });
    this.#optionEle.appendChild(componentBuildWarper.target);

    confirmButton.target.onclick = () => {
      this.getStorageState();
      this.#type.text = textOption.inner.textInput.target.value;
      this.setState(
        this.state.reduce((p,c)=>{
          if(c.isHighlight === true){
            c.component = this.#type;
            p.push(c)
          }else{
            p.push(c)
          }
          return p;
        },[])
      )
      this.storageUpdate();
      this.#worker();
    };
  }
  show() {
    componentBuildWarper.target.classList.remove("d-none");
  }
  hide() {
    componentBuildWarper.target.classList.add("d-none");
  }
  getStorageState() {
    sto.getStorage("pageData");
    let activeCanvasData = sto.state.filter((i) => i.canvas.isHighlight === true);
    this.setState(
      activeCanvasData[0].canvas.data
    );
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
  updateLayerOption(){
    sto.getStorage("pageData");
    let activeCanvasData = sto.state.filter((i) => i.canvas.isHighlight === true);
    let activeLayerData = activeCanvasData[0].canvas.data.filter((i) => i.isHighlight === true);
    statusBox.inner.statusType.target.textContent = `T : ${activeLayerData[0].component.type}`;
    this.#type.type = activeLayerData[0].component.type;
    this.#type.text = activeLayerData[0].component.text;
    textOption.inner.textInput.target.value = activeLayerData[0].component.text;
    this.setState(activeCanvasData[0].canvas.data);
  }
}
