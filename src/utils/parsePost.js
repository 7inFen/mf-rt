// 将post参数数组转换为带索引的形式
const parseArray = (list = []) => {
  if (list instanceof Array) {
    return list.reduce((prev, curr, idx) => {
      prev[idx] = curr
      return prev
    }, {})
  }
  return list
}

export { parseArray }
