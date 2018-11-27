<template>
  <div >
    <el-button type="primary" @click="dialogVisible = true">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    <el-dialog title="图片上传" :visible.sync="dialogVisible">
      <el-upload
        class="upload-demo"
        action="/admin/api/fileUpload"
        ref="upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :on-change="fileStatusChange"
        :file-list="fileList"
        list-type="picture"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      </el-upload>
    </el-dialog>

    <div class="table-content">
      <el-table
        :data="items"
        border
        style="width: 100%">
        <el-table-column
          prop="createdAt"
          label="上传日期"
          width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 3px">{{ new Date(scope.row.createdAt).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="图片上传名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="url">
        </el-table-column>
        <el-table-column
          prop="url"
          width="100"
          label="缩略图">
          <template slot-scope="scope">
            <img style="margin-left: 3px" :src="scope.row.url+'?imageView/2/w/50/h/100/q/50/format/png'">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="warning"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                dialogVisible: false,
                fileList: [],
                items: []
            }
        },
        created () {
            this.$Axios.get('/queryFiles')
                .then(res => {
                    console.log(res)
                    this.items = res.content.data
                })
        },
        methods: {
            submitUpload () {
                this.$refs.upload.submit()
            },
            handleRemove (file, fileList) {
                console.log(file, fileList)
            },
            handlePreview (file) {
                console.log(file)
            },
            uploadSuccess (response, file, fileList) {
                console.log(response)
                if (response.result) {
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    })
                    response.content.createdAt = Date.now()
                    this.items.unshift(response.content)
                } else {
                    this.$message({
                        message: response.msg,
                        type: 'error'
                    })
                }
            },
            uploadError (err, file, fileList) {
                console.error(err)
            },
            fileStatusChange () {

            },
            handleDelete (index, row) {
                console.log(index)
                console.log(row)
                this.$Axios.delete('/deleteFiles', { fileId: row.objectId })
                    .then(res => {
                        console.log(res)
                    })
            }
        }
    }
</script>

<style scoped>
  .table-content{
    margin-top: 1.5rem;
  }
</style>
