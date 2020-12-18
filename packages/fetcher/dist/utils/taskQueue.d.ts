import EventEmitter from '@jqxiong/web-basic/utils/eventEmitter';
interface IOptions {
    limit?: number;
}
declare type TaskFunc = Promise<any> | ((...args: any[]) => Promise<any>);
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
declare class TaskQueue extends EventEmitter {
    options: IOptions;
    tasks: TaskFunc[];
    resultList: any[];
    curRunning: number;
    curRunned: number;
    isRunning: boolean;
    isFinished: boolean;
    constructor(options: IOptions);
    resetState(): void;
    run(tasks: TaskFunc[]): void;
    runTasks(): void;
    runLoopTask(limit: number): void;
    runSingleTask(item: TaskFunc, idx: number, callback?: () => void): void;
}
export default TaskQueue;
