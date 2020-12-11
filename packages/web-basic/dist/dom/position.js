"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPositionLeft = exports.getPositionTop = void 0;
// 获取元素相对于视口的绝对位置
var getPositionTop = function (dom) {
    var offset = dom.offsetTop;
    if (dom.offsetParent != null) {
        offset += exports.getPositionTop(dom.offsetParent);
    }
    return offset;
};
exports.getPositionTop = getPositionTop;
var getPositionLeft = function (dom) {
    var offset = dom.offsetLeft;
    if (dom.offsetParent != null) {
        offset += exports.getPositionLeft(dom.offsetParent);
    }
    return offset;
};
exports.getPositionLeft = getPositionLeft;
