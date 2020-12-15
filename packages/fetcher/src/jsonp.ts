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

    console.log(url)
    console.log(params);
    console.log(deserializeQuery)

    return;
    // 创建函数名
    return new Promise((resolve, reject) => {

        const timeStamp = new Date().getTime();
        let cb = params.cb || `flash_jsonp_${timeStamp}`;

        let script = document.createElement('script')
        script.src = url;
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