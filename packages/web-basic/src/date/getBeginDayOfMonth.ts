// 获取一个月的第一天是星期几
import isDate from './isDate'

const getBeginDayOfMouth = (date: Date, month: number) => {
  let year: number = 0;
  isDate(date)
    ? ( month = month >= 0 ? month : date.getMonth(), year = date.getFullYear() )
    : month--;
  const newDate = new Date(year, month, 1);
  return newDate.getDay()
}

export default getBeginDayOfMouth