import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user_info'))
  },
  mutations: {
    setItem (state, user) {
      state.user = user
      // 本地存储 ，防止丢失
      window.localStorage.setItem('user_info', JSON.stringify(state.user))
    }
  },
  getters: {

  }
})

export default store
