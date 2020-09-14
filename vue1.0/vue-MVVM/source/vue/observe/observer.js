import {
    observe
} from './index.js';


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
            // 拦截数组

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