
export const DEFINE = [
  /**@header**/
  "header-nav-div-.dFlexiCenter,bgDark,pd2,pdx3,pAbs,pSE,pT,layerTop",
  "header-logo-div-.tlf12,w100",
  "header-file-div-.tlf12,fwLight,tCenter,ttrun,headerFile",
  "header-save-btn-div-.tlf12,mx3,pdy-1,btn,btnPri",
  "header-file-warper-div-.fFill,jCenter,dFlex",
  "header-version-div-.tlf12",
  /**@controller**/
  "controller-div-.dFlexiCenter,pAbs,pSE,pd2,shadow,borderBot,bgLight,layerTop,controller",
  "controller-file-btn-button-.h33,btnBorderLight,w50,borderNone",
  "controller-file-box-div-.dropBox,layerTop",
  "controller-scale-percent-btn-button-.h33,btnBorderLight,borderNone",
  "controller-scale-percent-box-div-.dropBox,layerTop",
  "controller-warper-left-div-.dFlex,jStart,flowShow,fFill",
  "controller-image-btn-button-.h33,btnBorderLight,w50,borderNone",
  "controller-image-box-div-.dropBox,layerTop",
  "controller-warper-right-div-.dFlex,pdx2,jEnd,flowShow",
  "controller-ratio-btn-button-.btnBorderLight,pdy1,w50,borderNone",
  "controller-ratio-box-div-.dropBox,layerTop",
  "controller-canvas-center-button-button-.h33,btnBorderLight,pdy1,borderNone",
  "controller-canvas-scrollY-button-button-.h33,btnBorderLight,pdy1,w50,borderNone",
  "controller-canvas-scrollX-button-button-.h33,btnBorderLight,pdy1,w50,borderNone",
  /**@layer**/
  "layer-div-.pd2,pAbs,pS,pB,vh100,w300,border2,dFlex,bgLight2,fColumn,borderLeft,layer,layerMid",
  "layer-inner-page-div-.mh180,dFlex,fColumn,bgLight,rounded,shadow",
  "layer-inner-page-btn-button-.btnBorderLight,mt2,h33,borderBot,rounded0",
  "layer-inner-page-list-div-.h150,flowY,pdx2,pdy2",
  "layer-inner-layer-div-.dFlex,fColumn,bgLight,rounded,shadow,fFill,mt2",
  "layer-inner-layer-label-div-.btnBorderLight,mt2,h33,borderBot,rounded0",
  "layer-inner-canvas-button-div-.btnBorderLight,h33,borderBot,rounded0,pdx3",
  "layer-inner-layer-list-div-.h400,flowY,pdx2,pdy2",
  /**@option**/
  "option-div-.pAbs,pE,pB,vh100,w300,border2,dFlex,bgLight2,fColumn,borderRight,layer,layerMid,pd2",
  "option-inner-div-.dFlex,fFill,fColumn,bgLight,rounded,shadow,pRel",
  "option-inner-label-button-.btnBorderLight,mt2,h33,borderBot,rounded0,pdt2",
  "option-inner-layer-div-.br5,flowY,h100p",
  /**@html-canvas**/
  "html-canvas-div-.bgLight2",
  "html-inner-center-div",
  "html-inner-title-div",
  "html-inner-canvas-div-.asp11,bgLight",
  "html-layer-div",
  "html-image-div",
  /**@render-canvas**/
  "render-canvas-div-.dNone",
  "render-inner-center-div",
  "render-inner-canvas-div",
  "render-controller-div-.bgLight",
  /**@render-all**/
  "render-all-scene-div-.renderAllScene,dNone",
  "render-all-controller-div-.dFlexiCenter,jCenter,pdy2,bgLight,pSE,pT,pSticky,renderAllController",
  "render-all-list-div-.pdb5",
  /**@global download and file**/
  "global-download-link-a-.dNone",
  "global-file-input-input-.dNone",
  "core-component-div-.vh100,bgLight,pRel",
];

export const ARRANGE = [
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
  "controllerWarperLeft = controllerFileBtn,controllerImageBtn,controllerRatioBtn,controllerCanvasScrollYButton,controllerCanvasScrollXButton,controllerCanvasCenterButton",
  "controllerWarperRight = controllerScalePercentBtn",
  "controller = controllerWarperLeft,controllerWarperRight",
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