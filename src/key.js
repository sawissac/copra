function disableCtrlS() {
  keyDown(function (key) {
    if (key.ctrlKey && key.code === "KeyS") {
      key.preventDefault();
    }
  }, true);
  return this;
}

function disableAllShortCut(){
  keyDown(function(key){
    key.preventDefault();
  },true)
  return this;
}

function disableContext() {
  document.addEventListener(
    "contextmenu",
    (e) => {
      e.preventDefault();
    },
    true
  );
  return this;
}

function disableWheelScaling() {
  document.getElementById("root").addEventListener(
    "wheel",
    function (ev) {
      if (ev.ctrlKey) {
        ev.preventDefault();
      }
    },
    true
  );
  return this;
}

function keyDown(callback) {
  window.addEventListener("keydown", callback, true);
  return this;
}

function keyUp(callback) {
  window.addEventListener("keyup", callback, true);
  return this;
}

export const key = {
  disableContext,
  disableCtrlS,
  disableWheelScaling,
  disableAllShortCut,
  keyDown,
  keyUp,
};
