import Dep, { pushTarget, popTarget } from "./Dep";

let id = 0;
class Watcher {

    constructor(vm,exprOrFn,cb,options){
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        this.cb = cb;
        this.options = options;
        this.id = id++;

        if(typeof exprOrFn == 'function'){
            this.getter = exprOrFn;
        }
        this.get();
    }
    get(){
       pushTarget(this);
        this.getter();
        popTarget();
    }
    update(){
        this.get();
    }
}



export default Watcher;