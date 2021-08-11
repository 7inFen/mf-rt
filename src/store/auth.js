/**
 * 权限类型对应的处理程序
 * authenticatedSelector为true时表示认证通过，否则触发redirectPath
 */
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import Loading from '../components/Loading/RequestLoading'
import role, { roleMap } from '../../config/role'

// 登录验证
export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: (state = {}) => !!state?.auth?.account?.auth,
  // authenticatedSelector: () => true,
  // wrapperDisplayName: 'UserIsAuthenticated',
  // Returns true if the user auth state is loading
  authenticatingSelector: (state) => state.auth.isLogining,
  // Render this component when the authenticatingSelector returns true
  AuthenticatingComponent: Loading,
})

// 回到首页
export const redirectToHome = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: () => false,
  allowRedirectBack: () => false,
  AuthenticatingComponent: Loading,
})

// 账号验证页面，是否继续验证
export const redirectFromVerificationPage = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: (state) => {
    const { verification_required, account_type } = state?.auth?.account
    if ([role.AGENT_OPERATOR, role.AGENT_EXECUTOR].includes(account_type)) {
      return verification_required
    }
    return false
  },
  allowRedirectBack: () => false,
  AuthenticatingComponent: Loading,
})

// 其它页面，是否跳到账号验证页面
export const redirectToVerificationPage = connectedRouterRedirect({
  redirectPath: (state) => `/verification-account?phone=${state?.auth?.account?.phone || ''}`,
  authenticatedSelector: (state) => {
    const { verification_required, account_type } = state?.auth.account
    if ([role.AGENT_OPERATOR, role.AGENT_EXECUTOR].includes(account_type)) {
      return !verification_required
    }
    return true
  },
  allowRedirectBack: () => false,
  AuthenticatingComponent: Loading,
})

// 角色有效值校验
export const roleIsValid = connectedRouterRedirect({
  redirectPath: '/404',
  authenticatedSelector: (state) => Object.keys(roleMap).includes(state?.auth?.account?.account_type),
  allowRedirectBack: () => false,
  AuthenticatingComponent: Loading,
})

export const departmentAccess = (account, route) => {
  const { department, isLeader } = account
  const { accessDepartment = {} } = route
  let access = false
  if (accessDepartment[department]) {
    if (accessDepartment[department].leader && isLeader) {
      access = true
    }
  }
  // console.log(account, route)
  return access
}

export const routeAccess = (account = {}, route = {}) => {
  const { account_type, account_name } = account
  const { auth: roleList = [], accessUser = [] } = route

  // 符合route auth || accessUser || accessDepartment限定
  return roleList.includes(account_type) || accessUser.includes(account_name) || departmentAccess(account, route)
}

// 角色路由匹配校验
export const roleMatching = (route) =>
  connectedRouterRedirect({
    redirectPath: '/',
    authenticatedSelector: (state) => {
      // console.log(roleList, accessUser, state?.auth?.account)
      return routeAccess(state?.auth?.account, route)
    },
    allowRedirectBack: () => false,
    AuthenticatingComponent: Loading,
  })

// 角色路由在首页跳转
export const roleRedirectFromHome = connectedRouterRedirect({
  redirectPath: (state) => {
    const { authSuccess, account } = state?.auth
    // console.log(roleMap?.[account?.account_type]?.indexRoute)
    if (authSuccess) {
      return roleMap?.[account?.account_type]?.indexRoute
    } else {
      return '/login'
    }
  },
  authenticatedSelector: (state) => false,
  allowRedirectBack: () => false,
  AuthenticatingComponent: Loading,
})

// 代理商账号处于审核中
// 1, 未提交审核
// 2, 审核中
// 3, 审核通过
// 4, 审核拒绝
export const redirectToAccountAuditingInfoPage = connectedRouterRedirect({
  redirectPath: '/admin/audit',
  authenticatedSelector: (state) => {
    const { account_type, account_status } = state?.auth?.account
    if (account_type === role.AGENT_ADMIN) {
      return account_status === '3'
    }
    return true
  },
  allowRedirectBack: () => false,
  AuthenticatingComponent: Loading,
})

// 代理商管理员账号审核页面，是否继续展示
export const redirectFromAccountAuditingInfoPage = connectedRouterRedirect({
  redirectPath: '/',
  authenticatedSelector: (state) => {
    const { account_type, account_status } = state?.auth?.account
    if (account_type === role.AGENT_ADMIN) {
      return account_status !== '3'
    }
    return false
  },
  allowRedirectBack: () => false,
  AuthenticatingComponent: Loading,
})

// 需要是唯一品牌的页面，品牌为 all 时跳转到设置品牌页面
export const redirectToSetBrandPage = connectedRouterRedirect({
  redirectPath: '/setBrand',
  authenticatedSelector: (state) => {
    const { brandInfo } = state?.auth || {}
    const { id } = brandInfo || {}
    return id !== 'all'
  },
  allowRedirectBack: () => true,
  AuthenticatingComponent: Loading,
})
