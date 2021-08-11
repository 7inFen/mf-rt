/**
 * 给定一个起止色值和需要的区间长度，转换为区间长度大小的颜色渐变范围
 * 涉及文件：src/components/MapInsight/Map.js
 */
// 作者：知乎用户
// 链接：https://www.zhihu.com/question/38869928/answer/78527903
// 来源：知乎
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// convert #hex notation to rgb array
const parseColor = function (hexStr) {
  return hexStr.length === 4
    ? hexStr
      .substr(1)
      .split('')
      .map(function (s) {
        return 0x11 * parseInt(s, 16)
      })
    : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function (s) {
      return parseInt(s, 16)
    })
}

// zero-pad 1 digit to 2
const pad = function (s) {
  return s.length === 1 ? '0' + s : s
}

export default function (start, end, steps, gamma) {
  let i
  let j
  let ms
  let me
  let output = []
  let so = []
  gamma = gamma || 1
  let normalize = function (channel) {
    return Math.pow(channel / 255, gamma)
  }
  start = parseColor(start).map(normalize)
  end = parseColor(end).map(normalize)
  for (i = 0; i < steps; i++) {
    ms = i / (steps - 1)
    me = 1 - ms
    for (j = 0; j < 3; j++) {
      so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16))
    }
    output.push('#' + so.join(''))
  }
  return output
}
