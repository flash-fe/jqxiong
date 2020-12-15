import query from './query'

interface IParams {
    [key: string]: string
}

/**
 *  反序列化params 为 query参数
 * @param params {}
 * @param url string, 如果传入url, 会返回拼接好的完整url
 */
function desQuery(params: any = {}, url?: string) {
    let str = ''
    try {

        for (const item in params) {
            str += `${item}=${params[item]}&`
        }
        str = str.replace(/&$/, '')

        if (url) {
            url = url.replace(/&$/, '');
            const originQueryParams = query('', url)
            // 已经存在query参数
            if (Object.keys(originQueryParams).length > 0) {
                url += '&';
            } else {
                url = /\?$/.test(url) ? url : url + '?'
            }
            str = url + str;
        }

    } catch(err) {
        throw new Error(err);
    }
    return str
}

export default desQuery