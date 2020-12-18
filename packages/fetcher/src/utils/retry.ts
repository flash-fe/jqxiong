type TaskFunc = (...args: any[]) => Promise<any>

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
function retry(task: TaskFunc, maxCount = 3, timeout = 0, duration = 50) {
    // 默认为总尝试次数 * 3000ms
    timeout = timeout || maxCount * 3000;
    let curCount = 0;
    let timer: any = null;
    let durationTimer: any = null;
    let isRejected = false;

    return new Promise((resolve, rejected) => {

        // 超时
        timer = setTimeout(() => {
            clearTimeout(durationTimer)
            rejected({
                state: 'rejected',
                timeout
            })
            isRejected = true
        }, timeout)

        _try()

        // _try
        function _try() {

            if (isRejected) {
                return;
            }
            
            curCount++;

            task()
                .then(rst => {
                    clearTimeout(timer)
                    resolve(rst)
                })
                .catch(err => {
                    if (curCount >= maxCount) {
                        rejected({
                            state: 'rejected',
                            retried: maxCount,
                            err
                        })
                        isRejected = true
                    } else {
                        clearTimeout(durationTimer)
                        durationTimer = setTimeout(_try, duration)
                    }
                })

        }

    })
}

export default retry