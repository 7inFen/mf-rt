'use strict'

const createAbortError = () => {
  const error = new Error('Delay aborted')
  error.name = 'AbortError'
  return error
}

const createDelay = ({ clearTimeout: defaultClear, setTimeout: set, willResolve }) => (ms, { value, signal } = {}) => {
  if (signal && signal.aborted) {
    return Promise.reject(createAbortError())
  }

  let timeoutId
  let settle
  let rejectFn
  const clear = defaultClear || clearTimeout

  const signalListener = () => {
    clear(timeoutId)
    rejectFn(createAbortError())
  }

  const cleanup = () => {
    if (signal) {
      signal.removeEventListener('abort', signalListener)
    }
  }

  const delayPromise = new Promise((resolve, reject) => {
    settle = () => {
      cleanup()
      if (willResolve) {
        resolve(value)
      } else {
        reject(value)
      }
    }

    rejectFn = reject
    timeoutId = (set || setTimeout)(settle, ms)
  })

  if (signal) {
    signal.addEventListener('abort', signalListener, { once: true })
  }

  delayPromise.clear = () => {
    clear(timeoutId)
    timeoutId = null
    cleanup()
    settle()
  }

  return delayPromise
}

const delay = createDelay({ willResolve: true })
delay.reject = createDelay({ willResolve: false })
delay.createWithTimers = ({ clearTimeout, setTimeout }) => {
  const delay = createDelay({ clearTimeout, setTimeout, willResolve: true })
  delay.reject = createDelay({ clearTimeout, setTimeout, willResolve: false })
  return delay
}

const pMinDelay = async (promise, minimumDelay, options) => {
  options = {
    delayRejection: true,
    ...options
  }

  let promiseError

  if (options.delayRejection) {
    promise = promise.catch(error => {
      promiseError = error
    })
  }

  const value = await Promise.all([promise, delay(minimumDelay)])
  return promiseError ? Promise.reject(promiseError) : value[0]
}

export default pMinDelay
