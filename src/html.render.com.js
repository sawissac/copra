import {
  createElement,
  parseToElement,
  setElement,
  setInstruction,
} from "../packages/automa/src/automa.js";

export function emptyComponent(props) {
  return createElement({ 
    el: "com-empty-div",
    class: [props.isHighlight === true ? "com-highlight" : "com-not-highlight"],
    build: (_,mod) => {
      mod.style({
        color: props.component.textColor,
        height: props.component.height + "px",
        fontSize: "16px",
        fontWeight: "bold"
      })
    },
  });
}

export function textComponent(props,px,shadow) {
  return createElement({ 
    el: "com-empty-div",
    class: [props.isHighlight === true ? "com-highlight" : "com-not-highlight"],
    text: props.component.text.length > 0 ? props.component.text : "",
    build: (_,mod) => {
      mod.style({
        color: props.component.textColor,
        height: props.component.height + "px",
        textShadow: shadow ? "0 2px 2px rgba(0, 0, 0, 30%)" : "" ,
        fontWeight: "bold",
        fontSize: px + "px"
      })
    },
  });
}

export function lineComponent(props) {
  return createElement({
    el: "com-line-div",
    class: [props.isHighlight === true ? "com-highlight" : "com-not-highlight"],
    children: [
      createElement({
        el: "inner-div",
        text: props.component.text,
        build: (_) => {
          _.style.color = props.component.textColor;
        },
      }),
    ],
  });
}

export function footerComponent(props) {
  return createElement({
    el: "com-footer-div",
    class: [props.isHighlight === true ? "com-highlight" : "com-not-highlight"],
    children: [
      createElement({
        el: "inner-div",
      }),
    ],
  });
}

export function headerComponent(props) {
  let element = parseToElement([
    "com-header-div",
    "inner-div",
    "option-div",
    "circle-div",
    "circle2-div",
    "circle3-div",
    "label-div",
  ]);

  setInstruction(element, [
    "option = circle , circle2 , circle3",
    "inner = option , label",
    "comHeader = inner",
  ]);

  let pick = setElement(element);

  pick("comHeader").class([
    props.isHighlight === true ? "com-highlight" : "com-not-highlight",
  ]);

  pick("label")
    .text(props.component.text.length > 0 ? props.component.text : "")
    .style({
      color: props.component.textColor,
    });

  return pick("comHeader");
}
