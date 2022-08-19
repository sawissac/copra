import { ElementList } from "./elementList.js";
import { ElementListRender } from "./elementListRender.js";
import { CanvasScroller } from "./canvasScroller.js";
import { GlobalState } from "./globalState.js";
import {
  aspectChecker,
  canvasAspectRatio,
  preSetupAspect,
} from "./canvasAspectRatio.js";
import { LayerRander } from "./layerRender.js";
import { htmlRender } from "./htmlRender.js";
import { PageListRender } from "./pageListRender.js";
import { BackgroundEngine, Colors } from "./backgroundEngine.js";
import { buildUi } from "./buildComponent.js";
import { Storage } from "./storage.js";
import { ComponentBuilder } from "./componentBuilder.js";
import { CanvasScreenRender } from "./render.js";

const er = new ElementListRender(ElementList);
const hcs = new CanvasScroller();
const rcs = new CanvasScroller();
const gs = new GlobalState();
const lr = new LayerRander();
const hr = new htmlRender();
const pr = new PageListRender();
const be = new BackgroundEngine();
const cb = new ComponentBuilder();
const sto = new Storage();
const csr = new CanvasScreenRender();

gs.store({
  shiftState: false,
  scaleIndicator: null,
  aspectIndicator: null,
  scrollYIndicator: null,
  type: "",
  pageData: [
    {
      canvas: {
        layerName: "New Canvas",
        isHighlight: true,
        data: [],
      },
    },
  ],
});

// window event

window.addEventListener("keydown", (ev) => {
  // Reset canvas
  if (ev.shiftKey && ev.code === "KeyC") {
    let optionValue = gs.state.aspectIndicator.textContent;
    preSetupAspect(optionValue, hcs);
    preSetupAspect(optionValue, rcs);
  }
  // scroll up and down
  if (ev.shiftKey && ev.code === "KeyS") {
    gs.state.shiftState = true;
  }
});
window.addEventListener("keyup", () => {
  gs.state.shiftState = false;
  if (!gs.state.shiftState) {
    gs.state.scrollYIndicator.textContent = "n";
  }
});

/**
 *  CoreComponent
 */

const Component = document.createElement("div");
Component.classList.add("core-component");

er.parseComponent();
buildUi(er);

csr.setHtml_RenderCanvas(
  er.element.htmlInnerCanvas.target,
  er.element.renderInnerCanvas.target
);
csr.setCanvasParent(er.element.renderInnerCanvas.target);
csr.engine(htmlToImage);
csr.addController(er.element.renderController.target);
csr.setCanvasScene(er.element.renderCanvas.target);

er.element.controllerOptions.set((_button) => {
  er.icon(_button, ["bi", "bi-list"], true, "Options", true, true);
  _button.type = "button";

  let _renderBtn = er.component({
    element: "render-btn-div",
    text: "render",
    style: ["btn-btn", "ts-12", "btn-secoundary", "j-left", "br-5"],
  });
  let buttonToggle = false;
  er.element.controllerOptionsBox.set((_tooltip) => {
    const popperInstance = Popper.createPopper(_button, _tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [50, 5],
          },
          placement: "bottom-start",
        },
      ],
    });
    _tooltip.appendChild(_renderBtn.target);

    _button.onclick = () => {
      buttonToggle = !buttonToggle;
      if (buttonToggle) {
        popperInstance.update();
        _tooltip.style.display = "block";
      } else {
        popperInstance.update();
        _tooltip.style.display = "none";
      }
    };
  });

  _renderBtn.target.onclick = () => {
    er.element.renderCanvas.set((_) => {
      _.style.display = "block";
    });
    er.element.renderInnerCanvas.target.innerHTML = "";
    er.element.renderInnerCanvas.set((_render) => {
      er.element.htmlInnerCanvas.set((_html) => {
        let aspect = aspectChecker(_html.classList, canvasAspectRatio);
        _render.classList.add(aspect);
      });
    });
    csr.render();
  };
});

