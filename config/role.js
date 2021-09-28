export const ROOT = '1'
export const ADMIN = '2'
export const AGENT_OPERATOR = '3'
export const AGENT_ADMIN = '4'
export const AGENT_EXECUTOR = '5'
export default {
  ROOT,
  ADMIN,
  AGENT_OPERATOR,
  AGENT_EXECUTOR,
  AGENT_ADMIN,
}

export const roleMap = {
  [ROOT]: {
    key: ROOT,
    desc: 'root',
    name: 'Root',
    indexRoute: '/home',
    homeRoute: '/home',
  },
  [ADMIN]: {
    key: ADMIN,
    desc: 'rd',
    name: '系统管理员',
    indexRoute: '/home',
    homeRoute: '/home',
  },
  [AGENT_ADMIN]: {
    key: AGENT_ADMIN,
    desc: 'agent_admin',
    name: '代理商管理员',
    indexRoute: '/home',
    homeRoute: '/home',
  },
  [AGENT_OPERATOR]: {
    key: AGENT_OPERATOR,
    desc: 'agent_op',
    // name: '代理商运营',
    name: '浏览',
    indexRoute: '/home',
    homeRoute: '/home',
  },
  [AGENT_EXECUTOR]: {
    key: AGENT_EXECUTOR,
    desc: 'agent_executor',
    // name: '代理商执行',
    name: '操作',
    indexRoute: '/home',
    homeRoute: '/home',
  },
}
