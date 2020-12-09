// 时间对象格式化

interface IWeek {
  [key: number]: string
}

const week: IWeek = {
  0: '\u65e5',
  1: '\u4e00',
  2: '\u4e8c',
  3: '\u4e09',
  4: '\u56db',
  5: '\u4e94',
  6: '\u516d'
}
interface IDateObj {
  readonly [propName: string]: any;
}

function toFormat(date: Date, fmt = 'yyyy-M-d HH:mm') {
  const dateObj: IDateObj = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    "H+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    "S": date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : "") + week[date.getDay()]);
  }
  for (const key in dateObj) {
    if (new RegExp("(" + key + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (dateObj[key]) : (("00" + dateObj[key]).substr(("" + dateObj[key]).length)));
    }
  }
  return fmt;
}

export default toFormat