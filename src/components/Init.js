/**
 * @author QIN Fen
 * @email hellowd93@gmail.com
 * @create date 2019-06-09 17:14:47
 * @modify date 2021-09-28 14:35:30
 * @desc App数据初始化
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { initWithoutAuthRoutes, initAuthRoutes, updateRoutes } from '../actions/init'
import { getAccountInfo } from '../actions/auth'
import { Spin, Modal, message } from 'antd'
import isIE from '../utils/isIE'
import RequestLoading from '../components/Loading/RequestLoading'
import StyledLayout from 'styled/layout'
import { withRouter } from 'react-router'
import history from '_history'
import faviconIcon from '../assets/logo/logo_small.png'
import setApp from '../utils/setApp'
import storage from 'store'

const checkIsIE = () => {
  if (isIE(11, 'lt')) {
    Modal.confirm({
      title: '提示',
      content: '检测到您正在使用过时的浏览器版本。更新您的浏览器，以便获得更安全、更快速和最好的体验。',
      onOk: () => {
        window.open('https://www.google.cn/chrome/')
      },
    })
  }
}

// 滚到到锚点
const toScroll = (id) => {
  let checkCounts = 0
  const checkIdInterval = setInterval(() => {
    const target = document.getElementById(id)
    checkCounts += 1
    if (target || checkCounts > 10) {
      clearInterval(checkIdInterval)
    }
    if (target) {
      target.scrollIntoView()
    }
  }, 500)
}
const checkHashToScroll = () => {
  const { hash } = window.location
  if (hash) {
    const hashId = `${hash}`.slice(1)
    toScroll(hashId)
  }
}

const updateSite = (site = {}) => {
  const { keywords = '', description = '', author = '', favicon = '', loading = '' } = site
  document.querySelector('meta[name="keywords"]').setAttribute('content', keywords)
  document.querySelector('meta[name="description"]').setAttribute('content', description)
  document.querySelector('meta[name="author"]').setAttribute('content', author)
  document.querySelector('link[rel="shortcut icon"]').setAttribute('href', faviconIcon)
  if (loading) {
    // 设置全局Loading效果
    Spin.setDefaultIndicator(<RequestLoading />)
  }
}

export default () => (App) =>
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(
    withRouter(
      class HOC extends Component {
        static displayName = 'HOC_Init'
        static propTypes = {
          auth: PropTypes.string,
          getAccountInfo: PropTypes.func,
          currentRequestFail: PropTypes.object,
          site: PropTypes.object,
          initWithoutAuthRoutes: PropTypes.func,
          initAuthRoutes: PropTypes.func,
          location: PropTypes.object,
        }

        static getDerivedStateFromProps(nextProps, prevState) {
          const { currentRequestFail: nextRequestFail = {} } = nextProps
          const { currentRequestFail: prevRequestFail = {} } = prevState
          if (nextRequestFail.time !== prevRequestFail.time && !nextRequestFail.silent) {
            // 错误通知
            message[nextRequestFail.msgType || 'error'](nextRequestFail.msg)
            return {
              currentRequestFail: nextRequestFail,
            }
          }
          return null
        }

        constructor(props) {
          super(props)
          this.state = {}
          setApp()
          updateSite(props.site)
          this.intervalTask = {
            getProgressTaskCounts: null,
          }
          this.setEntrancePath()
        }

        componentDidMount() {
          const { auth = '', getAccountInfo, initWithoutAuthRoutes, initAuthRoutes } = this.props

          if (auth) {
            // 为防止用户手动修改localStorage中角色类型等信息
            // 影响权限判定
            // 需更新一次用户信息
            // TODO 处理接口验证失败
            getAccountInfo(
              auth,
              (data) => {
                initAuthRoutes(data)
                // this.handleGetProgressCounts()
              },
              (fail) => {
                history.replace('/login')
              },
            )

            // 取页面tips
            // fetchTips()
          } else {
            // 初始化路由
            initWithoutAuthRoutes()
          }

          // 初始化
          // 检测是否为IE
          checkIsIE()

          checkHashToScroll()
        }

        componentWillUnmount() {
          for (const taskKey in this.intervalTask) {
            if (Object.hasOwnProperty.call(this.intervalTask, taskKey)) {
              const taskId = this.intervalTask[taskKey]
              if (taskId) {
                clearInterval(taskId)
              }
            }
          }
        }

        setEntrancePath = () => {
          // 存储入口路径，作为store/auth/redirect使用
          const { pathname, search } = window.location
          storage.set('entrancePath', `${pathname}${search}`)
        }

        render() {
          return (
            <>
              <StyledLayout />
              <App {...this.props} />
            </>
          )
        }
      },
    ),
  )

function mapStateToProps({
  init: { currentRequestFail, routes },
  auth: {
    account: { auth },
  },
  config: { site },
}) {
  return {
    currentRequestFail,
    auth,
    // App.js使用
    routes,
    site,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      initWithoutAuthRoutes,
      initAuthRoutes,
      getAccountInfo,
      updateRoutes,
    },
    dispatch,
  )
}
