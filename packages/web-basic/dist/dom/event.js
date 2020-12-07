"use strict";
// 事件绑定
// dom事件, client only
Object.defineProperty(exports, "__esModule", { value: true });
exports.once = exports.off = exports.on = void 0;
function on(element, event, handler) {
    if (document.addEventListener) {
        if (element && event && handler) {
            element.addEventListener(event, handler, false);
        }
    }
    else {
        if (element && event && handler) {
            element.attachEvent('on' + event, handler);
        }
    }
}
exports.on = on;
function off(element, event, handler) {
    if (document.removeEventListener) {
        if (element && event) {
            element.removeEventListener(event, handler, false);
        }
    }
    else {
        if (element && event) {
            element.detachEvent('on' + event, handler);
        }
    }
}
exports.off = off;
function once(el, event, fn) {
    function _listener() {
        if (fn) {
            fn.apply(null, [el, event]);
        }
        off(el, event, _listener);
    }
    ;
    on(el, event, _listener);
}
exports.once = once;
