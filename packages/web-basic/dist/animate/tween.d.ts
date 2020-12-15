/**
 * tween动画缓动效果算法
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * 完整算法见链接
 * https://github.com/zhangxinxu/Tween/blob/master/tween.js
 */
declare const Tween: {
    Cubic: {
        easeIn(t: number, b: number, c: number, d: number): number;
        easeOut(t: number, b: number, c: number, d: number): number;
        easeInOut(t: number, b: number, c: number, d: number): number;
    };
    Back: {
        easeOut(t: number, b: number, c: number, d: number, s?: number | undefined): number;
    };
};
export default Tween;
