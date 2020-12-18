import { TaskQueue, retry } from '@jqxiong/fetcher/utils'
import { loadImg } from '@jqxiong/fetcher/load'

let counter = 0;

// mock promise
function query() {
    counter++;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(counter)
            counter >= 5
            ? resolve('ok')
            : reject('rejected')
        }, 1000)
    })
}

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
        retryFetch() {
            retry(
                query,
                6
                // 3000
            )
            .then(rst => {
                console.log(rst)
            })
            .catch(err => {
                console.log(err)
            })
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