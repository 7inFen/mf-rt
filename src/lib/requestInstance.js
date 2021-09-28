import axios from 'axios'
import apiConfig from '../../api'
import handleError from './handleError'
import qs from 'qs'
import { parseArray } from '../utils/parsePost'

// axios.defaults.adapter = require('axios/lib/adapters/http')

export const apiList = apiConfig.apiList

const stringify = (params = '') =>
  qs.stringify(params, {
    skipNull: true,
    arrayFormat: 'repeat',
  })

// axios 配置及队列管理
// https://www.cnblogs.com/small-coder/p/9122820.html
// axios 拦截
// https://github.com/ohhoney1/notes/issues/3

const requestInstance = axios.create({
  baseURL: apiConfig.apiBaseUrl,
  headers: {
    // 'User-Language': store.get('locale') || 'en-US'
    // 'Cache-Control': 'no-store',
  },
  // only applicable for request methods 'PUT', 'POST', and 'PATCH'
  transformRequest: [(data) => stringify(data)],
  paramsSerializer: (params) => stringify(params),
  validateStatus: (status) => {
    if (status >= 200 && status < 300) {
      return true
    } else {
      handleError(status)
    }
  },
})

const getFlagUrl = (config) => {
  // make sure the url is same for both request and response
  const { url = '', method = '', params = {}, data = '' } = config
  let path = url.replace(config.baseURL, '')
  if (!path.startsWith('/')) {
    path = `/${path}`
  }
  let paramsValue = ''
  if (method === 'post') {
    paramsValue = typeof data === 'string' ? data : stringify(data)
  } else {
    paramsValue = stringify(params)
  }
  return `${method}_${path}_${paramsValue}`
}

// abort duplicate request
const pending = {}
const CancelToken = axios.CancelToken
const removePending = (config, c) => {
  // console.log(config, c)
  const flagUrl = getFlagUrl(config)
  // console.error(flagUrl);
  if (flagUrl in pending) {
    if (c) {
      // abort the request
      c()
    } else {
      delete pending[flagUrl]
    }
  } else {
    if (c) {
      // store the cancel function
      pending[flagUrl] = c
    }
  }
}

const populateParams = (params) => {
  const paramsValue = params
  for (const key in params) {
    if (Object.hasOwnProperty.call(params, key)) {
      const value = params[key]
      if (value instanceof Array) {
        paramsValue[key] = parseArray(value)
      }
    }
  }
  return paramsValue
}

// 添加请求拦截器
requestInstance.interceptors.request.use(
  (config) => {
    const appStore = require('../store/appStore').default
    // console.log(appStore.default.getState())
    const appState = appStore?.getState?.()
    // const brandId = appState.siteInfo.brandInfo.id || 'all'
    // console.log(config);
    const { account, brandInfo } = appState?.auth || {}
    const auth = account?.auth || null
    // const brandId = brandInfo?.id
    //   ? {
    //       b: brandInfo.id,
    //     }
    //   : {}
    // if (config.method === 'get') {
    //   config.params = populateParams({
    //     ...brandId,
    //     ...config.params,
    //   })
    // } else if (config.method === 'post') {
    //   config.data = populateParams({
    //     ...brandId,
    //     ...config.data,
    //   })
    // }
    // console.log(config)
    // 使用yapi接口
    // console.log(process.env.RUNTIME_ENV, process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'development') {
      if (config.url.startsWith('~') || config.url.startsWith('～')) {
        config.baseURL = apiConfig.yApiBaseUrl
        config.url = config.url.slice(1)
      }
    }

    // cancelToken放在config配置底部
    config.cancelToken = new CancelToken((c) => {
      removePending(config, c)
    })
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: auth,
        'Cache-Control': config.url.includes('export') ? 'no-store' : 'no-cache',
      },
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
requestInstance.interceptors.response.use(
  (response) => {
    removePending(response.config)
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default requestInstance
