"use strict";
// 处理cookie读取与设置
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookie = void 0;
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
