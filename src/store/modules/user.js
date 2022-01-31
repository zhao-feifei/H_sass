import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login } from '@/api/user'
import store from '..'
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
    console.log(result)
    console.log('获得数据，准备存入token')
    context.commit('setToken', result)
    console.log(store.getters.token)
    console.log('存入token完毕111111')
    setTimeStamp() // 将当前的最新时间写入缓存
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
