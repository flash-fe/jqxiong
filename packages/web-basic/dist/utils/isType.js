"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 判断数据类型 Date, String, Number, Array
function isType(obj, type) {
    var objStr = Object.prototype.toString.call(obj);
    var typeStr = objStr.slice(8, -1);
    return type
        ? typeStr.toLocaleLowerCase() === type.toLocaleLowerCase()
        : typeStr;
}
exports.default = isType;
