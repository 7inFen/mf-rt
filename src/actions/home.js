import request from '../lib/request'

export const fetchHomeData = params => request({
  url: 'home.index',
  params,
  type: 'HOME',
  onSuccess: data => {

  }
})

export const submit = params => request({
  url: 'home.submit',
  method: 'post',
  params
})
