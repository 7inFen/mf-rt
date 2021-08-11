import moment from 'moment'

const endDate = moment()
  .subtract(0, 'days')
  .endOf('day')

export const today = [moment().startOf('day'), moment().endOf('day')]
export const yesterday = [
  moment()
    .subtract(1, 'days')
    .startOf('day'),
  endDate
]
export const thisWeek = [moment().startOf('week'), endDate]
export const thisMonth = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
export const lastMonth = [
  moment()
    .subtract(1, 'month')
    .startOf('month'),
  moment()
    .subtract(1, 'month')
    .endOf('month')
]
export const thisYear = [moment().startOf('year').format('YYYY-MM-DD'), moment().endOf('year').format('YYYY-MM-DD')]
export const thisQuarter = [moment().startOf('quarter').format('YYYY-MM-DD'), moment().endOf('quarter').format('YYYY-MM-DD')]

export default (days = 0, format) => {
  let start = moment()
    .subtract(days, 'days')
    .startOf('days')
  let stop = endDate
  if (format) {
    start = start.format(format)
    stop = stop.format(format)
  }
  return [start, stop]
}