er.element.headerLogo.set((_) => {
  _.textContent = "CoPra";
  _.type = "button";
});
er.element.headerFile.set((_) => {
  er.icon(_, ["bi", "bi-file-earmark-fill"], true, "New File", true);
});
er.element.headerVersion.set((_) => {
  _.textContent = "1.4.0v";
  _.type = "button";
});
er.element.htmlInnerCanvas.set((_) => {
  _.classList.add("aspect-1-1");
  _.style.background = sto.getStorageValue("canvasbackground");
});
er.element.htmlInnerTitle.set((_) => {
  _.textContent = "New Canvas";
  lr.setHtmlTitle(_);
});
er.element.htmlLayer.set((_) => {});
er.element.htmlImage.set((_) => {
  be.setImageTarget(_);
});
er.element.optionInnerLabel.set((_) => {
  er.icon(_, ["bi", "bi-gear-fill"], true, "Option", true);
});
er.element.htmlLayer.set((_) => {
  hr.setHtmlLayer(_);
  hr.renderHtml();
});
pr.worker(() => {
  lr.reRenderLayer();
  hr.renderHtml();
});
lr.worker(() => {
  pr.reRenderLayer();
  hr.reRenderHtml();
  let type = sto.getStorageValue("type");
  if (type === "canvas") {
    be.show();
    cb.hide();
  } else {
    be.hide();
    cb.show();
    cb.updateLayerOption();
  }
});
hr.worker(() => {
  lr.reRenderLayer();
  let type = sto.getStorageValue("type");
  if (type === "canvas") {
    be.show();
    cb.hide();
  } else {
    be.hide();
    cb.show();
    cb.updateLayerOption();
  }
});
hcs.worker(() => {
  let scaleText = hcs.scalePercent + "%";
  hcs.shiftState = gs.state.shiftState;
  if (gs.state.shiftState && hcs.direction === "up") {
    gs.state.scrollYIndicator.textContent = "a-t";
  }
  if (gs.state.shiftState && hcs.direction === "down") {
    gs.state.scrollYIndicator.textContent = "a-b";
  }
  gs.state.scaleIndicator.textContent = scaleText;
});
be.worker((color) => {
  er.element.htmlInnerCanvas.set((_) => {
    _.style.background = color;
  });
});
cb.worker(() => {
  hr.reRenderHtml();
  lr.reRenderLayer();
  pr.reRenderLayer();
});
rcs.worker(() => {
  let scaleText = rcs.scalePercent + "%";
  rcs.shiftState = gs.state.shiftState;
  if (gs.state.shiftState && rcs.direction === "up") {
    gs.state.scrollYIndicator.textContent = "a-t";
  }
  if (gs.state.shiftState && rcs.direction === "down") {
    gs.state.scrollYIndicator.textContent = "a-b";
  }
  gs.state.scaleIndicator.textContent = scaleText;
});

er.element.htmlInnerCenter.set((_) => {
  hcs.setCanvas(_);
  hcs.setMinMax(50, 250);
  hcs.setScalePercentMiddle();
  hcs.run();
});
er.element.renderInnerCenter.set((_) => {
  rcs.setCanvas(_);
  rcs.setMinMax(0, 250);
  rcs.setScalePercentMiddle();
  rcs.run();
});

