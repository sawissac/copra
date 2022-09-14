import { CanvasScaler } from "./canvasScaler.js";
import { changeCanvasAspectRatio } from "./canvasAspectRatio.js";
import { LayerRander } from "./layerRender.js";
import { htmlRender } from "./htmlRender.js";
import { PageListRender } from "./pageListRender.js";
import { BackgroundEngine } from "./backgroundEngine.js";
import { ImageRender } from "./imageRender.js";
import { ComponentBuilder } from "./componentBuilder.js";
import { Tooltips } from "./tooltips.js";

const hcs = new CanvasScaler();
const imcs = new CanvasScaler();
const lr = new LayerRander();
const hr = new htmlRender();
const pr = new PageListRender();
const be = new BackgroundEngine();
const cb = new ComponentBuilder();
const imr = new ImageRender();
const rtp = new Tooltips();
const stp = new Tooltips();
const etp = new Tooltips();

/**
 *  disable ctrl key
 *
 *
 */
document.body.addEventListener("keydown", function (keyPressev) {
  if (keyPressev.ctrlKey) {
    keyPressev.preventDefault();
  }
});
document.addEventListener("contextmenu", (e) => {
  // e.preventDefault();
});
/**
 * CanvasName
 *
 *
 */
er.element.headerFile.set((_) => {
  _.textContent = stoV2.getProjectName();
});
/**
 *  pageLayer
 */
pr.setHost({
  _btn_: er.element.layerInnerPageBtn.target,
  _layer_: er.element.layerInnerPageList.target,
});
pr.build();
pr.setWorker(() => {
  hr.updateTitle();
  hr.render();
  lr.render();
});
/**
 * layerController
 *
 */
lr.setHost({
  _htmltitle_: er.element.htmlInnerTitle.target,
  _layerlabel_: er.element.layerInnerLayerLabel.target,
  _canvasbtn_: er.element.layerInnerCanvasButton.target,
  _layer_: er.element.layerInnerLayerList.target,
  _canvaslayer_: er.element.htmlLayer.target,
});
lr.build();
lr.setWorker(() => {
  hr.render();
  cb.updateBuilder();
});
/**
 *  html canvs render
 *
 */
hr.setHost({
  _layer_: er.element.htmlLayer.target,
  _htmlTitle_: er.element.htmlInnerTitle.target,
});
hr.updateTitle();
hr.setWorker(() => {
  lr.render();
  cb.updateBuilder();
});
hr.build();
hr.render();
/**
 * background engine
 *
 *
 */
be.setHost({
  _layer_: er.element.optionInnerLayer.target,
});
be.setWorker(() => {
  cb.updateBuilder();
});
be.build();
/**
 * Component Builder
 */
cb.setHost({
  _layer_: er.element.optionInnerLayer.target,
});
cb.build();
cb.updateBuilder();
cb.setWorker(() => {
  hr.render();
  lr.render();
});
/**
 * imageRender
 *
 *
 */
imr
  .setHost({
    _html_: er.element.htmlInnerCanvas.target,
    _image_: er.element.renderInnerCanvas.target,
    _imageScene_: er.element.renderCanvas.target,
    _controller_: er.element.renderController.target,
  })
  .setEngine(htmlToImage)
  .build();
/**
 * controllerCanvasScrollYButton
 *
 *
 */
let scrollYIndicator = null;
er.element.controllerCanvasScrollYButton.set((_) => {
  const [indi] = er.icon(_, ["bi", "bi-arrows-expand"], true, "N", true, false);
  scrollYIndicator = indi;
  let btnToggle = false;
  _.onclick = () => {
    btnToggle = !btnToggle;
    if (btnToggle) {
      hcs.verticalMoveOn();
      indi.textContent = "Y";
    } else {
      hcs.verticalMoveOff();
      indi.textContent = "N";
    }
  };
});
/**
 * controllerCanvasScrollXButton
 *
 *
 */
let scrollXIndicator = null;
er.element.controllerCanvasScrollXButton.set((_) => {
  const [indi] = er.icon(
    _,
    ["bi", "bi-arrows-expand", "rotate-90"],
    true,
    "N",
    true,
    false
  );
  scrollXIndicator = indi;
  let btnToggle = false;
  _.onclick = () => {
    btnToggle = !btnToggle;
    if (btnToggle) {
      hcs.horizontalMoveOn();
      indi.textContent = "X";
    } else {
      hcs.horizontalMoveOff();
      indi.textContent = "N";
    }
  };
});

er.element.headerSaveBtn.set((_) => {
  _.onclick = () => {
    stoV2.val(cps.getPageLayerData()).storeToPageData();
  };
});

/**
 *  htmlcanvasScroller
 *
 *
 */
hcs
  .setHost({
    _canvas_: er.element.htmlInnerCenter.target,
  })
  .setMinMax(10, 300)
  .setScalePercentMiddle()
  .setWorker(() => {
    stp.btnLabelEl.textContent =
      hcs.formatPerscent(String(hcs.getScale() * 100)) + "%";
  })
  .build();
/**
 *  imagecanvasScroller
 *
 *
 */
imcs
  .setHost({
    _canvas_: er.element.renderInnerCenter.target,
  })
  .setMinMax(10, 500)
  .setWorker(() => {
    stp.btnLabelEl.textContent =
      imcs.formatPerscent(String(imcs.getScale() * 100)) + "%";
  })
  .build();
/**
 *  canvas center button
 *
 *
 */
