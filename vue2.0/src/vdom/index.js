export function renderMixin(Vue) {
    Vue.prototype._render = function () {
        const vm = this;
        const render = vm.$options.render;
        let vnode = render.call(vm);
        return vnode;
    }
    Vue.prototype._c = function () { // 创建元素
        return createElement(...arguments);
    }
    Vue.prototype._v = function (text) {  // 创建文本
        return createTextVnode(text)
    }
    Vue.prototype._s = function (val) { // stringify
        return val == null ? '' : (typeof val == 'object') ? JSON.stringify(val) : val;
    }
}

function createElement(tag,data={},...children) {
    let key = data.key;
    if(key){
        delete data.key;
    }
    return vnode(tag,data,key,children); 
}
function createTextVnode(text) {
    return vnode(undefined,undefined,undefined,undefined,text)
}
// 产生虚拟dom  与ast相比 差异在于 可以自定义数据格式
function vnode(tag,data,key,children,text) {
    return {
        tag,data,key,children,text
    }
}