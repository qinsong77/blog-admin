<template>
    <div class="cropper-wrapper">
        <div class="img-box">
            <img class="cropper-image" :id="imgId" alt="">
        </div>
        <div class="right-con">
            <div v-if="preview" class="preview-box" :id="previewId"></div>
            <div class="button-box">
                <input type="file" id="file" hidden @change="setImg" ref="inputFile"
                       accept="image/png,image/jpeg,image/gif,image/jpg"/>
                <el-button style="width: 100%;" type="primary" @click="choseImg" size="small">上传图片</el-button>
                <div v-show="insideSrc">
                    <el-button type="primary" @click="rotate" icon="el-icon-refresh" size="mini">
                    </el-button>
                    <el-button type="primary" @click="shrink" icon="el-icon-minus" size="mini">
                    </el-button>
                    <el-button type="primary" @click="magnify" icon="el-icon-plus" size="mini">
                    </el-button>
                    <div>
                        <el-button type="primary" @click="scale('X')" icon="el-icon-sort-down" size="mini">
                        </el-button>
                        <el-button type="primary" @click="scale('Y')" icon="el-icon-sort-up" size="mini">
                        </el-button>
                        <el-button type="primary" @click="move(0, -moveStep)" icon="el-icon-arrow-up" size="mini">
                        </el-button>
                    </div>
                    <div>
                        <el-button type="primary" @click="move(-moveStep, 0)" icon="el-icon-arrow-left" size="mini">
                        </el-button>
                        <el-button type="primary" @click="move(0, moveStep)" icon="el-icon-arrow-down" size="mini">
                        </el-button>
                        <el-button type="primary" @click="move(moveStep, 0)" icon="el-icon-arrow-right" size="mini">
                        </el-button>
                    </div>
                    <el-button-group>
                        <el-button type="primary" size="mini" @click="setAspectRatio(16/9)">16:9</el-button>
                        <el-button type="primary" size="mini" @click="setAspectRatio(4/3)">4:3</el-button>
                        <el-button type="primary" size="mini" @click="setAspectRatio(1/1)">1:1</el-button>
                    </el-button-group>
                    <el-button style="width: 150px;margin-top: 10px;" type="primary" @click="crop" :loading="imgSubmitBtbLoading">{{ cropButtonText
                        }}
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Cropper from 'cropperjs'
    import 'cropperjs/dist/cropper.min.css'

    export default {
        name: 'Cropper',
        props: {
            src: {
                type: String,
                default: ''
            },
            preview: {
                type: Boolean,
                default: true
            },
            imgSubmitBtbLoading: {
                type: Boolean,
                default: false
            },
            moveStep: {
                type: Number,
                default: 4
            },
            cropButtonText: {
                type: String,
                default: '裁剪'
            }
        },
        data () {
            return {
                cropper: null,
                insideSrc: '',
                fileName: ''
            }
        },
        computed: {
            imgId () {
                return `cropper${this._uid}`
            },
            previewId () {
                return `cropper_preview${this._uid}`
            }
        },
        watch: {
            src (src) {
                this.replace(src)
            },
            insideSrc (src) {
                this.replace(src)
            }
        },
        methods: {
            setImg () {
                let file = this.$refs.inputFile.files[0]
                this.fileName = file.name
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = (event) => {
                    this.insideSrc = event.srcElement.result
                }
            },
            choseImg () {
                const fileInput = document.getElementById('file')
                fileInput.click()
            },
            replace (src) {
                this.cropper.replace(src)
                this.insideSrc = src
            },
            rotate () {
                this.cropper.rotate(90)
            },
            shrink () {
                this.cropper.zoom(-0.1)
            },
            magnify () {
                this.cropper.zoom(0.1)
            },
            scale (d) {
                this.cropper[`scale${d}`](-this.cropper.getData()[`scale${d}`])
            },
            move (...argu) {
                this.cropper.move(...argu)
            },
            setAspectRatio (value) {
                this.cropper.setAspectRatio(value)
            },
            crop () {
                this.cropper.getCroppedCanvas().toBlob(blob => {
                    this.$emit('on-crop', blob, this.fileName)
                })
            }
        },
        mounted () {
            this.$nextTick(() => {
                let dom = document.getElementById(this.imgId)
                this.cropper = new Cropper(dom, {
                    preview: `#${this.previewId}`,
                    checkCrossOrigin: true
                })
            })
        }
    }
</script>
<style lang="scss">
    @mixin cropper-bg() {
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
    }
    .cropper-wrapper {
        .img-box {
            width: 600px;
            height: 350px;
            border: 1px solid #ebebeb;
            display: inline-block;
            @include cropper-bg();
            img {
                max-width: 100%;
                display: block;
            }
        }
        .right-con {
            line-height: 32px;
            display: inline-block;
            width: 210px;
            vertical-align: top;
            box-sizing: border-box;
            padding: 0 10px;
            .preview-box {
                @include cropper-bg();
                height: 150px !important;
                width: 100% !important;
                overflow: hidden;
                border: 1px solid #ebebeb;
            }
            .button-box {
                text-align: center;
                margin-top: 5px;
                /*padding: 0 10px;*/
            }
        }
    }
</style>
