/**
 * Default predev API config.
 * 根据/src/lib/request中对api的解析规则
 * apiList子key的值为对象集合
 * 且请求path中不能有小数点
 */
import project from '../config/project'

const { YApi } = project

// const BASE_URL = 'http://61.174.52.49:8114'
const BASE_URL = 'https://testkolapi.mdfull.com'
// const BASE_URL = 'http://localhost:8113'
export default {
  apiBaseUrl: BASE_URL,
  yApiBaseUrl: YApi.baseUrl,
  strApiBaseUrl: '',
  uploadFile: `${BASE_URL}/file/add`, // 上传
  // uploadFile: 'http://61.174.52.49:9400/mock/20/file/add',
  downloadFile: '',
  tokenName: 'vra-token',
  apiList: {
    common: {},
    auth: {
      login: 'auth/login',
      accountInfo: 'home/get-user-info',
      changePassword: 'home/change-password',
    },
  },
}
