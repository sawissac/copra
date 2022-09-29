function CustomAlert(props) {
  let counter = 0;
  const message = am.component({
    el: "message-con-div",
    class: ["bg-dark", "shadow-sm", "my-2"],
    build: (_) => {
      Object.assign(_.style, {
        width: "400px",
        height: "60px",
        overflow: "hidden",
        borderRadius: "7px",
        display: "flex",
        position: "fixed",
        bottom: "50px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
      });
    },
    children: [
      am.component({
        el: "message-list-div",
        class: [
          "bg-dark",
          "text-light",
          "d-flex",
          "align-items-center",
          "justify-content-center",
          "flex-fill",
        ],
        children: [
          am.component({
            el: "message-inner-div",
            text: props.text === undefined? "":props.text,
          }),
        ],
      }),
      am.component({
        el: "message-btn-div",
        class: ["bg-dark", "text-white"],
        children: [
          am.component({
            el: "message-inner-btn-div",
            children: [
              am.component({
                el: "message-cross-icon-i",
                class: props.icon===undefined? ["bi", "bi-x"]: props.icon,
              }),
            ],
            build: (_) => {
              Object.assign(_.style, {
                fontSize: "28px",
                gridColumnStart: 1,
                gridColumnEnd: 2,
                gridRowStart: 1,
                gridRowEnd: 2,
                zIndex: 2,
                display: "grid",
                placeItems: "center",
              });
            },
          }),
          am.component({
            el: "message-inner-bg-i",
            class: ["bg-primary"],
            build: (_) => {
              Object.assign(_.style, {
                fontSize: "28px",
                width: "0px",
                gridColumnStart: 1,
                gridColumnEnd: 2,
                gridRowStart: 1,
                gridRowEnd: 2,
                zIndex: 1,
              });
            },
          }),
        ],
        build: (_) => {
          Object.assign(_.style, {
            width: "60px",
            height: "60px",
            display: "grid",
          });
        },
      }),
    ],
  });
  const blueBackground = message.inner.messageBtn.inner.messageInnerBg.target;
  const closeBtn = message.inner.messageBtn.inner.messageInnerBtn.target;
  const timmer = setInterval(
    () => {
      counter += 1;
      if (counter === 61) {
        clearInterval(timmer);
        document.body.removeChild(message.target);
        if (props.callback !== undefined) {
          props.callback();
        }
      } else {
        blueBackground.style.width = `${counter}px`;
      }
    },
    props.speed === undefined ? 50 :  props.speed
  );
  closeBtn.onclick = () => {
    clearInterval(timmer);
    if (props.callback !== undefined) {
      props.callback();
    }
    document.body.removeChild(message.target);
  };
  document.body.appendChild(message.target);
}
