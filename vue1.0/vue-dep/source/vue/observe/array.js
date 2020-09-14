import { observe } from "./index.js";

// 拦截用户调用的push shift unshift pop reverse sort splice concat

let oldArrayProtoMethods = Array.prototype;

export let arrayMethods = Object.create(oldArrayProtoMethods);

let methods = ['push','shift','unshift', 'pop', 'reverse', 'sort', 'splice', 'concat'];
/**
 * 循环数组 对数组中的每一项进行观测
 * @param {*} inserted 
 */
export function observerArray(inserted) {
    for (let i  = 0; i < inserted.length; i++) {
        observe(inserted[i])
    }
}
/**
 * 递归收集数组中的依赖
 * @param {*} value 
 */
export function dependArray(value) {
    for (let i = 0; i < value.length; i++) {
        let currentItem = value[i];   // 有可能也是一个数组
        currentItem.__ob__ && currentItem.__ob__.dep.depend();
        if(Array.isArray(currentItem)){
            dependArray(currentItem);   // 不停收集数组中的依赖
        }
        
    }
}
methods.forEach(method=>{
    // console.log(arrayMethods,method);
    
    arrayMethods[method] = function (...args){
        let r = oldArrayProtoMethods[method].apply(this,args)

        // todo
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;break;
            case "splice":
                inserted = args.slice(2) 
            default:
                break;
        }
        // console.log(inserted);
        
        if(inserted) observerArray(inserted)
        // console.log('数组更新方法');
        // 发布数组已经收集的依赖
        this.__ob__.dep.notify();
        return r;
        
    }
})

