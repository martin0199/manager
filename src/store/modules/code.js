export default {
  state: {
    codeType: '',
    codeInfo: ''
  },
  mutations: {
    SET_CODE_TYPE: (state, value) => {
      state.codeType = value
      sessionStorage.setItem('codeType', JSON.stringify(value))
    },
    SET_CODE_INFO: (state, value) => {
      state.codeInfo = value
      sessionStorage.setItem('codeInfo', JSON.stringify(value))
    }
  },
  getters: {
    getCodeType: state => codeTypeId => {
      if (!state.codeType && sessionStorage.getItem('codeType')) {
        state.codeType = JSON.parse(sessionStorage.getItem('codeType'))
      }
      const res = state.codeType.filter(e => e.codeTypeId === codeTypeId)
      if (res.length > 0) {
        return res[0]
      } else {
        return []
      }
    },
    getCodeInfo: state => codeTypeId => {
      if (!state.codeInfo && sessionStorage.getItem('codeInfo')) {
        state.codeInfo = JSON.parse(sessionStorage.getItem('codeInfo'))
      }
      const res = state.codeInfo.filter(e => e.codeTypeId === codeTypeId)
      if (res.length > 0) {
        return res
      } else {
        return []
      }
    }
  }
}
