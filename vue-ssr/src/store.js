import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default ()=>{
    let store = new Vuex.Store({
        state:{
            username:'zf'
        },
        mutations:{
            set_user(state){
                state.username = 'hello'
            }
        },
        actions:{
            set_user({commit}){
                return new Promise((resolve,reject)=>{
                    setTimeout(() => {
                        commit('set_user');
                        resolve();
                    }, 1000);
                })
            }
        }
    });

    if(typeof window !== 'undefined' && window.__INITIAL_STATE__){
        store.replaceState(window.__INITIAL_STATE__)
    }
    return store
}

