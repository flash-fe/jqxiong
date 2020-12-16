/**
 * 加载脚本资源
 * @param src 脚本链接
 * @param attrs 脚本附加属性 如bu-id, souce-id等
 */
declare function loadScript(src: string, attrs?: any): Promise<unknown>;
export default loadScript;
