"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var deserializeQuery_1 = __importDefault(require("@jqxiong/web-basic/bom/deserializeQuery"));
function jsonp(url, params) {
    if (params === void 0) { params = {}; }
    // 创建函数名
    return new Promise(function (resolve, reject) {
        var timeStamp = new Date().getTime();
        var cb = params.cb || "flash_jsonp_" + timeStamp;
        params.cb = cb; // 默认处理jsonp 函数名 cb
        var fixedUrl = deserializeQuery_1.default(params, url);
        var script = document.createElement('script');
        script.src = fixedUrl;
        document.body.appendChild(script);
        script.onerror = reject;
        document.body.removeChild(script);
        // 创建jsonp函数
        window["" + cb] = function (rst) {
            // 执行函数，触发回调
            resolve(rst);
            // gc
            window["" + cb] = undefined;
            delete window["" + cb];
        };
    });
}
exports.default = jsonp;
