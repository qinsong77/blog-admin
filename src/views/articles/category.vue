<template>
    <div>
        <el-input v-model="label"></el-input>
        <el-button type="primary" @click="submit">提交</el-button>
    </div>
</template>

<script>
    export default {
        name: 'category',
        data () {
            return {
                label: ''
            }
        },
        computed: {},

        created () {
        },

        mounted () {
            this.$Axios.get('queryDir').then(res => {
                console.log(res)
            })
        },

        methods: {
            submit () {
                this.$Axios.post('/newDir', {
                    label: this.label,
                    root: true,
                    leaf: true,
                    parent: null
                }).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style lang="scss">

</style>
