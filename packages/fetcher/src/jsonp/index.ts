import deserializeQuery from '@jqxiong/web-basic/bom/deserializeQuery'

/**
 * 创建jsonp请求
 * @param url 
 * @param params 
 */

interface IParams {
    cb?: string; // 回调函数名
    [key: string]: any;
}

function jsonp(url: string, params: IParams = {}) {

    // 创建函数名
    return new Promise((resolve, reject) => {

        const timeStamp = new Date().getTime();
        let cb = params.cb || `flash_jsonp_${timeStamp}`;
        params.cb = cb; // 默认处理jsonp 函数名 cb
        const fixedUrl = deserializeQuery(params, url)

        let script = document.createElement('script')
        script.src = fixedUrl;
        document.body.appendChild(script);
        script.onerror = reject;
        document.body.removeChild(script);

        // 创建jsonp函数
        (window as any)[`${cb}`] = function(rst: any) {
            // 执行函数，触发回调
            resolve(rst);
            // gc
            (window as any)[`${cb}`] = undefined;
            delete (window as any)[`${cb}`];
        }
    })
}

export default jsonp