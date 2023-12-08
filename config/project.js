import { createBrowserHistory, createHashHistory } from 'history'
import zhCN from '../node_modules/antd/locale/zh_CN'
import theme from '../src/theme'

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
    dev: 9400,
    build: 9410,
    browserSync: 9411,
    mock: 12234, // 需要在json-server.mjs同步修改
  },
  YApi: {
    baseUrl: 'http://61.174.52.49:9400/mock/257/'
  },
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
    locale: zhCN,
    theme: {
      token: {
        colorPrimary: theme.color.primary,
        borderRadius: parseInt(theme.borderRadius, 10),
        fontSize: parseInt(theme.fontSize, 10),
      },
    },
  },
  iconFont: '',
  // 设计稿宽度，为0时不转换为vw
  viewportWidth: 0,
  globalKeyName: '_APP',
  // 权限总开关
  auth: true,
}
