<template>
  <ArticleContainer>
    <Bar :mousetrap-target="input">
      <Plugin name="k" icon="more_horiz" description="This is the new shit" hot-key="mod+a">
        <FormLabel title="Link">
          <InlineTextInput />
        </FormLabel>
      </Plugin>
      <Plugin name="c" icon="search" hot-key="mod+f">
        <InlineTextSearch />
      </Plugin>
    </Bar>
    <MultilineTextInput ref="input" />
  </ArticleContainer>
</template>

<script>
  import Bar from '../components/Bar/Bar'
  import ArticleContainer from '../components/Article/ArticleContainer'
  import MultilineTextInput from '../components/Form/TextInput/MultilineTextInput'
  import BarItem from '../components/Bar/BarItem'
  import Plugin from '../components/Bar/Plugin'
  import InlineTextSearch from '../components/Form/TextInput/InlineTextSearch'
  import FormLabel from '../components/Form/Label/FormLabel'
  import InlineTextInput from '../components/Form/TextInput/InlineTextInput'

  export default {
    components: {
      InlineTextInput,
      FormLabel,
      InlineTextSearch,
      Plugin,
      BarItem,
      MultilineTextInput,
      ArticleContainer,
      Bar
    },
    data () {
      return {
        input: null
      }
    },
    mounted () {
      this.input = this.$refs.input
    }
  }
</script>

<style scoped>

</style>
