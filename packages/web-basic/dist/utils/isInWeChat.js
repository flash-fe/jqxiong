"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInWeChat = void 0;
// 判断是否在微信中
function isInWeChat(UA) {
    if (UA === void 0) { UA = ''; }
    if (UA === void 0) {
        UA = '';
    }
    if (typeof navigator === 'undefined' && !UA) {
        return false;
    }
    return /MicroMessenger/i.test(UA || navigator.userAgent);
}
exports.isInWeChat = isInWeChat;
exports.default = isInWeChat();
