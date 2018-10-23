<template>
    <div class="tab-container">
        <div class="tab-header">
            <div class="tab-title" @click="activeTab = 0" :class="{'active-tab':activeTab === 0}">消息 (5)</div>
            <div class="tab-title" @click="activeTab = 1" :class="{'active-tab':activeTab === 1}">待办 (3)</div>
            <div class="tabs-ink-bar" :style="{transform: computeWidth}"></div>
        </div>
        <div class="tab-content">
            <ul class="msg-ul">
                <li class="msg-li">
                    <div class="icon">
                        <i class="iconfont icon-mail"></i>
                    </div>
                    <div class="msg-content">
                        <p>我好烦啊啊真是的你在干嘛</p>
                        <p class="time">2018-10-23</p>
                    </div>
                </li>
                <li class="msg-li">
                    <div class="icon">
                        <i class="iconfont icon-mail"></i>
                    </div>
                    <div class="msg-content">
                        <p>我好烦啊啊真是的你在干嘛</p>
                        <p class="time">2018-10-23</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'MsgTab',
    data () {
      return {
        activeTab: 0
      }
    },
    computed: {
      computeWidth () {
        return this.activeTab === 0 ? 'translate3d(38px, 0px, 0px)' : 'translate3d(170px, 0px, 0px)'
      }
    }
  }
</script>

<style lang="scss">
    .tab-container{
        margin: 0 -12px;
        >.tab-header{
            position: relative;
            box-sizing: border-box;
            padding: 0 5px;
            border-bottom: 1px solid #e0e0e0;
            >.tab-title{
                display:inline-block;
                width: 50%;
                text-align: center;
                padding-bottom: 10px;
                cursor: pointer;
            }
            >.active-tab{
                color:#1890ff;
            }
            >.tabs-ink-bar{
                z-index: 1;
                position: absolute;
                left: 0;
                bottom: 0;
                box-sizing: border-box;
                height: 2px;
                background-color: #1890ff;
                transform-origin: 0 0;
                width: 64px;
                transition: transform .3s cubic-bezier(.645,.045,.355,1),width .3s cubic-bezier(.645,.045,.355,1);
            }
        }
        .msg-li{
            cursor: pointer ;
            border-bottom: 1px solid #e0e0e0;
            padding: 10px;
            display: flex;
            .icon{
                padding: 0 15px;
                >.iconfont{
                    line-height: 150%;
                    height: 100%;
                    vertical-align: middle;
                    font-size: 25px;
                }
            }
            .msg-content{
                p{

                }
                .time{
                    color: $text-g;
                    margin-top: 7px;
                }
            }
        }
    }

</style>
