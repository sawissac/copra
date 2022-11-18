import { createCopraDB, deleteCopraDB } from "./src/localDatabase/db.js";
import { Dropdown } from "./node_modules/bootstrap/dist/js/bootstrap.esm.js";
import { stoV2 } from "./src/state/storage.js";
import { CustomAlert } from "./src/alert.js";
import { cps } from "./src/state/copra.state.global.js";
import { elementID } from "./packages/automa/src/automa.js";
import { redirect } from "./src/urlpath.js";

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

const canvasNameInput = elementID("canvasNameInput");
const templateCheck = elementID("checkboxTemplate");
const editRecentBtn = elementID("editrecent");
const createBtn = elementID("createFile");

editRecentBtn.onclick = () => {
  editRecent();
};

createBtn.onclick = () => {
  goToEditorCreateNew();
};

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

function goToEditorCreateNew() {
  let inputValue = canvasNameInput.value;
  let pass = 0;
  if (inputValue.length > 0) {
    pass++;
    stoV2.val(inputValue).storeToProjectName();
  }
  if (pass >= 1) {
    if (templateCheck.checked) {
      createCopraDB();
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
      createCopraDB();
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
