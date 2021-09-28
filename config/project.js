import { createBrowserHistory, createHashHistory } from 'history'

const NODE_ENV = process.env.NODE_ENV || ''
const RUNTIME_ENV = process.env.RUNTIME_ENV || ''
const NOW = new Date()
const PROJECT_BUILD_VERSION = JSON.stringify(NOW.getTime())

// 部署子目录名称，默认为根目录
// 如果有子目录，使用hashHistory
const baseName = '/'
const createHistory = baseName === '/' ? createBrowserHistory : createHashHistory

export default {
  host: 'localhost',
  port: {
    dev: 9300,
    mock: 9301,
    build: 9310,
    browserSync: 9311,
  },
  // mock服务响应时间
  mockServerDelay: 1000,
  history: {
    type: createHistory.name,
    baseName,
    create: createHistory,
  },
  env: {
    build: NODE_ENV,
    api: RUNTIME_ENV,
  },
  // 打包时间
  buildTime: NOW.toString(),
  // 定义ui可取到的全局变量
  globals: {
    PROJECT_BUILD_VERSION,
  },
  antd: {
    autoInsertSpaceInButton: false,
  },
  iconFont: '',
  // 设计稿宽度，为0时不转换为vw
  viewportWidth: 0,
  globalKeyName: '_APP',
  // 权限总开关
  auth: true,
}
