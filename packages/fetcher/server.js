require('@jqxiong/static-server')(8080, [ handleDevDist ])

// 处理dist目录返回js文件类型
function handleDevDist(req, res, next) {
    const { mediaInfo } = req;
    const urlPath = mediaInfo.urlPath;

    if (/_dist/.test(mediaInfo.urlPath)) {
        req.mediaInfo.isJs = true;
        if (!/\.map$/.test(mediaInfo.urlPath)) {
            req.mediaInfo.urlPath = urlPath.replace(/\.(\w+)$/, '.js')
        }
        res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
    }

    next()
}