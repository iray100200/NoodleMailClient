<style>
  .n-markup-input {
    border-bottom: 1px solid #e0e0ec;
    padding: 8px 12px 2px 0;
    line-height: 24px;
    height: 24px;
    font-size: 13px;
    color: #464547;
    box-sizing: content-box;
  }

  .n-markup-input .n-label-container:after {
    content: ':'
  }

  .n-markup-input .n-label {
    width: 52px;
    height: 100%;
    text-align: justify;
  }

  .n-markup-input .n-label i {
    display: inline-block;
    width: 100%;
  }

  .n-markup-input .n-tag {
    margin: 0 4px;
  }

  .n-markup-input .n-input-container {
    flex: 1;
    height: 100%;
  }

  .n-markup-input .n-input-container .n-input {
    border: 0;
    background: transparent;
    width: 100%;
    height: 100%;
    padding: 0 0 0 8px;
    font-size: 13px;
    color: #464547;
  }
</style>
<template>
  <div class="n-markup-input n-v-center">
    <div class="n-label">{{label}}<i></i></div>
    <div class="n-tag">:</div>
    <div class="n-input-container">
      <input class="n-input" v-bind:placeholder="placeholder" type="text" />
    </div>
  </div>
</template>
<script>
  export default {
    props: ['label', 'placeholder']
  }
</script>