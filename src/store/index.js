import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    items: []
  },

  mutations: {

    clearItems(state) {
      state.items = []
    },

    getItems(state, item) {
      state.items.push(item)
    }

  }
})

export default store
