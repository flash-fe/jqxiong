import Tween from './tween.js'
import easing from './easing.js'

interface IProps {
    el: HTMLElement;
    start: number;
    end: number;
    duration?: number; // 动画时间
    // isLoop?: boolean; // 是否循环动画
    // 缓动动画函数
    easing?: (t: number, b: number, c: number, d: number) => number;
    onAnimating?: (curValue: number) => any; // 动画中
    onComplete?: (curValue: number) => any; // 动画结束
}

// 极简的动画函数封装，基于Tween函数做easing动画
class FlashAnimate {

    public endValue = 0; // 结束值

    private isAnimate = false;
    private isAnimateEnd = false; // 动画是否结束
    private timer: any = null;
    private curTime = 0;
    private startValue = 0; // 起始值
    private curValue = 0; // 当前目标值
    private props: IProps;

    constructor(props: IProps) {
        this.startValue = Math.floor(props.start);
        this.endValue = Math.floor(props.end);
        this.curValue = this.startValue;
        this.props = { ...props };
    }

    public run() {

        // 可以控制动画重放
        // if (this.isAnimateEnd) { // 重新执行动画
        //     this.isAnimateEnd = false;
        //     this.curValue = this.startValue;
        //     this.curTime = 0;
        // }
        // 也可以控制动画只执行一次
        if (this.isAnimateEnd) {
            return this.props.onComplete && this.props.onComplete(this.curValue);;
        }

        cancelRequestAnimationFrame(this.timer);
        if (!this.isAnimate) {
            this.isAnimate = true;
            this.animateTo();
        }
    }
    public reset() {
        this.stop()
        this.isAnimateEnd = false;
        this.curValue = this.startValue;
        this.curTime = 0;
        this.run();
    }
    public stop() {
        this.isAnimate = false;
        cancelRequestAnimationFrame(this.timer);
    }
    private animateTo = () => {
        let easingFunc = this.props.easing || Tween.Cubic.easeInOut;
        const disValue = this.endValue - this.startValue;

        // 支持字符串格式的快捷输入
        if (typeof easingFunc == 'string') {
            easingFunc = easing[easingFunc] || easing['easeInOut']
        }

        this.curValue = easingFunc(this.curTime, this.startValue, disValue, this.props.duration || 300);
        this.curValue = Math.floor(this.curValue) // 取整
        this.curTime += 10;

        let endVal = Math.abs(this.endValue - this.curValue)

        if (this.isAnimate) {
            // 接近临界点时吸附到终点
            if (endVal <= 0) {
                cancelRequestAnimationFrame(this.timer);
                this.curValue = this.endValue;
                this.isAnimate = false;
                this.props.onAnimating && this.props.onAnimating(this.curValue);
                this.props.onComplete && this.props.onComplete(this.curValue);
                this.isAnimateEnd = true;
            } else {
                this.timer = requestAnimationFrame(this.animateTo);
                this.props.onAnimating && this.props.onAnimating(this.curValue);
            }
        }
    }
}

function requestAnimationFrame(func: any) {
    const timeoutFunc = (callback: any) => {
        raf = window.setTimeout(callback, 17); // 1000 / 60
    }
    let raf: any = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        (window as any).mozRequestAnimationFrame ||
        timeoutFunc
    raf(func);
    return raf;
}

function cancelRequestAnimationFrame(timer: any) {
    const carf = window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        (window as any).mozCancelAnimationFrame || window.clearTimeout;
    carf(timer);
}

export default FlashAnimate