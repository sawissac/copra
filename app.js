createCopraDB();

/**
 * Bootstrap dropdown
 *
 *
 */
var dropdownElementList = [].slice.call(
  document.querySelectorAll(".dropdown-toggle")
);
var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl);
});

/**
 *  Ui component
 *
 *
 *
 */
const aspectLabel = document.getElementById("aspectDropDown");
const canvasNameInput = document.getElementById("canvasNameInput");
const templateCheck = document.getElementById("checkboxTemplate");

templateCheck.onclick = function () {
  aspectLabel.textContent = "aspect-1:1";
};
function resetEditor() {
  cps.resetApp();
  CustomAlert({text: "Editor reseted"});
}
function editRecent() {
  if (stoV2.isExists("projectName")) {
    if (stoV2.getProjectName().length !== 0) {
      const path =
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":" +
        window.location.port +
        "/editor/";
        CustomAlert({
          text: "Opening recent, Please wait...",
          callback: () => {
            window.location.href = path;
          },
          speed: 20,
          icon: ["bi","bi-arrow-right-short"]
        });
    } else {
      CustomAlert({text:"There is no recent edit...!"});
    }
  } else {
    CustomAlert({text:"There is no recent edit...!"});
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
    const path =
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":" +
      window.location.port +
      "/editor/";
    if (templateCheck.checked) {
      cps.updateUsingTemplate().then((res) => {
        CustomAlert({
          text: "App creating, Please wait...",
          callback: () => {
            window.location.href = path;
          },
          speed: 20,
          icon: ["bi","bi-arrow-right-short"]
        });
      });
    } else {
      cps.updateApp();
      CustomAlert({
        text: "App creating, Please wait...",
        callback: () => {
          window.location.href = path;
        },
        speed: 20,
        icon: ["bi","bi-arrow-right-short"]
      });
    }
  } else {
    CustomAlert({ text: "Please fill the remaining..." });
  }
}
