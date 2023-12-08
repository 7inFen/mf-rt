import request from '../lib/request'

export const getList = (params, onSuccess, onFail) =>
  request({
    url: '项目.列表',
    params,
    onSuccess,
    onFail,
  })
