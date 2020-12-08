import Tween from './tween.js'

interface IProps {
    el: HTMLElement;
    start: number;
    end: number;
    duration?: number; // 动画时间
    // 缓动动画函数
    easing?: (t: number, b: number, c: number, d: number) => number;
    onAnimating?: (curValue: number) => any; // 动画中
    onComplete?: (curValue: number) => any; // 动画结束
}

// 极简的动画函数封装，基于Tween函数做easing动画
class FlashAnimate {

    public endValue = 0; // 结束值

    private isAnimate = false;
    private timer: any = null;
    private curTime = 0;
    private startValue = 0; // 起始值
    private curValue = 0; // 当前目标值
    private props: IProps;

    constructor(props: IProps) {
        this.startValue = props.start;
        this.endValue = props.end;
        this.curValue = this.startValue;
        this.props = { ...props };
    }

    public run() {
        cancelRequestAnimationFrame(this.timer);
        if (!this.isAnimate) {
            this.isAnimate = true;
            this.animateTo();
        }
    }
    public stop() {
        this.isAnimate = false;
        cancelRequestAnimationFrame(this.timer);
    }
    public updateValue(info: any) {
        this.startValue = info.start;
        this.endValue = info.end;
        this.curValue = this.startValue;
        this.curTime = 0; // 中途打断时重置时间
    }
    private animateTo = () => {
        const easingFunc = this.props.easing || Tween.Cubic.easeInOut;
        const disValue = this.endValue - this.startValue;
        this.curValue = easingFunc(this.curTime, this.startValue, disValue, this.props.duration || 300);
        this.curTime += 10;
        if (this.isAnimate) {
            // 接近临界点时吸附到终点
            if (Math.abs(this.endValue - this.curValue) <= 2) {
                this.curValue = this.endValue;
                this.isAnimate = false;
                cancelRequestAnimationFrame(this.timer);
                this.props.onAnimating && this.props.onAnimating(this.curValue);
                this.props.onComplete && this.props.onComplete(this.curValue);
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