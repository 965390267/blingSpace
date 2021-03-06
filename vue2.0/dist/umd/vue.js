
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
      return r;
    };
  });

  var LIFECYCLE_HOOKS = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestory", "destoryed"];
  var strats = {};

  strats.data = function (parentVal, childValue) {
    return childValue;
  };

  strats.computed = function () {};

  strats.watch = function () {};

  function mergeHook(parentVal, childValue) {
    // ?????????????????????
    if (childValue) {
      // ????????????
      if (parentVal) {
        return parentVal.concat([childValue]);
      } else {
        // ????????????
        return [childValue];
      }
    } else {
      // ????????????
      return parentVal;
    }
  }

  LIFECYCLE_HOOKS.forEach(function (lifeCycle) {
    strats[lifeCycle] = mergeHook;
  });
  function mergeOptions(parent, child) {
    var options = {}; // ????????????????????????key

    for (var key in parent) {
      mergeField(key);
    } // ??????????????????????????????


    for (var _key in child) {
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    } // ????????????

    /**
     * ????????????
     * @param {*} key 
     */


    function mergeField(key) {
      if (strats[key]) {
        options[key] = strats[key](parent[key], child[key]);
      } else {
        options[key] = child[key];
      }
    }

    return options;
  }
  function defineProperty(target, key, value) {
    Object.defineProperty(target, key, {
      enumerable: false,
      configurable: false,
      value: value
    });
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      if (Array.isArray(data)) {
        // ??????????????????????????????????????????
        defineProperty(data, "__ob__", this); // ????????????????????????????????????????????????????????? ???????????? ????????????

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
    // ????????????
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        console.log('????????????');
        return value;
      },
      set: function set(newValue) {
        console.log('????????????');

        if (value !== newValue) {
          // ?????????????????????????????????
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
    vm._data = data = typeof data == 'function' ? data.call(vm) : data; // ???????????????????????????????????????????????????

    for (var key in data) {
      proxy(vm, '_data', key);
    }

    observe(data);
  }

  // <div>?????? {{name}} <span>111</span></div>   =>>
  // {
  //     tag: 'div',
  //     parent: null,
  //     attrs: [],
  //     children: [{
  //         tag: null,
  //         parent: ???div,
  //         text: "?????? {{name}}"
  //     },{
  //         tag: 'span',
  //         parent: ???div,
  //         attrs: [],
  //         children: [{
  //             tag:null,
  //             parent: ???div,
  //             text: 111
  //         }]
  //     }]
  // }
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // ??? a-z A-Z _ ?????? ???????????????\-\.0-9_a-zA-Z]

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // ????????????????????? ???????????????????????????

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // ????????????????????? </div>

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // ???????????????

  var startTagClose = /^\s*(\/?)>/; // ????????????????????? >
  // ??????match
  // 1. ?????? g   ??? ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
  // 2. ???g ??????????????????????????????????????????????????????

  function parseHTML(html) {
    var root,
        // ast??? ??????
    currentParent,
        // ??????????????????????????????????????????
    stack = []; // ?????????????????? ????????????html??????????????????
    // debugger;

    while (html) {
      // 1. ???<??????????????? ??????
      var textEnd = html.indexOf('<');

      if (textEnd == 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]); // ?????????????????????

          continue;
        }
      }

      var text = void 0; // ???????????????

      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    return root; // ??????????????????

    function start(tagName, attrs) {
      var element = createASTElement(tagName, attrs);

      if (!root) {
        root = element;
      }

      currentParent = element;
      stack.push(element);
    } // ????????????????????????????????????


    function end(tagName) {
      var element = stack.pop();
      currentParent = stack[stack.length - 1]; // ???????????????????????????????????????

      if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    }

    function chars(text) {
      text = text.replace(/\s/g, '');

      if (text) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      }
    } // ??????ast?????????


    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        //?????????
        type: 1,
        // ????????????
        children: [],
        // ????????????
        attrs: attrs,
        // ????????????
        parent: null // ????????????

      };
    } // ???????????????????????????????????????????????????


    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);

        var attr, _end; // 1. ???????????? 2. ????????????


        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        }

        if (_end) {
          advance(_end[0].length);
          return match;
        }
      } // console.log(html);

    }
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // mustatine  ??????

  function genProps(attrs) {
    var str = "";

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name === 'style') {
        (function () {
          var obj = {};
          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(':'),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      str += "".concat(attr.name, " : ").concat(JSON.stringify(attr.value), ",");
    }

    console.log(str);
    return "{".concat(str.slice(0, -1), "}");
  }

  function gen(node) {
    if (node.type == 1) {
      return generate(node);
    } else {
      var text = node.text;

      if (!defaultTagRE.test(text)) {
        // ?????????????????????
        return "_v(".concat(JSON.stringify(text), ")");
      } else {
        // ????????????????????????
        var tokens = [];
        var lastIndex = defaultTagRE.lastIndex = 0; // ??????????????????????????? ????????????????????????????????????0

        var match, index;

        while (match = defaultTagRE.exec(text)) {
          index = match.index; // ????????????????????????

          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }

          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }

        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return "_v(".concat(tokens.join('+'), ")");
      }
    }
  }

  function genChildren(el) {
    var children = el.children;

    if (children) {
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
  }

  function generate(el) {
    var children = genChildren(el);
    var code = "_c('".concat(el.tag, "',\n    ").concat(el.attrs.length ? "".concat(genProps(el.attrs)) : 'undefine', "\n    ").concat(children ? ",".concat(children) : '', "\n    )");
    return code;
  }

  function compilerToFunction(template) {
    // ?????????
    var ast = parseHTML(template); // ??????????????????
    // ?????????????????????

    var code = generate(ast); // 1. ?????????fn 
    // 2. ???????????????vm with

    var render = new Function("with(this){return ".concat(code, "}"));
    return render;
  }

  function patch(oldVnode, vnode) {
    var isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      var oldElm = oldVnode;
      var parentElm = oldElm.parentNode;
      var el = createElm(vnode);
      parentElm.insertBefore(el, oldElm.nextSibling);
      parentElm.removeChild(oldVnode);
      return el;
    }
  }

  function createElm(vnode) {
    var tag = vnode.tag,
        children = vnode.children,
        key = vnode.key,
        data = vnode.data,
        text = vnode.text;

    if (typeof tag === 'string') {
      vnode.el = document.createElement(tag);
      updateProperties(vnode);
      children.forEach(function (child) {
        return vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function updateProperties(vnode) {
    var newProps = vnode.data || {}; // ????????????????????????????????? 

    var el = vnode.el; // ?????????????????????

    for (var key in newProps) {
      if (key === 'style') {
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (key === 'class') {
        el.className = newProps["class"];
      } else {
        // ??????????????????????????? ?????????????????????
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this;
      patch(vm.$el, vnode);
    };
  }
  function mountComponent(vm, el) {
    // ??????render???????????????el??????
    // ?????????render???????????????????????? 
    vm._update(vm._render()); // ?????????????????????????????????

  }
  function callHook(vm, hook) {
    var handlers = vm.$options[hook];

    if (handlers) {
      for (var index = 0; index < handlers.length; index++) {
        var handler = handlers[index];
        handler.call(vm);
      }
    }
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = mergeOptions(vm.constructor.options, options);
      callHook(vm, 'beforeCreate'); // ???????????????

      initState(vm);
      callHook(vm, 'created');

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }

  Vue.prototype.$mount = function (el) {
    var vm = this;
    var options = vm.$options;
    el = document.querySelector(el);
    vm.$el = el;

    if (!options.render) {
      // ?????????render?????? ????????????template
      var template = options.template; // ???template ??????el??????el???????????????template

      if (!template && el) {
        template = el.outerHTML;
      }

      var render = compilerToFunction(template);
      options.render = render;
    } // options?????????render??? ?????????????????????


    callHook(vm, 'beforeMount');
    mountComponent(vm);
    callHook(vm, 'mounted');
  };

  function renderMixin(Vue) {
    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm);
      return vnode;
    };

    Vue.prototype._c = function () {
      // ????????????
      return createElement.apply(void 0, arguments);
    };

    Vue.prototype._v = function (text) {
      // ????????????
      return createTextVnode(text);
    };

    Vue.prototype._s = function (val) {
      // stringify
      return val == null ? '' : _typeof(val) == 'object' ? JSON.stringify(val) : val;
    };
  }

  function createElement(tag) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var key = data.key;

    if (key) {
      delete data.key;
    }

    for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    return vnode(tag, data, key, children);
  }

  function createTextVnode(text) {
    return vnode(undefined, undefined, undefined, undefined, text);
  } // ????????????dom  ???ast?????? ???????????? ???????????????????????????


  function vnode(tag, data, key, children, text) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }

  function initGlobalApi(Vue) {
    Vue.options = {};

    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
      console.log(this.opions);
    };
  }

  function Vue(options) {
    this._init(options);
  } // ????????????


  initMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue); // ????????????

  initGlobalApi(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
