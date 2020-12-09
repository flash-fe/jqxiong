// 将字符串转化为日期对象

function parseDate(str: string) {
  const dateStr = str.replace(/-/g, "/");
  return new Date(dateStr)
}

export default parseDate