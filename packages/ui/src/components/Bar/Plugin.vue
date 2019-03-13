<template functional>
  <BarItem :name="props.name" :icon="props.icon" :description="props.description" :hot-key="props.hotKey">
    <template v-slot:panel>
      <slot></slot>
    </template>
  </BarItem>
</template>

<script>
  import BarItem from './BarItem'

  export default {
    name: 'Plugin',
    functional: true,
    components: { BarItem },
    props: {
      icon: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      hotKey: {
        type: [String, Array],
        required: false
      },
      description: {
        type: String
      }
    }
  }
</script>

<style scoped>

</style>
