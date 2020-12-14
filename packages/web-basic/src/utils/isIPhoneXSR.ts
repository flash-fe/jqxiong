// 判断是否是XS/XR/XSMax
import isInBrowser from './isInBrowser'
import isIPhone from './isIPhone'

export function isIPhoneXSR() {
    if (isInBrowser && isIPhone) {
        try {
            const h = window.screen.height, w = window.screen.width;
            if (h === 896 || w === 896) {
                return true;
            }
        }
        catch (e) {
        }
        return false;
    }
    return false
}

export default isIPhoneXSR()