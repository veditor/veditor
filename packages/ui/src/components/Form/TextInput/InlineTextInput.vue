<template>
  <input class="v-inline-text-input" @input="onInput" :value="value">
</template>

<script>
  export default {
    name: 'InlineTextInput',
    inheritAttrs: true,
    props: {
      value: {
        default: ''
      }
    },
    methods: {
      onInput (event) {
        this.$emit('input', event.target.value)
        this.$el.focus()
      },
      focus () {
        const selection = document.getSelection()
        selection.selectAllChildren(this.$el)
        selection.collapseToEnd()
        this.$el.focus()
      }
    }
  }
</script>

<style lang="scss">
  .v-inline-text-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    border: none;
    border-bottom: 3px solid #E9E9E9;
    color: #656076;
    font-size: 16px;
    letter-spacing: .5px;
    caret-color: #656076;
    transition: all .2s;
    padding: 8px;
    position: relative;
    background: transparent;
    width: 100%;
    box-sizing: border-box;


    &::placeholder {
      color: lightgray;
    }

    &:focus {
      border-bottom-color: #656076;
    }
  }

</style>
