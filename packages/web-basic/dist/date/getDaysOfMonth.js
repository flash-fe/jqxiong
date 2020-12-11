"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isDate_1 = __importDefault(require("./isDate"));
var isLeapYear_1 = __importDefault(require("./isLeapYear"));
/**
 * 获取一个月有多少天
 * @param date
 * @param month month 默认从0开始计数
 */
function getDaysOfMonth(date, month) {
    if (isDate_1.default(date)) {
        var year = date.getFullYear();
        var yearDate = new Date();
        yearDate.setFullYear(year);
        var daysMap = [
            31,
            isLeapYear_1.default(yearDate) ? 29 : 28,
            31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        ];
        return daysMap[month];
    }
    return null;
}
exports.default = getDaysOfMonth;
