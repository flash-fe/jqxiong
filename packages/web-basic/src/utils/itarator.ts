// 内部迭代器(按序访问, 自动迭代, 可以倒序 - 其实就是循环遍历每一个元素)

interface IIter {
  // 迭代方向
  direc: string;
  // 下一个索引
  next: () => void;
  each: () => void;
  // 是否迭代完成
  isDone: boolean;
  getItem: () => any;
}

interface IIterItem {
  direc: string;
  data: any;
}

class InnerIterator implements IIter {
  public direc = 'front' // 迭代方向
  public curIdx = 0
  public isDone = false
  public data: any
  constructor(props: IIterItem) {
    this.direc = props.direc || 'front';
    this.data = props.data || [];
    this.curIdx = props.direc === 'front' ? 0 : this.data.length - 1;
  }
  public each(func?: (item: any, idx?: number) => any) {
    while(!this.isDone) {
      // 只要用户返回值, 就可以手动终止迭代
      if (func && func(this.getItem(), this.curIdx)) {
        this.end();
      } else {
        if (this.direc === 'front') {
          this.isDone = this.curIdx >= this.data.length - 1;
        } else {
          this.isDone = this.curIdx <= 0;
        }
        this.next();
      }
    }
  }
  public next() {
    const direc = this.direc === 'front' ? 1 : -1;
    this.curIdx += direc;
  }
  public end() {
    this.isDone = true;
  }
  public getItem() {
    return this.data[this.curIdx]
  }
  // 重置data, return this可以链式调用
  public setData(data: any): InnerIterator {
    this.data = data;
    this.curIdx = this.direc === 'front' ? 0 : this.data.length - 1;
    this.isDone = false;
    return this;
  }
}

export default InnerIterator