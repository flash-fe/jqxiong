import { loadScript } from '@jqxiong/fetcher/load'

// 加载网络资源
const vue = 'https://cdn.jsdelivr.net/npm/vue@2.6.12'

init()

async function init() {
    await loadScript(vue)
    initVueApp()
}

function initVueApp() {

    // 放在这里reqruie, 处理初始化的时机问题
    const MessageBox = require('./components/MessageBox').default
    const TaskComponent = require('./components/TaskQueue').default

    // 初始化app
    const app = new Vue({
        template: '#app-box',
        data() {
            return {
                name: 'Cambridge Xiong'
            }
        },
        components: {
            MessageBox,
            TaskComponent
        }
    })
    app.$mount('#app')
}