// 处理cookie读取与设置

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

export {
    getCookie
};