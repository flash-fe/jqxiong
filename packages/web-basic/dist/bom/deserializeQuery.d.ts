/**
 *  反序列化params 为 query参数
 * @param params {}
 * @param url string, 如果传入url, 会返回拼接好的完整url
 */
declare function desQuery(params?: any, url?: string): string;
export default desQuery;
