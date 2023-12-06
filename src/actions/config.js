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

export const updateKeyPress = (p) => (d) =>
  d({
    type: constants.UPDATE_KEY_PRESS,
    payload: p,
  })
