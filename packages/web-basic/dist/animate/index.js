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
var tween_1 = __importDefault(require("./tween"));
var easing_1 = __importDefault(require("./easing"));
// 极简的动画函数封装，基于Tween函数做easing动画
var FlashAnimate = /** @class */ (function () {
    function FlashAnimate(props) {
        var _this = this;
        this.endValue = 0; // 结束值
        this.isAnimate = false;
        this.isAnimateEnd = false; // 动画是否结束
        this.timer = null;
        this.curTime = 0;
        this.startValue = 0; // 起始值
        this.curValue = 0; // 当前目标值
        this.animateTo = function () {
            var easingFunc = _this.props.easing || tween_1.default.Cubic.easeInOut;
            var disValue = _this.endValue - _this.startValue;
            // 支持字符串格式的快捷输入
            if (typeof easingFunc == 'string') {
                easingFunc = easing_1.default[easingFunc] || easing_1.default['easeInOut'];
            }
            _this.curValue = easingFunc(_this.curTime, _this.startValue, disValue, _this.props.duration || 300);
            _this.curValue = Math.floor(_this.curValue); // 取整
            _this.curTime += 10;
            var endVal = Math.abs(_this.endValue - _this.curValue);
            if (_this.isAnimate) {
                // 接近临界点时吸附到终点
                if (endVal <= 0) {
                    cancelRequestAnimationFrame(_this.timer);
                    _this.curValue = _this.endValue;
                    _this.isAnimate = false;
                    _this.props.onAnimating && _this.props.onAnimating(_this.curValue);
                    _this.props.onComplete && _this.props.onComplete(_this.curValue);
                    _this.isAnimateEnd = true;
                }
                else {
                    _this.timer = requestAnimationFrame(_this.animateTo);
                    _this.props.onAnimating && _this.props.onAnimating(_this.curValue);
                }
            }
        };
        this.startValue = Math.floor(props.start);
        this.endValue = Math.floor(props.end);
        this.curValue = this.startValue;
        this.props = __assign({}, props);
    }
    FlashAnimate.prototype.run = function () {
        // 可以控制动画重放
        // if (this.isAnimateEnd) { // 重新执行动画
        //     this.isAnimateEnd = false;
        //     this.curValue = this.startValue;
        //     this.curTime = 0;
        // }
        // 也可以控制动画只执行一次
        if (this.isAnimateEnd) {
            return this.props.onComplete && this.props.onComplete(this.curValue);
            ;
        }
        cancelRequestAnimationFrame(this.timer);
        if (!this.isAnimate) {
            this.isAnimate = true;
            this.animateTo();
        }
    };
    FlashAnimate.prototype.reset = function () {
        this.stop();
        this.isAnimateEnd = false;
        this.curValue = this.startValue;
        this.curTime = 0;
        this.run();
    };
    FlashAnimate.prototype.stop = function () {
        this.isAnimate = false;
        cancelRequestAnimationFrame(this.timer);
    };
    return FlashAnimate;
}());
function requestAnimationFrame(func) {
    var timeoutFunc = function (callback) {
        raf = window.setTimeout(callback, 17); // 1000 / 60
    };
    var raf = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        timeoutFunc;
    raf(func);
    return raf;
}
function cancelRequestAnimationFrame(timer) {
    var carf = window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame || window.clearTimeout;
    carf(timer);
}
exports.default = FlashAnimate;
