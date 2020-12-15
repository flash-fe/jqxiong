"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = __importDefault(require("./query"));
/**
 *  反序列化params 为 query参数
 * @param params {}
 * @param url string, 如果传入url, 会返回拼接好的完整url
 */
function desQuery(params, url) {
    if (params === void 0) { params = {}; }
    var str = '';
    try {
        for (var item in params) {
            str += item + "=" + params[item] + "&";
        }
        str = str.replace(/&$/, '');
        if (url) {
            url = url.replace(/&$/, '');
            var originQueryParams = query_1.default('', url);
            // 已经存在query参数
            if (Object.keys(originQueryParams).length > 0) {
                url += '&';
            }
            else {
                url = /\?$/.test(url) ? url : url + '?';
            }
            str = url + str;
        }
    }
    catch (err) {
        throw new Error(err);
    }
    return str;
}
exports.default = desQuery;
