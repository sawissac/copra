let el = er.element;
let controllerBtnStyle = [
  "ts-12",
  "btn-btn",
  "btn-max",
  "btn-light",
  "text-dark",
  "border-2",
  "border-color-grey",
  "b-primary",
  "br-5",
  "mx-4",
];
/**
 *  headerNav
 *      ->headerLogo
 *      ->block
 *      ->headerFile
 *      ->block
 *      ->headerVersion
 */
// Dom
el.headerNav.target.appendChild(el.headerLogo.target);
el.headerNav.target.appendChild(el.block2.target);
el.headerNav.target.appendChild(el.headerFile.target);
el.headerNav.target.appendChild(el.block.target);
el.headerNav.target.appendChild(el.headerSaveBtn.target);
el.headerNav.target.appendChild(el.headerVersion.target);

// class
el.headerNav.set((_) => {
  _.classList.add(
    "d-flex",
    "bg-dark",
    "py-7",
    "px-7",
    "pos-t-r-l",
    "ai-center",
    "j-left"
  );
});
el.block2.set((_) => {
  _.classList.add("block");
});
el.headerLogo.set((_) => {
  _.classList.add("btn-btn", "btn-max", "bg-dark", "text-white");
  _.textContent = "CoPra";
  _.type = "button";
});
el.headerFile.set((_) => {
  _.classList.add("btn-btn", "btn-max", "text-white", "d-flex", "j-center");
});
el.headerSaveBtn.set((_) => {
  _.textContent = "Save";
  _.classList.add(
    "btn-btn",
    "btn-max",
    "btn-blue",
    "br-5",
    "px-10",
    "mx-4",
    "text-white",
    "j-left"
  );
});
el.headerVersion.set((_) => {
  _.classList.add(
    "ts-12",
    "btn-btn",
    "btn-max",
    "text-white",
    "px-7",
    "mx-4",
    "b-pill"
  );
  _.textContent = "1.1.0v";
  _.type = "button";
});

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
// Dom
el.controllerWarperLeft.target.appendChild(
  el.controllerFileBtn.target
);
el.controllerWarperLeft.target.appendChild(
  el.controllerEditBtn.target
);
el.controllerWarperRight.target.appendChild(
  el.controllerScalePercent.target
);
el.controllerCanvasWarper.target.appendChild(
  el.controllerRatioBtn.target
);
el.controllerCanvasWarper.target.appendChild(
  el.controllerCanvasCenterButton.target
);
el.controllerCanvasWarper.target.appendChild(
  el.controllerCanvasScrollYButton.target
);
el.controllerCanvasWarper.target.appendChild(
  el.controllerCanvasScrollXButton.target
);
el.controllerWarperCenter.target.appendChild(
  el.controllerCanvasWarper.target
);
el.controller.target.appendChild(
  el.controllerWarperLeft.target
);
el.controller.target.appendChild(
  el.controllerWarperCenter.target
);
el.controller.target.appendChild(
  el.controllerWarperRight.target
);

// class

el.controller.set((_) => {
  _.classList.add(
    "d-flex",
    "bg-light",
    "px-7",
    "ai-center",
    "py-7",
    "pos-t-r-l",
    "pos-t-50",
    "border-color-grey",
    "border-bottom-2"
  );
});
el.controllerWarperLeft.set((_) => {
  _.classList.add("d-flex", "block", "px-5", "j-left", "ts-12");
});
el.controllerEditBtn.set((_) => {
  _.classList.add(...controllerBtnStyle);
});
el.controllerFileBtn.set((_) => {
  _.classList.add(...controllerBtnStyle);
});
el.controllerEditBox.set((_) => {
  _.classList.add(...["options-box"]);
});
el.controllerFileBox.set((_) => {
  _.classList.add(...["options-box"]);
});
el.controllerWarperCenter.set((_) => {
  _.classList.add("d-flex", "block", "px-5", "j-center");
});
el.controllerCanvasWarper.set((_) => {
  _.classList.add("d-flex", "px-5", "j-center");
});
el.controllerRatioBtn.set((_) => {
  _.classList.add(...controllerBtnStyle);
});
el.controllerCanvasCenterButton.set((_) => {
  _.classList.add(...controllerBtnStyle);
});
el.controllerCanvasScrollYButton.set((_) => {
  _.classList.add(...controllerBtnStyle);
});
el.controllerCanvasScrollXButton.set((_) => {
  _.classList.add(...controllerBtnStyle);
});
el.controllerWarperRight.set((_) => {
  _.classList.add("d-flex", "block", "px-5", "j-right");
});
el.controllerScalePercent.set((_) => {
  _.classList.add(...controllerBtnStyle);
  _.setAttribute("style", "width: 108px !important;");
});
el.controllerScalePercentBox.set((_) => {
  _.classList.add("options-box");
});
el.controllerRatioBox.set((_) => {
  _.classList.add("options-box");
});

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
// Dom
el.layer.target.appendChild(el.layerInnerPage.target);
el.layerInnerPage.target.appendChild(
  el.layerInnerPageBtn.target
);
el.layerInnerPage.target.appendChild(
  el.layerInnerPageBtn.target
);
el.layerInnerPage.target.appendChild(
  el.layerInnerPageList.target
);
el.layerInnerLayer.target.appendChild(
  el.layerInnerLayerLabel.target
);
el.layerInnerLayer.target.appendChild(
  el.layerInnerCanvasButton.target
);
el.layerInnerLayer.target.appendChild(
  el.layerInnerLayerList.target
);
el.layer.target.appendChild(el.layerInnerPage.target);
el.layer.target.appendChild(el.layerInnerLayer.target);
// class
let layerStyleBtn = [
  "btn-btn",
  "btn-light",
  "d-flex",
  "j-left",
  "fs-12",
  "text-dark",
  "border-2",
  "border-color-grey",
  "br-5",
  "m-bottom-4",
];
el.layer.set((_) => {
  _.classList.add(
    "pos-t-b",
    "w-300",
    "pos-l",
    "d-flex",
    "flex-column",
    "border-right-2",
    "border-color-grey-dark",
    "bg-grey",
    "p-top-105",
    "px-4",
    "py-7"
  );
});
el.layerInnerPage.set((_) => {
  _.classList.add(
    "d-flex",
    "flex-column",
    "bg-light",
    "br-5",
    "px-7",
    "py-7",
    "mh-150"
  );
});
el.layerInnerPageBtn.set((_) => {
  er.icon(_, ["bi", "bi-collection"], true, "Page", true);
  _.classList.add(...layerStyleBtn);
});
el.layerInnerPageList.set((_) => {
  _.classList.add("h-100", "overflow-y", "px-7");
});
el.layerInnerLayer.set((_) => {
  _.classList.add(
    "d-flex",
    "flex-column",
    "bg-light",
    "br-5",
    "px-7",
    "py-7",
    "block",
    "m-top-10"
  );
});
el.layerInnerLayerLabel.set((_) => {
  er.icon(_, ["bi", "bi-bounding-box-circles"], true, "Layer", true);
  _.classList.add(...layerStyleBtn, "m-top-4");
});
el.layerInnerCanvasButton.set((_) => {
  _.classList.add(...layerStyleBtn, "m-top-4");
});
el.layerInnerLayerList.set((_) => {
  _.classList.add("br-5", "px-7", "m-top-4", "overflow-y", "block");
});

