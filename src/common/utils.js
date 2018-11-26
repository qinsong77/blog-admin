import routers from '../router/routes'
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken () {
    return Cookies.get(TokenKey)
}
export function setToken (token) {
    Cookies.set(TokenKey, token)
}
export function removeToken () {
    Cookies.remove(TokenKey)
}

export const log = (mes, data) => {
    // (process.env.NODE_ENV === 'development')
    console.log(mes + ':')
    console.log(data)
}

export const isRealNum = (val) => {
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if (val === '' || val == null) {
        return false
    }
    return !isNaN(val)
}

export const debounce = (func, wait) => {
    let timer = null
    return function () {
        let content = this
        let args = arguments
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(content, args)
        }, wait)
    }
}
export function getBreadCrumbList (route) {
    let breadCrumbList = []
    routers.find((item) => {
        if (item.hide) {
            return false
        }
        if (item.path === route) {
            breadCrumbList.push({
                path: item.path,
                title: item.meta.title,
                icon: item.meta.icon
            })
            return true
        } else {
            if (item.children && item.children.length === 1) {
                if (item.path + item.children[0].path === route) {
                    breadCrumbList.push({
                        path: item.path + item.children[0].path,
                        title: item.children[0].meta.title,
                        icon: item.children[0].meta.icon
                    })
                    return true
                }
            } else if (item.children && item.children.length > 1) {
                return item.children.find((childItem) => {
                    if (item.path + '/' + childItem.path === route) {
                        breadCrumbList.push({
                            path: item.path,
                            title: item.meta.title,
                            icon: item.meta.icon
                        })
                        breadCrumbList.push({
                            path: item.path + '/' + childItem.path,
                            title: childItem.meta.title,
                            icon: childItem.meta.icon
                        })
                        return true
                    }
                })
            }
        }
    })
    return breadCrumbList
}
