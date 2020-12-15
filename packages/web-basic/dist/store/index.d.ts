interface IOptions {
    key: string;
    lifeTime: number;
}
declare class LocalStorage {
    options: IOptions;
    date: Date;
    constructor(options: IOptions);
    set(value: any, callback?: (val: any) => void): void;
    get(): any;
    remove(): void;
    private _getTimeout;
}
export default LocalStorage;
