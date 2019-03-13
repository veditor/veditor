<template>
  <span class="v-inline-text-search">
    <InlineTextInput class="search-input"
                     ref="input"
                     v-model="content"
                     :placeholder="searchPlaceholder"
                     spellcheck="false"
                     autocomplete="false" />
    <Icon ref="icon" v-click-highlight class="search-icon clickable" name="search" />
  </span>
</template>

<script>
  import clickHighlight, { trigger } from '../../../directive/click-highlight'
  import mousetrap from 'mousetrap'
  import InlineTextInput from './InlineTextInput'
  import Icon from '../../../components/Icon/MaterialIcon'

  export default {
    name: 'InlineTextSearch',
    components: { Icon, InlineTextInput },
    directives: { clickHighlight },
    props: {
      searchPlaceholder: {
        type: String,
        default: 'Search'
      }
    },
    data () {
      return {
        content: ''
      }
    },
    methods: {
      onEnter () {
        this.$emit('search', this.content)
        trigger(this.$refs.icon.$el)
      }
    },
    mounted () {
      const mt = mousetrap(this.$refs.input.$el)
      mt.bind('enter', () => this.onEnter())
      this.$on('hook:beforeDestroy', () => {mt.reset()})
    }
  }
</script>

<style lang="scss">
  .v-inline-text-search {
    position: relative;
    box-sizing: border-box;

    .search-input {
      width: 100%;
      padding-right: 30px;
      box-sizing: border-box;

      &:focus + .search-icon {
        color: #656076
      }
    }

    .search-icon {
      position: absolute;
      color: lightgray;
      right: 4px;
      top: 0;
      border-radius: 50%;
      transition: all .2s;
      padding: 2px;
      font-size: 18px;
      cursor: pointer;
    }
  }

</style>
