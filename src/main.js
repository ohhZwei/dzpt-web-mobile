// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { dateFormat } from './utils/dateFormat'

import { getRequest, postRequest, postFormRequest, getBaseUrl } from './utils/api'

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.postFormRequest = postFormRequest
Vue.prototype.getBaseUrl = getBaseUrl

Vue.prototype.dateFormat = dateFormat

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  // eslint-disable-next-line space-before-function-paren
  data: function() {
    return {
      user: 'NONE'
    }
  }
})
