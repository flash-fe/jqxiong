"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 用观察者模式实现一个事件系统
var itarator_1 = __importDefault(require("./itarator"));
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this.eventList = {};
        this.iterator = new itarator_1.default({ data: [], direc: 'front' });
    }
    EventEmitter.prototype.emit = function (evtNm, data) {
        var evts = this.eventList[evtNm];
        evts && evts.length && this.iterator.setData(evts).each(function (evtFunc) { return evtFunc(data); });
    };
    EventEmitter.prototype.on = function (evtNm, func) {
        if (!this.eventList[evtNm]) {
            this.eventList[evtNm] = [];
        }
        this.eventList[evtNm].push(func);
    };
    EventEmitter.prototype.off = function (evtNm, func) {
        var _this = this;
        var evts = this.eventList[evtNm];
        if (typeof func !== 'function') { // 没有传递指定回调函数, 移除整个事件的所有订阅
            delete this.eventList[evtNm];
        }
        else {
            evts && evts.length && this.iterator.setData(evts).each(function (evtFunc, idx) {
                if (evtFunc === func) {
                    _this.eventList[evtNm] = __spreadArrays(evts.slice(0, idx), evts.slice(idx + 1, evts.length));
                    return true;
                }
            });
        }
    };
    return EventEmitter;
}());
exports.default = EventEmitter;
