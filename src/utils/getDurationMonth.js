import moment from 'moment'

export default (start, stop) => {
  start = moment(start).startOf('month')
  stop = moment(stop).startOf('month')
  if (!start.isValid() || !stop.isValid()) {
    // throw '日期不合法'
    return []
  }
  if (start.isAfter(stop)) {
    [start, stop] = [stop, start]
  }
  const diffMonthCount = stop.diff(start, 'months')
  const diffMonthList = []
  const startLoopDate = start.subtract(1, 'month')
  for (let i = 1; i <= diffMonthCount + 1; i++) {
    diffMonthList.push(startLoopDate.add(1, 'month').format('YYYY-MM'))
  }
  return diffMonthList
}
