// 单独打包lodash部分代码
import isType from '../utils/isType.js'

const isDate = (str: any) => isType(str, 'Date')

export default isDate