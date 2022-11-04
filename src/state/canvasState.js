export function getActiveCanvasLayer(state) {
  const res = state.filter((i) => i.canvas.isHighlight === true);
  return res[0].canvas;
}

export function getActiveLayer(state) {
  const canvasLayer = getActiveCanvasLayer(state);
  const res = canvasLayer.data.filter((i) => i.isHighlight === true);
  if (res.length === 0) {
    return { component: [] };
  }
  return res[0];
}

export function getActiveLayerComponent(state) {
  const layer = getActiveLayer(state);
  return layer.component;
}

export function updataActiveCanvasLayer(state, props) {
  const res = state.reduce((p, c) => {
    if (c.canvas.isHighlight === true) {
      if (props.layerName) {
        c.canvas.layerName = props.layerName;
      }
      if (props.highlight) {
        c.canvas.isHighlight = props.highlight;
      }
      if (props.data) {
        c.canvas.data = props.data;
      }
      p.push(c);
    } else {
      p.push(c);
    }
    return p;
  }, []);
  return res;
}

export function updateActiveLayerComponent(state, props) {

  const activePageLayer = getActiveCanvasLayer(state);

  const res = activePageLayer.data.reduce((p, c) => {
    if (c.isHighlight === true) {
      if (props.type) {
        c.component.type = props.type;
      }
      if (props.text) {
        c.component.text = props.text;
      }
      if (props.height) {
        c.component.height = props.height;
      }
      if (props.width) {
        c.component.width = props.width;
      }
      if (props.textColor) {
        c.component.textColor = props.textColor;
      }
      p.push(c);
    } else {
      p.push(c);
    }
    return p;
  }, []);

  const updatedLayer = updataActiveCanvasLayer(state, {
    data: res,
  });
  
  return updatedLayer;
}