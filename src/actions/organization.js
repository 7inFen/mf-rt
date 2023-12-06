import request from '../lib/request'

// 取用户列表
export const fetchUserList = (params, onSuccess, onFail) =>
  request({
    url: 'organization.userList',
    params,
    onSuccess,
    onFail,
  })
