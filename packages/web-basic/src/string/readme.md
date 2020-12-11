# 字符串操作

### isDateString 判断一个字符串是否是可以转换为date的字符串
> isDateString(str: string): boolean
```js
import isDateString from '@jqxiong/web-basic/string/isDateString'

console.log(isDateString('asas')) // false
console.log(isDateString('2020-11-30  14:00')) // true
```
### parseDate 将字符串转换为date对象
> parseDate(str: string): Date
```js
import parseDate from '@jqxiong/web-basic/string/parseDate'

const date = parseDate('2020-11-30 14:00')
console.log(date)

```