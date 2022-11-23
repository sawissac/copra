import { createElement } from "../packages/automa/src/automa.js";
import { pick } from "./app.build.init.js";
import { Component } from "./component/component.js";
import { saveData } from "./io/io.js";
import { stoV2 } from "./state/storage.js";

export class MenuHeader extends Component {
  constructor() {
    super();
    this.build();
  }
  build() {
    pick("headerSaveBtn").modify((el) => {
      el.onclick = () => {
        saveData();
      };
    });

    pick("headerLogo").text("CoPra").attr("type", "button");
    pick("headerFile").text("file demo length length");
    pick("headerSaveBtn").text("save");
    pick("headerVersion").text("1.5.0v");

    const headerFileParent = pick("headerFileWarper");

    const headerFileInput = (value) => {
      return createElement({
        el: "header-file-input",
        class: [
          "bg-dark",
          "fs-12",
          "text-center",
          "text-light",
          "outline-none",
          "fw-bold",
        ],
        build: (el, mod) => {
          mod.attr("type", "text");
          el.value = value;

          const changeBackToHtml = () => {
            let inputValue = el.value;
            pick("headerFile").text(inputValue);
            headerFileParent._children();
            headerFileParent.children([pick("headerFile")]);
            stoV2.val(inputValue).storeToProjectName();
          };

          el.onkeydown = (ev) => {
            if (ev.code === "Enter") {
              changeBackToHtml();
            }
          };
          el.onclick = (ev) => {
            ev.target.select();
            ev.target.focus();
          };

          el.onblur = () => {
            changeBackToHtml();
          };
        },
      });
    };

    pick("headerFile").modify((el, mod) => {
      mod.text(stoV2.getProjectName());

      el.addEventListener("dblclick", () => {
        const hfi = headerFileInput(stoV2.getProjectName());

        headerFileParent._children();
        headerFileParent.children([hfi]);

        setTimeout(() => {
          hfi.target.select();
          hfi.target.focus();
        }, 100);
      });
    });
  }
}
