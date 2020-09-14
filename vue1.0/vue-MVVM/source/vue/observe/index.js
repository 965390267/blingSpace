import Observer from './observer';

export function initState(vm) {
    // 做不同的初始化工作
    let opts = vm.$options;
    if(opts.data){
        initData(vm);
    }
    if(opts.computed){
        initComputed(vm,opts['computed']);
    }
    if(opts.watch){
        initWatch(vm);
    }
}


function initData(vm) {
    let data = vm.$options.data;
    // 拷贝 避免污染数据源
    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};
    // 代理vm上的赋值和取值操作
    for(let key in data){
        proxy(vm,"_data",key)
    }
    // 观察数据
    observe(vm._data);
}

function initComputed(params) {

}
function initWatch(params) {

}



/**
 * 代理vm上的赋值和取值操作
 * @param {*} vm
 * @param {*} source
 * @param {*} key
 */
function proxy(vm,source,key) {
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key]
        },
        set(newValue){
            vm[source][key] = newValue;
        }
    })
}

/**
 * 将数据设置为响应式
 * @param {*} data
 */
export function observe(data) {
    if(typeof data !== 'object' || data == null){
        return;
    }
    if(data.__ob__){
        return data.__ob__;
    }
    return new Observer(data);
}