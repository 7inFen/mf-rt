const SUCCESS = 'SUCCESS'
const REQUEST = 'REQUEST'
const FAILED = 'FAIL'
const CLEAR = 'CLEAR'

export default function (netReducers, initState, others = {}) {
  let handleObj = {}
  netReducers.forEach((reducer) => {
    handleObj[reducer.prefix + '_' + REQUEST] = reducer.request || ((state) => state)
    handleObj[reducer.prefix + '_' + SUCCESS] = reducer.success
    handleObj[reducer.prefix + '_' + FAILED] = reducer.fail || ((state) => state)
    if(reducer.clear){
      handleObj[reducer.prefix + '_' + CLEAR] = reducer.clear
    }
  })
  handleObj = { ...handleObj, ...others }
  return function (state = initState, { type, payload }) {
    if (handleObj[type]) {
      return handleObj[type](state, payload)
    } else {
      return state
    }
  }
}

// export function requestListReducer(prefix, path = null, listKey='list', paginationKey='pagination'){
//   return {
//     prefix,
//     request: (state, payload) => {
//
//     }
//   }
// }
