import Axios from 'axios'
import auth from '@/plugins/auth'
import store from '@/store'
import router from '@/router'
import qs from 'qs'
import { Loading, Message } from 'element-ui'
let loading = null
const handleAxios = Axios.create({
  method: 'post',
  timeout: 16000,
  baseURL: process.env.VUE_APP_BASE_API,
  responseType: 'json',
  isRetryRequest: false,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
// 拦截器
handleAxios.interceptors.request.use(config => {
  if (loading) {
    loading = close()
  }
  loading = Loading.service({
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, .7)',
    target: document.querySelector('.content-loading')
  })
  const token = auth.getToken()
  if (token) {
    config.headers.Authorization = `${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应器
handleAxios.interceptors.response.use(response => {
  if (loading) {
    loading.close()
  }
  if (response.data) {
    // 400，token失效
    if (response.data.code === 400) {
      sessionStorage.clear()
      store.commit('RESET_APP')
      store.commit('RESET_USER')
      router.push({
        path: '/login'
      })
    }
  }
  return response
}, error => {
  if (loading) {
    loading.close()
  }
  if (error.response) {
    error.message = `请求出错（${error.response.status}）!`
  } else {
    if (error.message.includes('timeout')) {
      error.message = '网络连接超时，请重试'
    } else {
      error.message = '网络连接错误，请重试'
    }
  }
  Message({
    message: error.message,
    duration: 3000,
    type: 'error'
  })

  return Promise.reject(error)
})
function filters (v) {
  const newObj = {}
  for (const k in v) {
    if (v[k]) {
      newObj[k] = v[k]
    }
  }
  return newObj
}
export default {
  handleAxios,
  post (url, params) {
    handleAxios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return handleAxios({
      method: 'post',
      url: url,
      data: qs.stringify(filters(params))
    })
  },
  get (url, params) {
    const paramt = filters(params)
    return handleAxios({
      method: 'get',
      url,
      paramt
    })
  },
  download (url, data) {
    handleAxios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return handleAxios({
      method: 'post',
      url,
      data: qs.stringify(filters(data)),
      responseType: 'blob'
    })
  },
  download_get (url, data) {
    return handleAxios({
      method: 'get',
      url,
      params: filters(data),
      responseType: 'blob'
    })
  },
  upLoadFile (url, file) {
    return handleAxios({
      method: 'post',
      url,
      file
    })
  },
  put (url, data) {
    return handleAxios({
      method: 'put',
      url,
      data: data
    })
  }
}
