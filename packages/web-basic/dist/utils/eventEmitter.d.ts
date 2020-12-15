import Iterator from './itarator';
declare type eventFuc = (data?: any) => any;
interface IEvent {
    emit: (evtType: string, data?: any) => void;
    on: (evtType: string, func: eventFuc) => any;
    off: (evtType: string, func?: eventFuc) => void;
}
declare class EventEmitter implements IEvent {
    iterator: Iterator;
    private eventList;
    constructor();
    emit(evtNm: string, data?: any): void;
    on(evtNm: string, func: eventFuc): void;
    off(evtNm: string, func?: eventFuc): void;
}
export default EventEmitter;
