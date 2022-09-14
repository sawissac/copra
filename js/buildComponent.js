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
er.element.headerNav.target.appendChild(er.element.headerLogo.target);
er.element.headerNav.target.appendChild(er.element.block2.target);
er.element.headerNav.target.appendChild(er.element.headerFile.target);
er.element.headerNav.target.appendChild(er.element.block.target);
er.element.headerNav.target.appendChild(er.element.headerSaveBtn.target);
er.element.headerNav.target.appendChild(er.element.headerVersion.target);

// class
er.element.headerNav.set((_) => {
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
er.element.block2.set((_)=>{
  _.classList.add("block");
})
er.element.headerLogo.set((_) => {
  _.classList.add("btn-btn", "btn-max","bg-dark","text-white");
  _.textContent = "CoPra";
  _.type = "button";
});
er.element.headerFile.set((_) => {
  _.classList.add(
    "btn-btn",
    "btn-max",
    "text-white",
    "d-flex",
    "j-center"
    );
});
er.element.headerSaveBtn.set((_) => {
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
er.element.headerVersion.set((_) => {
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
 *          -> controllerEditBtn
 *      ->controllerWarperCenter
 *          ->controllerCanvasWarper
 *      ->controllerWarperRight
 *          -> controllerScalePercent
 */
// Dom
er.element.controllerWarperLeft.target.appendChild(
  er.element.controllerEditBtn.target
);
er.element.controllerWarperRight.target.appendChild(
  er.element.controllerScalePercent.target
);
er.element.controllerCanvasWarper.target.appendChild(
  er.element.controllerRatioBtn.target
);
er.element.controllerCanvasWarper.target.appendChild(
  er.element.controllerCanvasCenterButton.target
);
er.element.controllerCanvasWarper.target.appendChild(
  er.element.controllerCanvasScrollYButton.target
);
er.element.controllerCanvasWarper.target.appendChild(
  er.element.controllerCanvasScrollXButton.target
);
er.element.controllerWarperCenter.target.appendChild(
  er.element.controllerCanvasWarper.target
);
er.element.controller.target.appendChild(
  er.element.controllerWarperLeft.target
);
er.element.controller.target.appendChild(
  er.element.controllerWarperCenter.target
);
er.element.controller.target.appendChild(
  er.element.controllerWarperRight.target
);

// class

er.element.controller.set((_) => {
  _.classList.add(
    "d-flex",
    "bg-light",
    "px-7",
    "ai-center",
    "py-7",
    "pos-t-r-l",
    "pos-t-50",
    "border-color-grey",
    "border-bottom-2",
  );
});
er.element.controllerWarperLeft.set((_) => {
  _.classList.add("d-flex", "block", "px-5", "j-left", "ts-12");
});
er.element.controllerEditBtn.set((_) => {
  _.classList.add(...controllerBtnStyle);
});
er.element.controllerEditBox.set((_) => {
  _.classList.add(...["options-box"]);
});
er.element.controllerWarperCenter.set((_) => {
  _.classList.add("d-flex", "block", "px-5", "j-center");
});
er.element.controllerCanvasWarper.set((_) => {
  _.classList.add("d-flex", "px-5", "j-center");
});
er.element.controllerRatioBtn.set((_) => {
  _.classList.add(...controllerBtnStyle);
});
er.element.controllerCanvasCenterButton.set((_) => {
  _.classList.add(...controllerBtnStyle);
});
er.element.controllerCanvasScrollYButton.set((_) => {
  _.classList.add(...controllerBtnStyle);
});
er.element.controllerCanvasScrollXButton.set((_) => {
  _.classList.add(...controllerBtnStyle);
});
er.element.controllerWarperRight.set((_) => {
  _.classList.add("d-flex", "block", "px-5", "j-right");
});
er.element.controllerScalePercent.set((_) => {
  _.classList.add(...controllerBtnStyle);
  _.setAttribute("style","width: 108px !important;");
});
er.element.controllerScalePercentBox.set((_) => {
  _.classList.add("options-box");
});
er.element.controllerRatioBox.set((_) => {
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
er.element.layer.target.appendChild(er.element.layerInnerPage.target);
er.element.layerInnerPage.target.appendChild(
  er.element.layerInnerPageBtn.target
);
er.element.layerInnerPage.target.appendChild(
  er.element.layerInnerPageBtn.target
);
er.element.layerInnerPage.target.appendChild(
  er.element.layerInnerPageList.target
);
er.element.layerInnerLayer.target.appendChild(
  er.element.layerInnerLayerLabel.target
);
er.element.layerInnerLayer.target.appendChild(
  er.element.layerInnerCanvasButton.target
);
er.element.layerInnerLayer.target.appendChild(
  er.element.layerInnerLayerList.target
);
er.element.layer.target.appendChild(er.element.layerInnerPage.target);
er.element.layer.target.appendChild(er.element.layerInnerLayer.target);
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
  "m-bottom-4"
];
er.element.layer.set((_) => {
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
er.element.layerInnerPage.set((_) => {
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
er.element.layerInnerPageBtn.set((_) => {
  er.icon(_, ["bi", "bi-collection"], true, "Page", true);
  _.classList.add(...layerStyleBtn);
});
er.element.layerInnerPageList.set((_) => {
  _.classList.add("h-100", "overflow-y", "px-7");
});
er.element.layerInnerLayer.set((_) => {
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
er.element.layerInnerLayerLabel.set((_) => {
  er.icon(_, ["bi", "bi-bounding-box-circles"], true, "Layer", true);
  _.classList.add(...layerStyleBtn, "m-top-4");
});
er.element.layerInnerCanvasButton.set((_) => {
  _.classList.add(...layerStyleBtn, "m-top-4");
});
er.element.layerInnerLayerList.set((_) => {
  _.classList.add("br-5", "px-7", "m-top-4", "overflow-y", "block");
});

/**
 *  option
 *    -> optionInner
 *          -> optionInnerLabel
 *          -> optionInnerLayer
 */
//Dom
er.element.optionInner.target.appendChild(er.element.optionInnerLabel.target);
er.element.optionInner.target.appendChild(er.element.optionInnerLayer.target);
er.element.option.target.appendChild(er.element.optionInner.target);
//class
er.element.option.set((_) => {
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

er.element.optionInner.set((_) => {
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
er.element.optionInnerLayer.set((_) => {
  _.classList.add(
    "bg-light",
    "br-5",
    "px-7",
    "py-7",
    "h-900",
    "overflow-y"
  );
});
er.element.optionInnerLabel.set((_) => {
  _.classList.add(...layerStyleBtn,"py-10");
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
er.element.htmlInnerCenter.target.appendChild(er.element.htmlInnerTitle.target);
er.element.htmlInnerCanvas.target.appendChild(er.element.htmlImage.target);
er.element.htmlInnerCanvas.target.appendChild(er.element.htmlLayer.target);
er.element.htmlInnerCenter.target.appendChild(
  er.element.htmlInnerCanvas.target
);
er.element.htmlInnerTitle.set((_) => {
  _.textContent = "New Canvas";
});

er.element.htmlCanvas.target.appendChild(er.element.htmlInnerCenter.target);
//class
/**
 *  renderCanvas
 *    ->renderInnerCenter
 *        -> renderBox
 */
//Dom
er.element.renderCanvas.target.appendChild(er.element.renderInnerCenter.target);
er.element.renderCanvas.target.appendChild(er.element.renderController.target);
er.element.renderInnerCenter.target.appendChild(
  er.element.renderInnerCanvas.target
);

//class
er.element.renderController.set((_) => {
  _.classList.add("bg-light");
});
er.element.htmlInnerCanvas.set((_) => {
  _.classList.add("aspect-1-1");
});
er.element.optionInnerLabel.set((_) => {
  er.icon(_, ["bi", "bi-gear-fill"], true, "Option", true);
});
er.element.renderCanvas.set((_) => {
  _.style.display = "none";
});