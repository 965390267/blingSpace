
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

  // <div>姓名 {{name}} <span>111</span></div>   =>>
  // {
  //     tag: 'div',
  //     parent: null,
  //     attrs: [],
  //     children: [{
  //         tag: null,
  //         parent: 父div,
  //         text: "姓名 {{name}}"
  //     },{
  //         tag: 'span',
  //         parent: 父div,
  //         attrs: [],
  //         children: [{
  //             tag:null,
  //             parent: 父div,
  //             text: 111
  //         }]
  //     }]
  // }
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 以 a-z A-Z _ 开头 后面可以接\-\.0-9_a-zA-Z]

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); //

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); // 标签开头的正则 捕获的内容是标签名

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); // 匹配标签结尾的 </div>

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

  var startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
  // 注意match
  // 1. 没有 g   ： 返回标准匹配格式，即：数组的第一个元素是整体匹配的内容，接下来是分组捕获的内容，然后是整体匹配的第一个下标，最后是目标字符串
  // 2. 有g ：返回的是一个包含所有匹配内容的数组

  function parseHTML(html) {
    var root,
        // ast树 树根
    currentParent,
        // 遍历时存储当前父级元素的变量
    stack = []; // 存储标签的栈 用于校验html结构是否正确
    // debugger;

    while (html) {
      // 1. 以<开头的必是 标签
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
          end(endTagMatch[1]); // 将结束标签传入

          continue;
        }
      }

      var text = void 0; // 如果是文本

      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    return root; // 信息处理函数

    function start(tagName, attrs) {
      console.log(tagName, attrs, "======开始标签 属性");
      var element = createASTElement(tagName, attrs);

      if (!root) {
        root = element;
      }

      currentParent = element;
      stack.push(element);
    } // 在结尾标签处创建父子关系


    function end(tagName) {
      console.log(tagName, "======结束标签");
      var element = stack.pop();
      currentParent = stack[stack.length - 1]; // 在标签闭合时记录标签的父级

      if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    }

    function chars(text) {
      console.log(text, "======文本");
      text = text.replace(/\s/g, '');

      if (text) {
        currentParent.children.push({
          type: 3,
          text: text
        });
      }
    } // 生成ast树单元


    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        //标签名
        type: 1,
        // 标签类型
        children: [],
        // 孩子列表
        attrs: attrs,
        // 属性集合
        parent: null // 父级元素

      };
    } // 将字符串进行截取操作，再更新字符串


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

        var attr, _end; // 1. 不是结尾 2. 存在属性


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

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // mustatine  语法

  function genProps(attrs) {
    console.log(attrs);
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
        // 如果是普通文本
        return "_v(".concat(JSON.stringify(text), ")");
      } else {
        // 存放每一段的代码
        var tokens = [];
        var lastIndex = defaultTagRE.lastIndex = 0; // 如果正则是全局模式 需要每次使用前将索引置为0

        var match, index;

        while (match = defaultTagRE.exec(text)) {
          index = match.index; // 保存匹配到的索引

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
    // 生成树
    var ast = parseHTML(template); // 优化静态节点
    // 通过树生成代码

    var code = generate(ast); // 1. 代码转fn 
    // 2. 全局变量转vm with

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
    var newProps = vnode.data || {}; // 获取当前老节点中的属性 

    var el = vnode.el; // 当前的真实节点

    for (var key in newProps) {
      if (key === 'style') {
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (key === 'class') {
        el.className = newProps["class"];
      } else {
        // 给这个元素添加属性 值就是对应的值
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      console.log("========", vnode);
      var vm = this;
      patch(vm.$el, vnode);
    };
  }
  function mountComponent(vm, el) {
    // 调用render方法，渲染el属性
    // 先使用render方法创建虚拟节点 
    vm._update(vm._render()); // 将虚拟节点渲染到页面上

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
    vm.$el = el;

    if (!options.render) {
      // 如果无render属性 判断有无template
      var template = options.template; // 无template 且有el则将el内容赋值给template

      if (!template && el) {
        template = el.outerHTML;
      }

      var render = compilerToFunction(template);
      options.render = render;
    } // options中存在render后 开始挂载此组件


    mountComponent(vm);
  };

  function renderMixin(Vue) {
    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm);
      return vnode;
    };

    Vue.prototype._c = function () {
      // 创建元素
      return createElement.apply(void 0, arguments);
    };

    Vue.prototype._v = function (text) {
      // 创建文本
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
  } // 产生虚拟dom  与ast相比 差异在于 可以自定义数据格式


  function vnode(tag, data, key, children, text) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }

  function Vue(options) {
    this._init(options);
  }

  initMixin(Vue);
  lifecycleMixin(Vue);
  renderMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
