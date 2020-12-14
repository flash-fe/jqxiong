"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIPhoneX = void 0;
// IPhoneX, 需要根据 窗口宽高进行计算
var isIPhone_1 = __importDefault(require("./isIPhone"));
var isInBrowser_1 = __importDefault(require("./isInBrowser"));
function isIPhoneX() {
    if (isInBrowser_1.default && isIPhone_1.default) {
        try {
            var h = window.screen.height, w = window.screen.width;
            if (h === 812 || w === 812) {
                return true;
            }
        }
        catch (e) {
        }
        return false;
    }
    return false;
}
exports.isIPhoneX = isIPhoneX;
exports.default = isIPhoneX();
