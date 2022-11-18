import {
  config,
  pick as p,
  regis,
} from "../packages/automa/src/automa.js";
import { DEFINE, ARRANGE } from "./app.build.js";
import { CLASS1, CLASS2 } from "./app.class.js";

import { addIcon as ie} from "./iconEngine.js";

config({
  class1: CLASS1,
  class2: CLASS2,
  define: DEFINE,
  arrange: ARRANGE,
});

export const addIcon = ie;

/**@option */
p("optionInnerLabel").modify((el, mod) => {
  addIcon({
    target: el,
    text: "Option",
    textBold: true,
  });
});

/** @htmlcanvas */


/**@globaldownload */

p("globalFileInput").modify((el) => {
  el.type = "file";
});

export const pick = p;
