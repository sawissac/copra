import { createElement } from "../packages/automa/src/automa";
import { addIcon } from "./iconEngine";

export const moveBtnStyle = ["btn", "btn-sm", "text-center", "d-flex", "fs-12"];

export const moveBtn = (props) => {
  return [
    createElement({
      el: "up-layer-btn-div",
      class: [...moveBtnStyle, "justify-content-center", "btn-primary", "my-1"],
      build: (_) => {
        addIcon({
          target: _,
          iconstart: ["bi", "bi-chevron-compact-up"],
        });
        _.onclick = props.upAction;
      },
    }),
    createElement({
      el: "label-layer-btn-div",
      class: [
        ...moveBtnStyle,
        "justify-content-center",
        "align-items-center",
        "border-0",
        "text-dark",
      ],
      text: props.layerName,
      build: (el, mod) => {
        mod.style({
          backgroundColor: "transparent",
        });
      },
    }),
    createElement({
      el: "down-layer-btn-div",
      class: [...moveBtnStyle, "justify-content-center", "btn-primary", "my-1"],
      build: (_) => {
        addIcon({
          target: _,
          iconstart: ["bi", "bi-chevron-compact-down"],
        });
        _.onclick = props.downAction;
      },
    }),
  ];
};

export const noneMoveBtn = (props) => {
  return [
    createElement({
      el: "up-layer-btn-div",
      class: ["flex-fill", "py-1", "text-primary"],
      text: props.layerName,
    }),
  ];
};

export const moveCancelBtn = (props) => {
  return createElement({
    el: "move-layer-cancel-div",
    class: [
      ...moveBtnStyle,
      "justify-content-center",
      "btn-primary",
      "my-1",
      "py-2",
    ],
    text: "CANCEL",
    build: (_) => {
      _.onclick = props.action;
    },
  });
};

export const layerBtnStyle = [
  "btn",
  "btn-sm",
  "btn-light",
  "d-flex",
  "fs-12",
  "my-1",
  "py-2",
];
