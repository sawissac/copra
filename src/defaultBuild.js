function isUndefined(props, def) {
  if (props) {
    return props;
  }
  return def;
}

export const createLayerState = (props) => {
  return {
    layerName: props.layerName,
    isHighlight: isUndefined(props.highlight, false),
    component: {
      type: isUndefined(props.type, "Empty"),
      text: isUndefined(props.text, ""),
      height: isUndefined(props.height, 50),
      width: isUndefined(props.width, 100),
      textColor: isUndefined(props.textColor, "#000000"),
    },
  };
};

export const createPageLayerState = (props) => {
  return {
    canvas: {
      layerName: props.layerName,
      isHighlight: isUndefined(props.highlight, false),
      data: isUndefined(props.data, [createLayerState({ layerName: "New Layer" })]),
    },
  };
};

export const DefaultState = [
  createPageLayerState({ layerName: "Hello World", highlight: true }),
];

export const TemplateState = [
  createPageLayerState({
    layerName: "Hello World",
    highlight: true,
    data: [
      createLayerState({
        layerName: "Title",
        highlight: true,
        type: "Empty",
        text: "Hello World for Copra",
        height: "80",
        textColor: "#2d2d2d",
      }),
      createLayerState({
        layerName: "Header",
        type: "Header",
        text: "Hello.txt",
        textColor: "#ffffff",
      }),
      createLayerState({
        layerName: "Comment",
        type: "Line",
        text: "// It works like a charm",
        textColor: "#FDF5DF",
      }),
      createLayerState({
        layerName: "Coding",
        type: "Line",
        textColor: "#ffffff",
        text: "console.log('Hello World\");",
      }),
      createLayerState({
        layerName: "Footer",
        type: "Footer",
        textColor: "#2d2d2d",
      }),
    ],
  }),
];
