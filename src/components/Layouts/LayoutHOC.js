/**
 * @author QIN Fen
 * @email hellowd93@gmail.com
 * @create date 2019-07-03 15:17:24
 * @modify date 2021-09-28 14:56:30
 * @desc 登录后页面布局
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toggleLayout } from '../../actions/config'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loading from '../Loading/RequestLoading'
import LayoutMenuLeft from './menuLeft'

export default (WrapComponent) =>
  connect(mapStateToProps, {
    toggleLayout,
  })(
    withRouter(
      class HOC extends Component {
        static displayName = 'HOC_Layout'
        static propTypes = {
          pathMap: PropTypes.object,
          site: PropTypes.object,
          menu: PropTypes.object,
          authSuccess: PropTypes.bool,
          isAuthing: PropTypes.bool,
          initPermission: PropTypes.bool,
          location: PropTypes.object,
          device: PropTypes.object,
          account: PropTypes.object,
        }

        constructor(props) {
          super(props)

          this.state = {}
          this._currentLayout = ''
        }

        render() {
          const {
            // authSuccess,
            isAuthing,
            location,
            pathMap,
          } = this.props

          const currentPathInfo = pathMap?.[location.pathname]
          // console.log(currentPathInfo)
          // 处理需要全屏显示的路由，如隐私政策
          // 开放路由(auth=false)默认无layout
          const layout = currentPathInfo?.layout || []
          let layoutComponent = null
          const layoutComponentMenuLeft = (
            <LayoutMenuLeft>
              <WrapComponent {...this.props} />
            </LayoutMenuLeft>
          )
          const layoutComponentFalse = <WrapComponent {...this.props} />

          // 对于有多种布局的component优先使用上一种布局
          if (layout?.includes(this._currentLayout)) {
            // 使用当前布局
            switch (this._currentLayout) {
              case 'menuLeft':
                layoutComponent = layoutComponentMenuLeft
                break
              case false:
                layoutComponent = layoutComponentFalse
                break
              default:
                break
            }
          } else {
            if (layout?.includes('menuLeft')) {
              this._currentLayout = 'menuLeft'
              layoutComponent = layoutComponentMenuLeft
            } else {
              // false
              this._currentLayout = false
              layoutComponent = layoutComponentFalse
            }
          }
          return isAuthing ? <Loading /> : layoutComponent
        }
      },
    ),
  )
function mapStateToProps({
  init: { pathMap, initRoutes },
  config: { site, menu, device, layout },
  auth: { authSuccess, isAuthing, initPermission, account },
}) {
  return {
    pathMap,
    site,
    menu,
    authSuccess,
    isAuthing,
    initPermission,
    device,
    account,
  }
}
