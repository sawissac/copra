export class Component{
    constructor(){
        this.state = [];
        this.host = null;
        this.worker = null;
    }
    setHost(el){
        this.host = el;
        return this;
    }
    getHost(){
        return this.host;
    }
    setWorker(worker){
        this.worker = worker;
        return this;
    }
    getWorker(){
        this.worker();
    }
    setState(state) {
      this.state = state;
      return this;
    }
    checkState(id, key, callback) {
      const result = this.state.reduce((p,c)=>{
        return callback(p,c,id,key)
      },[])
      this.setState(result);
    }
    stateRefresh(key,value) {
      this.setState(
        this.state.reduce((p, c) => {
          c[key] = value;
          p.push(c);
          return p;
        }, [])
      );
    }
    build(){}
    render(){}
}