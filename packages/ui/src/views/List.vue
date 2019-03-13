<template>
  <ArticleContainer class="demo-list">
    <h1>List 列表</h1>
    <section>
      <h2>简单列表</h2>
      <p>
        列表可以绑定一个输入框，通过给列表的ListItem添加hotKey属性，来绑定对应按键的快捷键。
        <br>
        可以通过createPopMenu方法来直接创建一个弹出的列表。
      </p>
      <MultilineTextInput ref="area" @contextmenu.native.prevent="onContextMenu" />
      <List :mousetrap-target="textarea">
        <ListItem non-clickable no-padding>
          <InlineTextSearch placeholder="placeholder" />
        </ListItem>
        <ListItem>复制</ListItem>
        <ListItem hot-key="mod+a">All shall DIE</ListItem>
        <ListDivider />
        <ListItem>粘贴</ListItem>
        <ListItem>保存</ListItem>
        <ListDivider />
        <ListItem hot-key="mod+x" disabled>删除</ListItem>
      </List>
      <p>当列表高度固定时超出内容可以滚动展示。</p>
      <List :mousetrap-target="textarea" style="max-height: 100px">
        <ListItem hot-key="mod+c">复制</ListItem>
        <ListDivider />
        <ListItem>粘贴</ListItem>
        <ListItem>保存</ListItem>
        <ListDivider />
        <ListItem disabled>删除</ListItem>
        <ListItem>复制</ListItem>
        <ListDivider />
        <ListItem>粘贴</ListItem>
        <ListItem>保存</ListItem>
        <ListDivider />
        <ListItem disabled>删除</ListItem>
      </List>
    </section>
  </ArticleContainer>
</template>

<script>
  // @ is an alias to /src

  import Vue from 'vue'
  import List from '../components/List/List'
  import ListItem from '../components/List/ListItem'
  import ListDivider from '../components/List/ListDivider'
  import { createPopMenu } from '../components/Menu/global'
  import ArticleContainer from '../components/Article/ArticleContainer'
  import InlineTextInput from '../components/Form/TextInput/InlineTextInput'
  import InlineTextSearch from '../components/Form/TextInput/InlineTextSearch'
  import MultilineTextInput from '../components/Form/TextInput/MultilineTextInput'

  export default {
    components: {
      MultilineTextInput,
      InlineTextSearch,
      InlineTextInput,
      ArticleContainer,
      ListDivider,
      ListItem,
      List
    },
    data () {
      return {
        textarea: null
      }
    },
    methods: {
      /**
       *
       * @param {MouseEvent} e
       */
      onContextMenu (e) {
        /**
         *
         * @param {HTMLElement | null} el
         */
        function offset (el) {
          if (!el) {
            return { left: 0, top: 0 }
          }
          const { left, top } = offset(el.offsetParent)
          return {
            left: left + el.offsetLeft,
            top: top + el.offsetTop
          }
        }
        const p = offset(e.target)
        const position = Vue.observable({
          left: p.left + e.offsetX + 'px',
          top: p.top + e.offsetY - window.scrollY + 'px'
        })
        createPopMenu(position, h => ([
          <ListItem hot-key="mod+z">Shit1</ListItem>,
          <ListItem>Shit2</ListItem>
        ]), {
          mousetrapTarget: this.textarea
        }, e.target)
      }
    },
    mounted () {
      this.textarea = this.$refs.area
    }
  }
</script>

<style lang="scss">
  .demo-list {
  }
</style>
