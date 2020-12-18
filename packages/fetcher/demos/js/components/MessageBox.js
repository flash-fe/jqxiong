import { loadImg } from '@jqxiong/fetcher/load'

// 注册message-box组件
const MessageBox = Vue.extend({
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

export default MessageBox