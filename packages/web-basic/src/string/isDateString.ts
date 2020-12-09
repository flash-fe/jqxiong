// 判断一个字符串是否是符合date格式的
import parseDate from './parseDate.js'

function isDateString(str: string) {
  return parseDate(str).toString() !== "Invalid Date";
}

export default isDateString