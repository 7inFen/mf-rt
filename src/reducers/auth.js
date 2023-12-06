import util from './util'
import * as constants from '../constants/auth'
import storage from 'store'

const initialState = {
  account: storage.get('account') || { auth: null },
  isLogining: false,
  isAuthing: false,
  authSuccess: false,
}

const resetAccount = () => {
  storage.set('account', {})
  return {
    ...initialState,
    account: {},
  }
}

const login = {
  prefix: constants.AUTH_USER_LOGIN,
  request: (state) => {
    return {
      ...state,
      isLogining: true,
    }
  },
  success: (state, payload) => {
    console.log(payload)
    storage.set('account', payload)
    return { ...state, account: payload, logged: true, isLogining: false }
  },
  fail: (state) => {
    return resetAccount()
  },
}

const authAccountInfo = {
  prefix: constants.AUTH_ACCOUNT_INFO,
  request: (state) => {
    return {
      ...state,
      isAuthing: true,
    }
  },
  success: (state, payload) => {
    console.log(payload)
    const accountInfo = {
      ...payload,
      auth: payload.auth || state.account?.auth,
      account_type: `${payload.account_type || state.account?.account_type}`,
      account_status: `${payload.account_status || state.account?.account_status}`,
    }
    storage.set('account', accountInfo)
    return {
      ...state,
      account: accountInfo,
      logged: true,
      authSuccess: true,
      isAuthing: false,
    }
  },
  fail: (state) => {
    return resetAccount()
  },
}

const others = {
  [constants.AUTH_USER_LOGOUT]: (state, payload) => {
    return resetAccount()
  },
}

export default util([login, authAccountInfo], initialState, others)
