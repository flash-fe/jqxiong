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

## [See Docs](https://github.com/flash-fe/jqxiong/tree/main/packages/fetcher#jqxiongfetcher)