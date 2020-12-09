// 用观察者模式实现一个事件系统
import Iterator from './itarator.js'

type eventFuc = (data?: any) => any

// 发布订阅类
interface IEvent {
  // 发布一个事件(trigger, publish)
  emit: (evtType: string, data?: any) => void;
  // 订阅事件(监听事件, listen)
  on: (evtType: string, func: eventFuc) => any;
  // 取消订阅(unsub)
  off: (evtType: string, func?: eventFuc) => void;
  // 事件列表
  // eventList: object;
}

class EventEmitter implements IEvent {

  public iterator: Iterator;
  private eventList: any;
  
  constructor() {
    this.eventList = {};
    this.iterator = new Iterator({ data: [], direc: 'front' });
  }

  public emit(evtNm: string, data?: any) {
    const evts = this.eventList[evtNm];
    evts && evts.length && this.iterator.setData(evts).each(evtFunc => evtFunc(data))
  }
  public on(evtNm: string, func: eventFuc) {
    if (!this.eventList[evtNm]) {
      this.eventList[evtNm] = [];
    }
    this.eventList[evtNm].push(func);
  }
  public off(evtNm: string, func?: eventFuc) {
    const evts = this.eventList[evtNm];
    if (typeof func !== 'function') { // 没有传递指定回调函数, 移除整个事件的所有订阅
      delete this.eventList[evtNm]
    } else {
      evts && evts.length && this.iterator.setData(evts).each((evtFunc, idx) => {
        if (evtFunc === func) {
          this.eventList[evtNm] = [
            ...evts.slice(0, idx),
            ...evts.slice((idx as number) + 1, evts.length)
          ]
          return true;
        }
      })
    }
  }
}

export default EventEmitter