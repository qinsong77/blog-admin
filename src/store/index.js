import Vue from 'vue'
import Vuex from 'vuex'
import { getBreadCrumbList } from '_com/utils'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentRoute: '/',
        BreadCrumbList: []
    },
    mutations: {
        setBreadCrumbList (state, route) {
            state.currentRoute = route
            state.BreadCrumbList = getBreadCrumbList(route)
        }
    },
    actions: {}
})
