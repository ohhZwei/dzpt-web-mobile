import Vue from 'vue'
import Router from 'vue-router'
import Sell from '@/components/Sell'

// const Sell = resolve => require(['@/components/Sell'], resolve)
const Login = resolve => require(['@/components/Login'], resolve)
const Product = resolve => require(['@/components/Product'], resolve)
const MyCar = resolve => require(['@/components/MyCar'], resolve)
const MyTrading = resolve => require(['@/components/MyTrading'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'Sell',
      component: Sell
    },
    // 登录
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    // 商品采购
    {
      path: '/Sell',
      name: 'Sell',
      component: Sell
    },
    // 商品详情
    {
      path: '/Product',
      name: 'Product',
      component: Product
    },
    // 进货单
    {
      path: '/MyCar',
      name: 'MyCar',
      component: MyCar
    },
    // 我的交易
    {
      path: '/MyTrading',
      name: 'MyTrading',
      component: MyTrading
    },
    // 我的交易
    {
      path: '/Order',
      name: 'MyTrading',
      component: MyTrading
    }
  ]
})
