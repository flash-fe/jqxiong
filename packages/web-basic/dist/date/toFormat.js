"use strict";
// 时间对象格式化
Object.defineProperty(exports, "__esModule", { value: true });
var week = {
    0: '\u65e5',
    1: '\u4e00',
    2: '\u4e8c',
    3: '\u4e09',
    4: '\u56db',
    5: '\u4e94',
    6: '\u516d'
};
function toFormat(date, fmt) {
    if (fmt === void 0) { fmt = 'yyyy-M-d HH:mm'; }
    var dateObj = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : "") + week[date.getDay()]);
    }
    for (var key in dateObj) {
        if (new RegExp("(" + key + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (dateObj[key]) : (("00" + dateObj[key]).substr(("" + dateObj[key]).length)));
        }
    }
    return fmt;
}
exports.default = toFormat;
