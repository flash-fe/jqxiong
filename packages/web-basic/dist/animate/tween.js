"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * tween动画缓动效果算法
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * 完整算法见链接
 * https://github.com/zhangxinxu/Tween/blob/master/tween.js
 */
var Tween = {
    Cubic: {
        easeIn: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function (t, b, c, d) {
            if ((t /= d / 2) < 1) {
                return c / 2 * t * t * t + b;
            }
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Back: {
        easeOut: function (t, b, c, d, s) {
            if (typeof s == "undefined")
                s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        }
    }
};
exports.default = Tween;
