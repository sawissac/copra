
const ElementList = [
  /**@header**/
  "header-nav-div",
  "header-logo-div",
  "header-file-div",
  "header-save-btn-div",
  "header-file-warper-div",
  "header-version-div",
  /**@controller**/
  "controller-div",
  "controller-file-btn-button",
  "controller-file-box-div",
  "controller-scale-percent-btn-button",
  "controller-scale-percent-box-div",
  "controller-warper-left-div",
  "controller-image-btn-button",
  "controller-image-box-div",
  "controller-warper-right-div",
  "controller-warper-center-div",
  "controller-ratio-btn-button",
  "controller-ratio-box-div",
  "controller-canvas-warper-div",
  "controller-canvas-center-button-button",
  "controller-canvas-scrollY-button-button",
  "controller-canvas-scrollX-button-button",
  /**@layer**/
  "layer-div",
  "layer-inner-page-div",
  "layer-inner-page-btn-button",
  "layer-inner-page-list-div",
  "layer-inner-layer-div",
  "layer-inner-layer-label-div",
  "layer-inner-canvas-button-div",
  "layer-inner-layer-list-div",
  /**@option**/
  "option-div",
  "option-inner-div",
  "option-inner-label-button",
  "option-inner-layer-div",
  /**@html-canvas**/
  "html-canvas-div",
  "html-inner-center-div",
  "html-inner-title-div",
  "html-inner-canvas-div",
  "html-layer-div",
  "html-image-div",
  /**@render-canvas**/
  "render-canvas-div",
  "render-inner-center-div",
  "render-inner-canvas-div",
  "render-controller-div",
  /**@render-all**/
  "render-all-scene-div",
  "render-all-controller-div",
  "render-all-list-div",
  /**@global download and file**/
  "global-download-link-a",
  "global-file-input-input",
  "core-component-div",
];

const Instruction = [
  /**
   *  headerNav
   *      ->headerLogo
   *      ->block
   *      ->headerFile
   *      ->block
   *      ->headerVersion
   */
  "headerFileWarper = headerFile",
  "headerNav = headerLogo,headerFileWarper,headerSaveBtn,headerVersion",
  /**
   *  controller
   *      ->controllerWarperLeft
   *          -> controllerFileBtn
   *          -> controllerEditBtn
   *      ->controllerWarperCenter
   *          ->controllerCanvasWarper
   *              ->controllerRatioBtn
   *              ->controllerCanvasCenterButton
   *              ->controllerCanvasScrollYButton
   *              ->controllerCanvasScrollXButton
   *      ->controllerWarperRight
   *          -> controllerScalePercent
   */
  "controllerWarperLeft = controllerFileBtn,controllerImageBtn",
  "controllerCanvasWarper = controllerRatioBtn,controllerCanvasCenterButton,controllerCanvasScrollYButton,controllerCanvasScrollXButton",
  "controllerWarperCenter = controllerCanvasWarper",
  "controllerWarperRight = controllerScalePercentBtn",
  "controller = controllerWarperLeft,controllerWarperCenter,controllerWarperRight",
  /**
   * layer
   *   -> layerInnerPage
   *        -> layerInnerPageBtn
   *        -> layerInnerPageList
   *   -> layerInnerLayer
   *        -> layerInnerLayerLabel
   *        -> layerInnerCanvasButton
   *        -> layerInnerControllerBar
   *        -> layerInnerLayerList
   */
  "layerInnerPage = layerInnerPageBtn,layerInnerPageList",
  "layerInnerLayer = layerInnerLayerLabel,layerInnerCanvasButton,layerInnerLayerList",
  "layer = layerInnerPage,layerInnerLayer",
  /**
   *  option
   *    -> optionInner
   *          -> optionInnerLabel
   *          -> optionInnerLayer
   */
  "optionInner = optionInnerLabel,optionInnerLayer",
  "option = optionInner",
  /**
   *  htmlCanvas
   *    ->htmlInnerCenter
   *        ->htmlInnerTitle
   *        ->htmlInnerCanvas
   *            ->htmlImage
   *            ->htmlLayer
   */
  "htmlInnerCanvas = htmlImage,htmlLayer",
  "htmlInnerCenter = htmlInnerTitle,htmlInnerCanvas",
  "htmlCanvas = htmlInnerCenter",
  /**
   *  renderCanvas
   *    ->renderInnerCenter
   *        ->renderBox
   */
  "renderInnerCenter = renderInnerCanvas",
  "renderCanvas = renderInnerCenter,renderController",
  /**F
   *  renderAllScene
   *    ->renderAllController,
   *    ->renderAllList
   *
   */
  "renderAllScene = renderAllController,renderAllList",
];
function addIcon(props) {
  props.target.innerHTML = "";
  if (props.iconstart) {
    const iconStart = am.component({
      el: "icony-i",
      class: [...props.iconstart],
      build: (el, mod) => {
        mod.style({
          height: "max-content",
        });
      },
    });
    props.target.appendChild(iconStart.target);
  }

  let textLabel = am.component({
    el: "text-label-div",
    class: ["mx-1", "text-start", "flex-fill", "mx-1"],
    text: props.text,
    build: (el, mod) => {
      mod.style({
        height: "max-content",
      });
    },
  });

  if (props.text) {
    textLabel.text(props.text);
    props.target.appendChild(textLabel.target);
  }

  if (props.dropdown) {
    const dropDown = am.component({
      el: "drop-icon-i",
      class: ["bi", "bi-chevron-down"],
    });
    props.target.appendChild(dropDown.target);
  }
  if (props.text) {
    return [textLabel];
  }
}

