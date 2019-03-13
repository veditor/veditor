<template>
  <div class="v-bar">
    <slot ref="items" />
    <transition name="fade">
      <div v-show="showingPopper" ref="popper" class="pop">
      </div>
    </transition>
  </div>
</template>

<script>
  import Popper from 'popper.js'
  import { mousetrapProxy } from '../../mixins/mousetrap'
  import Icon from '../../components/Icon/MaterialIcon'

  export default {
    name: 'Bar',
    components: { Icon },
    provide () {
      return {
        triggerBtn: (key, vm, e) => {
          if (vm.$slots.panel) {
            e.preventDefault()
            e.stopPropagation()
            this.showPop(vm, h => <div>{vm.$slots.panel}</div>)
          } else if (vm.panelRenderer) {
            e.preventDefault()
            e.stopPropagation()
            this.showPop(vm, h => <div>{vm.panelRenderer(h)}</div>)
          } else {
            this.$emit('item-click', key, e, vm)
          }
        }
      }
    },
    mixins: [mousetrapProxy],
    data () {
      return {
        showingPopper: false
      }
    },
    methods: {
      async showPop (item, renderer, anchor) {
        if (typeof item === 'string') {
          item = this.findBarItem(item)
        }
        if (item !== this.$popperItem) {
          await this.dismissPop()
        } else {
          this.showingPopper = !this.showingPopper
          return
        }
        this.$creatingPopper = true
        anchor = anchor || item.$el
        this.$popper = new Popper(anchor, this.$refs.popper, { placement: 'auto' })
        const vm = this.$popperVm = new this.constructor({
          render: () => renderer(item.$createElement),
          parent: item
        })
        this.$popperItem = item
        vm.$mount()
        this.$refs.popper.appendChild(vm.$el)
        this.$creatingPopper = false
        this.showingPopper = true
      },
      hidePop () {
        console.log('gwagw')
        this.showingPopper = false
      },
      async dismissPop () {
        if (!this.$popperItem) {
          return
        }
        if (this.$dismissingPopper) {
          return this.$dismissingPopper
        }
        return this.$dismissingPopper = new Promise(resolve => {
          this.showingPopper = false
          setTimeout(() => {
            this.$popper.destroy()
            this.$popperVm.$el.remove()
            this.$popperVm.$destroy()
            this.$popper = null
            this.$popperVm = null
            this.$popperItem = null
            this.$dismissingPopper = false
            resolve()
          }, 500)
        })
      },
      findBarItem (key) {
        return this.$children.find(child => child.name === key)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../style/transition";

  .v-bar {
    /*box-shadow: 0 3px 6px rgba(0, 0, 0, 0.14);*/
    padding: 8px;
    position: relative;

    .pop {
      width: max-content;
      z-index: 100;
      background: white;
      border-radius: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      transition: all .2s;
    }
  }
</style>
