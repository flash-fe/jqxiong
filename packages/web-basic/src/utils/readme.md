# 工具模块

### 全局事件通信模块 EventEmitter
> pubsub实现的 eventEmitter

* 事件监听 `on(evName, func)`
* 接触事件监听 `off(evName, func)`
* 触发事件 `emit(evName, data)`

```js
import EventEmitter from '@jqxiong/web-basic/utils/eventEmitter'

const globalEvt = new EventEmitter()
globalEvt.on('trigger', handleTrigger)

function handleTrigger(data) {
    console.log('xx')
    console.log(data)
    globalEvt.off('trigger', handleTrigger)
}

globalEvt.emit('trigger', { foo: 'bar' })
globalEvt.emit('trigger', { foo: 'bar' })
```

### 各种环境判断模块, 具体见[源码](https://github.com/flash-fe/jqxiong/tree/main/packages/web-basic/src/utils)

* isAndroid
* isIPhone
* isIPhoneX
* isIPhoneXSR
* isInWeChat
* isInAliPay
* isType
* isInBrowser
* isPrivateModel 隐身模式
* miniEnv

#### miniEnv 小程序环境判断
```js
import miniEnv from '@jqxiong/web-basic/utils/miniEnv'

console.log(miniEnv)
/*
{
    isInWeChat: true,
    isInApiPay: false,
    isInWeChatMiniProgram: true,
    isInAliPayMiniProgram: false
}
*/
```