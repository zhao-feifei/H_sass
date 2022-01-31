import Cookies from 'js-cookie'
import store from '@/store'
//设置一个独一无二的key
const TokenKey = 'hrsass_token'
const timeKey = 'hrsass_timekey'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}
// 设置时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}
