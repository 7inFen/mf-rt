import requestInstance from './requestInstance'
import getApiFullPath from '../utils/getApiFullPath'
import { getUploadFilesKey } from '../utils/getUploadFiles'
import { message } from '../hooks/useApp'
import storejs from 'store'

/**
 *
 *
 * @param {*} {
 *   url = '', 必填
 *   method = 'get',
 *   params = {},
 *   type = '', 仅传type会自动扩充_REQUEST, _SUCCESS, _FAIL后缀
 *   types = [], 优先使用指定的types数组各项进行dispatch
 *   onSuccess = f => f,
 *   onFail = f => f,
 *   // onError = f => f,
 *   // onComplete = f => f
 * }
 * @returns
 */
const request = ({
  url: requestUrl = '',
  method = 'get',
  params: requestParams = {},
  type: requestType = '',
  types: requestTypes = [],
  onSuccess = (f) => f,
  onFail = (f) => f,
  reducer = null,
  // onError = f => f,
  // onComplete = f => f
}) => {
  const url = getApiFullPath(requestUrl)
  const isGet = `${method}`.toLowerCase() === 'get'
  const newParam = {}
  for (const key in requestParams) {
    if (![undefined, null].includes(requestParams[key])) {
      const current = requestParams[key]
      // 格式化上传文件字段
      // if (current?._upload) {
      //   newParam[key] = getUploadFilesKey([current])
      // } else
      if (current[0]?._upload || current[0]?.uid) {
        newParam[key] = getUploadFilesKey(current)
      } else {
        newParam[key] = current
      }
    }
  }
  const params = isGet ? { params: newParam } : newParam
  const types = requestTypes instanceof Array ? requestTypes : [requestTypes]
  let dispatchRequest = ''
  let dispatchSuccess = ''
  let dispatchFail = ''
  let type = requestType
  if (types.length) {
    ;[dispatchRequest, dispatchSuccess, dispatchFail] = types
  } else if (reducer || type) {
    if (reducer) {
      type = reducer.prefix
    }
    dispatchRequest = `${type}_REQUEST`
    dispatchSuccess = `${type}_SUCCESS`
    dispatchFail = `${type}_FAIL`
  }
  const cbParams = { ...newParam }
  return (dispatch) => {
    dispatchRequest &&
      dispatch({
        type: dispatchRequest,
        payload: cbParams,
      })
    requestInstance[method](url, params)
      .then((res) => {
        const { data, status = '', msg = '请求失败', code } = res.data
        if (Number(code) === 401) {
          // 登录失效
          storejs.set('account', {})
          window.location.replace('/login')
          return
        }
        if (status === 'success') {
          const handleResData = onSuccess(data, dispatch, cbParams)
          dispatchSuccess &&
            dispatch({
              type: dispatchSuccess,
              payload: handleResData || data,
            })
        } else {
          const handleResData = onFail(msg, dispatch, cbParams)
          if (dispatchFail) {
            dispatch({
              type: dispatchFail,
              payload: handleResData || msg,
            })
            // 使用统一的错误处理
            dispatch({
              type: 'REQUEST_FAIL',
              payload: {
                time: Date.now(),
                url,
                method,
                params,
                type,
                types,
                msg,
                msgType: 'error',
              },
            })
          } else {
            message.error(msg)
          }
        }
      })
      .catch((err) => {
        console.error(err)
        if (process.env.NODE_ENV === 'production') {
          return
        }
        const msg = err.message || '请勿重复请求'
        onFail(msg, dispatch)
        if (dispatchFail) {
          dispatch({
            type: dispatchFail,
            payload: err.msg,
          })
          dispatch({
            type: 'REQUEST_FAIL',
            payload: {
              time: Date.now(),
              url,
              method,
              params,
              type,
              types,
              msg,
              msgType: 'warning',
            },
          })
        } else {
          message.warning(`${msg}, ${url}`)
        }
      })
  }
}

export default request
