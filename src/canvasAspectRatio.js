import { stoV2 } from "./state/storage.js";
import { pick } from "./app.build.init.js";
import { updateActiveCanvasLayer } from "./state/canvas.state.api.js";
import { cps } from "./state/copra.state.global.js";

export const canvasAspectRatio = [
  { name: "aspect-1:1", value: "aspect-1-1" },
  { name: "aspect-9:16", value: "aspect-9-16" },
  { name: "aspect-16:9", value: "aspect-16-9" },
];

export function aspectChecker(aspect, rule) {
  let aspList = [...aspect];
  let aspListRule = rule.map((i) => i.value);
  let filterList = "";
  for (let i of aspList) {
    if (aspListRule.includes(i)) {
      filterList = i;
      break;
    }
  }
  return filterList;
}

export function changeHtmlCanvasAspectRatio(aspectName) {
  pick("htmlInnerCanvas").modify((_html) => {
    let _old = aspectChecker(_html.classList, canvasAspectRatio);
    _html.classList.replace(_old, aspectName.replace(":", "-"));
  });
}

export function saveAspectDataOfActivePage(aspect){
  updateActiveCanvasLayer(cps.getPageLayerData(), {
    aspectRatio: aspect,
  });
}


export function isHtmlMode() {
  return stoV2.getCanvasMode() === "htmlmode";
}
