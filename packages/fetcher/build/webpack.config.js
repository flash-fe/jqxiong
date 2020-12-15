const path = require('path')
const glob = require('glob')

const tsFiles = glob.sync(path.resolve(__dirname, '..', 'tests', '**', '*.js'))

module.exports = {
    entry: tsFiles,
    mode: 'development',
    output: {
        filename: '[name].js',
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