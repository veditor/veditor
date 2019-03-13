<template>
  <div class="veditor-editor"
       v-once
       tabindex="0"
       @drop="handleDrop"
       @click="handleSelectionMoved()"
       @focus="$emit('focus')"
       @blur="$emit('blur')"
       @input="e => onInput(e)"
       @paste="e => $emit('paste', e)"
       contenteditable></div>
</template>

<script>
  import MouseTrap from 'mousetrap'
  import { getCurrentSelection } from '../lib/wysiwyg-utils'

  export default {
    name: 'Editor',
    props: {
      shortcuts: {
        type: Object,
        default () { return {} }
      }
    },
    mounted () {
      this.$mousetrap = MouseTrap(this.$el)
      this.$watch('shortcuts', value => {
        this.bindShortcuts(value)
      }, { immediate: true })
    },
    beforeDestroy () {
      this.$mousetrap.reset()
    },
    methods: {
      focus () {
        this.$el.focus()
        document.execCommand('defaultParagraphSeparator', false, 'p')
      },
      onInput (e) {
        this.$emit('input', e)
        this.handleSelectionMoved()
      },
      onSelectChange (e) {
        console.log(e)
      },
      handleSelectionMoved () {
        this.$lastSelection = getCurrentSelection()
        this.$emit('selection-changed', this.$lastSelection)
      },
      addShortcut (shortcut, key) {
        this.$mousetrap.bind(shortcut, e => {
          this.$emit('shortcut', { key, currentSelection: this.$lastSelection, event: e })
          return false
        })
      },
      bindShortcuts (obj) {
        this.$mousetrap.reset()
        this.$mousetrap.bind(['esc'], () => this.$emit('esc'))
        this.$mousetrap.bind(['left', 'up', 'down', 'right', 'home', 'end'],
          () => {
            setTimeout(() => {
              this.handleSelectionMoved()
            }, 0)
          })
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            this.addShortcut(key, obj[key])
          }
        }
      },
      handleDrop (e) {
        e.preventDefault()
        e.stopPropagation()
        this.$emit('drag', e)
      }
    }
  }
</script>

<style lang="scss">
  .veditor-editor {
    font-family: "PingFang SC", Arial, "Helvetica Neue", Helvetica, sans-serif;
    outline: 0;
    white-space: pre-wrap;
    display: block;
    overflow: hidden;
    background: white;

    table {
      width: 100%;
    }
  }
</style>
