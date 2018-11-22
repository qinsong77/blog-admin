import Axios from 'axios'
import { Notification } from 'element-ui'
import { getToken, log } from './utils'

const baseURL = '/admin/api'
const timeOut = 10000

class HttpRequest {
    constructor () {
        // 默认配置
        this.config = {
            baseURL: baseURL,
            method: 'get',
            timeout: timeOut,
            headers: {
                'x-csrf-token': getToken()
            }
        }
        // 存储请求队列
        this.queue = {}
    }

    // 销毁请求实例
    destroy (url) {
        delete this.queue[url]
        return this.queueHas(url)
    }

    queueHas (url) {
        return this.queue.hasOwnProperty(url)
    }
    // 请求拦截
    interceptors (instance, url) {
        // 添加请求拦截器
        instance.interceptors.request.use(config => {
            return config
        }, error => {
            log('请求：' + url + '发生错误', error)
            // 对请求错误做些什么
            return Promise.reject(error)
        })

        // 添加响应拦截器
        instance.interceptors.response.use((res) => {
            console.log(res)
            let { data } = res
            const is = this.destroy(url) //
            if (data.result) {
                return data
            } else {
                if (data.msg) {
                    Notification.error({
                        title: res.config.url + '请求出错',
                        message: data.msg,
                        duration: 0
                    })
                }
                return false
            }
        }, (error) => {
            log('响应：' + url + '发生错误', error)
            Notification.error({
                title: '服务请求错误,无网络或服务器响应出错',
                message: error,
                duration: 10000
            })
            // 对响应错误做点什么
            return Promise.reject(error)
        })
    }
    create (method, url, data) {
        let instance = Axios.create(this.config)
        this.interceptors(instance, url)
        const newConfig = {
            method: method,
            url: url
        }
        if (method.match(/get|delete|head/)) {
            newConfig.params = data
            newConfig.headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        } else {
            newConfig.data = data
            newConfig.headers = {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
        this.queue[newConfig.url] = instance

        return instance(newConfig)
    }
}
const httpRequest = new HttpRequest()
const $Axios = ((array) => {
    return array.reduce((a, b) => {
        a[b] = (url, params) => httpRequest.create(b, url, params)
        return a
    }, {})
})(['get', 'post', 'delete', 'patch', 'put'])
console.log($Axios)
export default {
    install: (Vue, options) => {
        Vue.prototype.$Axios = $Axios
    }
}
