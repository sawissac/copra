import { Component } from "./component/component.js";

const layerStyleBtn = [
  "btn-btn",
  "btn-secoundary",
  "d-flex",
  "j-left",
  "fs-12",
  "text-white",
  "br-5",
];

const MainContainer = er.component({
  element: "background-engine-container-div",
  class: ["m-top-4", "br-5"],
  children: [
    er.component({
      element: "background-label-div",
      text: "Background",
      class: [...layerStyleBtn],
    }),
    er.component({
      element: "warper-div",
      class: ["d-none"],
      children: [
        er.component({
          element: "background-container-div",
          class: [
            "h-100",
            "d-flex",
            "flex-warp",
            "overflow-y",
            "my-4",
            "j-center",
          ],
        }),
        er.component({
          element: "file-input-none-input",
          class: [...layerStyleBtn, "d-none"],
          build: (_) => {
            _.type = "file";
            _.src = "";
          },
        }),
        er.component({
          element: "image-upload-btn-div",
          text: "Upload Image",
          class: [...layerStyleBtn, "my-4", "j-center"],
        }),
      ],
    }),
  ],
});

export class BackgroundEngine extends Component {
  constructor() {
    super();
  }
  build() {
    const imageUploadBtn =
      MainContainer.inner.warper.inner.imageUploadBtn.target;
    const fileInput = MainContainer.inner.warper.inner.fileInputNone.target;
    const backgroundLabelBtn = MainContainer.inner.backgroundLabel.target;
    const mainContainerWraper = MainContainer.inner.warper.target;
    const backgroundContainer =
      MainContainer.inner.warper.inner.backgroundContainer.target;

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
    er.element.htmlImage.set((_) => {
      _.style.backgroundColor = stoV2.getCanvasBackground();
      const imageData = stoV2.getImageData();
      if (imageData.length > 0) {
        _.style.backgroundImage = `url(${imageData})`;
        imageUploadBtn.textContent = "Cancel";
      }
    });
    imageUploadBtn.onclick = () => {
      if (imageUploadBtn.textContent !== "Cancel") {
        fileInput.click();
      } else {
        fileInput.value = "";
        er.element.htmlImage.set((_) => {
          _.style.backgroundImage = null;
        });
        imageUploadBtn.textContent = "Upload Image";
        stoV2.val("").storeToImageData();
      }

      fileInput.addEventListener("change", function (ev) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const uploaded_image = reader.result;
          er.element.htmlImage.set((_) => {
            _.style.backgroundImage = `url(${uploaded_image})`;
            stoV2.val(uploaded_image).storeToImageData();
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
        er.element.htmlImage.set((_) => {
          _.style.backgroundColor = colorDataArr[i];
          this.getWorker();
        });
      };
      backgroundContainer.appendChild(div);
    }

    this.getHost()._layer_.appendChild(MainContainer.target);
  }
}
