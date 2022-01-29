import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken()
}
const mutations = {
  setToken(state, token) {
    //将数据设置给vuex
    this.state.token = token
    // 同步给缓存
    setToken(token)
  },
  removeToken(state) {
    //vuex置空并清除缓存
    this.state.token = null
    removeToken()
  }
}

const actions = {}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
