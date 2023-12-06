import React, { Component, Suspense } from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'connected-react-router'
import { Provider, useSelector } from 'react-redux'
import { lazy } from '@loadable/component'
import pMinDelay from '../lib/delay'
import App from './App'
import { ConfigProvider, App as AntdApp } from 'antd'
import RequestLoading from '../components/Loading/RequestLoading'
import project from '../../config/project'
import { ThemeProvider } from 'styled-components'
import 'normalize.css'
import log from '../utils/log'

// lazy 500ms 是为了防止组件加载出时，样式还未应用到组件的现象
const LazyApp = lazy(() => pMinDelay(import('./App'), 500))

const RootChildren = ({ history }) => {
  const { theme } = useSelector((store) => store.init)

  const app =
    process.env.NODE_ENV === 'production' ? (
      <Suspense fallback={<RequestLoading />}>
        <LazyApp />
      </Suspense>
    ) : (
      <App />
    )

  const providerProps = {
    ...project.antd,
    theme: {
      ...project.antd.theme,
      token: {
        ...project.antd.theme.token,
        colorPrimary: theme.color.primary,
      },
    },
  }

  return (
    <ConfigProvider {...providerProps}>
      <ThemeProvider theme={theme}>
        <AntdApp>
          <ConnectedRouter history={history}>{app}</ConnectedRouter>
        </AntdApp>
      </ThemeProvider>
    </ConfigProvider>
  )
}

const Root = ({ store, history }) => {
  return (
    <Provider store={store}>
      <RootChildren history={history} />
    </Provider>
  )
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default Root
