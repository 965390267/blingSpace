import {patch} from './vdom/patch';
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        console.log("========",vnode);
        const vm = this;
        patch(vm.$el,vnode)
    }
}

export function mountComponent(vm,el) {
// 调用render方法，渲染el属性

    // 先使用render方法创建虚拟节点 
    vm._update(vm._render());
    // 将虚拟节点渲染到页面上
}