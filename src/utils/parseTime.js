import moment from 'moment'

export const time2moment = (time) => {
  if (moment(time).isValid()) {
    return moment(time)
  }
  return time
}

export const moment2time = (time, format = 'YYYY-MM-DD') => {
  if (moment.isMoment(time)) {
    return time.format(format)
  }
  if (moment(time).isValid()) {
    return moment(time).format(format)
  }
  return time
}

export const getDiffTime = (t1, t2, measure = 'days') => {
  if (t1 && t2) {
    return moment(t1).diff(t2, measure)
  } else {
    return 0
  }
}

/**
 * 返回最新的日期
 *
 * @param {*} t1
 * @param {*} t2
 * @returns
 */
export const getRecentTime = (t1, t2) => {
  if (t1 && t2) {
    const diffTime = getDiffTime(t1, t2, 'seconds')
    return diffTime > 0 ? t1 : t2
  } else {
    return t1 || t2 || '-'
  }
}

export const TODAY = moment().format('YYYY-MM-DD')
export const TODAY_MOMENT = moment(TODAY)

export const getAge = (birthday = '-') => {
  if (!moment(birthday).isValid()) {
    return '未知'
  }
  const diffYear = moment().diff(birthday, 'years')
  const diffMonth = moment().diff(birthday, 'months')
  return diffYear === 0 ? `${diffMonth}个月` : `${diffYear}岁`
}
