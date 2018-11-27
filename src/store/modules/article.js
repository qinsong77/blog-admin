const article = {
    state: {
        DirsCascaderProps: {
            value: 'id',
            label: 'name'
        },
        dirs: [],
        tags: []
    },
    getters: {
        getTags (state) {
            return state.tags
        }
    },
    mutations: {
        setDirs (state, dirs) {
            state.dirs = dirs
        },
        setTags (state, tags) {
            state.tags = tags
        }
    },
    actions: {
        getDirs ({ commit }) {

        },
        getTags ({ commit }) {
            this.$Axios.get('/tags').then(res => {
                commit('setTags', res.content)
            })
        }
    }
}

export default article
