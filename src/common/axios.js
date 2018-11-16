import Axios from 'axios'
import { TokenKey, log, getToken } from './utils'

const baseURL = '/admin/api'
const timeOut = 10000

const fetch = (url, params, method = 'post') => {
    url = `/hewu/server/api/${url}`
    return new Promise((resolve, reject) => {
        let config = {
            baseURL: baseURL,
            url: url,
            method: method,
            timeout: timeOut,
            headers: {
                'x-csrf-token': getToken()
            }
        }
        if (method.match(/get|delete|head/)) {
            config.params = params
        } else {
            config.data = params
        }
        Axios(config).then(res => resolve(res.data), err => {
            if (err.response) {
                resolve(err.response.data)
            } else {
                resolve({ errors: [{ message: '断网啦!!!!!!!!!' }] })
            }
        })
    })
}

const $Axios = ((array) => {
    return array.reduce((a, b) => {
        a[b] = (url, params) => fetch(url, params, b)
        return a
    }, {})
})(['get', 'post', 'delete', 'patch', 'put'])
console.log($Axios)
export default {
    install: (Vue, options) => {
        Vue.prototype.Axios = $Axios
    }
}
