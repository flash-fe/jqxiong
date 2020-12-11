"use strict";
// 判断是否是闰年
Object.defineProperty(exports, "__esModule", { value: true });
function isLeapYear(year) {
    var fullYear;
    // 日期类型
    if (year['getFullYear']) {
        // jsx中不能使用尖括号的类型断言, 会与标签元素冲突
        // (<Date>year).getFullYear();
        fullYear = year.getFullYear();
    }
    else {
        fullYear = year;
    }
    if (fullYear % 4 === 0 && fullYear % 100 !== 0 || fullYear % 400 === 0) {
        return true;
    }
    return false;
}
exports.default = isLeapYear;
