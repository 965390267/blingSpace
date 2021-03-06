import {
    observe
} from './index.js';
import {arrayMethods,observerArray, dependArray} from './array.js';


/**
 * 定义响应式的数据变化
 */
export function defineReactive(data, key, value) {
    // 递归观察
    let childOb = observe(value);

    Object.defineProperty(data, key, {
        get() {
            console.log("触发取值操作");

            return value
        },
        set(newValue) {
            // console.log('设置数据');
            if (newValue === value) return;
            observe(newValue)
            // console.log(newValue,dep);

            console.log("渲染页面");

        }
    })

}

class Observer {
    /**
     *
     * @param {*} data   vm._data
     */
    constructor(data) {
        // 每个对象包括数组都有一个__ob__属性，返回的是当前observer实例
        Object.defineProperty(data,'__ob__',{
            get:()=>this
        })
        if (Array.isArray(data)) {
            // 只能拦截数组的方法，但对数组中的每一项 无法监听 需要观测
            data.__proto__ = arrayMethods;
            observerArray(data)
            // console.log(data,arrayMethods);

        } else {
            this.walk(data)
        }
    }
    walk(data) {
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let value = data[keys[i]];
            defineReactive(data, key, value)

        }
    }
}


export default Observer;