import Vue from 'vue'
import Vuex from 'vuex'
import article from './modules/article'
import { getBreadCrumbList } from '_com/utils'
Vue.use(Vuex)
let isCollapse = localStorage.getItem('isCollapse')

export default new Vuex.Store({
    state: {
        isCollapse: Boolean(isCollapse !== 'false'),
        currentRoute: '/',
        BreadCrumbList: []
    },
    mutations: {
        setBreadCrumbList (state, route) {
            state.currentRoute = route
            state.BreadCrumbList = getBreadCrumbList(route)
        },
        reverseIsCollapse (state) {
            localStorage.isCollapse = !state.isCollapse
            state.isCollapse = !state.isCollapse
        }
    },
    actions: {},
    modules: {
        article
    }
})
