
class FilterMenuValidation {
  constructor(param) {
  }
  static valid_date_intervals(dates_info) {
    if (dates_info['range'])
      return dates_info['end_date'] >= dates_info['start_date']
    else
      return true
  }
}

export default FilterMenuValidation;