/**
 * 异步请求并发限制队列
 * 处理n个任务，最大同时执行任务数为m, 每完成一个任务, 给到一个对应的回调
 * 全部任务处理完成后，给到整个完成的回调
 * @param queueList 异步任务队列
 * @param maxCount 最大同时执行任务数
 */
function taskQueue(queueList = [], maxCount = 3) {
    return new Promise((resolve, reject) => {
        // todo
    })
}

export default taskQueue