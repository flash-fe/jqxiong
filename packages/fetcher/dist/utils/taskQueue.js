"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var eventEmitter_1 = __importDefault(require("@jqxiong/web-basic/utils/eventEmitter"));
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
var TaskQueue = /** @class */ (function (_super) {
    __extends(TaskQueue, _super);
    function TaskQueue(options) {
        var _this = _super.call(this) || this;
        _this.tasks = [];
        // 存储每个promise的结果
        _this.resultList = [];
        // 当前正在执行的任务数
        _this.curRunning = 0;
        // 当前已经执行的任务数
        _this.curRunned = 0;
        // 是否已经在running
        _this.isRunning = false;
        // 是否已经全部执行完毕
        _this.isFinished = false;
        _this.options = __assign({ limit: 0 }, options);
        return _this;
    }
    //  重置loop状态
    TaskQueue.prototype.resetState = function () {
        this.curRunned = 0;
        this.curRunning = 0;
        this.resultList = [];
        this.isFinished = false;
    };
    TaskQueue.prototype.run = function (tasks) {
        var _this = this;
        if (!this.isRunning) {
            this.isRunning = true;
            // reset counter
            this.resetState();
            this.tasks = __spreadArrays(tasks);
            // 初始化结果数组
            tasks.forEach(function () {
                _this.resultList.push({
                    state: 'pending'
                });
            });
            this.runTasks();
        }
    };
    TaskQueue.prototype.runTasks = function () {
        var _self = this;
        var options = _self.options || {};
        var limit = typeof options.limit == 'number' ? options.limit : 0;
        if (limit <= 0) { // 不限制并发数
            _self.tasks.forEach(function (item, idx) { return _self.runSingleTask(item, idx); });
        }
        else { // 限制并发数
            _self.runLoopTask(limit);
        }
    };
    // 按循环队列执行任务
    TaskQueue.prototype.runLoopTask = function (limit) {
        var _self = this;
        var tasks = __spreadArrays(this.tasks);
        var curId = 0;
        _loop();
        function _loop() {
            if (_self.isFinished) {
                return;
            }
            // 当前执行队列未满
            while ((_self.curRunning < limit) && tasks.length) {
                var curTask = tasks.shift();
                if (curTask) {
                    _self.runSingleTask(curTask, curId, _loop);
                    curId++;
                }
            }
        }
    };
    TaskQueue.prototype.runSingleTask = function (item, idx, callback) {
        var _self = this;
        var state = '', result;
        // 当前执行任务数+1
        this.curRunning++;
        if (item instanceof Promise) {
            item.then(_taskSuccessHandle).catch(_taskErrorHandle);
        }
        else {
            item().then(_taskSuccessHandle).catch(_taskErrorHandle);
        }
        function _taskSuccessHandle(rst) {
            state = 'fulfilled';
            result = rst;
            _taskAfterRun(state, result);
        }
        function _taskErrorHandle(err) {
            state = 'rejected';
            result = err;
            _taskAfterRun(state, result);
        }
        // 单个任务结束后，统一处理函数
        function _taskAfterRun(state, result) {
            _self.resultList[idx] = {
                state: state,
                result: result
            };
            _self.curRunning--;
            _self.curRunned++;
            if (_self.curRunned == _self.resultList.length) {
                _self.isRunning = false;
                _self.isFinished = true;
                _self.emit('complete', _self.resultList);
            }
            else {
                _self.emit('running', _self.resultList);
                // limit时的回调函数
                callback && callback();
            }
        }
    };
    return TaskQueue;
}(eventEmitter_1.default));
exports.default = TaskQueue;
