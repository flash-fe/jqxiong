// 加载图片资源

function loadImg(src: string) {
    const oImg = document.createElement('img')
    oImg.src = src;
    // 图片资源似乎不需要插入到dom中，就可以触发onload
    return new Promise((resolve, reject) => {
        oImg.onload = resolve;
        oImg.onerror = reject
    })
}

export default loadImg