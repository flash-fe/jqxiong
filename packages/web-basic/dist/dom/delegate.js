"use strict";
// 原生事件代理实现
Object.defineProperty(exports, "__esModule", { value: true });
var DOCUMENT_NODE_TYPE = 9;
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector ||
        proto.msMatchesSelector ||
        proto.oMatchesSelector ||
        proto.webkitMatchesSelector;
}
function closest(element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
            return element;
        }
        element = element.parentNode;
    }
    return null;
}
var privateDelegate = function (element, selector, type, callback, useCapture) {
    var listenerFn = listener(element, selector, callback);
    element.addEventListener(type, listenerFn, useCapture);
    return {
        destroy: function () {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    };
};
var delegate = function (elements, selector, type, callback, useCapture) {
    if (useCapture === void 0) { useCapture = false; }
    // Handle the regular Element usage
    if (typeof elements.addEventListener === 'function') {
        return privateDelegate(elements, selector, type, callback, useCapture);
    }
    // Handle Element-less usage, it defaults to global delegation
    if (typeof type === 'function') {
        // Use `document` as the first parameter, then apply arguments
        // This is a short way to .unshift `arguments` without running into deoptimizations
        return privateDelegate(document, selector, type, callback, useCapture);
    }
    // Handle Selector-based usage
    if (typeof elements === 'string') {
        elements = document.querySelectorAll(elements);
    }
    // Handle Array-like based usage
    return Array.prototype.map.call(elements, function (element) {
        return privateDelegate(element, selector, type, callback, useCapture);
    });
};
function listener(element, selector, callback) {
    return function (e) {
        e.delegateTarget = closest(e.target, selector);
        if (e.delegateTarget) {
            callback.call(element, e);
        }
    };
}
exports.default = delegate;
