// 实现一个极简的静态服务器
const http = require('http')
// const http2 = require('http2')
const fs = require('fs')
const url = require('url')
const path = require('path')
const loopMiddleware = require('./loopMiddleware')
const contentType = require('./middlewares/contentType')

const basePath = process.cwd();

// 处理最终响应
function handleResponse(req, res) {

    const { mediaInfo } = req;

    // 查看文件是否存在
    const filePath = path.join(basePath, mediaInfo.urlPath);
    const isExist = fs.existsSync(filePath);
    if (!isExist) {
        res.statusCode = 404;
        res.end(`${filePath} not found`);
    } else {
        const fileInfo =
            mediaInfo.isImg
                // 图片要用二进制流发送
                ? Buffer.from(fs.readFileSync(filePath))
                : fs.readFileSync(filePath, { encoding: 'utf8' })
        // console.log(fileInfo)
        res.end(fileInfo)
    }
}


function createServer(port = 8080, middlewares = []) {
    const server = http.createServer();

    // 装载自定义中间件
    middlewares = [
        contentType,
        ...middlewares
    ]

    server.on('request', (req, res) => {
        loopMiddleware(req, res, middlewares, handleResponse)
    })

    server.listen(port, () => {
        console.log(`server is running at ${port}`)
    })
}

module.exports = createServer