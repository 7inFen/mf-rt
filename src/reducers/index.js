import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import init from './init'
import config from './config'
import auth from './auth'
import home from './home'

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    init,
    config,
    auth,
    home,
  })

export default rootReducer
