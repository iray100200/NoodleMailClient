<style lang="scss">
  .n-new {
    height: 70vh;
    display: flex;
    flex-direction: column;
  }
  .input-cont {
    padding: 0 12px 0 12px;
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
    .ql-container.ql-snow {
      margin: 0 4px;
    }
  }
</style>
<template>
  <div class="n-new">
    <div class="input-cont">
      <MarkupInput label="发件人" value="iray100200@hotmail.com" disabled="true"></MarkupInput>
      <MarkupInput label="收件人" placeholder="请输入或从通讯录选择"></MarkupInput>
      <MarkupInput label="主题" placeholder="请输入"></MarkupInput>
    </div>
    <div class="qeditor-cont">
      <quillEditor></quillEditor>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { quillEditor } from 'vue-quill-editor'
  import MarkupInput from '../shared/MarkupInput'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  export default {
    data() {
      return {
        editor: null
      }
    },
    components: {
      MarkupInput,
      quillEditor
    }
  }
</script>