const am = new Automa();
am.parseToElement(ElementList);
am.arrange(Instruction);
/**@coreComponent */
am.pick("coreComponent").class(["vh-100", "bg-light", "position-relative"]);

/**@Header */
am.pick("headerNav")
  .class([
    "d-flex",
    "bg-dark",
    "p-2",
    "position-absolute",
    "top-0",
    "start-0",
    "end-0",
    "align-items-center",
    "px-3",
  ])
  .style({
    zIndex: 9999,
  });
am.pick("headerFileWarper").class([
  "flex-fill",
  "d-flex",
  "justify-content-center",
]);
am.pick("headerLogo")
  .class(["text-light", "fs-12"])
  .text("CoPra")
  .attr("type", "button")
  .style({
    width: "200px",
  });
am.pick("headerFile")
  .class(["text-light", "fw-light", "text-center", "text-truncate", "fs-12"])
  .style({
    width: "150px",
    marginLeft: "-70px",
  })
  .text("file demo length length");
am.pick("headerSaveBtn")
  .class([
    "text-light",
    "fs-12",
    "btn",
    "btn-sm",
    "btn-primary",
    "py-1",
    "mx-3",
  ])
  .text("save");
am.pick("headerVersion").class(["text-light", "fs-12"]).text("1.1.0v");

/**@controller */
am.pick("controller")
  .class([
    "d-flex",
    "position-absolute",
    "start-0",
    "end-0",
    "align-items-center",
    "p-2",
    "shadow-sm",
    "border",
    "border-2",
    "border-start-0",
    "border-end-0",
    "border-top-0",
    "bg-white",
  ])
  .style({
    top: "44px",
    zIndex: 9999,
  });
am.pick("controllerWarperLeft")
  .class(["d-flex", "px-2", "justify-content-start"])
  .style({
    overflow: "visible",
  });
am.pick("controllerWarperCenter")
  .class(["d-flex", "flex-fill", "px-2", "justify-content-center"])
  .style({
    overflow: "visible",
  });
am.pick("controllerWarperRight")
  .class(["d-flex", "px-2", "justify-content-end"])
  .style({
    overflow: "visible",
  });
am.pick("controllerCanvasWarper").class(["d-flex"]).style({
  overflow: "visible",
  marginLeft: "-70px",
});
am.pick("controllerFileBtn")
  .modify((el) => {
    addIcon({
      target: el,
      iconstart: ["bi", "bi-list"],
      text: "File",
      dropdown: true,
    });
  })
  .class([
    "btn",
    "btn-sm",
    "btn-light",
    "bg-white",
    "border",
    "border-2",
    "rounded",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "fs-12",
  ])
  .style({
    height: "33px",
  });
