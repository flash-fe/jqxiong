# `@jqxiong/fetcher`

> 提供网络请求的基础模块, fetch, loadScript, lazyLoadImgs, jsonp等

## jsonp
### 发起一个jsonp请求

```js
import jsonp from '@jqxiong/fetcher/jsonp'

jsonp(url, {
    foo: bar,
    cb: 'jsonp' // 可以指定回调参数函数名
}).then(rst => {
    console.log(rst)
})

```

## load 加载远程资源
### 加载远程图片资源
```js
import { loadImg } from '@jqxiong/fetcher/load'

loadImg('https://cn.vuejs.org/images/logo.png')
.then(resolve)
```

### 加载远程js
> loadScript(src: string, attrs: any)
* src 请求加载的资源路径
* attrs {} 附加给script标签的属性 如 id, async等
```js
import { loadScript } from '@jqxiong/fetcher/load'
const vue = 'https://cdn.jsdelivr.net/npm/vue@2.6.12'

loadScript(vue)
.then(initApp)
.catch(errorHandle)
```

## TaskQueue 异步任务并发限制模块

是一个基于`Promise` or `() => Promise`任务队列的执行类

执行机制：
* 在**最大限制可同时执行的任务数**前提下, 会依次执行队列中的异步任务
* 队列中的某个任务执行完成，**会立刻插入新的任务序列, 直到达到最大可执行任务数**
* 任务执行中，持续触发`running`事件
* 当所有任务执行完成后，触发 `complete`事件

### 与Promise.all的不同点?
`Promise.all`的任务队列中，只要有一个`rejected`,就会触发失败回调。
`TaskQueue`会返回所有任务执行结果。

```typescript
type TaskFunc = Promise<any> | ((...args: any[]) => Promise<any>)
```

example
```js
import { TaskQueue } from '@jqxiong/fetcher/utils'

// init Instance
const taskQueue = new TaskQueue({ limit: 3 })

// evt
taskQueue.on('running', this.handleRunning)
taskQueue.on('complete', this.handleComplete)

// run
taskQueue.run([
    fetch1,
    fetch2,
    fetch3,
    fetch4,
    ...
])
```

### 创建实例
```js
new TaskQueue(options)
```
* options.limit - 异步最大同时执行的任务数

### 执行队列
```js
queue.run([promise1, promise2, promiseFunc1])
```

### 事件监听
`on(evtNm, func)`
* running: 执行中回调
* complete: 所有任务执行完成(不论resolve, rejected)回调

## retry 异步任务重试模块
```js
import { retry } from '@jqxiong/fetcher/utils'
retry(query, 6, 3000)
    .then(rst => {
        console.log(rst)
    })
    .catch(err => {
        console.log(err)
    })
```
接口参数说明
```typescript
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
retry(task: TaskFunc, maxCount?: number, timeout?: number, duration?: number)
```

* 默认总超时时间timeout 为 `maxCount * 3000`
* 超时或者超出最大尝试数后，会返回`rejected`