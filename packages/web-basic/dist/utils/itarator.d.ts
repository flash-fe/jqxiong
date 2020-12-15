interface IIter {
    direc: string;
    next: () => void;
    each: () => void;
    isDone: boolean;
    getItem: () => any;
}
interface IIterItem {
    direc: string;
    data: any;
}
declare class InnerIterator implements IIter {
    direc: string;
    curIdx: number;
    isDone: boolean;
    data: any;
    constructor(props: IIterItem);
    each(func?: (item: any, idx?: number) => any): void;
    next(): void;
    end(): void;
    getItem(): any;
    setData(data: any): InnerIterator;
}
export default InnerIterator;
