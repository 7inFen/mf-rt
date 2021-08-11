import { chalkSuccess, chalkWarning } from './chalkConfig'
import moment from 'moment'
const getRepoInfo = require('git-repo-info')
const info = getRepoInfo()

export const logRepoInfo = () => {
  console.log()
  console.log(chalkWarning('最后提交信息：'))
  console.log('Branch: ', chalkSuccess(info.branch))
  console.log('SHA: ', chalkSuccess(info.sha))
  console.log('Author: ', chalkSuccess(info.author))
  console.log('Commit: ', chalkSuccess(info.commitMessage))
  console.log('Date: ', chalkSuccess(moment(info.committerDate).format('YYYY-MM-DD HH:mm:ss')))
}

export default info
