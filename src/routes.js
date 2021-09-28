import role, { accessDepartment } from '../config/role'
// ! ========== IMPORT COMPONENTS BEGIN ==========
// 不要在此处引入非React组件代码
import HomePage from './pages/HomePage'
import ServerErrorPage from './pages/500'
import PermissionDeniedPage from './pages/403'
import NotFoundPage from './pages/404'

import LoginPage from './pages/LoginPage'

// ! ========== IMPORT COMPONENTS END ==========

const { ROOT, ADMIN, AGENT_ADMIN, AGENT_OPERATOR, AGENT_EXECUTOR } = role

export default [
  {
    // 一般情况下，首页的name恒为home
    // 如果改变，需同步更改reducer/init.js的路由权限判定
    // 和App.js的首页路由跳转设置
    name: 'home',
    title: '首页',
    icon: '',
    path: '/',
    auth: true,
    exact: true,
    hide: true,
    component: HomePage,
    // indexRoute: '/project/list',
  },
  {
    name: 'homePage',
    title: '笔记收录',
    icon: '',
    path: '/home',
    auth: [ROOT, ADMIN, AGENT_ADMIN, AGENT_OPERATOR, AGENT_EXECUTOR],
    exact: true,
    component: HomePage,
  },
  {
    name: 'login',
    title: '登录',
    icon: '',
    path: '/login',
    component: LoginPage,
    hide: true,
    exact: true,
    layout: [false],
  },
  {
    name: '_500',
    title: '500',
    icon: '',
    path: '/500',
    component: ServerErrorPage,
    hide: true,
    exact: true,
  },
  {
    name: '_403',
    title: '403',
    icon: '',
    path: '/403',
    component: PermissionDeniedPage,
    hide: true,
    exact: true,
  },
  {
    // ! 放在最后
    name: '_404',
    title: '404',
    icon: '',
    path: '*',
    component: NotFoundPage,
    hide: true,
    exact: true,
  },
]
