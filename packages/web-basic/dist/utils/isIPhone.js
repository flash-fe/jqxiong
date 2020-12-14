"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIPhone = void 0;
// 判断IPhone
function isIPhone(UA) {
    if (UA === void 0) { UA = ''; }
    if (typeof navigator === 'undefined' && !UA) {
        return false;
    }
    return /iPhone\sOS/i.test(UA || navigator.userAgent);
}
exports.isIPhone = isIPhone;
exports.default = isIPhone();
