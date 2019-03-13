import Vue from 'vue'
import Mousetrap from 'mousetrap'

export const mousetrapProxy = {
  inject: {
    registerHotKey: {
      default () {
        return function (key) {
          // throw new Error('registerHotKey is not provided. ' + key)
        }
      }
    },
    unregisterHotKey: {
      default () {
        return function (key) {
          // throw new Error('unregisterHotKey is not provided. ' + key)
        }
      }
    }
  },
  provide () {
    const hotKeysMap = this.hotKeysMap = Vue.observable({})
    return {
      registerHotKey: (key, callback) => {
        Vue.set(hotKeysMap, key, callback)
      },
      unregisterHotKey: (key) => {
        if (this.hotKeysMap[key]) {
          Vue.delete(hotKeysMap, key)
        }
      }
    }
  },
  props: {
    mousetrapTarget: {
      type: [Vue, Element],
      required: false,
      default: null
    }
  },
  mounted () {
    this.__mounted = true
    if (this.mousetrapTarget) {
      const target = this.mousetrapTarget
      if (target instanceof Element) {
        addMousetrap(target, this)
      } else if (this.mousetrapTarget) {
        addMousetrap(target.$el, this)
      }
    }
  },
  beforeDestroy () {
    if (this.mousetrapTarget instanceof Element) {
      removeMousetrap(this.mousetrapTarget, this)
    } else if (this.mousetrapTarget) {
      removeMousetrap(this.mousetrapTarget.$el, this)
    }
  },
  watch: {
    mousetrapTarget (nv, pv) {
      if (pv instanceof Element) {
        removeMousetrap(pv, this)
      } else if (pv) {
        removeMousetrap(pv.$el, this)
      }
      if (nv instanceof Element) {
        addMousetrap(nv, this)
      } else if (nv) {
        addMousetrap(nv.$el, this)
      }
    },
    hotKeysMap: {
      handler (nv, pv) {
        console.log(nv, pv)
      },
      deep: true
    }
  }
}

function addMousetrap (el, vm) {
  const hotKeysMap = vm.hotKeysMap
  if (el.__mousetrap) {
    el.__mousetrapListeners.push(vm)
  } else {
    const mt = el.__mousetrap = Mousetrap(el)
    el.__mousetrapListeners = [vm]
    el.registerHotKey = (key, callback) => mt.bind(key, callback)
    el.unregisterHotKey = key => mt.unbind(key)
  }

  for (const key in hotKeysMap) {
    if (hotKeysMap.hasOwnProperty(key)) {
      el.__mousetrap.bind(key, hotKeysMap[key])
    }
  }
}

function removeMousetrap (el, vm) {
  if (el.__mousetrap) {
    const index = el.__mousetrapListeners.indexOf(vm)
    el.__mousetrapListeners.splice(index, 1)
    if (el.__mousetrapListeners.length === 0) {
      el.__mousetrap.reset()
      el.__mousetrap = null
      el.__mousetrapListeners = null
    } else {
      const hotKeysMap = vm.hotKeysMap
      for (const key in hotKeysMap) {
        if (hotKeysMap.hasOwnProperty(key)) {
          el.__mousetrap.unbind(key)
        }
      }
    }
  }
}
