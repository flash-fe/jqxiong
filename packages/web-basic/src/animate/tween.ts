/**
 * tween动画缓动效果算法
 * 完整算法见链接
 * https://github.com/zhangxinxu/Tween/blob/master/tween.js
 */
const Tween = {
    Cubic: {
        easeInOut(t: number, b: number, c: number, d: number) {
            if ((t /= d / 2) < 1) {return c / 2 * t * t * t + b;}
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    }
}

export default Tween