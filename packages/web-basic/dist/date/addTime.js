"use strict";
// 增加相对时间
Object.defineProperty(exports, "__esModule", { value: true });
function addTime(date, json) {
    if (json.month) {
        date.setMonth(date.getMonth() + json.month);
    }
    if (json.day) {
        date.setDate(date.getDate() + json.day);
    }
    if (json.hour) {
        date.setHours(date.getHours() + json.hour);
    }
    if (json.minute) {
        date.setMinutes(date.getMinutes() + json.minute);
    }
    if (json.second) {
        date.setSeconds(date.getSeconds() + json.second);
    }
    return date;
}
exports.default = addTime;
