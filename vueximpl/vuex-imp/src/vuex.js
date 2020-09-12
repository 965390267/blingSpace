let Vue;
// 默认会被传递Vue的构造
let install = (_vue) => {
    console.log(_vue);
    Vue = _vue;
    // mixin混入 实现每个组件上挂载$store属性
    Vue.mixin({
        beforeCreate(){
            // 判斷是否为根组件
            if(this.$options && this.$options.store) {
                this.$store = this.$options.store
            }else {
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}
class ModuleCollection {
    constructor(options){
        this.register([], options);
    }
    register(path,rawModule){
        let newModule = {
            _raw: rawModule, // 当前store
            _children: {}, // 子模块
            state: rawModule.state // 自己模块的状态
        }
        // 判断是否为最顶层
        if(path.length == 0){
            this.root = newModule; // 根
        }else {
            let parent = path.slice(0,-1).reduce((root,current)=>{
                return root._children[current];
            },this.root);
            parent._children[path[path.length-1]] = newModule;
        }
        if(rawModule.modules){
            forEach(rawModule.modules, (childName,module) => {

                this.register(path.concat(childName),module)
            })
        }
    }
}

function installModule(store,rootState,path,rootModule){

    if(path.length > 0){
        // 先找到对应父模块
        let parent = path.slice(0,-1).reduce((root,current)=>{
            return root[current];
        },rootState)
        // 利用此方式实现响应式 将state挂载在parent上
        Vue.set(
            parent,
            path[path.length-1],
            rootModule.state
        )

    }

    if(rootModule._raw.getters){
        forEach(rootModule._raw.getters,(getterName,getterFn)=>{
            Object.defineProperty(store.getters,getterName,{
                get:()=>{
                    return getterFn(rootModule.state)
                }
            })
        })
    }
    if(rootModule._raw.actions){
        forEach(rootModule._raw.actions,(actionName,actionFn)=>{
           let entry = store.actions[actionName] || (store.actions[actionName]=[]);
           entry.push(()=>{
               actionFn.call(store,store)
           })
        })
    }
    if(rootModule._raw.mutations){
        forEach(rootModule._raw.mutations,(mutationName,mutationFn)=>{
           let entry = store.mutations[mutationName] || (store.mutations[mutationName]=[]);
           entry.push(()=>{
               mutationFn.call(store,rootModule.state)
           })
        })
    }

    forEach(rootModule._children,(childName,module)=>{
        installModule(store,rootState,path.concat(childName),module);
    })
}

class Store {
    constructor(options){
        // this.s = options.state;
        let state = options.state;
        this.getters = {};
        this.mutations = {};
        this.actions = {};

        const computed = {}

        this._vm = new Vue({
            data: {
                state: state
            },
            computed
        })

        this.modules = new ModuleCollection(options);
        console.log( this.modules.root);
        installModule(this,state,[],this.modules.root);
        let {commit,dispatch} = this;
        this.commit = (type) => {
            commit.call(this,type)
        }
        this.dispatch = (type) => {
            dispatch.call(this,type)
        }


    }
    get state(){
        return this._vm.state
    }
    commit(type){
        // console.log(this);
        // console.log(this.mutations[type]);
        // this.mutations[type]()
        this.mutations[type].forEach(mutation=>mutation())
        // console.log(this.mutations[type]);
    }
    dispatch(type){
        // this.actions[type]()
        this.actions[type].forEach(action=>action())
    }
}

function forEach(obj,callback){
    Object.keys(obj).forEach(item=>callback(item,obj[item]));
}

export default  {
    install,Store
}