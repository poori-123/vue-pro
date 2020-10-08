import Vue from 'vue'
import Vuex from 'vuex'
import dish from './module/dish';
import order from './module/order';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    confirmOrder: [],
  },
  mutations: {
    setConfirmOrder(state,payload){
      state.confirmOrder = payload;
    }
  },
  actions: {
  },
  modules: {
    dish,
    order
  }
})
