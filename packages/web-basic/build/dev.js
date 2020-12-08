/**
 * 开发场景下的代码构建
 * run serve and run tsc
 */

const cp = require('child_process')

const serve = cp.exec('npm run serve')

serve.stdout.on('data', data => {
    console.log(data)
})

serve.on('close', () => {
    console.log('server closed')
})

const ts = cp.exec('npm run tsc')

ts.stdout.on('data', data => {
    console.log(data)
})

ts.stderr.on('data', data => {
    console.log(data)
})

ts.on('close', () => {
    console.log('tsc closed')
})