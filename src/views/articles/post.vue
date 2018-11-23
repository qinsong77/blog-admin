<template>
    <div class="post-article">
        <div class="left">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <p class="title">撰写新文章</p>
                </div>
                <div class="content">
                    <el-form :model="post"  class="form">
                        <el-form-item label="文章标题">
                            <el-input v-model="post.title" type="text" style="width: 300px"></el-input>
                        </el-form-item>
                        <el-form-item label="文章描述">
                            <el-input type="textarea" v-model="post.desc" style="width: 400px"></el-input>
                        </el-form-item>
                        <el-form-item label="文章标签">
                            <el-checkbox-group v-model="post.checkTagList" class="tags-list">
                                <el-tag
                                        v-for="tag in tags"
                                        :key="tag.id">
                                    <el-checkbox
                                            :label="tag.name"
                                            :name="tag.id"
                                            :key="tag.id">
                                    </el-checkbox>
                                </el-tag>
                            </el-checkbox-group>
                            <div class="tags-list">

                            </div>
                        </el-form-item>
                        <el-form-item>
                            <markdown-editor v-model="post.content"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
        <div class="right">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <p class="title">分类目录</p>
                </div>
                <div class="content directory">
                    <el-checkbox-group v-model="post.checkDirList">
                        <template  v-for="item in dirs">
                            <el-checkbox
                                    v-if="!item.children || item.children.length<=0"
                                    :key="item.value"
                                    class="parent"
                                    :name="item.value"
                                    :label="item.label">
                            </el-checkbox>
                            <template v-else>
                                <el-checkbox
                                        :key="item.value"
                                        class="parent"
                                        :name="item.value"
                                        :label="item.label">
                                </el-checkbox>
                                <el-checkbox
                                        v-for="child in item.children"
                                        class="child"
                                        :name="child.value"
                                        :label="child.label"
                                        :key="child.value">
                                </el-checkbox>
                            </template>
                        </template>
                    </el-checkbox-group>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import MarkdownEditor from '_c/markdown'
    export default {
        name: 'mangerArticles',
        components: {
            MarkdownEditor
        },
        data () {
            return {
                tags: [],
                dirs: [],
                post: {
                    content: '',
                    checkDirList: [],
                    checkTagList: [],
                    title: '',
                    disc: ''
                }
            }
        },
        computed: {},

        created () {
            this.getDirs()
            this.getTags()
        },

        mounted () {
        },

        methods: {
            getTags () {
                this.$Axios.get('/tags').then(res => {
                    this.tags = res.content
                })
            },
            getDirs () {
                this.$Axios.get('/queryDir').then(res => {
                    this.dirs = res.content
                })
            },
            submit () {
                const loading = this.$loading({
                    target:document.querySelector('.post-article'),
                    lock: true,
                    text: '保存文章中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$Axios.post('/article/submitArticle', this.post).then(res => {
                    this.$message.success(res.msg)
                }).finally(() => { loading.close() })
            }
        }
    }
</script>

<style lang="scss">
    .post-article{
        display: flex;
        .el-card__header{
            padding: 12px 15px;
            background-color: rgba(209, 209, 209, 0.87);
        }
        .directory{
            .el-checkbox+.el-checkbox{
                margin-left: 0;
                margin-top: 7px;
            }
            .parent{
                display: block;
            }
            .child{
                display:block;
                margin-left: 30px!important;
            }
        }
        .left{
            flex: 3.5;
            .tags-list{
                .el-tag {
                    margin-right: 10px;
                }
            }
        }
        .right{
            flex: 1;
            margin-left: 10px;
        }
    }
</style>
