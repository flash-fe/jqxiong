interface IOptions {
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
}
declare function addTime(date: Date, json: IOptions): Date;
export default addTime;