/**
 *  option
 *    -> optionInner
 *          -> optionInnerLabel
 *          -> optionInnerLayer
 */
//Dom
el.optionInner.target.appendChild(el.optionInnerLabel.target);
el.optionInner.target.appendChild(el.optionInnerLayer.target);
el.option.target.appendChild(el.optionInner.target);
//class
el.option.set((_) => {
  _.classList.add(
    "pos-t-b",
    "w-300",
    "pos-r",
    "d-flex",
    "flex-column",
    "border-left-2",
    "border-color-grey-dark",
    "bg-grey",
    "p-top-105",
    "px-7",
    "py-7"
  );
});

el.optionInner.set((_) => {
  _.classList.add(
    "d-flex",
    "flex-column",
    "bg-light",
    "br-5",
    "px-7",
    "py-7",
    "pos-relative"
  );
});
el.optionInnerLayer.set((_) => {
  _.classList.add("bg-light", "br-5", "px-7", "py-7", "h-900", "overflow-y");
});
el.optionInnerLabel.set((_) => {
  _.classList.add(...layerStyleBtn, "py-10");
});

/**
 *  htmlCanvas
 *    ->htmlInnerCenter
 *        ->htmlInnerTitle
 *        ->htmlInnerCanvas
 *            ->htmlImage
 *            ->htmlLayer
 */
// Dom
el.htmlInnerCenter.target.appendChild(el.htmlInnerTitle.target);
el.htmlInnerCanvas.target.appendChild(el.htmlImage.target);
el.htmlInnerCanvas.target.appendChild(el.htmlLayer.target);
el.htmlInnerCenter.target.appendChild(
  el.htmlInnerCanvas.target
);
el.htmlInnerTitle.set((_) => {
  _.textContent = "New Canvas";
});

el.htmlCanvas.target.appendChild(el.htmlInnerCenter.target);
//class
/**
 *  renderCanvas
 *    ->renderInnerCenter
 *        -> renderBox
 */
//Dom
el.renderCanvas.target.appendChild(el.renderInnerCenter.target);
el.renderCanvas.target.appendChild(el.renderController.target);
el.renderInnerCenter.target.appendChild(
  el.renderInnerCanvas.target
);
//class
el.renderController.set((_) => {
  _.classList.add("bg-light");
});
el.htmlInnerCanvas.set((_) => {
  _.classList.add("aspect-1-1");
});
el.optionInnerLabel.set((_) => {
  er.icon(_, ["bi", "bi-gear-fill"], true, "Option", true);
});
el.renderCanvas.set((_) => {
  _.style.display = "none";
});
/**
 * global download link
 *
 */
el.globalDownloadLink.set((_) => {
  _.style.display = "none";
});
el.globalFileInput.set((_) => {
  _.style.display = "none";
  _.type = "file";
});

// imageRenderAll
el.renderAllScene.target.appendChild(
  el.renderAllController.target
);
el.renderAllScene.target.appendChild(el.renderAllList.target);
el.renderAllScene.set((_) => {
  _.style.overflowY = "scroll";
  _.classList.add("pos-relative","d-none");
  _.style.height = "calc(100% - 94px)";
  _.style.marginTop = "94px";
});
el.renderAllList.set((_) => {
  _.style.overflowY = "scroll";
});
el.renderAllController.set((_) => {
  _.classList.add(
    "bg-light",
    "d-flex",
    "j-center",
    "ai-center",
    "py-7",
    "sticky-top"
  );
  _.style.height = "50px";
});
