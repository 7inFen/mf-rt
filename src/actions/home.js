import request from '../lib/request'

export const fetchHomeData = (params) =>
  request({
    url: 'home.index',
    type: 'HOME',
    params,
  })

export const submit = (params) =>
  request({
    url: 'home.submit',
    method: 'post',
    params,
  })
