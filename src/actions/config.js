import * as constants from '../constants/config'

export const toggleLayout = p => d => {
  // console.log(p)
  return d({
    type: constants.TOGGLE_LAYOUT,
    payload: p
  })
}

export const toggleMenuFold = p => d => {
  return d({
    type: constants.TOGGLE_MENU_FOLD,
    payload: p
  })
}

export const updateContentTypeSplitInfo = p => d => {
  return d({
    type: constants.UPDATE_CONTENT_TYPE_SPLIT_INFO,
    payload: p
  })
}
