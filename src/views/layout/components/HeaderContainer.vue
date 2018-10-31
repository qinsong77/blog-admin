<template>
    <header class="header-bar" :style="{width:computeWidth}">
        <div class="header-bar-left">
            <i class="header-collapse-trigger iconfont"
               @click="handleSidebar"
               :class="[isCollapse?'icon-indent':'icon-outdent' ]">
            </i>
            <div class="breadcrumb-container">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="item in breadCrumbList" :key="item.path" :to="{path:item.path}">
                        <i :class="['iconfont',item.icon]"></i>{{item.title}}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="menu-container">
            <el-popover
                    width="250"
                    placement="bottom"
                    trigger="click">
                <msg-tab/>
                <el-badge :value="3" class="user-notification" slot="reference">
                    <i class="el-icon-bell" style="margin-right: 10px"></i>
                </el-badge>
            </el-popover>
            <el-dropdown @command="handleCommand">
                <div class="menu-user">
                    <img src="../../../assets/avatar.jpg" class="avatar" alt="avatar"/>
                    <span class="username">{{username}}</span>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item divided command="b">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
    import { removeToken } from '../../../common/auth'
    import MsgTab from './MsgTab'

    export default {
        name: 'HeaderContainer',
        components: { MsgTab },
        data () {
            return {
                username: 'Sysuke',
                activeNames: ''
            }
        },
        props: {
            breadCrumbList: {
                default: function () {
                    return []
                },
                type: Array
            },
            isCollapse: Boolean
        },
        computed: {
            computeWidth () {
                return this.isCollapse ? 'calc(100% - 64px)' : 'calc(100% - 200px)'
            }
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
            },
            handleMsgTabClick (tab, event) {
                console.log(tab, event)
            }
        }
    }
</script>

<style lang="scss">
    .header-bar {
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        transition: width .2s cubic-bezier(.23, 1, .32, 1);
        position: fixed;
        top: 0;
        right: 0;
        height: 64px;
        background: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        >.header-bar-left{
            display: flex;
            justify-content: center;
            align-items: center;
            >.header-collapse-trigger {
                font-size: 25px;
                /*height: 64px;*/
                cursor: pointer;
                transition: all .3s ease-in-out;
                padding: 30px 24px;
            }
            .breadcrumb-container{
                .iconfont{
                    font-size: 18px;
                    margin-right: 5px;
                    vertical-align: -1px;
                }
            }
        }

        .menu-container {
            padding-right: 20px;
            display: flex;
            align-items: center;
            .user-notification {
                cursor: pointer;
                margin-right: 5px;
            }
            .menu-user {
                cursor: pointer;
                padding: 0 15px;
                transition: all .3s;
                display: flex;
                align-items: center;
            }
            .avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
            }
            .username {
                margin-left: 5px;
                color: $text-g;
                font-size: 15px;
            }
        }

    }

</style>
