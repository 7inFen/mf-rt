import util from './util'
import * as constants from '../constants/init'
import Immutable from 'immutable'

const initialState = {
  routes: [],
  pathMap: {},
  currentRequestFail: {},
}

const others = {
  REQUEST_FAIL: (state, payload) => {
    // 以下接口不触发全局错误通知
    const silentTypes = ['AUTH_ACCOUNT_LOGIN', 'AUTH_VALIDATE_BRAND']
    let silent = false
    if (process.env.NODE_ENV === 'production') {
      if (payload?.msg === '请勿重复请求') {
        silent = true
      }
    }
    return {
      ...state,
      currentRequestFail: {
        ...payload,
        silent: silent || silentTypes.includes(payload.type),
      },
    }
  },
  [constants.INIT_WITHOUT_AUTH_ROUTES]: (state, payload) => {
    return {
      ...state,
      routes: payload,
    }
  },
  [constants.INIT_AUTH_ROUTES]: (state, payload) => {
    return {
      ...state,
      routes: payload?.routes || [],
      pathMap: payload?.pathMap || {},
    }
  },

  [constants.UPDATE_ROUTES]: (state, payload) => {
    let path = ''
    const routes = state.routes.map((item) => {
      if (item.name === payload.name) {
        path = item.path
        return {
          ...item,
          ...payload,
        }
      }
      return item
    })
    return {
      ...state,
      routes,
      pathMap: Immutable.Map(state.pathMap)
        .update(path, (value) => ({
          ...value,
          ...payload,
        }))
        .toJS(),
    }
  },
}

export default util([], initialState, others)
