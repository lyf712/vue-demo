import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  user: '张三',
  age:12
}
const mutations={
  increment(age) {
    state.age++
  }
}
export default new Vuex.Store({
  state,
  mutations
})
