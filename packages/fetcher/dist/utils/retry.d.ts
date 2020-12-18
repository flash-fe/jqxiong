declare type TaskFunc = (...args: any[]) => Promise<any>;
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
declare function retry(task: TaskFunc, maxCount?: number, timeout?: number, duration?: number): Promise<unknown>;
export default retry;
