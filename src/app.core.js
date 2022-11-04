import {
  createElement,
  getElementList,
} from "../packages/automa/src/automa.js";
import { pick } from "./app.build.con.js";
import { stoV2 } from "./state/storage.js";
import { cps } from "./state/state.js";
import { htmlToImage } from "../packages/htmlToImage/index.js";
import { CanvasScaler } from "./canvasScaler.js";
import { PageListRender } from "./pageListRender.js";
import { LayerRander } from "./layerRender.js";
import { htmlRender } from "./htmlRender.js";
import { BackgroundEngine } from "./backgroundEngine.js";
import { ComponentBuilder } from "./componentBuilder.js";
import { changeCanvasAspectRatio } from "./canvasAspectRatio.js";
import { Tooltips } from "./tooltips.js";
import { ImageRender } from "./imageRender.js";
import { ImageRenderAll } from "./imageRenderAll.js";
import { getCopraImageData, getCopraPageData, updateCopraImageData, updateCopraPageData } from "./localDatabase/db.js";
import { CustomAlert } from "./alert.js";
import { pickerInit } from "./colorData.js";

function build() {
  const hcs = new CanvasScaler();
  const pr = new PageListRender();
  const lr = new LayerRander();
  const hr = new htmlRender();
  const be = new BackgroundEngine();
  const cb = new ComponentBuilder();
  const imcs = new CanvasScaler();
  const imr = new ImageRender();
  const rtp = new Tooltips();
  const stp = new Tooltips();
  const etp = new Tooltips();
  const imgtp = new Tooltips();
  const imgra = new ImageRenderAll();

  pickerInit();

  /**
   *  disable ctrl key
   *
   *
   */
  const el = getElementList();

  document.body.addEventListener("keydown", function (keyPressev) {
    if (keyPressev.ctrlKey && keyPressev.code === "KeyS") {
      keyPressev.preventDefault();
    }
  });
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
  /**
   *  headerFile double click
   *
   *
   */
  el.headerFile.modify((el) => {
    el.textContent = stoV2.getProjectName();
    el.addEventListener("dblclick", () => {
      const parent = el.parentElement;
      const newEl = createElement({
        el: "header-file-input",
        class: [
          "form-control",
          "bg-dark",
          "fs-12",
          "text-center",
          "text-light",
          "outline-none",
          "fw-bold",
        ],
        build: (elinput) => {
          elinput.type = "text";
          elinput.value = el.textContent;
          elinput.onkeydown = (ev) => {
            if (ev.code === "Enter") {
              let value = elinput.value;
              el.textContent = value;
              parent.replaceChild(el, elinput);
              stoV2.val(value).storeToProjectName();
            }
          };
        },
      });
      parent.replaceChild(newEl.target, el);
      newEl.target.select();
      newEl.target.focus();
    });
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
    .listen(() => {
      el.iconPercentLabel.text(
        hcs.formatPerscent(String(hcs.getScale() * 100)) + "%"
      );
    })
    .build();
  /**
   *  pageLayer
   */
  pr.listen(() => {
    hr.updateTitle();
    hr.render();
    lr.render();
    cb.refreshBuilder();
  });
  /**
   * layerController
   *
   */
  lr.listen(() => {
    hr.render();
    cb.refreshBuilder();
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
  hr.listen(() => {
    lr.render();
    cb.refreshBuilder();
  });
  hr.build();
  hr.render();
  /**
   * background engine
   *
   *
   */
  be.listen(() => {
    // cb.updateBuilder();
  });
  /**
   * Component Builder
   */
  // cb.setHost({
  //   _layer_: el.optionInnerLayer.target,
  // });
  // cb.build();
  // cb.updateBuilder();
  cb.listen(() => {
    hr.render();
    lr.render();
  });
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
    .listen(() => {
      el.iconPercentLabel.text(
        imcs.formatPerscent(String(imcs.getScale() * 100)) + "%"
      );
    })
    .build();

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
   * File save
   *
   *
   */
  el.headerSaveBtn.modify((_) => {
    _.onclick = () => {
      let stringData = JSON.stringify(cps.getPageLayerData());
      let parseData = JSON.parse(stringData);
      updateCopraPageData(parseData);
      CustomAlert({ text: "App Saved...!", speed: 30 });
    };
  });
  /**
   *  canvas center button
   *
   *
   *
   */
  function changeZoomScale(value) {
    if (stoV2.getCanvasMode() === "htmlmode") {
      el.iconPercentLabel.text(value * 100 + "%");
      hcs.scale = value;
      hcs.setCanvasPostion(hcs.defalutX, hcs.defaultY);
      hcs.changeCanvas();
    } else {
      el.iconPercentLabel.text(value * 100 + "%");
      imcs.scale = value;
      imcs.setCanvasPostion(imcs.defalutX, imcs.defaultY);
      imcs.changeCanvas();
    }
  }
  el.controllerCanvasCenterButton.modify((_) => {
    changeCanvasAspectRatio(stoV2.getCanvasAspect());
    _.onclick = () => {
      changeZoomScale(1);
    };
  });
  /**
   * tooltips for scaler percent btn
   *
   *
   */
  stp
    .setHost({
      _btn_: el.controllerScalePercentBtn.target,
      _box_: el.controllerScalePercentBox.target,
    })
    .setListIconStyle(["bi", "bi-zoom-in"])
    .offset([-45, 15])
    .set([
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
    ])
    .build();
  /**
   * controllerCanvasScrollYButton
   *
   *
   */
  el.controllerCanvasScrollYButton.modify((_) => {
    let btnToggle = false;
    _.onclick = () => {
      btnToggle = !btnToggle;
      if (btnToggle) {
        hcs.verticalMoveOn();
        //  imcs.verticalMoveOn();
        pick("iconScrollY").text("Y");
      } else {
        hcs.verticalMoveOff();
        //  imcs.verticalMoveOff();
        pick("iconScrollY").text("N");
      }
    };
  });
  /**
   * controllerCanvasScrollXButton
   *
   *
   */
  el.controllerCanvasScrollXButton.modify((_) => {
    let btnToggle = false;
    _.onclick = () => {
      btnToggle = !btnToggle;
      if (btnToggle) {
        hcs.horizontalMoveOn();
        //  imcs.horizontalMoveOn();
        pick("iconScrollX").text("X");
      } else {
        hcs.horizontalMoveOff();
        //  imcs.horizontalMoveOff();
        pick("iconScrollX").text("N");
      }
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
   * tooltips for img btn
   *
   *
   */
  imgtp
    .setHost({
      _btn_: el.controllerImageBtn.target,
      _box_: el.controllerImageBox.target,
    })
    .setListIconStyle(["bi", "bi-list"])
    .offset([60, 15])
    .set([
      {
        listName: "Render",
        fun: () => {
          stoV2.val("imagemode").storeToCanvasMode();
          imr.show();
          changeZoomScale(1);
          lr.layerRefresh();
          lr.render();
          hr.render();
          imr.render();
        },
      },
      {
        listName: "Render All",
        fun: () => {
          let stringData = JSON.stringify(cps.getPageLayerData());
          let parseData = JSON.parse(stringData);
          updateCopraPageData(parseData);
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
    el.globalDownloadLink.modify((_) => {
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
      pick("iconScrollY").text("Y");
      hcs.verticalMoveOn();
      imcs.verticalMoveOn();
    }
    // scroll left and right
    if (ev.shiftKey && ev.code === "KeyA") {
      pick("iconScrollX").text("X");
      hcs.horizontalMoveOn();
      imcs.horizontalMoveOn();
    }
  });

  window.addEventListener("keyup", (ev) => {
    if (ev.shiftKey) {
      pick("iconScrollY").text("N");
      pick("iconScrollX").text("N");
      hcs.verticalMoveOff();
      hcs.horizontalMoveOff();
      imcs.verticalMoveOff();
      imcs.horizontalMoveOff();
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
