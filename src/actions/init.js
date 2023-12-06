import * as constants from '../constants/init'
import localRoutes from '../routes'
import role from '../../config/role'
import { routeAccess } from '../store/auth'
import Immutable from 'immutable'

export const initAuthRoutes = (account) => (dispatch) => {
  const { account_type, account_status, routeAccess: serverRouteAccess = {} } = account || {}
  const pathMap = {}
  let disabled = false
  // 代理商管理员未审核通过，禁用导航
  if (`${account_type}` === role.AGENT_ADMIN && ['1', '2', '4'].includes(`${account_status}`)) {
    disabled = true
  }

  // eslint-disable-next-line max-params
  const handleAuthRoutes = (list = [], routeList, rootPath, trackPath) => {
    list
      .filter((route) => {
        // 过滤掉服务端禁止的路由
        if (serverRouteAccess[route.path] === false) {
          return false
        }
        return true
      })
      .forEach((route, routeIdx) => {
        const { name = '', path, rootPath: configRootPath, title, auth, layout, children, brand = 'visible' } = route

        let access = auth ? !!account_type : true // auth为false，都可以访问；auth为true，所有角色可以访问,auth为数组，指定角色可以访问
        if (auth instanceof Array) {
          access = routeAccess(account, route)
        }
        const itemLayout = layout ?? (auth ? ['menuLeft'] : [false])

        routeList.push({
          ...route,
          children: [],
          access,
          disabled,
          layout: itemLayout,
        })
        const _trackPath = trackPath
          ? trackPath?.concat({
              path,
              title,
            })
          : [
              {
                path,
                title,
              },
            ]
        pathMap[path] = {
          ...route,
          name,
          title,
          // 祖先
          rootPath: configRootPath || `/${(rootPath || path).split('/')[1] || ''}`,
          trackPath: _trackPath,
          auth: !!auth,
          layout: itemLayout,
          brand,
        }
        if (children && children.length) {
          handleAuthRoutes(children, routeList[routeIdx].children, path, _trackPath)
        }
      })
    return routeList
  }

  return dispatch({
    type: constants.INIT_AUTH_ROUTES,
    payload: {
      // FIXED 解决组件更新后路由报错的问题
      routes: Immutable.List(handleAuthRoutes(localRoutes, [])).toJS(),
      pathMap,
    },
  })
}

export const initWithoutAuthRoutes = (p) => (d) =>
  d({
    type: constants.INIT_WITHOUT_AUTH_ROUTES,
    payload: localRoutes,
  })

export const updateRoutes = (p) => (d) =>
  d({
    type: constants.UPDATE_ROUTES,
    payload: p,
  })