er.element.controllerCanvasCenterButton.set((_) => {
  changeCanvasAspectRatio(stoV2.getCanvasAspect());
  er.icon(_, ["bi", "bi-align-center"], true, "", false, false);
  _.onclick = () => {
    changeZoomScale(1);
  };
});
/**
 * tooltips for rationbtn
 *
 *
 */
rtp
  .setHost({
    _btn_: er.element.controllerRatioBtn.target,
    _box_: er.element.controllerRatioBox.target,
  })
  .setBtnIconStyle(["bi", "bi-aspect-ratio-fill"], "Ratio")
  .setListIconStyle(["bi", "bi-star-fill"])
  .offset([0, 15])
  .set([
    {
      listName: "aspect-1:1",
      fun: () => {
        changeCanvasAspectRatio("aspect-1:1", hcs);
      },
    },
    {
      listName: "aspect-9:16",
      fun: () => {
        changeCanvasAspectRatio("aspect-9:16", hcs);
      },
    },
    {
      listName: "aspect-16:9",
      fun: () => {
        changeCanvasAspectRatio("aspect-16:9", hcs);
      },
    },
  ])
  .build();

/**
 * tooltips for scaler percent btn
 *
 *
 */
function changeZoomScale(value) {
  if (stoV2.getCanvasMode() === "htmlmode") {
    stp.btnLabelEl.textContent = value * 100 + "%";
    hcs.scale = value;
    hcs.setCanvasPostion(hcs.defalutX, hcs.defaultY);
    hcs.changeCanvas();
  } else {
    stp.btnLabelEl.textContent = value * 100 + "%";
    imcs.scale = value;
    imcs.setCanvasPostion(imcs.defalutX, imcs.defaultY);
    imcs.changeCanvas();
  }
}
stp
  .setHost({
    _btn_: er.element.controllerScalePercent.target,
    _box_: er.element.controllerScalePercentBox.target,
  })
  .setBtnIconStyle(["bi", "bi-zoom-in"], "Scale")
  .setListIconStyle(["bi", "bi-zoom-in"])
  .offset([-45, 15])
  .set([
    {
      listName: "Scale to 50%",
      fun: () => {
        changeZoomScale(0.5);
      },
    },
    {
      listName: "Zoom to 100%",
      fun: () => {
        changeZoomScale(1);
      },
    },
    {
      listName: "Zoom out",
      fun: () => {
        changeZoomScale(1);
      },
    },
    {
      listName: "Zoom to fit",
      fun: () => {
        changeZoomScale(2.1);
      },
    },
    {
      listName: "Zoom in",
      fun: () => {
        changeZoomScale(3);
      },
    },
  ])
  .build();
stp.btnLabelEl.textContent =
  hcs.formatPerscent(String(hcs.getScale() * 100)) + "%";
/**
 * tooltips for edit btn
 *
 *
 */

etp
  .setHost({
    _btn_: er.element.controllerEditBtn.target,
    _box_: er.element.controllerEditBox.target,
  })
  .setBtnIconStyle(["bi", "bi-list"], "Edit")
  .setListIconStyle(["bi", "bi-list"])
  .offset([65, 15])
  .set([
    {
      listName: "Render",
      fun: () => {
        stoV2.val("imagemode").storeToCanvasMode();
        imr.show();
        changeZoomScale(1);
        lr.layerUnSelectAll();
        imr.render();
      },
    },
    {
      listName: "Reset App",
      fun: () => {
        cps.updateApp();
        const path = 
          window.location.protocol +
          "//" +
          window.location.hostname +
          ":" +
          window.location.port +
          "/editor";
        window.location.href = path;
      },
    },
    {
      listName: "Exit",
      fun: () => {
        const path = 
          window.location.protocol +
          "//" +
          window.location.hostname +
          ":" +
          window.location.port +
          "/";
        window.location.href = path;
      },
    },
  ])
  .build();

/**
 * window key event
 *
 *
 */

window.addEventListener("keydown", (ev) => {
  // Reset canvas
  if (ev.shiftKey && ev.code === "KeyC") {
    changeZoomScale(1);
  }
  // scroll up and down
  if (ev.shiftKey && ev.code === "KeyS") {
    scrollYIndicator.textContent = "Y";
    hcs.verticalMoveOn();
    imcs.verticalMoveOn();
  }
  // scroll left and right
  if (ev.shiftKey && ev.code === "KeyA") {
    scrollXIndicator.textContent = "X";
    hcs.horizontalMoveOn();
    imcs.horizontalMoveOn();
  }
});

window.addEventListener("keyup", (ev) => {
  if (ev.shiftKey) {
    scrollYIndicator.textContent = "N";
    scrollXIndicator.textContent = "N";
    hcs.verticalMoveOff();
    hcs.horizontalMoveOff();
    imcs.verticalMoveOff();
    imcs.horizontalMoveOff();
  }
});

/**
 * CoreComponent
 *    ->headerNav
 *    ->controller
 *    ->layer
 *    ->options
 *    ->htmlCanvas
 *    ->controllerRatioBox
 */
const Component = er.component({
  element: "component-div",
  class: ["core-component"],
  children: [
    er.toComponent(er.element.headerNav),
    er.toComponent(er.element.controller),
    er.toComponent(er.element.layer),
    er.toComponent(er.element.option),
    er.toComponent(er.element.renderCanvas),
    er.toComponent(er.element.htmlCanvas),
    er.toComponent(er.element.controllerRatioBox),
    er.toComponent(er.element.controllerEditBox),
    er.toComponent(er.element.controllerScalePercentBox),
  ],
});

export const coreComponent = Component;
