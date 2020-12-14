"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAndroid = void 0;
// 判断是否是安卓环境
function isAndroid(UA) {
    if (UA === void 0) { UA = ''; }
    if (typeof navigator === 'undefined' && !UA) {
        return false;
    }
    return /Android/i.test(UA || navigator.userAgent);
}
exports.isAndroid = isAndroid;
exports.default = isAndroid();
