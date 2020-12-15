declare type delegateFunc = (el: any, selector: string, type: string, callback: any, useCapture?: boolean) => any;
declare const delegate: delegateFunc;
export default delegate;
