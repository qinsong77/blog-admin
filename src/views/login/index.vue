<template>
    <div class="login" @keyup.enter="handleLogin">
        <div class="layer bg" id="login"></div>
        <div class="login-container">
            <p class="login-title">Sysuke Blog Admin</p>
            <p class="login-title-sub">this is my blog admin</p>
            <el-card class="login-card">
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on">
                    <el-form-item prop="username">
                        <el-input
                                palceholder="用户名"
                                type="text"
                                name="username"
                                v-model="loginForm.username">
                            <i slot="prefix" class="iconfont icon-user"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input
                                placeholder="密码"
                                type="password"
                                name="password"
                                v-model="loginForm.password">
                            <i slot="prefix" class="iconfont icon-lock"></i>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" type="primary" style="width: 100%;margin-top: 10px"
                                   @click.native.prevent="handleLogin">登录
                        </el-button>
                    </el-form-item>
                </el-form>
                <el-button type="text" style="float: right" @click="centerDialogVisible = true">注册</el-button>
            </el-card>

            <el-dialog
                    title="注册"
                    :visible.sync="centerDialogVisible"
                    width="360px"
                    top="20vh"
                    center>
                <div>
                    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="login-form" auto-complete="on">
                        <el-form-item prop="username">
                            <el-input
                                    palceholder="用户名"
                                    type="text"
                                    name="username"
                                    v-model="registerForm.username">
                                <i slot="prefix" class="iconfont icon-user"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                    placeholder="密码"
                                    type="password"
                                    name="password"
                                    v-model="registerForm.password">
                                <i slot="prefix" class="iconfont icon-lock"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="passwordSure">
                            <el-input
                                    placeholder="再次输入确认密码"
                                    type="password"
                                    name="password"
                                    v-model="registerForm.passwordSure">
                                <i slot="prefix" class="iconfont icon-lock"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取 消</el-button>
                     <el-button :loading="registerLoading"
                                type="primary"
                                @click.native.prevent="handleRegister">注册
                            </el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import { isvalidUsername } from '_com/validate'
    import { setToken } from '_com/utils'
    import config from './config/default'

    require('particles.js')
    export default {
        name: 'index',
        data () {
            const validateUsername = (rule, value, callback) => {
                if (!isvalidUsername(value)) {
                    callback()
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('The password can not be less than 6 digits'))
                } else {
                    callback()
                }
            }
            const validatePasswordSure = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('The password can not be less than 6 digits'))
                } else if (value !== this.registerForm.password) {
                    callback(new Error('密码不一致！'))
                } else {
                    callback()
                }
            }
            return {
                centerDialogVisible: false,
                loginForm: {
                    username: '',
                    password: ''
                },
                registerForm: {
                    username: '',
                    password: '',
                    passwordSure: ''
                },
                loginRules: {
                    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
                },
                registerRules: {
                    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    password: [{ required: true, trigger: 'blur', validator: validatePassword }],
                    passwordSure: [{ required: true, trigger: 'blur', validator: validatePasswordSure }]
                },
                loading: false,
                registerLoading: false
            }
        },
        mounted () {
            // 初始化例子插件
            // eslint-disable-next-line
            particlesJS('login', config)
        },
        beforeDestroy () {
            /* eslint-disable */
            if (pJSDom && pJSDom.length > 0) {
                pJSDom[0].pJS.fn.vendors.destroypJS()
                pJSDom = []
            }
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.$Axios.post('/login', {
                            username: this.loginForm.username,
                            password: this.loginForm.password
                        }).then(res => {
                            this.loading = false
                            console.log(res);
                            if (res.result) {
                                this.$message({
                                    message: res.msg,
                                    type: 'success'
                                });
                                setToken(res.content)
                                this.$router.push({path: '/'})
                            }
                        }).catch(err => {
                            this.loading = false
                            console.log(err)
                        })

                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            handleRegister(){
                this.$refs.registerForm.validate(valid=>{
                    if(valid){
                        this.$Axios.post('/register', {
                            username: this.registerForm.username,
                            password: this.registerForm.password
                        }).then(res => {
                            this.registerLoading = false
                            console.log(res);
                            if (res.result) {
                                this.$message({
                                    message: res.msg,
                                    type: 'success'
                                });
                                setToken(res.content)
                                this.$router.push({path: '/'})
                            }
                        }).catch(err => {
                            this.registerLoading = false
                            console.log(err)
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .login {
        width: 100%;
        height: 100%;
        text-align: center;
        background: #f0f2f5;
        // 层
        .layer {
            position: absolute;
            height: 100%;
            width: 100%;
            overflow: hidden;
            z-index: 1;
        }
        .login-container {
            position: relative;
            z-index: 2000;
            > .login-title {
                padding-top: 10%;
                color: $text-b;
                font-size: 32px;
                font-weight: 600;
            }
            > .login-title-sub {
                color: $text-g;
                font-size: 15px;
                padding: 45px;
            }
            > .login-card {
                width: 350px;
                margin: 0 auto;
            }
        }

    }

    /*@media (min-width: 768px){*/
    /*.login{*/
    /*background: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg") no-repeat center center;*/
    /*}*/
    /*}*/

</style>
