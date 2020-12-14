"use strict";
// 判断是否是隐身模式(有的浏览器隐身模式下, 操作store会报错)
Object.defineProperty(exports, "__esModule", { value: true });
function isPrivateModel() {
    var TEST_KEY = 'TEST_PRIVATE_MODEL';
    var val = '1';
    var testVal = null;
    try {
        window.localStorage.setItem(TEST_KEY, val);
        testVal = window.localStorage.getItem(TEST_KEY);
        window.localStorage.removeItem(TEST_KEY);
    }
    catch (e) {
        if ((e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") && JSON.stringify(window.localStorage).length === 2) {
            return true;
        }
        return false;
    }
    return testVal !== val;
}
exports.default = isPrivateModel();
