<template>
  <i class="material-icons">{{name}}</i>
</template>

<script>
  import 'material-design-icons/iconfont/material-icons.css'
  import all from 'raw-loader!material-design-icons/iconfont/codepoints'

  export default {
    name: 'MaterialIcon',
    props: {
      name: {
        type: String,
        required: true
      }
    }
  }

  export const allName = all
</script>

<style lang="scss">

  .material-icons {
    user-select: none;
    vertical-align: middle;
  }
</style>

