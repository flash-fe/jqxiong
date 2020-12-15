import jsonp from '@jqxiong/fetcher/jsonp'
import { on } from '@jqxiong/web-basic/dom/event'

const url = 'https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web'

function fuzzyFetch(wd = '') {
    jsonp(url, { wd })
    .then(rst => {
        // console.log(rst)
        // console.log(oUl)
        if (rst.g && rst.g.length) {
            let str = '';
            rst.g.forEach(item => str += `<li>${item.q}</li>`)
            oUl.innerHTML = str
        } else {
            oUl.innerHTML = ''
        }
    })
    .catch(err => {
        console.log(err)
    })
}

function debounceChangeHandle(ev) {
    fuzzyFetch(ev.currentTarget.value)
}

const oInput = document.querySelector('#j_fuzzy')
const oUl = document.querySelector('#list')

on(oInput, 'input', debounceChangeHandle)