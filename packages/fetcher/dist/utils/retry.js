"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 基于Promise任务的retry机制
 * @param task Promise任务
 * @param maxCount 最大尝试次数
 * @param timeout 整个retry机制中的尝试总时长 ms
 * @param duration 间隔多久重试
 * retry(task, 5)
 * .then(resolve)
 * .catch(rejected)
 */
function retry(task, maxCount, timeout, duration) {
    if (maxCount === void 0) { maxCount = 3; }
    if (timeout === void 0) { timeout = 0; }
    if (duration === void 0) { duration = 50; }
    // 默认为总尝试次数 * 3000ms
    timeout = timeout || maxCount * 3000;
    var curCount = 0;
    var timer = null;
    var durationTimer = null;
    var isRejected = false;
    return new Promise(function (resolve, rejected) {
        // 超时
        timer = setTimeout(function () {
            clearTimeout(durationTimer);
            rejected({
                state: 'rejected',
                timeout: timeout
            });
            isRejected = true;
        }, timeout);
        _try();
        // _try
        function _try() {
            if (isRejected) {
                return;
            }
            curCount++;
            task()
                .then(function (rst) {
                clearTimeout(timer);
                resolve(rst);
            })
                .catch(function (err) {
                if (curCount >= maxCount) {
                    rejected({
                        state: 'rejected',
                        retried: maxCount,
                        err: err
                    });
                    isRejected = true;
                }
                else {
                    clearTimeout(durationTimer);
                    durationTimer = setTimeout(_try, duration);
                }
            });
        }
    });
}
exports.default = retry;
