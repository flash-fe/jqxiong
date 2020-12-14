// 判断IPhone
export function isIPhone(UA = '') {
    if (typeof navigator === 'undefined' && !UA) {
        return false;
    }
    return /iPhone\sOS/i.test(UA || navigator.userAgent);
}

export default isIPhone()