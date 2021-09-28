import site from '../../config/site'
import project from '../../config/project'
import * as constants from '../constants/config'
import storage from 'store'

// eslint-disable-next-line no-undef
project.globals.PROJECT_BUILD_VERSION = PROJECT_BUILD_VERSION

export const device = {
  platform: {
    mac: navigator.platform.toLowerCase().includes('mac'),
    win: navigator.platform.toLowerCase().includes('win'),
    isMobile: /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
      navigator.userAgent,
    ),
  },
  browser: {
    firefox: /firefox/i.test(navigator.userAgent),
  },
}

const initialState = {
  site,
  project,
  device,
  menu: {
    fold: !!storage.get('menu_fold'),
  },
  layout: '',
  contentTypeSplitInfo: {},
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.TOGGLE_MENU_FOLD:
      storage.set('menu_fold', payload)
      return {
        ...state,
        menu: {
          ...state.menu,
          fold: payload,
        },
      }
    case constants.TOGGLE_LAYOUT:
      return {
        ...state,
        layout: payload,
      }
    case constants.UPDATE_CONTENT_TYPE_SPLIT_INFO:
      return {
        ...state,
        contentTypeSplitInfo: {
          ...state.contentTypeSplitInfo,
          [payload?.key]: {
            ...state.contentTypeSplitInfo?.[payload?.key],
            ...payload.info,
          },
        },
      }
    default:
      return state
  }
}
