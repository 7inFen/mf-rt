import { chalkWarning } from './chalkConfig'
const fs = require('fs')
const path = require('path')
const envFile = path.resolve(__dirname, '../.env')
module.exports = content => {
  fs.writeFileSync(envFile, content, 'utf-8')
  console.log(chalkWarning(`======= Current Env: ${content} =======`))
}
