import * as constants from '../constants/home'

const initialState = {
  data: {},
  isLoading: false,
  options: {
    datasource: [],
    behavior: []
  },
  isFetchingOptions: false
}

export default function homeUpdate (state = initialState, { type, payload }) {
  switch (type) {
    case constants.HOME_DATA_REQUEST:
      return { ...state, isLoading: true }
    case constants.HOME_DATA_SUCCESS:
      return { ...state, data: payload, isLoading: false }
    case constants.HOME_DATA_FAIL:
      return { ...state, isLoading: false }
    case constants.TASK_OPTIONS_REQUEST:
      return { ...state, isFetchingOptions: true }
    case constants.TASK_OPTIONS_SUCCESS:
      return { ...state, options: payload, isFetchingOptions: false }
    case constants.TASK_OPTIONS_FAIL:
      return { ...state, isFetchingOptions: false }
    default:
      return state
  }
}
