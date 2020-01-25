function appendZero(num) {
    if (parseInt(num) < 10){
        return '0'+num
    }
    return num
}

function processDate(period) {
  let startDate, start_date, end_date, endDate = ''
  if (period.isRangeDateDisabled)
    return {range: false, date: period.selected}
  else
    startDate = period.startDate.toLocaleString().split(',')[0].split('/')
    start_date = startDate[2] + '-' + appendZero(startDate[0]) + '-' + appendZero(startDate[1])

    endDate = period.endDate.toLocaleString().split(',')[0].split('/')
    end_date = endDate[2] + '-' + appendZero(endDate[0]) + '-' + appendZero((Number(endDate[1]) + 1).toString())
    return {range: true, start_date: start_date, end_date: end_date }
}

export function dateParamCreator(period) {
  return processDate(period)
}

export default dateParamCreator;
