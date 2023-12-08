/**
 * Default development API config.
 * 根据/src/lib/request中对api的解析规则
 * apiList子key的值为对象集合
 * 且key不能为`js`, `json`, `ts`中的一种
 */
import project from '../config/project'

const { host, port, YApi } = project

let BASE_URL = `http://${host}:${port.mock}/`
if (process.env.NODE_ENV === 'production') {
  BASE_URL = `http://61.174.52.49:${port.mock}/`
}
export default {
  apiBaseUrl: BASE_URL,
  yApiBaseUrl: YApi.baseUrl,
  uploadFile: 'https://testkolapi.mdfull.com/file/add', // 上传
  downloadFile: '',
  tokenName: 'vra-token',
  apiList: {
    common: {},
    auth: {
      login: '~/common/login',
      accountInfo: '~/common/accountInfo',
      changePassword: '~/common/common?api=auth.changePassword',
    },
    项目: {
      列表: '~/project/list',
    },
  },
}
