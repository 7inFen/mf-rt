const fs = require('fs')
import { moment2time } from '../../src/utils/parseTime'
/**
 * 版本信息生成插件
 * @param {object} options
 * @constructor
 */
function SetVersion(options) {
  this.options = options || {}
}

SetVersion.prototype.apply = function (compiler) {
  let self = this

  // compiler.plugin('compile', function (params) {
  compiler.hooks.compile.tap('setVersion', function (params) {
    const { version, repoInfo = {}, versionDirectory: dir_path } = self.options
    const version_file = dir_path + '/version.json'
    // let content = '{ "version": ' + self.options.version + ' }'
    const content = `{ "version": ${version}, "date": "${moment2time(
      Number(version),
      'YYYY-MM-DD HH:mm:ss',
    )}", "sha": "${repoInfo.sha}" }`
    fs.stat(dir_path, function (err, exist) {
      if (err) {
        fs.mkdir(dir_path, function (err) {
          if (err) throw err
          console.log('\n创建目录[' + dir_path + ']成功')
        })
      }
      writeVersion(self, version_file, content)
    })
  })
}

const writeVersion = (self, versionFile, content) => {
  console.log('\n当前版本号：' + self.options.version)
  // console.log('开始写入版本信息...')
  // console.log('文件路径: ' + versionFile)

  // 写入文件
  fs.writeFile(versionFile, content, function (err) {
    if (err) {
      console.log('版本信息写入失败！')
      throw err
    }
    console.log('打包中...')
  })
}

module.exports = SetVersion
