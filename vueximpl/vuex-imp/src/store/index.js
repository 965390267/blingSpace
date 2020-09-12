import Vue from 'vue'
import Vuex from '../vuex'
// import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 100
  },
  mutations: {
    add(state){
      state.count += 1;
      console.log("root的add");
    }
  },

  actions: {
    add({commit}){
      commit('add')
      // console.log(commit);
      // state.count += 1;
    }
  },
  getters: {
    value(state){
      return state.count + 100
    }
  },
  modules: {
    a: {
      state: {
        count:201
      },
      modules: {
        b: {
          state: {
            count:300
          },
          mutations: {
            add(state){
             console.log("b的add");
            }
          }
        }
      }
    }
  }
})
