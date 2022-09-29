const DefaultState = [
  {
    canvas: {
      layerName: "Hello World",
      isHighlight: true,
      data: [
        {
          layerName: "Element",
          isHighlight: true,
          component: { type: "Empty", text: "", height: 50, textColor: "" },
        },
      ],
    },
  },
];

const TemplateState = [
  {
    canvas: {
      layerName: "Hello World",
      isHighlight: true,
      data: [
        {
          layerName: "Title",
          isHighlight: false,
          component: {
            type: "Empty",
            text: "Hello World for Copra",
            height: "80",
            textColor: "",
          },
        },
        {
          layerName: "Header",
          isHighlight: false,
          component: {
            type: "Header",
            text: "Hello.txt",
            height: 50,
            textColor: "",
          },
        },
        {
          layerName: "Comment",
          isHighlight: false,
          component: {
            type: "Line",
            text: "// It works like a charm",
            height: 50,
            textColor: "#FDF5DF",
          },
        },
        {
          layerName: "Codeing",
          isHighlight: false,
          component: {
            type: "Line",
            text: "console.log('Hello World\");",
            height: 50,
            textColor: "",
          },
        },
        {
          layerName: "Footer",
          isHighlight: false,
          component: { type: "Footer", text: "", height: 50, textColor: "" },
        },
      ],
    },
  },
];

class CopraState {
  constructor() {
    this.state = {
      pageData: [],
      imageData: [],
    };
  }
  setPageLayerData(state) {
    this.state.pageData = state;
  }
  getPageLayerData() {
    return this.state.pageData;
  }
  updateApp() {
    if (stoV2.isExists("pageData")) {
      localStorage.removeItem("pageData");
    }
    if (stoV2.isExists("imageData")) {
      localStorage.removeItem("imageData");
    }
    updateCopraPageData(DefaultState);
    updateCopraImageData("");
    stoV2.val("#FFFFFF").storeToCanvasBackground();
    stoV2.val("aspect-1:1").storeToCanvasAspect();
    stoV2.val("htmlmode").storeToCanvasMode();
  }
  resetApp(){
    this.updateApp();
    stoV2.val("").storeToProjectName();
  }
  updateUsingTemplate() {
    return new Promise(async (resolve) => {
      await updateCopraPageData(TemplateState);
      stoV2.val("#FDF5DF").storeToCanvasBackground();
      stoV2.val("aspect-1:1").storeToCanvasAspect();
      stoV2.val("htmlmode").storeToCanvasMode();
      resolve("success");
    });
  }
}

const cps = new CopraState();
const Colors =
  "#2d2d2d#FDF5DF#5EBEC4#F92C85#ABF62D#D6A3FB#FECD45#2568FB#A0AECD#A350A3#C1436D#000000#6E6E6E#BCFD4C#1A2238#9DAAF2#FF6A3D#F4DB7D#9CF6FB#E1FCFD#394F8A#4A5FC1#E5B9A8#EAD6CD#490B3D#BD1E51#F1B814#00ABE1#161F6D#00A9D8#0D9EDF#259B9A#F7F7F7#7DA2A9#FFFFFF#A7BC5B#8DA242#3FD2C7#99DDFF#00458B#FB8122#1D2228#E1E2E2#D48166#373A36#E6E2DD#051622#1BA098#DEB992#E40C2B#1D1D2C#F7F4E9#3CBCC3#EBA63F#438945#5C6E58#8AA899#F2D349#181818#2CCCC3#FACD3D#5626C4#E60576#FDD935#E1F2F7#EF0D50#EB3A70#E5BACE#56642A#849531#92A332#FAF0DC#0B4141#FF6864#150734#0F2557#28559A#3778C2#4B9FE1#63BCE5#7ED5EA#5DAA68#3F6844#FAF1CF#EE7879#2A3166#F4ABAA#9E15BF#4AC6D2#44449B";

let colorDataArr = Colors.split("#").reduce((p, c) => {
  let hashColor = "#" + c;
  p.push(hashColor);
  return p;
}, []);
colorDataArr.shift();
