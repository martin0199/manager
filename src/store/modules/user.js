export default {
  state: {
    userInfo: {
      userName: '',
      niName: ''
    }
  },
  mutations: {
    RESET_USER: state => {
      state.userInfo = {
        userName: '',
        niName: ''
      }
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    }
  },
  getters: {
    getUserInfo: (state) => {
      if (!state.userInfo.userName && JSON.parse(sessionStorage.getItem('userInfo'))) {
        state.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      }
      return state.userInfo
    }
  }

}
