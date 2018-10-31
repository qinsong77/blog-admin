<template>
    <div class="post-article">
        <div class="left">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <p class="title">撰写新文章</p>
                </div>
                <div class="content">
                    <div>
                        <label>文章标题</label>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="right">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <p class="title">分类目录</p>
                </div>
                <div class="content">
                    <div>
                        <label>文章标题</label>
                    </div>
                </div>
            </el-card>

            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <p class="title">发布选项</p>
                </div>
                <div class="content">
                    <div>
                        <label>文章标题</label>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'mangerArticles',
        data () {
            return {}
        },
        computed: {},

        created () {
        },

        mounted () {
        },

        methods: {}
    }
</script>

<style lang="scss">
    .post-article{
        display: flex;
        .left{
            flex: 2;
        }
        .right{
            flex: 1;
            margin-left: 10px;
        }
    }
</style>
