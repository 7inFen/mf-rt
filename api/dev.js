/**
 * Default development API config.
 * 根据/src/lib/request中对api的解析规则
 * apiList子key的值为对象集合
 * 且key不能为`js`, `json`, `ts`中的一种
 */
import project from '../config/project'

const { host, port } = project

let BASE_URL = `http://${host}:${port.mock}/`
if (process.env.NODE_ENV === 'production') {
  BASE_URL = `http://61.174.52.49:${port.mock}/`
}
export default {
  apiBaseUrl: BASE_URL,
  yApiBaseUrl: 'http://61.174.52.49:9400/mock/254/',
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
    选号车: {
      取Benchmark: '~/cart/getBenchmark',
      更新Benchmark: '~/cart/updateBenchmark',
      取Summary: '~/cart/summary',
      取达人列表: '~/cart/list',
      达人列表字段更新: '~/cart/updateListItem',
      删除达人: '~/cart/delete',
      取工单列表: '~/cart/getCaseList',
      保存选号单: '~/cart/save',
    },
    选号单: {
      列表: '~/list/list',
    },
    抖音项目监控: {
      筛选: '~/monitor/dy/filter',
      列表: '~/monitor/dy/list',
      增加监控品牌: '~/monitor/dy/add',
    },
  },
}
