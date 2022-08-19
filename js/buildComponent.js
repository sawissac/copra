export function buildUi(er) {
  /**
   *  headerNav
   *      ->headerLogo
   *      ->headerFile
   *      ->block
   *      ->headerVersion
   */
  // Dom
  er.element.headerNav.target.appendChild(er.element.headerLogo.target);
  er.element.headerNav.target.appendChild(er.element.headerFile.target);
  er.element.headerNav.target.appendChild(er.element.block.target);
  er.element.headerNav.target.appendChild(er.element.headerVersion.target);

  // class
  er.element.headerNav.set((_) => {
    _.classList.add("d-flex", "p-top-7", "bg-primary", "px-7", "pos-t-r-l");
  });
  er.element.headerLogo.set((_) => {
    _.classList.add("btn-btn", "btn-max", "btn-primary", "text-primary-light");
  });
  er.element.headerFile.set((_) => {
    _.classList.add(
      "btn-btn",
      "btn-max",
      "btn-secoundary",
      "text-white",
      "p-right-60",
      "p-left-7",
      "j-left"
    );
  });
  er.element.headerVersion.set((_) => {
    _.classList.add(
      "ts-12",
      "btn-btn",
      "btn-max",
      "btn-primary",
      "text-white",
      "px-30",
      "b-pill"
    );
  });

  /**
   *  controller
   *      ->controllerWarperLeft
   *          -> controllerOptions
   *      ->controllerWarperCenter
   *          ->controllerCanvasWarper
   *      ->controllerWarperRight
   *          -> controllerPercent
   */
  // Dom
  er.element.controllerWarperLeft.target.appendChild(
    er.element.controllerOptions.target
  );
  er.element.controllerWarperRight.target.appendChild(
    er.element.controllerPercent.target
  );
  er.element.controllerCanvasWarper.target.appendChild(
    er.element.controllerCanvasCenterButton.target
  );
  er.element.controllerCanvasWarper.target.appendChild(
    er.element.controllerSelectBox.target
  );
  er.element.controllerCanvasWarper.target.appendChild(
    er.element.controllerCanvasScrollYButton.target
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
  let controllerBtnStyle = [
    "ts-12",
    "btn-btn",
    "btn-max",
    "btn-secoundary",
    "text-white",
    "b-primary",
    "br-5",
    "mx-4",
  ];

  er.element.controller.set((_) => {
    _.classList.add(
      "d-flex",
      "bg-secoundary",
      "px-7",
      "ai-center",
      "py-7",
      "pos-t-r-l",
      "pos-t-50"
    );
  });
  er.element.controllerWarperLeft.set((_) => {
    _.classList.add("d-flex", "block", "px-5", "j-left", "ts-12");
  });
  er.element.controllerOptions.set((_) => {
    _.classList.add(...controllerBtnStyle);
  });
  er.element.controllerOptionsBox.set((_) => {
    _.classList.add(...["options-box", "bg-dark"]);
  });
  er.element.controllerWarperCenter.set((_) => {
    _.classList.add("d-flex", "block", "px-5", "j-center");
  });
  er.element.controllerCanvasWarper.set((_) => {
    _.classList.add("d-flex", "px-5", "j-center");
  });
  er.element.controllerSelectBox.set((_) => {
    _.classList.add(...controllerBtnStyle);
  });
  er.element.controllerCanvasCenterButton.set((_) => {
    _.classList.add(...controllerBtnStyle);
  });
  er.element.controllerCanvasScrollYButton.set((_) => {
    _.classList.add(...controllerBtnStyle);
  });
  er.element.controllerWarperRight.set((_) => {
    _.classList.add("d-flex", "block", "px-5", "j-right");
  });
  er.element.controllerPercent.set((_) => {
    _.classList.add(...controllerBtnStyle);
  });
  er.element.controllerSelectOptions.set((_) => {
    _.classList.add("options-box");
  });

  /**
   * layer
   *   -> layerInnerPage
   *        -> layerInnerPageBtn
   *        -> layerInnerPageList
   *   -> layerInnerLayer
   *        -> layerCanvasButton
   *        -> layerController
   *        -> layer
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
    er.element.layerController.target
  );
  er.element.layerInnerLayer.target.appendChild(
    er.element.layerCanvasButton.target
  );
  er.element.layerInnerLayer.target.appendChild(er.element.layerList.target);
  er.element.layer.target.appendChild(er.element.layerInnerPage.target);
  er.element.layer.target.appendChild(er.element.layerInnerLayer.target);
  // class
  let layerStyleBtn = [
    "btn-btn",
    "btn-secoundary",
    "d-flex",
    "j-left",
    "fs-12",
    "text-white",
    "br-5",
  ];
  er.element.layer.set((_) => {
    _.classList.add(
      "pos-t-b",
      "w-300",
      "pos-l",
      "d-flex",
      "flex-column",
      "bg-dark",
      "p-top-94",
      "px-4",
      "py-7"
    );
  });
  er.element.layerInnerPage.set((_) => {
    _.classList.add(
      "d-flex",
      "flex-column",
      "bg-primary",
      "br-5",
      "px-7",
      "py-7",
      "mh-150"
    );
  });
  er.element.layerInnerPageBtn.set((_) => {
    _.classList.add(...layerStyleBtn);
  });
  er.element.layerInnerPageList.set((_) => {
    _.classList.add("h-100", "overflow-y", "px-7");
  });
  er.element.layerInnerLayer.set((_) => {
    _.classList.add(
      "d-flex",
      "flex-column",
      "bg-primary",
      "br-5",
      "px-7",
      "py-7",
      "block",
      "m-top-4"
    );
  });
  er.element.layerCanvasButton.set((_) => {
    _.classList.add(...layerStyleBtn, "m-top-4");
  });
  er.element.layerController.set((_) => {
    _.classList.add(...layerStyleBtn, "m-top-4", "j-space-around");
  });
  er.element.layerList.set((_) => {
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
      "bg-dark",
      "p-top-94",
      "px-7",
      "py-7"
    );
  });
  er.element.optionInner.set((_) => {
    _.classList.add(
      "d-flex",
      "flex-column",
      "bg-primary",
      "br-5",
      "px-7",
      "py-7",
      "block"
    );
  });
  er.element.optionInnerLabel.set((_) => {
    _.classList.add(...layerStyleBtn);
  });
  er.element.optionInnerLayer.set((_) => {
    _.classList.add("block");
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
  er.element.htmlInnerCenter.target.appendChild(
    er.element.htmlInnerTitle.target
  );
  er.element.htmlInnerCanvas.target.appendChild(er.element.htmlImage.target);
  er.element.htmlInnerCanvas.target.appendChild(er.element.htmlLayer.target);
  er.element.htmlInnerCenter.target.appendChild(
    er.element.htmlInnerCanvas.target
  );
  er.element.htmlCanvas.target.appendChild(er.element.htmlInnerCenter.target);
  /**
   *  renderCanvas
   *    ->renderInnerCenter
   *        -> renderBox
   */
  //Dom
  er.element.renderCanvas.target.appendChild(
    er.element.renderInnerCenter.target
  );
  er.element.renderCanvas.target.appendChild(
    er.element.renderController.target
  );
  er.element.renderInnerCenter.target.appendChild(
    er.element.renderInnerCanvas.target
  );

  //class
  er.element.renderController.set((_) => {
    _.classList.add("bg-secoundary");
  });
}
