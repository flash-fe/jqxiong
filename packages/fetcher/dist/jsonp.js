"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var deserializeQuery_1 = __importDefault(require("@jqxiong/web-basic/bom/deserializeQuery"));
function jsonp(url, params) {
    if (params === void 0) { params = {}; }
    console.log(url);
    console.log(params);
    console.log(deserializeQuery_1.default);
    return;
    // 创建函数名
    return new Promise(function (resolve, reject) {
        var timeStamp = new Date().getTime();
        var cb = params.cb || "flash_jsonp_" + timeStamp;
        var script = document.createElement('script');
        script.src = url;
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
