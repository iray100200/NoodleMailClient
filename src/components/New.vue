<style lang="scss">
  .n-new {
    width: 80%;
    height: 70vh;
    background: #fffffb;
  }
</style>
<template>
  <div class="n-new">
    <MarkupInput label="发件人"></MarkupInput>
    <MarkupInput label="收件人"></MarkupInput>
    <MarkupInput label="抄送"></MarkupInput>
    <MarkupInput label="主题" placeholder="邮件主题"></MarkupInput>
  </div>
</template>
<script>
  import MarkupInput from '../shared/MarkupInput'
  export default {
    components: {
      MarkupInput
    }
  }
</script>