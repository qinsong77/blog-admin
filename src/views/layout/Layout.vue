<template>
    <div class="app-wrapper">
        <nav>
            <slidebar :is-collapse="isCollapse"/>
        </nav>
        <div class="main-wrapper" :style="{ 'padding-left':isCollapse ?'64px':'200px'}">
            <header-container  :is-collapse="isCollapse" @EmitCollapse="EmitCollapse" :breadCrumbList="breadCrumbList"/>
            <section>
                <div class="main-container">
                    <transition name="fade-transform" mode="out-in">
                        <keep-alive >
                            <router-view :key="key"/>
                        </keep-alive>
                    </transition>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
    import Slidebar from './components/slidebar'
    import HeaderContainer from './components/HeaderContainer'
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: 'Layout',
        components: { Slidebar, HeaderContainer },
        data () {
            return {
            }
        },
        computed: {
            key () {
                return this.$route.fullPath
            },
            ...mapState({
                'isCollapse': state => state.isCollapse
            }),
            breadCrumbList () {
                return this.$store.state.BreadCrumbList
            }

        },
        methods: {
            ...mapMutations({
                'EmitCollapse': 'reverseIsCollapse'
            })
        }
    }
</script>

<style lang="scss">
    .app-wrapper{
        flex-direction: row;
        display: flex;
        flex: auto;
        background: #f0f2f5;
        min-height: 100vh;
        transition: padding-left .2s cubic-bezier(.23,1,.32,1);
        .main-wrapper{
            display: flex;
            flex-direction: column;
            flex: auto;
            background: #f0f2f5;
            overflow-x: hidden;
            .main-container{
                margin: 24px 24px 0;
                padding-top: 64px;
            }
        }
    }
    /*fade-transform*/
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all .5s;
    }
    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-30px);
    }
    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
</style>
