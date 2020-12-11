const url = require('url')

// 设置contentType
function contentType(req, res, next) {

    const urlInfo = url.parse(req.url);
    let urlPath = urlInfo.pathname; // urlInfo.path 会携带query参数
    // 媒体资源相关信息
    let mediaInfo = { urlPath };

    // 文件带后缀名
    if (/\.css$/.test(urlPath)) {
        mediaInfo.isStyle = true;
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }

    if (/\.js/.test(urlPath)) {
        mediaInfo.isJs = true;
        res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    }

    if (/\.(jpe?g|png|gif|webp)$/.test(req.headers['accept'])) {
        mediaInfo.isImg = true;
        const imgExt = /\.(\w+)$/.exec(urlPath);
        if (imgExt) {
            res.setHeader('Content-Type', `image/${imgExt[1]};charset=utf-8`)   
        }
    }
    
    if (!/\.\w+$/.test(urlPath)) {
        mediaInfo.urlPath = 
            // 以 / 结尾, 表示默认Index
            /\/$/.test(urlPath)
                ?  urlPath + 'index.html'
                :  urlPath + '.html'
    }

    // 资源信息挂载到req
    req.mediaInfo = mediaInfo;

    next()
}

module.exports = contentType