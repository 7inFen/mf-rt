// function enableGetVariableName(fn) {
//   return eval('(' + fn.toString().replace(/return enableGetVariableName\([^\)]+\)\.apply\(this, arguments\)/g, '').replace(/\b(?:getParamName)\s*\(([a-zA-Z_$][\w_$]*)\)/g, function (u, v) {
//     return "'" + v + "'"
//   }) + ')')
// }

// function fn() {
//   return enableGetVariableName(fn).apply(this, arguments)

//   var param1 = 0
//   var a = 2

//   console.log(getParamName(param1))
//   console.log(getParamName(a))
// }

// fn()
import theme from '../theme'
const primaryColor = theme.color.primary

const cssStr = `color: ${primaryColor};font-weight: bold;`

export default (data, title = '') => {
  console.log(`%c↓==↓==↓==↓==↓==↓==↓== ${title} begin ==↓==↓==↓==↓==↓==↓==↓`, cssStr)
  console.log(data)
  console.log(`%c↑==↑==↑==↑==↑==↑==↑== ${title} end ==↑==↑==↑==↑==↑==↑==↑`, cssStr)
}
