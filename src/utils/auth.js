import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const sockTokenKey = ''

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove(sockTokenKey)
  return Cookies.remove(TokenKey)
}

export function getSockToken() {
  return Cookies.get(sockTokenKey)
}

export function setSockToken(token) {
  return Cookies.set(sockTokenKey, token)
}
