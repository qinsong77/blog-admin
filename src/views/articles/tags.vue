<template>
    <div>
        <div class="tags-list">
            <el-tag
                    v-for="(tag,index) in tags"
                    :key="tag.id"
                    closable
                    @close="deleteTag(tag.id,index)"
                   :type="randomType()">
                {{tag.name}}
            </el-tag>
        </div>
        <el-form :inline="true"  class="form-inline">
            <el-form-item label="新建标签">
                <el-input v-model="newTag" type="text"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitNewTag" :loading="subLoading">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'tags',
        data () {
            return {
                subLoading: false,
                newTag: '',
                tags: []
            }
        },
        computed: {

        },

        created () {
            this.getTags()
        },

        mounted () {
        },

        methods: {
            randomType () {
                return ['success', 'info', 'warning', 'danger', 'default'][Math.floor(Math.random() * 5)]
            },
            getTags () {
                this.$Axios.get('/tags').then(res => {
                    this.tags = res.content
                })
            },
            submitNewTag () {
                if (this.newTag.trim() === '') {
                    this.$message.error('新建名称不能为空')
                    return false
                }
                this.subLoading = true
                this.$Axios.post('newTag', { name: this.newTag }).then(res => {
                    this.$message.success(res.msg)
                    this.getTags()
                }).finally(() => { this.subLoading = false })
            },
            deleteTag (id, index) {
                this.tags.splice(index, 1)
                this.$Axios.delete('/deleteTag', { id: id }).then(res => {
                    this.$message.success(res.msg)
                })
            }
        }
    }
</script>

<style lang="scss">
    .tags-list{
        margin:0 10px 10px 10px;
        > .el-tag {
            margin-right: 10px;
        }
    }
</style>
