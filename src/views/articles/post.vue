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
                                <!--<el-button type="info" style="margin-left: 30px" @click="refreshData">刷新标签&目录</el-button>-->
                            </el-form-item>
                            <el-form-item label="文章状态">
                                <el-select v-model="post.status" placeholder="文章状态">
                                    <el-option label="草稿" :value="2"></el-option>
                                    <el-option label="下架" :value="0"></el-option>
                                    <el-option label="发表" :value="1"></el-option>
                                </el-select>
                                <!--<el-button type="info" style="margin-left: 30px" @click="refreshData">刷新标签&目录</el-button>-->
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
                                                    :key="item.id"
                                                    class="parent"
                                                    :name="item.id"
                                                    :label="item.name">
                                            </el-checkbox>
                                            <template v-else>
                                                <el-checkbox
                                                        :key="item.id"
                                                        class="parent"
                                                        :name="item.id"
                                                        :label="item.name">
                                                </el-checkbox>
                                                <el-checkbox
                                                        v-for="child in item.children"
                                                        class="child"
                                                        :name="child.id"
                                                        :label="child.name"
                                                        :key="child.id">
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
                        <el-card>
                            <div style="display: flex">
                                <cropper
                                        :src="ImageSrc"
                                        :imgSubmitBtbLoading="imgSubmitBtbLoading"
                                        crop-button-text="确认提交"
                                        @on-crop="submitBanner"/>
                                <div class="banner-preview" v-show="this.post.imgUrl">
                                    <p>Banner预览：</p>
                                    <img :src="this.post.imgUrl" id="img" alt="Banner预览"/>
                                </div>
                            </div>
                        </el-card>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit" style="width: 200px">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import MarkdownEditor from '_c/markdown'
    import Cropper from '../../components/cropper/index'
    export default {
        name: 'mangerArticles',
        components: {
            Cropper,
            MarkdownEditor
        },
        data () {
            return {
                imgSubmitBtbLoading: false,
                ImageSrc: '',
                tags: [],
                dirs: [],
                post: {
                    origin: '原创',
                    content: '',
                    checkDirList: [],
                    checkTagList: [],
                    title: '',
                    disc: '',
                    imgUrl: '',
                    status: 1
                }
            }
        },
        computed: {},

        created () {
            this.getDirs()
            this.getTags()
            if (this.$route.params.id) {
                const loading = this.$loading({
                    target: document.querySelector('.post-article'),
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$Axios.get('getArticleListByID', { id: this.$route.params.id }).then(res => {
                    this.post.checkTagList = res.content.tags.map(item => item.name)
                    this.post.checkDirList = res.content.dirs.map(item => item.name)
                    const img = document.getElementById('img')

                    Object.assign(this.post, res.content)
                }).finally(() => { loading.close() })
            }
        },
        mounted () {

        },

        methods: {
            submitBanner (blob, fileName) {
                let name = this.post.title ? this.post.title : fileName
                this.imgSubmitBtbLoading = true
                const formData = new FormData()
                formData.append('file', blob, name)
                this.$Axios.post('/fileUpload', formData).then(res => {
                    this.$message.success(res.msg)
                    this.post.imgUrl = res.content.url
                }).finally(() => { this.imgSubmitBtbLoading = false })
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
                            id: item.id,
                            name: item.name
                        })
                    }
                    if (item.children && item.children.length > 0) {
                        item.children.forEach(child => {
                            if (this.post.checkDirList.includes(child.name)) {
                                this.post.dirs.push({
                                    id: child.id,
                                    name: child.name
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
        .banner-preview{
            width: 500px;
            margin-right: 15px;
            img{
                width: 100%;
            }
        }
    }
</style>
