/* eslint-disable max-len */

import React from 'react'
import { render } from 'react-dom'
import configureStore, { history } from './store/configureStore'
import Root from './components/Root'

export const appStore = configureStore()

render(<Root store={appStore} history={history} />, document.getElementById('app'))
