declare const easing: {
    easeIn: (t: number, b: number, c: number, d: number) => number;
    easeOut: (t: number, b: number, c: number, d: number) => number;
    easeInOut: (t: number, b: number, c: number, d: number) => number;
    easeOutBack: (t: number, b: number, c: number, d: number, s?: number | undefined) => number;
};
export default easing;
