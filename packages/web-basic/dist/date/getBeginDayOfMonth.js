"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 获取一个月的第一天是星期几
var isDate_1 = __importDefault(require("./isDate"));
var getBeginDayOfMouth = function (date, month) {
    var year = 0;
    isDate_1.default(date)
        ? (month = month >= 0 ? month : date.getMonth(), year = date.getFullYear())
        : month--;
    var newDate = new Date(year, month, 1);
    return newDate.getDay();
};
exports.default = getBeginDayOfMouth;
