// 是否在支付宝
export function isInAliPay(UA = '') {
    const source = UA || window.navigator.userAgent;
    return source.indexOf('AlipayClient') > -1
}

export default isInAliPay()