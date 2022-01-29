import Cookies from 'js-cookie'
//设置一个独一无二的key
const TokenKey = 'hrsass_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
