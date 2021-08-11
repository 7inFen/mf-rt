// 消息通知去处理打开的页面

// 项目列表
const projectListPage = '/project/list'
// 返点池
const rebatePoolPage = '/rebate/pool'
// 待我审批
const approveReadilyPage = '/workflow/approveReadily'
// 我的申请
const myApplyPage = '/workflow/myApply'

export default {
  'XX001': [
    approveReadilyPage,
    myApplyPage,
    approveReadilyPage,
    approveReadilyPage,
    myApplyPage
  ],
  'XX002': [
    projectListPage
  ],
  'XX003': [
    projectListPage
  ],
  'XX004': [
    projectListPage
  ],
  'XX005': [
    projectListPage
  ],
  'XX006': [
    projectListPage
  ],
  'XX007': [
    projectListPage
  ],
  'XX008': [
    projectListPage
  ],
  'XX009': [
    projectListPage
  ],
  'XX010': [
    `${rebatePoolPage}?tab=msi`
  ],
  'XX011': [
    `${rebatePoolPage}?tab=pm`
  ],
  'XX012': [
    `${rebatePoolPage}?tab=memo`
  ],
  'XX013': [
    `${rebatePoolPage}?tab=rebate`
  ],
}
