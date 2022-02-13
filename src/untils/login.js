import store from '@/store'
import auth from '@/plugins/auth'
import api from '@/api'
import axios from '@/plugins/axios'
import { Message } from 'element-ui'
import router from '@/router'
export default {
  install (Vue) {
    Vue.prototype.doLogin = (params, path = '/main') => {
      return new Promise((resolve, reject) => {
        axios.post(api.common.login, params).then(e => {
          const res = e.data
          if (res.code === 200) {
            Message.success('登录成功')
            auth.setToken(res.data.user.token)
            store.commit('SET_USER_INFO', res.data.user)
            store.commit('SET_CODE_TYPE', res.data.codeType)
            store.commit('SET_CODE_INFO', res.data.codeInfo)
            const menuList = Vue.prototype.initMenu(res.data.menu)
            store.commit('SET_MENU_LIST', menuList)
            store.commit('SET_MENU_LIST_HIS', res.data.menu)
            store.commit('SET_MENU_LOADED', true)
            router.addRoutes(menuList)
            resolve(path)
          } else {
            Message.error(res.message)
          }
        })
      })
    }
    Vue.prototype.loginOut = () => {
      sessionStorage.clear()
      store.commit('RESET_APP')
      store.commit('RESET_USER')
      Message.success('退出成功')
      router.push({
        path: '/login'
      })
    }
    Vue.prototype.initFun = () => {
    }
    Vue.prototype.lazyLoadCom = menuUrl => {
      return () => import('@/views' + menuUrl).catch(e => {
        return import('@/components/common/errorPage')
      })
    }
    Vue.prototype.initMenu = (menuList) => {
      const routerConstrutor = (reslut, type) => {
        return {
          path: reslut.menuUrl,
          name: reslut.menuId,
          hideInMenu: reslut.isShow,
          meta: {
            title: reslut.menuName,
            icon: reslut.imageUrl,
            breakcrumb: [reslut.menuName]
          },
          component: type === 1 ? () => import('@/views/index') : Vue.prototype.lazyLoadCom(reslut.menuUrl),
          children: []
        }
      }
      const parentMenuList = []
      menuList
        .filter(item => item.parentMenuId == null)
        .forEach(item => parentMenuList.push(routerConstrutor(item, 1)))
      menuList.forEach(item => {
        if (item.parentMenuId) {
          const route = routerConstrutor(item, 2)
          delete route.children
          const obj = parentMenuList.find(e => e.name === item.parentMenuId)
          if (obj) {
            route.meta.breakcrumb.splice(0, 0, obj.meta.title)
            obj.children.push(route)
          }
        }
      })
      parentMenuList.forEach(item => {
        if (item.children.length === 0) {
          delete item.children
          item.component = Vue.prototype.lazyLoadCom(item.path)
        }
      })
      return parentMenuList
    }
    Vue.prototype.changeMenu = () => {
      if (store.getters.getMenuListHis) {
        const menuList = Vue.prototype.initMenu(store.getters.getMenuListHis)
        store.commit('SET_MENU_LIST_HIS', store.getters.getMenuListHis)
        store.commit('SET_MENU_LIST', menuList)
        store.commit('SET_MENU_LOADED', true)
        router.addRoutes(menuList)
      }
    }
  }
}
