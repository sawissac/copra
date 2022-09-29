import { Component } from "./component/component.js";

const MainContainer = am.component({
  el: "background-engine-container-div",
  class: ["br-5"],
  children: [
    am.component({
      el: "background-label-div",
      text: "Background",
      class: [
        "btn",
        "btn-light",
        "bg-white",
        "d-flex",
        "j-left",
        "fs-12",
        "text-dark",
        "border",
        "rounded-0",
        "border-grey",
        "border-2",
        "border-top-0",
        "border-start-0",
        "border-end-0",
        "shadow-sm"
      ],
    }),
    am.component({
      el: "warper-div",
      class: ["d-none"],
      children: [
        am.component({
          el: "background-container-div",
          class: [
            "h-100",
            "d-flex",
            "flex-wrap",
            "overflow-y",
            "my-2",
            "justify-content-center",
          ],
        }),
        am.component({
          el: "file-input-none-input",
          class: ["d-none"],
          build: (_) => {
            _.type = "file";
            _.src = "";
          },
        }),
        am.component({
          el: "image-upload-btn-div",
          text: "Upload Image",
          class: ["btn", "btn-primary","btn-sm","d-block","fs-12"],
        }),
      ],
    }),
  ],
});
const imageUploadBtn = MainContainer.inner.warper.inner.imageUploadBtn.target;
const fileInput = MainContainer.inner.warper.inner.fileInputNone.target;
const backgroundLabelBtn = MainContainer.inner.backgroundLabel.target;
const mainContainerWraper = MainContainer.inner.warper.target;
const backgroundContainer =
  MainContainer.inner.warper.inner.backgroundContainer.target;
export class BackgroundEngine extends Component {
  constructor() {
    super();
  }
  build() {
    let backgroundLabelToggler = true;

    backgroundLabelBtn.onclick = () => {
      if (backgroundLabelToggler === true) {
        mainContainerWraper.classList.remove("d-none");
        backgroundLabelToggler = false;
      } else {
        mainContainerWraper.classList.add("d-none");
        backgroundLabelToggler = true;
      }
    };
    am.element.htmlImage.modify((_) => {
      _.style.backgroundColor = stoV2.getCanvasBackground();
      getCopraImageData().then((imageData) => {
        if (imageData.length > 0) {
          _.style.backgroundImage = `url(${imageData})`;
          imageUploadBtn.textContent = "Cancel";
        }
      });
    });
    imageUploadBtn.onclick = () => {
      if (imageUploadBtn.textContent !== "Cancel") {
        fileInput.click();
      } else {
        fileInput.value = "";
        am.element.htmlImage.modify((_) => {
          _.style.backgroundImage = null;
        });
        imageUploadBtn.textContent = "Upload Image";
        updateCopraImageData("");
      }

      fileInput.addEventListener("change", function (ev) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const uploaded_image = reader.result;
          am.element.htmlImage.modify((_) => {
            _.style.backgroundImage = `url(${uploaded_image})`;
            updateCopraImageData(uploaded_image);
          });
          imageUploadBtn.textContent = "Cancel";
        });
        reader.readAsDataURL(this.files[0]);
      });
    };

    let boxSize = 272.02 / 8 - 10;
    for (let i in colorDataArr) {
      let div = document.createElement("div");
      let style = {
        width: boxSize + "px",
        height: boxSize + "px",
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
        stoV2.val(colorDataArr[i]).storeToCanvasBackground();
        am.element.htmlImage.modify((_) => {
          _.style.backgroundColor = colorDataArr[i];
          this.getWorker();
        });
      };
      backgroundContainer.appendChild(div);
    }

    this.getHost()._layer_.appendChild(MainContainer.target);
  }
  imageUploaded() {
    imageUploadBtn.textContent = "Cancel";
  }
}
