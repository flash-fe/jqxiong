const path = require('path')
const glob = require('glob')

const jsFiles = glob.sync(path.resolve(__dirname, '..', 'demos', 'js', '**', '*.js'))
let entries = {};

for (const item of jsFiles) {
    const nm = item.split(/\/js\//)[1]
    entries[nm] = item
}

module.exports = {
    entry: entries,
    mode: 'development',
    output: {
        filename: '[name]',
        path: '/_dist',
        publicPath: '/dist',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: [
            '.js', 'ts', 'tsx', '.jsx'
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts[x]?$/,
                loader: 'ts-loader'
            }
        ]
    }
}