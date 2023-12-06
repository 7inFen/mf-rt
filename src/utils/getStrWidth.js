import pattern from './pattern'

export default (str, widthConfigParams = {}) => {
  const widthConfig = {
    chinese: 14,
    number: 10,
    // 其它字符为中文字符宽度的一半
    other: widthConfigParams?.chinese ? widthConfigParams?.chinese / 2 : 7,
    space: 5,
    ...widthConfigParams,
  }
  return (`${str}` || '')
    .replace(/\s+/g, ' ')
    .split('')
    .reduce((prev, curr) => {
      // 按最小单位计算
      if (pattern.chineseCharacter.test(curr)) {
        return prev + widthConfig.chinese
      } else if (/\d/.test(curr)) {
        return prev + widthConfig.number
      } else if (/s/.test(curr)) {
        return prev + widthConfig.space
      }
      return prev + widthConfig.other
    }, 0)
}

// String.prototype.len=function(){return this.replace(/[^\x00-\xff]/g,"aa").length;}
