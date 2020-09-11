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
        if(options.getters){
            let getters = options.getters;
            forEach(getters, (getterName, getterFn) => {

                computed[getterName] = () => {
                    return getterFn(this.state);
                }

                Object.defineProperty(this.getters,getterName,{
                    get:()=>{
                        return getterFn(state);
                    }
                })
            })
        }
        if (options.mutations) {
            let mutations = options.mutations;
            forEach(mutations, (mutationName, mutationFn) => {
                this.mutations[mutationName] =()=> mutationFn.call(this,state);
            })
        }



    }
    get state(){
        return this._vm.state
    }
    commit(type){
        console.log(type);
        console.log(this.mutations[type]);
        this.mutations[type]()
    }
}

function forEach(obj,callback){
    Object.keys(obj).forEach(item=>callback(item,obj[item]));
}

export default  {
    install,Store
}