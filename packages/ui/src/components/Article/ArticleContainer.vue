<script>
  export default {
    name: 'ArticleContainer',
    props: {
      content: {
        type: String
      }
    },
    render () {
      const useSlot = !!this.$scopedSlots.default
      if (useSlot) {
        return <article class="v-article">{this.$scopedSlots.default()}</article>
      } else {
        return <article class="v-article" innerHtml={this.content}></article>
      }
    }
  }
</script>

<style lang="scss">
  .v-article {
    color: #656076;
    width: 100%;
    h1, h2, h3 {
      color: darken(#656076, 12%)
    }
    p {
      line-height: 1.5;
    }
  }
</style>
