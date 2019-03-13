<template>
  <label class="v-form-label">
    <span class="text" :style="{maxWidth: labelWidth, minWidth: labelWidth}">{{title}}</span>
    <span class="control">
      <slot />
    </span>
  </label>
</template>

<script>
  export default {
    name: 'FormLabel',
    props: {
      title: {
        type: String,
        required: true
      },
      labelWidth: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss">
  .v-form-label {
    display: inline-flex;
    align-items: center;
    .text {
      color: #656076;
      font-size: 16px;
      text-align: right;
      margin-right: 8px;
      margin-left: 8px;
      padding-right: 8px;
      border-right: 2px dashed #dedede;
    }
    .control {
      flex: 1;
    }
  }
</style>