am.pick("controllerImageBtn")
  .modify((el) => {
    addIcon({
      target: el,
      iconstart: ["bi", "bi-list"],
      text: "Image",
      dropdown: true,
    });
  })
  .class([
    "btn",
    "btn-sm",
    "btn-light",
    "bg-white",
    "border",
    "border-2",
    "rounded",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "fs-12",
    "ms-2",
  ])
  .style({
    height: "33px",
  });
am.pick("controllerScalePercentBtn")
  .modify((el) => {
    const [iconPercentLabel] = addIcon({
      target: el,
      iconstart: ["bi", "bi-zoom-in"],
      text: "100%",
      dropdown: true,
    });
    am.regis({
      elName: "iconPercentLabel",
      component: iconPercentLabel,
    });
  })
  .class([
    "btn",
    "btn-sm",
    "btn-light",
    "bg-white",
    "border",
    "border-2",
    "rounded",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "fs-12",
    "ms-2",
  ])
  .style({ width: "90px" });
am.pick("controllerRatioBtn")
  .class([
    "btn",
    "btn-sm",
    "btn-light",
    "bg-white",
    "border",
    "border-2",
    "rounded",
    "py-1",
    "mx-1",
    "fs-12",
    "d-flex",
  ])
  .modify((_) => {
    addIcon({
      target: _,
      iconstart: ["bi", "bi-aspect-ratio-fill"],
      dropdown: true,
      text: "Ratio",
    });
  });
am.pick("controllerCanvasCenterButton")
  .class([
    "btn",
    "btn-sm",
    "btn-light",
    "bg-white",
    "border",
    "border-2",
    "rounded",
    "py-1",
    "fs-12",
    "mx-1",
  ])
  .modify((_) => {
    addIcon({ target: _, iconstart: ["bi", "bi-align-center"] });
  });
am.pick("controllerCanvasScrollYButton")
  .class([
    "btn",
    "btn-sm",
    "btn-light",
    "bg-white",
    "border",
    "border-2",
    "rounded",
    "py-1",
    "mx-1",
    "fs-12",
    "d-flex",
  ])
  .modify((_) => {
    const [Icon] = addIcon({
      target: _,
      iconstart: ["bi", "bi-arrows-expand"],
      text: "N",
    });
    am.regis({ elName: "iconScrollY", component: Icon });
  });
am.pick("controllerCanvasScrollXButton")
  .class([
    "btn",
    "btn-sm",
    "btn-light",
    "bg-white",
    "border",
    "border-2",
    "rounded",
    "mx-1",
    "fs-12",
    "d-flex",
  ])
  .modify((_) => {
    const [Icon] = addIcon({
      target: _,
      iconstart: ["bi", "bi-arrows-expand", "rotate-90"],
      text: "N",
    });
    am.regis({ elName: "iconScrollX", component: Icon });
  });
am.pick("controllerFileBox")
  .class(["bg-dark", "border", "rounded", "w-200", "py-2"])
  .style({ display: "none", zIndex: 9999 });
am.pick("controllerRatioBox")
  .class(["bg-dark", "border", "rounded", "w-200", "py-2"])
  .style({ display: "none", zIndex: 9999 });
am.pick("controllerImageBox")
  .class(["bg-dark", "border", "rounded", "w-200", "py-2"])
  .style({ display: "none", zIndex: 9999 });
am.pick("controllerScalePercentBox")
  .class(["bg-dark", "border", "rounded", "w-200", "py-2"])
  .style({ display: "none", zIndex: 9999 });

/** @layer */
am.pick("layer")
  .class([
    "p-2",
    "position-absolute",
    "start-0",
    "bottom-0",
    "w-300",
    "border-start-0",
    "border-top-0",
    "border-bottom-0",
    "border",
    "border-2",
    "d-flex",
    "flex-column",
    "bg-light",
  ])
  .style({
    top: "92px",
    zIndex: 999,
  });
