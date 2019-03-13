<template>
  <textarea class="v-multiline-text-input" :value="value" @input="onInput"></textarea>
</template>

<script>
  import autosize from 'autosize'

  export default {
    name: 'MultilineTextInput',
    inheritAttrs: true,
    props: {
      value: {
        type: String
      }
    },
    mounted () {
      autosize(this.$el)
    },
    methods: {
      onInput (e) {
        this.$emit('input', e.target.value)
        this.$el.focus()
      }
    }
  }
</script>

<style lang="scss">
  .v-multiline-text-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    border-top: 3px solid #E9E9E9;
    border-bottom: 3px solid #E9E9E9;
    outline: none;
    color: #656076;
    font-size: 16px;
    letter-spacing: .5px;
    caret-color: #656076;
    transition: all .2s;
    padding: 8px;
    position: relative;
    background: transparent;
    height: min-content;
    overflow: hidden;
    resize: none;
    line-height: 1.5;
    white-space: pre-line;
    width: 100%;
    box-sizing: border-box;

    &:focus {
      border-bottom-color: #656076;
      border-top-color: #656076;
    }
  }
</style>
