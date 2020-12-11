"use strict";
// 将字符串转化为日期对象
Object.defineProperty(exports, "__esModule", { value: true });
function parseDate(str) {
    var dateStr = str.replace(/-/g, "/");
    return new Date(dateStr);
}
exports.default = parseDate;
