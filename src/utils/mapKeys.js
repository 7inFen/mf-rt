export default (list = [], config = {}) => {
  const { key = 'key', name = 'name', mapAll = false } = config
  return list.reduce((prev, next) => {
    prev[next[key]] = mapAll ? next : next[name]
    return prev
  }, {})
}
