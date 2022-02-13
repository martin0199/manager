import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '@/plugins/auth'
import store from '@/store'
import NProgress from 'nprogress'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    hideInMenu: true
  }
]
const router = new VueRouter({
  routes
})
NProgress.start()
router.beforeEach((to, from, next) => {
  const token = auth.getToken()
  if (to.path === '/') {
    if (token) {
      next({
        path: '/main'
      })
    } else {
      next({
        path: '/login'
      })
    }
  } else if (to.path === '/login') {
    if (token) {
      next({
        path: '/main'
      })
    } else {
      next()
    }
  } else {
    if (token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
  if (!store.getters.getMenuLoaded) {
    Vue.prototype.changeMenu()
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
