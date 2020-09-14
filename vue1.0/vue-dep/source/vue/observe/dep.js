let id = 0;
class Dep {
    constructor(){
        this.id = id++;
        this.subs = [];
    }
    // 订阅
    addSub(watcher){
     this.subs.push(watcher);
        
    }
    // 发布
    notify(){
        this.subs.forEach(watcher=>{
            watcher.update()
        })
    }
    depend(){
        // Dep.target 是一个渲染watcher
        if(Dep.target){
            // watcher记录dep
            Dep.target.addDep(this);
        }
    }
}
// 用来保存当前的watcher
let stack = [];
export function pushTarget(watcher){
    Dep.target = watcher;
    stack.push(watcher)
}
export function popTarget(){
    stack.pop();
    Dep.target = stack[stack.length - 1];
}
export default Dep;