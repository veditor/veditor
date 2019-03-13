<template>
  <span class="v-selection" tabindex="0" @focus="onFocus" @blur="onBlur" role="combobox">
    <span v-if="notSelected" class="placeholder">请选择</span>
    <span class="preview">
      <slot name="preview">
        {{value}}
      </slot>
    </span>
    <Icon class="indicator" name="arrow_drop_down" />
    <transition name="fade">
      <List v-show="showList" class="list" ref="list" @item-click="handleItemClick">
        <slot name="list-item"
              v-for="(item, index) in list"
              :item="item"
              :index="index"
              :isActive="name => isItemActive(name)"
              :isHighlight="name => cursor === name">
          <ListItem
            ref="list-item"
            :key="item"
            :name="item"
            :active="isItemActive(item)"
            :highlight="cursor === item"
            role="option">{{item}}</ListItem>
        </slot>
      </List>
    </transition>
    <select class="v-selection-target" @focus="$el.focus()" :value="value">
      <option v-for="item in list" :value="item">{{item}}</option>
    </select>
  </span>

</template>

<script>
  import mousetrap from 'mousetrap'
  import Popper from 'popper.js'
  import Icon from '../../Icon/MaterialIcon'
  import PopMenu from '../../Menu/PopMenu'
  import ListItem from '../../List/ListItem'
  import List from '../../List/List'
  import { trigger } from '../../../directive/click-highlight'

  export default {
    name: 'Selection',
    components: { List, ListItem, PopMenu, Icon },
    props: {
      value: {
        type: [String, Number, Array],
        default: null
      },
      list: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        showList: false,
        cursor: 'key'
      }
    },
    computed: {
      notSelected () {
        if (Array.isArray(this.value)) {
          return this.value.length === 0
        } else {
          return !this.value && this.value !== 0
        }
      }
    },
    mounted () {
      this.$listPopper = new Popper(this.$el, this.$refs.list.$el, { placement: 'bottom-start' })
      const mt = mousetrap(this.$el)
      mt.bind(['down', 'right'], (e) => this.onMoveNext(e, false))
      mt.bind(['up', 'left'], (e) => this.onMoveNext(e, true))
      mt.bind(['enter', 'space'], (e) => this.handleEnter(e))
      mt.bind('esc', (e) => this.$el.blur())
    },
    beforeDestroy () {
      this.$listPopper.destroy()
    },
    methods: {
      onFocus () {
        this.showList = true
        this.cursor = this.value
      },
      onBlur () {
        this.showList = false
        this.cursor = ''
      },
      isItemActive (item) {
        if (Array.isArray(this.value)) {
          return this.value.indexOf(item) !== -1
        } else {
          return this.value === item
        }
      },
      handleItemClick (key) {
        if (Array.isArray(this.value)) {
          const list = this.value.slice()
          const removingIndex = list.indexOf(key)
          if (removingIndex === -1) {
            list.push(key)
          } else {
            list.splice(removingIndex, 1)
          }
          this.$emit('input', list)
        } else {
          this.$emit('input', key)
        }
      },
      onMoveNext (e, reverse = false) {
        e.preventDefault()
        e.stopPropagation()
        let list = this.$refs['list-item']
        if (reverse) {
          list = list.slice().reverse()
        }
        let returnsNext = this.cursor === ''
        for (const child of list) {
          if (returnsNext) {
            if (child.interactive) {
              this.cursor = child.name
              return
            }
          }
          if (this.cursor === child.name) {
            returnsNext = true
          }
        }
        this.cursor = ''
        this.onMoveNext(e, reverse)
      },
      findItem (key) {
        return this.$refs['list-item'].find(item => item.name === key)
      },
      handleEnter (e) {
        e.preventDefault()
        e.stopPropagation()
        this.handleItemClick(this.cursor)
        trigger(this.findItem(this.cursor))
      }
    }
  }
</script>

<style lang="scss">
  .v-selection {
    display: inline-block;
    width: 100%;
    border-bottom: 3px solid #E9E9E9;
    color: #656076;
    font-size: 20px;
    letter-spacing: .5px;
    transition: all .2s;
    padding: 8px 0;
    position: relative;
    background: transparent;
    outline: none;

    &:not(:focus) {
      cursor: pointer;
    }

    &:focus {
      border-bottom-color: #656076;

      .indicator {
        color: #656076;
        transform: rotate(180deg);
      }
    }

    .indicator {
      position: absolute;
      right: 0;
      top: 10px;
      color: #E9E9E9;
      transition: all .2s;
    }

    .list {
      width: 100%;
      max-height: 400px;
      transition: all .2s;

      .v-list-item {
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding-left: 8px;
      }
    }

    .placeholder {
      color: lightgray;
      user-select: none;
    }

    &-target {
      display: none;
    }

  }
</style>
