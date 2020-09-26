class Dep {
    constructor(){
        this.subs = [];
    }
    depend(){
        this.subs.push(Dep.target);
    }
    notify(){
        this.subs.forEatch(sub=>sub.update());
    }
}

export function pushTarget(watcher) {
    Dep.target = watcher;
}
export function popTarget() {
    Dep.target = null;
}
export default Dep;