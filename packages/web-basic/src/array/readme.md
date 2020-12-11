# 数组操作相关

### flatten 数组扁平化
> flatten(arr: any[]): any[]

```js
import flatten from '@jqxiong/web-basic/array/flatten'

flatten([[[1]], [2, [3, 4]], 5])
// [1, 2, 3, 4, 5]
```