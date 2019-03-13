<template>
  <div class="vframe">
    <Bar ref="bar" class="vframe__header" @item-click="key => handleClickToolBtn(key)" :mousetrap-target="editorVm">
      <template v-for="group in pluginManager.groups">
        <BarItem v-for="plugin in group.plugins"
                 :class="{active: plugin.state.active}"
                 :name="plugin.key"
                 :icon="plugin.icon"
                 :icon-content="plugin.iconContent"
                 :key="plugin.key"
                 :panel-renderer="plugin.panelRenderer ? h => plugin.panelRenderer(h, plugin.state) : null"
        />
      </template>
      <slot name="toolbar" :plugin-manager="pluginManager" />
    </Bar>
    <Editor class="vframe__body" ref="editor"
            :shortcuts="pluginManager.hotKeys"
            @input="onInput"
            @shortcut="onShortcut"
            @selection-changed="onSelectionChanged"
            @paste.prevent.stop="onPaste"
            @drag="onDrag"
            @esc="$refs.bar.hidePop()"
    />
  </div>
</template>
<script>
  import Editor from './Editor'
  import { PluginManager } from '../lib/plugins'
  import { Bar, BarItem } from '@veditor/ui'

  export default {
    components: { BarItem, Bar, Editor },
    data () {
      const pluginManager = new PluginManager(this)
      return {
        pluginManager,
        showPanel: false,
        editorVm: null
      }
    },
    mounted () {
      this.$mounted = true
      this.editorVm = this.$refs.editor.$el
    },
    methods: {
      installPlugins (plugins) {
        if (this.$mounted) {
          this.pluginManager.install(plugins)
          this.$forceUpdate()
        } else {
          this.$on('hook:mounted', () => {
            this.pluginManager.install(plugins)
          })
        }
      },
      onInput (e) {
      },
      onShortcut ({ key, currentSelection, event }) {
        this.pluginManager.triggerPlugin(key, currentSelection, event)
      },
      onPaste (e) {
        const text = e.clipboardData.getData('text/html')
        document.execCommand('insertHTML', false, text)
      },
      onSelectionChanged (selection) {
        this.pluginManager.groups.forEach(group => {
          if (group.handlers.isEnable(selection)) {
            group.enable = true
            group.plugins.forEach(plugin => {
              if (plugin.isActive) {
                plugin.state.active = plugin.isActive(selection)
              }
              if (plugin.getStyle) {
                plugin.state.style = plugin.getStyle(selection)
              }
            })
          } else {
            group.enable = false
          }
        })
      },
      handleClickToolBtn (key) {
        this.pluginManager.triggerPlugin(key, this.$refs.editor.$lastSelection)
      },
      onDrag (e) {
        // TODO: Support drag and drop
      }
    }
  }
</script>
<style lang="scss">
  $header-bg: #f8f8f8;
  $border: 1px solid #ccc;

  .vframe {

    &__header {
      position: relative;
      font-size: 0;

      &__panel {
        position: absolute;
        top: calc(100% + 10px);
        left: calc(100% + 10px);
        font-size: 18px;
      }
    }

    &__body {
      padding: 15px;
      line-height: 1.5;
      font-size: 18px;
      letter-spacing: 1.5px;
      color: #656076;
      border-top: 3px #e9e9e9 solid;
      border-bottom: 3px #e9e9e9 solid;
      transition: all .2s;

      &:focus {
        border-top-color: #656076;
        border-bottom-color: #656076;
      }
    }
  }
</style>
