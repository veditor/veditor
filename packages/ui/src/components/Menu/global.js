import Vue from 'vue'
import PopMenu from './PopMenu'
import VClickOutside from 'v-click-outside'

/**
 *
 * @param position
 * @param {function(CreateElement): VNode[]} render
 * @param props
 */
export function createPopMenu (
  position, render, props = {}, el = document.body) {
  const pop = (new Vue({
    name: 'GlobalPopMenu',
    data () {
      return {
        show: false
      }
    },
    directives: { 'click-outside': VClickOutside.directive },
    render (h) {
      return <Transition name="pop-out">
        {
          this.show ?
            <PopMenu position={position}
                     mousetrapTarget={props.mousetrapTarget}
                     vClickOutside={{
                       handler: () => this.onClickOutside(),
                       middleware: () => !this.__clickingFrame,
                       events: ['click', 'dbclick', 'contextmenu', 'touchstart']
                     }}>
              {render(h)}
            </PopMenu>
            : ''
        }
      </Transition>
    },
    class: 'v-global-pop-menu',
    methods: {
      onClickOutside () {
        dismissPopMenu()
      }
    },
    mounted () {
      this.show = true
      this.__clickingFrame = true
      setTimeout(() => this.__clickingFrame = false, 0)
    },
    beforeDestroy () {
      this.show = false
    }
  })).$mount()

  document.body.appendChild(pop.$el)

  function dismissPopMenu () {
    if (!pop.show) {
      return
    }
    pop.show = false
    pop.$nextTick(() => {
      pop.$destroy()
      pop.$el.remove()
      cbs.forEach(cb => cb())
    })
  }

  const cbs = []

  dismissPopMenu.onDismiss = function onPopMenuDismissed (cb) {
    cbs.push(cb)
    return dismissPopMenu
  }

  return dismissPopMenu
}
