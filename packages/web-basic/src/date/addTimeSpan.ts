// 获取当前时间+day天,+miu分钟的时间,取整到分钟10, 20, 30 ...

function addTimeSpan(date: Date, day?: number, miu?: number, isFloor?: boolean) {
  if (day) {
    date.setDate(date.getDate() + day)
  }
  if (miu) {
    date.setMinutes(date.getMinutes() + miu)
  }
  const mathJob = isFloor ? Math.floor : Math.ceil; // 小数去尾 : 小数进一
  const formatMin = mathJob(date.getMinutes() / 10) * 10
  date.setMinutes(formatMin);
  return date;
}

export default addTimeSpan