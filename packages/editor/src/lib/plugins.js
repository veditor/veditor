import Vue from 'vue'

export class PluginManager {

  constructor (frame) {
    this.groups = []
    this.hotKeys = {}
    this.pluginMap = {}
    this.plugins = []
    this.$frame = frame
  }

  install (plugin) {
    if (typeof plugin === 'function') {
      plugin(this)
    } else if (typeof plugin === 'object') {
      if (Array.isArray(plugin)) {
        this.registerInGroup(null, plugin)
      } else if (plugin) {
        this.register(plugin)
      }
    }
  }

  register (pluginOptions, Constructor = Plugin) {
    const { groupName, hotKey, key } = pluginOptions
    const plugin = new Constructor(pluginOptions, this)
    if (groupName) {
      const group = this.findGroup(groupName)
      group.plugins.push(plugin)
      plugin.group = group
    }
    Vue.set(this.pluginMap, key, plugin)
    this.plugins.push(plugin)
    if (hotKey) {
      Vue.set(this.hotKeys, hotKey, key)
    }
  }

  registerInGroup (groupName, arr) {
    if (groupName) {
      const group = this.findGroup(groupName)
      arr.forEach(item => {
        this.register(Object.assign({ groupName }, item), group.pluginType)
      })
    } else {
      arr.forEach(item => {
        this.register(item)
      })
    }
  }

  registerGroup (group) {
    this.groups.push(group)
  }

  findGroup (name) {
    let group
    if (!(group = this.groups.find(group => group.name === name))) {
      throw new Error(`No such group ${name}`)
    }
    return group
  }

  handle (groupName, handlers) {
    Object.assign(this.findGroup(groupName).handlers, handlers)
  }

  triggerPlugin (key, selection, e) {
    const plugin = this.pluginMap[key]
    if (!plugin) {
      return false
    }
    plugin.group
      ? plugin.group.handlers.run(plugin, selection, e)
      : plugin.handler(selection, e)
    return true
  }

}

export class PluginGroup {
  name
  plugins
  handlers
  pluginType

  constructor (name, pluginType = Plugin, handlers = {}) {
    this.name = name
    this.handlers = { ...handlers }
    this.pluginType = pluginType
    this.plugins = []
  }

}

export class Plugin {
  key
  icon
  iconContent
  order
  handler
  title
  description
  state
  hotKey
  isActive
  panelComponent
  getStyle

  constructor (options = {}, manager) {
    Object.assign(this, options)
    this.$manager = manager
  }

  get isPanelOpen () {
    if (!this.panelComponent || !this.$panelInstance) {
      return false
    }
    return !!this.$panelInstance.$el.parentElement
  }

  get editor () {
    return this.$manager.$frame.$refs.editor
  }

  get bar () {
    return this.$manager.$frame.$refs.bar
  }

  togglePanel () {
    if (!this.panelComponent) return

    if (this.isPanelOpen) {
      this.$panelInstance.$el.parentElement.removeChild(this.$panelInstance.$el)
      this.state.active = false
      return
    }

    const frame = this.$manager.$frame
    const el = frame.$refs.panel
    this.state.active = true
    if (this.$manager.$currentPanelPlugin) this.$manager.$currentPanelPlugin.state.active = false

    el.childNodes.forEach(node => node.remove())

    if (this.$panelInstance) {
      el.appendChild(this.$panelInstance.$el)
    } else {
      const instance = new this.$manager.$frame.constructor({
        data () {
          return {
            show: false
          }
        },
        render: (h) => h(this.panelComponent),
        parent: frame
      })
      instance.$mount()
      this.$panelInstance = instance
      el.appendChild(instance.$el)
    }
    this.$manager.$currentPanelPlugin = this
  }

}

export class FormatPlugin extends Plugin {
  constructor ({
                 key,
                 icon,
                 iconContent,
                 command,
                 commandArg,
                 order,
                 description,
                 hotKey
               }, manager) {
    super({
      key,
      icon,
      iconContent,
      command,
      order,
      description,
      hotKey,
      isActive () {
        return document.queryCommandState(command)
      },
      state: {
        active: document.queryCommandState(command)
      },
      handler (_, selection) {
        selection.select()
        document.execCommand(command, false,
          typeof commandArg === 'function' ? commandArg() : commandArg)
        this.$manager.$frame.$refs.editor.focus()
        return { active: document.queryCommandState(command) }
      }
    }, manager)
  }
}

export class PanelPlugin extends Plugin {
  constructor ({
                 key,
                 icon,
                 iconContent,
                 order,
                 description,
                 hotKey,
                 component,
                 initialValue,
                 handleChange,
                 anchor,
                 focus
               }) {
    super({
      key, icon, iconContent,
      order, description, hotKey,
      component, initialValue, handleChange, anchor, focus,
      isActive: () => false,
      state: {
        active: false
      }
    })
  }
}
