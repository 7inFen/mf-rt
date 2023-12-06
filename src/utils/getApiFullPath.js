import api from 'api'

const { apiList } = api

const resolveFilePath = (url) => {
  const pathList = url.split('.')
  let urlPath = { ...apiList }
  pathList.forEach((i) => {
    urlPath = urlPath[i] || ''
  })
  return urlPath
}
/**
 * 解析字符串字面量方式赋值的url
 *
 * @param {string} [url='']
 * @returns
 */
export default (url = '') => {
  const useMockData = process.env.RUNTIME_ENV === 'development'
  if (useMockData) {
    // 使用mock数据
    // 成立的前提是apiList的key不包含`.js`、`.json`、`.ts`中的任何一个
    // TODO: 若带参数则必有问号
    return /^.+\.(js|json|ts).*/.test(url) ? url : resolveFilePath(url)
  } else {
    // 与后端通信的正式接口
    // 成立的前提是apiList子key对应的值是个对象
    // 或以 http 开头
    if (/^http/.test(url)) {
      return url
    } else {
      return resolveFilePath(url)
    }
  }
}
