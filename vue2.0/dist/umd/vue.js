(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var oldArrayProtoMethods = Array.prototype;
  var arrayMethods = Object.create(oldArrayProtoMethods);
  var methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice', 'concat'];
  methods.forEach(function (method) {
    // console.log(arrayMethods,method);
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var r = oldArrayProtoMethods[method].apply(this, args); // todo

      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args;
          break;

        case "splice":
          inserted = args.slice(2);
      } // console.log(inserted);


      if (inserted) ob.observerArray(inserted);
      console.log('数组更新方法 == 去渲染页面');
      return r;
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      if (Array.isArray(data)) {
        // 新增属性，声明此属性已被观测
        Object.defineProperty(data, "__ob__", {
          enumerable: false,
          configurable: false,
          value: this
        }); // 只能拦截数组的方法，但对数组中的每一项 无法监听 需要观测

        data.__proto__ = arrayMethods;
        this.observerArray(data); // console.log(data,arrayMethods);
      } else {
        this.walk(data);
      }
    }

    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactuve(data, key, data[key]);
        });
      }
    }, {
      key: "observerArray",
      value: function observerArray(value) {
        for (var i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }
    }]);

    return Observer;
  }();

  function defineReactuve(data, key, value) {
    // 实现递归
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        console.log('用户取值');
        return value;
      },
      set: function set(newValue) {
        console.log('用户赋值');

        if (value !== newValue) {
          // 对新赋值的对象进行观测
          observe(newValue);
          value = newValue;
        }
      }
    });
  }

  function observe(data) {
    if (_typeof(data) !== 'object' || data == null) {
      return;
    }

    if (data.__ob__) return;
    return new Observer(data);
  }

  function initState(vm) {
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

  function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[data][key];
      },
      set: function set(newValue) {
        vm[data][key] = newValue;
      }
    });
  }

  function initData(vm) {
    var data = vm.$options.data;
    vm._data = data = typeof data == 'function' ? data.call(vm) : data; // 进行代理，实现直接从实例上处理数据

    for (var key in data) {
      proxy(vm, '_data', key);
    }

    observe(data);
  }

  function compilerToFunction(template) {
    console.log(template);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; // 初始化数据

      initState(vm);

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }

  Vue.prototype.$mount = function (el) {
    var vm = this;
    var options = vm.$options;
    el = document.querySelector(el);

    if (!options.render) {
      // 如果无render属性 判断有无template
      var template = options.template; // 无template 且有el则将el内容赋值给template

      if (!template && el) {
        template = el.outerHTML;
      }

      var render = compilerToFunction(template);
      options.render = render;
      console.log(render);
    }
  };

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
