/* eslint-disable max-len */

import React from 'react'
import * as ReactDOM from 'react-dom/client'
import configureStore, { history } from './store/configureStore'
import Root from './components/Root'

export const appStore = configureStore()

const rootElement = document.getElementById('app')
const root = ReactDOM.createRoot(rootElement)

root.render(<Root store={appStore} history={history} callback={() => console.log("App rendered.")} />);
