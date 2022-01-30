import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
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

const actions = {
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}
