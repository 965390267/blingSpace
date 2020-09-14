import {
    observe
} from './index.js';
import {arrayMethods,observerArray, dependArray} from './array.js';
import Dep from './dep.js';

/**
 * 定义响应式的数据变化
 */
export function defineReactive(data, key, value) {
    // 递归观察
    let childOb = observe(value);
    // dep 收集依赖
    let dep = new Dep();
    Object.defineProperty(data, key, {
        get() {
            // 如果是watcher  则会有值  目前为渲染watcher 
            // 需要考虑watcher重复问题 所以不直接addSub
            if(Dep.target){
                // 让watcher 和 dep 记录多对多的关系
                dep.depend();
                // dep.addSub(Dep.target)
                if(childOb){
                    childOb.dep.depend(); // 数组收集当前渲染watcher
                    dependArray(value);
                }
            }
            return value
        },
        set(newValue) {
            // console.log('设置数据');
            if (newValue === value) return;
            observe(newValue)
            // console.log(newValue,dep);
            

            value = newValue;
            // 执行watcher
            dep.notify();
        }
    })

}

class Observer {
    /**
     * 
     * @param {*} data   vm._data 
     */
    constructor(data) {
        // console.log('observer',data);
        // 如果是数组
        // 此dep只属于数组 虽然对象都有，但非数组对象无意义，因为已经收集过了，所以在addDep时会被忽略，但数组在调用方法时如果没有这个，则无法收集依赖，无法更新视图
        this.dep = new Dep()  
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