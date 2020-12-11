"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 字符串配置的easing
var tween_1 = __importDefault(require("./tween"));
var easing = {
    'easeIn': tween_1.default.Cubic.easeIn,
    'easeOut': tween_1.default.Cubic.easeOut,
    'easeInOut': tween_1.default.Cubic.easeInOut,
    'easeOutBack': tween_1.default.Back.easeOut
};
exports.default = easing;
