# BOM相关

### url参数解析
> query(key?, url?): object | string
* key: query参数, 不传默认查询全量
* url: 链接字符串，默认为 `window.location.search`

```js
import query from '@jqxiong/web-basic/bom/query'

const q = query('s')
console.log(q)
console.log(query())
```

### cookie处理
> getCookie(key: string): string | null
```js
import { getCookie } from '@jqxiong/web-basic/bom/cookie'
console.log(getCookie('_bfi'))
```
> setCookie(key: string, value: string, timeout?: Date, path?: string, domain?: string, secure?: any)
```js
import { setCookie } from '@jqxiong/web-basic/bom/cookie'
setCookie('foo', 'bar')
```
> removeCookie(key: string, options: any)
```js
import { removeCookie } from '@jqxiong/web-basic/bom/cookie'
removeCookie('foo', { path: 'demos' })
```