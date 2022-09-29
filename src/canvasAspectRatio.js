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

export function changeCanvasAspectRatio(aspectName = "") {
  am.element.htmlInnerCanvas.modify((_html) => {
    let _old = aspectChecker(_html.classList, canvasAspectRatio);
    _html.classList.replace(_old, aspectName.replace(":", "-"));
  });
  stoV2.val(aspectName).storeToCanvasAspect();
}