er.element.controllerPercent.set((_) => {
  let scaleText = hcs.scalePercent + "%";
  const [scaleIndicator] = er.icon(_, [], false, scaleText, true, true);
  gs.state.scaleIndicator = scaleIndicator;
});
er.element.controllerSelectBox.set((_button) => {
  const [aspectIndicator] = er.icon(
    _button,
    ["bi", "bi-aspect-ratio-fill"],
    true,
    "aspect-1:1",
    true,
    true
  );
  gs.state.aspectIndicator = aspectIndicator;
  er.element.controllerSelectOptions.set((_tooltip) => {
    const popperInstance = Popper.createPopper(_button, _tooltip, {
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 15],
          },
        },
      ],
    });
    let buttonToggle = false;
    for (let i of canvasAspectRatio) {
      let options = document.createElement("div");
      options.classList.add(
        "btn-btn",
        "ts-12",
        "btn-secoundary",
        "j-left",
        "br-5"
      );
      er.icon(options, ["bi", "bi-star-fill"], true, i.name, true);
      options.onclick = () => {
        er.element.htmlInnerCanvas.set((_html) => {
          let _old = aspectChecker(_html.classList, canvasAspectRatio);
          _html.classList.replace(_old, i.value);
        });
        preSetupAspect(i.name, hcs);
        gs.state.aspectIndicator.textContent = i.name;
        popperInstance.update();
        _tooltip.style.display = "none";
        buttonToggle = false;
      };
      _tooltip.appendChild(options);
    }
    _button.onclick = () => {
      buttonToggle = !buttonToggle;
      if (buttonToggle) {
        popperInstance.update();
        _tooltip.style.display = "block";
      } else {
        popperInstance.update();
        _tooltip.style.display = "none";
      }
    };
  });
});
er.element.controllerCanvasCenterButton.set((_) => {
  er.icon(_, ["bi", "bi-align-center"], true, "", false, false);
  _.onclick = () => {
    let optionValue = gs.state.aspectIndicator.textContent;
    preSetupAspect(optionValue, hcs);
  };
});
er.element.controllerCanvasScrollYButton.set((_) => {
  const [indi] = er.icon(_, ["bi", "bi-arrows-expand"], true, "n", true, false);
  gs.state.scrollYIndicator = indi;
  let btnToggle = false;
  _.onclick = () => {
    btnToggle = !btnToggle;
    gs.state.shiftState = btnToggle;

    if (btnToggle) {
      indi.textContent = "a";
    } else {
      indi.textContent = "n";
    }
  };
});
er.element.layerCanvasButton.set((_) => {
  let [canvasText] = er.icon(
    _,
    ["bi", "bi-bounding-box-circles"],
    true,
    gs.state.pageData[0].canvas.layerName,
    true
  );
  lr.setCanvasBtn(_);
  lr.setCanvasText(canvasText);
});
er.element.layerInnerPageBtn.set((_) => {
  er.icon(_, ["bi", "bi-archive-fill"], true, "Page", true);
  const addBtn = document.createElement("div");
  const deleteBtn = document.createElement("div");
  addBtn.classList.add("mx-4");
  deleteBtn.classList.add("mx-4");
  const block = document.createElement("div");
  block.classList.add("block");
  er.icon(addBtn, ["bi", "bi-plus-lg", "mx-5"], true);
  er.icon(deleteBtn, ["bi", "bi-trash3-fill"], true);
  _.appendChild(block);
  _.appendChild(addBtn);
  _.appendChild(deleteBtn);
  pr.setController(addBtn, deleteBtn);
  pr.setLayer(er.element.layerInnerPageList.target);
  pr.run();
  pr.renderLayer();
});
er.element.layerController.set((_) => {
  const moveBtn = document.createElement("div");
  const addBtn = document.createElement("div");
  const editBtn = document.createElement("div");
  const deleteBtn = document.createElement("div");

  er.icon(moveBtn, ["bi", "bi-arrows-move"], true);
  er.icon(addBtn, ["bi", "bi-plus-lg", "mx-5"], true);
  er.icon(deleteBtn, ["bi", "bi-trash3-fill"], true);
  er.icon(editBtn, ["bi", "bi-pencil-fill"], true);

  _.appendChild(moveBtn);
  _.appendChild(addBtn);
  _.appendChild(editBtn);
  _.appendChild(deleteBtn);

  lr.setController(moveBtn, addBtn, editBtn, deleteBtn);
  lr.setLayer(er.element.layerList.target);
  lr.run();
  const isStorageBuild = sto.getStorageValue("pageData");
  if (isStorageBuild === null) {
    sto.storage("pageData", gs.state.pageData);
    pr.reRenderLayer();
    lr.reRenderLayer();
  } else {
    lr.renderLayer();
  }
});
er.element.optionInnerLayer.set((_) => {
  be.setElementTarget(_);
  be.setColorData(Colors);
  be.setColorBoxWidth((272.02 - 10) / 10);
  be.render();
  be.hide();
  cb.setElementTarget(_);
  cb.render();
  cb.hide();
});
er.element.renderCanvas.set((_) => {
  _.style.display = "none";
});
/**
 * CoreComponent
 *    ->headerNav
 *    ->controller
 *    ->layer
 *    ->options
 *    ->htmlCanvas
 *    ->controllerSelectOptions
 */

Component.appendChild(er.element.headerNav.target);
Component.appendChild(er.element.controller.target);
Component.appendChild(er.element.layer.target);
Component.appendChild(er.element.option.target);
Component.appendChild(er.element.renderCanvas.target);
Component.appendChild(er.element.htmlCanvas.target);
Component.appendChild(er.element.controllerSelectOptions.target);
Component.appendChild(er.element.controllerOptionsBox.target);
export const coreComponent = Component;
