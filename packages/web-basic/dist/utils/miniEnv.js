"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.miniEnv = void 0;
// 判断小程序环境
var isInBrowser_1 = __importDefault(require("./isInBrowser"));
var isInWeChat_1 = __importDefault(require("./isInWeChat"));
var isInAliPay_1 = __importDefault(require("./isInAliPay"));
function miniEnv() {
    var source = window.navigator.userAgent;
    // 微信小程序
    var wechatMiniprogram = isInWeChat_1.default && /miniProgram/i.test(source) || (isInBrowser_1.default && window.__wxjs_environment === 'miniprogram');
    !wechatMiniprogram && isInWeChat_1.default && isInBrowser_1.default && window.wx.miniProgram.getEnv(function (res) {
        wechatMiniprogram = res.miniprogram;
    });
    // 支付宝小程序
    var alipayMiniprogram = isInAliPay_1.default && /miniProgram/i.test(source);
    !alipayMiniprogram && isInAliPay_1.default && isInBrowser_1.default && window.my.getEnv(function (res) {
        alipayMiniprogram = res.miniprogram;
    });
    return {
        isInWeChat: isInWeChat_1.default,
        isInAliPay: isInAliPay_1.default,
        get isInWeChatMiniProgram() {
            return wechatMiniprogram;
        },
        get isInAliPayMiniProgram() {
            return alipayMiniprogram;
        }
    };
}
exports.miniEnv = miniEnv;
exports.default = miniEnv();
