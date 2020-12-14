# LocalStorage存储模块
基于localStorage实现, 给存储添加了对象方式的value，以及存储时间限制功能

* set(val)
* get()
* remove()

### options
```typescript
interface IOptions {
    key: string; // 存储key
    lifeTime: number; // timeStamp, 存储有效时长, 3 * 24 * 60 * 60 * 1000 // 3d
}
```

```js
import LocalStorage from '@jqxiong/web-basic/store'
const store = new LocalStorage({
    key: 'TEST_STORE'
    // lifeTime: 3 * 24 * 60 * 60 * 1000
})
store.set({
    foo: 'sasas'
}, data => {
    console.log(data)
})
const data = store.get()
console.log(data)
document.querySelector('#btn').onclick = () => {
    store.remove()
}
```