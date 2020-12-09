import isDate from './isDate'
import isLeapYear from './isLeapYear'

/**
 * 获取一个月有多少天
 * @param date 
 * @param month month 默认从0开始计数
 */
function getDaysOfMonth(date: Date, month: number) {
  if (isDate(date)) {
    const year = date.getFullYear();
    const yearDate = new Date();
    yearDate.setFullYear(year);

    const daysMap = [
      31,
      isLeapYear(yearDate) ? 29 : 28,
      31,30,31,30,31,31,30,31,30,31
    ]
    return daysMap[month]
  }
  return null
}

export default getDaysOfMonth