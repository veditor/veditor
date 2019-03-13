<template>
  <li v-click-highlight
      class="v-list-item"
      :class="{
        disabled,
        active,
        clickable: !nonClickable,
        'no-padding': noPadding,
        'v-click-highlight': highlight
      }"
      @click="handleClick"
      :role="role"
  >
    <slot />
    <span class="v-hot-key" v-if="hotKey">({{hotKey}})</span>
  </li>
</template>

<script>
  import clickHighlight, { trigger } from '../../directive/click-highlight'

  export default {
    name: 'ListItem',
    inject: [
      'emitItemClicked',
      'registerHotKey',
      'unregisterHotKey'
    ],
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      active: {
        type: Boolean,
        default: false
      },
      nonClickable: {
        type: Boolean,
        default: false
      },
      hotKey: {
        type: String,
        required: false
      },
      noPadding: {
        type: Boolean,
        default: false
      },
      name: {
        type: [String, Number],
        required: false
      },
      role: {
        type: String,
        default: ''
      },
      highlight: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      interactive () {
        return !this.disabled && !this.nonClickable
      }
    },
    directives: {
      clickHighlight: clickHighlight
    },
    methods: {
      handleClick (e) {
        if (this.interactive) {
          this.emitItemClicked(this, e)
          this.$emit('click', e)
        }
      },
      handleHotKey (e) {
        if (this.interactive) {
          e.preventDefault()
          e.stopPropagation()
          this.$emit('click', e)
          trigger(this.$el)
        }
      }
    },
    mounted () {
      if (this.hotKey) {
        this.$handler = this.registerHotKey(this.hotKey, e => this.handleHotKey(e))
      }
    },
    beforeDestroy () {
      if (this.hotKey) {
        this.unregisterHotKey(this.hotKey, this.$handler)
      }
    },
    watch: {
      hotKey (nv, pv) {
        if (pv) {
          this.unregisterHotKey(pv, this.$handler)
        }
        if (nv) {
          this.$handler = this.registerHotKey(nv, e => this.handleHotKey(e))
        }
      }
    }
  }
</script>

<style lang="scss">
  .v-list-item {
    font-size: 14px;
    color: #656076;
    letter-spacing: 2.67px;
    text-align: center;
    transition: all .2s;
    min-height: 30px;
    line-height: 30px;
    outline: none;
    box-sizing: border-box;

    &:not(.no-padding) {
      padding-left: 35px;
      padding-right: 35px;
    }

    &.disabled {
      color: #CACACA;
    }

    &.clickable:not(.disabled):not(.active) {
      cursor: pointer;
    }

    &.disabled {
      cursor: not-allowed;
    }

    &.clickable {
      &:not(.disabled):hover, &.active {
        background: rgba(0, 0, 0, .035);
      }
    }

    .v-hot-key {
      color: gray;
    }

    input {
      text-align: center;
      font-size: 14px;
    }

    .v-inline-text-input {
      border-bottom: none;
    }

    .v-inline-text-search {
      .search-input {
        padding-left: 30px;
      }
    }
  }
</style>

