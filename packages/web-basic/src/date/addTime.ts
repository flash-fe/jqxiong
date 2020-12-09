// 增加相对时间

interface IOptions {
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
}

function addTime(date: Date, json: IOptions) {
  if (json.month) {
    date.setMonth(date.getMonth() + json.month)
  }
  if (json.day) {
    date.setDate(date.getDate() + json.day)
  }
  if (json.hour) {
    date.setHours(date.getHours() + json.hour)
  }
  if (json.minute) {
    date.setMinutes(date.getMinutes() + json.minute)
  }
  if (json.second) {
    date.setSeconds(date.getSeconds() + json.second)
  }
  return date;
}

export default addTime