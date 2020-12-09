// 判断数据类型 Date, String, Number, Array
function isType(obj: any, type?: string) {
    const objStr = Object.prototype.toString.call(obj)
    const typeStr = objStr.slice(8, -1)
    return type
    ? typeStr.toLocaleLowerCase() === type.toLocaleLowerCase()
    : typeStr
}

export default isType