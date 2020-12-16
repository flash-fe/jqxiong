"use strict";
// 加载图片资源
Object.defineProperty(exports, "__esModule", { value: true });
function loadImg(src) {
    var oImg = document.createElement('img');
    oImg.src = src;
    // 图片资源似乎不需要插入到dom中，就可以触发onload
    return new Promise(function (resolve, reject) {
        oImg.onload = resolve;
        oImg.onerror = reject;
    });
}
exports.default = loadImg;