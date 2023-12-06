/**
 * 涉及文件：src/lib/request.js, src/components/Upload.js
 * 处理接口请求失败的场景，包含上传文件接口
 * html code 在非200到300的时候调用
 */
import { message } from '../hooks/useApp'
import history from '../store/history'
import storejs from 'store'
// import project from '../../config/project'
// import { appStore } from '../index'

// let showFailModal = false
export default (code) => {
  // console.log(code, showFailModal)
  if (code === 401 || code === 403) {
    // const auth = store.get('account', {}).auth || null
    // // const auth = appStore.getState().auth.account.auth || null
    // if (!showFailModal && auth) {
    //   showFailModal = true
    //   Modal.confirm({
    //     title: '提示',
    //     content: '登录已失效，请重新登录',
    //     onOk: () => {
    //       showFailModal = false
    //       const redirectUrl = encodeURIComponent(window.location.pathname || project.history.baseName)
    //       store.set('account', {})
    //       window.location.replace(`/login?redirect=${redirectUrl}`)
    //       // history.replace(`/login?redirect=${redirectUrl}`)
    //     },
    //     onCancel: () => {
    //       showFailModal = false
    //     },
    //   })
    // }

    // 登录失效
    storejs.set('account', {})
    window.location.replace('/login')
  } else if (code >= 500) {
    history.push('/500')
  } else {
    message.error(`错误：${code || '请求失败'}`)
  }
}
