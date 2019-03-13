<template>
  <Scrollable class="v-list-container">
    <ul class="v-list" :role="role">
      <slot />
    </ul>
  </Scrollable>
</template>

<script>
  import { mousetrapProxy } from '../../mixins/mousetrap'
  import Scrollable from '../Scrollable/Scrollable'

  export default {
    name: 'List',
    mixins: [mousetrapProxy],
    components: { Scrollable },
    props: {
      role: {
        type: String,
        default: ''
      }
    },
    provide () {
      return {
        emitItemClicked: (vm, e) => {
          this.$emit('item-click', vm.name, e)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../style/common";

  .v-list-container {
    background: #F8F8F8;
    /*box-shadow: 4px 6px 26px 0 rgba(0, 0, 0, 0.25);*/
    /*border-radius: 6px;*/
    width: max-content;
  }

  .v-list {
    list-style: none;
    padding: 0;
    margin: 0;
    user-select: none;
  }
</style>
