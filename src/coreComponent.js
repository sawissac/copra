import { CanvasScaler } from "./canvasScaler.js";
import { changeCanvasAspectRatio } from "./canvasAspectRatio.js";
import { LayerRander } from "./layerRender.js";
import { htmlRender } from "./htmlRender.js";
import { PageListRender } from "./pageListRender.js";
import { BackgroundEngine } from "./backgroundEngine.js";
import { ImageRender } from "./imageRender.js";
import { ComponentBuilder } from "./componentBuilder.js";
import { Tooltips } from "./tooltips.js";
import { ImageRenderAll } from "./imageRenderAll.js";

function build() {
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
  const imgtp = new Tooltips();
  const imgra = new ImageRenderAll();

  /**
   *  disable ctrl key
   *
   *
   */
  document.body.addEventListener("keydown", function (keyPressev) {
    if (keyPressev.ctrlKey) {
      // keyPressev.preventDefault();
    }
  });
  document.addEventListener("contextmenu", (e) => {
    // e.preventDefault();
  });
  /**
   *  headerFile double click
   *
   *
   */
  el.headerFile.set((_) => {
    _.textContent = stoV2.getProjectName();
    _.addEventListener("dblclick", () => {
      const parent = _.parentNode;
      const newEl = er.component({
        element: "header-file-input-input",
        class: ["btn-btn", "btn-max", "text-white", "bg-dark", "text-center"],
        build: (_input) => {
          _input.type = "text";
          _input.value = _.textContent;
          _input.onkeydown = (ev) => {
            if (ev.code === "Enter") {
              let value = _input.value;
              parent.replaceChild(_, _input);
              _.textContent = value;
              stoV2.val(value).storeToProjectName();
              CustomAlert({
                text: "Project name changed to " + value,
                speed: 30,
              });
            }
          };
          _input.addEventListener("focusout", (ev) => {
            let value = _input.value;
            parent.replaceChild(_, _input);
            if (stoV2.getProjectName() !== value) {
              _.textContent = value;
              stoV2.val(value).storeToProjectName();
              CustomAlert({
                text: "Project name changed",
                speed: 30,
              });
            }
          });
        },
      });
      parent.replaceChild(newEl.target, _);
      newEl.target.select();
      newEl.target.focus();
    });
  });
  /**
   *  pageLayer
   */
  pr.setHost({
    _btn_: el.layerInnerPageBtn.target,
    _layer_: el.layerInnerPageList.target,
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
    _htmltitle_: el.htmlInnerTitle.target,
    _layerlabel_: el.layerInnerLayerLabel.target,
    _canvasbtn_: el.layerInnerCanvasButton.target,
    _layer_: el.layerInnerLayerList.target,
    _canvaslayer_: el.htmlLayer.target,
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
    _layer_: el.htmlLayer.target,
    _htmlTitle_: el.htmlInnerTitle.target,
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
    _layer_: el.optionInnerLayer.target,
  });
  be.setWorker(() => {
    cb.updateBuilder();
  });
  be.build();
  /**
   * Component Builder
   */
  cb.setHost({
    _layer_: el.optionInnerLayer.target,
  });
  cb.build();
  cb.updateBuilder();
  cb.setWorker(() => {
    hr.render();
    lr.render();
  });
  /**
   * render All
   *
   *
   */
  imgra.setHost({
    _scene_: el.renderAllScene.target,
    _controller_: el.renderAllController.target,
    _list_: el.renderAllList.target,
  });
  imgra.setEngine(htmlToImage);
  imgra.build();
  /**
   * imageRender
   *
   *
   */
  imr
    .setHost({
      _html_: el.htmlInnerCanvas.target,
      _image_: el.renderInnerCanvas.target,
      _imageScene_: el.renderCanvas.target,
      _controller_: el.renderController.target,
    })
    .setEngine(htmlToImage)
    .build();
  /**
   * controllerCanvasScrollYButton
   *
   *
   */
  let scrollYIndicator = null;
  el.controllerCanvasScrollYButton.set((_) => {
    const [indi] = er.icon(
      _,
      ["bi", "bi-arrows-expand"],
      true,
      "N",
      true,
      false
    );
    scrollYIndicator = indi;
    let btnToggle = false;
    _.onclick = () => {
      btnToggle = !btnToggle;
      if (btnToggle) {
        hcs.verticalMoveOn();
        imcs.verticalMoveOn();
        indi.textContent = "Y";
      } else {
        hcs.verticalMoveOff();
        imcs.verticalMoveOff();
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
  el.controllerCanvasScrollXButton.set((_) => {
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
        imcs.horizontalMoveOn();
        indi.textContent = "X";
      } else {
        hcs.horizontalMoveOff();
        imcs.horizontalMoveOff();
        indi.textContent = "N";
      }
    };
  });
  /**
   * File save
   *
   *
   */
  el.headerSaveBtn.set((_) => {
    _.onclick = () => {
      let stringData = JSON.stringify(cps.getPageLayerData());
      let parseData = JSON.parse(stringData);
      updateCopraPageData(parseData);
      CustomAlert({ text: "App Saved...!", speed: 30 });
    };
  });

  /**
   *  htmlcanvasScroller
   *
   *
   */
  hcs
    .setHost({
      _canvas_: el.htmlInnerCenter.target,
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
      _canvas_: el.renderInnerCenter.target,
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
  el.controllerCanvasCenterButton.set((_) => {
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
      _btn_: el.controllerRatioBtn.target,
      _box_: el.controllerRatioBox.target,
    })
    .setBtnIconStyle(["bi", "bi-aspect-ratio-fill"], "Ratio")
    .setListIconStyle(["bi", "bi-star-fill"])
    .offset([0, 15])
    .set([
      {
        listName: "aspect-1:1",
        fun: () => {
          changeCanvasAspectRatio("aspect-1:1", hcs);
          CustomAlert({ text: "Changed to aspect-1:1" });
        },
      },
      {
        listName: "aspect-9:16",
        fun: () => {
          changeCanvasAspectRatio("aspect-9:16", hcs);
          CustomAlert({ text: "Changed to aspect-9:16" });
        },
      },
      {
        listName: "aspect-16:9",
        fun: () => {
          changeCanvasAspectRatio("aspect-16:9", hcs);
          CustomAlert({ text: "Changed to aspect-16:9" });
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
      _btn_: el.controllerScalePercent.target,
      _box_: el.controllerScalePercentBox.target,
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
   * tooltips for img btn
   *
   *
   */

  imgtp
    .setHost({
      _btn_: el.controllerEditBtn.target,
      _box_: el.controllerEditBox.target,
    })
    .setBtnIconStyle(["bi", "bi-list"], "Image")
    .setListIconStyle(["bi", "bi-list"])
    .offset([60, 15])
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
        listName: "Render All",
        fun: () => {
          imgra.show();
          imgra.render();
        },
      },
    ])
    .build();
  /**
   * tooltips for File btn
   *
   *
   */
  function exportCopraFile() {
    el.globalDownloadLink.set((_) => {
      _.value = "";
      let stringData = JSON.stringify(cps.getPageLayerData());
      let parseData = JSON.parse(stringData);
      updateCopraPageData(parseData).then(() => {
        getCopraImageData().then((imgres) => {
          const ImageData = imgres;
          getCopraPageData().then((datares) => {
            const PageLayerData = datares;
            const MY_JSON_FILE = {
              projectName: stoV2.getProjectName(),
              aspect: stoV2.getCanvasAspect(),
              backgroundColor: stoV2.getCanvasBackground(),
              imageData: ImageData,
              pageLayerData: PageLayerData,
            };
            var dataStr =
              "data:text/json;charset=utf-8," +
              encodeURIComponent(JSON.stringify(MY_JSON_FILE));
            _.href = dataStr;
            _.download = stoV2.getProjectName() + ".cop.json";
            CustomAlert({
              text: "Working on download...",
              callback: () => {
                _.click();
              },
              icon: ["bi", "bi-arrow-right-short"],
            });
          });
        });
      });
    });
  }
  function readCopraFile() {
    const fileInput = el.globalFileInput.target;
    fileInput.value = "";
    fileInput.click();

    fileInput.addEventListener("change", function (ev) {
      var fr = new FileReader();
      fr.onload = () => {
        let acceptType = "application/json";
        let dotCop = this.files[0].name.split(".cop");
        if (this.files[0].type === acceptType && dotCop.length >= 2) {
          try {
            let res = JSON.parse(fr.result);
            stoV2.val(res.projectName).storeToProjectName();
            stoV2.val(res.backgroundColor).storeToCanvasBackground();
            stoV2.val(res.aspect).storeToCanvasAspect();
            updateCopraImageData(res.imageData).then((imgres) => {
              updateCopraPageData(res.pageLayerData).then((layerres) => {
                CustomAlert({
                  text: "loading...",
                  callback: () => {
                    if (res.imageData.length !== 0) {
                      el.htmlImage.target.style.backgroundImage = `url(${res.imageData})`;
                    }
                    el.headerFile.target.textContent = res.projectName;
                    be.imageUploaded();
                    cps.setPageLayerData(res.pageLayerData);
                    pr.render();
                    lr.render();
                    hr.render();
                  },
                  speed: 20,
                  icon: ["bi", "bi-arrow-right-short"],
                });
              });
            });
          } catch (error) {
            CustomAlert({ text: "File Error!" });
          }
        } else {
          CustomAlert({ text: "File Error: Not copra file format" });
        }
      };

      fr.readAsText(this.files[0]);
    });
  }
  etp
    .setHost({
      _btn_: el.controllerFileBtn.target,
      _box_: el.controllerFileBox.target,
    })
    .setBtnIconStyle(["bi", "bi-list"], "File")
    .setListIconStyle(["bi", "bi-list"])
    .offset([65, 15])
    .set([
      {
        listName: "Save",
        fun: () => {
          let stringData = JSON.stringify(cps.getPageLayerData());
          let parseData = JSON.parse(stringData);
          updateCopraPageData(parseData);
          CustomAlert({ text: "App saved!" });
        },
      },
      {
        listName: "Save as cop file",
        fun: () => {
          exportCopraFile();
        },
      },
      {
        listName: "Import cop file",
        fun: () => {
          readCopraFile();
        },
      },
      {
        listName: "Reset App",
        fun: () => {
          cps.resetApp();
          const path =
            window.location.protocol +
            "//" +
            window.location.hostname +
            ":" +
            window.location.port +
            "/";
          CustomAlert({
            text: "Reseting...",
            callback: () => {
              window.location.href = path;
            },
            speed: 30,
            icon: ["bi", "bi-arrow-right-short"],
          });
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
          CustomAlert({
            text: "Exiting...",
            callback: () => {
              window.location.href = path;
            },
            speed: 30,
            icon: ["bi", "bi-arrow-right-short"],
          });
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
      er.toComponent(el.headerNav),
      er.toComponent(el.controller),
      er.toComponent(el.layer),
      er.toComponent(el.option),
      er.toComponent(el.renderCanvas),
      er.toComponent(el.renderAllScene),
      er.toComponent(el.htmlCanvas),
      er.toComponent(el.controllerRatioBox),
      er.toComponent(el.controllerFileBox),
      er.toComponent(el.controllerEditBox),
      er.toComponent(el.controllerScalePercentBox),
      er.toComponent(el.globalDownloadLink),
      er.toComponent(el.globalFileInput),
    ],
  });
  return Component;
}

export const coreComponent = build;
