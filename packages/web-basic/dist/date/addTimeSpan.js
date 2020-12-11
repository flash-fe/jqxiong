"use strict";
// 获取当前时间+day天,+miu分钟的时间,取整到分钟10, 20, 30 ...
Object.defineProperty(exports, "__esModule", { value: true });
function addTimeSpan(date, day, miu, isFloor) {
    if (day) {
        date.setDate(date.getDate() + day);
    }
    if (miu) {
        date.setMinutes(date.getMinutes() + miu);
    }
    var mathJob = isFloor ? Math.floor : Math.ceil; // 小数去尾 : 小数进一
    var formatMin = mathJob(date.getMinutes() / 10) * 10;
    date.setMinutes(formatMin);
    return date;
}
exports.default = addTimeSpan;
