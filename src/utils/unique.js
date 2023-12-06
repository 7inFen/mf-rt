// 去重
export default (list = [], config = {}) => {
  const { key = 'key' } = config
  const uniqueList = []
  const repeatList = []
  const keyMap = {}
  list.forEach((item) => {
    try {
      switch (item.constructor) {
        case Object:
          if (!keyMap[item[key]]) {
            uniqueList.push(item)
            keyMap[item[key]] = true
          } else {
            repeatList.push(item)
          }
          break
        default:
          if (!keyMap[item]) {
            uniqueList.push(item)
            keyMap[item] = true
          } else {
            repeatList.push(item)
          }
          break
      }
    } catch (error) {}
  })
  return {
    list: uniqueList,
    repeatList,
  }
}

// 对象数组去重
export const uniqueObjList = (list, key) => {
  const _map = new Map()
  return list.filter((item) => !_map.has(item[key]) && _map.set(item[key], 1))
}
