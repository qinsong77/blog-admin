<template>
    <div>
        <el-form :inline="true" :model="subDir" class="form-inline">
            <el-form-item label="名称">
                <el-input v-model="subDir.label" type="text"></el-input>
            </el-form-item>
            <el-form-item label="是否为根节点">
                <el-select v-model="subDir.root" placeholder="是否为根节点">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否为子节点">
                <el-select v-model="subDir.leaf" placeholder="是否为子节点">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="父节点">
                <el-cascader
                        v-model="subDir.parent"
                        :options="options"
                        change-on-select
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit" :loading="subLoading">保存</el-button>
            </el-form-item>
        </el-form>
        <el-cascader
                :options="options"
                change-on-select
        />
    </div>
</template>

<script>
    export default {
        name: 'category',
        data () {
            return {
                subLoading: false,
                subDir: {
                    label: '',
                    parent: null,
                    root: false,
                    leaf: true
                },
                options: []
            }
        },
        computed: {},

        created () {
        },

        mounted () {
            this.updateSelect()
        },

        methods: {
            updateSelect () {
                this.$Axios.get('queryDir').then(res => {
                    this.options = res.content
                })
            },
            submit () {
                this.subLoading = true
                this.$Axios.post('/newDir',
                                 Object.assign({}, {
                                     ...this.subDir
                                 }, { parent: { id: this.subDir.parent ? this.subDir.parent[this.subDir.parent.length - 1] : this.subDir.parent } })
                ).then(res => {
                    this.$message.success(res.msg)
                    this.updateSelect()
                }).finally(() => this.subLoading = false)
            }
        }
    }
</script>

<style lang="scss">
</style>
