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