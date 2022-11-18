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
    listen(worker){
        this.worker = worker;
        return this;
    }
    response(){
        this.worker();
        return this;
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
    build(){}
    render(){}
}  
