// 获取元素相对于视口的绝对位置
export const getPositionTop = (dom: any) => {
    let offset = dom.offsetTop;
    if (dom.offsetParent != null) {
        offset += getPositionTop(dom.offsetParent);
    }
    return offset;
}

export const getPositionLeft = (dom: any) => {
    let offset = dom.offsetLeft;
    if (dom.offsetParent != null) {
        offset += getPositionLeft(dom.offsetParent);
    }
    return offset;
}