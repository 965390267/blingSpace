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
function initData(vm) {
    let data = vm.$options.data;
    vm._data = data = typeof data == 'function' ? data.call(vm) : data;
    observe(data);
}
function initProps(vm) {
    
}
function initComputed(vm) {
    
}
function initWatch(vm) {
    
}