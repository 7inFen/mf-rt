export default (params = {}) => {
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const element = params[key]
      // 以下情况使params[key]的值为''
      // 为undefined
      // 为空数组
      // 为空对象
      if (
        element === undefined ||
        (element instanceof Array && !element.length) ||
        (element instanceof Object && !Object.keys(element).length)
      ) {
        params[key] = ''
      }
    }
  }
  return params
}
