<template>
  <Sketch :style="{boxShadow: 'none'}" class="color-panel" :value="value" @input="onChangeColor"/>
</template>

<script>
  import { Sketch } from 'vue-color'
  import color from 'color'

  export default {
    name: 'ColorPanel',
    components: { Sketch },
    props: {
      value: {
        type: String,
        default: 'black'
      }
    },
    methods: {
      onChangeColor (e) {
        this.$emit('input', color(e.hex8).toString())
      }
    }
  }
</script>
