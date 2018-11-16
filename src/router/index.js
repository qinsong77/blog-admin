import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'
import { getToken } from '_com/utils'

import { Notification } from 'element-ui'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
})
let startTime
router.beforeEach((to, from, next) => {
    NProgress.start()
    startTime = new Date()
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else {
            next()
        }
    } else {
        if (to.path === '/login') {
            next()
        } else {
            next('/login')
        }
    }
})

router.afterEach((to) => {
    store.commit('setBreadCrumbList', to.path)
    document.title = to.meta.title || 'Sysuke\'s Blog Admin'
    if (new Date() - startTime > 1000) {
        NProgress.done()
    } else {
        setTimeout(() => {
            NProgress.done()
        }, new Date() - startTime + 300)
    }
})
router.onError((err) => {
    NProgress.done()
    Notification.error({
        title: '路由发生错误',
        message: err
    })
})
export default router
