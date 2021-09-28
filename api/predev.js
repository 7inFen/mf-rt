/**
 * Default predev API config.
 * 根据/src/lib/request中对api的解析规则
 * apiList子key的值为对象集合
 * 且请求path中不能有小数点
 */

const BASE_URL = 'https://testkolapi.mdfull.com'
// const BASE_URL = 'http://kolapi.mdfull.com'
// const BASE_URL = 'http://localhost:8112'
export default {
  apiBaseUrl: BASE_URL,
  yApiBaseUrl: 'http://61.174.52.49:9400/mock/20/',
  uploadFile: `${BASE_URL}/file/add`, // 上传
  // uploadFile: 'http://61.174.52.49:9400/mock/20/file/add',
  downloadFile: '',
  tokenName: 'vra-token',
  apiList: {
    auth: {
      login: 'auth/login',
      accountInfo: 'home/get-user-info',
      changePassword: 'home/change-password',
    },
  },
}
