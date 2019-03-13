<template>
  <div id="app">
    <VFrame ref="vframe" style="max-width: 800px; margin: auto" />
  </div>
</template>

<script>
  import VFrame, { commonPlugin } from './index'

  export default {
    name: 'app',
    components: {
      VFrame
    },
    mounted () {
      this.$refs.vframe.installPlugins(commonPlugin)
    }
  }
</script>

<style lang="scss">
  #app {

  }
</style>
