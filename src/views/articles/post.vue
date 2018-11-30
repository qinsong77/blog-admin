<template>
    <div class="post-article">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <p class="title">{{this.type}}新文章</p>
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
                            <el-form-item>
                                <el-button type="primary" @click="submit" style="width: 300px">保存</el-button>
                            </el-form-item>
                        </div>
                    </div>
                    <el-form-item>
                        <markdown-editor v-model="post.content" :initialValue="initialValue" @setInitialValue="setInitialValue"/>
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
                                    <el-select v-model="deleteBanner" placeholder="是否删除原来的Banner图">
                                        <el-option label="是" :value="true"></el-option>
                                        <el-option label="否" :value="false"></el-option>
                                    </el-select>
                                    <p>Banner预览：</p>
                                    <canvas  id="canvas" alt="Banner预览"/>
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
                type: '撰写',
                deleteBanner: true,
                initialValue: '',
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
                    desc: '',
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
                this.type = '修改'
                const loading = this.$loading({
                    target: document.querySelector('.post-article'),
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                this.$Axios.get(`article/${this.$route.params.id}`).then(res => {
                    this.OldPost = res.content
                    this.initialValue = res.content.content
                    this.post.checkTagList = res.content.tags.map(item => item.name)
                    this.post.checkDirList = res.content.dirs.map(item => item.name)
                    this.setBanner(res.content.imgUrl)
                    Object.assign(this.post, res.content)
                }).finally(() => { loading.close() })
            }
        },
        mounted () {

        },

        methods: {
            setBanner(imgUrl){
                const img = new Image()
                const canvas = document.getElementById('canvas')
                const ctx = canvas.getContext('2d')
                img.src = imgUrl
                img.setAttribute('crossOrigin', 'Anonymous') // 解决报错 VM20002:1 Uncaught DOMException: Failed to execute 'toDataURL' on 'HTMLCanvasElement': Tainted canvases may not be exported.
                img.onload = () => {
                    canvas.width = img.width
                    canvas.height = img.height
                    ctx.drawImage(img, 0, 0)
                    this.ImageSrc = canvas.toDataURL('image/jpeg')
                }
            },
            setInitialValue (value) {
                this.initialValue = value
            },
            submitBanner (blob, fileName) {
                let name = this.post.title ? this.post.title : fileName
                this.imgSubmitBtbLoading = true
                const formData = new FormData()
                formData.append('file', blob, name)
                formData.append('articleId', this.post.id)
                if (this.type === '修改' && this.deleteBanner) {
                    formData.append('deleteFileId', this.post.fileId)
                }
                this.$Axios.post('/file/upload', formData).then(res => {
                    this.$message.success(res.msg)
                    this.post.imgUrl = res.content.url
                    this.post.fileId = res.content.objectId
                    this.setBanner(res.content.url)
                }).finally(() => { this.imgSubmitBtbLoading = false })
            },
            getTags () {
                this.$Axios.get('/tag/all').then(res => {
                    this.tags = res.content
                })
            },
            getDirs () {
                this.$Axios.get('/dir/all').then(res => {
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
                    if (this.post.checkDirList.includes(item.name)) {
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
                if (this.type === '撰写') {
                    this.$Axios.post('/article/create', this.post).then(res => {
                        this.$message.success(res.msg)
                    }).finally(() => { loading.close() })
                } else {
                    const post = {
                        id: this.post.id
                    }
                    for (let item in this.post) {
                        if (!Array.isArray(this.post[item])) {
                            if (this.post[item] !== this.OldPost[item]) {
                                post[item] = this.post[item]
                            }
                        }
                    }
                    post.needDeleteTags = this.OldPost.tags.filter(item => {
                        return !this.post.tags.find(tag => {
                            return tag.id === item.id
                        })
                    })
                    post.needSaveTags = this.post.tags.filter(item => {
                        return !this.OldPost.tags.find(tag => {
                            return tag.id === item.id
                        })
                    })
                    if (post.needSaveTags.length > 0 || post.needDeleteTags.length > 0) {
                        post.tags = this.post.tags
                    }
                    post.needDeleteDirs = this.OldPost.dirs.filter(item => {
                        return !this.post.dirs.find(tag => {
                            return tag.id === item.id
                        })
                    })
                    post.needSaveDirs = this.post.dirs.filter(item => {
                        return !this.OldPost.dirs.find(dir => {
                            return dir.id === item.id
                        })
                    })
                    if (post.needDeleteDirs.length > 0 || post.needSaveDirs.length > 0) {
                        post.dirs = this.post.dirs
                    }
                    console.log(post)
                    this.$Axios.patch('/article/edit', post).then(res => {
                        this.$message.success(res.msg)
                    }).finally(() => { loading.close() })
                }
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
            canvas{
                width: 100%;
            }
        }
    }
</style>
