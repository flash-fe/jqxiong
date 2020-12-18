"use strict";
// 加载图片资源
Object.defineProperty(exports, "__esModule", { value: true });
function loadImg(src) {
    // 图片资源似乎不需要插入到dom中，就可以触发onload
    return new Promise(function (resolve, reject) {
        var oImg = document.createElement('img');
        oImg.src = src;
        oImg.onload = function () { return resolve(src); };
        oImg.onerror = function () { return reject(src); };
    });
}
exports.default = loadImg;
