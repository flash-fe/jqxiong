// 加载图片资源

function loadImg(src: string) {
    // 图片资源似乎不需要插入到dom中，就可以触发onload
    return new Promise((resolve, reject) => {
        const oImg = document.createElement('img')
        oImg.src = src;
        oImg.onload = () => resolve(src);
        oImg.onerror = () => reject(src);
    })
}

export default loadImg