declare function getCookie(key: string): string;
declare function setCookie(key: string, value: string, timeout?: Date, path?: string, domain?: string, secure?: any): void;
declare function removeCookie(key: string, options: any): void;
export { getCookie, setCookie, removeCookie };
