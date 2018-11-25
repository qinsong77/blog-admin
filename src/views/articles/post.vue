<template>
    <div class="post-article">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <p class="title">撰写新文章</p>
            </div>
            <div class="content">
                <el-form :model="post"  class="form">
                    <div class="post-info">
                        <div class="left">
                            <el-form-item label="文章标题">
                                <el-input v-model="post.title" type="text" style="width: 300px"></el-input>
                            </el-form-item>
                            <el-form-item label="文章描述">
                                <el-input type="textarea" v-model="post.desc" style="width: 400px"></el-input>
                            </el-form-item>
                            <el-form-item label="文章来源">
                                <el-select v-model="post.origin" placeholder="文章来源" >
                                    <el-option label="原创" value="原创"></el-option>
                                    <el-option label="转载" value="转载"></el-option>
                                </el-select>
                                <el-button type="info" style="margin-left: 30px" @click="refreshData">刷新标签&目录</el-button>
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
                        </div>
                        <div class="right">
                            <el-form-item label="文章目录">
                                <div class="directory">
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
                            </el-form-item>
                        </div>
                    </div>
                    <el-form-item>
                        <markdown-editor v-model="post.content"/>
                    </el-form-item>
                    <el-form-item label="Banner图">
                        <el-upload
                                class="upload-demo"
                                drag
                                action="https://jsonplaceholder.typicode.com/posts/"
                                multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
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
                    origin: '原创',
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
            refreshData () {
                this.getDirs()
                this.getTags()
            },
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
                    target: document.querySelector('.post-article'),
                    lock: true,
                    text: '保存文章中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.post.tags = this.tags.filter(item => {
                    return this.post.checkTagList.includes(item.name)
                })
                this.post.dirs = []
                this.dirs.forEach(item => {
                    if (this.post.checkDirList.includes(item.label)) {
                        this.post.dirs.push({
                            id: item.value,
                            name: item.label
                        })
                    }
                    if (item.children && item.children.length > 0) {
                        item.children.forEach(child => {
                            if (this.post.checkDirList.includes(child.label)) {
                                this.post.dirs.push({
                                    id: child.value,
                                    name: child.label
                                })
                            }
                        })
                    }
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
        .el-card__header{
            padding: 12px 15px;
            background-color: rgba(209, 209, 209, 0.87);
        }
        .directory{
            margin-left: 70px;
            .el-checkbox+.el-checkbox{
                margin-left: 0;
                /*margin-top: 7px;*/
            }
            .parent{
                display: block;
            }
            .child{
                display:block;
                margin-left: 30px!important;
            }
        }
        .post-info{
            display: flex;
            .left{
                flex: 1.5;
                .tags-list{
                    .el-tag {
                        margin-right: 10px;
                    }
                }
            }
            .right{
                flex: 1;
                margin-left: 10px;
                .el-form-item__label,.el-form-item__content{
                    line-height: 30px;
                }
            }
        }
    }
</style>
