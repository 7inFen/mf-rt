import project from '../config/project'
const PORT = project.port.mock || 2234
const DELAY = project.mockServerDelay || 1000
const path = require('path')
const fs = require('fs')
const pathResolve = dir => path.resolve(__dirname, dir)
const queryString = require('query-string')
const publiceDir = pathResolve('./public')
const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
// 设置延时
server.use((req, res, next) => setTimeout(next, DELAY))

// Add custom routes before JSON Server router
// server.get('*', (req, res) => {
//   console.log(req)
// })

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  // console.log(req)
  const { method = '', url: reqUrl = '' } = req
  const { url, query } = queryString.parseUrl(reqUrl)
  const fullPath = path.join(publiceDir, url)
  let content = ''
  try {
    if (fullPath.split('.').slice(-1)[0] === 'json') {
      content = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
    } else {
      content = require(fullPath)
    }
  } catch (error) {
    const { code = '', message = '' } = error
    res.status(404).json({
      msg: `${code} ${message}`
    })
    return
  }
  const createRegExp = (str = '') => new RegExp(`.*${str}.*`, 'i')
  const filterList = (list = [], query = {}) => {
    // 仅检测id、key和keywords参数
    const queryKeyList = Object.keys(query).filter(key => query[key])
    if (!queryKeyList.length) return list
    const fList = []
    for (let idx = 0; idx < list.length; idx++) {
      if (list[idx] instanceof Object) {
        // if (queryKeyList.includes('id') && createRegExp(query.id).test(String(list[idx].id))) {
        //   fList.push(list[idx])
        //   break
        // }
        // if (queryKeyList.includes('key') && createRegExp(query.key).test(String(list[idx].key))) {
        //   fList.push(list[idx])
        //   break
        // }
        if (queryKeyList.includes('keywords')) {
          const itemKeyList = Object.keys(list[idx])
          for (let i = 0; i < itemKeyList.length; i++) {
            if (createRegExp(query.keywords).test(String(list[idx][itemKeyList[i]]))) {
              fList.push(list[idx])
              break
            }
          }
        }
        // if (!queryKeyList.includes('id') && !queryKeyList.includes('key') && !queryKeyList.includes('keywords')) {
        //   fList.push(list[idx])
        // }
        if (!queryKeyList.includes('keywords')) {
          fList.push(list[idx])
        }
      } else {
        fList.push(list[idx])
      }
    }
    return fList
  }
  // console.log(url, query)
  if (method === 'GET') {
    if (content.data instanceof Array) {
      content = {
        ...content,
        data: filterList(content.data, query)
      }
    } else if (content.data instanceof Object && content.data.list) {
      content = {
        ...content,
        data: {
          ...content.data,
          list: filterList(content.data.list, query)
        }
      }
    }
  }
  // 使其在任何类型请求下不返回404
  res.status(200).json(content)
  // next()
  // Continue to JSON Server router
  next()
})

// Use default router
// server.use(router)
server.listen(PORT, () => {
  console.log(`JSON Server is listening on port ${PORT}.`)
})
