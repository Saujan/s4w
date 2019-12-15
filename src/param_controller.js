
function processDate(period) {
  let startDate, start_date, end_date, endDate = ''
  if (period.isRangeDateDisabled)
    return {range: false, date: period.selected}
  else
    startDate = period.startDate.toLocaleString().split(',')[0].split('/')
    start_date = startDate[2]+'-'+startDate[0]+'-'+startDate[1]

    endDate = period.endDate.toLocaleString().split(',')[0].split('/')
    end_date = endDate[2]+'-'+endDate[0]+'-'+endDate[1]

    return {range: true, start_date: start_date, end_date: end_date }
}

export function dateParamCreator(period) {
  return processDate(period)
}

export default dateParamCreator;
