# `@jqxiong/fetcher`

> 提供网络请求的基础模块, fetch, loadScript, lazyLoadImgs, jsonp等

## jsonp
### 发起一个jsonp请求

```js
const jsonp = require('@jqxiong/fetcher/jsonp');

jsonp(url, {
    foo: bar,
    cb: 'jsonp' // 可以指定回调参数函数名
}).then(rst => {
    console.log(rst)
})

```
