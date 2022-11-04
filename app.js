import { createCopraDB } from "./src/localDatabase/db.js";
import { Dropdown } from "./node_modules/bootstrap/dist/js/bootstrap.esm.js";
import { stoV2 } from "./src/state/storage.js";
import { CustomAlert } from "./src/alert.js";
import { cps } from "./src/state/state.js";
import { createElement, elementID } from "./packages/automa/src/automa.js";
import { redirect } from "./src/urlpath.js";
import { canvasAspectRatio } from "./src/canvasAspectRatio.js";

createCopraDB();
/**
 * Bootstrap dropdown
 *
 *
 */
const dropdownElementList = [].slice.call(
  document.querySelectorAll(".dropdown-toggle")
);
dropdownElementList.map(function (dropdownToggleEl) {
  return new Dropdown(dropdownToggleEl);
});

/**
 *  Ui component
 *
 *
 *
 */

const aspectLabel = elementID("aspectDropDown");
const aspectList = elementID("aspectList");
const canvasNameInput = elementID("canvasNameInput");
const templateCheck = elementID("checkboxTemplate");
const editRecentBtn = elementID("editrecent");
const resetBtn = elementID("reseteditor");
const createBtn = elementID("createFile");
aspectLabel.onclick = () => {
  aspectList.innerHTML = "";
  canvasAspectRatio.map((i) => {
    const list = createElement({
      el: "list-li",
      class: ["dropdown-item"],
      text: i.name,
      build: (el, mod) => {
        mod.action("click", () => {
          changeLabel(i.name);
        });
      },
    });
    aspectList.appendChild(list.target);
  });
};

templateCheck.onclick = () => {
  aspectLabel.textContent = "aspect-1:1";
};

editRecentBtn.onclick = () => {
  editRecent();
};

resetBtn.onclick = () => {
  resetEditor();
};

createBtn.onclick = () => {
  goToEditorCreateNew();
};

function resetEditor() {
  cps.resetApp();
  CustomAlert({ text: "Editor reseted" });
}
function editRecent() {
  if (stoV2.isExists("projectName")) {
    if (stoV2.getProjectName().length !== 0) {
      CustomAlert({
        text: "Opening recent, Please wait...",
        callback: () => {
          redirect("editor/");
        },
        speed: 20,
        icon: ["bi", "bi-arrow-right-short"],
      });
    } else {
      CustomAlert({ text: "There is no recent edit...!" });
    }
  } else {
    CustomAlert({ text: "There is no recent edit...!" });
  }
}
function changeLabel(val) {
  aspectLabel.textContent = val;
}
function goToEditorCreateNew() {
  let inputValue = canvasNameInput.value;
  let dropdownLabel = aspectLabel.textContent;
  let pass = 0;
  if (dropdownLabel !== "Aspect") {
    pass++;
    stoV2.val(dropdownLabel).storeToCanvasAspect();
  }
  if (inputValue.length > 0) {
    pass++;
    stoV2.val(inputValue).storeToProjectName();
  }
  if (pass >= 2) {
    if (templateCheck.checked) {
      cps.useTemplate().then((res) => {
        CustomAlert({
          text: "App creating, Please wait...",
          callback: () => {
            redirect("editor/");
          },
          speed: 20,
          icon: ["bi", "bi-arrow-right-short"],
        });
      });
    } else {
      cps.updateApp();
      CustomAlert({
        text: "App creating, Please wait...",
        callback: () => {
          redirect("editor/");
        },
        speed: 20,
        icon: ["bi", "bi-arrow-right-short"],
      });
    }
  } else {
    CustomAlert({ text: "Please fill the remaining..." });
  }
}
