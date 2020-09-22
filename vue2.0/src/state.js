import { observe } from "./observer/index";

export function initState(vm){
    let opts = vm.$options;
    let {methods,data,props,computed,watch} = opts;
    if(methods){
        initMethod(vm)
    }
    if(data){
        initData(vm)
    }
    if(props){
        initProps(vm)
    }
    if(computed){
        initComputed(vm)
    }
    if(watch){
        initWatch(vm)
    }

}
function initMethod(vm) {

}
function proxy(vm,data,key) {
    Object.defineProperty(vm,key,{
        get(){
            return vm[data][key];
        },
        set(newValue){
            vm[data][key] = newValue;
        }
    })
}
function initData(vm) {
    let data = vm.$options.data;
    vm._data = data = typeof data == 'function' ? data.call(vm) : data;

    // 进行代理，实现直接从实例上处理数据
    for (const key in data) {
       proxy(vm,'_data',key)
    }

    observe(data);
}
function initProps(vm) {

}
function initComputed(vm) {

}
function initWatch(vm) {

}