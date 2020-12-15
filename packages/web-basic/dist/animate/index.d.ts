interface IProps {
    start: number;
    end: number;
    duration?: number;
    easing?: (t: number, b: number, c: number, d: number) => number;
    onAnimating?: (curValue: number) => any;
    onComplete?: (curValue: number) => any;
}
declare class FlashAnimate {
    endValue: number;
    private isAnimate;
    private isAnimateEnd;
    private timer;
    private curTime;
    private startValue;
    private curValue;
    private props;
    constructor(props: IProps);
    run(): any;
    reset(): void;
    stop(): void;
    private animateTo;
}
export default FlashAnimate;
