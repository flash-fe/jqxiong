// 判断是否在微信中
export function isInWeChat(UA = '') {
    if (UA === void 0) { UA = ''; }
    if (typeof navigator === 'undefined' && !UA) {
        return false;
    }
    return /MicroMessenger/i.test(UA || navigator.userAgent);
}

export default isInWeChat()