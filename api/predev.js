/**
 * Default predev API config.
 * 根据/src/lib/request中对api的解析规则
 * apiList子key的值为对象集合
 * 且请求path中不能有小数点
 */

// const BASE_URL = 'http://61.174.52.49:8114'
const BASE_URL = 'https://testkolapi.mdfull.com'
// const BASE_URL = 'http://localhost:8113'
export default {
  apiBaseUrl: BASE_URL,
  yApiBaseUrl: 'http://61.174.52.49:9400/mock/254/',
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
    抖音: {
      筛选数据: '~/dy/filterData',
      导入: '~/dy/import',
      列表: '~/dy/list',
      修改联系方式: '~/dy/updateContact',
      修改米赋标签: '~/dy/updateMfTag',
      修改米赋政策: '~/dy/updateMfPolicy',
      修改特殊权益: '~/dy/updateBenefit',
      增加特殊权益: '~/dy/addBenefit',
      删除特殊权益: '~/dy/deleteBenefit',
      添加到选号车: '~/dy/addCart',
      从选号车移除: '~/dy/deleteCart',
    },
  },
}
