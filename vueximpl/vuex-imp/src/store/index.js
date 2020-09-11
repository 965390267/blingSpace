import Vue from 'vue'
import Vuex from '../vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 100
  },
  mutations: {
    add(state){
      state.count += 1;
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
  }
})
