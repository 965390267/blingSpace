let id = 0;
import Dep, {pushTarget,popTarget} from './dep';
import { util } from '../util';
// 对重复的watcher进行过滤操作
let has = {};
let queue = [];
function flushQueue() {
    queue.forEach(watcher=>{
        // debugger
        watcher.run();
    })
    has = {}; // 恢复正常 下一轮更新时继续使用
    queue = [];
}
function queueWatcher(watcher) {
    // debugger;
    let id = watcher.id;
    if(has[id] == null){
        has[id] = true;
        queue.push(watcher);
        // console.log(queue);
        
        // 延迟清空队列
     nextTick(flushQueue);
    }
    
}
let callbacks = [];
function flushCallbacks() {
    callbacks.forEach(cb=>cb())
}
function nextTick(cb) {
    callbacks.push(cb);
    let timeFunc = () => {
        flushCallbacks();
    }
    // if(Promise){
    //     return Promise.resolve().then(timeFunc)
    // }
    // if(MutationObserver){
    //     let observe = new MutationObserver(timeFunc);
    //     let textNode = document.createTextNode(1)
    //     observe.observe(textNode,{characterData:true})
    //     textNode.textContent = 2;
    //     return;
    // }
    // if(setImmediate){
    //     return setImmediate(timeFunc)
    // }
    setTimeout(timeFunc,0);
}
export class Watcher{
    /**
     *  id  watcher标识
     * @param {*} vm 当前组件实例
     * @param {*} exprOrFn  用户可能传入一个表达式，也可能是一个函数 
     * @param {*} cb 监听的回调函数
     * @param {*} opts 一些其他参数
     */

    constructor(vm,exprOrFn,cb,opts = {}){
        
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        if(typeof exprOrFn == 'function'){
            this.getter = exprOrFn;
        }else {
            this.getter = function () {
                // 调用此方法会在vm上把watcher的值取出来
                return util.getValue(vm,exprOrFn)
            }
        }
        // 标识是用户自己写的watcher
        if(opts.user){
            this.user = true;
        }
        // 如果有这个值，说明是计算属性
        this.lazy = opts.lazy;
        this.dirty = this.lazy;
        this.cb = cb;
        this.deps = [];
        this.depsId = new Set();
        this.opts = opts;
        this.id = id++;
        // 保存旧值
        this.value = this.lazy ? undefined : this.get(); 
        if(this.opts.immediate){

            this.cb(this.value)
        } 
    }
    get(){
        // Dep.target
        // 保存当前渲染watcher
        pushTarget(this);
        // 执行用户逻辑
        let value = this.getter.call(this.vm);
        // 清空target等状态 方便后面再次执行
        popTarget();
        return value;

    }
    evaluate(){
        this.value = this.get();
        this.dirty = false;
    }
    update () {
        // 如果立即调用get 会导致页面刷新频繁 性能低下 用延迟更新来处理
        // this.get()
        // 如果是计算属性
        if(this.lazy){
            this.dirty = true;
        }else {
        queueWatcher(this)}
    }
    run(){
        // 新值
        let value = this.get();
        if(this.value !== value){
            this.cb(value,this.value)
        }
    }
    // 记录dep 同一个watcher不应该重复记录dep
    addDep(dep){
        let id = dep.id;
        if(!this.depsId.has(id)){
            this.depsId.add(id);
            this.deps.push(dep);
            dep.addSub(this);
        }
    }
    depend(){
        let i = this.deps.length;
        while (i--) {
            this.deps[i].depend();   
        }
    }
}