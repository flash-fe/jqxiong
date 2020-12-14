"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIPhoneXSR = void 0;
// 判断是否是XS/XR/XSMax
var isInBrowser_1 = __importDefault(require("./isInBrowser"));
var isIPhone_1 = __importDefault(require("./isIPhone"));
function isIPhoneXSR() {
    if (isInBrowser_1.default && isIPhone_1.default) {
        try {
            var h = window.screen.height, w = window.screen.width;
            if (h === 896 || w === 896) {
                return true;
            }
        }
        catch (e) {
        }
        return false;
    }
    return false;
}
exports.isIPhoneXSR = isIPhoneXSR;
exports.default = isIPhoneXSR();
