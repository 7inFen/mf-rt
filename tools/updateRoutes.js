/**
 * @author QIN Fen
 * @email hellowd93@gmail.com
 * @create date 2019-06-03 12:01:26
 * @modify date 2023-02-15 17:26:27
 * @desc 更新开发和线上环境routes.js中组件引入方式
 */
const readline = require('readline')
const path = require('path')
const fs = require('fs')
const os = require('os')

const filepath = path.join(__dirname, '../src/routes.js')

module.exports = (mode = 'production') => {
  const read = fs.createReadStream(filepath)
  const rl = readline.createInterface({
    input: read,
  })

  let output = []
  let convertThisLine = false

  const isProductionMode = process.env.NODE_ENV === 'production' && mode === 'production'
  if (isProductionMode) {
    output = [
      "import React from 'react'",
      "import loadable from '@loadable/component'",
      "import FallbackLoading from './components/Loading/RequestLoading'",
    ]
  }
  rl.on('line', (line, b) => {
    if (/IMPORT COMPONENTS BEGIN/i.test(line)) {
      convertThisLine = true
    }
    if (/IMPORT COMPONENTS END/i.test(line)) {
      convertThisLine = false
    }
    if (isProductionMode) {
      if (/import\s(React|loadable|FallbackLoading)/.test(line)) {
        // 不处理
      } else if (convertThisLine && /^import/.test(line)) {
        const [, componentName, , componentPath] = line.split(' ')
        output.push(
          `const ${componentName} = loadable(() => import(${componentPath}), { fallback: <FallbackLoading /> })`,
        )
      } else {
        output.push(line)
      }
    } else {
      if (/import\s(React|loadable|FallbackLoading)/.test(line)) {
        // remove line
      } else if (convertThisLine && /^const/.test(line)) {
        const [, componentName] = line.split(' ')
        let [, componentPath] = line.split("'")
        if (!componentPath) {
          componentPath = line.split('"')[1]
        }
        output.push(`import ${componentName} from '${componentPath}'`)
      } else {
        output.push(line)
      }
    }
  })
  rl.on('close', (line) => {
    // console.log('routes.js更新完毕！')
    // console.log(output)
    fs.writeFileSync(filepath, output.join(os.EOL) + os.EOL)
  })
}
