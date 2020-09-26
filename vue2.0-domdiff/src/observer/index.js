import {arrayMethods} from './array';
import { defineProperty } from '../util';
import Dep from './Dep';
class Observer {
    constructor(data){

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
    observe(value)

    let dep = new Dep();
    Object.defineProperty(data,key,{
        get(){
            if(Dep.target){
                dep.depend();
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