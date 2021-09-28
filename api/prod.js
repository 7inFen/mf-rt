/**
 * Default production API config.
 * 根据/src/lib/request中对api的解析规则
 * apiList子key的值为对象集合
 * 且请求路径中不能有小数点
 */

const BASE_URL = 'http://kolapi.mdfull.com'
export default {
  apiBaseUrl: BASE_URL,
  uploadFile: `${BASE_URL}/file/add`, // 上传
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