am.pick("layerInnerPage").class([
  "d-flex",
  "flex-column",
  "bg-white",
  "rounded",
  "p-2",
  "shadow-sm",
  "mh-180",
]);
am.pick("layerInnerLayer").class([
  "d-flex",
  "flex-column",
  "bg-white",
  "rounded",
  "p-2",
  "shadow-sm",
  "flex-fill",
  "mt-2",
]);
am.pick("layerInnerPageBtn")
  .modify((el) => {
    addIcon({
      target: el,
      iconstart: ["bi", "bi-collection", "pe-1"],
      text: "Page",
    });
  })
  .class([
    "btn",
    "btn-sm",
    "btn-light",
    "bg-white",
    "border",
    "border-2",
    "rounded",
    "d-flex",
    "align-items-center",
    "mb-2",
    "fs-12",
  ])
  .style({
    height: "33px",
  });
am.pick("layerInnerPageList").class(["h-100", "overflow-y", "px-1"]);
am.pick("layerInnerLayerLabel")
  .modify((el) => {
    addIcon({
      target: el,
      iconstart: ["bi", "bi-bounding-box-circles"],
      text: "Layer",
    });
  })
  .class([
    "btn",
    "btn-sm",
    "btn-light",
    "bg-white",
    "border",
    "border-2",
    "rounded",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "mb-2",
    "fs-12",
  ])
  .style({
    minHeight: "33px",
  });
am.pick("layerInnerCanvasButton")
  .modify((el, mod) => {
    addIcon({
      target: el,
      iconstart: ["bi", "bi-collection"],
      text: "Page",
    });
  })
  .class([
    "btn",
    "btn-sm",
    "btn-light",
    "bg-white",
    "border",
    "border-2",
    "rounded",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "mb-2",
    "fs-12",
  ])
  .style({
    minHeight: "33px",
  });
am.pick("layerInnerLayerList").class(["h-900", "overflow-y", "px-1"]);
/**@option */
am.pick("option")
  .class([
    "p-2",
    "position-absolute",
    "end-0",
    "bottom-0",
    "w-300",
    "border-end-0",
    "border-top-0",
    "border-bottom-0",
    "border",
    "border-2",
    "bg-light",
    "d-flex",
  ])
  .style({
    top: "92px",
    zIndex: 999,
  });
am.pick("optionInner").class([
  "d-flex",
  "flex-fill",
  "flex-column",
  "bg-white",
  "rounded",
  "shadow-sm",
  "p-2",
  "position-relative",
]);
am.pick("optionInnerLayer")
  .class(["br-5", "px-7", "py-7", "overflow-y"])
  .style({ height: "100%" });
am.pick("optionInnerLabel")
  .modify((el, mod) => {
    addIcon({
      target: el,
      iconstart: ["bi", "bi-gear-fill"],
      text: "Option",
    });
  })
  .class([
    "btn",
    "btn-sm",
    "btn-light",
    "bg-white",
    "border",
    "border-2",
    "rounded",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "mb-2",
    "fs-12",
  ])
  .style({
    height: "33px",
  });

/** @htmlcanvas */
am.pick("htmlInnerTitle").text("New Canvas");
/** @rendercanvas */
am.pick("renderController").class(["bg-white"]);
am.pick("htmlInnerCanvas").class(["aspect-1-1"]);
am.pick("renderCanvas").style({ display: "none" });

/**@globaldownload */

am.pick("globalDownloadLink").class(["d-none"]);
am.pick("globalFileInput")
  .modify((el) => {
    el.type = "file";
  })
  .style({
    display: "none",
  });

/**@imageRenderAll */

am.pick("renderAllScene")
  .style({
    overflow: "scroll",
    height: "calc(105vh - 94px)",
    marginTop: "91px",
  })
  .class(["position-relative", "d-none", "bg-light"]);
am.pick("renderAllController")
  .class([
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "py-2",
    "bg-white",
    "top-0",
    "start-0",
    "end-0",
    "position-sticky",
  ])
  .style({ height: "50px" });

am.pick("renderAllList").class(["pb-5"]);
