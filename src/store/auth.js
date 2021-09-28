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

// 其它页面，是否跳到账号验证页面
export const redirectToVerificationPage = connectedRouterRedirect({
  redirectPath: (state) => `https://oa.mdfull.com/verification-account?phone=${state?.auth?.account?.phone || ''}`,
  authenticatedSelector: (state) => {
    const { verification_required, account_type } = state?.auth.account || {}
    if ([role.AGENT_OPERATOR, role.AGENT_EXECUTOR].includes(account_type)) {
      return !verification_required
    }
    return true
  },
  allowRedirectBack: () => false,
  AuthenticatingComponent: Loading,
})

// 角色路由在首页跳转
export const roleRedirectFromHome = connectedRouterRedirect({
  redirectPath: (state) => {
    const { authSuccess, account } = state?.auth || {}
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
  redirectPath: 'https://oa.mdfull.com//admin/audit',
  authenticatedSelector: (state) => {
    const { account_type, account_status } = state?.auth?.account || {}
    if (account_type === role.AGENT_ADMIN) {
      return account_status === '3'
    }
    return true
  },
  allowRedirectBack: () => false,
  AuthenticatingComponent: Loading,
})
