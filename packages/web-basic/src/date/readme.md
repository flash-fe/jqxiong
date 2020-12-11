# Date相关

### toFormat 时间格式化
> toFormat(date: Date, formatStr?: string): string

极其简单的时间格式化实现, 无需`moment`
```js
import toFormat from '@jqxiong/web-basic/date/toFormat'

console.log(toFormat(date, 'MM-dd HH:mm:ss 周E'))

```
参数说明:

| format | 处理对象 	|
| ------ | ------- 	|
| yyyy   | 年 |
| M(MM)  | 月 |
| d(dd)  | 日 |
| H(HH)  | 小时(24小时制) |
| h(hh)  | 小时(12小时制) |
| m(mm)  | 分钟 |
| s(ss)  | 秒 |
| E	| 周几 |

### addTime 增加相对时间单位
> addTime(date: Date, options: IOptions): void
```typescript
interface IOptions {
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
}
```
### isDate 判断对象是否是Date
> isDate(obj: any): boolean
### isLeapYear 判断是否是闰年
> isLeapYear(year: Date | number): boolean