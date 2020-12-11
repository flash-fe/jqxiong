// 处理中间件

function loopMiddleware(req, res, mids = [], callback) {

    let middlewares = [...mids]

    nextCall();

    function next() {
        if (middlewares.length) {
            nextCall();
        } else {
            callback(req, res)
        }
    }

    function nextCall() {
        let curMid = middlewares.shift();
        curMid(req, res, next);
    }
}

module.exports = loopMiddleware