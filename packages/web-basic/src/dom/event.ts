// 事件绑定
// dom事件, client only

export function on(element: any, event: string, handler: any) {
    if (document.addEventListener as Document['addEventListener']) {
        if (element && event && handler) {
            element.addEventListener(event, handler, false);
        }
    } else {
        if (element && event && handler) {
            element.attachEvent('on' + event, handler);
        }
    }
}

export function off(element: any, event: string, handler: any) {
    if (document.removeEventListener as Document['removeEventListener']) {
        if (element && event) {
            element.removeEventListener(event, handler, false);
        }
    } else {
        if (element && event) {
            element.detachEvent('on' + event, handler);
        }
    }
}

export function once(el: any, event: string, fn: (el: any, event: string) => void) {
    function _listener() {
        if (fn) {
            fn.apply(null, [el, event]);
        }
        off(el, event, _listener);
    };
    on(el, event, _listener);
}