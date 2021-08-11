import Immutable from 'immutable'
/**
 * 快速排序
 * 接收一个对象数组时，params.key表示要排序的key名
 * params.order默认降序
 * @param {Array} [arr=[Object|Number]]
 * @param {Object} [params={key, order}]
 * @returns {Array}
 */
function quickSort(arr = [], params = {}) {
  const array = Immutable.List(arr).toJS()
  if (array.length <= 1) {
    return array
  }
  const { key = '', order = 'descend' } = params
  const pivotIndex = Math.floor(array.length / 2)
  const pivot = array.splice(pivotIndex, 1)[0]
  const left = []
  const right = []
  if (pivot instanceof Object) {
    for (let i = 0; i < array.length; i++) {
      if (order === 'descend' ? array[i][key] > pivot[key] : array[i][key] <= pivot[key]) {
        left.push(array[i])
      } else {
        right.push(array[i])
      }
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      if (order === 'descend' ? array[i] > pivot : array[i] <= pivot) {
        left.push(array[i])
      } else {
        right.push(array[i])
      }
    }
  }

  return quickSort(left, params).concat([pivot], quickSort(right, params))
}

export default quickSort
