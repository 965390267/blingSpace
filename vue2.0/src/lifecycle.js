export function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        
    }
}

export function mountComponent(vm,el) {
// 调用render方法，渲染el属性

    // 先使用render方法创建虚拟节点 
    vm._update(vm._render());
    // 将虚拟节点渲染到页面上
}