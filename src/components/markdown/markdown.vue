<template>
  <div class="markdown-wrapper">
      <mavon-editor  @save="save" @change="change" ref="md" :value="initialValue"/>
  </div>
</template>

<script>
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
                editor: null,
                initialValue: ''
            }
        },
        methods: {
            save (value) {
                if (this.localCache) localStorage.markdownContent = value
            },
            change (value) {
                console.log(value)
                this.$emit('input', value)
                this.$emit('on-change', value)
            }
        },
        mounted () {
            let content = localStorage.markdownContent
            if (content) {
                console.log(content)
                this.initialValue = content
            }
        }
    }
</script>

<style lang="scss">
.markdown-wrapper{

}
</style>
