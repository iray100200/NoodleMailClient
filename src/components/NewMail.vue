<style lang="scss">
.n-new {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 8px 20px;
}
.input-cont {
  padding: 4px 0 0 0;
}
.qeditor-cont {
  flex: 1;
}
.quill-editor {
  height: 100%;
  display: flex;
  overflow: hidden;
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
  <div class="n-new">
    <div class="input-cont">
      <MarkupInput label="收件人" placeholder="请输入或从通讯录选择"></MarkupInput>
      <MarkupInput label="抄送" placeholder="请输入或从通讯录选择"></MarkupInput>
      <MarkupInput label="密件抄送" placeholder="请输入或从通讯录选择"></MarkupInput>
      <MarkupInput label="主题" placeholder="请输入"></MarkupInput>
    </div>
    <div class="qeditor-cont">
      <QuillEditor></QuillEditor>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import * as Quill from "vue-quill-editor";
import MarkupInput from "../shared/MarkupInput";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  props: ["visible"],
  data() {
    return {
      editor: null,
      isVisible: false
    };
  },
  methods: {
    close() {
      this.isVisible = false;
    },
    show() {
      this.isVisible = true;
    }
  },
  components: {
    MarkupInput,
    QuillEditor: Quill.quillEditor
  }
};
</script>