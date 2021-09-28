/**
 * Default development API config.
 * 根据/src/lib/request中对api的解析规则
 * apiList子key的值为对象集合
 * 且key不能为`js`, `json`, `ts`中的一种
 */
import project from '../config/project'

const { host, port } = project

let BASE_URL = `http://${host}:${port.mock}/`
// let BASE_URL = `http://192.168.1.62:${project.port.mock}/`
if (process.env.NODE_ENV === 'production') {
  // BASE_URL = `http://61.174.52.49:${project.port.mock}`
  BASE_URL = `http://${host}:${port.mock}/`
}
export default {
  apiBaseUrl: BASE_URL,
  yApiBaseUrl: 'http://61.174.52.49:9400/mock/20/',
  uploadFile: 'https://testkolapi.mdfull.com/file/add', // 上传
  // uploadFile: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  downloadFile: '',
  tokenName: 'vra-token',
  apiList: {
    common: {},
    auth: {
      login: 'auth/login.json',
      accountInfo: 'auth/accountInfo.json',
      changePassword: 'common/common.json?api=auth.changePassword',
    },
  },
}
