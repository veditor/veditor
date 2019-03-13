<template >
  <div class="v-scrollable">
    <slot />
  </div>
</template>

<script>
  import 'perfect-scrollbar/css/perfect-scrollbar.css'
  import PerfectScrollbar from 'perfect-scrollbar'

  export default {
    name: 'Scrollable',
    mounted () {
      const ps = new PerfectScrollbar(this.$el)
      this.$on('hooks:updated', () => {
        ps.update()
      })
      this.$on('hooks:destroyed', () => {
        ps.destroy()
      })
    },
  }
</script>

<style lang="scss">
  .v-scrollable {
    position: relative;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
