import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/element'
import axios from '@/plugins/axios'
import loginApi from '@/untils/login'
import global from '@/plugins/global'
import api from '@/api'
Vue.use(loginApi)
Vue.prototype.$http = axios
Vue.prototype.$global = global
Vue.prototype.$api = api
Vue.config.productionTip = false
// 滚动条回顶部
Vue.prototype.upToTop = () => {
  const dom = document.getElementById('router-main')
  dom.scrollTop = 0
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
