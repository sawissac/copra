import { ImageRenderAll } from "../js/imageRenderAll.js";

function build() {
  let imgra = new ImageRenderAll();

  let el = er.element;

  el.renderAllScene.target.appendChild(el.renderAllController.target);
  el.renderAllScene.target.appendChild(el.renderAllList.target);
  el.renderAllScene.set(_=>{
    _.style.overflowY = "scroll";
    _.classList.add("pos-relative");
    _.style.height = "calc(100% - 94px)";
    _.style.marginTop = "94px";
  })
  el.renderAllList.set(_=>{
    _.style.overflowY = "scroll";
  })
  el.renderAllController.set(_=>{
    _.classList.add("bg-light","d-flex","j-center","ai-center","py-7","sticky-top");
    _.style.height = "50px";
  })

  imgra.setHost({
    _scene_: el.renderAllScene.target,
    _controller_: el.renderAllController.target,
    _list_: el.renderAllList.target
  })
  imgra.setEngine(htmlToImage);
  imgra.build();

  let Component = er.component({
    element: "core-component-div",
    children: [er.toComponent(el.renderAllScene)],
  });
  return Component.target;
}

const App = er.root();
App.appendChild(build());
