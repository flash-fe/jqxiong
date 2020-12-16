import { loadScript, loadImg } from '@jqxiong/fetcher/load'

// 加载网络资源
const vue = 'https://cdn.jsdelivr.net/npm/vue@2.6.12'

init()

async function init() {
    await loadScript(vue)
    initVueApp()
}

function initVueApp() {

    // 注册message-box组件
    Vue.component('message-box', {
        props: {
            title: {
                type: String,
                default: 'as'
            }
        },
        data() {
            return {
                imgUrl: 'https://cn.vuejs.org/images/logo.png?ts=3453464645654',
                isLoading: false,
                isLoaded: false,
                xTitle: this.title
            }
        },
        computed: {
            imgSrc() {
                return this.isLoaded ? this.imgUrl : ''
            }
        },
        template: '#message-box',
        methods: {
            async loadImg() {
                this.isLoading = true;
                await loadImg(this.imgUrl)
                this.isLoaded = true
                this.isLoading = false
            }
        }
    })

    // 初始化app
    const app = new Vue({
        template: '#app-box',
        data() {
            return {
                name: 'Cambridge Xiong'
            }
        }
    })
    app.$mount('#app')
}