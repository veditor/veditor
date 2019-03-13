<template>
  <List class="v-pop-menu"
        @contextmenu.native.prevent
        :mousetrap-target="mousetrapTarget"
        :style="{
          left: position.left,
          top: position.top,
          right: position.right,
          bottom: position.bottom
        }">
    <slot />
  </List>
</template>

<script>
  import List from '../List/List'

  export default {
    name: 'PopMenu',
    components: { List },
    props: {
      position: {
        type: Object,
        required: true
      },
      mousetrapTarget: {
      }
    }
  }

</script>

<style lang="scss">
  .v-pop-menu {
    position: fixed;
    z-index: 100;

    border-radius: 6px;
    box-shadow: rgba(0,0,0,0.15) 0 6px 24px;
  }
</style>
