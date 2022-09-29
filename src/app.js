import { coreComponent } from "./app.core.js";

/**
 *  App
 *   -> CoreComponent
 */


getCopraPageData().then(async data=>{
    await new Promise(resolve=>{
        cps.setPageLayerData(data);
        setTimeout(resolve,1);
    });
    await new Promise(resolve=>{
        am.root({child: coreComponent()});
        setTimeout(resolve,1);
    });
});

