<template>
  <div class="markdown-wrapper">
      <mavon-editor  @save="save"
                     @change="change"
                     ref="md"
                     class="mavon-editor"
                     :value="initialValue"/>
  </div>
</template>

<script>
    import { debounce } from '../../common/utils'
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css'
    export default {
        name: 'MarkdownEditor',
        components: {
            mavonEditor
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            initialValue: {
                type: String,
                default: ''
            },
            options: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            localCache: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                editor: null
            }
        },
        methods: {
            save (value) {
                if (this.localCache) localStorage.markdownContent = value
            },
            change (value) {
                this.$emit('input', value)
                this.$emit('on-change', value)
                debounce(() => {
                    localStorage.markdownContent = value
                }, 1500)()
            }
        },
        mounted () {
            let content = localStorage.markdownContent
            if (!this.initialValue) {
                this.$emit('setInitialValue', content)
            }
        }
    }
</script>

<style lang="scss">
.markdown-wrapper{
    .mavon-editor{
        min-height: 45vh;
    }
}
</style>
