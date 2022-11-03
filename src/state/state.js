import { DefaultState, TemplateState } from "../defaultBuild.js";
import { stoV2 } from "./storage.js";
import { updateCopraImageData, updateCopraPageData } from "../localDatabase/db.js";

class CopraState {
  constructor() {
    this.state = {
      pageData: [],
      imageData: [],
    };
  }
  setPageLayerData(state) {
    this.state.pageData = state;
  }
  getPageLayerData() {
    return this.state.pageData;
  }
  updateApp() {
    if (stoV2.isExists("pageData")) {
      localStorage.removeItem("pageData");
    }
    if (stoV2.isExists("imageData")) {
      localStorage.removeItem("imageData");
    }
    updateCopraPageData(DefaultState);
    updateCopraImageData("");
    stoV2.val("#FFFFFF").storeToCanvasBackground();
    stoV2.val("aspect-1:1").storeToCanvasAspect();
    stoV2.val("htmlmode").storeToCanvasMode();
  }
  resetApp() {
    this.updateApp();
    stoV2.val("").storeToProjectName();
  }
  updateUsingTemplate() {
    return new Promise(async (resolve) => {
      await updateCopraPageData(TemplateState);
      stoV2.val("#FDF5DF").storeToCanvasBackground();
      stoV2.val("aspect-1:1").storeToCanvasAspect();
      stoV2.val("htmlmode").storeToCanvasMode();
      resolve("success");
    });
  }
}

export const cps = new CopraState();
