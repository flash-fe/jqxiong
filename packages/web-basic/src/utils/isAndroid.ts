// 判断是否是安卓环境
export function isAndroid(UA = '') {
    if (typeof navigator === 'undefined' && !UA) {
        return false;
    }
    return /Android/i.test(UA || navigator.userAgent);
}

export default isAndroid()