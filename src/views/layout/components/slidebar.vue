<template>
    <div class="sidebar-container" :style="{width:computeWidth}">
        <div class="app-sidebar-title">
            <span class="logo">S</span>
            <span class="logo-title" v-show="!isCollapse">Sysuke Admin</span>
        </div>
        <el-menu default-active="/dashboard" :collapse="isCollapse" router>
            <template v-for="(menu,index) in menus">
                <template v-if="!menu.hide && menu.children.length">
                    <el-menu-item :index="menu.redirect" v-if="menu.children.length === 1 " :key="index">
                        <i :class="[menu.children[0].meta.icon ? menu.children[0].meta.icon:'icon-file','iconfont']"></i>
                        <span slot="title">{{menu.children[0].meta.title}}</span>
                    </el-menu-item>
                    <el-submenu :index="menu.redirect" v-else :key="index">
                        <template slot="title">
                            <i :class="[menu.meta.icon ? menu.meta.icon : 'icon-folder','iconfont']"></i>
                            <span slot="title">{{menu.meta.title}}</span>
                        </template>
                        <template v-for="(sub,subIndex) in menu.children">
                            <el-menu-item :index="menu.path+'/'+sub.path" :key="subIndex">
                                <i :class="[sub.meta.icon ? sub.meta.icon:'icon-file','iconfont']"></i>
                                <span slot="title">{{sub.meta.title}}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
  import menus from '@/router/routes'

  export default {
    name: 'slidebar',
    props: {
      isCollapse: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
        menus: menus
      }
    },
    computed: {
      computeWidth () {
        return this.isCollapse ? '64px' : '200px'
      }
    }
  }
</script>

<style lang="scss">
    .sidebar-container {
        position: fixed;
        top: 0;
        left: 0;
        max-width: 200px;
        min-width: 64px;
        width: 200px;
        min-height: 100vh;
        height: 100%;
        transition: width .2s cubic-bezier(.23, 1, .32, 1);
        background: white;
        flex: 0 0 200px;
        box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
        /*position: relative;*/
        z-index: 10;
        //reset element-ui css
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }
        .el-menu {
            border-right: none;
        }
        .el-submenu [class^=icon-], .el-menu-item [class^=icon-] {
            vertical-align: middle;
            margin-right: 5px;
            width: 24px;
            text-align: center;
            font-size: 18px;
        }
        .el-menu-item ,.el-submenu__title{
            height: 40px!important;
            line-height: 40px!important; //eslint-line-disabled
            margin-top: 4px;
            margin-bottom: 4px;
        }
        .el-menu-item.is-active{
            background-color: #e6f7ff;
            border-right: 2px solid #1890ff;
        }
        > .app-sidebar-title {
            border-bottom: 1px solid #e8e8e8;
            box-shadow: 1px 1px 0 0 #e8e8e8;
            box-sizing: border-box;
            line-height: 64px;
            height: 64px;
            padding: 0 12px;
            transition: all .3s;
            > .logo {
                font-size: 30px;
                padding: 12px;
                color: #499feb;
            }
            > .logo-title {
                color: #89bbec;
                font-size: 18px;
                padding: 12px;
                font-style: italic;
            }
        }
    }
</style>
