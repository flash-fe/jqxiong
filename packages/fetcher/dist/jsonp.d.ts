/**
 * 创建jsonp请求
 * @param url
 * @param params
 */
interface IParams {
    cb?: string;
    [key: string]: any;
}
declare function jsonp(url: string, params?: IParams): Promise<unknown> | undefined;
export default jsonp;
