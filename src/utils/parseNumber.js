import NP from './np'

export const isNumber = (value) => {
  return !isNaN(parseFloat(value))
}

export const numberIsInValid = (number) => {
  number = number - 0
  let value = false
  if (number === 0) {
    value = 0
  }
  if (isNaN(number)) {
    value = '-'
  }
  return value
}

export const setThousands = (number, precision = 2) => {
  if ([null, undefined, ''].includes(number)) {
    return '-'
  }
  number = `${number}`.split(',').join('')
  const inValidValue = numberIsInValid(number)
  if (inValidValue) {
    return number ?? inValidValue
  }
  const numberString = `${NP.round(number, precision)}`
  const isNegative = numberString.startsWith('-')
  const numberList = (isNegative ? numberString.slice(1) : numberString).split('.')
  const list = []
  numberList[0]
    .split('')
    .reverse()
    .map((item, idx) => {
      if (idx && idx % 3 === 0) {
        item += ','
      }
      list.push(item)
    })
  numberList[0] = list.reverse().join('')
  const resultNumber = numberList.join('.')
  return isNegative ? `-${resultNumber}` : resultNumber
}

export const setUnit = (number) => {
  if (`${number}`.endsWith('W') || `${number}`.endsWith('K')) {
    number = `${number}`.slice(0, -1)
  }
  const inValidValue = numberIsInValid(number)
  if (inValidValue) {
    return inValidValue
  }
  const isNegative = `${number}`.startsWith('-')
  number = isNegative ? -number : number
  let unit = ''
  if (number > 9999) {
    number = NP.divide(number, 10000)
    unit = 'W'
  } else if (number > 999) {
    number = NP.divide(number, 1000)
    unit = 'K'
  }
  number = setThousands(NP.round(number, 2))
  return isNegative ? `-${number} ${unit}` : `${number} ${unit}`
}

export default {
  setThousands,
  setUnit,
}
