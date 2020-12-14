// 判断小程序环境
import isInBrowser from './isInBrowser'
import isInWeChat from './isInWeChat'
import isInAliPay from './isInAliPay'

export function miniEnv() {
    const source = window.navigator.userAgent;
    // 微信小程序
    let wechatMiniprogram = isInWeChat && /miniProgram/i.test(source) || (isInBrowser && (window as any).__wxjs_environment === 'miniprogram');
    !wechatMiniprogram && isInWeChat && isInBrowser && (window as any).wx.miniProgram.getEnv(function (res: any) {
        wechatMiniprogram = res.miniprogram
    })
    // 支付宝小程序
    let alipayMiniprogram = isInAliPay && /miniProgram/i.test(source);
    !alipayMiniprogram && isInAliPay && isInBrowser && (window as any).my.getEnv(function (res: any) {
        alipayMiniprogram = res.miniprogram
    })
    return {
        isInWeChat,
        isInAliPay,
        get isInWeChatMiniProgram() {
            return wechatMiniprogram;
        },
        get isInAliPayMiniProgram() {
            return alipayMiniprogram;
        }
    }
}

export default miniEnv()