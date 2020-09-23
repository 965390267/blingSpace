import { initState } from "./state";
import Vue from "./index";
import {compilerToFunction} from './compiler/index';

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = options;

        // 初始化数据
        initState(vm)

        if(vm.$options.el){
            vm.$mount(vm.$options.el);
        }
    }
}
Vue.prototype.$mount = function (el){
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    if(!options.render){
        // 如果无render属性 判断有无template
        let template = options.template;
        // 无template 且有el则将el内容赋值给template
        if(!template && el){
            template = el.outerHTML;
        }
        const render = compilerToFunction(template);
        options.render = render;
        console.log(render);
    }
}