export default (list = [], uniqueKey = '_') => list.reduce(
  (prev, next) => {
    prev[next] = `${`${uniqueKey}`.toUpperCase()}_${next}`
    return prev
  },
  {}
)
