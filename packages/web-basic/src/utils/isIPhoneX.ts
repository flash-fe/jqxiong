// IPhoneX, 需要根据 窗口宽高进行计算
import isIPhone from './isIPhone'
import isInBrowser from './isInBrowser'

export function isIPhoneX() {
    if (isInBrowser && isIPhone) {
        try {
            const h = window.screen.height, w = window.screen.width;
            if (h === 812 || w === 812) {
                return true;
            }
        }
        catch (e) {
        }
        return false;
    }
    return false
}

export default isIPhoneX()