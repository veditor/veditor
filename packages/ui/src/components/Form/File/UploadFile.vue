<template>
  <div class="v-upload-file" tabindex="0" @click="onClick" @keypress.enter="onClick">
    <span class="placeholder" v-if="files.length === 0">{{placeholder}}</span>
    <span class="file-tag" v-for="(file, index) in files" :key="index">
      <span class="name">{{file.name}}</span>
      <span class="size">{{file.size | filesize}}</span>
    </span>
    <input ref="target" class="target" type="file" @change="onChoseFile" :multiple="multiple">
  </div>
</template>

<script>
  import filesize from 'filesize'

  export default {
    name: 'UploadFile',
    props: {
      placeholder: {
        type: String,
        default: 'Select file'
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        files: []
      }
    },
    methods: {
      onClick (e) {
        this.$refs.target.click()
      },
      onChoseFile () {
        this.files = this.$refs.target.files
      }
    },
    filters: {
      filesize (arg) {
        return filesize(arg)
      }
    }
  }
</script>

<style lang="scss">
  .v-upload-file {
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    border: none;
    border-bottom: 3px solid #E9E9E9;
    color: #656076;
    font-size: 16px;
    letter-spacing: .5px;
    caret-color: #656076;
    transition: all .2s;
    padding: 8px;
    position: relative;
    background: transparent;
    width: 100%;
    box-sizing: border-box;

    .file-tag {
      display: inline-block;
      margin-right: 8px;
      border-radius: 2px;
      background: #dedede;
      overflow: hidden;

      .name {
        padding: 4px 8px;
      }
      .size {
        color: #d9d9d9;
        padding: 4px 8px;
        background: gray;
      }
    }

    .target {
      visibility: hidden;
    }

    .placeholder {
      color: lightgray;
      user-select: none;
    }

    &:focus {
      border-bottom-color: #656076;
    }
  }
</style>
