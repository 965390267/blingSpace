export function renderMixin(Vue) {
    Vue.prototype._render = function () {
        const vm = this;
        const render = vm.$options.render;
        let vnode = render.call(vm);
        return vnode;
    }
    Vue.prototype._c = function () { 
        
    }
    Vue.prototype._v = function () {
        
    }
    Vue.prototype._s = function () {
        
    }
}