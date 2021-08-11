// 防抖
export default (fn, delay = 200) => {
  let timer = null
  return function (...args) {
    let context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

// 节流
export const throttle = (func, gapTime) => {
  if (typeof func !== 'function') {
    throw new TypeError('need a function')
  }
  let timer = Number(gapTime) || 0
  let lastTime = 0

  return function () {
    let time = Date.now()
    if (time - lastTime > timer || !lastTime) {
      func()
      lastTime = time
    }
  }
}
