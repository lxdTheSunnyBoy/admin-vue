// 自定义函数模块
// auth.js
// 封装和用户授权相关函数

const userInfoKey = 'user-inof'
export function saveUserInfo (userInfo = {}) {
  window.localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}

export function getUserInfo () {
  return window.localStorage.getItem(userInfoKey)
}

export function getToken () {
  return JSON.parse(getUserInfo()).token
}

export function removeUserInfo () {
  window.localStorage.removeItem(userInfoKey)
}
