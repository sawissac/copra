export class GlobalState{
    #state = {};
    store(state){
        this.#state = state;
    }

    get state(){
        return this.#state;
    }
}
