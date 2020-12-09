// 判断是否是闰年

export type yearArg = Date | number;

function isLeapYear(year: yearArg) {
  let fullYear: number;
  // 日期类型
  if ((year as Date).getFullYear) {
    // jsx中不能使用尖括号的类型断言, 会与标签元素冲突
    // (<Date>year).getFullYear();
    fullYear = (year as Date).getFullYear();
  } else {
    fullYear = year as number;
  }
  if (fullYear % 4 === 0 && fullYear % 100 !== 0 || fullYear % 400 === 0) {
    return true;
  }
  return false;
}

export default isLeapYear