export class CanvasScroller {
    #defalutX = -50;
    #defaultY = -50;
    #x = -50;
    #y = -50;
    #max = 1;
    #min = 0;
    #scale = 1;
    #scalePercent = 0;
    #element = null;
    #scaleBy = 5;
    #shiftState = false;
    #worker = null;
    #direction = "non";
    getElement(){
        return this.#element;
    }
    get direction(){
        return this.#direction;
    }
    get defaultX() {
        return this.#defalutX;
    }
    get defaultY() {
        return this.#defaultY;
    }
    set shiftState(value) {
        this.#shiftState = value;
    }
    get scalePercent() {
        return this.#scalePercent;
    }
    setCanvasPostion(x, y) {
        this.#x = x;
        this.#y = y;
    }
    worker(callback) {
        this.#worker = callback;
    }
    setCanvas(canvasElement) {
        this.#element = canvasElement;
    }
    scaleBy(value) {
        this.#scaleBy = value;
    }
    getScale() {
        return this.#scale;
    }
    setMinMax(min, max) {
        this.#min = min;
        this.#max = max;
    }
    setScalePercentMiddle() {
        this.#scalePercent = this.#max / 2;
    }

    parseScale(value) {
        return `scale(${value})`;
    }
    parseTranslate(x, y) {
        return `translate(${x}%,${y}%)`;
    }
    canvasReset() {
        this.#scalePercent = this.#max / 2;
        this.#scale = 1;
        this.#element.style.transform = this.parseTranslate(this.#x, this.#y) + " " + this.parseScale(this.#scale);
        this.#worker();
    }
    run() {
        this.#element.addEventListener("wheel", (ev) => {
            //scroll down decrease
            if (ev.deltaY > 0 && !this.#shiftState) {
                this.#scalePercent -= this.#scaleBy;
            }
            // scroll up increase
            if (ev.deltaY < 0 && !this.#shiftState) {
                this.#scalePercent += this.#scaleBy;
            }
            //scroll down decrease
            if (ev.deltaY > 0 && this.#shiftState) {
                this.#direction = "down";
                this.#y -= this.#scaleBy;
            }
            // scroll up increase
            if (ev.deltaY < 0 && this.#shiftState) {
                this.#direction = "up";
                this.#y += this.#scaleBy;
            }

            if (this.#scalePercent > this.#max) {
                this.#scalePercent = this.#max;
            }

            if (this.#scalePercent < this.#min) {
                this.#scalePercent = this.#min;
            }
            this.#scale = this.#scalePercent / 100;
            this.#element.style.transform = this.parseTranslate(this.#x, this.#y) + " " + this.parseScale(this.#scale);

            this.#worker();

        });
    }
}