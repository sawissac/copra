export class Storage {
  #state = [];
  get state() {
    return this.#state;
  }
  setState(state) {
    this.#state = state;
  }
  storage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getStorage(key) {
    if (localStorage.getItem(key) !== null) {
      let data = JSON.parse(localStorage.getItem(key)).reduce((p, c) => {
        c.canvas.id = Symbol();
        p.push(c);
        return p;
      }, []);
      this.setState(data);
    }
  }
  getStorageValue(key){
    return  JSON.parse(localStorage.getItem(key));
  }
  status() {
    var data = "";

    console.log("Current local storage: ");

    for (var key in window.localStorage) {
      if (window.localStorage.hasOwnProperty(key)) {
        data += window.localStorage[key];
        console.log(
          key +
            " = " +
            ((window.localStorage[key].length * 16) / (8 * 1024)).toFixed(2) +
            " KB"
        );
      }
    }

    console.log(
      data
        ? "\n" +
            "Total space used: " +
            ((data.length * 16) / (8 * 1024)).toFixed(2) +
            " KB"
        : "Empty (0 KB)"
    );
    console.log(
      data
        ? "Approx. space remaining: " +
            (5120 - ((data.length * 16) / (8 * 1024)).toFixed(2)) +
            " KB"
        : "5 MB"
    );
  }
}
