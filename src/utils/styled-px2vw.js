import styled from '../../node_modules/styled-components'
import project from '../../config/project'

const viewportWidth = project.viewportWidth
let clientWidth = window.document.documentElement.clientWidth

const MIN_FONT_SIZE_IN_CHROME = 12

const pxRe = /-?\d*[.\d]*px/g
const base64Re = /^data:\w+\/[a-zA-Z+\-.]+;base64,/i

/**
 * px to vw
 *
 * @param {*} px px大小
 * @param {*} minSize 最小size，单位为px
 * @returns vw 或 px
 */
const px2vw = (px, minSize) => {
  return `${px}px`
  // if (Number(px)) {
  //   if (viewportWidth) {
  //     let vw = Math.round(Number(px) / (viewportWidth / 100) * 100000) / 100000
  //     if (minSize) {
  //       const minVw = minSize / screen.width * 100
  //       vw = vw < minVw ? minVw : vw
  //     }
  //     return `${vw}vw`
  //   } else {
  //     return `${px}px`
  //   }
  // } else {
  //   return 0
  // }
}

export const realPx = (px) => {
  return px * clientWidth / 1920
}

const reFontSize = /font\-size\s*:\s*\d+\.?\d*\s*px\s*;?/g
const getReFontSize = /font\-size\s*:\s*(?<fontSize>\d+\.?\d*)\s*px\s*;?/
const replaceFontSize = (str = '') => {
  // 限制最小字体大小为12px
  return str.replace(reFontSize, value => {
    let { fontSize = '' } = value.match(getReFontSize).groups
    fontSize = Number(fontSize) + 2
    return `font-size:${fontSize}px;`
    // let maxScreenWidth = Math.floor(MIN_FONT_SIZE_IN_CHROME / Number(fontSize) * 100)
    // return `${value}
    // @media screen and (max-width:${maxScreenWidth}px){
    //   font-size:${MIN_FONT_SIZE_IN_CHROME}px;
    // }
    // `
  })
}

const convertStringPx2vw = style => {
  if (!style) return style
  // console.log(style)
  if (
    !base64Re.test(style) && // 非base64字符串
    pxRe.test(style) // 包含px单位
  ) {
    //
    const replaceToVw = style.replace(pxRe, value => px2vw(value.replace('px', '')))
    //
    return replaceFontSize(replaceToVw)
  }
  return style
}

const isKeyframes = interpolation => Object.prototype.toString.call(interpolation) === '[object Object]' &&
  interpolation.constructor.name === 'Keyframes'

const convertKeyframesPx2vw = keyframes => {
  keyframes.rules = keyframes.rules.map(convertStringPx2vw)

  return keyframes
}

const convertInterpolationPx2vw = interpolation => {
  if (typeof interpolation === 'string') {
    return convertStringPx2vw(interpolation)
  }

  if (isKeyframes(interpolation)) {
    return convertKeyframesPx2vw(interpolation)
  }

  if (Array.isArray(interpolation)) {
    return interpolation.map(convertInterpolationPx2vw)
  }

  if (typeof interpolation === 'function') {
    return props => convertInterpolationPx2vw(interpolation(props))
  }

  return interpolation
}

const withCss = styled => {
  const interleave = (strings, ...interpolations) => {
    strings = strings.map(convertStringPx2vw)

    interpolations = interpolations.map(convertInterpolationPx2vw)

    return styled(strings, ...interpolations)
  }

  Object.keys(styled).forEach(prop => interleave[prop] = withTemplateFunc(styled[prop]))

  return interleave
}

const withTemplateFunc = styled => (...props) => withCss(styled(...props))

const styledPx2vw = ((styled) => {
  const obj = withTemplateFunc(styled)

  Object.keys(styled).forEach(key => {
    obj[key] = withCss(styled[key])

    Object.keys(styled[key]).forEach(prop => obj[key][prop] = withTemplateFunc(styled[key][prop]))
  })

  return obj
})(styled)

export default styledPx2vw
export { px2vw }
export * from '../../node_modules/styled-components'
