/**
 * 导出全局history
 * 路由切换时进行版本号比对
 */
import { history } from './configureStore'
import axios from 'axios'
import project from 'config/project'
import queryString from 'query-string'
import setApp from '../utils/setApp'

const isProduction = project.env.build === 'production'
// const BUILD_VERSION = project.version || ''
let tick = Date.now()
history.listen((location, action) => {
  // location is an object like window.location
  // 存在品牌id时，url增加品牌id参数
  const { pathname, search } = location

  const appStore = require('../store/appStore').default
  const appState = appStore.getState()
  const brandId = appState.auth?.brandInfo?.id || ''
  const searchParams = queryString.parse(search)
  if (brandId && !searchParams.b) {
    history.replace(
      `${pathname}?${queryString.stringify({
        b: brandId,
        ...searchParams,
      })}`,
    )
  }

  // 比对版本号
  // 解决重新发版后找不到对应脚本文件问题
  // console.log(window.location)
  const now = Date.now()
  // 解决同时请求两次的问题
  if (now - tick < 200) {
    return
  }
  tick = now
  if (isProduction) {
    let { baseName = '' } = project.history
    if (baseName.slice(-1) !== '/') {
      baseName = `${baseName}/`
    }
    const url = `${baseName}version.json?_=${now}`
    // eslint-disable-next-line no-undef
    const projectBuildVersion = Number(PROJECT_BUILD_VERSION)
    axios
      .get(url)
      .then((res) => {
        const data = res.data || JSON.parse(res.data)
        const res_version = data?.version || projectBuildVersion
        setApp({
          version: data,
        })
        // console.log(res_version, Number(PROJECT_BUILD_VERSION))
        if (res_version !== projectBuildVersion) {
          // 如果版本号不一致，强制刷新
          window.location.reload()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

export default history
