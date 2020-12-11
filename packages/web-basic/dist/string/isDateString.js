"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 判断一个字符串是否是符合date格式的
var parseDate_1 = __importDefault(require("./parseDate"));
function isDateString(str) {
    return parseDate_1.default(str).toString() !== "Invalid Date";
}
exports.default = isDateString;
