import { StateManager } from "./stateManager.js";
import { Storage } from "./storage.js";

export const Colors =
  "#2d2d2d#FDF5DF#5EBEC4#F92C85#ABF62D#D6A3FB#FECD45#2568FB#A0AECD#A350A3#C1436D#000000#6E6E6E#BCFD4C#1A2238#9DAAF2#FF6A3D#F4DB7D#9CF6FB#E1FCFD#394F8A#4A5FC1#E5B9A8#EAD6CD#490B3D#BD1E51#F1B814#00ABE1#161F6D#00A9D8#0D9EDF#259B9A#F7F7F7#7DA2A9#FFFFFF#A7BC5B#8DA242#3FD2C7#99DDFF#00458B#FB8122#1D2228#E1E2E2#D48166#373A36#E6E2DD#051622#1BA098#DEB992#E40C2B#1D1D2C#F7F4E9#3CBCC3#EBA63F#438945#5C6E58#8AA899#F2D349#181818#2CCCC3#FACD3D#5626C4#E60576#FDD935#E1F2F7#EF0D50#EB3A70#E5BACE#56642A#849531#92A332#FAF0DC#0B4141#FF6864#150734#0F2557#28559A#3778C2#4B9FE1#63BCE5#7ED5EA#5DAA68#3F6844#FAF1CF#EE7879#2A3166#F4ABAA#9E15BF#4AC6D2#44449B";

const sto = new Storage();

export class BackgroundEngine extends StateManager {
  #elementTarget = null;
  #elementImageTarget = null;
  #colorData = null;
  #boxSize = 0;
  #worker = null;
  #component = null;
  #bgSize = 100;
  constructor() {
    super();
  }
  setElementTarget(target) {
    this.#elementTarget = target;
  }
  setColorData(data) {
    this.#colorData = data;
  }
  setImageTarget(target) {
    this.#elementImageTarget = target;
  }
  setColorBoxWidth(size) {
    this.#boxSize = size;
  }
  worker(worker) {
    this.#worker = worker;
  }
  render() {
    let warper = document.createElement("div");
    let layerStyleBtn = [
      "btn-btn",
      "btn-secoundary",
      "d-flex",
      "j-left",
      "fs-12",
      "text-white",
      "br-5",
      "m-top-4",
    ];
    let colorDataArr = this.#colorData.split("#").reduce((p, c) => {
      let hashColor = "#" + c;
      p.push(hashColor);
      return p;
    }, []);
    colorDataArr.shift();

    let colorContainer = document.createElement("div");
    let colorBtn = document.createElement("div");
    colorContainer.classList.add("h-100", "d-flex", "flex-warp", "overflow-y");
    colorBtn.classList.add(...layerStyleBtn);
    colorBtn.textContent = "Color Pallette";
    colorBtn.onclick = () => {
      colorContainer.classList.toggle("d-none");
    };
    for (let i in colorDataArr) {
      let div = document.createElement("div");

      let style = {
        width: this.#boxSize + "px",
        height: this.#boxSize + "px",
        backgroundColor: colorDataArr[i],
      };
      if (i == 0) {
        style.display = "grid";
        style.placeItems = "center";
        style.color = "white";
        style.fontSize = "10px";
        let icon = document.createElement("div");
        icon.classList.add(...["bi", "bi-app"]);
        div.appendChild(icon);
      }
      Object.assign(div.style, style);
      div.onclick = () => {
        sto.storage("canvasbackground",colorDataArr[i]);
        this.#worker(colorDataArr[i]);
      };
      colorContainer.appendChild(div);
    }
    colorContainer.classList.add("d-none");

    let imageInput = document.createElement("input");
    let imageInputBtn = document.createElement("button");
    const imageScaler = document.createElement("div");
    const scalerInput = document.createElement("input");
    const scaler1 = document.createElement("div");
    const scaler2 = document.createElement("div");
    const scalarLabel = document.createElement("div");

    imageInput.type = "file";
    imageInput.classList.add("d-none");
    imageInputBtn.classList.add(...layerStyleBtn);
    imageInputBtn.textContent = "Upload Image";
    imageScaler.textContent = "Scale";

    imageInputBtn.onclick = () => {
      if (imageInputBtn.textContent === "Upload Image") {
        imageInput.click();
      } else {
        this.#elementImageTarget.style.backgroundImage = "";
        imageInput.value = null;
        imageScaler.classList.toggle("d-none");
        imageInputBtn.textContent = "Upload Image";
      }
    };
    let imageContainer = this.#elementImageTarget;

    imageInput.addEventListener("change", function (ev) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const uploaded_image = reader.result;
        imageContainer.style.backgroundImage = `url(${uploaded_image})`;
        imageScaler.classList.toggle("d-none");
        imageInputBtn.textContent = "Cancel";
      });
      reader.readAsDataURL(this.files[0]);
    });
    scaler1.onclick = () => {
      this.#bgSize = 100;
      this.changeBgSize(this.#bgSize);
      scalerInput.value = this.#bgSize;
    };
    scaler2.onclick = () => {
      this.#bgSize = 150;
      this.changeBgSize(this.#bgSize);
      scalerInput.value = this.#bgSize;
    };
    scalerInput.onkeyup = (ev) => {
      if(ev.code == "Enter"){
        this.#bgSize = Number(scalerInput.value);
        this.changeBgSize(this.#bgSize);
      }
    };
    imageScaler.appendChild(scalarLabel);
    imageScaler.appendChild(scalerInput);
    imageScaler.appendChild(scaler1);
    imageScaler.appendChild(scaler2);
    imageScaler.classList.add("btn-btn", "py-7");
    scalerInput.classList.add(
      "btn-btn",
      "btn-white",
      "bg-white",
      "br-5",
      "mx-4",
      "text-dark"
    );
    scaler1.classList.add("btn-btn", "btn-secoundary", "br-5", "mx-4");
    scaler2.classList.add("btn-btn", "btn-secoundary", "br-5", "mx-4");
    scaler1.textContent = "1x";
    scaler2.textContent = "1.5x";
    imageScaler.classList.add("d-none");
    warper.appendChild(colorBtn);
    warper.appendChild(colorContainer);
    warper.appendChild(imageInput);
    warper.appendChild(imageScaler);
    warper.appendChild(imageInputBtn);
    this.#elementTarget.appendChild(warper);
    this.#component = warper;
    this.changeBgSize(this.#bgSize);
    scalerInput.value = this.#bgSize;
  }
  changeBgSize(size) {
    this.#elementImageTarget.style.backgroundSize = this.#bgSize + "%";
  }
  hide() {
    this.#component.classList.add("d-none");
  }
  show() {
    this.#component.classList.remove("d-none");
  }
}
