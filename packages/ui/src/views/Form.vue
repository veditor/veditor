<template>
  <ArticleContainer class="demo-form">
    <h1>Form 表单</h1>
    <hr>
    <section>
      <h2>TextInput 文本输入</h2>
      <h3>InlineTextInput</h3>
      <InlineTextInput placeholder="请输入" />
      <h3>InlineTextSearch</h3>
      <InlineTextSearch />
      <h3>MultilineTextInput</h3>
      <MultilineTextInput v-model="val" />
    </section>
    <section>
      <h2>Selection 选择器</h2>
      <h3>Selection</h3>
      <Selection v-model="a" :list="['苹果🍎', '香蕉🍌', '栗子🌰']" />
    </section>
    <section>
      <h2>Uploader 上传</h2>
      <h3>UploadFile</h3>
      <UploadFile multiple/>
    </section>
  </ArticleContainer>
</template>

<script>
  import ArticleContainer from '../components/Article/ArticleContainer'
  import InlineTextInput from '../components/Form/TextInput/InlineTextInput'
  import InlineTextSearch from '../components/Form/TextInput/InlineTextSearch'
  import MultilineTextInput from '../components/Form/TextInput/MultilineTextInput'
  import Selection from '../components/Form/Selection/Selection'
  import ListItem from '../components/List/ListItem'
  import UploadFile from '../components/Form/File/UploadFile'

  export default {
    components: { UploadFile, ListItem, Selection, MultilineTextInput, InlineTextSearch, InlineTextInput, ArticleContainer },
    data () {
      return {
        val: 'val\nf',
        a: null
      }
    }
  }
</script>

<style>
  .demo-form {
    padding-bottom: 100px;
  }
</style>
