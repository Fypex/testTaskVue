import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import products from './products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    products,
  }
})
