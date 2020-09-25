import { observe } from "./index.js";

// 拦截用户调用的push shift unshift pop reverse sort splice concat

let oldArrayProtoMethods = Array.prototype;

export let arrayMethods = Object.create(oldArrayProtoMethods);

let methods = ['push','shift','unshift', 'pop', 'reverse', 'sort', 'splice', 'concat'];


methods.forEach(method=>{
    // console.log(arrayMethods,method);

    arrayMethods[method] = function (...args){
        let r = oldArrayProtoMethods[method].apply(this,args)

        // todo
        let inserted;
        let ob = this.__ob__;
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

        if(inserted) ob.observerArray(inserted)
        return r;

    }
})

