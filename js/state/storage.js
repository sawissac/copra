class CopraStorage {
  constructor() {
    this.value = "";
  }
  val(value) {
    this.value = value;
    return this;
  }
  storeToPageData() {
    localStorage.setItem("pageData", JSON.stringify(this.value));
    return this;
  }
  storeToImageData() {
    localStorage.setItem("imageData", JSON.stringify(this.value));
    return this;
  }
  storeToCanvasBackground(){
    localStorage.setItem("canvasBackground", JSON.stringify(this.value));
    return this;
  }
  storeToCanvasAspect(){
    localStorage.setItem("canvasAspect", JSON.stringify(this.value));
    return this;
  }
  storeToProjectName(){
    localStorage.setItem("projectName", JSON.stringify(this.value));
  }
  storeToCanvasMode(){
    localStorage.setItem("canvasMode", JSON.stringify(this.value));
    return this;
  }
  getProjectName(){
    return JSON.parse(localStorage.getItem("projectName"));
  }
  getCanvasMode(){
    return JSON.parse(localStorage.getItem("canvasMode"));
  }
  getCanvasAspect(){
    return JSON.parse(localStorage.getItem("canvasAspect"));
  }
  getPageData() {
    return JSON.parse(localStorage.getItem("pageData"));
  }
  getImageData() {
    return JSON.parse(localStorage.getItem("imageData"));
  }
  getCanvasBackground(){
    return JSON.parse(localStorage.getItem("canvasBackground")); 
  }

  status() {
    var data = "";
    console.log("Current local storage: ");
    for (var key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        data += window.localStorage[key];
        console.log(
          key +
            " = " +
            ((window.localStorage[key].length * 16) / (8 * 1024)).toFixed(2) +
            " KB"
        );
      }
    }
    console.log(
      data
        ? "\n" +
            "Total space used: " +
            ((data.length * 16) / (8 * 1024)).toFixed(2) +
            " KB"
        : "Empty (0 KB)"
    );
    console.log(
      data
        ? "Approx. space remaining: " +
            (5120 - ((data.length * 16) / (8 * 1024)).toFixed(2)) +
            " KB"
        : "5 MB"
    );
  }
}

const stoV2 = new CopraStorage();
