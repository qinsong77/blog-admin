<template>
    <div>
        <div class="filter-container">
            <el-input placeholder="模糊搜索" v-model="itemQuery.title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
            <el-select   multiple collapse-tags v-model="itemQuery.tags" placeholder="标签" clearable  class="filter-item">
                <el-option v-for="item in tags" :key="item.id" :label="item.name" :value="item.id" multiple />
            </el-select>
            <el-cascader
                    placeholder="目录"
                    v-model="itemQuery.dirs"
                    :options="dirs"
                    change-on-select
                    class="filter-item"
            />
            <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
        </div>
        <div class="table-content">
            <el-table
                    :data="items"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="createdAt"
                        label="日期"
                        width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 3px">{{ new Date(scope.row.createdAt).toLocaleString() }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="标题">
                </el-table-column>
                <el-table-column
                        prop="desc"
                        label="描述">
                </el-table-column>
                <el-table-column
                        prop="tags"
                        label="标签">
                    <template slot-scope="scope">
                        <el-tag
                                :type="randomType()"
                                style="margin-right: 10px"
                                v-for="tag in scope.row.tags"
                                :key="tag.id">
                            {{tag.name}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="dirs"
                        label="目录">
                    <template slot-scope="scope">
                        <el-tag
                                :type="randomType()"
                                style="margin-right: 10px"
                                v-for="dir in scope.row.dirs"
                                :key="dir.id">
                            {{dir.name}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="url"
                        width="100"
                        label="Banner">
                    <template slot-scope="scope">
                        <img style="margin-left: 3px" :src="scope.row.imgUrl+'?imageView/2/w/50/h/100/q/50/format/png'">
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--<div class="pagination-container">-->
            <!--<el-pagination v-show="total>0"-->
                           <!--:current-page="itemQuery.page"-->
                           <!--:page-sizes="[10,20,30, 50]"-->
                           <!--:page-size="itemQuery.limit"-->
                           <!--:total="total"-->
                           <!--background-->
                           <!--layout="total, sizes, prev, pager, next, jumper"-->
                           <!--@size-change="handleSizeChange"-->
                           <!--@current-change="handleCurrentChange"/>-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        name: 'articles',
        data () {
            return {
                total: 100,
                tags: [],
                dirs: [],
                items: [],
                itemQuery: {
                    page: 1,
                    title: '',
                    limit: ''
                }
            }
        },
        computed: {},

        created () {
            this.getDirs()
            this.getTags()
        },

        mounted () {
            this.getArticles(1)
            this.$Axios.get('/getArticleListByPage/' + 1)
                .then(res => {
                    console.log(res)
                    this.items = res.content.data
                })
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
            getDirs () {
                this.$Axios.get('/queryDir').then(res => {
                    this.dirs = res.content
                })
            },
            handleSizeChange (val) {
                this.itemQuery.limit = val
                this.getList()
            },
            handleCurrentChange (val) {
                this.itemQuery.page = val
                this.getList()
            },
            getArticles (page) {
                this.$Axios.get('/getArticleListByPage/' + page)
                    .then(res => {
                        this.items = res.content.data
                    })
            },
            handleFilter () {

            }
        }
    }
</script>

<style lang="scss">
    .filter-container{
        margin-bottom: 10px;
        .filter-item{
            margin-right: 10px;
        }
    }
</style>
