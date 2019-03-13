<template>
  <div style="width: 300px">
    <InlineTextInput ref="title" v-if="value.insertion" v-model="title" placeholder="链接文字" />
    <InlineTextInput ref="href" v-model="href" placeholder="链接目标" @keypress.native.enter="onDone" />
  </div>
</template>

<script>
  import { FormLabel, InlineTextInput } from '@veditor/ui'

  export default {
    name: 'HyperLinkPanel',
    components: { InlineTextInput, FormLabel },
    props: {
      value: Object,
      focus: Boolean
    },
    data () {
      return {
        title: '',
        href: ''
      }
    },
    methods: {
      onDone () {
        this.$emit('input', this.$data)
      }
    },
    mounted () {
      if (this.focus) {
        this.$nextTick(() => {
          (this.$refs.title || this.$refs.href).focus()
        })
      }
    }
  }
</script>

<style scoped>

</style>
