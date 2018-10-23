<template>
    <div class="login" @keyup.enter="handleLogin">
        <div class="layer bg" id="login"></div>
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
                    <el-button :loading="loading" type="primary" style="width: 100%;margin-top: 15px"
                               @click.native.prevent="handleLogin">登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
  import { isvalidUsername } from '_com/validate'
  import { setToken } from '_com/auth'
  import config from './config/default'

  require('particles.js')
  export default {
    name: 'index',
    data () {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('Please enter the correct user name'))
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
      return {
        loginForm: {
          username: 'admin',
          password: '1111111'
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        loading: false
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
            setToken(this.loginForm.username)
            this.$router.push({path: '/'})
          } else {
            console.log('error submit!!')
            return false
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
        }
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

    /*@media (min-width: 768px){*/
    /*.login{*/
    /*background: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg") no-repeat center center;*/
    /*}*/
    /*}*/

</style>
