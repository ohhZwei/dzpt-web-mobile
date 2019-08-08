import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    userInfo: { // 用户信息
      userName: '',
      userId: ''
    },
    goodInfo: { // 商品详情页挂牌号
      listedGoodsId: '',
      tradingId: '',
      status: '',
      createDate: ''
    },
    messageInfo: { // 新信息数量
      count: ''
    }
  },
  actions,
  mutations
})
