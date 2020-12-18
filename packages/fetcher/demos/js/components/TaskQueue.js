import TaskQueue from '@jqxiong/fetcher/utils/taskQueue'
import { loadImg } from '@jqxiong/fetcher/load'
// mock promise
// function pr1(rst, duration, isOK = true) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (isOK) {
//                 resolve(rst)
//             } else {
//                 reject(rst)
//             }
//         }, duration)
//     })
// }

function lazyLoadImg(url) {
    return function() {
        return loadImg(url)
    }
}

const TaskComponent = Vue.extend({
    template: '#task-box',
    data() {
        return {
            isLoading: false,
            imgs: []
        }
    },
    mounted() {
        console.log('mounted')
        this.taskQueue = new TaskQueue({ limit: 3 })
        this.taskQueue.on('running', this.handleRunning)
        this.taskQueue.on('complete', this.handleComplete)
    },
    methods: {
        runTask() {
            this.isLoading = true;

            this.taskQueue.run([
                lazyLoadImg('https://cn.vuejs.org/images/vueschool.png?ts=2342342345'),
                lazyLoadImg('https://cn.vuejs.org/images/vehikl.png?ts=2342342345'),
                lazyLoadImg('https://cn.vuejs.org/images/passionate_people.png?ts=2342342345'),
                lazyLoadImg('https://cn.vuejs.org/images/logo.png?ts=2342342345'),
                loadImg('https://cn.vuejs.org/images/laravel.png?ts=2342342345'),
                lazyLoadImg('https://cn.vuejs.org/images/y8.png?ts=2342342345'),
                lazyLoadImg('https://cn.vuejs.org/images/fastcoding_inc.svg'),
                lazyLoadImg('https://cn.vuejs.org/images/devexpress.png?ts=2342342345')
                // pr1('aaaaa', 8e3),
                // pr1('asd', 2e3),
                // pr1('asa3423423sa', 4e3),
                // pr1('dfgdgfgfd', 1500),
                // pr1('asasa', 1e3, false)
                // loadImg('')
            ])
        },
        handleRunning(rst) {
            // console.log('running')
            this.imgs = rst;
            // console.log(this.taskQueue.curRunning)
        },
        handleComplete(rst) {
            console.log('complete');
            // console.log(rst);
            this.imgs = rst
            this.isLoading = false;
        }
    }
})

export default TaskComponent