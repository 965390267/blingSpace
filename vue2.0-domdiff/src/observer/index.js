import {arrayMethods} from './array';
import { defineProperty } from '../util';
import Dep from './Dep';
class Observer {
    constructor(data){
        this.dep = new Dep();
        if (Array.isArray(data)) {
            // 新增属性，声明此属性已被观测
            defineProperty(data,"__ob__",this);

            // 只能拦截数组的方法，但对数组中的每一项 无法监听 需要观测
            data.__proto__ = arrayMethods;
            this.observerArray(data)
            // console.log(data,arrayMethods);

        } else {
            this.walk(data)
        }
    }
    walk(data){
        let keys = Object.keys(data);
        keys.forEach(key=>{
            defineReactuve(data,key,data[key]);
        })
    }
    observerArray(value) {
        for (let i  = 0; i < value.length; i++) {
            observe(value[i])
        }
    }
}

function defineReactuve(data,key,value){
    // 实现递归
    // 获取到数组对应的dep
    let childDep = observe(value);


    let dep = new Dep();
    Object.defineProperty(data,key,{
        get(){
            if(Dep.target){
                dep.depend();
                if(typeof childDep == 'object'){
                    childDep.dep.depend();
                }
            }
            console.log('用户取值');
            return value
        },
        set(newValue){
           
            console.log('用户赋值');
            if(value !== newValue){
                // 对新赋值的对象进行观测
                observe(newValue);
                value = newValue
            }
            dep.notify();
        }
    }
    )


}

export function observe(data){
    if(typeof data !== 'object' || data == null){
        return;
    }
    if(data.__ob__) return;
    return new Observer(data);
}


// 目标：当前数组需要记录当前渲染watcher 以在数组数据变化时发布
// 1. 为所有对象类型增加一个dep属性
// 2. 取arr时会调用get方法 让数组的dep记住这个watcher
// 3. 更新数组时（7个方法），找到数组对应的dep进行发布