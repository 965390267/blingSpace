let id = 0;
class Dep {
    constructor(){
        this.subs = [];
        this.id = id++;
    }
    depend(){
       if(Dep.target){
        Dep.target.addDep(this);
       }
    }
    notify(){ 
        this.subs.forEach(sub=>sub.update());
    }
    addSub(watcher){
        this.subs.push(watcher);
    }
}

export function pushTarget(watcher) {
    Dep.target = watcher;
}
export function popTarget() {
    Dep.target = null;
}
export default Dep;