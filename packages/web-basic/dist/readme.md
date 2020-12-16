# @jqxiong/web-basic

### 提供原生而基础的`DOM`,`BOM`, `Animate`, `DateFormat`等功能模块

```bash
npm i -S -d @jqxiong/web-basic
```

etc: Animate Module
```js
import Animate from '@jqxiong/web-basic/animate'

const moveAni = new Animate({
    start: 0,
    end: 200,
    duration: 400,
    easing: 'easeOutBack',
    onAnimating: animateHandle,
    onComplete: completeHandle
})

moveAni.run();
```

## [See docs](https://github.com/flash-fe/jqxiong/tree/main/packages/web-basic#jqxiongweb-basic)