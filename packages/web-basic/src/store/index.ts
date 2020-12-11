// 对localStorage操作的封装
import toFormat from '../date/toFormat'
import parseDate from '../string/parseDate'

// store实例配置
interface IOptions {
    key: string; // 存储key
    lifeTime: number; // timeStamp, 存储有效时长, 3 * 24 * 60 * 60 * 1000 // 3d
}

class LocalStorage {
    options: IOptions
    date: Date
    constructor(options: IOptions) {
        this.options = {...options}
        this.date = this._getTimeout()
    }
    // 给store设置值
    set(value: any, callback?: (val: any) => void) {
        const obj = {
            value,
            timeout: toFormat(this.date, 'yyyy/M/d HH:mm:ss')
        }
        window.localStorage.setItem(this.options.key, JSON.stringify(obj))
        // 处理回调
        callback && callback(obj.value)
    }
    get() {
        const curItem = window.localStorage.getItem(this.options.key)

        // 这段可以让下面的try语句中的类型被自动推断出来
        if (curItem == null) {
            return null
        }

        // 解析JSON
        try {
            const storedData = JSON.parse(curItem)
            const timeout = storedData.timeout;
            // 比较timeout是否超时
            if (timeout) {
                const expireTime = parseDate(timeout)
                if (expireTime.getTime() >= new Date().getTime()) {
                    return storedData.value
                } else {
                    // 移除
                    this.remove();
                    return null
                }
            }
        } catch(err) {
            console.log(err)
            return null
        }
    }
    remove() {
        window.localStorage.removeItem(this.options.key)
    }
    // 获取超时时间
    private _getTimeout() {
        let diffTime = this.options.lifeTime || 24 * 60 * 60 * 1000;
        diffTime += new Date().getTime();
        return new Date(diffTime);
    }
}

export default LocalStorage