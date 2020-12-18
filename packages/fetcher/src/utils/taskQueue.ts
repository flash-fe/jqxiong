import EventEmitter from '@jqxiong/web-basic/utils/eventEmitter'

interface IOptions {
    // 最大同时执行的限制数, limit <= 0, 表示不限制
    limit?: number;
}

// 任务队列是一个返回Promise的函数
type TaskFunc = Promise<any> | ((...args: any[]) => Promise<any>)

/**
 * 异步请求并发限制队列
 * 处理n个任务，最大同时执行任务数为m, 每完成一个任务, 给到一个对应的回调
 * 全部任务处理完成后，给到整个完成的回调
 * const queue = new TaskQueue({ limit: 3 })
 * queue.run([fetch1, fetch2, fetch3])
 * queue.on('running', runningHandle)
 * queue.on('complete', completeHandle)
 * queue.off('running', runningHandle)
 */

// 继承自时间类
class TaskQueue extends EventEmitter {

    options: IOptions
    tasks: TaskFunc[] = []
    // 存储每个promise的结果
    resultList: any[] = []
    // 当前正在执行的任务数
    curRunning = 0
    // 当前已经执行的任务数
    curRunned = 0
    // 是否已经在running
    isRunning = false
    // 是否已经全部执行完毕
    isFinished = false

    constructor(options: IOptions) {
        super()
        this.options = {
            limit: 0,
            ...options
        }
    }

    //  重置loop状态
    resetState() {
        this.curRunned = 0;
        this.curRunning = 0;
        this.resultList = [];
        this.isFinished = false;
    }

    run(tasks: TaskFunc[]) {
        if (!this.isRunning) {

            this.isRunning = true;
            // reset counter
            this.resetState();

            this.tasks = [...tasks]

            // 初始化结果数组
            tasks.forEach(() => {
                this.resultList.push({
                    state: 'pending'
                })
            })

            this.runTasks();

        }
    }
    runTasks() {
        const _self = this;
        const options = _self.options || {};
        const limit = typeof options.limit == 'number' ? options.limit : 0;
        if (limit <= 0) { // 不限制并发数
            _self.tasks.forEach((item, idx) => _self.runSingleTask(item, idx))
        } else { // 限制并发数
            _self.runLoopTask(limit)
        }
    }
    // 按循环队列执行任务
    runLoopTask(limit: number) {

        const _self = this;
        const tasks = [...this.tasks]
        let curId = 0;

        _loop();

        function _loop() {

            if (_self.isFinished) {
                return;
            }
            // 当前执行队列未满
            while ((_self.curRunning < limit) && tasks.length) {
                const curTask = tasks.shift();
                if (curTask) {
                    _self.runSingleTask(curTask, curId, _loop)
                    curId++;
                }
            }

        }
    }

    runSingleTask(item: TaskFunc, idx: number, callback?: () => void) {

        const _self = this;
        let state = '', result;

        // 当前执行任务数+1
        this.curRunning++;

        if (item instanceof Promise) {
            item.then(_taskSuccessHandle).catch(_taskErrorHandle)
        } else {
            item().then(_taskSuccessHandle).catch(_taskErrorHandle)
        }

        function _taskSuccessHandle(rst: any) {
            state = 'fulfilled'
            result = rst
            _taskAfterRun(state, result);
        }

        function _taskErrorHandle(err: any) {
            state = 'rejected'
            result = err
            _taskAfterRun(state, result);
        }

        // 单个任务结束后，统一处理函数
        function _taskAfterRun(state: string, result: any) {

            _self.resultList[idx] = {
                state,
                result
            }
            _self.curRunning--;
            _self.curRunned++;

            if (_self.curRunned == _self.resultList.length) {
                _self.isRunning = false;
                _self.isFinished = true;
                _self.emit('complete', _self.resultList)
            } else {
                _self.emit('running', _self.resultList)
                // limit时的回调函数
                callback && callback()
            }

        }

    }
}

export default TaskQueue