import {
  config,
  pick as p,
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

export const pick = p;
