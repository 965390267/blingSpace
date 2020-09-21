(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function initState(vm) {
      console.log(vm);
      var opts = vm.$options;
      var methods = opts.methods,
          data = opts.data,
          props = opts.props,
          computed = opts.computed,
          watch = opts.watch;

      if (data) {
        initData(vm);
      }
    }

    function initData(vm) {
      var data = vm.$options.data;
      data = typeof data == 'function' ? data.call(vm) : data;
      console.log(data);
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        var vm = this;
        vm.$options = options; // 初始化数据

        initState(vm);
      };
    }

    function Vue(options) {
      console.log(options);

      this._init(options);
    }

    initMixin(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map
