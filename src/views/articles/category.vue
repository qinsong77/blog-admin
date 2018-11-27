<template>
    <div>
        <el-form :inline="true" :model="subDir" class="form-inline">
            <el-form-item label="名称">
                <el-input v-model="subDir.label" type="text"></el-input>
            </el-form-item>
            <el-form-item label="是否为根节点">
                <el-select v-model="subDir.root" placeholder="是否为根节点" :disabled="rootDisabled" @change="rootChange">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否为子节点">
                <el-select v-model="subDir.leaf" placeholder="是否为子节点" :disabled="leafDisabled" @change="leafChange">
                    <el-option label="是" :value="true"></el-option>
                    <el-option label="否" :value="false"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="父节点">
                <el-cascader
                        v-model="subDir.parent"
                        :options="options"
                        change-on-select
                        :disabled="optionsDisabled"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit" :loading="subLoading">保存</el-button>
            </el-form-item>
        </el-form>
        <el-form :inline="true" :model="subDir" class="form-inline">
            <el-form-item label="删除">
                <el-cascader
                        v-model="deleteOp"
                        :options="options"
                        change-on-select
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="deleteOption" :loading="deleteLoading">删除</el-button>
            </el-form-item>
        </el-form>
        <el-card style="width: 300px">
            <div v-for="item in options" :key="item.value" class="parent">
                {{item.label}}
                <template v-if="item.children && item.children.length>0">
                    <div v-for="child in item.children" :key="child.value" class="child">
                         {{child.label}}
                    </div>
                </template>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'category',
        data () {
            return {
                optionsDisabled: false,
                rootDisabled: false,
                leafDisabled: false,
                subLoading: false,
                deleteLoading: false,
                deleteOp: [],
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
            rootChange () {
                this.leafDisabled = this.subDir.root
                this.optionsDisabled = this.subDir.root
            },
            leafChange () {
                this.rootDisabled = this.subDir.leaf
                this.optionsDisabled = !this.subDir.leaf
            },
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
                }).finally(() => { this.subLoading = false })
            },
            deleteOption () {
                this.deleteLoading = true
                this.$Axios.delete('/deleteDir', { id: this.deleteOp.pop() }).then(res => {
                    this.$message.success(res.msg)
                    this.updateSelect()
                }).finally(() => { this.deleteLoading = false })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .parent{
        font-size: 16px;
        padding: 5px 3px;
    }
    .child{
        font-size: 14px;
        padding: 5px 3px;
        margin-left: 15px;
        &:first-child{
            margin-top: 5px;
        }
    }
</style>
