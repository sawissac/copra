import { coreComponent } from "./app.core.js";
import { root } from "../packages/automa/src/automa.js";
import { cps } from "./state/state.js";
import { getCopraPageData } from "./localDatabase/db.js";

getCopraPageData().then(async (data) => {
  await new Promise((resolve) => {
    cps.setPageLayerData(data);
    setTimeout(resolve, 1);
  });
  await new Promise((resolve) => {
    root({ child: coreComponent(), clean: false });
    setTimeout(resolve, 1);
  });
});
