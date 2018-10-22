<template>
    <header class="header-bar">
        <div>
            <i class="header-collapse-trigger iconfont"
               @click="handleSidebar"
               :class="[isCollapse?'icon-indent':'icon-outdent' ]">
            </i>
        </div>
        <div class="menu-container">
            <el-badge :value="3" class="user-notification">
                <i class="el-icon-bell" style="margin-right: 10px"></i>
            </el-badge>
            <el-dropdown @command="handleCommand">
                <div class="menu-user">
                    <img src="../../../assets/avatar.jpg" class="avatar" alt="avatar"/>
                    <span class="username">{{username}}</span>
                </div>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item divided command="b">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import { removeToken } from '../../../common/auth'

export default {
  name: 'HeaderContainer',
  data () {
    return {
      username: 'Sysuke'
    }
  },
  props: {
    isCollapse: Boolean
  },
  methods: {
    handleSidebar () {
      this.$emit('EmitCollapse')
    },
    handleCommand (command) {
      if (command === 'b') {
        removeToken()
        this.$router.push({ name: 'login' })
      }
    }
  }
}
</script>

<style lang="scss">
    .header-bar{
        height: 64px;
        background: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .header-collapse-trigger{
            font-size: 25px;
            height: 64px;
            cursor: pointer;
            transition: all .3s,padding 0s;
            padding: 30px 24px;
        }
        .menu-container{
            padding-right: 20px;
            display: flex;
            align-items: center;
            .user-notification{
                cursor: pointer;
                margin-right: 5px;
            }
            .menu-user{
                cursor: pointer;
                padding: 0 15px;
                transition: all .3s;
                display: flex;
                align-items: center;
            }
            .avatar{
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
            .username{
                margin-left: 5px;
                color:$text-g;
                font-size: 15px;
            }
        }

    }

</style>
