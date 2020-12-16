"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 加载脚本资源
 * @param src 脚本链接
 * @param attrs 脚本附加属性 如bu-id, souce-id等
 */
function loadScript(src, attrs) {
    if (attrs === void 0) { attrs = {}; }
    var script = document.createElement('script');
    for (var item in attrs) {
        script.setAttribute(item, attrs[item]);
    }
    script.src = src;
    return new Promise(function (resolve, reject) {
        // 如果要兼容ie, 需要处理onreadystatechange
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}
exports.default = loadScript;
