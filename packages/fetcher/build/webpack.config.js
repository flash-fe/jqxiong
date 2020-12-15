const path = require('path')
const glob = require('glob')

const tsFiles = glob.sync(path.resolve(__dirname, '..', 'src', '**', '*.ts'))

module.exports = {
    entry: tsFiles,
    output: {
        filename: '[name].js',
        path: '/_dist',
        publicPath: '/dist',
        libraryTarget: 'commonjs'
    }
}