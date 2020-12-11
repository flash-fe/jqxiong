// 打包job, 拷贝package.json 到 dist 目录
const fs = require('fs')
const path = require('path')

const JSONStr = fs.readFileSync(path.resolve(__dirname, '..', 'package.json'), { encoding: 'utf8' });
const JSONDist = fs.readFileSync(path.resolve(__dirname, '..', 'dist', 'package.json'), { encoding: 'utf8' });

const preJSON = JSON.parse(JSONStr)
const perDistJSON = JSON.parse(JSONDist); // 保持版本号

// 加上前缀
preJSON.name = `@jqxiong/${preJSON.name}`;
preJSON.version = perDistJSON.version;

delete preJSON.devDependencies

const rstStr = JSON.stringify(preJSON, null, '    ');

fs.writeFileSync(path.resolve(__dirname, '..', 'dist', 'package.json'), rstStr, { encoding: 'utf8' })

console.log('dist/package.json to publish')