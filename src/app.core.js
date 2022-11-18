import { createElement } from "../packages/automa/src/automa.js";
import { pick } from "./app.build.init.js";
import { stoV2 } from "./state/storage.js";
import { cps } from "./state/copra.state.global.js";
import { PageLayerController } from "./page.layer.controller.js";
import { PageComponentLayerController } from "./page.com.layer.controller.js";
import { htmlRender } from "./html.render.engine.js";
import { BackgroundEngine } from "./backgroundEngine.js";
import { ComponentBuilder } from "./componentBuilder.js";
import {
  changeHtmlCanvasAspectRatio,
  isHtmlMode,
  saveAspectDataOfActivePage,
} from "./canvasAspectRatio.js";
import { ImageRender } from "./image.render.engine.js";
import { CustomAlert } from "./alert.js";
import { pickerInit } from "./color.picker.js";
import { MenuHeader } from "./menu.header.js";
import { exportAsCopFile, readCopFile, saveData } from "./io/io.js";
import { redirect } from "./urlPath.js";
import { key } from "./key.js";
import { MenuController } from "./menu.controller.js";

function build() {
  const menuHeader = new MenuHeader();
  const menuController = new MenuController();
  const pageRender = new PageLayerController();
  const pageLayerRender = new PageComponentLayerController();
  const htmlCanvas = new htmlRender();
  const backgroundController = new BackgroundEngine();
  const componentController = new ComponentBuilder();
  const imageCanvas = new ImageRender();

  pickerInit();

  // ! disable short cut
  key.disableContext().disableCtrlS().disableWheelScaling();

  // ! menuHeader
  menuHeader.build();

  // ! pageLayer
  pageRender.listen(() => {
    htmlCanvas.updateTitle();
    htmlCanvas.render();
    pageLayerRender.render();
    componentController.refreshBuilder();
  });

  // ! pageLayerRender
  pageLayerRender.listen(() => {
    htmlCanvas.render();
    componentController.refreshBuilder();
  });

  // ! htmlCanvas
  htmlCanvas.listen(() => {
    pageLayerRender.render();
    componentController.refreshBuilder();
  });

  // ! backgroundController
  backgroundController.build();

  // ! componentController
  componentController.build();
  componentController.listen(() => {
    htmlCanvas.render();
    htmlCanvas.render();
    pageLayerRender.render();
  });

  // ! canvas center button
  pick("controllerCanvasCenterButton").modify((el) => {
    el.onclick = () => {
      if (isHtmlMode()) {
        htmlCanvas.scaleBackToNormal();
      } else {
        imageCanvas.scaleBackToNormal();
      }
    };
  });

  // ! controllerCanvasScrollYButton
  pick("controllerCanvasScrollYButton").modify((el) => {
    let btnToggle = false;
    el.onclick = () => {
      btnToggle = !btnToggle;
      if (btnToggle) {
        htmlCanvas.enableMoveY();
        pick("iconScrollY").text("Y");
      } else {
        htmlCanvas.disableMoveY();
        pick("iconScrollY").text("N");
      }
    };
  });

  // ! controllerCanvasScrollXButton
  pick("controllerCanvasScrollXButton").modify((el) => {
    let btnToggle = false;
    el.onclick = () => {
      btnToggle = !btnToggle;
      if (btnToggle) {
        htmlCanvas.enableMoveX();
        pick("iconScrollX").text("X");
      } else {
        htmlCanvas.disableMoveX();
        pick("iconScrollX").text("N");
      }
    };
  });

  function scaleTo(value){
    if(isHtmlMode()){
      htmlCanvas.scaleCanvasTo(value)
    }else{
      imageCanvas.scaleCanvasTo(value)
    }
  }

  // ! tooltips for scaler percent btn
  menuController.setScalarList([
    {
      listName: "Zoom out",
      fun: () => {
        scaleTo(0.5)
      },
    },
    {
      listName: "Zoom to fit",
      fun: () => {
        scaleTo(2)
      },
    },
    {
      listName: "Zoom in",
      fun: () => {
        scaleTo(3)
      },
    },
    {
      listName: "Scale to 50%",
      fun: () => {
        scaleTo(0.5)
      },
    },
    {
      listName: "Zoom to 100%",
      fun: () => {
        scaleTo(1)
      },
    },
  ]);
  // ! tooltips for ration btn
  menuController.setRatioList([
    {
      listName: "aspect-1:1",
      fun: () => {
        changeHtmlCanvasAspectRatio("aspect-1:1"); 
        saveAspectDataOfActivePage("aspect-1:1")
      },
    },
    {
      listName: "aspect-9:16",
      fun: () => {
        changeHtmlCanvasAspectRatio("aspect-9:16");
        saveAspectDataOfActivePage("aspect-9:16")
      },
    },
    {
      listName: "aspect-16:9",
      fun: () => {
        changeHtmlCanvasAspectRatio("aspect-16:9");
        saveAspectDataOfActivePage("aspect-16:9")
      },
    },
  ]);

  // ! tooltips for img btn
  menuController.setImageList([
    {
      listName: "Render",
      fun: () => {
        stoV2.val("imagemode").storeToCanvasMode();
        imageCanvas.show();
        htmlCanvas.clearSelect();
        htmlCanvas.canvasHighlightOff();
        pageLayerRender.render();
        htmlCanvas.render();
        imageCanvas.render();
      },
    },
  ]);

  // ! tooltips for File btn
  menuController.setFileList([
    {
      listName: "Save",
      fun: () => {
        saveData();
      },
    },
    {
      listName: "Save as cop file",
      fun: () => {
        exportAsCopFile();
      },
    },
    {
      listName: "Import cop file",
      fun: () => {
        readCopFile(() => {
          pageRender.render();
          pageLayerRender.render();
          htmlCanvas.render();
          componentController.refreshBuilder();
        });
      },
    },
    {
      listName: "Clear Project",
      fun: () => {
        cps.resetApp();
        CustomAlert({
          text: "Cleared, Exiting...",
          callback: () => {
            redirect("");
          },
          speed: 30,
          icon: ["bi", "bi-arrow-right-short"],
        });
      },
    },
    {
      listName: "Exit",
      fun: () => {
        CustomAlert({
          text: "Exiting...",
          callback: () => {
            redirect("");
          },
          speed: 30,
          icon: ["bi", "bi-arrow-right-short"],
        });
      },
    },
  ]);

  // ! window key event
  key.keyDown((ev) => {
    // Reset canvas
    if (ev.shiftKey && ev.code === "KeyZ") {
      if (isHtmlMode()) {
        htmlCanvas.scaleBackToNormal();
      } else {
        imageCanvas.scaleBackToNormal();
      }
    }
    // scroll up and down
    if (ev.shiftKey && ev.code === "KeyC") {
      pick("iconScrollY").text("Y");
      htmlCanvas.enableMoveY();
      imageCanvas.enableMoveY();
    }
    // scroll left and right
    if (ev.shiftKey && ev.code === "KeyX") {
      pick("iconScrollX").text("X");
      htmlCanvas.enableMoveX();
      imageCanvas.enableMoveX();
    }
    if(ev.ctrlKey && ev.code === "KeyS"){
      saveData();
    }
  });

  key.keyUp((ev) => {
    if (ev.shiftKey) {
      pick("iconScrollY").text("N");
      pick("iconScrollX").text("N");
      htmlCanvas.disableMove();
      imageCanvas.disableMove();
    }
  });

  //   /**
  //    * CoreComponent
  //    *    ->headerNav
  //    *    ->controller
  //    *    ->layer
  //    *    ->options
  //    *    ->htmlCanvas
  //    *    ->controllerRatioBox
  //    */
  const Component = createElement({
    pick: pick("coreComponent"),
    children: [
      pick("headerNav"),
      pick("controller"),
      pick("layer"),
      pick("option"),
      pick("renderCanvas"),
      pick("renderAllScene"),
      pick("htmlCanvas"),
      pick("controllerRatioBox"),
      pick("controllerFileBox"),
      pick("controllerImageBox"),
      pick("controllerScalePercentBox"),
      pick("globalDownloadLink"),
      pick("globalFileInput"),
    ],
  });
  return Component;
}

export const coreComponent = build;
