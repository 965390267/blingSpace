import {initState} from './observe';
import {Watcher} from './observe/watcher';
import {compiler,util} from './util.js';

/**
 * vue中的初始化
 * options用户传过来的配置数据
 */
Vue.prototype._init = function (options) {
    let vm = this;
    vm.$options = options;

    // MVVM原理  数据重新初始化
    initState(vm)

    if(vm.$options.el){
        vm.$mount();
    }
}
/**
 * 返回el挂载点的dom元素
 * @param {*} el 
 */
function query(el) {
    if(typeof el == 'string') el = document.querySelector(el);
    return el
}

Vue.prototype._update = function (){
    // console.log('更新操作')
    // 用用户传入的数据 去更新视图
    let vm = this;
    let el = vm.$el;

    // ------------- 一下逻辑 讲完虚拟dom 会用虚拟dom来重写
    // 要循环这个元素 将里面的内容 换成我们的数据
    let node = document.createDocumentFragment();
    let firstChild;
    while(firstChild = el.firstChild){ // 每次拿到第一个元素就将这个元素放入到文档碎片中
        node.appendChild(firstChild); // appendChild 是具有移动的功能 
    }
    // todo 对文本进行替换
    compiler(node,vm);
    el.appendChild(node);
    // 需要匹配{{}}的方式来进行替换
    // 依赖收集 属性变化了 需要重新渲染 watcher 和 dep

}
/**
 * 渲染页面 将组件进行挂载
 */
Vue.prototype.$mount = function() {
    let vm = this;
    let el = vm.$options.el;
    el = vm.$el = query(el);

    // 渲染时通过watcher进行渲染
    let updateComponent = ()=>{
        // console.log(111);
        this._update()
    }
    // 渲染watcher
    new Watcher(vm,updateComponent)
}
Vue.prototype.$watch = function (expr,handler,opts) {
    // console.log(opts);
    
    // 创建一个watcher
     new Watcher(this,expr,handler,{user:true,...opts})
}
function Vue(options) {
    this._init(options);
//    console.log(typeof this._init);
     
}

export default Vue;