// 封装get、post请求
// 添加loading：异步+同步
// 拦截器
// loading 500ms
// loading 自建组件

import axios from 'axios'
import { AxiosRequestConfigMerge, BaseConfig, UeConfig } from './types'
import { getToken } from './utils'
import { logout } from '@/utils/common'
import { ElLoading, ElMessage  } from 'crane-nest'

// 请求loading数量统计
let requestNum = 0
let timer: any = null
// 加载中实例
let loading: any = null

const addLoading = () => {
  // 增加loading 如果pending请求数量等于1，弹出loading, 防止重复弹出
  requestNum++
  console.log(requestNum, 'addLoading-requestNum')
  if (requestNum == 1) {
    timer = setTimeout(() => {
      loading = ElLoading.service({
        lock: true,
        text: '加载中',
        background: 'rgba(0, 0, 0, 0.7)',
      })
    }, 200)
  }
}

const cancelLoading = () => {
  // 取消loading 如果pending请求数量等于0，关闭loading
  // 同步任务
  setTimeout(() => {
    requestNum--
    console.log(requestNum, 'cancelLoading-requestNum')
    if (requestNum === 0) {
      // 如果200ms内请求完成，不显示loading
      timer && clearTimeout(timer)
      loading && loading.close()
    }
  }, 10)
}

// 请求toast数量统计
let toastNum = 0
let toastSuccessArray: string[] = []
let toastFailArray: string[] = []

const pushToast = (msg: string, flag: boolean) => {
  if (flag) {
    msg && toastSuccessArray.push(msg)
  } else {
    msg && toastFailArray.push(msg)
  }
}
/**
 * 减少toast统计
 */
const cancelToast = () => {
  setTimeout(() => {
    toastNum--
    console.log(toastNum, 'cancelToast-toastNum')
    if (toastNum === 0) {
      if (toastSuccessArray.length) {
        console.log(toastSuccessArray)
        ElMessage({
          message: toastSuccessArray.pop(),
          type: 'success',
        })
        toastSuccessArray = []
      } else if (toastFailArray.length) {
        console.log(toastFailArray)
        ElMessage({
          message: toastFailArray.pop(),
          type: 'error',
        })
        toastFailArray = []
      }
    }
  }, 10)
}
/**
 * 增加toast统计
 * @param { boolean } flag 成功 or 失败
 * @param { string } msg 成功 or 失败 提示文案
 */
const addToast = () => {
  toastNum++
  console.log(toastNum, 'addToast-toastNum')
}

// 创建实例
const { VITE_APP_API, DEV } = import.meta.env
// console.log('VITE_APP_API', VITE_APP_API)
// 开发环境走代理，生产环境走对应的环境变量
const baseURL = DEV ? '/api' : VITE_APP_API
console.log(DEV, 'DEV')
const instance = axios.create({
  baseURL,
  timeout: 10000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config: any) {
    // 在发送请求之前做些什么
    const {
      showLoading,
      showSuccessToast,
      showFailToast,
      url,
    } = config
    // 添加loading
    if (showLoading) addLoading()
    if (showSuccessToast || showFailToast) addToast()
    config.headers.token = getToken(url)
    return config
  },
  function (error) {
    // 对请求错误做些什么
    console.log(error, '请求报错')
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 当showLoading为true时，取消请求
    const { showLoading, showSuccessToast, showFailToast } =
      response.config as AxiosRequestConfigMerge
    const { data } = response
    if (data.code === 200) {
      if (showSuccessToast) pushToast(data.message, true)
    } else {
      if (showFailToast) pushToast(data.message, false)
      if (data.code === 401) {
        logout()
      }
    }
    if (showLoading) cancelLoading()
    if (showSuccessToast || showFailToast) cancelToast()
    return data
  },
  function (error) {
    console.log(error, 'error')
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const { showLoading, showFailToast, showSuccessToast } =
      error.config as AxiosRequestConfigMerge
    if (showFailToast) pushToast(error.response.data.message || '服务器异常', false)
    if (showLoading) cancelLoading()
    if (showSuccessToast || showFailToast) cancelToast()
    // console.log(error, '响应拦截error')
    return Promise.reject(error)
  }
)

// 加载中、成功提示、失败提示是否显示
const configDefault = {
  showLoading: true,
  showSuccessToast: false,
  showFailToast: true
}

export const get = (
  url: string,
  params?: object | null,
  config?: object | null
) => {
  const baseconfig = { method: 'get', url, params }
  const ueconfig = Object.assign({}, configDefault, config)
  return service(baseconfig, ueconfig)
}

export const post = (
  url: string,
  params?: object | null,
  data?: object | null,
  config?: object | null,
) => {
  const baseconfig = { method: 'post', url, params, data }
  const ueconfig = Object.assign({}, configDefault, config)
  return service(baseconfig, ueconfig)
}

const service = (baseconfig: BaseConfig, ueconfig: UeConfig) => {
  return new Promise((resolve, reject) => {
    const config = {
      ...baseconfig,
      ...ueconfig,
    }
    instance(config)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

