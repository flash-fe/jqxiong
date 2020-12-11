"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 展平数组 [[[1]], [2, [3, 4]], 5] => [1, 2, 3, 4, 5]
// 采用stack的非递归方法实现
function flatten(arr) {
    var stack = [];
    var rst = [];
    arr.forEach(function (item) {
        if (item instanceof Array) {
            stack.push(item);
        }
        else {
            rst.push(item);
        }
        while (stack.length) {
            // 从首位弹出元素
            var curItem = stack.shift();
            if (curItem instanceof Array) {
                // 从首位插入
                stack.unshift.apply(stack, curItem);
            }
            else {
                rst.push(curItem);
            }
        }
    });
    return rst;
}
exports.default = flatten;
