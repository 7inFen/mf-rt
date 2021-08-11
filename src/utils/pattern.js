export const phone = /^1[345789]\d{9}$/
export const password = /^\w{8,}$/
export const url = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
// 汉字
// export const chineseCharacter = /[\u4e00-\u9fa5]/
// 中文字符，包括全角符号
export const chineseCharacter = /[^\x00-\xff]/
export default {
  phone,
  password,
  url,
  chineseCharacter,
}
