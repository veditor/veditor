import invisible from './common/invisible'
import panelPlugin from './common/panel-plugin'
import blockFormat from './common/basic-command'
import {
  FormatPlugin,
  PanelPlugin,
  PluginGroup
} from '../lib/plugins'

/**
 *
 * @param {PluginManager} pluginManager
 */
export default function (pluginManager) {
  pluginManager.registerGroup(new PluginGroup('basic-command', FormatPlugin))
  pluginManager.registerGroup(new PluginGroup('panel-plugin', PanelPlugin))
  pluginManager.registerInGroup(null, invisible)
  pluginManager.registerInGroup('panel-plugin', panelPlugin)
  pluginManager.registerInGroup('basic-command', blockFormat)
  pluginManager.handle('panel-plugin', {
    isEnable () {
      return true
    },
    isContextEnable () {
      return false
    },
    run (plugin, selection) {
      const { editor, bar } = pluginManager.$frame.$refs
      const tuple = { editor, bar }

      if (!plugin.focus) {
        editor.focus()
      }
      bar.showPop(plugin.key, h => h(plugin.component,
        {
          props: {
            value: plugin.initialValue(tuple),
            focus: plugin.focus
          },
          on: {
            input: value => plugin.handleChange(value, tuple)
          }
        }), plugin.anchor === 'selection' ? selection.element : false)
    }
  })
  pluginManager.handle('basic-command', {
    isEnable () {
      return true
    },
    isContextEnable () {
      return false
    },
    run (plugin, selection) {
      const state = plugin.handler(plugin.state, selection) || plugin.state
      if (state !== plugin.state) {
        Object.assign(plugin.state, state)
      }
    }
  })
}
