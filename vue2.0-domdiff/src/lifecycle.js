import {patch} from './vdom/patch';
import Watcher from './observer/watcher';
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el,vnode)
    }
}

export function mountComponent(vm,el) {
// 调用render方法，渲染el属性
    callHook(vm,'beforeMount');
    // 先使用render方法创建虚拟节点 
    // vm._update(vm._render());
    let updateComponent=()=>{
        vm._update(vm._render());
    }
    new Watcher(vm,updateComponent,()=>{},true);
    callHook(vm,'mounted');
    // 将虚拟节点渲染到页面上
}

export function callHook(vm,hook) {
    const handlers = vm.$options[hook];
    if(handlers){
        for (let index = 0; index < handlers.length; index++) {
            const handler = handlers[index];
            handler.call(vm);
        }
    }
    
}