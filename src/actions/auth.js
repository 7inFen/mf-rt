import * as types from '../constants/auth'
import request from '../lib/request'

export const login = (params, successCallback, failCallback) =>
  request({
    url: 'auth.login',
    params,
    method: 'post',
    type: types.AUTH_USER_LOGIN,
    onSuccess: (data) => {
      successCallback && successCallback(data)
      return data
    },
    onFail: failCallback,
  })

export const logout = () => {
  return function (dispatch) {
    dispatch({
      type: types.AUTH_USER_LOGOUT,
    })
  }
}

export const getAccountInfo = (auth, successCallback, failCallback) =>
  request({
    url: 'auth.accountInfo',
    type: types.AUTH_ACCOUNT_INFO,
    onSuccess: (data) => {
      const combineData = {
        auth,
        ...data,
      }
      successCallback && successCallback(combineData)
      return combineData
    },
    onFail: failCallback,
  })

export const resetPassword = (params, onSuccess, onFail) =>
  request({
    url: 'auth.resetPassword',
    method: 'post',
    params,
    onSuccess,
    onFail,
  })

export const changePassword = (params, onSuccess, onFail) =>
  request({
    url: 'auth.changePassword',
    method: 'post',
    params,
    onSuccess,
    onFail,
  })
