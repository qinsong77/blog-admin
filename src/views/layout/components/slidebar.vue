<template>
    <div class="sidebar-container" :style="{width:computeWidth}">
        <div class="app-sidebar-title">
            <span class="logo">S</span>
            <span class="logo-title" v-show="!isCollapse">Sysuke Admin</span>
        </div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                    <span slot="title">分组一</span>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
  name: 'slidebar',
  props: {
    isCollapse: {
      default: false,
      type: Boolean
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
    .sidebar-container{
        transition: width .2s cubic-bezier(.23,1,.32,1);
        background: white;
        flex: 0 0 200px;
        max-width: 200px;
        min-width: 64px;
        width: 200px;
        min-height: 100vh;
        box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
        position: relative;
        z-index: 10;
        //reset element-ui css
        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }
        .el-menu{
            border-right: none;
        }
        >.app-sidebar-title{
            border-bottom: 1px solid #e8e8e8;
            box-shadow: 1px 1px 0 0 #e8e8e8;
            box-sizing:border-box;
            line-height: 64px;
            height: 64px;
            padding: 0 12px;
            transition: all .3s;
            >.logo{
                font-size: 30px;
                padding: 12px;
                color: #499feb;
            }
            >.logo-title{
                color: #89bbec;
                font-size: 18px;
                padding: 12px;
                font-style: italic;
            }
        }
    }
</style>
