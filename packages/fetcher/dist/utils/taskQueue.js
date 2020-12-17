"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 异步请求并发限制队列
 * 处理n个任务，最大同时执行任务数为m, 每完成一个任务, 给到一个对应的回调
 * 全部任务处理完成后，给到整个完成的回调
 * @param queueList 异步任务队列
 * @param maxCount 最大同时执行任务数
 */
function taskQueue(queueList, maxCount) {
    if (queueList === void 0) { queueList = []; }
    if (maxCount === void 0) { maxCount = 3; }
    return new Promise(function (resolve, reject) {
        // todo
    });
}
exports.default = taskQueue;
