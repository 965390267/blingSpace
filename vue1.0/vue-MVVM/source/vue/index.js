import {initState} from './observe';

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
        // vm.$mount();
    }
}

function Vue(options) {
    this._init(options);
//    console.log(typeof this._init);

}
export default Vue;