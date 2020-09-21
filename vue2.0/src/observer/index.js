class Observer {
    constructor(value){
       
        this.walk(value);
    }
    walk(data){
        let keys = Object.keys(data);
        keys.forEach(key=>{
            defineReactuve(data,key,data[key]);
        })
    }
}

function defineReactuve(data,key,value){
    // 实现递归
    observe(value)
    Object.defineProperty(data,key,{
        get(){
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
    console.log(data);
    if(typeof data !== 'object' || data !== null){
        return;
    }
    return new Observer(data);
}