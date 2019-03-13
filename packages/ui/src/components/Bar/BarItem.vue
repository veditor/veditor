<template>
  <span class="v-bar-item clickable" v-click-highlight @click="(e) => handleInteraction(e, false)">
    <Icon v-if="icon" class="icon" :name="icon" />
    <span v-else="iconContent" class="icon content">{{iconContent}}</span>
    <slot slot="panel" name="panel"></slot>
  </span>
</template>

<script>
  import Icon from '../../components/Icon/MaterialIcon'
  import clickHighlight, { trigger } from '../../directive/click-highlight'

  export default {
    name: 'BarItem',
    components: { Icon },
    inject: ['registerHotKey', 'unregisterHotKey', 'triggerBtn'],
    props: {
      icon: {
        type: String
      },
      iconContent: {
        type: String
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
      },
      panelRenderer: {
        type: Function
      }
    },
    methods: {
      handleInteraction (e, callTrigger = true) {
        if (!this.disabled) {
          this.triggerBtn(this.name, this, e)
        }
        if (callTrigger) {
          trigger(this.$el)
        }
      }
    },
    directives: { clickHighlight },
    mounted () {
      if (this.hotKey) {
        this.registerHotKey(this.hotKey, e => this.handleInteraction(e))
      }
    },
    beforeDestroy () {
      if (this.hotKey) {
        this.unregisterHotKey(this.hotKey)
      }
    },
    watch: {
      hotKey (nv, pv) {
        if (pv) {
          this.unregisterHotKey(pv)
        }
        if (nv) {
          this.registerHotKey(nv, (e) => this.handleInteraction(e))
        }
      }
    }
  }
</script>

<style lang="scss">
  .v-bar-item {
    display: inline-block;
    vertical-align: text-top;
    font-size: 0;
    height: 19px;
    transition: all .2s;
    position: relative;
    border-radius: 50%;
    color: #656076;

    .icon {
      vertical-align: text-top;
      padding: 2px;
      font-size: 15px;
      &.content {
        font-size: 14px;
      }
    }

    &:not(.disabled) {
      cursor: pointer;

      &:hover {
        background: rgba(0, 0, 0, .035);
      }

      &.active {
        background: rgba(0, 0, 0, .045);
      }
    }
  }
</style>
