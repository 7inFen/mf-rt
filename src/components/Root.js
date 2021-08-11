import React, { Component, Suspense } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { lazy } from '@loadable/component'
import pMinDelay from '../lib/delay'
import App from './App'
import { ConfigProvider } from 'antd'
import zhCN from '../../node_modules/antd/lib/locale-provider/zh_CN'
import RequestLoading from '../components/Loading/RequestLoading'
import project from '../../config/project'

import { ThemeProvider } from 'styled-components'
import theme from '../theme/index'
import 'normalize.css'
import '../theme/index.less'
import log from '../utils/log'

log(theme, 'Theme')

// lazy 500ms 是为了防止组件加载出时，样式还未应用到组件的现象
const LazyApp = lazy(() => pMinDelay(import('./App'), 500))

export default class Root extends Component {
  render() {
    const app =
      process.env.NODE_ENV === 'production' ? (
        <Suspense fallback={<RequestLoading />}>
          <LazyApp />
        </Suspense>
      ) : (
        <App />
      )
    const { store, history } = this.props
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConfigProvider
            {...project.antd}
            locale={zhCN}
            getPopupContainer={(node) => {
              // console.log(node.parentNode)
              if (node) {
                return node.parentNode
              }
              return document.body
            }}
          >
            <ThemeProvider theme={theme}>{app}</ThemeProvider>
          </ConfigProvider>
        </ConnectedRouter>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}
