class ElementListRender {
  #list = [];
  #renderedList = {};
  root(child){
    let root = document.getElementById("root");
    if(child === undefined){
      return root;
    }else{
      root.appendChild(child)
    }
  }
  parseComponent(list) {
    this.#list = list;
    this.#list.map((elesName) => {
      const ele = this.parse(elesName);
      let Element = document.createElement(ele.type);
      Element.classList.add(ele.class);
      this.#renderedList[ele.name] = {
        target: Element,
        name: ele.name,
        set: function (callback) {
          callback(this.target);
        },
      };
    });
  }
  parse(elesName) {
    let splitedArray = elesName.split("-");
    let elementType = splitedArray.splice(splitedArray.length - 1, 1);
    let parsedName = "";
    for (let i in splitedArray) {
      if (i == 0) {
        parsedName +=
          splitedArray[i].charAt(0).toLowerCase() + splitedArray[i].slice(1);
      } else {
        parsedName +=
          splitedArray[i].charAt(0).toUpperCase() + splitedArray[i].slice(1);
      }
    }
    return {
      name: parsedName,
      class: splitedArray.join("-"),
      type: elementType,
    };
  }
  icon(target, name, iconfront, text, showtext, dropdown) {
    if (iconfront) {
      let iEle = document.createElement("i");
      iEle.classList.add(...name);
      target.appendChild(iEle);
    }
    let pEle = document.createElement("p");
    pEle.classList.add("mx-4");
    if (showtext) {
      pEle.textContent = text;
      target.appendChild(pEle);
    }

    if (dropdown) {
      let dropdownEle = document.createElement("i");
      dropdownEle.classList.add(...["bi", "bi-chevron-down"]);
      target.appendChild(dropdownEle);
    }
    if (showtext) {
      return [pEle];
    }
  }
  get element() {
    return this.#renderedList;
  }
  toComponent(ele) {
    return {
      target: ele.target,
      name: ele.name,
    };
  }
  /**
   *   @element
   *   @class
   *   @children array that accept other component
   *   @return target,name,inner
   */

  component(
    obj = { element: null, class: [], children: [], text: "", build: callback }
  ) {
    let ele = null;
    let returnObj = {
      target: null,
      name: "",
      inner: {},
    };
    if (obj.element !== null && typeof obj.element === "string") {
      let parse = this.parse(obj.element);
      ele = document.createElement(parse.type);
      ele.classList.add(parse.class);
      returnObj.name = parse.name;
      returnObj.target = ele;
    }
    if (obj.element !== null && obj.text) {
      ele.textContent = obj.text;
    }
    if (obj.element !== null && obj.class) {
      ele.classList.add(...obj.class);
    }

    if (obj.element !== null && obj.build) {
      obj.build(ele);
    }
    if (obj.element !== null && obj.children) {
      obj.children.map((i) => {
        ele.appendChild(i.target);
        returnObj.inner[i.name] = i;
      });
    }
    return returnObj;
  }
}

const er = new ElementListRender();

try {
  er.parseComponent(ElementList);
} catch (error) {
  console.error("Error: Missing File...");
}
