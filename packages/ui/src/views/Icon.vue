<template>
  <ArticleContainer>
    <InlineTextSearch @search="value => search = value" />
    <span v-for="name in all" class="icon" :key="name">
        <Icon :name="name" />
        <span class="name">{{name}}</span>
      </span>
  </ArticleContainer>
</template>

<script>
  import Icon, { allName } from '../components/Icon/MaterialIcon'
  import ArticleContainer from '../components/Article/ArticleContainer'
  import InlineTextSearch from '../components/Form/TextInput/InlineTextSearch'

  export default {
    components: { InlineTextSearch, ArticleContainer, Icon },
    data () {
      return {
        search: ''
      }
    },
    computed: {
      all () {
        return allName.split('\n')
          .map(item => item.split(' ')[0].trim())
          .filter(item => {
            if (!item) {
              return false
            }
            if (this.search) {
              return item.indexOf(this.search) !== -1
            }
            return true
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 8px;
  }
</style>
