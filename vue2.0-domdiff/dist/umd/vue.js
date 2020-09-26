
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    let oldArrayProtoMethods = Array.prototype;
    let arrayMethods = Object.create(oldArrayProtoMethods);
    let methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice', 'concat'];
    methods.forEach(method => {
      // console.log(arrayMethods,method);
      arrayMethods[method] = function (...args) {
        let r = oldArrayProtoMethods[method].apply(this, args); // todo

        let inserted;
        let ob = this.__ob__;

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

    const LIFECYCLE_HOOKS = ["beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestory", "destoryed"];
    const strats = {};

    strats.data = function (parentVal, childValue) {
      return childValue;
    };

    strats.computed = function () {};

    strats.watch = function () {};

    function mergeHook(parentVal, childValue) {
      // 生命周期的合并
      if (childValue) {
        // 父有子有
        if (parentVal) {
          return parentVal.concat([childValue]);
        } else {
          // 父无子有
          return [childValue];
        }
      } else {
        // 父有子无
        return parentVal;
      }
    }

    LIFECYCLE_HOOKS.forEach(lifeCycle => {
      strats[lifeCycle] = mergeHook;
    });
    function mergeOptions(parent, child) {
      const options = {}; // 遍历处理父亲所有key

      for (const key in parent) {
        mergeField(key);
      } // 遍历所有父无子有属性


      for (const key in child) {
        if (!parent.hasOwnProperty(key)) {
          mergeField(key);
        }
      } // 子有父无

      /**
       * 合并字段
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
        value
      });
    }

    class Observer {
      constructor(data) {
        if (Array.isArray(data)) {
          // 新增属性，声明此属性已被观测
          defineProperty(data, "__ob__", this); // 只能拦截数组的方法，但对数组中的每一项 无法监听 需要观测

          data.__proto__ = arrayMethods;
          this.observerArray(data); // console.log(data,arrayMethods);
        } else {
          this.walk(data);
        }
      }

      walk(data) {
        let keys = Object.keys(data);
        keys.forEach(key => {
          defineReactuve(data, key, data[key]);
        });
      }

      observerArray(value) {
        for (let i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }

    }

    function defineReactuve(data, key, value) {
      // 实现递归
      observe(value);
      Object.defineProperty(data, key, {
        get() {
          console.log('用户取值');
          return value;
        },

        set(newValue) {
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
      if (typeof data !== 'object' || data == null) {
        return;
      }

      if (data.__ob__) return;
      return new Observer(data);
    }

    function initState(vm) {
      let opts = vm.$options;
      let {
        methods,
        data,
        props,
        computed,
        watch
      } = opts;

      if (data) {
        initData(vm);
      }
    }

    function proxy(vm, data, key) {
      Object.defineProperty(vm, key, {
        get() {
          return vm[data][key];
        },

        set(newValue) {
          vm[data][key] = newValue;
        }

      });
    }

    function initData(vm) {
      let data = vm.$options.data;
      vm._data = data = typeof data == 'function' ? data.call(vm) : data; // 进行代理，实现直接从实例上处理数据

      for (const key in data) {
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
    const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 以 a-z A-Z _ 开头 后面可以接\-\.0-9_a-zA-Z]

    const qnameCapture = `((?:${ncname}\\:)?${ncname})`; //

    const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名

    const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>

    const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的

    const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
    // 注意match
    // 1. 没有 g   ： 返回标准匹配格式，即：数组的第一个元素是整体匹配的内容，接下来是分组捕获的内容，然后是整体匹配的第一个下标，最后是目标字符串
    // 2. 有g ：返回的是一个包含所有匹配内容的数组

    function parseHTML(html) {
      let root,
          // ast树 树根
      currentParent,
          // 遍历时存储当前父级元素的变量
      stack = []; // 存储标签的栈 用于校验html结构是否正确
      // debugger;

      while (html) {
        // 1. 以<开头的必是 标签
        let textEnd = html.indexOf('<');

        if (textEnd == 0) {
          const startTagMatch = parseStartTag();

          if (startTagMatch) {
            start(startTagMatch.tagName, startTagMatch.attrs);
            continue;
          }

          const endTagMatch = html.match(endTag);

          if (endTagMatch) {
            advance(endTagMatch[0].length);
            end(endTagMatch[1]); // 将结束标签传入

            continue;
          }
        }

        let text; // 如果是文本

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
        let element = createASTElement(tagName, attrs);

        if (!root) {
          root = element;
        }

        currentParent = element;
        stack.push(element);
      } // 在结尾标签处创建父子关系


      function end(tagName) {
        let element = stack.pop();
        currentParent = stack[stack.length - 1]; // 在标签闭合时记录标签的父级

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
            text
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
          attrs,
          // 属性集合
          parent: null // 父级元素

        };
      } // 将字符串进行截取操作，再更新字符串


      function advance(n) {
        html = html.substring(n);
      }

      function parseStartTag() {
        const start = html.match(startTagOpen);

        if (start) {
          const match = {
            tagName: start[1],
            attrs: []
          };
          advance(start[0].length);
          let attr, end; // 1. 不是结尾 2. 存在属性

          while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            match.attrs.push({
              name: attr[1],
              value: attr[3] || attr[4] || attr[5]
            });
            advance(attr[0].length);
          }

          if (end) {
            advance(end[0].length);
            return match;
          }
        } // console.log(html);

      }
    }

    const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // mustatine  语法

    function genProps(attrs) {
      let str = "";

      for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];

        if (attr.name === 'style') {
          let obj = {};
          attr.value.split(';').forEach(item => {
            let [key, value] = item.split(':');
            obj[key] = value;
          });
          attr.value = obj;
        }

        str += `${attr.name} : ${JSON.stringify(attr.value)},`;
      }

      console.log(str);
      return `{${str.slice(0, -1)}}`;
    }

    function gen(node) {
      if (node.type == 1) {
        return generate(node);
      } else {
        let text = node.text;

        if (!defaultTagRE.test(text)) {
          // 如果是普通文本
          return `_v(${JSON.stringify(text)})`;
        } else {
          // 存放每一段的代码
          let tokens = [];
          let lastIndex = defaultTagRE.lastIndex = 0; // 如果正则是全局模式 需要每次使用前将索引置为0

          let match, index;

          while (match = defaultTagRE.exec(text)) {
            index = match.index; // 保存匹配到的索引

            if (index > lastIndex) {
              tokens.push(JSON.stringify(text.slice(lastIndex, index)));
            }

            tokens.push(`_s(${match[1].trim()})`);
            lastIndex = index + match[0].length;
          }

          if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)));
          }

          return `_v(${tokens.join('+')})`;
        }
      }
    }

    function genChildren(el) {
      const children = el.children;

      if (children) {
        return children.map(child => gen(child)).join(',');
      }
    }

    function generate(el) {
      let children = genChildren(el);
      let code = `_c('${el.tag}',
    ${el.attrs.length ? `${genProps(el.attrs)}` : 'undefine'}
    ${children ? `,${children}` : ''}
    )`;
      return code;
    }

    function compilerToFunction(template) {
      // 生成树
      let ast = parseHTML(template); // 优化静态节点
      // 通过树生成代码

      let code = generate(ast); // 1. 代码转fn 
      // 2. 全局变量转vm with

      let render = new Function(`with(this){return ${code}}`);
      return render;
    }

    function patch(oldVnode, vnode) {
      const isRealElement = oldVnode.nodeType;

      if (isRealElement) {
        const oldElm = oldVnode;
        const parentElm = oldElm.parentNode;
        let el = createElm(vnode);
        parentElm.insertBefore(el, oldElm.nextSibling);
        parentElm.removeChild(oldVnode);
        return el;
      }
    }

    function createElm(vnode) {
      let {
        tag,
        children,
        key,
        data,
        text
      } = vnode;

      if (typeof tag === 'string') {
        vnode.el = document.createElement(tag);
        updateProperties(vnode);
        children.forEach(child => {
          return vnode.el.appendChild(createElm(child));
        });
      } else {
        vnode.el = document.createTextNode(text);
      }

      return vnode.el;
    }

    function updateProperties(vnode) {
      let newProps = vnode.data || {}; // 获取当前老节点中的属性 

      let el = vnode.el; // 当前的真实节点

      for (let key in newProps) {
        if (key === 'style') {
          for (let styleName in newProps.style) {
            el.style[styleName] = newProps.style[styleName];
          }
        } else if (key === 'class') {
          el.className = newProps.class;
        } else {
          // 给这个元素添加属性 值就是对应的值
          el.setAttribute(key, newProps[key]);
        }
      }
    }

    function lifecycleMixin(Vue) {
      Vue.prototype._update = function (vnode) {
        const vm = this;
        patch(vm.$el, vnode);
      };
    }
    function mountComponent(vm, el) {
      // 调用render方法，渲染el属性
      // 先使用render方法创建虚拟节点 
      vm._update(vm._render()); // 将虚拟节点渲染到页面上

    }
    function callHook(vm, hook) {
      const handlers = vm.$options[hook];

      if (handlers) {
        for (let index = 0; index < handlers.length; index++) {
          const handler = handlers[index];
          handler.call(vm);
        }
      }
    }

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        const vm = this;
        vm.$options = mergeOptions(vm.constructor.options, options);
        callHook(vm, 'beforeCreate'); // 初始化数据

        initState(vm);
        callHook(vm, 'created');

        if (vm.$options.el) {
          vm.$mount(vm.$options.el);
        }
      };
    }

    Vue.prototype.$mount = function (el) {
      const vm = this;
      const options = vm.$options;
      el = document.querySelector(el);
      vm.$el = el;

      if (!options.render) {
        // 如果无render属性 判断有无template
        let template = options.template; // 无template 且有el则将el内容赋值给template

        if (!template && el) {
          template = el.outerHTML;
        }

        const render = compilerToFunction(template);
        options.render = render;
      } // options中存在render后 开始挂载此组件


      callHook(vm, 'beforeMount');
      mountComponent(vm);
      callHook(vm, 'mounted');
    };

    function renderMixin(Vue) {
      Vue.prototype._render = function () {
        const vm = this;
        const render = vm.$options.render;
        let vnode = render.call(vm);
        return vnode;
      };

      Vue.prototype._c = function () {
        // 创建元素
        return createElement(...arguments);
      };

      Vue.prototype._v = function (text) {
        // 创建文本
        return createTextVnode(text);
      };

      Vue.prototype._s = function (val) {
        // stringify
        return val == null ? '' : typeof val == 'object' ? JSON.stringify(val) : val;
      };
    }

    function createElement(tag, data = {}, ...children) {
      let key = data.key;

      if (key) {
        delete data.key;
      }

      return vnode(tag, data, key, children);
    }

    function createTextVnode(text) {
      return vnode(undefined, undefined, undefined, undefined, text);
    } // 产生虚拟dom  与ast相比 差异在于 可以自定义数据格式


    function vnode(tag, data, key, children, text) {
      return {
        tag,
        data,
        key,
        children,
        text
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
    } // 原型方法


    initMixin(Vue);
    lifecycleMixin(Vue);
    renderMixin(Vue); // 静态方法

    initGlobalApi(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map
