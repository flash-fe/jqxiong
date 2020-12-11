"use strict";
// 内部迭代器(按序访问, 自动迭代, 可以倒序 - 其实就是循环遍历每一个元素)
Object.defineProperty(exports, "__esModule", { value: true });
var InnerIterator = /** @class */ (function () {
    function InnerIterator(props) {
        this.direc = 'front'; // 迭代方向
        this.curIdx = 0;
        this.isDone = false;
        this.direc = props.direc || 'front';
        this.data = props.data || [];
        this.curIdx = props.direc === 'front' ? 0 : this.data.length - 1;
    }
    InnerIterator.prototype.each = function (func) {
        while (!this.isDone) {
            // 只要用户返回值, 就可以手动终止迭代
            if (func && func(this.getItem(), this.curIdx)) {
                this.end();
            }
            else {
                if (this.direc === 'front') {
                    this.isDone = this.curIdx >= this.data.length - 1;
                }
                else {
                    this.isDone = this.curIdx <= 0;
                }
                this.next();
            }
        }
    };
    InnerIterator.prototype.next = function () {
        var direc = this.direc === 'front' ? 1 : -1;
        this.curIdx += direc;
    };
    InnerIterator.prototype.end = function () {
        this.isDone = true;
    };
    InnerIterator.prototype.getItem = function () {
        return this.data[this.curIdx];
    };
    // 重置data, return this可以链式调用
    InnerIterator.prototype.setData = function (data) {
        this.data = data;
        this.curIdx = this.direc === 'front' ? 0 : this.data.length - 1;
        this.isDone = false;
        return this;
    };
    return InnerIterator;
}());
exports.default = InnerIterator;
