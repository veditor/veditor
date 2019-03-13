<template>
  <div id="app">
    <div class="side-bar">
      <List style="width: 100%; height: 100%">
        <router-link :tag="$options.components.ListItem" to="/list" active-class="active">
          <Icon name="format_list_bulleted" />
          List 列表
        </router-link>
        <router-link :tag="$options.components.ListItem" to="/form" active-class="active">
          <Icon name="question_answer" />
          Form 表单
        </router-link>
        <router-link :tag="$options.components.ListItem" to="/icon" active-class="active">
          <Icon name="insert_emoticon" />
          Icon 图标
        </router-link>
        <router-link :tag="$options.components.ListItem" to="/bar" active-class="active">
          <Icon name="more_horiz" />
          Bar 栏
        </router-link>
      </List>
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import List from './components/List/List'
  import ListItem from './components/List/ListItem'
  import Icon from './components/Icon/MaterialIcon'

  export default {
    components: { Icon, ListItem, List }
  }
</script>


<style lang="scss">
  body, html {
    margin: 0;
    height: 100%;
  }

  #app {
    display: flex;
    height: 100%;
  }

  .side-bar {
    position: fixed;
    box-sizing: border-box;
    left: 0;
    top: 0;
    height: 100%;
    width: 240px;
    border-right: 3px solid #E9E9E9;
  }

  .main-content {
    margin-left: 240px;
    padding: 20px;
    flex: 1;
  }
</style>
