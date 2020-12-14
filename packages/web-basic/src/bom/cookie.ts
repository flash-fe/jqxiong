// 处理cookie读取与设置
import isInBrowser from '../utils/isInBrowser'
import isType from '../utils/isType'

function getCookie(key: string) {
    if (typeof document !== 'undefined' && document.cookie.length > 0) {
        let start = document.cookie.indexOf(key + '=')
        if (start != -1) {
            start = start + key.length + 1
            let end = document.cookie.indexOf(';', start)
            if (end == -1) { end = document.cookie.length }
            return decodeURIComponent(document.cookie.substring(start, end))
        }
    }
    return ''
}

function setCookie(key: string, value: string, timeout?: Date, path?: string, domain?: string, secure?: any) {
    timeout = timeout || new Date(new Date().getTime() + 3 * 360 * 24 * 60 * 60 * 1000);
    path = path || '';
    domain = domain || '';
    if (!isInBrowser) {
        return
    }
    try {
        // 处理数组or对象
        if (isType(value, 'Object') || isType(value, 'Array')) {
            value = JSON.stringify(value)
        }
        document.cookie = document.cookie = key + "=" + encodeURIComponent(value) +
            ((timeout) ? "; expires=" + (timeout as any).toGMTString() : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
    } catch (err) {
        console.log(err)
    }
}

// 移除cookie (通过设置timeout -1 实现)
function removeCookie(key: string, options: any) {
    const timeout = new Date(new Date().getTime() - 1)
    options = {
        path: "/",
        ...options,
        timeout
    }
    setCookie(key, '', options.timeout, options.path, options.domain, options.secure)
}

export {
    getCookie,
    setCookie,
    removeCookie
};