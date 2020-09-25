
export const LIFECYCLE_HOOKS   = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "beforeDestory",
    "destoryed"
];

const strats = {};
strats.data = function (parentVal,childValue){
    return childValue
}
strats.computed = function (){}
strats.watch = function (){}
function mergeHook(parentVal,childValue){ // 生命周期的合并
    if(childValue){
        // 父有子有
        if (parentVal) {
            return parentVal.concat([childValue]);
        }else {
            // 父无子有
            return [childValue];
        }
    }
    else {
        // 父有子无
        return parentVal;
    }
}

LIFECYCLE_HOOKS.forEach(lifeCycle=>{
    strats[lifeCycle] = mergeHook;
})
export function mergeOptions(parent,child) {
    const options = {};
    // 遍历处理父亲所有key
    for (const key in parent) {
            mergeField(key);
    }
    // 遍历所有父无子有属性
    for (const key in child) {
        if (!parent.hasOwnProperty(key)) {
            mergeField(key);
        }
    }
    // 子有父无

    
    /**
     * 合并字段
     * @param {*} key 
     */
    function mergeField(key) {
        if(strats[key]){
            options[key] = strats[key](parent[key],child[key]);
        }else {
            options[key] = child[key];
        }
    }
    return options;
}

export function defineProperty(target,key,value) {
    Object.defineProperty(target,key,{
        enumerable:false,
        configurable: false,
        value
    })
}

