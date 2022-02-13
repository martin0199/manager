export default {
  state: {
    isCollapse: true,
    menuList: '',
    menuListHis: '',
    menuLoaded: false
  },
  mutations: {
    RESET_APP: state => {
      state.isCollapse = false
      state.menuList = ''
    },
    SET_MENU_LIST: (state, menuList) => {
      state.menuList = menuList
      sessionStorage.setItem('menuList', JSON.stringify(menuList))
    },
    SET_MENU_LIST_HIS: (state, menuListHis) => {
      state.menuListHis = menuListHis
      sessionStorage.setItem('menuListHis', JSON.stringify(menuListHis))
    },
    SET_IS_COLLAPSE: (state, isCollapse) => {
      state.isCollapse = isCollapse
      sessionStorage.setItem('isCollapse', isCollapse)
    },
    SET_MENU_LOADED: (state, menuLoaded) => {
      state.menuLoaded = menuLoaded
    }
  },
  getters: {
    getMenuLoaded: state => state.menuLoaded,
    getMenuList: state => {
      if (!state.menuList && JSON.parse(sessionStorage.getItem('menuList'))) {
        state.menuList = JSON.parse(sessionStorage.getItem('menuList'))
      }
      return state.menuList
    },
    getMenuListHis: state => {
      if (!state.menuListHis && JSON.parse(sessionStorage.getItem('menuListHis'))) {
        state.menuListHis = JSON.parse(sessionStorage.getItem('menuListHis'))
      }
      return state.menuListHis
    },
    getIsCollapse: state => {
      if (sessionStorage.getItem('isCollapse')) {
        state.isCollapse = sessionStorage.getItem('isCollapse') === 'true'
      }
      return state.isCollapse
    }
  }
}
