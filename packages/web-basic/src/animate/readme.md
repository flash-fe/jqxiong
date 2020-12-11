# 动画相关

### FlashAnimate 动画操作class
极简的动画函数实现, 基于`requestAnimationFrame`, 并向下兼容`setTimeout`, [可参考具体示例](https://react-o1q57r.stackblitz.io/animate)

* run() 执行动画
* stop() 停止动画
* reset() 重置动画

```js
import Animate from '@jqxiong/web-basic/animate'

const moveAni = new Animate({
    // start: 3.3333333333333333333,
    start: 0,
    // end: 153.339966,
    end: 200,
    duration: 400,
    // easing: Tween.Cubic.easeOut,
    // easing: Tween.Back.easeOut,
    easing: 'easeOutBack',
    onAnimating: val => {
        console.log(val)
        oBox.style.transform = `translateX(${val}px) translateY(${val}px)`;
    },
    onComplete: (val) => {
        console.log(val)
        console.log('end')
    }
})

moveAni.run();

```

#### 配置项options
```typescript
interface IProps {
    // 动画初始值
    start: number;
    // 结束值
    end: number;
    // 动画执行时间
    duration?: number;
    // 缓动动画函数 支持 Tween 函数或者快捷字符串
    easing?: (t: number, b: number, c: number, d: number) => number | string;
    onAnimating?: (curValue: number) => any; // 动画中
    onComplete?: (curValue: number) => any; // 动画结束
}
```

#### Tween
Animate的easing动画，是基于Tween函数实现的，具体可以参考:

https://github.com/zhangxinxu/Tween/blob/master/tween.js

Animate中也内置了部分[Tween函数](./tween.ts)
```js
import Tween from '@jqxiong/web-basic/animate/tween'

Tween.Back.easeOut
Tween.Cubic.easeInOut
```

#### easing shortHand
easing参数可以提供字符串配置
```js
const easing = {
    'easeIn': Tween.Cubic.easeIn,
    'easeOut': Tween.Cubic.easeOut,
    'easeInOut': Tween.Cubic.easeInOut,
    'easeOutBack': Tween.Back.easeOut
}
```
