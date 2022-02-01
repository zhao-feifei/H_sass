import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login } from '@/api/user'
import store from '..'
const state = {
  token: getToken(),
  userInfo: {}
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
  },
  setUserInfo(state, result) {
    state.userInfo = { ...result }
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

const actions = {
  async login(context, data) {
    const result = await login(data)
    context.commit('setToken', result)
    setTimeStamp() // 将当前的最新时间写入缓存
  },
  async getUserInfo(context) {
    //唯一需要的参数token已经在请求拦截器中注入了
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
