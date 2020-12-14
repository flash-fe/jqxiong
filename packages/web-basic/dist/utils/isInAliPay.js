"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInAliPay = void 0;
// 是否在支付宝
function isInAliPay(UA) {
    if (UA === void 0) { UA = ''; }
    var source = UA || window.navigator.userAgent;
    return source.indexOf('AlipayClient') > -1;
}
exports.isInAliPay = isInAliPay;
exports.default = isInAliPay();
