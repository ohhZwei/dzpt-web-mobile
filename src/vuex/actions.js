// 用户登录
export const login = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem('loginInfo', JSON.stringify(data))
    commit('SET_USER_LOGIN_INFO', data)
    resolve(true)
    return true
  })
}

// 请求获得商品详细信息
export const loadGood = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem('goodInfo', JSON.stringify(data))
    commit('SET_GOODS_INFO', data)
    resolve(true)
    return true
  })
}

// 请求获得新信息数量
export const setMsg = ({ commit }, data) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem('messageInfo', JSON.stringify(data))
    commit('SET_MESSAGE_INFO', data)
    resolve(true)
    return true
  })
}

// 退出登陆
export const signOut = ({ commit }) => {
  localStorage.removeItem('loginInfo')
  commit('SET_USER_LOGIN_INFO', {})
}

// 退出当前挂牌号
export const goodOut = ({ commit }) => {
  localStorage.removeItem('goodInfo')
  commit('SET_GOODS_INFO', {})
}

// 判断是否登陆
export const isLogin = ({ commit }) => {
  const user = localStorage.getItem('loginInfo')
  if (user) {
    commit('SET_USER_LOGIN_INFO', JSON.parse(user))
  }
}

// 判断是否在商品页
export const isGood = ({ commit }) => {
  const good = localStorage.getItem('goodInfo')
  if (good) {
    commit('SET_GOODS_INFO', JSON.parse(good))
  }
}

// 判断是否有信息
export const isMessage = ({ commit }) => {
  const message = localStorage.getItem('messageInfo')
  if (message) {
    commit('SET_MESSAGE_INFO', JSON.parse(message))
  }
}
