import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import table from './module/table';
import dishType from './module/dishType';
import dish from './module/dish';
import order from './module/order';

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    table,
    dishType,
    dish,
    order
  }
})
