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
// 对localStorage操作的封装
var toFormat_1 = __importDefault(require("../date/toFormat"));
var parseDate_1 = __importDefault(require("../string/parseDate"));
var LocalStorage = /** @class */ (function () {
    function LocalStorage(options) {
        this.options = __assign({}, options);
        this.date = this._getTimeout();
    }
    // 给store设置值
    LocalStorage.prototype.set = function (value, callback) {
        var obj = {
            value: value,
            timeout: toFormat_1.default(this.date, 'yyyy/M/d HH:mm:ss')
        };
        window.localStorage.setItem(this.options.key, JSON.stringify(obj));
        // 处理回调
        callback && callback(obj.value);
    };
    LocalStorage.prototype.get = function () {
        var curItem = window.localStorage.getItem(this.options.key);
        // 这段可以让下面的try语句中的类型被自动推断出来
        if (curItem == null) {
            return null;
        }
        // 解析JSON
        try {
            var storedData = JSON.parse(curItem);
            var timeout = storedData.timeout;
            // 比较timeout是否超时
            if (timeout) {
                var expireTime = parseDate_1.default(timeout);
                if (expireTime.getTime() >= new Date().getTime()) {
                    return storedData.value;
                }
                else {
                    // 移除
                    this.remove();
                    return null;
                }
            }
        }
        catch (err) {
            console.log(err);
            return null;
        }
    };
    LocalStorage.prototype.remove = function () {
        window.localStorage.removeItem(this.options.key);
    };
    // 获取超时时间
    LocalStorage.prototype._getTimeout = function () {
        var diffTime = this.options.lifeTime || 24 * 60 * 60 * 1000;
        diffTime += new Date().getTime();
        return new Date(diffTime);
    };
    return LocalStorage;
}());
exports.default = LocalStorage;
