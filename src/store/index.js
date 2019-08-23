import Vue from 'vue'
import Vuex from 'vuex'
import { getUser, saveUser } from '@/utils/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getUser()
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      saveUser(state.user)
    }
  },
  actions: {

  }
})
