"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCookie = exports.setCookie = exports.getCookie = void 0;
// 处理cookie读取与设置
var isInBrowser_1 = __importDefault(require("../utils/isInBrowser"));
var isType_1 = __importDefault(require("../utils/isType"));
function getCookie(key) {
    if (typeof document !== 'undefined' && document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=');
        if (start != -1) {
            start = start + key.length + 1;
            var end = document.cookie.indexOf(';', start);
            if (end == -1) {
                end = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(start, end));
        }
    }
    return '';
}
exports.getCookie = getCookie;
function setCookie(key, value, timeout, path, domain, secure) {
    timeout = timeout || new Date(new Date().getTime() + 3 * 360 * 24 * 60 * 60 * 1000);
    path = path || '';
    domain = domain || '';
    if (!isInBrowser_1.default) {
        return;
    }
    try {
        // 处理数组or对象
        if (isType_1.default(value, 'Object') || isType_1.default(value, 'Array')) {
            value = JSON.stringify(value);
        }
        document.cookie = document.cookie = key + "=" + encodeURIComponent(value) +
            ((timeout) ? "; expires=" + timeout.toGMTString() : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
    }
    catch (err) {
        console.log(err);
    }
}
exports.setCookie = setCookie;
// 移除cookie (通过设置timeout -1 实现)
function removeCookie(key, options) {
    var timeout = new Date(new Date().getTime() - 1);
    options = __assign(__assign({ path: "/" }, options), { timeout: timeout });
    setCookie(key, '', options.timeout, options.path, options.domain, options.secure);
}
exports.removeCookie = removeCookie;
