export const canvasAspectRatio = [
    {name:"aspect-1:1",value: "aspect-1-1"},
    {name:"aspect-9:16",value: "aspect-9-16"},
]

export function aspectChecker(aspect,rule) {
    let aspList = [...aspect];
    let aspListRule = rule.map(i=>i.value);
    let filterList = "";
    for (let i of aspList) {
        if (aspListRule.includes(i)) {
            filterList = i;
        }
    }
    return filterList;
}

export function preSetupAspect(optionValue,htmlCanvasScroller,render = false){
    if(optionValue === "aspect-1:1"){
        htmlCanvasScroller.setCanvasPostion(htmlCanvasScroller.defaultX,htmlCanvasScroller.defaultY);
        htmlCanvasScroller.canvasReset();
    }
    if(optionValue === "aspect-9:16"){
        htmlCanvasScroller.setCanvasPostion(htmlCanvasScroller.defaultX,-50);
        htmlCanvasScroller.canvasReset();
    }
}