<style lang="scss">
  .n-new {
    height: 70vh;
    display: flex;
    flex-direction: column;
  }
  .input-cont {
    padding: 0;
  }
  .qeditor-cont {
    flex: 1;
  }
  .quill-editor {
    height: 100%;
    display: flex;
    flex-direction: column;
    .ql-snow {
      border: 0;
    }
    .ql-toolbar.ql-snow {
      background: #eee;
    }
  }
</style>
<template>
  <Modal v-model="isVisible" @cancel="close" :mask-closable="false" width="80%" :styles="{ top: '6.4vh' }">
    <p slot="close" @click="close">
      <Icon type="ios-close-empty"></Icon>
    </p>
    <p slot="header" class="n-create-modal n-v-center">
      <label class="n-title n-v-center">
        <Icon type="compose" size="20"></Icon>&nbsp;&nbsp;
        <label>新邮件</label>
      </label>
    </p>
    <div class="n-new">
      <div class="input-cont">
        <MarkupInput label="收件人" placeholder="请输入或从通讯录选择"></MarkupInput>
        <MarkupInput label="主题" placeholder="请输入"></MarkupInput>
      </div>
      <div class="qeditor-cont">
        <quillEditor></quillEditor>
      </div>
    </div>
    <div slot="footer">
      <Button type="primary" size="large">Send</Button>
      <Button type="error" size="large" @click="close">取消</Button>
    </div>
  </Modal>
</template>
<script>
  import Vue from 'vue'
  import {
    quillEditor
  } from 'vue-quill-editor'
  import MarkupInput from '../shared/MarkupInput'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    props: [
      'visible'
    ],
    data() {
      return {
        editor: null,
        isVisible: false
      }
    },
    methods: {
      close() {
        this.$emit('close', false)
      }
    },
    watch: {
      visible(to) {
        this.isVisible = to
      }
    },
    components: {
      MarkupInput,
      quillEditor
    }
  }
</script>