import { createElement } from "../packages/automa/src/automa.js";

export function addIcon(props) {
  props.target.innerHTML = "";

  if (props.iconstart) {
    const iconStart = createElement({
      el: "icony-i",
      class: [...props.iconstart],
      build: (el, mod) => {
        mod.style({
          width: "14px",
          height: "max-content",
        });
      },
    });
    if (props.iconStartExpand === true) {
      iconStart.class(["mx-1"]);
    }
    if (props.iconStartMuted === true) {
      iconStart.class(["text-muted"]);
    }

    props.target.appendChild(iconStart.target);
  }

  let textLabel = createElement({
    el: "text-label-div",
    class: ["mx-1", "text-start", "flex-fill", "mx-1"],
    text: props.text,
    build: (el, mod) => {
      mod.style({
        height: "max-content",
      });
    },
  });

  if (props.textCenter === true) {
    textLabel.class(["text-center"]);
  }

  if (props.textBold === true) {
    textLabel.class(["fw-bold"]);
  }

  if (props.text) {
    textLabel.text(props.text);
    props.target.appendChild(textLabel.target);
  }

  if (props.dropdown) {
    const dropDown = createElement({
      el: "drop-icon-i",
      class: ["bi", "bi-chevron-down"],
    });
    props.target.appendChild(dropDown.target);
  }

  if (props.text) {
    return [textLabel];
  }
}

export function iconList(arr) {
  const list = arr.map((i) => {
    return createElement({
      el: i.el,
      build: (_) => {
        if (i.icon) {
          addIcon({
            target: _,
            iconstart: ["bi", i.icon],
            iconStartExpand: true,
          });
        }
        if (i.click) {
          _.onclick = i.click;
        }
      },
    });
  });

  return list;
}
