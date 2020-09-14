import Observer from './observer';
import { Watcher } from './watcher';
import Dep from './dep';

export function initState(vm) {
    // 做不同的初始化工作
    let opts = vm.$options;
    if(opts.data){
        initData(vm);
    }
    if(opts.computed){
        initComputed(vm,opts['computed']);
    }
    if(opts.watch){
        initWatch(vm);
    }
}
/**
 * 将数据设置为响应式
 * @param {*} data
 */
export function observe(data) {
    if(typeof data !== 'object' || data == null){
        return;
    }
    if(data.__ob__){
        return data.__ob__;
    }
    return new Observer(data);
}
/**
 * 代理vm上的赋值和取值操作
 * @param {*} vm
 * @param {*} source
 * @param {*} key
 */
function proxy(vm,source,key) {
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key]
        },
        set(newValue){
            vm[source][key] = newValue;
        }
    })
}
function initData(vm) {
    let data = vm.$options.data;
    // 拷贝 避免污染数据源
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
    // 代理vm上的赋值和取值操作
    for(let key in data){
        proxy(vm,"_data",key)
    }
    // 观察数据
    observe(vm._data);
}
function createComputedGetter(vm,key){
    let watcher = vm._watchersComputed[key]
    // 用户取值时会执行这个方法
    return function (){
        if(watcher){
            // 如果页面开始取值，且dirty为true
            if(watcher.dirty){
                watcher.evaluate()
            }
            if(Dep.target){
                watcher.depend()
            }
            return watcher.value;
        }
    }
}
function initComputed(vm,computed) {
    // console.log(vm,computed);
    // 创建存储计算属性的watcher
    let watchers = vm._watchersComputed = Object.create(null);
    for (const key in computed) {
        let userDef = computed[key];
        // 计算属性watcher 默认刚开始不会执行  只会配置lazy dirty
       watchers[key] =  new Watcher(vm,userDef,()=>{},{lazy:true});
       Object.defineProperty(vm,key,{
           get: createComputedGetter(vm,key)
       })
    }
}

function createWatcher(vm,key,handler,opts) {
    return vm.$watch(key,handler,opts)
}
function initWatch(vm) {
    let watch = vm.$options.watch; // 获取用户传入的watch
    for(let key in watch){
        let userDef = watch[key];
        let handler = userDef;
        if(userDef.handler){
            handler = userDef.handler;
        }
        createWatcher(vm,key,handler,{immediate:userDef.immediate});
    }
}