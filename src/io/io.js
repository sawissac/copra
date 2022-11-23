import { pick } from "../app.build.init";
import { CustomAlert } from "../alert";
import {
  getCopraImageData,
  getCopraPageData,
  updateCopraImageData,
  updateCopraPageData,
} from "../localDatabase/db";
import { cps } from "../state/copra.state.global";
import { stoV2 } from "../state/storage";

const copExtension = ".cop.json";
const fileAcceptType = "application/json";
const headerData = "data:text/json;charset=utf-8,";

const prepareJsonConversion = (json) => {
  return headerData.concat(encodeURIComponent(JSON.stringify(json)));
};

const validateFile = (file) => {
  let extension = file.name.split(".cop");
  if (file.type !== fileAcceptType) return;
  if (extension.length < 2) return;
  return true;
};

const updateEditor = async (result, callback) => {
  let res = JSON.parse(result);
  stoV2.val(res.projectName).storeToProjectName();
  stoV2.val(res.backgroundColor).storeToCanvasBackground();
  await updateCopraImageData(res.imageData);
  await updateCopraPageData(res.pageLayerData);
  CustomAlert({
    text: "loading...",
    callback: () => {
      if (res.imageData.length !== 0) {
        pick("htmlImage").style({
          backgroundImage: `url(${res.imageData})`,
        });
      }
      pick("headerFile").text(res.projectName);
      cps.setPageLayerData(res.pageLayerData);
      callback();
    },
    speed: 20,
    icon: ["bi", "bi-arrow-right-short"],
  });
};

const getEditorData = async () => {
  const imageData = await getCopraImageData();
  const pageData = await getCopraPageData();
  const jsonObj = {
    projectName: stoV2.getProjectName(),
    backgroundColor: stoV2.getCanvasBackground(),
    imageData: imageData,
    pageLayerData: pageData,
  };
  return jsonObj;
};

export const exportAsCopFile = () => {
  pick("globalDownloadLink").modify(async (el) => {
    el.value = "";
    await updateCopraPageData(cps.getPageLayerData());
    const editorData = await getEditorData();
    const jsonFile = prepareJsonConversion(editorData);
    el.href = jsonFile;
    el.download = stoV2.getProjectName().concat(copExtension);
    CustomAlert({
      text: "Working on download...",
      callback: () => {
        el.click();
      },
      icon: ["bi", "bi-arrow-right-short"],
    });
  });
};

export const readCopFile = (callback,success) => {
  pick("globalFileInput").modify((el, mod) => {
    el.value = "";
    el.click();
    mod.action("change", function () {
      const fr = new FileReader();
      let file = this.files[0];
      fr.onload = () => {
        if (validateFile(file)) {
          updateEditor(fr.result, callback); 
          success();
        } else {
          CustomAlert({ text: "File Error: Not copra file format" });
        }
      };
      fr.readAsText(file);
    });
  });
};

export const saveData = () => {
  let stringData = JSON.stringify(cps.getPageLayerData());
  let parseData = JSON.parse(stringData);
  updateCopraPageData(parseData);
  CustomAlert({ text: "App saved!" });
};
