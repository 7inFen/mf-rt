/* eslint-disable max-len */
// More info on Webpack's Node API here: https://webpack.js.org/api/node/
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack'
// import config from '../webpack.config.prod'
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from './chalkConfig'
import project from '../config/project'
import { apiConfig } from '../api'
const fs = require('fs')
const path = require('path')
const updateEnvFile = require('./updateEnvFile')
const argvs = process.argv
const mode = argvs[2]
import { logRepoInfo } from './getRepoInfo'

process.env.NODE_ENV = 'production'
// this assures React is built in prod mode and that the Babel dev config doesn't apply.
let api = {}
switch (mode) {
  case '--production':
    api = apiConfig.production
    updateEnvFile('RUNTIME_ENV=production')
    break
  case '--predev':
    api = apiConfig.predev
    updateEnvFile('RUNTIME_ENV=predev')
    break
  default:
    api = apiConfig.development
    updateEnvFile('RUNTIME_ENV=development')
    break
}

console.log(chalkWarning(`======= Base Url: ${api.apiBaseUrl} =======`))
logRepoInfo()

const updateRoutes = require('./updateRoutes')
updateRoutes()

require('dotenv').config()
const config = require('../webpack.config.prod')
// console.log(chalkProcessing('Generating minified bundle. This will take a moment...'))

webpack(config).run((error, stats) => {
  if (error) {
    // so a fatal error occurred. Stop here.
    console.log(chalkError(error))
    return 1
  }

  const jsonStats = stats.toJson()

  if (stats.hasErrors && jsonStats.hasErrors) {
    return jsonStats.errors.map((error) => console.log(chalkError(error)))
  }

  if (stats.hasWarnings && jsonStats.hasWarnings) {
    console.log(chalkWarning('Webpack generated the following warnings: '))
    jsonStats.warnings.map((warning) => console.log(chalkWarning(warning)))
  }

  console.log(`Webpack stats: ${stats}`)

  // 复制版本文件到dist
  console.log(chalkProcessing('拷贝版本号文件到dist...'))
  fs.copyFileSync(path.resolve(__dirname, '../src/version.json'), path.resolve(__dirname, '../dist/version.json'))
  // console.log('拷贝完成!')
  // if we got this far, the build succeeded.
  console.log(chalkSuccess('打包完成！'))
  console.log(chalkSuccess('=============================================='))
  console.log('打包时间: ', chalkSuccess(project.buildTime))
  console.log('Api环境: ', chalkSuccess(process.env.RUNTIME_ENV))
  console.log('Base Url: ', chalkSuccess(api.apiBaseUrl))
  console.log('dist路径: ', chalkSuccess(path.resolve(__dirname, '../dist')))
  logRepoInfo()
  console.log(chalkSuccess('=============================================='))

  return 0
})
