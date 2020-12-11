# 原生DOM方法封装

### [事件绑定模块 event](https://react-o1q57r.stackblitz.io/event)
```js
import { on, off, once } from '@jqxiong/web-basic/dom/event'
```
#### 绑定事件
> on(element, evtName, func)

```js
const oP = document.querySelector('p')
on(oP, 'click', clickHandle)
```

#### 事件解绑
> off(element, evtName, func)
```js
off(oP, 'click', clickHandle)
```

#### 单次绑定
> once(element, evtName, func)
```js
once(oP, 'click', clickHandle)
```

### [事件代理模块delegate](https://react-o1q57r.stackblitz.io/delegate)
```js
import delegate from '@jqxiong/web-basic/dom/delegate'
```

#### 事件代理
> delegate(elements, selector, type, callback, useCapture = false)
```js
// 绑定事件
const delegator = delegate('ul.list', 'li', 'click', handleLiClick)
// 代理事件解除绑定
delegator.map(de => de.destroy())
```

### 获取元素相窗口的offset
* `getPositionTop(element)`
* `getPositionLeft(element)`
```js
import { getPositionTop, getPositionLeft } from '@jqxiong/web-basic/dom/position';

const oP = document.querySelector('p')
console.log(`top: ${getPositionTop(oP)}`)
console.log(`left: ${getPositionLeft(oP)}`)
```