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
            str += `${params[item]}&`
        }
        str = str.replace(/&$/, '')

        if (url) {
            url = url.replace(/&$/, '');
            // 非?结尾， 加?
            if (!/\?$/.test(url)) {
                url += '?'
            }
            str = url + str;
        }

    } catch(err) {
        throw new Error(err);
    }
    return str
}

export default desQuery