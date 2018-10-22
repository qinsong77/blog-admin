<template>
    <div class="app-wrapper">
        <nav>
            <slidebar :is-collapse="isCollapse"/>
        </nav>
        <div class="main-wrapper">
            <header-container  :is-collapse="isCollapse" @EmitCollapse="EmitCollapse"/>
            <section>
                <div class="main-container">
                    <router-view></router-view>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Slidebar from './components/slidebar'
import HeaderContainer from './components/HeaderContainer'
export default {
  name: 'Layout',
  components: { Slidebar, HeaderContainer },
  data () {
    return {
      isCollapse: false
    }
  },

  methods: {
    EmitCollapse () {
      this.isCollapse = !this.isCollapse
    }
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
        .main-wrapper{
            display: flex;
            flex-direction: column;
            flex: auto;
            background: #f0f2f5;
            overflow-x: hidden;
            .main-container{
                margin: 24px 24px 0;
            }
        }
    }
</style>
