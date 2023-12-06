import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, Redirect } from 'react-router-dom'
import Init from './Init'
import LayoutHOC from './Layouts/LayoutHOC'
import {
  userIsAuthenticated,
  redirectToVerificationPage,
  roleRedirectFromHome,
  redirectToAccountAuditingInfoPage,
} from '../store/auth'
import Immutable from 'immutable'
import useApp from '../hooks/useApp'
// import useKeyPress from '../hooks/useKeyPress'

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
// const routes = []
const routeList = []

const parseRouteList = (list = []) => {
  list.forEach((route, routeIdx) => {
    // console.log(route)
    const { indexRoute, name } = route
    if (indexRoute) {
      routeList.push(<Redirect exact key={`indexRoute_${name}`} from={route.path} to={route.indexRoute} />)
    } else {
      let component = route.component
      if (route.auth) {
        // 权限标记，登录状态校验
        component = userIsAuthenticated(component)

        component = redirectToVerificationPage(component)

        component = redirectToAccountAuditingInfoPage(component)

        // 最后执行首页跳转
        // 首页跳转校验
        if (route.name === 'home') {
          component = roleRedirectFromHome(component)
        }
      }
      routeList.push(
        <Route key={`${route.name}_${routeIdx}`} exact={!!route.exact} path={route.path} component={component} />,
      )
    }
    if (route.children && route.children.length) {
      parseRouteList(route.children)
    }
  })
  return routeList
}

const appPlugins = () => {
  // 按键监听
  // useKeyPress()
}

const App = ({ routes }) => {
  // ===== APP PLUGINS
  appPlugins()
  // ===== APP PLUGINS

  // ===== APP HOOKS
  useApp()
  // ===== APP HOOKS

  return <Switch>{parseRouteList(Immutable.List(routes).toArray())}</Switch>
}

App.propTypes = {
  routes: PropTypes.array,
}

export default Init()(LayoutHOC(App))
