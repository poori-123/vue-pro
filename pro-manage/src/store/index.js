import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import table from './module/table';
import dishType from './module/dishType';
import dish from './module/dish';

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
    dish
  }
})
